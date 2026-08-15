/* RutaETF · Banco de exámenes. a = índice de la respuesta correcta, e = explicación */
window.EXAMENES = {
  n1: {
    title: 'Examen Nivel 1 · Fundamentos',
    pass: 6,
    questions: [
      { q: '¿Qué dinero es apropiado para una cartera de acciones?', o: ['El fondo de emergencia', 'Dinero para una meta a más de cinco años', 'Dinero prestado al 20% E.A.'], a: 1, e: 'La renta variable exige horizonte largo. El fondo de emergencia debe permanecer líquido y la deuda cara se paga antes de invertir.' },
      { q: 'Un ETF es, en esencia:', o: ['Una garantía de rentabilidad', 'Un fondo que cotiza en bolsa y contiene una canasta de activos', 'Un producto sin riesgo'], a: 1, e: 'Es un envase. Lo determinante es qué contiene, cuánto cobra y cómo está estructurado.' },
      { q: 'Tras una caída del 30%, ¿qué subida se necesita para volver al punto inicial?', o: ['30%', 'Aproximadamente 42,9%', '15%'], a: 1, e: '1 / (1 − 0,30) − 1 = 42,9%. Las caídas y recuperaciones no son simétricas.' },
      { q: 'Una orden limitada:', o: ['Siempre se ejecuta', 'Controla el precio pero puede no ejecutarse', 'Implica apalancamiento'], a: 1, e: 'Fija el precio máximo que aceptas pagar. A cambio, renuncias a la certeza de ejecución.' },
      { q: 'Antes de confirmar una orden debes verificar:', o: ['Que el gráfico esté en verde', 'Compra, multiplicador ×1 y que sea activo real, no CFD', 'Que alguien conocido la recomiende'], a: 1, e: 'Son los tres campos que distinguen una compra de largo plazo de un producto apalancado.' },
      { q: '“Cero comisión” significa que:', o: ['No existe ningún costo', 'Sigues pagando spread, conversión de divisa, TER e impuestos', 'El precio no puede bajar'], a: 1, e: 'Cuando la comisión desaparece, el cobro se traslada a otros puntos de la cadena.' },
      { q: 'El TER de un fondo:', o: ['Se cobra como cargo visible en el extracto', 'Se descuenta internamente del valor de la participación', 'Solo se paga al vender'], a: 1, e: 'Nunca lo verás como cobro: se refleja en un valor liquidativo ligeramente inferior cada día.' },
      { q: 'Un CFD se caracteriza por:', o: ['Otorgar propiedad del activo subyacente', 'Ser un contrato con el broker, normalmente con apalancamiento y costos nocturnos', 'Tener menor riesgo que un ETF'], a: 1, e: 'No hay activo a tu nombre. Queda fuera de esta ruta de largo plazo.' },
      { q: 'La diversificación adecuada consiste en:', o: ['Tener muchos productos distintos', 'Tener exposiciones que no dependen del mismo factor', 'Comprar el fondo que más subió'], a: 1, e: 'Cinco ETFs del mismo sector y país son una sola apuesta comprada cinco veces.' },
      { q: 'Al estudiar un ETF, el dato menos útil para decidir es:', o: ['El TER', 'La rentabilidad de los últimos tres años', 'El domicilio del fondo'], a: 1, e: 'El retorno reciente suele reflejar concentración en lo que estuvo de moda, que es justo el riesgo a medir.' }
    ]
  },

  n2: {
    title: 'Examen Nivel 2 · Construcción',
    pass: 6,
    questions: [
      { q: 'Con 10% nominal y 7% de inflación, la rentabilidad real es:', o: ['3,00%', '2,80%', '17,00%'], a: 1, e: '(1,10 / 1,07) − 1 = 2,80%. La resta simple sobreestima cuando la inflación es alta.' },
      { q: 'La decisión que más explica la variabilidad del resultado de una cartera es:', o: ['Elegir entre dos ETFs globales equivalentes', 'La asignación entre clases de activos', 'El día del mes en que aportas'], a: 1, e: 'El reparto acciones/bonos domina el perfil de riesgo y retorno.' },
      { q: 'Un ETF domiciliado en Irlanda frente a uno estadounidense, para un residente colombiano:', o: ['Es siempre más barato en TER', 'Puede mejorar el tratamiento de la retención sobre dividendos estadounidenses y quedar fuera del estate tax de EE. UU.', 'No presenta ninguna diferencia'], a: 1, e: 'El tratado Irlanda–EE. UU. reduce la retención a nivel del fondo y el activo no tiene situs estadounidense. Verifica siempre tu caso con un profesional.' },
      { q: 'Si un ETF sube 8% en dólares y el dólar cae 10% frente al peso, tu retorno en pesos es:', o: ['−2%', 'Aproximadamente −2,8%', '+18,8%'], a: 1, e: '1,08 × 0,90 − 1 = −2,8%. Los efectos se multiplican, no se suman.' },
      { q: 'Un fondo de bonos con duración 7, ante una subida de tasas de 2 puntos porcentuales:', o: ['No se ve afectado', 'Pierde aproximadamente un 14% de valor', 'Gana un 14%'], a: 1, e: 'Δ precio ≈ − duración × Δ tasa. La renta fija también cae.' },
      { q: 'Los bonos de alto rendimiento (high yield):', o: ['Son el mejor amortiguador en una crisis de acciones', 'Tienden a caer junto con las acciones en las crisis', 'No tienen riesgo de crédito'], a: 1, e: 'Se comportan más como renta variable. Para amortiguar, importa la calidad crediticia.' },
      { q: 'Respecto al DCA frente a invertir todo de una vez:', o: ['El DCA maximiza el retorno esperado', 'El DCA reduce el riesgo de mal timing a cambio de un retorno esperado algo menor', 'Son matemáticamente idénticos'], a: 1, e: 'Como el mercado sube más veces de las que baja, la suma global tiende a rendir más. El DCA compra sostenibilidad emocional.' },
      { q: 'El orden más eficiente para rebalancear es:', o: ['Vender siempre primero', 'Aportes nuevos, luego dividendos y solo al final ventas', 'Rebalancear cada mes'], a: 1, e: 'Ese orden minimiza comisiones, spread e impuestos.' },
      { q: 'Cubrir la divisa (hedged) en renta variable a largo plazo:', o: ['Es gratis y siempre recomendable', 'Tiene un costo ligado al diferencial de tasas que suele superar el beneficio en horizontes largos', 'Elimina el riesgo de mercado'], a: 1, e: 'La cobertura frente a una moneda emergente es cara. Suele tener más sentido en renta fija.' },
      { q: 'Si empiezas en 70/30 y las acciones suben mucho durante tres años:', o: ['Tu perfil de riesgo se mantiene igual', 'Tu cartera se vuelve más agresiva sin que lo hayas decidido', 'Debes vender todo'], a: 1, e: 'Es la deriva del mercado. El rebalanceo existe precisamente para corregirla.' }
    ]
  },

  n3: {
    title: 'Examen Nivel 3 · Análisis',
    pass: 6,
    questions: [
      { q: 'El estado financiero más difícil de maquillar es:', o: ['El estado de resultados', 'El flujo de caja', 'La presentación a inversionistas'], a: 1, e: 'La utilidad es una opinión contable; la caja es un hecho verificable.' },
      { q: 'Un ROE muy alto puede deberse a:', o: ['Un negocio excelente o a un elevado apalancamiento', 'Siempre a un negocio excelente', 'Un error contable, necesariamente'], a: 1, e: 'La deuda reduce el patrimonio y eleva el ROE. El ROIC es más honesto.' },
      { q: 'Cuando las tasas de interés suben, las empresas cuyo valor está en beneficios lejanos:', o: ['Se benefician', 'Tienden a caer más porque el valor presente de esos flujos disminuye', 'No se ven afectadas'], a: 1, e: 'Es aritmética del descuento de flujos, no irracionalidad del mercado.' },
      { q: 'El máximo drawdown mide:', o: ['La volatilidad promedio', 'La peor caída desde un máximo hasta el mínimo posterior', 'El retorno anualizado'], a: 1, e: 'Es la métrica que mejor anticipa si abandonarás el plan.' },
      { q: 'En una crisis de liquidez, las correlaciones entre activos tienden a:', o: ['Bajar, mejorando la diversificación', 'Subir, reduciendo el beneficio de la diversificación', 'Permanecer constantes'], a: 1, e: 'Todo cae junto cuando los inversionistas venden lo que pueden vender.' },
      { q: 'Una prima de factor como “valor” puede:', o: ['Rendir por debajo del mercado durante más de una década', 'Garantizar mejores resultados cada año', 'Eliminar la volatilidad'], a: 1, e: 'Esa persistencia del bajo desempeño es, según la teoría, la razón por la que la prima puede sobrevivir.' },
      { q: 'El sesgo de supervivencia en un backtest consiste en:', o: ['Incluir demasiados años', 'Analizar solo los activos que siguen existiendo, ignorando los que desaparecieron', 'Usar comisiones reales'], a: 1, e: 'Infla artificialmente cualquier resultado histórico.' },
      { q: 'La brecha de comportamiento es:', o: ['La diferencia entre el retorno del fondo y el que obtienen realmente sus partícipes', 'El spread de compra-venta', 'El tracking error'], a: 1, e: 'Se explica por entrar tarde y salir temprano. La produce el inversionista, no el mercado.' },
      { q: 'Concentrar la cartera en Colombia es problemático sobre todo porque:', o: ['Los impuestos son más altos', 'Tu salario, vivienda y pensión ya dependen de la misma economía', 'La bolsa local no tiene liquidez suficiente para nadie'], a: 1, e: 'Es doble exposición al mismo riesgo: capital humano y capital financiero en el mismo lugar.' },
      { q: 'Ante un backtest con una curva impecable, lo primero que debes preguntar es:', o: ['Cuál fue la rentabilidad anualizada', 'Qué periodo cubre, cuántas variantes se probaron y si descuenta costos reales', 'Quién lo publicó en redes'], a: 1, e: 'La perfección de la curva suele indicar sobreajuste, no hallazgo.' }
    ]
  },

  n4: {
    title: 'Examen Nivel 4 · Maestría',
    pass: 6,
    questions: [
      { q: 'La función principal de una IPS escrita es:', o: ['Predecir el mercado', 'Fijar en frío las reglas que ejecutarás en caliente', 'Cumplir un requisito del broker'], a: 1, e: 'Su valor aparece exactamente el día en que el mercado cae con fuerza.' },
      { q: 'Un residente fiscal colombiano tributa:', o: ['Solo por ingresos generados en Colombia', 'Por su renta de fuente mundial', 'Solo si el broker reporta a la DIAN'], a: 1, e: 'La obligación es tuya, exista o no reporte automático del intermediario.' },
      { q: 'En Colombia, el tiempo de tenencia de un activo antes de venderlo:', o: ['Es irrelevante fiscalmente', 'Puede cambiar el tratamiento entre renta ordinaria y ganancia ocasional', 'Solo importa para acciones locales'], a: 1, e: 'Por eso debes conservar la prueba de la fecha de adquisición desde el primer día. Verifica el régimen vigente con un contador.' },
      { q: 'El riesgo de secuencia de retornos es especialmente peligroso:', o: ['Al inicio de la fase de acumulación', 'En los primeros años de la fase de retiro', 'Solo en carteras apalancadas'], a: 1, e: 'Vender participaciones a precios deprimidos para vivir destruye capital que ya no se recupera.' },
      { q: 'La regla del 4% debe entenderse como:', o: ['Una ley universal aplicable a cualquier país', 'Una referencia surgida de datos históricos específicos, que requiere ajuste al contexto local', 'Una promesa del sector financiero'], a: 1, e: 'Con inflación y sistema pensional distintos, trasladarla sin ajustes es un error.' },
      { q: 'Un activo que no genera flujo de caja, como el oro o un criptoactivo:', o: ['Tiene retorno garantizado a largo plazo', 'Depende enteramente de que alguien pague más adelante', 'Debe ser el núcleo de la cartera'], a: 1, e: 'No lo invalida, pero cambia el análisis y el tamaño razonable de la posición.' },
      { q: 'Dos o más de estas señales indican probable fraude:', o: ['Rentabilidad fija garantizada, presión para decidir hoy y comisión por referidos', 'Estados financieros auditados y entidad vigilada', 'Rendimiento variable y advertencias de riesgo'], a: 0, e: 'Es la mecánica clásica: pagar a los antiguos con el dinero de los nuevos.' },
      { q: 'Operar con un broker extranjero implica que:', o: ['La Superintendencia Financiera de Colombia te protege igual', 'No aplica la protección al consumidor financiero colombiano y debes verificar la regulación de origen', 'Es siempre ilegal'], a: 1, e: 'Es legítimo, pero cambia por completo el marco de protección y de resolución de disputas.' },
      { q: 'La carpeta de continuidad existe para:', o: ['Mejorar la rentabilidad', 'Que tu familia sepa qué cuentas existen y cómo acceder a ellas', 'Cumplir una norma tributaria'], a: 1, e: 'Un patrimonio que nadie sabe que existe equivale a un patrimonio perdido.' },
      { q: 'Al evaluar cualquier consejo de inversión, la primera pregunta es:', o: ['¿Cuánto ha subido últimamente?', '¿Quién gana dinero si lo sigo?', '¿Cuántos seguidores tiene quien lo dice?'], a: 1, e: 'El incentivo explica buena parte del entusiasmo de quien recomienda.' }
    ]
  }
};

/* Certificación final: se arman 12 preguntas mezclando los cuatro niveles */
window.CERTIFICACION = { title: 'Certificación final · 0 a experto', pass: 10, draw: 12 };
