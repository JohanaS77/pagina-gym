# Documentación de Pruebas - GoldenGym Ibagué

## Información General del Proyecto
- **Proyecto:** Sistema Web GoldenGym Ibagué
- **Responsable:** Johana Jazmín saavedra Tafur
- **Herramienta de Pruebas:** Jest v29.7.0
- **Node.js:** v24.11.0
- **npm:** v11.6.1
- **Fecha de inicio:** 30/10/2025

---

## Prueba 1: Validación de Email

**Fecha de ejecución:** 30/10/2025
**Tipo de prueba:** Unitaria
**Módulo probado:** js/validaciones.js - Función validarEmail()
**Objetivo:** Verificar que la función de validación de email identifique correctamente emails válidos e inválidos según el patrón RFC estándar.

### Casos de Prueba Ejecutados

| ID | Descripción | Entrada | Resultado Esperado | Resultado Obtenido | Estado |
|----|-------------|---------|-------------------|-------------------|--------|
| VE-01 | Email válido básico | `usuario@correo.com` | `true` | `true` |  PASS |
| VE-02 | Email con subdominio | `usuario@correo.ejemplo.com` | `true` | `true` |  PASS |
| VE-03 | Email sin arroba (@) | `usuariocorreo.com` | `false` | `false` |  PASS |
| VE-04 | Email sin dominio | `usuario@` | `false` | `false` |  PASS |
| VE-05 | Email vacío | `""` | `false` | `false` |  PASS |
| VE-06 | Email con espacios | `usuario @correo.com` | `false` | `false` |  PASS |
| VE-07 | Email sin extensión | `usuario@correo` | `false` | `false` |  PASS |

### Resultado General
- **Total de pruebas:** 7
- **Pruebas exitosas:** 7
- **Pruebas fallidas:** 0
- **Porcentaje de éxito:** 100%
- **Tiempo de ejecución:** 0.646s

### Patrón de Validación Utilizado
```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

**Este patrón valida que:**
- No haya espacios en blanco
- Exista exactamente un símbolo @
- Exista un dominio después del @
- Exista una extensión después del punto

### Función Validada
```javascript
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
```

### Observaciones
-  Todas las pruebas pasaron exitosamente
-  La función maneja correctamente casos válidos e inválidos
-  El tiempo de respuesta es óptimo (< 1 segundo)
-  La validación es suficiente para el propósito del formulario
-  No valida la existencia real del dominio (no es necesario para este caso de uso)

### Capturas de Pantalla

**Ejecución en terminal:**
```
PASS  __tests__/validaciones.test.js
  Pruebas de Validación de Email
    ✓ Debe aceptar un email válido (3 ms)
    ✓ Debe aceptar email con subdominios (1 ms)
    ✓ Debe rechazar email sin @
    ✓ Debe rechazar email sin dominio
    ✓ Debe rechazar email vacío
    ✓ Debe rechazar email con espacios
    ✓ Debe rechazar email sin extensión (1 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Time:        0.646 s
```

### Conclusión
La función `validarEmail()` cumple correctamente con su propósito de validar direcciones de correo electrónico según los requisitos del sistema GoldenGym. Todas las pruebas pasaron en el primer intento, demostrando la robustez de la implementación.

---

## Prueba 2: Validación de Nombre

**Fecha de ejecución:** 01/11/2025
**Tipo de prueba:** Unitaria
**Módulo probado:** js/validaciones.js - Función validarNombre()
**Objetivo:** Verificar que la función valide correctamente nombres de clientes, rechazando entradas vacías o con menos de 2 caracteres.

### Casos de Prueba Ejecutados

| ID | Descripción | Entrada | Resultado Esperado | Resultado Obtenido | Estado |
|----|-------------|---------|-------------------|-------------------|--------|
| VN-01 | Nombre válido completo | `Carlos Arias` | `true` | `true` |  PASS |
| VN-02 | Nombre con tildes | `José María` | `true` | `true` |  PASS |
| VN-03 | Nombre simple válido | `Ana` | `true` | `true` |  PASS |
| VN-04 | Rechazar cadena vacía | `""` | `false` | `false` |  PASS |
| VN-05 | Rechazar solo espacios | `"   "` | `false` | `false` |  PASS |
| VN-06 | Rechazar 1 carácter | `A` | `false` | `false` |  PASS |
| VN-07 | Rechazar null | `null` | `false` | `false` |  PASS |
| VN-08 | Rechazar undefined | `undefined` | `false` | `false` |  PASS |

### Resultado General
- **Total de pruebas:** 8
- **Pruebas exitosas:** 8
- **Pruebas fallidas:** 0
- **Porcentaje de éxito:** 100%
- **Tiempo de ejecución:** < 1s

### Función Validada
```javascript
function validarNombre(nombre) {
    if (!nombre || typeof nombre !== 'string') {
        return false;
    }
    return nombre.trim().length >= 2;
}
```

**Criterios de validación:**
- Debe ser de tipo string
- No debe ser null o undefined
- Después de eliminar espacios, debe tener mínimo 2 caracteres
- Acepta caracteres con tildes y espacios internos

### Observaciones
-  Todas las pruebas de validación de nombre pasaron exitosamente
-  La función maneja correctamente casos extremos (null, undefined, strings vacíos)
-  Se agregó validación de tipo de dato (typeof === 'string')
-  **Incidencia corregida:** Se detectó y corrigió un bug inicial donde la función retornaba el valor en lugar de boolean
-  **Solución aplicada:** Se agregó validación explícita con `if (!nombre || typeof nombre !== 'string')`

### Incidencias Encontradas

**Bug #001:**
- **Descripción:** La función retornaba `""`, `null` o `undefined` en lugar de `false` para casos inválidos
- **Severidad:** Media
- **Estado:**  Resuelto
- **Solución:** Se implementó validación explícita al inicio de la función

**Pruebas fallidas inicialmente:**
- VN-04: Esperaba `false`, recibió `""`
- VN-07: Esperaba `false`, recibió `null`
- VN-08: Esperaba `false`, recibió `undefined`

**Resultado después de la corrección:** 8/8 pruebas pasadas 

### Capturas de Pantalla

**Ejecución en terminal:**
```
Pruebas de Validación de Nombre
  ✓ Debe aceptar un nombre válido
  ✓ Debe aceptar nombres con tildes
  ✓ Debe aceptar nombres simples
  ✓ Debe rechazar nombre vacío
  ✓ Debe rechazar nombre con solo espacios
  ✓ Debe rechazar nombre con un solo carácter
  ✓ Debe rechazar nombre null
  ✓ Debe rechazar nombre undefined
```

### Conclusión
La función `validarNombre()` cumple correctamente con los requisitos después de corregir el bug inicial. Las pruebas automatizadas permitieron detectar el error tempranamente antes de llegar a producción, demostrando la importancia del testing en el desarrollo de software.

---

## Prueba 3: Validación de Días de Asistencia

**Fecha de ejecución:** 30/10/2025
**Tipo de prueba:** Unitaria
**Módulo probado:** js/validaciones.js - Función validarDias()
**Objetivo:** Verificar que se valide correctamente la selección de al menos un día de asistencia al gimnasio.

### Casos de Prueba Ejecutados

| ID | Descripción | Entrada | Resultado Esperado | Resultado Obtenido | Estado |
|----|-------------|---------|-------------------|-------------------|--------|
| VD-01 | Un día seleccionado | `1` | `true` | `true` |  PASS |
| VD-02 | Tres días seleccionados | `3` | `true` | `true` |  PASS |
| VD-03 | Seis días seleccionados | `6` | `true` | `true` |  PASS |
| VD-04 | Cero días seleccionados | `0` | `false` | `false` |  PASS |
| VD-05 | Número negativo | `-1` | `false` | `false` |  PASS |
| VD-06 | Valor null | `null` | `false` | `false` |  PASS |
| VD-07 | Valor undefined | `undefined` | `false` | `false` |  PASS |

### Resultado General
- **Total de pruebas:** 7
- **Pruebas exitosas:** 7
- **Pruebas fallidas:** 0
- **Porcentaje de éxito:** 100%
- **Tiempo de ejecución:** < 1s

### Función Validada
```javascript
function validarDias(diasSeleccionados) {
    return diasSeleccionados > 0;
}
```

**Criterios de validación:**
- Debe ser un número mayor a 0
- Rechaza 0, valores negativos, null o undefined

### Observaciones
-  Todas las pruebas de validación de días pasaron exitosamente
-  La función valida correctamente números positivos
-  Rechaza apropiadamente valores inválidos (0, negativos, null, undefined)
-  La implementación es simple y efectiva
-  No se encontraron bugs en esta función

### Capturas de Pantalla

**Ejecución en terminal:**
```
Pruebas de Validación de Días de Asistencia
  ✓ Debe aceptar 1 día seleccionado
  ✓ Debe aceptar 3 días seleccionados
  ✓ Debe aceptar 6 días seleccionados
  ✓ Debe rechazar 0 días seleccionados
  ✓ Debe rechazar número negativo
  ✓ Debe rechazar valores null
  ✓ Debe rechazar valores undefined
```

### Conclusión
La función `validarDias()` funciona correctamente desde la primera ejecución. La validación simple pero efectiva (`> 0`) cubre todos los escenarios necesarios para el sistema. No se requirieron correcciones.

---

## Prueba 4: [Pendiente]

**Tipo de prueba:** Integración
**Módulo a probar:** Formulario Cliente Completo
**Estado:**  Pendiente

---

## Prueba 5: [Pendiente]

**Tipo de prueba:** End-to-End (E2E)
**Módulo a probar:** Flujo de Registro Completo
**Estado:**  Pendiente

---

## Resumen General de Pruebas

### Tabla de Estado

| # | Tipo de Prueba | Módulo | Total Tests | Exitosas | Fallidas | Estado | Fecha |
|---|----------------|--------|-------------|----------|----------|--------|-------|
| 1 | Unitaria | Validación de Email | 7 | 7 | 0 |  PASS | 01/11/2025 |
| 2 | Unitaria | Validación de Nombre | 8 | 8 | 0 |  PASS | 01/11/2025 |
| 3 | Unitaria | Validación de Días | 7 | 7 | 0 |  PASS | 01/11/2025 |
| 4 | Integración | Formulario Cliente | - | - | - |  Pendiente | - |
| 5 | E2E | Flujo de Registro | - | - | - |  Pendiente | - |

### Estadísticas Acumuladas
- **Total de pruebas ejecutadas:** 22
- **Pruebas exitosas:** 22
- **Pruebas fallidas:** 0
- **Tasa de éxito general:** 100%
- **Cobertura de código:** [Pendiente calcular]
- **Bugs encontrados:** 1
- **Bugs corregidos:** 1
- **Bugs pendientes:** 0
- **Tiempo total de ejecución:** < 2 segundos

### Gráfico de Progreso
```
Pruebas Completadas: 3/5 (60%)
█████████████░░░░░░░ 60%

Pruebas Exitosas: 22/22 (100%)
████████████████████ 100%
```

### Bugs Registrados

| ID | Severidad | Módulo | Descripción | Estado | Fecha |
|----|-----------|--------|-------------|--------|-------|
| BUG-001 | Media | validarNombre() | Función retornaba valor en lugar de boolean |  Resuelto | 01/11/2025 |

---

## Archivos del Proyecto

### Estructura de Carpetas
```
PaginaGym/
├── __tests__/
│   └── validaciones.test.js          (Suite de pruebas)
├── js/
│   ├── validaciones.js               (Funciones validadas)
│   ├── script.js                     (Script principal)
│   └── scriptFormulario.js           (Script formulario)
├── node_modules/                     (Dependencias)
├── package.json                      (Configuración npm)
├── package-lock.json                 (Lockfile)
└── DOCUMENTACION_PRUEBAS.md          (Este archivo)
```

### Archivos Probados
1. `js/validaciones.js` - Módulo de validaciones 
2. `js/scriptFormulario.js` - Pendiente 
3. `js/script.js` - Pendiente 

---

## Metodología de Pruebas

### Estrategia Utilizada
1. **Pruebas Unitarias:** Verificar funciones individuales de forma aislada
2. **Pruebas de Integración:** Verificar la interacción entre módulos
3. **Pruebas E2E:** Simular el flujo completo del usuario

### Herramientas
- **Framework de testing:** Jest v29.7.0
- **Entorno:** Node.js v24.11.0
- **Editor:** Visual Studio Code
- **Control de versiones:** Git (recomendado)

### Convenciones de Nomenclatura
- Tests de validación de email: `VE-XX`
- Tests de validación de nombre: `VN-XX`
- Tests de validación de días: `VD-XX`

---

## Conclusiones Generales

### Fortalezas Identificadas
 Las funciones de validación son robustas y eficientes
 El tiempo de ejecución es óptimo (< 2 segundos para 22 pruebas)
 La cobertura de casos extremos es completa
 El código es mantenible y bien documentado

### Áreas de Mejora
 Implementar cobertura de código automatizada
 Agregar pruebas de integración para el formulario completo
 Implementar pruebas E2E con herramientas como Playwright o Cypress
 Agregar validación de backend para mayor seguridad

### Recomendaciones
1. Mantener la suite de pruebas actualizada con cada cambio
2. Ejecutar `npm test` antes de cada commit
3. Considerar agregar CI/CD para ejecutar pruebas automáticamente
4. Documentar nuevos casos de prueba según se agreguen funcionalidades

---

## Historial de Cambios

| Fecha | Versión | Cambios | Autor |
|-------|---------|---------|-------|
| 30/10/2025 | 1.0 | Documento inicial con Pruebas 1, 2 y 3 | Johana Saavedra |

---

## Anexos

### Comandos Útiles

**Ejecutar todas las pruebas:**
```bash
npm test
```

**Ejecutar pruebas en modo watch:**
```bash
npm test -- --watch
```

**Ver cobertura de código:**
```bash
npm test -- --coverage
```

**Ejecutar pruebas específicas:**
```bash
npm test validaciones
```

### Referencias
- [Documentación de Jest](https://jestjs.io/)
- [Node.js Documentation](https://nodejs.org/)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Última actualización:** 30/10/2025 - 20:00 hrs
**Próxima revisión:** [02/11/2025]