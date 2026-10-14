var CARPETA = 'Investigacion 3ro BGU';
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
}