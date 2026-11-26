/* Toledo Mobile demo: fictieve student, nagebootste Toledo, KU Loket en KURT.
   Alles hier is verzonnen. Niets gaat naar KU Leuven; het echte script draait op deze nepgegevens. */
(function () {
  'use strict';
  const W = window;
  W.__TM_TEST__ = true;
  if (/[?&]upd=1\b/.test(location.search)) W.__TM_UPD_TEST__ = true;
  const KU = /^(toledo\.kuleuven\.be|ultra\.edu\.kuleuven\.cloud|kurt3\.ghum\.kuleuven\.be|icts-p-toledo-journey\.cloud\.icts\.kuleuven\.be|raw\.githubusercontent\.com|webwsp\.aps\.kuleuven\.be)$/;
  const HOME = 'https://toledo.kuleuven.be/portal/';
  const fakeBase = () => new URLSearchParams(location.search).get('u') || HOME;
  const fake = () => new URL(fakeBase() + location.hash);
  W.__TM_LOC__ = {
    get href() { return fake().href; },
    get hostname() { return fake().hostname; },
    get origin() { return fake().origin; },
    get pathname() { return fake().pathname; },
    get search() { return fake().search; },
  };
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = (t) => { const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const hm = (t) => { const d = new Date(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
  const sod = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const addD = (t, n) => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes()).getTime(); };
  const at = (dayT, h, m) => { const d = new Date(dayT); d.setHours(h, m || 0, 0, 0); return d.getTime(); };

  // a fake address -> a demo page address (null = not part of the demo)
  const PK_OF_LU = {};
  function toReal(url) {
    let u;
    try { u = new URL(url, fake().href); } catch (_) { return null; }
    if (u.protocol !== 'https:' || !KU.test(u.hostname)) return null;
    if (/journey/.test(u.hostname)) {
      // Toledo's link service: straight to the course
      const lu = decodeURIComponent((/batchUid=([^&#]*)/.exec(u.href) || [])[1] || '');
      const pk = PK_OF_LU[lu];
      if (!pk) return null;
      u = new URL(`https://ultra.edu.kuleuven.cloud/ultra/courses/${pk}/outline${u.hash}`);
    }
    if (/webwsp|githubusercontent/.test(u.hostname)) return null;
    if (/ultra\.edu/.test(u.hostname) && !/^\/ultra\//.test(u.pathname)) return null;
    if (/toledo\.kuleuven/.test(u.hostname) && !/^\/portal/.test(u.pathname)) return null;
    if (/kurt3/.test(u.hostname) && /^\/(login|check-in)/.test(u.pathname)) return null;
    if (u.searchParams.get('tm') === 'orig') return null;
    const h = u.hash; u.hash = '';
    const keep = new URLSearchParams(location.search).get('upd') === '1' ? '&upd=1' : '';
    return 'app.html?u=' + encodeURIComponent(u.href) + keep + h;
  }
  const notInDemo = (url) => {
    const s = String(url || '');
    const what = /^mailto:|outlook|ms-outlook/.test(s) ? 'Mail opent op je iPhone in de Outlook-app.'
      : /webwsp|kuloket/.test(s) ? 'Dit opent KU Loket. In de demo staat alles al klaar in de app.'
        : /githubusercontent|github\.com/.test(s) ? 'Hier installeer je de update in Userscripts. In de demo kan dat niet.'
          : /maps\.|google\./.test(s) ? 'Dit opent de route in Kaarten.'
            : /bbcswebdav|\.pdf|download/.test(s) ? 'Hier opent het bestand (pdf, slides…) meteen op je gsm.'
              : /alma\.be/.test(s) ? 'Alma toont het menu van vandaag. Dat werkt in de echte app, niet in de demo.'
                : /print\./.test(s) ? 'Printen werkt in de echte app, niet in de demo.'
                  : /usc\.|sport/.test(s) ? 'Sport werkt in de echte app, niet in de demo.'
                    : /limo|lib\.kuleuven|kuleuven\.primo|exlibris/.test(s) ? 'LIMO (de bib-catalogus) werkt in de echte app, niet in de demo.'
                      : /attest|kuloket/.test(s) ? 'Attesten werkt in de echte app, niet in de demo.'
              : 'Dit opent een pagina buiten de demo.';
    demoToast(what);
  };
  function demoToast(msg) {
    const d = document.createElement('div');
    d.setAttribute('data-tm4', '');
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:calc(96px + env(safe-area-inset-bottom));z-index:2147483646;background:rgba(20,30,36,.94);color:#fff;font:600 14px/1.35 Manrope,system-ui,sans-serif;padding:12px 14px;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,.25);text-align:center;transition:opacity .3s';
    d.textContent = 'Demo · ' + msg;
    document.body.appendChild(d);
    setTimeout(() => { d.style.opacity = '0'; setTimeout(() => d.remove(), 400); }, 2600);
  }
  W.__TM_GO__ = (url) => { const r = toReal(url); if (r) location.href = r; else notInDemo(url); };
  W.__TM_REPL__ = (url) => { const r = toReal(url); if (r) location.replace(r); else notInDemo(url); };
  ['replaceState', 'pushState'].forEach((k) => {
    const orig = history[k].bind(history);
    history[k] = (st, t, url) => {
      if (url == null) return orig(st, t);
      const r = toReal(url);
      return orig(st, t, r || url);
    };
  });
  // ordinary links to Toledo, KURT… stay in the demo; links to elsewhere get a short note
  setTimeout(() => {
    W.addEventListener('click', (e) => {
      if (e.defaultPrevented) return;
      const a = e.target && e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      e.preventDefault();
      W.__TM_GO__(href);
    });
  }, 0);

  /* ================================================================ the fictional student */
  const NOW = Date.now();
  const TODAY = sod(NOW);
  const ME = { first: 'Lotte', last: 'Vermeulen', rn: 'r0789012', email: 'lotte.vermeulen@student.kuleuven.be' };
  const YEAR = new Date(NOW).getMonth() >= 7 ? new Date(NOW).getFullYear() : new Date(NOW).getFullYear() - 1; // academic year
  const SEM = (() => { const m = new Date(NOW).getMonth(); return m >= 7 || m === 0 ? 'SEMESTER1' : 'SEMESTER2'; })();
  const C = [
    { code: 'HAW21A', t: 'Micro-economie', col: 14, fav: true, pk: '_90101_1', prof: 'prof. Els Claes' },
    { code: 'HAW22B', t: 'Financiële rapportering', col: 11, fav: true, pk: '_90102_1', prof: 'prof. Tom Wouters' },
    { code: 'HAW23C', t: 'Statistiek II', col: 15, fav: true, pk: '_90103_1', prof: 'prof. Sarah Maes' },
    { code: 'HAW24D', t: 'Marketingmanagement', col: 16, fav: true, pk: '_90104_1', prof: 'prof. Pieter Jacobs' },
    { code: 'HAW25E', t: 'Ondernemingsrecht', col: 2, fav: false, pk: '_90105_1', prof: 'prof. An De Smet' },
    { code: 'HAW26F', t: 'Bedrijfsinformatica', col: 9, fav: false, pk: '_90106_1', prof: 'dr. Bram Peeters' },
    { code: 'HAW27G', t: 'Business English', col: 5, fav: false, pk: '_90107_1', prof: 'Karen Willems' },
    { code: 'HAW28H', t: 'Kostprijsberekening', col: 4, fav: false, pk: '_90108_1', prof: 'prof. Jan Hermans' },
  ];
  C.forEach((c) => { c.lu = `ULTRA-C-KUL-${c.code}-${YEAR}`; PK_OF_LU[c.lu] = c.pk; });
  const by = (code) => C.find((c) => c.code === code);
  const enrollments = C.map((c) => ({ learningUnitId: c.lu, title: `${c.t} [${c.code}]`, color: c.col, semester: c.code === 'HAW27G' ? 'YEAR' : SEM, favorite: c.fav, type: 'course', available: true }))
    .concat([
      { learningUnitId: `ULTRA-O-KUL-INFHAW-${YEAR}`, title: 'Infopunt Handelswetenschappen', color: 13, semester: 'YEAR', favorite: false, type: 'community', available: true },
      { learningUnitId: `ULTRA-O-KUL-STUDBEG-${YEAR}`, title: 'Studiebegeleiding FEB', color: 12, semester: 'YEAR', favorite: false, type: 'community', available: true },
      { learningUnitId: `ULTRA-C-KUL-HAW31A-${YEAR}`, title: 'Internationale economie [HAW31A]', color: 7, semester: 'SEMESTER2', favorite: false, type: 'course', available: false },
    ]);

  // timetable: the same week, every week
  const WEEK = {
    1: [['08:30', '10:30', 'HAW21A', 'Hoorcollege', 'AGO 00.12 · Aula Agora'], ['13:30', '15:30', 'HAW28H', 'Hoorcollege', 'HBS 01.05 · Aula Zuid']],
    2: [['08:30', '10:30', 'HAW22B', 'Hoorcollege', 'HBS 00.10 · Aula Noord'], ['10:45', '12:15', 'HAW27G', 'Werkcollege', 'LNG 02.14'], ['14:00', '16:00', 'HAW23C', 'Oefenzitting', 'PCL 01.03 · pc-lokaal']],
    3: [['08:30', '10:30', 'HAW24D', 'Hoorcollege', 'AGO 00.12 · Aula Agora'], ['11:00', '12:30', 'HAW21A', 'Oefenzitting', 'HBS 02.21']],
    4: [['10:30', '12:30', 'HAW25E', 'Hoorcollege', 'JUR 00.04 · Aula Oost'], ['13:30', '15:30', 'HAW26F', 'Practicum', 'PCL 01.03 · pc-lokaal']],
    5: [['09:00', '11:00', 'HAW23C', 'Hoorcollege', 'HBS 00.10 · Aula Noord'], ['11:15', '12:45', 'HAW22B', 'Oefenzitting', 'HBS 02.21']],
  };
  const lessons = [];
  const mon0 = addD(TODAY, -((new Date(TODAY).getDay() + 6) % 7) - 7);
  for (let i = 0; i < 7 * 14; i++) {
    const day = addD(mon0, i), dw = new Date(day).getDay();
    (WEEK[dw] || []).forEach(([s, e, code, f, r]) => {
      const c = by(code);
      lessons.push({ d: ymd(day), s, e, t: c.t, c: code, f, g: '', r, u: '', p: c.prof });
    });
  }
  // exams: in the next exam period (weekdays, about six weeks from now)
  const exams = [];
  let ex = addD(TODAY, 44);
  [['HAW21A', '09:00', '12:00', 'Schriftelijk examen, gesloten boek'], ['HAW22B', '14:00', '17:00', 'Schriftelijk, met rekenmachine'], ['HAW23C', '09:00', '12:00', 'Pc-examen'], ['HAW24D', '09:00', '11:00', 'Mondeling met schriftelijke voorbereiding'], ['HAW25E', '14:00', '16:00', 'Schriftelijk examen'], ['HAW28H', '09:00', '12:00', 'Schriftelijk examen']].forEach(([code, s, e, x], i) => {
    while ([0, 6].includes(new Date(ex).getDay())) ex = addD(ex, 1);
    exams.push({ d: ymd(ex), s, e, t: by(code).t, c: code, r: i % 2 ? 'HBS 00.10 · Aula Noord' : 'AGO 00.12 · Aula Agora', u: '', x });
    ex = addD(ex, i === 1 ? 4 : 3);
  });

  // updates in Toledo
  const H = 3600e3;
  const evs = [];
  const ev = (o) => evs.push(Object.assign({ id: 'ev' + evs.length, type: 'course', read: false, dismissed: false }, o));
  const evOf = (code, sub, title, ago, read, cid) => {
    const c = by(code);
    const u = `https://ultra.edu.kuleuven.cloud/ultra/courses/${c.pk}/outline?legacyUrl=x${cid ? '&contentId=' + cid : ''}`;
    ev({ subType: sub, title, source: `${c.t} [${c.code}]`, sourceId: c.lu, color: c.col, date: NOW - ago, read: !!read, url: u });
  };
  evOf('HAW21A', 'announcement', 'Extra vragensessie voor het examen', 0.6 * H);
  evOf('HAW22B', 'content', 'Slides hoofdstuk 7: geconsolideerde jaarrekening', 2.5 * H, false, '_501_1');
  evOf('HAW23C', 'gradebook', 'Cijfer beschikbaar: tussentijdse test regressie', 20 * H);
  evOf('HAW24D', 'announcement', 'Gastspreker volgende week: merkstrategie bij een scale-up', 26 * H);
  evOf('HAW27G', 'content', 'Writing assignment: briefing en voorbeeldtekst', 50 * H, true);
  evOf('HAW25E', 'announcement', 'Lokaalwijziging donderdag', 74 * H, true);
  evOf('HAW26F', 'content', 'Excel-oefeningen week 9 (draaitabellen)', 96 * H, true);
  ev({ subType: 'advalvas', title: 'Bevraging onderwijs: geef je mening over dit semester', source: 'Ad Valvas', sourceId: '', color: 0, date: NOW - 30 * H, read: true, url: '' });
  evOf('HAW28H', 'content', 'Oplossingen oefeningen hoofdstuk 4', 120 * H, true);
  evOf('HAW21A', 'content', 'Kennisclip: prijsdiscriminatie (12 min)', 150 * H, true);
  evOf('HAW22B', 'announcement', 'Proefexamen staat online', 175 * H, true);
  evOf('HAW23C', 'content', 'Dataset project (csv)', 200 * H, true);
  // deadlines
  const due = (code, title, inH, cid) => { const c = by(code); const d = new Date(NOW + inH * H); d.setMinutes(59, 0, 0); if (inH > 20) d.setHours(23); ev({ subType: 'due', title, source: `${c.t} [${c.code}]`, sourceId: c.lu, color: c.col, date: d.getTime(), read: true, url: `https://ultra.edu.kuleuven.cloud/ultra/courses/${c.pk}/outline?x=1&contentId=${cid}` }); };
  due('HAW24D', 'Paper: merkanalyse van een Belgisch bedrijf', 30, '_701_1');
  due('HAW26F', 'Groepsopdracht: dashboard in Excel', 75, '_702_1');
  due('HAW23C', 'Huistaak 3: meervoudige regressie', 8 * 24, '_703_1');
  due('HAW27G', 'Writing assignment', 13 * 24, '_704_1');

  /* ---- study progress (KU Loket) */
  const R = (code, t, sp, r, d, rk, extra) => Object.assign({ code, t, sp, r: String(r), sc: r === '' ? '' : '/20', st: r === '' ? '' : Number(r) >= 10 ? 'Geslaagd' : 'Getolereerd', d, n: 1, sit: rk ? rk.find((k) => k[5])[0] : '', sy: 3, tol: false, rk }, extra || {});
  const rank = (mine, n) => {
    const G = [['A', 16, 20, 0.14], ['B', 14, 15.9, 0.24], ['C', 12, 13.9, 0.31], ['D', 10.5, 11.9, 0.2], ['E', 10, 10.4, 0.11]];
    return G.map(([c, lo, hi, p]) => [c, lo, hi, Math.round(n * p), Math.round(p * 1000) / 10, c === mine ? 1 : 0]);
  };
  const y1 = String(YEAR - 1), rel1 = `${YEAR}-01-30`, rel2 = `${YEAR}-07-04`;
  const y0 = String(YEAR - 2), rel0a = `${YEAR - 1}-01-31`, rel0b = `${YEAR - 1}-07-05`;
  const study = [{
    id: 'S1', name: 'Bachelor in de handelswetenschappen (Leuven)', inst: 'KU Leuven', active: true, done: false, doneYear: '', pct: 71.36, total: 180, last: rel2,
    prog: [['Verworven', 117], ['Getolereerd', 3], ['Opgenomen', 60]],
    now: [['Verworven', 117], ['Getolereerd', 3], ['Opgenomen', 60]],
    years: [
      { y: String(YEAR), c: C.map((c) => R(c.code, c.t, c.code === 'HAW27G' ? 6 : c.code === 'HAW25E' || c.code === 'HAW28H' ? 6 : 8, '', '', null)) },
      { y: y1, c: [
        R('HAW11A', 'Algemene economie', 6, 15, rel1, rank('B', 812)),
        R('HAW12B', 'Wiskunde voor bedrijfseconomen', 7, 13, rel1, rank('C', 790)),
        R('HAW13C', 'Inleiding tot de bedrijfskunde', 5, 17, rel1, rank('A', 845)),
        R('HAW14D', 'Boekhouden', 7, 14, rel1, rank('B', 801)),
        R('HAW15E', 'Statistiek I', 6, 9, rel2, null, { st: 'Getolereerd', tol: true, n: 2 }),
        R('HAW16F', 'Recht van de onderneming', 5, 12, rel2, rank('C', 760)),
        R('HAW17G', 'Economische geschiedenis', 4, 16, rel2, rank('A', 702)),
        R('HAW18H', 'Psychologie', 4, 14, rel2, rank('B', 688)),
        R('HAW19J', 'Informatica voor economen', 5, 18, rel2, rank('A', 731)),
        R('HAW10K', 'Frans: zakelijke communicatie', 4, 12, rel2, rank('D', 405)),
        R('HAW10L', 'Filosofie', 4, 11, rel2, rank('D', 690)),
        R('HAW10M', 'Actuele maatschappelijke vraagstukken', 3, 'VR', '', null, { sc: '', st: 'Vrijstelling' }),
      ] },
      { y: y0, c: [
        R('HAW01A', 'Economie: inleiding', 6, 13, rel0a, rank('C', 1210)),
        R('HAW02B', 'Wiskunde I', 6, 11, rel0a, rank('D', 1188)),
        R('HAW03C', 'Algemene bedrijfskunde', 6, 15, rel0a, rank('B', 1235)),
        R('HAW04D', 'Financiële boekhouding', 6, 12, rel0a, rank('C', 1199)),
        R('HAW05E', 'Inleiding tot het recht', 5, 14, rel0b, rank('B', 1102)),
        R('HAW06F', 'Wiskunde II', 6, 10, rel0b, rank('E', 1050)),
        R('HAW07G', 'Sociologie', 4, 15, rel0b, rank('B', 980)),
        R('HAW08H', 'Engels voor economen', 4, 16, rel0b, rank('A', 940)),
        R('HAW09J', 'Informatica: basis', 5, 13, rel0b, rank('C', 1001)),
        R('HAW09K', 'Geschiedenis van de economie', 6, 14, rel0b, rank('B', 1077)),
        R('HAW09L', 'Bedrijfsethiek', 6, 12, rel0b, rank('C', 1060)),
      ] },
    ],
  }];
  const isp = {
    name: 'Bachelor in de handelswetenschappen (Leuven)', yr: String(YEAR), spec: 'Afstudeerrichting Marketing (vanaf fase 3)', deadline: `${YEAR}-10-15`, sem: [0, 0, 0],
    groups: [{ id: 'G1', p: '', t: 'Economie en bedrijfseconomie', l: 1 }, { id: 'G2', p: '', t: 'Kwantitatieve methoden', l: 1 }, { id: 'G3', p: '', t: 'Recht, taal en maatschappij', l: 1 }],
    courses: [
      { g: 'G1', code: 'HAW21A', t: 'Micro-economie', sp: 8, per: '002', st: 'now' },
      { g: 'G1', code: 'HAW22B', t: 'Financiële rapportering', sp: 8, per: '002', st: 'now' },
      { g: 'G1', code: 'HAW24D', t: 'Marketingmanagement', sp: 8, per: '002', st: 'now' },
      { g: 'G1', code: 'HAW28H', t: 'Kostprijsberekening', sp: 6, per: '002', st: 'now' },
      { g: 'G1', code: 'HAW31A', t: 'Internationale economie', sp: 6, per: '003', st: 'now' },
      { g: 'G1', code: 'HAW11A', t: 'Algemene economie', sp: 6, per: '', st: 'ok', yr: y1 },
      { g: 'G1', code: 'HAW14D', t: 'Boekhouden', sp: 7, per: '', st: 'ok', yr: y1 },
      { g: 'G1', code: 'HAW13C', t: 'Inleiding tot de bedrijfskunde', sp: 5, per: '', st: 'ok', yr: y1 },
      { g: 'G2', code: 'HAW23C', t: 'Statistiek II', sp: 8, per: '002', st: 'now' },
      { g: 'G2', code: 'HAW26F', t: 'Bedrijfsinformatica', sp: 8, per: '003', st: 'now' },
      { g: 'G2', code: 'HAW12B', t: 'Wiskunde voor bedrijfseconomen', sp: 7, per: '', st: 'ok', yr: y1 },
      { g: 'G2', code: 'HAW15E', t: 'Statistiek I', sp: 6, per: '', st: 'ok', yr: y1 },
      { g: 'G2', code: 'HAW19J', t: 'Informatica voor economen', sp: 5, per: '', st: 'ok', yr: y1 },
      { g: 'G3', code: 'HAW25E', t: 'Ondernemingsrecht', sp: 6, per: '003', st: 'now' },
      { g: 'G3', code: 'HAW27G', t: 'Business English', sp: 2, per: '001', st: 'now' },
      { g: 'G3', code: 'HAW16F', t: 'Recht van de onderneming', sp: 5, per: '', st: 'ok', yr: y1 },
      { g: 'G3', code: 'HAW10K', t: 'Frans: zakelijke communicatie', sp: 4, per: '', st: 'ok', yr: y1 },
    ].map((c) => Object.assign({ url: '', yr: String(YEAR), must: true }, c)),
    other: { G3: 3 },
  };

  /* ---- seed the app's own memory (once a day, so all dates stay fresh) */
  const ls = (k, v) => { try { localStorage.setItem('tm4:' + k, JSON.stringify(v)); } catch (_) {} };
  const lsg = (k) => { try { return JSON.parse(localStorage.getItem('tm4:' + k)); } catch (_) { return null; } };
  const seedKey = 'tm4demo:seed';
  const fresh = (() => { try { return localStorage.getItem(seedKey) !== ymd(NOW) + 'v8'; } catch (_) { return true; } })();
  if (fresh) {
    try { Object.keys(localStorage).filter((k) => k.startsWith('tm4')).forEach((k) => localStorage.removeItem(k)); sessionStorage.clear(); } catch (_) {}
    ls('p:agenda', { ts: NOW - 40 * 60e3, v: { lessons, exams, range: [ymd(mon0), ymd(addD(mon0, 7 * 14))], ver: 2 } });
    ls('p:study', { ts: NOW - 50 * 60e3, v: { study, isp } });
    ls('p:rn', ME.rn);
    ls('p:resSeen', rel2);
    ls('p:done', { [by('HAW26F').pk]: ['_702_1'] });
    ls('p:seen', NOW - 26 * H);
    ls('kurt:fav', [2, 1]);
    ls('kurt:seats', [
      { rid: 11117, name: 'Agora - Silent Study Seat 117', zone: 11, zname: 'Gelijkvloers · stille zone', loc: 1, unit: 'Agora Learning Centre' },
      { rid: 21145, name: 'Centrale - Study Seat 145', zone: 21, zname: 'Leeszaal eerste verdieping', loc: 2, unit: 'Centrale Bibliotheek' },
    ]);
    ls('kurt:mates', [{ uid: 'R0812345', email: 'jonas.maes@student.kuleuven.be' }, { uid: 'R0823456', email: 'emma.declercq@student.kuleuven.be' }, { uid: 'R0834567', email: 'youssef.elamrani@student.kuleuven.be' }]);
    ls('kurt:gsubj', 'Groepswerk marketing');
    try { localStorage.setItem('tm4:ver', JSON.stringify(W.__TM_VER__ || '')); localStorage.setItem(seedKey, ymd(NOW) + 'v8'); } catch (_) {}
  }
  // course links go straight to the course (no sign-in step in between)
  ls('p:ultraok', Date.now());
  ls('p:lu2pk', Object.fromEntries(C.map((c) => [c.lu, c.pk])));

  /* ================================================================ KURT (study places) */
  const LIBS = [
    { id: 1, unit: 'Agora Learning Centre', address: 'Ladeuzeplein, Leuven', hours: '08:00 - 00:00', cap: 920, occ: 0.71, img: 'img/lib-agora.jpg', zones: [[11, 'Gelijkvloers · stille zone'], [12, 'Eerste verdieping'], [13, 'Tweede verdieping · groepswerk']], groups: true },
    { id: 2, unit: 'Centrale Bibliotheek', address: 'Mgr. Ladeuzeplein, Leuven', hours: '09:00 - 22:00', cap: 400, occ: 0.84, img: 'img/lib-cb.jpg', zones: [[21, 'Leeszaal eerste verdieping'], [22, 'Barokzaal']], groups: false },
    { id: 3, unit: 'Bibliotheek 2Bergen', address: 'Kasteelpark Arenberg, Heverlee', hours: '08:30 - 22:00', cap: 560, occ: 0.42, img: 'img/lib-2b.jpg', zones: [[31, 'Leeszaal Arenberg'], [32, 'Stille studiezaal']], groups: true },
    { id: 4, unit: 'Erasmushuis', address: 'Blijde-Inkomststraat, Leuven', hours: '09:00 - 19:00', cap: 180, occ: 0.93, img: 'img/lib-eh.jpg', zones: [[41, 'Leeszaal']], groups: false },
    { id: 5, unit: 'Maurits Sabbebibliotheek', address: 'Sint-Michielsstraat, Leuven', hours: '09:00 - 18:00', cap: 120, occ: 0.55, img: 'img/lib-ms.jpg', zones: [[51, 'Leeszaal']], groups: false },
    { id: 6, unit: 'Campusbibliotheek Kulak', address: 'Etienne Sabbelaan, Kortrijk', hours: '08:30 - 21:00', cap: 210, occ: 0.38, img: 'img/lib-kk.jpg', zones: [[61, 'Leeszaal']], groups: true, city: 'Kortrijk' },
  ];
  const libOf = (id) => LIBS.find((l) => l.id === Number(id));
  const zoneOf = (zid) => { for (const l of LIBS) for (const z of l.zones) if (z[0] === Number(zid)) return { l, z }; return null; };
  // pseudo random but the same every time
  const rnd = (s) => { const x = Math.sin(s * 9301 + 49297) * 233280; return x - Math.floor(x); };
  // seats of a room, laid out on its floor plan (see img/fp-*.png, 1200 x 800)
  const LAYOUT = (zid) => {
    const seats = [];
    const tables = [];
    for (let r = 0; r < 6; r++) for (const x of [80, 460]) tables.push([x, 140 + r * 150]);
    let n = 100;
    tables.slice(0, zid === 13 ? 8 : 12).forEach(([x, y]) => {
      for (let k = 0; k < 6; k++) seats.push({ x: x + 45 + (k % 3) * 70, y: y + (k < 3 ? 6 : 74), n: ++n });
    });
    // along the windows
    for (let k = 0; k < (zid === 13 ? 7 : 12); k++) seats.push({ x: 800, y: 150 + k * 78, n: ++n });
    return seats;
  };
  const seatName = (l, n) => `${l.unit.split(' ')[0]} - ${l.id === 1 ? 'Silent Study Seat' : 'Study Seat'} ${n}`;
  const resId = (zid, n) => zid * 1000 + n;
  // how many hours a seat is free from hour h (0 = taken)
  const freeHours = (zid, n, d, h, close) => {
    const r = rnd(zid * 1000 + n + Number(d.replace(/-/g, '')) % 97 + h * 7);
    if (r < (libOf(Math.floor(zid / 10)).occ - 0.05)) return 0;
    return Math.max(1, Math.min(close - h, Math.round(1 + rnd(n * 3 + h) * 8)));
  };
  const closeH = (l) => { const m = /- (\d{2})/.exec(l.hours); const v = m ? Number(m[1]) : 22; return v === 0 ? 24 : v; };
  const openH = (l) => Number(l.hours.slice(0, 2));
  function startDates(l) {
    const out = [];
    for (let i = 0; i < 4; i++) {
      const day = addD(TODAY, i);
      const nowH = i === 0 ? new Date(Date.now()).getHours() + 1 : 0;
      const times = [];
      for (let h = Math.max(openH(l), nowH); h < closeH(l); h++) times.push({ value: pad(h) + ':00', display: pad(h) + ':00' });
      if (times.length) out.push({ value: ymd(day), startTimes: times });
    }
    return out;
  }
  // bookings, kept between pages (the demo's own memory)
  const KRES = 'tm4demo:kres';
  const nowH = new Date(NOW).getHours();
  const defRes = () => {
    const live = nowH >= 23 ? 22 : Math.max(8, nowH);
    return [
      { id: 'r1', resourceId: 11117, resourceName: 'Agora - Silent Study Seat 117', startDate: ymd(TODAY), startTime: pad(live) + ':00', endDate: ymd(TODAY), endTime: pad(Math.min(24, live + 4) % 24) + ':00', status: 'Booked' },
      { id: 'r2', resourceId: 101, resourceName: 'Agora 02.14 - Tulp', startDate: ymd(addD(TODAY, 1)), startTime: '14:00', endDate: ymd(addD(TODAY, 1)), endTime: '16:00', status: 'Booked' },
      { id: 'r3', resourceId: 21145, resourceName: 'Centrale - Study Seat 145', startDate: ymd(addD(TODAY, 2)), startTime: '09:00', endDate: ymd(addD(TODAY, 2)), endTime: '13:00', status: 'Booked' },
    ];
  };
  const getRes = () => { try { const v = JSON.parse(localStorage.getItem(KRES) || 'null'); if (v && v.day === ymd(NOW)) return v.list; } catch (_) {} return defRes(); };
  const setRes = (list) => { try { localStorage.setItem(KRES, JSON.stringify({ day: ymd(NOW), list })); } catch (_) {} };
  if (fresh) setRes(defRes());
  const GROUP_ROOMS = (lid) => {
    const l = libOf(lid);
    const names = lid === 1 ? [['02.14', 'Tulp', 4, 8], ['02.15', 'Roos', 3, 6], ['02.16', 'Lelie', 3, 6], ['02.21', 'Iris', 4, 10], ['02.22', 'Klaproos', 2, 4], ['02.23', 'Zonnebloem', 2, 4], ['01.08', 'Vergaderzaal Linde', 6, 12]]
      : [['00.31', 'Kamer A', 3, 6], ['00.32', 'Kamer B', 3, 6], ['00.33', 'Kamer C', 4, 8], ['01.12', 'Projectruimte', 4, 10]];
    return names.map(([code, name, mi, ma], i) => ({ id: lid * 100 + 1 + i, name: `${l.unit.split(' ')[0]} ${code} - ${name}`, code, mi, ma }));
  };
  const roomAlloc = (lid, rid, d) => {
    const l = libOf(lid);
    let s = '';
    const seed = Number(d.replace(/-/g, '')) % 89;
    for (let h = 0; h < 24; h++) {
      if (h < openH(l) || h >= closeH(l)) { s += 'C'; continue; }
      const r = rnd(rid * 31 + h * 5 + seed);
      s += r < 0.42 ? 'B' : 'A';
    }
    // the demo's own group booking
    getRes().forEach((x) => { if (x.resourceId === rid && x.startDate === d) { for (let h = Number(x.startTime.slice(0, 2)); h < (Number(x.endTime.slice(0, 2)) || 24); h++) s = s.slice(0, h) + 'B' + s.slice(h + 1); } });
    return s;
  };

  function kurt(path, q, method, body) {
    const p = path.replace(/^\/api/, '').replace(/\/$/, '');
    let m;
    if (p === '/information') return { uid: ME.rn.toUpperCase(), email: ME.email, firstName: ME.first };
    if (p === '/tiles') {
      return [
        { name: 'Leuven', tileGroup: 1, locations: LIBS.filter((l) => !l.city).map((l) => ({ id: l.id, unit: l.unit, thumbnailUrl: l.img })) },
        { name: 'Kortrijk', tileGroup: 1, locations: LIBS.filter((l) => l.city).map((l) => ({ id: l.id, unit: l.unit, thumbnailUrl: l.img })) },
        { name: 'Leermiddelen', tileGroup: 2, locations: [{ id: 9, unit: 'Uitleendienst laptops en kits', thumbnailUrl: '' }] },
      ];
    }
    if ((m = /^\/locations\/(\d+)$/.exec(p))) {
      const l = libOf(m[1]);
      if (!l) return { unit: 'Uitleendienst laptops en kits', address: 'Agora, Leuven', openingHoursToday: '09:00 - 17:00', zones: [] };
      return { id: l.id, unit: l.unit, address: l.address, openingHoursToday: l.hours, closedToday: false, fullImageUrl: l.img, navigationUrl: 'https://www.google.com/maps/search/?api=1&query=50.8786%2C4.7004',
        zones: l.zones.map(([id, name]) => ({ id, name, locationId: l.id, resourceTypeIds: [302], floorPlanId: id })) };
    }
    if ((m = /^\/zones\/(\d+)$/.exec(p))) { const z = zoneOf(m[1]); return { id: z.z[0], name: z.z[1], locationId: z.l.id, resourceTypeIds: [302] }; }
    if ((m = /^\/occupancies\/(\d+)$/.exec(p))) { const l = libOf(m[1]); if (!l) return { capacity: 0 }; const wob = Math.round(rnd(Math.floor(Date.now() / 60e3) + l.id) * 14) - 7; return { capacity: l.cap, occupancy: Math.round(l.cap * l.occ) + wob, closed: false }; }
    if (p === '/resourcetypes') { const l = libOf(q.get('locationId')); if (!l) return [{ id: 12, name: 'Laptop' }]; return [{ id: 302, name: 'Study seat' }].concat(l.groups ? [{ id: 1, name: 'Group work room' }] : []).concat(l.id === 1 ? [{ id: 307, name: 'Video call' }, { id: 12, name: 'Laptop' }] : []); }
    if (p === '/news') return [];
    if (p === '/parameters') { const l = libOf(q.get('locationId')); return { startDates: startDates(l) }; }
    if (p === '/zoneavailabilities') {
      const z = zoneOf(q.get('zoneId')); const l = z.l, zid = z.z[0];
      const d = q.get('startDate'), h = Number(String(q.get('startTime')).slice(0, 2));
      const mine = getRes();
      return { location: { unit: l.unit }, zone: { name: z.z[1] }, floorPlan: { floorPlanUrl: `img/fp-${zid === 13 ? 'b' : zid % 2 ? 'a' : 'c'}.png`, floorPlanWidth: 900, floorPlanHeight: 1200 },
        availabilities: LAYOUT(zid).map((s) => { const rid = resId(zid, s.n); const booked = mine.some((x) => x.resourceId === rid && x.startDate === d); return { resourceId: rid, resourceName: seatName(l, s.n), positionX: s.x, positionY: s.y, availableHours: booked ? 0 : freeHours(zid, s.n, d, h, closeH(l)) }; }) };
    }
    if (p === '/resourceavailabilities') {
      const rid = Number(q.get('resourceId')), d = q.get('startDate'), h = Number(String(q.get('startTime')).slice(0, 2));
      const z = zoneOf(Math.floor(rid / 1000)) || zoneOf(11);
      const l = z.l;
      const n = rid % 1000;
      const fh = freeHours(z.z[0], n, d, h, closeH(l)) || 0;
      let s = '';
      for (let i = 0; i < 24; i++) s += i < openH(l) || i >= closeH(l) ? 'C' : i >= h && i < h + Math.max(fh, 0) ? 'A' : 'B';
      return { availabilities: [{ id: rid, name: seatName(l, n), unit: l.unit, slotAllocation: s, maxDurationMinutes: 600, tags: rid % 3 ? [{ id: 'power socket nearby', name: 'Power socket nearby' }, { id: 'silence', name: 'Silence' }] : [{ id: 'window', name: 'Window' }, { id: 'desk lamp', name: 'Desk lamp' }] }] };
    }
    if ((m = /^\/resources\/(\d+)$/.exec(p))) { const rid = Number(m[1]); const gr = rid < 1000; return { id: rid, name: gr ? 'Groepsruimte' : 'Study seat ' + rid, subjectIsRequired: gr, conditionsOfUseNlUrl: '' }; }
    if (p === '/resourcetypeavailabilities') {
      const lid = Number(q.get('locationId')), d = q.get('startDate');
      if (Number(q.get('pageNumber')) > 0) return { availabilities: [] };
      return { availabilities: GROUP_ROOMS(lid).map((r) => ({ id: r.id, name: r.name, unit: libOf(lid).unit, minParticipants: r.mi, maxParticipants: r.ma, maxDurationMinutes: 240, slotAllocation: roomAlloc(lid, r.id, d) })) };
    }
    if ((m = /^\/participants\/(.+)$/.exec(p))) {
      const idf = decodeURIComponent(m[1]).toLowerCase();
      const known = { r0845678: 'ines.wouters', r0856789: 'lucas.vandenberghe', r0812345: 'jonas.maes' };
      const rn = /^r\d{7}$/.test(idf) ? idf : '';
      if (rn) return { uid: rn.toUpperCase(), email: (known[rn] || 'student.' + rn.slice(-4)) + '@student.kuleuven.be' };
      if (/@/.test(idf)) return { uid: 'R08' + String(Math.abs(idf.split('').reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 100000).padStart(5, '0'), email: idf };
      return null;
    }
    if (p === '/reservations' && method === 'GET') return getRes();
    if (p === '/reservations' && method === 'POST') {
      const list = getRes();
      list.push({ id: 'r' + Date.now(), resourceId: body.resourceId, resourceName: (body.summary && /\*\*(.+?)\*\*/.exec(body.summary[0]) || [])[1] || body.resourceName, startDate: body.startDate, startTime: body.startTime, endDate: body.endDate, endTime: body.endTime, status: 'Booked' });
      setRes(list);
      return { ok: true };
    }
    if ((m = /^\/reservations\/([^/]+)$/.exec(p)) && method === 'DELETE') { setRes(getRes().filter((x) => x.id !== decodeURIComponent(m[1]))); return null; }
    if (p === '/validations') {
      const list = getRes();
      const r = list.find((x) => x.resourceId === Number(body.resourceId));
      if (!r) return { status: 11, messages: ['Er is geen reservatie voor deze plaats.'] };
      if (body.action === 10) { r.status = 'CheckedIn'; setRes(list); return { status: 10, messages: [`Welkom! Je bent ingecheckt op **${r.resourceName}**.`, `Je plaats is voor jou tot **${r.endTime}**. Veel studieplezier.`] }; }
      r.status = 'CheckedOut'; setRes(list.filter((x) => x !== r));
      return { status: 14, messages: [`Je bent uitgecheckt. **${r.resourceName}** is weer vrij voor een ander.`] };
    }
    return undefined;
  }

  /* ================================================================ Toledo course pages (Blackboard) */
  const T = (n) => NOW - n * H;
  const file = (id, title, name, kb, ago, mime) => ({ id, title, modifiedDate: T(ago), contentHandler: 'resource/x-bb-file', contentDetail: { 'resource/x-bb-file': { file: { fileName: name, mimeType: mime || 'application/pdf', fileSize: kb * 1024, permanentUrl: '/bbcswebdav/demo/' + name } } } });
  const folder = (id, title, ago, d) => ({ id, title, modifiedDate: T(ago), contentHandler: 'resource/x-bb-folder', contentDetail: { 'resource/x-bb-folder': { isFolder: true } }, description: d || '' });
  const link = (id, title, url, ago) => ({ id, title, modifiedDate: T(ago), contentHandler: { id: 'resource/x-bb-externallink', url }, contentDetail: { 'resource/x-bb-externallink': { url } } });
  const lti = (id, title, ago) => ({ id, title, modifiedDate: T(ago), contentHandler: 'resource/x-bb-blti-link' });
  const task = (id, title, ago) => ({ id, title, modifiedDate: T(ago), contentHandler: 'resource/x-bb-asmt-test-link' });
  const doc = (id, title, ago, html) => ({ id, title, modifiedDate: T(ago), contentHandler: 'resource/x-bb-document', body: html });
  function courseTree(c) {
    const p = c.pk;
    const ch = c.code === 'HAW22B' ? 7 : 6;
    return {
      ROOT: [
        doc('_10_1', 'Welkom bij ' + c.t, 900, `<p>Welkom! Hier vind je de slides, oefeningen, kennisclips en praktische info voor <b>${c.t}</b>. Vragen stel je best in het forum of tijdens de vragensessies.</p>`),
        folder('_11_1', 'Slides', 2.5, 'Per hoofdstuk, na elk hoorcollege'),
        folder('_12_1', 'Oefeningen en oplossingen', 30),
        folder('_13_1', 'Kennisclips en opnames', 60),
        task('_703_1', c.code === 'HAW23C' ? 'Huistaak 3: meervoudige regressie' : 'Opdracht inleveren', 100),
        link('_14_1', 'Studiewijzer en ECTS-fiche', 'https://onderwijsaanbod.kuleuven.be/', 900),
        lti('_15_1', 'Weblectures (Kaltura)', 70),
        folder('_16_1', 'Examen: info en proefexamen', 175),
      ],
      _11_1: Array.from({ length: ch }, (_, i) => file('_2' + i + '_1', `Hoofdstuk ${ch - i}: slides`, `H${ch - i}_slides.pdf`, 1800 + i * 310, 2.5 + i * 168)),
      _12_1: [file('_31_1', 'Oefenbundel deel 2', 'Oefenbundel_deel2.pdf', 920, 30), file('_32_1', 'Oplossingen hoofdstuk 4', 'Oplossingen_H4.pdf', 410, 120), file('_33_1', 'Dataset oefening', 'Dataset_oefening.xlsx', 85, 200, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')],
      _13_1: [lti('_41_1', 'Kennisclip: prijsdiscriminatie (12 min)', 150), lti('_42_1', 'Opname hoorcollege week 9', 60), lti('_43_1', 'Opname hoorcollege week 8', 228)],
      _16_1: [file('_51_1', 'Proefexamen met oplossingen', 'Proefexamen.pdf', 300, 175), doc('_52_1', 'Praktische info examen', 175, '<p>Het examen is schriftelijk. Breng je studentenkaart mee.</p>')],
    };
  }
  function ultra(path, q) {
    let m;
    if (/^\/learn\/api\/public\/v1\/users\/me/.test(path)) return { id: '_777_1', userName: 'q0789012', studentId: '00789012' };
    if ((m = /^\/learn\/api\/public\/v3\/courses\/courseId:(.+)$/.exec(path))) { const lu = decodeURIComponent(m[1]); const c = C.find((x) => x.lu === lu); return c && { id: c.pk, name: c.t, courseId: c.lu }; }
    if ((m = /^\/learn\/api\/public\/v3\/courses\/(_\d+_\d+)$/.exec(path))) { const c = C.find((x) => x.pk === m[1]); return c && { id: c.pk, name: `${c.t} [${c.code}]`, courseId: c.lu }; }
    if ((m = /^\/learn\/api\/(?:public\/)?v1\/courses\/(_\d+_\d+)\/contents(?:\/([^/]+)\/children)?$/.exec(path))) {
      const c = C.find((x) => x.pk === m[1]); if (!c) return null;
      const tree = courseTree(c);
      return { results: (tree[m[2] || 'ROOT'] || []).map((x) => Object.assign({ parentId: m[2] || 'ROOT', visibility: 'VISIBLE' }, x)) };
    }
    if ((m = /^\/learn\/api\/v1\/courses\/(_\d+_\d+)\/contents\/([^/]+)$/.exec(path))) {
      const c = C.find((x) => x.pk === m[1]); const tree = courseTree(c);
      for (const k of Object.keys(tree)) { const x = tree[k].find((y) => y.id === m[2]); if (x) return Object.assign({ parentId: k }, x); }
      return null;
    }
    if ((m = /^\/learn\/api\/public\/v1\/courses\/(_\d+_\d+)\/announcements$/.exec(path))) {
      const c = C.find((x) => x.pk === m[1]);
      return { results: [
        { id: '_a1_1', title: c.code === 'HAW21A' ? 'Extra vragensessie voor het examen' : 'Planning van de komende weken', body: '<p>Beste studenten,</p><p>Op vrijdag organiseren we een extra vragensessie in de oefenzitting. Bereid je vragen voor via het forum, dan nemen we ze samen door.</p><p>Tot dan!</p>', created: new Date(NOW - 0.6 * H).toISOString() },
        { id: '_a2_1', title: 'Proefexamen staat online', body: '<p>Het proefexamen en de oplossingen staan bij Examen: info en proefexamen.</p>', created: new Date(NOW - 175 * H).toISOString() },
      ] };
    }
    if ((m = /^\/learn\/api\/public\/v2\/courses\/(_\d+_\d+)\/gradebook\/columns$/.exec(path))) {
      return { results: [
        { id: '_g1_1', name: 'Tussentijdse test', score: { possible: 20 }, grading: { due: new Date(NOW - 14 * 24 * H).toISOString() } },
        { id: '_g2_1', name: 'Huistaak 2', score: { possible: 10 }, grading: { due: new Date(NOW - 20 * 24 * H).toISOString() } },
        { id: '_g3_1', name: 'Huistaak 3', score: { possible: 10 }, contentId: '_703_1', grading: { due: new Date(NOW + 8 * 24 * H).toISOString() } },
      ] };
    }
    if (/\/gradebook\/users\//.test(path)) return { results: [{ columnId: '_g1_1', displayGrade: { score: 15.5, possible: 20 } }, { columnId: '_g2_1', displayGrade: { score: 8, possible: 10 } }] };
    if (/\/attempts/.test(path)) return { results: [] };
    if (/\/attachments$/.test(path)) return { results: [] };
    return undefined;
  }

  /* ================================================================ the network */
  const portal = (p) => {
    if (p === 'user') return { givenName: ME.first, familyName: ME.last, userId: 'q0789012' };
    if (p === 'enrollments') return enrollments;
    if (p === 'events') { const read = (lsg('p:events') || {}).v || []; return evs.map((e) => { const o = read.find((x) => x.id === e.id); return o && o.read ? Object.assign({}, e, { read: true }) : e; }); }
    if (p === 'upcoming') return [];
    if (p === 'links') return [];
    if (p === 'emails/unread') return { value: 4 };
    return undefined;
  };
  const VERSION_INFO = () => ({ version: '4.21.0', news: { '4.21.0': ['Studieplek: zie meteen welke groepsruimtes de hele namiddag vrij zijn.', 'Rooster: tik op een lokaal voor de route.', 'Alles opent nog wat sneller.'] } });
  const realFetch = W.fetch.bind(W);
  const json = (v, st) => new Response(v === null ? null : JSON.stringify(v), { status: st || (v === null ? 204 : 200), headers: { 'content-type': 'application/json' } });
  W.fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' ? input : input.url, fake().href);
    const method = ((init && init.method) || 'GET').toUpperCase();
    let body = null;
    try { body = init && init.body ? JSON.parse(init.body) : null; } catch (_) {}
    await new Promise((r) => setTimeout(r, 60 + Math.random() * 120));
    let v;
    if (url.hostname === 'toledo.kuleuven.be' && url.pathname.startsWith('/portal/api/')) {
      if (method !== 'GET') return json(null);
      v = portal(url.pathname.slice(12));
    } else if (url.hostname === 'kurt3.ghum.kuleuven.be') v = kurt(url.pathname, url.searchParams, method, body);
    else if (url.hostname === 'ultra.edu.kuleuven.cloud') v = ultra(url.pathname, url.searchParams);
    else if (/api\.github\.com$/.test(url.hostname) && /version\.json/.test(url.pathname)) return new Response(JSON.stringify(VERSION_INFO()), { status: 200 });
    else if (url.origin === location.origin) return realFetch(input, init);
    if (v === undefined) { console.warn('[demo] geen nepdata voor', method, url.href); return new Response('{}', { status: 404, headers: { 'content-type': 'application/json' } }); }
    return json(v);
  };
  // the update banner stays out of the way in the demo, unless asked for (?upd=1)
  if (W.__TM_UPD_TEST__) { try { localStorage.removeItem('tm4:upd'); localStorage.removeItem('tm4:upd-later'); localStorage.removeItem('tm4:apiwait'); } catch (_) {} }
})();
