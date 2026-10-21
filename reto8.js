// Reto Tinkercad 8.º EGB · delay() y secuencias de LEDs · constructor de secuencias, simulador, guía de Tinkercad y entrega.
(function () {
  const C = { ink: '#0a1a3a', acc: '#14306b', gold: '#f6d43a', goldBg: '#fff8d6', bg: '#f3f4f8', card: '#ffffff', line: '#d6dbe8', mute: '#525d78', ok: '#1d7a44', okBg: '#e3f4ea', red: '#b3261e', redBg: '#fde9e6', blue: '#2456b8', amb: '#a86200', code: '#0a1430' };
  const HD = "'Archivo Black',sans-serif", MO = "'IBM Plex Mono',monospace";
  const PROY = {
    semaforo: { n: 'Semáforo de la entrada', ic: '🚦', d: 'Para que los estudiantes crucen seguros en la entrada del colegio.', comps: [['verde', 12, '#2bb34a', 'LED verde'], ['amarillo', 11, '#e0b400', 'LED amarillo'], ['rojo', 10, '#e5322d', 'LED rojo']], meta: 'Verde 5 s → amarillo 2 s → rojo 5 s, y vuelve a empezar. Solo una luz encendida a la vez.', exp: [[{ verde: 1 }, 5000], [{ amarillo: 1 }, 2000], [{ rojo: 1 }, 5000]], ayuda: [['on', 'verde'], ['w', 5000], ['off', 'verde']] },
    emergencia: { n: 'Luces de emergencia', ic: '🚨', d: 'Una baliza para avisar una evacuación o un simulacro.', comps: [['rojo', 13, '#e5322d', 'LED rojo'], ['azul', 12, '#2f6fd0', 'LED azul']], meta: 'Rojo y azul se alternan cada 300 ms, como una ambulancia. Nunca encendidos al mismo tiempo.', exp: [[{ rojo: 1 }, 300], [{ azul: 1 }, 300]], ayuda: [['on', 'rojo'], ['w', 300], ['off', 'rojo']] },
    timbre: { n: 'Timbre del recreo', ic: '🔔', d: 'Un timbre que avisa el inicio y el fin del recreo.', comps: [['zumbador', 8, '#a86200', 'Zumbador (piezo)'], ['luz', 13, '#e5322d', 'LED de aviso']], meta: '3 timbrazos: zumbador y LED encendidos 500 ms y apagados 500 ms, tres veces. Luego 5 s de silencio y se repite.', exp: [[{ zumbador: 1, luz: 1 }, 500], [{}, 500], [{ zumbador: 1, luz: 1 }, 500], [{}, 500], [{ zumbador: 1, luz: 1 }, 500], [{}, 5000, 5500]], ayuda: [['on', 'zumbador'], ['on', 'luz'], ['w', 500], ['off', 'zumbador'], ['off', 'luz'], ['w', 500]] }
  };
  const ETAPAS = [['proy', 'Elegir proyecto', 5], ['aprende', 'Aprende delay()', 15], ['prog', 'Programar la secuencia', 25], ['tink', 'Armar en Tinkercad', 25], ['fin', 'Entregar', 10]];
  const QUIZ = [['delay(2000) hace esperar al Arduino…', ['2 segundos', '2000 segundos', '0,2 segundos'], 0, 'delay usa milisegundos: 1000 ms = 1 s, así que 2000 ms = 2 s.'],
    ['El LED se enciende 500 ms y se apaga 500 ms. ¿Cuántas veces parpadea en 5 segundos?', ['5 veces', '10 veces', '2 veces'], 0, 'Cada parpadeo dura 500 + 500 = 1000 ms = 1 s. En 5 s caben 5 parpadeos.'],
    ['¿Qué pasa si quitamos todos los delay() del loop?', ['El LED cambia tan rápido que no se ve parpadear', 'El LED se apaga para siempre', 'El Arduino se daña'], 0, 'Sin esperas, el Arduino cambia el LED miles de veces por segundo: el ojo no lo nota.'],
    ['Para el semáforo, ¿dónde va pinMode(verde, OUTPUT)?', ['En setup(), porque se configura una sola vez', 'En loop(), porque se repite', 'No hace falta'], 0, 'Configurar un pin se hace una sola vez: en setup().']];
  const nuevo = () => ({ id: 'R8-' + Math.random().toString(36).slice(2, 7).toUpperCase(), a1: '', a2: '', par: '', pc: '', cur: 'proy', proy: '', pasos: [], qi: 0, qerr: 0, chk: 0, ayuda: false, okProg: false, link: '', img: '', funciona: false, enviado: '', done: {} });
  const nom = (P, k) => (P.comps.find(c => c[0] === k) || [k, 0, '', k])[3];
  function segmentos(P, pasos) {
    const keys = P.comps.map(c => c[0]), st = {}; keys.forEach(k => { st[k] = 0; }); const out = []; let tot = 0;
    for (let v = 0; v < 2; v++) { const seg = []; pasos.forEach(p => { if (p[0] === 'on') st[p[1]] = 1; else if (p[0] === 'off') st[p[1]] = 0; else if (p[0] === 'w') { const ms = Math.max(0, Number(p[1]) || 0); if (!ms) return; const key = keys.filter(k => st[k]).join('+'); if (seg.length && seg[seg.length - 1].k === key) seg[seg.length - 1].ms += ms; else seg.push({ k: key, ms }); if (v) tot += ms; } }); if (v) out.push(...seg); }
    if (out.length > 1 && out[0].k === out[out.length - 1].k) { out[0].ms += out[out.length - 1].ms; out.pop(); }
    return { segs: out, tot };
  }
  const expSegs = P => P.exp.map(([o, a, b]) => ({ k: P.comps.map(c => c[0]).filter(k => o[k]).join('+'), min: a, max: b || a }));
  const desc = (P, k) => k ? k.split('+').map(x => nom(P, x)).join(' y ') + ' encendido' + (k.includes('+') ? 's' : '') : 'todo apagado';
  const fmt = ms => ms >= 1000 ? (ms / 1000).toLocaleString('es') + ' s' : ms + ' ms';
  function validar(P, pasos) {
    if (!pasos.length) return { ok: false, msg: 'Todavía no tienen pasos. Agreguen instrucciones abajo.' };
    if (!pasos.some(p => p[0] === 'w' && Number(p[1]) > 0)) return { ok: false, msg: 'No hay ningún delay(): el programa cambiaría tan rápido que no se vería nada.' };
    const { segs } = segmentos(P, pasos), E = expSegs(P), okS = (s, e) => s.k === e.k && s.ms >= e.min && s.ms <= e.max;
    for (let r = 0; r < Math.max(1, segs.length); r++) { const R = segs.slice(r).concat(segs.slice(0, r)); if (R.length === E.length && R.every((s, i) => okS(s, E[i]))) return { ok: true, msg: '¡La secuencia es correcta! Así se comportará el circuito real.' }; }
    if (segs.length !== E.length) return { ok: false, msg: 'Su secuencia tiene ' + segs.length + ' momento(s) distinto(s) y se necesitan ' + E.length + '. Revisen la meta: ' + P.meta };
    const R = segs; for (let i = 0; i < E.length; i++) if (!okS(R[i], E[i])) return { ok: false, msg: 'Momento ' + (i + 1) + ': se esperaba «' + desc(P, E[i].k) + '» durante ' + fmt(E[i].min) + (E[i].max !== E[i].min ? ' a ' + fmt(E[i].max) : '') + ', pero su programa tiene «' + desc(P, R[i].k) + '» durante ' + fmt(R[i].ms) + '.' };
    return { ok: false, msg: 'Revisen el orden de los pasos.' };
  }
  function codigo(P, pasos, st) {
    const L = ['// Proyecto: ' + P.n + ' · 8vo ' + (st.par || ''), '// Integrantes: ' + (st.a1 || '') + ' y ' + (st.a2 || ''), ''];
    P.comps.forEach(([k, pin, , n]) => L.push('int ' + k + ' = ' + pin + ';' + ' '.repeat(Math.max(1, 10 - k.length - String(pin).length)) + '// ' + n));
    L.push('', 'void setup() {'); P.comps.forEach(([k, , , n]) => L.push('  pinMode(' + k + ', OUTPUT);   // configurar ' + n.toLowerCase())); L.push('}', '', 'void loop() {');
    pasos.forEach(p => { if (p[0] === 'w') L.push('  delay(' + (Number(p[1]) || 0) + ');' + ' '.repeat(Math.max(1, 18 - String(Number(p[1]) || 0).length)) + '// esperar ' + fmt(Number(p[1]) || 0));
      else if (p[1] === 'zumbador') L.push(p[0] === 'on' ? '  tone(zumbador, 880);         // sonar el timbre' : '  noTone(zumbador);            // silenciar el timbre');
      else L.push('  digitalWrite(' + p[1] + ', ' + (p[0] === 'on' ? 'HIGH' : 'LOW') + ');' + ' '.repeat(Math.max(1, 14 - p[1].length - (p[0] === 'on' ? 4 : 3))) + '// ' + (p[0] === 'on' ? 'encender ' : 'apagar ') + nom(P, p[1]).toLowerCase()); });
    L.push('}'); return L;
  }
  const lineaPaso = (P, p) => p[0] === 'w' ? 'Esperar ' + fmt(Number(p[1]) || 0) : (p[0] === 'on' ? 'Encender ' : 'Apagar ') + nom(P, p[1]);
  function nota(st) {
    const a = !st.done.aprende ? 0 : Math.max(1, 2 - st.qerr * 0.25), b = !st.okProg ? 0 : Math.max(2, 4 - st.chk * 0.5 - (st.ayuda ? 1 : 0)), c = /tinkercad\.com\//i.test(st.link) ? 2 : 0, d = st.img ? (st.funciona ? 2 : 1.5) : 0;
    return { a, b, c, d, t: Math.round((a + b + c + d) * 100) / 100 };
  }
  function make(React) {
    const h = React.createElement, { useState, useEffect, useRef } = React, D = (st, ...ch) => h('div', { style: st }, ...ch);
    const K = (s, col) => D({ fontFamily: MO, fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: col || C.mute, textTransform: 'uppercase' }, s);
    const T = (s, st) => D(Object.assign({ fontSize: 'clamp(16px,1.3vw,19px)', lineHeight: 1.5, textWrap: 'pretty' }, st || {}), s);
    const H1 = s => D({ fontFamily: HD, fontSize: 'clamp(26px,3vw,44px)', lineHeight: 1.05, color: C.ink }, s), H2 = s => D({ fontFamily: HD, fontSize: 'clamp(19px,1.7vw,25px)', color: C.ink }, s);
    const Card = (st, ...ch) => D(Object.assign({ background: C.card, border: '2px solid ' + C.line, borderRadius: 14, padding: 'clamp(14px,1.6vw,22px)', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }, st || {}), ...ch);
    const Row = (st, ...ch) => D(Object.assign({ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }, st || {}), ...ch);
    const Grid = (min, ...ch) => D({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,' + min + 'px),1fr))', gap: 16, alignItems: 'start' }, ...ch);
    const Btn = (s, on, o) => { o = o || {}; return h('button', { onClick: on, disabled: o.dis, style: { background: o.dis ? '#e3e6ee' : o.bg || C.acc, color: o.dis ? C.mute : o.c || '#fff', border: '2px solid ' + (o.dis ? C.line : o.bd || o.bg || C.acc), borderRadius: 10, fontFamily: HD, fontSize: o.fs || 16, padding: o.pad || '11px 18px', cursor: o.dis ? 'default' : 'pointer', whiteSpace: o.wrap ? 'normal' : 'nowrap', textAlign: 'left' } }, s); };
    const Chip = (s, on, clk, col) => h('button', { onClick: clk, style: { padding: '9px 14px', borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: 'pointer', background: on ? col || C.acc : '#fff', color: on ? '#fff' : C.ink, border: '2px solid ' + (on ? col || C.acc : C.line), whiteSpace: 'nowrap' } }, s);
    const Code = (lines, hl) => D({ background: C.code, color: '#e8f1f2', fontFamily: MO, fontSize: 'clamp(12px,1vw,15px)', lineHeight: 1.6, padding: '12px 16px', borderRadius: 10, overflowX: 'auto', whiteSpace: 'pre' }, ...lines.map((l, i) => { const p = l.split('//'); return D({ key: i, background: hl === i ? 'rgba(246,212,58,.22)' : 'transparent' }, p[0], p.length > 1 ? h('span', { style: { color: '#7fe0a0' } }, '//' + p.slice(1).join('//')) : null); }));
    function Luz({ col, on, n, zumb }) {
      return D({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 84 },
        zumb ? D({ width: 70, height: 70, borderRadius: 35, background: on ? '#2a2f36' : '#3a3f44', border: '4px solid ' + (on ? col : '#55606a'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: on ? '0 0 22px ' + col : 'none', transition: 'all .1s' }, on ? '🔊' : '🔈')
          : D({ width: 70, height: 70, borderRadius: 35, background: on ? col : '#3a3f44', boxShadow: on ? '0 0 30px ' + col + ', 0 0 6px #fff inset' : 'inset 0 4px 10px rgba(0,0,0,.4)', border: '4px solid #1c2226', transition: 'all .08s' }),
        D({ fontSize: 13, fontWeight: 700, color: C.ink, textAlign: 'center' }, n));
    }
    function useAudio() { const r = useRef(null); return on => { try { if (on && !r.current) { const A = window.__r8ac || (window.__r8ac = new (window.AudioContext || window.webkitAudioContext)()); const o = A.createOscillator(), g = A.createGain(); o.type = 'square'; o.frequency.value = 880; g.gain.value = 0.05; o.connect(g); g.connect(A.destination); o.start(); r.current = o; } else if (!on && r.current) { r.current.stop(); r.current = null; } } catch (e) {} }; }
    function Simulador({ P, pasos, st }) {
      const [run, setRun] = useState(false), [vel, setVel] = useState(1), [est, setEst] = useState({}), [ln, setLn] = useState(-1), [rest, setRest] = useState(0), snd = useAudio(), ref = useRef({});
      const code = codigo(P, pasos, st), base = code.indexOf('void loop() {') + 1;
      useEffect(() => { if (!run) { snd(false); return; } let i = 0, alive = true, s = {}; const L = pasos.length; let guard = 0;
        const step = () => { if (!alive) return; if (!L) return; const p = pasos[i % L]; setLn(base + (i % L));
          if (p[0] === 'w') { const ms = Math.max(0, Number(p[1]) || 0); setRest(ms); i++; ref.current.t = setTimeout(step, Math.max(16, ms / vel)); guard = 0; return; }
          s = Object.assign({}, s, { [p[1]]: p[0] === 'on' ? 1 : 0 }); setEst(s); if (p[1] === 'zumbador') snd(p[0] === 'on'); i++; guard++;
          if (guard > L) { setRest(0); ref.current.t = setTimeout(step, 60); guard = 0; return; } step(); };
        step(); return () => { alive = false; clearTimeout(ref.current.t); snd(false); }; }, [run, vel, JSON.stringify(pasos)]);
      useEffect(() => () => snd(false), []);
      return Card({ gap: 14, borderColor: run ? C.gold : C.line }, Row({ justifyContent: 'space-between' }, K('Simulador · así se verá su circuito', C.acc), Row({ gap: 6 }, ...[[1, 'Tiempo real'], [4, 'Rápido ×4']].map(([v, t]) => Chip(t, vel === v, () => setVel(v), C.blue)))),
        D({ background: '#1c2226', borderRadius: 14, padding: 18, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }, ...P.comps.map(([k, , col, n]) => h(Luz, { key: k, col, on: !!est[k], n: D({ color: '#fff' }, n), zumb: k === 'zumbador' }))),
        Row({}, Btn(run ? '■ Detener' : '▶ Probar la secuencia', () => { setRun(!run); if (run) { setEst({}); setLn(-1); } }, { bg: run ? C.red : C.ok, dis: !pasos.length }), run && rest ? D({ fontFamily: MO, fontWeight: 700, color: C.amb }, 'delay(' + rest + ')') : null),
        Code(code, run ? ln : -1));
    }
    function Proy({ st, set }) {
      return D({ display: 'flex', flexDirection: 'column', gap: 16 }, T('Elijan UNO. Los tres usan lo mismo: encender, apagar y esperar con delay().'),
        Grid(260, ...Object.keys(PROY).map(k => { const P = PROY[k], on = st.proy === k; return h('button', { key: k, onClick: () => set({ proy: k, pasos: st.proy === k ? st.pasos : [], okProg: st.proy === k && st.okProg, chk: st.proy === k ? st.chk : 0, ayuda: st.proy === k && st.ayuda }), style: { textAlign: 'left', background: on ? C.goldBg : '#fff', border: '3px solid ' + (on ? C.gold : C.line), borderRadius: 14, padding: 18, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, color: C.ink } },
          D({ fontSize: 44, lineHeight: 1 }, P.ic), D({ fontFamily: HD, fontSize: 22 }, P.n), D({ fontSize: 15, lineHeight: 1.45 }, P.d), D({ fontSize: 14, lineHeight: 1.45, color: C.mute, borderTop: '2px solid ' + C.line, paddingTop: 8 }, h('b', null, 'Meta: '), P.meta),
          D({ display: 'flex', gap: 6, flexWrap: 'wrap' }, ...P.comps.map(c => D({ key: c[0], fontFamily: MO, fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: '2px solid ' + c[2], color: C.ink }, c[3] + ' · pin ' + c[1]))), on ? K('✓ Elegido', C.ok) : null); })));
    }
    function Aprende({ st, set }) {
      const [on, setOn] = useState(500), [off, setOff] = useState(500), [l, setL] = useState(false), [sel, setSel] = useState(null);
      useEffect(() => { let s = true, t; const go = () => { setL(s); t = setTimeout(() => { s = !s; go(); }, s ? on : off); }; go(); return () => clearTimeout(t); }, [on, off]);
      const q = QUIZ[Math.min(st.qi, QUIZ.length - 1)], fin = st.qi >= QUIZ.length;
      return Grid(380, Card({ gap: 14 }, K('Aprende · 1 minuto', C.blue), H2('delay() = el reloj del programa'), T(['El Arduino hace las instrucciones una tras otra, muy rápido. ', h('b', null, 'delay(ms)'), ' lo hace esperar. El tiempo va en ', h('b', null, 'milisegundos'), ': 1000 ms = 1 segundo.']),
          Code(['void loop() {', '  digitalWrite(13, HIGH); // encender', '  delay(' + on + ');            // esperar', '  digitalWrite(13, LOW);  // apagar', '  delay(' + off + ');            // esperar', '}']),
          D({ display: 'flex', flexDirection: 'column', gap: 6 }, D({ fontWeight: 700 }, 'Encendido: ' + on + ' ms'), h('input', { type: 'range', min: 100, max: 2000, step: 100, value: on, onChange: e => setOn(+e.target.value), style: { accentColor: C.acc } }), D({ fontWeight: 700 }, 'Apagado: ' + off + ' ms'), h('input', { type: 'range', min: 100, max: 2000, step: 100, value: off, onChange: e => setOff(+e.target.value), style: { accentColor: C.acc } })),
          Row({ justifyContent: 'center', gap: 20 }, h(Luz, { col: '#e5322d', on: l, n: 'pin 13' }), D({ fontFamily: HD, fontSize: 22, color: C.amb }, (Math.round(10000 / (on + off)) / 10).toLocaleString('es') + ' parpadeos por segundo'))),
        Card({ gap: 14, borderColor: fin ? C.ok : C.gold }, K('Comprueben · ' + Math.min(st.qi + 1, QUIZ.length) + ' de ' + QUIZ.length, C.acc), fin ? D({ display: 'flex', flexDirection: 'column', gap: 10 }, H2('¡Listo! Ya entienden delay().'), T('Errores: ' + st.qerr + '. Pasen a programar su secuencia.', { color: C.ok, fontWeight: 700 })) :
          D({ display: 'flex', flexDirection: 'column', gap: 12 }, H2(q[0]), ...q[1].map((o, i) => h('button', { key: i, onClick: () => { setSel(i); if (i === q[2]) { setTimeout(() => { setSel(null); const nq = st.qi + 1; set({ qi: nq, done: nq >= QUIZ.length ? Object.assign({}, st.done, { aprende: true }) : st.done }); }, 1400); } else set({ qerr: st.qerr + 1 }); }, style: { textAlign: 'left', padding: '12px 14px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', color: C.ink, background: sel === i ? (i === q[2] ? C.okBg : C.redBg) : '#fff', border: '2px solid ' + (sel === i ? (i === q[2] ? C.ok : C.red) : C.line) } }, o)),
            sel != null ? T(sel === q[2] ? '✓ ' + q[3] : '✗ No es esa. Piensen otra vez: ' + (q[3].split(':')[0]) + '.', { color: sel === q[2] ? C.ok : C.red, fontWeight: 600 }) : null)));
    }
    function Prog({ st, set }) {
      const P = PROY[st.proy], [comp, setComp] = useState(P.comps[0][0]), [ms, setMs] = useState('1000'), [fb, setFb] = useState(null), pasos = st.pasos;
      const put = x => { set({ pasos: x, okProg: false }); setFb(null); };
      const mv = (i, d) => { const j = i + d; if (j < 0 || j >= pasos.length) return; const x = pasos.slice(); [x[i], x[j]] = [x[j], x[i]]; put(x); };
      return D({ display: 'flex', flexDirection: 'column', gap: 16 }, Card({ borderColor: C.gold, background: C.goldBg, gap: 6 }, K('Meta de su proyecto · ' + P.n, C.amb), T(P.meta, { fontWeight: 700 })),
        Grid(400, Card({ gap: 12 }, H2('Su loop() paso a paso'), T('Agreguen instrucciones en orden. Al llegar al final, el Arduino vuelve al primer paso.', { color: C.mute, fontSize: 15 }),
            pasos.length ? D({ display: 'flex', flexDirection: 'column', gap: 6 }, ...pasos.map((p, i) => D({ key: i, display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', borderRadius: 10, border: '2px solid ' + (p[0] === 'w' ? C.amb : C.line), background: p[0] === 'w' ? '#fff4e0' : '#fff' },
              D({ fontFamily: MO, fontWeight: 700, color: C.mute, width: 24 }, String(i + 1)), D({ flex: 1, fontWeight: 700, fontSize: 16 }, (p[0] === 'w' ? '⏱ ' : p[0] === 'on' ? '💡 ' : '⚫ ') + lineaPaso(P, p)),
              ...[['↑', () => mv(i, -1)], ['↓', () => mv(i, 1)], ['✕', () => put(pasos.filter((_, k) => k !== i))]].map(([t, f]) => h('button', { key: t, onClick: f, style: { width: 34, height: 34, borderRadius: 8, border: '2px solid ' + C.line, background: '#fff', cursor: 'pointer', fontWeight: 700, color: t === '✕' ? C.red : C.ink } }, t))))) : T('Todavía no hay pasos.', { color: C.mute }),
            D({ borderTop: '2px solid ' + C.line, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }, K('Agregar instrucción'), Row({ gap: 6 }, ...P.comps.map(c => Chip(c[3], comp === c[0], () => setComp(c[0]), c[2]))),
              Row({}, Btn('💡 Encender', () => put(pasos.concat([['on', comp]])), { bg: C.ok }), Btn('⚫ Apagar', () => put(pasos.concat([['off', comp]])), { bg: '#3a3f44' })),
              Row({}, h('input', { type: 'number', min: 50, step: 50, value: ms, onChange: e => setMs(e.target.value), style: { width: 120, fontFamily: MO, fontSize: 18, padding: '9px 10px', border: '2px solid ' + C.amb, borderRadius: 8 } }), D({ fontFamily: MO, fontWeight: 700 }, 'ms'), Btn('⏱ Esperar (delay)', () => { const v = Math.round(Number(ms)); if (v > 0 && v <= 60000) put(pasos.concat([['w', v]])); }, { bg: C.amb }))),
            Row({}, Btn('✓ Comprobar la secuencia', () => { const r = validar(P, pasos); setFb(r); if (r.ok) set({ okProg: true, done: Object.assign({}, st.done, { prog: true }) }); else set({ chk: st.chk + 1 }); }, { bg: C.acc, dis: !pasos.length }),
              !st.ayuda && !st.okProg ? Btn('Darme los primeros pasos (−1 punto)', () => set({ ayuda: true, pasos: P.ayuda.concat(st.pasos) }), { bg: '#fff', c: C.amb, bd: C.amb, fs: 14 }) : null,
              pasos.length ? Btn('Borrar todo', () => put([]), { bg: '#fff', c: C.red, bd: C.red, fs: 14 }) : null),
            fb ? D({ padding: '12px 14px', borderRadius: 10, background: fb.ok ? C.okBg : C.redBg, color: fb.ok ? C.ok : C.red, fontWeight: 700, fontSize: 16, lineHeight: 1.45 }, (fb.ok ? '✓ ' : '✗ ') + fb.msg) : st.okProg ? T('✓ Secuencia correcta.', { color: C.ok, fontWeight: 700 }) : null,
            st.chk ? K('Comprobaciones fallidas: ' + st.chk, C.mute) : null),
          h(Simulador, { P, pasos, st })));
    }
    function Tink({ st, set, flash }) {
      const P = PROY[st.proy], code = codigo(P, st.pasos, st).join('\n'), [cp, setCp] = useState(false);
      const copiar = () => { const ok = () => { setCp(true); setTimeout(() => setCp(false), 2500); }; try { navigator.clipboard.writeText(code).then(ok, () => fallback()); } catch (e) { fallback(); } function fallback() { const t = document.createElement('textarea'); t.value = code; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok(); } catch (e) {} t.remove(); } };
      const subir = e => { const f = e.target.files && e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => { const im = new Image(); im.onload = () => { const s = Math.min(1, 1280 / Math.max(im.width, im.height)), cv = document.createElement('canvas'); cv.width = Math.round(im.width * s); cv.height = Math.round(im.height * s); cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); set({ img: cv.toDataURL('image/jpeg', 0.75) }); }; im.onerror = () => flash('Ese archivo no es una imagen.'); im.src = rd.result; }; rd.readAsDataURL(f); };
      const linkOk = /tinkercad\.com\//i.test(st.link);
      const PASOS = ['Entren a tinkercad.com con su cuenta → «Circuitos» → «Crear nuevo circuito».', 'Arrastren un «Arduino Uno R3» y una placa de pruebas pequeña.', 'Coloquen los componentes y conéctenlos como dice la tabla (cable negro a GND).', 'Pulsen «Código» → elijan «Texto» → borren todo y peguen el código de esta página.', 'Pulsen «Iniciar simulación»: debe comportarse igual que el simulador de esta página.', 'Tomen una captura con la simulación funcionando (tecla Impr Pant o Windows + Shift + S).', 'Pulsen «Compartir» (o «Enviar a») y copien el enlace del diseño.'];
      return D({ display: 'flex', flexDirection: 'column', gap: 16 }, Grid(400,
        Card({ gap: 10 }, H2('Paso a paso en Tinkercad'), ...PASOS.map((t, i) => D({ key: i, display: 'flex', gap: 12, alignItems: 'flex-start' }, D({ flex: 'none', width: 30, height: 30, borderRadius: 15, background: C.gold, color: C.ink, fontFamily: HD, display: 'flex', alignItems: 'center', justifyContent: 'center' }, String(i + 1)), T(t, { fontSize: 16 })))),
        Card({ gap: 10 }, H2('Conexiones'), ...P.comps.map(([k, pin, col, n]) => D({ key: k, display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', borderRadius: 10, border: '3px solid ' + col }, D({ fontFamily: MO, fontWeight: 700, fontSize: 18, minWidth: 56 }, 'Pin ' + pin), D({ fontSize: 15, lineHeight: 1.4 }, k === 'zumbador' ? 'Pin ' + pin + ' → patita + del zumbador. Patita − → GND.' : 'Pin ' + pin + ' → resistencia de 220 Ω → patita LARGA del ' + n.toLowerCase() + '. Patita corta → GND.'))),
          T('Truco: la patita larga del LED (ánodo) va hacia el pin; si el LED no enciende, gírenlo.', { fontSize: 15, color: C.mute }))),
        Card({ gap: 10 }, Row({ justifyContent: 'space-between' }, H2('Su código (cópienlo en Tinkercad)'), Btn(cp ? '✓ Copiado' : '📋 Copiar el código', copiar, { bg: cp ? C.ok : C.blue })), Code(code.split('\n'))),
        Grid(380, Card({ gap: 10, borderColor: linkOk ? C.ok : C.line }, H2('Enlace de su circuito'), h('input', { value: st.link, onChange: e => set({ link: e.target.value.trim() }), placeholder: 'https://www.tinkercad.com/things/…', style: { fontSize: 16, padding: '11px 12px', border: '2px solid ' + (linkOk ? C.ok : C.line), borderRadius: 8, fontFamily: MO } }), st.link && !linkOk ? T('Ese no parece un enlace de Tinkercad. Debe contener «tinkercad.com/».', { color: C.red, fontSize: 15, fontWeight: 600 }) : null),
          Card({ gap: 10, borderColor: st.img ? C.ok : C.line }, H2('Captura funcionando'), h('input', { type: 'file', accept: 'image/*', onChange: subir, style: { fontSize: 15 } }), st.img ? h('img', { src: st.img, alt: 'Captura', style: { width: '100%', borderRadius: 8, border: '2px solid ' + C.line } }) : T('Suban una imagen de la simulación encendida.', { color: C.mute, fontSize: 15 }),
            h('label', { style: { display: 'flex', gap: 10, alignItems: 'center', fontWeight: 700, cursor: 'pointer' } }, h('input', { type: 'checkbox', checked: !!st.funciona, onChange: e => set({ funciona: e.target.checked }), style: { width: 20, height: 20 } }), 'En Tinkercad funciona igual que en el simulador'))));
    }
    function Fin({ st, enviar, nube }) {
      const N = nota(st), P = PROY[st.proy], fil = [['Aprende delay()', N.a, 2, st.done.aprende ? st.qerr + ' errores en las preguntas' : 'Pendiente'], ['Secuencia correcta', N.b, 4, st.okProg ? st.chk + ' comprobaciones fallidas' + (st.ayuda ? ' · usaron ayuda' : '') : 'Pendiente'], ['Enlace de Tinkercad', N.c, 2, /tinkercad\.com\//i.test(st.link) ? 'Enlace válido' : 'Falta o no es válido'], ['Captura funcionando', N.d, 2, st.img ? (st.funciona ? 'Con captura y confirmado' : 'Falta confirmar que funciona') : 'Falta la captura']];
      const listo = st.okProg && st.done.aprende && N.c && st.img;
      return Grid(380, Card({ gap: 10 }, H2('Su nota'), ...fil.map(([n, v, m, d]) => D({ key: n, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', borderTop: '2px solid ' + C.line, paddingTop: 8 }, D({ display: 'flex', flexDirection: 'column', gap: 2 }, D({ fontWeight: 700 }, n), D({ fontSize: 14, color: C.mute }, d)), D({ fontFamily: HD, fontSize: 20, whiteSpace: 'nowrap', color: v >= m ? C.ok : v ? C.amb : C.red }, (Math.round(v * 100) / 100) + ' / ' + m))),
          D({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.ink, color: '#fff', borderRadius: 10, padding: '12px 16px' }, D({ fontFamily: HD, fontSize: 20 }, 'TOTAL'), D({ fontFamily: HD, fontSize: 34, color: C.gold }, N.t + ' / 10'))),
        Card({ gap: 12, borderColor: st.enviado ? C.ok : C.gold }, H2(st.enviado ? '✓ Entregado' : 'Entregar al docente'), T(P ? 'Proyecto: ' + P.n + ' · ' + st.a1 + ' y ' + st.a2 + ' · PC ' + st.pc : ''), listo ? null : T('Completen lo pendiente para entregar. Pueden entregar varias veces: cuenta la última.', { color: C.amb, fontWeight: 600 }),
          Btn(st.enviado ? 'Volver a entregar (' + N.t + ' / 10)' : 'Entregar (' + N.t + ' / 10)', enviar, { bg: C.ok, dis: !listo, fs: 18, pad: '14px 22px' }), nube ? T(nube, { fontSize: 15, color: C.mute }) : null, st.enviado ? T('Entregado el ' + st.enviado + '. Su código es ' + st.id + '.', { color: C.ok, fontWeight: 700 }) : null));
    }
    function Login({ ctx }) {
      const [f, setF] = useState({ a1: '', a2: '', par: '', pc: '' }), [msg, setMsg] = useState(''), L = ctx.local, okN = s => String(s || '').trim().split(/\s+/).length >= 2;
      const inp = (k, ph, w) => h('input', { value: f[k], onChange: e => setF(Object.assign({}, f, { [k]: e.target.value })), placeholder: ph, type: k === 'pc' ? 'number' : 'text', style: { fontSize: 17, padding: '11px 12px', border: '2px solid ' + C.line, borderRadius: 8, width: w || '100%', boxSizing: 'border-box' } });
      const ir = () => { if (!okN(f.a1) || !okN(f.a2)) return setMsg('Escriban nombre y apellido de los dos integrantes.'); if (!f.par) return setMsg('Elijan su paralelo.'); const n = parseInt(f.pc, 10); if (!(n >= 1 && n <= 40)) return setMsg('Escriban el número de su computadora.'); ctx.iniciar(Object.assign({}, f, { pc: String(n) })); };
      return D({ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, boxSizing: 'border-box', background: C.bg },
        D({ width: '100%', maxWidth: 980, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 20 },
          D({ display: 'flex', flexDirection: 'column', gap: 14, background: C.ink, color: '#fff', borderRadius: 16, padding: 'clamp(20px,3vw,36px)', borderBottom: '8px solid ' + C.gold },
            Row({ gap: 14 }, h('img', { src: 'escudo-providencia.png', alt: 'Escudo', style: { height: 84 } }), D({ display: 'flex', flexDirection: 'column', gap: 4 }, K('Unidad Educativa Particular «La Providencia»', C.gold), K('Robótica · 8.º EGB', '#c9d2e8'))),
            D({ fontFamily: HD, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.02 }, 'Reto Tinkercad: luces con tiempo'), T('En parejas van a programar una secuencia de luces con delay(), probarla aquí y armarla de verdad en Tinkercad.', { color: '#e3e8f5' }),
            D({ display: 'flex', gap: 8, flexWrap: 'wrap' }, ...Object.values(PROY).map(P => D({ key: P.n, border: '2px solid ' + C.gold, borderRadius: 10, padding: '8px 12px', fontWeight: 700, fontSize: 15 }, P.ic + ' ' + P.n))),
            D({ display: 'flex', flexDirection: 'column', gap: 6 }, ...ETAPAS.map(([k, n, m], i) => D({ key: k, fontSize: 15, color: '#c9d2e8' }, (i + 1) + '. ' + n + ' · ' + m + ' min')))),
          Card({ gap: 12 }, H2('Empezar'), inp('a1', 'Integrante 1: nombre y apellido'), inp('a2', 'Integrante 2: nombre y apellido'),
            Row({}, ...['A', 'B', 'C', 'D'].map(x => Chip('8vo ' + x, f.par === x, () => setF(Object.assign({}, f, { par: x }))))),
            Row({}, D({ fontWeight: 700 }, 'Computadora N.º'), inp('pc', 'ej. 7', 110)), Btn('Comenzar el reto', ir, { fs: 18, pad: '14px 22px' }), msg ? T(msg, { color: C.red, fontWeight: 700, fontSize: 15 }) : null,
            L && L.a1 ? D({ borderTop: '2px solid ' + C.line, paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }, H2('Continuar'), Btn('Seguir: ' + L.a1 + ' y ' + L.a2, ctx.seguir, { bg: C.blue, wrap: true })) : null)));
    }
    function App({ st, ctx }) {
      if (!st) return h(Login, { ctx });
      const set = ctx.set, idx = ETAPAS.findIndex(e => e[0] === st.cur), E = ETAPAS[idx];
      const abierta = k => k === 'proy' || (st.proy && (k === 'aprende' || (st.done.aprende && (k === 'prog' || (st.okProg && (k === 'tink' || k === 'fin'))))));
      const okE = { proy: !!st.proy, aprende: !!st.done.aprende, prog: !!st.okProg, tink: /tinkercad\.com\//i.test(st.link) && !!st.img, fin: !!st.enviado };
      const S = { proy: Proy, aprende: Aprende, prog: Prog, tink: Tink, fin: Fin }[st.cur], nx = ETAPAS[idx + 1];
      return D({ minHeight: '100vh', background: C.bg },
        D({ background: C.ink, color: '#fff', borderBottom: '5px solid ' + C.gold, padding: '10px clamp(14px,3vw,32px)', display: 'flex', gap: 14, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' },
          Row({ gap: 12 }, h('img', { src: 'escudo-providencia.png', alt: 'Escudo', style: { height: 44 } }), D({ display: 'flex', flexDirection: 'column', gap: 2 }, D({ fontFamily: HD, fontSize: 18 }, 'Reto Tinkercad · 8vo ' + st.par), D({ fontSize: 14, color: '#c9d2e8' }, st.a1 + ' y ' + st.a2 + ' · PC ' + st.pc + (st.proy ? ' · ' + PROY[st.proy].n : '')))),
          Row({ gap: 8 }, D({ fontFamily: HD, fontSize: 20, color: C.gold, whiteSpace: 'nowrap' }, nota(st).t + ' / 10'), Btn('Salir', ctx.salir, { bg: 'transparent', bd: '#c9d2e8', fs: 14, pad: '7px 12px' }))),
        D({ display: 'flex', gap: 6, padding: '10px clamp(14px,3vw,32px)', background: '#fff', borderBottom: '2px solid ' + C.line, overflowX: 'auto' }, ...ETAPAS.map(([k, n, m], i) => { const ab = abierta(k), cur = k === st.cur;
          return h('button', { key: k, disabled: !ab, onClick: () => set({ cur: k }), style: { flex: 'none', display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 14px', borderRadius: 10, cursor: ab ? 'pointer' : 'default', textAlign: 'left', border: '2px solid ' + (cur ? C.acc : okE[k] ? C.ok : C.line), background: cur ? C.acc : okE[k] ? C.okBg : '#fff', color: cur ? '#fff' : ab ? C.ink : '#a3abbf' } },
            h('span', { style: { fontFamily: MO, fontSize: 11, whiteSpace: 'nowrap' } }, (okE[k] ? '✓ ' : ab ? '' : '🔒 ') + (i + 1) + ' · ' + m + ' min'), h('span', { style: { fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' } }, n)); })),
        D({ padding: 'clamp(14px,2.5vw,32px)', maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18, boxSizing: 'border-box' },
          D({ display: 'flex', flexDirection: 'column', gap: 6 }, K('Etapa ' + (idx + 1) + ' de ' + ETAPAS.length + ' · tiempo sugerido ' + E[2] + ' min', C.acc), H1(E[1])),
          h(S, { key: st.cur + st.proy, st, set, flash: ctx.flash, enviar: ctx.enviar, nube: ctx.nube }),
          nx && st.cur !== 'fin' ? Row({ justifyContent: 'flex-end' }, okE[st.cur] ? Btn('Siguiente: ' + nx[1] + ' →', () => set({ cur: nx[0] }), { bg: C.ok, fs: 17 }) : T(st.cur === 'proy' ? 'Elijan un proyecto para continuar.' : st.cur === 'aprende' ? 'Respondan bien las preguntas para continuar.' : st.cur === 'prog' ? 'Comprueben una secuencia correcta para continuar.' : 'Peguen el enlace y suban la captura para continuar.', { color: C.amb, fontWeight: 700, fontSize: 15 })) : null));
    }
    return { App };
  }
  window.RETO8 = { make, nuevo, nota, validar, segmentos, codigo, PROY };
})();
