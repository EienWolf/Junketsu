import { Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5", // Azul principal
        secondary: "#FFC107", // Amarillo secundario
        background: "#F5F5F5", // Fondo claro
        surface: "#FFFFFF", // Superficies tipo tarjetas
        text: "#212121", // Texto principal
        textSecondary: "#757575", // Texto secundario
        error: "#D32F2F", // Rojo para errores
        success: "#388E3C", // Verde para éxito
        warning: "#FFA000", // Amarillo para advertencias
        info: "#1976D2", // Azul para información
        border: "#BDBDBD", // Color de bordes sutiles
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;