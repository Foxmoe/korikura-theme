module.exports = {
  content: ["./src/**/*.{astro,html,js,ts,md,mdx}"],
  plugins: [require("@tailwindcss/typography"),
     require('@tailwindcss/apply'),],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        bg: 'var(--bg)',
        'card-bg': 'var(--card-bg)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
      },
    },
  },
};