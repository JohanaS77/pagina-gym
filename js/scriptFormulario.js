// ===== FORMULARIO CLIENTE =====
const formularioCliente = document.querySelector('form');

if (formularioCliente) {
    formularioCliente.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('correo').value.trim();
        const diasSeleccionados = document.querySelectorAll('input[name="dias[]"]:checked').length;
        
        // Validaciones
        if (!nombre || !email || diasSeleccionados === 0) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // Mensaje de éxito
        alert(`¡Felicidades ${nombre}!\n\nTus datos han sido recibidos correctamente.\n\nNos pondremos en contacto contigo pronto para ayudarte en tu entrenamiento.\n\n¡Bienvenido(a) a GOLDEN GYM IBAGUÉ!`);
        
        // Limpiar y cerrar
        formularioCliente.reset();
        setTimeout(() => {
            cerrarModalFormulario();
            window.parent.location.hash = '#inicio';
        }, 500);
    });
}

// Función para cerrar el modal desde el formulario
function cerrarModalFormulario() {
    if (!window.parent) return;
    
    const formularioModal = window.parent.document.getElementById('formularioModal');
    const formularioIframe = window.parent.document.getElementById('formularioIframe');
    
    if (formularioModal) {
        formularioModal.style.display = 'none';
        if (formularioIframe) {
            formularioIframe.src = '';
        }
        window.parent.location.hash = '#inicio';
    }
}