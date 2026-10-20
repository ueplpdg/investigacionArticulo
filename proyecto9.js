// Proyecto Smart Campus · 9no EGB · Entradas y salidas · en parejas · 2 clases de 80 min.
(function () {
  const IDEAS = [
    { id: 'riego', n: 'Riego automático del jardín', p: 'Las plantas del patio se secan porque nadie las riega a tiempo.', ent: ['humedad'], sal: ['rele'] },
    { id: 'pasillo', n: 'Luz inteligente del pasillo', p: 'Las luces del pasillo quedan encendidas aunque no pase nadie.', ent: ['ldr', 'pir'], sal: ['ledv'] },
    { id: 'porteria', n: 'Barrera automática de la portería', p: 'En la entrada se forman filas y el guardia debe abrir a mano.', ent: ['ultra'], sal: ['servo', 'buzzer'] },
    { id: 'basura', n: 'Basurero que avisa cuando está lleno', p: 'Los basureros se desbordan antes de que alguien los vacíe.', ent: ['ultra'], sal: ['ledr', 'buzzer'] },
    { id: 'ventilador', n: 'Ventilador automático del aula', p: 'En las horas de calor el aula se calienta y cuesta concentrarse.', ent: ['temp'], sal: ['motor'] },
    { id: 'gas', n: 'Alarma de gas en el bar', p: 'Una fuga de gas en la cocina del bar podría ser peligrosa.', ent: ['gas'], sal: ['buzzer', 'ledr'] },
    { id: 'lab', n: 'Alarma del laboratorio', p: 'El laboratorio tiene equipos caros y nadie sabe si alguien entra fuera de horario.', ent: ['pir'], sal: ['buzzer', 'ledr'] },
    { id: 'bano', n: 'Luz automática del baño', p: 'La luz del baño queda prendida todo el día y se desperdicia energía.', ent: ['pir'], sal: ['ledv'] },
    { id: 'timbre', n: 'Timbre de recreo con botón', p: 'El timbre depende de que alguien lo toque a la hora exacta.', ent: ['boton'], sal: ['buzzer'] },
    { id: 'lectura', n: 'Semáforo de luz para leer', p: 'Algunas aulas tienen poca luz para leer y nadie lo nota.', ent: ['ldr'], sal: ['ledv', 'ledr'] }];
  const COMP = [
    { id: 'boton', n: 'Pulsador', t: 'in', s: 'd', tk: 'Pulsador', v: 'boton', cn: 'PIN_BOTON', d: 'Detecta si alguien lo presiona: HIGH (presionado) o LOW (suelto).', c: 'Una pata a 5 V; la pata opuesta al pin elegido y también a GND con una resistencia de 10 kΩ.' },
    { id: 'pir', n: 'Sensor de movimiento PIR', t: 'in', s: 'd', tk: 'Sensor PIR', v: 'movimiento', cn: 'PIN_PIR', d: 'Detecta a una persona que se mueve cerca: HIGH si hay movimiento.', c: 'Alimentación a 5 V, tierra a GND y señal al pin elegido.' },
    { id: 'inclin', n: 'Sensor de inclinación', t: 'in', s: 'd', tk: 'Sensor de inclinación', v: 'inclinado', cn: 'PIN_INCLINACION', d: 'Detecta si algo se inclinó o se cayó: HIGH o LOW.', c: 'Una pata a 5 V; la otra al pin elegido y a GND con 10 kΩ.' },
    { id: 'ultra', n: 'Sensor ultrasónico de distancia', t: 'in', s: 'u', tk: 'Sensor de distancia ultrasónico (4 pines)', v: 'distancia', cn: 'PIN_TRIG', u: 'cm', r: [2, 300], pins: ['Trig', 'Echo'], d: 'Mide a cuántos centímetros está un objeto, usando sonido.', c: 'VCC a 5 V, GND a GND, TRIG y ECHO a los dos pines elegidos.' },
    { id: 'ldr', n: 'Fotorresistencia (luz)', t: 'in', s: 'a', tk: 'Fotorresistencia', v: 'luz', cn: 'PIN_LUZ', r: [0, 1023], d: 'Mide cuánta luz hay: de 0 (oscuro) a 1023 (mucha luz).', c: 'Una pata a 5 V; la otra al pin analógico y también a GND con una resistencia de 10 kΩ.' },
    { id: 'humedad', n: 'Sensor de humedad del suelo', t: 'in', s: 'a', tk: 'Sensor de humedad del suelo', v: 'humedad', cn: 'PIN_HUMEDAD', r: [0, 1023], d: 'Mide la humedad de la tierra: valor bajo = tierra seca.', c: 'VCC a 5 V, GND a GND y SIG (señal) al pin analógico.' },
    { id: 'temp', n: 'Sensor de temperatura TMP36', t: 'in', s: 't', tk: 'Sensor de temperatura [TMP36]', v: 'temperatura', cn: 'PIN_TEMP', u: '°C', r: [-10, 60], d: 'Mide la temperatura en grados centígrados.', c: 'Mirándolo de frente: pata izquierda a 5 V, centro al pin analógico, derecha a GND.' },
    { id: 'gas', n: 'Sensor de gas', t: 'in', s: 'a', tk: 'Sensor de gas', v: 'gas', cn: 'PIN_GAS', r: [0, 1023], d: 'Detecta gas o humo: valor alto = hay gas.', c: 'Patas A y H de un lado a 5 V; una pata B al pin analógico y a GND con 4,7 kΩ; la otra H a GND.' },
    { id: 'pot', n: 'Potenciómetro', t: 'in', s: 'a', tk: 'Potenciómetro', v: 'perilla', cn: 'PIN_PERILLA', r: [0, 1023], d: 'Perilla que se gira: valor de 0 a 1023. Sirve para ajustar.', c: 'Patas de los extremos a 5 V y GND; la del centro al pin analógico.' },
    { id: 'ledv', n: 'LED verde', t: 'out', s: 'd', tk: 'LED (color verde)', cn: 'PIN_LED_VERDE', col: '#1fbf5b', acc: ['Encender', 'Apagar'], d: 'Luz verde que se enciende (HIGH) o se apaga (LOW).', c: 'Pata larga (ánodo) al pin a través de una resistencia de 220 Ω; pata corta (cátodo) a GND.' },
    { id: 'ledr', n: 'LED rojo', t: 'out', s: 'd', tk: 'LED (color rojo)', cn: 'PIN_LED_ROJO', col: '#e5322d', acc: ['Encender', 'Apagar'], d: 'Luz roja para avisos.', c: 'Pata larga (ánodo) al pin a través de una resistencia de 220 Ω; pata corta (cátodo) a GND.' },
    { id: 'buzzer', n: 'Zumbador (piezo)', t: 'out', s: 'd', tk: 'Piezo', cn: 'PIN_ZUMBADOR', acc: ['Sonar', 'Silenciar'], d: 'Suena con tone(pin, frecuencia) y se calla con noTone(pin).', c: 'Pata + (roja) al pin elegido; pata – (negra) a GND.' },
    { id: 'servo', n: 'Servomotor', t: 'out', s: 'p', tk: 'Micro servo', cn: 'PIN_SERVO', acc: ['Abrir (90°)', 'Cerrar (0°)'], d: 'Gira a un ángulo de 0° a 180°: abre una barrera o una puerta.', c: 'Cable café o negro a GND, rojo a 5 V y naranja (señal) a un pin con ~ (PWM).' },
    { id: 'motor', n: 'Motor CC (ventilador)', t: 'out', s: 'd', tk: 'Motor CC', cn: 'PIN_MOTOR', acc: ['Encender', 'Apagar'], d: 'Hace girar un ventilador o una rueda.', c: 'Con un transistor NPN: pin → resistencia de 1 kΩ → base; motor entre 5 V y el colector; emisor a GND; diodo en paralelo al motor.' },
    { id: 'rele', n: 'Relé con bomba de agua', t: 'out', s: 'd', tk: 'Relé SPDT', cn: 'PIN_RELE', acc: ['Encender bomba', 'Apagar bomba'], d: 'Interruptor que el Arduino controla para encender una bomba de agua.', c: 'La bobina del relé se controla con un transistor, igual que el motor; la bomba (o un motor) va en los contactos del relé con su propia batería.' }];
  const CM = {}; COMP.forEach(c => { CM[c.id] = c; });
  const DP = []; for (let i = 2; i <= 13; i++) DP.push('D' + i);
  const AP = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'], PWM = ['D3', 'D5', 'D6', 'D9', 'D10', 'D11'], ALLP = DP.concat(AP);
  const ET = [
    { k: 'e1', n: 'La idea', c: 1, min: 6, d: 'Elijan el problema del colegio y describan su solución.' },
    { k: 'e2', n: 'Ideas similares', c: 1, min: 10, d: 'Investiguen proyectos parecidos y qué pueden aprender de ellos.' },
    { k: 'e3', n: 'Entradas y salidas', c: 1, min: 12, d: 'Aprendan cómo el Arduino lee sensores y controla salidas.' },
    { k: 'e4', n: 'Componentes', c: 1, min: 8, d: 'Elijan los sensores y salidas, y a qué pin va cada uno.' },
    { k: 'e5', n: 'Diagrama de flujo', c: 2, min: 10, d: 'Armen la lógica del sistema y pruébenla en el simulador.' },
    { k: 'e6', n: 'Código', c: 2, min: 10, d: 'Completen el programa y piensen como el Arduino.' },
    { k: 'e7', n: 'Circuito en Tinkercad', c: 2, min: 15, d: 'Armen el circuito real paso a paso y simúlenlo.' },
    { k: 'e8', n: 'Reporte y cierre', c: 2, min: 6, d: 'Revisen su reporte, reflexionen y entreguen.' }];
  const QZ = [
    { q: 'El pulsador está presionado. ¿Qué devuelve digitalRead(2)?', o: ['HIGH (1)', 'LOW (0)', '1023', '512'], a: 0, ex: 'Un pin digital solo tiene dos estados. Presionado = HIGH (1); suelto = LOW (0).' },
    { q: '¿Entre qué valores puede responder analogRead(A0)?', o: ['0 y 1', '0 y 255', '0 y 1023', '0 y 100'], a: 2, ex: 'Las entradas analógicas del Arduino UNO van de 0 a 1023 (1024 valores posibles).' },
    { q: '¿Qué es una ENTRADA en un sistema automático?', o: ['Un componente que el Arduino controla, como un LED', 'Un componente que le da información al Arduino, como un sensor', 'El cable USB'], a: 1, ex: 'Las entradas (sensores, botones) le cuentan al Arduino qué pasa. Las salidas (LED, motor, zumbador) hacen algo.' },
    { c: ['int luz = analogRead(A0);   // luz = 250', 'if (luz < 400) {', '  digitalWrite(13, HIGH);', '} else {', '  digitalWrite(13, LOW);', '}'], q: 'Con luz = 250, ¿qué hace el LED?', o: ['Se enciende', 'Se apaga', 'Parpadea'], a: 0, ex: '250 < 400 es verdadero: se ejecuta el bloque del if y el LED se enciende.' },
    { q: '¿Dónde se conecta un sensor analógico como la fotorresistencia?', o: ['En un pin A0 a A5', 'En un pin digital 2 a 13', 'En GND'], a: 0, ex: 'Los sensores que dan muchos valores van a los pines analógicos A0–A5.' },
    { q: 'Antes de usar el pin 13 como salida, ¿qué hay que escribir en setup()?', o: ['pinMode(13, OUTPUT);', 'digitalRead(13);', 'analogRead(13);'], a: 0, ex: 'pinMode configura el pin: OUTPUT para salidas, INPUT para entradas digitales.' },
    { c: ['long distancia = medirDistancia();   // distancia = 35', 'if (distancia < 20) {', '  servo1.write(90);   // abrir', '} else {', '  servo1.write(0);    // cerrar', '}'], q: 'El carro está a 35 cm. ¿Qué hace la barrera?', o: ['Se abre (90°)', 'Se queda cerrada (0°)'], a: 1, ex: '35 < 20 es falso: se ejecuta el else y la barrera se queda cerrada.' },
    { q: '¿Qué instrucción hace sonar el zumbador del pin 8?', o: ['tone(8, 1000);', 'digitalRead(8);', 'analogRead(8);'], a: 0, ex: 'tone(pin, frecuencia) hace sonar el zumbador; noTone(pin) lo apaga.' }];
  const BUGS = [
    { l: ['void setup() {', '  pinMode(13, OUTPUT);', '}', 'void loop() {', '  int luz = analogRead(A0)', '  if (luz < 400) {', '    digitalWrite(13, HIGH);', '  }', '}'], a: 4, ex: 'A la línea 5 le falta el punto y coma (;) al final.' },
    { l: ['void setup() {', '  pinMode(7, INPUT);', '  pinMode(13, OUTPUT);', '}', 'void loop() {', '  int boton = digitalRead(7);', '  if (boton = HIGH) {', '    digitalWrite(13, HIGH);', '  }', '}'], a: 6, ex: 'En la línea 7 se usa = (guardar) en vez de == (comparar).' },
    { l: ['void setup() {', '  pinMode(8, OUTPUT);', '}', 'void loop() {', '  int luz = digitalRead(A0);', '  if (luz < 300) {', '    tone(8, 1000);', '  }', '}'], a: 4, ex: 'La fotorresistencia es analógica: hay que usar analogRead, no digitalRead.' }];

  const words = s => (String(s || '').match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9]+/g) || []).length;
  const MIN = (st, n) => st.ad ? Math.max(3, Math.round(n * 0.6)) : n;
  const minSeg = (st, E) => Math.round(E.min * 60 * (st.ad ? 0.7 : 1));
  const nuevo = () => ({ v: 1, cur: 'e1', done: {}, tiempo: {}, err: {}, e1: {}, e2: { refs: [{}, {}] }, e3: { vis: {}, q: {} }, e4: { sel: {} }, e5: { si: [{}], no: [{}], ms: '500', casos: [], lg: '&&' }, e6: { bl: {}, pred: {}, bug: {}, malas: [] }, e7: { pasos: {} }, e8: { auto: {} } });
  function norm(st) { const n = nuevo(); st = Object.assign({}, st); Object.keys(n).forEach(k => { if (n[k] && typeof n[k] === 'object' && !Array.isArray(n[k])) st[k] = Object.assign({}, n[k], st[k] || {}); else if (st[k] == null) st[k] = n[k]; }); if (!Array.isArray(st.e2.refs)) st.e2.refs = [{}, {}]; while (st.e2.refs.length < 2) st.e2.refs.push({}); return st; }
  const ideaDe = st => IDEAS.find(i => i.id === (st.e1 || {}).idea);
  const ideaNombre = st => (st.e1 || {}).idea === 'propia' ? (String(st.e1.propia || '').trim() || 'Idea propia') : ((ideaDe(st) || {}).n || 'Sin idea');
  const sel = st => Object.keys((st.e4 || {}).sel || {}).filter(k => CM[k]);
  const ins = st => sel(st).filter(k => CM[k].t === 'in');
  const outs = st => sel(st).filter(k => CM[k].t === 'out');
  const pinsDe = (st, k) => ((((st.e4 || {}).sel || {})[k] || {}).pins) || {};
  const pinCode = p => p && p[0] === 'D' ? p.slice(1) : (p || '?');
  const esDig = k => !!CM[k] && CM[k].s === 'd';
  const rango = k => (CM[k] && CM[k].r) || [0, 1];
  const cmp = (a, op, b) => op === '<' ? a < b : op === '>' ? a > b : op === '!=' ? a != b : a == b;
  const valNum = (k, v) => esDig(k) ? (v === 'HIGH' ? 1 : 0) : Number(v);
  function cond(e, vals) { const a = cmp(Number(vals[e.in1] || 0), esDig(e.in1) ? '==' : e.op1, valNum(e.in1, e.v1)); if (!e.dos || !e.in2) return a; const b = cmp(Number(vals[e.in2] || 0), esDig(e.in2) ? '==' : e.op2, valNum(e.in2, e.v2)); return e.lg === '||' ? (a || b) : (a && b); }
  const pTxt = (k, op, v) => CM[k] ? CM[k].v + ' ' + (esDig(k) ? '==' : (op || '?')) + ' ' + (v === '' || v == null ? '?' : v) : '?';
  const condTxt = e => pTxt(e.in1, e.op1, e.v1) + (e.dos && e.in2 ? ' ' + (e.lg || '&&') + ' ' + pTxt(e.in2, e.op2, e.v2) : '');
  const acts = (st, L) => (L || []).filter(x => x && outs(st).includes(x.out) && (x.acc === '0' || x.acc === '1' || x.acc === 0 || x.acc === 1)).map(x => ({ out: x.out, acc: String(x.acc) }));
  const accTxt = a => CM[a.out] ? CM[a.out].n + ': ' + CM[a.out].acc[Number(a.acc)] : '?';
  const valOk = (k, v, op) => { if (!CM[k]) return false; if (esDig(k)) return v === 'HIGH' || v === 'LOW'; const r = rango(k), n = Number(v); return (op === '<' || op === '>') && v !== '' && v != null && isFinite(n) && n >= r[0] && n <= r[1]; };
  const valTxt = (k, n) => esDig(k) ? (n ? 'HIGH' : 'LOW') : String(n) + (CM[k].u ? ' ' + CM[k].u : '');

  function gen(st) {
    const e = st.e5, L = [], B = {}; let n = 0;
    const bl = (opts, ans) => { const id = 'b' + (n++); B[id] = { opts: opts.map(String), ans: String(ans) }; return { b: id }; };
    const ln = (...t) => L.push([].concat(...t));
    const I = ins(st), O = outs(st), S = sel(st), servo = O.includes('servo'), ultra = I.includes('ultra');
    ln('// Proyecto: ' + ideaNombre(st)); ln('// 9no ' + (st.par || '') + ' · ' + (st.a1 || '') + ' y ' + (st.a2 || ''));
    if (servo) { ln('#include <Servo.h>'); ln('Servo servo1;'); }
    S.forEach(k => { const c = CM[k], p = pinsDe(st, k); if (k === 'ultra') { ln('const int PIN_TRIG = ' + pinCode(p.Trig) + ';   // ultrasónico: Trig'); ln('const int PIN_ECHO = ' + pinCode(p.Echo) + ';   // ultrasónico: Echo'); } else ln('const int ' + c.cn + ' = ' + pinCode(p['Señal']) + ';   // ' + c.n); });
    ln(''); ln('void setup() {');
    I.forEach(k => { if (esDig(k)) ln('  pinMode(' + CM[k].cn + ', ', bl(['INPUT', 'OUTPUT'], 'INPUT'), ');'); if (k === 'ultra') { ln('  pinMode(PIN_TRIG, OUTPUT);'); ln('  pinMode(PIN_ECHO, INPUT);'); } });
    O.forEach(k => { if (k === 'servo') ln('  servo1.attach(PIN_SERVO);'); else ln('  pinMode(' + CM[k].cn + ', ', bl(['INPUT', 'OUTPUT'], 'OUTPUT'), ');'); });
    ln('  Serial.begin(9600);'); ln('}');
    if (ultra) { ln(''); ln('long medirDistancia() {'); ln('  digitalWrite(PIN_TRIG, LOW);  delayMicroseconds(2);'); ln('  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);'); ln('  digitalWrite(PIN_TRIG, LOW);'); ln('  return pulseIn(PIN_ECHO, HIGH) * 0.034 / 2;   // centímetros'); ln('}'); }
    ln(''); ln('void loop() {');
    const usados = [e.in1, e.dos ? e.in2 : null].filter(k => k && I.includes(k));
    I.forEach(k => { const c = CM[k];
      if (c.s === 'a') ln('  int ' + c.v + ' = ', bl(['analogRead', 'digitalRead'], 'analogRead'), '(' + c.cn + ');');
      else if (c.s === 'd') ln('  int ' + c.v + ' = ', bl(['digitalRead', 'analogRead'], 'digitalRead'), '(' + c.cn + ');');
      else if (c.s === 't') ln('  float temperatura = (', bl(['analogRead', 'digitalRead'], 'analogRead'), '(' + c.cn + ') * 5.0 / 1024.0 - 0.5) * 100;');
      else if (c.s === 'u') ln('  long distancia = medirDistancia();'); });
    if (usados[0]) ln('  Serial.println(' + CM[usados[0]].v + ');');
    if (CM[e.in1]) {
      const c1 = esDig(e.in1) ? ['==', ' ' + (e.v1 || '?')] : [bl(['<', '>', '==', '!='], e.op1 || '<'), ' ' + (e.v1 || '?')];
      const c2 = e.dos && CM[e.in2] ? [' ', bl(['&&', '||'], e.lg || '&&'), ' ' + pTxt(e.in2, e.op2, e.v2)] : [];
      ln('  if (' + CM[e.in1].v + ' ', c1, c2, ') {');
      const accL = a => { const c = CM[a.out], on = a.acc === '0';
        if (a.out === 'servo') ln('    servo1.write(', bl(['0', '90', '180'], on ? '90' : '0'), ');');
        else if (a.out === 'buzzer') { if (on) ln('    ', bl(['tone', 'noTone'], 'tone'), '(' + c.cn + ', 1000);'); else ln('    ', bl(['tone', 'noTone'], 'noTone'), '(' + c.cn + ');'); }
        else ln('    digitalWrite(' + c.cn + ', ', bl(['HIGH', 'LOW'], on ? 'HIGH' : 'LOW'), ');'); };
      acts(st, e.si).forEach(accL); ln('  } else {'); acts(st, e.no).forEach(accL); ln('  }');
    }
    const ms = String(e.ms || '500'); ln('  delay(', bl([...new Set([ms, '100', '1000', '5000'])], ms), ');'); ln('}');
    const text = fill => L.map(t => t.map(x => typeof x === 'string' ? x : (fill ? (fill[x.b] || '___') : B[x.b].ans)).join('')).join('\n');
    return { L, B, text };
  }
  function preds(st) {
    const e = st.e5, ks = [e.in1, e.dos ? e.in2 : null].filter(k => CM[k]); if (!ks.length) return [];
    const cand = k => { if (esDig(k)) return [1, 0]; const r = rango(k), v = Number(k === e.in1 ? e.v1 : e.v2) || 0, d = Math.max(5, Math.round((r[1] - r[0]) * 0.08)); return [Math.max(r[0], v - d), Math.min(r[1], v + d)]; };
    const combos = ks.length === 1 ? cand(ks[0]).map(a => ({ [ks[0]]: a })) : [].concat(...cand(ks[0]).map(a => cand(ks[1]).map(b => ({ [ks[0]]: a, [ks[1]]: b }))));
    const t = combos.filter(c => cond(e, c)), f = combos.filter(c => !cond(e, c)), out = [];
    if (t[0]) out.push(t[0]); if (f[0]) out.push(f[0]); if (f[1]) out.push(f[1]); else if (t[1]) out.push(t[1]);
    return out.map(vals => ({ vals, r: cond(e, vals), txt: ks.map(k => CM[k].v + ' = ' + valTxt(k, vals[k])).join(' y ') }));
  }
  function pinErr(st, k) {
    const c = CM[k], p = pinsDe(st, k), names = c.pins || ['Señal'], out = [];
    names.forEach(nm => { const v = p[nm]; if (!v) { out.push('Elijan el pin de ' + (c.pins ? nm : 'la señal') + '.'); return; }
      if ((c.s === 'a' || c.s === 't') && v[0] !== 'A') out.push('Es un sensor analógico: va en un pin A0 a A5.');
      else if (c.s !== 'a' && c.s !== 't' && v[0] !== 'D') out.push('Este componente es digital: usen un pin de 2 a 13.');
      else if (c.s === 'p' && !PWM.includes(v)) out.push('El servo necesita un pin con ~ (3, 5, 6, 9, 10 u 11).'); });
    return out;
  }
  const VAL = {
    e1: st => { const e = st.e1, f = [], M = n => MIN(st, n);
      if (!e.idea) f.push('Elijan un problema de la lista o su propia idea.');
      if (e.idea === 'propia' && words(e.propia) < 3) f.push('Escriban el nombre de su idea propia (3 palabras o más).');
      [['problema', 20, 'el problema'], ['quien', 8, 'a quién afecta'], ['solucion', 25, 'cómo lo resolverá'], ['medir', 6, 'qué debe medir'], ['hacer', 6, 'qué debe hacer']].forEach(([k, n, t]) => { if (words(e[k]) < M(n)) f.push('Escriban ' + t + ' (' + M(n) + ' palabras o más).'); });
      return { ok: !f.length, f }; },
    e2: st => { const n = st.ad ? 1 : 2, f = [], M = x => MIN(st, x), urls = [];
      for (let i = 0; i < n; i++) { const r = st.e2.refs[i] || {}, P = 'Proyecto ' + (i + 1) + ': ';
        if (words(r.titulo) < 3) f.push(P + 'escriban el nombre del proyecto.');
        if (!/^https?:\/\/\S+\.\S+/.test(r.url || '')) f.push(P + 'peguen el enlace completo (https://…).');
        else if (/google\.[a-z.]+\/search|scholar\?|results\?search_query|\/search[/?]/.test(r.url)) f.push(P + 'ese es el enlace de la búsqueda; abran el proyecto y copien su enlace.');
        else urls.push(r.url.trim());
        if (!r.fuente) f.push(P + 'elijan dónde lo encontraron.');
        if (words(r.que) < M(15)) f.push(P + 'expliquen qué hace (' + M(15) + ' palabras).');
        if (words(r.comp) < M(4)) f.push(P + 'escriban qué componentes usa.');
        if (words(r.tomar) < M(12)) f.push(P + 'expliquen qué idea toman para su proyecto (' + M(12) + ' palabras).'); }
      if (new Set(urls).size < urls.length) f.push('Los proyectos deben ser distintos.');
      return { ok: !f.length, f }; },
    e3: st => { const e = st.e3, f = [], n = st.ad ? 5 : 8;
      if (!e.vis.b || !e.vis.l || !e.vis.s) f.push('Prueben los 3 simuladores (pulsador, sensor de luz y salidas).');
      const ok = QZ.slice(0, n).filter((x, i) => (e.q[i] || {}).ok).length; if (ok < n) f.push('Respondan bien las ' + n + ' preguntas (llevan ' + ok + ').');
      return { ok: !f.length, f }; },
    e4: st => { const f = [], I = ins(st), O = outs(st), used = {};
      if (!I.length) f.push('Elijan al menos 1 entrada (sensor o botón).'); if (!O.length) f.push('Elijan al menos 1 salida.');
      sel(st).forEach(k => { pinErr(st, k).forEach(x => f.push(CM[k].n + ': ' + x)); Object.values(pinsDe(st, k)).forEach(v => { if (v) { if (used[v]) f.push('El pin ' + v + ' está repetido.'); used[v] = 1; } });
        if (words((st.e4.sel[k] || {}).uso) < MIN(st, 6)) f.push(CM[k].n + ': expliquen para qué lo usan (' + MIN(st, 6) + ' palabras).'); });
      return { ok: !f.length, f: [...new Set(f)] }; },
    e5: st => { const e = st.e5, f = [], I = ins(st), O = outs(st);
      if (!I.length || !O.length) f.push('Primero elijan al menos una entrada y una salida en la etapa 4.');
      if (!I.includes(e.in1)) f.push('Elijan qué sensor se lee en el rombo.'); else if (!valOk(e.in1, e.v1, e.op1)) f.push('Completen la condición del rombo con un valor dentro del rango del sensor.');
      if (e.dos) { if (!I.includes(e.in2) || e.in2 === e.in1) f.push('Elijan el segundo sensor (distinto del primero).'); else if (!valOk(e.in2, e.v2, e.op2)) f.push('Completen la segunda condición.'); }
      const S = acts(st, e.si), N = acts(st, e.no);
      if (!S.length) f.push('Agreguen al menos una acción en el camino SÍ.'); if (!N.length) f.push('Agreguen al menos una acción en el camino NO.');
      if (S.length && JSON.stringify(S) === JSON.stringify(N)) f.push('Los caminos SÍ y NO no pueden hacer lo mismo.');
      O.forEach(k => { if (!S.concat(N).some(x => x.out === k)) f.push('Usen la salida «' + CM[k].n + '» en algún camino (o quítenla en la etapa 4).'); });
      const cs = (e.casos || []).map(c => cond(e, c.vals)); if (cs.length < 2 || !cs.includes(true) || !cs.includes(false)) f.push('Registren al menos 2 casos de prueba: uno que vaya por SÍ y otro por NO.');
      if (words(e.porque) < MIN(st, 15)) f.push('Expliquen por qué eligieron ese valor en la condición (' + MIN(st, 15) + ' palabras).');
      return { ok: !f.length, f }; },
    e6: st => { const f = [], e = st.e6;
      if (!VAL.e5(st).ok) { f.push('Primero completen el diagrama (etapa 5).'); return { ok: false, f }; }
      const G = gen(st), mal = Object.keys(G.B).filter(id => (e.bl[id] || '') !== G.B[id].ans);
      if (mal.length || !e.verif) f.push('Completen los espacios del código y pulsen «Comprobar el código».');
      const P = preds(st); if (P.some((x, i) => !(e.pred[i] || {}).ok)) f.push('Respondan bien las ' + P.length + ' preguntas de «Pensar como el Arduino».');
      if (BUGS.some((x, i) => !(e.bug[i] || {}).ok)) f.push('Encuentren el error en los 3 programas de «Detectives de código».');
      return { ok: !f.length, f }; },
    e7: st => { const e = st.e7, f = [], n = pasosTk(st).length;
      const k = Object.keys(e.pasos || {}).filter(x => e.pasos[x]).length; if (k < n) f.push('Marquen los ' + n + ' pasos de la guía (llevan ' + k + ').');
      if (!/^https:\/\/(www\.)?tinkercad\.com\/(things|designs|circuits)\//.test(String(e.url || '').trim())) f.push('Peguen el enlace de su circuito (https://www.tinkercad.com/things/…).');
      if (!e.res) f.push('Digan si su simulación funcionó.'); if (words(e.obs) < MIN(st, 20)) f.push('Describan lo que pasó al probar y qué corrigieron (' + MIN(st, 20) + ' palabras).');
      return { ok: !f.length, f }; },
    e8: st => { const e = st.e8, f = [], M = n => MIN(st, n);
      if (words(e.concl) < M(40)) f.push('Escriban la conclusión (' + M(40) + ' palabras).');
      ['m1', 'm2', 'm3'].forEach((k, i) => { if (words(e[k]) < M(12)) f.push('Respondan la pregunta ' + (i + 1) + ' de reflexión (' + M(12) + ' palabras).'); });
      if (AUTO.some((x, i) => !e.auto[i])) f.push('Completen la autoevaluación.');
      return { ok: !f.length, f }; } };
  const AUTO = ['Trabajamos en equipo y nos turnamos el mouse', 'Investigamos antes de decidir', 'Nuestro sistema funciona en la simulación', 'Entendemos cada línea de nuestro código'];
  const PTS = st => { const r = {}; ET.forEach(E => { if (!st.done[E.k]) return; r[E.k] = E.k === 'e3' ? Math.max(5, 10 - (st.err.e3 || 0)) : E.k === 'e6' ? Math.max(5, 10 - (st.err.e6 || 0) * 0.5) : 10; }); return r; };
  const nota = st => { const r = PTS(st); return Math.round(Object.values(r).reduce((a, b) => a + b, 0) / 80 * 10 * 100) / 100; };
  const apellidos = st => [st.a1, st.a2].map(x => String(x || '').trim().split(/\s+/).slice(-1)[0]).filter(Boolean).join(' y ');
  function pasosTk(st) {
    const L = [['Entren a Tinkercad con el código de su clase', 'Abran el enlace de arriba, escriban el código de clase y el apodo que les dio su docente.'],
      ['Creen un circuito nuevo', 'Botón «Crear» → «Circuito». Pónganle de nombre: 9no ' + (st.par || '') + ' – ' + ideaNombre(st) + ' – ' + apellidos(st) + '.'],
      ['Coloquen el Arduino Uno R3 y una placa de pruebas', 'En el panel de la derecha busquen «Arduino Uno R3» y «Placa de pruebas pequeña» y arrástrenlos al área de trabajo.'],
      ['Conecten 5 V y GND a la placa de pruebas', 'Cable rojo del pin 5V a la línea + y cable negro de GND a la línea –. Cambien el color del cable haciendo clic sobre él.']];
    sel(st).forEach(k => { const c = CM[k], p = pinsDe(st, k), pin = (c.pins || ['Señal']).map(x => x + ' → pin ' + (p[x] || '?')).join(', '); L.push(['Coloquen «' + c.tk + '» y conéctenlo (' + pin + ')', c.c]); });
    L.push(['Peguen su código', 'Botón «Código» → cambien «Bloques» por «Texto» → acepten → borren todo y peguen el código de la etapa 6 (botón «Copiar código»).']);
    L.push(['Inicien la simulación y prueben sus casos', 'Botón «Iniciar simulación». Hagan clic sobre el sensor para cambiar su valor y comprueben sus casos de prueba de la etapa 5.']);
    L.push(['Copien el enlace de su circuito', 'Copien la dirección de la barra del navegador (empieza con https://www.tinkercad.com/things/) y péguenla abajo.']);
    return L;
  }
  function resumen(st) { const r = PTS(st); return { idea: ideaNombre(st), etapas: Object.keys(r).length + '/8', nota: nota(st), detalle: ET.map(E => E.n + ' ' + (r[E.k] != null ? r[E.k] : '-')).join(' · '), tinkercad: (st.e7 || {}).url || '' }; }
  function reporte(st) {
    const esc = s => String(s == null ? '' : s).replace(/[&<>]/g, x => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[x]));
    const p = s => '<p>' + esc(s).replace(/\n/g, '<br>') + '</p>', e1 = st.e1, e5 = st.e5, e7 = st.e7, e8 = st.e8, G = gen(st), R = resumen(st);
    let logo = ''; try { logo = new URL('escudo-providencia.png', location.href).href; } catch (e) {}
    const refs = (st.e2.refs || []).filter(r => r && r.titulo).map((r, i) => '<h3>' + (i + 1) + '. ' + esc(r.titulo) + '</h3><p><b>Fuente:</b> ' + esc(r.fuente) + ' · <a href="' + esc(r.url) + '">' + esc(r.url) + '</a></p><p><b>Qué hace:</b> ' + esc(r.que) + '</p><p><b>Componentes:</b> ' + esc(r.comp) + '</p><p><b>Qué tomamos:</b> ' + esc(r.tomar) + '</p>').join('');
    const mat = sel(st).map(k => '<tr><td>' + esc(CM[k].n) + '</td><td>' + (CM[k].t === 'in' ? 'Entrada' : 'Salida') + '</td><td>' + esc(Object.entries(pinsDe(st, k)).map(([a, b]) => a + ': ' + b).join(', ')) + '</td><td>' + esc((st.e4.sel[k] || {}).uso) + '</td></tr>').join('');
    const leer = [e5.in1, e5.dos ? e5.in2 : null].filter(k => CM[k]).map(k => '<li>Leer ' + esc(CM[k].n.toLowerCase()) + ' → variable <b>' + CM[k].v + '</b></li>').join('');
    const diag = '<ol><li>INICIO</li><li>Configurar los pines (setup)</li>' + leer + '<li>¿' + esc(condTxt(e5)) + '?<br>SÍ → ' + esc(acts(st, e5.si).map(accTxt).join(' · ')) + '<br>NO → ' + esc(acts(st, e5.no).map(accTxt).join(' · ')) + '</li><li>Esperar ' + esc(e5.ms) + ' ms</li><li>Volver a leer los sensores (loop)</li></ol>';
    const casos = (e5.casos || []).map(c => '<li>' + esc(c.txt) + ' → camino ' + (cond(e5, c.vals) ? 'SÍ' : 'NO') + '</li>').join('');
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Proyecto ' + esc(ideaNombre(st)) + '</title><style>body{font-family:Arial,sans-serif;color:#111;max-width:800px;margin:24px auto;padding:0 20px;font-size:12pt;line-height:1.5}h1{font-size:20pt;margin:6px 0}h2{font-size:14pt;border-bottom:2px solid #0b7d6e;padding-bottom:3px;margin-top:22px}h3{font-size:12pt;margin:12px 0 2px}table{border-collapse:collapse;width:100%;font-size:10.5pt}td,th{border:1px solid #777;padding:5px;vertical-align:top;text-align:left}th{background:#eee}pre{background:#f4f4f4;border:1px solid #ccc;padding:10px;font-size:9.5pt;white-space:pre-wrap}.cab{display:flex;gap:16px;align-items:center;border-bottom:3px solid #0b7d6e;padding-bottom:10px}</style></head><body>'
      + '<div class="cab">' + (logo ? '<img src="' + logo + '" style="height:70px">' : '') + '<div><div style="font-size:10pt;letter-spacing:.08em">UNIDAD EDUCATIVA PARTICULAR «LA PROVIDENCIA» · ROBÓTICA · 9.º EGB ' + esc(st.par) + '</div><h1>' + esc(ideaNombre(st)) + '</h1><div>Proyecto Smart Campus · ' + esc(st.a1) + ' y ' + esc(st.a2) + ' · ' + new Date().toLocaleDateString('es-EC') + ' · Código ' + esc(st.id) + '</div></div></div>'
      + '<h2>1. El problema</h2>' + p(e1.problema) + '<p><b>A quién afecta:</b> ' + esc(e1.quien) + '</p><h2>2. Nuestra solución</h2>' + p(e1.solucion) + '<p><b>Qué mide (entrada):</b> ' + esc(e1.medir) + '<br><b>Qué hace (salida):</b> ' + esc(e1.hacer) + '</p>'
      + '<h2>3. Proyectos similares investigados</h2>' + refs + '<h2>4. Componentes y conexiones</h2><table><tr><th>Componente</th><th>Tipo</th><th>Pines</th><th>Para qué lo usamos</th></tr>' + mat + '</table>'
      + '<h2>5. Diagrama de flujo</h2>' + diag + '<p><b>Por qué elegimos ese valor:</b> ' + esc(e5.porque) + '</p><p><b>Casos de prueba:</b></p><ul>' + casos + '</ul>'
      + '<h2>6. Código</h2><pre>' + esc(G.text()) + '</pre><h2>7. Circuito en Tinkercad</h2><p><a href="' + esc(e7.url) + '">' + esc(e7.url) + '</a></p><p><b>Resultado:</b> ' + esc(e7.res) + '</p>' + p(e7.obs)
      + '<h2>8. Conclusiones</h2>' + p(e8.concl) + '<h2>9. Reflexión</h2><p><b>¿Qué aprendimos?</b> ' + esc(e8.m1) + '</p><p><b>¿Qué fue lo más difícil y cómo lo resolvimos?</b> ' + esc(e8.m2) + '</p><p><b>¿Cómo mejoraríamos nuestro sistema?</b> ' + esc(e8.m3) + '</p>'
      + '<p><b>Autoevaluación (1 a 4):</b> ' + AUTO.map((a, i) => esc(a) + ': ' + (e8.auto[i] || '-')).join(' · ') + '</p><p style="font-size:10pt;color:#555">Nota automática del sistema: ' + R.nota + ' / 10 (' + esc(R.detalle) + '). Sujeta a revisión docente.</p></body></html>';
  }

  function make(React) {
    if (make.c) return make.c;
    const { useState, useEffect, useRef } = React, h = React.createElement;
    const C = { bg: '#f2f4f3', card: '#ffffff', ink: '#14201d', mute: '#55625e', line: '#d5dcd9', acc: '#0b7d6e', accBg: '#e3f3ef', blue: '#2456b8', amb: '#a86200', ambBg: '#fff4de', red: '#c23b30', redBg: '#fde9e6', ok: '#1d7a44', okBg: '#e3f4ea', sunk: '#e9eeec', code: '#101820' };
    const HD = "'Archivo Black',sans-serif", MO = "'IBM Plex Mono',monospace";
    const D = (st, ...ch) => h('div', { style: st }, ...ch);
    const arr = s => Array.isArray(s) ? s : [s];
    const T = (s, st) => D(Object.assign({ fontSize: 'clamp(16px,1.2vw,18px)', lineHeight: 1.5 }, st || {}), ...arr(s));
    const B_ = s => h('b', null, s);
    const K = (s, col) => D({ fontFamily: MO, fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: col || C.mute, textTransform: 'uppercase' }, s);
    const H1 = (s, st) => D(Object.assign({ fontFamily: HD, fontSize: 'clamp(26px,2.6vw,40px)', lineHeight: 1.08 }, st || {}), s);
    const H2 = (s, st) => D(Object.assign({ fontFamily: HD, fontSize: 'clamp(19px,1.6vw,24px)', lineHeight: 1.15 }, st || {}), s);
    const Card = (st, ...ch) => D(Object.assign({ background: C.card, border: '2px solid ' + C.line, borderRadius: 12, padding: 'clamp(14px,1.4vw,20px)', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }, st || {}), ...ch);
    const Row = (st, ...ch) => D(Object.assign({ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }, st || {}), ...ch);
    const Grid = (min, ...ch) => D({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,' + min + 'px),1fr))', gap: 14, alignItems: 'start' }, ...ch);
    const Btn = (s, on, o) => { o = o || {}; return h('button', { onClick: o.dis ? undefined : on, disabled: o.dis, style: { alignSelf: o.self || 'flex-start', background: o.dis ? C.sunk : o.bg || C.acc, color: o.dis ? C.mute : o.c || '#fff', border: '2px solid ' + (o.dis ? C.line : o.bd || o.bg || C.acc), fontFamily: HD, fontSize: o.fs || 16, padding: o.pad || '10px 16px', borderRadius: 8, cursor: o.dis ? 'not-allowed' : 'pointer', textAlign: 'left', lineHeight: 1.2, maxWidth: '100%', whiteSpace: typeof s === 'string' && s.length < 48 ? 'nowrap' : 'normal' } }, s); };
    const Chip = (s, on, clk, col) => h('button', { onClick: clk, style: { padding: '8px 14px', borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: 'pointer', background: on ? (col || C.acc) : C.card, color: on ? '#fff' : C.ink, border: '2px solid ' + (on ? (col || C.acc) : C.line), lineHeight: 1.25, textAlign: 'left' } }, s);
    const Sel = (v, opts, on, st) => h('select', { value: v == null ? '' : String(v), onChange: e => on(e.target.value), style: Object.assign({ fontSize: 15, padding: '8px 10px', border: '2px solid ' + C.line, borderRadius: 8, background: '#fff', color: C.ink, maxWidth: '100%' }, st || {}) }, h('option', { value: '' }, '— elegir —'), ...opts.map(o => Array.isArray(o) ? h('option', { key: String(o[0]), value: String(o[0]) }, o[1]) : h('option', { key: String(o), value: String(o) }, String(o))));
    const Code = (lines, hl) => D({ background: C.code, color: '#e8f1f2', fontFamily: MO, fontSize: 'clamp(13px,1vw,15px)', lineHeight: 1.6, padding: '12px 14px', borderRadius: 8, overflowX: 'auto', whiteSpace: 'pre' }, ...lines.map((l, i) => D({ background: hl === i ? 'rgba(255,209,102,.22)' : 'transparent' }, l || ' ')));
    const Led = (on, col) => D({ width: 38, height: 38, borderRadius: 19, flex: 'none', background: on ? col : '#3a3f44', boxShadow: on ? '0 0 20px ' + col + ', 0 0 6px ' + col : 'inset 0 2px 4px rgba(0,0,0,.4)', border: '3px solid #222', transition: 'all .15s' });
    const Lista = (L, col) => D({ display: 'flex', flexDirection: 'column', gap: 6 }, ...L.map(x => D({ display: 'flex', gap: 8, fontSize: 15, lineHeight: 1.4 }, h('span', { style: { color: col || C.red, fontWeight: 700, flex: 'none' } }, '✗'), h('span', null, x))));
    function Campo(p) {
      const n = words(p.v), ok = !p.min || n >= p.min, el = p.rows ? 'textarea' : 'input';
      return D({ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 },
        p.lab ? D({ fontWeight: 700, fontSize: 16, lineHeight: 1.35 }, p.lab) : null, p.ayuda ? D({ fontSize: 14, color: C.mute, lineHeight: 1.4 }, p.ayuda) : null,
        h(el, { value: p.v || '', rows: p.rows, placeholder: p.ph, onChange: e => p.on(e.target.value), onPaste: p.paste ? undefined : e => { e.preventDefault(); p.flash && p.flash('Aquí no se puede pegar: escriban con sus propias palabras.'); }, onDrop: p.paste ? undefined : e => e.preventDefault(), spellCheck: true,
          style: { width: '100%', boxSizing: 'border-box', fontSize: 16, lineHeight: 1.45, padding: '10px 12px', border: '2px solid ' + (p.v && !ok ? C.amb : C.line), borderRadius: 8, background: '#fff', color: C.ink, resize: 'vertical', fontFamily: 'inherit' } }),
        p.min ? D({ fontFamily: MO, fontSize: 12, color: ok ? C.ok : C.amb }, n + ' / ' + p.min + ' palabras' + (ok ? ' ✓' : '')) : null);
    }
    const F = props => h(Campo, props);
    const beep = (f, d) => { try { const A = beep.ac || (beep.ac = new (window.AudioContext || window.webkitAudioContext)()), o = A.createOscillator(), g = A.createGain(), t = A.currentTime; o.frequency.value = f || 1000; g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.0001, t + (d || 0.35)); o.connect(g); g.connect(A.destination); o.start(t); o.stop(t + (d || 0.35)); } catch (e) {} };

    function OutVis({ k, on }) {
      const c = CM[k]; let vis;
      if (k === 'ledv' || k === 'ledr') vis = Led(on, c.col);
      else if (k === 'buzzer') vis = D({ fontFamily: HD, fontSize: 22, color: on ? C.amb : C.mute, minWidth: 90 }, on ? '♪ ♫ ♪' : '· · ·');
      else if (k === 'servo') vis = h('svg', { viewBox: '0 0 120 70', style: { width: 110, height: 64 } }, h('rect', { x: 4, y: 40, width: 20, height: 26, fill: '#55625e' }), h('rect', { x: 14, y: 38, width: 100, height: 8, rx: 4, fill: '#e5322d', transform: 'rotate(' + (on ? -80 : 0) + ' 14 42)', style: { transition: 'transform .4s' } }));
      else if (k === 'motor') vis = h('svg', { viewBox: '0 0 60 60', style: { width: 56, height: 56 } }, h('g', { style: { transformOrigin: '30px 30px', animation: on ? 'p9spin .5s linear infinite' : 'none' } }, ...[0, 120, 240].map(r => h('ellipse', { key: r, cx: 30, cy: 14, rx: 7, ry: 14, fill: on ? '#2456b8' : '#8a9894', transform: 'rotate(' + r + ' 30 30)' }))), h('circle', { cx: 30, cy: 30, r: 5, fill: '#14201d' }));
      else if (k === 'rele') vis = D({ display: 'flex', gap: 4, alignItems: 'flex-end', height: 40 }, ...[0, 1, 2].map(i => D({ width: 10, height: on ? 18 + i * 6 : 6, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: on ? '#2f8fe0' : '#b9c4c1', transition: 'height .3s' })));
      return D({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 10, border: '2px solid ' + (on ? C.acc : C.line), borderRadius: 10, minWidth: 110 }, vis, D({ fontSize: 13, fontWeight: 700, textAlign: 'center' }, c.n), D({ fontFamily: MO, fontSize: 12, color: on ? C.ok : C.mute }, on ? 'ACTIVO' : 'apagado'));
    }

    function Login({ ctx }) {
      const [f, setF] = useState({ a1: '', a2: '', par: '', ad: false }), [cod, setCod] = useState(''), [msg, setMsg] = useState(''), [carg, setCarg] = useState(false);
      const okN = s => String(s || '').trim().split(/\s+/).length >= 2, L = ctx.local;
      const ir = () => { if (!okN(f.a1) || !okN(f.a2)) { setMsg('Escriban nombre y apellido de los dos integrantes.'); return; } if (!f.par) { setMsg('Elijan su paralelo.'); return; } ctx.iniciar(f); };
      const cont = async () => { setCarg(true); setMsg(''); const r = await ctx.continuar(cod.trim().toUpperCase()); setCarg(false); if (!r) setMsg('No encontramos ese código. Revísenlo o pidan ayuda al docente.'); };
      return D({ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box', background: C.bg },
        D({ width: '100%', maxWidth: 980, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 20 },
          D({ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }, K('Robótica · 9.º EGB · Unidad Educativa «La Providencia»', C.acc), H1('Proyecto Smart Campus', { fontSize: 'clamp(34px,4vw,56px)' }),
            T('En parejas van a diseñar un sistema automático que resuelva un problema real del colegio: desde la idea hasta el circuito funcionando en Tinkercad.'),
            Card({ gap: 6 }, K('Clase 1', C.acc), T('La idea · Ideas similares · Entradas y salidas · Componentes', { fontSize: 15 }), K('Clase 2', C.acc), T('Diagrama de flujo · Código · Tinkercad · Reporte', { fontSize: 15 })),
            T('Cada etapa se abre cuando la anterior está bien hecha. Si terminan antes, sigan avanzando. El avance se guarda solo.', { fontSize: 15, color: C.mute })),
          Card({ gap: 14 }, H2('Empezar un proyecto nuevo'),
            F({ lab: 'Integrante 1 (nombre y apellido)', v: f.a1, on: v => setF(Object.assign({}, f, { a1: v })), paste: true }), F({ lab: 'Integrante 2 (nombre y apellido)', v: f.a2, on: v => setF(Object.assign({}, f, { a2: v })), paste: true }),
            D({ display: 'flex', flexDirection: 'column', gap: 6 }, D({ fontWeight: 700 }, 'Paralelo'), Row({}, ...['A', 'B', 'C', 'D'].map(x => Chip('9no ' + x, f.par === x, () => setF(Object.assign({}, f, { par: x })))))),
            h('label', { style: { display: 'flex', gap: 10, alignItems: 'center', fontSize: 15, cursor: 'pointer' } }, h('input', { type: 'checkbox', checked: f.ad, onChange: e => setF(Object.assign({}, f, { ad: e.target.checked })), style: { width: 20, height: 20 } }), 'Versión con apoyo (solo si el docente lo indicó)'),
            Btn('Comenzar el proyecto →', ir, { fs: 18, pad: '14px 20px' }), msg ? T(msg, { color: C.red, fontWeight: 700, fontSize: 15 }) : null,
            D({ borderTop: '2px solid ' + C.line, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }, H2('Continuar un proyecto'),
              L && L.a1 ? Btn('Continuar en esta computadora: ' + L.a1 + ' y ' + L.a2 + ' (' + L.id + ')', ctx.seguirLocal, { bg: C.blue }) : null,
              Row({}, h('input', { value: cod, onChange: e => setCod(e.target.value), placeholder: 'Código P9-XXXXX', style: { fontFamily: MO, fontSize: 16, padding: '10px 12px', border: '2px solid ' + C.line, borderRadius: 8, width: 190 } }), Btn(carg ? 'Buscando…' : 'Continuar', cont, { bg: C.blue, dis: carg || cod.trim().length < 6 })),
              T('Si cambian de computadora, usen el código que aparece arriba en su proyecto.', { fontSize: 14, color: C.mute })))));
    }

    function E1({ st, up, flash }) {
      const e = st.e1, M = n => MIN(st, n), u = o => up('e1', o);
      const card = (on, onClick, ...ch) => h('button', { onClick, style: { textAlign: 'left', background: on ? C.accBg : C.card, color: C.ink, border: '3px solid ' + (on ? C.acc : C.line), borderRadius: 12, padding: 14, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 } }, ...ch);
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Card({}, K('Paso 1 · elijan el problema', C.acc), T('Elijan un problema real del colegio que su sistema va a resolver, o propongan su propia idea.'),
          Grid(250, ...IDEAS.map(i => card(e.idea === i.id, () => u({ idea: i.id }), D({ fontFamily: HD, fontSize: 18, lineHeight: 1.15 }, i.n), D({ fontSize: 14, color: C.mute, lineHeight: 1.4 }, i.p), D({ fontFamily: MO, fontSize: 12, color: C.acc, lineHeight: 1.4 }, 'Podría usar: ' + i.ent.concat(i.sal).map(k => CM[k].n).join(' · ')))),
            card(e.idea === 'propia', () => u({ idea: 'propia' }), D({ fontFamily: HD, fontSize: 18 }, 'Nuestra propia idea'), D({ fontSize: 14, color: C.mute }, 'Un problema del colegio que ustedes vieron y quieren resolver.'))),
          e.idea === 'propia' ? F({ lab: 'Nombre de su idea', v: e.propia, on: v => u({ propia: v }), min: 3, ph: 'Ej.: Dispensador automático de gel', flash }) : null),
        e.idea ? Card({}, K('Paso 2 · la ficha del problema', C.acc), T('Escríbanla con sus propias palabras. Piensen en su colegio: ¿dónde pasa?, ¿cuándo?, ¿a quién afecta? Mientras uno escribe, el otro revisa.'),
          F({ lab: '1. ¿Cuál es el problema?', ayuda: 'Describan qué pasa, dónde y cuándo. Ej.: «En el jardín junto al bloque celeste las plantas se secan los fines de semana porque…»', v: e.problema, on: v => u({ problema: v }), min: M(20), rows: 3, flash }),
          F({ lab: '2. ¿A quién afecta y por qué es importante resolverlo?', v: e.quien, on: v => u({ quien: v }), min: M(8), rows: 2, flash }),
          F({ lab: '3. ¿Cómo lo resolverá su sistema automático?', ayuda: 'La idea general: qué detecta el sistema y qué hace solo, sin que nadie lo toque.', v: e.solucion, on: v => u({ solucion: v }), min: M(25), rows: 3, flash }),
          Grid(280, F({ lab: '4. ¿Qué debe MEDIR o DETECTAR? → será su ENTRADA', v: e.medir, on: v => u({ medir: v }), min: M(6), rows: 2, flash }), F({ lab: '5. ¿Qué debe HACER cuando lo detecta? → será su SALIDA', v: e.hacer, on: v => u({ hacer: v }), min: M(6), rows: 2, flash }))) : null);
    }
    function E2({ st, up, flash }) {
      const n = st.ad ? 1 : 2, q = ideaNombre(st), qe = encodeURIComponent(q + ' arduino');
      const L = [['Google Académico', 'https://scholar.google.com/scholar?hl=es&q=' + encodeURIComponent(q + ' arduino sensor')], ['YouTube', 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' arduino tinkercad')], ['Arduino Project Hub', 'https://projecthub.arduino.cc/search?q=' + qe], ['Instructables', 'https://www.instructables.com/search/?q=' + qe], ['Galería de Tinkercad', 'https://www.tinkercad.com/search?q=' + encodeURIComponent(q) + '&type=circuits']];
      const setR = (i, o) => { const R = st.e2.refs.slice(); R[i] = Object.assign({}, R[i], o); up('e2', { refs: R }); };
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Card({ borderColor: C.blue }, K('Cómo investigar', C.blue), T(['Busquen proyectos que resuelvan un problema parecido al suyo: «', B_(q), '». Abran el proyecto, ', B_('léanlo o mírenlo completo'), ' y recién ahí llenen la ficha. Si la búsqueda en español da poco, prueben en inglés (por ejemplo «automatic plant watering arduino»).']),
          Row({}, ...L.map(([t, u]) => h('a', { key: t, href: u, target: '_blank', rel: 'noopener', style: { background: C.blue, color: '#fff', padding: '9px 14px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' } }, t + ' ↗')))),
        ...[...Array(n)].map((_, i) => { const r = st.e2.refs[i] || {};
          return Card({}, H2('Proyecto similar ' + (i + 1)), Grid(260, F({ lab: 'Nombre del proyecto', v: r.titulo, on: v => setR(i, { titulo: v }), paste: true, ph: 'Ej.: Riego automático con Arduino y sensor de humedad' }), D({ display: 'flex', flexDirection: 'column', gap: 6 }, D({ fontWeight: 700 }, '¿Dónde lo encontraron?'), Sel(r.fuente, ['Google Académico', 'YouTube', 'Arduino Project Hub', 'Instructables', 'Tinkercad', 'Otra página'], v => setR(i, { fuente: v })))),
            F({ lab: 'Enlace del proyecto', v: r.url, on: v => setR(i, { url: v }), paste: true, ph: 'https://…' }),
            F({ lab: '¿Qué hace ese proyecto? (con sus palabras)', v: r.que, on: v => setR(i, { que: v }), min: MIN(st, 15), rows: 3, flash }),
            F({ lab: '¿Qué componentes usa?', v: r.comp, on: v => setR(i, { comp: v }), min: MIN(st, 4), flash, ph: 'Ej.: Arduino UNO, sensor de humedad, relé, bomba' }),
            F({ lab: '¿Qué idea toman de este proyecto para el suyo? ¿Qué harían distinto?', v: r.tomar, on: v => setR(i, { tomar: v }), min: MIN(st, 12), rows: 2, flash })); }));
    }
    function SimBoton({ on }) {
      const [pr, setPr] = useState(false), go = v => { setPr(v); if (v) on(); };
      return Card({}, K('Entrada digital · pulsador', C.acc), T(['digitalRead(pin) lee un pin digital y responde solo dos valores: ', B_('HIGH'), ' (1) o ', B_('LOW'), ' (0). Mantengan presionado el botón.']),
        Row({ gap: 18 }, h('button', { onMouseDown: () => go(true), onMouseUp: () => setPr(false), onMouseLeave: () => setPr(false), onTouchStart: () => go(true), onTouchEnd: () => setPr(false), style: { width: 92, height: 92, borderRadius: 46, border: '6px solid #333', background: pr ? '#b3271f' : '#e5534b', boxShadow: pr ? 'inset 0 4px 10px rgba(0,0,0,.5)' : '0 6px 0 #7a1f1a', transform: pr ? 'translateY(4px)' : 'none', cursor: 'pointer', color: '#fff', fontFamily: HD, fontSize: 14 } }, 'PULSAR'), Led(pr, '#1fbf5b'), D({ fontFamily: HD, fontSize: 26, color: pr ? C.ok : C.mute }, pr ? 'HIGH' : 'LOW')),
        Code(['int boton = digitalRead(2);   // boton = ' + (pr ? 'HIGH' : 'LOW'), 'if (boton == HIGH) {', '  digitalWrite(13, HIGH);   // LED encendido', '} else {', '  digitalWrite(13, LOW);    // LED apagado', '}'], pr ? 2 : 4),
        T('En la vida real: el timbre, el botón del ascensor, las teclas de la computadora.', { fontSize: 15, color: C.mute }));
    }
    function SimLDR({ on }) {
      const [luz, setLuz] = useState(700), [um, setUm] = useState(400), act = luz < um;
      return Card({}, K('Entrada analógica · fotorresistencia', C.acc), T(['analogRead(pin) lee un sensor que da ', B_('muchos valores'), ': de 0 a 1023. Muevan la luz del día y el valor límite.']),
        D({ height: 70, borderRadius: 10, background: 'linear-gradient(90deg, rgba(10,20,40,' + (1 - luz / 1023) + '), rgba(10,20,40,' + (1 - luz / 1023) + ')), linear-gradient(180deg,#9fd3f5,#fdf2c8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }, D({ fontFamily: HD, color: luz < 400 ? '#fff' : C.ink, fontSize: 20 }, 'luz = ' + luz), Led(act, '#ffd84a')),
        D({}, D({ fontWeight: 700, fontSize: 15 }, 'Luz del ambiente: ' + luz), h('input', { type: 'range', min: 0, max: 1023, value: luz, onChange: e => { setLuz(Number(e.target.value)); on(); }, style: { width: '100%' } })),
        D({}, D({ fontWeight: 700, fontSize: 15 }, 'Valor límite (umbral): ' + um), h('input', { type: 'range', min: 50, max: 1000, step: 10, value: um, onChange: e => { setUm(Number(e.target.value)); on(); }, style: { width: '100%' } })),
        Code(['int luz = analogRead(A0);   // luz = ' + luz, 'if (luz < ' + um + ') {          // ' + luz + ' < ' + um + ' es ' + (act ? 'VERDADERO' : 'FALSO'), '  digitalWrite(13, HIGH);   // encender la lámpara', '} else {', '  digitalWrite(13, LOW);', '}'], act ? 2 : 4),
        T('En la vida real: las luces de la calle que se prenden solas al anochecer.', { fontSize: 15, color: C.mute }));
    }
    function SimSal({ on }) {
      const [led, setLed] = useState(false), [ang, setAng] = useState(0), [son, setSon] = useState(false);
      return Card({}, K('Salidas · LED, zumbador y servomotor', C.acc), T('Las salidas hacen algo en el mundo real. Prueben cada una y miren la instrucción que la controla.'),
        Grid(200, D({ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }, Row({}, Led(led, '#e5322d'), Btn(led ? 'Apagar' : 'Encender', () => { setLed(!led); on(); }, { fs: 14, pad: '8px 12px' })), D({ fontFamily: MO, fontSize: 13 }, 'digitalWrite(13, ' + (led ? 'HIGH' : 'LOW') + ');')),
          D({ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }, Btn(son ? '♪ Sonando…' : 'Hacer sonar', () => { setSon(true); beep(1000, 0.5); on(); setTimeout(() => setSon(false), 500); }, { fs: 14, pad: '8px 12px', bg: C.amb }), D({ fontFamily: MO, fontSize: 13 }, son ? 'tone(8, 1000);' : 'noTone(8);')),
          D({ display: 'flex', flexDirection: 'column', gap: 6 }, h(OutVis, { k: 'servo', on: ang >= 45 }), h('input', { type: 'range', min: 0, max: 180, value: ang, onChange: e => { setAng(Number(e.target.value)); on(); } }), D({ fontFamily: MO, fontSize: 13 }, 'servo1.write(' + ang + ');'))));
    }
    function E3({ st, set }) {
      const e = st.e3, n = st.ad ? 5 : 8, vis = k => { if (!e.vis[k]) set({ e3: Object.assign({}, e, { vis: Object.assign({}, e.vis, { [k]: 1 }) }) }); };
      const resp = (i, k) => { const ok = k === QZ[i].a, q = Object.assign({}, e.q, { [i]: ok ? { ok: true } : { mal: k } }); set(ok ? { e3: Object.assign({}, e, { q }) } : { e3: Object.assign({}, e, { q }), err: Object.assign({}, st.err, { e3: (st.err.e3 || 0) + 1 }) }); if (ok) beep(1320, 0.12); };
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Card({ borderColor: C.acc, background: C.accBg }, H2('Todo sistema automático tiene 3 partes'), Grid(200, ...[['ENTRADA', 'Sensores y botones: le cuentan al Arduino qué pasa.', C.blue], ['PROCESO', 'El Arduino compara y decide con su programa (if / else).', C.acc], ['SALIDA', 'LED, zumbador, motor, servo: hacen algo en el mundo real.', C.amb]].map(([a, b, c]) => D({ borderLeft: '6px solid ' + c, paddingLeft: 12, display: 'flex', flexDirection: 'column', gap: 4 }, D({ fontFamily: HD, fontSize: 20, color: c }, a), T(b, { fontSize: 15 }))))),
        Grid(380, h(SimBoton, { on: () => vis('b') }), h(SimLDR, { on: () => vis('l') })), h(SimSal, { on: () => vis('s') }),
        Card({}, H2('Pensar como el Arduino · ' + n + ' preguntas'), T('Si se equivocan, lean la explicación y vuelvan a intentar. Cada error resta medio punto de esta etapa.', { fontSize: 15, color: C.mute }),
          ...QZ.slice(0, n).map((x, i) => { const r = e.q[i] || {};
            return D({ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '2px solid ' + C.line, paddingTop: 12 }, D({ fontWeight: 700, fontSize: 17 }, (i + 1) + '. ' + x.q), x.c ? Code(x.c) : null,
              Row({}, ...x.o.map((o, k) => Chip(o, r.ok ? k === x.a : r.mal === k, () => !r.ok && resp(i, k), r.ok ? C.ok : r.mal === k ? C.red : C.acc))),
              r.ok ? T('✓ ' + x.ex, { color: C.ok, fontSize: 15 }) : r.mal != null ? T('✗ No es esa. Pista: ' + x.ex.split(':')[0] + '. Intenten otra vez.', { color: C.red, fontSize: 15 }) : null); })));
    }
    function E4({ st, up, flash }) {
      const [tab, setTab] = useState('in'), S = st.e4.sel, I = ins(st), O = outs(st), idea = ideaDe(st) || { ent: [], sal: [] };
      const tog = k => { const c = CM[k], n = Object.assign({}, S); if (n[k]) delete n[k]; else { if (c.t === 'in' && I.length >= 2) { flash('Máximo 2 entradas.'); return; } if (c.t === 'out' && O.length >= 3) { flash('Máximo 3 salidas.'); return; } n[k] = { pins: {}, uso: '' }; } up('e4', { sel: n }); };
      const setC = (k, o) => up('e4', { sel: Object.assign({}, S, { [k]: Object.assign({}, S[k], o) }) });
      const resist = []; sel(st).forEach(k => { if (k === 'ledv' || k === 'ledr') resist.push('1 resistencia de 220 Ω (' + CM[k].n + ')'); if (['boton', 'inclin', 'ldr'].includes(k)) resist.push('1 resistencia de 10 kΩ (' + CM[k].n + ')'); if (k === 'gas') resist.push('1 resistencia de 4,7 kΩ (sensor de gas)'); if (k === 'motor' || k === 'rele') resist.push('1 transistor NPN, 1 resistencia de 1 kΩ y 1 diodo (' + CM[k].n + ')'); });
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Card({}, K('Catálogo de componentes · todos existen en Tinkercad', C.acc), T(['Recuerden su idea: ', B_(ideaNombre(st)), '. Elijan de 1 a 2 entradas y de 1 a 3 salidas. Los marcados con ★ se usan en ideas como la suya.']),
          Row({}, Chip('Entradas (sensores) · ' + I.length, tab === 'in', () => setTab('in'), C.blue), Chip('Salidas · ' + O.length, tab === 'out', () => setTab('out'), C.amb)),
          Grid(230, ...COMP.filter(c => c.t === tab).map(c => { const on = !!S[c.id], sug = idea.ent.concat(idea.sal).includes(c.id);
            return h('button', { key: c.id, onClick: () => tog(c.id), style: { textAlign: 'left', background: on ? C.accBg : C.card, color: C.ink, border: '3px solid ' + (on ? C.acc : C.line), borderRadius: 12, padding: 12, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 } },
              D({ fontFamily: HD, fontSize: 17 }, (sug ? '★ ' : '') + c.n), D({ fontSize: 14, lineHeight: 1.4 }, c.d), D({ fontFamily: MO, fontSize: 12, color: c.t === 'in' ? C.blue : C.amb }, (c.t === 'in' ? 'ENTRADA ' : 'SALIDA ') + (c.s === 'a' || c.s === 't' ? 'ANALÓGICA' : c.s === 'p' ? 'PWM (~)' : 'DIGITAL')), D({ fontFamily: MO, fontSize: 12, fontWeight: 700, color: on ? C.ok : C.mute }, on ? '✓ ELEGIDO · tocar para quitar' : '+ tocar para elegir')); }))),
        ...sel(st).map(k => { const c = CM[k], p = pinsDe(st, k), er = pinErr(st, k);
          return Card({ borderColor: er.length ? C.amb : C.ok }, Row({ justifyContent: 'space-between' }, H2(c.n), K(c.t === 'in' ? 'Entrada' : 'Salida', c.t === 'in' ? C.blue : C.amb)),
            Row({}, ...(c.pins || ['Señal']).map(nm => D({ display: 'flex', flexDirection: 'column', gap: 4 }, D({ fontWeight: 700, fontSize: 14 }, 'Pin de ' + (c.pins ? nm : 'señal')), Sel(p[nm], ALLP, v => setC(k, { pins: Object.assign({}, p, { [nm]: v }) }))))),
            er.length ? Lista(er, C.amb) : T('✓ Pin correcto', { color: C.ok, fontSize: 15, fontWeight: 700 }),
            T(['Conexión: ', c.c], { fontSize: 14, color: C.mute }),
            F({ lab: '¿Para qué lo usan en su proyecto?', v: (S[k] || {}).uso, on: v => setC(k, { uso: v }), min: MIN(st, 6), flash, ph: 'Ej.: Mide la humedad de la maceta para saber cuándo regar' })); }),
        sel(st).length ? Card({ borderColor: C.blue }, K('Lista de materiales (se arma sola)', C.blue), ...['1 Arduino UNO R3', '1 placa de pruebas (protoboard)', 'Cables de conexión'].concat(sel(st).map(k => '1 ' + CM[k].n)).concat(resist).map(x => T('• ' + x, { fontSize: 15 }))) : null);
    }
    function Diag({ st, vals }) {
      const e = st.e5, r = CM[e.in1] ? cond(e, vals) : null, box = (t, o) => D(Object.assign({ border: '3px solid ' + C.ink, background: '#fff', padding: '8px 14px', fontWeight: 700, fontSize: 15, textAlign: 'center', maxWidth: 320, lineHeight: 1.3 }, o || {}), t), ar = () => D({ width: 3, height: 16, background: C.ink });
      const rama = (L, on, lab, col) => D({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 8, borderRadius: 10, background: on ? (col === C.ok ? C.okBg : C.redBg) : 'transparent', border: '2px dashed ' + (on ? col : 'transparent') }, D({ fontFamily: HD, color: col, fontSize: 15 }, lab), ...(L.length ? L.map(a => box(accTxt(a), { fontSize: 14, borderColor: col })) : [D({ color: C.mute, fontSize: 14 }, '(sin acción)')]));
      return D({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }, box('INICIO', { borderRadius: 999 }), ar(), box('Configurar pines (setup)'), ar(),
        ...[e.in1, e.dos ? e.in2 : null].filter(k => CM[k]).map((k, i) => D({ display: 'flex', flexDirection: 'column', alignItems: 'center' }, i ? ar() : null, box('Leer ' + CM[k].n.toLowerCase() + ' → ' + CM[k].v, { transform: 'skewX(-12deg)' }))), ar(),
        D({ width: 220, minHeight: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }, D({ position: 'absolute', inset: 8, transform: 'rotate(45deg) scale(.72)', border: '3px solid ' + C.ink, background: C.ambBg }), D({ position: 'relative', fontWeight: 700, fontSize: 14, textAlign: 'center', padding: '0 24px', fontFamily: MO }, '¿' + condTxt(e) + '?')),
        D({ display: 'flex', gap: 10, width: '100%', maxWidth: 520 }, rama(acts(st, e.si), r === true, 'SÍ', C.ok), rama(acts(st, e.no), r === false, 'NO', C.red)), ar(), box('Esperar ' + (e.ms || '?') + ' ms'), ar(), box('↺ Volver a leer (loop)', { borderRadius: 999 }));
    }
    function E5({ st, up, flash }) {
      const e = st.e5, I = ins(st), O = outs(st), u = o => up('e5', o);
      const [vals, setVals] = useState(() => { const v = {}; I.forEach(k => { const r = rango(k); v[k] = esDig(k) ? 0 : Math.round((r[0] + r[1]) / 2); }); return v; });
      if (!I.length || !O.length) return Card({ borderColor: C.amb }, T('Primero elijan sus entradas y salidas en la etapa 4.'));
      const condEd = (kIn, kOp, kV, label) => { const k = e[kIn]; return D({ display: 'flex', flexDirection: 'column', gap: 8 }, D({ fontWeight: 700 }, label), Row({}, Sel(k, I.map(x => [x, CM[x].n]), v => u({ [kIn]: v, [kV]: '' })),
        CM[k] ? (esDig(k) ? Row({}, D({ fontFamily: MO }, CM[k].v + ' =='), Sel(e[kV], [['HIGH', 'HIGH (activado)'], ['LOW', 'LOW (no activado)']], v => u({ [kV]: v }))) : Row({}, D({ fontFamily: MO }, CM[k].v), Sel(e[kOp], [['<', '< menor que'], ['>', '> mayor que']], v => u({ [kOp]: v })), h('input', { type: 'number', value: e[kV] == null ? '' : e[kV], min: rango(k)[0], max: rango(k)[1], onChange: ev => u({ [kV]: ev.target.value }), style: { width: 110, fontSize: 16, padding: '8px 10px', border: '2px solid ' + C.line, borderRadius: 8 } }), D({ fontSize: 13, color: C.mute }, 'rango ' + rango(k)[0] + ' a ' + rango(k)[1] + (CM[k].u ? ' ' + CM[k].u : '')))) : null)); };
      const actEd = (key, lab, col) => { const L = e[key] && e[key].length ? e[key] : [{}];
        return D({ display: 'flex', flexDirection: 'column', gap: 8, borderLeft: '6px solid ' + col, paddingLeft: 12 }, D({ fontFamily: HD, color: col }, lab), ...L.map((a, i) => Row({}, Sel(a.out, O.map(x => [x, CM[x].n]), v => { const n = L.slice(); n[i] = { out: v, acc: '' }; u({ [key]: n }); }), CM[a.out] ? Sel(a.acc, CM[a.out].acc.map((t, j) => [String(j), t]), v => { const n = L.slice(); n[i] = Object.assign({}, a, { acc: v }); u({ [key]: n }); }) : null, L.length > 1 ? Btn('Quitar', () => u({ [key]: L.filter((_, j) => j !== i) }), { bg: C.card, c: C.red, bd: C.red, fs: 13, pad: '6px 10px' }) : null)),
          L.length < 3 ? Btn('+ Otra acción', () => u({ [key]: L.concat([{}]) }), { bg: C.card, c: col, bd: col, fs: 13, pad: '6px 10px' }) : null); };
      const r = CM[e.in1] ? cond(e, vals) : null, estado = {}; O.forEach(k => { estado[k] = false; }); if (r != null) acts(st, r ? e.si : e.no).forEach(a => { estado[a.out] = a.acc === '0'; });
      const registrar = () => { if (!valOk(e.in1, e.v1, e.op1)) { flash('Primero completen la condición.'); return; } const ks = [e.in1, e.dos ? e.in2 : null].filter(k => CM[k]), cs = (e.casos || []).slice(-3); cs.push({ vals: Object.assign({}, vals), txt: ks.map(k => CM[k].v + ' = ' + valTxt(k, vals[k])).join(' y ') }); u({ casos: cs }); flash('Caso registrado: camino ' + (r ? 'SÍ' : 'NO')); };
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Grid(400, Card({}, K('Armen la lógica', C.acc), condEd('in1', 'op1', 'v1', '1. El rombo: ¿qué pregunta hace el Arduino?'),
            I.length >= 2 ? h('label', { style: { display: 'flex', gap: 10, alignItems: 'center', fontSize: 15, cursor: 'pointer' } }, h('input', { type: 'checkbox', checked: !!e.dos, onChange: ev => u({ dos: ev.target.checked, in2: I.find(x => x !== e.in1) || '' }), style: { width: 20, height: 20 } }), 'Agregar una segunda condición') : null,
            e.dos ? D({ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 12, borderLeft: '3px solid ' + C.line }, Row({}, D({ fontWeight: 700 }, 'Unir con:'), Sel(e.lg, [['&&', '&& (Y): se deben cumplir las dos'], ['||', '|| (O): basta con una']], v => u({ lg: v }))), condEd('in2', 'op2', 'v2', 'Segunda condición')) : null,
            actEd('si', '2. Si la respuesta es SÍ…', C.ok), actEd('no', '3. Si la respuesta es NO…', C.red),
            Row({}, D({ fontWeight: 700 }, '4. Esperar antes de volver a leer:'), Sel(e.ms, ['100', '250', '500', '1000', '2000', '5000'].map(x => [x, x + ' ms']), v => u({ ms: v })))),
          Card({ alignItems: 'center' }, K('Su diagrama de flujo · se arma solo', C.acc), h(Diag, { st, vals }))),
        Card({ borderColor: C.blue }, K('Simulador · cambien los sensores y miren qué hace su sistema', C.blue),
          Grid(240, ...I.map(k => D({ display: 'flex', flexDirection: 'column', gap: 6 }, D({ fontWeight: 700 }, CM[k].n + ': ' + valTxt(k, vals[k])),
            esDig(k) ? Row({}, Chip('LOW · no activado', !vals[k], () => setVals(Object.assign({}, vals, { [k]: 0 })), C.mute), Chip('HIGH · activado', !!vals[k], () => setVals(Object.assign({}, vals, { [k]: 1 })), C.blue)) : h('input', { type: 'range', min: rango(k)[0], max: rango(k)[1], value: vals[k], onChange: ev => setVals(Object.assign({}, vals, { [k]: Number(ev.target.value) })), style: { width: '100%' } })))),
          Row({ gap: 14 }, ...O.map(k => h(OutVis, { key: k, k, on: estado[k] }))),
          T(r == null ? 'Completen el rombo para ver el resultado.' : ['¿', condTxt(e), '? → ', B_(r ? 'SÍ' : 'NO'), ' → se ejecuta ', (acts(st, r ? e.si : e.no).map(accTxt).join(' · ') || 'nada')], { fontWeight: 600 }),
          Row({}, Btn('Registrar este caso de prueba', registrar, { bg: C.blue }), T('Necesitan al menos 2: uno por SÍ y otro por NO.', { fontSize: 14, color: C.mute })),
          (e.casos || []).length ? D({ display: 'flex', flexDirection: 'column', gap: 4 }, ...e.casos.map((c, i) => Row({}, T((i + 1) + '. ' + c.txt + ' → camino ' + (cond(e, c.vals) ? 'SÍ' : 'NO'), { fontSize: 15, fontFamily: MO }), Btn('Borrar', () => u({ casos: e.casos.filter((_, j) => j !== i) }), { bg: C.card, c: C.red, bd: C.red, fs: 12, pad: '4px 8px' })))) : null),
        Card({}, F({ lab: '¿Por qué eligieron ese valor en la condición? ¿Cómo lo comprobaron?', ayuda: 'Ej.: «Elegimos 300 porque en el simulador, con la tierra seca, el sensor marcaba menos de 300…»', v: e.porque, on: v => u({ porque: v }), min: MIN(st, 15), rows: 3, flash })));
    }
    function E6({ st, set, flash }) {
      const e = st.e6, G = gen(st), P = preds(st), malas = e.malas || [], e5 = st.e5;
      if (!VAL.e5(st).ok) return Card({ borderColor: C.amb }, T('Primero completen el diagrama de flujo (etapa 5).'));
      const S = o => set({ e6: Object.assign({}, e, o) }), errMas = o => set({ e6: Object.assign({}, e, o), err: Object.assign({}, st.err, { e6: (st.err.e6 || 0) + 1 }) });
      const comprobar = () => { const m = Object.keys(G.B).filter(id => (e.bl[id] || '') !== G.B[id].ans); if (m.length) { errMas({ malas: m, verif: false }); flash(m.length + ' espacio(s) incorrecto(s), marcados en rojo. Revisen su diagrama.'); } else { S({ malas: [], verif: true }); beep(1320, 0.15); flash('¡Código correcto! Ya pueden copiarlo.'); } };
      const listo = e.verif && !Object.keys(G.B).some(id => (e.bl[id] || '') !== G.B[id].ans);
      const copiar = () => { const t = G.text(); const ok = () => flash('Código copiado. Péguenlo en Tinkercad (etapa 7).'); try { navigator.clipboard.writeText(t).then(ok, () => flash('Seleccionen el código del cuadro y cópienlo con Ctrl + C.')); } catch (x) { flash('Seleccionen el código del cuadro y cópienlo con Ctrl + C.'); } };
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Card({}, K('1 · Completen su programa', C.acc), T(['El sistema escribió el programa a partir de su diagrama. Elijan la palabra correcta en cada espacio. Recuerden: ', B_('INPUT'), ' para entradas digitales, ', B_('OUTPUT'), ' para salidas, ', B_('analogRead'), ' para sensores analógicos y ', B_('digitalRead'), ' para digitales.']),
          D({ background: C.code, color: '#e8f1f2', fontFamily: MO, fontSize: 'clamp(13px,1vw,15px)', lineHeight: 1.9, padding: '12px 14px', borderRadius: 8, overflowX: 'auto' }, ...G.L.map((t, i) => D({ display: 'flex', whiteSpace: 'pre', alignItems: 'center' }, h('span', { style: { color: '#6b7a83', minWidth: 28, userSelect: 'none' } }, String(i + 1)), ...t.map(x => typeof x === 'string' ? h('span', { style: { color: /^\s*\/\//.test(x) ? '#7fe0a0' : undefined } }, x) : h('select', { value: e.bl[x.b] || '', onChange: ev => S({ bl: Object.assign({}, e.bl, { [x.b]: ev.target.value }), verif: false }), style: { fontFamily: MO, fontSize: 14, background: malas.includes(x.b) ? '#ffb4ab' : '#fff1c2', color: '#111', border: 'none', borderRadius: 4, padding: '1px 4px' } }, h('option', { value: '' }, '_____'), ...G.B[x.b].opts.map(o => h('option', { key: o, value: o }, o))))))),
          Row({}, Btn('Comprobar el código', comprobar), listo ? Btn('Copiar código', copiar, { bg: C.blue }) : null, T('Cada comprobación con errores resta medio punto.', { fontSize: 14, color: C.mute })),
          listo ? h('textarea', { readOnly: true, value: G.text(), rows: 8, style: { width: '100%', boxSizing: 'border-box', fontFamily: MO, fontSize: 13, padding: 10, border: '2px solid ' + C.line, borderRadius: 8 } }) : null),
        Card({}, K('2 · Pensar como el Arduino', C.acc), T('Usen SU programa. Para cada caso, ¿qué parte se ejecuta?'),
          ...P.map((x, i) => { const r = e.pred[i] || {}, O = [['SÍ: el bloque del if → ' + acts(st, e5.si).map(accTxt).join(' · '), true], ['NO: el bloque del else → ' + acts(st, e5.no).map(accTxt).join(' · '), false]];
            return D({ display: 'flex', flexDirection: 'column', gap: 6, borderTop: '2px solid ' + C.line, paddingTop: 10 }, D({ fontWeight: 700, fontFamily: MO }, 'Caso ' + (i + 1) + ': ' + x.txt),
              Row({}, ...O.map(([t, v], k) => Chip(t, r.ok ? v === x.r : r.mal === k, () => { if (r.ok) return; if (v === x.r) { S({ pred: Object.assign({}, e.pred, { [i]: { ok: true } }) }); beep(1320, 0.12); } else errMas({ pred: Object.assign({}, e.pred, { [i]: { mal: k } }) }); }, r.ok ? C.ok : r.mal === k ? C.red : C.acc))),
              r.ok ? T('✓ ¿' + condTxt(e5) + '? es ' + (x.r ? 'verdadero' : 'falso') + '.', { color: C.ok, fontSize: 15 }) : r.mal != null ? T('✗ Reemplacen los valores en la condición y vuelvan a intentar.', { color: C.red, fontSize: 15 }) : null); })),
        Card({}, K('3 · Detectives de código', C.acc), T('Cada programa tiene UNA línea con error. Tóquenla.'),
          Grid(300, ...BUGS.map((b, i) => { const r = e.bug[i] || {};
            return D({ display: 'flex', flexDirection: 'column', gap: 4 }, K('Programa ' + (i + 1)), ...b.l.map((l, k) => h('button', { key: k, onClick: () => { if (r.ok) return; if (k === b.a) { S({ bug: Object.assign({}, e.bug, { [i]: { ok: true } }) }); beep(1320, 0.12); } else errMas({ bug: Object.assign({}, e.bug, { [i]: { mal: k } }) }); }, style: { textAlign: 'left', fontFamily: MO, fontSize: 13, padding: '5px 10px', background: r.ok && k === b.a ? C.okBg : r.mal === k ? C.redBg : C.code, color: (r.ok && k === b.a) || r.mal === k ? C.ink : '#e8f1f2', border: 'none', cursor: 'pointer', whiteSpace: 'pre' } }, (k + 1) + '  ' + l)),
              r.ok ? T('✓ ' + b.ex, { color: C.ok, fontSize: 14 }) : r.mal != null ? T('✗ Esa línea está bien. Sigan buscando.', { color: C.red, fontSize: 14 }) : null); }))));
    }
    function E7({ st, up, flash, cfg }) {
      const e = st.e7, L = pasosTk(st), cod = ((cfg.tinkercad || {})[st.par] || '').trim(), u = o => up('e7', o), n = L.filter((_, i) => e.pasos[i]).length;
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Card({ borderColor: C.blue, background: '#eef3fc' }, K('Su clase de Tinkercad · 9no ' + st.par, C.blue), cod ? Row({ gap: 18 }, D({ fontFamily: HD, fontSize: 'clamp(28px,3vw,44px)', letterSpacing: '.08em', color: C.blue }, cod), h('a', { href: 'https://www.tinkercad.com/joinclass/' + cod, target: '_blank', rel: 'noopener', style: { background: C.blue, color: '#fff', padding: '12px 18px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' } }, 'Entrar a la clase en Tinkercad ↗')) : T('Pidan al docente el código de clase de Tinkercad.', { fontWeight: 700 }),
          T('Entren con el apodo que les dio su docente. Trabajen en UNA computadora; el otro integrante revisa cada conexión con la guía.', { fontSize: 15 })),
        Card({}, Row({ justifyContent: 'space-between' }, H2('Guía paso a paso'), K(n + ' / ' + L.length + ' pasos', n === L.length ? C.ok : C.mute)), T('Marquen cada paso cuando lo terminen. Van en orden.', { fontSize: 15, color: C.mute }),
          ...L.map(([t, tip], i) => { const on = !!e.pasos[i], puede = i === 0 || !!e.pasos[i - 1];
            return h('label', { key: i, style: { display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, borderRadius: 10, border: '2px solid ' + (on ? C.ok : C.line), background: on ? C.okBg : puede ? '#fff' : C.sunk, opacity: puede ? 1 : 0.6, cursor: puede ? 'pointer' : 'not-allowed' } },
              h('input', { type: 'checkbox', checked: on, disabled: !puede, onChange: ev => { const p = Object.assign({}, e.pasos); if (ev.target.checked) p[i] = true; else for (let j = i; j < L.length; j++) delete p[j]; u({ pasos: p }); }, style: { width: 22, height: 22, marginTop: 2, flex: 'none' } }),
              D({ display: 'flex', flexDirection: 'column', gap: 4 }, D({ fontWeight: 700, fontSize: 16 }, (i + 1) + '. ' + t), D({ fontSize: 14, color: C.mute, lineHeight: 1.45 }, tip))); })),
        Card({}, F({ lab: 'Enlace de su circuito en Tinkercad', v: e.url, on: v => u({ url: v.trim() }), paste: true, ph: 'https://www.tinkercad.com/things/…' }),
          D({ display: 'flex', flexDirection: 'column', gap: 6 }, D({ fontWeight: 700 }, '¿Funcionó la simulación?'), Row({}, ...['Funcionó como esperábamos', 'Funcionó en parte', 'Todavía no funciona'].map(x => Chip(x, e.res === x, () => u({ res: x }), x[0] === 'F' && x.length > 20 ? C.ok : C.amb)))),
          F({ lab: 'Describan qué pasó al probar sus casos y qué tuvieron que corregir', ayuda: 'Ej.: «Al principio el LED no prendía porque estaba al revés; giramos el LED y…»', v: e.obs, on: v => u({ obs: v }), min: MIN(st, 20), rows: 3, flash })));
    }
    function E8({ st, up, flash, ctx }) {
      const e = st.e8, u = o => up('e8', o), html = reporte(st), V = VAL.e8(st);
      const imprimir = () => { const w = window.open('', '_blank'); if (!w) { flash('Permitan las ventanas emergentes para imprimir.'); return; } w.document.write(html); w.document.close(); setTimeout(() => { try { w.print(); } catch (x) {} }, 500); };
      return D({ display: 'flex', flexDirection: 'column', gap: 16 },
        Grid(420, Card({}, K('Conclusión y reflexión', C.acc),
            F({ lab: 'Conclusión: ¿su sistema resuelve el problema? ¿Qué funcionó y qué falta?', v: e.concl, on: v => u({ concl: v }), min: MIN(st, 40), rows: 4, flash }),
            F({ lab: '1. ¿Qué aprendieron sobre entradas y salidas?', v: e.m1, on: v => u({ m1: v }), min: MIN(st, 12), rows: 2, flash }),
            F({ lab: '2. ¿Qué fue lo más difícil y cómo lo resolvieron?', v: e.m2, on: v => u({ m2: v }), min: MIN(st, 12), rows: 2, flash }),
            F({ lab: '3. ¿Cómo mejorarían su sistema si lo construyeran de verdad?', v: e.m3, on: v => u({ m3: v }), min: MIN(st, 12), rows: 2, flash }),
            D({ display: 'flex', flexDirection: 'column', gap: 8 }, D({ fontWeight: 700 }, 'Autoevaluación (1 = todavía no · 4 = excelente)'), ...AUTO.map((a, i) => Row({ justifyContent: 'space-between' }, D({ fontSize: 15, flex: '1 1 200px' }, a), Row({ gap: 6 }, ...[1, 2, 3, 4].map(n => Chip(String(n), e.auto[i] === n, () => u({ auto: Object.assign({}, e.auto, { [i]: n }) }), C.blue))))))),
          Card({}, K('Vista previa del reporte', C.acc), h('iframe', { srcDoc: html, title: 'Reporte', style: { width: '100%', height: 560, border: '2px solid ' + C.line, borderRadius: 8, background: '#fff' } }), Btn('Imprimir o guardar en PDF', imprimir, { bg: C.blue }))),
        Card({ borderColor: st.entregado ? C.ok : C.acc }, H2(st.entregado ? '✓ Proyecto entregado el ' + st.entregado : 'Entregar el proyecto'), V.ok ? null : Lista(V.f, C.amb),
          Btn(st.entregado ? 'Volver a entregar con los cambios' : 'Entregar el proyecto al docente', () => ctx.entregar(html), { fs: 18, pad: '14px 22px', dis: !V.ok || ctx.faltaSeg > 0 }),
          ctx.faltaSeg > 0 ? T('Podrán entregar en ' + Math.ceil(ctx.faltaSeg / 60) + ' min: revisen su reporte con calma mientras tanto.', { fontSize: 14, color: C.mute }) : null));
    }
    const STAGE = { e1: E1, e2: E2, e3: E3, e4: E4, e5: E5, e6: E6, e7: E7, e8: E8 };
    const fmt = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
    function App({ st, ctx }) {
      if (!st) return h(Login, { ctx });
      const set = ctx.set, up = (k, o) => set({ [k]: Object.assign({}, st[k], o) });
      const idx = Math.max(0, ET.findIndex(x => x.k === st.cur)), E = ET[idx], abierta = i => i === 0 || !!st.done[ET[i - 1].k];
      const V = VAL[E.k](st), falta = Math.max(0, minSeg(st, E) - ((st.tiempo || {})[E.k] || 0)), R = PTS(st), N = nota(st);
      const ir = i => { if (!abierta(i)) { ctx.flash('Primero completen la etapa ' + i + '.'); return; } set({ cur: ET[i].k }); try { window.scrollTo(0, 0); } catch (x) {} };
      const completar = () => { set({ done: Object.assign({}, st.done, { [E.k]: true }), cur: ET[Math.min(ET.length - 1, idx + 1)].k }); ctx.flash('Etapa ' + (idx + 1) + ' completa ✓'); setTimeout(ctx.guardar, 300); try { window.scrollTo(0, 0); } catch (x) {} };
      const cx = Object.assign({}, ctx, { faltaSeg: falta });
      return D({ minHeight: '100vh', background: C.bg, color: C.ink, fontFamily: "'IBM Plex Sans',sans-serif" },
        D({ background: C.ink, color: '#fff', padding: '12px clamp(14px,2.5vw,32px)', display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' },
          D({ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, lineHeight: 1.35 }, D({ fontFamily: MO, fontSize: 12, letterSpacing: '.14em', color: '#8fe3d4' }, 'PROYECTO SMART CAMPUS · 9.º ' + st.par + (st.ad ? ' · CON APOYO' : '')), D({ fontFamily: HD, fontSize: 'clamp(18px,1.8vw,26px)' }, ideaNombre(st)), D({ fontSize: 14, color: '#c9d6d2' }, st.a1 + ' y ' + st.a2)),
          Row({ gap: 12 }, D({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }, D({ fontFamily: MO, fontSize: 11, color: '#8fe3d4', whiteSpace: 'nowrap' }, 'CÓDIGO PARA CONTINUAR'), D({ fontFamily: MO, fontSize: 18, fontWeight: 700, letterSpacing: '.08em', whiteSpace: 'nowrap' }, st.id)),
            D({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }, D({ fontFamily: MO, fontSize: 11, color: '#8fe3d4', whiteSpace: 'nowrap' }, 'NOTA'), D({ fontFamily: HD, fontSize: 22, whiteSpace: 'nowrap' }, N + ' / 10')),
            D({ fontFamily: MO, fontSize: 12, color: '#c9d6d2', maxWidth: 170 }, ctx.nubeTxt || ''), Btn('Salir', ctx.salir, { bg: 'transparent', bd: '#8fa39d', fs: 13, pad: '6px 12px' }))),
        D({ padding: '14px clamp(14px,2.5vw,32px)', display: 'flex', gap: 8, flexWrap: 'wrap', borderBottom: '2px solid ' + C.line, background: '#fff' },
          ...ET.map((x, i) => { const on = x.k === st.cur, ok = !!st.done[x.k], ab = abierta(i);
            return h('button', { key: x.k, onClick: () => ir(i), style: { display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', padding: '8px 12px', borderRadius: 10, cursor: ab ? 'pointer' : 'not-allowed', border: '2px solid ' + (on ? C.acc : ok ? C.ok : C.line), background: on ? C.acc : ok ? C.okBg : ab ? '#fff' : C.sunk, color: on ? '#fff' : C.ink, opacity: ab ? 1 : 0.55, minWidth: 0 } },
              h('span', { style: { fontFamily: MO, fontSize: 11, whiteSpace: 'nowrap' } }, 'CLASE ' + x.c + ' · ' + (i + 1)), h('span', { style: { fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' } }, (ok ? '✓ ' : ab ? '' : '🔒 ') + x.n)); })),
        D({ padding: 'clamp(14px,2.5vw,32px)', maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18, boxSizing: 'border-box' },
          D({ display: 'flex', flexDirection: 'column', gap: 6 }, K('Etapa ' + (idx + 1) + ' de 8 · Clase ' + E.c + ' · tiempo sugerido ' + E.min + ' min', C.acc), H1(E.n), T(E.d, { color: C.mute })),
          h(STAGE[E.k], { key: E.k, st, up, set, flash: ctx.flash, ctx: cx, cfg: ctx.cfg || {} }),
          E.k === 'e8' ? null : Card({ borderColor: st.done[E.k] ? C.ok : V.ok ? C.acc : C.amb },
            st.done[E.k] ? Row({ justifyContent: 'space-between' }, T('✓ Etapa completa (' + (R[E.k] != null ? R[E.k] : 10) + ' / 10). Pueden mejorarla: los cambios se guardan.', { color: C.ok, fontWeight: 700 }), Btn('Ir a la siguiente etapa →', () => ir(idx + 1)))
              : D({ display: 'flex', flexDirection: 'column', gap: 10 }, H2('Para completar esta etapa'), V.ok ? T('✓ Todo está completo.', { color: C.ok, fontWeight: 700 }) : Lista(V.f.slice(0, 8), C.amb),
                falta > 0 ? T('⏳ Podrán completar esta etapa en ' + fmt(falta) + '. Usen el tiempo para leer, probar y mejorar sus respuestas.', { fontSize: 15, color: C.mute }) : null,
                Btn('Completar la etapa ' + (idx + 1) + ' →', completar, { fs: 18, pad: '14px 22px', dis: !V.ok || falta > 0 })))));
    }
    make.c = { App };
    return make.c;
  }
  window.PROY9 = { make, nuevo, norm, resumen, reporte, nota, ET, VAL, gen, preds, IDEAS, COMP };
})();
