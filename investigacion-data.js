// Contenido pedagógico: lecciones, ejercicios, prompts y temas. Editable por el docente.
window.INV_DATA = (function () {
  const TIPOS = {
    encuesta: { label: 'Investigación con encuesta', short: 'Encuesta', enfoque: 'Cuantitativo · descriptivo', desc: 'Recogen datos de un grupo de personas con un cuestionario y los analizan con porcentajes y gráficos.', ej: '¿Cuántas horas duermen los estudiantes de 3ro BGU y cómo se relaciona con el uso nocturno del celular?', hipLabel: 'Hipótesis', hipPh: 'Los estudiantes que usan redes sociales más de 2 horas por la noche duermen menos de 7 horas.', hipHelp: 'Una afirmación que pondrán a prueba con los datos de la encuesta.' },
    caso: { label: 'Estudio de caso', short: 'Estudio de caso', enfoque: 'Cualitativo · descriptivo', desc: 'Analizan a fondo un caso concreto (un grupo, una institución, un proyecto o una situación) con entrevistas, observación y documentos.', ej: '¿Cómo funciona el programa de reciclaje del colegio y qué factores explican sus resultados?', hipLabel: 'Proposición', hipPh: 'La participación estudiantil es el factor que más influye en el éxito del programa de reciclaje.', hipHelp: 'Una idea guía que orienta lo que van a observar en el caso.' },
    ensayo: { label: 'Ensayo científico argumentativo', short: 'Ensayo argumentativo', enfoque: 'Documental · argumentativo', desc: 'Defienden una tesis con argumentos sustentados en fuentes académicas y responden a las posturas contrarias.', ej: '¿Debería regularse el uso de la IA generativa en las tareas escolares?', hipLabel: 'Tesis', hipPh: 'El uso de IA generativa en las tareas escolares debe regularse, no prohibirse, porque…', hipHelp: 'Su postura central, que defenderán con argumentos y evidencia.' }
  };

  const AREAS = [
    { n: 'Salud y bienestar', t: [['Horas de sueño y rendimiento académico en estudiantes de bachillerato', 'encuesta'], ['Consumo de bebidas energizantes en adolescentes', 'encuesta'], ['El servicio de consejería estudiantil (DECE) del colegio', 'caso'], ['¿Debe prohibirse la venta de comida chatarra en los colegios?', 'ensayo']] },
    { n: 'Tecnología y sociedad', t: [['Uso de inteligencia artificial generativa en las tareas escolares', 'encuesta'], ['Ciberacoso entre estudiantes de bachillerato', 'encuesta'], ['Implementación de una plataforma digital en una institución educativa', 'caso'], ['¿Deben prohibirse los celulares en el aula?', 'ensayo']] },
    { n: 'Ambiente', t: [['Percepción del cambio climático en jóvenes', 'encuesta'], ['Manejo de residuos plásticos en el bar escolar', 'caso'], ['Hábitos de consumo de agua en los hogares', 'encuesta'], ['¿Es el reciclaje suficiente para reducir la contaminación plástica?', 'ensayo']] },
    { n: 'Educación y futuro', t: [['Factores que influyen en la elección de carrera universitaria', 'encuesta'], ['Hábitos de estudio y preparación para el examen de acceso a la universidad', 'encuesta'], ['La experiencia de un club o proyecto estudiantil del colegio', 'caso'], ['¿Debería el bachillerato incluir educación financiera obligatoria?', 'ensayo']] },
    { n: 'Economía y emprendimiento', t: [['Educación financiera y hábitos de ahorro en jóvenes', 'encuesta'], ['Influencia de la publicidad en redes sociales en el consumo juvenil', 'encuesta'], ['Un emprendimiento familiar o local de la comunidad', 'caso'], ['¿El trabajo juvenil afecta o fortalece la formación académica?', 'ensayo']] },
    { n: 'Cultura y comunidad', t: [['Identidad cultural y consumo de música urbana en adolescentes', 'encuesta'], ['Uso y valoración del kichwa u otras lenguas ancestrales en jóvenes', 'encuesta'], ['Una fiesta, tradición o espacio cultural del barrio', 'caso'], ['¿Las redes sociales debilitan la identidad cultural de los jóvenes?', 'ensayo']] }
  ];

  const CHK = ['Leímos todo el borrador de la IA y verificamos sus datos', 'Nuestra versión está escrita con nuestras propias palabras', 'Cada idea tomada de un autor tiene su cita (Apellido, año)'];
  const MANUAL = ['Revisamos ortografía, tildes y puntuación', 'Cada figura o tabla se menciona en el texto', 'Leímos el artículo completo en voz alta y tiene sentido', 'Ambos autores revisamos y aprobamos el documento'];
  const RUB = [
    ['Delimitación del tema y pregunta', 'Clara, específica y viable'],
    ['Búsqueda y calidad de las fuentes', 'Fuentes académicas, recientes y verificadas'],
    ['Uso de citas APA 7', 'Citas correctas y coherentes con las referencias'],
    ['Coherencia metodológica', 'Método adecuado a la pregunta y a los objetivos'],
    ['Análisis y discusión', 'Interpreta y compara con los autores'],
    ['Redacción propia y formato APA', 'Texto propio, claro y bien estructurado']
  ];

  const END = '\n\nAl final, en 3 viñetas, explícame cómo estructuraste el texto para que yo aprenda a redactarlo.';

  const SECS = [
    { k: 'guia', label: 'Cómo funciona', fase: 'Inicio', desc: 'Van a aprender a investigar construyendo su propio artículo científico, paso a paso. Al final tendrán el artículo completo en formato APA 7.' },
    { k: 'equipo', label: 'Equipo y tipo', fase: 'Planificar', desc: 'Registren a la pareja y elijan el tipo de investigación. Esto adapta todos los pasos siguientes.' },
    { k: 'tema', label: 'Tema', fase: 'Planificar', desc: 'Elijan un tema sugerido o propongan uno propio, y delimítenlo para que se pueda investigar.',
      lesson: { t: 'Del tema general al tema delimitado', p: ['Un tema demasiado amplio, como «las redes sociales», no se puede investigar en pocas semanas. Delimitar es ponerle límites claros.'], pts: ['¿Qué aspecto específico? (no «las redes», sino «el uso nocturno de redes y el sueño»)', '¿En quiénes? (la población: estudiantes de 3ro BGU)', '¿Dónde? (el lugar: su colegio, su barrio, su ciudad)', '¿Cuándo? (el periodo: año lectivo 2026-2027)', 'Que sea viable: ¿pueden conseguir datos o fuentes en 6 a 8 semanas?'], ej: 'Tema general: Redes sociales\nTema delimitado: Uso nocturno de redes sociales y calidad del sueño en estudiantes de 3ro BGU de la Unidad Educativa X, Quito, 2026-2027' },
      ex: [{ q: '¿Cuál tema está mejor delimitado?', o: ['La contaminación en Ecuador', 'Manejo de residuos plásticos en el bar de la Unidad Educativa X durante el primer quimestre de 2026', 'El plástico y sus efectos'], a: 1, fb: ['Correcto: dice qué, dónde y cuándo.', 'Le faltan límites: ¿qué aspecto?, ¿dónde?, ¿cuándo?'] }],
      task: x => `TAREA: Ayúdame a delimitar mi tema.\nMi idea inicial: ${x.idea || '[escribe tu idea]'}\nMis intereses: ${x.intereses || '[opcional]'}\n1. Propón 3 versiones delimitadas (qué aspecto, en quiénes, dónde y cuándo) adecuadas para una investigación de tipo «${x.tipoLabel}» que pueda hacer en 6 a 8 semanas.\n2. Para cada una indica si es viable, qué datos o fuentes necesitaría y una posible pregunta de investigación.\n3. Recomienda la mejor opción y explica por qué.` },
    { k: 'problema', label: 'Problema y pregunta', fase: 'Planificar', desc: 'Describan la situación que les preocupa y conviértanla en una pregunta que se pueda responder.',
      lesson: { t: 'El problema y la pregunta de investigación', p: ['El planteamiento del problema describe una situación que preocupa, con evidencias. La pregunta de investigación convierte ese problema en algo que se puede responder con datos o con argumentos.'], pts: ['Contexto: ¿qué está pasando y dónde?', 'Evidencia: ¿cómo sabemos que es un problema? (cita un dato o un autor)', 'Causas y consecuencias: ¿por qué ocurre?, ¿qué pasa si no se atiende?', 'Vacío: ¿qué no se sabe todavía en su contexto?', 'La pregunta debe ser clara, específica, factible y relevante. Eviten preguntas que se respondan con «sí» o «no».'], ej: '¿Qué relación existe entre el tiempo de uso nocturno de redes sociales y la calidad del sueño en los estudiantes de 3ro BGU de la Unidad Educativa X?' },
      ex: [{ q: '¿Cuál es la mejor pregunta de investigación?', o: ['¿Las redes sociales son malas?', '¿Cuántas horas al día usan TikTok los estudiantes de 3ro BGU de la U. E. X y cómo se relaciona con su promedio del primer quimestre?', '¿Qué es TikTok?'], a: 1, fb: ['Correcto: es específica, medible y tiene población y contexto.', 'Es demasiado general o se responde con una definición o un sí/no.'] }],
      own: { label: 'Planteamiento del problema', min: 150, citas: 1 },
      task: () => 'TAREA: 1. Ayúdame a redactar un borrador del PLANTEAMIENTO DEL PROBLEMA (150 a 250 palabras) con: contexto, evidencias, causas, consecuencias y vacío de conocimiento.\n2. Propón 3 preguntas de investigación posibles y evalúa cada una (clara, específica, factible, relevante).' + END },
    { k: 'objetivos', label: 'Objetivos', fase: 'Planificar', desc: 'Definan qué van a lograr (objetivo general) y los pasos para lograrlo (objetivos específicos).',
      lesson: { t: 'Objetivos, hipótesis y tesis', p: ['El objetivo general responde a la pregunta de investigación: dice qué van a lograr. Los objetivos específicos son los pasos concretos para llegar ahí; cada uno se cumplirá con una parte del trabajo.'], pts: ['Empiezan con un verbo en infinitivo que se pueda comprobar: identificar, describir, analizar, comparar, determinar, evaluar, argumentar.', 'Eviten verbos que no se pueden medir: conocer, entender, saber, aprender.', 'Encuesta → hipótesis: una afirmación que los datos confirmarán o no.', 'Estudio de caso → proposición: una idea guía sobre lo que se espera encontrar.', 'Ensayo → tesis: la postura que van a defender.'], ej: 'General: Determinar la relación entre el uso nocturno de redes sociales y la calidad del sueño en estudiantes de 3ro BGU.\nEspecífico 1: Identificar el tiempo promedio de uso nocturno de redes sociales.\nEspecífico 2: Describir los hábitos de sueño de los estudiantes.\nEspecífico 3: Comparar la calidad del sueño entre quienes usan más y menos redes sociales.' },
      ex: [{ q: '¿Qué verbo NO sirve para un objetivo de investigación?', o: ['Analizar', 'Conocer', 'Comparar'], a: 1, fb: ['Correcto: «conocer» no se puede medir ni comprobar.', 'Ese verbo sí sirve: describe una acción que se puede comprobar.'] }],
      task: x => `TAREA: Propón un objetivo general y 3 objetivos específicos coherentes con mi pregunta. Usa verbos en infinitivo que se puedan comprobar. Luego propón una ${x.hipLabel.toLowerCase()} adecuada para una investigación de tipo «${x.tipoLabel}». Explica brevemente por qué cada objetivo específico ayuda a cumplir el general.` },
    { k: 'busqueda', label: 'Búsqueda de información', fase: 'Investigar', desc: 'Aprendan a buscar como investigadores: palabras clave, operadores y bases de datos académicas.',
      lesson: { t: 'Cómo buscar información académica', p: ['Buscar bien ahorra horas. En lugar de escribir una pregunta en Google, usen palabras clave y operadores en bases de datos académicas.'], pts: ['Palabras clave: 3 a 5 conceptos centrales del tema, en español y en inglés.', 'Comillas para frases exactas: "calidad del sueño".', 'AND (Y) une conceptos: "redes sociales" AND sueño.', 'OR (O) agrega sinónimos: adolescentes OR estudiantes.', 'Filtren por año: prefieran fuentes de los últimos 5 a 10 años.', 'Bases académicas: Google Académico, SciELO, Redalyc, Dialnet y La Referencia (tesis de Latinoamérica). Datos oficiales: INEC, MINEDUC, OMS, UNESCO, UNICEF.'] },
      ex: [{ q: 'Quieren artículos sobre el sueño en adolescentes que usan redes sociales. ¿Cuál búsqueda es mejor?', o: ['sueño', '"calidad del sueño" AND "redes sociales" AND adolescentes', '¿las redes sociales quitan el sueño?'], a: 1, fb: ['Correcto: combina conceptos clave con comillas y AND.', 'Es muy general o es una pregunta coloquial; dará resultados poco académicos.'] }],
      task: () => 'TAREA: Ayúdame a planificar la búsqueda de información.\n1. Propón 5 palabras clave en español con su traducción al inglés y 2 sinónimos para cada una.\n2. Escribe 3 cadenas de búsqueda con comillas y operadores AND / OR.\n3. Indica qué tipo de fuente necesito para cada objetivo específico (artículos, estadísticas oficiales, tesis, libros).\nNO me des referencias ni enlaces: yo buscaré las fuentes reales.' },
    { k: 'fuentes', label: 'Matriz de fuentes', fase: 'Investigar', desc: 'Registren cada fuente que encuentren, verifiquen que existe y anoten su idea principal. Las referencias APA se generan solas.',
      lesson: { t: 'Evaluar y registrar fuentes', p: ['No toda la información de internet sirve para un artículo científico. Antes de usar una fuente, evalúenla con estas preguntas.'], pts: ['¿Quién lo escribió? Un autor o una institución identificable.', '¿Dónde se publicó? Revista académica, universidad u organismo oficial.', '¿Cuándo? Preferiblemente en los últimos 10 años.', '¿Se puede verificar? Tiene DOI, enlace estable o datos de publicación.', 'Eviten: Wikipedia (úsenla solo para orientarse), blogs anónimos, sitios de tareas y respuestas de IA.', 'La IA puede inventar referencias que parecen reales. Solo marquen «verificada» una fuente que abrieron y leyeron.'] },
      ex: [{ q: '¿Cuál es una fuente académica confiable?', o: ['Un video de un influencer en TikTok', 'Un artículo de una revista científica con DOI', 'Una respuesta de ChatGPT'], a: 1, fb: ['Correcto: tiene autores, revisión académica y es verificable.', 'No es una fuente académica verificable.'] }, { q: 'La IA les dio una referencia con autor, año y revista. ¿Qué hacen?', o: ['La copian directamente en Referencias', 'La buscan en Google Académico y solo la usan si existe y dice lo que la IA afirma', 'La usan si suena convincente'], a: 1, fb: ['Correcto: siempre verifiquen. Las IA inventan referencias.', 'Riesgoso: las IA a menudo inventan referencias que no existen.'] }],
      task: () => 'TAREA: Te voy a pegar el resumen (abstract) de una fuente que encontré. Ayúdame a:\n1. Identificar autor(es), año, título y revista para mi matriz de fuentes.\n2. Resumir la idea principal en 2 oraciones sencillas.\n3. Explicar cómo se relaciona con mi pregunta de investigación.\n4. Señalar una frase textual importante que podría citar.\n\nRESUMEN DE LA FUENTE:\n[pega aquí el resumen del artículo]' },
    { k: 'citas', label: 'Citas APA 7', fase: 'Investigar', desc: 'Aprendan a citar correctamente. Citar es dar crédito a quien tuvo la idea y respaldar lo que ustedes afirman.',
      lesson: { t: 'Citar en APA 7.ª edición', p: ['Cada vez que usan una idea, un dato o una frase de otra persona, deben citarla. Si no lo hacen, es plagio, aunque cambien las palabras.'], pts: ['Cita parentética: la idea y al final (Apellido, año). Ej.: El uso nocturno del celular reduce las horas de sueño (Pérez, 2021).', 'Cita narrativa: el autor forma parte de la oración. Ej.: Pérez (2021) encontró que…', 'Dos autores: (Pérez y López, 2021). Tres o más: (Pérez et al., 2021).', 'Institución como autor: (INEC, 2022) o Instituto Nacional de Estadística y Censos (2022).', 'Cita textual corta (menos de 40 palabras): entre comillas y con página: (Pérez, 2021, p. 15).', 'Cita textual larga (40 palabras o más): en un bloque aparte con sangría y sin comillas.', 'Paráfrasis: explican la idea con sus palabras; igual se cita al autor.', 'Regla de oro: toda cita del texto aparece en Referencias, y toda referencia se cita en el texto.'] },
      ex: [{ q: '«Según Morales y Vega (2022), los adolescentes duermen menos de 7 horas.» ¿Qué tipo de cita es?', o: ['Parentética', 'Narrativa', 'Textual larga'], a: 1, fb: ['Correcto: los autores forman parte de la oración.', 'Fíjense dónde están los autores: dentro de la oración.'] }, { q: 'Un artículo de García, Ruiz y Torres, de 2020. ¿Cómo se cita entre paréntesis?', o: ['(García, Ruiz y Torres, 2020)', '(García et al., 2020)', '(García 2020)'], a: 1, fb: ['Correcto: con tres o más autores se usa et al. desde la primera cita.', 'En APA 7, con tres o más autores se usa «et al.» y la coma antes del año.'] }, { q: 'Copian exactamente una frase de 20 palabras de un libro. ¿Qué necesitan?', o: ['Solo el apellido del autor', 'Comillas, apellido, año y página', 'Nada, si el libro está en Referencias'], a: 1, fb: ['Correcto: la cita textual siempre lleva comillas y página.', 'Una cita textual siempre necesita comillas y número de página.'] }] },
    { k: 'intro', label: 'Introducción', fase: 'Redactar', desc: 'Presenten el tema, por qué importa y qué busca su investigación.',
      lesson: { t: 'La introducción', p: ['La introducción lleva al lector de lo general a lo particular. En APA no lleva el título «Introducción»: empieza justo después del título del artículo.'], pts: ['1. Contexto general del tema.', '2. Importancia, con datos y citas que muestren el problema.', '3. Justificación: por qué y para quién es útil su investigación.', '4. Cierre con el propósito u objetivo del estudio.'], ej: 'El sueño es fundamental para el aprendizaje y la salud emocional de los adolescentes (Autor, año). Sin embargo, el uso de dispositivos móviles antes de dormir se ha vuelto habitual… [ejemplo: reemplacen con sus fuentes reales]' },
      ex: [{ q: '¿Con qué se debe cerrar la introducción?', o: ['Con las conclusiones', 'Con el objetivo o propósito del estudio', 'Con la lista de referencias'], a: 1, fb: ['Correcto: el lector debe saber qué busca el estudio.', 'No: la introducción termina presentando el propósito del estudio.'] }],
      own: { label: 'Introducción', min: 300, citas: 2 }, useSrc: true, ctx: ['problema'],
      task: () => 'TAREA: Redacta un borrador de INTRODUCCIÓN (300 a 450 palabras) con: contexto general, importancia con datos, justificación y cierre con el objetivo del estudio. Cita SOLO las fuentes de mi lista con el formato (Apellido, año). Usa mi planteamiento del problema como base.' + END },
    { k: 'marco', label: 'Marco teórico', fase: 'Redactar', desc: 'Expliquen los conceptos y estudios previos que sustentan su investigación, siempre con autores.',
      lesson: { t: 'El marco teórico', p: ['El marco teórico es la base científica del artículo: muestra qué dicen los expertos sobre el tema. No es una copia de definiciones; es una síntesis organizada de las fuentes.'], pts: ['Definan los conceptos clave según autores, no según el diccionario.', 'Presenten teorías o modelos que expliquen el fenómeno.', 'Incluyan antecedentes: estudios parecidos y lo que encontraron.', 'Organicen con subtítulos (uno por concepto) usando # al inicio de la línea.', 'Cada párrafo debe tener al menos una cita.'] },
      ex: [{ q: '¿Qué NO va en el marco teórico?', o: ['Definiciones de conceptos según autores', 'Estudios previos sobre el tema', 'Los resultados de su propia encuesta o caso'], a: 2, fb: ['Correcto: sus resultados van en la sección Resultados.', 'Eso sí pertenece al marco teórico.'] }],
      own: { label: 'Marco teórico', min: 500, citas: 5 }, useSrc: true, ctx: [],
      task: () => 'TAREA: Propón la estructura del MARCO TEÓRICO con 3 o 4 subtítulos (conceptos clave, teorías y antecedentes) y redacta un borrador de 500 a 700 palabras usando y citando SOLO las fuentes de mi lista. Si falta información para algún subtítulo, dime qué tipo de fuente debo buscar.' + END },
    { k: 'metodo', label: 'Metodología', fase: 'Redactar', types: ['encuesta', 'caso'], desc: 'Expliquen cómo hicieron la investigación, de forma que otra persona pudiera repetirla.',
      lessonBy: {
        encuesta: { t: 'Metodología de una investigación con encuesta', p: ['La metodología explica cómo obtuvieron los datos. Debe ser tan clara que otra persona pueda repetir el estudio.'], pts: ['Enfoque: cuantitativo (datos numéricos).', 'Alcance: descriptivo (describe) o correlacional (relaciona dos variables).', 'Población: todo el grupo que les interesa (ej.: 180 estudiantes de 3ro BGU). Muestra: quienes respondieron y cómo los eligieron.', 'Instrumento: cuestionario con preguntas cerradas en Google Forms.', 'Procedimiento: cómo y cuándo aplicaron la encuesta y cómo analizaron los datos (porcentajes).', 'Ética: participación voluntaria, anónima y con consentimiento.'] },
        caso: { t: 'Metodología de un estudio de caso', p: ['En un estudio de caso se analiza en profundidad una situación real. La metodología explica qué caso se eligió y cómo se recogió la información.'], pts: ['Enfoque: cualitativo (descripciones, opiniones y experiencias).', 'El caso: qué se estudia y por qué es relevante.', 'Participantes o informantes clave: quiénes y por qué ellos.', 'Técnicas: entrevista semiestructurada, observación y análisis de documentos.', 'Procedimiento y análisis: cómo organizaron la información en categorías.', 'Ética: consentimiento informado y confidencialidad (Informante 1, Informante 2).'] }
      },
      exBy: {
        encuesta: [{ q: 'Encuestaron a 60 de los 180 estudiantes de 3ro BGU. ¿Qué son los 60?', o: ['La población', 'La muestra', 'El instrumento'], a: 1, fb: ['Correcto: la muestra es la parte de la población que respondió.', 'La población son los 180; los 60 que respondieron son la muestra.'] }],
        caso: [{ q: '¿Cuál es una técnica cualitativa?', o: ['Una encuesta con opciones múltiples', 'Una entrevista semiestructurada', 'Un promedio de notas'], a: 1, fb: ['Correcto: recoge experiencias y opiniones en profundidad.', 'Esa técnica produce datos numéricos (cuantitativos).'] }]
      },
      own: { label: 'Metodología', min: 250, citas: 0 }, ctx: [],
      taskBy: {
        encuesta: () => 'TAREA: 1. Diseña un cuestionario de 8 a 12 preguntas cerradas, con sus opciones de respuesta, que respondan a mis objetivos específicos. Indica a qué objetivo responde cada pregunta.\n2. Redacta un borrador de METODOLOGÍA (250 a 350 palabras): enfoque, alcance, población y muestra, instrumento, procedimiento y consideraciones éticas.' + END,
        caso: () => 'TAREA: 1. Diseña una guía de entrevista semiestructurada de 8 a 10 preguntas abiertas alineadas a mis objetivos específicos, y una lista de qué observar.\n2. Redacta un borrador de METODOLOGÍA (250 a 350 palabras): enfoque, descripción del caso, informantes, técnicas, procedimiento de análisis por categorías y consideraciones éticas.' + END
      } },
    { k: 'argumentos', label: 'Desarrollo argumentativo', fase: 'Redactar', types: ['ensayo'], desc: 'Defiendan su tesis con argumentos sólidos, cada uno respaldado con evidencia de sus fuentes.',
      lesson: { t: 'Cómo construir argumentos', p: ['Un argumento es una razón que apoya la tesis. Sin evidencia es solo una opinión.'], pts: ['Cada argumento va en un párrafo o subtítulo propio (use # para el subtítulo).', 'Estructura: afirmación → evidencia citada → explicación de por qué la evidencia apoya la tesis.', 'Tipos de evidencia: estadísticas, estudios científicos, opiniones de expertos y ejemplos reales.', 'Conectores: en primer lugar, además, por consiguiente, en efecto, por lo tanto.'], ej: 'Afirmación: La prohibición total de la IA no evita su uso.\nEvidencia: Según (Autor, año), el 70 % de los estudiantes…\nExplicación: Por lo tanto, regular su uso es más efectivo que prohibirlo.' },
      ex: [{ q: '¿Qué hace fuerte a un argumento?', o: ['Que lo diga mucha gente', 'Que esté sustentado con evidencia de fuentes confiables', 'Que sea largo'], a: 1, fb: ['Correcto: la evidencia verificable convierte una opinión en argumento.', 'Eso no lo hace más fuerte; lo que importa es la evidencia.'] }],
      own: { label: 'Desarrollo argumentativo', min: 500, citas: 4 }, useSrc: true, ctx: [],
      task: () => 'TAREA: Propón 3 argumentos que sostengan mi tesis. Para cada uno indica: afirmación, evidencia tomada SOLO de mis fuentes (citada en APA 7) y explicación. Luego redacta un borrador de DESARROLLO ARGUMENTATIVO (500 a 700 palabras) con un subtítulo por argumento.' + END },
    { k: 'resultados', label: 'Resultados', fase: 'Redactar', types: ['encuesta', 'caso'], desc: 'Presenten lo que encontraron, sin opinar todavía.',
      lessonBy: {
        encuesta: { t: 'Presentar resultados de una encuesta', p: ['En Resultados se muestran los datos tal como salieron. La interpretación va después, en la Discusión.'], pts: ['Una figura por cada pregunta importante, numerada (Figura 1) y con título en cursiva.', 'Debajo, describan lo más relevante: «El 65 % de los estudiantes duerme menos de 7 horas (ver Figura 1)».', 'Ordenen los resultados según sus objetivos específicos.', 'Nunca inventen ni modifiquen datos.'] },
        caso: { t: 'Presentar hallazgos de un estudio de caso', p: ['Los hallazgos se organizan por categorías: temas que se repiten en las entrevistas, la observación y los documentos.'], pts: ['Una categoría por subtítulo (use # al inicio de la línea).', 'Incluyan citas breves de los informantes entre comillas: «…» (Informante 2).', 'Describan sin interpretar todavía: eso va en la Discusión.', 'Ordenen las categorías según sus objetivos específicos.'] }
      },
      exBy: {
        encuesta: [{ q: 'De 60 estudiantes, 39 duermen menos de 7 horas. ¿Qué porcentaje es?', o: ['39 %', '65 %', '60 %'], a: 1, fb: ['Correcto: 39 ÷ 60 × 100 = 65 %.', 'Dividan 39 para 60 y multipliquen por 100.'] }],
        caso: [{ q: '¿Dónde se interpretan los hallazgos y se comparan con otros autores?', o: ['En Resultados', 'En Discusión', 'En el Resumen'], a: 1, fb: ['Correcto: Resultados describe y Discusión interpreta.', 'En Resultados solo se describe lo encontrado.'] }]
      },
      own: { label: 'Resultados', min: 200, citas: 0 }, ctx: [],
      taskBy: {
        encuesta: x => 'TAREA: Estos son los datos reales de mi encuesta.\n1. Verifica mis porcentajes.\n2. Redacta un borrador de RESULTADOS (200 a 400 palabras) que describa cada figura en orden (Figura 1, Figura 2…), sin interpretar ni opinar.\n3. Indica qué resultados responden a cada objetivo específico.\n\nDATOS:\n' + (x.chartsText || '[agrega primero tus figuras con los datos]') + END,
        caso: () => 'TAREA: Te paso mis notas de entrevistas y observación. Ayúdame a:\n1. Organizarlas en 3 a 5 categorías relacionadas con mis objetivos.\n2. Elegir para cada categoría 1 o 2 citas breves de los informantes.\n3. Redactar un borrador de RESULTADOS (200 a 400 palabras) que describa cada categoría sin interpretar.\n\nMIS NOTAS:\n[pega aquí tus notas o transcripciones]' + END
      } },
    { k: 'contra', label: 'Contraargumentos', fase: 'Redactar', types: ['ensayo'], desc: 'Reconozcan las posturas contrarias y respóndanlas con evidencia.',
      lesson: { t: 'Contraargumentos y refutación', p: ['Un buen ensayo no ignora a quienes piensan distinto: presenta sus razones con justicia y las responde.'], pts: ['Presenten el contraargumento con su fuente.', 'Refuten con evidencia por qué su tesis sigue siendo válida, o matícenla.', 'Conectores: sin embargo, si bien es cierto que, no obstante, a pesar de ello.'] },
      ex: [{ q: '¿Para qué se incluyen contraargumentos en un ensayo?', o: ['Para alargar el texto', 'Para mostrar que analizaron otras posturas y fortalecer la tesis', 'Para cambiar de tema'], a: 1, fb: ['Correcto: responder a otras posturas hace más creíble la tesis.', 'No: su función es fortalecer la tesis.'] }],
      own: { label: 'Contraargumentos y refutación', min: 250, citas: 2 }, useSrc: true, ctx: ['argumentos'],
      task: () => 'TAREA: Identifica 2 contraargumentos fuertes a mi tesis (si es posible, sustentados en mis fuentes). Para cada uno, redacta una refutación con evidencia. Escribe un borrador de 250 a 400 palabras.' + END },
    { k: 'discusion', label: 'Discusión', fase: 'Redactar', types: ['encuesta', 'caso'], desc: 'Interpreten sus resultados y compárenlos con lo que dicen los autores.',
      lesson: { t: 'La discusión', p: ['La discusión es donde demuestran su pensamiento crítico: explican qué significan sus resultados y los ponen en diálogo con los autores del marco teórico.'], pts: ['Interpreten: ¿qué significan sus resultados?', 'Comparen: ¿coinciden o no con los autores? ¿Por qué?', 'Respondan a la pregunta de investigación y digan si la hipótesis o proposición se confirma.', 'Reconozcan limitaciones: tamaño de la muestra, tiempo, posibles sesgos.', 'Propongan nuevas preguntas para futuras investigaciones.'] },
      ex: [{ q: 'Sus resultados no coinciden con lo que dice un autor. ¿Qué hacen?', o: ['Borran a ese autor', 'Lo explican y proponen posibles razones de la diferencia', 'Cambian sus datos'], a: 1, fb: ['Correcto: las diferencias también son hallazgos valiosos.', 'Nunca: eso sería deshonesto. Las diferencias se explican.'] }],
      own: { label: 'Discusión', min: 300, citas: 3 }, useSrc: true, ctx: ['resultados'],
      task: () => 'TAREA: Con base en mis resultados y mis fuentes, redacta un borrador de DISCUSIÓN (300 a 450 palabras): interpreta los resultados, compáralos con los autores (citando SOLO mis fuentes), indica si se confirma la hipótesis o proposición, señala limitaciones y propone futuras investigaciones.' + END },
    { k: 'conclusiones', label: 'Conclusiones', fase: 'Redactar', desc: 'Respondan su pregunta de investigación y propongan recomendaciones.',
      lesson: { t: 'Conclusiones y recomendaciones', p: ['Las conclusiones cierran el artículo: responden la pregunta y muestran si se cumplieron los objetivos.'], pts: ['Una conclusión por cada objetivo específico.', 'Respondan la pregunta de investigación de forma directa.', 'No agreguen datos ni citas nuevas.', 'Recomendaciones: a quién (estudiantes, docentes, autoridades, familias) y qué hacer.', 'En el ensayo: reafirmen la tesis y sinteticen los argumentos.'] },
      ex: [{ q: '¿Qué NO debe aparecer en las conclusiones?', o: ['La respuesta a la pregunta de investigación', 'Datos nuevos que no estaban en Resultados', 'Recomendaciones'], a: 1, fb: ['Correcto: las conclusiones se basan en lo que ya presentaron.', 'Eso sí debe aparecer en las conclusiones.'] }],
      own: { label: 'Conclusiones y recomendaciones', min: 200, citas: 0 }, ctx: ['resultados', 'discusion', 'argumentos', 'contra'],
      task: () => 'TAREA: Redacta un borrador de CONCLUSIONES Y RECOMENDACIONES (200 a 350 palabras): una conclusión por cada objetivo específico, la respuesta directa a la pregunta de investigación y 3 recomendaciones dirigidas a actores concretos. No agregues datos nuevos.' + END },
    { k: 'resumen', label: 'Resumen y Abstract', fase: 'Entregar', desc: 'Se escribe al final, pero va al inicio: es lo primero (y a veces lo único) que leen los demás.',
      lesson: { t: 'Resumen, palabras clave y Abstract', p: ['El resumen es una versión en miniatura del artículo completo.'], pts: ['Un solo párrafo de 150 a 250 palabras.', 'Incluye: propósito, método, resultados principales y conclusión.', 'Palabras clave: 3 a 5 términos que ayuden a encontrar el artículo.', 'Abstract y Keywords: la versión en inglés. Revísenla; no la copien de un traductor sin leerla.'] },
      ex: [{ q: '¿Qué debe incluir el resumen?', o: ['Solo el tema', 'Propósito, método, resultados y conclusión', 'Las referencias'], a: 1, fb: ['Correcto: resume todo el artículo.', 'El resumen debe sintetizar todo el artículo.'] }],
      own: { label: 'Resumen', min: 150, max: 250, citas: 0 }, ctx: ['intro', 'metodo', 'resultados', 'argumentos', 'discusion', 'conclusiones'],
      task: () => 'TAREA: Con base en todo mi artículo, redacta:\nResumen: un solo párrafo de 150 a 250 palabras (propósito, método, resultados principales y conclusión).\nPalabras clave: de 3 a 5.\nAbstract: traducción fiel al inglés.\nKeywords: de 3 a 5.' },
    { k: 'final', label: 'Revisión y entrega', fase: 'Entregar', desc: 'Definan el título final, revisen el artículo completo, autoevalúense y entreguen.' }
  ];

  const APPS_SCRIPT = `var CARPETA = 'Investigacion 3ro BGU';
var COLS = ['Codigo','Actualizado','Paralelo','Autores','Tipo','Titulo','Progreso','Secciones','Ejercicios','Fuentes verificadas','Coincidencia IA','Autoevaluacion','Palabras','Avance JSON','Word','PDF','Estado','Comentario docente'];

function doGet(e) {
  var id = String(e.parameter.id || '').toUpperCase();
  var res = { proyecto: null, comentario: '' };
  if (id) {
    var f = DriveApp.getFilesByName(id + '.json');
    if (f.hasNext()) res.proyecto = JSON.parse(f.next().getBlob().getDataAsString());
    var sh = hoja_();
    var fila = buscar_(sh, id);
    if (fila) res.comentario = String(sh.getRange(fila, 18).getValue() || '');
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var d = JSON.parse(e.postData.contents);
    var fd = carpeta_(d.paralelo);
    var it = fd.getFilesByName(d.id + '.json');
    var jf;
    if (it.hasNext()) { jf = it.next(); jf.setContent(d.json); }
    else jf = fd.createFile(d.id + '.json', d.json, MimeType.PLAIN_TEXT);
    var word = '', pdf = '';
    if (d.html) {
      var base = d.id + ' - ' + String(d.titulo || 'articulo').slice(0, 80);
      word = reemplazar_(fd, base + '.doc', Utilities.newBlob(d.html, 'application/msword')).getUrl();
      pdf = reemplazar_(fd, base + '.pdf', Utilities.newBlob(d.html, 'text/html').getAs('application/pdf')).getUrl();
    }
    var sh = hoja_();
    var fila = buscar_(sh, d.id);
    var v = [d.id, new Date(), d.paralelo, d.autores, d.tipo, d.titulo, d.progreso, d.secciones, d.ejercicios, d.fuentes, d.coincidencia, d.rubrica, d.palabras, jf.getUrl(), word, pdf, d.html ? 'Entregado' : 'En proceso'];
    if (fila) {
      var old = sh.getRange(fila, 1, 1, 17).getValues()[0];
      if (!d.html) { v[14] = old[14]; v[15] = old[15]; if (old[15]) v[16] = 'Entregado (editando)'; }
      sh.getRange(fila, 1, 1, 17).setValues([v]);
    } else sh.appendRow(v);
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function carpeta_(paralelo) {
  var it = DriveApp.getFoldersByName(CARPETA);
  var raiz = it.hasNext() ? it.next() : DriveApp.createFolder(CARPETA);
  var nombre = paralelo ? 'Paralelo ' + paralelo : 'Sin paralelo';
  var sub = raiz.getFoldersByName(nombre);
  return sub.hasNext() ? sub.next() : raiz.createFolder(nombre);
}

function reemplazar_(fd, nombre, blob) {
  var it = fd.getFilesByName(nombre);
  while (it.hasNext()) it.next().setTrashed(true);
  return fd.createFile(blob.setName(nombre));
}

function hoja_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Articulos') || ss.insertSheet('Articulos');
  if (sh.getLastRow() === 0) { sh.appendRow(COLS); sh.setFrozenRows(1); }
  return sh;
}

function buscar_(sh, id) {
  var n = sh.getLastRow(), r = 0;
  if (n < 2) return 0;
  sh.getRange(2, 1, n - 1, 1).getValues().forEach(function (x, i) { if (x[0] === id) r = i + 2; });
  return r;
}`;

  return { TIPOS, AREAS, CHK, MANUAL, RUB, SECS, APPS_SCRIPT };
})();
