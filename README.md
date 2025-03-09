# Nextflix

Nextflix is a Netflix clone project built with [Next.js](https://nextjs.org), bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [bun](https://bun.sh/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/umermhr/NEXTFLIX.git
cd nextflix
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env` file in the root of your project and add the following environment variables:

```env
# Example .env file
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=https://api.example.com
```

Make sure to replace `your_api_key_here` and `https://api.example.com` with your actual API key and URL.

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Folder Structure

Here is an overview of the project's folder structure:

```
nextflix/
├── app/
│   ├── components/
│   ├── pages/
│   │   ├── api/
│   │   ├── index.tsx
│   │   └── ...
│   ├── public/
│   ├── styles/
│   ├── .env
│   ├── .gitignore
│   ├── next.config.js
│   ├── package.json
│   └── ...
```

- `app/components/`: Contains reusable React components.
- `app/pages/`: Contains the application's pages. Each file in this directory corresponds to a route in the application.
- `app/pages/api/`: Contains API route handlers.
- `app/public/`: Contains static assets such as images and fonts.
- `app/styles/`: Contains global styles and CSS modules.
- `.env`: Environment variables file (ignored by git).
- `.gitignore`: Specifies files and directories to be ignored by git.
- `next.config.js`: Configuration file for Next.js.
- `package.json`: Contains project metadata and dependencies.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for more details.