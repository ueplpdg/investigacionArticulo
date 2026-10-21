// Modo explicación (tomar el control) para cualquier página: <script src="./control.js" data-curso="8"></script>
(function () {
  const sc = document.currentScript, CURSO = sc && sc.dataset ? sc.dataset.curso : null;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, x => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[x]));
  const url = () => { const u = String((window.ARTICULO_CONFIG || {}).sheetsUrl || '').trim(); return /^https:\/\/script\.google(usercontent)?\.com\//.test(u) ? u : ''; };
  function html(curso, i, docente) {
    const E = (window.EJEMPLOS || {})[curso]; if (!E) return '<div style="padding:40px;font-size:22px">No hay ejemplo para este curso.</div>';
    const n = Math.max(0, Math.min(E.sl.length - 1, i || 0)), S = E.sl[n];
    const code = S.code ? '<div style="background:#0a1430;color:#e8f1f2;font-family:\'IBM Plex Mono\',monospace;font-size:clamp(13px,1.2vw,18px);line-height:1.6;padding:16px 20px;border-radius:12px;overflow:auto;white-space:pre">' + S.code.map(l => { const p = l.split('//'); return esc(p[0]) + (p.length > 1 ? '<span style="color:#7fe0a0">//' + esc(p.slice(1).join('//')) + '</span>' : ''); }).join('\n') + '</div>' : '';
    const tabla = S.tabla ? '<table style="width:100%;border-collapse:collapse;font-size:clamp(15px,1.3vw,20px)">' + S.tabla.map(r => '<tr><td style="border:2px solid #d6dbe8;padding:10px 14px;font-weight:700;color:#14306b;white-space:nowrap;background:#f3f4f8">' + esc(r[0]) + '</td><td style="border:2px solid #d6dbe8;padding:10px 14px">' + esc(r[1]) + '</td></tr>').join('') + '</table>' : '';
    const der = code || tabla ? '<div style="background:#fff;border:2px solid #d6dbe8;border-radius:16px;padding:clamp(14px,2vw,24px);display:flex;flex-direction:column;gap:14px;min-width:0">' + code + tabla + '</div>' : '';
    return '<div style="min-height:100%;display:flex;flex-direction:column;background:#f3f4f8;color:#0a1a3a;font-family:\'IBM Plex Sans\',sans-serif">'
      + '<div style="background:#0a1a3a;color:#fff;border-bottom:5px solid #f6d43a;padding:12px clamp(14px,3vw,36px);display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div style="display:flex;gap:14px;align-items:center"><img src="escudo-providencia.png" alt="" style="height:50px"><div><div style="font-family:\'IBM Plex Mono\',monospace;font-size:12px;letter-spacing:.14em;color:#f6d43a;font-weight:700">' + (docente ? 'MODO EXPLICACIÓN · USTED CONTROLA LAS PANTALLAS' : 'EL DOCENTE ESTÁ EXPLICANDO · MIREN EL PROYECTOR') + '</div><div style="font-family:\'Archivo Black\',sans-serif;font-size:clamp(18px,2vw,26px)">' + esc(E.titulo) + '</div></div></div><div style="font-family:\'IBM Plex Mono\',monospace;font-size:15px;white-space:nowrap">' + esc(E.curso) + ' · ' + (n + 1) + ' / ' + E.sl.length + '</div></div>'
      + '<div style="flex:1;padding:clamp(16px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(18px,3vw,40px);align-items:center;max-width:1400px;width:100%;box-sizing:border-box;margin:0 auto">'
      + '<div style="display:flex;flex-direction:column;gap:16px"><div style="font-family:\'IBM Plex Mono\',monospace;font-size:14px;letter-spacing:.12em;color:#14306b;font-weight:700">' + esc(S.k.toUpperCase()) + '</div><div style="font-family:\'Archivo Black\',sans-serif;font-size:clamp(28px,3.4vw,52px);line-height:1.05">' + esc(S.t) + '</div>'
      + S.p.map((x, k) => '<div style="display:flex;gap:12px;font-size:clamp(17px,1.5vw,23px);line-height:1.45"><div style="flex:none;width:30px;height:30px;border-radius:15px;background:#f6d43a;font-family:\'Archivo Black\',sans-serif;display:flex;align-items:center;justify-content:center;font-size:15px">' + (k + 1) + '</div><div>' + esc(x) + '</div></div>').join('') + '</div>' + der + '</div></div>';
  }
  window.CONTROL = { html, total: c => (((window.EJEMPLOS || {})[c] || {}).sl || []).length, url };
  if (!CURSO) return;
  let box = null, last = '', busy = false;
  async function tick() {
    const u = url(); if (!u || busy) return; busy = true;
    try { const r = await fetch(u + '?clase=' + encodeURIComponent(CURSO) + '&t=' + Date.now()); const x = await r.json(); const k = JSON.stringify(x);
      if (k !== last) { last = k;
        if (x.on) { if (!box) { box = document.createElement('div'); box.style.cssText = 'position:fixed;inset:0;z-index:9999;overflow:auto;background:#f3f4f8'; document.body.appendChild(box); } box.innerHTML = html(CURSO, x.i, false); }
        else if (box) { box.remove(); box = null; } } } catch (e) {}
    busy = false;
  }
  const go = () => { tick(); setInterval(tick, 3000); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
