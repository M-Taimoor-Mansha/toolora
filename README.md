# Toolora

**Free Online Tools for Everyone**

A growing collection of fast, practical, and privacy-conscious online tools for developers, students, writers, marketers, designers, and creators.

**Website:** [Visit Toolora](https://toolora-green.vercel.app)  
**Repository:** [GitHub Repository](https://github.com/M-Taimoor-Mansha/toolora)

---

## About Toolora

**Toolora** is an all-in-one collection of free online tools designed to make everyday digital tasks faster, easier, and more accessible.

Whether you need to format JSON, convert text, calculate percentages, compress images, generate passwords, work with PDFs, or perform other everyday tasks, Toolora brings useful utilities together in one convenient platform.

Instead of installing multiple applications, creating accounts, or navigating complicated software, users can access practical tools directly through their web browser.

### Our Philosophy

Toolora is built around four core principles:

- **Accessibility:** Essential online utilities should be easy to find and use.
- **Simplicity:** Every tool should have a clear purpose and straightforward interface.
- **Privacy:** User-provided text and files should be processed locally whenever the implementation supports it.
- **Performance:** Tools should be fast, responsive, and accessible across modern devices.

### Key Highlights

- 37 registered tools across 8 categories.
- Free-to-access online utility platform.
- No account registration required for normal tool usage.
- Responsive interface for desktop, tablet, and mobile devices.
- Light and dark themes.
- Searchable tool directory.
- Category-based browsing and filtering.
- Featured and popular tool collections.
- Individual pages for every tool.
- Copy, download, and export functionality where supported.
- Search-engine-friendly page metadata.
- Centralized architecture for integrating additional tools.

---

## Available Tools

Toolora currently contains 37 registered tools organized into eight categories.

### 1. Developer Tools

Utilities designed for developers, programmers, and people working with structured data.

| Tool | Description |
|---|---|
| JSON Formatter | Format and beautify JSON with configurable indentation. |
| JSON Validator | Validate JSON syntax and identify errors. |
| JSON Minifier | Remove unnecessary whitespace from JSON. |
| Base64 Encoder | Encode text into Base64 format. |
| Base64 Decoder | Decode Base64 strings into readable text. |
| URL Encoder | Encode text for safe URL usage. |
| URL Decoder | Decode URL-encoded strings. |
| UUID Generator | Generate unique UUID identifiers. |
| JWT Decoder | Decode JSON Web Tokens and inspect their contents. |
| Hash Generator | Generate MD5, SHA-256, and SHA-512 hashes. |
| Timestamp Converter | Convert Unix timestamps into readable dates and vice versa. |
| JSON to CSV | Convert JSON arrays into CSV files. |
| Color Converter | Convert between HEX, RGB, HSL, and HSV color formats. |
| Time Zone Converter | Convert dates and times between time zones. |
| Number to Words | Convert numerical values into written English words. |

### 2. Text Tools

Text utilities for writers, students, content creators, and everyday users.

| Tool | Description |
|---|---|
| Word Counter | Count words, characters, sentences, and paragraphs, with reading-time estimates. |
| Character Counter | Count total characters and characters excluding spaces or line breaks. |
| Sentence Counter | Count sentences and calculate average sentence length. |
| Paragraph Counter | Count meaningful paragraphs, words, and characters. |
| Case Converter | Convert text into uppercase, lowercase, title case, sentence case, and inverse case. |
| Remove Duplicate Lines | Remove repeated lines while preserving their original order. |
| Remove Extra Spaces | Clean unnecessary spaces and whitespace. |
| Text Sorter | Sort text lines alphabetically or numerically. |
| Text Reverser | Reverse text, individual lines, or word order. |
| Slug Generator | Generate clean, URL-friendly slugs from text. |

### 3. Image Tools

Browser-based image utilities for everyday image processing.

| Tool | Description |
|---|---|
| Image Compressor | Compress images with adjustable quality, output format, and dimensions. |
| Image Resizer | Resize images using custom dimensions or percentage scaling. |
| Image to Base64 | Convert images into Base64 strings, Data URIs, CSS, or HTML output. |

### 4. PDF Tools

| Tool | Description |
|---|---|
| PDF to Word | Extract text from PDF documents and convert it into editable Word documents (.docx). |

**PDF conversion note:** The current implementation extracts selectable PDF text. Scanned image-only PDFs require OCR before conversion. Complex original page layouts may not be preserved.

### 5. Calculators

| Tool | Description |
|---|---|
| Unit Converter | Convert between units covering length, weight, temperature, volume, area, speed, and time. |
| BMI Calculator | Calculate Body Mass Index and view the corresponding weight category. |
| Percentage Calculator | Calculate percentages, percentage increases and decreases, and related percentage problems. |
| Age Calculator | Calculate age in years, months, and days, with additional time breakdowns. |

### 6. Converters

This category is available in the category structure for future conversion utilities. Existing conversion-related tools are currently organized under their relevant functional categories.

### 7. SEO Tools

This category is available in the category structure for future SEO utilities.

### 8. Generators

| Tool | Description |
|---|---|
| Lorem Ipsum Generator | Generate placeholder text with configurable paragraphs and sentences. |
| Random Number Generator | Generate random numbers with configurable ranges, duplicates, decimals, and sorting options. |
| QR Code Generator | Generate QR codes for links, Wi-Fi credentials, and text, with downloadable PNG output. |
| Password Generator | Generate random passwords with configurable length, character types, and complexity. |

---

## Technology Stack

Toolora uses a modern frontend technology stack focused on performance, maintainability, and a clean development experience.

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and routing |
| React 19 | User interface development |
| TypeScript 5.9 | Static typing and safer development |
| Tailwind CSS 4 | Utility-first styling |
| PostCSS | CSS processing |
| ESLint 9 | Code quality and linting |
| PDF.js | PDF document processing and text extraction |
| Mammoth | Word document processing support |
| FileSaver.js | Client-side file downloads |
| QRCode | QR code generation |
| SparkMD5 | MD5 hashing |
| Vercel | Deployment and hosting |

### Development Tools

- Node.js
- npm
- Git
- GitHub
- Visual Studio Code

---

## Project Architecture

Toolora uses the Next.js App Router architecture.

The application separates tool metadata, reusable components, individual tool implementations, and shared utilities.

### Project Structure

```text
toolora/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   │
│   │   ├── tools/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── categories/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── terms/
│   │   │
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── icons/
│   │   ├── layout/
│   │   ├── theme/
│   │   ├── tools/
│   │   │   ├── dev/
│   │   │   ├── text/
│   │   │   ├── image/
│   │   │   ├── pdf/
│   │   │   ├── calculators/
│   │   │   └── generators/
│   │   │
│   │   └── ui/
│   │
│   ├── data/
│   │   ├── categories.ts
│   │   ├── tools.ts
│   │   ├── types.ts
│   │   └── tool-content.ts
│   │
│   └── lib/
│       ├── tools.ts
│       ├── site.ts
│       ├── cn.ts
│       └── ...
│
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

*The structure above illustrates the main application architecture. Some directories and files may contain additional nested modules.*

### Important Architecture Components

**Tool Registry**

`src/components/tools/registry.ts`

Maps tool slugs to their corresponding React components. This allows the application to load the appropriate implementation for each individual tool.

**Tool Metadata**

`src/data/tools.ts`

Contains the centralized tool directory, including:

- Tool ID
- Name
- URL slug
- Description
- Category
- Icon
- Search keywords
- Featured status
- Popular status
- Implementation status

**Category Configuration**

`src/data/categories.ts`

Defines the eight tool categories and their metadata.

**Tool Utilities**

`src/lib/tools.ts`

Provides reusable functions for:

- Retrieving all tools.
- Finding tools by slug.
- Retrieving tools by category.
- Calculating category tool counts.
- Retrieving featured tools.
- Retrieving popular tools.
- Searching tool names, descriptions, and keywords.
- Finding related tools.

**Site Configuration**

`src/lib/site.ts`

Centralizes the site name, tagline, description, public URL configuration, and theme storage key.

---

## Getting Started

Follow these instructions to run Toolora locally.

### Prerequisites

Make sure you have installed:

- Node.js, preferably a current supported LTS release.
- npm.
- Git.

### 1. Clone the Repository

```bash
git clone https://github.com/M-Taimoor-Mansha/toolora.git
```

### 2. Navigate to the Project

```bash
cd toolora
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open Toolora

Visit:

```text
http://localhost:3000
```

The development server uses Next.js with Webpack.

---

## Available Scripts

The following scripts are defined in `package.json`.

| Command | Description |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server. |
| `npm run lint` | Run ESLint checks. |
| `npm run typecheck` | Run TypeScript type checking. |

### Production Build

Generate a production build:

```bash
npm run build
```

Run the production application:

```bash
npm run start
```

### Code Quality Checks

Run linting:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npm run typecheck
```

---

## Adding a New Tool

Toolora uses a centralized architecture that makes adding new utilities straightforward.

### Step 1: Define the Tool

Open:

```text
src/data/tools.ts
```

Add a new tool entry following the existing `Tool` interface.

Example:

```typescript
{
  id: "tool-example",
  name: "Example Tool",
  slug: "example-tool",
  description: "A description of what this tool does.",
  category: "developer-tools",
  icon: "code",
  keywords: [
    "example",
    "example tool",
    "online utility"
  ],
  featured: false,
  popular: false,
  status: "live",
}
```

### Step 2: Implement the Component

Create the corresponding React component inside the appropriate directory.

For example:

```text
src/components/tools/dev/ExampleTool.tsx
```

### Step 3: Register the Component

Open:

```text
src/components/tools/registry.ts
```

Import the component:

```typescript
import { ExampleTool } from "./dev/ExampleTool";
```

Register it using its URL slug:

```typescript
"example-tool": ExampleTool,
```

### Step 4: Verify the Implementation

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Confirm that the tool:

- Appears in the tool directory.
- Appears in the correct category.
- Opens through its individual URL.
- Works correctly on desktop and mobile.
- Handles invalid input appropriately.
- Provides useful error messages.
- Supports the intended copy or download functionality.

---

## User Interface and Experience

Toolora is designed with a modern, responsive interface.

### Visual Design

- Clean, minimal interface.
- Teal-based brand color palette.
- Carefully structured typography.
- Consistent spacing and reusable UI components.
- Subtle animations and transitions.
- Responsive layouts.

### Light and Dark Themes

Toolora supports light and dark modes.

The theme system includes:

- Light theme.
- Dark theme.
- System preference detection.
- Persistent theme selection using browser local storage.
- Early theme initialization to minimize flashes of incorrect theme during page loading.

### Responsive Design

The application is designed to adapt to:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile phones.

### Navigation

Users can discover tools through:

- Main navigation.
- Category dropdown.
- Search functionality.
- Popular tools.
- Featured tools.
- Individual category pages.
- Related tool recommendations.

---

## Privacy and Security

Privacy is an important part of Toolora's design.

Many utilities operate directly inside the browser, reducing the need to transmit user-provided content to application servers.

### Local Processing

Where supported by the individual implementation:

- Text is processed locally.
- JSON transformations happen in the browser.
- Image operations use browser capabilities.
- Password generation uses the Web Crypto API.
- User-selected files are handled by browser-side processing libraries.

### Third-Party Services

The website also integrates third-party services, including:

- **Google AdSense:** Advertising.
- **Google Analytics 4:** Website analytics.
- **Google Fonts:** Typography.
- **CDN-hosted PDF.js worker:** PDF processing.

These services may involve external network requests and their own data-handling practices.

### Security Measures

The application includes security-related HTTP headers configured in `next.config.ts`, including:

- Content Security Policy.
- Strict-Transport-Security.
- X-Content-Type-Options.
- X-Frame-Options.
- Referrer-Policy.
- Permissions-Policy.

Toolora does not require a user account for ordinary tool access.

For more information, see the [Privacy Policy](https://toolora-green.vercel.app/privacy).

---

## SEO and Discoverability

Toolora includes several search-engine optimization features.

### Metadata

Individual pages can define their own:

- Page titles.
- Meta descriptions.
- Keywords.

### Dynamic Tool Pages

Each tool has its own URL.

Examples:

```text
/tools/json-formatter
/tools/word-counter
/tools/image-compressor
/tools/password-generator
```

### Sitemap

The application generates a sitemap containing:

- Homepage.
- Tool directory.
- Category pages.
- Individual tool pages.
- Static informational pages.

### Robots.txt

The robots configuration allows general crawling while disallowing `/api/` paths.

### Structured Content

The centralized tool metadata makes it easier to maintain consistent descriptions and search keywords across the platform.

---

## Deployment

Toolora is deployed using Vercel.

**Live Website:** [https://toolora-green.vercel.app](https://toolora-green.vercel.app)

### Deployment Workflow

1. Push changes to the GitHub repository.
2. Ensure the production branch is connected to Vercel.
3. Vercel builds the Next.js application.
4. The production deployment becomes available when the build succeeds.

For deployment, the standard build command is:

```bash
npm run build
```

The project uses Next.js and can be deployed through Vercel's Next.js integration.

---

## Contributing

Contributions, suggestions, and improvements are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Run linting and type checks.
5. Verify the production build.
6. Submit a pull request with a clear description of your changes.

### Contribution Guidelines

Please try to:

- Follow the existing project architecture.
- Use TypeScript for new components.
- Reuse existing UI components.
- Maintain responsive layouts.
- Follow accessibility best practices.
- Handle errors and invalid inputs.
- Avoid unnecessary dependencies.
- Preserve browser-side processing wherever practical.
- Keep documentation updated.

---

## Roadmap

Toolora is designed to grow into a comprehensive collection of online utilities.

Potential areas of future development include:

- More developer utilities.
- Additional text processing tools.
- Advanced PDF operations.
- Additional image processing utilities.
- More calculators and converters.
- SEO and website analysis tools.
- Additional content generators.
- Performance and accessibility improvements.
- Expanded documentation.

The roadmap is indicative, not a commitment that every listed feature is already implemented.

---

## Legal

- [Privacy Policy](https://toolora-green.vercel.app/privacy)
- [Terms of Service](https://toolora-green.vercel.app/terms)
- [About Toolora](https://toolora-green.vercel.app/about)
- [Contact](https://toolora-green.vercel.app/contact)

---

## Contact

For feedback, bug reports, suggestions, or collaboration:

**Email:** [taimoorc067@gmail.com](mailto:taimoorc067@gmail.com)

**GitHub:** [M-Taimoor-Mansha](https://github.com/M-Taimoor-Mansha)

**Website:** [Toolora](https://toolora-green.vercel.app)

---

## License

No explicit open-source license was identified in the repository configuration during this review.

Unless a license is added to the repository, the source code should not be assumed to be available for unrestricted reuse, redistribution, or modification.

---

**Toolora**

*Free Online Tools for Everyone.*

*Built to make everyday digital tasks simpler.*
