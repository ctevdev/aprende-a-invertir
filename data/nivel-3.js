/* RutaETF · Currículo — Nivel 3: Análisis */
window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push({
  id: 'n3',
  level: 3,
  name: 'Análisis',
  subtitle: 'Avanzado',
  claim: 'Medir empresas, medir carteras y medir tu propia cabeza.',
  outcome: 'Al terminar podrás leer un estado financiero, interpretar métricas de riesgo y detectar cuándo un backtest te está engañando.',
  hours: '10–14 horas',
  lessons: [

    {
      id: 'l3-01', key: 'estados', num: 15, tag: 'Empresas', min: 18,
      title: 'Leer los estados financieros de una empresa',
      goal: 'Formarse una opinión sobre un negocio antes de mirar su precio.',
      objectives: [
        'Recorrer balance, resultados y flujo de caja en ese orden.',
        'Distinguir utilidad contable de caja generada.',
        'Detectar señales de deterioro y de contabilidad agresiva.'
      ],
      blocks: [
        { t: 'p', html: 'Comprar una acción individual es comprar una parte de un negocio. Si no puedes describir cómo gana dinero ese negocio, quién es su competencia y qué lo protege, no estás invirtiendo: estás apostando al gráfico.' },
        { t: 'concepts', cols: 3, items: [
          { h: 'Balance', p: 'Foto de un instante: qué tiene la empresa (activos), qué debe (pasivos) y qué queda para los dueños (patrimonio).' },
          { h: 'Estado de resultados', p: 'Película del periodo: ingresos, costos, márgenes y utilidad. Incluye partidas que no son caja.' },
          { h: 'Flujo de caja', p: 'El dinero que entró y salió de verdad. Es el estado más difícil de maquillar.' }
        ]},
        { t: 'table', head: ['Métrica', 'Cómo se calcula', 'Qué revela'], rows: [
          ['Margen bruto', '(Ingresos − Costo de ventas) / Ingresos', 'Poder de fijación de precios.'],
          ['Margen operativo', 'Utilidad operativa / Ingresos', 'Eficiencia del negocio antes de financiación e impuestos.'],
          ['ROE', 'Utilidad neta / Patrimonio', 'Rentabilidad para el accionista. Se infla con deuda.'],
          ['ROIC', 'Utilidad operativa después de impuestos / Capital invertido', 'Calidad real del negocio. Más honesto que el ROE.'],
          ['Deuda neta / EBITDA', '(Deuda − Caja) / EBITDA', 'Apalancamiento. Por encima de 3–4 suele encender alarmas.'],
          ['Flujo de caja libre', 'Flujo operativo − Capex', 'El dinero que sobra para dividendos, recompras o crecer.'],
          ['Conversión de caja', 'Flujo de caja libre / Utilidad neta', 'Si es persistentemente bajo, la utilidad no llega a caja.']
        ]},
        { t: 'warn', h: 'Señales que merecen una investigación profunda', html: 'Utilidad creciente con flujo de caja libre estancado o negativo · Cuentas por cobrar creciendo mucho más rápido que las ventas · Inventarios que se acumulan · Cambios frecuentes de auditor o de criterio contable · Dependencia de un solo cliente o de un solo país · Uso intensivo de métricas "ajustadas" que excluyen gastos recurrentes.' },
        { t: 'tip', h: 'Empieza por el final', html: 'Lee primero el estado de flujo de caja, luego el balance y solo al final el estado de resultados. La utilidad es una opinión; la caja es un hecho.' },
        { t: 'p', html: 'El <strong>foso competitivo</strong> es lo que impide que un competidor replique el negocio: marca, costos de cambio, efectos de red, ventaja en costos o licencias. Sin foso, los márgenes altos atraen competencia y desaparecen.' },
        { t: 'task', html: 'Elige una empresa que conozcas como cliente. Descarga su último reporte anual y responde en una página: cómo gana dinero, cuál es su foso, cuánta deuda tiene y si genera caja libre.' }
      ],
      keyIdea: 'La utilidad se puede interpretar. La caja se cuenta.',
      pills: [
        'Un dividendo alto puede ser una señal de que la empresa no encuentra en qué invertir su propio dinero.',
        'Desconfía de las presentaciones a inversionistas: lee el informe anual auditado y las notas al pie, donde se guarda lo incómodo.'
      ]
    },

    {
      id: 'l3-02', key: 'valoracion', num: 16, tag: 'Valoración', min: 16,
      title: 'Valoración: precio no es lo mismo que valor',
      goal: 'Estimar si lo que pagas es razonable frente a lo que recibes.',
      objectives: [
        'Usar múltiplos comparativos con sus límites.',
        'Comprender la lógica del descuento de flujos.',
        'Aplicar margen de seguridad frente a la incertidumbre.'
      ],
      blocks: [
        { t: 'formula', label: 'La idea central', tex: 'Valor = Σ flujos futuros / (1 + tasa de descuento)ⁿ', html: 'El valor de cualquier activo es el dinero que entregará en el futuro, traído a hoy. Todo lo demás son atajos para estimar esa cifra.' },
        { t: 'table', head: ['Múltiplo', 'Fórmula', 'Cuándo sirve', 'Trampa habitual'], rows: [
          ['P/E', 'Precio / Utilidad por acción', 'Empresas rentables y estables', 'Una utilidad deprimida hace parecer caro un negocio barato'],
          ['P/B', 'Precio / Valor en libros', 'Bancos y negocios intensivos en activos', 'Irrelevante en empresas de intangibles'],
          ['EV/EBITDA', 'Valor de empresa / EBITDA', 'Comparar empresas con distinta deuda', 'El EBITDA ignora el capex necesario'],
          ['P/FCF', 'Precio / Flujo de caja libre', 'Casi siempre el más informativo', 'Un año con capex atípico lo distorsiona'],
          ['Dividend yield', 'Dividendo / Precio', 'Empresas maduras', 'Un yield muy alto suele anticipar un recorte'],
          ['CAPE', 'Precio / Utilidad media real de 10 años', 'Nivel general del mercado', 'Mal predictor de corto plazo']
        ]},
        { t: 'p', html: 'Un múltiplo solo dice algo comparado con: la misma empresa en su historia, sus competidores directos y las tasas de interés vigentes. Un P/E de 30 puede ser barato para un negocio que crece al 25% y carísimo para uno que crece al 2%.' },
        { t: 'warn', h: 'La tasa de descuento manda', html: 'Cuando las tasas de interés suben, el valor presente de los flujos lejanos cae con fuerza. Por eso las empresas cuyo valor está en beneficios lejanos sufren mucho más en ciclos de alza de tasas. No es irracionalidad del mercado: es aritmética.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'Margen de seguridad', p: 'Comprar por debajo de tu estimación de valor para que un error de cálculo no se convierta en pérdida.' },
          { h: 'Trampa de valor', p: 'Barato porque el negocio se está deteriorando de forma permanente. Lo barato puede seguir abaratándose.' },
          { h: 'Reversión a la media', p: 'Márgenes y crecimientos extremos tienden a normalizarse. Extrapolar el año excepcional es el error más común.' },
          { h: 'Círculo de competencia', p: 'Valora solo negocios que entiendes. Fuera de ahí, el índice es una respuesta mejor.' }
        ]},
        { t: 'tip', h: 'Valora antes de mirar el precio', html: 'Estima tu rango de valor y solo después consulta la cotización. Si lo haces al revés, tu estimación se anclará al número de la pantalla.' },
        { t: 'task', html: 'Haz una valoración de una página: tres escenarios (pesimista, base, optimista), la tasa de descuento que usaste y el precio máximo que pagarías. Guárdala con fecha y revísala en un año.' }
      ],
      keyIdea: 'Una gran empresa a un precio absurdo es una mala inversión. El precio pagado forma parte del retorno.',
      pills: [
        'Escribe tu tesis en tres frases antes de comprar. Si necesitas tres páginas, no la tienes clara.',
        'Define de antemano qué hecho concreto te haría reconocer que te equivocaste. Sin eso, cualquier caída se justifica sola.'
      ]
    },

    {
      id: 'l3-03', key: 'metricas', num: 17, tag: 'Riesgo', min: 15,
      title: 'Métricas de riesgo: drawdown, volatilidad, Sharpe y correlación',
      goal: 'Medir el riesgo con números en lugar de con sensaciones.',
      objectives: [
        'Interpretar máximo drawdown y tiempo de recuperación.',
        'Leer una desviación estándar y un ratio de Sharpe sin sobreinterpretarlos.',
        'Entender que las correlaciones cambian justo en las crisis.'
      ],
      blocks: [
        { t: 'kv', items: [
          { k: 'Volatilidad (σ)', v: 'Desviación estándar de los retornos. Renta variable global: aproximadamente 15–18% anual histórico. Trata igual las subidas y las bajadas, que es su principal limitación.' },
          { k: 'Máximo drawdown', v: 'La peor caída desde un máximo hasta el mínimo posterior. Es la métrica que mejor predice si abandonarás el plan.' },
          { k: 'Tiempo de recuperación', v: 'Cuánto tardó en volver al máximo anterior. Puede medirse en años, y ahí es donde se rompe la paciencia.' },
          { k: 'Ratio de Sharpe', v: '(Retorno − tasa libre de riesgo) / volatilidad. Retorno por unidad de riesgo. Penaliza la volatilidad al alza igual que a la baja.' },
          { k: 'Ratio de Sortino', v: 'Como el Sharpe, pero solo considera la volatilidad negativa. Más cercano a lo que duele.' },
          { k: 'Beta', v: 'Sensibilidad frente al mercado. Beta 1,3 sugiere amplificar los movimientos del índice en un 30%.' },
          { k: 'Correlación', v: 'De −1 a +1. Mide si dos activos se mueven juntos. Es la materia prima de la diversificación.' },
          { k: 'VaR', v: 'Pérdida máxima esperada con cierta probabilidad. Su punto ciego es exactamente lo que ocurre más allá de ese umbral.' }
        ]},
        { t: 'warn', h: 'Las correlaciones se disparan en el pánico', html: 'Activos que parecían independientes durante años caen juntos en una crisis de liquidez, cuando todo el mundo vende lo que puede vender. La diversificación funciona el 95% del tiempo y falla parcialmente justo en el 5% que más importa. Por eso el efectivo y la calidad crediticia siguen teniendo un rol.' },
        { t: 'p', html: 'El máximo drawdown histórico de la renta variable global ronda el 50% en las peores crisis, con recuperaciones que han tomado varios años. Cualquier plan a largo plazo debe estar diseñado para sobrevivir a un evento de esa magnitud, no para evitarlo.' },
        { t: 'tip', h: 'Traduce los porcentajes a pesos', html: 'Un "−35%" es abstracto. "Perder $42.000.000 de mi cartera de $120.000.000" no lo es. Haz siempre la conversión: tu tolerancia real vive en pesos.' },
        { t: 'warn', h: 'Todas estas métricas miran hacia atrás', html: 'Se calculan con datos pasados y asumen distribuciones que la realidad no respeta. Los eventos extremos ocurren con más frecuencia de la que sugieren los modelos. Úsalas para comparar y dimensionar, nunca como garantía.' },
        { t: 'task', html: 'Usa la calculadora de <strong>drawdown y recuperación</strong> en el Laboratorio. Calcula el impacto en pesos de una caída del 40% sobre tu cartera objetivo a diez años y escribe tu reacción prevista.' }
      ],
      keyIdea: 'El riesgo que importa no es la desviación estándar: es la probabilidad de no llegar a tu meta.',
      pills: [
        'Un Sharpe excelente en un periodo corto suele indicar que el riesgo aún no se ha manifestado, no que no exista.',
        'Pregunta siempre por el máximo drawdown de una estrategia antes de preguntar por su rentabilidad.'
      ]
    },

    {
      id: 'l3-04', key: 'factores', num: 18, tag: 'Estrategia', min: 14,
      title: 'Factores: valor, tamaño, calidad, momentum y baja volatilidad',
      goal: 'Entender de dónde dicen venir las primas de riesgo y por qué son difíciles de capturar.',
      objectives: [
        'Describir los principales factores documentados.',
        'Reconocer periodos largos de bajo desempeño relativo.',
        'Decidir con criterio si un factor merece espacio en la cartera.'
      ],
      blocks: [
        { t: 'table', head: ['Factor', 'Idea', 'Explicación propuesta', 'Riesgo real'], rows: [
          ['Valor', 'Empresas baratas frente a fundamentales', 'Compensación por riesgo o por infravaloración conductual', 'Ha pasado más de una década rezagado'],
          ['Tamaño', 'Empresas pequeñas', 'Mayor riesgo y menor liquidez', 'Efecto debilitado y muy irregular'],
          ['Calidad', 'Alta rentabilidad, baja deuda, beneficios estables', 'Preferencia sistemática por lo llamativo', 'Suele cotizar caro cuando es popular'],
          ['Momentum', 'Lo que subió tiende a seguir subiendo a corto plazo', 'Sesgos de reacción de los inversionistas', 'Reversiones bruscas y alta rotación'],
          ['Baja volatilidad', 'Acciones estables han rendido bien ajustado por riesgo', 'Restricciones de apalancamiento institucional', 'Sensible a tasas; se comporta como un bono']
        ]},
        { t: 'p', html: 'Los factores no son gratis ni permanentes. Un factor puede rendir por debajo del mercado durante 10 o 15 años seguidos — más tiempo del que la mayoría de los inversionistas mantiene cualquier posición. Esa persistencia del dolor es, según la teoría, la razón por la que la prima puede seguir existiendo.' },
        { t: 'warn', h: 'Data mining y factor zoo', html: 'Se han publicado cientos de "factores". La mayoría desaparece fuera de la muestra en la que se descubrieron. Antes de aceptar uno, exige: fundamento económico previo al dato, evidencia en varios mercados y varias décadas, y supervivencia después de costos de transacción.' },
        { t: 'tip', h: 'Prueba de los 10 años', html: 'Si no puedes comprometerte a mantener una inclinación factorial durante al menos una década de posible bajo desempeño, no la implementes: venderás en el peor momento y solo habrás pagado el TER extra.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'Costo de implementación', p: 'Los ETFs factoriales cobran más y rotan más. Parte de la prima teórica se pierde en la ejecución.' },
          { h: 'Riesgo de tracking', p: 'Ver al índice general superarte año tras año es psicológicamente muy costoso.' }
        ]},
        { t: 'task', html: 'Elige un ETF factorial y examina su desempeño relativo frente al índice general en ventanas de 1, 3, 5 y 10 años. Escribe si podrías sostener el peor periodo que encuentres.' }
      ],
      keyIdea: 'Una prima de factor solo es tuya si sobrevives al periodo en que parece que ya no existe.',
      pills: [
        'Antes de añadir factores, agota la simplicidad: la mayoría de los inversionistas no supera a una cartera global de dos fondos.',
        'Si un backtest empieza justo en el año perfecto, el resultado dice más de la fecha elegida que de la estrategia.'
      ]
    },

    {
      id: 'l3-05', key: 'emergentes', num: 19, tag: 'Mercados', min: 13,
      title: 'Mercados emergentes, Colombia y el sesgo local',
      goal: 'Situar tu país en la cartera con proporción y sin nacionalismo financiero.',
      objectives: [
        'Explicar el sesgo doméstico y su costo.',
        'Evaluar la exposición a mercados emergentes.',
        'Considerar el capital humano al decidir el peso de Colombia.'
      ],
      blocks: [
        { t: 'p', html: 'El <strong>sesgo doméstico</strong> es la tendencia a concentrar la cartera en el propio país porque resulta familiar. Colombia representa una fracción muy pequeña de la capitalización bursátil mundial; una cartera mayoritariamente colombiana es una apuesta concentrada, aunque se sienta prudente.' },
        { t: 'warn', h: 'Tu capital humano ya está en Colombia', html: 'Tu salario, tu vivienda, tu pensión y tu red profesional dependen de la economía colombiana. Si además concentras el patrimonio financiero aquí, una recesión local golpea tu ingreso y tus ahorros simultáneamente. La diversificación internacional es, sobre todo, una cobertura de tu propia vida laboral.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'A favor de emergentes', p: 'Valoraciones históricamente más bajas, demografía joven y crecimiento potencial superior.' },
          { h: 'En contra', p: 'Riesgo político y regulatorio, gobernanza corporativa desigual, divisas volátiles y concentración en pocos sectores.' },
          { h: 'Ya estás expuesto', p: 'Un ETF global amplio suele incluir emergentes en una proporción cercana a su peso de mercado. Añadir más es una decisión activa.' },
          { h: 'Exposición indirecta', p: 'Muchas multinacionales de mercados desarrollados obtienen gran parte de sus ingresos en países emergentes.' }
        ]},
        { t: 'table', head: ['Vehículo local', 'Qué aporta', 'Qué vigilar'], rows: [
          ['TES', 'Renta fija soberana en pesos, sin riesgo cambiario', 'Riesgo de tasa, inflación local y fiscal del país'],
          ['Acciones del mercado colombiano', 'Exposición local y dividendos', 'Alta concentración en pocos emisores y sectores; liquidez limitada'],
          ['FIC / fondos locales', 'Acceso sencillo desde una fiduciaria regulada por la SFC', 'Comisiones de administración y transparencia de la cartera'],
          ['ETF local del índice colombiano', 'Diversificación dentro del mercado local', 'El propio índice está muy concentrado']
        ]},
        { t: 'tip', h: 'Enfoque de proporción', html: 'Una forma disciplinada de estudiar el tema es partir de los pesos de capitalización mundial y luego decidir conscientemente cualquier desviación, dejando por escrito la razón. Sin esa disciplina, el sesgo entra por defecto.' },
        { t: 'task', html: 'Calcula qué porcentaje de tu patrimonio total —incluyendo vivienda, cesantías, pensión obligatoria y ahorros— depende de la economía colombiana. La cifra suele sorprender.' }
      ],
      keyIdea: 'Diversificar internacionalmente no es desconfiar de tu país: es no apostarlo todo a un solo lugar, incluida tu carrera.',
      pills: [
        'Lo familiar se siente seguro; no lo es. La familiaridad es un sesgo cognitivo, no un análisis de riesgo.',
        'Antes de comprar el índice de un solo país, mira cuántos emisores concentran la mitad de su valor.'
      ]
    },

    {
      id: 'l3-06', key: 'psicologia', num: 20, tag: 'Conducta', min: 16,
      title: 'Psicología del inversionista y sesgos que cuestan dinero',
      goal: 'Diseñar defensas contra tus propios errores sistemáticos.',
      objectives: [
        'Identificar los sesgos más caros en la práctica.',
        'Reconocer la brecha entre el retorno del fondo y el del inversionista.',
        'Instalar frenos estructurales, no fuerza de voluntad.'
      ],
      blocks: [
        { t: 'p', html: 'Existe una diferencia documentada entre el retorno que publica un fondo y el que obtienen sus partícipes: la <strong>brecha de comportamiento</strong>. Se explica por entrar tarde y salir temprano. No la produce el mercado: la produce quien lo opera.' },
        { t: 'table', head: ['Sesgo', 'Cómo se manifiesta', 'Contramedida concreta'], rows: [
          ['Aversión a la pérdida', 'Perder duele cerca del doble de lo que agrada ganar lo mismo', 'Revisar la cartera menos veces al año'],
          ['Exceso de confianza', 'Operar mucho creyendo tener ventaja', 'Llevar un registro público contigo mismo de aciertos y errores'],
          ['Sesgo de confirmación', 'Buscar solo información que respalde tu tesis', 'Escribir el argumento contrario antes de comprar'],
          ['Anclaje', 'Aferrarse al precio de compra como referencia de valor', 'Preguntarse: ¿compraría hoy a este precio sin tener la posición?'],
          ['Efecto rebaño', 'Comprar lo que todos comentan', 'Exigir 30 días entre conocer una idea y ejecutarla'],
          ['Recencia', 'Proyectar el último año hacia el futuro', 'Consultar series históricas largas antes de decidir'],
          ['Contabilidad mental', 'Tratar distinto el dinero "ganado en bolsa"', 'Ver una sola cartera consolidada'],
          ['Aversión al arrepentimiento', 'Paralizarse por miedo a equivocarse', 'Automatizar la decisión recurrente'],
          ['Sesgo de acción', 'Sentir que hay que hacer algo en cada caída', 'Regla escrita: no hacer nada es una decisión válida y por defecto']
        ]},
        { t: 'warn', h: 'La fuerza de voluntad no es un plan', html: 'Nadie resiste indefinidamente a base de disciplina. Lo que funciona son las barreras estructurales: aportes automáticos, notificaciones desactivadas, reglas escritas y un periodo obligatorio de espera antes de operar.' },
        { t: 'steps', items: [
          { h: 'Regla de las 48 horas', p: 'Ninguna operación no planificada se ejecuta el mismo día que se te ocurre.' },
          { h: 'Diario obligatorio', p: 'Si no puedes escribir la razón en tres frases, no operas.' },
          { h: 'Frecuencia de revisión', p: 'Una vez por trimestre. Las notificaciones de precio, desactivadas.' },
          { h: 'Dieta informativa', p: 'Elimina las fuentes que viven de generar urgencia.' },
          { h: 'Segunda opinión', p: 'Explícale la tesis a alguien que pueda contradecirte sin costo social.' }
        ]},
        { t: 'tip', h: 'Pre-mortem', html: 'Antes de invertir, imagina que dentro de tres años la posición perdió la mitad y escribe la explicación más probable. Suele revelar el riesgo que estabas ignorando.' },
        { t: 'task', html: 'Identifica los dos sesgos que más te afectan y escribe una contramedida operativa para cada uno. Guárdalos en el Diario y revísalos cada trimestre.' }
      ],
      keyIdea: 'El principal riesgo de tu cartera se sienta frente a la pantalla.',
      pills: [
        'Revisar la cartera a diario aumenta la probabilidad de ver pérdidas y, con ello, la probabilidad de vender.',
        'La mejor cartera del mundo abandonada en el peor momento rinde peor que una cartera mediocre sostenida veinte años.'
      ]
    },

    {
      id: 'l3-07', key: 'backtest', num: 21, tag: 'Método', min: 14,
      title: 'Backtesting honesto y por qué casi todos mienten',
      goal: 'Evaluar evidencia histórica sin dejarse seducir por curvas perfectas.',
      objectives: [
        'Enumerar los sesgos que inflan un backtest.',
        'Exigir datos fuera de muestra y costos reales.',
        'Preferir robustez a optimización.'
      ],
      blocks: [
        { t: 'p', html: 'Cualquiera puede construir una estrategia con un desempeño histórico espectacular: basta probar suficientes combinaciones sobre los mismos datos. Eso no es investigación, es buscar hasta encontrar una coincidencia.' },
        { t: 'kv', items: [
          { k: 'Sesgo de supervivencia', v: 'La base de datos solo incluye lo que sigue existiendo. Las empresas y fondos que quebraron desaparecieron del historial.' },
          { k: 'Sobreajuste', v: 'Parámetros afinados para el pasado exacto. Funcionan de maravilla ayer y fallan mañana.' },
          { k: 'Look-ahead bias', v: 'Usar información que no estaba disponible en esa fecha, como resultados reportados con retraso.' },
          { k: 'Selección del periodo', v: 'Empezar el gráfico justo después de un desplome o justo antes de un auge.' },
          { k: 'Costos ignorados', v: 'Sin comisiones, spread, impuestos ni deslizamiento, cualquier estrategia de alta rotación parece rentable.' },
          { k: 'Falta de capacidad', v: 'Estrategias que funcionan con montos pequeños y colapsan al escalar.' }
        ]},
        { t: 'check', title: 'Preguntas obligatorias ante cualquier backtest', items: [
          '¿Qué periodo cubre y por qué empieza justo ahí?',
          '¿Incluye activos que desaparecieron durante el periodo?',
          '¿Descuenta comisiones, spread, impuestos y deslizamiento?',
          '¿Cuál fue el máximo drawdown y cuánto duró la recuperación?',
          '¿Funciona en otros mercados y en otras décadas?',
          '¿Cuántas variantes se probaron antes de mostrar esta?',
          '¿Qué tendría que pasar para que la estrategia deje de funcionar?',
          '¿Quién gana dinero si yo la adopto?'
        ]},
        { t: 'warn', h: 'Rentabilidades pasadas no garantizan resultados futuros', html: 'No es una fórmula legal vacía: es la conclusión empírica más sólida de la industria. Los fondos con mejor desempeño en un periodo rara vez repiten en el siguiente, y la clasificación de los primeros lugares cambia constantemente.' },
        { t: 'tip', h: 'Prefiere robusto a óptimo', html: 'Una estrategia que funciona razonablemente con muchos parámetros distintos es más confiable que una que brilla solo con un parámetro exacto. Si cambiar 20 por 22 rompe el resultado, era ruido.' },
        { t: 'task', html: 'Toma una estrategia que hayas visto promocionada y contéstale las ocho preguntas de la lista. Escribe la conclusión en el Diario.' }
      ],
      keyIdea: 'Si la curva del backtest es demasiado bonita, el error está en el método, no en la suerte.',
      pills: [
        'Pregunta siempre quién cobra si adoptas la estrategia. El modelo de negocio explica buena parte del entusiasmo.',
        'Un historial de tres años no distingue habilidad de azar. Ni siquiera diez lo hacen con claridad.'
      ]
    }
  ]
});
