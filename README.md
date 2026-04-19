# Pokémon App 🎮

En enkel React‑applikation som använder [PokéAPI](https://pokeapi.co/) för att hämta information om Pokémon.  
Du kan välja en Pokémon från en lista och se namn, bild, typ(er), vikt och längd.

---

## 🚀 Kom igång

## 📋 Krav
- Node.js 18+
- npm eller yarn
  
### 1. Klona projektet
```bash
git clone https://github.com/ditt-användarnamn/pokemon-app.git
cd pokemon-app
```

### 2. Installera beroenden
```bash
npm install
```

### 3. Starta utvecklingsservern
```bash
npm run dev
```
eller (beroende på setup):
```bash
npm start
```

Applikationen körs nu på **lokal** (om du använder Vite) eller **http://localhost:3000** (om du använder Create React App).

---

## 📂 Projektstruktur

```
src/
├── App.jsx
├── App.css
├── PokemonApplication.jsx
├── Pokemon.jsx
└── index.html
```

- **App.jsx** – startkomponenten med knappen för att öppna/stänga appen  
- **PokemonApplication.jsx** – hämtar listan med Pokémon och visar dropdown  
- **Pokemon.jsx** – renderar vald Pokémon med bild, typ, vikt och längd  
- **App.css** – grundläggande styling  

---

## 🛠️ Tekniker
- React (Hooks: `useState`, `useEffect`)
- PokéAPI (https://pokeapi.co/)
- CSS för styling

---

## ✨ Funktioner
- Starta/stäng appen med en knapp
- Dropdown med de första 151 Pokémon
- Hämta detaljer om vald Pokémon
- Visa namn, bild, typ(er), vikt och längd
```
