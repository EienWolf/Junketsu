import type { Config } from 'tailwindcss';
module.exports = {
  theme: {
    screens: {
      xs: '448px',
    },
  },
};
export default {
  plugins: [require('tailwindcss-primeui')],
} satisfies Config;
