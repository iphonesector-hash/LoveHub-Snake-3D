# LoveHub Snake 3D — Sector Edition

Premium **3D Snake** for LoveHub (Phase 1 playable core).

Standalone WebGL game built with **Three.js**. Designed to integrate with LoveHub later (auth / couple / multiplayer) without rewriting the engine.

## Play

Open `index.html` with a local server (ES modules + import maps):

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Or deploy the repo root to Vercel / Netlify / any static host.

## Controls

| Input | Action |
|--------|--------|
| **WASD** / **Arrow keys** | Steer |
| **Space** / **Shift** | Boost |
| **Virtual joystick** | Mobile steer |
| **Swipe** | Mobile steer |
| **P** / Pause button | Pause |

## Features (Phase 1)

- Real WebGL 3D (PerspectiveCamera, meshes, lights, shadows)
- Smooth snake movement + body follow
- Food collectibles, score, growth, combo
- World boundaries (Sector City)
- Self-collision + wall collision → game over / restart
- Mobile-first touch controls (no page scroll during play)
- Persian + English UI with RTL / LTR
- Local save: language, best score
- Architecture ready for multiplayer (engine ≠ network)

## Project structure

```
index.html
css/game.css
js/
  main.js                 # bootstrap + UI screens
  engine/GameEngine.js    # loop, render, state machine
  entities/Snake.js
  entities/Food.js
  worlds/SectorCity.js    # first 3D world
  systems/InputSystem.js  # keyboard + joystick + swipe
  i18n/                   # FA / EN
  integration/LoveHubBridge.js   # optional LoveHub hooks
  network/GameNetworkService.js  # offline stub for future MP
```

## Architecture

```
Game Engine  →  Game State  →  Input
                    ↓
              Network Layer (stub)
                    ↓
              LoveHub Bridge (optional)
```

Single-player works with **zero** network or LoveHub dependency.

## Roadmap

- Phase 2+: more Sector City levels, enemies, power-ups, bosses
- Progression, economy, cosmetics
- Real couple multiplayer rooms

## License

Private / LoveHub — Sector. Not for redistribution outside LoveHub without permission.
