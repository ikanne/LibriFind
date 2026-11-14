# 📚 LibriFind — Free Library Finder

Discover free libraries and reading spaces near you. Find your next study spot, for free.

## Languages and tools

| Technology/App | Purpose | Where in this project |
|---|---|---|
| Figma | Plan the UI/UX design | Design the screens first (see wireframe below) |
| HTML | Build the website structure | `index.html` |
| CSS | Design and responsive layout | `style.css` |
| JavaScript | Search, filters, and interactive features | `script.js` |
| Local Storage | Save favorite libraries (and chosen location, theme) | used in `script.js` |

## Folder structure

```
librifind/
├── index.html   ← page structure
├── style.css    ← styling, dark mode, responsive grid
├── data.js      ← YOUR LIBRARY LIST (edit this one)
├── script.js    ← search, location, filters, favorites
├── LibriFind.jpg   ← logo
├── library.jpg     ← photo used on every card
├── bg.jpg          ← page background
└── README.md
```

## How to run

Double-click `index.html`. No installation needed.

## How to add your libraries

Open `data.js` and copy one block inside `LIBRARIES`:

```js
{ id: 10, name: "Your Library Name", city: "Your City", area: "Neighborhood",
  emoji: "📚", hue: 150, hours: "Mon–Fri · 9:00–17:00",
  amenities: ["Wi-Fi", "Quiet zone"],
  description: "One short sentence about the library." },
```

- Give every library a **unique `id`** (1, 2, 3 …).
- Libraries with the same `city` are grouped together. **New cities show up in the location dropdown automatically.**
- Users choose their location, and LibriFind remembers it next time.

## Features

- 🔎 Search by library name or area
- 📍 Choose a location
- 🎛️ Filter by amenities (Wi-Fi, study rooms, …)
- 📚 Library cards with hours and facilities
- ❤️ Favorites saved with Local Storage
- 📱 Responsive design
- 🌙 Dark/light mode

## Wireframe (for Figma)

```
------------------------------------------------
 LibriFind                      ❤️ Favorites  🌙

 FIND YOUR NEXT STUDY SPOT
 Discover free libraries and reading spaces.

 [ 📍 Location ▾ ] [ Search by name… ] [ Search ]
 ( Wi-Fi ) ( Quiet zone ) ( Study rooms ) ...

 Popular Libraries
 ┌──────────┐ ┌──────────┐ ┌──────────┐
 │  Image   │ │  Image   │ │  Image   │
 │ Library  │ │ Library  │ │ Library  │
 │ ❤️ Wi-Fi │ │ ❤️ Quiet │ │ ❤️ Study │
 └──────────┘ └──────────┘ └──────────┘
------------------------------------------------
```

## Optional later

Add a map API (e.g. Leaflet) once you’re comfortable with JavaScript.

## Library photo

All library cards use one photo: `library.jpg`.
If the photo is missing, the card shows a colored emoji cover instead.
To give one library its own photo, add `image: "name.jpg"` to that library in `data.js`.
