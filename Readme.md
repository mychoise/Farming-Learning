# 🌾 AgriLearn - Smart Nepali Farming Platform

**AgriLearn** is a comprehensive digital platform designed specifically for Nepali farmers. It provides crop learning modules in **English**, AI-powered farming assistance, smart calculators, weather integration, community forum, and more — all tailored to Nepal's diverse climates (Terai, Hill, and Himalaya).

Built with modern technologies and focused on **usability** for Nepali farmers.

## Features

### Core Features

- **Crop Learning Modules** (Vegetables, Fruits, Grains, Herbs, Commercial Crops)
  - Crop overview
  - Climate & soil requirements
  - Step-by-step growing guide
  - Watering schedule
  - Fertilizer recommendations
  - Disease identification & solutions
  - Harvesting tips
  - Estimated profit

- **AI Farming Assistant**
  - Chatbot for farming questions
  - Plant disease detection (text symptoms or image upload)
  - Crop recommendation based on location, season & soil type
  - Personalized farming plan generator

- **Weather & Seasonal Guide**
  - Current weather
  - Seasonal crop suggestions
  - Planting calendar (Terai / Hill / Himalaya)
  - Basic rain prediction

- **Smart Farming Tools**
  - Fertilizer Calculator (Urea, DAP, MOP + Organic options)
  - Animal Weight Calculator (Cow, Ox, Goat, Sheep)
  - Profit Calculator
  - Yield Estimator
  - Irrigation Planner

- **Community Forum**
  - Farmer discussions
  - Question & Answer section (like StackOverflow for farmers)
  - Upvote system

- **Video Learning Section**
  - Farming tutorials & expert videos

- **Marketplace** (Admin can add products)
- **Notices & Agricultural News**

## Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **TanStack Query** (React Query)
- **GSAP** (for smooth animations)
- **React Router DOM**
- **Axios** / TanStack Query for API calls

### Backend
- **Express.js** (JavaScript)
- **PostgreSQL**
- **Drizzle ORM**
- **JWT Authentication**
- **Multer** (for image uploads - disease detection)
- **Zod** (validation)

### Others
- **Framer Motion** / **GSAP** for animations
- OpenWeatherMap API (or any Nepali weather API)
- AI integration ready (Gemini / OpenAI / local model)

## Project Structure
```bash
Farming-Learn/
client/                  # React + TypeScript Frontend
  src/
    components/
    pages/
    hooks/
    lib/
    assets/
    App.tsx
    main.tsx
  tailwind.config.js
  vite.config.ts

server/                  # Express Backend
  src/
    controllers/
    routes/
    middleware/
    db/              # Drizzle schema & migrations
    utils/
    server.js
  drizzle.config.js
  package.json

README.md
.env.example
```

## Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Farming-Learn
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

Configure `.env`:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/krishigyan
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development

# Optional
OPENWEATHER_API_KEY=your_api_key
GEMINI_API_KEY=your_gemini_key   # for AI features
```

### 3. Database Setup (PostgreSQL + Drizzle)
```bash
# Create database
createdb krishigyan

# Run migrations
npx drizzle-kit generate
npx drizzle-kit push
```

### 4. Frontend Setup
```bash
cd ../client

npm install

# Copy environment (if needed)
cp .env.example .env
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the Application

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

Open http://localhost:5173

## Key Calculators Included

### 1. Fertilizer Calculator
Supports:
- Chemical fertilizers (Urea 46%N, DAP 46%P, MOP 60%K)
- Organic fertilizers (Compost, Khura Maal, Neem Cake, etc.)
- Nepali land units (Bigha, Kattha, Ropani, Aana) converted to hectares
- Predefined NPK values for popular Nepali crops

### 2. Animal Weight Calculator
Formulas for:
- Cow / Ox
- Sheep
- Goat (Male & Female)

### 3. Other Tools
- Profit calculator
- Yield estimator
- Irrigation planner

## Planting Calendar (Nepali Context)

Data included for:
- Terai (तराई)
- Hill (पहाड)
- Himalaya (हिमाल)

Crops with Nepali months (Baisakh to Chaitra) for seed store, nursery & transplant timing.

## Design Inspiration

Landing page inspired by: https://didasko.framer.website/
Modern, clean, mobile-first design with Nepali-friendly typography and colors (green, earth tones).
Animations powered by GSAP.

## Available Languages

- Nepali (Primary)
- English

## Scripts

### Backend (server/package.json)
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push"
  }
}
```

### Frontend (client/package.json)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

## Future Enhancements

- Full AI image-based disease detection
- Marketplace payment integration (eSewa, Khalti)
- Offline support (PWA)
- Voice input in Nepali
- Advanced analytics dashboard for farmers

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

Made with ❤️ for Nepali Farmers
