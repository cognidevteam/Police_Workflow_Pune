# Police Recruitment Dashboard - PE&MT System

## Project Overview
This is a **Police Recruitment Dashboard** for the Office of the Commissioner of Police, Pune City. It manages the Prison Constable (West Region) Recruitment 22-23 Physical Endurance & Measurement Test (PE&MT) process.

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **UI Components**: shadcn-ui (Radix UI components)
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.30.1
- **Form Management**: React Hook Form 7.61.1
- **State Management**: TanStack Query 5.83.0

## Key Features
1. **PST Entry**: Physical Standard Test measurements (height, chest measurements)
2. **Basic Details**: Document verification and candidate information
3. **BIB Counter**: Generate and manage BIB numbers for candidates
4. **Data Entry**: Record running times and shot put performance data
5. **Reports**: Generate PDF reports for qualified, disqualified, and annual summaries

## Development Setup

### Running the Application
The application runs on port 5000 using Vite's development server:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn-ui component library
│   ├── AnimatedBackground.tsx
│   ├── CandidateDetailsCard.tsx
│   ├── DashboardHeader.tsx
│   └── DashboardSidebar.tsx
├── pages/
│   ├── Landing.tsx      # Landing page with recruitment info
│   ├── DashboardLayout.tsx  # Main dashboard layout
│   ├── DashboardHome.tsx    # Dashboard home with workflow cards
│   ├── PSTEntry.tsx         # Physical Standard Test entry
│   ├── BasicDetails.tsx     # Document verification
│   ├── BIBCounter.tsx       # BIB number management
│   ├── DataEntry.tsx        # Performance data entry
│   └── Reports.tsx          # Report generation
├── utils/
│   └── pdfGenerator.ts  # PDF generation utilities
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── App.tsx              # Main app with routing

```

## Deployment Configuration
- **Type**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npm run preview`

## Recent Changes
- **2025-11-07**: Initial Replit setup
  - Configured Vite to run on port 5000 with host 0.0.0.0
  - Set up workflow for development server
  - Configured deployment for autoscale
  - Installed all dependencies
