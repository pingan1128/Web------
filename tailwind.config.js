/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false, // 禁用 Tailwind 的基础样式重置，以避免与 Arco Design 冲突
  },
  theme: {
    extend: {
      colors: {
        // 可以在这里添加自定义颜色
      },
    },
  },
  plugins: [],
}; 