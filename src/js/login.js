const SUPABASE_URL = 'https://jscpecyyajfcqsmmovku.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzY3BlY3l5YWpmY3FzbW1vdmt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NDgxNjUsImV4cCI6MjA2NjIyNDE2NX0.iMK7-TRZmQCokoLUtz-eQwFzVFVOSzqP5TA_sfsQNzQ';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            swal("Error", error.message, "error");
        } else {
            swal("¡Bienvenido!", "Has iniciado sesión correctamente.", "success")
                .then(() => {
                    window.location.href = "index.html";
                });
        }
    });
});