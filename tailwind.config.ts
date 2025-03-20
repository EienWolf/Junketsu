import type { Config } from 'tailwindcss';
import tailwindcssPrimeUI from 'tailwindcss-primeui';

export default {
  theme: {
    screens: {
      xs: '448px',
    },
  },
  plugins: [tailwindcssPrimeUI],
} satisfies Config;
