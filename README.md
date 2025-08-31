# AI in Medical Imaging - Clarity Scan

> **Built with Firebase Studio** - A Next.js-based AI-powered medical imaging diagnostic application

## 🏥 Project Overview

Clarity Scan is an AI-powered diagnostic suggestions platform for medical imaging, designed to assist medical professionals and researchers in analyzing X-rays, ultrasounds, and other medical images. This project leverages cutting-edge AI technology to provide diagnostic insights with confidence scoring and visual heatmaps.

**Created using Firebase Studio** - This project was bootstrapped and developed using Firebase Studio's Next.js starter template, providing seamless integration with Google Cloud AI services.

## ✨ Key Features

- 🤖 **AI-Powered Diagnosis** - Generate diagnostic suggestions using Google Gemini AI
- 🎯 **Heatmap Visualization** - Visual highlighting of abnormalities in medical images
- 📊 **Confidence Scoring** - AI confidence levels for each diagnostic suggestion
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🌙 **Dark Mode Interface** - Professional medical-grade UI
- 📂 **Scan History** - Track and review previous diagnostic analyses
- ⚡ **Real-time Processing** - Fast image analysis and results

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.3.3 with React 18.3.1
- **AI Framework**: Genkit 1.13.0 with Google AI integration
- **UI Components**: Tailwind CSS + Radix UI (shadcn/ui)
- **Type Safety**: TypeScript with strict mode
- **Build Tool**: Turbopack for fast development
- **Backend**: Firebase integration
- **State Management**: React Hook Form + custom hooks
- **Validation**: Zod schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google AI API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd AI-in-Medical-Imaging
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
   GEMINI_API_KEY=your_google_ai_api_key_here
   GOOGLE_API_KEY=your_google_ai_api_key_here
   ```

4. **Start the development servers**
   
   **Next.js Development Server:**
   ```bash
   npm run dev
   ```
   This starts the web application on `http://localhost:9002`
   
   **Genkit AI Development Server:**
   ```bash
   npm run genkit:dev
   ```
   This starts the AI flow server with developer UI on `http://localhost:4000`

5. **Open the application**
   Navigate to `http://localhost:9002` in your browser

## 📖 Usage

1. **Upload Medical Image**: Drag and drop or select a medical image (X-ray, ultrasound, etc.)
2. **AI Analysis**: The system will automatically process the image using Google Gemini AI
3. **View Results**: Get diagnostic suggestions with confidence scores
4. **Heatmap Visualization**: See highlighted areas of concern on the image
5. **Scan History**: Review previous analyses in the sidebar

## 🏗️ Project Structure

```
src/
├── ai/                     # AI flows and Genkit configuration
│   ├── flows/
│   │   └── generate-diagnosis-suggestions.ts
│   ├── dev.ts             # Genkit development entry
│   └── genkit.ts          # Genkit configuration
├── app/                   # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── clarity-scan-app.tsx   # Main application
│   ├── diagnosis-card.tsx     # Diagnosis display
│   ├── results-panel.tsx      # Results display
│   └── upload-panel.tsx       # Image upload
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript definitions
│   └── utils.ts          # Helper functions
```

## 🧪 Available Scripts

- `npm run dev` - Start Next.js development server (port 9002)
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## 🔧 Development

### Genkit Developer UI

Access the Genkit Developer UI at `http://localhost:4000` to:
- Test AI flows directly
- Debug prompts and responses
- Monitor AI performance
- View telemetry data

### Key Components

- **ClarityScanApp** (`src/components/clarity-scan-app.tsx`) - Main application logic
- **generateDiagnosisSuggestions** (`src/ai/flows/generate-diagnosis-suggestions.ts`) - Core AI flow
- **Upload Panel** - Handles medical image uploads
- **Results Panel** - Displays AI analysis results

## 🚀 Deployment

This project is configured for Firebase deployment:

```bash
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created with Firebase Studio and follows standard open-source practices.

## 🔗 Links

- [Firebase Studio](https://firebase.google.com/products/studio)
- [Genkit Documentation](https://genkit.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google AI Studio](https://makersuite.google.com/)

---

**Note**: This application is built for educational and research purposes. Always consult with qualified medical professionals for actual medical diagnoses.
