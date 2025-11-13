# FishDex - Frontend

A mobile-first web application for identifying and cataloging fish species through AI-powered image recognition.

## Tech Stack

- HTML5/CSS3
- JavaScript (ES6 Modules)
- Modular architecture with client-side routing (**Plain JS**)

## Features

- AI-powered fish identification from uploaded images (**Not functional without backend**)
- Personal fish collection gallery (Pokedex-style)
- Detailed species information pages
- AI chat assistant for fish-related queries (**Not functional without backend**)

## Project Structure
```
/
├── index.html                  # Home page
├── upload.html                 # Fish identification upload
├── chat.html                   # AI chat assistant
├── gallery.html                # Fish collection gallery
├── details.html                # Detailed species information
└── assets/
    ├── css/
    │   └── screen.css          # All styles
    └── js/
        ├── main.js             # Router/app entry point
        └── data/
        │   └── fetcher.js      # API communication layer
        └── pages/
        │   └── home.js         # Home page logic
        │   └── upload.js       # Upload page logic
        │   └── chat.js         # Chat page logic
        │   └── gallery.js      # Gallery page logic
        │   └── details.js      # Details page logic
```

## Setup - You'll need your own backend service for this, or you can enjoy the mockdata provided in the frontend.

1. Clone the repository
```bash
git clone <repository-url>
cd fishdex-frontend
```

2. Configure API endpoint in `assets/js/fetcher.js`:
#### If you really want to build your own backend, have a look at the fetcher.js file. This will give you a lot of info about the api endpoints you need. GL & HF!
```javascript
const API_BASE_URL = 'http://your-backend-url.com/api';
```

3. Serve with a local server (required for ES6 modules):
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx http-server

# Option 3: VS Code Live Server extension
```

4. Open in browser:
```
http://localhost:8000/fishdex-home.html
```

## API Integration

The app expects the backend API to return responses in this format:
```javascript
{
  "success": true,
  "message": "Fish found for device",
  "data": [
    {
      "fish": {
        "_id": "...",
        "name": "Clownfish",
        "family": "Pomacentridae",
        "waterType": "Saltwater",
        // ... other fish data
      },
      "imageUrl": "http://...",
      "timestamp": "2025-11-12T13:27:27.913Z",
      "fishId": "..."
    }
  ]
}
```
