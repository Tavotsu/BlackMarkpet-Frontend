document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            if (validateForm()) {
                showSuccessMessage();
                //Resetear el formulario después de un momento.
                setTimeout(() => {
                   contactForm.reset();
                   hideAllMessages();
                }, 3000);
            }
        });
    }
});


function validateForm() {
    // Esconde mensajes de error/éxito previos antes de una nueva validación
    hideAllMessages();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    return isNameValid && isEmailValid && isMessageValid;
}


function validateName() {
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('nameError', 'Por favor, ingresa tu nombre.');
        return false;
    }
    return true;
}


function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // para validar email
    if (!emailRegex.test(email)) {
        showError('emailError', 'Por favor, ingresa un correo válido.');
        return false;
    }
    return true;
}


function validateMessage() {
    const message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('messageError', 'El mensaje no puede estar vacío.');
        return false;
    }
    return true;
}


function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}


function showSuccessMessage() {
    const successElement = document.getElementById('successMessage');
    successElement.classList.remove('hidden');
    successElement.classList.add('text-white'); // Cambia el color del texto a blanco
}


function hideAllMessages() {
    document.getElementById('nameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('messageError').classList.add('hidden');
    const successElement = document.getElementById('successMessage');
    successElement.classList.add('hidden');
    successElement.classList.remove('text-white'); // Quita el color blanco al ocultar
}