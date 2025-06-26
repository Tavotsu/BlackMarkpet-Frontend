document.addEventListener('DOMContentLoaded', () => {
    
    const navLinksContainer = document.getElementById('nav-links');
    const mobileMenuContainer = document.getElementById('mobileMenu');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Estructuras de los menús
    const menuPublico = `
        <ul class="hidden md:flex items-center space-x-10 text-white font-bold text-sm">
            <li><a href="index.html" class="hover:text-orange-500">Inicio</a></li>
            <li><a href="detalles.html" class="hover:text-orange-500">Catálogo</a></li>
            <li><a href="formulario.html" class="hover:text-orange-500">Contacto</a></li>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
            <a href="login.html" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Iniciar Sesión</a>
            <a href="registro.html" class="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Registrarse</a>
        </div>
    `;

    const menuPrivado = (nombreUsuario) => `
        <ul class="hidden md:flex items-center space-x-10 text-white font-bold text-sm">
            <li><a href="index.html" class="hover:text-orange-500">Inicio</a></li>
            <li><a href="detalles.html" class="hover:text-orange-500">Catálogo</a></li>
            <li><a href="formulario.html" class="hover:text-orange-500">Contacto</a></li>
        </ul>
        <div class="hidden md:flex items-center space-x-4">
            <span class="text-white font-bold">Hola, ${nombreUsuario}</span>
            <button id="logout-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cerrar Sesión</button>
        </div>
    `;
    
    const menuMovilPublico = `
        <a href="index.html" class="block text-white hover:text-gray-400">Inicio</a>
        <a href="detalles.html" class="block text-white hover:text-gray-400">Catálogo</a>
        <a href="formulario.html" class="block text-white hover:text-gray-400">Contacto</a>
        <a href="login.html" class="block text-white hover:text-gray-400 mt-2">Iniciar Sesión</a>
        <a href="registro.html" class="block text-white hover:text-gray-400">Registrarse</a>
    `;

    const menuMovilPrivado = (nombreUsuario) => `
        <span class="block text-orange-500 font-bold">Hola, ${nombreUsuario}</span>
        <a href="index.html" class="block text-white hover:text-gray-400">Inicio</a>
        <a href="detalles.html" class="block text-white hover:text-gray-400">Catálogo</a>
        <a href="formulario.html" class="block text-white hover:text-gray-400">Contacto</a>
        <button id="logout-btn-mobile" class="block text-red-500 hover:text-red-400 mt-2">Cerrar Sesión</button>
    `;

    // Lógica para mostrar el menú correspondiente
    if (usuario) {
        navLinksContainer.innerHTML = menuPrivado(usuario.nombre);
        mobileMenuContainer.innerHTML = menuMovilPrivado(usuario.nombre);
    } else {
        navLinksContainer.innerHTML = menuPublico;
        mobileMenuContainer.innerHTML = menuMovilPublico;
    }

    // --- MANEJO DE EVENTOS ---
    
    // Logout
    const logout = () => {
        localStorage.removeItem('usuarioLogueado');
        window.location.href = 'index.html';
    };

    document.getElementById('logout-btn')?.addEventListener('click', logout);
    document.getElementById('logout-btn-mobile')?.addEventListener('click', logout);

    // Formulario de Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/usuarios/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const usuarioLogueado = await response.json();
                    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
                    swal("¡Bienvenido!", `Hola de nuevo, ${usuarioLogueado.nombre}`, "success")
                        .then(() => window.location.href = 'index.html');
                } else {
                    swal("Error", "Email o contraseña incorrectos.", "error");
                }
            } catch (error) {
                swal("Error de Conexión", "No se pudo conectar con el servidor.", "error");
            }
        });
    }

    // Formulario de Registro
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/api/usuarios/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, email, password })
                });

                if (response.status === 201) {
                    swal("¡Éxito!", "Usuario registrado. Ahora puedes iniciar sesión.", "success")
                        .then(() => window.location.href = 'login.html');
                } else if (response.status === 409) {
                    swal("Error", "El correo electrónico ya está registrado.", "error");
                } else {
                    swal("Error", "Ocurrió un problema al registrar el usuario.", "error");
                }
            } catch (error) {
                swal("Error de Conexión", "No se pudo conectar con el servidor.", "error");
            }
        });
    }
});