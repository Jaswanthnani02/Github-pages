# Jaswanth Gaddam - Advanced Portfolio

An advanced, animation-rich portfolio built with React and a lightweight Node/Express API for local development.

## Features

- **Cinematic UI**: editorial typography, atmospheric gradients, and premium cards.
- **Motion System**: reveal-on-scroll, floating orbs, and interactive hover states.
- **Professional Structure**: capability, project, experience, and contact sections.
- **API Ready**: simple Express endpoints to power status and contact forms.

## Tech Stack

- **React + Vite** for the client app
- **Node + Express** for the API
- **CSS** with custom variables and animations

## Project Structure

```
Github-pages/
├── client/
│   ├── public/
│   │   ├── badges.jpg
│   │   ├── badges.webp
│   │   ├── profile.jpg
│   │   └── resume.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── index.js
│   └── package.json
└── README.md
```

## Local Development

### Client

```
cd client
npm install
npm run dev
```

### Server

```
cd server
npm install
npm run dev
```

The client will request `/api/status` and `/api/contact` from the server.

## Deployment Notes

- GitHub Pages can host the static React build.
- The Node server should be deployed separately (Render, Railway, Fly, etc.).

