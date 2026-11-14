/* LibriFind — search, location, filters, details, favorites (Local Storage), dark mode */

const $ = id => document.getElementById(id);
const state = { q: "", city: "", tags: new Set(), favOnly: false, favs: new Set(), open: new Set() };
const FAV_KEY = "librifind:favs:v2";

/* ---------- Local Storage helpers (safe if storage is blocked) ---------- */
function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

try {
  const saved = JSON.parse(lsGet(FAV_KEY) || "[]");
  if (Array.isArray(saved)) saved.forEach(id => state.favs.add(id));
} catch (e) {}
state.city = lsGet("librifind:city") || "";

/* ---------- Dark / light mode ---------- */
function systemDark() { return matchMedia("(prefers-color-scheme: dark)").matches; }
function currentTheme() {
  return document.documentElement.getAttribute("data-theme") || (systemDark() ? "dark" : "light");
}
function updateThemeIcon() { $("themeToggle").textContent = currentTheme() === "dark" ? "☀️" : "🌙"; }

const savedTheme = lsGet("librifind:theme");
if (savedTheme === "light" || savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
updateThemeIcon();

$("themeToggle").onclick = () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  lsSet("librifind:theme", next);
  updateThemeIcon();
};

/* ---------- Helpers ---------- */
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/* ---------- Location dropdown (built from LOCATIONS in data.js) ---------- */
const ALL = "__all";
const hasCity = () => state.city && state.city !== ALL;
function buildLocations() {
  $("location").innerHTML =
    `<option value="">📍 Choose a location</option>` +
    `<option value="${ALL}">All Locations</option>` +
    LOCATIONS.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
  if (!LOCATIONS.includes(state.city) && state.city !== ALL) state.city = "";
  $("location").value = state.city;
}
$("location").onchange = e => {
  state.city = e.target.value;
  lsSet("librifind:city", state.city);
  render();
};

/* ---------- Filter chips ---------- */
function buildFilters() {
  $("filters").innerHTML = "";
  AMENITY_OPTIONS.forEach(a => {
    const b = document.createElement("button");
    b.className = "chip";
    b.type = "button";
    b.textContent = a;
    b.setAttribute("aria-pressed", state.tags.has(a));
    b.onclick = () => {
      state.tags.has(a) ? state.tags.delete(a) : state.tags.add(a);
      buildFilters();
      render();
    };
    $("filters").appendChild(b);
  });
}

/* ---------- Render the library cards ---------- */
function emptyMessage() {
  return `<div class="empty">No libraries match yet. Try another location or remove a filter.</div>`;
}

/* Facilities shown in "View details" (✅ = listed for this library) */
const FACILITIES = [
  ["Reading space", "📖"], ["Study space", "✏️"], ["Wi-Fi", "📶"], ["Computers", "💻"],
  ["Book sharing", "🔄"], ["Children’s section", "🧒"], ["Special collection", "🗂️"]
];
function facilityRow(l, [name, icon]) {
  const has = l.tags.includes(name);
  const val = name === "Wi-Fi" && l.wifi ? l.wifi : (has ? "Available" : "Not listed");
  return `<li class="${has ? "yes" : "no"}"><span>${icon} ${esc(name)}</span><b>${has ? "✅" : "➖"} ${esc(val)}</b></li>`;
}

function photoHTML(l) {
  return `<span aria-hidden="true">${l.emoji}</span>
    <img src="library.jpg?v=7" data-file="library.jpg" alt="${esc(l.name)}" loading="lazy" onerror="imgFallback(this)">`;
}

function wifiText(l) {
  if (l.wifi) return "Wi-Fi: " + l.wifi.split(" (")[0].toLowerCase();
  return l.tags.includes("Wi-Fi") ? "Wi-Fi available" : "Wi-Fi not listed";
}

function cardHTML(l) {
  const fav = state.favs.has(l.id);
  return `
    <article class="card">
      <div class="thumb" style="--h:${l.hue}">
        ${photoHTML(l)}
        <button class="fav" data-id="${l.id}" aria-label="${fav ? "Remove from" : "Add to"} favorites">${fav ? "❤️" : "🤍"}</button>
      </div>
      <div class="body">
        <h3>${esc(l.name)}</h3>
        <div class="meta">📍 ${esc(l.city)}</div>
        <div class="meta">🆓 ${esc(l.freeShort)}</div>
        <div class="meta">📶 ${esc(wifiText(l))}</div>
        <button class="btn details-btn" data-id="${l.id}">View Details →</button>
      </div>
    </article>`;
}

/* ---------- Details pop-up ---------- */
let lastFocus = null;
function modalHTML(l) {
  const fav = state.favs.has(l.id);
  return `
    <div class="modal-grid">
      <div class="modal-photo" style="--h:${l.hue}">${photoHTML(l)}</div>
      <div class="modal-info">
        <h3 id="modalTitle">${esc(l.name)}</h3>
        <div class="meta">${esc(l.type)} · ${esc(l.city)}</div>
        <dl class="info">
          <dt>Location</dt><dd>${esc(l.address)}, ${esc(l.city)}</dd>
          <dt>Hours</dt><dd>${esc(l.hours)}</dd>
          <dt>Free access</dt><dd>${esc(l.free)}</dd>
          <dt>Services</dt><dd>${esc(l.amenities)}</dd>
        </dl>
        <h4>Facilities</h4>
        <ul class="facil">${FACILITIES.map(f => facilityRow(l, f)).join("")}</ul>
        <h4>About</h4>
        <p>${esc(l.note)}</p>
        ${l.source ? `<p class="meta">Source: ${esc(l.source)}</p>` : ""}
        <p class="meta">“Not listed” means we have no confirmed information. Hours and services can change, so please check before visiting.</p>
        <button class="btn primary modal-fav" data-id="${l.id}">${fav ? "❤️ Saved to favorites" : "🤍 Save to favorites"}</button>
      </div>
    </div>`;
}
function openModal(id) {
  const l = LIBRARIES.find(x => x.id === id);
  if (!l) return;
  lastFocus = document.activeElement;
  $("modalBody").innerHTML = modalHTML(l);
  $("modal").hidden = false;
  document.body.style.overflow = "hidden";
  $("modalClose").focus();
}
function closeModal() {
  $("modal").hidden = true;
  document.body.style.overflow = "";
  if (lastFocus && lastFocus.isConnected) lastFocus.focus();
}
$("modalClose").onclick = closeModal;
$("modal").addEventListener("click", e => {
  if (e.target === $("modal")) closeModal();            // click outside the box
  const f = e.target.closest(".modal-fav");
  if (f) {
    const id = Number(f.dataset.id);
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    lsSet(FAV_KEY, JSON.stringify([...state.favs]));
    f.textContent = state.favs.has(id) ? "❤️ Saved to favorites" : "🤍 Save to favorites";
    render();
  }
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("modal").hidden) closeModal(); });

function render() {
  const q = state.q.trim().toLowerCase();
  const list = LIBRARIES.filter(l =>
    (!hasCity() || l.city === state.city) &&
    (!q || (l.name + " " + l.address + " " + l.city).toLowerCase().includes(q)) &&
    [...state.tags].every(t => l.tags.includes(t)) &&
    (!state.favOnly || state.favs.has(l.id))
  );

  $("favCount").textContent = state.favs.size;
  $("heading").textContent = state.favOnly ? "Your Favorites"
    : (q || hasCity() || state.tags.size ? "Results" : "📚 Explore Free Libraries");
  $("count").textContent = list.length + (list.length === 1 ? " library" : " libraries") + " found" + (hasCity() ? " in " + state.city : "");
  $("grid").innerHTML = list.length ? list.map(cardHTML).join("") : emptyMessage();
}

/* ---------- Events ---------- */
$("grid").addEventListener("click", e => {
  const fav = e.target.closest(".fav");
  const det = e.target.closest(".details-btn");
  if (fav) {
    const id = Number(fav.dataset.id);
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    lsSet(FAV_KEY, JSON.stringify([...state.favs]));
    render();
  } else if (det) {
    openModal(Number(det.dataset.id));
  }
});
$("q").addEventListener("input", e => { state.q = e.target.value; render(); });
// Enter in the search box or the Search button: update results and scroll to them
$("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  render();
  $("explore").scrollIntoView({ behavior: "smooth" });
});
$("favToggle").onclick = e => {
  state.favOnly = !state.favOnly;
  e.currentTarget.setAttribute("aria-pressed", state.favOnly);
  e.currentTarget.classList.toggle("primary", state.favOnly);
  render();
};

/* ---------- Start ---------- */
buildLocations();
buildFilters();
render();

/* ---------- Active link in the header (Home / Explore / About) ---------- */
const navLinks = [...document.querySelectorAll(".links a")];
function updateNav() {
  let active = 0;                                        // Home
  if (scrollY >= 10) {
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
    if ($("explore").getBoundingClientRect().top <= innerHeight * 0.4) active = 1;   // Explore
    if ($("about").getBoundingClientRect().top <= innerHeight * 0.6 || atBottom) active = 2; // About
  }
  navLinks.forEach((a, i) => i === active ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
}
addEventListener("scroll", updateNav, { passive: true });
addEventListener("resize", updateNav);
updateNav();
