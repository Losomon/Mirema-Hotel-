/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // Astro's Tailwind integration should handle Tailwind/PostCSS setup.
    // Keep only autoprefixer to avoid Tailwind loading as a PostCSS plugin.
    autoprefixer: {},
  },
};


