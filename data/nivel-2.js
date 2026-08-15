/* RutaETF · Currículo — Nivel 2: Construcción */
window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push({
  id: 'n2',
  level: 2,
  name: 'Construcción',
  subtitle: 'Intermedio',
  claim: 'Armar una cartera coherente y entender qué la hace crecer o encogerse.',
  outcome: 'Al terminar podrás justificar tu asignación de activos, elegir domicilio y tipo de ETF, y sostener un sistema de aportes y rebalanceo.',
  hours: '8–10 horas',
  lessons: [

    {
      id: 'l2-01', key: 'compuesto', num: 8, tag: 'Matemática', min: 12,
      title: 'Interés compuesto, inflación y rentabilidad real',
      goal: 'Pensar siempre en poder de compra, no en cifras nominales.',
      objectives: [
        'Aplicar la fórmula del valor futuro con aportes periódicos.',
        'Convertir rentabilidad nominal en real descontando inflación.',
        'Usar la regla del 72 para estimar de cabeza.'
      ],
      blocks: [
        { t: 'formula', label: 'Valor futuro con aportes', tex: 'VF = C₀ · (1+i)ⁿ + A · [ ((1+i)ⁿ − 1) / i ]', html: 'C₀ = capital inicial · A = aporte periódico · i = tasa del periodo · n = número de periodos. Si aportas mensualmente, i es la tasa mensual y n el número de meses.' },
        { t: 'formula', label: 'Rentabilidad real (Fisher)', tex: 'r_real = (1 + r_nominal) / (1 + inflación) − 1', html: 'Con 10% nominal y 7% de inflación, el retorno real no es 3% sino 2,80%. La resta simple sobreestima el resultado cuando la inflación es alta.' },
        { t: 'formula', label: 'Regla del 72', tex: 'Años para duplicar ≈ 72 / tasa anual (%)', html: 'Al 8% anual el capital se duplica en unos 9 años. Al 4% real, en 18. Sirve para estimar mentalmente, no para proyectar con precisión.' },
        { t: 'p', html: 'El interés compuesto es indistinguible de la lentitud durante la primera mitad del camino. La mayor parte del crecimiento aparece en el último tercio del horizonte — y por eso abandonar en el año seis destruye casi todo el beneficio del plan.' },
        { t: 'example', html: 'Aportando $400.000 COP mensuales al 7% nominal: a 10 años acumulas cerca de $69 millones habiendo aportado $48 millones. A 25 años acumulas cerca de $324 millones habiendo aportado $120 millones. El tiempo hizo el doble del trabajo que tú.' },
        { t: 'warn', h: 'Colombia obliga a razonar en términos reales', html: 'Con inflación de dos dígitos, un CDT al 11% puede tener rentabilidad real cercana a cero. Una cifra nominal atractiva no significa que estés ganando poder de compra. Compara siempre contra la inflación del periodo, no contra cero.' },
        { t: 'tip', h: 'La constancia vence al monto', html: 'Un aporte pequeño y sostenido durante 20 años supera a uno grande y esporádico. La variable que más controlas no es el rendimiento: es no interrumpir.' },
        { t: 'task', html: 'En el <em>Laboratorio</em>, usa el simulador con inflación activada. Compara el valor final nominal y el real de tu plan a 20 años. Anota la diferencia.' }
      ],
      keyIdea: 'El tiempo es el único ingrediente que no puedes comprar después.',
      pills: [
        'Aumenta el aporte con cada incremento de ingreso, no el gasto. Ese hábito vale más que optimizar el 0,1% de un TER.',
        'Toda proyección es una hipótesis aritmética, no un pronóstico. El mercado no entrega retornos constantes en línea recta.'
      ]
    },

    {
      id: 'l2-02', key: 'asignacion', num: 9, tag: 'Cartera', min: 14,
      title: 'Asignación de activos: la decisión que más pesa',
      goal: 'Definir el reparto entre acciones y renta fija con criterio, no con intuición.',
      objectives: [
        'Reconocer que la asignación explica la mayor parte de la variabilidad del resultado.',
        'Combinar capacidad, necesidad y tolerancia al riesgo.',
        'Construir una cartera núcleo-satélite de tres a cuatro piezas.'
      ],
      blocks: [
        { t: 'p', html: 'Elegir 70/30 o 40/60 entre acciones y bonos influye mucho más en tu resultado que elegir entre dos ETFs globales casi idénticos. La industria vende lo segundo porque es lo que se puede empaquetar; lo primero es lo que decide tu vida financiera.' },
        { t: 'concepts', cols: 3, items: [
          { h: 'Capacidad de riesgo', p: 'Objetiva: horizonte, estabilidad del ingreso, deudas, dependientes. No se negocia.' },
          { h: 'Necesidad de riesgo', p: '¿Cuánto retorno requiere tu meta? Si ya la alcanzas con poco riesgo, asumir más es innecesario.' },
          { h: 'Tolerancia al riesgo', p: 'Subjetiva: cuánto aguantas sin vender. Solo la conoces de verdad en la primera caída fuerte.' }
        ]},
        { t: 'table', head: ['Perfil', 'Acciones globales', 'Renta fija', 'Satélite', 'Caída típica a soportar'], rows: [
          ['Cauteloso', '40–50%', '50–60%', '0%', '15–20%'],
          ['Equilibrado', '60–70%', '25–35%', '0–5%', '25–30%'],
          ['Crecimiento', '80–90%', '5–15%', '0–10%', '35–45%'],
          ['Agresivo', '95–100%', '0–5%', '0–10%', '50%+']
        ]},
        { t: 'p', html: 'La estructura <strong>núcleo-satélite</strong> mantiene el 85–100% de la cartera en piezas amplias, baratas y aburridas (el núcleo) y reserva un margen pequeño y acotado para convicciones personales (el satélite). El satélite existe para que la curiosidad no destruya el núcleo.' },
        { t: 'steps', items: [
          { h: 'Cartera de 1 pieza', p: 'Un ETF global de acciones. Máxima simplicidad, máxima volatilidad.' },
          { h: 'Cartera de 2 piezas', p: 'ETF global de acciones + ETF de bonos agregados. Cubre el 95% de las necesidades reales.' },
          { h: 'Cartera de 3 piezas', p: 'Añade mercados emergentes o renta fija local para ajustar exposición y moneda.' },
          { h: 'Cartera de 4+ piezas', p: 'Solo si cada pieza responde a una razón escrita. Más piezas ≠ más diversificación.' }
        ]},
        { t: 'warn', h: 'Las reglas de bolsillo son puntos de partida, no verdades', html: 'La vieja fórmula "100 menos tu edad en acciones" ignora tu estabilidad laboral, tus deudas, tu pensión y tu horizonte real. Úsala como referencia inicial y ajústala con tu situación concreta. Esta app no puede recomendarte un porcentaje personal.' },
        { t: 'tip', h: 'Escríbelo antes de necesitarlo', html: 'Define tu asignación objetivo en un documento con fecha. En medio de una caída del 30% no estarás en condiciones de decidirla bien.' },
        { t: 'task', html: 'Usa <em>Mi plan</em> para generar tu plantilla y contrasta la caída típica de la tabla con lo que escribiste en la Lección 3. Si no coinciden, baja el porcentaje en acciones.' }
      ],
      keyIdea: 'La asignación de activos es tu verdadera estrategia. Todo lo demás son detalles de implementación.',
      pills: [
        'Si dudas entre dos asignaciones, elige la más conservadora: la que puedes sostener siempre gana a la óptima que abandonas.',
        'Añadir un cuarto y un quinto fondo casi nunca mejora la diversificación; casi siempre empeora el mantenimiento.'
      ]
    },

    {
      id: 'l2-03', key: 'domicilio', num: 10, tag: 'Estructura', min: 15,
      title: 'Domicilio del ETF: UCITS irlandés frente a estadounidense',
      goal: 'Elegir la estructura del fondo entendiendo retenciones y sucesión.',
      objectives: [
        'Explicar por qué el domicilio afecta el retorno neto de un residente colombiano.',
        'Comparar retención sobre dividendos entre estructuras.',
        'Conocer la exposición al impuesto sucesorio estadounidense.'
      ],
      blocks: [
        { t: 'p', html: 'Dos ETFs pueden replicar el mismo índice con el mismo TER y entregarte retornos netos distintos. La diferencia está en el país donde el fondo está domiciliado y en los tratados fiscales que ese país tiene con Estados Unidos y contigo.' },
        { t: 'table', head: ['Aspecto', 'ETF domiciliado en EE. UU.', 'ETF UCITS (Irlanda)'], rows: [
          ['Retención sobre dividendos de acciones estadounidenses', 'Se retiene al inversionista extranjero según el tratado con su país de residencia. Colombia no tiene tratado tributario general con EE. UU., por lo que suele aplicarse la tarifa plena del 30%.', 'El fondo, amparado en el tratado Irlanda–EE. UU., soporta 15% a nivel del fondo. Irlanda no aplica retención adicional al distribuir a no residentes.'],
          ['Impuesto sucesorio estadounidense', 'Las acciones de sociedades estadounidenses son activos con situs en EE. UU. El IRS exige actualmente la declaración 706-NA cuando los activos estadounidenses de un no residente no ciudadano superan USD 60.000; la obligación final depende del patrimonio y los tratados aplicables.', 'Una participación en un fondo irlandés no es, en principio, una acción de una sociedad estadounidense, aunque el fondo invierta en ellas. Verifica la estructura y tu caso sucesorio.'],
          ['Versión de acumulación', 'Poco frecuente por regulación estadounidense.', 'Muy común; permite reinvertir sin recibir efectivo.'],
          ['Costos y liquidez', 'Suelen ser más baratos y con mayor volumen.', 'TER algo mayor y spreads más amplios en algunos casos.'],
          ['Acceso desde brokers internacionales', 'Amplio.', 'Depende del broker y de su clasificación de cliente.']
        ]},
        { t: 'warn', h: 'Verifica antes de asumir', html: 'Las tarifas, umbrales y tratados cambian y dependen de tu situación particular. Los datos anteriores son el marco general con el que se estudia el tema, no una liquidación de tus impuestos. Consulta la ficha del fondo, tu broker y un contador tributario en Colombia antes de decidir por motivos fiscales.' },
        { t: 'example', html: 'Sobre un ETF con 2% de rentabilidad por dividendo, la diferencia entre soportar 30% y 15% de retención equivale a unos 0,30 puntos porcentuales anuales de retorno. Es más de lo que suele separar el TER de dos fondos competidores.' },
        { t: 'kv', items: [
          { k: 'W-8BEN', v: 'Formulario que declara al broker que no eres persona estadounidense. Generalmente es válido hasta el final del tercer año calendario siguiente a la firma, salvo cambios de circunstancias u otras condiciones indicadas por el intermediario.' },
          { k: 'ISIN', v: 'Código internacional del valor. Empieza por IE en los fondos irlandeses y por US en los estadounidenses. Es la forma más rápida de verificar el domicilio.' },
          { k: 'Situs', v: 'Ubicación fiscal del activo para efectos sucesorios. No es lo mismo que la bolsa donde cotiza.' },
          { k: 'KID / KIID', v: 'Documento estandarizado de datos fundamentales de los productos UCITS. Resume riesgo, costos y escenarios.' }
        ]},
        { t: 'tip', h: 'Lee el ISIN, no el nombre', html: 'Dos fondos con nombre casi idéntico pueden tener domicilios distintos. El ISIN aparece en la ficha oficial y en el ticket de la orden: es la fuente confiable.' },
        { t: 'task', html: 'Toma el ETF global que investigaste en la Lección 6 y localiza su ISIN, su domicilio y su política de dividendos. Busca su equivalente en la otra estructura y compara TER y patrimonio.' }
      ],
      keyIdea: 'El domicilio del fondo es una decisión de retorno neto y de planeación sucesoria, no un tecnicismo.',
      pills: [
        'Mantén el W-8BEN vigente: es un trámite de cinco minutos que puede costar puntos de rentabilidad si caduca.',
        'La retención soportada dentro del fondo no aparece en ninguna factura: se refleja como un retorno ligeramente inferior al del índice.'
      ]
    },

    {
      id: 'l2-04', key: 'divisa', num: 11, tag: 'Moneda', min: 12,
      title: 'Riesgo cambiario COP–USD y cuándo cubrirlo',
      goal: 'Entender qué parte de tu resultado viene del mercado y qué parte del dólar.',
      objectives: [
        'Separar el retorno del activo del retorno de la divisa.',
        'Evaluar si la cobertura cambiaria tiene sentido según el horizonte.',
        'Reducir el costo de conversión en los aportes mensuales.'
      ],
      blocks: [
        { t: 'formula', label: 'Retorno total en pesos', tex: '(1 + r_activo) × (1 + Δ USD/COP) − 1', html: 'Si el ETF sube 8% en dólares y el dólar sube 10% frente al peso, tu retorno en pesos es 1,08 × 1,10 − 1 = 18,8%. Si el dólar cae 10%, es 1,08 × 0,90 − 1 = −2,8% con el mismo activo.' },
        { t: 'p', html: 'Para un inversionista colombiano, invertir en el exterior es tomar dos decisiones a la vez: una sobre el activo y otra sobre la moneda. Durante años la devaluación del peso ha maquillado resultados mediocres y ocultado buenos años; conviene medir ambas por separado.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'Diversificación cambiaria', p: 'Tu ingreso, tu vivienda y tu pensión ya están en pesos. Tener parte del patrimonio en divisa fuerte reduce la dependencia de una sola economía.' },
          { h: 'Descalce', p: 'Si vas a gastar en pesos dentro de dos años, una posición en dólares agrega un riesgo que no necesitas.' },
          { h: 'ETF con cobertura (hedged)', p: 'Neutraliza el efecto de la divisa a cambio de un costo anual y del diferencial de tasas entre monedas.' },
          { h: 'Sin cobertura', p: 'Más volatilidad en el corto plazo, pero mantiene la protección frente a una devaluación estructural del peso.' }
        ]},
        { t: 'warn', h: 'La cobertura no es gratis', html: 'Cubrir una moneda de país emergente frente al dólar tiene un costo asociado al diferencial de tasas, que puede ser de varios puntos porcentuales al año. En horizontes largos ese costo suele superar el beneficio de reducir volatilidad.' },
        { t: 'table', head: ['Situación', 'Enfoque habitual de estudio'], rows: [
          ['Meta en pesos a menos de 3 años', 'Evitar exposición cambiaria; mantener el dinero en COP.'],
          ['Meta en pesos a más de 10 años', 'Exposición sin cobertura suele considerarse aceptable, aceptando volatilidad.'],
          ['Meta en dólares (estudios, viaje, migración)', 'La exposición en dólares reduce el riesgo en vez de aumentarlo.'],
          ['Renta fija internacional', 'La divisa suele dominar el retorno; aquí la cobertura tiene más sentido que en acciones.']
        ]},
        { t: 'tip', h: 'Reduce fricción de conversión', html: 'Convertir COP a USD una vez al trimestre en lugar de cuatro veces al mes reduce el costo de FX y las comisiones fijas, sin abandonar el aporte sistemático.' },
        { t: 'task', html: 'Revisa tu último año hipotético: separa cuánto habría venido del activo y cuánto del movimiento del dólar. Escribe si tu plan sigue teniendo sentido si el peso se aprecia un 15%.' }
      ],
      keyIdea: 'Inviertes en pesos, mides en pesos y gastas en pesos. La divisa es parte del riesgo, no un detalle.',
      pills: [
        'Nunca justifiques una inversión internacional solo por "el dólar va a subir": eso es una apuesta de tipo de cambio, no un plan.',
        'Compara siempre la tasa que te da el broker con la tasa de mercado del día: la diferencia es el costo real de la conversión.'
      ]
    },

    {
      id: 'l2-05', key: 'rentafija', num: 12, tag: 'Renta fija', min: 14,
      title: 'Bonos: duración, tasas y por qué también caen',
      goal: 'Usar la renta fija como amortiguador entendiendo cuándo no amortigua.',
      objectives: [
        'Explicar la relación inversa entre tasas y precio de los bonos.',
        'Interpretar la duración como sensibilidad, no como plazo.',
        'Distinguir riesgo de tasa, de crédito y de inflación.'
      ],
      blocks: [
        { t: 'p', html: 'Comprar un bono es prestar dinero a cambio de intereses. Si las tasas del mercado suben después de tu compra, tu bono paga menos que los nuevos y su precio cae para compensar. Esa mecánica sorprende a quien creía que la renta fija "no baja".' },
        { t: 'formula', label: 'Sensibilidad aproximada', tex: 'Δ precio ≈ − duración × Δ tasa', html: 'Un fondo con duración 7 frente a una subida de tasas de 2 puntos porcentuales pierde aproximadamente 14% de valor. Es exactamente lo que ocurrió en 2022 en los mercados globales.' },
        { t: 'concepts', cols: 3, items: [
          { h: 'Riesgo de tasa', p: 'Movimientos en las tasas de interés. Lo mide la duración.' },
          { h: 'Riesgo de crédito', p: 'Que el emisor no pague. Lo aproxima la calificación crediticia.' },
          { h: 'Riesgo de inflación', p: 'Que el cupón fijo pierda poder de compra. Lo mitigan los bonos indexados.' }
        ]},
        { t: 'table', head: ['Tipo', 'Duración típica', 'Rol en la cartera'], rows: [
          ['Mercado monetario / muy corto plazo', 'Menos de 1', 'Estabilidad casi total. Sustituto de efectivo.'],
          ['Bonos agregados globales', '5–7', 'Amortiguador clásico frente a caídas de acciones.'],
          ['Bonos largos del tesoro', '15+', 'Muy sensibles a tasas. Herramienta especializada.'],
          ['Alto rendimiento (high yield)', '3–5', 'Se comporta más como acciones en las crisis. No es un amortiguador.'],
          ['TES en Colombia', 'Variable', 'Exposición local en pesos, sin riesgo cambiario, con riesgo soberano y de inflación local.']
        ]},
        { t: 'warn', h: 'El "high yield" no es renta fija defensiva', html: 'Los bonos de alto rendimiento caen junto con las acciones justo cuando necesitas que algo suba. Si buscas amortiguación, la calidad crediticia importa más que el cupón.' },
        { t: 'tip', h: 'Regla de la duración y el horizonte', html: 'Como referencia de estudio, una duración similar a tu horizonte de inversión equilibra riesgo de tasa y de reinversión. Para metas cortas, duraciones cortas.' },
        { t: 'task', html: 'Busca la duración efectiva de un ETF de bonos agregados y calcula cuánto caería con un alza de tasas de 1,5 puntos. Compara ese número con tu tolerancia declarada.' }
      ],
      keyIdea: 'La renta fija reduce la volatilidad de la cartera, no la elimina. Su precio es un retorno esperado menor.',
      pills: [
        'Cuando las tasas suben, un fondo de bonos cae hoy pero reinvierte a tasas mejores: el daño de corto plazo se compensa si mantienes más allá de su duración.',
        'La renta fija de tu cartera no está para ganar dinero: está para que puedas sostener las acciones cuando caigan.'
      ]
    },

    {
      id: 'l2-06', key: 'dca', num: 13, tag: 'Ejecución', min: 11,
      title: 'DCA, suma global y el mito de "esperar el momento"',
      goal: 'Elegir un método de entrada y sostenerlo sin negociarlo cada mes.',
      objectives: [
        'Comparar aportes periódicos con inversión de una sola vez.',
        'Reconocer el costo histórico de estar fuera del mercado.',
        'Automatizar para eliminar la decisión recurrente.'
      ],
      blocks: [
        { t: 'p', html: '<strong>DCA</strong> (dollar-cost averaging) es invertir montos similares a intervalos regulares. No maximiza el resultado esperado: el mercado sube más veces de las que baja, así que estadísticamente invertir todo de una vez ha tendido a rendir más. Lo que hace el DCA es reducir el arrepentimiento y hacer el plan sostenible.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'DCA por flujo', p: 'Es lo que hace casi todo el mundo: inviertes tu ahorro mensual conforme llega. No hay alternativa que evaluar.' },
          { h: 'DCA por decisión', p: 'Tienes un capital disponible y eliges repartirlo en cuotas. Aquí sí hay una elección: menor retorno esperado a cambio de menor riesgo de mal timing.' }
        ]},
        { t: 'warn', h: 'Esperar "a que baje" tiene un costo medible', html: 'Los estudios sobre estar fuera del mercado en los mejores días muestran un deterioro severo del resultado a largo plazo, y esos días suelen concentrarse en pleno pánico. Quien sale para "volver cuando se aclare" normalmente vuelve más caro.' },
        { t: 'steps', items: [
          { h: 'Fija una fecha', p: 'El mismo día de cada mes, idealmente justo después de recibir el ingreso.' },
          { h: 'Fija un monto', p: 'Un porcentaje del ingreso, no lo que sobre a fin de mes.' },
          { h: 'Automatiza el traslado', p: 'Transferencia programada a la cuenta de inversión antes de gastar.' },
          { h: 'Agrupa las compras', p: 'Si la comisión fija pesa, acumula y compra cada uno o tres meses.' },
          { h: 'No renegocies', p: 'La única razón válida para cambiar el monto es un cambio en tu situación, no en el titular del día.' }
        ]},
        { t: 'tip', h: 'Aporte extra en las caídas', html: 'Si quieres aprovechar las bajadas sin hacer market timing, define por escrito y con anticipación una regla mecánica: por ejemplo, un aporte adicional fijo cuando el mercado cae más de cierto porcentaje desde su máximo, con un tope anual.' },
        { t: 'task', html: 'Programa la transferencia automática de tu aporte y escribe en el Diario la fecha, el monto y la condición bajo la cual lo cambiarías.' }
      ],
      keyIdea: 'El mejor método de entrada es el que puedes repetir 240 meses seguidos sin pensar.',
      pills: [
        'Automatizar no es pereza: es blindarte contra tu propio estado de ánimo.',
        'Nadie toca la campana al inicio de un mercado alcista. El fondo solo se reconoce mucho después.'
      ]
    },

    {
      id: 'l2-07', key: 'rebalanceo', num: 14, tag: 'Mantenimiento', min: 12,
      title: 'Rebalanceo: mantener el riesgo bajo control',
      goal: 'Devolver la cartera a su objetivo con una regla, no con una opinión.',
      objectives: [
        'Detectar cómo la deriva del mercado cambia tu perfil sin que lo decidas.',
        'Comparar rebalanceo por calendario y por bandas.',
        'Rebalancear con aportes nuevos para reducir costos e impuestos.'
      ],
      blocks: [
        { t: 'p', html: 'Si empiezas 70/30 y las acciones suben con fuerza durante tres años, puedes terminar en 85/15 sin haber tomado ninguna decisión. El mercado te volvió más agresivo justo cuando los precios son más altos. Rebalancear corrige esa deriva.' },
        { t: 'table', head: ['Método', 'Cómo funciona', 'Ventaja', 'Inconveniente'], rows: [
          ['Por calendario', 'Revisas una vez al año en fecha fija.', 'Simple y predecible.', 'Puede llegar tarde a un movimiento brusco.'],
          ['Por bandas', 'Actúas cuando un activo se desvía más de 5 puntos absolutos o 20% relativo.', 'Responde al riesgo real.', 'Requiere monitoreo y disciplina.'],
          ['Con aportes nuevos', 'Diriges el aporte mensual al activo rezagado.', 'Sin ventas, sin impuestos, sin comisiones extra.', 'Insuficiente si la desviación es grande.'],
          ['Mixto', 'Revisión anual + banda de emergencia.', 'Equilibrio razonable para la mayoría.', 'Hay que escribir la regla y respetarla.']
        ]},
        { t: 'example', html: 'Cartera objetivo 70/30 con banda de 5 puntos. Tras un año fuerte queda en 78/22: supera la banda, se rebalancea vendiendo acciones y comprando bonos. Se está vendiendo lo que subió y comprando lo que quedó atrás — que es exactamente lo que el instinto se niega a hacer.' },
        { t: 'warn', h: 'Rebalancear tiene costos', html: 'Cada venta puede generar comisiones, spread y un hecho gravable. Rebalancear cada mes destruye valor. Una o dos veces al año, o cuando se rompa la banda, es el rango que se estudia habitualmente.' },
        { t: 'tip', h: 'Prioriza el orden correcto', html: 'Primero corrige con aportes nuevos, después con dividendos recibidos y solo al final vendiendo. Ese orden minimiza costos e impuestos.' },
        { t: 'task', html: 'Usa la calculadora de <strong>rebalanceo por bandas</strong> en el Laboratorio con tu asignación objetivo. Define y escribe tu regla: fecha de revisión, ancho de banda y orden de corrección.' }
      ],
      keyIdea: 'Rebalancear no busca más rentabilidad: busca que tu cartera siga siendo la que decidiste tener.',
      pills: [
        'Elige una fecha de revisión anual sin significado de mercado — tu cumpleaños, por ejemplo — para no vincularla a noticias.',
        'Si rebalancear te resulta doloroso, es porque está funcionando: siempre implica vender al ganador del año.'
      ]
    }
  ]
});
