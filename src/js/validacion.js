document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm'); // Formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita envío tradicional del formulario
            if (validateForm()) { // Valida campos antes de continuar
                showSuccessMessage(); // Muestra mensaje de éxito
                // Resetea el formulario después de 3 segundos
                setTimeout(() => {
                   contactForm.reset();
                   hideAllMessages(); // Oculta mensajes de error y éxito
                }, 3000);
            }
        });
    }
});

function validateForm() {
    hideAllMessages(); // Limpia mensajes previos
    const isNameValid = validateName(); // Valida campo nombre
    const isEmailValid = validateEmail(); // Valida campo email
    const isMessageValid = validateMessage(); // Valida campo mensaje
    return isNameValid && isEmailValid && isMessageValid; // Retorna si todo es válido
}

function validateName() {
    const name = document.getElementById('name').value.trim(); // Valor del campo nombre
    if (name === '') {
        showError('nameError', 'Por favor, ingresa tu nombre.'); // Muestra error si vacío
        return false;
    }
    return true;
}

function validateEmail() {
    const email = document.getElementById('email').value.trim(); // Valor del campo email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    if (!emailRegex.test(email)) {
        showError('emailError', 'Por favor, ingresa un correo válido.'); // Error si no válido
        return false;
    }
    return true;
}

function validateMessage() {
    const message = document.getElementById('message').value.trim(); // Valor del campo mensaje
    if (message === '') {
        showError('messageError', 'El mensaje no puede estar vacío.'); // Error si vacío
        return false;
    }
    return true;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId); // Elemento para mostrar error
    errorElement.textContent = message; // Texto del mensaje de error
    errorElement.classList.remove('hidden'); // Muestra el mensaje
}

function showSuccessMessage() {
    const successElement = document.getElementById('successMessage'); // Elemento mensaje éxito
    successElement.classList.remove('hidden'); // Muestra mensaje de éxito
    successElement.classList.add('text-white'); // Cambia color del texto a blanco
}

function hideAllMessages() {
    // Oculta todos los mensajes de error y éxito
    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('messageError').classList.add('hidden');
    const successElement = document.getElementById('successMessage');
    successElement.classList.add('hidden');
    successElement.classList.remove('text-white'); // Quita color blanco al ocultar
}
