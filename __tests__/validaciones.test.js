const { validarEmail, validarNombre, validarDias } = require('../js/validaciones');

describe('Pruebas de Validación de Email', () => {
    
    test('Debe aceptar un email válido', () => {
        expect(validarEmail('usuario@correo.com')).toBe(true);
    });

    test('Debe aceptar email con subdominios', () => {
        expect(validarEmail('usuario@correo.ejemplo.com')).toBe(true);
    });

    test('Debe rechazar email sin @', () => {
        expect(validarEmail('usuariocorreo.com')).toBe(false);
    });

    test('Debe rechazar email sin dominio', () => {
        expect(validarEmail('usuario@')).toBe(false);
    });

    test('Debe rechazar email vacío', () => {
        expect(validarEmail('')).toBe(false);
    });

    test('Debe rechazar email con espacios', () => {
        expect(validarEmail('usuario @correo.com')).toBe(false);
    });

    test('Debe rechazar email sin extensión', () => {
        expect(validarEmail('usuario@correo')).toBe(false);
    });
});

describe('Pruebas de Validación de Nombre', () => {
    
    test('Debe aceptar un nombre válido', () => {
        expect(validarNombre('Carlos Arias')).toBe(true);
    });

    test('Debe aceptar nombres con tildes', () => {
        expect(validarNombre('José María')).toBe(true);
    });

    test('Debe aceptar nombres simples', () => {
        expect(validarNombre('Ana')).toBe(true);
    });

    test('Debe rechazar nombre vacío', () => {
        expect(validarNombre('')).toBe(false);
    });

    test('Debe rechazar nombre con solo espacios', () => {
        expect(validarNombre('   ')).toBe(false);
    });

    test('Debe rechazar nombre con un solo carácter', () => {
        expect(validarNombre('A')).toBe(false);
    });

    test('Debe rechazar nombre null', () => {
        expect(validarNombre(null)).toBe(false);
    });

    test('Debe rechazar nombre undefined', () => {
        expect(validarNombre(undefined)).toBe(false);
    });
});

describe('Pruebas de Validación de Días de Asistencia', () => {
    
    test('Debe aceptar 1 día seleccionado', () => {
        expect(validarDias(1)).toBe(true);
    });

    test('Debe aceptar 3 días seleccionados', () => {
        expect(validarDias(3)).toBe(true);
    });

    test('Debe aceptar 6 días seleccionados', () => {
        expect(validarDias(6)).toBe(true);
    });

    test('Debe rechazar 0 días seleccionados', () => {
        expect(validarDias(0)).toBe(false);
    });

    test('Debe rechazar número negativo', () => {
        expect(validarDias(-1)).toBe(false);
    });

    test('Debe rechazar valores null', () => {
        expect(validarDias(null)).toBe(false);
    });

    test('Debe rechazar valores undefined', () => {
        expect(validarDias(undefined)).toBe(false);
    });
});