# RutaETF

Academia web educativa, en español y orientada a una persona residente en Colombia, para pasar de cero conocimiento a un sistema de inversión propio en ETFs y acciones.

Sin instalación, sin cuenta, sin API y sin conexión a ningún broker. Todo el progreso se guarda en `localStorage` del navegador.

## Abrir el proyecto

Abre `index.html` en el navegador. También puedes servirlo localmente:

```bash
python -m http.server 8080
```

Luego visita `http://localhost:8080`.

> El navegador separa los datos según el origen. El progreso guardado al abrir el archivo con `file://` no es el mismo de `http://localhost:8080`. Usa **Exportar progreso** antes de cambiar de forma de apertura y luego importa el respaldo.

## Desarrollo y comprobaciones

La aplicación no necesita instalar paquetes. Para ejecutar las pruebas se requiere Node.js 20 o posterior:

```bash
npm test
```

Para comprobar además la sintaxis de la lógica principal:

```bash
npm run check
```

Las pruebas cubren las fórmulas compartidas, la limpieza del estado, la validación de respaldos y los extremos del rebalanceador. Al cambiar la interfaz también conviene hacer una revisión manual en escritorio y móvil.

## Contenido

### Currículo de 4 niveles · 28 lecciones

| Nivel | Nombre | Lecciones | Qué cubre |
|---|---|---|---|
| 1 | Fundamentos | 1–7 | Ahorro vs. inversión, instrumentos, riesgo y diversificación, costos reales, órdenes y CFD, cómo estudiar un ETF, práctica en demo |
| 2 | Construcción | 8–14 | Interés compuesto e inflación, asignación de activos, domicilio UCITS vs. EE. UU., riesgo cambiario COP–USD, renta fija y duración, DCA, rebalanceo |
| 3 | Análisis | 15–21 | Estados financieros, valoración, métricas de riesgo, factores, emergentes y sesgo local, psicología del inversionista, backtesting honesto |
| 4 | Maestría | 22–28 | Declaración de política de inversión, fiscalidad colombiana del exterior, fase de retiro, alternativos, fraudes, sistema operativo y criterio propio |

Cada lección incluye objetivos de aprendizaje, explicación, tablas comparativas, fórmulas, ejemplos en pesos, advertencias, errores frecuentes, una idea clave, píldoras y una tarea concreta.

Los niveles siguen una progresión obligatoria. El examen de un nivel solo se habilita al marcar todas sus lecciones como estudiadas, y el siguiente nivel se desbloquea únicamente después de aprobar ese examen. La certificación final requiere haber completado los cuatro niveles.

### Herramientas

- **Laboratorio** con seis calculadoras: crecimiento compuesto real (con inflación y costos), impacto de las comisiones a largo plazo, costo real de una compra internacional, prueba de estrés por drawdown, capital objetivo para independencia financiera y rebalanceo por bandas.
- **Píldoras**: 38 micro-lecciones filtrables por tema, con una destacada al azar.
- **Errores comunes**: los 14 antipatrones más caros, cada uno con su corrección.
- **Glosario**: más de cien términos clasificados en básico, productos, riesgo, costos, análisis, fiscal y operativa, con búsqueda que ignora tildes.
- **Exámenes**: uno por nivel (10 preguntas, se aprueba con 6) más una certificación final que sortea 12 preguntas de los cuatro niveles y exige 10 aciertos. Todas las respuestas muestran explicación.
- **Prerrequisito financiero obligatorio**: la academia permanece bloqueada hasta confirmar las seis condiciones de base; cada condición pendiente muestra una recomendación práctica.
- **Ruta de ejecución de 12 semanas**, **planificador de cartera**, **diario de decisiones** y **exportación/importación del progreso en JSON**.

## Orden recomendado

1. Completar el prerrequisito financiero de seis condiciones. Hasta entonces, el contenido de la academia permanece bloqueado.
2. Estudiar el Nivel 1 y aprobar su examen.
3. Practicar cuatro semanas en cuenta demo antes de cualquier dinero real.
4. Avanzar por los niveles 2, 3 y 4, aprobando cada examen.
5. Usar el Laboratorio con tus cifras reales en las lecciones que lo piden.
6. Escribir la declaración de política de inversión (Lección 22) y firmarla.
7. Solo después, evaluar una primera operación real de monto pequeño.
8. Presentar la certificación final.

## Estructura de archivos

```
index.html          Estructura de la página
styles.css          Estilos
core.js             Fórmulas y validación de datos, sin dependencias del DOM
app.js              Renderizado, progreso, calculadoras y persistencia
data/nivel-1..4.js  Currículo (window.CURRICULUM)
data/glosario.js    Términos (window.GLOSARIO)
data/pildoras.js    Píldoras y errores comunes
data/examenes.js    Banco de preguntas y certificación
tests/core.test.js  Pruebas automatizadas de la lógica crítica
```

Los archivos de `data/` se cargan como scripts clásicos en orden, sin módulos ES, para que la app funcione también abriendo `index.html` directamente desde el disco.

El respaldo exportado incluye `app: "RutaETF"` y `schemaVersion: 2`. La importación también acepta respaldos anteriores, pero solo conserva campos, tipos e identificadores conocidos; un JSON arbitrario se rechaza.

## Accesibilidad

- Enlace para saltar al contenido principal.
- Foco visible para enlaces, controles y paneles.
- Pestañas navegables con flechas izquierda/derecha, Inicio y Fin.
- Regiones de estado anunciadas por tecnologías de asistencia.
- Diseño adaptable y respeto por `prefers-reduced-motion`.

## Importante

Este material no garantiza ganancias ni constituye asesoría financiera, tributaria o legal. Una proyección matemática no es un pronóstico.

Las cifras tributarias, tarifas, umbrales en UVT y tratados cambian con la normativa vigente y con tu situación particular: verifícalas con la DIAN, la Superintendencia Financiera de Colombia, tu broker y un contador público habilitado antes de invertir dinero real. Los brokers del exterior no están vigilados por la SFC y puedes perder parte o la totalidad del capital.

## Fuentes base consultadas

- Superintendencia Financiera de Colombia: https://www.superfinanciera.gov.co/
- DIAN: https://www.dian.gov.co/
- DIAN, declaración de activos en el exterior: https://www.dian.gov.co/impuestos/sociedades/Paginas/declaracion_activos_exterior.aspx
- Banco de la República: https://www.banrep.gov.co/
- Investor.gov (SEC), dollar-cost averaging: https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging
- eToro, tarifas: https://www.etoro.com/es/trading/fees/
- Interactive Brokers, países disponibles: https://www.interactivebrokers.com/en/accounts/open-account-country-list.php
- Interactive Brokers, comisiones: https://www.interactivebrokers.com/en/pricing/commissions-stocks.php
- IRS, estate tax para no residentes no ciudadanos: https://www.irs.gov/individuals/international-taxpayers/some-nonresidents-with-us-assets-must-file-estate-tax-returns
- IRS, vigencia del W-8BEN: https://www.irs.gov/instructions/iw8ben
- Irish Revenue, tratado tributario Irlanda–EE. UU.: https://www.revenue.ie/en/tax-professionals/documents/double-taxation-treaties/u/usa-1997.pdf

Última revisión dirigida de afirmaciones tributarias, sucesorias y de disponibilidad: **15 de agosto de 2026**. Consulta `FUENTES.md` para el registro de revisión y los puntos que deben comprobarse de nuevo.
