// Espera a que la página cargue por completo
document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registro-form');
    if (!registroForm) return;

    // Escucha el evento de envío del formulario
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = registroForm.nombre.value;
        const email = registroForm.email.value;
        const password = registroForm.password.value;

        // URL del endpoint de registro en tu backend de Java
        const url = 'http://localhost:8080/api/usuarios/registro';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Enviamos los datos del nuevo usuario en el cuerpo de la solicitud
                body: JSON.stringify({
                    nombre: nombre,
                    email: email,
                    password: password
                })
            });

            // Si el usuario se crea correctamente (código 201 Created)
            if (response.status === 201) {
                swal("¡Éxito!", "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.", "success")
                    .then(() => {
                        // Redirigimos al usuario a la página de login
                        window.location.href = 'login.html';
                    });
            } else if (response.status === 409) {
                // Si el correo ya existe (código 409 Conflict)
                swal("Error", "Este correo electrónico ya está registrado.", "error");
            } else {
                // Para cualquier otro error del servidor
                swal("Error", "No se pudo completar el registro. Inténtalo de nuevo.", "error");
            }

        } catch (error) {
            // Si hay un problema para conectarse con el backend
            console.error('Error de conexión:', error);
            swal("Error de Conexión", "No se pudo conectar con el servidor. Revisa si tu backend está funcionando.", "error");
        }
    });
});