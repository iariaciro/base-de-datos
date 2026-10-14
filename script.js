
// Ejemplos con pestañas
var EX=[
{t:"Autos y personas (1-2)",h:"<p><b>Enunciado:</b> autos (color, patente, nº chasis, nº motor) pertenecen a una marca (nombre, abreviatura). Las personas (nombre, domicilio, dni, teléfonos) son propietarias de uno o más autos y cada auto de una o más personas, desde una fecha.</p><ul><li><b>AUTO:</b> patente•, nro_chasis•, nro_motor• (varios identificadores), color.</li><li><b>MARCA:</b> nombre•, abreviatura.</li><li><b>PERSONA:</b> dni•, nombre, domicilio, teléfonos (0,N).</li><li><b>pertenece:</b> AUTO (1,1) – MARCA (0,N).</li><li><b>es_propietario:</b> PERSONA (0,N) – AUTO (1,N), atributo <b>fecha_desde</b> (depende de la pareja persona-auto, por eso va en la relación).</li></ul>"},
{t:"Aviones (3-4)",h:"<p><b>Enunciado:</b> líneas aéreas con aviones (fecha de compra) y la historia de servicios técnicos de cada avión.</p><ul><li><b>LÍNEA_AÉREA:</b> nombre•, fecha_fundación, país_origen, cant_empleados.</li><li><b>AVIÓN:</b> nro_serie•, marca, modelo, asientos, fecha_fabricación (marca y modelo podrían ser entidades: decisión atributo vs. entidad).</li><li><b>SERVICIO_TÉCNICO:</b> empresa, fecha, precio; pertenece a un solo avión (identificador externo: avión + fecha).</li><li><b>posee:</b> LÍNEA (0,N) – AVIÓN (1,1), atributo fecha_compra.</li><li><b>tiene_servicio:</b> AVIÓN (0,N) – SERVICIO (1,1).</li></ul>"},
{t:"Consorcio (5)",h:"<p><b>Enunciado:</b> departamentos con dueño actual y anteriores, y alquileres, con historia en ambos casos.</p><ul><li><b>DEPARTAMENTO:</b> piso+letra• (identificador compuesto), m², habitaciones, baños, % expensas.</li><li><b>PERSONA:</b> documento•, nombre, teléfonos (0,N).</li><li><b>es_dueño:</b> DEPTO (1,N) – PERSONA (0,N), atributo fecha_desde. La historia obliga a que un depto pueda tener muchos dueños en el tiempo (máximo N) y a que la fecha forme parte del identificador de la relación.</li><li><b>alquila:</b> DEPTO (0,N) – PERSONA (0,N), atributo fecha_desde. Mínimo 0 porque puede no estar alquilado.</li></ul>"},
{t:"Personal y derivado (6)",h:"<p><b>Enunciado:</b> el atributo derivado de la cantidad de empleados por departamento, más estas reglas: el documento identifica al empleado; el legajo se otorga por departamento; los departamentos tienen nombre distinto.</p><ul><li><b>PERSONAL:</b> dni• (identificador interno), legajo, nombre…</li><li><b>DEPARTAMENTO:</b> nombre•, cantidad_empleados (derivado).</li><li><b>pertenece:</b> PERSONAL (1,1) – DEPARTAMENTO (1,N).</li><li>Como el legajo es único solo dentro del departamento, <b>(legajo + departamento)</b> es un identificador externo alternativo.</li></ul>"},
{t:"Empresa (7)",h:"<p><b>Enunciado:</b> operarios (títulos), secretarios (idiomas), directivos (nº de empleados a cargo), obra social según jerarquía y jefes.</p><ul><li><b>Jerarquía</b> EMPLEADO (nombre y apellido, dni•, nro_empleado, dirección) → OPERARIO, SECRETARIO, DIRECTIVO: total y exclusiva.</li><li>OPERARIO: títulos (0,N). SECRETARIO: idiomas (1,N). DIRECTIVO: nº de empleados a cargo (derivado).</li><li><b>OBRA_SOCIAL:</b> nombre•. <b>tiene:</b> EMPLEADO (1,1) – OBRA_SOCIAL (0,N); la regla «qué obra social según jerarquía» no se dibuja: se anota como restricción.</li><li><b>es_jefe_de</b> (recursiva): DIRECTIVO (0,N) – EMPLEADO (0,1). Un empleado nunca tiene más de un jefe; un directivo también puede tener jefe.</li></ul>"},
{t:"Facturación (8)",h:"<p><b>Enunciado:</b> facturas con renglones, productos y clientes, con reglas estrictas.</p><ul><li><b>FACTURA:</b> tipo+número• (identificador compuesto), fecha, monto_total.</li><li><b>CLIENTE:</b> nombre, apellido, teléfonos (0,N). <b>PRODUCTO:</b> código_barras•, nombre_comercial, stock, precio_venta.</li><li><b>RENGLÓN:</b> cantidad, costo_unitario. Identificador externo: <b>factura + producto</b>. Así un producto solo aparece una vez por factura, y en cada renglón hay un único producto (con varias unidades).</li><li><b>realiza:</b> CLIENTE (0,N) – FACTURA (1,1). <b>tiene:</b> FACTURA (1,N) – RENGLÓN (1,1). <b>vende:</b> RENGLÓN (1,1) – PRODUCTO (0,N).</li><li><b>Reimpresión idéntica:</b> guardar en el renglón el costo unitario y en la factura el monto total al momento de emitir; la impresión lee esos datos y no el precio actual del producto.</li></ul>"}];
var tb=document.getElementById('extabs'),pn=document.getElementById('expanels');
EX.forEach(function(e,i){var b=document.createElement('button');b.textContent=e.t;b.setAttribute('role','tab');b.setAttribute('aria-selected',i==0);
var p=document.createElement('div');p.className='panel';p.setAttribute('role','tabpanel');p.innerHTML=e.h;p.hidden=i!=0;
b.onclick=function(){[].forEach.call(tb.children,function(x,j){x.setAttribute('aria-selected',j==i);pn.children[j].hidden=j!=i})};
tb.appendChild(b);pn.appendChild(p)});

// Scrollspy
var links=[].slice.call(document.querySelectorAll('nav a'));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});
document.querySelectorAll('main section').forEach(function(s){io.observe(s)});

// Simulador de integridad referencial
var A,AM;
function reset(){A=[{id:1,n:'Ana Pérez'},{id:2,n:'Luis Gómez'}];AM=[{id:1,a:1,m:10,r:'Aprobado'},{id:2,a:1,m:20,r:'Cursando'},{id:3,a:2,m:10,r:'Cursando'}];say('Elegí una política y probá una operación.','')}
function say(t,c){var m=document.getElementById('msg');m.textContent=t;m.className=c}
function draw(){
document.getElementById('tA').innerHTML='<caption style="text-align:left;font-weight:600">ALUMNOS</caption><tr><th>id_alumno</th><th>nombre</th></tr>'+A.map(function(x){return '<tr><td class="pk">'+x.id+'</td><td>'+x.n+'</td></tr>'}).join('');
document.getElementById('tAM').innerHTML='<caption style="text-align:left;font-weight:600">ALUMNOS_MATERIAS</caption><tr><th>id</th><th>id_alumno (CF)</th><th>id_materia</th><th>resultado</th></tr>'+AM.map(function(x){var o=x.a!==null&&!A.some(function(y){return y.id===x.a});return '<tr'+(o?' class="orf"':'')+'><td>'+x.id+'</td><td>'+(x.a===null?'NULL':x.a)+(o?' ⚠ huérfana':'')+'</td><td>'+x.m+'</td><td>'+x.r+'</td></tr>'}).join('')}
function refs(id){return AM.filter(function(x){return x.a===id}).length}
document.getElementById('bDel').onclick=function(){
var p=document.getElementById('pol').value,id=1;if(!A.some(function(x){return x.id===id})){say('Ana ya no existe. Reiniciá el simulador.','');return}
var n=refs(id);
if(p=='restrict'&&n>0){say('Operación RECHAZADA: Ana tiene '+n+' inscripciones que la referencian.','bad')}
else{A=A.filter(function(x){return x.id!==id});
if(p=='cascade'){AM=AM.filter(function(x){return x.a!==id});say('Se eliminó a Ana y, en cascada, sus '+n+' inscripciones.','ok')}
else if(p=='null'){AM.forEach(function(x){if(x.a===id)x.a=null});say('Se eliminó a Ana y sus inscripciones quedaron con id_alumno en NULL.','ok')}
else if(p=='none'){say(n?'Se eliminó a Ana pero '+n+' inscripciones quedaron huérfanas: se viola la integridad referencial.':'Se eliminó a Ana (no tenía inscripciones).',n?'bad':'ok')}
else say('Se eliminó a Ana (no tenía inscripciones).','ok')}
draw()};
document.getElementById('bMod').onclick=function(){
var p=document.getElementById('pol').value,a=A.filter(function(x){return x.id===1})[0];if(!a){say('Ana ya no tiene id 1. Reiniciá el simulador.','');return}
var n=refs(1);
if(p=='restrict'&&n>0){say('Operación RECHAZADA: hay '+n+' inscripciones que referencian el id 1.','bad')}
else{a.id=5;
if(p=='cascade'){AM.forEach(function(x){if(x.a===1)x.a=5});say('Se cambió el id a 5 y se actualizaron en cascada las '+n+' inscripciones.','ok')}
else if(p=='null'){AM.forEach(function(x){if(x.a===1)x.a=null});say('Se cambió el id a 5 y las inscripciones quedaron en NULL.','ok')}
else say(n?'Se cambió el id a 5 pero '+n+' inscripciones siguen apuntando a 1: huérfanas.':'Se cambió el id a 5.',n?'bad':'ok')}
draw()};
document.getElementById('bRes').onclick=function(){reset();draw()};
reset();draw();

// ===== Mejoras de estudio =====
(function(){
var R=document.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
// tema
var th=ls('db-theme');if(th)R.setAttribute('data-theme',th);
document.getElementById('theme').onclick=function(){var d=R.getAttribute('data-theme')?R.getAttribute('data-theme')=='dark':matchMedia('(prefers-color-scheme:dark)').matches;var n=d?'light':'dark';R.setAttribute('data-theme',n);ls('db-theme',n)};
// barra de lectura
var bar=document.getElementById('bar');
addEventListener('scroll',function(){var h=R.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
// revelado de bloques
var rv=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rv.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('main section:not(.hero) > :is(h2,h3,p,ul,.tw,.def,.note,.grid2,.sim,.sch,details,.tabs)').forEach(function(el){el.classList.add('rv');rv.observe(el)});
// diagramas: dibujo al entrar
if(!reduce){var fo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var f=e.target;requestAnimationFrame(function(){requestAnimationFrame(function(){f.classList.add('go')})});fo.unobserve(f)}})},{threshold:.25});
document.querySelectorAll('.fig').forEach(function(f){f.querySelectorAll('.l,.al').forEach(function(p){try{p.style.setProperty('--len',Math.ceil(p.getTotalLength())+2)}catch(e){}});f.classList.add('pre');fo.observe(f)})}
// marcar estudiado + progreso
var secs=[].slice.call(document.querySelectorAll('main section:not(.hero)'));
var done=[];try{done=JSON.parse(ls('db-done')||'[]')}catch(e){}
function upd(){secs.forEach(function(sc){var on=done.indexOf(sc.id)>-1;var b=sc.querySelector('.stud');if(b){b.classList.toggle('on',on);b.textContent=on?'✓ Estudiada':'Marcar como estudiada'}var a=document.querySelector('nav a[href="#'+sc.id+'"]');if(a)a.classList.toggle('done',on)});
document.getElementById('pt').textContent=done.length+' de '+secs.length+' estudiadas';document.getElementById('pb').style.width=(done.length/secs.length*100)+'%'}
secs.forEach(function(sc){var h=sc.querySelector('h2');if(!h)return;var b=document.createElement('button');b.className='stud';b.onclick=function(){var i=done.indexOf(sc.id);i>-1?done.splice(i,1):done.push(sc.id);ls('db-done',JSON.stringify(done));upd()};h.appendChild(b)});
upd();
// flashcards
var ds=[].slice.call(document.querySelectorAll('#repaso details'));
if(ds.length){var box=document.createElement('div');box.className='cards';var known=0;
var sc=document.createElement('p');sc.id='score';sc.textContent='Tocá una tarjeta para darla vuelta. Doble toque en la respuesta = «la sé». Sabidas: 0/'+ds.length;
ds[0].parentNode.insertBefore(sc,ds[0]);ds[0].parentNode.insertBefore(box,ds[0]);
ds.forEach(function(d){var c=document.createElement('button');c.className='fc rv';c.innerHTML='<div><span>'+d.querySelector('summary').textContent+'</span><span>'+d.querySelector('p').textContent+'</span></div>';
c.onclick=function(){c.classList.toggle('flip')};
c.ondblclick=function(){c.classList.toggle('known');known=box.querySelectorAll('.known').length;sc.textContent='Tocá una tarjeta para darla vuelta. Doble toque en la respuesta = «la sé». Sabidas: '+known+'/'+ds.length};
box.appendChild(c);rv.observe(c);d.remove()})}
})();

// ===== Versión web: bloques, portada y quizzes =====
(function(){
var main=document.querySelector('main');
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
var B=[
{t:'Conceptos básicos',d:'Qué es una BD, el DBMS y quiénes intervienen.',ids:['bd','dbms','actores']},
{t:'Modelado y modelo ER',d:'Niveles, entidades, relaciones, jerarquías y ejemplos resueltos.',ids:['modelado','er','er2','ejemplos']},
{t:'Del conceptual al lógico',d:'Revisión del esquema y decisiones del modelo lógico.',ids:['revision','logico']},
{t:'Modelo físico y restricciones',d:'Tablas, claves, integridad referencial y normalización.',ids:['fisico','ir','restr','norm']}];
var Q=[
[['¿Qué propiedad cumple una verdadera base de datos?',['Es una colección coherente de datos con significado','Es cualquier conjunto aleatorio de datos','Solo guarda datos en la memoria RAM','No tiene un propósito específico'],0,'Un conjunto aleatorio de datos no es una BD: debe tener cierta lógica y un propósito.'],
['¿Qué es un DBMS?',['Un tipo de dato','Un programa que permite crear y mantener la BD','Un archivo de respaldo','El usuario administrador'],1,'DBMS (SGBD) es el software de propósito general que facilita definir, construir y manipular BD.'],
['SQL y QBE se diferencian en que…',['SQL es no procedimental y QBE procedimental','Ambos son DDL','SQL es procedimental (cómo obtener los datos) y QBE no','Ninguno es DML'],2,'En el DML procedimental el usuario indica qué datos y cómo obtenerlos; en el no procedimental solo qué datos.'],
['¿Qué genera como resultado el DDL?',['El diccionario de datos','Una copia de seguridad','Las consultas del usuario','El índice de las tablas'],0,'El DDL especifica el esquema y su resultado es el diccionario de datos.'],
['¿Qué actor define la estructura de la BD según el problema real?',['Programador','Analista de sistemas','Diseñador de BD','Usuario final'],2,'El diseñador define la estructura; el analista releva los requerimientos y el programador implementa.']],
[['¿Qué nivel de abstracción describe cómo se almacenan realmente los datos?',['Visión','Conceptual','Lógico','Físico'],3,'El nivel físico describe archivos y hardware.'],
['¿Quién propuso el modelo Entidad-Relación en 1976?',['Codd','Chen','Date','Elmasri'],1,'Lo propuso Chen en 1976, lo amplió Codd en 1979 y es estándar desde 1988.'],
['La cardinalidad (0,N) significa…',['Obligatoria y única','Opcional y única','Opcional y múltiple','Obligatoria y múltiple'],2,'Mínimo 0 = participación opcional; máximo N = puede haber muchas.'],
['¿Qué cobertura tiene siempre un subconjunto?',['Total y superpuesta','Parcial y exclusiva','Total y exclusiva','Parcial y superpuesta'],1,'Un subconjunto es una jerarquía con un solo hijo y su cobertura es parcial exclusiva.'],
['Un atributo derivado es aquel que…',['Es polivalente','Identifica a la entidad','Se puede obtener a partir de otra información','Es opcional'],2,'Ej.: cantidad de empleados de un departamento, que se obtiene contando.'],
['En la facturación, ¿qué identifica a un renglón para que un producto aparezca una sola vez por factura?',['Solo la cantidad','Factura + producto','Solo el cliente','El precio'],1,'Un identificador externo (factura + producto) impide repetir el producto en la misma factura.']],
[['La propiedad de «minimalidad» exige que…',['El esquema tenga pocas entidades','Cada aspecto aparezca una sola vez','No existan atributos','Todo sea opcional'],1,'Se revisan ciclos de relaciones redundantes y atributos derivados.'],
['Un atributo polivalente en el modelo lógico se resuelve…',['Borrándolo','Concatenando los valores','Creando una nueva entidad relacionada','Dejándolo igual'],2,'El modelo relacional exige atributos monovalentes: se crea una entidad (ej. teléfono) y una relación.'],
['¿Cuáles son las 3 soluciones para una jerarquía?',['Eliminar hijas, eliminar padre o conservar todo','Duplicar, fusionar o ignorar','Cifrar, indexar o particionar','Normalizar, derivar o compactar'],0,'Cada una tiene ventajas y desventajas (nulos, duplicación, más tablas).'],
['¿Cuándo un ciclo de relaciones es redundante?',['Siempre','Nunca','Cuando una relación se puede deducir de las otras','Cuando tiene más de 3 entidades'],2,'Si no se puede deducir, hay que conservar todas las relaciones.'],
['¿Cuál es un error frecuente de corrección semántica?',['Minimizar cruces del diagrama','Usar herramientas automatizadas','Usar atributos en lugar de entidades','Usar estructuras simétricas'],2,'También: olvidar generalizaciones, identificadores o cardinalidades.']],
[['En el modelo relacional, una tupla es…',['Una columna','Un registro (fila)','Un dominio','Una tabla'],1,'Un atributo es una columna y una relación es la tabla completa.'],
['Una relación muchos a muchos se convierte en…',['Un atributo','Una tabla con las claves de ambas entidades como foráneas','Nada, no se representa','Una clave candidata'],1,'Ej.: Alumnos_Materias con id_alumno e id_materia.'],
['En una relación 1 a N con cobertura total…',['La relación se convierte en tabla','La CP del lado uno pasa como CF al lado muchos','Se eliminan ambas entidades','La CF va al lado uno'],1,'No genera tabla: ej. id_departamento en Empleados.'],
['La política «cascada» ante una baja…',['Rechaza la operación','Elimina también las tuplas que referencian','Deja la CF huérfana','No hace nada'],1,'Restringir rechaza, cascada propaga, nulo anula la CF y «no hacer nada» puede romper la integridad.'],
['¿Qué puede violar una baja?',['Dominio','Clave repetida','Integridad referencial','Valor nulo en la clave'],2,'Una alta puede violar nulo en clave, clave repetida, IR y dominio; la baja solo IR.'],
['En una relación 1 a 1 (factura–remito)…',['Se crea una tabla Remitos con clave compuesta','Los atributos del remito pasan a Facturas aceptando nulos','Se duplica Facturas','Se elimina la factura'],1,'Es el único caso en que una entidad no genera tabla.']]];
var secs={};B.forEach(function(b,i){b.ids.forEach(function(id){var e=document.getElementById(id);e.dataset.b=i+1;var a=document.querySelector('nav a[href="#'+id+'"]');if(a)a.dataset.b=i+1;});});
var rvo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');rvo.unobserve(e.target)}})},{threshold:.1});
// portada
var hero=document.getElementById('inicio'),top=document.createElement('div');top.className='hero-top';
for(var k=0;k<3;k++)top.appendChild(hero.firstElementChild);
top.insertAdjacentHTML('beforeend','<a class="cta" href="#bd">Empezar a estudiar</a><div class="fl" style="right:8%;top:12%;width:90px"><svg viewBox="0 0 90 56"><rect x="3" y="3" width="84" height="50" rx="3"/></svg></div><div class="fl" style="right:22%;bottom:14%;width:110px;animation-delay:-3s"><svg viewBox="0 0 110 70"><polygon points="55,3 107,35 55,67 3,35"/></svg></div><div class="fl" style="right:4%;bottom:26%;width:80px;animation-delay:-5s"><svg viewBox="0 0 80 50"><ellipse cx="40" cy="25" rx="37" ry="22"/></svg></div>');
hero.insertBefore(top,hero.firstChild);
var r=document.createElement('div');r.className='route';
B.forEach(function(b,i){r.insertAdjacentHTML('beforeend','<a class="rc" style="--c:var(--b'+(i+1)+')" href="#'+b.ids[0]+'"><i>'+(i+1)+'</i><b>'+b.t+'</b><span>'+b.ids.length+' temas + quiz</span></a>')});
hero.insertBefore(r,top.nextSibling);
// banners y quizzes
B.forEach(function(b,i){var n=i+1,first=document.getElementById(b.ids[0]),last=document.getElementById(b.ids[b.ids.length-1]);
var bn=document.createElement('div');bn.className='banner rv';bn.dataset.n=n;bn.style.setProperty('--c','var(--b'+n+')');
bn.innerHTML='<h2>Bloque '+n+' · '+b.t+'</h2><p>'+b.d+'</p>';first.parentNode.insertBefore(bn,first);rvo.observe(bn);
var q=document.createElement('section');q.className='quiz';q.id='quiz'+n;q.dataset.b=n;
q.innerHTML='<h2>Quiz del bloque '+n+'</h2><p>'+Q[i].length+' preguntas para practicar lo visto en este bloque. Las opciones cambian de orden en cada intento.</p><div class="qz"></div>';
last.after(q);build(q.querySelector('.qz'),Q[i],n,q);
var a=document.querySelector('nav a[href="#'+b.ids[b.ids.length-1]+'"]'),l=document.createElement('a');l.href='#quiz'+n;l.dataset.b=n;l.textContent='✎ Quiz '+n;a.after(l);
io.observe(q)});
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function build(box,qs,n,sec){var i,sc,hist,key='db-quiz'+n;
function start(){i=0;sc=0;hist=[];show()}
function best(){var v=ls(key);return v?'Mejor: '+v+'/'+qs.length:'Sin intentos'}
function dots(){return '<div class="dots">'+qs.map(function(_,j){return '<i class="'+(hist[j]===undefined?(j==i?'cur':''):hist[j]?'ok':'bad')+'"></i>'}).join('')+'</div>'}
function show(){if(i>=qs.length)return end();var q=qs[i],o=shuf(q[1].map(function(t,j){return{t:t,ok:j==q[2]}}));
box.innerHTML='<div class="qh"><span>Pregunta '+(i+1)+' de '+qs.length+'</span>'+dots()+'<span>'+best()+'</span></div><div class="qt">'+q[0]+'</div><div class="os"></div><div class="fb" aria-live="polite"></div>';
var os=box.querySelector('.os'),fb=box.querySelector('.fb');
o.forEach(function(x){var b=document.createElement('button');b.className='qo';b.textContent=x.t;b.onclick=function(){
[].forEach.call(os.children,function(c,j){c.disabled=true;if(o[j].ok)c.classList.add('ok');else if(c!==b)c.classList.add('dim')});
if(x.ok){sc++;hist[i]=true}else{b.classList.add('bad');hist[i]=false}
box.querySelector('.dots').outerHTML=dots();
fb.innerHTML='<div class="exp"><b>'+(x.ok?'¡Correcto! ':'Casi. ')+'</b>'+q[3]+'</div><button class="btn pri qn">'+(i+1<qs.length?'Siguiente':'Ver resultado')+'</button>';
fb.querySelector('.qn').onclick=function(){i++;show()};fb.querySelector('.qn').focus()};os.appendChild(b)})}
function end(){var prev=parseInt(ls(key)||'0',10);if(sc>prev)ls(key,String(sc));var pc=sc/qs.length,C=2*Math.PI*60;
var msg=pc==1?'¡Perfecto! Dominás este bloque.':pc>=.7?'¡Muy bien! Repasá lo que falló y repetí.':'Volvé a leer el bloque y probá de nuevo.';
box.innerHTML='<div class="res"><svg class="ring" viewBox="0 0 150 150"><circle class="bg" cx="75" cy="75" r="60"/><circle class="fg" cx="75" cy="75" r="60" transform="rotate(-90 75 75)" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'"/><text x="75" y="85" text-anchor="middle">'+sc+'/'+qs.length+'</text></svg><p style="margin:12px auto">'+msg+'</p><div class="row"><button class="btn pri" id="rt">Repetir quiz</button>'+(n<4?'<a class="btn" href="#'+B[n].ids[0]+'">Ir al bloque '+(n+1)+'</a>':'<a class="btn" href="#repaso">Ir al repaso final</a>')+'</div></div>';
requestAnimationFrame(function(){requestAnimationFrame(function(){box.querySelector('.fg').style.strokeDashoffset=C*(1-pc)})});
box.querySelector('#rt').onclick=start}
start()}
})();
