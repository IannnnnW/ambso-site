# AMBSO Website

The official website for African Medical and Behavioral Sciences Organization (AMBSO) - Transforming Africa through innovative research, training and service provision.

## Overview

This is a modern, responsive website built with Next.js 16 and Tailwind CSS, designed to showcase AMBSO's mission, programs, research initiatives, and impact across Africa.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **CMS**: Sanity (Headless CMS)
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Features

- Responsive design optimized for all devices
- Modern, accessible UI components
- Integration with Sanity CMS for content management
- Dynamic hero carousel
- Animated impact statistics
- News and blog section
- Partner showcase
- Multi-level navigation with dropdown menus
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Sanity project setup (optional for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ambso-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Sanity project credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
ambso-site/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with header/footer
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Site footer
│   ├── sections/            # Homepage sections
│   │   ├── Hero.tsx         # Hero carousel
│   │   ├── Mission.tsx      # Mission/Vision/Values
│   │   ├── Programs.tsx     # Programs showcase
│   │   ├── Impact.tsx       # Impact statistics
│   │   ├── News.tsx         # Latest news
│   │   ├── Partners.tsx     # Partner logos
│   │   └── CTA.tsx          # Call-to-action
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Container.tsx
├── lib/
│   └── sanity.client.ts     # Sanity client configuration
└── public/
    └── images/              # Static images

```

## Design System

### Brand Colors

- **Primary**: #002866 (Deep Blue)
- **Primary Dark**: #001a40
- **Primary Light**: #003d99
- **Accent**: #BCD640 (Green)
- **Accent Orange**: #FA8F05

### Components

The project includes reusable components:
- `Button` - Primary, secondary, and outline variants
- `Card` - Content cards with hover effects
- `Container` - Max-width container for content
- `Header` - Responsive navigation with dropdowns
- `Footer` - Site footer with links and contact info

## Sanity CMS Integration

The website is designed to work with Sanity as a headless CMS. To connect your Sanity project:

1. Set up your Sanity project at [sanity.io](https://www.sanity.io/)
2. Add the project ID to `.env.local`
3. Create schemas in Sanity for:
   - Pages
   - News/Blog posts
   - Programs
   - Team members
   - Partners

## Development

### Adding New Pages

Create new route files in the `app` directory:
```bash
app/
├── about/
│   └── page.tsx
├── programs/
│   └── page.tsx
```

### Adding New Sections

Create section components in `components/sections/`:
```tsx
// components/sections/NewSection.tsx
import Container from '../ui/Container';

export default function NewSection() {
  return (
    <section className="py-20">
      <Container>
        {/* Section content */}
      </Container>
    </section>
  );
}
```

## Build and Deploy

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Contributing

This project is maintained for AMBSO. For contributions or issues, please contact the development team.

## License

Copyright © 2024 AMBSO. All rights reserved.
