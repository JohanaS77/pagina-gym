// __tests__/formulario.integration.test.js

/**
 * PRUEBAS DE INTEGRACIÓN
 * Simulan el comportamiento completo del formulario de cliente
 */

// Configurar el DOM simulado
document.body.innerHTML = `
    <form id="formularioCliente">
        <input type="text" id="nombre" />
        <input type="email" id="correo" />
        <input type="checkbox" name="dias[]" value="Lunes" />
        <input type="checkbox" name="dias[]" value="Martes" />
        <input type="checkbox" name="dias[]" value="Miércoles" />
    </form>
`;

const { validarEmail, validarNombre, validarDias } = require('../js/validaciones');

describe('Pruebas de Integración del Formulario Cliente', () => {
    
    let formulario, inputNombre, inputCorreo, checkboxes;

    beforeEach(() => {
        // Resetear el formulario antes de cada prueba
        formulario = document.getElementById('formularioCliente');
        inputNombre = document.getElementById('nombre');
        inputCorreo = document.getElementById('correo');
        checkboxes = document.querySelectorAll('input[name="dias[]"]');
        
        // Limpiar valores
        inputNombre.value = '';
        inputCorreo.value = '';
        checkboxes.forEach(cb => cb.checked = false);
    });

    test('Debe validar correctamente un formulario completo válido', () => {
        // Simular datos válidos
        inputNombre.value = 'Carlos Arias';
        inputCorreo.value = 'carlos@goldengym.com';
        checkboxes[0].checked = true; // Lunes
        checkboxes[1].checked = true; // Martes

        const nombreValido = validarNombre(inputNombre.value.trim());
        const emailValido = validarEmail(inputCorreo.value.trim());
        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(nombreValido).toBe(true);
        expect(emailValido).toBe(true);
        expect(diasValidos).toBe(true);
    });

    test('Debe rechazar formulario con nombre inválido', () => {
        inputNombre.value = 'A'; // Solo 1 carácter
        inputCorreo.value = 'carlos@goldengym.com';
        checkboxes[0].checked = true;

        const nombreValido = validarNombre(inputNombre.value.trim());
        const emailValido = validarEmail(inputCorreo.value.trim());
        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(nombreValido).toBe(false);
        expect(emailValido).toBe(true);
        expect(diasValidos).toBe(true);
    });

    test('Debe rechazar formulario con email inválido', () => {
        inputNombre.value = 'Carlos Arias';
        inputCorreo.value = 'correo-invalido'; // Sin @
        checkboxes[0].checked = true;

        const nombreValido = validarNombre(inputNombre.value.trim());
        const emailValido = validarEmail(inputCorreo.value.trim());
        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(nombreValido).toBe(true);
        expect(emailValido).toBe(false);
        expect(diasValidos).toBe(true);
    });

    test('Debe rechazar formulario sin días seleccionados', () => {
        inputNombre.value = 'Carlos Arias';
        inputCorreo.value = 'carlos@goldengym.com';
        // No se marca ningún checkbox

        const nombreValido = validarNombre(inputNombre.value.trim());
        const emailValido = validarEmail(inputCorreo.value.trim());
        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(nombreValido).toBe(true);
        expect(emailValido).toBe(true);
        expect(diasValidos).toBe(false);
    });

    test('Debe rechazar formulario con múltiples campos inválidos', () => {
        inputNombre.value = ''; // Vacío
        inputCorreo.value = 'correo@'; // Sin dominio
        // Sin días seleccionados

        const nombreValido = validarNombre(inputNombre.value.trim());
        const emailValido = validarEmail(inputCorreo.value.trim());
        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(nombreValido).toBe(false);
        expect(emailValido).toBe(false);
        expect(diasValidos).toBe(false);
    });

    test('Debe manejar espacios en blanco en nombre', () => {
        inputNombre.value = '  Carlos Arias  '; // Con espacios
        inputCorreo.value = 'carlos@goldengym.com';
        checkboxes[0].checked = true;

        const nombreValido = validarNombre(inputNombre.value.trim());
        const emailValido = validarEmail(inputCorreo.value.trim());
        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(nombreValido).toBe(true);
        expect(emailValido).toBe(true);
        expect(diasValidos).toBe(true);
    });

    test('Debe validar selección de todos los días', () => {
        inputNombre.value = 'Carlos Arias';
        inputCorreo.value = 'carlos@goldengym.com';
        checkboxes.forEach(cb => cb.checked = true); // Todos los días

        const diasSeleccionados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const diasValidos = validarDias(diasSeleccionados);

        expect(diasSeleccionados).toBe(3);
        expect(diasValidos).toBe(true);
    });

    test('Debe validar emails con diferentes dominios', () => {
        const emails = [
            'test@gmail.com',
            'usuario@hotmail.com',
            'info@goldengym.co',
            'contacto@empresa.com.co'
        ];

        emails.forEach(email => {
            expect(validarEmail(email)).toBe(true);
        });
    });
});