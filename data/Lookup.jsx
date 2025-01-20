import dedent from "dedent";

export default {
  SUGGSTIONS: ['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Managment Portal Dashboard', 'Create Quizz App On History', 'Create Login Signup Screen'],
  HERO_HEADING: 'Turn Your Ideas Into Reality',
  HERO_DESC: 'Start, customize, and deploy full-stack web applications with ease on Axion.',
  INPUT_PLACEHOLDER: 'What project are you thinking of?',
  SIGNIN_HEADING: 'Continue With Axion',
  SIGNIN_SUBHEADING: 'To use Axion you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By using Axion, you agree to the collection of usage data for analytics.',


  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    },
    '/App.css': {
      code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`
    }
  },
  DEPENDANCY: {

    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    autoprefixer: "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC:'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS:[
    {
      name: 'Basic',
      tokens: '50K',
      value: 50000,
      desc: 'Perfect for individuals or small teams looking to explore Axion with occasional usage for light tasks and experimentation.',
      price: 4.99
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 120000,
      desc: 'Ideal for growing professionals or small businesses that need reliable, frequent access to Axion for regular use.',
      price: 9.99
    },
    {
      name: 'Pro',
      tokens: '2.5M',
      value: 2500000,
      desc: 'Designed for businesses or advanced users requiring robust access to Axion for high-volume usage and mission-critical tasks.',
      price: 19.99
    },
    {
      name: 'Unlimited (License)',
      tokens: 'Unlimited',
      value: 999999999,
      desc: 'Tailored for enterprises and power users who need unrestricted, all-encompassing access to Axion, with a full licensing package for large-scale operations.',
      price: 49.99
    }
  ]
  


}