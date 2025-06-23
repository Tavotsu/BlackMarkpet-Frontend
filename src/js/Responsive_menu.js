// Funcionalidad del menú móvil
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
// Funcionalidad para cambiar el tema (claro/oscuro)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
// Función para cambiar el estado de los iconos
    function toggleIcons() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');
    }
// Chequear el tema guardado en localStorage o el preferido por el sistema
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }
    themeToggleBtn.addEventListener('click', function() {
        toggleIcons();
        // si el tema actual es claro, lo cambiamos a oscuro
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });