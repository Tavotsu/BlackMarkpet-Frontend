document.addEventListener('DOMContentLoaded', () => {
    const datoGatoEl = document.getElementById('dato-gato'); // Elemento donde se mostrará el dato curioso
    const otroDatoBtn = document.getElementById('otro-dato-btn'); // Botón para solicitar otro dato
    const seccionDatos = document.getElementById('dato-curioso-section'); // Sección que contiene el dato curioso

    const API_URL = 'https://meowfacts.herokuapp.com/?lang=esp'; // URL de la API para obtener datos de gatos en español

    async function obtenerDatoGato() {
        if (!datoGatoEl) return; // Verifica que el elemento exista

        datoGatoEl.textContent = 'Buscando un dato interesante...'; // Mensaje mientras se carga el dato
        datoGatoEl.classList.add('animate-pulse'); // Animación para indicar carga

        try {
            const response = await fetch(API_URL); // Solicita dato a la API
            if (!response.ok) {
                throw new Error('No se pudo obtener una respuesta de la API'); // Manejo de error si falla la respuesta
            }
            const data = await response.json();
            const dato = data.data[0]; // Extrae el dato curioso (primer elemento del array)
            
            datoGatoEl.textContent = dato; // Muestra el dato en la página

        } catch (error) {
            console.error("Error al obtener el dato del gato:", error);
            datoGatoEl.textContent = 'No pudimos encontrar un dato curioso en este momento. ¡Inténtalo de nuevo!'; // Mensaje de error visible para el usuario
        } finally {
            datoGatoEl.classList.remove('animate-pulse'); // Quita la animación de carga
        }
    }

    // Carga un dato curioso automáticamente al cargar la página
    if(seccionDatos) {
        obtenerDatoGato();
    }
    
    // Asigna evento para pedir otro dato al hacer clic en el botón
    if (otroDatoBtn) {
        otroDatoBtn.addEventListener('click', obtenerDatoGato);
    }
});
