# Modern Portfolio mit 3D-Elementen

Ein modernes, interaktives Portfolio mit 3D-Elementen, erstellt mit React, Three.js und Framer Motion.

## Features

- 🎨 **Modernes Design** mit Glassmorphism-Effekten
- 🎭 **3D-Elemente** mit React Three Fiber
- ✨ **Smooth Animationen** mit Framer Motion
- 📱 **Responsive Design** für alle Geräte
- 🚀 **Performance-optimiert**
- 🎯 **Interaktive Komponenten**
- 📦 **Kein Backend nötig** - Alle Daten sind statisch

## Technologien

- React 18
- Vite
- Three.js / React Three Fiber
- Framer Motion

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm start
# oder
npm run dev
```

## Daten bearbeiten

Alle Daten sind in `src/utils/data.js` gespeichert:
- **PROJECTS**: Deine Projekte
- **SKILLS**: Deine Skills

Einfach die Datei bearbeiten und die Daten anpassen!

### Beispiel: Projekt hinzufügen

```javascript
export const PROJECTS = [
  {
    id: '1',
    title: 'Mein Projekt',
    description: 'Beschreibung des Projekts',
    technologies: ['React', 'TypeScript'],
    url: 'https://example.com'
  }
]
```

### Beispiel: Skill hinzufügen

```javascript
export const SKILLS = [
  { name: 'React', level: 90, icon: '⚛️', category: 'Frontend' }
]
```

## Build

```bash
npm run build
```

## Struktur

```
portfolio/
├── src/
│   ├── components/        # React Komponenten
│   ├── utils/
│   │   ├── data.js       # Statische Daten (Projekte, Skills)
│   │   ├── constants.js  # Konstanten (Erfahrungen)
│   │   └── animations.js # Animation-Varianten
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Über mich

Fachinformatiker für Anwendungsentwicklung mit 3 Jahren Erfahrung in der Frontend-Entwicklung. Aktuell in Softwaretester-Zertifizierung.
