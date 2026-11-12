# Chamindu Aloka — Professional Portfolio

A responsive personal portfolio for Chamindu Aloka, an IT undergraduate at SLIIT in Matara, Sri Lanka. The site presents confirmed education and career interests while leaving skills, projects, social links, and credentials unpublished until their details are verified.

## Technologies

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React
- CSS custom properties for themes and responsive styling

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Installation

```bash
git clone https://github.com/chamindualoka224-spec/chamindu-portfolio.git
cd chamindu-portfolio
npm ci
```

## Development

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The optimized static site is written to `dist/`.

## Personalizing the site

Update `src/profile.ts` with the confirmed GitHub username, LinkedIn URL, professional email, and CV file path. Add the CV under `public/` and set `resumePath` to its public path (for example, `/Chamindu-Aloka-CV.pdf`). Add skill levels and verified project details in `src/App.tsx` when those details are ready to publish. Project cards should link directly to their source repositories and live demos where available.

The site fetches up to six recent public repositories from the GitHub API when `githubUsername` is set. It does not require a backend or GitHub token.

## Theme and accessibility

The theme toggle stores the selected mode in local storage. Navigation is keyboard accessible, external links open in a new tab with `rel="noreferrer"`, and reduced-motion preferences are respected.

## Deployment

The included GitHub Actions workflow builds the site and publishes `dist/` to GitHub Pages when changes are pushed to `main`. In the repository settings, select **Pages → Build and deployment → GitHub Actions**. After the first successful workflow run, GitHub Pages will display the published site URL in those settings.

## Repository

Repository name: `chamindu-portfolio`  
Description: `My Personal Professional Developer Portfolio Website.`

