# Uni Reader

A beautiful, premium iOS reading app built with React Native & Expo. Discover and read a vast library of books with an immersive, distraction-free reader experience.

![Theme](https://img.shields.io/badge/theme-light-F5F5F7)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Web-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Curated Library** — Browse trending, recommended, and categorized books
- **Immersive Reader** — Clean, typography-focused reading experience with chapter navigation
- **Continue Reading** — Pick up exactly where you left off with progress tracking
- **Discover** — Search and filter by genre with a beautiful grid layout
- **Profile & Stats** — Track reading streaks, books finished, and hours read
- **Reader Settings** — Fonts, themes, spacing, margins, alignment, brightness (Apple Books & Kindle inspired)

## Tech Stack

- React Native (Expo)
- React Navigation
- Expo Linear Gradient & Blur
- Reanimated (for smooth interactions)

## Live Demo

Test the web version here: [https://uni-reader.vercel.app](https://uni-reader.vercel.app)

## Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on web
npx expo start --web
```

## Project Structure

```
src/
  screens/        # Main app screens
  components/     # Reusable UI components
  data/           # Mock book data & catalog
  constants/      # Theme, colors, typography
  context/        # App state & reading progress
  navigation/     # Stack & tab navigators
```

## Roadmap

- [ ] Pro plan with unlimited offline downloads
- [ ] Audiobook mode
- [ ] Social features (book clubs, reviews)
- [ ] AI-powered recommendations

---

Built with taste. Read without limits.
