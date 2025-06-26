document.addEventListener('DOMContentLoaded', () => {
    const datoGatoEl = document.getElementById('dato-gato');
    const otroDatoBtn = document.getElementById('otro-dato-btn');
    const seccionDatos = document.getElementById('dato-curioso-section');

    const API_URL = 'https://meowfacts.herokuapp.com/?lang=esp';

    async function obtenerDatoGato() {
        if (!datoGatoEl) return; 

        datoGatoEl.textContent = 'Buscando un dato interesante...';
        datoGatoEl.classList.add('animate-pulse');

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('No se pudo obtener una respuesta de la API');
            }
            const data = await response.json();
            const dato = data.data[0]; // La API devuelve un array con un solo elemento
            
            datoGatoEl.textContent = dato;

        } catch (error) {
            console.error("Error al obtener el dato del gato:", error);
            datoGatoEl.textContent = 'No pudimos encontrar un dato curioso en este momento. ¡Inténtalo de nuevo!';
        } finally {
            datoGatoEl.classList.remove('animate-pulse');
        }
    }

    // Cargar un dato al iniciar la página
    if(seccionDatos) {
        obtenerDatoGato();
    }
    

    // Asignar evento al botón
    if (otroDatoBtn) {
        otroDatoBtn.addEventListener('click', obtenerDatoGato);
    }
});