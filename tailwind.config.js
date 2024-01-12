module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // Opciones: 'media' para detectar automáticamente el modo oscuro, 'class' para usar una clase de CSS, 'false' para desactivar el modo oscuro
  theme: {
    extend: {
      colors: {
        // Ejemplo de extensión del tema con colores personalizados
        primary: '#123456',
        secondary: '#789abc',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
