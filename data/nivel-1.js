/* RutaETF · Currículo — Nivel 1: Fundamentos
   Esquema de bloques admitidos por el renderizador (app.js):
   p | concepts | table | kv | tip | warn | example | task | steps | check | formula | mistakes | flow | scale
*/
window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push({
  id: 'n1',
  level: 1,
  name: 'Fundamentos',
  subtitle: 'Desde cero',
  claim: 'Entender el lenguaje, el riesgo y los costos antes de tocar un botón.',
  outcome: 'Al terminar sabrás leer la ficha de un ETF, calcular lo que realmente pagas y preparar una orden en cuenta demo sin apalancamiento.',
  hours: '6–8 horas',
  lessons: [

    {
      id: 'l1-01', key: 'ahorro', num: 1, tag: 'Punto de partida', min: 8,
      title: 'Ahorrar no es lo mismo que invertir',
      goal: 'Separar el dinero que debe estar disponible del dinero que puede asumir volatilidad.',
      objectives: [
        'Distinguir liquidez, seguridad y crecimiento como objetivos incompatibles entre sí.',
        'Asignar cada meta a un horizonte y a un tipo de vehículo.',
        'Reconocer cuándo invertir es directamente una mala idea.'
      ],
      blocks: [
        { t: 'p', html: '<strong>Ahorrar</strong> es reservar dinero para necesidades cercanas protegiéndolo de fluctuaciones. <strong>Invertir</strong> es comprar activos que pueden crecer o generar ingresos, aceptando que también pueden bajar durante años. No son etapas de lo mismo: son herramientas con trabajos distintos.' },
        { t: 'concepts', cols: 3, items: [
          { h: 'Liquidez', p: 'Poder disponer del dinero mañana sin castigo. La da el efectivo y los depósitos, no la bolsa.' },
          { h: 'Seguridad', p: 'Que el valor nominal no caiga. La inflación igual erosiona el poder de compra.' },
          { h: 'Crecimiento', p: 'Que el capital supere la inflación en el largo plazo. Exige aceptar caídas temporales.' }
        ]},
        { t: 'p', html: 'Ningún instrumento entrega las tres cosas a la vez. Quien promete liquidez inmediata, cero riesgo y alta rentabilidad está vendiendo algo que no existe: esa combinación es la firma característica de un fraude.' },
        { t: 'table', head: ['Horizonte', 'Naturaleza del dinero', 'Vehículo típico a estudiar'], rows: [
          ['0–12 meses', 'Emergencias, arriendo, matrícula, viaje', 'Cuenta de ahorro remunerada, fondo de mercado monetario, CDT corto'],
          ['1–3 años', 'Cuota inicial cercana, cambio de carro', 'Renta fija corta, CDT escalonado. Acciones no.'],
          ['3–5 años', 'Meta con fecha algo flexible', 'Mezcla conservadora. Exposición limitada a renta variable.'],
          ['5–10 años', 'Meta aplazable sin drama', 'Cartera diversificada con peso creciente en acciones globales'],
          ['10+ años', 'Retiro, patrimonio, educación de hijos pequeños', 'Renta variable global como motor, renta fija como amortiguador']
        ]},
        { t: 'example', html: 'Si necesitas $3.000.000 COP para una matrícula dentro de seis meses, ese dinero no debería estar en acciones. Una caída del 25% justo en el mes del pago te obliga a vender con pérdida y a conseguir la diferencia de otro lado. El error no fue la caída: fue el plazo.' },
        { t: 'tip', h: 'La regla del sueño', html: 'Si una posición te haría revisar el celular a las 3 de la mañana, es demasiado grande para ti — independientemente de lo que diga la teoría sobre tu perfil.' },
        { t: 'formula', label: 'Fondo de emergencia', tex: 'Gastos mensuales imprescindibles × 3 a 6 meses', html: 'Cuenta solo lo imprescindible: vivienda, servicios, alimentación, transporte, salud, deudas mínimas. Si tu ingreso es variable o dependes de un solo cliente, apunta a 6–12 meses.' },
        { t: 'mistakes', items: [
          { h: 'Invertir el fondo de emergencia "mientras tanto"', p: 'Las emergencias tienden a llegar cuando el mercado está caído. Es el peor momento posible para vender.' },
          { h: 'Empezar a invertir con deuda de tarjeta activa', p: 'Pagar una deuda al 30% E.A. es una rentabilidad del 30% garantizada y libre de riesgo. Ningún ETF compite con eso.' },
          { h: 'Confundir "no lo he vendido" con "no he perdido"', p: 'La pérdida existe desde que el precio cae. Lo que decides es si la conviertes en definitiva.' }
        ]},
        { t: 'task', html: 'Escribe tus tres próximas metas con costo estimado y fecha. Marca cuáles caen por debajo de 5 años: ese dinero queda fuera de la renta variable en esta ruta. Registra la conclusión en tu Diario.' }
      ],
      keyIdea: 'El plazo del dinero, no tu entusiasmo, decide en qué puede estar invertido.',
      pills: [
        'Antes de buscar rentabilidad, elimina costos: una deuda cara pagada rinde más que cualquier cartera.',
        'La inflación es un impuesto silencioso: al 8% anual, $1.000.000 guardado bajo el colchón compra $680.000 en cinco años.'
      ]
    },

    {
      id: 'l1-02', key: 'instrumentos', num: 2, tag: 'Instrumentos', min: 10,
      title: 'Acciones, bonos, índices, fondos y ETFs',
      goal: 'Nombrar con precisión qué compras cuando compras.',
      objectives: [
        'Diferenciar un activo de un vehículo que contiene activos.',
        'Entender que un índice es una regla, no un producto.',
        'Identificar el riesgo principal de cada instrumento.'
      ],
      blocks: [
        { t: 'table', head: ['Instrumento', 'Qué es', 'De dónde viene el retorno', 'Riesgo principal'], rows: [
          ['Acción', 'Participación en la propiedad de una empresa.', 'Crecimiento del negocio y dividendos.', 'La empresa se deteriora o quiebra.'],
          ['Bono', 'Préstamo a un gobierno o empresa.', 'Intereses (cupón) y devolución del principal.', 'Impago del emisor y subida de tasas.'],
          ['Índice', 'Regla que mide una canasta de activos. No se compra.', 'No aplica: es un termómetro.', 'Confundirlo con un producto invertible.'],
          ['Fondo mutuo / FIC', 'Vehículo colectivo, se compra al valor de cierre del día.', 'El de sus activos, menos comisiones.', 'Comisiones altas y poca transparencia.'],
          ['ETF', 'Fondo que cotiza en bolsa como una acción.', 'El de su canasta, menos el TER.', 'Que sea ETF no lo hace diversificado ni seguro.'],
          ['REIT', 'Vehículo de inmuebles que cotiza en bolsa.', 'Rentas de arriendo y valorización.', 'Sensible a tasas de interés y ciclo inmobiliario.'],
          ['Derivado / CFD', 'Contrato cuyo valor depende de otro activo.', 'Diferencia de precio, sin propiedad.', 'Apalancamiento y pérdidas superiores al capital.']
        ]},
        { t: 'p', html: 'La cadena mental correcta es: <strong>índice</strong> (la regla) → <strong>fondo o ETF</strong> (el vehículo que la sigue) → <strong>tu cuenta</strong> (donde queda registrada la participación). Cuando alguien dice "invertí en el S&P 500", en rigor compró un ETF o fondo que replica ese índice.' },
        { t: 'flow', items: ['Índice S&P 500', 'Gestora replica la regla', 'ETF cotiza en bolsa', 'Tu broker ejecuta', 'Custodio registra tu participación'] },
        { t: 'concepts', cols: 2, items: [
          { h: 'ETF de acumulación', p: 'Reinvierte los dividendos dentro del fondo. Menos fricción operativa y fiscal en algunos regímenes.' },
          { h: 'ETF de distribución', p: 'Te paga los dividendos en efectivo. Útil si necesitas flujo, pero genera un hecho fiscal cada vez.' },
          { h: 'Réplica física', p: 'El fondo compra realmente los activos del índice. Total o por muestreo.' },
          { h: 'Réplica sintética', p: 'Usa un swap con un banco para entregar el retorno del índice. Añade riesgo de contraparte.' }
        ]},
        { t: 'example', html: 'Una acción de Ecopetrol depende de un negocio, un país y un commodity. Un ETF global de acciones reparte la exposición entre miles de empresas de decenas de países. El segundo también cae en las crisis, pero ninguna empresa individual puede arruinarlo.' },
        { t: 'warn', h: '"ETF" no es sinónimo de prudente', html: 'Existen ETFs apalancados (×2, ×3), inversos, sectoriales de un solo tema y de nicho ilíquido. Comparten el envase con un ETF global diversificado y no comparten nada más. Los apalancados están diseñados para replicar un día, no un año: mantenerlos a largo plazo erosiona el capital por el efecto del rebalanceo diario.' },
        { t: 'tip', h: 'Prueba de una frase', html: 'Si no puedes explicar en una frase de dónde sale el retorno del producto, todavía no lo entiendes lo suficiente para comprarlo.' },
        { t: 'task', html: 'Busca la ficha oficial (factsheet o KID) de un ETF global amplio y anota: índice replicado, número de posiciones, TER, patrimonio del fondo, país de domicilio y si es de acumulación o distribución.' }
      ],
      keyIdea: 'Un ETF es un envase. Lo que importa es qué trae adentro y cuánto cobra por sostenerlo.',
      pills: [
        'El ticker no es el producto: el mismo índice puede tener cinco ETFs distintos con costos, domicilios y monedas diferentes.',
        'Cuanto más específico es el nombre de un ETF (temático, sectorial, de un país), más concentrado es el riesgo que asumes.'
      ]
    },

    {
      id: 'l1-03', key: 'riesgo', num: 3, tag: 'Protección', min: 12,
      title: 'Riesgo, volatilidad y diversificación',
      goal: 'Aceptar la volatilidad como el precio de entrada, no como una falla del sistema.',
      objectives: [
        'Separar riesgo de pérdida permanente y riesgo de fluctuación.',
        'Calcular cuánto hace falta para recuperar una caída.',
        'Diversificar por activo, geografía, moneda y tiempo.'
      ],
      blocks: [
        { t: 'p', html: '<strong>Riesgo</strong> es la posibilidad de un resultado distinto al esperado, incluida la pérdida permanente de capital. <strong>Volatilidad</strong> mide cuánto oscila un precio. Se confunden a diario, pero para un inversionista con horizonte largo la volatilidad es incomodidad; la pérdida permanente es el daño real.' },
        { t: 'scale', title: 'Cuánto cuesta recuperar una caída', rows: [
          ['−10%', '+11,1%'], ['−20%', '+25,0%'], ['−30%', '+42,9%'], ['−50%', '+100%'], ['−80%', '+400%']
        ], note: 'Las caídas y las recuperaciones no son simétricas. Por eso importa más evitar el desastre que acertar el máximo.' },
        { t: 'formula', label: 'Recuperación necesaria', tex: 'R = 1 / (1 − caída) − 1', html: 'Con una caída del 30%: 1 / 0,70 − 1 = 0,4286, es decir 42,9%.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'Riesgo específico', p: 'El de una empresa concreta: fraude, demanda, mala gestión. Se puede diluir diversificando.' },
          { h: 'Riesgo de mercado', p: 'Recesiones, tasas, pánicos globales. No se elimina con diversificación; se gestiona con horizonte y renta fija.' },
          { h: 'Riesgo de comportamiento', p: 'Vender en el fondo, comprar en la euforia. Es el más caro de todos y el único que controlas del todo.' },
          { h: 'Riesgo de inflación', p: 'Perder poder de compra por ser "demasiado prudente" durante décadas.' }
        ]},
        { t: 'p', html: 'Diversificar no es tener muchos productos, es tener exposiciones que no dependen de lo mismo. Cinco ETFs de tecnología estadounidense no son una cartera diversificada: son la misma apuesta comprada cinco veces.' },
        { t: 'concepts', cols: 4, items: [
          { h: 'Por activo', p: 'Acciones, bonos, efectivo. Se comportan distinto en cada ciclo.' },
          { h: 'Por geografía', p: 'No depender de un solo país ni de su política.' },
          { h: 'Por moneda', p: 'Tu gasto es en COP; tu inversión puede no serlo.' },
          { h: 'Por tiempo', p: 'Entrar en varios momentos reduce el peso de un mal día.' }
        ]},
        { t: 'warn', h: 'La diversificación tiene un costo emocional', html: 'Una cartera bien diversificada casi siempre tiene una parte que va mal. Esa es la señal de que funciona, no de que está rota. Si todo sube a la vez, probablemente todo bajará a la vez.' },
        { t: 'tip', h: 'Prueba de estrés personal', html: 'Multiplica tu cartera objetivo por −40%. Si la cifra en pesos te resulta intolerable, reduce el porcentaje en acciones ahora, en frío, y no en medio de la caída.' },
        { t: 'task', html: 'Escribe qué harías si tu cartera cayera 30%: ¿venderías, mantendrías o aportarías más? Guarda la respuesta con fecha en el Diario. Ese texto es tu contrato con tu yo del futuro.' }
      ],
      keyIdea: 'El mercado transfiere dinero de los impacientes a los pacientes. La volatilidad es el peaje.',
      pills: [
        'Las mejores jornadas del mercado suelen ocurrir a pocos días de las peores. Salir "hasta que pase" casi siempre significa perderse el rebote.',
        'Una caída del 20% es normal, no excepcional: históricamente ocurre cada pocos años en renta variable global.'
      ]
    },

    {
      id: 'l1-04', key: 'costos', num: 4, tag: 'Costos', min: 12,
      title: 'Lo que realmente pagas',
      goal: 'Calcular el costo total de ida y vuelta, no solo la comisión visible.',
      objectives: [
        'Enumerar las siete fuentes de costo de una inversión internacional.',
        'Traducir un TER a pesos concretos.',
        'Comparar brokers con tu aporte real, no con el caso ideal del folleto.'
      ],
      blocks: [
        { t: 'p', html: 'Una operación "sin comisión" puede seguir teniendo seis costos más. El costo es lo único del futuro que puedes conocer hoy con certeza — por eso es la variable más rentable de optimizar.' },
        { t: 'flow', items: ['COP', 'Conversión', 'USD', 'Comisión', 'Spread', 'ETF (TER)', 'Impuestos', 'Retiro', 'COP'] },
        { t: 'kv', items: [
          { k: 'Comisión', v: 'Cargo del broker por ejecutar la orden. Puede ser fijo, porcentual o con mínimo por operación.' },
          { k: 'Spread', v: 'Diferencia entre el precio de compra y el de venta. Es un costo real aunque no aparezca en el extracto.' },
          { k: 'Conversión FX', v: 'El margen sobre la tasa de cambio al pasar de COP a USD y de regreso. Suele ser el costo más grande y el menos visible.' },
          { k: 'TER', v: 'Gasto anual del fondo, descontado día a día del valor de la participación. Nunca lo verás como cobro.' },
          { k: 'Custodia / inactividad', v: 'Algunos brokers cobran mantenimiento o penalizan cuentas sin movimiento.' },
          { k: 'Retiro', v: 'Costo fijo o porcentual por sacar el dinero, más el FX de vuelta.' },
          { k: 'Impuestos', v: 'Retención sobre dividendos en origen, impuesto de renta local y GMF (4×1.000) al mover dinero.' }
        ]},
        { t: 'formula', label: 'Costo del TER en pesos', tex: 'Costo anual = Capital × TER', html: 'Un TER de 0,20% sobre $10.000.000 COP son $20.000 al año. Uno de 1,50% son $150.000 al año — por el mismo índice.' },
        { t: 'example', html: 'Dos carteras aportan $500.000 COP mensuales durante 20 años con un 7% bruto. Con 0,20% de costo total el resultado ronda los $255 millones; con 1,70% ronda los $210 millones. La diferencia — más de $45 millones — no se la llevó el mercado: se la llevaron las comisiones.' },
        { t: 'warn', h: 'El costo se compone igual que la rentabilidad', html: 'Un 1,5% anual extra de costos no te cuesta un 1,5%: a 30 años puede costarte cerca de un tercio del capital final. Es el efecto del interés compuesto trabajando en tu contra.' },
        { t: 'tip', h: 'Regla del aporte mínimo eficiente', html: 'Si la comisión fija por operación supera el 0,5% de tu aporte, estás operando demasiado seguido. Con comisión de USD 1 y aportes de USD 50, pagas 2% solo por entrar. Acumula y compra menos veces.' },
        { t: 'task', html: 'Abre el <em>Laboratorio</em> de esta app y usa la calculadora de <strong>costo total de operación</strong> con tu aporte mensual real y las tarifas de dos brokers. Anota cuál gana y por cuánto.' }
      ],
      keyIdea: 'No controlas la rentabilidad. Controlas el costo. Empieza por donde tienes poder.',
      pills: [
        'Pregunta siempre por el margen de cambio de divisa: un 0,5% de FX en cada ida y vuelta pesa más que muchas comisiones anunciadas.',
        'Los brokers de "cero comisión" cobran en otro lado: spread, FX, préstamo de acciones o venta del flujo de órdenes.'
      ]
    },

    {
      id: 'l1-05', key: 'ordenes', num: 5, tag: 'Ejecución', min: 10,
      title: 'Órdenes, fracciones y por qué evitar los CFD',
      goal: 'Ejecutar con intención: saber qué botón hace qué antes de tocarlo.',
      objectives: [
        'Elegir entre orden de mercado y limitada según liquidez y urgencia.',
        'Reconocer un ticket de CFD y un ticket de activo real.',
        'Descartar apalancamiento y venta en corto en una cartera de largo plazo.'
      ],
      blocks: [
        { t: 'table', head: ['Tipo de orden', 'Qué garantiza', 'Qué no garantiza', 'Cuándo usarla'], rows: [
          ['Mercado', 'Ejecución rápida', 'El precio final', 'Activos muy líquidos, montos pequeños'],
          ['Limitada', 'El precio máximo que pagas', 'Que se ejecute', 'Spread amplio, poca liquidez, horario irregular'],
          ['Stop / Stop-loss', 'Que se envíe una orden al tocar un nivel', 'El precio de ejecución en un hueco de mercado', 'Uso táctico; poco relevante para DCA de largo plazo'],
          ['Recurrente / automática', 'Constancia y disciplina', 'Buen precio de entrada', 'Aportes mensuales sistemáticos']
        ]},
        { t: 'concepts', cols: 2, items: [
          { h: 'Fracciones', p: 'Permiten invertir un monto exacto sin comprar una unidad completa. No todos los brokers ni todos los mercados las ofrecen.' },
          { h: 'Liquidez', p: 'Facilidad de comprar o vender sin mover el precio. Se ve en el volumen diario y en el spread.' },
          { h: 'Horario', p: 'Operar fuera de la sesión principal del mercado suele ampliar el spread. Prefiere el horario regular.' },
          { h: 'Settlement', p: 'El plazo en que la operación se liquida en tu cuenta. Afecta cuándo puedes retirar.' }
        ]},
        { t: 'warn', h: 'Un CFD no te hace dueño de nada', html: 'Un contrato por diferencia replica el movimiento del precio mediante un acuerdo con el broker. No hay acción ni participación del fondo a tu nombre. Suele incluir spread ampliado, costos de financiación por noche y apalancamiento activado por defecto. Los reguladores europeos publican que la mayoría de las cuentas minoristas de CFD pierden dinero. Para esta ruta la regla es: compra, ×1, sin venta en corto, activo real verificado en el ticket.' },
        { t: 'check', title: 'Antes de confirmar cualquier orden', items: [
          'El ticket dice compra, no venta en corto',
          'El multiplicador es ×1 (sin apalancamiento)',
          'Aparece el nombre y el ISIN o ticker exacto que investigué',
          'Se identifica como activo real, no CFD ni "producto sintético"',
          'Veo el monto, la comisión estimada y el spread',
          'La moneda de liquidación es la que espero',
          'El mercado está en horario regular'
        ]},
        { t: 'tip', h: 'La orden limitada como cinturón', html: 'Coloca el límite un poco por encima del precio de compra actual. Te protege de un salto brusco sin arriesgarte a que la orden nunca se ejecute.' },
        { t: 'task', html: 'En cuenta demo, prepara una orden y <strong>no la confirmes</strong>. Toma una captura mental o escrita de dónde aparecen: monto, tipo de orden, apalancamiento, costos y el texto que indica si es activo real o CFD.' }
      ],
      keyIdea: 'El apalancamiento no acelera un buen plan: acelera el momento en que dejas de poder ejecutarlo.',
      pills: [
        'Si el broker te ofrece "multiplicar" tu posición, está vendiéndote riesgo, no oportunidad.',
        'Los stop-loss no protegen contra huecos de apertura: el precio puede saltar por debajo de tu nivel sin pasar por él.'
      ]
    },

    {
      id: 'l1-06', key: 'seleccion', num: 6, tag: 'Investigación', min: 14,
      title: 'Cómo estudiar un ETF antes de comprarlo',
      goal: 'Convertir una ficha técnica en una decisión razonada.',
      objectives: [
        'Leer un factsheet o KID identificando los diez datos que importan.',
        'Detectar concentración oculta bajo una etiqueta "global".',
        'Comparar dos ETFs equivalentes sin usar la rentabilidad pasada.'
      ],
      blocks: [
        { t: 'p', html: 'La rentabilidad de los últimos tres años es el dato más visible y el menos útil. Un fondo que subió mucho puede haberlo hecho por concentrarse en lo que estaba de moda — exactamente el riesgo que quieres medir, no comprar.' },
        { t: 'steps', items: [
          { h: 'Objetivo e índice', p: 'Qué regla replica exactamente y quién la publica.' },
          { h: 'Composición', p: 'Número de posiciones, peso de las 10 mayores, países y sectores.' },
          { h: 'TER', p: 'Costo anual. Compáralo con alternativas del mismo índice, no en abstracto.' },
          { h: 'Patrimonio y volumen', p: 'Un fondo pequeño puede cerrarse o fusionarse. Busca tamaño y negociación diaria consistente.' },
          { h: 'Spread', p: 'Diferencia compra-venta típica. Es un costo por cada entrada y salida.' },
          { h: 'Domicilio', p: 'Irlanda, Luxemburgo, EE. UU. Determina retenciones e implicaciones sucesorias.' },
          { h: 'Dividendos', p: 'Acumulación o distribución, y con qué frecuencia.' },
          { h: 'Método de réplica', p: 'Física total, por muestreo o sintética con swap.' },
          { h: 'Moneda', p: 'Distingue moneda de cotización, moneda de los activos y cobertura cambiaria.' },
          { h: 'Disponibilidad real', p: 'Que exista no significa que tu broker te lo venda como activo real.' }
        ]},
        { t: 'warn', h: 'Moneda de cotización ≠ exposición económica', html: 'Un ETF de acciones japonesas cotizado en dólares sigue expuesto al yen: la moneda de la pantalla no cambia el negocio subyacente. Y un ETF "global" con 60–65% en Estados Unidos es una decisión de concentración, aunque el nombre diga "mundo".' },
        { t: 'table', head: ['Señal', 'Qué mirar', 'Bandera roja'], rows: [
          ['Tamaño', 'Patrimonio gestionado', 'Menos de USD 100 millones y sin crecimiento'],
          ['Antigüedad', 'Años desde el lanzamiento', 'Menos de 3 años en un tema de moda'],
          ['Concentración', 'Peso de las 10 primeras posiciones', 'Más del 50% en diez nombres si se vende como diversificado'],
          ['Costo', 'TER frente a pares del mismo índice', 'Más del doble sin razón estructural'],
          ['Liquidez', 'Volumen diario y spread', 'Spread superior al 0,5% de forma habitual'],
          ['Nombre', 'Cuán específico es', '"Disruptivo", "Next generation", "AI Revolution"']
        ]},
        { t: 'tip', h: 'Prueba del gemelo', html: 'Antes de comprar, busca al menos un ETF que replique el mismo índice de otra gestora. Si no encuentras ninguno, probablemente el índice es demasiado nicho.' },
        { t: 'task', html: 'Compara dos ETFs equivalentes y escribe en tres frases por qué uno encaja mejor en tu plan. Prohibido usar el argumento "porque subió más".' }
      ],
      keyIdea: 'Compras una regla y una estructura de costos, no un gráfico ascendente.',
      pills: [
        'El peso de Estados Unidos en un índice mundial no es una opinión de la gestora: refleja la capitalización del mercado. Aceptarlo o corregirlo es tu decisión, pero hazla consciente.',
        'Si el nombre del ETF suena a titular de prensa, el índice probablemente se diseñó después de que la tendencia ya subió.'
      ]
    },

    {
      id: 'l1-07', key: 'demo-guiada', num: 7, tag: 'Práctica', min: 15,
      title: 'Primera operación guiada en cuenta demo',
      goal: 'Recorrer el flujo completo sin dinero real y sin sorpresas.',
      objectives: [
        'Ejecutar una compra simulada verificando cada campo del ticket.',
        'Registrar la decisión con su justificación antes de conocer el resultado.',
        'Observar cuatro semanas sin reaccionar al ruido diario.'
      ],
      blocks: [
        { t: 'p', html: 'La cuenta demo no sirve para "ver si le atino". Sirve para descubrir dónde está cada cosa en la interfaz, cuánto cuesta realmente una operación y cómo reacciona tu cabeza cuando el número se pone rojo.' },
        { t: 'steps', numbered: true, items: [
          { h: 'Activa la cartera virtual', p: 'Confirma que la cuenta muestra dinero ficticio y no fondos reales.' },
          { h: 'Busca el ETF investigado', p: 'Coteja símbolo, nombre completo, bolsa y gestora con la ficha oficial.' },
          { h: 'Abre una compra', p: 'Nunca venta en corto. Si la plataforma pregunta dirección, es señal de producto derivado.' },
          { h: 'Usa un monto realista', p: 'Simula tu aporte mensual verdadero, no un capital imaginario de USD 100.000.' },
          { h: 'Verifica ×1 y activo real', p: 'Si aparece apalancamiento, costos nocturnos o la palabra CFD, detente.' },
          { h: 'Revisa costos', p: 'Anota comisión estimada, spread y precio de referencia antes de confirmar.' },
          { h: 'Registra la decisión', p: 'Objetivo, monto, precio, costos y la regla del plan que respalda la compra.' },
          { h: 'Observa cuatro semanas', p: 'Revisa una vez por semana como máximo. Escribe qué sentiste, no solo cuánto varió.' }
        ]},
        { t: 'warn', h: 'La demo miente en dos cosas', html: 'Ejecuta con una liquidez ideal que no siempre existe y, sobre todo, no duele. Con dinero real la misma caída del 8% se siente completamente distinta. Toma la demo como entrenamiento operativo, no como prueba de tu temple.' },
        { t: 'check', title: 'Bitácora de las cuatro semanas', items: [
          'Semana 1: anoté precio, costos y motivo de la compra',
          'Semana 2: revisé una sola vez y no modifiqué nada',
          'Semana 3: describí por escrito mi reacción a la variación',
          'Semana 4: comparé mi reacción con lo que había escrito en la Lección 3'
        ]},
        { t: 'tip', h: 'Convierte el resultado en proceso', html: 'Evalúa la operación por si seguiste tu regla, no por si ganaste. Una compra correcta puede perder dinero y una imprudente puede ganarlo: solo el proceso es repetible.' },
        { t: 'task', html: 'Completa las cuatro semanas y registra al menos dos entradas en el Diario. Luego presenta el examen del Nivel 1.' }
      ],
      keyIdea: 'Entrena el procedimiento con dinero ficticio para que el dinero real solo ponga a prueba tu paciencia.',
      pills: [
        'Programa una alerta mensual para aportar y desactiva las notificaciones de precio. La primera construye patrimonio; las segundas lo destruyen.',
        'Si la interfaz del broker no te deja claro qué estás comprando, ese es un dato sobre el broker, no sobre tu capacidad.'
      ]
    }
  ]
});
