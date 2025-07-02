// Espera a que la página cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    // Escucha el evento de envío del formulario
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        // La URL de tu propio backend para iniciar sesión
        const url = 'https://blackmarkpet-backend-production.up.railway.app/api/usuarios/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Envia el correo y la contraseña en el cuerpo de la solicitud
                body: JSON.stringify({ email: email, password: password })
            });

            // Si la respuesta es exitosa
            if (response.ok) {
                const usuario = await response.json();

                // Guardamos los datos del usuario en localStorage para usarlo en otras partes
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

                swal("¡Bienvenido!", "Has iniciado sesión correctamente.", "success")
                    .then(() => {
                        // Comprueba si el email del usuario es el del administrador.
                        if (usuario.email === 'admin@correo.com') {
                            // Si es admin, lo manda a admin.html
                            window.location.href = 'admin.html';
                        } else {
                            // Si es cualquier otro usuario, lo mandamos a index.html
                            window.location.href = 'index.html';
                        }
                    });
            } else {
                // Si las credenciales son incorrectas o hay otro error
                swal("Error", "El correo o la contraseña son incorrectos.", "error");
            }

        } catch (error) {
            // Si hay un problema para conectarse con el backend
            console.error('Error de conexión:', error);
            swal("Error de Conexión", "No se pudo conectar con el servidor.", "error");
        }
    });
});