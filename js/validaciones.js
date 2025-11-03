// js/validaciones.js

/**
 * Valida si un correo electrónico tiene formato válido
 * @param {string} email - Correo a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida si un nombre está completo (no vacío y tiene al menos 2 caracteres)
 * @param {string} nombre - Nombre a validar
 * @returns {boolean}
 */

function validarNombre(nombre) {
    if (!nombre || typeof nombre !== 'string') {
        return false;
    }
    return nombre.trim().length >= 2;
}

/**
 * Valida si se seleccionó al menos un día
 * @param {number} diasSeleccionados - Cantidad de días seleccionados
 * @returns {boolean}
 */
function validarDias(diasSeleccionados) {
    return diasSeleccionados > 0;
}

// Exportar para las pruebas
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarEmail,
        validarNombre,
        validarDias
    };
}