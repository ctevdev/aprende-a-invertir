/* RutaETF · Currículo — Nivel 4: Maestría */
window.CURRICULUM = window.CURRICULUM || [];

window.CURRICULUM.push({
  id: 'n4',
  level: 4,
  name: 'Maestría',
  subtitle: 'Experto',
  claim: 'Convertir la cartera en un sistema: reglas, impuestos, retiro y continuidad.',
  outcome: 'Al terminar tendrás una declaración de política de inversión escrita, un mapa fiscal, un plan de retiro y una carpeta de continuidad.',
  hours: '10–14 horas',
  lessons: [

    {
      id: 'l4-01', key: 'ips', num: 22, tag: 'Sistema', min: 16,
      title: 'Tu declaración de política de inversión (IPS)',
      goal: 'Poner por escrito las reglas que decidirán por ti cuando no puedas pensar bien.',
      objectives: [
        'Redactar los ocho apartados de una IPS personal.',
        'Definir de antemano las condiciones de compra y de venta.',
        'Establecer un procedimiento de revisión y de enmienda.'
      ],
      blocks: [
        { t: 'p', html: 'Una <strong>IPS</strong> es el documento que usan los fondos institucionales para no improvisar. Un inversionista particular la necesita todavía más, porque nadie lo supervisa. Cabe en dos páginas y su valor aparece exactamente el día en que el mercado cae 25%.' },
        { t: 'steps', numbered: true, items: [
          { h: 'Objetivos', p: 'Metas concretas con monto, fecha y prioridad. Nada de "crecer mi dinero".' },
          { h: 'Horizonte y liquidez', p: 'Cuándo necesitas cada peso y cuánto debe permanecer accesible.' },
          { h: 'Tolerancia al riesgo', p: 'La caída máxima aceptable expresada en pesos, no solo en porcentaje.' },
          { h: 'Asignación objetivo', p: 'Porcentajes por clase de activo, con bandas permitidas.' },
          { h: 'Criterios de selección', p: 'Reglas para elegir vehículos: TER máximo, patrimonio mínimo, domicilio, réplica.' },
          { h: 'Reglas de aporte', p: 'Monto, frecuencia, mecanismo automático y qué hacer con los extraordinarios.' },
          { h: 'Reglas de rebalanceo y venta', p: 'Cuándo se vende. Solo tres razones válidas: rebalanceo, cumplimiento de la meta o cambio en tus circunstancias vitales.' },
          { h: 'Revisión y enmienda', p: 'Fecha anual fija. Ningún cambio se aplica antes de 30 días desde que se propone.' }
        ]},
        { t: 'warn', h: 'La cláusula que evita el desastre', html: 'Incluye textualmente: <em>"Las caídas de mercado, por severas que sean, no constituyen una razón para vender. Cualquier modificación a esta política requiere 30 días de espera y quedar escrita con fecha."</em> Esa demora es lo que separa una decisión de una reacción.' },
        { t: 'tip', h: 'Firma y guarda', html: 'Imprímela, fírmala con fecha y guárdala junto a tus documentos importantes. El acto físico de firmar aumenta de forma medible el compromiso con lo escrito.' },
        { t: 'task', html: 'Redacta tu IPS completa con los ocho apartados. Es el entregable más importante de toda la ruta.' }
      ],
      keyIdea: 'Las decisiones se toman en frío y se ejecutan en caliente. La IPS es el puente entre ambos momentos.',
      pills: [
        'Si tu plan cabe en una tarjeta, lo recordarás bajo presión. Si necesita un manual, lo abandonarás.',
        'Revisa la IPS cuando cambie tu vida — hijos, trabajo, salud, herencia — no cuando cambie el mercado.'
      ]
    },

    {
      id: 'l4-02', key: 'fiscal', num: 23, tag: 'Impuestos', min: 20,
      title: 'Fiscalidad en Colombia para inversiones en el exterior',
      goal: 'Conocer el mapa de obligaciones para poder preguntarle bien a un contador.',
      objectives: [
        'Identificar los hechos que generan obligaciones tributarias.',
        'Distinguir renta ordinaria de ganancia ocasional por tiempo de tenencia.',
        'Reunir la documentación necesaria antes de la declaración.'
      ],
      blocks: [
        { t: 'warn', h: 'Lectura obligatoria antes de continuar', html: 'Esta lección es un mapa conceptual para que sepas qué preguntar. <strong>No es asesoría tributaria.</strong> Las tarifas, los umbrales en UVT y los formularios cambian con cada reforma y con el año gravable. Verifica siempre en la DIAN y con un contador público habilitado antes de actuar.' },
        { t: 'p', html: 'Un residente fiscal colombiano tributa sobre su renta de fuente mundial. Tener la cuenta en el exterior no elimina la obligación ni permite asumir que la información es invisible: el intermediario puede no practicar las retenciones o liquidaciones colombianas y existen mecanismos internacionales de intercambio de información financiera. La declaración correcta sigue siendo responsabilidad del contribuyente.' },
        { t: 'table', head: ['Hecho', 'Naturaleza general', 'Qué necesitas documentar'], rows: [
          ['Vender un activo con ganancia tras menos de 2 años de tenencia', 'Suele tratarse como renta líquida ordinaria, sujeta a la tarifa progresiva de la cédula correspondiente', 'Fecha y precio de compra y de venta, comisiones'],
          ['Vender un activo con ganancia tras 2 años o más de tenencia', 'Suele tratarse como ganancia ocasional, con tarifa propia distinta de la ordinaria', 'Prueba fehaciente de la fecha de adquisición'],
          ['Recibir dividendos del exterior', 'Renta gravada; la retención practicada afuera puede dar lugar a descuento por impuestos pagados en el exterior', 'Certificados de retención del broker'],
          ['Mantener activos en el exterior', 'Puede existir obligación de declararlos cuando superan el umbral en UVT del año', 'Saldo al 31 de diciembre y detalle por activo'],
          ['Mover dinero entre cuentas', 'Puede causar GMF (4×1.000) según la operación y las exenciones aplicables', 'Extractos bancarios'],
          ['Patrimonio total elevado', 'Puede activar el impuesto al patrimonio según el umbral vigente', 'Valoración patrimonial al cierre']
        ]},
        { t: 'kv', items: [
          { k: 'Residencia fiscal', v: 'Se determina, entre otros criterios, por permanencia superior a 183 días en un periodo de 365. Define si tributas por renta mundial.' },
          { k: 'UVT', v: 'Unidad de Valor Tributario. Casi todos los umbrales se expresan en UVT y su valor en pesos cambia cada año.' },
          { k: 'W-8BEN', v: 'Declara ante el broker que no eres persona estadounidense. Afecta la retención sobre dividendos de fuente estadounidense.' },
          { k: 'Descuento por impuestos pagados en el exterior', v: 'Mecanismo para evitar doble tributación sobre la misma renta. Requiere soportes formales.' },
          { k: 'Estate tax de EE. UU.', v: 'Impuesto sucesorio sobre activos con situs estadounidense de titulares no residentes, con un umbral de exención bajo. Es una de las razones para estudiar fondos UCITS.' },
          { k: 'CRS / intercambio de información', v: 'Marco por el que las autoridades fiscales intercambian datos de cuentas financieras de no residentes.' }
        ]},
        { t: 'check', title: 'Carpeta fiscal a mantener todo el año', items: [
          'Extractos mensuales y anuales del broker en PDF',
          'Reporte de operaciones con fecha, cantidad y precio de cada compra y venta',
          'Certificados de dividendos y de retenciones practicadas en el exterior',
          'Comprobantes de conversión de divisa con la tasa aplicada',
          'Saldo de todas las cuentas al 31 de diciembre',
          'Tasa de cambio oficial de cierre del año para la conversión a pesos',
          'Copia del W-8BEN vigente y su fecha de renovación'
        ]},
        { t: 'tip', h: 'Digitaliza en el momento, no en marzo', html: 'Guarda cada extracto el mismo mes en una carpeta por año gravable. Reconstruir dos años de operaciones en temporada de declaración cuesta mucho más que el impuesto.' },
        { t: 'task', html: 'Crea la carpeta del año gravable actual con las siete casillas de la lista y agenda una revisión mensual de diez minutos.' }
      ],
      keyIdea: 'La eficiencia fiscal es rentabilidad garantizada, pero la evasión no es una estrategia: es un pasivo con intereses.',
      pills: [
        'El costo de un contador que entienda inversiones en el exterior es bajo comparado con una corrección extemporánea con sanción.',
        'La fecha de compra determina el tratamiento tributario al vender. Guarda esa prueba desde el primer día.'
      ]
    },

    {
      id: 'l4-03', key: 'retiro', num: 24, tag: 'Retiro', min: 17,
      title: 'Fase de retiro: secuencia de retornos y tasa segura',
      goal: 'Diseñar la etapa en la que la cartera deja de recibir y empieza a entregar.',
      objectives: [
        'Comprender el riesgo de secuencia de retornos.',
        'Situar la regla del 4% con sus supuestos y sus límites.',
        'Construir defensas para los primeros años de retiro.'
      ],
      blocks: [
        { t: 'p', html: 'Durante la acumulación, una caída temprana es una oportunidad: compras más barato. Durante el retiro es el peor escenario posible, porque estás vendiendo participaciones a precios deprimidos y esas participaciones nunca vuelven. Dos personas con el mismo retorno promedio pueden terminar una con patrimonio intacto y la otra en ruina, según el orden en que llegaron los años malos.' },
        { t: 'formula', label: 'Regla del 4% (origen y matiz)', tex: 'Retiro anual inicial ≈ 4% del capital, ajustado luego por inflación', html: 'Surge de estudios sobre el mercado estadounidense del siglo XX, con horizonte de 30 años y una cartera equilibrada. No es una ley: depende del país, de las valoraciones iniciales, de los costos y de los impuestos. Muchos análisis actuales trabajan con rangos del 3% al 3,5% para horizontes largos.' },
        { t: 'formula', label: 'Capital objetivo', tex: 'Capital ≈ Gasto anual / tasa de retiro', html: 'Con un gasto anual de $60.000.000 COP y una tasa del 3,5%, el capital de referencia ronda los $1.714 millones. Es una estimación de orden de magnitud, no una meta exacta.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'Colchón de liquidez', p: 'De 2 a 3 años de gasto en efectivo o renta fija muy corta para no vender acciones en una caída.' },
          { h: 'Retiro flexible', p: 'Reducir el gasto discrecional en los años malos mejora enormemente la supervivencia de la cartera.' },
          { h: 'Escalera de bonos', p: 'Vencimientos escalonados que cubren los gastos conocidos de los próximos años.' },
          { h: 'Rentas vitalicias y pensión', p: 'Un ingreso base garantizado reduce la presión sobre la cartera. Evalúa costos y solvencia del emisor.' }
        ]},
        { t: 'warn', h: 'El contexto colombiano cambia los números', html: 'La regla del 4% se construyó con datos de un mercado y una moneda específicos. Con inflación local más alta y volátil, con un sistema pensional distinto y con costos de intermediación diferentes, trasladarla sin ajustes es un error. Úsala para dimensionar el problema, no para fijar tu fecha de retiro.' },
        { t: 'tip', h: 'Ensayo general', html: 'Antes de dejar de trabajar, vive un año completo con el presupuesto exacto que planeas tener en el retiro. Es la única prueba que revela lo que las hojas de cálculo omiten.' },
        { t: 'task', html: 'Usa la calculadora de <strong>independencia financiera</strong> en el Laboratorio con tu gasto anual real. Calcula el capital objetivo con tasas del 3%, 3,5% y 4% y observa la diferencia.' }
      ],
      keyIdea: 'En el retiro no importa el retorno promedio: importa el orden en que llegan los años malos.',
      pills: [
        'Cada punto porcentual de gasto anual recortado reduce el capital necesario en decenas de millones. Ahorrar en el gasto rinde más que optimizar la cartera.',
        'Los primeros cinco años de retiro determinan buena parte del resultado de los treinta siguientes.'
      ]
    },

    {
      id: 'l4-04', key: 'alternativos', num: 25, tag: 'Alternativos', min: 14,
      title: 'Oro, inmuebles, materias primas y criptoactivos',
      goal: 'Asignar un rol y un límite a cada activo alternativo, o descartarlo.',
      objectives: [
        'Evaluar qué aporta cada alternativo a una cartera ya diversificada.',
        'Reconocer los que no generan flujo de caja.',
        'Fijar límites máximos por escrito antes de entrar.'
      ],
      blocks: [
        { t: 'p', html: 'La pregunta correcta ante cualquier alternativo no es "¿va a subir?" sino "¿qué hace en mi cartera que las acciones y los bonos no hacen ya?". Si la respuesta es "podría subir mucho", eso no es un rol: es una apuesta.' },
        { t: 'table', head: ['Activo', 'Genera flujo', 'Rol propuesto', 'Límite prudente de estudio'], rows: [
          ['Oro', 'No', 'Cobertura frente a crisis monetarias e inflación extrema', '0–10%'],
          ['REITs', 'Sí (arriendos)', 'Inmuebles líquidos; parcialmente ya incluidos en índices globales', '0–10%'],
          ['Inmueble físico', 'Sí (arriendo)', 'Patrimonio local; muy ilíquido y con costos altos de transacción', 'Según situación personal'],
          ['Materias primas', 'No', 'Descorrelación en episodios inflacionarios', '0–5%'],
          ['Criptoactivos', 'No', 'Activo especulativo de alta volatilidad', '0–5%, dinero que puedes perder por completo'],
          ['Capital privado / startups', 'A veces', 'Muy ilíquido, alta dispersión de resultados', 'Solo con capital verdaderamente sobrante']
        ]},
        { t: 'warn', h: 'Sin flujo de caja, el retorno depende del siguiente comprador', html: 'Una acción reparte beneficios y un bono paga cupones. El oro y los criptoactivos no producen nada: su precio sube solo si alguien paga más adelante. Eso no los invalida, pero cambia por completo la naturaleza del análisis y el tamaño razonable de la posición.' },
        { t: 'concepts', cols: 2, items: [
          { h: 'Riesgo de custodia', p: 'En criptoactivos, quien controla las llaves controla el activo. Las plataformas quiebran y se hackean.' },
          { h: 'Costos ocultos del inmueble', p: 'Predial, administración, mantenimiento, vacancia, comisiones y notariado. El "rendimiento del arriendo" bruto engaña.' },
          { h: 'Iliquidez', p: 'No poder vender cuando necesitas es un riesgo real, aunque no aparezca como volatilidad en el gráfico.' },
          { h: 'Concentración', p: 'Un apartamento puede ser el 80% del patrimonio de una familia. Es la posición más concentrada que muchos tendrán jamás.' }
        ]},
        { t: 'tip', h: 'La regla del límite escrito', html: 'Fija el porcentaje máximo antes de comprar el primer peso y rebalancea hacia abajo si lo supera. Sin límite previo, una posición que se multiplica termina dominando la cartera por accidente.' },
        { t: 'task', html: 'Para cada alternativo que te interese, escribe en una frase su rol y su límite máximo. Si no puedes redactar el rol, no entra en la cartera.' }
      ],
      keyIdea: 'Todo activo debe justificar su lugar por lo que aporta al conjunto, no por su historia reciente.',
      pills: [
        'Un activo que solo sube cuando todos hablan de él no está diversificando nada.',
        'En criptoactivos, dimensiona la posición asumiendo que puede ir a cero. Si esa cifra te desvela, es demasiado grande.'
      ]
    },

    {
      id: 'l4-05', key: 'fraude', num: 26, tag: 'Defensa', min: 14,
      title: 'Fraudes, pirámides y señales de alarma',
      goal: 'Reconocer un esquema fraudulento antes de transferir un peso.',
      objectives: [
        'Identificar los patrones comunes a todos los esquemas.',
        'Verificar la autorización de una entidad en Colombia.',
        'Saber a quién reportar y qué hacer si ya ocurrió.'
      ],
      blocks: [
        { t: 'p', html: 'Los esquemas fraudulentos han cambiado de envoltorio —captación tradicional, forex, criptoactivos, "trading automatizado", inteligencia artificial— pero la mecánica interna es idéntica desde hace un siglo: pagar a los antiguos con el dinero de los nuevos hasta que el flujo se detiene.' },
        { t: 'check', title: 'Señales de alarma: si aparecen dos o más, aléjate', items: [
          'Rentabilidad fija, alta y garantizada, sin importar el mercado',
          'Presión para decidir rápido o cupos que "se acaban hoy"',
          'Comisiones por referir amigos y familiares',
          'Estrategia secreta o "algoritmo propietario" que no se puede explicar',
          'Retiros que se demoran, se condicionan o exigen un pago previo',
          'Testimonios con autos, relojes y viajes',
          'La entidad no aparece en los registros del regulador',
          'Te piden transferir a una cuenta personal en lugar de institucional',
          'Contacto inicial por redes sociales, WhatsApp o Telegram',
          'Usan el nombre o el logo de una entidad conocida sin poder demostrarlo'
        ]},
        { t: 'steps', numbered: true, items: [
          { h: 'Verifica la autorización', p: 'Consulta si la entidad está vigilada por la Superintendencia Financiera de Colombia. Captar dinero del público sin autorización es un delito.' },
          { h: 'Confirma la identidad', p: 'NIT, dirección física, representante legal y años de operación real, no la fecha del dominio web.' },
          { h: 'Exige documentación', p: 'Contrato, prospecto, estados financieros auditados y política de retiros por escrito.' },
          { h: 'Prueba el retiro temprano', p: 'Con un monto pequeño. Un obstáculo aquí es la señal definitiva.' },
          { h: 'Busca opinión independiente', p: 'Fuera del círculo que te presentó la oportunidad.' },
          { h: 'Reporta', p: 'Ante la Superintendencia Financiera y la Fiscalía. Denunciar temprano protege a otros.' }
        ]},
        { t: 'warn', h: 'Los brokers del exterior no están vigilados por la SFC', html: 'Operar con un broker extranjero regulado en su jurisdicción es legítimo, pero implica que la protección al consumidor financiero colombiano no aplica. Verifica en qué país está regulado, con qué licencia, qué esquema de protección al inversionista tiene y cómo se resolverían las disputas.' },
        { t: 'tip', h: 'La prueba de la prisa', html: 'Ninguna oportunidad legítima de inversión a largo plazo exige que decidas hoy. La urgencia es la herramienta principal del estafador porque impide verificar.' },
        { t: 'task', html: 'Toma cualquier oferta de inversión que hayas recibido y aplícale las diez señales y los seis pasos. Escribe el resultado en el Diario.' }
      ],
      keyIdea: 'Si no entiendes de dónde sale el rendimiento, el rendimiento probablemente sale de tu propio capital.',
      pills: [
        'Los fraudes suelen llegar a través de alguien de confianza que también fue engañado. La buena fe del intermediario no valida el negocio.',
        'Antes de invertir, escribe el nombre de la empresa junto a palabras como "estafa", "demanda" o "advertencia" en un buscador. Cuesta un minuto.'
      ]
    },

    {
      id: 'l4-06', key: 'sistema', num: 27, tag: 'Operación', min: 13,
      title: 'El sistema operativo del inversionista',
      goal: 'Reducir el mantenimiento anual de tu patrimonio a unas pocas horas bien ubicadas.',
      objectives: [
        'Definir rutinas mensuales, trimestrales y anuales.',
        'Automatizar todo lo automatizable.',
        'Medir el proceso, no solo el resultado.'
      ],
      blocks: [
        { t: 'table', head: ['Frecuencia', 'Tarea', 'Tiempo'], rows: [
          ['Mensual', 'Verificar que el aporte automático se ejecutó', '5 minutos'],
          ['Mensual', 'Archivar el extracto en la carpeta fiscal del año', '5 minutos'],
          ['Trimestral', 'Revisar desviación frente a la asignación objetivo', '20 minutos'],
          ['Trimestral', 'Leer el Diario y evaluar el proceso, no el resultado', '20 minutos'],
          ['Anual', 'Rebalancear si se rompió la banda', '1 hora'],
          ['Anual', 'Revisar TER, spread y alternativas de los vehículos', '1 hora'],
          ['Anual', 'Actualizar la IPS si cambió tu vida', '1 hora'],
          ['Anual', 'Preparar la declaración con el contador', '2–3 horas'],
          ['Anual', 'Revisar beneficiarios y la carpeta de continuidad', '30 minutos']
        ]},
        { t: 'p', html: 'Un patrimonio bien diseñado exige menos de doce horas al año. Si el tuyo consume más, casi siempre es señal de exceso de productos, exceso de intervención o ambas cosas.' },
        { t: 'check', title: 'Carpeta de continuidad', items: [
          'Inventario de cuentas: entidad, tipo, país y número parcial',
          'Instrucciones de acceso guardadas de forma segura (gestor de contraseñas con acceso de emergencia)',
          'Datos de contacto del contador y del asesor, si existen',
          'Copia de la IPS firmada',
          'Beneficiarios designados donde el producto lo permita',
          'Carta explicativa dirigida a tu familia sobre qué hay y por qué',
          'Una persona de confianza que sepa dónde está esta carpeta'
        ]},
        { t: 'warn', h: 'El riesgo del que nadie habla', html: 'Muchas familias pierden acceso a cuentas de inversión porque nadie sabía que existían o cómo entrar. Un patrimonio invisible equivale a un patrimonio perdido. Este punto no es opcional en una ruta de nivel experto.' },
        { t: 'tip', h: 'Métricas de proceso', html: 'Al cierre del año, mide: aportes realizados sobre aportes planeados, operaciones no planificadas ejecutadas, veces que consultaste la cartera y desviación máxima frente al objetivo. Ninguna incluye la rentabilidad, y son las que sí controlas.' },
        { t: 'task', html: 'Agenda en tu calendario las nueve tareas de la tabla con recordatorios para los próximos doce meses.' }
      ],
      keyIdea: 'Un buen sistema convierte la disciplina en algo que ocurre por defecto.',
      pills: [
        'Menos productos, menos mantenimiento, menos errores. La simplicidad es una decisión de gestión de riesgo.',
        'Si tu familia no puede administrar la cartera sin ti, la cartera es demasiado compleja.'
      ]
    },

    {
      id: 'l4-07', key: 'independencia', num: 28, tag: 'Cierre', min: 12,
      title: 'Criterio propio: cómo seguir aprendiendo sin ruido',
      goal: 'Salir de la ruta con un método de aprendizaje y un filtro de información.',
      objectives: [
        'Distinguir fuentes primarias de contenido de entretenimiento financiero.',
        'Evaluar cualquier consejo por sus incentivos.',
        'Aceptar la incertidumbre como condición permanente.'
      ],
      blocks: [
        { t: 'p', html: 'Llegaste hasta aquí. Lo más valioso que te llevas no es una lista de tickers: es la capacidad de evaluar cualquier propuesta futura con preguntas propias.' },
        { t: 'kv', items: [
          { k: 'Fuentes primarias', v: 'Prospectos, informes anuales, fichas de fondos, documentos de reguladores, estadísticas de bancos centrales.' },
          { k: 'Fuentes secundarias útiles', v: 'Investigación académica revisada por pares y publicaciones de gestoras con metodología transparente.' },
          { k: 'Entretenimiento financiero', v: 'Noticias diarias, pronósticos, listas de "las 5 acciones para este año". Consumo opcional, valor informativo cercano a cero.' },
          { k: 'Conflicto de interés', v: 'Pregunta siempre cómo gana dinero quien te aconseja: comisión por producto, tarifa fija, publicidad o volumen de operaciones.' }
        ]},
        { t: 'check', title: 'Filtro de cuatro preguntas para cualquier consejo', items: [
          '¿Quién gana dinero si hago esto?',
          '¿Qué tendría que ser cierto para que funcione?',
          '¿Qué pasa si me equivoco: pierdo una oportunidad o pierdo el capital?',
          '¿Esta decisión es reversible?'
        ]},
        { t: 'p', html: 'La asimetría importa más que la probabilidad. Perderse una subida es recuperable; perder el capital de forma permanente, muchas veces no lo es. Prioriza siempre la supervivencia sobre la maximización.' },
        { t: 'warn', h: 'Lo que no puedes saber', html: 'Nadie sabe qué hará el mercado el próximo año. Quien afirme lo contrario está vendiendo algo o se está engañando. Todo tu sistema —diversificación, horizonte, reglas escritas, aportes automáticos— existe precisamente porque el futuro es desconocido.' },
        { t: 'tip', h: 'Lee menos, relee mejor', html: 'Tres libros sólidos releídos superan a cien horas de video. Y en inversión, el material clásico envejece mejor que el contenido de ayer.' },
        { t: 'task', html: 'Escribe la carta a tu yo de dentro de diez años: qué estás construyendo, con qué reglas y qué le pides que no haga. Guárdala junto a la IPS. Después presenta el examen de certificación.' }
      ],
      keyIdea: 'La meta no es predecir el futuro: es construir un plan que no dependa de predecirlo.',
      pills: [
        'El inversionista experto no es el que más sabe del mercado: es el que mejor se conoce a sí mismo.',
        'Cuando dudes entre hacer algo y no hacer nada, en inversión de largo plazo la segunda opción gana con más frecuencia de la que crees.'
      ]
    }
  ]
});
