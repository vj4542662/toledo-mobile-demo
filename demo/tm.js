

/*
  Toledo Mobile 4 for iPhone (Userscripts extension in Safari).
  - toledo.kuleuven.be/portal/ becomes the app: Vandaag, Vakken, Rooster, Updates, Meer.
  - A course opens on ultra.edu.kuleuven.cloud/ultra/app: content, announcements and grades. PDFs, files and weblectures open directly.
  - The timetable and exams come from KU Loket (same KU Leuven sign-in), read in a hidden frame.
  - Pages the app doesn't cover (submitting an assignment, tests, KU Loket apps) keep the phone layout of version 3.
  - KURT (study places, kurt3.ghum.kuleuven.be) becomes an app screen: libraries with live occupancy, rooms with free seats, and the floor plan to tap a seat and book it.
  - Alma (www.alma.be, the student restaurants) becomes an app screen: the menu of your own Alma with prices, hours and filters.
  - The KU Leuven sign-in page gets an app look, and "Log in via KU Leuven Authenticator" opens the
    Authenticator app straight away. The script never reads or fills in your username or password there.
  - The update page on GitHub (this file) shows simple steps instead of code, and the app checks GitHub's small
    version.json now and then so it can show a notification as soon as there is a new version.
  - While the app is open, Toledo, Blackboard and KU Loket get a small request every few minutes so their sessions don't time out.
  Everything uses your own session in your own browser. The only thing sent elsewhere: once a day a random,
  anonymous install id plus the version number, so the author can count how many people use the script.
*/
(() => {
  'use strict';
  if (window.__TM4__) return;
  window.__TM4__ = true;
  const CSS = "html.tm4{-webkit-text-size-adjust:100%;text-size-adjust:100%;color-scheme:light dark;\n--bg:#f2f2f7;--card:#fff;--raised:#fff;--text:#000;--sub:#6d6d72;--ter:#c3c3c8;--tabi:#9a9aa0;--sep:rgba(60,60,67,.18);\n--fill:rgba(118,118,128,.12);--fill2:rgba(118,118,128,.2);--press:rgba(0,0,0,.07);\n--accent:#0a6cd6;--red:#ff3b30;--orange:#ff9500;--green:#30b955;--bar:rgba(246,246,248,.84);--sheet:rgba(249,249,251,.97);\n--hero1:#17508a;--hero2:#0b2c52;--shadow:0 1px 2px rgba(0,0,0,.04),0 4px 14px rgba(0,0,0,.05);\n--font:-apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Helvetica Neue\",system-ui,sans-serif;\n--nav:44px;--tab:50px;--st:env(safe-area-inset-top,0px);--sb:env(safe-area-inset-bottom,0px)}\nhtml.tm4.dark{color-scheme:dark;--bg:#000;--card:#1c1c1e;--raised:#636366;--text:#fff;--sub:#98989f;--ter:#4a4a4e;--tabi:#8b8b90;\n--sep:rgba(84,84,88,.62);--fill:rgba(118,118,128,.24);--fill2:rgba(118,118,128,.36);--press:rgba(255,255,255,.09);\n--accent:#409cff;--bar:rgba(20,20,22,.82);--sheet:rgba(44,44,46,.97);--hero1:#18497a;--hero2:#0a2342;--shadow:none}\n@media (prefers-color-scheme:dark){html.tm4:not(.light){--bg:#000;--card:#1c1c1e;--raised:#636366;--text:#fff;--sub:#98989f;--ter:#4a4a4e;--tabi:#8b8b90;\n--sep:rgba(84,84,88,.62);--fill:rgba(118,118,128,.24);--fill2:rgba(118,118,128,.36);--press:rgba(255,255,255,.09);\n--accent:#409cff;--bar:rgba(20,20,22,.82);--sheet:rgba(44,44,46,.97);--hero1:#18497a;--hero2:#0a2342;--shadow:none}}\nhtml.tm4.light{color-scheme:light}\nhtml.tm4,html.tm4 body{margin:0;background:var(--bg);color:var(--text);font:17px/1.3 var(--font);-webkit-font-smoothing:antialiased}\nhtml.tm4 body{min-height:100vh;padding:calc(var(--st) + var(--nav)) 0 calc(var(--sb) + var(--tab) + 30px);-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}\nhtml.tm4 body.no-tabs{padding-bottom:calc(var(--sb) + 30px)}\nhtml.tm4 *,html.tm4 *::before,html.tm4 *::after{box-sizing:border-box}\nhtml.tm4 a{color:inherit;text-decoration:none}\nhtml.tm4 button{font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;-webkit-appearance:none;appearance:none;text-align:inherit}\nhtml.tm4 [hidden]{display:none!important}\nhtml.tm4 body > :not([data-tm4]){display:none!important}\n.tm4 .i{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:none;display:block}\n.tm4 .nav{position:fixed;z-index:60;top:0;left:0;right:0;height:calc(var(--st) + var(--nav));padding:var(--st) 4px 0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;\ntransition:background-color .2s,box-shadow .2s}\n.tm4 .nav.scrolled{background:var(--bar);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);box-shadow:0 .5px 0 var(--sep)}\n.tm4 .nav-l{justify-self:start;display:flex;min-width:0}\n.tm4 .nav-r{justify-self:end;display:flex;min-width:0}\n.tm4 .nav-t{font-weight:600;font-size:17px;max-width:56vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:0;transform:translateY(4px);transition:opacity .18s,transform .18s}\n.tm4 .nav.titled .nav-t,.tm4 .nav.always .nav-t{opacity:1;transform:none}\n.tm4 .nb{display:inline-flex;align-items:center;gap:3px;height:44px;padding:0 10px;color:var(--accent);font-size:17px;max-width:44vw;white-space:nowrap}\n.tm4 .nb span{overflow:hidden;text-overflow:ellipsis}\n.tm4 .nb .i{width:24px;height:24px}\n.tm4 .nb.back{padding-left:6px}\n.tm4 .nb.back .i{width:14px;height:22px;stroke-width:2.6}\n.tm4 .nb.pressed{opacity:.35}\n.tm4 .lt{padding:2px 20px 12px}\n.tm4 .lt h1{margin:0;font-size:34px;line-height:40px;font-weight:700;letter-spacing:.2px;overflow-wrap:anywhere}\n.tm4 .lt h1.long{font-size:28px;line-height:33px}\n.tm4 .lt-sub{margin:3px 0 0;color:var(--sub);font-size:15px;line-height:20px}\n.tm4 [style*=\"--c:\"]{--cd:var(--cd-l,var(--c))}\n.tm4.dark [style*=\"--c:\"]{--cd:var(--cd-d,var(--c))}\n@media (prefers-color-scheme:dark){.tm4:not(.light) [style*=\"--c:\"]{--cd:var(--cd-d,var(--c))}}\n.tm4 .lt-kicker{display:inline-flex;align-items:center;gap:6px;margin:0 0 6px;padding:3px 9px;border-radius:7px;font-size:13px;font-weight:600;\ncolor:var(--cd,var(--accent));background:color-mix(in srgb,var(--c,var(--accent)) 16%,transparent)}\n.tm4 .view{display:none}\n.tm4 .view.on{display:block}\n.tm4 .view.push{animation:tm-push .34s cubic-bezier(.2,.85,.25,1)}\n.tm4 .view.pop{animation:tm-pop .3s cubic-bezier(.2,.85,.25,1)}\n.tm4 .view.fade{animation:tm-fade .18s ease-out}\n@keyframes tm-push{from{transform:translate3d(32%,0,0);opacity:0}to{transform:none;opacity:1}}\n@keyframes tm-pop{from{transform:translate3d(-14%,0,0);opacity:0}to{transform:none;opacity:1}}\n@keyframes tm-fade{from{opacity:0}to{opacity:1}}\n.tm4 .appear{animation:tm-fade .22s ease-out}\n.tm4 #tm-main{transition:transform .34s cubic-bezier(.2,.85,.25,1),opacity .34s ease}\n.tm4.tm-leave-fwd #tm-main{transform:translate3d(-9%,0,0);opacity:.4}\n.tm4.tm-leave-back #tm-main{transform:translate3d(9%,0,0);opacity:.4}\n.tm4.tm-leaving #tm-main{pointer-events:none}\n.tm4.tm-arrive #tm-main{animation:tm-fade .2s ease-out}\n.tm4.tm-arrive-fwd #tm-main{animation:tm-push .36s cubic-bezier(.2,.85,.25,1)}\n.tm4.tm-arrive-back #tm-main{animation:tm-pop .32s cubic-bezier(.2,.85,.25,1)}\n.tm4 .nav::after{content:\"\";position:absolute;left:0;right:0;bottom:-1px;height:2.5px;background:var(--accent);transform:scaleX(0);transform-origin:0 50%;opacity:0;pointer-events:none}\n.tm4.tm-leaving .nav::after{opacity:1;animation:tm-load 7s cubic-bezier(.08,.75,.2,1) forwards}\n@keyframes tm-load{0%{transform:scaleX(.02)}12%{transform:scaleX(.42)}100%{transform:scaleX(.94)}}\n@media (prefers-reduced-motion:reduce){.tm4.tm-leaving .nav::after{transform:scaleX(.6)}}\n@media (prefers-reduced-motion:reduce){.tm4 *,.tm4 *::before,.tm4 *::after{animation:none!important;transition:none!important}}\n.tm4 .sh{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:26px 20px 9px}\n.tm4 .sh h2{margin:0;font-size:22px;line-height:27px;font-weight:700;letter-spacing:.1px}\n.tm4 .sh a,.tm4 .sh button{flex:none;font-size:16px;color:var(--accent)}\n.tm4 .sh-note{flex:none;font-size:15px;color:var(--sub)}\n.tm4 .gh{margin:24px 36px 7px;font-size:13px;line-height:18px;color:var(--sub);text-transform:uppercase;letter-spacing:.3px}\n.tm4 .gf{margin:7px 36px 0;font-size:13px;line-height:18px;color:var(--sub)}\n.tm4 .gf a,.tm4 .gf button{color:var(--accent)}\n.tm4 .group{margin:0 16px;background:var(--card);border-radius:12px;overflow:hidden;--inset:58px}\n.tm4 .group.plain{--inset:16px}\n.tm4 .group + .group{margin-top:16px}\n.tm4 .row{position:relative;display:flex;align-items:center;gap:12px;width:100%;min-height:46px;padding:9px 14px 9px 16px;transition:background-color .12s}\n.tm4 .row + .row::before,.tm4 .row + .sub::before,.tm4 .grp-h + .row::before,.tm4 .row + .grp-h::before,.tm4 .sub + .grp-h::before{content:\"\";position:absolute;top:0;right:0;left:var(--inset);height:.5px;background:var(--sep)}\n.tm4 .row.pressed,.tm4 .ann.pressed,.tm4 .lesson.pressed{background:var(--press);transition:none}\n.tm4 .ic{flex:none;width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:var(--c,var(--accent));color:var(--ct,#fff)}\n.tm4 .ic .i{width:19px;height:19px;stroke-width:2}\n.tm4 .ic.soft{background:color-mix(in srgb,var(--c,var(--accent)) 16%,transparent);color:var(--cd,var(--c,var(--accent)))}\n.tm4 .ic.txt{font-size:12px;font-weight:700;letter-spacing:.2px}\n.tm4 .fi{flex:none;width:30px;height:30px;border-radius:7px;display:grid;place-items:center;background:var(--c);color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.3px}\n.tm4 .main{flex:1;min-width:0}\n.tm4 .t{display:block;font-size:17px;line-height:22px;overflow-wrap:anywhere}\n.tm4 .t.b{font-weight:600}\n.tm4 .s{display:block;margin-top:1px;font-size:14px;line-height:19px;color:var(--sub);overflow:hidden;text-overflow:ellipsis}\n.tm4 .s.one{white-space:nowrap}\n.tm4 .clamp2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.tm4 .end{flex:none;display:flex;align-items:center;gap:8px;color:var(--sub);font-size:15px}\n.tm4 .chev{width:8px;height:14px;fill:none;stroke:var(--ter);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}\n.tm4 .ext{width:15px;height:15px;stroke:var(--ter);stroke-width:2.2}\n.tm4 .dot{width:9px;height:9px;border-radius:50%;background:var(--accent);flex:none}\n.tm4 .row .dot.lead{position:absolute;left:5px;top:50%;margin-top:-4.5px;width:7px;height:7px}\n.tm4 .cap{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:11px;background:var(--fill);color:var(--sub);font-size:13px;font-weight:600;white-space:nowrap}\n.tm4 .cap.blue{background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent)}\n.tm4 .cap.red{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red)}\n.tm4 .cap.orange{background:color-mix(in srgb,var(--orange) 16%,transparent);color:#c46a00}\n.tm4.dark .cap.orange{color:var(--orange)}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .cap.orange{color:var(--orange)}}\n.tm4 .row.sub{padding-left:58px;min-height:44px}\n.tm4 .row.sub .fi{width:26px;height:26px;font-size:8.5px}\n.tm4 .grp-h{position:relative;display:flex;align-items:center;gap:12px;padding:11px 16px 4px}\n.tm4 .grp-h .t{font-weight:600}\n.tm4 .row.off{opacity:.5}\n.tm4 .row.note .s{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.tm4 .more-row{display:block;width:100%;padding:13px 16px;color:var(--accent);font-size:16px;text-align:center}\n.tm4 .row + .more-row{border-top:.5px solid var(--sep)}\n.tm4 .tabbar{position:fixed;z-index:60;left:0;right:0;bottom:0;display:flex;height:calc(var(--tab) + var(--sb));padding:0 2px var(--sb);\nbackground:var(--bar);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);box-shadow:0 -.5px 0 var(--sep)}\n.tm4 .tabbar a{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding-top:1px;color:var(--tabi);font-size:10.5px;font-weight:500;letter-spacing:.1px}\n.tm4 .tabbar a.on{color:var(--accent)}\n.tm4 .tabbar .i{width:27px;height:27px;stroke-width:1.7}\n.tm4 .tabbar a.on .i{stroke-width:2.1}\n.tm4 .tabbar a.pressed{opacity:.55}\n.tm4 .badge{display:inline-grid;place-items:center;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:var(--red);color:#fff;font-size:12px;font-weight:600;line-height:1}\n.tm4 .tabbar .badge{position:absolute;top:3px;left:calc(50% + 5px)}\n.tm4 .seg{position:relative;display:flex;margin:0 16px 14px;padding:2px;border-radius:9px;background:var(--fill)}\n.tm4 .seg button{position:relative;z-index:1;flex:1;height:30px;border-radius:7px;font-size:13.5px;font-weight:500;text-align:center;color:var(--text)}\n.tm4 .seg button.on{font-weight:600}\n.tm4 .seg .thumb{position:absolute;z-index:0;top:2px;bottom:2px;left:2px;border-radius:7px;background:var(--raised);\nbox-shadow:0 3px 8px rgba(0,0,0,.12),0 3px 1px rgba(0,0,0,.04);transition:transform .28s cubic-bezier(.3,.75,.25,1)}\n.tm4 .search{display:flex;align-items:center;gap:6px;height:38px;margin:0 16px 14px;padding:0 8px;border-radius:10px;background:var(--fill);color:var(--sub)}\n.tm4 .search .i{width:19px;height:19px;stroke-width:2.2}\n.tm4 .search input{flex:1;min-width:0;height:100%;border:0;outline:0;background:transparent;color:var(--text);font:17px var(--font);-webkit-appearance:none;appearance:none}\n.tm4 .search input::placeholder{color:var(--sub)}\n.tm4 .search input::-webkit-search-cancel-button{display:none}\n.tm4 .search .clr{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--sub);color:var(--bg);font-size:13px;font-weight:700;line-height:1}\n.tm4 .chips{display:flex;gap:8px;overflow-x:auto;padding:0 16px 14px;scrollbar-width:none;-webkit-overflow-scrolling:touch}\n.tm4 .chips::-webkit-scrollbar{display:none}\n.tm4 .chip{flex:none;height:34px;padding:0 14px;border-radius:17px;background:var(--fill);font-size:15px;font-weight:500;white-space:nowrap}\n.tm4 .chip.on{background:var(--text);color:var(--bg)}\n.tm4 .chip.pressed{opacity:.6}\n.tm4 .hero{position:relative;display:block;margin:2px 16px 0;padding:16px 16px 15px;border-radius:20px;color:#fff;overflow:hidden;\nbackground:linear-gradient(140deg,var(--hero1),var(--hero2));box-shadow:0 8px 24px rgba(11,44,82,.22)}\n.tm4 .hero::after{content:\"\";position:absolute;right:-40px;top:-60px;width:180px;height:180px;border-radius:50%;background:var(--c,#3a86d6);opacity:.35;filter:blur(30px)}\n.tm4 .hero > *{position:relative;z-index:1}\n.tm4 .hero.pressed{transform:scale(.985);transition:transform .12s}\n.tm4 .hero-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}\n.tm4 .hero-lbl{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;opacity:.9}\n.tm4 .hero-lbl i{width:8px;height:8px;border-radius:50%;background:var(--c,#7fc1ff);box-shadow:0 0 0 3px rgba(255,255,255,.18)}\n.tm4 .hero-lbl.live i{background:#4cd964;animation:tm-pulse 1.8s infinite}\n@keyframes tm-pulse{0%,100%{box-shadow:0 0 0 0 rgba(76,217,100,.55)}60%{box-shadow:0 0 0 7px rgba(76,217,100,0)}}\n.tm4 .hero-cd{font-size:14px;font-weight:600;padding:4px 10px;border-radius:12px;background:rgba(255,255,255,.17);white-space:nowrap}\n.tm4 .hero-title{font-size:24px;line-height:29px;font-weight:700;letter-spacing:.1px}\n.tm4 .hero-meta{display:flex;flex-wrap:wrap;gap:4px 14px;margin-top:6px;font-size:15px;opacity:.92}\n.tm4 .hero-meta span{display:inline-flex;align-items:center;gap:5px}\n.tm4 .hero-meta .i{width:16px;height:16px;stroke-width:2}\n.tm4 .hero-prog{height:4px;margin-top:12px;border-radius:2px;background:rgba(255,255,255,.22);overflow:hidden}\n.tm4 .hero-prog i{display:block;height:100%;border-radius:2px;background:#fff}\n.tm4 .hero-acts{display:flex;flex-wrap:nowrap;gap:6px;margin-top:13px}\n.tm4 .hero-acts a,.tm4 .hero-acts button{flex:0 1 auto;min-width:0;overflow:hidden;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;height:31px;padding:0 11px;border-radius:16px;background:rgba(255,255,255,.18);color:#fff;font-size:14px;font-weight:600}\n.tm4 .hero-acts a.pri{background:#fff;color:#0b2c52}\n.tm4 .hero-acts .i{flex:none;width:15px;height:15px;stroke-width:2.1}\n@media (max-width:380px){.tm4 .hero-acts{gap:5px}.tm4 .hero-acts a,.tm4 .hero-acts button{padding:0 9px;gap:4px;font-size:13.5px}}\n.tm4 .hero.calm{background:var(--card);color:var(--text);box-shadow:var(--shadow)}\n.tm4 .hero.calm::after{display:none}\n.tm4 .hero.calm .hero-cd{background:var(--fill)}\n.tm4 .tiles{display:flex;gap:10px;overflow-x:auto;padding:0 16px 2px;scroll-snap-type:x mandatory;scroll-padding:0 16px;scrollbar-width:none}\n.tm4 .tiles::-webkit-scrollbar{display:none}\n.tm4 .tile{flex:none;width:148px;height:92px;padding:11px 12px;border-radius:16px;scroll-snap-align:start;display:flex;flex-direction:column;justify-content:space-between;\nbackground:color-mix(in srgb,var(--c) 15%,var(--card));box-shadow:inset 0 0 0 .5px color-mix(in srgb,var(--c) 30%,transparent)}\n.tm4 .tile.pressed{transform:scale(.97);transition:transform .12s}\n.tm4 .tile b{font-size:15px;line-height:19px;font-weight:600;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.tm4 .tile span{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;font-weight:600;color:var(--cd,var(--c))}\n.tm4 .tile .cap{height:20px;padding:0 7px;font-size:12px;background:var(--c);color:var(--ct,#fff)}\n.tm4 .lesson{position:relative;display:flex;gap:12px;align-items:stretch;padding:12px 14px 12px 16px}\n.tm4 .lesson + .lesson::before{content:\"\";position:absolute;top:0;right:0;left:86px;height:.5px;background:var(--sep)}\n.tm4 .lesson .tm{flex:none;width:46px;text-align:right;padding-top:1px}\n.tm4 .lesson .tm b{display:block;font-size:15px;line-height:20px;font-weight:600;font-variant-numeric:tabular-nums}\n.tm4 .lesson .tm span{display:block;font-size:13px;line-height:18px;color:var(--sub);font-variant-numeric:tabular-nums}\n.tm4 .lesson .bar{flex:none;width:4px;border-radius:2px;background:var(--c,var(--accent))}\n.tm4 .lesson .main .t{font-weight:600}\n.tm4 .lesson .meta{display:flex;flex-wrap:wrap;gap:2px 12px;margin-top:3px;font-size:14px;line-height:19px;color:var(--sub)}\n.tm4 .lesson .meta a{display:inline-flex;align-items:center;gap:4px;color:var(--accent)}\n.tm4 .lesson .meta .i{width:14px;height:14px;stroke-width:2.1}\n.tm4 .lesson.now{background:color-mix(in srgb,var(--c,var(--accent)) 9%,transparent)}\n.tm4 .lesson.past{opacity:.5}\n.tm4 .exam-tag{display:inline-block;margin-right:6px;padding:1px 6px;border-radius:6px;background:var(--red);color:#fff;font-size:11px;font-weight:700;vertical-align:2px;letter-spacing:.3px}\n.tm4 .lesson.exam-l .bar{background:var(--red)}\n.tm4 .now-tag{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;background:#30b955;color:#fff;font-size:11.5px;font-weight:700;vertical-align:2px;letter-spacing:.3px}\n.tm4 .wk-head{display:flex;align-items:center;justify-content:space-between;margin:0 10px 4px 20px}\n.tm4 .wk-head b{font-size:17px;font-weight:600}\n.tm4 .wk-head .btns{display:flex;align-items:center}\n.tm4 .wk-head button{display:grid;place-items:center;min-width:40px;height:40px;color:var(--accent);font-size:16px}\n.tm4 .wk-head button .i{width:22px;height:22px;stroke-width:2.2}\n.tm4 .wk-head .today-btn{padding:0 10px;font-weight:500}\n.tm4 .week{display:flex;padding:0 10px 10px;touch-action:pan-y}\n.tm4 .wd{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:2px 0}\n.tm4 .wd small{font-size:11px;font-weight:600;color:var(--sub);text-transform:uppercase}\n.tm4 .wd b{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;font-size:18px;font-weight:500;font-variant-numeric:tabular-nums;transition:background-color .15s,color .15s}\n.tm4 .wd i{width:5px;height:5px;border-radius:50%;background:var(--sub);opacity:0}\n.tm4 .wd.has i{opacity:.7}\n.tm4 .wd.today b{color:var(--red);font-weight:600}\n.tm4 .wd.sel b{background:var(--text);color:var(--bg);font-weight:600}\n.tm4 .wd.today.sel b{background:var(--red);color:#fff}\n.tm4 .wd.we small,.tm4 .wd.we b{opacity:.55}\n.tm4 .wk-sticky{position:sticky;z-index:20;top:calc(var(--st) + var(--nav));background:var(--bg);padding-top:2px;box-shadow:0 .5px 0 var(--sep)}\n.tm4 .lt-next{display:flex;align-items:center;gap:6px;margin-top:6px;color:var(--cd,var(--sub));font-weight:500}\n.tm4 .lt-next .i{width:16px;height:16px;stroke-width:2.1}\n.tm4 .day-title{scroll-margin-top:150px;margin:18px 20px 8px;font-size:15px;font-weight:600;color:var(--sub)}\n.tm4 .day-wrap{touch-action:pan-y;min-height:200px}\n.tm4 .slide-l{animation:tm-sl .24s cubic-bezier(.2,.85,.25,1)}\n.tm4 .slide-r{animation:tm-sr .24s cubic-bezier(.2,.85,.25,1)}\n@keyframes tm-sl{from{transform:translate3d(18%,0,0);opacity:0}to{transform:none;opacity:1}}\n@keyframes tm-sr{from{transform:translate3d(-18%,0,0);opacity:0}to{transform:none;opacity:1}}\n.tm4 .exam{position:relative;display:flex;gap:14px;align-items:center;padding:13px 14px 13px 16px}\n.tm4 .exam + .exam::before{content:\"\";position:absolute;top:0;right:0;left:82px;height:.5px;background:var(--sep)}\n.tm4 .dt{flex:none;width:52px;padding:5px 0 6px;border-radius:12px;text-align:center;background:var(--fill)}\n.tm4 .dt small{display:block;font-size:11px;line-height:14px;font-weight:700;color:var(--red);text-transform:uppercase;letter-spacing:.3px}\n.tm4 .dt b{display:block;font-size:24px;line-height:28px;font-weight:600;font-variant-numeric:tabular-nums}\n.tm4 .dt em{display:block;font-size:11px;line-height:13px;font-style:normal;color:var(--sub);text-transform:uppercase}\n.tm4 .exam .t{font-weight:600}\n.tm4 .exam .s a{display:inline-flex;align-items:center;gap:4px;color:var(--accent)}\n.tm4 .exam .s a .i{width:14px;height:14px;stroke-width:2.1}\n.tm4 .card{margin:0 16px;padding:16px;border-radius:14px;background:var(--card)}\n.tm4 .ann{display:block;margin:0 16px 12px;padding:14px 16px;border-radius:14px;background:var(--card);transition:background-color .12s}\n.tm4 .ann-top{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:13px;color:var(--sub)}\n.tm4 .ann h3{margin:0;font-size:17px;line-height:22px;font-weight:600}\n.tm4 .ann .body{position:relative;margin-top:6px;font-size:16px;line-height:1.45;max-height:7.25em;overflow:hidden}\n.tm4 .ann.clamped .body::after{content:\"\";position:absolute;left:0;right:0;bottom:0;height:2.2em;background:linear-gradient(transparent,var(--card))}\n.tm4 .ann.open .body{max-height:none}\n.tm4 .ann.open .body::after{display:none}\n.tm4 .ann .more{display:none;margin-top:6px;color:var(--accent);font-size:15px;font-weight:500}\n.tm4 .ann.clamped .more{display:inline-block}\n.tm4 .ann.open .more{display:inline-block}\n.tm4 .ann.hl{box-shadow:0 0 0 2px var(--accent)}\n.tm4 .teaser{display:flex;gap:12px;align-items:flex-start;margin:0 16px 4px;padding:13px 14px;border-radius:14px;background:color-mix(in srgb,var(--c,var(--accent)) 11%,var(--card))}\n.tm4 .teaser .ic{background:var(--c,var(--accent))}\n.tm4 .teaser .t{font-weight:600;font-size:16px;line-height:21px}\n.tm4 .teaser .s{font-size:14.5px;line-height:19px;margin-top:2px;color:var(--text);opacity:.75}\n.tm4 .teaser.pressed{filter:brightness(.96)}\n.tm4 .rt{font-size:16.5px;line-height:1.5;overflow-wrap:anywhere}\n.tm4 .rt > :first-child{margin-top:0}\n.tm4 .rt > :last-child{margin-bottom:0}\n.tm4 .rt p{margin:0 0 11px}\n.tm4 .rt h3,.tm4 .rt h4,.tm4 .rt h5,.tm4 .rt h6{margin:18px 0 8px;font-size:18px;line-height:23px}\n.tm4 .rt ul,.tm4 .rt ol{margin:0 0 11px;padding-left:22px}\n.tm4 .rt li{margin:3px 0}\n.tm4 .rt a{color:var(--accent);text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--accent) 35%,transparent);text-underline-offset:2px}\n.tm4 .rt img{max-width:100%;height:auto;border-radius:10px}\n.tm4 .rt table{display:block;max-width:100%;overflow-x:auto;border-collapse:collapse;font-size:14.5px;margin:0 0 11px}\n.tm4 .rt td,.tm4 .rt th{border:.5px solid var(--sep);padding:6px 8px;vertical-align:top}\n.tm4 .rt blockquote{margin:0 0 11px;padding-left:12px;border-left:3px solid var(--sep);color:var(--sub)}\n.tm4 .rt hr{border:0;border-top:.5px solid var(--sep);margin:14px 0}\n.tm4 .rt pre{white-space:pre-wrap;font-size:14px}\n.tm4 .rt .frow{display:flex;align-items:center;gap:12px;margin:10px 0;padding:11px 12px;border-radius:12px;background:var(--fill);text-decoration:none;color:var(--text)}\n.tm4 .rt .frow .t{font-size:16px;line-height:20px;font-weight:600}\n.tm4 .rt .frow .s{font-size:13.5px}\n.tm4 .rt .frow.pressed{background:var(--fill2)}\n.tm4 .rt .embed{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:12px;background:var(--fill);color:var(--accent);text-decoration:none;font-weight:600}\n.tm4 .doc{margin:0 16px;padding:16px;border-radius:14px;background:var(--card)}\n.tm4 .empty{padding:44px 36px;text-align:center;color:var(--sub);font-size:15px;line-height:20px}\n.tm4 .empty .i{width:44px;height:44px;margin:0 auto 10px;stroke-width:1.5;color:var(--ter)}\n.tm4 .empty b{display:block;margin-bottom:4px;color:var(--text);font-size:17px;font-weight:600}\n.tm4 .empty.small{padding:22px 24px}\n.tm4 .banner{display:flex;align-items:center;gap:12px;margin:0 16px 14px;padding:12px 14px;border-radius:12px;background:var(--card);font-size:15px;line-height:20px}\n.tm4 .banner .i{width:22px;height:22px;color:var(--orange)}\n.tm4 .banner .main{flex:1}\n.tm4 .banner button,.tm4 .banner a.act{flex:none;color:var(--accent);font-weight:600}\n.tm4 .sk{border-radius:7px;background:linear-gradient(90deg,var(--fill) 25%,var(--fill2) 50%,var(--fill) 75%);background-size:300% 100%;animation:tm-sk 1.3s ease-in-out infinite}\n@keyframes tm-sk{from{background-position:100% 0}to{background-position:0 0}}\n.tm4 .sk-row{display:flex;align-items:center;gap:12px;padding:12px 16px}\n.tm4 .sk-row .sk.ic{width:30px;height:30px;border-radius:8px}\n.tm4 .sk-row .lines{flex:1}\n.tm4 .sk-row .lines .sk{height:13px}\n.tm4 .sk-row .lines .sk + .sk{margin-top:7px;width:55%;height:11px}\n.tm4 .spin{width:26px;height:26px;margin:0 auto;border-radius:50%;border:2.5px solid var(--fill2);border-top-color:var(--sub);animation:tm-spin .8s linear infinite}\n@keyframes tm-spin{to{transform:rotate(360deg)}}\n.tm4 .center{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px;text-align:center;color:var(--sub)}\n.tm4 .center b{color:var(--text);font-size:19px}\n.tm4 .fresh{margin:18px 36px 0;font-size:13px;line-height:18px;color:var(--sub);text-align:center}\n.tm4 .fresh button,.tm4 .fresh a{color:var(--accent)}\n.tm4 .row .spin{width:18px;height:18px;margin:0;border-width:2px}\n.tm4 .btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;height:46px;padding:0 20px;border-radius:13px;background:var(--accent);color:#fff;font-size:17px;font-weight:600}\n.tm4 .btn.ghost{background:var(--fill);color:var(--accent)}\n.tm4 .btn.pressed{opacity:.7}\n.tm4 .btn .i{width:20px;height:20px;stroke-width:2.1}\n.tm4 .scrim{position:fixed;z-index:90;inset:0;background:rgba(0,0,0,.32);opacity:0;transition:opacity .25s}\n.tm4 .scrim.on{opacity:1}\n.tm4 .sheet{position:fixed;z-index:91;left:8px;right:8px;bottom:calc(8px + var(--sb));transform:translate3d(0,115%,0);transition:transform .34s cubic-bezier(.2,.9,.25,1)}\n.tm4 .sheet.on{transform:none}\n.tm4 .sheet .sg{overflow:hidden;border-radius:14px;background:var(--sheet);-webkit-backdrop-filter:blur(30px);backdrop-filter:blur(30px)}\n.tm4 .sheet .sg + .sg{margin-top:8px}\n.tm4 .sheet .sh-t{padding:14px 16px 12px;text-align:center;font-size:13px;line-height:18px;color:var(--sub)}\n.tm4 .sheet .sh-t b{display:block;color:var(--text);font-size:14px;font-weight:600;margin-bottom:2px}\n.tm4 .sheet .sa{display:block;width:100%;padding:17px 12px;text-align:center;font-size:19px;color:var(--accent);border-top:.5px solid var(--sep)}\n.tm4 .sheet .sh-t + .sa,.tm4 .sheet .sg > .sa:first-child{border-top:0}\n.tm4 .sheet .sa.red{color:var(--red)}\n.tm4 .sheet .sa.bold{font-weight:600}\n.tm4 .sheet .sa.pressed{background:var(--press)}\n.tm4 .toast{position:fixed;z-index:95;left:50%;bottom:calc(var(--tab) + var(--sb) + 18px);max-width:calc(100% - 40px);padding:11px 18px;border-radius:22px;background:rgba(28,28,30,.92);color:#fff;font-size:15px;line-height:20px;text-align:center;\ntransform:translate3d(-50%,16px,0);opacity:0;transition:opacity .22s,transform .22s;pointer-events:none}\n.tm4 .toast.on{opacity:1;transform:translate3d(-50%,0,0)}\n.tm4 .prof{display:flex;align-items:center;gap:14px;padding:14px 16px}\n.tm4 .avatar{flex:none;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(140deg,var(--hero1),var(--hero2));color:#fff;font-size:21px;font-weight:600}\n.tm4 .prof .t{font-size:20px;line-height:25px;font-weight:600}\n.tm4 .foot{margin:26px 20px 0;text-align:center;color:var(--sub);font-size:12.5px;line-height:18px}\n.tm4 .legal{margin:10px 28px 0;text-align:center;color:var(--sub);opacity:.8;font-size:10px;line-height:14px}\n.tm4 .sync{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:var(--sub);text-align:center;padding:24px}\n.tm4 .sync small{max-width:320px;font-size:12px;line-height:1.4;color:var(--sub);opacity:.75;word-break:break-word}\nhtml.tm4 > :not(head):not(body){display:none!important}\n.tm4 .udoc > * + *{margin-top:16px}\n.tm4 .cap.green{background:color-mix(in srgb,var(--green) 16%,transparent);color:#1f8a3d}\n.tm4.dark .cap.green{color:#4cd964}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .cap.green{color:#4cd964}}\n.tm4 .gh span{float:right;text-transform:none;letter-spacing:0}\n.tm4 .gh{display:flow-root}\n.tm4 .gc{display:flex;align-items:center;gap:8px;color:var(--text);text-transform:none;letter-spacing:0;font-size:15px;font-weight:600;text-decoration:none;margin-top:22px}\n.tm4 .gc i{flex:none;width:10px;height:10px;border-radius:50%;background:var(--c)}\n.tm4 a.gc .chev{margin-left:auto;flex:none;width:7px;height:12px;stroke:var(--sub);fill:none;stroke-width:2}\n.tm4 .row.muted .t{color:var(--sub)}\n.tm4 .card{margin:16px 16px 0;padding:14px 16px 16px;border-radius:16px;background:var(--card);box-shadow:var(--shadow)}\n.tm4 .card-h{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:12px}\n.tm4 .card-h b{font-size:17px;font-weight:600}\n.tm4 .card-h span{color:var(--sub);font-size:15px;font-weight:500}\n.tm4 .card-note{margin:12px 0 0;color:var(--sub);font-size:13.5px;line-height:18px}\n.tm4 .card-note b{color:var(--text)}\n.tm4 .stack{display:flex;gap:3px;height:14px;border-radius:7px;overflow:hidden;background:var(--fill)}\n.tm4 .stack i{display:block;min-width:4px;border-radius:3px;transform-origin:0 50%;animation:tm-grow .7s cubic-bezier(.2,.85,.25,1) both}\n.tm4 .legend{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:11px;font-size:13.5px;color:var(--sub)}\n.tm4 .legend span{display:inline-flex;align-items:center;gap:6px}\n.tm4 .legend i{width:9px;height:9px;border-radius:50%}\n.tm4 .legend b{color:var(--text);font-weight:600}\n@keyframes tm-grow{from{transform:scaleX(0)}to{transform:none}}\n@keyframes tm-rise{from{transform:scaleY(0)}to{transform:none}}\n.tm4 .ring{position:relative;flex:none}\n.tm4 .ring svg{display:block;width:100%;height:100%}\n.tm4 .ring circle{transition:stroke-dasharray .8s cubic-bezier(.2,.85,.25,1)}\n.tm4 .ring-mid{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;line-height:1}\n.tm4 .ring-mid b{font-size:28px;font-weight:700;letter-spacing:-.5px}\n.tm4 .ring-mid small{margin-top:4px;font-size:11.5px;font-weight:600;opacity:.8}\n.tm4 .st-hero{position:relative;margin:2px 16px 0;padding:16px;border-radius:22px;color:#fff;overflow:hidden;background:linear-gradient(150deg,#1d5fa0,#0b2c52 70%);box-shadow:0 10px 28px rgba(11,44,82,.25)}\n.tm4 .st-hero.isp{background:linear-gradient(150deg,#5b3fb0,#24124f 72%);box-shadow:0 10px 28px rgba(45,20,95,.25)}\n.tm4 .st-hero::after{content:\"\";position:absolute;right:-50px;top:-70px;width:200px;height:200px;border-radius:50%;background:#4cd964;opacity:.22;filter:blur(34px)}\n.tm4 .st-hero > *{position:relative;z-index:1}\n.tm4 .st-top{display:flex;align-items:center;justify-content:space-between;gap:10px}\n.tm4 .st-hero .hero-lbl i{background:#4cd964}\n.tm4 .st-name{margin-top:8px;font-size:22px;line-height:27px;font-weight:700}\n.tm4 .st-spec{margin-top:3px;font-size:14.5px;line-height:19px;opacity:.85}\n.tm4 .st-row{display:flex;align-items:center;gap:18px;margin-top:14px}\n.tm4 .st-kpis{display:flex;flex-direction:column;gap:12px;min-width:0}\n.tm4 .kpi b{display:block;font-size:30px;line-height:32px;font-weight:700;letter-spacing:-.5px}\n.tm4 .kpi b small{font-size:17px;font-weight:600;opacity:.85}\n.tm4 .kpi span{display:block;margin-top:1px;font-size:13px;opacity:.8}\n.tm4 .vbars{display:flex;align-items:flex-end;gap:10px;height:150px}\n.tm4 .vb{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;height:100%;min-width:0}\n.tm4 .vb-v{font-size:13px;font-weight:600}\n.tm4 .vb-bar{flex:1;width:100%;max-width:46px;display:flex;align-items:flex-end;border-radius:8px;background:var(--fill)}\n.tm4 .vb-bar i{display:block;width:100%;border-radius:8px;transform-origin:50% 100%;animation:tm-rise .7s cubic-bezier(.2,.85,.25,1) both}\n.tm4 .vb-l{font-size:12px;color:var(--sub);white-space:nowrap}\n.tm4 .vbars.hist{height:120px;gap:8px}\n.tm4 .score{display:inline-flex;align-items:baseline;gap:1px;min-width:52px;justify-content:center;height:28px;padding:0 9px;border-radius:14px;background:color-mix(in srgb,var(--sc) 15%,transparent);color:var(--sc);font-size:17px;font-weight:700;line-height:28px}\n.tm4 .score small{font-size:11px;font-weight:600;opacity:.8}\n.tm4 .res{position:relative}\n.tm4 .res + .res::before{content:\"\";position:absolute;top:0;right:0;left:16px;height:.5px;background:var(--sep)}\n.tm4 .res.open{background:color-mix(in srgb,var(--fill) 40%,transparent)}\n.tm4 .res[role=button]{cursor:pointer}\n.tm4 .res .row{transition:none}\n.tm4 .res-d{padding:0 16px 14px;color:var(--sub);font-size:13.5px;line-height:18px;animation:tm-fade .2s ease-out}\n.tm4 .res-hero{background:linear-gradient(150deg,color-mix(in srgb,var(--rc) 55%,#0b2c52),#0b2c52 75%)}\n.tm4 .res-hero::after{background:var(--rc)}\n.tm4 .res-hero .st-row{margin-top:12px}\n.tm4 .res-hero .ring-mid small{line-height:1.15}\n.tm4 .pos-line{margin:0 0 14px;font-size:15px;line-height:20px}\n.tm4 .pos{position:relative}\n.tm4 .pos.has-me{padding-top:30px}\n.tm4 .pos-bar{display:flex;gap:3px;height:30px}\n.tm4 .pos-bar i{position:relative;display:flex;align-items:center;justify-content:center;min-width:0;border-radius:7px;background:color-mix(in srgb,var(--g) 22%,transparent);transform-origin:0 50%;animation:tm-grow .6s cubic-bezier(.2,.85,.25,1) both}\n.tm4 .pos-bar i span{font-size:12.5px;font-weight:700;font-style:normal;color:color-mix(in srgb,var(--g) 80%,var(--text))}\n.tm4 .pos-bar i.me{background:var(--g)}\n.tm4 .pos-bar i.me span{color:#fff}\n.tm4 .pos-me{position:absolute;top:0;width:0;height:62px;white-space:nowrap;animation:tm-fade .4s .3s ease-out both}\n.tm4 .pos-me b{position:absolute;left:0;top:0;display:block;padding:3px 8px;border-radius:9px;background:var(--text);color:var(--card);font-size:12.5px;line-height:16px}\n.tm4 .pos-me::after{content:\"\";position:absolute;left:0;top:21px;width:2px;height:41px;margin-left:-1px;border-radius:1px;background:var(--text)}\n.tm4 .pos-ax{display:flex;justify-content:space-between;margin-top:6px;font-size:12px;color:var(--sub)}\n.tm4 .rk-hist{height:170px}\n.tm4 .rk-hist .vb-l{display:flex;flex-direction:column;align-items:center;font-size:11.5px;line-height:14px}\n.tm4 .rk-hist .vb-l b{font-size:13px;color:var(--text)}\n.tm4 .rk-hist .vb.me .vb-v,.tm4 .rk-hist .vb.me .vb-l b{color:var(--accent)}\n.tm4 .row.kv{min-height:48px}\n.tm4 .row.kv .end{max-width:58%}\n.tm4 .kv-v{color:var(--sub);text-align:right}\n.tm4 .cmp-d{display:inline-block;min-width:48px;padding:3px 8px;border-radius:10px;background:var(--fill);color:var(--sub);font-size:14px;font-weight:600;text-align:center}\n.tm4 .cmp-d.up{background:color-mix(in srgb,var(--green) 16%,transparent);color:var(--green)}\n.tm4 .cmp-d.down{background:color-mix(in srgb,var(--orange) 16%,transparent);color:var(--orange)}\n.tm4 .row.done .t{color:var(--sub)}\n.tm4 .row.plain-note{min-height:40px}\n.tm4 .row.failed .t{color:var(--red)}\n.tm4 .ptr{position:fixed;z-index:55;left:50%;top:calc(var(--st) + var(--nav) - 38px);width:36px;height:36px;margin-left:-18px;border-radius:50%;background:var(--card);\nbox-shadow:0 2px 12px rgba(0,0,0,.16);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:transform .3s cubic-bezier(.2,.85,.25,1),opacity .2s}\n.tm4 .ptr.drag{transition:none}\n.tm4 .ptr .spin{width:18px;height:18px;margin:0;border-width:2.2px;border-top-color:var(--accent);animation:none}\n.tm4 .ptr.busy .spin{animation:tm-spin .75s linear infinite}\n.tm4 .rp-photos{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 16px 2px;scrollbar-width:none;-webkit-overflow-scrolling:touch}\n.tm4 .rp-photos::-webkit-scrollbar{display:none}\n.tm4 .rp-ph{flex:none;width:86%;aspect-ratio:4/3;border-radius:16px;overflow:hidden;scroll-snap-align:center;background:var(--fill)}\n.tm4 .rp-ph:only-child{width:100%}\n.tm4 .rp-ph img{display:block;width:100%;height:100%;object-fit:cover}\n.tm4 .rp-cnt{margin:6px 20px 0;font-size:12.5px;color:var(--sub);text-align:center}\n.tm4 .rp-loc{padding:0;overflow:hidden}\n.tm4 .rp-mapw{position:relative;height:210px;background:var(--fill)}\n.tm4 .rp-mapw>span{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:6px;color:var(--sub);font-size:14px}\n.tm4 .rp-mapw>span .i{width:18px;height:18px}\n.tm4 .rp-map{position:relative;display:block;width:100%;height:100%;border:0}\n.tm4 .rp-addr,.tm4 .rp-note{display:flex;gap:10px;align-items:flex-start;padding:12px 16px 0;font-size:15px;line-height:20px}\n.tm4 .rp-addr .i{flex:none;width:20px;height:20px;color:var(--accent);margin-top:1px}\n.tm4 .rp-addr b{font-weight:600}\n.tm4 .rp-addr span{color:var(--sub)}.tm4 .rp-addr b{color:var(--text)}\n.tm4 .rp-note{font-size:14px;color:var(--sub)}.tm4 .rp-note .i{flex:none;width:18px;height:18px}\n.tm4 .rp-acts{display:flex;gap:6px;padding:12px 16px 14px;flex-wrap:wrap}\n.tm4 .rp-acts a{flex:1 1 auto;text-align:center;white-space:nowrap;height:34px;line-height:34px;padding:0 12px;border-radius:17px;background:var(--fill);color:var(--accent);font-size:14.5px;font-weight:600}\n.tm4 .rp-acts a.pri{background:var(--accent);color:#fff}\n.tm4 .rp-small .row{min-height:38px;padding-top:6px;padding-bottom:6px}\n.tm4 .rp-small .t,.tm4 .rp-small .end{font-size:14px;color:var(--sub)}\n.tm4 .rp-small .end{color:var(--text)}\n.tm4 .rp-more{margin:14px 20px 0}\n.tm4 .rp-more summary{font-size:14px;color:var(--accent);cursor:pointer;list-style:none;padding:4px 0}\n.tm4 .rp-more summary::-webkit-details-marker{display:none}\n.tm4 .rp-more .gh{margin:12px 0 4px}\n.tm4 .rp-list{margin:0;font-size:13px;line-height:19px;color:var(--sub)}\n.tm4 .rp-foot{margin:16px 20px 0}\n.tm4 .kurt{display:flex;align-items:center;gap:12px;margin:0 16px 16px;padding:16px;border-radius:16px;background:linear-gradient(135deg,var(--hero1),var(--hero2));color:#fff;box-shadow:var(--shadow);text-decoration:none}\n.tm4 .kurt-ic{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.16)}\n.tm4 .kurt-ic .i{width:26px;height:26px;stroke:#fff}\n.tm4 .kurt-t{flex:1;min-width:0;display:flex;flex-direction:column}\n.tm4 .kurt-t b{font-size:18px;line-height:23px;font-weight:700}\n.tm4 .kurt-t span{font-size:13.5px;line-height:18px;opacity:.88}\n.tm4 .kurt-go{flex:none;height:32px;line-height:32px;padding:0 13px;border-radius:16px;background:#fff;color:#0b2c52;font-size:14.5px;font-weight:600}\n.tm4 .rp-code{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:0 16px 14px}\n.tm4 .rp-code>div{display:flex;flex-direction:column;padding:10px 11px;border-radius:14px;background:var(--card);box-shadow:var(--shadow);min-width:0}\n.tm4 .rp-code small{font-size:11px;line-height:14px;text-transform:uppercase;letter-spacing:.3px;color:var(--sub)}\n.tm4 .rp-code b{font-size:22px;line-height:28px;font-weight:700;font-variant-numeric:tabular-nums;color:var(--accent)}\n.tm4 .rp-code span{font-size:12px;line-height:15px;color:var(--sub);overflow-wrap:anywhere}\n.tm4 .rp-note b{color:var(--text);font-weight:600}\n.tm4 .ko-row .main .s{display:block}\n.tm4 .ko-th{flex:none;width:44px;height:44px;border-radius:10px;background:var(--fill) center/cover no-repeat}\n.tm4 .group.ko .row,.tm4 .ko-row{--inset:72px}\n.tm4 .ko-bar{display:block;height:5px;margin-top:6px;border-radius:3px;background:var(--fill2);overflow:hidden;max-width:220px}\n.tm4 .ko-bar i{display:block;height:100%;border-radius:3px;background:var(--green)}\n.tm4 .ko-bar.busy i{background:var(--orange)}\n.tm4 .ko-bar.full i{background:var(--red)}\n.tm4 .ko-hero{height:130px;margin:0 16px 14px;border-radius:16px;background:var(--fill) center/cover no-repeat}\n.tm4 .ko-occ{display:flex;align-items:center;gap:12px;margin:-4px 20px 0;font-size:14.5px;color:var(--sub)}\n.tm4 .ko-occ b{color:var(--text)}\n.tm4 .ko-occ .ko-bar{flex:1;margin:0;height:6px}\n.tm4 .ko-hint{display:flex;gap:8px;align-items:flex-start;margin:12px 20px 0;font-size:13.5px;line-height:18px;color:var(--sub)}\n.tm4 .ko-hint .i{width:18px;height:18px}\n.tm4 .ko-hint.err{color:var(--red);margin:0 0 12px}\n.tm4 .ko-none{display:flex;gap:10px;align-items:flex-start;font-size:15px;line-height:20px;color:var(--sub);margin-top:16px}\n.tm4 .card.kr{margin-bottom:12px;padding:14px 16px}\n.tm4 .card.kr.live{box-shadow:inset 0 0 0 2px var(--green)}\n.tm4 .kr-top,.tm4 .kb-h{display:flex;align-items:center;gap:12px}\n.tm4 .kr-seat{flex:none;display:grid;place-items:center;min-width:48px;height:48px;padding:0 8px;border-radius:12px;background:var(--green);color:#fff;font-size:19px;font-weight:700}\n.tm4 .kr-main{display:flex;flex-direction:column;min-width:0}\n.tm4 .kr-main b{font-size:17px;font-weight:600}\n.tm4 .kr-main span{font-size:14px;color:var(--sub)}\n.tm4 .kr-when{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:15px}\n.tm4 .kr-when .i{width:18px;height:18px;color:var(--sub)}\n.tm4 .kr-when em{font-style:normal;color:var(--green);font-weight:600}\n.tm4 .kr-acts{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}\n.tm4 .kr-acts a,.tm4 .kr-acts button{flex:1;height:36px;line-height:36px;border-radius:10px;background:var(--fill);color:var(--accent);font-size:15px;font-weight:600;text-align:center}\n.tm4 .kr-acts .pri{background:var(--green);color:#fff}\n.tm4 .kr-acts .red{color:var(--red)}\n.tm4 .kt .chips{padding-bottom:8px}\n.tm4 .kt .chip{display:inline-flex;align-items:center;height:32px;font-size:14.5px}\n.tm4 .kt-t .chip{min-width:58px;justify-content:center}\n.tm4 .kz-list{display:flex;flex-direction:column;gap:12px;margin:4px 16px 0}\n.tm4 .kz{display:flex;align-items:center;gap:12px;padding:10px;border-radius:14px;background:var(--card);box-shadow:var(--shadow)}\n.tm4 .kz.pressed{opacity:.7}\n.tm4 .kz-fp{flex:none;width:74px;height:74px;border-radius:10px;background:#fff center/cover no-repeat;box-shadow:inset 0 0 0 .5px var(--sep)}\n.tm4 .kz-t{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}\n.tm4 .kz-t b{font-size:17px;font-weight:600}\n.tm4 .kz-t span{font-size:14px;color:var(--sub)}\n.tm4 .kz-t em{font-style:normal;font-weight:600;color:var(--green)}\n.tm4 .kz.none .kz-t em{color:var(--sub)}\n.tm4 .kz.none{opacity:.6}\n.tm4 .kz-go{flex:none;display:inline-flex;align-items:center;gap:4px;height:32px;padding:0 12px;border-radius:16px;background:var(--accent);color:#fff;font-size:14px;font-weight:600}\n.tm4 .kz-go .i{width:16px;height:16px}\n.tm4 .kmap-wrap{margin:0 0 4px}\n.tm4 .kmap{position:relative;height:max(330px,calc(100vh - var(--st) - var(--nav) - var(--tab) - var(--sb) - 150px));margin:0 8px;border-radius:16px;overflow:hidden;background:#fff;touch-action:none;-webkit-user-select:none;user-select:none;box-shadow:var(--shadow)}\n.tm4.dark .kmap{background:#e9e9ee}\n.tm4 .kp{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform;--k:1}\n.tm4 .kp img{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;-webkit-user-drag:none}\n.tm4 .ks{position:absolute;display:grid;place-items:center;width:calc(max(30px,15px * var(--k)));height:calc(max(30px,15px * var(--k)));margin:calc(max(30px,15px * var(--k)) / -2) 0 0 calc(max(30px,15px * var(--k)) / -2);border-radius:50%;\nbackground:#30b955;color:#fff;font:700 calc(max(17px,9px * var(--k)))/1 var(--font);font-style:normal;pointer-events:none}\n.tm4 .ks:not(.free){width:calc(max(12px,6px * var(--k)));height:calc(max(12px,6px * var(--k)));margin:calc(max(12px,6px * var(--k)) / -2) 0 0 calc(max(12px,6px * var(--k)) / -2);background:rgba(142,142,147,.45)}\n.tm4 .ks.free{box-shadow:0 0 0 calc(2px * var(--k)) #fff}\n.tm4 .ks.sel{background:#0a6cd6;transform:scale(1.35);z-index:2;transition:transform .2s}\n.tm4 .kmap-tools{position:absolute;right:8px;top:8px;display:flex;flex-direction:column;gap:6px}\n.tm4 .kmap-tools button{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.92);color:#0a6cd6;font-size:22px;font-weight:600;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.18)}\n.tm4 .kmap-leg{position:absolute;left:8px;bottom:8px;display:flex;gap:10px;padding:5px 9px;border-radius:9px;background:rgba(255,255,255,.92);color:#3a3a3c;font-size:12.5px;pointer-events:none}\n.tm4 .kmap-leg span{display:flex;align-items:center;gap:5px}\n.tm4 .kmap-leg .ks,.tm4 .kmap-leg .ks:not(.free){position:static;width:16px;height:16px;margin:0;font-size:9px;box-shadow:none}\n.tm4 .kmap-leg .ks:not(.free){width:10px;height:10px}\n.tm4 .kfree{display:flex;flex-wrap:wrap;gap:8px;margin:0 16px}\n.tm4 .kf{display:flex;flex-direction:column;align-items:center;justify-content:center;width:64px;height:54px;border-radius:12px;background:var(--card);box-shadow:var(--shadow)}\n.tm4 .kf b{font-size:17px}\n.tm4 .kf span{font-size:12.5px;color:var(--green);font-weight:600}\n.tm4 .kf.pressed{opacity:.6}\n.tm4 .kf.more{width:auto;padding:0 14px;color:var(--accent);font-size:15px;font-weight:600}\n.tm4 .kb{position:fixed;z-index:91;left:0;right:0;bottom:0;max-height:85vh;overflow:auto;padding:0 0 calc(var(--sb) + 16px);border-radius:16px 16px 0 0;background:var(--sheet);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);\ntransform:translate3d(0,105%,0);transition:transform .32s cubic-bezier(.2,.85,.25,1)}\n.tm4 .kb.on{transform:none}\n.tm4 .kb-grab{width:36px;height:5px;margin:7px auto 10px;border-radius:3px;background:var(--ter)}\n.tm4 .kb-in{padding:0 16px}\n.tm4 .kb-body{margin-top:14px}\n.tm4 .kb-tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}\n.tm4 .kb-tags span{padding:3px 9px;border-radius:7px;background:var(--fill);font-size:13px}\n.tm4 .kb-l{font-size:15px;color:var(--sub);margin:0 0 8px}\n.tm4 .kb-l b{color:var(--text)}\n.tm4 .kb-ends{padding:0 0 12px;margin:0 -16px;padding-left:16px}\n.tm4 .kb-ends .chip{display:flex;flex-direction:column;justify-content:center;height:50px;min-width:66px;align-items:center;line-height:1.1}\n.tm4 .kb-ends .chip small{font-size:11.5px;font-weight:500;opacity:.7}\n.tm4 .btn.kb-go{display:flex;width:100%;background:var(--green)}\n.tm4 .btn.kb-go:disabled{opacity:.7}\n.tm4 .btn.kb-go .spin{width:18px;height:18px;border-color:rgba(255,255,255,.4);border-top-color:#fff}\n.tm4 .kb-legal{margin:10px 2px 0;font-size:12.5px;line-height:17px;color:var(--sub)}\n.tm4 .kb-legal a{color:var(--accent)}\n.tm4 .kb-ok{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 0 18px;text-align:center;font-size:15px;color:var(--sub)}\n.tm4 .kb-ok .i{width:52px;height:52px;padding:10px;border-radius:50%;background:var(--green);color:#fff;stroke-width:2.6;margin-bottom:6px}\n.tm4 .kb-ok b{font-size:20px;color:var(--text)}\n.tm4 .upn{position:fixed;z-index:85;left:8px;right:8px;top:calc(var(--st) + 6px);display:flex;align-items:center;gap:12px;padding:11px 8px 11px 12px;border-radius:20px;background:var(--sheet);-webkit-backdrop-filter:blur(30px);backdrop-filter:blur(30px);\nbox-shadow:0 8px 30px rgba(0,0,0,.18),0 0 0 .5px var(--sep);transform:translate3d(0,calc(-100% - var(--st) - 20px),0);transition:transform .45s cubic-bezier(.2,.9,.25,1);cursor:pointer}\n.tm4 .upn.on{transform:none}\n.tm4 .upn.pressed{opacity:.85}\n.tm4 .upn-ic{width:38px;height:38px;border-radius:9px;flex:none}\n.tm4 .upn-m{flex:1;min-width:0;font-size:15px;line-height:19px}\n.tm4 .upn-m b{display:block;font-weight:600}\n.tm4 .upn-m span{color:var(--sub)}\n.tm4 .upn-x{flex:none;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:var(--sub)}\n.tm4 .upn-x .i{width:18px;height:18px;stroke-width:2.2}\n.tm4 .upd-banner{width:calc(100% - 32px);text-align:left}\n.tm4 .upd-banner .upn-ic{width:34px;height:34px;border-radius:8px}\n.tm4 .upd-banner .act{flex:none;color:var(--accent);font-weight:600}\n.tm4 .sheet.upd{max-height:calc(100% - var(--st) - 24px);overflow:auto;-webkit-overflow-scrolling:touch}\n.tm4 .upd-c{padding:24px 20px 14px;text-align:center}\n.tm4 .upd-logo{display:block;width:72px;height:72px;margin:0 auto 12px;border-radius:17px;box-shadow:0 4px 14px rgba(0,0,0,.14)}\n.tm4 .upd-c h2{margin:0;font-size:21px;line-height:26px;font-weight:700}\n.tm4 .upd-v{margin:4px 0 16px;font-size:15px;color:var(--text);font-weight:600}\n.tm4 .upd-v span{color:var(--sub);font-weight:400}\n.tm4 .upd-news,.tm4 .upd-how{margin:0 0 12px;padding:13px 15px;border-radius:14px;background:var(--fill);text-align:left;font-size:15px;line-height:20px}\n.tm4 .upd-news > b,.tm4 .upd-how > b{display:block;margin-bottom:6px;font-size:13px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.02em}\n.tm4 .upd-news ul,.tm4 .upd-how ol{margin:0;padding-left:20px}\n.tm4 .upd-news li + li,.tm4 .upd-how li + li{margin-top:5px}\n.tm4 .upd-how p{margin:8px 0 0;font-size:13px;line-height:18px;color:var(--sub)}\n.tm4 .upd-c .btn{display:flex;width:100%;height:50px;margin-top:6px}\n.tm4 .upd-later{display:block;width:100%;padding:14px 0 6px;text-align:center;color:var(--accent);font-size:17px}\n.tm4 .upd-ok{display:flex;align-items:center;justify-content:center;width:64px;height:64px;margin:0 auto 12px;border-radius:50%;background:var(--green);color:#fff}\n.tm4 .upd-ok .i{width:34px;height:34px;stroke-width:2.6}\n.tm4 .ip{max-width:520px;margin:0 auto;padding:calc(var(--st) + 28px) 20px calc(var(--sb) + 30px);text-align:center}\n.tm4 .ip h1{margin:0;font-size:28px;line-height:34px;font-weight:700}\n.tm4 .ip-sub{margin:6px 0 22px;color:var(--sub);font-size:16px;line-height:21px}\n.tm4 .ip-steps{list-style:none;margin:0 0 12px;padding:0;text-align:left}\n.tm4 .ip-step{display:flex;gap:12px;margin-bottom:10px;padding:14px;border-radius:16px;background:var(--card);box-shadow:var(--shadow)}\n.tm4 .ip-step > div{flex:1;min-width:0;font-size:16px;line-height:22px}\n.tm4 .ip-step b{font-weight:600}\n.tm4 .ip-n{flex:none;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center}\n.tm4 .ip-k{display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:24px;padding:0 5px;border-radius:7px;background:var(--fill2);font-weight:600;vertical-align:-5px}\n.tm4 .ip-k .i{width:17px;height:17px}\n.tm4 .ip-mock{margin-top:10px;border-radius:12px;background:var(--bg);padding:8px;font-size:14px;color:var(--sub)}\n.tm4 .ip-bar{display:flex;align-items:center;gap:8px;border-radius:22px;padding:7px 12px}\n.tm4 .ip-url{flex:1;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.tm4 .ip-hl{padding:2px 8px;border-radius:8px;background:var(--accent);color:#fff;font-weight:700;box-shadow:0 0 0 4px rgba(10,108,214,.25)}\n.tm4 .ip-list{padding:4px 0}\n.tm4 .ip-li{display:flex;align-items:center;gap:9px;padding:8px 12px}\n.tm4 .ip-li + .ip-li{border-top:.5px solid var(--sep)}\n.tm4 .ip-hl2{margin:0 4px;border-radius:9px;background:rgba(10,108,214,.14);color:var(--text);font-weight:600}\n.tm4 .ip-us{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;background:#1c1c1e;color:#fff;font-size:10px;font-weight:700}\n.tm4 .ip-pop{padding:10px}\n.tm4 .ip-warn{padding:8px 10px;border-radius:8px;background:rgba(48,185,85,.16);color:var(--text);font-size:13px}\n.tm4 .ip-warn u{color:var(--accent);text-decoration:none;font-weight:600;box-shadow:0 0 0 3px rgba(10,108,214,.22);border-radius:4px}\n.tm4 .ip-btn{margin:10px auto 2px;width:60%;padding:8px;border-radius:9px;background:var(--accent);color:#fff;text-align:center;font-weight:600;box-shadow:0 0 0 4px rgba(10,108,214,.25)}\n.tm4 .ip-tip{margin:4px 8px 18px;color:var(--sub);font-size:14px;line-height:19px}\n.tm4 .ip-back{display:flex;width:100%;height:50px}\n.tm4 .kstar{width:22px;height:22px}\n.tm4 .kstar.on{fill:#ffcc00;stroke:#e6a700}\n.tm4 .ko-empty{display:flex;gap:10px;align-items:center;font-size:14.5px;line-height:19px;color:var(--sub)}\n.tm4 .ko-empty .i{flex:none;width:26px;height:26px;color:var(--ter)}\n.tm4 .kr-top{position:relative}\n.tm4 .kr-main{flex:1}\n.tm4 .kr-del{flex:none;display:grid;place-items:center;width:40px;height:40px;margin:-6px -8px 0 0;border-radius:20px;color:var(--red)}\n.tm4 .kr-del .i{width:22px;height:22px}\n.tm4 .kr-del:active{background:var(--fill)}\n.tm4 .kfs{--inset:76px}\n.tm4 .kfs .kr-seat{min-width:44px;height:44px;font-size:16px}\n.tm4 .kr-seat.busy{background:var(--ter)}\n.tm4 .kfs-st{font-size:14px;color:var(--sub);white-space:nowrap}\n.tm4 .kfs-st em{font-style:normal;font-weight:600;color:var(--green)}\n.tm4 .kw{display:flex;align-items:center;gap:10px;width:calc(100% - 32px);margin:0 16px 12px;padding:10px 14px;border-radius:14px;background:var(--card);box-shadow:var(--shadow);text-align:left}\n.tm4 .kw.sk{height:58px}\n.tm4 .kw > .i{color:var(--accent)}\n.tm4 .kw-t{flex:1;display:flex;flex-direction:column;min-width:0}\n.tm4 .kw-t b{font-size:17px}\n.tm4 .kw-t span{font-size:14px;color:var(--sub)}\n.tm4 .kw-ch{flex:none;color:var(--accent);font-size:15px;font-weight:600}\n.tm4 .kmap-wrap .kw{margin-bottom:8px}\n.tm4 .kw-h{font-size:19px;margin:2px 0 14px}\n.tm4 .btn.kw-now{display:flex;width:100%;background:var(--fill);color:var(--accent)}\n.tm4 .btn.kw-now.on{background:var(--accent);color:#fff}\n.tm4 .btn.kw-now .i{width:20px;height:20px}\n.tm4 .kw-body .kb-l{margin-top:16px}\n.tm4 .kw-days{margin:0 -16px;padding:0 16px 4px}\n.tm4 .kw-hours{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:6px}\n.tm4 .kw-hr{height:42px;border-radius:11px;background:var(--fill);font-size:16px;font-weight:500;text-align:center}\n.tm4 .kw-hr.on{background:var(--accent);color:#fff;font-weight:600}\n.tm4 .kb-fav{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:21px;background:var(--fill)}\n.tm4 .ks.fav{box-shadow:0 0 0 calc(3px * var(--k)) #ffcc00}\n.tm4 .kf.fav{box-shadow:inset 0 0 0 2px #ffcc00}\n.tm4 .kmap-pre{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:.35}\nhtml.tm4 body.kfull{padding-bottom:calc(var(--sb) + var(--tab))}\n.tm4 .kmap-cnt{position:absolute;left:8px;top:8px;padding:6px 11px;border-radius:10px;background:rgba(255,255,255,.94);color:#1c1c1e;font-size:14px;box-shadow:0 1px 4px rgba(0,0,0,.15);pointer-events:none}\n.tm4 .kmap-cnt b{color:#1f9a43;font-size:16px}\n.tm4 .kmap-cnt.none b{color:#8e8e93}\n.tm4 .kmap-list{position:absolute;right:8px;bottom:8px;height:40px;padding:0 16px;border-radius:20px;background:#0a6cd6;color:#fff;font-size:15px;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.25)}\n.tm4 .kl-sub{display:block;font-size:14px;font-weight:400;color:var(--sub);margin-top:2px}\n.tm4 .kb .kfree{margin:0 0 14px;max-height:46vh;overflow:auto}\n.tm4 .kb .kf{background:var(--card)}\n.tm4 .btn.kl-when{display:flex;width:100%}\n.tm4 .btn.kl-when .i{width:20px;height:20px}\n.tm4 .kb .fresh{margin:12px 0 0}\n.tm4 .kb-when{display:flex;align-items:center;gap:8px;width:100%;margin-top:12px;padding:10px 12px;border-radius:12px;background:var(--fill);font-size:15px;text-align:left}\n.tm4 .kb-when .i{width:20px;height:20px;color:var(--accent)}\n.tm4 .kb-when span{flex:1}\n.tm4 .kb-when em{font-style:normal;color:var(--accent);font-weight:600}\n.tm4 .kfs .kr-seat{min-width:44px;height:44px;font-size:16px}\n.tm4 .upd-ok.warn{background:var(--orange,#ff9500)}\n.tm4 .kci-msg{margin:4px 0 8px;padding:12px 14px;border-radius:12px;background:var(--fill);font-size:15px;line-height:21px;text-align:left}\n.tm4 .kci-msg p{margin:0}.tm4 .kci-msg p+p{margin-top:8px}\n.tm4 .kr-acts button[disabled]{opacity:.7}\n.tm4 .kr-acts .spin{display:inline-block;width:14px;height:14px;margin:0 4px 0 0;border:2px solid transparent;border-top-color:currentColor;border-right-color:currentColor;vertical-align:-2px}\n.tm4 .ip-or{font-weight:400;color:var(--sub);font-size:14px}\n.tm4 .ip-bar .ip-hl{display:inline-flex;align-items:center;justify-content:center;width:34px;height:28px;padding:0}\n.tm4 .ip-bar .ip-hl .i{width:19px;height:19px}\n.tm4 .ip-dim .i{width:17px;height:17px}\n.tm4 .ip-note{margin:8px 0 0;font-size:13.5px;line-height:18px;color:var(--sub);font-weight:400}\n.tm4 .ip-us-pop{padding:0 0 10px;overflow:hidden;background:#f2f2f6;color:#1c1c1e;border-radius:14px}\n.tm4 .ip-us-h{padding:9px 12px;text-align:center;font-weight:600;font-size:14px}\n.tm4 .ip-us-green{padding:8px 10px;background:#8ee77a;color:#1c1c1e;text-align:center;font-size:13.5px;font-weight:600;box-shadow:0 0 0 3px #0a6cd6 inset}\n.tm4 .ip-us-green u{text-decoration:none;border-bottom:1px dotted #1c1c1e}\n.tm4 .ip-us-row{display:flex;justify-content:space-between;padding:10px 12px 0;font-size:14px}\n.tm4 .ip-us-row span{color:#b8a200;font-size:12px;font-weight:600}\n.tm4 .ip-us-name{padding:6px 12px 10px;font-size:15px;font-weight:600}\n.tm4 .ip-us-btns{display:flex;gap:8px;padding:0 10px}\n.tm4 .ip-us-btns span{flex:1;padding:8px 0;border-radius:8px;background:#8e8e93;color:#fff;text-align:center;font-weight:600;font-size:14px}\n.tm4 .ip-us-btns .ip-us-inst{background:#0a6cd6;box-shadow:0 0 0 3px rgba(10,108,214,.35)}\nhtml.tm4.dark .ip-us-pop{background:#2f3237;color:#fff}html.tm4.dark .ip-us-row span{color:#e5d94a}\n@media (prefers-color-scheme:dark){html.tm4:not(.light) .ip-us-pop{background:#2f3237;color:#fff}html.tm4:not(.light) .ip-us-row span{color:#e5d94a}}\n.tm4 .ip-logo{display:block;overflow:hidden}\n.tm4 .ip-us-h{position:relative}\n.tm4 .ip-us-chk{position:absolute;right:8px;top:4px;width:28px;height:28px;border-radius:50%;background:#4d8ef7;color:#fff;display:flex;align-items:center;justify-content:center;opacity:.55}\n.tm4 .ip-us-chk .i{width:16px;height:16px;stroke-width:2.6}\n.tm4 .ip-us-chk i{position:absolute;left:-3px;right:-3px;top:50%;height:3px;margin-top:-1.5px;background:#ff3b30;border-radius:2px;transform:rotate(-45deg)}\n.tm4 .ip-us-lines{padding:0 12px 6px}\n.tm4 .ip-us-lines i{display:block;height:7px;margin:5px 0;border-radius:4px;background:currentColor;opacity:.15}\n.tm4 .ip-us-lines i:nth-child(2){width:70%}.tm4 .ip-us-lines i:nth-child(3){width:50%}\n.tm4 .ip-us-scroll{padding:2px 0 8px;text-align:center;font-size:12.5px;font-weight:600;color:#0a6cd6}\n.tm4 .ip-warn2{margin:10px 0 0;padding:9px 11px;border-radius:10px;background:rgba(255,59,48,.1);color:var(--text);font-size:14px;line-height:19px;font-weight:400}\n.tm4 .kroute{display:flex;align-items:center;gap:5px;margin:4px 0 0;font-size:13px;line-height:18px}\n.tm4 .kroute .i{width:14px;height:14px;color:var(--sub)}\n.tm4 .kroute a{color:var(--accent)}.tm4 .kroute i{font-style:normal;color:var(--ter)}\n.tm4 .kr-seat.kr-room{background:var(--accent)}.tm4 .kr-room .i{width:26px;height:26px;stroke-width:1.9}\n.tm4 .kg-cta{display:flex;align-items:center;gap:12px;color:inherit}\n.tm4 .kg-grps .chip{text-transform:none;gap:6px}.tm4 .kg-grps .chip .i{width:16px;height:16px}.tm4 .kg-grps .chip small{opacity:.7}\n.tm4 .kg-cta .chev{flex:none;width:8px;height:14px;fill:none;stroke:var(--ter);stroke-width:2}\n.tm4 .kg-ic{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent)}\n.tm4 .kg-ic .i{width:26px;height:26px;stroke-width:1.9}\n.tm4 .kg-days{display:flex;gap:8px;overflow-x:auto;padding:2px 16px 4px;scrollbar-width:none}\n.tm4 .kg-days::-webkit-scrollbar{display:none}\n.tm4 .kg-days .chip{display:flex;flex-direction:column;justify-content:center;align-items:center;height:50px;min-width:62px;line-height:1.1}\n.tm4 .kg-days .chip small{font-size:11.5px;font-weight:500;opacity:.7}\n.tm4 .kg-sum{margin:12px 20px 0;font-size:14px;line-height:19px;color:var(--sub)}.tm4 .kg-sum b{color:var(--green)}\n.tm4 .kb-when-s{pointer-events:none}\n.tm4 .kg-in{display:block;width:100%;height:44px;margin:0 0 12px;padding:0 12px;border:0;border-radius:10px;background:var(--fill);color:var(--text);font:inherit;font-size:16px}\n.tm4 .kg-pl span{color:var(--sub)}\n.tm4 .kg-ppl{display:flex;flex-direction:column;gap:6px;margin:0 0 10px}\n.tm4 .kg-p{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:var(--card)}\n.tm4 .kg-p .kr-main{flex:1}.tm4 .kg-p .kr-main b{font-size:15px;text-transform:capitalize}.tm4 .kg-p .kr-main span{font-size:12.5px}\n.tm4 .kg-av{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:16px;background:var(--accent);color:#fff;font-weight:700;font-size:14px}\n.tm4 .kg-x{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:16px;color:var(--sub)}.tm4 .kg-x .i{width:18px;height:18px}\n.tm4 .kg-add{display:flex;gap:8px}.tm4 .kg-add .kg-in{flex:1}\n.tm4 .kg-addb{flex:none;height:44px;padding:0 14px;border-radius:10px;background:var(--accent);color:#fff;font-weight:600;font-size:15px}\n.tm4 .kg-addb .spin{width:16px;height:16px;border-width:2px;border-color:rgba(255,255,255,.4);border-top-color:#fff}\n.tm4 .kg-mates{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}.tm4 .kg-mates .chip{height:30px;padding:0 11px;font-size:14px;color:var(--accent);text-transform:capitalize}\n.tm4 .kb-go:disabled{opacity:.5}\n.tm4 .kg-full{margin:16px 0 0}.tm4 .kg-full summary{padding:4px 20px}\n.tm4 .kg-starts .chip{justify-content:center;font-variant-numeric:tabular-nums}\n.tm4 .kg-starts .chip.gap:not(:first-child){margin-left:10px}\n.tm4 .kb-ends .chip{text-align:center}\n.tm4 .kg-pick{margin:14px 0 0}\n.tm4 .kg-pick .kb-l{margin:0 20px 8px}\n.tm4 .kg-tchips{display:flex;gap:8px;overflow-x:auto;padding:0 16px 14px;scrollbar-width:none}\n.tm4 .kg-tchips::-webkit-scrollbar{display:none}\n.tm4 .kg-tchips .chip{display:flex;align-items:center;justify-content:center;height:44px;min-width:70px;font-size:16px;font-weight:600;font-variant-numeric:tabular-nums}\n.tm4 .kg-seg{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:2px;margin:0 16px;padding:2px;border-radius:10px;background:var(--fill)}\n.tm4 .kg-seg button{height:38px;border-radius:8px;font-size:15px;font-weight:600;color:var(--text);background:none;text-align:center}\n.tm4 .kg-seg button.on{background:var(--card);box-shadow:0 1px 4px rgba(0,0,0,.14)}\n.tm4 .kg-list2{margin-top:10px}\n.tm4 .kgr2{display:flex;align-items:center;gap:12px;width:100%;padding:12px 16px;text-align:left;color:inherit;background:none;border-top:.5px solid var(--sep)}\n.tm4 .kgr2:first-child{border-top:0}\n.tm4 .kgr2 .kr-main{flex:1}.tm4 .kgr2 .kr-main b{font-size:16px}.tm4 .kgr2 .kr-main>span{font-size:13px}\n.tm4 .kgr2 em{margin-top:3px;font-style:normal;font-size:14px;font-weight:600;color:var(--sub)}\n.tm4 .kgr2 em.ok{color:var(--green)}.tm4 .kgr2 em.half{color:#c46a00}\n.tm4 .kg-go{flex:none;display:grid;place-items:center;height:34px;padding:0 16px;border-radius:17px;background:var(--green);color:#fff;font-size:15px;font-weight:600}\n.tm4 .kg-go.alt{background:var(--fill);color:var(--accent)}\n.tm4 .kg-mini{position:relative;display:flex;gap:1px;height:6px;margin-top:8px}\n.tm4 .kg-mini i{flex:1;border-radius:2px;background:var(--fill)}\n.tm4 .kg-mini i.f{background:color-mix(in srgb,var(--green) 70%,transparent)}\n.tm4 .kg-mini i.c{background:transparent}\n.tm4 .kg-win{position:absolute;top:-4px;bottom:-4px;border:2px solid var(--text);border-radius:5px;pointer-events:none}\n.tm4 .kgr2.none{opacity:.75}\n.tm4 .kg-full .kg-list2{margin-top:6px}\n@font-face{font-family:\"TM Manrope\";font-style:normal;font-weight:200 800;font-display:swap;src:url(data:font/woff2;base64,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) format(\"woff2\");\nunicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}\nhtml.tm4{--font:\"TM Manrope\",-apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Helvetica Neue\",system-ui,sans-serif;\n--bg:#eef3f5;--card:#fff;--raised:#fff;--text:#18252b;--sub:#66777e;--ter:#b6c2c7;--tabi:#8e9da4;--sep:rgba(24,37,43,.09);\n--fill:rgba(31,111,139,.08);--fill2:rgba(31,111,139,.15);--press:rgba(24,37,43,.05);--tint:#eef4f6;\n--accent:#1f6f8b;--red:#e5484d;--orange:#e8893a;--green:#2fb36b;--bar:rgba(238,243,245,.86);--sheet:rgba(255,255,255,.97);\n--hero1:#2a7f9c;--hero2:#164c5f;--shadow:0 1px 2px rgba(24,37,43,.04),0 6px 18px rgba(24,37,43,.06);--tab:62px;--r:20px}\nhtml.tm4.dark{--bg:#0e1519;--card:#172126;--raised:#2b3a41;--text:#eaf1f3;--sub:#93a4ab;--ter:#4c5b61;--tabi:#7f9096;--sep:rgba(255,255,255,.08);\n--fill:rgba(140,190,205,.12);--fill2:rgba(140,190,205,.2);--press:rgba(255,255,255,.07);--tint:#1d3038;\n--accent:#5fb4d0;--red:#ff6369;--orange:#f0a050;--green:#3ccf7e;--bar:rgba(14,21,25,.86);--sheet:rgba(30,42,48,.97);--hero1:#1d5d73;--hero2:#123a48;--shadow:0 6px 18px rgba(0,0,0,.25)}\n@media (prefers-color-scheme:dark){html.tm4:not(.light){--bg:#0e1519;--card:#172126;--raised:#2b3a41;--text:#eaf1f3;--sub:#93a4ab;--ter:#4c5b61;--tabi:#7f9096;--sep:rgba(255,255,255,.08);\n--fill:rgba(140,190,205,.12);--fill2:rgba(140,190,205,.2);--press:rgba(255,255,255,.07);--tint:#1d3038;\n--accent:#5fb4d0;--red:#ff6369;--orange:#f0a050;--green:#3ccf7e;--bar:rgba(14,21,25,.86);--sheet:rgba(30,42,48,.97);--hero1:#1d5d73;--hero2:#123a48;--shadow:0 6px 18px rgba(0,0,0,.25)}}\nhtml.tm4,html.tm4 body{background:var(--bg)}\nhtml.tm4 body:not(.no-tabs):not(.kfull)::after{content:\"\";position:fixed;z-index:59;left:0;right:0;bottom:0;height:calc(var(--tab) + var(--sb) + 34px);pointer-events:none;\nbackground:linear-gradient(to bottom,color-mix(in srgb,var(--bg) 0%,transparent),color-mix(in srgb,var(--bg) 82%,transparent) 45%,var(--bg))}\n.tm4 .lt h1{font-weight:800;letter-spacing:-.6px}\n.tm4 .sh h2{font-weight:800;letter-spacing:-.3px}\n.tm4 .nav-t,.tm4 .t.b,.tm4 .lesson .main .t,.tm4 .exam .t{font-weight:700}\n.tm4 .gh{font-weight:700;letter-spacing:.7px;font-size:12.5px}\n.tm4 .group,.tm4 .card,.tm4 .ann,.tm4 .doc,.tm4 .banner,.tm4 .teaser,.tm4 .kz,.tm4 .kw,.tm4 .ip-step,.tm4 .rp-code>div{border-radius:var(--r);box-shadow:var(--shadow)}\n.tm4 .group.plain{box-shadow:var(--shadow)}\n.tm4 .row + .row::before,.tm4 .row + .sub::before,.tm4 .grp-h + .row::before,.tm4 .row + .grp-h::before,.tm4 .sub + .grp-h::before{right:16px}\n.tm4 .ic{border-radius:11px;width:32px;height:32px;background:color-mix(in srgb,var(--c,var(--accent)) 14%,var(--card));color:var(--cd,var(--c,var(--accent)))}\n.tm4.dark .ic{color:color-mix(in srgb,var(--c,var(--accent)) 65%,#fff)}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .ic{color:color-mix(in srgb,var(--c,var(--accent)) 65%,#fff)}}\n.tm4 .teaser .ic{background:var(--c,var(--accent));color:var(--ct,#fff)}\n.tm4 .fi{border-radius:9px}\n.tm4 .tile{border-radius:var(--r);box-shadow:var(--shadow),inset 0 0 0 .5px color-mix(in srgb,var(--c) 25%,transparent)}\n.tm4 .cap{border-radius:11px}\n.tm4 .hero{border-radius:22px;background:var(--card);color:var(--text);box-shadow:var(--shadow)}\n.tm4 .hero::after{display:none}\n.tm4 .hero-lbl{color:var(--accent);opacity:1}\n.tm4 .hero-lbl i{box-shadow:0 0 0 3px color-mix(in srgb,var(--c,var(--accent)) 22%,transparent)}\n.tm4 .st-hero .hero-lbl{color:rgba(255,255,255,.88)}\n.tm4 .hero-cd{background:var(--tint);color:var(--accent)}\n.tm4 .hero-meta{color:var(--sub);opacity:1}\n.tm4 .hero-prog{height:6px;border-radius:3px;background:var(--tint)}\n.tm4 .hero-prog i{border-radius:3px;background:var(--accent)}\n.tm4 .hero-acts a,.tm4 .hero-acts button{height:34px;border-radius:17px;background:var(--tint);color:var(--accent);font-weight:700}\n.tm4 .hero-acts a.pri{background:var(--accent);color:#fff}\n.tm4.dark .hero-acts a.pri{color:#0e1519}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .hero-acts a.pri{color:#0e1519}}\n.tm4 .hero.calm .hero-cd{background:var(--tint)}\n.tm4 .st-hero{background:linear-gradient(150deg,var(--hero1),var(--hero2) 72%);box-shadow:0 10px 28px rgba(22,76,95,.22)}\n.tm4 .st-hero.isp{background:linear-gradient(150deg,#5b4fa8,#2c2360 72%)}\n.tm4 .res-hero{background:linear-gradient(150deg,color-mix(in srgb,var(--rc) 55%,#164c5f),#164c5f 75%)}\n.tm4 .avatar{background:var(--tint);color:var(--accent);font-weight:800}\n.tm4 .kurt{border-radius:var(--r);background:var(--card);color:var(--text)}\n.tm4 .kurt-ic{border-radius:15px;background:color-mix(in srgb,var(--orange) 16%,var(--card))}\n.tm4 .kurt-ic .i{stroke:var(--orange)}\n.tm4 .kurt-t b{font-size:17px;line-height:21px;font-weight:800;letter-spacing:-.3px}\n.tm4 .kurt-go{padding:0 12px;font-size:14px}\n.tm4 .t{font-weight:500}\n.tm4 .kurt-t span{color:var(--sub);opacity:1}\n.tm4 .kurt-go{background:var(--orange);color:#fff;font-weight:700}\n.tm4 .tabbar{left:14px;right:14px;bottom:max(10px,calc(var(--sb) - 12px));height:var(--tab);padding:0 4px;border-radius:24px;background:color-mix(in srgb,var(--card) 88%,transparent);box-shadow:0 0 0 .5px var(--sep),0 2px 10px rgba(24,37,43,.05)}\n.tm4.dark .tabbar{background:color-mix(in srgb,var(--card) 92%,transparent)}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .tabbar{background:color-mix(in srgb,var(--card) 92%,transparent)}}\n.tm4 .tabbar a{font-weight:600}\n.tm4 .tabbar .i{width:25px;height:25px}\n.tm4 .seg{padding:4px;border-radius:16px;background:var(--card);box-shadow:var(--shadow)}\n.tm4 .seg button{height:32px;border-radius:12px;font-weight:600;transition:color .2s}\n.tm4 .seg button.on{color:#fff;font-weight:700}\n.tm4.dark .seg button.on{color:#0e1519}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .seg button.on{color:#0e1519}}\n.tm4 .seg .thumb{top:4px;bottom:4px;left:4px;border-radius:12px;background:var(--accent);box-shadow:0 2px 8px color-mix(in srgb,var(--accent) 35%,transparent)}\n.tm4 .kg-seg{border-radius:14px}.tm4 .kg-seg button{border-radius:11px}\n.tm4 .search{height:42px;border-radius:14px;background:var(--card);box-shadow:var(--shadow)}\n.tm4 .chip{border-radius:17px;background:var(--card);box-shadow:var(--shadow);font-weight:600}\n.tm4 .chip.on{background:var(--accent);color:#fff}\n.tm4 .btn{border-radius:16px;font-weight:700}\n.tm4 .btn.ghost{background:var(--tint)}\n.tm4 .wd.sel b{background:var(--accent);color:#fff}\n.tm4 .dt{border-radius:14px;background:var(--tint)}\n.tm4 .rp-acts a,.tm4 .kr-acts a,.tm4 .kr-acts button{border-radius:17px}\n.tm4 .kf{border-radius:16px}\n.tm4 .kz-fp,.tm4 .ko-th{border-radius:13px}\n.tm4 .ko-hero,.tm4 .kmap,.tm4 .rp-ph{border-radius:var(--r)}\n.tm4 .ks.sel{background:#1f6f8b}\n.tm4 .kmap-tools button{color:#1f6f8b;border-radius:12px}\n.tm4 .kmap-list{background:#1f6f8b}\n.tm4 .ip-hl,.tm4 .ip-btn{box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 25%,transparent)}\n.tm4 .sheet .sg{border-radius:20px}\n.tm4 .kb{border-radius:22px 22px 0 0}\n.tm4 .upn{border-radius:22px}\n.tm4 .toast{border-radius:20px;background:rgba(24,37,43,.92)}\n.tm4 .fav-star{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;color:var(--ter)}\n.tm4 .fav-star .i{width:24px;height:24px}\n.tm4 .fav-star.on{color:var(--orange)}\n.tm4 .fav-star.on .i{fill:currentColor}\n.tm4 .kurt.prt .kurt-ic{background:color-mix(in srgb,var(--accent) 14%,var(--card))}\n.tm4 .kurt.prt .kurt-ic .i{stroke:var(--accent)}\n.tm4 .kurt.prt .kurt-go{background:var(--accent)}\n.tm4.dark .kurt.prt .kurt-go{color:#0e1519}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .kurt.prt .kurt-go{color:#0e1519}}\n.tm4 .pr-bal{display:flex;flex-direction:column;position:relative;margin-top:0;padding:18px 18px 16px}\n.tm4 .pr-bal-l{font-size:13px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--accent)}\n.tm4 .pr-bal-v{margin-top:4px;font-size:38px;line-height:44px;font-weight:800;letter-spacing:-1px}\n.tm4 .pr-bal-s{font-size:14px;line-height:19px;color:var(--sub)}\n.tm4 .pr-bal-go{position:absolute;top:16px;right:16px;display:inline-flex;align-items:center;gap:4px;height:34px;padding:0 14px 0 10px;border-radius:17px;background:var(--tint);color:var(--accent);font-size:15px;font-weight:700}\n.tm4 .pr-bal-go .i{width:18px;height:18px;stroke-width:2.4}\n.tm4 .pr-go{display:flex;align-items:center;gap:14px;margin:12px 16px 0;padding:16px;border-radius:var(--r);background:var(--accent);color:#fff;box-shadow:0 8px 22px color-mix(in srgb,var(--accent) 30%,transparent)}\n.tm4 .pr-go.pressed{opacity:.85}\n.tm4 .pr-go-ic{flex:none;display:grid;place-items:center;width:46px;height:46px;border-radius:15px;background:rgba(255,255,255,.18)}\n.tm4 .pr-go-ic .i{width:27px;height:27px;stroke:#fff}\n.tm4 .pr-go-t{flex:1;min-width:0;display:flex;flex-direction:column}\n.tm4 .pr-go-t b{font-size:18px;line-height:23px;font-weight:800;letter-spacing:-.3px}\n.tm4 .pr-go-t span{font-size:13.5px;line-height:18px;opacity:.9}\n.tm4 .pr-go .chev{stroke:#fff;opacity:.8}\n.tm4.dark .pr-go{color:#0e1519}.tm4.dark .pr-go-ic .i,.tm4.dark .pr-go .chev{stroke:#0e1519}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .pr-go{color:#0e1519}.tm4:not(.light) .pr-go-ic .i,.tm4:not(.light) .pr-go .chev{stroke:#0e1519}}\n.tm4 .card.pr-job{display:flex;align-items:center;gap:12px;margin:0 16px 10px;padding:12px 12px 12px 14px}\n.tm4 .pr-doc{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--tint);color:var(--accent)}\n.tm4 .pr-doc .spin{width:20px;height:20px;border-width:2px}\n.tm4 .pr-job.err .pr-doc{color:var(--red);background:color-mix(in srgb,var(--red) 12%,var(--card))}\n.tm4 .pr-job-t{flex:1;min-width:0;display:flex;flex-direction:column}\n.tm4 .pr-job-t b{font-size:16px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.tm4 .pr-job-t span{font-size:13.5px;line-height:18px;color:var(--sub)}\n.tm4 .pr-job .kr-del{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:18px;background:var(--fill);color:var(--sub)}\n.tm4 .pr-job .kr-del .i{width:18px;height:18px}\n.tm4 .pr-st{font-size:13px;color:var(--sub)}\n.tm4 .pr-amt{font-size:15.5px;font-weight:700;color:var(--text);white-space:nowrap}\n.tm4 .pr-amt.up{color:var(--green)}\n.tm4 .pr-pick{display:flex;flex-direction:column;align-items:center;gap:4px;margin:0 16px;padding:30px 20px;border-radius:var(--r);border:2px dashed color-mix(in srgb,var(--accent) 40%,transparent);background:var(--card);text-align:center;color:var(--sub);font-size:14px;line-height:19px}\n.tm4 .pr-pick .i{width:40px;height:40px;color:var(--accent);margin-bottom:4px}\n.tm4 .pr-pick b{font-size:18px;color:var(--accent);font-weight:800}\n.tm4 .pr-pick input,.tm4 .pr-more input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}\n.tm4 .pr-more{color:var(--accent);font-weight:700;font-size:15px}\n.tm4 .pr-x{display:grid;place-items:center;width:32px;height:32px;border-radius:16px;background:var(--fill);color:var(--sub)}\n.tm4 .pr-x .i{width:16px;height:16px}\n.tm4 .pr-step{display:flex;align-items:center;gap:6px}\n.tm4 .pr-step button{width:36px;height:36px;border-radius:18px;background:var(--tint);color:var(--accent);font-size:22px;font-weight:700;text-align:center;line-height:36px}\n.tm4 .pr-step button:disabled{opacity:.4}\n.tm4 .pr-step b{min-width:28px;text-align:center;font-size:18px}\n.tm4 .pr-send{margin:22px 16px 0}\n.tm4 .pr-send .ko-hint{margin:0 4px 12px}\n.tm4 .pr-est{display:flex;justify-content:space-between;gap:10px;margin:0 4px 12px;font-size:16px;font-weight:700}\n.tm4 .pr-est span{font-weight:500;color:var(--sub);font-size:14.5px}\n.tm4 .btn.pr-go-btn{display:flex;width:100%;height:52px}\n.tm4 .btn.pr-go-btn:disabled{opacity:.45}\n.tm4 .btn.pr-go-btn .spin{width:18px;height:18px;margin:0;border-color:rgba(255,255,255,.4);border-top-color:#fff}\n.tm4 .pr-send .gf button{color:var(--accent);font-weight:600}\n.tm4 .pr-amts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:0 16px}\n.tm4 .pr-amt-b{display:flex;flex-direction:column;align-items:center;padding:14px 8px;border-radius:var(--r);background:var(--card);box-shadow:var(--shadow);text-align:center}\n.tm4 .pr-amt-b b{font-size:24px;font-weight:800}\n.tm4 .pr-amt-b span{font-size:13px;color:var(--sub)}\n.tm4 .pr-amt-b.on{background:var(--accent);color:#fff}\n.tm4 .pr-amt-b.on span{color:rgba(255,255,255,.85)}\n.tm4 .pr-form{margin:16px 16px 0}\n.tm4 .pr-f{display:block;margin-bottom:12px}\n.tm4 .pr-f span{display:block;margin:0 4px 6px;font-size:14px;font-weight:600;color:var(--sub)}\n.tm4 .pr-f input{width:100%;height:48px;padding:0 14px;border:0;border-radius:14px;background:var(--card);box-shadow:var(--shadow);color:var(--text);font:17px var(--font);-webkit-appearance:none;appearance:none}\n.tm4 .pr-f input:focus{outline:2px solid var(--accent)}\n.tm4 .pr-form .ko-hint{margin:0 4px 12px}\n.tm4 .pr-q{width:100%;height:42px;margin:0 0 12px;padding:0 14px;border:0;border-radius:14px;background:var(--fill);color:var(--text);font:16px var(--font);-webkit-appearance:none;appearance:none}\n.tm4 .pr-list{min-height:200px;margin:0 -16px}\n.tm4 .pr-logos{display:flex;justify-content:center;gap:8px;margin:14px 0 0}\n.tm4 .pr-logos img{height:24px;width:auto;border-radius:4px;background:#fff;padding:2px}\n.upd-c .ip-steps{margin:0 0 6px;text-align:left}\n.upd-c .ip-step{background:var(--fill);box-shadow:none;padding:12px}\n.upd-c .upd-how{margin-bottom:8px}\n.tm4 .upd-tip{margin:0;font-size:14px;line-height:19px;color:var(--text)}\n.tm4 .ip-us-ok{position:absolute;right:8px;top:4px;width:26px;height:26px;border-radius:50%;background:#4d8ef7;color:#fff;display:flex;align-items:center;justify-content:center;opacity:.5}\n.tm4 .ip-us-ok .i{width:15px;height:15px;stroke-width:2.6}\n.tm4 .ip-us-tools{display:flex;align-items:center;gap:14px;padding:6px 12px 2px}\n.tm4 .ip-us-tools i{flex:1}\n.tm4 .ip-us-tools span{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:9px}\n.tm4 .ip-us-tools .i{width:22px;height:22px}\n.tm4 .ip-us-tog{width:38px!important;height:22px!important;border-radius:11px!important;background:#7da7f5}\n.tm4 .ip-us-hit{background:rgba(10,108,214,.16);box-shadow:0 0 0 3px #0a6cd6;color:#0a6cd6;border-radius:6px}\n.tm4 .ip-us-sub{padding:4px 12px 8px;text-align:center;font-weight:600;font-size:14px;border-bottom:.5px solid rgba(128,128,128,.35)}\n.tm4 .ip-us-empty{padding:12px 10px 4px;text-align:center;font-size:13px;line-height:24px;opacity:.9}\n.tm4 .ip-us-empty u{text-decoration:none;padding:1px 6px;font-weight:600}\n.tm4 .ip-us-row2{display:flex;align-items:center;justify-content:space-between;padding:12px 12px 4px;font-size:14px}\n.tm4 .ip-us-row2 span{display:flex;gap:10px}\n.tm4 .ip-us-row2 u{color:#4d8ef7;text-decoration:underline}\n.tm4 .ip-us-row2 u.ip-us-hit{text-decoration:none;padding:1px 6px;font-weight:600}\nhtml.tm4.dark .ip-us-hit{color:#8fb8ff}\n@media (prefers-color-scheme:dark){html.tm4:not(.light) .ip-us-hit{color:#8fb8ff}}\n.tm4 .upd-h3{margin:4px 0 8px;text-align:left;font-size:13px;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.02em}\n.tm4 .apps{display:grid;grid-template-columns:repeat(3,1fr);row-gap:20px;margin:22px 16px 0}\n.tm4 .app{display:flex;flex-direction:column;align-items:center;gap:8px;padding:0;border:0;background:none;color:var(--text);font:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}\n.tm4 .app.pressed .ai{transform:scale(.92);filter:brightness(.92)}\n.tm4 .ai{position:relative;display:grid;place-items:center;width:76px;height:76px;border-radius:21px;color:#fff;flex:none;transition:transform .15s,filter .15s;\nbackground:linear-gradient(160deg,color-mix(in srgb,var(--c) 78%,#fff),var(--c) 55%,color-mix(in srgb,var(--c) 85%,#000));\nbox-shadow:0 2px 6px color-mix(in srgb,var(--c) 30%,transparent),inset 0 0 0 .5px rgba(255,255,255,.25)}\n.tm4.dark .ai{box-shadow:inset 0 0 0 .5px rgba(255,255,255,.15)}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .ai{box-shadow:inset 0 0 0 .5px rgba(255,255,255,.15)}}\n.tm4 .ai .i{width:36px;height:36px;stroke:#fff;stroke-width:2}\n.tm4 .ai-bd{position:absolute;top:-5px;right:-5px;min-width:22px;height:22px;padding:0 6px;border-radius:11px;background:var(--red);color:#fff;font-size:12.5px;font-weight:800;line-height:22px;text-align:center;box-shadow:0 0 0 2px var(--bg)}\n.tm4 .al{max-width:110px;font-size:13px;line-height:16px;font-weight:600;text-align:center;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n.tm4 .set-about{display:flex;align-items:center;gap:14px;padding:14px}\n.tm4 .set-about .ai{width:60px;height:60px;border-radius:17px}\n.tm4 .set-about .ai .i{width:30px;height:30px}\n.tm4 .set-about .t{font-size:18px;font-weight:700}\n.tm4 .set-about .main{display:flex;flex-direction:column}\n.tm4 .set-about .s{color:var(--sub);font-size:13.5px}\n.tm4 .gw{padding:14px 14px 12px;margin:0 0 14px}\n.tm4 .gw-h{display:flex;align-items:center;gap:12px}\n.tm4 .gw-ic{flex:none;width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--c) 15%,transparent);color:var(--cd)}\n.tm4 .gw-h .main .gw-t{display:flex;align-items:center;flex-wrap:wrap;gap:0 7px;font-size:17px;color:var(--text)}.tm4 .gw-t i{flex:none;width:7px;height:7px;border-radius:50%;background:var(--c)}.tm4 .gw-t a{font-size:15px;font-weight:600;color:var(--sub);text-decoration:none}\n.tm4 .gw-h .main{flex:1;min-width:0;display:flex;flex-direction:column}.tm4 .gw-h .main b{font-size:17px;font-weight:650}.tm4 .gw-h .main span{font-size:13px;color:var(--sub)}\n.tm4 .gw-n{flex:none;min-width:26px;height:26px;padding:0 8px;border-radius:13px;background:var(--fill,rgba(127,127,127,.14));font-size:13px;font-weight:600;display:grid;place-items:center;color:var(--sub)}\n.tm4 .gw-d{margin:10px 0 0;font-size:13.5px;color:var(--sub);line-height:1.4}\n.tm4 .gw-ppl{margin:10px -4px 0}\n.tm4 .gw-av{flex:none;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:650;background:var(--fill,rgba(127,127,127,.14));color:var(--text);margin-right:2px}\n.tm4 .gw-av.me{background:var(--accent);color:#fff}\n.tm4 .gw-m .i{width:20px;height:20px;color:var(--accent)}\n.tm4 .gw-acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}\n.tm4 .gw-acts>*{display:flex;align-items:center;justify-content:center;gap:6px;min-height:42px;padding:0 10px;border-radius:12px;border:0;font:inherit;font-size:14px;font-weight:600;text-align:center;background:var(--fill,rgba(127,127,127,.14));color:var(--accent);text-decoration:none}\n.tm4 .gw-acts>* .i{width:18px;height:18px}\n.tm4 .gw-acts .pri{background:var(--accent);color:#fff}\n.tm4 .gw-acts [disabled],.tm4 .gw-acts [aria-disabled=\"true\"]{opacity:.45;pointer-events:none}\n.tm4 .al-chips{padding-bottom:10px}\n.tm4 .chip.al-all{display:inline-flex;align-items:center;gap:4px;color:var(--accent);background:var(--card)}\n.tm4 .chip.al-all .i{width:16px;height:16px}\n.tm4 .al-days{display:flex;gap:6px;padding:0 16px 12px;overflow-x:auto;scrollbar-width:none}\n.tm4 .al-days::-webkit-scrollbar{display:none}\n.tm4 .al-day{flex:1 0 50px;display:flex;flex-direction:column;align-items:center;padding:6px 0 7px;border-radius:14px;background:var(--card);color:var(--sub);font-size:12px;font-weight:600;line-height:1.2}\n.tm4 .al-day b{font-size:18px;color:var(--text)}\n.tm4 .al-day.on{background:var(--accent);color:rgba(255,255,255,.82)}\n.tm4 .al-day.on b{color:#fff}\n.tm4 .card.al-st{margin:0 16px 10px;padding:11px 15px;display:flex;flex-direction:column;gap:3px}\n.tm4 .al-st b{display:flex;align-items:center;gap:7px;font-size:15px;font-weight:700}\n.tm4 .al-st span{font-size:13.5px;color:var(--sub);line-height:18px}\n.tm4 .al-st .open{color:var(--green)}\n.tm4 .al-st .soon{color:var(--orange)}\n.tm4 .al-st .cl{color:var(--sub)}\n.tm4 .al-dot{width:8px;height:8px;border-radius:50%;background:currentColor;flex:none}\n.tm4 .al-flt{padding-bottom:4px}\n.tm4 .al-flt .chip{display:inline-flex;align-items:center;gap:4px;background:var(--card)}\n.tm4 .al-flt .chip.on{background:var(--accent);color:#fff}\n.tm4 .al-flt .chip .i{width:15px;height:15px;stroke-width:2.6}\n.tm4 .al-sh{margin-top:22px}\n.tm4 .al-fold{display:flex;align-items:center;gap:8px;width:100%;text-align:left}\n.tm4 .al-fold .sh-note{color:var(--sub);font-size:15px}\n.tm4 .al-chev{margin-left:auto;display:flex;transform:rotate(90deg);transition:transform .2s}\n.tm4 .al-chev.up{transform:rotate(-90deg)}\n.tm4 .al-chev .chev{width:9px;height:15px}\n.tm4 .al-sub{padding:10px 16px 2px;font-size:12.5px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:var(--sub)}\n.tm4 .al-dish{display:flex;align-items:center;gap:12px;width:100%;padding:9px 16px;text-align:left;position:relative}\n.tm4 .al-dish+.al-dish::before{content:\"\";position:absolute;top:0;left:80px;right:0;height:1px;background:var(--sep)}\n.tm4 .al-ph{flex:none;width:52px;height:52px;border-radius:14px;object-fit:cover;background:var(--fill)}\n.tm4 .al-ph.none{display:flex;align-items:center;justify-content:center;color:var(--ter)}\n.tm4 .al-ph.none .i{width:24px;height:24px}\n.tm4 .al-dt{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}\n.tm4 .al-dt b{font-size:15.5px;font-weight:600;line-height:20px}\n.tm4 .al-tgs{display:flex;gap:5px;flex-wrap:wrap}\n.tm4 .al-tgs:empty{display:none}\n.tm4 .al-tg{font-style:normal;font-size:11px;font-weight:800;line-height:16px;padding:1px 6px;border-radius:6px;text-transform:uppercase;letter-spacing:.3px}\n.tm4 .al-tg.veg{background:rgba(52,168,83,.14);color:#2f7a48}\n.tm4 .al-tg.vgn{background:rgba(52,168,83,.24);color:#1d6436}\n.tm4 .al-tg.fish{background:rgba(10,132,255,.12);color:#1f6f8b}\n.tm4 .al-tg.eco{text-transform:none;background:var(--fill);color:var(--sub)}\n.tm4 .al-tg.eco.eA,.tm4 .al-tg.eco.eB{background:rgba(120,170,40,.16);color:#5b7a1d}\n.tm4 .al-tg.eco.eD,.tm4 .al-tg.eco.eE{background:rgba(230,120,40,.16);color:#b5651d}\n.tm4.dark .al-tg.veg,.tm4.dark .al-tg.vgn{color:#7fd39a}\n.tm4.dark .al-tg.fish{color:#5fb4d0}\n.tm4.dark .al-tg.eco.eA,.tm4.dark .al-tg.eco.eB{color:#b5d66a}\n.tm4.dark .al-tg.eco.eD,.tm4.dark .al-tg.eco.eE{color:#f0a868}\n.tm4 .al-pr{flex:none;font-weight:800;font-size:15.5px}\n.tm4 .al-foot{margin-top:22px;line-height:22px}\n.tm4 .al-foot a{color:var(--accent)}\n.tm4 .al-row{padding:0;display:flex;align-items:center;--inset:16px}\n.tm4 .al-pick .group:not(:last-child),.tm4 .al-g{--inset:16px}\n.tm4 .al-open{flex:1;display:flex;align-items:center;min-height:52px;padding:8px 0 8px 16px;text-align:left}\n.tm4 .al-up{color:var(--accent);font-size:13.5px;padding:0}\n.tm4 .al-star{flex:none;width:52px;height:52px;display:flex;align-items:center;justify-content:center;color:var(--ter)}\n.tm4 .al-star .i{width:24px;height:24px}\n.tm4 .al-star.on{color:#e0a92b}\n.tm4 .al-star.on .i{fill:currentColor}\n.tm4 .al-check{color:var(--accent)}\n.tm4 .al-check .i{width:20px;height:20px;stroke-width:2.6}\n.tm4 .al-sheet{background:var(--card);border-radius:20px;overflow:hidden auto;max-height:86vh;box-shadow:0 10px 40px rgba(0,0,0,.18)}\n.tm4 .al-big{display:block;width:100%;max-height:260px;object-fit:cover;background:var(--fill)}\n.tm4 .al-sheet-in{padding:16px 18px calc(var(--sb,0px) + 18px);display:flex;flex-direction:column;gap:6px}\n.tm4 .al-sheet-t{font-size:21px;line-height:26px;font-weight:700}\n.tm4 .al-sheet-s{font-size:14.5px;color:var(--sub)}\n.tm4 .al-tags2{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 4px}\n.tm4 .al-tags2 span{padding:4px 10px;border-radius:8px;background:var(--fill);font-size:13.5px}\n.tm4 .al-prices{display:flex;flex-direction:column;margin:6px 0 10px;border-radius:14px;background:var(--fill);overflow:hidden}\n.tm4 .al-prices div{display:flex;justify-content:space-between;gap:10px;padding:10px 14px;font-size:14.5px;color:var(--sub)}\n.tm4 .al-prices div+div{border-top:1px solid var(--sep)}\n.tm4 .al-prices .on{color:var(--text);font-weight:600}\n.tm4 .al-prices b{color:var(--text)}\n.tm4 .btn.al-orig{display:flex;justify-content:center;background:var(--fill);color:var(--accent)}\n.tm4 .al-algs{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 14px}\n.tm4 .al-algs .chip{display:inline-flex;align-items:center;gap:4px}\n.tm4 .al-algs .chip.on{background:var(--accent);color:#fff}\n.tm4 .al-algs .chip .i{width:15px;height:15px;stroke-width:2.6}\n.tm4 .btn.al-algs-go{display:flex;justify-content:center;width:100%}\n.tm4 .al-algs-clear{padding:12px;color:var(--accent);font-size:15px}\n.tm4 .al-route{color:var(--accent)}\n.tm4 .al-done{position:sticky;z-index:5;bottom:calc(var(--tab,62px) + var(--sb,0px) + 22px);margin:18px 16px 0}\n.tm4 .al-done .btn{display:flex;justify-content:center;width:100%;box-shadow:0 6px 20px rgba(0,0,0,.16)}\n.tm4 .al-done .btn:disabled{opacity:.55;box-shadow:none}\n.tm4 #tm-main section.al-busy .al-g,.tm4 #tm-main section.al-busy .al-st,.tm4 #tm-main section.al-busy .al-sh{opacity:.45;transition:opacity .15s}\n.tm4 .sheet .at-sh{padding:18px 16px 16px;max-height:calc(100vh - 150px);overflow-y:auto;-webkit-overflow-scrolling:touch}\n.tm4 .at-hd{text-align:center}\n.tm4 .at-hd .ic{width:44px;height:44px;border-radius:12px;margin:0 auto 10px}\n.tm4 .at-hd .ic .i{width:26px;height:26px}\n.tm4 .at-hd b{display:block;font-size:19px;line-height:24px;font-weight:700}\n.tm4 .at-hd p{margin:6px 4px 0;font-size:14px;line-height:19px;color:var(--sub)}\n.tm4 .at-l{margin:18px 4px 7px;font-size:13px;line-height:18px;color:var(--sub);text-transform:uppercase;letter-spacing:.3px}\n.tm4 .at-opts{border-radius:12px;background:var(--card);overflow:hidden}\n.tm4 .at-o{display:flex;align-items:center;gap:10px;width:100%;min-height:50px;padding:9px 14px;text-align:left;position:relative}\n.tm4 .at-o + .at-o::before{content:\"\";position:absolute;top:0;left:14px;right:0;height:.5px;background:var(--sep)}\n.tm4 .at-o span{flex:1;min-width:0}\n.tm4 .at-o b{display:block;font-size:16px;line-height:21px;font-weight:500}\n.tm4 .at-o small{display:block;font-size:13px;line-height:17px;color:var(--sub)}\n.tm4 .at-o .i{flex:none;width:20px;height:20px;color:var(--accent);stroke-width:2.4}\n.tm4 .at-o.on b{font-weight:600}\n.tm4 .at-one{margin:14px 0 0;text-align:center;font-size:15px;color:var(--sub)}\n.tm4 .at-seg{display:flex;gap:4px;padding:3px;border-radius:10px;background:var(--fill)}\n.tm4 .at-seg button{flex:1;height:34px;border-radius:8px;font-size:15px;font-weight:500}\n.tm4 .at-seg button.on{background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:600}\n.tm4 .at-sh .btn{display:flex;width:100%;margin-top:20px}\n.tm4 .at-sh .btn .i{width:20px;height:20px}\n.tm4 .at-sh .btn .spin{width:18px;height:18px;margin:0;border-width:2px;border-color:rgba(255,255,255,.35);border-top-color:#fff}\n.tm4 .at-sh .btn:disabled{opacity:.75}\n.tm4 .at-note{margin:8px 0 0;text-align:center;font-size:13px;color:var(--sub)}\n.tm4 .at-err{margin:14px 0 -6px;text-align:center;font-size:14px;line-height:19px;color:var(--red)}\n.tm4 .at-ok{text-align:center;padding:6px 4px 0}\n.tm4 .at-ok>.i{display:block;margin:0 auto;width:46px;height:46px;padding:10px;border-radius:50%;background:var(--green);color:#fff;stroke-width:2.6}\n.tm4 .at-ok b{display:block;margin-top:10px;font-size:19px;font-weight:700}\n.tm4 .at-ok p{margin:6px 0 0;font-size:15px;line-height:20px;color:var(--sub)}\n.tm4 .at-seg button{text-align:center}\n.tm4 .at-o.at-more span{color:var(--accent);font-size:16px}\n.tm4 .at-o.at-more .i{color:var(--sub)}\n.tm4 .kg-chosen{margin:0 0 4px;pointer-events:auto}.tm4 .kg-chosen small{color:var(--sub);font-size:13px}\n.tm4 .kg-chosen button{flex:none;border:0;background:none;font:inherit;font-size:15px;font-weight:600;color:var(--accent);padding:4px 2px}\n.tm4 .kg-glist{display:flex;flex-direction:column;gap:6px;margin:0 0 4px}\n.tm4 .kg-g{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:12px;background:var(--card)}\n.tm4 .kg-g .kr-main{flex:1;min-width:0}.tm4 .kg-g .kr-main b{font-size:15px}.tm4 .kg-g .kr-main span{font-size:12.5px;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.tm4 .kg-gi{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 13%,transparent);color:var(--accent)}.tm4 .kg-gi .i{width:20px;height:20px}\n.tm4 .kg-gadd{flex:none;height:34px;padding:0 13px;border-radius:9px;border:0;background:var(--accent);color:#fff;font:inherit;font-weight:600;font-size:14px}.tm4 .kg-gadd[disabled]{opacity:.45}\n.tm4 .kg-gok{flex:none;display:flex;align-items:center;gap:4px;font-size:14px;font-weight:600;color:var(--green)}.tm4 .kg-gok .i{width:18px;height:18px}\n.tm4 .kf-card{margin:8px 16px 10px;padding:14px}\n.tm4 .kf-steps{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:2px}\n.tm4 .kf-steps li{display:flex;align-items:center;gap:11px;padding:9px 0 2px;border-top:1px solid var(--sep)}\n.tm4 .kf-steps li>i{flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:13px;font-weight:700;background:color-mix(in srgb,var(--accent) 14%,transparent);color:var(--accent)}\n.tm4 .kf-steps .kr-main{flex:1}.tm4 .kf-steps .kr-main b{font-size:15.5px}.tm4 .kf-steps .kr-main span{font-size:13px;line-height:17px}\n.tm4 .kf-go{flex:none;display:flex;align-items:center;gap:4px;height:34px;padding:0 13px 0 10px;border-radius:17px;background:var(--accent);color:#fff;font-size:14.5px;font-weight:600}\n.tm4 .kf-go .i{width:16px;height:16px}\n.tm4 .kf-map .ks:not(.me){opacity:.55}\n.tm4 .ks.me{width:calc(max(36px,18px * var(--k)));height:calc(max(36px,18px * var(--k)));margin:calc(max(36px,18px * var(--k)) / -2) 0 0 calc(max(36px,18px * var(--k)) / -2);background:var(--accent);color:#fff;font-size:calc(max(13px,6.5px * var(--k)));font-weight:700;z-index:3;box-shadow:0 0 0 calc(3px * var(--k)) #fff;animation:kf-pulse 1.8s ease-out infinite}\n.tm4 .ks.me.room{border-radius:30%}\n@keyframes kf-pulse{0%{box-shadow:0 0 0 calc(3px * var(--k)) #fff,0 0 0 calc(3px * var(--k)) color-mix(in srgb,var(--accent) 45%,transparent)}100%{box-shadow:0 0 0 calc(3px * var(--k)) #fff,0 0 0 calc(22px * var(--k)) color-mix(in srgb,var(--accent) 0%,transparent)}}\n.tm4 .kf-tag b{color:var(--accent);font-size:15px}\n.tm4 .kmap-tools button .i{width:19px;height:19px;vertical-align:-3px}\n.tm4 .kf-cib.pri{background:var(--green)}.tm4 .kf-cib.red{background:var(--red)}\n.tm4 .kf-ci{margin:4px 16px}\n.tm4 #tm-alma{position:fixed;inset:0;z-index:200;visibility:hidden;pointer-events:none;transform:translateX(100%);transition:transform .32s cubic-bezier(.2,.8,.2,1),visibility 0s linear .32s;background:var(--bg)}\n.tm4 #tm-alma.on{visibility:visible;pointer-events:auto;transform:none;transition:transform .32s cubic-bezier(.2,.8,.2,1)}\n.tm4 #tm-alma iframe{display:block;width:100%;height:100%;border:0;background:var(--bg)}\n.tm4 .ai .app-spin{position:absolute;inset:0;margin:auto;width:22px;height:22px;border-color:rgba(255,255,255,.35);border-top-color:#fff}\n@media (prefers-reduced-motion:reduce){.tm4 #tm-alma,.tm4 #tm-alma.on{transition:none}}\n.tm4 .ai:has(.app-spin) .i{opacity:.3}\n.tm4 .ag-chips{margin-bottom:4px}\n.tm4 .ag-chips{gap:5px}.tm4 .ag-chips .chip{display:inline-flex;align-items:center;gap:5px;height:32px;padding:0 10px;font-size:14px}\n.tm4 .ag-chips .chip i{width:8px;height:8px;border-radius:50%}\n.tm4 .wd .ag-dots{display:flex;gap:2px;height:5px}\n.tm4 .wd .ag-dots i{width:5px;height:5px;border-radius:50%;opacity:1}\n.tm4 .ag-tag{display:inline-block;margin-right:6px;padding:1px 6px;border-radius:6px;font-size:10.5px;font-weight:800;letter-spacing:.4px;vertical-align:2px}\n.tm4 .ag-tag.dl{background:color-mix(in srgb,var(--orange) 16%,var(--card));color:#c46a00}\n.tm4 .ag-tag.plek{background:color-mix(in srgb,#3d8fa8 15%,var(--card));color:#2f7a91}\n.tm4.dark .ag-tag.dl{color:var(--orange)}.tm4.dark .ag-tag.plek{color:#7cc1d6}\n@media (prefers-color-scheme:dark){.tm4:not(.light) .ag-tag.dl{color:var(--orange)}.tm4:not(.light) .ag-tag.plek{color:#7cc1d6}}\n.tm4 .exam-tag{background:color-mix(in srgb,var(--red) 14%,var(--card));color:var(--red);font-size:10.5px;font-weight:800;letter-spacing:.4px}\n.tm4 .lesson.ag-dl .bar{background:var(--orange)}\n.tm4 .lesson.ag-dl .tm span{font-size:12px}\n.tm4 .lesson.ag-plek .bar{background:repeating-linear-gradient(var(--c) 0 5px,transparent 5px 8px)}\n.tm4 .lesson .end{display:flex;align-items:center;flex:none}\n.tm4 .ex-sum{display:flex;flex-direction:column;gap:3px;margin:4px 16px 12px;padding:14px 16px;background:var(--card)}\n.tm4 .ex-sum small{font-size:12.5px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--red)}\n.tm4 .ex-sum b{font-size:20px;font-weight:800;letter-spacing:-.3px}\n.tm4 .ex-sum span{color:var(--sub);font-size:14.5px}\n.tm4 .ex-gap{display:flex;align-items:center;gap:10px;padding:2px 16px 2px 40px;background:var(--tint)}\n.tm4 .ex-gap i{width:2px;height:22px;border-radius:1px;background:var(--g);opacity:.55}\n.tm4 .ex-gap .cap{height:20px;font-size:12px}\n.tm4 .ex-gap + .exam::before{display:none}";
  const LOGIN_CSS = "html.tm4-login{--bg:#f2f2f7;--card:#fff;--text:#000;--sub:#6d6d72;--sep:rgba(60,60,67,.2);--fill:rgba(118,118,128,.12);--accent:#0a6cd6;--red:#ff3b30;\n--font:-apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Helvetica Neue\",system-ui,sans-serif;color-scheme:light;background:var(--bg)!important}\nhtml.tm4-login.dark{color-scheme:dark;--bg:#000;--card:#1c1c1e;--text:#fff;--sub:#98989f;--sep:rgba(84,84,88,.65);--fill:rgba(118,118,128,.24);--accent:#409cff}\n@media (prefers-color-scheme:dark){html.tm4-login:not(.light){color-scheme:dark;--bg:#000;--card:#1c1c1e;--text:#fff;--sub:#98989f;--sep:rgba(84,84,88,.65);--fill:rgba(118,118,128,.24);--accent:#409cff}}\nhtml.tm4-login body{background:var(--bg)!important;color:var(--text)!important;font-family:var(--font)!important;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}\nhtml.tm4-login .vw-100{width:100%!important}\nhtml.tm4-login .vh-100{height:auto!important;min-height:100vh;min-height:100dvh}\nhtml.tm4-login #background,html.tm4-login #footer{display:none!important}\nhtml.tm4-login .sidebar{width:100%!important;max-width:none!important;min-height:100vh;min-height:100dvh;background:var(--bg)!important;border:0!important;box-shadow:none!important;\npadding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)!important}\nhtml.tm4-login #language{width:100%;padding:8px 10px 0!important}\nhtml.tm4-login #language .nav-link{color:var(--sub)!important;font-size:14px!important;padding:6px 8px!important}\nhtml.tm4-login #content{width:100%!important;max-width:460px;margin:0 auto;justify-content:flex-start!important;padding:4vh 22px 28px!important}\nhtml.tm4-login #service-info{display:flex;flex-direction:column;align-items:center;text-align:center;margin:0 0 30px!important}\nhtml.tm4-login #serviceDescription,html.tm4-login #serviceDescription .description-logo-text{display:contents!important}\nhtml.tm4-login #serviceDescription .col-3{order:0;flex:none!important;width:auto!important;max-width:none!important;padding:0!important}\nhtml.tm4-login #serviceLogo{display:block;width:80px;height:80px;object-fit:contain;padding:12px;border-radius:20px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06),0 8px 24px rgba(0,0,0,.1)}\nhtml.tm4-login #service-info h5{order:1;margin:18px 0 6px!important;font:700 30px/36px var(--font)!important;letter-spacing:.2px;color:var(--text)!important}\nhtml.tm4-login #serviceDescription .col-9{order:2;flex:none!important;width:auto!important;max-width:30ch!important;padding:0!important;color:var(--sub)!important;font-size:15px!important;line-height:20px}\nhtml.tm4-login .auth-forms{display:flex;flex-direction:column}\nhtml.tm4-login .loginbutton{margin:0!important;padding:0!important}\nhtml.tm4-login .loginMethod:not(.hidden){display:flex!important;align-items:center;justify-content:center;gap:12px;width:100%;min-height:56px;margin:0!important;padding:12px 18px!important;\nborder:0!important;border-radius:14px!important;font:600 16px/21px var(--font)!important;box-shadow:none!important;text-align:left!important;-webkit-tap-highlight-color:transparent;transition:transform .12s,opacity .12s}\nhtml.tm4-login .loginMethod:active{transform:scale(.98);opacity:.85}\nhtml.tm4-login .loginMethod br{display:none!important}\nhtml.tm4-login #btnnextauthlogin{background:var(--accent)!important;color:#fff!important}\nhtml.tm4-login #btnnextauthlogin img{flex:none;width:32px;height:32px;margin:0!important;padding:3px;border-radius:8px;background:#fff}\nhtml.tm4-login #btnPwdLogin{background:var(--card)!important;color:var(--accent)!important;box-shadow:inset 0 0 0 1px var(--sep)!important}\nhtml.tm4-login #btnPwdLogin i,html.tm4-login .loginMethod i{flex:none;margin:0!important;font-size:24px!important;color:inherit!important}\nhtml.tm4-login .form-check:not(.hidden){display:flex!important;align-items:center;gap:10px;min-height:36px;margin:10px 4px 0!important;padding:0!important}\nhtml.tm4-login .form-check-input{position:static!important;flex:none;width:22px!important;height:22px!important;margin:0!important;accent-color:var(--accent);background-color:var(--card)}\nhtml.tm4-login .form-check-label,html.tm4-login .text-muted{color:var(--sub)!important}\nhtml.tm4-login .form-check-label{font-size:15px!important;line-height:20px}\nhtml.tm4-login #orSeperator:not(.hidden){display:flex!important;align-items:center;gap:12px;margin:18px 4px!important;padding:0!important;color:var(--sub)!important;font-size:13px!important;text-transform:uppercase;letter-spacing:.4px;background:none!important}\nhtml.tm4-login #orSeperator::before,html.tm4-login #orSeperator::after{content:\"\"!important;flex:1;height:.5px;margin:0!important;border:0!important;background:var(--sep)!important;position:static!important;width:auto!important}\nhtml.tm4-login .input-group{margin:0 0 10px!important}\nhtml.tm4-login .form-control{height:52px!important;padding:0 14px!important;border:1px solid var(--sep)!important;border-radius:12px!important;background:var(--card)!important;color:var(--text)!important;\nfont:17px var(--font)!important;box-shadow:none!important;-webkit-appearance:none;appearance:none}\nhtml.tm4-login .form-control::placeholder{color:var(--sub)!important;opacity:1}\nhtml.tm4-login .form-control:focus{border-color:var(--accent)!important;box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 22%,transparent)!important;outline:0!important}\nhtml.tm4-login .btn-primary,html.tm4-login #pwdLoginBtn{min-height:52px;border:0!important;border-radius:14px!important;background:var(--accent)!important;color:#fff!important;font:600 17px var(--font)!important;box-shadow:none!important}\nhtml.tm4-login .form-group{margin-bottom:0!important}\nhtml.tm4-login #pwdLoginForm .form-group{margin-top:14px!important}\nhtml.tm4-login #btnGoToMain:not(.hidden){display:flex!important;align-items:center;gap:4px;margin:16px auto 0!important;color:var(--accent)!important;font:500 16px var(--font)!important;background:none!important;border:0!important;box-shadow:none!important}\nhtml.tm4-login #revokeConsent{margin-top:14px!important}\nhtml.tm4-login .alert:not(.hidden){border:0!important;border-radius:12px!important;padding:12px 14px!important;font-size:15px!important;line-height:20px}\nhtml.tm4-login .alert-danger{background:color-mix(in srgb,var(--red) 13%,var(--card))!important;color:var(--text)!important}\nhtml.tm4-login .alert-warning{background:color-mix(in srgb,#ff9500 15%,var(--card))!important;color:var(--text)!important}\nhtml.tm4-login .help{margin-top:22px!important;text-align:center}\nhtml.tm4-login .help > a{color:var(--sub)!important;font-size:15px!important;text-decoration:none!important}\nhtml.tm4-login .help-links{margin:12px 0 0!important;padding:0!important;list-style:none!important;text-align:left;background:var(--card);border-radius:12px;overflow:hidden}\nhtml.tm4-login .help-links li{margin:0!important}\nhtml.tm4-login .help-links li + li a{border-top:.5px solid var(--sep)}\nhtml.tm4-login .help-links a{display:block;padding:13px 16px;color:var(--accent)!important;font-size:15px;text-decoration:none!important}\nhtml.tm4-login #content h1,html.tm4-login #content h2,html.tm4-login #content h3,html.tm4-login #content h4{color:var(--text)!important;font-family:var(--font)!important}\nhtml.tm4-login #content p{color:var(--text)}\nhtml.tm4-login #content .btn:not(.loginMethod):not(.close):not(#btnGoToMain){min-height:50px;border-radius:14px!important;font:600 17px var(--font)!important}\nhtml.tm4-login #content .btn-secondary,html.tm4-login #content .btn-light,html.tm4-login #content .btn-outline-primary{background:var(--card)!important;color:var(--accent)!important;border:1px solid var(--sep)!important}\nhtml.tm4-login #content a{color:var(--accent)}";
  /* ================================================================== environment */
  const W = window;
  const VERSION = '4.33.1';
  const CHANNEL = 'main'; // 'beta' = test version (only for testers), 'main' = for everyone
  const SITE = { 'toledo.kuleuven.be': 'portal', 'ultra.edu.kuleuven.cloud': 'ultra', 'webwsp.aps.kuleuven.be': 'loket', 'idp.kuleuven.be': 'idp', 'icts-p-toledo-journey.cloud.icts.kuleuven.be': 'journey', 'kurt3.ghum.kuleuven.be': 'kurt', 'print.kuleuven.be': 'print', 'www.alma.be': 'alma', 'alma.be': 'alma', 'raw.githubusercontent.com': 'install' }[__TM_LOC__.hostname];
  const TOP = true; // the demo runs inside a phone frame
  const TEST = !!W.__TM_TEST__;
  const PATH = W.__TM_PATH__ || __TM_LOC__.pathname;
  const PORTAL = 'https://toledo.kuleuven.be/portal/';
  const PORTAL_ORIGIN = 'https://toledo.kuleuven.be';
  const ULTRA = 'https://ultra.edu.kuleuven.cloud';
  const LOKET_ORIGIN = 'https://webwsp.aps.kuleuven.be';
  const LOKET = LOKET_ORIGIN + '/sap/bc/ui2/flp';
  const JOURNEY = 'https://icts-p-toledo-journey.cloud.icts.kuleuven.be/learningUnits/ultraLink?batchUid=';
  const MAIL = 'https://outlook.office.com/mail/';
  const PHONE = TEST || Math.min(screen.width, screen.height) < 600;
  const params = new URLSearchParams(__TM_LOC__.search);

  const ss = {
    get(k) { try { return sessionStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (_) {} },
    del(k) { try { sessionStorage.removeItem(k); } catch (_) {} },
  };
  const classicOn = (site) => { const v = Number(ss.get('tm4-classic-' + site)); return v > 0 && Date.now() - v < 30 * 60e3; };

  // run fn once the parser has created <html> (before any of the page's own scripts can run)
  const whenRoot = (fn) => {
    if (document.documentElement) { fn(); return; }
    const mo = new MutationObserver(() => { if (document.documentElement) { mo.disconnect(); fn(); } });
    mo.observe(document, { childList: true });
  };

  /* ================================================================== helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = (t) => { const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const fromYmd = (s, hm) => {
    const [y, m, d] = String(s).split('-').map(Number);
    const [h, mi] = String(hm || '0:0').split(':').map(Number);
    return new Date(y, (m || 1) - 1, d || 1, h || 0, mi || 0).getTime();
  };
  const DAYS = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
  const DAYS_S = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
  const MONTHS = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  const MONTHS_S = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
  const sod = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const addDays = (t, n) => { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n, d.getHours(), d.getMinutes()).getTime(); };
  const dayDiff = (a, b) => Math.round((sod(a) - sod(b)) / 864e5);
  const mondayOf = (t) => { const d = new Date(sod(t)); return addDays(d.getTime(), -((d.getDay() + 6) % 7)); };
  const hhmm = (t) => { const d = new Date(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
  const dLong = (t) => { const d = new Date(t); return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`; };
  const dShort = (t) => { const d = new Date(t); return `${DAYS_S[d.getDay()]} ${d.getDate()} ${MONTHS_S[d.getMonth()]}`; };
  const relDay = (t, now = Date.now()) => {
    const n = dayDiff(t, now);
    if (n === 0) return 'Vandaag';
    if (n === 1) return 'Morgen';
    if (n === -1) return 'Gisteren';
    if (n > 1 && n < 7) return cap(DAYS[new Date(t).getDay()]);
    return cap(dShort(t));
  };
  const until = (t, now = Date.now()) => {
    const m = Math.round((t - now) / 60e3);
    if (m < 1) return 'nu';
    if (m < 60) return `over ${m} min`;
    const d = dayDiff(t, now);
    if (d === 0) { const h = Math.floor(m / 60), r = m % 60; return r && h < 3 ? `over ${h} u ${r} min` : `over ${Math.round(m / 60)} u`; }
    if (d === 1) return 'morgen';
    if (d < 14) return `over ${d} dagen`;
    return `over ${Math.round(d / 7)} weken`;
  };
  const shortWhen = (t, now = Date.now()) => {
    const n = dayDiff(t, now);
    if (n === 0) return hhmm(t);
    if (n === -1) return 'gisteren';
    if (n > -7 && n < 0) return DAYS_S[new Date(t).getDay()];
    return `${new Date(t).getDate()} ${MONTHS_S[new Date(t).getMonth()]}`;
  };
  const fsize = (b) => (!b ? '' : b >= 1e6 ? (b / 1e6).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1e3)) + ' kB');
  const fold = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const cleanTitle = (t) => String(t || '').replace(/\s*\[[A-Za-z0-9]{4,9}\]/g, '').replace(/\s{2,}/g, ' ').trim();
  const codeOf = (t) => (/\[([A-Za-z0-9]{4,9})\]/.exec(String(t || '')) || [])[1] || '';
  const luCode = (lu) => (/^ULTRA-[A-Z]-KUL-([A-Za-z0-9]+)-\d{4}$/.exec(String(lu || '')) || [])[1] || '';
  const STOP = /^(and|of|the|in|on|for|to|a|an|en|van|de|het|voor|met|op|der|des|und|und|la|le|du|des|et)$/i;
  const initials = (t) => {
    const w = cleanTitle(t).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((x) => x && !STOP.test(x));
    return ((w[0] || '?')[0] + (w[1] ? w[1][0] : (w[0] || '').slice(1, 2))).toUpperCase();
  };
  const textOf = (html) => {
    if (!html) return '';
    if (typeof html === 'object') html = html.displayText || html.rawText || '';
    return String(html).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
  };
  const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (_) { return ''; } };
  const absU = (u, base = ULTRA + '/') => { try { const x = new URL(u, base); return /^(https?:|mailto:)$/.test(x.protocol) ? x.href : ''; } catch (_) { return ''; } };
  // room links (www.kuleuven.be/lokalen/<id>.htm) open the app's own room page on KU Loket
  const roomHref = (u) => { const m = /^https?:\/\/www\.kuleuven\.be\/lokalen\/(\d{6,10})\.htm/.exec(String(u || '')); return m ? `${LOKET}?tm=room&id=${m[1]}` : u || ''; };
  const put = (el, html) => { if (el && el.__h !== html) { el.innerHTML = html; el.__h = html; } };

  /* course colours (Toledo palette, 1-16) */
  const PAL = [null, [144, 81, 78], [198, 111, 72], [217, 45, 45], [242, 109, 80], [211, 148, 37], [255, 187, 108], [222, 197, 134], [242, 207, 59],
    [90, 155, 79], [122, 191, 30], [30, 112, 105], [50, 195, 181], [74, 109, 136], [87, 160, 209], [145, 94, 208], [210, 100, 157]];
  function colorVars(i) {
    const c = PAL[Number(i)] || [10, 108, 214];
    const lum = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    const dk = c.map((v) => Math.round(v * (lum > 150 ? 0.55 : 0.8)));
    const lt = c.map((v) => Math.round(v + (255 - v) * 0.3));
    return `--c:rgb(${c});--ct:${lum > 170 ? '#1c1c1e' : '#fff'};--cd-l:rgb(${dk});--cd-d:rgb(${lt})`;
  }

  /* ================================================================== updates */
  // Userscripts on iPhone never updates by itself. The app checks GitHub (a tiny version.json) when it opens and
  // whenever you come back to it, shows a notification at the top as soon as there is a new version, and walks you
  // through installing it in plain language. After the update it says what is new.
  const UPDATE_URL = 'https://raw.githubusercontent.com/vj4542662/toledo-mobile/main/toledo-mobile.user.js';
  const VERSION_URL = 'https://raw.githubusercontent.com/vj4542662/toledo-mobile/main/version.json';
  const TM_LOGO = 'data:image/png;base64,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'; // Toledo Mobile's own icon, inline (other sites' images don't load on GitHub)
  // the same logo as inline SVG: GitHub's pages forbid every image (also data: ones), but not SVG in the page itself
  const TM_LOGO_SVG = '<svg class="upd-logo ip-logo" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#005472"/><g transform="translate(73.96,73.96) scale(0.71111)"><g transform="translate(0,512) scale(0.1,-0.1)"><path fill="#ED8A2E" d="M2305 5109 c-887 -91 -1668 -638 -2053 -1439 -66 -137 -125 -295 -118 -317 3 -10 8 -30 11 -45 3 -16 7 -39 10 -53 11 -51 69 -204 111 -290 108 -224 282 -432 484 -580 69 -51 137 -95 146 -95 4 0 15 -6 23 -13 49 -41 326 -144 432 -161 54 -8 200 -52 284 -86 404 -161 756 -536 892 -952 15 -48 30 -87 33 -87 3 0 18 39 34 87 103 313 333 615 613 802 177 119 323 179 577 240 209 50 370 119 532 226 61 40 74 50 158 123 186 160 349 392 433 616 8 22 19 49 23 60 13 30 30 90 36 122 3 15 7 36 10 45 15 50 12 74 -22 160 -238 616 -699 1115 -1288 1398 -154 74 -345 143 -484 175 -110 26 -234 48 -326 59 -119 14 -436 17 -551 5z m-280 -595 c114 -23 216 -61 308 -114 87 -50 106 -64 184 -134 l44 -39 27 25 c67 61 80 72 132 108 108 74 229 123 375 154 70 15 292 16 360 2 197 -41 379 -140 519 -282 66 -67 154 -191 190 -269 18 -38 68 -177 66 -183 -1 -1 4 -28 11 -60 13 -61 17 -253 6 -312 -22 -127 -28 -142 -51 -135 -194 57 -368 83 -532 79 -383 -9 -737 -148 -1021 -401 l-83 -74 -85 76 c-286 254 -644 393 -1030 399 -94 2 -127 -1 -265 -19 -46 -6 -174 -36 -256 -60 -20 -6 -23 -1 -34 47 -39 177 -30 379 24 543 2 6 4 12 4 15 1 3 21 46 45 95 140 283 396 479 707 540 88 17 271 17 355 -1z"/><path fill="#E3224F" d="M4 2510 c4 -186 12 -272 41 -440 12 -74 77 -307 111 -399 19 -53 69 -164 110 -248 296 -601 809 -1056 1448 -1283 76 -27 167 -55 215 -65 11 -3 30 -7 42 -10 11 -2 28 -6 37 -9 22 -7 67 -15 117 -22 22 -3 46 -7 54 -10 8 -2 44 -7 81 -10 l67 -6 7 53 c4 30 10 72 13 94 8 53 8 244 0 326 -45 448 -302 882 -674 1136 -129 89 -328 184 -433 208 -247 57 -434 118 -540 177 -299 166 -508 374 -668 663 l-33 60 5 -215z"/><path fill="#E3224F" d="M5092 2674 c-32 -65 -126 -205 -186 -278 -167 -200 -391 -365 -624 -457 -66 -27 -254 -80 -326 -93 -63 -11 -225 -70 -311 -112 -304 -151 -560 -407 -714 -713 -33 -65 -121 -298 -120 -316 0 -3 -5 -29 -11 -58 -19 -92 -21 -110 -29 -202 -9 -111 -3 -290 13 -370 3 -11 5 -30 5 -42 1 -19 7 -23 34 -23 18 0 58 4 88 10 30 5 70 11 89 14 53 8 93 16 112 22 9 3 25 6 35 8 203 40 499 160 733 299 640 380 1099 1061 1209 1792 6 39 13 86 16 105 7 39 18 460 13 460 -2 0 -14 -21 -26 -46z"/></g></g></svg>';
  const NEWS = {"4.33.1": ["Je studieplek-reservaties staan meteen in de Agenda, ook als je Studieplek nog niet geopend hebt. Examens van januari, juni en augustus staan elk in een eigen blok."], "4.33.0": ["Rooster heet nu Agenda: je lessen, studieplek-reservaties, deadlines en examens staan samen per dag, en de lijst springt meteen naar vandaag. Onder Examens zie je hoeveel dagen studietijd je tussen twee examens hebt."], "4.32.0": ["Alma opent nu binnen de app en schuift pas in beeld als het menu klaarstaat: je ziet de oude website niet meer even flitsen. Kies je Alma's één keer opnieuw."], "4.31.0": ["Studieplek toont of een bibliotheek nu open is: \"Sluit om 20:00\" vlak voor sluiten en \"Nu gesloten\" daarna.", "Kom je na een tijdje terug in Studieplek, dan zijn de vrije plaatsen meteen opnieuw geladen.", "Examens blijft niet meer eindeloos laden: lukt KU Loket niet, dan zie je meteen de knop om je examenrooster te laden."], "4.30.0": ["Studieplek: nieuwe knop Vind mijn stoel bij je reservatie. Je krijgt de route naar de bibliotheek, de juiste zaal en je plaats op de plattegrond."], "4.29.3": ["Attesten: de app zegt nu dat het tot een 5-tal minuten kan duren voor je attest in je mailbox staat."], "4.29.2": ["Groepsruimte reserveren: het uur dat je al koos staat er gewoon, je hoeft het niet opnieuw te kiezen.", "Al je groepen uit Groepswerken staan in het reserveerblad: één tik op Voeg toe en je hele groep staat erin."], "4.29.1": ["Groepsruimte boeken vanuit Groepswerken: kies eerst een bibliotheek, daarna gaat het zoals altijd in Studieplek, met je groep al ingevuld.", "Reserveer je via Studieplek zelf een groepsruimte, dan kies je je groep in één tik.", "Groepswerken heeft rustigere kleuren."], "4.29.0": ["Nieuw in Meer: Attesten. Vraag je inschrijvingsbewijs, transcript of een ander attest aan met één tik; KU Loket mailt het meteen naar je studentenmail."], "4.28.6": ["Studieplek heeft een nieuw, duidelijker icoon."], "4.28.5": ["Groepswerken is eenvoudiger: per groep zie je de naam, het vak en de kleur van het vak, met Mail de groep en Groepsruimte boeken."], "4.28.4": ["Alma: een andere dag of Alma kiezen gaat meteen, en het menu van vorige keer staat er al terwijl het nieuwe laadt."], "4.28.3": ["Alma: uitklappen of een filter aanzetten laat je op je plek staan, en broodjes staan nu meteen onder de soep."], "4.28.2": ["Alma: de eerste keer zet je meteen een ster bij al je Alma's en tik je op Klaar."], "4.28.1": ["De melding voor een nieuwe versie verschijnt weer, ook als er kort na elkaar meerdere versies komen."]}; // { version: ['what changed, in plain words', …] } for the last versions
  const newerThan = (a, b) => {
    const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
    for (let i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); }
    return false;
  };
  // what changed between version `from` (exclusive) and `to` (inclusive), newest first
  const newsBetween = (news, from, to) => Object.keys(news || {})
    .filter((v) => newerThan(v, from) && !newerThan(v, to))
    .sort((a, b) => (newerThan(a, b) ? -1 : 1))
    .reduce((all, v) => all.concat(news[v] || []), []).slice(0, 6);
  const lsJson = (k) => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (_) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} };
  // ?th= so the install page has the app's light/dark setting (GitHub's site can't read it)
  const installUrl = (v) => UPDATE_URL + '?v=' + encodeURIComponent(v || Date.now()) + '&th=' + THEME;
  // raw.githubusercontent.com keeps a file for 5 minutes and ignores ?query, so right after a push it still hands out
  // the old version. GitHub's API is always fresh, but allows 60 calls an hour per network: use it first and fall
  // back to raw (at most 5 minutes behind) when it says to wait.
  const GH_API = 'https://api.github.com/repos/vj4542662/toledo-mobile';
  function ghApi(path, accept) {
    if (Date.now() < (Number(lsJson('tm4:apiwait')) || 0)) return Promise.reject('wait');
    return fetch(GH_API + path, { cache: 'no-store', credentials: 'omit', headers: { Accept: accept } }).then((r) => {
      if (r.ok) return r.text();
      if (r.status === 403 || r.status === 429) lsSet('tm4:apiwait', Number(r.headers.get('x-ratelimit-reset')) * 1e3 || Date.now() + 30 * 60e3);
      return Promise.reject(r.status);
    });
  }
  // Userscripts' own "Check Updates" reads GitHub through a 5-minute cache (and the phone adds its own), so a version
  // only counts as available some minutes after it was published (version.json says when: built)
  const RIPE = 8 * 60e3;
  // ripe: this version, or an earlier one that is still newer than ours, was published long enough ago. When versions
  // follow each other quickly, waiting for the newest one alone would keep postponing the notification.
  const ripe = (info) => !info.built || Date.now() - info.built > RIPE ||
    (info.builds || []).some((b) => b && newerThan(b.v, VERSION) && Date.now() - Number(b.built) > RIPE);
  let ripeT = 0;
  function checkUpdate(cb, force) {
    if (TEST && !W.__TM_UPD_TEST__) return;
    const st = lsJson('tm4:upd');
    if (st && st.v && newerThan(st.v, VERSION) && ripe(st)) cb(st);
    if (!force && st && Date.now() - st.ts < 2 * 60e3) return; // version.json is tiny: look (almost) every time the app opens
    const get = (u) => fetch(u + '?t=' + Date.now(), { cache: 'no-store', credentials: 'omit' }).then((r) => (r.ok ? r.text() : Promise.reject(r.status)));
    ghApi('/contents/version.json?ref=' + CHANNEL, 'application/vnd.github.raw')
      .catch(() => get(VERSION_URL))
      .then((t) => { const j = JSON.parse(t); if (!j || !j.version) throw 0; return { v: String(j.version), news: j.news || {}, built: Number(j.built) || 0, builds: Array.isArray(j.builds) ? j.builds : [] }; })
      .catch(() => get(UPDATE_URL).then((t) => { const m = /@version\s+([\d.]+)/.exec(t); return m ? { v: m[1], news: {} } : null; }))
      .then((info) => {
        if (!info) return;
        info.ts = Date.now();
        lsSet('tm4:upd', info);
        if (!newerThan(info.v, VERSION)) return;
        if (!ripe(info)) { clearTimeout(ripeT); ripeT = setTimeout(() => checkUpdate(cb, true), info.built + RIPE - Date.now() + 5e3); return; }
        if (!st || st.v !== info.v || !ripe(st)) cb(info);
      }, () => {});
  }

  // a bottom sheet over a dimmed page: slides in, and close() slides it out again
  function openLayer(inner, cls, label) {
    const layer = document.createElement('div');
    if (cls) layer.className = cls;
    layer.setAttribute('data-tm4', '');
    layer.innerHTML = `<div class="scrim"></div><div class="sheet${cls ? ' upd' : ''}" role="dialog" aria-modal="true"${label ? ` aria-label="${esc(label)}"` : ''}>${inner}</div>`;
    document.body.appendChild(layer);
    const scrim = layer.querySelector('.scrim'), sh = layer.querySelector('.sheet');
    requestAnimationFrame(() => requestAnimationFrame(() => { scrim.classList.add('on'); sh.classList.add('on'); }));
    const close = () => { scrim.classList.remove('on'); sh.classList.remove('on'); setTimeout(() => layer.remove(), 340); };
    scrim.addEventListener('click', close);
    return { layer, sh, close };
  }

  // the notification at the top of the app
  function updateNotice(info) {
    if (!document.body || !info || !newerThan(info.v, VERSION)) return;
    const later = lsJson('tm4:upd-later');
    if (later && later.v === info.v && Date.now() - later.ts < 20 * 3600e3) return;
    let n = $('#tm-upn');
    if (!n) {
      n = document.createElement('div');
      n.id = 'tm-upn'; n.className = 'upn'; n.setAttribute('data-tm4', ''); n.setAttribute('role', 'alert');
      document.body.appendChild(n);
      n.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const cur = lsJson('tm4:upd') || info;
        if (e.target.closest('.upn-x')) { lsSet('tm4:upd-later', { v: cur.v, ts: Date.now() }); hideNotice(); return; }
        hideNotice();
        updateSheet(cur);
      });
      requestAnimationFrame(() => requestAnimationFrame(() => n.classList.add('on')));
    }
    put(n, `<img class="upn-ic" src="${TM_LOGO}" alt=""><span class="upn-m"><b>Update beschikbaar</b><span>Tik om versie ${esc(info.v)} te installeren</span></span><button type="button" class="upn-x" aria-label="Later">${ico('close')}</button>`);
  }
  function hideNotice() { const n = $('#tm-upn'); if (n) { n.classList.remove('on'); setTimeout(() => n.remove(), 400); } }

  // how to update: Userscripts' own Updates screen (works from any page, also from Toledo itself)
  function howToUpdate() {
    const step = (n, title, mock) => `<li class="ip-step"><span class="ip-n">${n}</span><div><b>${title}</b>${mock || ''}</div></li>`;
    const pop = (inner) => `<div class="ip-mock ip-us-pop"><div class="ip-us-h">Userscripts<span class="ip-us-ok">${ico('check')}</span></div>${inner}</div>`;
    return `<ol class="ip-steps">
      ${step(1, `Tik links in de adresbalk op <span class="ip-k">${ico('pagemenu')}</span> en kies <b>Userscripts</b>`, `<div class="ip-mock ip-bar"><span class="ip-hl">${ico('pagemenu')}</span><span class="ip-url">toledo.kuleuven.be</span><span class="ip-dim">${ico('refresh')}</span></div><div class="ip-mock ip-list"><div class="ip-li ip-hl2"><span class="ip-us">&lt;/&gt;</span>Userscripts</div></div>`)}
      ${step(2, 'Tik bovenaan op het <b>wolkje</b>', pop(`<div class="ip-us-tools"><span>${ico('folder')}</span><span class="ip-us-hit">${ico('clouddl')}</span><i></i><span>${ico('refresh')}</span><span class="ip-us-tog"></span></div>`))}
      ${step(3, 'Tik op <b>Check Updates</b>', pop('<div class="ip-us-sub">Updates</div><div class="ip-us-empty">There are no file updates available<br><u class="ip-us-hit">Check Updates</u></div>'))}
      ${step(4, 'Tik naast Toledo Mobile op <b>Update</b>', pop('<div class="ip-us-sub">Updates</div><div class="ip-us-row2">Toledo Mobile<span><u>Source</u><u class="ip-us-hit">Update</u></span></div>'))}
      ${step(5, 'Sluit Userscripts en tik hieronder op de blauwe knop', '')}
    </ol>`;
  }

  // the update screen: what is new, three simple steps and one big button
  function updateSheet(info) {
    if (!info || $('.upd-layer')) return;
    const news = newsBetween(info.news, VERSION, info.v);
    const { layer, close } = openLayer(`
      <div class="sg upd-c">
        <img class="upd-logo" src="${TM_LOGO}" alt="">
        <h2>Nieuwe versie van Toledo Mobile</h2>
        <p class="upd-v">Versie ${esc(info.v)} <span>· je hebt nu ${esc(VERSION)}</span></p>
        ${news.length ? `<div class="upd-news"><b>Wat is er nieuw</b><ul>${news.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
        <p class="upd-h3">Zo update je (ongeveer 10 seconden)</p>
        ${howToUpdate()}
        <button type="button" class="btn upd-go">Klaar, vernieuwen</button>
        <button type="button" class="upd-later">Later</button>
      </div>`, 'upd-layer', 'Update');
    layer.querySelector('.upd-later').addEventListener('click', () => { lsSet('tm4:upd-later', { v: info.v, ts: Date.now() }); close(); });
    layer.querySelector('.upd-go').addEventListener('click', () => { lsSet('tm4:upd-go', { v: info.v, from: VERSION, ts: Date.now() }); location.reload(); });
  }

  // after an update: say so once, with what is new
  function justUpdated() {
    const was = lsJson('tm4:ver');
    lsSet('tm4:ver', VERSION);
    if (!was || !newerThan(VERSION, was)) return;
    try { localStorage.removeItem('tm4:upd-later'); } catch (_) {}
    const news = newsBetween(NEWS, was, VERSION);
    setTimeout(() => {
      if (!news.length) { toast(`Bijgewerkt naar versie ${VERSION}`); return; }
      const { layer, close } = openLayer(`<div class="sg upd-c">
        <span class="upd-ok">${ico('check')}</span>
        <h2>Toledo Mobile is bijgewerkt</h2>
        <p class="upd-v">Je hebt nu versie ${esc(VERSION)}</p>
        <div class="upd-news"><b>Wat is er nieuw</b><ul>${news.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        <button type="button" class="btn upd-go">Top!</button></div>`, 'upd-layer', 'Bijgewerkt');
      layer.querySelector('.upd-go').addEventListener('click', close);
    }, 900);
  }

  function notYet(v) {
    if ($('.upd-layer')) return;
    const info = lsJson('tm4:upd') || { v, news: {} };
    const { layer, close } = openLayer(`<div class="sg upd-c">
      <span class="upd-ok warn">${ico('refresh')}</span>
      <h2>De update is nog niet gelukt</h2>
      <p class="upd-v">Je hebt nog versie ${esc(VERSION)}</p>
      <div class="upd-how"><b>Probeer het zo</b><p class="upd-tip">Staat er na <b>Check Updates</b> nog "no file updates available"? Wacht dan een minuutje en tik nog eens op Check Updates.</p></div>
      ${howToUpdate()}
      <button type="button" class="btn upd-go">Klaar, vernieuwen</button>
      <button type="button" class="upd-later">Later</button></div>`, 'upd-layer', 'Update');
    layer.querySelector('.upd-later').addEventListener('click', close);
    layer.querySelector('.upd-go').addEventListener('click', () => { lsSet('tm4:upd-go', { v: info.v || v, from: VERSION, ts: Date.now() }); location.reload(); });
  }

  // every app page: check now and each time you come back to the app; onNew(info) lets the page add its own row
  function updateWatch(onNew) {
    if (TEST && !W.__TM_UPD_TEST__) return;
    const got = (info) => { updateNotice(info); if (onNew) onNew(info); };
    // you tapped Installeren a moment ago but this is still the old version: say so, with the step people miss
    const tried = lsJson('tm4:upd-go');
    if (tried && !newerThan(tried.v, VERSION)) { try { localStorage.removeItem('tm4:upd-go'); } catch (_) {} }
    else if (tried && Date.now() - tried.ts < 30 * 60e3) {
      try { localStorage.removeItem('tm4:upd-go'); } catch (_) {}
      setTimeout(() => notYet(tried.v), 900);
    }
    setTimeout(() => checkUpdate(got), 1200);
    let lastCheck = Date.now();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible' || Date.now() - lastCheck < 30e3) return;
      lastCheck = Date.now();
      checkUpdate(got, true);
    });
  }

  // the install page itself (raw.githubusercontent.com/…/toledo-mobile.user.js): instead of a wall of code, a
  // friendly page that shows where to tap. Userscripts downloads the file again itself, so the page's text
  // doesn't need to stay.
  function installPage() {
    const go = () => {
      const txt = (document.body && document.body.textContent) || '';
      const m = /@version\s+([\d.]+)/.exec(txt);
      const v = m ? m[1] : '';
      const fresh = v && newerThan(v, VERSION);
      takeover('Toledo Mobile installeren');
      document.body.className = 'no-tabs';
      document.body.innerHTML = `<main class="ip" data-tm4>
        ${TM_LOGO_SVG}
        <h1>${fresh || !v ? 'Nog even installeren' : 'Je bent helemaal mee'}</h1>
        <p class="ip-sub">${fresh ? `Versie ${esc(v)} staat klaar. Je hebt nu ${esc(VERSION)}.` : v ? `Je hebt de nieuwste versie (${esc(VERSION)}). Je hoeft niets meer te doen.` : 'Volg deze stappen om Toledo Mobile bij te werken.'}</p>
        ${fresh || !v ? howToUpdate() : ''}
        <a class="btn ip-back" href="${PORTAL}?tm=vandaag&th=${THEME}">Terug naar Toledo</a>
      </main>`;
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  }

  /* Anonymous user count: at most once a day, a random install id (made once on this phone, never the
     r-number, name or login) and the script version go to the Google Form below. Nothing else is sent.
     Responses land in Jeremy's Google Sheet "Toledo Mobile teller (antwoorden)". */
  const COUNT_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLScZnz2fJF-pcGFdCVv62XxfteYcr3z4qYNWW-S8uYggqJ1Vhg/formResponse';
  const COUNT_FIELDS = ['entry.262291636', 'entry.1600337097']; // id, versie
  function countUser() {
    if (TEST || !COUNT_FORM) return;
    try {
      const today = ymd(Date.now());
      if (localStorage.getItem('tm4:cnt') === today) return;
      let id = localStorage.getItem('tm4:anon');
      if (!id) {
        const a = new Uint8Array(9); crypto.getRandomValues(a);
        id = Array.from(a, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 14);
        localStorage.setItem('tm4:anon', id);
      }
      const body = new URLSearchParams([[COUNT_FIELDS[0], id], [COUNT_FIELDS[1], VERSION]]);
      fetch(COUNT_FORM, { method: 'POST', mode: 'no-cors', credentials: 'omit', body })
        .then(() => { try { localStorage.setItem('tm4:cnt', today); } catch (_) {} }, () => {});
    } catch (_) {}
  }

  /* ================================================================== storage + network */
  const NS = 'tm4:';
  const store = {
    get(k) { try { const v = localStorage.getItem(NS + k); return v ? JSON.parse(v) : null; } catch (_) { return null; } },
    set(k, v) {
      const s = JSON.stringify(v);
      try { localStorage.setItem(NS + k, s); } catch (_) { store.prune(); try { localStorage.setItem(NS + k, s); } catch (__) {} }
    },
    del(k) { try { localStorage.removeItem(NS + k); } catch (_) {} },
    prune() {
      // storage full: drop the oldest half of the cached course content
      try {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && /^tm4:[cia]:/.test(k)) { let ts = 0; try { ts = JSON.parse(localStorage.getItem(k)).ts || 0; } catch (_) {} keys.push([ts, k]); }
        }
        keys.sort((a, b) => a[0] - b[0]).slice(0, Math.ceil(keys.length / 2)).forEach(([, k]) => localStorage.removeItem(k));
      } catch (_) {}
    },
    clear() { try { Object.keys(localStorage).filter((k) => k.startsWith(NS)).forEach((k) => localStorage.removeItem(k)); } catch (_) {} },
  };

  class AuthError extends Error { constructor(m) { super(m || 'session'); this.auth = true; } }
  async function api(url, opt = {}) {
    const r = await fetch(url, Object.assign({ credentials: 'include' }, opt, { headers: Object.assign({ Accept: 'application/json' }, opt.headers || {}) }));
    if (r.status === 401) throw new AuthError('401');
    if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
    if (r.status === 204) return null;
    const ct = r.headers.get('content-type') || '';
    if (/text\/html/.test(ct)) throw new AuthError('html');
    return r.json();
  }
  /* Keep a session alive while the app is open: a small request every few minutes while you look at it, and
     one straight away when you come back to the page. It only refreshes a session that is still valid; it never
     signs you in. Each ping is a plain GET of something the app reads anyway. */
  function keepAlive(name, pings, every = 4 * 60e3) {
    if (TEST) return;
    const KEY = 'ka:' + name;
    const ping = () => {
      if (document.visibilityState !== 'visible') return;
      const last = Number(ss.get(KEY)) || 0;
      if (Date.now() - last < every - 5e3) return;
      ss.set(KEY, String(Date.now()));
      pings.forEach(([url, mode]) => fetch(url, { credentials: 'include', mode: mode || 'cors', cache: 'no-store', headers: mode === 'no-cors' ? {} : { Accept: 'application/json' } }).catch(() => {}));
    };
    setInterval(ping, 60e3);
    document.addEventListener('visibilitychange', ping);
    W.addEventListener('pageshow', ping);
    setTimeout(ping, 20e3);
  }
  const inflight = new Map();
  const once = (key, fn) => {
    if (!inflight.has(key)) inflight.set(key, fn().finally(() => inflight.delete(key)));
    return inflight.get(key);
  };
  /* stale-while-revalidate: onData(value, fromCache) runs with the cached copy right away and again when
     the network copy differs. Resolves with the fresh value. */
  function swr(key, fetcher, onData, { maxAge = 0 } = {}) {
    const c = store.get(key);
    if (c && c.v != null) onData(c.v, true, c.ts);
    if (c && maxAge && Date.now() - c.ts < maxAge) return Promise.resolve(c.v);
    return once('swr:' + key, fetcher).then((v) => {
      const same = c && JSON.stringify(c.v) === JSON.stringify(v);
      store.set(key, { ts: Date.now(), v });
      if (!same) onData(v, false, Date.now());
      return v;
    });
  }

  /* ================================================================== icons */
  const ICONS = {
    house: '<path d="M3.8 10.4 12 3.8l8.2 6.6V19a1.6 1.6 0 0 1-1.6 1.6h-4v-5.8H9.4v5.8h-4A1.6 1.6 0 0 1 3.8 19z"/>',
    book: '<path d="M5 5.6A2.1 2.1 0 0 1 7.1 3.5H19v13.8H7.1A2.1 2.1 0 0 0 5 19.4z"/><path d="M5 19.4a2.1 2.1 0 0 0 2.1 2.1H19v-4.2"/><path d="M9 7.8h6"/>',
    calendar: '<rect x="3.6" y="4.8" width="16.8" height="15.8" rx="3"/><path d="M3.6 9.6h16.8M8 3v3.4M16 3v3.4"/><path d="M7.6 13.2h1.6M11.2 13.2h1.6M14.8 13.2h1.6M7.6 16.8h1.6M11.2 16.8h1.6" stroke-width="2.2"/>',
    bell: '<path d="M6 16.4V11a6 6 0 0 1 12 0v5.4l1.6 2.1H4.4z"/><path d="M10 20.6a2 2 0 0 0 4 0"/>',
    grid: '<rect x="4" y="4" width="6.6" height="6.6" rx="1.8"/><rect x="13.4" y="4" width="6.6" height="6.6" rx="1.8"/><rect x="4" y="13.4" width="6.6" height="6.6" rx="1.8"/><rect x="13.4" y="13.4" width="6.6" height="6.6" rx="1.8"/>',
    ext: '<path d="M8 16 16.5 7.5M9.5 7.5h7v7"/>',
    folder: '<path d="M3.5 7.6a2 2 0 0 1 2-2h4.1l2 2.2h6.9a2 2 0 0 1 2 2v7.6a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>',
    doc: '<path d="M7 3.6h6.6l4.9 4.9V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5.1A1.5 1.5 0 0 1 7 3.6z"/><path d="M13.4 3.8v4.9h4.9M8.6 12.6h6.8M8.6 16h4.6"/>',
    play: '<circle cx="12" cy="12" r="8.6"/><path d="M10.2 8.7v6.6l5.2-3.3z" fill="currentColor" stroke-width="1.2"/>',
    link: '<path d="M10.2 13.8a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.1 1.1"/><path d="M13.8 10.2a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.1-1.1"/>',
    pencil: '<path d="M14.6 5.4 18.6 9.4M4.6 19.4l1-4.3L15.7 5a2 2 0 0 1 2.8 0l.5.5a2 2 0 0 1 0 2.8L8.9 18.4z"/>',
    bubble: '<path d="M4.6 18.6V7a2 2 0 0 1 2-2h10.8a2 2 0 0 1 2 2v7.4a2 2 0 0 1-2 2H8.5z"/>',
    megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h2l6.5 4V5L7 9H5a1 1 0 0 0-1 1z"/><path d="M16.8 9.2a4 4 0 0 1 0 5.6M19.2 6.8a7.4 7.4 0 0 1 0 10.4"/>',
    chart: '<path d="M5 20v-7M10 20V5.5M15 20v-9.5M20 20V8.5"/>',
    clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.1 1.9"/>',
    pin: '<path d="M12 21s-6.4-5.5-6.4-10.9a6.4 6.4 0 0 1 12.8 0C18.4 15.5 12 21 12 21z"/><circle cx="12" cy="10" r="2.3"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.6"/><path d="m4.6 7.6 7.4 5.4 7.4-5.4"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.4 4.4"/>',
    refresh: '<path d="M19.4 12.6a7.4 7.4 0 1 1-2.1-6"/><path d="M19.6 4.4v3.8h-3.8"/>',
    check: '<path d="m5 12.6 4.4 4.4L19 7.4"/>',
    clouddl: '<path d="M7 18.5h10.2a4 4 0 0 0 .6-7.95A5.6 5.6 0 0 0 6.9 9.3 4.6 4.6 0 0 0 7 18.5z"/><path d="M12 10.6v5.6M9.6 14l2.4 2.4 2.4-2.4"/>',
    close: '<path d="M7 7l10 10M17 7 7 17"/>',
    pagemenu: '<rect x="4" y="4.5" width="16" height="15" rx="3"/><path d="M8 9.5h8M8 12.5h8M8 15.5h5"/>',
    checks: '<path d="m2.8 12.8 4.3 4.3 9-9.6M12.6 16.6l.5.5 9-9.6"/>',
    more: '<circle cx="12" cy="12" r="8.8"/><circle cx="7.9" cy="12" r=".9" fill="currentColor"/><circle cx="12" cy="12" r=".9" fill="currentColor"/><circle cx="16.1" cy="12" r=".9" fill="currentColor"/>',
    cap: '<path d="M2.6 9.4 12 5l9.4 4.4L12 13.8z"/><path d="M6.4 11.4v4.5c1.6 1.4 3.6 2.1 5.6 2.1s4-.7 5.6-2.1v-4.5M21.4 9.4v5"/>',
    info: '<circle cx="12" cy="12" r="8.6"/><path d="M12 11v5.6M12 7.7v.2"/>',
    warn: '<path d="M12 4.2 2.9 19.6h18.2z"/><path d="M12 10v4.4M12 17.2v.2"/>',
    lock: '<rect x="5" y="10.4" width="14" height="10" rx="2.2"/><path d="M8 10.4V8a4 4 0 0 1 8 0v2.4"/>',
    globe: '<circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.3 2.4 3.4 5.3 3.4 8.6s-1.1 6.2-3.4 8.6c-2.3-2.4-3.4-5.3-3.4-8.6S9.7 5.8 12 3.4z"/>',
    library: '<path d="M4 20.2h16M5.6 17.2V9.6M9.6 17.2V9.6M14.4 17.2V9.6M18.4 17.2V9.6M3.6 9.4 12 4.4l8.4 5z"/>',
    inbox: '<path d="M4 13.6 6.4 5.6h11.2l2.4 8v4.6a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18.2z"/><path d="M4 13.6h4.6l1 2h4.8l1-2H20"/>',
    video: '<rect x="3" y="6.4" width="12.6" height="11.2" rx="2.6"/><path d="m15.6 10.6 5.2-3v8.8l-5.2-3z"/>',
    swap: '<path d="M6.5 8h12l-3.2-3.2M17.5 16h-12l3.2 3.2"/>',
    cloud: '<path d="M7.2 18.6h10.3a3.6 3.6 0 0 0 .6-7.2 5.6 5.6 0 0 0-10.8-1.3 4.2 4.2 0 0 0-.1 8.5z"/>',
    idcard: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.6"/><circle cx="9" cy="11" r="2"/><path d="M6 15.6c.7-1.3 1.8-2 3-2s2.3.7 3 2M14 10.2h3.6M14 13.6h3.6"/>',
    trend: '<path d="m4 16.4 5.2-5.2 3.6 3.6L20 7.6"/><path d="M15 7.6h5v5"/>',
    sparkle: '<path d="M12 3.6c.6 4.3 2.1 5.8 6.4 6.4-4.3.6-5.8 2.1-6.4 6.4-.6-4.3-2.1-5.8-6.4-6.4 4.3-.6 5.8-2.1 6.4-6.4z"/>',
    help: '<circle cx="12" cy="12" r="8.6"/><path d="M9.6 9.5a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7M12 17v.2"/>',
    person: '<circle cx="12" cy="8.6" r="3.6"/><path d="M5 20.2a7 7 0 0 1 14 0"/>',
    people: '<circle cx="9" cy="8.2" r="3.2"/><path d="M3.2 19.6c.5-3.4 2.9-5.4 5.8-5.4s5.3 2 5.8 5.4"/><circle cx="16.8" cy="9.2" r="2.5"/><path d="M15.6 14.4c2.6-.5 4.7 1.2 5.2 4.4"/>',
    star: '<path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
    printer: '<path d="M7 8.6V4.2h10v4.4"/><rect x="3.6" y="8.6" width="16.8" height="8" rx="2.2"/><path d="M7 13.6h10v6.2H7z"/><path d="M16.6 11.4h.2" stroke-width="2.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    desk: '<path d="M2.4 10.6h19.2M4.4 10.6v10M19.6 10.6v10" stroke-width="2.4"/><rect x="8.6" y="6" width="6.8" height="7" rx="1.8" fill="currentColor" stroke="none"/><rect x="7.2" y="14.2" width="9.6" height="2.8" rx="1.1" fill="currentColor" stroke="none"/><path d="M8.8 17v3.6M15.2 17v3.6"/>',
    sliders: '<path d="M4 7.5h9.4M17.8 7.5H20M4 16.5h2.4M10.8 16.5H20"/><circle cx="15.6" cy="7.5" r="2.2"/><circle cx="8.6" cy="16.5" r="2.2"/>',
    food: '<path d="M7 3.6v6.2a2.2 2.2 0 0 0 4.4 0V3.6M9.2 3.6v16.8M16.6 20.4V3.6c-2 .9-3 3-3 6.2v3.4h3"/>',
    sport: '<circle cx="12" cy="12" r="8.6"/><path d="M3.6 10.4c4.6.6 9.4 3.8 11.2 9.6M8.4 4.2c3.3 2.7 4.6 7 3.6 11.8M20.4 13.2c-3.4-1.6-7.6-1.4-11 .9"/>',
    cert: '<path d="M7 3.6h7.6l4 4V12M5.5 5.1A1.5 1.5 0 0 1 7 3.6M5.5 5.1V19A1.5 1.5 0 0 0 7 20.5h3.4M8.6 9h6M8.6 12.4h4"/><circle cx="16.4" cy="15.6" r="3"/><path d="m14.6 18.2-.8 3.2 2.6-1.2 2.6 1.2-.8-3.2"/>',
    seat: '<path d="M6 11V6.6A2.6 2.6 0 0 1 8.6 4h6.8A2.6 2.6 0 0 1 18 6.6V11"/><path d="M4.5 11h15v4.4h-15zM6.4 15.4V20M17.6 15.4V20"/>',
  };
  const ico = (n, cls) => `<svg class="i${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;
  const CHEV = '<svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1.5 1.5 6.5 7l-5 5.5"/></svg>';
  const BACK = '<svg class="i" viewBox="0 0 12 22" aria-hidden="true"><path d="M10 2 2 11l8 9"/></svg>';
  const EXT = ico('ext', 'ext');

  /* ================================================================== light / dark */
  // 'auto' follows the phone; without a choice of their own everyone starts in light mode. The choice is kept per site (localStorage), on *.kuleuven.be in a cookie
  // (so the login page knows it too) and handed to the course pages on ultra.edu.kuleuven.cloud in the link (th=).
  const THEME_KEY = 'tm4:theme';
  function readTheme() {
    const m = /[?&#]th=(light|dark|auto)\b/.exec(location.hash + '&' + __TM_LOC__.search);
    if (m) return m[1];
    let t = '';
    try { t = localStorage.getItem(THEME_KEY) || ''; } catch (_) {}
    if (!t) { try { const c = /(?:^|;\s*)tm4theme=(light|dark|auto)/.exec(document.cookie || ''); if (c) t = c[1]; } catch (_) {} }
    return t || 'light';
  }
  function saveTheme(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch (_) {}
    if (/(^|\.)kuleuven\.be$/.test(__TM_LOC__.hostname)) {
      try { document.cookie = `tm4theme=${t}; domain=kuleuven.be; path=/; max-age=31536000; secure; samesite=lax`; } catch (_) {}
    }
  }
  let THEME = readTheme();
  const isDark = () => THEME === 'dark' || (THEME === 'auto' && W.matchMedia && W.matchMedia('(prefers-color-scheme: dark)').matches);
  function applyTheme(t) {
    THEME = t;
    const r = document.documentElement;
    if (!r) return;
    r.classList.toggle('light', t === 'light');
    r.classList.toggle('dark', t === 'dark');
    const head = document.head;
    if (!head) return;
    let m = head.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'theme-color'); head.appendChild(m); }
    m.setAttribute('content', isDark() ? '#0e1519' : '#eef3f5');
  }
  try { W.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (THEME === 'auto') applyTheme('auto'); }); } catch (_) {}
  // links are drawn once and kept, so a link drawn before the choice changed still carries the old one:
  // put the current choice in at the moment the link is used
  const withTheme = (url) => String(url || '').replace(/([?&#]th=)(light|dark|auto)\b/, '$1' + THEME);
  function initThemeLinks() {
    if (W.__tm4themelinks) return;
    W.__tm4themelinks = true;
    const fix = (e) => {
      const a = e.target && e.target.closest && e.target.closest('a[href*="th="]');
      if (!a) return;
      const h = a.getAttribute('href'), n = withTheme(h);
      if (n !== h) a.setAttribute('href', n);
    };
    W.addEventListener('pointerdown', fix, true);
    W.addEventListener('click', fix, true);
  }

  /* Blackboard's and KU Loket's own pages (the ones the app leaves alone) have no dark look of their own. In dark
     mode they get a "smart invert": light becomes dark, colours keep their hue, and pictures, videos and embedded
     documents are turned back so they look exactly as they should. */
  function classicDark() {
    if (THEME === 'light') return;
    const css = 'html{filter:invert(1) hue-rotate(180deg)!important;background:#fff!important}'
      + 'html :is(img,video,iframe,canvas,picture,embed,object,[style*="background-image"]){filter:invert(1) hue-rotate(180deg)!important}'
      + 'html picture img,html :is(img,video,iframe,canvas,picture,embed,object,[style*="background-image"]) :is(img,video,iframe,canvas,picture,embed,object,[style*="background-image"]){filter:none!important}';
    const st = document.createElement('style');
    st.id = 'tm4-dark';
    st.textContent = THEME === 'dark' ? css : `@media (prefers-color-scheme:dark){${css}}`;
    const add = () => { const box = document.head || document.documentElement; if (box && !document.getElementById('tm4-dark')) box.appendChild(st); };
    whenRoot(add);
    // keep it last, so later stylesheets can't win
    const keep = () => { if (document.head && st.parentNode && st !== document.head.lastElementChild) document.head.appendChild(st); };
    W.addEventListener('DOMContentLoaded', keep);
    W.addEventListener('load', keep);
  }

  const TM_ICON = 'https://toledo.kuleuven.be/portal/images/favicon/apple-touch-icon.png'; // Toledo's own icon (public)

  /* ================================================================== shell */
  /* The site's own app must not start next to ours: Toledo's portal app, Blackboard's app or the KU Loket launchpad
     running hidden in the background costs a lot of memory, and on an iPhone that makes Safari kill the tab ("A
     problem repeatedly occurred", a black screen). Scripts the parser still adds are switched off before they run
     (the parser hands new nodes to observers before it runs a script). */
  function blockScripts(match) {
    const off = (n) => {
      if (n.nodeType !== 1 || n.tagName !== 'SCRIPT' || n.hasAttribute('data-tm4')) return;
      if (match && !match(n)) return;
      n.type = 'text/tm4-blocked';
      n.removeAttribute('src');
      n.remove();
    };
    const mo = new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach((n) => {
      off(n);
      if (n.nodeType === 1 && n.firstElementChild && n.getElementsByTagName('script').length) Array.from(n.getElementsByTagName('script')).forEach(off);
    })));
    mo.observe(document, { childList: true, subtree: true });
    document.querySelectorAll('script').forEach(off);
    return mo;
  }
  function takeover(title, preconnect) {
    try { W.stop(); } catch (_) {}
    blockScripts();
    // reuse the page's own <html> and let the parser create head + body (a detached, script-built body
    // can leave the browser without a first paint)
    let root = document.documentElement;
    if (!root) { root = document.createElement('html'); document.appendChild(root); }
    Array.from(root.attributes).forEach((a) => root.removeAttribute(a.name));
    root.innerHTML = '<head></head><body></body>';
    root.lang = 'nl';
    root.className = 'tm4';
    const head = document.head;
    const add = (tag, attrs) => { const m = document.createElement(tag); Object.entries(attrs).forEach(([k, v]) => m.setAttribute(k, v)); head.appendChild(m); return m; };
    add('meta', { charset: 'utf-8' });
    add('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' });
    add('meta', { name: 'format-detection', content: 'telephone=no' });
    (preconnect || []).forEach((h) => add('link', { rel: 'preconnect', href: h, crossorigin: 'use-credentials' }));
    add('title', {}).textContent = title;
    // home-screen icon (Safari's "Zet op beginscherm" reads it from the page; without one it draws a letter)
    add('link', { rel: 'apple-touch-icon', sizes: '180x180', href: TM_ICON });
    add('link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://toledo.kuleuven.be/portal/images/favicon/favicon-32x32.png' });
    add('style', { 'data-tm4': '' }).textContent = CSS;
    applyTheme(THEME);
    if (/[?&#]th=(light|dark|auto)\b/.test(location.hash + '&' + __TM_LOC__.search)) saveTheme(THEME);
    try { history.scrollRestoration = 'manual'; } catch (_) {}
    initPress();
    initMotion();
    initThemeLinks();
    keepOut();
  }

  // Safari can keep handing the page's own markup and styles to the document after we took over (when the whole
  // page had already arrived, or when the extension started the script a moment late), and the site's own app may
  // still add things. None of that may show for even a moment or restyle the app: the CSS hides everything in
  // <body> that isn't ours, and stylesheets that aren't ours are taken out as soon as they appear.
  function keepOut() {
    const root = document.documentElement;
    if (!root || root.__tmKeep) return;
    root.__tmKeep = true;
    const foreignStyle = (n) => n.nodeType === 1 && !n.hasAttribute('data-tm4') && (n.tagName === 'STYLE' || (n.tagName === 'LINK' && /stylesheet/i.test(n.getAttribute('rel') || '')));
    const clean = () => {
      [root, document.head].forEach((box) => { if (box) Array.from(box.children).forEach((n) => { if (foreignStyle(n)) n.remove(); }); });
      if (document.head && headObs.__on !== document.head) { headObs.disconnect(); headObs.observe(document.head, { childList: true }); headObs.__on = document.head; }
    };
    const headObs = new MutationObserver(clean);
    new MutationObserver(clean).observe(root, { childList: true });
    clean();
  }

  // a page on the way somewhere else (a redirect, Toledo's link service): cover it in the app's colours instead of
  // showing it, without touching it (its own redirect has to keep running)
  function cover(text) {
    const dark = isDark();
    const st = document.createElement('style');
    st.textContent = `html{background:${dark ? '#000' : '#f2f2f7'}!important}body{visibility:hidden!important}html::after{content:"${text}";visibility:visible;position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:${dark ? '#000' : '#f2f2f7'};color:${dark ? '#98989f' : '#6d6d72'};font:600 17px -apple-system,system-ui,sans-serif}`;
    (document.head || document.documentElement).appendChild(st);
    // still here after a while: the page has something to say (an error, a question), so show it after all
    setTimeout(() => st.remove(), 7000);
  }

  /* ================================================================== page-to-page motion */
  // Going to another page (a course, back to the app's tabs, a file) is a real page load in Safari. Safari keeps
  // showing the current page until the next one can paint, so the tap gets an answer right away: the content
  // slides aside and dims and a loading bar runs under the navigation bar. The next page then slides in, like
  // a screen being pushed (or popped) in an app, instead of popping up after a white flash.
  let leaveT = 0;
  function leaving(dir) {
    const r = document.documentElement;
    if (!r || !r.classList.contains('tm4')) return;
    r.classList.remove('tm-arrive', 'tm-arrive-fwd', 'tm-arrive-back', 'tm-leave-fwd', 'tm-leave-back');
    void r.offsetWidth;
    r.classList.add('tm-leaving', dir === 'back' ? 'tm-leave-back' : 'tm-leave-fwd');
    clearTimeout(leaveT);
    leaveT = setTimeout(stay, 8000); // a download, or a link that opened elsewhere: give the page back
  }
  function stay() {
    clearTimeout(leaveT);
    const r = document.documentElement;
    if (r) r.classList.remove('tm-leaving', 'tm-leave-fwd', 'tm-leave-back');
  }
  function goTo(url, { replace, dir } = {}) {
    url = withTheme(url);
    if (!TEST) leaving(dir);
    if (replace) __TM_REPL__(url); else __TM_GO__(url);
  }
  // which way does a link go? back to the app's tabs (portal) is "back", everything else is "forward"
  const dirOf = (url) => (SITE !== 'portal' && /^https:\/\/toledo\.kuleuven\.be\/portal/.test(url) ? 'back' : 'fwd');
  function initMotion() {
    if (W.__tm4motion) return;
    W.__tm4motion = true;
    const r = document.documentElement;
    const ref = hostOf(document.referrer);
    const arrive = SITE === 'ultra' ? (/^toledo\.kuleuven\.be$|journey/.test(ref) ? 'fwd' : '')
      : (/kuleuven\.cloud$|journey|^webwsp\./.test(ref) ? 'back' : '');
    r.classList.add(arrive ? 'tm-arrive-' + arrive : 'tm-arrive');
    setTimeout(() => r.classList.remove('tm-arrive', 'tm-arrive-fwd', 'tm-arrive-back'), 600);
    // ordinary links that leave the page (the app's own handlers run first and cancel what they handle)
    W.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target && e.target.closest && e.target.closest('a[href]');
      if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
      const u = absU(a.getAttribute('href'), location.href);
      if (!/^https:/.test(u) || u.split('#')[0] === location.href.split('#')[0]) return;
      if (!TEST) leaving(dirOf(u));
    });
    // back here from the next page (Safari's back/forward cache): slide the page back into place
    W.addEventListener('pageshow', (e) => { if (e.persisted) stay(); });
    // a link that opened another app (Outlook, Teams…): give the page back when you return
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') stay(); });
  }

  function buildShell(tabs, active) {
    document.body.innerHTML = '<header class="nav" id="tm-nav" data-tm4><div class="nav-l"></div><div class="nav-t"></div><div class="nav-r"></div></header><main id="tm-main" data-tm4></main>'
      + (tabs ? `<nav class="tabbar" id="tm-tabs" data-tm4 aria-label="Navigatie">${tabs.map((t) => `<a href="${esc(t.href)}" data-tab="${t.id}"${t.id === active ? ' class="on" aria-current="page"' : ''}>${ico(t.icon)}<span>${t.label}</span><b class="badge" hidden></b></a>`).join('')}</nav>` : '');
    if (!tabs) document.body.classList.add('no-tabs');
    const nav = $('#tm-nav');
    let ticking = false;
    const upd = () => { ticking = false; nav.classList.toggle('scrolled', W.scrollY > 3); };
    W.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
  }
  const setTabOn = (id) => $$('#tm-tabs a').forEach((a) => {
    const on = a.dataset.tab === id;
    a.classList.toggle('on', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  function setBadge(id, n) {
    const b = $(`#tm-tabs a[data-tab="${id}"] .badge`);
    if (!b) return;
    b.hidden = !n;
    b.textContent = n > 99 ? '99+' : String(n || '');
  }
  function setNav({ back, title, right, always } = {}) {
    const nav = $('#tm-nav');
    if (!nav) return;
    put(nav.querySelector('.nav-l'), back ? `<a class="nb back" href="${esc(back.href || '#')}"${back.act ? ` data-act="${back.act}"` : ''}>${BACK}<span>${esc(back.label || 'Terug')}</span></a>` : '');
    nav.querySelector('.nav-t').textContent = title || '';
    put(nav.querySelector('.nav-r'), right || '');
    nav.classList.toggle('always', !!always);
    nav.classList.toggle('scrolled', W.scrollY > 3);
  }
  let navIO = null;
  function watchTitle(scope) {
    const nav = $('#tm-nav');
    if (!nav) return;
    if (navIO) navIO.disconnect();
    nav.classList.remove('titled');
    const h = scope && scope.querySelector('.lt h1');
    if (!h || !('IntersectionObserver' in W)) { nav.classList.add('titled'); return; }
    const top = Math.round(nav.getBoundingClientRect().height);
    navIO = new IntersectionObserver(([e]) => nav.classList.toggle('titled', !e.isIntersecting && e.boundingClientRect.top < top), { rootMargin: `-${top}px 0px 0px 0px` });
    navIO.observe(h);
  }

  /* if the site's own app got to run before we took over, it may still rewrite the address: keep ours */
  function guardPath() {
    const path = __TM_LOC__.pathname;
    setInterval(() => {
      if (__TM_LOC__.pathname !== path) { try { history.replaceState(history.state, '', path + location.hash); } catch (_) {} }
    }, 700);
  }

  /* touch feedback that waits a moment, so rows don't flash while you scroll */
  function initPress() {
    if (W.__tm4press) return;
    W.__tm4press = true;
    const SEL = '.row, .app, .tile, .chip, .kz, .kf, .btn, .hero, .lesson[data-href], .exam[data-href], .ann, .teaser, .wd, .nb, .tabbar a, .sheet .sa, .frow, .more-row';
    let el = null, t = 0, x = 0, y = 0;
    const clear = () => { clearTimeout(t); if (el) { const e = el; setTimeout(() => e.classList.remove('pressed'), 110); } el = null; };
    document.addEventListener('touchstart', (ev) => {
      const target = ev.target.closest && ev.target.closest(SEL);
      clearTimeout(t);
      if (el) el.classList.remove('pressed');
      el = target || null;
      if (!el) return;
      x = ev.touches[0].clientX; y = ev.touches[0].clientY;
      t = setTimeout(() => el && el.classList.add('pressed'), 65);
    }, { passive: true });
    document.addEventListener('touchmove', (ev) => {
      if (!el) return;
      const p = ev.touches[0];
      if (Math.abs(p.clientX - x) > 9 || Math.abs(p.clientY - y) > 9) { clearTimeout(t); el.classList.remove('pressed'); el = null; }
    }, { passive: true });
    document.addEventListener('touchend', () => { if (el) el.classList.add('pressed'); clear(); }, { passive: true });
    document.addEventListener('touchcancel', clear, { passive: true });
  }

  function sheet({ title, msg, actions }) {
    const { sh, close } = openLayer(`<div class="sg">${title || msg ? `<div class="sh-t">${title ? `<b>${esc(title)}</b>` : ''}${msg ? esc(msg) : ''}</div>` : ''}${actions.map((a, i) => (a.href ? `<a class="sa${a.red ? ' red' : ''}" href="${esc(a.href)}" data-i="${i}">${esc(a.label)}</a>` : `<button type="button" class="sa${a.red ? ' red' : ''}" data-i="${i}">${esc(a.label)}</button>`)).join('')}</div><div class="sg"><button type="button" class="sa bold" data-i="-1">Annuleer</button></div>`);
    sh.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (!b) return;
      const a = actions[Number(b.dataset.i)];
      close();
      if (a && a.run) { e.preventDefault(); try { a.run(); } catch (err) { console.error(err); } }
    });
    return close;
  }

  let toastT = 0;
  function toast(msg) {
    let t = $('#tm-toast');
    if (!t) { t = document.createElement('div'); t.id = 'tm-toast'; t.className = 'toast'; t.setAttribute('role', 'status'); t.setAttribute('data-tm4', ''); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('on'));
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('on'), 2300);
  }

  /* pull down at the top of the page to refresh, like in an app. run() returns a promise (or nothing). */
  function pullRefresh(run) {
    if (W.__tm4ptr || !('ontouchstart' in W)) return;
    W.__tm4ptr = true;
    const ind = document.createElement('div');
    ind.className = 'ptr';
    ind.setAttribute('data-tm4', '');
    ind.setAttribute('aria-hidden', 'true');
    ind.innerHTML = '<span class="spin"></span>';
    document.body.appendChild(ind);
    const spin = ind.firstChild;
    const GO = 72;
    let y0 = 0, x0 = 0, pull = 0, on = false, busy = false;
    const reset = () => { ind.classList.remove('drag', 'busy'); ind.style.transform = ''; ind.style.opacity = ''; spin.style.transform = ''; };
    document.addEventListener('touchstart', (e) => {
      on = false;
      if (busy || W.scrollY > 0 || e.touches.length !== 1 || document.querySelector('.sheet') || (e.target.closest && e.target.closest('input, textarea, .tiles, .chips, .week'))) return;
      on = true; pull = 0; y0 = e.touches[0].clientY; x0 = e.touches[0].clientX;
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      if (!on) return;
      const dy = e.touches[0].clientY - y0, dx = Math.abs(e.touches[0].clientX - x0);
      if (W.scrollY > 2 || (pull < 10 && dx > Math.max(dy, 8))) { on = false; pull = 0; reset(); return; }
      pull = Math.max(0, dy);
      const d = Math.min(GO * 1.5, pull * 0.6);
      ind.classList.add('drag');
      ind.style.opacity = String(Math.min(1, pull / GO));
      ind.style.transform = `translate3d(0,${d}px,0)`;
      spin.style.transform = `rotate(${Math.round(pull * 3)}deg)`;
    }, { passive: true });
    const end = () => {
      if (!on) return;
      on = false;
      if (pull * 0.6 < GO * 0.75) { reset(); pull = 0; return; }
      pull = 0;
      busy = true;
      ind.classList.remove('drag');
      ind.classList.add('busy');
      ind.style.opacity = '1';
      ind.style.transform = 'translate3d(0,52px,0)';
      const t0 = Date.now();
      let p; try { p = Promise.resolve(run()); } catch (_) { p = Promise.resolve(); }
      const done = () => setTimeout(() => { busy = false; ind.style.opacity = '0'; ind.style.transform = ''; setTimeout(reset, 300); }, Math.max(0, 650 - (Date.now() - t0)));
      Promise.race([p, new Promise((r) => setTimeout(r, 12000))]).then(done, done);
    };
    document.addEventListener('touchend', end, { passive: true });
    document.addEventListener('touchcancel', () => { if (on) { on = false; pull = 0; reset(); } }, { passive: true });
  }

  /* ================================================================== building blocks */
  function row(o) {
    const isLink = !!o.href;
    const tag = isLink ? 'a' : (o.act ? 'button' : 'div');
    const attrs = (isLink ? ` href="${esc(o.href)}"` : o.act ? ` type="button" data-act="${o.act}"` : '') + (o.attrs || '') + (o.style ? ` style="${o.style}"` : '');
    const lead = o.iconHtml || (o.icon ? `<span class="ic${o.soft ? ' soft' : ''}">${ico(o.icon)}</span>` : '');
    const tail = (o.end || '') + (o.external ? EXT : (o.chevron === false || (!isLink && !o.act) ? '' : CHEV));
    return `<${tag} class="row${o.cls ? ' ' + o.cls : ''}"${attrs}>${o.dot ? '<i class="dot lead"></i>' : ''}${lead}<span class="main"><span class="t${o.bold ? ' b' : ''}${o.clamp ? ' clamp2' : ''}">${o.titleHtml || esc(o.title)}</span>${o.sub || o.subHtml ? `<span class="s${o.subOne ? ' one' : ''}">${o.subHtml || esc(o.sub)}</span>` : ''}</span>${tail ? `<span class="end">${tail}</span>` : ''}</${tag}>`;
  }
  const skRows = (n) => Array.from({ length: n }, (_, i) => `<div class="sk-row"><span class="sk ic"></span><span class="lines"><span class="sk" style="display:block;width:${70 + ((i * 37) % 25)}%"></span><span class="sk" style="display:block"></span></span></div>`).join('');
  const skGroup = (n) => `<div class="group">${skRows(n)}</div>`;
  const empty = (icon, title, text, extra) => `<div class="empty">${ico(icon)}<b>${esc(title)}</b>${text ? esc(text) : ''}${extra || ''}</div>`;
  function segHtml(items, active, act) {
    const i = Math.max(0, items.findIndex((x) => x.id === active));
    return `<div class="seg" role="tablist"><span class="thumb" style="width:calc((100% - 8px) / ${items.length});transform:translateX(${i * 100}%)"></span>${items.map((x) => `<button type="button" role="tab" data-act="${act}" data-id="${x.id}"${x.id === active ? ' class="on" aria-selected="true"' : ' aria-selected="false"'}>${esc(x.label)}</button>`).join('')}</div>`;
  }
  function segSet(scope, id) {
    const seg = scope.querySelector('.seg');
    if (!seg) return;
    const btns = $$('button', seg);
    const i = Math.max(0, btns.findIndex((b) => b.dataset.id === id));
    btns.forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', String(j === i)); });
    seg.querySelector('.thumb').style.transform = `translateX(${i * 100}%)`;
  }

  function ftype(name, mime) {
    const s = `${name || ''} ${mime || ''}`.toLowerCase();
    if (/pdf/.test(s)) return ['PDF', '#e5484d'];
    if (/powerpoint|presentation|\.pptx?\b|\.key\b/.test(s)) return ['PPT', '#ef6c2a'];
    if (/msword|wordprocessing|\.docx?\b|\.rtf\b|\.pages\b/.test(s)) return ['DOC', '#2f6fde'];
    if (/excel|spreadsheet|\.xlsx?\b|\.csv\b|\.numbers\b/.test(s)) return ['XLS', '#1f9d55'];
    if (/video|\.(mp4|mov|m4v|avi|webm)\b/.test(s)) return ['VID', '#8e5bd8'];
    if (/audio|\.(mp3|m4a|wav|aac)\b/.test(s)) return ['AUD', '#0fa5a5'];
    if (/image|\.(png|jpe?g|gif|heic|webp|svg)\b/.test(s)) return ['IMG', '#d6409f'];
    if (/zip|compressed|\.(zip|rar|7z)\b/.test(s)) return ['ZIP', '#8e8e93'];
    return ['FILE', '#8e8e93'];
  }

  /* allow-list HTML cleaner: rebuilds the markup from scratch, so no scripts, styles or handlers survive */
  const KEEP = { P: 1, BR: 1, B: 1, STRONG: 1, I: 1, EM: 1, U: 1, S: 1, A: 1, UL: 1, OL: 1, LI: 1, H1: 'H3', H2: 'H3', H3: 1, H4: 1, H5: 1, H6: 1, BLOCKQUOTE: 1, PRE: 1, CODE: 1,
    TABLE: 1, THEAD: 1, TBODY: 1, TFOOT: 1, TR: 1, TD: 1, TH: 1, IMG: 1, SPAN: 1, DIV: 1, HR: 1, SUP: 1, SUB: 1, FIGURE: 1, FIGCAPTION: 1, SMALL: 1, MARK: 1 };
  const DROP = /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|OBJECT|EMBED|FORM|INPUT|BUTTON|SELECT|TEXTAREA|LINK|META|SVG|MATH|HEAD|TITLE|BASE|CANVAS|AUDIO|SOURCE|TRACK)$/;
  function sanitize(html, onAnchor) {
    const src = new DOMParser().parseFromString(String(html || ''), 'text/html').body;
    const out = document.createElement('div');
    const walk = (from, to) => {
      for (const n of Array.from(from.childNodes)) {
        if (n.nodeType === 3) { to.appendChild(document.createTextNode(n.nodeValue)); continue; }
        if (n.nodeType !== 1) continue;
        const tag = n.tagName;
        if (DROP.test(tag)) continue;
        if (tag === 'A' && onAnchor) { const rep = onAnchor(n); if (rep) { to.insertAdjacentHTML('beforeend', rep); continue; } }
        if (tag === 'IFRAME' || tag === 'VIDEO') {
          const srcEl = n.getAttribute('src') ? n : n.querySelector('source');
          const s = absU(srcEl ? srcEl.getAttribute('src') || '' : '');
          if (s.startsWith('https:')) to.insertAdjacentHTML('beforeend', `<a class="embed" href="${esc(s)}">${ico('play')}Video openen</a>`);
          continue;
        }
        const k = KEEP[tag];
        if (!k) { walk(n, to); continue; }
        const el = document.createElement(k === 1 ? tag : k);
        if (tag === 'A') { const h = absU(n.getAttribute('href') || ''); if (h) el.setAttribute('href', h); }
        else if (tag === 'IMG') {
          const s = absU(n.getAttribute('src') || '');
          if (!s.startsWith('https:')) continue;
          el.setAttribute('src', s); el.setAttribute('loading', 'lazy'); el.setAttribute('alt', n.getAttribute('alt') || '');
        } else if (tag === 'TD' || tag === 'TH') ['colspan', 'rowspan'].forEach((a) => { if (n.hasAttribute(a)) el.setAttribute(a, n.getAttribute(a)); });
        to.appendChild(el);
        if (tag !== 'IMG') walk(n, el);
      }
    };
    walk(src, out);
    $$('p, div, span', out).reverse().forEach((e) => { if (!e.textContent.trim() && !e.querySelector('img, a, br, hr, table')) e.remove(); });
    return out.innerHTML;
  }
  /* ================================================================== study progress + ISP pages (portal) */
  // Pure renderers: they take the data read from KU Loket (see studyData / ispData in loket.js) and return HTML.
  const nl = (n, d = 1) => { if (n == null || !Number.isFinite(n)) return ''; const s = n.toFixed(d).replace('.', ','); return d ? s.replace(/,0+$/, '') : s; };
  const spTxt = (n) => `${nl(n, 1)} sp`;
  const acy = (y) => { const n = Number(y); return n ? `${n}–${n + 1}` : String(y || ''); };
  const acyS = (y) => { const n = Number(y); return n ? `${String(n).slice(2)}–${String(n + 1).slice(2)}` : String(y || ''); };
  const scoreOf = (c) => { const n = parseFloat(String(c.r || '').replace(',', '.')); return /^\d+([.,]\d+)?$/.test(String(c.r || '')) && (!c.sc || /20$/.test(c.sc)) ? n : null; };
  const scoreCol = (n) => (n == null ? 'var(--sub)' : n >= 16 ? '#30b955' : n >= 14 ? '#0fa5a5' : n >= 12 ? '#0a84ff' : n >= 10 ? '#ff9500' : '#ff3b30');
  const dNice = (s) => { const t = s ? fromYmd(s) : 0; return t ? `${new Date(t).getDate()} ${MONTHS_S[new Date(t).getMonth()]} ${new Date(t).getFullYear()}` : ''; };
  const RESULT_WORD = { NA: 'Niet afgelegd', NI: 'Niet ingeschreven', VR: 'Vrijstelling', VZ: 'Vrijstelling', GR: 'Geslaagd', ND: 'Niet deelgenomen', GO: 'Gewettigd afwezig', TO: 'Tolerantie' };
  const shortProg = (n) => String(n || '').replace(/\s*\((Leuven|Brussel|Kortrijk|Gent|Antwerpen|Kulak)[^)]*\)\s*$/i, '').trim();

  // ring chart: segments [{v, c}] of a total, with something in the middle
  function ringSvg(segs, total, { size = 112, w = 12, mid = '', track = 'var(--fill)' } = {}) {
    const r = (size - w) / 2, C = 2 * Math.PI * r;
    let off = 0;
    const sum = total || segs.reduce((a, s) => a + s.v, 0) || 1;
    const arcs = segs.filter((s) => s.v > 0).map((s) => {
      const len = Math.max(0, (s.v / sum) * C - (segs.length > 1 ? 2 : 0));
      const a = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${s.c}" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="${len.toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>`;
      off += (s.v / sum) * C;
      return a;
    }).join('');
    return `<div class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${track}" stroke-width="${w}"/>${arcs}</svg><div class="ring-mid">${mid}</div></div>`;
  }
  // horizontal stacked bar with a legend underneath
  function stackHtml(segs) {
    const sum = segs.reduce((a, s) => a + s.v, 0) || 1;
    return `<div class="stack">${segs.filter((s) => s.v > 0).map((s) => `<i style="flex:${s.v};background:${s.c}"></i>`).join('')}</div>`
      + `<div class="legend">${segs.map((s) => `<span><i style="background:${s.c}"></i>${esc(s.label)} <b>${esc(spTxt(s.v))}</b></span>`).join('')}</div>`
      + (sum ? '' : '');
  }
  const card = (title, body, right) => `<div class="card">${title ? `<div class="card-h"><b>${esc(title)}</b>${right || ''}</div>` : ''}${body}</div>`;

  const ST_COL = (k) => (/^(behaald|verworven)/i.test(k) ? '#30b955' : /^getolereerd/i.test(k) ? '#ff9500' : /^opgenomen/i.test(k) ? 'var(--accent)' : 'var(--fill2)');
  function creditsOf(s) {
    const pick = (list, re) => (list || []).filter(([k]) => re.test(k)).reduce((a, [, v]) => a + v, 0);
    const list = s.now && s.now.length ? s.now : s.prog;
    const earned = pick(list, /^(behaald|verworven|getolereerd)/i);
    const taking = pick(list, /^opgenomen/i);
    const failed = s.active ? pick(s.prog, /^niet (behaald|verworven)/i) : 0;
    const total = s.total || 0;
    return { list, earned, taking, failed, total, rest: total ? Math.max(0, total - earned - taking) : 0 };
  }
  function yearAvg(y) {
    let a = 0, w = 0;
    y.c.forEach((c) => { const n = scoreOf(c); if (n != null && c.sp) { a += n * c.sp; w += c.sp; } });
    return w ? a / w : null;
  }

  // KU Loket's "situering": the students who passed this course (in the last few years) split into groups A (best) to E,
  // with each group's score range, head count and share. Everything here is read from those groups; "better" is an estimate.
  function rankStats(c) {
    const rk = c.rk || [];
    if (!rk.length) return null;
    const all = rk.reduce((a, k) => a + k[3], 0);
    const tot = rk.reduce((a, k) => a + k[4], 0) || 100;
    const pc = (k) => (k[4] / tot) * 100;
    const i = rk.findIndex((k) => k[5]);
    const mine = i >= 0 ? rk[i] : null;
    let above = 0, aboveN = 0;
    for (let j = 0; j < (mine ? i : 0); j++) { above += pc(rk[j]); aboveN += rk[j][3]; }
    let better = null;
    if (mine) {
      const n = scoreOf(c), lo = mine[1], hi = Math.floor(mine[2] + 0.05) + 1;
      const f = n != null && hi > lo ? Math.min(1, Math.max(0, (n - lo + 0.5) / (hi - lo))) : 0.5;
      better = Math.max(0, 100 - above - pc(mine)) + pc(mine) * f;
    }
    let cum = 0, med = null;
    for (const k of rk) { cum += pc(k); if (cum >= 50) { med = k; break; } }
    return { rk, all, pc, mine, top: mine ? above + pc(mine) : null, from: aboveN + 1, to: aboveN + (mine ? mine[3] : 0), better, med };
  }
  const rangeTxt = (k) => `${nl(k[1])}–${nl(k[2])}`;
  const grpCol = (k) => scoreCol(k[1] >= 10 ? k[1] + 0.5 : k[1]);
  function findResult(S, key) {
    const [sid, yy, code] = String(key || '').split(':');
    for (const s of S || []) {
      if (s.id !== sid) continue;
      for (const y of s.years) if (y.y === yy) { const c = y.c.find((x) => x.code === code); if (c) return { s, y, c }; }
    }
    return null;
  }
  // the page you get when you tap a course with a score
  function resultHtml(S, key) {
    const f = findResult(S, key);
    if (!f) return '';
    const { s, y, c } = f;
    const n = scoreOf(c), st = rankStats(c);
    const failed = /niet geslaagd/i.test(c.st) || (n != null && n < 10);
    const col = failed ? '#ff3b30' : scoreCol(n);
    let h = `<div class="lt"><h1${c.t.length > 26 ? ' class="long"' : ''}>${esc(c.t)}</h1></div>`;
    // hero: your score and, if KU Loket has one, your place
    const mid = st && st.better != null ? `<b>${esc(nl(st.better, 0))}<small style="font-size:15px;margin:0">%</small></b><small>scoorde<br>lager</small>` : `<b>${esc(nl(n))}</b><small>op 20</small>`;
    const ringV = st && st.better != null ? st.better : (n || 0) * 5;
    h += `<div class="st-hero res-hero" style="--rc:${col}"><div class="st-top"><span class="hero-lbl"><i style="background:${col}"></i>${st && st.mine ? `Groep ${esc(st.mine[0])}` : failed ? 'Niet geslaagd' : 'Resultaat'}</span><span class="hero-cd">${esc(acy(y.y))}</span></div>
      <div class="st-row">${ringSvg([{ v: ringV, c: col }], 100, { mid, track: 'rgba(255,255,255,.2)' })}
      <div class="st-kpis">${st && st.better != null ? `<div class="kpi"><b>${esc(nl(n))}<small>/20</small></b><span>jouw score</span></div>` : ''}
      ${st && st.mine ? `<div class="kpi"><b>${st.from === st.to ? st.from : `${st.from}–${st.to}`}</b><span>plaats van ${st.all} geslaagden</span></div>` : st ? `<div class="kpi"><b>${st.all}</b><span>studenten slaagden</span></div>` : ''}
      ${!st || st.better == null ? `<div class="kpi"><b>${esc(nl(c.sp, 0))}<small> sp</small></b><span>${failed ? 'nog niet verworven' : 'verworven'}</span></div>` : ''}</div></div></div>`;
    if (st) {
      const asc = st.rk.slice().reverse(); // E (lowest) left, A (best) right
      // where you are on one line, every group as wide as its share of students
      const strip = `<div class="pos${st.better != null ? ' has-me' : ''}"><div class="pos-bar">${asc.map((k) => `<i class="${k[5] ? 'me' : ''}" style="flex:${Math.max(0.5, st.pc(k)).toFixed(2)};--g:${grpCol(k)}"><span>${esc(k[0])}</span></i>`).join('')}</div>
        ${st.better != null ? `<div class="pos-me" style="left:${Math.min(98, Math.max(2, st.better)).toFixed(1)}%"><b style="transform:translateX(-${Math.min(90, Math.max(10, st.better)).toFixed(0)}%)">Jij · ${esc(nl(n))}</b></div>` : ''}
        <div class="pos-ax"><span>lager</span><span>hoger</span></div></div>`;
      const line = st.mine
        ? (st.top <= 50 ? `Je hoort bij de beste <b>${esc(nl(Math.ceil(st.top), 0))}%</b> van wie slaagde.` : `Ongeveer <b>${esc(nl(st.better, 0))}%</b> van wie slaagde, scoorde lager dan jij.`)
        : failed ? 'Je score telt hier niet mee: KU Loket vergelijkt alleen met studenten die slaagden.' : 'KU Loket gaf je voor dit vak geen groep.';
      h += card('Waar sta je', `<p class="pos-line">${line}</p>${strip}`);
      // the groups as a bar chart
      const mx = Math.max(...st.rk.map((k) => k[3]), 1);
      h += card('Verdeling', `<div class="vbars rk-hist">${asc.map((k) => `<div class="vb${k[5] ? ' me' : ''}"><span class="vb-v">${esc(nl(st.pc(k), 0))}%</span><span class="vb-bar"><i style="height:${Math.max(5, (k[3] / mx) * 100).toFixed(1)}%;background:${k[5] ? col : 'var(--ter)'}"></i></span><span class="vb-l"><b>${esc(k[0])}</b>${esc(rangeTxt(k))}</span></div>`).join('')}</div>
        <p class="card-note">${st.all} geslaagde studenten${c.sy > 1 ? ` over de laatste ${c.sy} academiejaren` : ''}, per groep met hun scores op 20.</p>`, st.mine ? `<span>jij: groep ${esc(st.mine[0])}</span>` : '');
    }
    // compared with...
    const cmp = [];
    const dif = (a) => { const d = Math.round((n - a) * 10) / 10; return d === 0 ? '<span class="cmp-d">gelijk</span>' : `<span class="cmp-d ${d > 0 ? 'up' : 'down'}">${d > 0 ? '+' : '−'}${esc(nl(Math.abs(d)))}</span>`; };
    if (st && st.med) cmp.push(['Middelste geslaagde student', `groep ${st.med[0]} · ${rangeTxt(st.med)}`, n != null ? (n > st.med[2] ? '<span class="cmp-d up">hoger</span>' : n < st.med[1] ? '<span class="cmp-d down">lager</span>' : '<span class="cmp-d">gelijk</span>') : '']);
    const ya = yearAvg(y);
    if (ya != null && n != null) cmp.push([`Je gemiddelde in ${acy(y.y)}`, nl(ya, 1), dif(ya)]);
    let A = 0, W = 0;
    s.years.forEach((yr) => yr.c.forEach((x) => { const v = scoreOf(x); if (v != null && x.sp) { A += v * x.sp; W += x.sp; } }));
    if (W && n != null && s.years.length > 1) cmp.push([`Je gemiddelde in ${/^master/i.test(s.name) ? 'je master' : /^bachelor/i.test(s.name) ? 'je bachelor' : 'deze opleiding'}`, nl(A / W, 1), dif(A / W)]);
    if (cmp.length) h += `<div class="gh">Vergeleken met</div><div class="group">${cmp.map(([a, b, d]) => `<div class="row kv"><span class="main"><span class="t">${esc(a)}</span><span class="s">${esc(b)}</span></span><span class="end">${d}</span></div>`).join('')}</div>`;
    // the facts
    const word = RESULT_WORD[String(c.r || '').toUpperCase()] || '';
    const facts = [['Status', c.st + (word && word !== c.st ? ` (${word})` : '')], ['Bekendgemaakt', dNice(c.d)], ['Studiepunten', spTxt(c.sp)], ['Poging', c.n > 1 ? `${c.n}e keer` : 'Eerste keer'], ['Tolerantie', c.tol ? 'Ja' : ''], ['Code', c.code]].filter((x) => x[1]);
    h += `<div class="gh">Details</div><div class="group">${facts.map(([a, b]) => `<div class="row kv"><span class="main"><span class="t">${esc(a)}</span></span><span class="end"><span class="kv-v">${esc(b)}</span></span></div>`).join('')}</div>`;
    h += `<p class="fresh">${st ? 'Groepen, aantallen en percentages komen uit KU Loket. Wie niet slaagde, telt daarin niet mee. "Lager dan jij" is een schatting binnen je groep.' : 'KU Loket toont voor dit vak geen vergelijking met andere studenten.'}</p>`;
    return h;
  }
  function resultRow(c, key, open, current) {
    const n = scoreOf(c);
    const word = RESULT_WORD[String(c.r || '').toUpperCase()] || '';
    const failed = /niet geslaagd/i.test(c.st);
    const pill = current && !c.r ? '<span class="cap blue">Bezig</span>'
      : n != null ? `<span class="score" style="--sc:${failed ? '#ff3b30' : scoreCol(n)}">${esc(nl(n))}<small>/20</small></span>`
        : `<span class="cap${failed ? ' red' : ''}">${esc(c.r || c.st || '—')}</span>`;
    const sub = [c.code, spTxt(c.sp), c.n > 1 ? `${c.n}e keer` : '', c.tol ? 'tolerantie' : '', c.sit && n != null ? `groep ${c.sit}` : ''].filter(Boolean).join(' · ');
    // a score opens its own page with the statistics; anything else (exemption, not taken...) folds open in place
    if (n != null) return `<div class="res"><a class="row${failed ? ' failed' : ''}" href="#resultaat/${encodeURIComponent(key)}"><span class="main"><span class="t">${esc(c.t)}</span><span class="s">${esc(sub)}</span></span><span class="end">${pill}${CHEV}</span></a></div>`;
    const canOpen = !current || c.r;
    const det = open ? `<div class="res-d">${[c.d ? `Bekendgemaakt op ${esc(dNice(c.d))}` : '', c.st ? esc(c.st) + (word && word !== c.st ? ` (${esc(word)})` : '') : ''].filter(Boolean).join(' · ')}</div>` : '';
    return `<div class="res${open ? ' open' : ''}"${canOpen ? ` data-act="resopen" data-k="${esc(key)}" role="button"` : ''}><div class="row${failed ? ' failed' : ''}"><span class="main"><span class="t">${esc(c.t)}</span><span class="s">${esc(sub)}</span></span><span class="end">${pill}</span></div>${det}</div>`;
  }

  function studyHtml(S, sel, open, meta) {
    if (!S || !S.length) return '';
    const s = S[Math.min(sel, S.length - 1)];
    const cr = creditsOf(s);
    let h = '';
    if (S.length > 1) h += segHtml(S.map((x, i) => ({ id: String(i), label: /^master/i.test(x.name) ? 'Master' : /^bachelor/i.test(x.name) ? 'Bachelor' : shortProg(x.name).split(' ')[0] })), String(sel), 'stsel');
    // hero: credits ring + diploma percentage
    const ringSegs = [{ v: cr.earned, c: '#4cd964' }, { v: cr.taking, c: '#7fc1ff' }];
    const mid = cr.total ? `<b>${esc(nl(cr.earned, 0))}</b><small>van ${esc(nl(cr.total, 0))} sp</small>` : `<b>${esc(nl(cr.earned, 0))}</b><small>sp verworven</small>`;
    h += `<div class="st-hero"><div class="st-top"><span class="hero-lbl"><i></i>${s.done ? 'Diploma behaald' : s.active ? 'Bezig' : 'Vorige opleiding'}</span>${s.done && s.doneYear ? `<span class="hero-cd">${esc(acy(s.doneYear))}</span>` : ''}</div>
      <div class="st-name">${esc(shortProg(s.name))}</div>
      <div class="st-row">${ringSvg(ringSegs, cr.total || cr.earned + cr.taking, { mid, track: 'rgba(255,255,255,.2)' })}
        <div class="st-kpis">${s.pct != null ? `<div class="kpi"><b>${esc(nl(s.pct, 2))}<small>%</small></b><span>Diplomapercentage</span></div>` : ''}
        ${cr.total ? `<div class="kpi"><b>${esc(nl(Math.round(((cr.earned) / cr.total) * 100), 0))}<small>%</small></b><span>van je opleiding verworven</span></div>` : ''}</div></div></div>`;
    // credits
    const LBL = { behaald: 'Verworven', opgenomen: s.active ? 'Dit jaar opgenomen' : 'Opgenomen' };
    const segs = cr.list.filter(([k]) => !/^niet/i.test(k)).map(([k, v]) => ({ v, c: ST_COL(k), label: LBL[k.toLowerCase()] || k }));
    if (cr.rest) segs.push({ v: cr.rest, c: 'var(--fill2)', label: 'Nog te doen' });
    h += card('Studiepunten', stackHtml(segs) + (cr.failed ? `<p class="card-note">${esc(spTxt(cr.failed))} nog niet verworven uit vorige zittijden.</p>` : ''), cr.total ? `<span>${esc(spTxt(cr.total))}</span>` : '');
    // averages per year
    // every academic year you have results for, across all your studies (so the master continues where the bachelor ended)
    const allYears = {};
    S.forEach((x) => x.years.forEach((y) => { (allYears[y.y] = allYears[y.y] || []).push(...y.c); }));
    const graded = Object.keys(allYears).sort().map((k) => ({ y: k, a: yearAvg({ c: allYears[k] }) })).filter((x) => x.a != null).slice(-6);
    if (graded.length) {
      let A = 0, W = 0;
      s.years.forEach((y) => y.c.forEach((c) => { const n = scoreOf(c); if (n != null && c.sp) { A += n * c.sp; W += c.sp; } }));
      const lo = 8, hi = 20;
      const bars = graded.map((g) => `<div class="vb"><span class="vb-v">${esc(nl(g.a, 1))}</span><span class="vb-bar"><i style="height:${Math.max(6, ((g.a - lo) / (hi - lo)) * 100).toFixed(1)}%;background:${scoreCol(g.a)}"></i></span><span class="vb-l">${esc(acyS(g.y))}</span></div>`).join('');
      h += card('Gemiddelde per academiejaar', `<div class="vbars">${bars}</div><p class="card-note">Gewogen naar studiepunten, op 20${S.length > 1 ? ', over al je opleidingen' : ''}. ${esc(shortProg(s.name))}: <b>${esc(nl(A / W, 2))}</b> gemiddeld.</p>`);
      // spread of your own scores
      const B = [['<10', 0, 10, '#ff3b30'], ['10–11', 10, 12, '#ff9500'], ['12–13', 12, 14, '#0a84ff'], ['14–15', 14, 16, '#0fa5a5'], ['16–17', 16, 18, '#30b955'], ['18–20', 18, 21, '#30b955']];
      const cnt = B.map((b) => s.years.reduce((a, y) => a + y.c.filter((c) => { const n = scoreOf(c); return n != null && n >= b[1] && n < b[2]; }).length, 0));
      const mx = Math.max(...cnt, 1);
      h += card('Je scores', `<div class="vbars hist">${B.map((b, i) => `<div class="vb"><span class="vb-v">${cnt[i] || ''}</span><span class="vb-bar"><i style="height:${cnt[i] ? Math.max(8, (cnt[i] / mx) * 100).toFixed(1) : 0}%;background:${b[3]}"></i></span><span class="vb-l">${b[0]}</span></div>`).join('')}</div>`);
    }
    // results per year
    s.years.forEach((y) => {
      const cur = y.c.every((c) => !c.r);
      const avg = yearAvg(y);
      const sp = y.c.reduce((a, c) => a + c.sp, 0);
      h += `<div class="gh">${esc(acy(y.y))}${cur ? ' · dit jaar' : ''}<span>${esc(spTxt(sp))}${avg != null ? ` · gem. ${esc(nl(avg, 1))}` : ''}</span></div>`;
      const list = y.c.slice().sort((a, b) => (scoreOf(b) ?? -1) - (scoreOf(a) ?? -1) || a.t.localeCompare(b.t));
      h += `<div class="group">${(cur ? y.c : list).map((c) => { const k = `${s.id}:${y.y}:${c.code}`; return resultRow(c, k, !!open[k], cur); }).join('')}</div>`;
    });
    h += `<p class="fresh">${meta || ''}<br><a href="https://www.kuleuven.be/kuloket/zr_1017?sap-language=NL">Open het studievoortgangsdossier in KU Loket</a></p>`;
    return h;
  }

  const PER = { '001': 'jaarvak', '002': '1e semester', '003': '2e semester' };
  const GCOL = ['#0a84ff', '#8e5bd8', '#ff9500', '#30b955', '#d6409f', '#0fa5a5'];
  function ispHtml(I, S, meta) {
    if (!I) return '';
    const byId = {};
    I.groups.forEach((g) => { byId[g.id] = g; });
    const topOf = (id) => { let g = byId[id], guard = 0; while (g && g.l > 1 && byId[g.p] && guard++ < 10) g = byId[g.p]; return g; };
    const tops = I.groups.filter((g) => g.l === 1);
    const ok = I.courses.filter((c) => c.st === 'ok'), now = I.courses.filter((c) => c.st === 'now');
    const sum = (l) => l.reduce((a, c) => a + c.sp, 0);
    const st = (S || []).find((x) => shortProg(x.name) === shortProg(I.name)) || (S || []).find((x) => x.active);
    const total = (st && st.total) || 0;
    const earned = sum(ok), taking = sum(now), rest = total ? Math.max(0, total - earned - taking) : 0;
    let h = `<div class="st-hero isp"><div class="st-top"><span class="hero-lbl"><i></i>ISP ${esc(acy(I.yr))}</span></div><div class="st-name">${esc(shortProg(I.name))}</div>${I.spec ? `<div class="st-spec">${esc(I.spec)}</div>` : ''}
      <div class="st-row">${ringSvg([{ v: earned, c: '#4cd964' }, { v: taking, c: '#7fc1ff' }], total || earned + taking, { mid: `<b>${esc(nl(taking, 0))}</b><small>sp dit jaar</small>`, track: 'rgba(255,255,255,.2)' })}
      <div class="st-kpis"><div class="kpi"><b>${esc(nl(earned, 0))}<small> sp</small></b><span>al verworven</span></div>${total ? `<div class="kpi"><b>${esc(nl(rest, 0))}<small> sp</small></b><span>nog te kiezen</span></div>` : `<div class="kpi"><b>${now.length}</b><span>vakken dit jaar</span></div>`}</div></div></div>`;
    // this year by period
    let [s1, s2, yy] = I.sem;
    if (!s1 && !s2 && !yy) { s1 = sum(now.filter((c) => c.per === '002')); s2 = sum(now.filter((c) => c.per === '003')); yy = sum(now.filter((c) => c.per === '001')); }
    h += card(`Dit jaar · ${acy(I.yr)}`, stackHtml([{ v: s1, c: '#0a84ff', label: '1e semester' }, { v: s2, c: '#8e5bd8', label: '2e semester' }, { v: yy, c: '#ff9500', label: 'Jaarvak' }]), `<span>${esc(spTxt(taking))}</span>`);
    // per part of the programme
    tops.forEach((g, gi) => {
      const mine = I.courses.filter((c) => { const t = topOf(c.g); return t && t.id === g.id; });
      const others = Object.entries(I.other).filter(([id]) => { const t = topOf(id); return t && t.id === g.id; }).reduce((a, [, n]) => a + n, 0);
      if (!mine.length && !others) return;
      const col = GCOL[gi % GCOL.length];
      const o = sum(mine.filter((c) => c.st === 'ok')), n = sum(mine.filter((c) => c.st === 'now'));
      h += `<div class="gh">${esc(g.t)}<span>${[o ? `${spTxt(o)} verworven` : '', n ? `${spTxt(n)} dit jaar` : ''].filter(Boolean).map(esc).join(' · ')}</span></div>`;
      const rows = mine.slice().sort((a, b) => (a.st === 'now' ? 0 : 1) - (b.st === 'now' ? 0 : 1) || (a.per || '').localeCompare(b.per || '') || a.t.localeCompare(b.t)).map((c) => {
        const sg = byId[c.g] && byId[c.g].l > 1 ? byId[c.g].t.replace(/^(Major|Minor|Electives)\s*[:-]\s*/i, '') : '';
        const sub = [c.code, spTxt(c.sp), c.st === 'now' ? PER[c.per] || '' : c.yr ? acy(c.yr) : '', sg && sg.length < 40 ? sg : ''].filter(Boolean).join(' · ');
        return row({ href: c.url || undefined, iconHtml: `<span class="ic soft" style="--c:${col}">${c.st === 'ok' ? ico('check') : ico('book')}</span>`, title: c.t, sub, chevron: false, cls: c.st === 'ok' ? 'done' : '',
          end: c.st === 'now' ? '<span class="cap blue">Dit jaar</span>' : '<span class="cap green">Verworven</span>' });
      }).join('');
      h += `<div class="group">${rows}${others ? `<div class="row plain-note"><span class="main"><span class="s">Nog ${others} andere keuzemogelijkhe${others === 1 ? 'id' : 'den'} in deze groep</span></span></div>` : ''}</div>`;
    });
    h += `<p style="margin:22px 16px 0;text-align:center"><a class="btn ghost" href="https://www.kuleuven.be/kuloket/zr_0442?sap-language=NL">${ico('pencil')}ISP aanpassen in KU Loket</a></p>`;
    h += `<p class="fresh">${meta || ''}</p>`;
    return h;
  }
  /* ================================================================== portal app (toledo.kuleuven.be/portal/) */
  function portalApp() {
    takeover('Toledo', [ULTRA, new URL(JOURNEY).origin, LOKET_ORIGIN]);
    // the course pages say when Blackboard last answered (?ub=): while that session is surely still alive,
    // course links go straight to the course instead of through Toledo's link service (one redirect less)
    { const ub = Number(params.get('ub')) || 0; if (ub > 0 && ub * 1e3 <= Date.now() + 60e3) store.set('p:ultraok', ub * 1e3); }
    const cv = (k) => { const c = store.get(k); return c ? c.v : null; };
    const P = {
      tab: '', seg: 'lessen', filter: 'alles', search: '', favEdit: false, favBusy: {}, showComm: false, showOff: false, feedN: 50,
      weekOff: 0, sel: ymd(Date.now()),
      user: cv('p:user'), enr: cv('p:enr') || [], events: cv('p:events') || [], upcoming: cv('p:upcoming') || [],
      links: cv('p:links') || [], mail: cv('p:mail'), agenda: store.get('p:agenda'),
      lu2pk: store.get('p:lu2pk') || {}, seen: store.get('p:seen') || Date.now() - 2 * 864e5,
      err: {}, ag: '', loadedAt: 0, authFail: false,
      study: store.get('p:study'), stSel: 0, stOpen: {}, done: store.get('p:done') || {},
    };
    // the course pages report which assignments you already handed in (?done=pk~contentId~…!pk~…)
    {
      const dn = params.get('done');
      if (dn != null) {
        String(dn).split('!').forEach((part) => {
          const [pk, ...ids] = part.split('~');
          if (/^_\d+_\d+$/.test(pk)) P.done[pk] = ids.filter((x) => /^_\d+_\d+$/.test(x));
        });
        store.set('p:done', P.done);
      }
    }
    // your groups (Groepswerken on the course site hands them over: name~course~e-mails!...), passed on to Studieplek
    if (params.get('gx') != null) store.set('p:grps', String(params.get('gx')).slice(0, 4000));
    // your student number, handed over by the course pages (?rn=r0123456); Toledo itself only gives the login id
    {
      const rn = String(params.get('rn') || '').toLowerCase();
      if (/^r\d{7}$/.test(rn)) store.set('p:rn', rn);
    }
    // your study place bookings, handed over by Studieplek (?kr=id~startDate~startTime~endDate~endTime~name!...)
    const KURT = 'https://kurt3.ghum.kuleuven.be';
    P.kurt = store.get('p:kurt');
    if (params.get('kr') != null) {
      const v = String(params.get('kr')).split('!').filter(Boolean).map((x) => { const [id, sd, st, ed, et, ...n] = x.split('~'); return { id, sd, st, ed, et, n: n.join('~') }; })
        .filter((r) => r.id && /^\d{4}-\d\d-\d\d$/.test(r.sd) && /^\d{4}-\d\d-\d\d$/.test(r.ed) && /^\d\d:\d\d$/.test(r.st) && /^\d\d:\d\d$/.test(r.et));
      P.kurt = { ts: Date.now(), v };
      store.set('p:kurt', P.kurt);
    }
    const pkOf = (u) => (/(?:\/courses\/|courseId=)(_\d+_\d+)/.exec(u || '') || [])[1];
    const curSem = () => { const m = new Date().getMonth(); return m >= 7 || m === 0 ? 'SEMESTER1' : 'SEMESTER2'; };
    // derived lists are rebuilt only when their source data changes (a render asks for them many times)
    const memo = (fn, deps) => { let key = null, val; return () => { const k = deps(); if (!key || k.some((x, i) => x !== key[i])) { key = k; val = fn(); } return val; }; };
    const isDone = (e) => {
      const u = e.url || '';
      const pk = pkOf(u);
      const cid = (/contentId=(_\d+_\d+)/.exec(u) || [])[1];
      return !!(pk && cid && P.done[pk] && P.done[pk].includes(cid));
    };
    function saveStudy(v) {
      if (!v || (!v.study && !v.isp)) return;
      const old = (P.study && P.study.v) || {};
      P.study = { ts: Date.now(), v: { study: v.study || old.study || null, isp: v.isp || old.isp || null } };
      store.set('p:study', P.study);
    }

    function saveAgenda(v) {
      const old = (P.agenda && P.agenda.v) || {};
      // ver 2: exams carry a link to their room (older copies don't, see examsNeedRooms)
      const merged = { lessons: v.lessons || old.lessons || [], exams: v.exams || old.exams || [], range: v.lessons ? v.range : old.range || v.range, ver: v.exams ? 2 : old.ver };
      P.agenda = { ts: Date.now(), v: merged };
      store.set('p:agenda', P.agenda);
    }
    // agenda handed over by the KU Loket page (see syncPage)
    const syncM = /[#&]tmsync=([^&]*)/.exec(location.hash);
    if (syncM) {
      try { const v = JSON.parse(decodeURIComponent(syncM[1])); if (v && (v.lessons || v.exams)) saveAgenda(v); if (v) saveStudy(v); } catch (_) {}
    }

    const TABS = [
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: '#vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: '#vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: '#rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: '#updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: '#meer' },
    ];
    buildShell(TABS, '');

    /* ---------------- derived data ---------------- */
    let enrIdx = null, enrIdxSrc = null;
    const byLu = () => {
      if (enrIdxSrc !== P.enr) {
        enrIdxSrc = P.enr; enrIdx = { lu: {}, code: {} };
        P.enr.forEach((e) => { enrIdx.lu[e.learningUnitId] = e; const c = luCode(e.learningUnitId) || codeOf(e.title); if (c) enrIdx.code[c.toLowerCase()] = e; });
      }
      return enrIdx;
    };
    function learnPk() {
      let ch = false;
      P.events.forEach((e) => {
        const pk = pkOf(e.url);
        if (pk && /^ULTRA-/.test(e.sourceId || '') && P.lu2pk[e.sourceId] !== pk) { P.lu2pk[e.sourceId] = pk; ch = true; }
      });
      if (ch) store.set('p:lu2pk', P.lu2pk);
    }
    function nextLesson(lu, now = Date.now()) {
      if (!lu) return null;
      return lessons().find((l) => l.lu === lu && l.end > now && l.start - now < 8 * 864e5) || null;
    }
    function nextText(l, now = Date.now()) {
      const room = String(l.room || '').split(' · ')[0];
      if (l.start <= now) return `Nu bezig tot ${hhmm(l.end)}${room ? ' · ' + room : ''}`;
      const d = dayDiff(l.start, now);
      const when = d === 0 ? `vandaag ${hhmm(l.start)}` : d === 1 ? `morgen ${hhmm(l.start)}` : `${DAYS[new Date(l.start).getDay()]} ${hhmm(l.start)}`;
      return `${l.exam ? 'Examen' : 'Les'} ${when}${room ? ' · ' + room : ''}`;
    }
    // Course links go through Toledo's own link service (like the official portal does): it signs you in to
    // Blackboard first when that session has expired and lands on the course, where the app takes over.
    // The part after # (route + context) survives those redirects.
    function courseHref(lu, from, extra, pk0) {
      const e = byLu().lu[lu] || {};
      const pk = pk0 || P.lu2pk[lu];
      const q = new URLSearchParams({ lu: lu || '', t: cleanTitle(e.title || ''), k: String(e.color || ''), f: from || P.tab || 'vakken', th: THEME });
      const nl = nextLesson(lu);
      if (nl) q.set('n', nextText(nl));
      const dl = dlPks();
      if (dl) q.set('dl', dl);
      const route = pk ? `#/c/${pk}${extra || ''}` : `#/vak/${encodeURIComponent(lu)}${extra || ''}`;
      const ultraOk = pk && Date.now() - (Number(store.get('p:ultraok')) || 0) < 45 * 60e3;
      if (/^ULTRA-/.test(lu || '') && !ultraOk) return `${JOURNEY}${encodeURIComponent(lu)}${route}?${q}`;
      return pk ? `${ULTRA}/ultra/courses/${pk}/outline${route}?${q}` : '';
    }
    const lessons = memo(() => {
      const ag = P.agenda && P.agenda.v;
      const idx = byLu();
      const out = [];
      if (ag && ag.lessons && ag.lessons.length) {
        ag.lessons.forEach((l) => {
          const st = fromYmd(l.d, l.s);
          const en = l.e && l.e !== '00:00' ? fromYmd(l.d, l.e) : st + 2 * 3600e3;
          const e = idx.code[String(l.c || '').toLowerCase()];
          const exam = /^(evaluation|evaluatie|examen|exam)\b\s*:?/i.test(l.t || '');
          let title = String(l.t || '').replace(/^(evaluation|evaluatie|examen|exam)\b\s*:?\s*/i, '');
          if (e && (!title || (title.length >= 26 && cleanTitle(e.title).startsWith(title)))) title = cleanTitle(e.title);
          out.push({ start: st, end: en, title: title || 'Les', lu: e && e.learningUnitId, color: e ? e.color : 0, room: l.r, url: roomHref(l.u), form: exam ? 'Examen' : l.f, who: exam ? '' : l.p, exam });
        });
      } else {
        (P.upcoming || []).forEach((u) => {
          const loc = u.location || {}, src = u.source || {};
          out.push({ start: u.start, end: u.end, title: u.name || 'Les', lu: src.learningUnitId, color: src.color, room: [loc.mnemonic, loc.roomNumber].filter(Boolean).join(' '), url: roomHref((loc.url || '').replace(/^http:/, 'https:')) });
        });
      }
      return out.sort((a, b) => a.start - b.start);
    }, () => [P.agenda, P.upcoming, P.enr]);
    // a copy of the exam timetable from before 4.9.4 has no room links yet
    const examsNeedRooms = () => { const ag = P.agenda && P.agenda.v; return !!(ag && ag.ver !== 2 && (ag.exams || []).some((x) => x.r && !x.u)); };
    // room link from a lesson in the same room ("DV1 01.56 · aula" -> "DV1 01.56")
    function roomUrl(r) {
      const key = String(r || '').split(' · ')[0].trim().toLowerCase();
      if (!key) return '';
      const ag = P.agenda && P.agenda.v;
      const l = ((ag && ag.lessons) || []).find((x) => x.u && String(x.r || '').split(' · ')[0].trim().toLowerCase() === key);
      if (l) return l.u;
      const u = (P.upcoming || []).find((x) => x.location && x.location.url && [x.location.mnemonic, x.location.roomNumber].filter(Boolean).join(' ').toLowerCase() === key);
      return u ? u.location.url.replace(/^http:/, 'https:') : '';
    }
    const exams = memo(() => {
      const ag = P.agenda && P.agenda.v;
      const idx = byLu();
      return ((ag && ag.exams) || []).map((x) => {
        const e = idx.code[String(x.c || '').toLowerCase()];
        return { start: fromYmd(x.d, x.s || '00:00'), time: x.s && x.s !== '00:00' ? x.s : '', end: x.e && x.e !== '00:00' ? x.e : '', title: String(x.t || '').replace(/^(evaluation|evaluatie)\s*:\s*/i, '') || (e ? cleanTitle(e.title) : 'Examen'), room: x.r, url: roomHref(x.u) || roomUrl(x.r), note: x.x, lu: e && e.learningUnitId, color: e ? e.color : 0 };
      }).sort((a, b) => a.start - b.start);
    }, () => [P.agenda, P.upcoming, P.enr]);
    const deadlines = (now = Date.now()) => P.events.filter((e) => e.subType === 'due' && !e.dismissed && e.date > now - 3600e3).sort((a, b) => a.date - b.date);
    // courses with a deadline coming up: the course pages check there whether you already handed it in
    const dlPks = memo(() => Array.from(new Set(deadlines().filter((e) => e.date - Date.now() < 21 * 864e5).map((e) => pkOf(e.url)).filter(Boolean))).slice(0, 10).join('.'), () => [P.events, Math.floor(Date.now() / 60e3)]);
    const feed = () => P.events.filter((e) => e.subType !== 'due' && !e.dismissed).sort((a, b) => b.date - a.date);
    // unread updates of the last week, per course (read flags change in place, so markRead clears this)
    let newMap = null, newSrc = null, newAt = 0;
    const newFor = (lu, now = Date.now()) => {
      if (newSrc !== P.events || now - newAt > 60e3) {
        newSrc = P.events; newAt = now; newMap = {};
        P.events.forEach((e) => { if (!e.read && !e.dismissed && e.subType !== 'due' && e.date > now - 7 * 864e5) newMap[e.sourceId] = (newMap[e.sourceId] || 0) + 1; });
      }
      return newMap[lu] || 0;
    };

    const EV_ICON = { announcement: 'megaphone', content: 'doc', gradebook: 'chart', due: 'pencil', course: 'book', advalvas: 'inbox', other: 'bell' };
    const EV_LABEL = { announcement: 'Aankondiging', content: 'Nieuw materiaal', gradebook: 'Cijfer', due: 'Deadline', course: 'Vak', advalvas: 'Ad Valvas', other: 'Update' };
    function eventHref(e) {
      const u = e.url || '';
      if (!/^https:\/\/ultra\.edu\.kuleuven\.cloud\//.test(u)) return u;
      const pk = pkOf(u);
      if (!pk) return u;
      const ctid = (/contentId=(_\d+_\d+)/.exec(u) || [])[1];
      const ann = (/announcementId=(_\d+_\d+)/.exec(u) || [])[1];
      let r = '';
      if (e.subType === 'announcement' && ann) r = '/a/' + ann;
      else if (e.subType === 'gradebook') r = '/cijfers';
      else if (ctid) r = '/item/' + ctid;
      const lu = /^ULTRA-/.test(e.sourceId || '') ? e.sourceId : '';
      if (!lu) {
        const q = new URLSearchParams({ t: cleanTitle(e.source || ''), k: String(e.color || ''), f: P.tab || 'updates', th: THEME });
        return `${ULTRA}/ultra/courses/${pk}/outline#/c/${pk}${r}?${q}`;
      }
      return courseHref(lu, P.tab || 'updates', r, pk);
    }
    function markRead(list) {
      const todo = list.filter((e) => e && !e.read);
      if (!todo.length) return;
      todo.forEach((e) => { e.read = true; });
      newSrc = null;
      store.set('p:events', { ts: Date.now(), v: P.events });
      for (let i = 0; i < todo.length; i += 150) {
        const body = todo.slice(i, i + 150).map((e) => ({ id: e.id, type: e.type, subType: e.subType, read: true }));
        fetch(PORTAL_ORIGIN + '/portal/api/batch/events', { method: 'PATCH', credentials: 'include', keepalive: true, headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Toledo-Language': 'nl' }, body: JSON.stringify(body) }).catch(() => {});
      }
    }
    const linkMap = () => {
      const m = {};
      (P.links || []).forEach((g) => (g.links || []).forEach((l) => { if (l.url) m[l.label] = l.url; }));
      return m;
    };

    /* ---------------- rows ---------------- */
    function lessonRow(l, now, from) {
      const live = l.start <= now && l.end > now, past = l.end <= now;
      const href = l.lu ? courseHref(l.lu, from || P.tab) : '';
      const meta = [
        l.room ? (l.url ? `<a href="${esc(l.url)}">${ico('pin')}${esc(l.room)}</a>` : `<span>${esc(l.room)}</span>`) : '',
        l.form ? `<span>${esc(l.form)}</span>` : '',
        l.who ? `<span>${esc(l.who)}</span>` : '',
      ].filter(Boolean).join('');
      return `<div class="lesson${live ? ' now' : ''}${past ? ' past' : ''}${l.exam ? ' exam-l' : ''}"${href ? ` data-href="${esc(href)}" role="link"` : ''} style="${colorVars(l.color)}"><div class="tm"><b>${hhmm(l.start)}</b><span>${hhmm(l.end)}</span></div><div class="bar"></div><div class="main"><div class="t">${l.exam ? '<span class="exam-tag">EXAMEN</span>' : ''}${esc(l.title)}${live ? '<span class="now-tag">NU</span>' : ''}</div>${meta ? `<div class="meta">${meta}</div>` : ''}</div>${href ? `<span class="end">${CHEV}</span>` : ''}</div>`;
    }
    function dueLabel(t, now) {
      const m = Math.round((t - now) / 60e3);
      if (m < 0) return 'verlopen';
      if (m < 60) return `nog ${m} min`;
      const d = dayDiff(t, now);
      if (d === 0) return `vandaag ${hhmm(t)}`;
      if (d === 1) return `morgen ${hhmm(t)}`;
      if (d < 7) return `${DAYS_S[new Date(t).getDay()]} ${hhmm(t)}`;
      return `${new Date(t).getDate()} ${MONTHS_S[new Date(t).getMonth()]}`;
    }
    function dueRow(e, now) {
      const hrs = (e.date - now) / 3600e3;
      const done = isDone(e);
      const tone = done ? 'green' : hrs < 48 ? 'red' : hrs < 120 ? 'orange' : '';
      return row({ href: eventHref(e) || undefined, icon: done ? 'check' : 'pencil', style: colorVars(e.color), title: e.title || 'Deadline', clamp: true, cls: done ? 'done' : '',
        sub: cleanTitle(e.source) + (done ? ` · ${dueLabel(e.date, now)}` : ''), end: `<span class="cap ${tone}">${esc(done ? 'Ingeleverd' : dueLabel(e.date, now))}</span>`, attrs: ` data-ev="${esc(e.id)}"`, chevron: false });
    }
    function eventRow(e, now, timeOnly) {
      const src = e.subType === 'advalvas' ? 'Ad Valvas' : cleanTitle(e.source || '');
      return row({ href: eventHref(e) || undefined, icon: EV_ICON[e.subType] || 'bell', style: colorVars(e.color), title: e.title || EV_LABEL[e.subType] || 'Update', clamp: true,
        sub: e.subType === 'advalvas' ? 'Ad Valvas' : `${src} · ${EV_LABEL[e.subType] || 'Update'}`, end: `<span>${esc(timeOnly ? hhmm(e.date) : shortWhen(e.date, now))}</span>`,
        attrs: ` data-ev="${esc(e.id)}"`, chevron: false, dot: !e.read });
    }
    function examRow(x, now) {
      const d = new Date(x.start);
      const days = dayDiff(x.start, now);
      const tone = days < 0 ? '' : days <= 7 ? 'red' : days <= 21 ? 'orange' : 'blue';
      const when = days < 0 ? 'voorbij' : days === 0 ? 'vandaag' : days === 1 ? 'morgen' : `${days} d`;
      const href = x.lu ? courseHref(x.lu, P.tab) : '';
      const room = x.room ? (x.url ? `<a href="${esc(x.url)}">${ico('pin')}${esc(x.room)}</a>` : esc(x.room)) : '';
      const sub = [x.time ? esc(x.time) : '', room].filter(Boolean).join(' · ');
      return `<div class="exam"${href ? ` data-href="${esc(href)}" role="link"` : ''}${days < 0 ? ' style="opacity:.5"' : ''}><div class="dt"><small>${MONTHS_S[d.getMonth()]}</small><b>${d.getDate()}</b><em>${DAYS_S[d.getDay()]}</em></div><div class="main"><div class="t">${esc(x.title)}</div>${sub ? `<div class="s">${sub}</div>` : ''}${x.note ? `<div class="s">${esc(x.note)}</div>` : ''}</div><span class="end"><span class="cap ${tone}">${when}</span></span></div>`;
    }
    function courseRow(e, from) {
      const off = e.available === false;
      const n = off ? 0 : newFor(e.learningUnitId);
      const sem = { SEMESTER1: 'Semester 1', SEMESTER2: 'Semester 2', YEAR: 'Jaarvak' }[e.semester] || '';
      const nl = off ? null : nextLesson(e.learningUnitId);
      const sub = off ? 'Nog niet beschikbaar' : nl ? nextText(nl) : [codeOf(e.title), sem, e.type === 'community' ? 'Gemeenschap' : ''].filter(Boolean).join(' · ');
      return row({ href: off ? undefined : courseHref(e.learningUnitId, from || 'vakken'), act: off ? 'off' : '',
        iconHtml: `<span class="ic txt" style="${colorVars(e.color)}">${esc(initials(e.title))}</span>`, title: cleanTitle(e.title) || e.title, sub,
        end: n ? `<span class="cap blue">${n} nieuw</span>` : '', cls: off ? 'off' : '', chevron: !off });
    }
    function agendaBanner() {
      if (!P.agenda && P.ag !== 'loading' && P.ag) return `<div class="banner">${ico('calendar')}<span class="main">Je lessen komen uit KU Loket en zijn nog niet geladen.</span><button type="button" data-act="agsync">Laden</button></div>`;
      const stale = !P.agenda || Date.now() - P.agenda.ts > 3 * 864e5;
      if (P.ag === 'failed' && stale) return `<div class="banner">${ico('warn')}<span class="main">${P.agLogin ? 'KU Loket wil dat je even opnieuw aanmeldt om je rooster bij te werken.' : 'Het lessenrooster kon niet bijgewerkt worden.'}</span><button type="button" data-act="agsync">Bijwerken</button></div>`;
      return '';
    }
    function authBanner() {
      return P.authFail ? `<div class="banner">${ico('lock')}<span class="main">Je bent afgemeld bij Toledo.</span><button type="button" data-act="login">Inloggen</button></div>` : '';
    }

    /* ---------------- views ---------------- */
    const V = {};
    const BUILD = {}, FILL = {}, NAVS = {};

    // ---- Vandaag
    BUILD.vandaag = () => '<div class="lt"><h1>Vandaag</h1><p class="lt-sub" data-k="date"></p></div><div data-k="body"></div>';
    NAVS.vandaag = () => ({ title: 'Vandaag' });
    const updateBanner = () => (P.upd ? `<button type="button" class="banner upd-banner" data-act="update"><img class="upn-ic" src="${TM_LOGO}" alt=""><span class="main"><b>Update beschikbaar</b><br>Versie ${esc(P.upd.v)} staat klaar. Installeren duurt 10 seconden.</span><span class="act">Bekijk</span></button>` : '');
    // KU Loket published new exam results (in the last two weeks) that you haven't looked at in the app yet
    function resultsBanner(now) {
      const S = P.study && P.study.v && P.study.v.study;
      const s = S && S.find((x) => x.active);
      if (!s || !s.last || store.get('p:resSeen') === s.last || now - fromYmd(s.last) > 14 * 864e5) return '';
      return `<a class="banner" href="#studie">${ico('sparkle')}<span class="main"><b>Nieuwe examenresultaten</b><br>Bekendgemaakt op ${esc(dLong(fromYmd(s.last)))}.</span><span class="act" style="color:var(--accent);font-weight:600">Bekijk</span></a>`;
    }
    function heroHtml(now) {
      const L = lessons();
      const live = L.find((l) => l.start <= now && l.end > now);
      const next = L.find((l) => l.start > now);
      let l = live || next;
      // exam period: the next exam matters more than a lesson weeks away
      const ex = exams().find((x) => x.start + 4 * 3600e3 > now);
      if (ex && !live && (!l || ex.start <= l.start || (dayDiff(ex.start, now) <= 14 && dayDiff(l.start, now) > 2))) {
        const days = dayDiff(ex.start, now);
        const href = ex.lu ? courseHref(ex.lu, 'vandaag') : '#rooster/examens';
        return `<div class="hero" data-href="${esc(href)}" role="link" style="${colorVars(ex.color)}">
          <div class="hero-top"><span class="hero-lbl"><i></i>${days === 0 ? 'Examen vandaag' : 'Volgend examen'}</span><span class="hero-cd">${esc(days === 0 ? (ex.time ? 'om ' + ex.time : 'vandaag') : days === 1 ? 'morgen' : `nog ${days} dagen`)}</span></div>
          <div class="hero-title">${esc(ex.title)}</div>
          <div class="hero-meta"><span>${ico('calendar')}${esc(cap(dLong(ex.start)))}${ex.time ? ' · ' + esc(ex.time) : ''}</span>${ex.room ? `<span>${ico('pin')}${esc(ex.room)}</span>` : ''}</div>
          <div class="hero-acts">${ex.lu ? `<a class="pri" href="${esc(href)}">${ico('book')}Open vak</a>` : ''}${ex.url ? `<a href="${esc(ex.url)}">${ico('pin')}Lokaal</a>` : ''}<a href="#rooster/examens">${ico('cap')}Alle examens</a></div>
        </div>`;
      }
      if (!l) {
        const known = (P.agenda && P.agenda.v) || P.upcoming.length;
        if (!known && (P.ag === 'loading' || !P.loadedAt)) return '<div class="hero calm"><div class="sk" style="height:14px;width:40%"></div><div class="sk" style="height:24px;width:75%;margin-top:12px"></div><div class="sk" style="height:14px;width:55%;margin-top:10px"></div></div>';
        return `<div class="hero calm" data-href="#rooster" role="link"><div class="hero-top"><span class="hero-lbl"><i></i>Lessen</span></div><div class="hero-title">Geen lessen gepland</div><div class="hero-meta"><span>Bekijk je agenda voor de komende weken.</span></div></div>`;
      }
      const isLive = l === live;
      const dd = dayDiff(l.start, now);
      const lbl = isLive ? (l.exam ? 'Examen bezig' : 'Nu bezig') : l.exam ? 'Examen' : 'Volgende les';
      const left = Math.max(1, Math.round((l.end - now) / 60e3));
      const cd = isLive ? (left < 60 ? `nog ${left} min` : `nog ${Math.floor(left / 60)} u ${left % 60 ? (left % 60) + ' min' : ''}`.trim())
        : dd === 0 ? until(l.start, now) : dd === 1 ? 'morgen' : dd < 7 ? DAYS[new Date(l.start).getDay()] : `${new Date(l.start).getDate()} ${MONTHS_S[new Date(l.start).getMonth()]}`;
      const pct = isLive ? Math.min(100, Math.max(2, ((now - l.start) / (l.end - l.start)) * 100)) : 0;
      const href = l.lu ? courseHref(l.lu, 'vandaag') : '#rooster';
      return `<div class="hero" data-href="${esc(href)}" role="link" style="${colorVars(l.color)}">
        <div class="hero-top"><span class="hero-lbl${isLive ? ' live' : ''}"><i></i>${esc(lbl)}</span><span class="hero-cd">${esc(cd)}</span></div>
        <div class="hero-title">${esc(l.title)}</div>
        <div class="hero-meta"><span>${ico('clock')}${hhmm(l.start)} – ${hhmm(l.end)}</span>${l.room ? `<span>${ico('pin')}${esc(l.room)}</span>` : ''}${l.form ? `<span>${esc(l.form)}</span>` : ''}</div>
        ${isLive ? `<div class="hero-prog"><i style="width:${pct.toFixed(1)}%"></i></div>` : ''}
        <div class="hero-acts">${l.lu ? `<a class="pri" href="${esc(href)}">${ico('book')}Open vak</a>` : ''}${l.url ? `<a href="${esc(l.url)}">${ico('pin')}Lokaal</a>` : ''}<a href="#rooster">${ico('calendar')}Agenda</a></div>
      </div>`;
    }
    // Meer > Cijfers: only this semester's courses (Blackboard's own page lists every course you ever had)
    // (and Vakken > zoeken in al je vakken: the same courses, searched on the course site)
    function ultraListHref(route, extra) {
      const cur = curSem();
      let list = P.enr.filter((e) => e.type !== 'community' && e.available !== false && (e.semester === cur || e.semester === 'YEAR' || e.favorite));
      if (!list.length) list = favCourses();
      list = list.filter((e) => /^ULTRA-/.test(e.learningUnitId || '') || P.lu2pk[e.learningUnitId]).sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) || cleanTitle(a.title).localeCompare(cleanTitle(b.title), 'nl')).slice(0, 16);
      if (!list.length) return '';
      const cs = list.map((e) => [P.lu2pk[e.learningUnitId] || e.learningUnitId, e.color || '', cleanTitle(e.title).replace(/[~!]/g, ' ')].join('~')).join('!');
      const q = new URLSearchParams(Object.assign({}, extra || {}, { cs, th: THEME }));
      const first = list.find((e) => P.lu2pk[e.learningUnitId]) || list[0];
      const pk = P.lu2pk[first.learningUnitId];
      const ultraOk = Date.now() - (Number(store.get('p:ultraok')) || 0) < 45 * 60e3;
      if (/^ULTRA-/.test(first.learningUnitId) && (!ultraOk || !pk)) return `${JOURNEY}${encodeURIComponent(first.learningUnitId)}#/${route}?${q}`;
      return `${ULTRA}/ultra/courses/${pk}/outline#/${route}?${q}`;
    }
    const gradesHref = () => ultraListHref('cijfers');
    // Meer > Groepswerken: like Cijfers, but on Blackboard's calendar address with everything in the query (?tm=groepen):
    // via a course + hash it sometimes landed on that course, because the hash got lost while signing in
    const groupsHref = () => {
      const u = ultraListHref('groepen', { ma: store.get('mailApp') === 'web' ? 'web' : 'app' });
      const q = u.includes('#/groepen?') ? u.slice(u.indexOf('#/groepen?') + 10) : `th=${THEME}`;
      return `${ULTRA}/ultra/calendar?tm=groepen&${q}`;
    };
    // Meer > Toledo-agenda: Blackboard's calendar page with ?tm=agenda becomes the subscribe screen (#/agenda in ultra.js).
    // Not via a course + hash: the hash got lost on the way (sign-in, Toledo's link service), landing on a course.
    const agendaHref = () => `${ULTRA}/ultra/calendar?tm=agenda&th=${THEME}`;
    function favCourses() {
      const cur = curSem();
      let list = P.enr.filter((e) => e.favorite && e.available !== false);
      if (!list.length) list = P.enr.filter((e) => e.type !== 'community' && e.available !== false && (e.semester === cur || e.semester === 'YEAR'));
      return list.sort((a, b) => cleanTitle(a.title).localeCompare(cleanTitle(b.title), 'nl'));
    }
    FILL.vandaag = (el) => {
      const now = Date.now();
      const d = new Date(now);
      const greet = d.getHours() < 6 ? 'Goedenacht' : d.getHours() < 12 ? 'Goedemorgen' : d.getHours() < 18 ? 'Goedemiddag' : 'Goedenavond';
      put($('[data-k="date"]', el), esc(`${greet}${P.user && P.user.givenName ? ', ' + P.user.givenName : ''} · ${dLong(now)}`));
      let h = updateBanner() + authBanner() + agendaBanner() + resultsBanner(now) + heroHtml(now);
      // rest of today
      const L = lessons();
      const hero = L.find((l) => l.start <= now && l.end > now) || L.find((l) => l.start > now);
      const today = L.filter((l) => l !== hero && dayDiff(l.start, now) === 0 && l.end > now);
      if (today.length) h += `<div class="sh"><h2>Later vandaag</h2></div><div class="group">${today.map((l) => lessonRow(l, now, 'vandaag')).join('')}</div>`;
      // upcoming deadlines, also the ones you already handed in (until the deadline itself has passed)
      const dl = deadlines(now).filter((e) => e.date > now && e.date - now < 21 * 864e5);
      if (dl.length) {
        const open = dl.filter((e) => !isDone(e)).length;
        const shown = P.allDl ? dl : dl.slice(0, 5);
        h += `<div class="sh"><h2>Komende deadlines</h2>${open < dl.length ? `<span class="sh-note">${open} open</span>` : ''}</div><div class="group">${shown.map((e) => dueRow(e, now)).join('')}${dl.length > shown.length ? `<button type="button" class="more-row" data-act="alldl">Toon alle ${dl.length}</button>` : ''}</div>`;
      } else if (P.loadedAt) h += `<div class="sh"><h2>Komende deadlines</h2></div><div class="group">${row({ icon: 'check', soft: true, title: 'Geen deadlines in de komende 3 weken', chevron: false })}</div>`;
      // courses
      const favs = favCourses();
      if (favs.length) {
        h += `<div class="sh"><h2>Mijn vakken</h2><a href="#vakken">Alle</a></div><div class="tiles">${favs.map((e) => {
          const n = newFor(e.learningUnitId, now);
          return `<a class="tile" href="${esc(courseHref(e.learningUnitId, 'vandaag'))}" style="${colorVars(e.color)}"><b>${esc(cleanTitle(e.title))}</b><span>${esc(codeOf(e.title) || '')}${n ? `<i class="cap">${n}</i>` : ''}</span></a>`;
        }).join('')}</div>`;
      } else if (!P.enr.length && !P.loadedAt) h += `<div class="sh"><h2>Mijn vakken</h2></div><div class="tiles">${'<div class="tile sk" style="background:var(--fill)"></div>'.repeat(3)}</div>`;
      // updates
      const f = feed().slice(0, 4);
      if (f.length) h += `<div class="sh"><h2>Nieuw</h2><a href="#updates">Alle</a></div><div class="group">${f.map((e) => eventRow(e, now)).join('')}</div>`;
      // exams
      const ex = exams().filter((x) => dayDiff(x.start, now) >= 0 && dayDiff(x.start, now) <= 75);
      if (ex.length) h += `<div class="sh"><h2>Examens</h2><a href="#rooster/examens">Alle</a></div><div class="group">${ex.slice(0, 2).map((x) => examRow(x, now)).join('')}</div>`;
      put($('[data-k="body"]', el), h);
    };

    // ---- Vakken
    BUILD.vakken = () => `<div class="lt"><h1>Vakken</h1></div><label class="search">${ico('search')}<input type="search" placeholder="Zoek een vak of bestand" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-label="Zoek een vak"><button type="button" class="clr" data-act="clr" hidden aria-label="Wis">✕</button></label><div data-k="list"></div>`;
    NAVS.vakken = () => ({ title: 'Vakken', right: P.enr.length ? (P.favEdit ? '<button type="button" class="nb" data-act="favdone"><b>Klaar</b></button>' : `<button type="button" class="nb" data-act="favedit" aria-label="Kies favorieten">${ico('star')}</button>`) : '' });
    // Kies favorieten: the same star as in Toledo itself (PATCH /portal/api/enrollments/<id>), so it shows up everywhere
    function favEditList() {
      const byT = (a, b) => cleanTitle(a.title).localeCompare(cleanTitle(b.title), 'nl');
      const q = fold(P.search.trim());
      const all = P.enr.filter((e) => !q || fold(e.title).includes(q) || fold(e.learningUnitId).includes(q));
      const star = (e) => `<span class="fav-star${e.favorite ? ' on' : ''}">${P.favBusy[e.id] ? '<span class="spin" style="width:18px;height:18px;border-width:2px"></span>' : ico('star')}</span>`;
      const r = (e) => row({ act: 'fav', attrs: ` data-id="${esc(e.id)}" aria-pressed="${e.favorite ? 'true' : 'false'}"`, iconHtml: `<span class="ic txt" style="${colorVars(e.color)}">${esc(initials(e.title))}</span>`,
        title: cleanTitle(e.title) || e.title, sub: [codeOf(e.title), e.type === 'community' ? 'Gemeenschap' : ''].filter(Boolean).join(' · '), end: star(e), chevron: false });
      const crs = all.filter((e) => e.type !== 'community').sort(byT), com = all.filter((e) => e.type === 'community').sort(byT);
      let h = '<p class="fresh" style="margin-top:0">Tik op een vak om het een ster te geven. Favorieten staan bovenaan bij Vakken en op Vandaag, en ook in Toledo zelf.</p>';
      if (crs.length) h += `<div class="gh">Vakken</div><div class="group">${crs.map(r).join('')}</div>`;
      if (com.length) h += `<div class="gh">Gemeenschappen</div><div class="group">${com.map(r).join('')}</div>`;
      return h || empty('search', 'Geen resultaten', `Geen vak gevonden voor "${P.search.trim()}".`);
    }
    async function toggleFav(id) {
      const e = P.enr.find((x) => x.id === id);
      if (!e || P.favBusy[id]) return;
      const want = !e.favorite;
      const setFav = (v) => {
        // a new list, never a changed one (see memo in portal: lists are cached by identity)
        P.enr = P.enr.map((x) => (x.id === id ? Object.assign({}, x, { favorite: v }) : x));
        const c = store.get('p:enr');
        if (c && Array.isArray(c.v)) store.set('p:enr', { ts: c.ts, v: c.v.map((x) => (x.id === id ? Object.assign({}, x, { favorite: v }) : x)) });
      };
      P.favBusy[id] = 1;
      setFav(want);
      FILL.vakken(V.vakken.el);
      try {
        const r = await fetch(PORTAL_ORIGIN + '/portal/api/enrollments/' + encodeURIComponent(id), { method: 'PATCH', credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Toledo-Language': 'nl' }, body: JSON.stringify({ favorite: want }) });
        if (!r.ok) throw new Error('HTTP ' + r.status);
      } catch (_) {
        setFav(!want);
        toast('Dat lukte niet. Probeer het zo opnieuw.');
      }
      delete P.favBusy[id];
      dirty('vandaag', 'rooster');
      FILL.vakken(V.vakken.el);
    }
    FILL.vakken = (el) => {
      const list = $('[data-k="list"]', el);
      if (!P.enr.length) { put(list, P.loadedAt ? empty('book', 'Geen vakken', 'Je bent nog voor geen enkel vak ingeschreven.') : skGroup(7)); return; }
      if (P.favEdit) { put(list, favEditList()); return; }
      const q = fold(P.search.trim());
      const match = (e) => !q || fold(e.title).includes(q) || fold(e.learningUnitId).includes(q);
      const all = P.enr.filter(match);
      const cur = curSem();
      const rank = (e) => (e.semester === cur ? 0 : e.semester === 'YEAR' ? 1 : e.semester === 'UNKNOWN' ? 3 : 2);
      const byT = (a, b) => cleanTitle(a.title).localeCompare(cleanTitle(b.title), 'nl');
      const fav = all.filter((e) => e.favorite).sort((a, b) => (a.available === false) - (b.available === false) || byT(a, b));
      const crs = all.filter((e) => !e.favorite && e.type !== 'community' && e.available !== false).sort((a, b) => rank(a) - rank(b) || byT(a, b));
      const com = all.filter((e) => !e.favorite && e.type === 'community' && e.available !== false).sort(byT);
      const off = all.filter((e) => !e.favorite && e.available === false).sort(byT);
      let h = '';
      const sec = (title, items, opts = {}) => {
        if (!items.length) return '';
        const lim = opts.limit && !q && !opts.open ? opts.limit : Infinity;
        const shown = items.slice(0, lim);
        const rest = items.length - shown.length;
        return `<div class="gh">${esc(title)}</div><div class="group">${shown.map((e) => courseRow(e)).join('')}${rest > 0 ? `<button type="button" class="more-row" data-act="${opts.act}">Toon alle ${items.length}</button>` : ''}</div>`;
      };
      h += sec('Favorieten', fav);
      h += sec(fav.length ? 'Andere vakken' : 'Vakken', crs);
      h += sec('Gemeenschappen', com, { limit: 3, open: P.showComm, act: 'comm' });
      h += sec('Niet beschikbaar', off, { limit: 2, open: P.showOff, act: 'offall' });
      // look inside the courses too (files, folders, assignments): that search runs on the course site
      const qq = P.search.trim();
      const zoek = qq.length >= 2 ? ultraListHref('zoek', { q: qq }) : '';
      const zrow = zoek ? `<div class="group">${row({ href: zoek, icon: 'search', soft: true, title: `Zoek "${qq}" in al je vakken`, sub: 'In bestanden, mappen en opdrachten' })}</div>` : '';
      if (!h) h = zrow ? `<div class="gh">Geen vak met die naam</div>${zrow}` : empty('search', 'Geen resultaten', `Geen vak gevonden voor "${qq}".`);
      else if (zrow) h += `<div class="gh">In je vakken</div>${zrow}`;
      put(list, h);
    };

    // ---- Agenda (was Rooster): lessons, study places, deadlines and exams on one timeline
    const AGF = [['alles', 'Alles'], ['les', 'Lessen'], ['plek', 'Studieplek'], ['dl', 'Deadlines']]; // exams have their own page
    BUILD.rooster = () => `<div class="lt"><h1>Agenda</h1></div><div data-k="seg">${segHtml([{ id: 'lessen', label: 'Agenda' }, { id: 'examens', label: 'Examens' }], P.seg, 'rseg')}</div><div data-k="body"></div>`;
    NAVS.rooster = () => ({ title: 'Agenda', right: `<button type="button" class="nb" data-act="agrefresh" aria-label="Vernieuwen">${P.ag === 'loading' ? '<span class="spin" style="width:20px;height:20px;border-width:2px"></span>' : ico('refresh')}</button>` });
    function freshLine(noLink) {
      const a = P.agenda;
      if (P.ag === 'loading') return '<p class="fresh">Lessen bijwerken…</p>';
      if (!a) return '';
      const t = a.ts;
      const when = dayDiff(t, Date.now()) === 0 ? 'vandaag ' + hhmm(t) : dShort(t) + ' ' + hhmm(t);
      return `<p class="fresh">Lessen bijgewerkt ${when} · <button type="button" data-act="agrefresh">Bijwerken</button>${noLink ? '' : '<br><a href="https://www.kuleuven.be/kuloket/zr_0367?sap-language=NL">Open in KU Loket</a>'}</p>`;
    }
    // study place bookings, handed over by Studieplek (KURT is another site): only the ones that haven't ended
    const plekken = memo(() => ((P.kurt && P.kurt.v) || []).map((r) => ({ ...r, start: fromYmd(r.sd, r.st), end: r.et === '00:00' ? fromYmd(r.ed, '24:00') : fromYmd(r.ed, r.et) })).sort((a, b) => a.start - b.start), () => [P.kurt]);
    // everything on the agenda, as {kind, start, ...}; exams already in the lesson timetable are not repeated
    const agItems = memo(() => {
      const L = lessons().map((l) => ({ ...l, kind: l.exam ? 'ex' : 'les' }));
      const exDays = new Set(L.filter((l) => l.exam).map((l) => ymd(l.start)));
      const X = exams().filter((x) => !exDays.has(ymd(x.start))).map((x) => {
        const en = x.end ? fromYmd(ymd(x.start), x.end) : x.start + 3 * 3600e3;
        return { kind: 'ex', start: x.start, end: en, notime: !x.time, title: x.title, lu: x.lu, color: x.color, room: x.room, url: x.url, form: 'Examen', exam: true };
      });
      const D = P.events.filter((e) => e.subType === 'due' && !e.dismissed).map((e) => ({ kind: 'dl', start: e.date, ev: e }));
      const K = plekken().map((r) => ({ kind: 'plek', ...r }));
      return L.concat(X, D, K).sort((a, b) => a.start - b.start);
    }, () => [lessons(), exams(), P.events, plekken()]);
    const AG_DOT = { les: 'var(--sub)', plek: '#3d8fa8', dl: 'var(--orange)', ex: 'var(--red)' };
    function dueAgRow(e, now) {
      const done = isDone(e);
      const hrs = (e.date - now) / 3600e3;
      const tone = done ? 'green' : e.date < now ? '' : hrs < 48 ? 'red' : hrs < 120 ? 'orange' : '';
      const href = eventHref(e);
      return `<div class="lesson ag-dl${e.date < now && !done ? ' past' : ''}"${href ? ` data-href="${esc(href)}" role="link"` : ''} data-ev="${esc(e.id)}"><div class="tm"><b>${hhmm(e.date)}</b><span>deadline</span></div><div class="bar"></div><div class="main"><div class="t"><span class="ag-tag dl">DEADLINE</span>${esc(e.title || 'Deadline')}</div><div class="meta"><span>${esc(cleanTitle(e.source || ''))}</span></div></div><span class="end"><span class="cap ${tone}">${esc(done ? 'Ingeleverd' : e.date < now ? 'verlopen' : dueLabel(e.date, now))}</span></span></div>`;
    }
    function plekRow(r, now) {
      const live = r.start <= now + 30 * 60e3 && r.end > now, past = r.end <= now;
      const parts = String(r.n || '').split(' - ');
      const lib = parts[0] || 'Studieplek', what = parts.slice(1).join(' - ') || r.n;
      const room = !/\d\s*$/.test(String(r.n || ''));
      const href = KURT + '/#/s/' + encodeURIComponent(r.id);
      return `<div class="lesson ag-plek${live ? ' now' : ''}${past ? ' past' : ''}" data-href="${esc(href)}" role="link" style="--c:#3d8fa8"><div class="tm"><b>${esc(r.st)}</b><span>${esc(r.et === '00:00' ? '24:00' : r.et)}</span></div><div class="bar"></div><div class="main"><div class="t"><span class="ag-tag plek">STUDIEPLEK</span>${esc(room ? 'Groepsruimte ' + what : what)}${live && r.start <= now ? '<span class="now-tag">NU</span>' : ''}</div><div class="meta"><span>${esc(lib)}</span><a href="${esc(live ? KURT + '/' : href)}">${ico('pin')}${live ? 'Inchecken' : room ? 'Vind het lokaal' : 'Vind mijn stoel'}</a></div></div><span class="end">${CHEV}</span></div>`;
    }
    function agRow(it, now) {
      if (it.kind === 'dl') return dueAgRow(it.ev, now);
      if (it.kind === 'plek') return plekRow(it, now);
      if (it.kind === 'ex' && it.notime) return lessonRow({ ...it, start: it.start, end: it.start }, now, 'rooster').replace(/<div class="tm"><b>[^<]*<\/b><span>[^<]*<\/span><\/div>/, '<div class="tm"><b>–</b><span>examen</span></div>');
      return lessonRow(it, now, 'rooster');
    }
    function roosterLessen(now) {
      const all = agItems();
      const f = P.agf || 'alles';
      const ws = addDays(mondayOf(now), P.weekOff * 7);
      const days = Array.from({ length: 7 }, (_, i) => addDays(ws, i));
      const byDay = {};
      all.forEach((it) => { if (f !== 'alles' && it.kind !== f) return; const k = ymd(it.start); (byDay[k] = byDay[k] || []).push(it); });
      const dotsOf = (k) => { const ks = new Set((byDay[k] || []).map((x) => x.kind)); return ['les', 'plek', 'dl', 'ex'].filter((x) => ks.has(x)).map((x) => `<i style="background:${AG_DOT[x]}"></i>`).join(''); };
      const todayK = ymd(now);
      const mid = days[3];
      const month = `${cap(MONTHS[new Date(mid).getMonth()])} ${new Date(mid).getFullYear()}`;
      const wkLabel = P.weekOff === 0 ? 'Deze week' : P.weekOff === 1 ? 'Volgende week' : P.weekOff === -1 ? 'Vorige week' : month;
      let h = `<div class="chips ag-chips">${AGF.map(([id, label]) => `<button type="button" class="chip${f === id ? ' on' : ''}" data-act="agf" data-id="${id}">${id !== 'alles' ? `<i style="background:${AG_DOT[id]}"></i>` : ''}${label}</button>`).join('')}</div>`;
      h += `<div class="wk-sticky"><div class="wk-head"><b>${esc(wkLabel)}</b><span class="btns">${P.weekOff !== 0 ? '<button type="button" class="today-btn" data-act="wktoday">Vandaag</button>' : ''}<button type="button" data-act="wk" data-d="-1" aria-label="Vorige week"><svg class="i" viewBox="0 0 24 24"><path d="M14.5 5 8 12l6.5 7"/></svg></button><button type="button" data-act="wk" data-d="1" aria-label="Volgende week"><svg class="i" viewBox="0 0 24 24"><path d="M9.5 5 16 12l-6.5 7"/></svg></button></span></div>`;
      h += `<div class="week">${days.map((t) => { const k = ymd(t); const dw = new Date(t).getDay(); return `<button type="button" class="wd${k === todayK ? ' today' : ''}${byDay[k] ? ' has' : ''}${dw === 0 || dw === 6 ? ' we' : ''}" data-act="day" data-d="${k}"><small>${DAYS_S[dw]}</small><b>${new Date(t).getDate()}</b><span class="ag-dots">${dotsOf(k)}</span></button>`; }).join('')}</div></div>`;
      const range = P.agenda && P.agenda.v && P.agenda.v.range;
      let body = '';
      const any = days.some((t) => byDay[ymd(t)]);
      days.forEach((t) => {
        const k = ymd(t);
        const list = byDay[k] || [];
        if (!list.length && (k !== todayK || !any)) return;
        const dd = dayDiff(t, now);
        const title = dd === 0 ? `Vandaag · ${dLong(t)}` : dd === 1 ? `Morgen · ${dLong(t)}` : cap(dLong(t));
        body += `<div class="day-title" id="tm-d-${k}">${esc(title)}</div>`;
        if (list.length) body += `<div class="group">${list.map((it) => agRow(it, now)).join('')}</div>`;
        else body += '<div class="group plain"><div class="empty small" style="padding:14px 16px">Vandaag niets gepland</div></div>';
      });
      if (!all.length && !P.agenda && P.ag !== 'failed') body = skGroup(4);
      else if (!any) {
        const out = (f === 'alles' || f === 'les') && range && (ymd(days[6]) < range[0] || ymd(days[0]) > range[1]);
        const nx = all.find((x) => (f === 'alles' || x.kind === f) && x.start > days[6] + 864e5);
        const what = { alles: 'Niets gepland deze week', les: 'Geen lessen deze week', plek: 'Geen studieplek gereserveerd', dl: 'Geen deadlines deze week', ex: 'Geen examens deze week' }[f];
        body += out ? empty('calendar', 'Buiten het geladen bereik', 'Open KU Loket voor lessen zo ver vooruit.', '<p style="margin-top:14px"><a class="btn ghost" href="https://www.kuleuven.be/kuloket/zr_0367?sap-language=NL">Open in KU Loket</a></p>')
          : empty('calendar', what, '', nx ? `<p style="margin-top:12px"><button type="button" class="btn ghost" data-act="jump" data-d="${ymd(nx.start)}">Volgende: ${esc(dShort(nx.start))}</button></p>` : '');
      }
      if (f === 'plek' && !P.kurt) body += `<p class="fresh">Open <a href="${esc(KURT + '/')}">Studieplek</a> één keer, dan verschijnen je reservaties hier.</p>`;
      return h + `<div class="day-wrap" data-k="day">${body}</div>`;
    }
    function examGap(a, b) {
      const n = dayDiff(b.start, a.start) - 1;
      if (n < 0) return '<div class="ex-gap"><i style="--g:var(--red)"></i><span class="cap red">Zelfde dag</span></div>';
      const tone = n <= 2 ? 'red' : n <= 3 ? 'orange' : 'green';
      return `<div class="ex-gap"><i style="--g:var(--${tone === 'orange' ? 'orange' : tone})"></i><span class="cap ${tone}">${n === 0 ? 'Geen dag ertussen' : n === 1 ? '1 dag studietijd' : n + ' dagen studietijd'}</span></div>`;
    }
    function roosterExamens(now) {
      const X = exams();
      if (!X.length) {
        if (!P.agenda) {
          if (P.ag === 'loading' || !P.ag) return skGroup(3);
          return empty('cap', 'Examenrooster nog niet geladen', P.agLogin ? 'Je examens komen uit KU Loket. Die wil dat je even opnieuw aanmeldt.' : 'Je examens komen uit KU Loket.', '<p style="margin-top:14px"><button type="button" class="btn" data-act="agsync">Examenrooster laden</button></p>');
        }
        return empty('cap', 'Geen examens', 'Er staan (nog) geen examens in je individueel examenrooster.');
      }
      const up = X.filter((x) => dayDiff(x.start, now) >= 0);
      const past = X.filter((x) => dayDiff(x.start, now) < 0);
      let h = '';
      if (examsNeedRooms() && P.ag !== 'loading') h += `<div class="banner">${ico('pin')}<span class="main">Werk je examenrooster één keer bij om de lokalen aanklikbaar te maken.</span><button type="button" data-act="agsync">Bijwerken</button></div>`;
      if (up.length) {
        // exam periods (January, June, August): more than 3 weeks apart means a new period, with its own block
        const per = [];
        up.forEach((x, i) => { if (!i || dayDiff(x.start, up[i - 1].start) > 21) per.push([]); per[per.length - 1].push(x); });
        const span = (t) => `${new Date(t).getDate()} ${MONTHS_S[new Date(t).getMonth()]}`;
        const perName = (t) => { const m = new Date(t).getMonth(); return (m <= 2 ? 'Januari' : m <= 6 ? 'Juni' : m <= 8 ? 'Augustus' : cap(MONTHS[m])) + ' ' + new Date(t).getFullYear(); };
        const first = per[0][0], last = per[0][per[0].length - 1], n = per[0].length;
        const d0 = dayDiff(first.start, now);
        h += `<div class="card ex-sum"><small>${n === 1 ? 'Volgend examen' : 'Examenperiode ' + esc(perName(first.start).toLowerCase())}</small><b>${d0 === 0 ? 'Vandaag examen' : d0 === 1 ? 'Morgen je eerste examen' : `Eerste examen over ${d0} dagen`}</b><span>${n} ${n === 1 ? 'examen' : 'examens'} · ${esc(n > 1 ? span(first.start) + ' – ' + span(last.start) : dLong(first.start))}</span></div>`;
        per.forEach((g) => {
          if (per.length > 1) h += `<div class="gh">Examens ${esc(perName(g[0].start).toLowerCase())}</div>`;
          h += `<div class="group">${g.map((x, i) => (i ? examGap(g[i - 1], x) : '') + examRow(x, now)).join('')}</div>`;
        });
      }
      if (past.length) h += `<div class="gh">Voorbij</div><div class="group">${past.map((x) => examRow(x, now)).join('')}</div>`;
      return h + '<p class="fresh"><a href="https://www.kuleuven.be/kuloket/zr_0363">Open je examenrooster in KU Loket</a></p>';
    }
    FILL.rooster = (el) => {
      segSet(el, P.seg);
      const now = Date.now();
      // the empty Examens page has its own button, so no banner above it
      const banner = P.seg === 'examens' && !P.agenda && !exams().length ? '' : agendaBanner();
      put($('[data-k="body"]', el), banner + (P.seg === 'examens' ? roosterExamens(now) : roosterLessen(now)) + freshLine(P.seg === 'examens'));
      // straight to today, so a week full of lessons doesn't need scrolling first (once per visit of the tab)
      if (P.tab === 'rooster' && P.seg === 'lessen' && P.weekOff === 0 && !P.agScrolled && document.getElementById('tm-d-' + ymd(now))) {
        P.agScrolled = true;
        if (W.scrollY < 40) requestAnimationFrame(() => scrollToDay(ymd(now), true));
      }
    };

    // ---- Updates
    const FILTERS = [['alles', 'Alles'], ['ongelezen', 'Ongelezen'], ['announcement', 'Aankondigingen'], ['content', 'Materiaal'], ['gradebook', 'Cijfers'], ['due', 'Deadlines'], ['advalvas', 'Ad Valvas']];
    BUILD.updates = () => '<div class="lt"><h1>Updates</h1></div><div class="chips" data-k="chips"></div><div data-k="list"></div>';
    NAVS.updates = () => ({ title: 'Updates', right: P.events.some((e) => !e.read && !e.dismissed) ? '<button type="button" class="nb" data-act="allread">Alles gelezen</button>' : '' });
    FILL.updates = (el) => {
      const now = Date.now();
      put($('[data-k="chips"]', el), FILTERS.map(([id, label]) => `<button type="button" class="chip${P.filter === id ? ' on' : ''}" data-act="filter" data-id="${id}">${label}</button>`).join(''));
      const list = $('[data-k="list"]', el);
      if (!P.events.length) { put(list, P.loadedAt ? empty('bell', 'Geen updates', 'Nieuwe aankondigingen, materiaal en cijfers verschijnen hier.') : skGroup(8)); return; }
      let items;
      if (P.filter === 'due') {
        items = deadlines(now);
        put(list, items.length ? `<div class="group">${items.map((e) => dueRow(e, now)).join('')}</div>` : empty('check', 'Geen deadlines', 'Er komen geen deadlines aan.'));
        return;
      }
      items = feed().filter((e) => P.filter === 'alles' || (P.filter === 'ongelezen' ? !e.read : e.subType === P.filter));
      if (!items.length) { put(list, empty(P.filter === 'ongelezen' ? 'checks' : 'bell', P.filter === 'ongelezen' ? 'Alles gelezen' : 'Niets gevonden', P.filter === 'ongelezen' ? 'Je bent helemaal bij.' : 'Geen updates in deze categorie.')); return; }
      const shown = items.slice(0, P.feedN);
      let h = '', curKey = '', buf = '';
      const flush = () => { if (buf) h += `<div class="group">${buf}</div>`; buf = ''; };
      shown.forEach((e) => {
        const k = ymd(e.date);
        if (k !== curKey) { flush(); curKey = k; const dd = dayDiff(e.date, now); h += `<div class="gh">${esc(dd === 0 ? 'Vandaag' : dd === -1 ? 'Gisteren' : cap(dLong(e.date)))}</div>`; }
        buf += eventRow(e, now, true);
      });
      flush();
      if (items.length > shown.length) h += `<p class="fresh"><button type="button" data-act="feedmore">Toon oudere updates (${items.length - shown.length})</button></p>`;
      put(list, h);
    };

    // ---- Meer
    BUILD.meer = () => '<div class="lt"><h1>Meer</h1></div><div data-k="body"></div>';
    NAVS.meer = () => ({ title: 'Meer' });
    FILL.meer = (el) => {
      const L = linkMap();
      const u = P.user || {};
      const name = [u.givenName, u.familyName].filter(Boolean).join(' ');
      const unread = P.mail && typeof P.mail.value === 'number' ? P.mail.value : 0;
      let h = `<div class="group plain" style="margin-bottom:16px"><div class="prof"><span class="avatar">${esc(initials(name || 'KU L'))}</span><span class="main"><span class="t">${esc(name || 'Student')}</span><span class="s">KU Leuven${store.get('p:rn') || u.userId ? ' · ' + esc(store.get('p:rn') || u.userId) : ''}</span></span></div></div>`;
      // every service is an "app" in one grid, like the iPhone home screen
      const app = (o) => {
        const inner = `<span class="ai" style="--c:${o.c}">${ico(o.i)}${o.badge ? `<b class="ai-bd">${o.badge > 99 ? '99+' : o.badge}</b>` : ''}</span><span class="al">${esc(o.n)}</span>`;
        return o.href ? `<a class="app" href="${esc(o.href)}"${o.act ? ` data-act="${o.act}"` : ''}>${inner}</a>` : `<button type="button" class="app" data-act="${o.act}">${inner}</button>`;
      };
      const APPS = [
        { n: 'Studieplek', i: 'desk', c: '#1f6f8b', href: 'https://kurt3.ghum.kuleuven.be/' + (store.get('p:grps') ? '?tmgs=' + encodeURIComponent(store.get('p:grps')) : '') },
        { n: 'Printen', i: 'printer', c: '#e8893a', href: 'https://print.kuleuven.be/' },
        { n: 'Mail', i: 'mail', c: '#0a84ff', act: 'mail', badge: unread },
        { n: 'Groepswerken', i: 'people', c: '#c2477a', href: groupsHref() },
        { n: 'Studievoortgang en punten', i: 'trend', c: '#34aadc', href: '#studie' },
        { n: 'Mijn ISP', i: 'idcard', c: '#00a79d', href: '#isp' },
        { n: 'LIMO', i: 'library', c: '#6e7f95', href: L.LIMO || 'https://limo.libis.be/index.html' },
        { n: 'Alma', i: 'food', c: '#d9534f', href: 'https://www.alma.be/nl/restaurants#/?th=' + THEME, act: 'alma' },
        { n: 'Sport', i: 'sport', c: '#2fb36b', act: 'soon' },
        { n: 'Attesten', i: 'cert', c: '#8e5bd6', href: `${LOKET}?tm=attest&ma=${store.get('mailApp') === 'web' ? 'web' : 'app'}&th=${THEME}` },
        { n: 'Hulp', i: 'help', c: '#8a96a3', href: L['HELP-LEUVEN-STUDENT'] || 'https://associatie.kuleuven.be/toledo/nl/help_KULeuven_campus_Leuven_student' },
        { n: 'Instellingen', i: 'sliders', c: '#5d6b73', href: '#instellingen', badge: P.upd ? 1 : 0 },
      ];
      h += `<div class="apps">${APPS.map(app).join('')}</div>`;
      put($('[data-k="body"]', el), h);
    };

    // ---- Instellingen (an "app" in Meer): look, mail, updates, about
    BUILD.instellingen = () => '<div class="lt"><h1>Instellingen</h1></div><div data-k="body"></div>';
    NAVS.instellingen = () => ({ back: { label: 'Meer', href: '#meer' }, title: 'Instellingen' });
    FILL.instellingen = (el) => {
      const L = linkMap();
      const mailApp = store.get('mailApp') !== 'web';
      const ic = (icon, color) => `<span class="ic" style="--c:${color}">${ico(icon)}</span>`;
      let h = `<div class="group plain set-about"><span class="ai" style="--c:#1f6f8b">${ico('book')}</span><span class="main"><span class="t">Toledo Mobile</span><span class="s">Versie ${esc(VERSION)}${CHANNEL === 'beta' ? ' (testversie)' : ''}</span></span></div>`;
      if (P.upd) h += `<div class="group" style="margin-top:12px">${row({ act: 'update', iconHtml: ic('refresh', '#34c759'), title: 'Update naar versie ' + P.upd.v, sub: 'Tik om te installeren' })}</div>`;
      h += `<div class="gh">Weergave</div>${segHtml([{ id: 'auto', label: 'Automatisch' }, { id: 'light', label: 'Licht' }, { id: 'dark', label: 'Donker' }], THEME, 'theme')}<p class="gf" style="margin-top:-6px">Automatisch volgt de instelling van je iPhone.</p>`;
      h += `<div class="gh">Mail openen in</div>${segHtml([{ id: 'app', label: 'Outlook-app' }, { id: 'web', label: 'Safari' }], mailApp ? 'app' : 'web', 'mailpref')}<p class="gf" style="margin-top:-6px">In de Outlook-app blijf je aangemeld met je KU Leuven-account.</p>`;
      h += `<div class="gh">App</div><div class="group">${row({ act: 'reload', iconHtml: ic('refresh', '#8e8e93'), title: 'Alles vernieuwen', chevron: false })}${row({ act: 'classic', iconHtml: ic('swap', '#8e8e93'), title: 'Klassieke Toledo', sub: 'De gewone website, zonder app-weergave' })}${row({ href: L['HELP-LEUVEN-STUDENT'] || 'https://associatie.kuleuven.be/toledo/nl/help_KULeuven_campus_Leuven_student', iconHtml: ic('help', '#8e8e93'), title: 'Hulp bij Toledo' })}</div>`;
      h += `<p class="foot">Toledo Mobile ${VERSION}${CHANNEL === 'beta' ? ' (testversie)' : ''}<br>Gebruikt je eigen Toledo-sessie.</p><p class="legal">Gemaakt met behulp van AI door Jeremy Verschueren. Toledo Mobile is een onafhankelijk project en is niet verbonden aan, goedgekeurd door of geassocieerd met KU Leuven. Toledo Mobile telt anoniem hoeveel mensen het gebruiken, zonder persoonsgegevens of studiegegevens. Je studiegegevens blijven op je eigen toestel en gaan nooit naar de maker. Gebruik op eigen risico.</p>`;
      put($('[data-k="body"]', el), h);
    };

    // ---- Studievoortgang + ISP (from KU Loket, opened from Meer)
    const stMeta = () => {
      if (P.st === 'loading') return 'Bijwerken…';
      const t = P.study && P.study.ts;
      if (!t) return '';
      return `Bijgewerkt ${dayDiff(t, Date.now()) === 0 ? 'vandaag ' + hhmm(t) : dShort(t) + ' ' + hhmm(t)} · <button type="button" data-act="strefresh">Bijwerken</button>`;
    };
    function stEmpty(what) {
      if (P.st === 'loading' || (!P.study && !P.st && bridgeBusy)) return `<div class="st-hero" style="min-height:190px"><div class="sk" style="height:14px;width:35%;opacity:.5"></div><div class="sk" style="height:24px;width:70%;margin-top:12px;opacity:.5"></div></div>${skGroup(5)}`;
      return empty(what === 'isp' ? 'idcard' : 'trend', what === 'isp' ? 'ISP nog niet geladen' : 'Studievoortgang nog niet geladen', 'Deze gegevens komen uit KU Loket.' + (P.stLogin ? ' KU Loket wil dat je even opnieuw aanmeldt.' : ''), '<p style="margin-top:14px"><button type="button" class="btn" data-act="stsync">Laden uit KU Loket</button></p>');
    }
    BUILD.studie = () => '<div class="lt"><h1>Studievoortgang</h1></div><div data-k="body"></div>';
    NAVS.studie = () => ({ back: { label: 'Meer', href: '#meer' }, title: 'Studievoortgang', right: `<button type="button" class="nb" data-act="strefresh" aria-label="Vernieuwen">${P.st === 'loading' ? '<span class="spin" style="width:20px;height:20px;border-width:2px"></span>' : ico('refresh')}</button>` });
    FILL.studie = (el) => {
      const S = P.study && P.study.v && P.study.v.study;
      put($('[data-k="body"]', el), S && S.length ? studyHtml(S, P.stSel, P.stOpen, stMeta()) : stEmpty('studie'));
    };
    BUILD.isp = () => '<div class="lt"><h1>Mijn ISP</h1></div><div data-k="body"></div>';
    NAVS.isp = () => ({ back: { label: 'Meer', href: '#meer' }, title: 'Mijn ISP', right: NAVS.studie().right });
    FILL.isp = (el) => {
      const v = P.study && P.study.v;
      put($('[data-k="body"]', el), v && v.isp ? ispHtml(v.isp, v.study, stMeta()) : stEmpty('isp'));
    };
    // one result with its statistics (#resultaat/<study>:<year>:<code>), opened from Studievoortgang
    BUILD.resultaat = () => '<div data-k="body"></div>';
    NAVS.resultaat = () => ({ back: { label: 'Terug', href: '#studie' }, title: 'Resultaat' });
    FILL.resultaat = (el) => {
      const S = P.study && P.study.v && P.study.v.study;
      const h = S && S.length ? resultHtml(S, P.resKey) : '';
      put($('[data-k="body"]', el), h || (S && S.length ? empty('trend', 'Resultaat niet gevonden', 'Dit vak staat niet meer in je studievoortgang.') : stEmpty('studie')));
    };
    const SUBVIEW = { studie: 'meer', isp: 'meer', resultaat: 'meer' };
    const UNDER = { instellingen: 'meer' }; // opened from Meer, but no study data needed

    /* ---------------- view switching ---------------- */
    function view(id) {
      if (!V[id]) {
        const el = document.createElement('section');
        el.className = 'view';
        el.dataset.view = id;
        el.innerHTML = BUILD[id]();
        $('#tm-main').appendChild(el);
        V[id] = { id, el, dirty: true, y: 0 };
        if (id === 'vakken') bindSearch(el);
        if (id === 'rooster') bindSwipe(el);
      }
      return V[id];
    }
    function render(id) { const v = view(id); FILL[id](v.el); v.dirty = false; }
    let rq = 0;
    function dirty(...ids) {
      if (ids.includes('meer')) ids.push('instellingen');
      ids.forEach((i) => { if (V[i]) V[i].dirty = true; });
      if (rq) return;
      rq = requestAnimationFrame(() => {
        rq = 0;
        const v = V[P.tab];
        if (v && v.dirty) { render(P.tab); setNav(NAVS[P.tab]()); }
        badges();
      });
    }
    function show(id, sub) {
      const prev = V[P.tab];
      if (id === P.tab && prev && !sub) { W.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (prev) prev.y = W.scrollY;
      if (id === 'rooster' && sub) P.seg = sub === 'examens' ? 'examens' : 'lessen';
      if (id === 'rooster') { P.agScrolled = !!(V.rooster && V.rooster.y); refreshKurt(); }
      if (id === 'resultaat') {
        const k = sub ? decodeURIComponent(sub) : P.resKey;
        if (k !== P.resKey && V.resultaat) V.resultaat.y = 0;
        P.resKey = k;
        if (!k) id = 'studie';
      }
      const first = !P.tab;
      const fromMeer = P.tab === 'meer' && (SUBVIEW[id] || UNDER[id]);
      P.tab = id;
      const v = view(id);
      Object.values(V).forEach((x) => x.el.classList.toggle('on', x === v));
      if (!first) { v.el.classList.remove('fade'); void v.el.offsetWidth; v.el.classList.add('fade'); }
      setTabOn(SUBVIEW[id] || UNDER[id] || id);
      if (SUBVIEW[id]) {
        // nothing to show yet: get it, and if the hidden frame can't, open KU Loket for a moment (at most once per 5 minutes, never right after a sync)
        const auto = !P.study && !syncM && Date.now() - (Number(ss.get('tm4-stauto')) || 0) > 5 * 60e3;
        if (auto) ss.set('tm4-stauto', String(Date.now()));
        refreshAgenda(auto, true);
      }
      render(id);
      if (id === 'studie') { const S = P.study && P.study.v && P.study.v.study; const a = S && S.find((x) => x.active); if (a && a.last) store.set('p:resSeen', a.last); }
      badges();
      setNav(NAVS[id]());
      if (fromMeer) { v.y = 0; const de = document.documentElement; de.style.overflow = 'hidden'; requestAnimationFrame(() => { de.style.overflow = ''; }); } // stops a running momentum scroll
      W.scrollTo(0, v.y || 0);
      // iPhone: a tap during Meer's momentum scroll can keep scrolling the new screen, so put it back on top a few times
      if (fromMeer) { let touched = false; const stop = () => { touched = true; }; W.addEventListener('touchstart', stop, { once: true, passive: true }); [16, 90, 250, 500].forEach((ms) => setTimeout(() => { if (!touched && P.tab === id) W.scrollTo(0, 0); }, ms)); setTimeout(() => W.removeEventListener('touchstart', stop), 600); }
      watchTitle(v.el);
      let hash = '#' + id + (id === 'rooster' && P.seg === 'examens' ? '/examens' : '');
      if (id === 'resultaat') hash = '#resultaat/' + encodeURIComponent(P.resKey);
      if (location.hash !== hash || __TM_LOC__.search) history.replaceState(null, '', __TM_LOC__.pathname + hash);
      if (id === 'updates') setTimeout(() => { if (P.tab === 'updates') { P.seen = Date.now(); store.set('p:seen', P.seen); badges(); } }, 1200);
    }
    function routeFromUrl(ignoreQuery) {
      // links from the course pages say where to go in ?tm= (the site's own app can rewrite #..., not ?...)
      const q = ignoreQuery ? '' : new URLSearchParams(__TM_LOC__.search).get('tm') || '';
      let h = location.hash.replace(/^#\/?/, '').split('&')[0];
      const qmap = { courses: 'vakken', menu: 'meer', agenda: 'rooster', examens: 'rooster/examens', vandaag: 'vandaag', vakken: 'vakken', rooster: 'rooster', updates: 'updates', meer: 'meer', studie: 'studie', isp: 'isp' };
      if (qmap[q] && h.split('/')[0] !== qmap[q].split('/')[0]) h = qmap[q];
      const [a, b] = h.split('/');
      const map = { '': 'vandaag', home: 'vandaag', vandaag: 'vandaag', vakken: 'vakken', courses: 'vakken', rooster: 'rooster', agenda: 'rooster', updates: 'updates', messages: 'updates', meer: 'meer', menu: 'meer', studie: 'studie', isp: 'isp', resultaat: 'resultaat', instellingen: 'instellingen', settings: 'instellingen' };
      return { tab: map[a] || 'vandaag', sub: b || '' };
    }
    function badges() {
      const n = P.events.filter((e) => e.subType !== 'due' && !e.dismissed && e.date > P.seen && e.date <= Date.now() + 60e3).length;
      setBadge('updates', P.tab === 'updates' ? 0 : n);
    }

    /* ---------------- interaction ---------------- */
    function bindSearch(el) {
      const inp = $('input', el), clr = $('.clr', el);
      inp.addEventListener('input', () => { P.search = inp.value; clr.hidden = !inp.value; FILL.vakken(el); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') inp.blur(); });
    }
    function bindSwipe(el) {
      let x0 = 0, y0 = 0, t0 = 0, on = false;
      el.addEventListener('touchstart', (e) => { if (P.seg !== 'lessen' || !e.target.closest('.day-wrap, .week')) return; on = true; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now(); }, { passive: true });
      el.addEventListener('touchend', (e) => {
        if (!on) return;
        on = false;
        const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.7 || Date.now() - t0 > 700) return;
        shiftWeek(dx < 0 ? 1 : -1);
      }, { passive: true });
    }
    function animWeek(dir) {
      const d = $('[data-k="day"]', V.rooster.el);
      if (!d) return;
      d.classList.remove('slide-l', 'slide-r'); void d.offsetWidth; d.classList.add(dir > 0 ? 'slide-l' : 'slide-r');
    }
    function shiftWeek(dir) { P.weekOff += dir; FILL.rooster(V.rooster.el); animWeek(dir); const st = $('.wk-sticky', V.rooster.el); if (st && W.scrollY > st.offsetTop) W.scrollTo(0, Math.max(0, st.offsetTop - 60)); }
    function scrollToDay(k, instant) {
      const sec = document.getElementById('tm-d-' + k);
      const st = $('.wk-sticky', V.rooster.el);
      if (!sec) { if (!instant) toast('Niets gepland op ' + dLong(fromYmd(k))); return; }
      const off = ($('#tm-nav').offsetHeight || 44) + (st ? st.offsetHeight : 0) + 4;
      W.scrollTo({ top: sec.getBoundingClientRect().top + W.scrollY - off, behavior: instant ? 'auto' : 'smooth' });
    }
    const ACTS = {
      update: () => { hideNotice(); updateSheet(P.upd); },
      clr: () => { const el = V.vakken.el, inp = $('input', el); inp.value = ''; P.search = ''; $('.clr', el).hidden = true; FILL.vakken(el); inp.focus(); },
      comm: () => { P.showComm = true; FILL.vakken(V.vakken.el); },
      offall: () => { P.showOff = true; FILL.vakken(V.vakken.el); },
      off: () => toast('Dit vak is nog niet beschikbaar in Toledo.'),
      favedit: () => { P.favEdit = true; setNav(NAVS.vakken()); FILL.vakken(V.vakken.el); W.scrollTo(0, 0); },
      favdone: () => { P.favEdit = false; setNav(NAVS.vakken()); FILL.vakken(V.vakken.el); },
      fav: (b) => toggleFav(b.dataset.id),
      alldl: () => { P.allDl = true; FILL.vandaag(V.vandaag.el); },
      rseg: (b) => { P.seg = b.dataset.id; history.replaceState(null, '', __TM_LOC__.pathname + '#rooster' + (P.seg === 'examens' ? '/examens' : '')); FILL.rooster(V.rooster.el); },
      wk: (b) => shiftWeek(Number(b.dataset.d)),
      wktoday: () => { const dir = P.weekOff > 0 ? -1 : 1; P.weekOff = 0; FILL.rooster(V.rooster.el); animWeek(dir); scrollToDay(ymd(Date.now())); },
      day: (b) => scrollToDay(b.dataset.d),
      agf: (b) => { P.agf = b.dataset.id; FILL.rooster(V.rooster.el); },
      jump: (b) => { const k = b.dataset.d; const dir = 1; P.weekOff = Math.round((mondayOf(fromYmd(k)) - mondayOf(Date.now())) / (7 * 864e5)); FILL.rooster(V.rooster.el); animWeek(dir); setTimeout(() => scrollToDay(k), 60); },
      filter: (b) => { P.filter = b.dataset.id; P.feedN = 50; FILL.updates(V.updates.el); W.scrollTo(0, 0); },
      feedmore: () => { P.feedN += 50; FILL.updates(V.updates.el); },
      allread: () => {
        const todo = P.events.filter((e) => !e.read && !e.dismissed);
        sheet({ title: 'Alles als gelezen markeren?', msg: `${todo.length} update${todo.length === 1 ? '' : 's'} worden ook in Toledo als gelezen gemarkeerd.`, actions: [{ label: 'Markeer als gelezen', run: () => { markRead(todo); dirty('updates', 'vandaag', 'vakken'); setNav(NAVS.updates()); toast('Alles gelezen'); } }] });
      },
      agrefresh: () => refreshAgenda(true),
      agsync: () => { goTo(LOKET + '?tm=sync&back=' + encodeURIComponent(P.tab === 'rooster' && P.seg === 'examens' ? 'rooster/examens' : P.tab || 'rooster') + (SUBVIEW[P.tab] || studyStale() ? '&x=study' : '')); },
      stsync: () => ACTS.agsync(),
      strefresh: () => refreshAgenda(true, true),
      stsel: (b) => { P.stSel = Number(b.dataset.id) || 0; FILL.studie(V.studie.el); },
      resopen: (b) => { const k = b.dataset.k; P.stOpen[k] = !P.stOpen[k]; FILL.studie(V.studie.el); },
      // Outlook-app first (iOS lets a tap open another app). Safari first asks "Open in Outlook?", and that can take
      // longer than any timer, so the app never goes to Outlook on the web by itself (that is the Microsoft sign-in
      // you'd get on returning): only if the app clearly didn't open, it offers the web version as a choice.
      mail: () => {
        if (store.get('mailApp') === 'web') { goTo(MAIL); return; }
        let away = false, closeSheet = null;
        const seen = () => { if (document.visibilityState === 'hidden') { away = true; store.set('mailOk', 1); if (closeSheet) { closeSheet(); closeSheet = null; } } };
        const gone = () => { away = true; };
        document.addEventListener('visibilitychange', seen);
        W.addEventListener('pagehide', gone, { once: true });
        W.addEventListener('blur', gone, { once: true });
        __TM_GO__('ms-outlook://emails');
        setTimeout(() => {
          W.removeEventListener('blur', gone);
          if (away || store.get('mailOk')) { setTimeout(() => document.removeEventListener('visibilitychange', seen), 60e3); return; }
          closeSheet = sheet({ title: 'Outlook-app niet geopend', msg: 'Staat de Outlook-app op je iPhone? Je kan je mail ook in Safari openen.', actions: [
            { label: 'Opnieuw in de Outlook-app', run: () => ACTS.mail() },
            { label: 'Outlook op het web', run: () => goTo(MAIL) },
          ] });
        }, 2600);
      },
      mailpref: (b) => { store.set('mailApp', b.dataset.id); FILL.instellingen(V.instellingen.el); toast(b.dataset.id === 'web' ? 'Mail opent in Safari' : 'Mail opent in de Outlook-app'); },
      loket: () => sheet({ title: 'KU Loket', actions: [
        { label: 'Studietracker', href: 'https://kuleuven.be/kuloket/zr_0184?sap-language=NL' },
        { label: 'Uurrooster in KU Loket', href: 'https://www.kuleuven.be/kuloket/zr_0367?sap-language=NL' },
        { label: 'Examenrooster in KU Loket', href: 'https://www.kuleuven.be/kuloket/zr_0363' },
        { label: 'ISP aanpassen', href: 'https://www.kuleuven.be/kuloket/zr_0442?sap-language=NL' },
        { label: 'Studievoortgangsdossier', href: 'https://kuleuven.be/kuloket/zr_1017?sap-language=NL' },
      ] }),
      login: () => { ss.set('tm4-login', '1'); location.reload(); },
      soon: () => {}, // Sport: only an icon for now, the app itself comes later
      alma: (el) => openAlma(el.getAttribute('href'), el),
      theme: (b) => {
        const t = b.dataset.id;
        saveTheme(t);
        applyTheme(t);
        if (V.instellingen) segSet(V.instellingen.el, t);
        toast(t === 'light' ? 'Lichte modus' : t === 'dark' ? 'Donkere modus' : 'Volgt je iPhone');
      },
      reload: () => { ['p:events', 'p:enr', 'p:upcoming', 'p:mail'].forEach((k) => store.del(k)); toast('Bezig met vernieuwen…'); loadAll(true); refreshAgenda(true); },
      classic: () => sheet({ title: 'Klassieke Toledo openen?', msg: 'Je kan altijd terug naar de app via de knop onderaan.', actions: [{ label: 'Open klassieke Toledo', run: () => { ss.set('tm4-classic', '1'); history.replaceState(null, '', __TM_LOC__.pathname + '#/home'); location.reload(); } }] }),
    };

    /* ---------------- Alma inside the app ----------------
       Alma's site loads in a hidden frame on top of the app and only slides in once its app screen stands,
       so the original alma.be never flashes. The frame is removed again as soon as you leave Alma. */
    let almaOpen = null;
    function openAlma(href, tile) { if (TEST) return __TM_GO__(href);
      if (almaOpen) return;
      // the notch and home bar: a frame doesn't know them, so pass them along
      const probe = document.createElement('div');
      probe.setAttribute('data-tm4', '');
      probe.style.cssText = 'position:fixed;visibility:hidden;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)';
      document.body.appendChild(probe);
      const cs = getComputedStyle(probe);
      const st = Math.round(parseFloat(cs.paddingTop) || 0), sb = Math.round(parseFloat(cs.paddingBottom) || 0);
      probe.remove();
      const seed = store.get('alma:sync') || {};
      const url = 'https://www.alma.be/nl/restaurants?tm=frame&st=' + st + '&sb=' + sb + '&s=' + encodeURIComponent(JSON.stringify(seed)) + '#/?th=' + THEME;
      const layer = document.createElement('div');
      layer.id = 'tm-alma';
      layer.setAttribute('data-tm4', '');
      const f = document.createElement('iframe');
      f.title = 'Alma';
      f.setAttribute('data-tm4', '');
      f.src = url;
      layer.appendChild(f);
      const busy = document.createElement('span');
      busy.className = 'spin app-spin';
      if (tile) (tile.querySelector('.ai') || tile).appendChild(busy);
      let ready = false;
      const st0 = { y: W.scrollY };
      const done = () => { busy.remove(); };
      const close = (tab) => {
        if (!almaOpen) return;
        W.removeEventListener('message', onMsg);
        W.removeEventListener('popstate', onPop);
        almaOpen = null;
        done();
        layer.classList.remove('on');
        setTimeout(() => layer.remove(), 330);
        if (tab && tab !== P.tab && (V[tab] || BUILD[tab])) show(tab);
        else W.scrollTo(0, st0.y);
      };
      const onMsg = (e) => {
        if (e.source !== f.contentWindow || !/^https:\/\/(www\.)?alma\.be$/.test(e.origin) || !e.data || e.data.tm4 !== 'alma') return;
        if (e.data.save) store.set('alma:sync', e.data.save);
        if (e.data.ready && !ready) {
          ready = true;
          done();
          try { history.pushState({ tmAlma: 1 }, '', location.href); } catch (_) {}
          layer.classList.add('on');
        }
        if (e.data.close) close(e.data.tab);
      };
      // the back swipe from Alma's first screen: back in the app
      const onPop = () => { if (ready) close(); };
      W.addEventListener('message', onMsg);
      W.addEventListener('popstate', onPop);
      almaOpen = { close };
      document.body.appendChild(layer);
      // Alma doesn't answer (offline, its site changed): open it the old way
      setTimeout(() => { if (!ready && almaOpen) { close(); goTo(href); } }, 9000);
    }

    W.addEventListener('click', (e) => {
      if (!e.target || !e.target.closest) return;
      const tab = e.target.closest('#tm-tabs a');
      if (tab) { e.preventDefault(); show(tab.dataset.tab); return; }
      const act = e.target.closest('[data-act]');
      if (act && ACTS[act.dataset.act]) { e.preventDefault(); ACTS[act.dataset.act](act, e); return; }
      const ev = e.target.closest('[data-ev]');
      if (ev) { const id = ev.dataset.ev; const item = P.events.find((x) => String(x.id) === id); if (item) markRead([item]); }
      const a = e.target.closest('a[href]');
      if (a) {
        const href = a.getAttribute('href');
        if (href.startsWith('#')) { e.preventDefault(); const r = (() => { const [x, y] = href.slice(1).split('/'); return { tab: x, sub: y }; })(); if (V[r.tab] || BUILD[r.tab]) show(r.tab, r.sub); }
        return;
      }
      const card = e.target.closest('[data-href]');
      if (card && !e.target.closest('button')) {
        const href = card.dataset.href;
        if (href.startsWith('#')) { const [x, y] = href.slice(1).split('/'); show(x, y); } else goTo(href);
      }
    }, true);
    const OWN = /^#(vandaag|vakken|rooster|rooster\/examens|updates|meer|instellingen|studie|isp|resultaat\/[^/]+)$/;
    W.addEventListener('hashchange', () => {
      if (!OWN.test(location.hash)) { history.replaceState(null, '', __TM_LOC__.pathname + '#' + P.tab + (P.tab === 'rooster' && P.seg === 'examens' ? '/examens' : P.tab === 'resultaat' ? '/' + encodeURIComponent(P.resKey || '') : '')); return; }
      const r = routeFromUrl(true);
      if (r.tab !== P.tab || r.sub) show(r.tab, r.sub);
    });

    /* ---------------- data ---------------- */
    const H = { 'Toledo-Language': 'nl' };
    const papi = (p) => api(PORTAL_ORIGIN + '/portal/api/' + p, { headers: H });
    function onFail(key) {
      return (e) => {
        P.err[key] = e;
        if (e && e.auth) goLogin();
      };
    }
    let loginTried = false;
    function goLogin() {
      if (loginTried || TEST) { P.authFail = true; dirty(P.tab); return; }
      loginTried = true;
      const last = Number(ss.get('tm4-login-at')) || 0;
      if (Date.now() - last < 90e3) { P.authFail = true; dirty(P.tab); return; }
      ss.set('tm4-login-at', String(Date.now()));
      ss.set('tm4-login', '1');
      location.reload();
    }
    function loadAll(force) {
      const mark = () => { P.loadedAt = Date.now(); };
      const jobs = [
        swr('p:user', () => papi('user'), (v) => { P.user = v; dirty('vandaag', 'meer'); }),
        swr('p:enr', () => papi('enrollments'), (v) => { P.enr = Array.isArray(v) ? v : []; dirty('vandaag', 'vakken', 'rooster'); }).catch(onFail('enr')),
        swr('p:events', () => papi('events'), (v) => { P.events = Array.isArray(v) ? v : []; learnPk(); dirty('vandaag', 'updates', 'vakken'); }).catch(onFail('events')),
        swr('p:upcoming', () => papi('upcoming'), (v) => { P.upcoming = Array.isArray(v) ? v : []; dirty('vandaag', 'rooster'); }).catch(() => {}),
        swr('p:links', () => papi('links'), (v) => { P.links = Array.isArray(v) ? v : []; dirty('meer'); }, { maxAge: force ? 0 : 12 * 3600e3 }).catch(() => {}),
        swr('p:mail', () => papi('emails/unread'), (v) => { P.mail = v; dirty('meer'); }).catch(() => {}),
      ];
      jobs[0].catch(onFail('user'));
      return Promise.allSettled(jobs).then(() => { mark(); dirty('vandaag', 'vakken', 'updates', 'rooster', 'meer'); });
    }

    /* KU Loket lives on another origin of the same site: a hidden frame reads the timetable there
       (the userscript runs inside it, see bridge()) and hands it over with postMessage. */
    // force = you pressed "vernieuwen": if the hidden frame can't do it quickly (or KU Loket first wants you to
    // sign in), the app opens KU Loket itself for a moment and comes straight back with the timetable.
    let bridgeBusy = false, bridgeSt = false, bridgeDone = Promise.resolve();
    const studyStale = () => !P.study || Date.now() - P.study.ts > 6 * 3600e3;
    // force: you asked for it (button), so when the hidden frame can't, KU Loket opens for a moment.
    // study: also read study progress + ISP (opening those pages, or when that copy is older than 6 hours).
    // quiet: pulled to refresh: try the hidden frame, never leave the page.
    function refreshAgenda(force, study, quiet) {
      const a = P.agenda;
      const wantStudy = !!study && (force || studyStale());
      // once: an old copy without exam room links is read again right away
      const upg = examsNeedRooms() && Date.now() - (Number(store.get('p:agUpg')) || 0) > 3600e3;
      if (upg) store.set('p:agUpg', Date.now());
      if (!force && !upg && !wantStudy && a && Date.now() - a.ts < 30 * 60e3 && !studyStale()) return Promise.resolve();
      // nothing will load study progress now: say so (with the "Laden uit KU Loket" button) instead of loading forever
      const stIdle = () => {
        // the timetable won't load now either: show the "Examenrooster laden" button instead of grey bars forever
        if (!P.ag) { P.ag = 'failed'; dirty('vandaag', 'rooster'); }
        if (wantStudy && P.st !== 'loading') { P.st = 'failed'; dirty('studie', 'isp', 'resultaat'); if (SUBVIEW[P.tab]) setNav(NAVS[P.tab]()); }
      };
      if (bridgeBusy) {
        if (force && !quiet) ACTS.agsync();
        else if (wantStudy && !bridgeSt) bridgeDone.then(() => refreshAgenda(false, true, quiet));
        return Promise.resolve();
      }
      if (TEST && !W.__TM_BRIDGE__) { if (force) toast('Vernieuwen werkt op de iPhone'); stIdle(); return Promise.resolve(); }
      const fail = store.get('p:bridgefail') || { n: 0, ts: 0 };
      if (fail.n >= 2 && Date.now() - fail.ts < 12 * 3600e3 && !upg) { if (force && !quiet) ACTS.agsync(); else stIdle(); return Promise.resolve(); }
      const withSt = wantStudy || studyStale();
      bridgeBusy = true;
      bridgeSt = withSt;
      P.ag = 'loading';
      if (withSt) P.st = 'loading';
      dirty('vandaag', 'rooster', 'studie', 'isp', 'resultaat');
      if (SUBVIEW[P.tab]) setNav(NAVS[P.tab]());
      if (P.tab === 'rooster') setNav(NAVS.rooster());
      const f = document.createElement('iframe');
      f.src = LOKET + '?tm=bridge' + (withSt ? '&x=study' : '');
      f.title = 'KU Loket';
      f.setAttribute('aria-hidden', 'true');
      f.setAttribute('data-tm4', '');
      f.tabIndex = -1;
      f.style.cssText = 'position:fixed;left:-20px;top:-20px;width:1px;height:1px;border:0;opacity:0;pointer-events:none';
      let timer = 0, done = false, settle = () => {};
      const settled = new Promise((r) => { settle = r; });
      bridgeDone = settled;
      const finish = (ok, login, noSt) => {
        if (done) return;
        done = true;
        if (withSt) { P.st = ok && !noSt ? 'ok' : 'failed'; P.stLogin = !ok && !!login; }
        clearTimeout(timer);
        W.removeEventListener('message', onMsg);
        setTimeout(() => f.remove(), 50);
        bridgeBusy = false;
        bridgeSt = false;
        settle();
        P.ag = ok ? 'ok' : 'failed';
        P.agLogin = !ok && !!login;
        if (ok) store.del('p:bridgefail');
        else if (!login) { const fl = store.get('p:bridgefail') || { n: 0 }; store.set('p:bridgefail', { n: fl.n + 1, ts: Date.now() }); }
        dirty('vandaag', 'rooster', 'studie', 'isp', 'resultaat', 'meer');
        if (P.tab === 'rooster' || SUBVIEW[P.tab]) setNav(NAVS[P.tab]());
        if ((!ok || (withSt && noSt && SUBVIEW[P.tab])) && force && !quiet) ACTS.agsync();
        else if (ok && force && !quiet) toast(SUBVIEW[P.tab] ? 'Bijgewerkt' : 'Agenda bijgewerkt');
      };
      const onMsg = (e) => {
        if (e.origin !== LOKET_ORIGIN || !e.data || e.data.tm4 !== 'agenda') return;
        if (e.data.ok && e.data.data) { const d = e.data.data; saveAgenda(d); saveStudy(d); finish(true, false, withSt && !d.study && !d.isp); return; }
        if (e.data.pending) {
          // KU Loket wants you to sign in first: that needs the real page
          if (force && !quiet) { finish(false, true); return; }
          // show the "Laden" button right away; the frame may still get through by itself, so give it a little longer
          if (P.ag === 'loading') {
            P.ag = 'failed';
            P.agLogin = true;
            dirty('vandaag', 'rooster');
            if (P.tab === 'rooster') setNav(NAVS.rooster());
          }
          clearTimeout(timer);
          timer = setTimeout(() => finish(false, true), 20000);
          return;
        }
        finish(false);
      };
      W.addEventListener('message', onMsg);
      timer = setTimeout(() => finish(false), (force && !quiet ? 7000 : 10000) + (withSt ? 8000 : 0));
      document.body.appendChild(f);
      return settled;
    }

    /* Studieplek (KURT) is another site too: a hidden frame reads your bookings there (kurtBridge), so the Agenda
       has them without opening Studieplek first. At most every 2 minutes. */
    let krAt = 0;
    function refreshKurt(force) { if (TEST) return;
      if (!force && Date.now() - krAt < 120e3) return;
      krAt = Date.now();
      const f = document.createElement('iframe');
      f.setAttribute('aria-hidden', 'true'); f.tabIndex = -1;
      f.style.cssText = 'position:fixed;left:-10px;top:-10px;width:1px;height:1px;border:0;opacity:0;pointer-events:none';
      let timer = 0;
      const done = () => { clearTimeout(timer); W.removeEventListener('message', onMsg); f.remove(); };
      const onMsg = (e) => {
        if (e.origin !== KURT || !e.data || e.data.tm4 !== 'kr') return;
        done();
        if (!e.data.ok || !Array.isArray(e.data.list)) return;
        P.kurt = { ts: Date.now(), v: e.data.list.filter((r) => r && r.id && /^\d{4}-\d\d-\d\d$/.test(r.sd) && /^\d{4}-\d\d-\d\d$/.test(r.ed) && /^\d\d:\d\d$/.test(r.st) && /^\d\d:\d\d$/.test(r.et)) };
        store.set('p:kurt', P.kurt);
        dirty('rooster');
      };
      W.addEventListener('message', onMsg);
      timer = setTimeout(done, 15000);
      f.src = KURT + '/?tm=krb';
      document.body.appendChild(f);
    }

    /* ---------------- start ---------------- */
    guardPath();
    learnPk();
    const r0 = routeFromUrl();
    show(r0.tab, r0.sub);
    badges();
    loadAll(false);
    setTimeout(() => refreshAgenda(false), 350);
    if (!params.get('kr')) setTimeout(() => refreshKurt(), r0.tab === 'rooster' ? 500 : 2500);
    updateWatch((info) => { P.upd = info; dirty('vandaag', 'meer'); });
    justUpdated();
    setTimeout(countUser, 4000);
    setInterval(() => { if (document.visibilityState === 'visible' && (P.tab === 'vandaag' || P.tab === 'rooster')) dirty(P.tab); }, 30e3);
    // Toledo itself, and KU Loket (same site, so its cookies go along) for the timetable
    pullRefresh(() => {
      if (SUBVIEW[P.tab]) return refreshAgenda(true, true, true);
      refreshKurt(true);
      return Promise.all([loadAll(true), refreshAgenda(true, false, true)]);
    });
    keepAlive('portal', [[PORTAL_ORIGIN + '/portal/api/user'], [LOKET_ORIGIN + '/sap/bc/ui2/start_up', 'no-cors']]);
    const wake = () => {
      if (document.visibilityState !== 'visible') return;
      dirty(P.tab);
      if (Date.now() - P.loadedAt > 120e3) loadAll(false);
      refreshAgenda(false);
    };
    document.addEventListener('visibilitychange', wake);
    W.addEventListener('pageshow', (e) => { if (e.persisted) wake(); });
  }
  /* ================================================================== course app (ultra.edu.kuleuven.cloud/ultra/app) */
  function ultraApp() {
    takeover('Toledo', [PORTAL_ORIGIN]);
    const TAB_LABEL = { vandaag: 'Vandaag', vakken: 'Vakken', rooster: 'Agenda', updates: 'Updates', meer: 'Meer' };
    const TABS = [
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: PORTAL + '?tm=meer' },
    ];
    buildShell(TABS, '');
    // The app also runs on the course address Blackboard itself uses (/ultra/courses/<id>/outline),
    // which is where Toledo's link service lands after signing in.
    const PATH_PK = W.__TM_PK__ || '';
    if (PATH_PK) {
      ss.del('tm4-classic-ultra');
      let h = location.hash || '';
      // Blackboard's own app may already have rewritten the address (#/cijfers -> #%2Fcijfers) before we run
      if (/^#%2F/i.test(h)) h = h.replace(/%2F/gi, '/').replace(/%3F/i, '?');
      const qs = h.includes('?') ? h.slice(h.indexOf('?')) : '';
      const resume = ss.get('tm4-resume') || '';
      ss.del('tm4-resume');
      if (!/^#\/(cijfers|agenda|zoek|groepen)/.test(h) && (resume.startsWith('#/c/' + PATH_PK) || /^#\/(cijfers|zoek|groepen)/.test(resume))) h = /^#\/(cijfers|zoek|groepen)/.test(resume) ? resume : resume + qs;
      if (/^#\/vak\//.test(h)) h = h.replace(/^#\/vak\/[^/?]*/, '#/c/' + PATH_PK);
      if (!/^#\/c\/_\d+_\d+/.test(h) && !/^#\/(cijfers|agenda|zoek|groepen)/.test(h)) h = '#/c/' + PATH_PK + qs;
      history.replaceState(history.state && history.state.tm ? history.state : { tm: 1, d: 0 }, '', __TM_LOC__.pathname + h);
    }
    // Meer > Toledo-agenda opens /ultra/calendar?tm=agenda: the query survives Blackboard's sign-in (the hash does not)
    // Meer > Groepswerken opens /ultra/calendar?tm=groepen&cs=...: the query survives signing in and Toledo's link service, a hash doesn't
    if (W.__TM_ROUTE__ === 'groepen' && /^#%2Fgroepen/i.test(location.hash)) history.replaceState({ tm: 1, d: 0 }, '', __TM_LOC__.origin + __TM_LOC__.pathname + __TM_LOC__.search + location.hash.replace(/%2F/gi, '/').replace(/%3F/i, '?'));
    if (W.__TM_ROUTE__ === 'groepen' && !/^#(\/|%2F)groepen/i.test(location.hash)) { const q = new URLSearchParams(__TM_LOC__.search); q.delete('tm'); history.replaceState({ tm: 1, d: 0 }, '', __TM_LOC__.origin + __TM_LOC__.pathname + '?tm=groepen#/groepen?' + q); }
    if (W.__TM_ROUTE__ === 'agenda' && !/^#(\/|%2F)agenda/i.test(location.hash)) history.replaceState({ tm: 1, d: 0 }, '', __TM_LOC__.origin + __TM_LOC__.pathname + __TM_LOC__.search + '#/agenda');
    // the screen this page was opened for (Groepswerken, Toledo-agenda): if Blackboard's own app wipes the address later, go back to it
    const ROUTE_HASH = W.__TM_ROUTE__ && /^#\/(groepen|agenda)/.test(location.hash) ? location.hash : '';
    guardPath();
    const U = { depth: (history.state && history.state.tm && history.state.d) || 0, views: new Map(), titles: {}, items: {}, cur: null, curKey: '', animBack: false, scroll: {} };
    try { U.scroll = JSON.parse(ss.get('tm4-uscroll') || '{}') || {}; } catch (_) {}
    const fromPortal = /^https:\/\/toledo\.kuleuven\.be\//.test(document.referrer);
    // remember when Blackboard last answered, to tell the portal (see leave())
    let okAt = 0;
    const uget = (p) => api(ULTRA + p).then((v) => { okAt = Date.now(); return v; });

    /* ---------------- routes + context ---------------- */
    function parse() {
      // Blackboard's own app can rewrite the address at any moment (#/groepen?x -> #%2Fgroepen%3Fx): read both
      let h = location.hash.replace(/^#/, '');
      if (/^%2F/i.test(h)) h = h.replace(/%2F/gi, '/').replace(/%3F/i, '?');
      const i = h.indexOf('?');
      const path = i >= 0 ? h.slice(0, i) : h;
      const q = new URLSearchParams(i >= 0 ? h.slice(i + 1) : '');
      const s = path.split('/').filter(Boolean);
      const r = { path, q, type: 'none' };
      if (s[0] === 'cijfers') r.type = 'grades';
      else if (s[0] === 'agenda') r.type = 'agenda';
      else if (s[0] === 'zoek') r.type = 'search';
      else if (s[0] === 'groepen') r.type = 'groups';
      else if (s[0] === 'vak' && s[1]) { r.type = 'resolve'; r.lu = decodeURIComponent(s[1]); r.rest = s.slice(2).join('/'); }
      else if (s[0] === 'c' && /^_\d+_\d+$/.test(s[1] || '')) {
        r.pk = s[1];
        const t = s[2] || '';
        if (t === 'f' && s[3]) { r.type = 'folder'; r.id = s[3]; }
        else if (t === 'd' && s[3]) { r.type = 'doc'; r.id = s[3]; }
        else if (t === 'item' && s[3]) { r.type = 'item'; r.id = s[3]; }
        else { r.type = 'course'; r.tab = t === 'cijfers' ? 'cijfers' : (t === 'aankondigingen' || t === 'a') ? 'aankondigingen' : 'inhoud'; if (t === 'a') r.ann = s[3] || ''; }
      }
      return r;
    }
    const ctxKey = (pk) => 'tm4-ctx:' + pk;
    const tabOf = (r) => (r.type === 'grades' || r.type === 'agenda' || r.type === 'groups' ? 'meer' : r.type === 'search' ? 'vakken' : getCtx(r.pk).f || 'vakken');
    function getCtx(pk) { try { return JSON.parse(ss.get(ctxKey(pk)) || '{}') || {}; } catch (_) { return {}; } }
    function saveCtx(pk, q) {
      const c = getCtx(pk);
      ['lu', 't', 'k', 'f', 'n'].forEach((k) => { if (q.get(k)) c[k] = q.get(k); });
      if (q.get('lu') && !q.get('n')) delete c.n;
      ss.set(ctxKey(pk), JSON.stringify(c));
      if (c.k) saveMeta(pk, { color: c.k });
      if (c.lu) saveMeta(pk, { lu: c.lu });
    }
    function meta(pk) {
      const m = store.get('m:' + pk) || {};
      const c = getCtx(pk);
      const lu = m.lu || c.lu || '';
      return { pk, lu, name: cleanTitle(m.name || c.t || ''), color: c.k || m.color || '', code: luCode(lu) || codeOf(m.name || '') };
    }
    function saveMeta(pk, patch) { store.set('m:' + pk, Object.assign(store.get('m:' + pk) || {}, patch)); }
    const deepLink = (pk, it) => `${ULTRA}/ultra/redirect?redirectType=nautilus&courseId=${pk}&contentId=${it.id}${/^_\d+_\d+$/.test(it.p || '') ? '&parentId=' + it.p : ''}`;
    const ltiUrl = (pk, id) => `${ULTRA}/webapps/blackboard/execute/blti/launchLink?course_id=${pk}&content_id=${id}&from_ultra=true`;

    /* ---------------- content model ---------------- */
    function fileFromAnchor(a) {
      let info = {};
      try { info = JSON.parse(a.getAttribute('data-bbfile') || '{}') || {}; } catch (_) {}
      const raw = String(a.getAttribute('href') || info.resourceUrl || '').replace(/^@X@[^@]*@X@/i, '/');
      const isFile = a.getAttribute('data-bbtype') === 'attachment' || /\/bbcswebdav\//.test(raw) || !!info.fileName;
      if (!isFile) return null;
      const u = absU(raw);
      if (!u) return null;
      return { u, n: info.displayName || info.fileName || a.textContent.trim() || 'Bestand', mi: info.mimeType || '', s: Number(info.fileSize) || 0 };
    }
    function parseDoc(html) {
      const out = { files: [], x: false, sn: '' };
      if (!html) return out;
      const d = new DOMParser().parseFromString(String(html), 'text/html');
      $$('a', d).forEach((a) => { const f = fileFromAnchor(a); if (f) { if (!out.files.some((x) => x.u === f.u)) out.files.push(f); a.remove(); } });
      const txt = d.body.textContent.replace(/\s+/g, ' ').trim();
      const rich = !!d.body.querySelector('img, iframe, video, table, a[href]');
      out.x = txt.length > 0 || rich;
      // a short note above some files: show the note and open the files straight from the list
      if (out.files.length && !rich && txt.length && txt.length < 200) { out.x = false; out.sn = txt; }
      return out;
    }
    const UDB = /^ultra[\s_-]*document[\s_-]*body$/i;
    const bodyOf = (x) => (x.body && typeof x.body === 'object' ? (x.body.displayText || x.body.rawText || '') : (x.body || ''));
    function normItem(x) {
      const h = typeof x.contentHandler === 'string' ? x.contentHandler : (x.contentHandler && x.contentHandler.id) || '';
      const cd = (x.contentDetail && x.contentDetail[h]) || {};
      const it = { id: x.id, p: x.parentId || '', t: String(x.title || '').trim() || 'Zonder titel', m: Number(x.modifiedDate) || Date.parse(x.modified || x.created || '') || 0 };
      const d = textOf(x.description);
      if (d) it.d = d.slice(0, 200);
      if (/x-bb-(folder|lesson)/.test(h) || cd.isFolder) { it.k = 'folder'; if (/x-bb-document/.test(h)) it.ud = 1; }
      else if (/x-bb-file/.test(h)) {
        it.k = 'file';
        const f = cd.file || {};
        it.f = { u: f.permanentUrl ? absU(f.permanentUrl) : '', n: f.fileName || it.t, mi: f.mimeType || '', s: Number(f.fileSize) || 0 };
      } else if (/x-bb-document/.test(h)) { it.k = 'doc'; const pd = parseDoc(bodyOf(x)); it.files = pd.files; it.x = pd.x; if (pd.sn) it.sn = pd.sn; }
      else if (/externallink/.test(h)) { it.k = 'link'; it.u = cd.url || (x.contentHandler && x.contentHandler.url) || ''; }
      else if (/blti|lti/.test(h)) it.k = 'lti';
      else if (/asmt|assignment|assessment|test|survey|turnitin/.test(h)) it.k = 'task';
      else if (/forum|discussion|journal|blog|wiki|conversation/.test(h)) it.k = 'talk';
      else it.k = 'other';
      // Ultra's newer "Document" pages keep their text in child items called "ultraDocumentBody":
      // that text is shown on the page itself (see folderView), never as a row of its own
      if (it.k === 'doc' && UDB.test(it.t)) { it.ub = 1; if (x.body != null) it.html = sanitize(bodyOf(x), (a) => { const f = fileFromAnchor(a); return f ? frowHtml(f) : ''; }); }
      U.items[it.id] = it;
      return it;
    }
    const kidsMem = new Map();
    function cachedKids(pk, id) {
      const k = `c:${pk}:${id}`;
      if (kidsMem.has(k)) return kidsMem.get(k);
      const c = store.get(k);
      if (c) { c.v.forEach((it) => { U.items[it.id] = it; }); kidsMem.set(k, c); }
      return c;
    }
    function fetchChildren(pk, id) {
      return once('k:' + pk + id, () => uget(`/learn/api/v1/courses/${pk}/contents/${id}/children?limit=200`)
        .catch((e) => { if (e.auth) throw e; return uget(id === 'ROOT' ? `/learn/api/public/v1/courses/${pk}/contents?limit=200` : `/learn/api/public/v1/courses/${pk}/contents/${id}/children?limit=200`); })
        .then((j) => {
          const v = (j.results || []).filter((x) => x.visibility !== 'HIDDEN').map(normItem);
          const rec = { ts: Date.now(), v };
          kidsMem.set(`c:${pk}:${id}`, rec);
          store.set(`c:${pk}:${id}`, rec);
          return v;
        }));
    }
    function fetchItem(pk, id) {
      return once('i:' + pk + id, () => uget(`/learn/api/v1/courses/${pk}/contents/${id}`).then((x) => {
        const it = normItem(x);
        it.html = sanitize(bodyOf(x), (a) => { const f = fileFromAnchor(a); return f ? frowHtml(f) : ''; });
        store.set(`i:${pk}:${id}`, { ts: Date.now(), v: it });
        return it;
      }));
    }
    function fetchAnn(pk) {
      return once('a:' + pk, () => uget(`/learn/api/public/v1/courses/${pk}/announcements?limit=100`).then((j) => {
        const now = Date.now();
        const v = (j.results || []).filter((a) => !a.draft).filter((a) => {
          const d = a.availability && a.availability.duration;
          if (!d || d.type !== 'Restricted') return true;
          const s = d.start ? Date.parse(d.start) : 0, e = d.end ? Date.parse(d.end) : 0;
          return (!s || s <= now) && (!e || e >= now);
        }).map((a) => {
          const d = a.availability && a.availability.duration;
          return { id: a.id, t: a.title || 'Aankondiging', date: Date.parse((d && d.start) || a.created || '') || 0, html: sanitize(a.body || '') };
        }).sort((a, b) => b.date - a.date);
        store.set('a:' + pk, { ts: Date.now(), v });
        return v;
      }));
    }
    function getMe() {
      const c = store.get('me2');
      if (c && Date.now() - c.ts < 7 * 864e5) return Promise.resolve(c.v);
      return once('me', () => uget('/learn/api/public/v1/users/me?fields=id,userName,studentId').then((v) => { store.set('me2', { ts: Date.now(), v }); return v; }));
    }
    // your student number (r0123456): the portal only knows your login id, so it is handed over on the way back
    function rnParam() {
      const c = store.get('me2');
      const d = c && c.v && /^\d{7,8}$/.test(c.v.studentId || '') ? String(c.v.studentId).slice(-7) : '';
      return d && store.get('rnSent') !== d ? '&rn=r' + d : '';
    }
    const num = (n) => String(Math.round(Number(n) * 100) / 100).replace('.', ',');
    function gradeText(x, c) {
      if (x.exempt) return 'Vrijgesteld';
      const d = x.displayGrade || {};
      const NL = { complete: 'Voltooid', completed: 'Voltooid', incomplete: 'Onvolledig', pass: 'Geslaagd', passed: 'Geslaagd', fail: 'Niet geslaagd', failed: 'Niet geslaagd' };
      if (d.text) return NL[String(d.text).toLowerCase()] || d.text;
      const poss = d.possible || (c.score && c.score.possible);
      if (d.score != null) return d.scaleType === 'Percent' ? Math.round(d.score) + '%' : num(d.score) + (poss ? '/' + num(poss) : '');
      if (x.score != null) return num(x.score) + (poss ? '/' + num(poss) : '');
      return '';
    }
    function fetchGrades(pk) {
      return once('g:' + pk, async () => {
        const me = await getMe();
        const [cols, mine] = await Promise.all([
          uget(`/learn/api/public/v2/courses/${pk}/gradebook/columns?limit=200`),
          uget(`/learn/api/public/v2/courses/${pk}/gradebook/users/${me.id}?limit=200`).catch((e) => { if (e.auth) throw e; return { results: [] }; }),
        ]);
        const g = {};
        (mine.results || []).forEach((x) => { g[x.columnId] = x; });
        const v = (cols.results || []).filter((c) => !(c.availability && c.availability.available === 'No')).map((c) => {
          const x = g[c.id] || {};
          return { id: c.id, t: c.displayName || c.name || 'Beoordeling', due: c.grading && c.grading.due ? Date.parse(c.grading.due) : 0, cid: c.contentId || '', st: x.status || '', g: gradeText(x, c) };
        });
        // Blackboard's gradebook says "NeedsGrading" as soon as a draft (or a group member's draft) exists; only the
        // attempt itself tells whether it was really handed in. Check the recent ones without a grade.
        const SUBMITTED = /^(NeedsGrading|Completed|InProgressNeedsGrading)$/;
        const check = v.filter((x) => !x.g && x.st === 'NeedsGrading' && (!x.due || x.due > Date.now() - 30 * 864e5)).slice(0, 12);
        await Promise.all(check.map((x) => uget(`/learn/api/public/v2/courses/${pk}/gradebook/columns/${x.id}/attempts?userId=${me.id}&fields=id,status`).then((j) => {
          const at = j.results || [];
          if (at.length && !at.some((a) => SUBMITTED.test(a.status || ''))) x.st = 'InProgress';
        }, (e) => { if (e && e.auth) throw e; })));
        store.set('g:' + pk, { ts: Date.now(), v });
        return v;
      });
    }

    /* ---------------- rows ---------------- */
    const isNew = (it) => it.m && Date.now() - it.m < 7 * 864e5;
    function frowHtml(f) {
      const [lbl, col] = ftype(f.n, f.mi);
      return `<a class="frow" href="${esc(f.u)}"><span class="fi" style="--c:${col}">${lbl}</span><span class="main"><span class="t">${esc(f.n)}</span><span class="s">${esc([lbl === 'FILE' ? 'Bestand' : lbl, fsize(f.s)].filter(Boolean).join(' · '))}</span></span>${EXT}</a>`;
    }
    // "Langenaeker_2024_attribution.pdf" -> "Langenaeker 2024 attribution" (the type is in the icon)
    const niceName = (n) => String(n || '').replace(/\.[a-z0-9]{2,5}$/i, '').replace(/[_]+/g, ' ').replace(/\s{2,}/g, ' ').trim() || n;
    function fileRow(f, o = {}) {
      const [lbl, col] = ftype(f.n, f.mi);
      const sub = o.sub != null ? o.sub : [lbl === 'FILE' ? 'Bestand' : lbl, fsize(f.s)].filter(Boolean).join(' · ');
      return row({ href: f.u || undefined, act: f.u ? '' : 'att', attrs: f.u ? '' : ` data-id="${esc(o.id || '')}"`, iconHtml: `<span class="fi" style="--c:${col}">${lbl}</span>`,
        title: o.title && o.title !== f.n ? o.title : niceName(f.n), sub, external: true, cls: (o.cls || '') + (o.clamp ? ' note' : ''), dot: o.dot });
    }
    // a folder that is really a Document page: its children hold the page's text
    function isDocPage(pk, it) {
      const c = cachedKids(pk, it.id);
      if (c) return c.v.some((k) => k.ub);
      return !!it.ud;
    }
    function folderInfo(pk, it) {
      const c = cachedKids(pk, it.id);
      if (!c) return { sub: it.d || 'Map', fresh: 0 };
      const n = c.v.length;
      const fresh = c.v.filter((k) => k.k !== 'folder' && isNew(k)).length;
      return { sub: n ? `${n} item${n === 1 ? '' : 's'}${fresh ? ` · ${fresh} nieuw` : ''}` : 'Leeg', fresh };
    }
    function itemRow(it, pk, o = {}) {
      const path = o.path;
      const cvs = colorVars(meta(pk).color);
      const lead = (icon) => `<span class="ic soft" style="${cvs}">${ico(icon)}</span>`;
      const solid = (icon, c) => `<span class="ic" style="--c:${c}">${ico(icon)}</span>`;
      const dot = isNew(it);
      switch (it.k) {
        case 'folder': {
          const fi = folderInfo(pk, it);
          if (isDocPage(pk, it)) {
            // a Document page that only holds a file or a few files (no text of its own): open them straight from the list
            const kids = (cachedKids(pk, it.id) || { v: [] }).v;
            const files = kids.flatMap((k) => k.files || []);
            if (kids.length && kids.every((k) => k.ub && !k.x) && files.length && files.length <= 8) {
              const sn = kids.map((k) => k.sn || '').filter(Boolean).join(' ');
              return itemRow({ id: it.id, p: it.p, t: it.t, m: it.m, k: 'doc', x: false, files, sn }, pk, o);
            }
            return row({ href: `#/c/${pk}/f/${it.id}`, attrs: ` data-nav="1" data-title="${esc(it.t)}"`, iconHtml: lead('doc'), title: it.t, sub: path != null ? path : it.d || 'Document', dot: fi.fresh > 0 });
          }
          return row({ href: `#/c/${pk}/f/${it.id}`, attrs: ` data-nav="1" data-title="${esc(it.t)}"`, iconHtml: lead('folder'), title: it.t, sub: path != null ? path : fi.sub, dot: fi.fresh > 0 });
        }
        case 'file':
          return fileRow(it.f, { title: it.t, name: it.f.n, id: it.id, dot, sub: path != null ? path : undefined });
        case 'doc': {
          if (it.ub) {
            // the text of a Document page (e.g. in "Nieuw" or a search): open the page it belongs to
            const par = U.items[it.p];
            const t = par && !par.ub ? par.t : 'Document';
            return row({ href: it.p ? `#/c/${pk}/f/${it.p}` : `#/c/${pk}`, attrs: ` data-nav="1" data-title="${esc(t)}"`, iconHtml: lead('doc'), title: t, sub: path != null ? path : textOf(it.html).slice(0, 120) || 'Document', dot });
          }
          const files = it.files || [];
          if (!it.x && files.length === 1) return fileRow(files[0], { title: it.t, name: files[0].n, dot, sub: path != null ? path : it.sn || undefined, clamp: !!it.sn });
          if (!it.x && files.length > 1 && files.length <= 8) {
            return `<div class="grp-h">${lead('doc')}<span class="main"><span class="t">${esc(it.t)}</span><span class="s clamp2">${esc(path != null ? path : it.sn || files.length + ' bestanden')}</span></span></div>${files.map((f) => fileRow(f, { cls: 'sub', dot })).join('')}`;
          }
          return row({ href: `#/c/${pk}/d/${it.id}`, attrs: ` data-nav="1" data-title="${esc(it.t)}"`, iconHtml: lead('doc'), title: it.t,
            sub: path != null ? path : (it.d || ('Document' + (files.length ? ` · ${files.length} bestand${files.length > 1 ? 'en' : ''}` : ''))), dot });
        }
        case 'lti': return row({ href: ltiUrl(pk, it.id), iconHtml: solid('play', '#8e5bd8'), title: it.t, sub: path != null ? path : 'Weblecture · speelt meteen af', external: true, dot });
        case 'link': return row({ href: it.u || deepLink(pk, it), iconHtml: solid('link', '#0a84ff'), title: it.t, sub: path != null ? path : hostOf(it.u) || 'Link', external: true, dot });
        case 'task': return row({ href: deepLink(pk, it), iconHtml: solid('pencil', '#ff9500'), title: it.t, sub: path != null ? path : 'Opdracht · indienen in Blackboard', external: true, dot });
        case 'talk': return row({ href: deepLink(pk, it), iconHtml: solid('bubble', '#30b955'), title: it.t, sub: path != null ? path : 'Discussie · in Blackboard', external: true, dot });
        default: return row({ href: deepLink(pk, it), iconHtml: solid('globe', '#8e8e93'), title: it.t, sub: path != null ? path : 'Opent in Blackboard', external: true, dot });
      }
    }
    const errorBox = () => `<div class="banner">${ico('warn')}<span class="main">Dit kon niet geladen worden. Controleer je verbinding.</span><button type="button" data-act="retry">Opnieuw</button></div>`;
    const section = () => { const el = document.createElement('section'); el.className = 'view'; return el; };

    /* ---------------- course ---------------- */
    const SEGS = [{ id: 'inhoud', label: 'Inhoud' }, { id: 'aankondigingen', label: 'Aankondigingen' }, { id: 'cijfers', label: 'Cijfers' }];
    const STATUS = { NeedsGrading: 'Ingeleverd · wacht op beoordeling', InProgress: 'Concept, nog niet ingeleverd', Graded: 'Beoordeeld' };
    function courseView(r) {
      const pk = r.pk;
      const el = section();
      const st = { tab: r.tab, ann: r.ann || '', q: '', root: null, anns: null, grades: null, idx: null, crawled: false, moreNew: false, at: 0, single: null };
      const head = () => {
        const m = meta(pk);
        const name = m.name || 'Vak';
        const next = getCtx(pk).n;
        return `<div class="lt" style="${colorVars(m.color)}">${m.code ? `<span class="lt-kicker">${esc(m.code)}</span>` : ''}<h1 class="${name.length > 26 ? 'long' : ''}">${esc(name)}</h1>${next ? `<p class="lt-sub lt-next">${ico('clock')}${esc(next)}</p>` : ''}</div>`;
      };
      el.innerHTML = `<div data-k="head">${head()}</div>${segHtml(SEGS, st.tab, 'seg')}
        <div data-p="inhoud"${st.tab !== 'inhoud' ? ' hidden' : ''}><label class="search">${ico('search')}<input type="search" placeholder="Zoek in dit vak" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-label="Zoek in dit vak"><button type="button" class="clr" data-act="clr" hidden aria-label="Wis">✕</button></label><div data-k="res"></div><div data-k="top"></div><div data-k="root">${skGroup(6)}</div></div>
        <div data-p="aankondigingen"${st.tab !== 'aankondigingen' ? ' hidden' : ''}>${skGroup(3)}</div>
        <div data-p="cijfers"${st.tab !== 'cijfers' ? ' hidden' : ''}>${skGroup(4)}</div>`;
      const P = (id) => $(`[data-p="${id}"]`, el);
      const pathLabel = (x) => [x.path.join(' › ') || 'Hoofdmap', x.it.m ? shortWhen(x.it.m) : ''].filter(Boolean).join(' · ');

      function buildIndex() {
        const out = [];
        const walk = (items, path, depth) => items.forEach((it) => {
          out.push({ it, path });
          if (it.k === 'folder' && depth < 7) { const c = cachedKids(pk, it.id); if (c) walk(c.v, path.concat(it.t), depth + 1); }
        });
        walk(st.root || [], [], 0);
        return out;
      }
      function drawRoot() {
        const box = $('[data-k="root"]', el);
        if (!st.root) return;
        if (!st.root.length) { put(box, empty('folder', 'Nog geen inhoud', 'Je docent heeft nog niets gepubliceerd.')); return; }
        // a course that is one big folder: show what's inside right away
        const only = st.root.length === 1 && st.root[0].k === 'folder' ? st.root[0] : null;
        const inner = only && cachedKids(pk, only.id);
        if (only && inner) { put(box, `<div class="gh">${esc(only.t)}</div><div class="group">${inner.v.map((it) => itemRow(it, pk)).join('')}</div>`); return; }
        if (only && !st.single) { st.single = fetchChildren(pk, only.id).then(drawRoot, () => {}); }
        put(box, `<div class="group">${st.root.map((it) => itemRow(it, pk)).join('')}</div>`);
      }
      function drawTop() {
        const box = $('[data-k="top"]', el);
        const now = Date.now();
        let h = '';
        const a = st.anns && st.anns[0];
        if (a && now - a.date < 14 * 864e5) {
          h += `<button type="button" class="teaser" data-act="openann" data-id="${esc(a.id)}" style="${colorVars(meta(pk).color)}"><span class="ic">${ico('megaphone')}</span><span class="main"><span class="t">${esc(a.t)}</span><span class="s clamp2">${esc(relDay(a.date, now))} · ${esc(textOf(a.html).slice(0, 200))}</span></span>${CHEV}</button>`;
        }
        const fresh = (st.idx || []).filter((x) => x.it.k !== 'folder' && isNew(x.it)).sort((p, q) => q.it.m - p.it.m);
        if (fresh.length) {
          const lim = st.moreNew ? 20 : 4;
          h += `<div class="sh"><h2>Nieuw</h2></div><div class="group">${fresh.slice(0, lim).map((x) => itemRow(x.it, pk, { path: pathLabel(x), flat: true })).join('')}${fresh.length > lim ? `<button type="button" class="more-row" data-act="morenew">Toon nog ${fresh.length - lim}</button>` : ''}</div><div class="sh"><h2>Alle inhoud</h2></div>`;
        } else if (h) h += '<div style="height:16px"></div>';
        put(box, h);
      }
      function drawSearch() {
        const res = $('[data-k="res"]', el);
        const q = fold(st.q.trim());
        $('[data-k="top"]', el).hidden = $('[data-k="root"]', el).hidden = !!q;
        if (!q) { put(res, ''); return; }
        const idx = st.idx || (st.root || []).map((it) => ({ it, path: [] }));
        const hits = [];
        idx.forEach((x) => {
          if (fold(x.it.t).includes(q) || (x.it.d && fold(x.it.d).includes(q))) hits.push({ x });
          else if (x.it.files) x.it.files.forEach((f) => { if (fold(f.n).includes(q)) hits.push({ x, f }); });
          else if (x.it.f && fold(x.it.f.n).includes(q)) hits.push({ x });
        });
        if (!hits.length) { put(res, empty('search', 'Niets gevonden', st.crawled ? `Niets in dit vak past bij "${st.q.trim()}".` : 'Nog niet alle mappen zijn doorzocht. Probeer zo opnieuw.')); return; }
        put(res, `<div class="gh">${hits.length} resulta${hits.length === 1 ? 'at' : 'ten'}</div><div class="group">${hits.slice(0, 80).map(({ x, f }) => (f ? fileRow(f, { sub: `${pathLabel(x)} › ${x.it.t}` }) : itemRow(x.it, pk, { path: pathLabel(x), flat: true }))).join('')}</div>`);
      }
      async function crawl() {
        const queue = [];
        const seen = new Set();
        (st.root || []).forEach((it) => { if (it.k === 'folder') queue.push([it, 1]); });
        let n = 0, dirty = 0;
        const work = async () => {
          while (queue.length && n < 90) {
            const [f, depth] = queue.shift();
            if (seen.has(f.id)) continue;
            seen.add(f.id);
            n++;
            const c = cachedKids(pk, f.id);
            let kids = c && Date.now() - c.ts < 15 * 60e3 ? c.v : null;
            if (!kids) { try { kids = await fetchChildren(pk, f.id); dirty++; } catch (e) { if (e.auth) return; kids = c ? c.v : []; } }
            kids.forEach((k) => { if (k.k === 'folder' && depth < 6) queue.push([k, depth + 1]); });
          }
        };
        // two at a time: in the background, so what you tap yourself (a folder, a file) still goes first
        await Promise.all([work(), work()]);
        st.idx = buildIndex();
        st.crawled = true;
        drawTop();
        drawRoot();
        if (st.q) drawSearch();
      }
      function drawAnn() {
        const box = P('aankondigingen');
        if (!st.anns) return;
        if (!st.anns.length) { put(box, empty('megaphone', 'Geen aankondigingen', 'Aankondigingen van je docent verschijnen hier.')); return; }
        const fresh = (a, i) => i === 0 && !st.ann && Date.now() - a.date < 14 * 864e5;
        put(box, st.anns.map((a, i) => `<article class="ann${a.id === st.ann ? ' open hl' : fresh(a, i) ? ' open' : ''}" data-id="${esc(a.id)}"><div class="ann-top">${esc(relDay(a.date))} · ${hhmm(a.date)}</div><h3>${esc(a.t)}</h3><div class="body rt">${a.html}</div><button type="button" class="more" data-act="annmore">${a.id === st.ann || fresh(a, i) ? 'Minder' : 'Meer'}</button></article>`).join(''));
        measureAnn();
      }
      function measureAnn() {
        if (st.tab !== 'aankondigingen') return;
        requestAnimationFrame(() => {
          $$('.ann', P('aankondigingen')).forEach((n) => { const b = $('.body', n); n.classList.toggle('clamped', !n.classList.contains('open') && b.scrollHeight > b.clientHeight + 6); });
          if (st.ann) { const n = $(`.ann[data-id="${st.ann}"]`, el); if (n) { const y = n.getBoundingClientRect().top + W.scrollY - 60; W.scrollTo(0, Math.max(0, y)); } st.ann = ''; }
        });
      }
      function drawGrades() {
        const box = P('cijfers');
        if (!st.grades) return;
        if (!st.grades.length) { put(box, empty('chart', 'Geen cijfers', 'Er zijn nog geen beoordelingen voor dit vak.')); return; }
        const rowG = (g) => row({ href: g.cid ? deepLink(pk, { id: g.cid }) : undefined, title: g.t,
          sub: g.g ? '' : STATUS[g.st] || (g.due ? `Deadline ${dShort(g.due)} ${hhmm(g.due)}` : 'Nog geen cijfer'),
          end: g.g ? `<b style="color:var(--text);font-size:17px;font-weight:600">${esc(g.g)}</b>` : '<span>—</span>', chevron: false, cls: '' });
        const done = st.grades.filter((g) => g.g), open = st.grades.filter((g) => !g.g);
        let h = '';
        if (done.length) h += `<div class="gh">Beoordeeld</div><div class="group plain">${done.map(rowG).join('')}</div>`;
        if (open.length) h += `<div class="gh">Nog geen cijfer</div><div class="group plain">${open.map(rowG).join('')}</div>`;
        put(box, h + `<p class="fresh"><a href="${ULTRA}/ultra/courses/${pk}/grades">Bekijk details in Blackboard</a></p>`);
      }

      const fail = (where) => (e) => { if (e && e.auth) return relogin(); if (where === 'root' && !st.root) put($('[data-k="root"]', el), errorBox()); };
      function loadRoot() {
        const c = cachedKids(pk, 'ROOT');
        if (c && !st.root) { st.root = c.v; st.idx = buildIndex(); drawRoot(); drawTop(); }
        return fetchChildren(pk, 'ROOT').then((v) => { st.root = v; st.idx = buildIndex(); drawRoot(); drawTop(); if (!st.crawling) { st.crawling = true; setTimeout(() => crawl().finally(() => { st.crawling = false; }), 1200); } }, fail('root'));
      }
      function loadAnn() {
        const c = store.get('a:' + pk);
        if (c && !st.anns) { st.anns = c.v; drawAnn(); drawTop(); }
        return fetchAnn(pk).then((v) => { st.anns = v; drawAnn(); drawTop(); }, fail('ann'));
      }
      function loadGrades() {
        const c = store.get('g:' + pk);
        if (c && !st.grades) { st.grades = c.v; drawGrades(); }
        if (st.gAt && Date.now() - st.gAt < 120e3) return;
        st.gAt = Date.now();
        fetchGrades(pk).then((v) => { st.grades = v; drawGrades(); }, (e) => { if (e && e.auth) return relogin(); if (!st.grades) put(P('cijfers'), errorBox()); });
      }
      function loadMeta() {
        uget(`/learn/api/public/v3/courses/${pk}?fields=id,name,courseId`).then((c) => {
          saveMeta(pk, { name: c.name, lu: c.courseId });
          put($('[data-k="head"]', el), head());
          if (U.cur === view) { setNav(navFor(view)); watchTitle(el); }
        }).catch(() => {});
      }
      function setTab(t, fromRoute) {
        st.tab = t;
        segSet(el, t);
        $$('[data-p]', el).forEach((p) => { p.hidden = p.dataset.p !== t; });
        if (!fromRoute) history.replaceState(Object.assign({}, history.state), '', `#/c/${pk}${t === 'inhoud' ? '' : '/' + t}`);
        const seg = $('.seg', el);
        const top = seg.getBoundingClientRect().top + W.scrollY - ($('#tm-nav').offsetHeight + 8);
        if (W.scrollY > top) W.scrollTo(0, top);
        if (t === 'aankondigingen') { if (st.anns) drawAnn(); loadAnn(); }
        if (t === 'cijfers') loadGrades();
      }

      const inp = $('input', el), clr = $('.clr', el);
      inp.addEventListener('input', () => { st.q = inp.value; clr.hidden = !inp.value; drawSearch(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') inp.blur(); });

      const view = {
        el,
        title: () => meta(pk).name || 'Vak',
        right: () => `<button type="button" class="nb" data-act="menu" aria-label="Meer opties">${ico('more')}</button>`,
        route(r2) { if (r2.ann) st.ann = r2.ann; if (r2.tab && r2.tab !== st.tab) setTab(r2.tab, true); else if (r2.ann) drawAnn(); },
        show() {
          if (Date.now() - st.at < 90e3) return;
          st.at = Date.now();
          loadRoot();
          loadAnn();
          if (st.tab === 'cijfers') loadGrades(); else setTimeout(() => { if (!st.grades) loadGrades(); }, 2500);
        },
        refresh() {
          st.at = Date.now(); st.gAt = 0;
          ['ROOT'].concat((st.root || []).filter((it) => it.k === 'folder').map((it) => it.id)).forEach((id) => kidsMem.delete(`c:${pk}:${id}`));
          return Promise.allSettled([loadRoot(), loadAnn(), st.tab === 'cijfers' ? fetchGrades(pk).then((v) => { st.grades = v; drawGrades(); }) : null]);
        },
        act(n, b) {
          if (n === 'seg') { setTab(b.dataset.id); return true; }
          if (n === 'clr') { inp.value = ''; st.q = ''; clr.hidden = true; drawSearch(); inp.focus(); return true; }
          if (n === 'morenew') { st.moreNew = true; drawTop(); return true; }
          if (n === 'openann') { st.ann = b.dataset.id; setTab('aankondigingen'); return true; }
          if (n === 'annmore') { toggleAnn(b.closest('.ann')); return true; }
          return false;
        },
      };
      loadMeta();
      return view;
    }
    function toggleAnn(n) {
      if (!n) return;
      if (!n.classList.contains('clamped') && !n.classList.contains('open')) return;
      const open = !n.classList.contains('open');
      n.classList.toggle('open', open);
      n.classList.toggle('clamped', !open);
      n.classList.remove('hl');
      const b = $('.more', n);
      if (b) b.textContent = open ? 'Minder' : 'Meer';
    }

    /* ---------------- folder ---------------- */
    function folderView(r) {
      const pk = r.pk, id = r.id, el = section();
      const known = U.items[id];
      const st = { items: null, title: U.titles[id] || (known && known.t) || '', desc: (known && known.d) || '', at: Date.now() };
      el.innerHTML = `<div class="lt"><h1 data-k="title"></h1><p class="lt-sub" data-k="sub"></p></div><div data-k="list">${skGroup(5)}</div>`;
      const draw = () => {
        const t = $('[data-k="title"]', el);
        t.textContent = st.title || (known && known.ud ? 'Document' : 'Map');
        t.className = (st.title || '').length > 26 ? 'long' : '';
        if (!st.items) return;
        const n = st.items.length;
        if (st.items.some((it) => it.ub)) {
          // a Document page: show its text right here, with any files or links in between where they belong
          put($('[data-k="sub"]', el), esc(st.desc));
          let h = '', grp = '';
          const flush = () => { if (grp) { h += `<div class="group">${grp}</div>`; grp = ''; } };
          st.items.forEach((it) => {
            if (!it.ub) { grp += itemRow(it, pk); return; }
            if (it.html == null) {
              // not in the list's answer: fetch this part of the page on its own
              if (!it.__f) { it.__f = 1; fetchItem(pk, it.id).then((x) => { it.html = x.html || ''; draw(); }, () => { it.html = ''; draw(); }); }
              flush();
              h += '<div class="doc"><div class="sk" style="height:14px;width:92%"></div><div class="sk" style="height:14px;width:76%;margin-top:11px"></div><div class="sk" style="height:14px;width:84%;margin-top:11px"></div></div>';
              return;
            }
            if (!it.html.trim()) return;
            flush();
            h += `<div class="doc rt">${it.html}</div>`;
          });
          flush();
          put($('[data-k="list"]', el), `<div class="udoc">${h || empty('doc', 'Dit document is leeg', '')}</div>`);
          return;
        }
        put($('[data-k="sub"]', el), esc([st.desc, n ? `${n} item${n === 1 ? '' : 's'}` : ''].filter(Boolean).join(' · ')));
        put($('[data-k="list"]', el), n ? `<div class="group">${st.items.map((it) => itemRow(it, pk)).join('')}</div>` : empty('folder', 'Deze map is leeg', ''));
      };
      const load = () => {
        const c = cachedKids(pk, id);
        if (c && !st.items) { st.items = c.v; draw(); }
        fetchChildren(pk, id).then((v) => {
          st.items = v;
          draw();
          // Document pages in this folder: look inside, so one that only holds a file opens it in one tap
          const todo = v.filter((it) => it.k === 'folder' && it.ud && !cachedKids(pk, it.id)).slice(0, 12);
          if (todo.length) Promise.allSettled(todo.map((it) => fetchChildren(pk, it.id))).then(draw);
        }, (e) => { if (e.auth) return relogin(); if (!st.items) put($('[data-k="list"]', el), errorBox()); });
      };
      const view = {
        el,
        title: () => st.title || 'Map',
        show() { if (Date.now() - st.at > 120e3) { st.at = Date.now(); load(); } },
        refresh() { st.at = Date.now(); return fetchChildren(pk, id).then((v) => { st.items = v; draw(); }, () => {}); },
      };
      if (!st.title) fetchItem(pk, id).then((it) => { st.title = it.t; st.desc = it.d || ''; draw(); if (U.cur === view) setNav(navFor(view)); }).catch(() => {});
      draw();
      load();
      return view;
    }

    /* ---------------- document ---------------- */
    function docView(r) {
      const pk = r.pk, id = r.id, el = section();
      const known = U.items[id];
      const st = { it: null, title: U.titles[id] || (known && known.t) || '' };
      el.innerHTML = `<div class="lt"><h1 data-k="title" class="${st.title.length > 26 ? 'long' : ''}">${esc(st.title || ' ')}</h1></div><div data-k="body"><div class="doc"><div class="sk" style="height:14px;width:92%"></div><div class="sk" style="height:14px;width:76%;margin-top:11px"></div><div class="sk" style="height:14px;width:84%;margin-top:11px"></div><div class="sk" style="height:44px;margin-top:18px;border-radius:12px"></div></div></div>`;
      const draw = () => {
        if (!st.it) return;
        st.title = st.it.t;
        const t = $('[data-k="title"]', el);
        t.textContent = st.title;
        t.className = st.title.length > 26 ? 'long' : '';
        const html = st.it.html || '';
        put($('[data-k="body"]', el), html.trim() ? `<div class="doc rt">${html}</div>` : empty('doc', 'Dit document is leeg', ''));
      };
      const view = { el, title: () => st.title || 'Document' };
      const c = store.get(`i:${pk}:${id}`);
      if (c) { st.it = c.v; draw(); }
      fetchItem(pk, id).then((it) => { st.it = it; draw(); if (U.cur === view) setNav(navFor(view)); }, (e) => { if (e.auth) relogin(); else if (!st.it) put($('[data-k="body"]', el), errorBox()); });
      return view;
    }


    /* ---------------- all grades of this semester's courses (Meer > Cijfers) ---------------- */
    // The portal names the courses (?cs=pk~color~title!...): Blackboard's own grades page lists every course you ever had.
    function gradesView(r) {
      const el = section();
      let list = courseList(r.q.get('cs'), 'tm4-gcs');
      const st = { g: {}, err: {}, open: {} };
      el.innerHTML = '<div class="lt"><h1>Cijfers</h1><p class="lt-sub">Je vakken van dit semester</p></div><div data-k="body"></div>';
      const num = (g) => { const m = /^(-?\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)$/.exec(g || ''); return m ? parseFloat(m[1].replace(',', '.')) / parseFloat(m[2].replace(',', '.')) : null; };
      function draw() {
        if (!list.length) { put($('[data-k="body"]', el), empty('chart', 'Geen vakken', 'Open Cijfers via Meer in de app.')); return; }
        let h = '';
        list.forEach((c) => {
          const name = c.t || (c.pk && meta(c.pk).name) || 'Vak';
          if (!c.pk) { h += `<div class="gh gc" style="${colorVars(c.k)}"><i></i>${esc(name)}</div>` + skGroup(1); return; }
          const g = st.g[c.pk];
          const head = `<a class="gh gc" data-nav="1" href="#/c/${c.pk}/cijfers?t=${encodeURIComponent(name)}&k=${encodeURIComponent(c.k || '')}&f=meer" style="${colorVars(c.k)}"><i></i>${esc(name)}${CHEV}</a>`;
          if (!g) { h += head + (st.err[c.pk] ? `<div class="group plain">${row({ title: 'Kon niet geladen worden', sub: 'Trek omlaag om opnieuw te proberen', chevron: false })}</div>` : skGroup(1)); return; }
          const done = g.filter((x) => x.g);
          const wait = g.filter((x) => !x.g && x.st === 'NeedsGrading');
          const open = g.filter((x) => !x.g && x.st !== 'NeedsGrading' && x.due && x.due > Date.now());
          if (!done.length && !open.length && !wait.length) { h += head + `<div class="group plain">${row({ title: 'Nog geen cijfers', cls: 'muted', chevron: false })}</div>`; return; }
          const rowG = (x) => {
            const p = num(x.g);
            const tone = p == null ? '' : p >= 0.5 ? 'var(--green)' : 'var(--red)';
            return row({ href: x.cid ? deepLink(c.pk, { id: x.cid }) : undefined, title: x.t,
              sub: x.g ? '' : STATUS[x.st] || (x.due ? `Deadline ${dShort(x.due)} ${hhmm(x.due)}` : 'Nog geen cijfer'),
              end: x.g ? `<b style="color:${tone || 'var(--text)'};font-size:17px;font-weight:600">${esc(x.g)}</b>` : '<span>—</span>', chevron: false });
          };
          const showWait = st.open[c.pk] || (!done.length && wait.length <= 2);
          const waitRow = wait.length && !showWait ? row({ act: 'gwait', attrs: ` data-pk="${c.pk}"`, icon: 'clock', soft: true, title: `${wait.length} ingeleverd`, sub: 'Wacht op een cijfer', end: '<span class="cap">Toon</span>', chevron: false }) : '';
          h += head + `<div class="group plain">${done.map(rowG).join('')}${showWait ? wait.map(rowG).join('') : waitRow}${open.map(rowG).join('')}</div>`;
        });
        put($('[data-k="body"]', el), h + `<p class="fresh"><a href="${ULTRA}/ultra/grades">Alle vakken in Blackboard</a></p>`);
      }
      // courses the portal only knew by name (ULTRA-...): ask Blackboard for their id once
      const resolve = resolveCourse;
      async function load() {
        list.forEach((c) => { if (!c.pk && c.lu) { const k = store.get('lu:' + c.lu); if (k && k.v) c.pk = k.v; } });
        list.forEach((c) => { const x = c.pk && store.get('g:' + c.pk); if (x && !st.g[c.pk]) st.g[c.pk] = x.v; });
        draw();
        try {
          await Promise.all(list.map(resolve));
          const seen = new Set();
          list = list.filter((c) => c.pk && !seen.has(c.pk) && seen.add(c.pk));
          ss.set('tm4-gcs', JSON.stringify(list));
          draw();
          for (let i = 0; i < list.length; i += 3) {
            await Promise.all(list.slice(i, i + 3).map((d) => fetchGrades(d.pk).then((v) => { st.g[d.pk] = v; delete st.err[d.pk]; }, (e) => { if (e && e.auth) throw e; st.err[d.pk] = 1; })));
            draw();
          }
        } catch (e) { if (e && e.auth) relogin(); }
      }
      let at = 0;
      const view = { el, title: () => 'Cijfers', act(n, b) { if (n !== 'gwait') return false; st.open[b.dataset.pk] = 1; draw(); return true; }, show() { if (Date.now() - at > 120e3) { at = Date.now(); load(); } }, refresh: () => { at = Date.now(); return load(); } };
      return view;
    }

    /* ---------------- Vakken > zoeken in al je vakken ---------------- */
    // Toledo only searches inside one course. The portal hands over your courses (?cs=, like Cijfers); we walk their
    // folders here (the same cached lists a course page uses) and search titles, descriptions and file names at once.
    function courseList(raw, key) {
      let list = [];
      if (raw) {
        list = raw.split('!').map((x) => { const [id, k, ...t] = x.split('~'); return /^_\d+_\d+$/.test(id) ? { pk: id, k, t: t.join('~') } : /^ULTRA-[\w.-]+$/.test(id) ? { lu: id, k, t: t.join('~') } : null; }).filter(Boolean).slice(0, 24);
        ss.set(key, JSON.stringify(list));
      } else { try { list = JSON.parse(ss.get(key) || '[]') || []; } catch (_) {} }
      return list;
    }
    function resolveCourse(c) {
      if (c.pk) return Promise.resolve();
      const known = store.get('lu:' + c.lu);
      if (known && known.v) { c.pk = known.v; return Promise.resolve(); }
      return uget(`/learn/api/public/v3/courses/courseId:${encodeURIComponent(c.lu)}?fields=id,name`).then((x) => { store.set('lu:' + c.lu, { ts: Date.now(), v: x.id }); saveMeta(x.id, { name: x.name, lu: c.lu }); c.pk = x.id; }, (e) => { if (e && e.auth) throw e; c.gone = 1; });
    }
    function searchView(r) {
      const el = section();
      let list = courseList(r.q.get('cs'), 'tm4-zcs');
      const st = { q: r.q.get('q') || ss.get('tm4-zq') || '', done: {}, err: {}, more: {}, running: false, at: 0, t: 0 };
      el.innerHTML = `<div class="lt"><h1>Zoeken</h1><p class="lt-sub">In de inhoud van al je vakken</p></div><label class="search">${ico('search')}<input type="search" placeholder="Zoek in al je vakken" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-label="Zoek in al je vakken"><button type="button" class="clr" data-act="clr" hidden aria-label="Wis">✕</button></label><div data-k="state"></div><div data-k="res"></div>`;
      const inp = $('input', el), clr = $('.clr', el);
      inp.value = st.q; clr.hidden = !st.q;
      list.forEach((c) => { if (c.pk && c.k) saveMeta(c.pk, { color: c.k }); });
      // every item of one course from the cached folder lists, with the folders it sits in
      function indexOf(pk) {
        const out = [];
        const walk = (items, path, depth) => items.forEach((it) => {
          if (it.ub) return;
          out.push({ it, path });
          if (it.k === 'folder' && depth < 7) { const c = cachedKids(pk, it.id); if (c) walk(c.v, path.concat(it.t), depth + 1); }
        });
        const root = cachedKids(pk, 'ROOT');
        if (root) walk(root.v, [], 0);
        return out;
      }
      const pathLabel = (x) => [x.path.join(' › ') || 'Hoofdmap', x.it.m ? shortWhen(x.it.m) : ''].filter(Boolean).join(' · ');
      function draw() {
        const res = $('[data-k="res"]', el), state = $('[data-k="state"]', el);
        const words = fold(st.q.trim()).split(/\s+/).filter(Boolean);
        const ready = list.filter((c) => c.pk && st.done[c.pk]).length;
        const total = list.filter((c) => !c.gone).length;
        put(state, st.running && ready < total ? `<p class="fresh"><span class="spin" style="width:12px;height:12px;border-width:2px;vertical-align:-1px;margin-right:6px"></span>${ready} van ${total} vakken doorzocht…</p>` : '');
        if (!list.length) { put(res, empty('book', 'Geen vakken', 'Open Zoeken via Vakken in de app.')); return; }
        if (!words.length) { put(res, empty('search', 'Zoek in al je vakken', 'Typ een woord uit de naam van een bestand, map of opdracht. Je zoekt in alle vakken van dit semester tegelijk.')); return; }
        // every word must be somewhere (also in the folders above), at least one in the item itself
        const has = (own, path) => { const o = fold(own), pa = fold(path || ''); return words.some((w) => o.includes(w)) && words.every((w) => o.includes(w) || pa.includes(w)); };
        let h = '', n = 0;
        list.forEach((c) => {
          if (!c.pk) return;
          const hits = [];
          indexOf(c.pk).forEach((x) => {
            const path = x.path.join(' ');
            if (has(x.it.t + ' ' + (x.it.d || '') + ' ' + (x.it.f ? x.it.f.n : ''), path)) hits.push({ x });
            else if (x.it.files) x.it.files.forEach((f) => { if (has(f.n, path + ' ' + x.it.t)) hits.push({ x, f }); });
          });
          if (!hits.length) return;
          n += hits.length;
          const name = c.t || meta(c.pk).name || 'Vak';
          const lim = st.more[c.pk] ? 60 : 5;
          h += `<a class="gh gc" data-nav="1" href="#/c/${c.pk}?t=${encodeURIComponent(name)}&k=${encodeURIComponent(c.k || '')}&f=vakken" style="${colorVars(c.k)}"><i></i>${esc(name)}${CHEV}</a>`;
          h += `<div class="group">${hits.slice(0, lim).map(({ x, f }) => (f ? fileRow(f, { sub: `${pathLabel(x)} › ${x.it.t}` }) : itemRow(x.it, c.pk, { path: pathLabel(x), flat: true }))).join('')}${hits.length > lim ? `<button type="button" class="more-row" data-act="zmore" data-pk="${c.pk}">Toon alle ${hits.length}</button>` : ''}</div>`;
        });
        if (!h) h = empty('search', 'Niets gevonden', st.running ? 'Nog niet alle vakken zijn doorzocht. Even geduld…' : `Niets in je vakken past bij "${st.q.trim()}".`);
        else h = `<div class="gh">${n} resulta${n === 1 ? 'at' : 'ten'}</div>` + h;
        put(res, h);
      }
      const later = () => { if (!st.t) st.t = setTimeout(() => { st.t = 0; draw(); }, 350); };
      // walk one course's folders: what was read in the last half hour comes from the phone, the rest from Blackboard
      async function crawlCourse(pk, force) {
        const queue = [['ROOT', 0]];
        const seen = new Set();
        let n = 0;
        while (queue.length && n < 120) {
          const [id, depth] = queue.shift();
          if (seen.has(id)) continue;
          seen.add(id);
          n++;
          const c = cachedKids(pk, id);
          let kids = !force && c && Date.now() - c.ts < 30 * 60e3 ? c.v : null;
          if (!kids) { try { kids = await fetchChildren(pk, id); later(); } catch (e) { if (e.auth) throw e; kids = c ? c.v : []; } }
          kids.forEach((k) => { if (k.k === 'folder' && depth < 6) queue.push([k.id, depth + 1]); });
        }
        st.done[pk] = 1;
        later();
      }
      async function load(force) {
        if (st.running) return;
        st.running = true;
        list.forEach((c) => { if (!c.pk && c.lu) { const k = store.get('lu:' + c.lu); if (k && k.v) c.pk = k.v; } });
        if (force) st.done = {};
        draw();
        try {
          await Promise.all(list.map(resolveCourse));
          const seen = new Set();
          list = list.filter((c) => c.pk && !seen.has(c.pk) && seen.add(c.pk));
          ss.set('tm4-zcs', JSON.stringify(list));
          // three courses at a time
          const q = list.slice();
          const work = async () => { while (q.length) { const c = q.shift(); try { await crawlCourse(c.pk, force); } catch (e) { if (e && e.auth) throw e; st.done[c.pk] = 1; } } };
          await Promise.all([work(), work(), work()]);
        } catch (e) { if (e && e.auth) { st.running = false; relogin(); return; } }
        st.running = false;
        draw();
      }
      inp.addEventListener('input', () => { st.q = inp.value; clr.hidden = !inp.value; ss.set('tm4-zq', st.q); draw(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') inp.blur(); });
      const view = {
        el,
        title: () => 'Zoeken',
        route(r2) { const q = r2.q.get('q'); if (q != null && q !== st.q) { st.q = inp.value = q; clr.hidden = !q; ss.set('tm4-zq', q); draw(); } },
        show() {
          draw();
          if (!st.q) setTimeout(() => { if (U.cur === view) inp.focus(); }, 350);
          if (Date.now() - st.at < 120e3) return;
          st.at = Date.now();
          load(false);
        },
        refresh() { st.at = Date.now(); return load(true); },
        act(n, b) {
          if (n === 'clr') { inp.value = ''; st.q = ''; clr.hidden = true; ss.set('tm4-zq', ''); draw(); inp.focus(); return true; }
          if (n === 'zmore') { st.more[b.dataset.pk] = 1; draw(); return true; }
          return false;
        },
      };
      return view;
    }

    /* ---------------- Meer > Groepswerken: your groups in this semester's courses ---------------- */
    // Blackboard only shows a group inside its own course, and a student can't open the member list through the
    // public API. Ultra's own API can: /learn/api/v1/courses/<pk>/groups?expand=memberships lists every group with
    // its member ids (only the groups you may see), /learn/api/v1/users/<id> gives a member's name and e-mail.
    // The portal names the courses (?cs=, like Cijfers) and your mail choice (?ma=).
    const userOf = (id) => {
      const c = store.get('usr:' + id);
      if (c && Date.now() - c.ts < 14 * 864e5) return Promise.resolve(c.v);
      return once('usr:' + id, () => uget(`/learn/api/v1/users/${id}`).then((u) => { const v = { n: [u.givenName, u.familyName].filter(Boolean).join(' ') || u.userName || 'Onbekend', e: u.emailAddress || '' }; store.set('usr:' + id, { ts: Date.now(), v }); return v; }));
    };
    // all your groups in one short text (name~course~e-mail,e-mail!...), handed to the portal (Meer > Studieplek) and KURT,
    // so a group room booking can offer every group. Only members' KU Leuven addresses, never yours.
    const grpParam = () => { const v = store.get('grpx'); return v && store.get('grpxSent') !== v ? '&gx=' + encodeURIComponent(v) : ''; };
    const shortCourse = (t) => String(t || '').replace(/\s*\[[^\]]*\]\s*$/, '').trim();
    function groupsView(r) {
      const el = section();
      let list = courseList(r.q.get('cs'), 'tm4-grcs');
      if (r.q.get('ma')) store.set('mailApp', r.q.get('ma') === 'web' ? 'web' : 'app');
      const st = { g: {}, err: {}, u: {}, me: '', at: 0 };
      el.innerHTML = '<div class="lt"><h1>Groepswerken</h1><p class="lt-sub">Je groepen in je vakken van dit semester</p></div><div data-k="body"></div>';
      const when = (iso) => { const t = Date.parse(iso); return t ? `${dShort(t)} ${hhmm(t)}` : ''; };
      const people = (g) => g.m.map((id) => ({ id, me: id === st.me, u: st.u[id] }));
      const mails = (g) => people(g).filter((p) => !p.me && p.u && p.u.e).map((p) => p.u.e);
      function card(c, g) {
        const name = c.t || meta(c.pk).name || 'Vak';
        const ppl = people(g).sort((a, b) => (b.me - a.me) || String(a.u ? a.u.n : '').localeCompare(String(b.u ? b.u.n : ''), 'nl'));
        const rows = ppl.map((p) => {
          if (!p.u) return `<div class="sk-row"><span class="sk ic"></span><span class="lines"><span class="sk" style="display:block;width:60%"></span><span class="sk" style="display:block"></span></span></div>`;
          const av = `<span class="gw-av${p.me ? ' me' : ''}">${esc(initials(p.u.n))}</span>`;
          return p.me || !p.u.e ? row({ iconHtml: av, title: p.me ? `${p.u.n} (jij)` : p.u.n, sub: p.u.e, chevron: false })
            : row({ act: 'gwmail1', attrs: ` data-e="${esc(p.u.e)}" data-s="${esc(shortCourse(name) + ' – ' + g.t)}"`, iconHtml: av, title: p.u.n, sub: p.u.e, end: `<span class="gw-m">${ico('mail')}</span>`, chevron: false });
        }).join('');
        const sub = [g.set, g.self ? 'je schreef je zelf in' : 'ingedeeld door je docent'].filter(Boolean).join(' · ');
        const ready = ppl.every((p) => p.u);
        const kurt = `https://kurt3.ghum.kuleuven.be/?tmg=${encodeURIComponent(g.t)}&tmc=${encodeURIComponent(shortCourse(name))}&tmm=${encodeURIComponent(mails(g).join(','))}${store.get('grpx') ? '&tmgs=' + encodeURIComponent(store.get('grpx')) : ''}`;
        const href = `#/c/${c.pk}?t=${encodeURIComponent(name)}&k=${encodeURIComponent(c.k || '')}&f=meer`;
        return `<div class="card gw" style="${colorVars(c.k)}">
          <div class="gw-h"><span class="gw-ic">${ico('people')}</span><span class="main"><span class="gw-t"><b>${esc(g.t)}</b><i></i><a data-nav="1" href="${href}">${esc(shortCourse(name))}</a></span><span>${esc(sub)}</span></span><span class="gw-n">${g.m.length}</span></div>
          ${g.d ? `<p class="gw-d">${esc(g.d)}</p>` : ''}
          <div class="group plain gw-ppl">${rows}</div>
          <div class="gw-acts">
            <button type="button" class="pri" data-act="gwmail" data-pk="${c.pk}" data-g="${g.id}"${ready && mails(g).length ? '' : ' disabled'}>${ico('mail')}Mail de groep</button>
            <a href="${esc(kurt)}"${ready ? '' : ' aria-disabled="true"'}>${ico('desk')}Groepsruimte boeken</a>
          </div></div>`;
      }
      function draw() {
        const body = $('[data-k="body"]', el);
        if (!list.length) { put(body, empty('people', 'Geen vakken', 'Open Groepswerken via Meer in de app.')); return; }
        let h = '', none = [], waiting = 0, nGroups = 0;
        list.forEach((c) => {
          const x = st.g[c.pk];
          const name = c.t || (c.pk && meta(c.pk).name) || 'Vak';
          if (!x) { if (st.err[c.pk]) none.push(name); else waiting++; return; }
          if (!x.mine.length && !x.open.length) { none.push(name); return; }
          x.mine.forEach((g) => { nGroups++; h += card(c, g); });
          x.open.forEach((o) => {
            h += `<div class="group">${row({ href: `${ULTRA}/ultra/courses/${c.pk}/groups/enrollments`, icon: 'plus', soft: true, title: `Kies een groep: ${o.set}`, sub: [shortCourse(name), o.end ? `inschrijven kan tot ${when(o.end)}` : 'inschrijven is open'].join(' · '), external: true })}</div>`;
          });
        });
        if (waiting) h += `<p class="fresh"><span class="spin" style="width:12px;height:12px;border-width:2px;vertical-align:-1px;margin-right:6px"></span>Nog ${waiting} ${waiting === 1 ? 'vak' : 'vakken'} nakijken…</p>${nGroups ? '' : skGroup(3)}`;
        else if (!nGroups && !h) h = empty('people', 'Geen groepen', 'Je zit in geen enkele groep in je vakken van dit semester. Zodra je docent je indeelt of je je inschrijft, verschijnt je groep hier.');
        if (!waiting && none.length && (nGroups || h)) h += `<p class="fresh">Geen groepen in: ${esc(none.map(shortCourse).join(', '))}</p>`;
        put(body, h);
      }
      async function courseGroups(pk) {
        const [gr, sets] = await Promise.all([
          uget(`/learn/api/v1/courses/${pk}/groups?limit=1000&expand=memberships,signUpSheet&membershipAvailable=true`),
          uget(`/learn/api/v1/courses/${pk}/groupsets?limit=1000&expand=signUpSheet`).catch((e) => { if (e && e.auth) throw e; return { results: [] }; }),
        ]);
        const setT = {};
        (sets.results || []).forEach((s) => { setT[s.id] = s; });
        const all = (gr.results || []).filter((g) => g.isAvailable !== false);
        const mine = all.filter((g) => (g.memberships || []).some((m) => m.userId === st.me)).map((g) => ({
          id: g.id, t: g.title || 'Groep', set: g.groupSetId && setT[g.groupSetId] ? setT[g.groupSetId].title : '',
          self: !!(g.isSelfEnrolledAllowed || g.signUpSheet), m: (g.memberships || []).map((m) => m.userId).slice(0, 40),
          d: String((g.description && (g.description.rawText || '')) || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240),
        }));
        // sign-up sheets that are open now and where you have no group yet
        const inSet = new Set(mine.map((g) => all.find((x) => x.id === g.id).groupSetId).filter(Boolean));
        const open = [];
        const seen = new Set();
        all.forEach((g) => {
          const s = g.signUpSheet;
          if (!s || !g.groupSetId || inSet.has(g.groupSetId) || seen.has(g.groupSetId)) return;
          const now = Date.now(), a = Date.parse(s.enrollmentStartDate || '') || 0, b = Date.parse(s.enrollmentEndDate || '') || Infinity;
          if (now < a || now > b || !g.isShowSignUp) return;
          seen.add(g.groupSetId);
          open.push({ set: s.name || (setT[g.groupSetId] || {}).title || 'Groepen', end: s.enrollmentEndDate || '' });
        });
        return { mine, open };
      }
      async function load(force) {
        list.forEach((c) => { if (!c.pk && c.lu) { const k = store.get('lu:' + c.lu); if (k && k.v) c.pk = k.v; } });
        list.forEach((c) => { const x = c.pk && store.get('grp:' + c.pk); if (x && !st.g[c.pk]) st.g[c.pk] = x.v; });
        const fillUsers = () => list.forEach((c) => { const x = st.g[c.pk]; if (x) x.mine.forEach((g) => g.m.forEach((id) => { if (!st.u[id]) { const k = store.get('usr:' + id); if (k) st.u[id] = k.v; } })); });
        try {
          st.me = (await getMe()).id;
          fillUsers();
          draw();
          await Promise.all(list.map(resolveCourse));
          const seen = new Set();
          list = list.filter((c) => c.pk && !seen.has(c.pk) && seen.add(c.pk));
          ss.set('tm4-grcs', JSON.stringify(list));
          draw();
          const q = list.filter((c) => force || !store.get('grp:' + c.pk) || Date.now() - store.get('grp:' + c.pk).ts > 10 * 60e3);
          const work = async () => {
            while (q.length) {
              const c = q.shift();
              try { const v = await courseGroups(c.pk); st.g[c.pk] = v; delete st.err[c.pk]; store.set('grp:' + c.pk, { ts: Date.now(), v }); }
              catch (e) { if (e && e.auth) throw e; if (!st.g[c.pk]) st.err[c.pk] = 1; }
              fillUsers(); draw();
            }
          };
          await Promise.all([work(), work(), work()]);
          // the members' names and addresses (kept two weeks)
          const ids = new Set();
          list.forEach((c) => { const x = st.g[c.pk]; if (x) x.mine.forEach((g) => g.m.forEach((id) => { if (!st.u[id] || force) ids.add(id); })); });
          const uq = [...ids];
          const uwork = async () => { while (uq.length) { const id = uq.shift(); try { st.u[id] = await userOf(id); } catch (e) { if (e && e.auth) throw e; st.u[id] = { n: 'Onbekend', e: '' }; } draw(); } };
          await Promise.all([uwork(), uwork(), uwork()]);
          const snap = [];
          list.forEach((c) => { const x = st.g[c.pk]; if (x) x.mine.forEach((g) => { const m = mails(g); if (m.length) snap.push([g.t, shortCourse(c.t || meta(c.pk).name || ''), m.join(',')].map((y) => String(y).replace(/[~!]/g, ' ')).join('~')); }); });
          store.set('grpx', snap.join('!'));
          draw();
        } catch (e) { if (e && e.auth) relogin(); else draw(); }
      }
      const groupOf = (b) => { const x = st.g[b.dataset.pk]; return x && x.mine.find((g) => g.id === b.dataset.g); };
      const courseName = (pk) => shortCourse((list.find((c) => c.pk === pk) || {}).t || meta(pk).name || '');
      // a new mail to everyone: the Outlook app (if that's your choice in Instellingen) or Outlook on the web
      function compose(to, subject) {
        const q = `to=${encodeURIComponent(to.join(','))}&subject=${encodeURIComponent(subject)}`;
        if (store.get('mailApp') === 'web') { goTo(`https://outlook.office.com/mail/deeplink/compose?${q}`); return; }
        __TM_GO__(`ms-outlook://compose?${q}`);
      }
      const view = {
        el,
        title: () => 'Groepswerken',
        show() { draw(); if (Date.now() - st.at > 120e3) { st.at = Date.now(); load(false); } },
        refresh: () => { st.at = Date.now(); return load(true); },
        act(n, b) {
          if (n === 'gwmail') { const g = groupOf(b); if (g && !b.disabled) compose(mails(g), `${courseName(b.dataset.pk)} – ${g.t}`); return true; }
          if (n === 'gwmail1') { compose([b.dataset.e], b.dataset.s); return true; }
          return false;
        },
      };
      return view;
    }

    /* ---------------- Meer > Toledo-agenda: subscribe to Blackboard's own calendar feed ---------------- */
    // Blackboard offers a personal .ics link (Calendar > settings > Share calendar) with deadlines and course events.
    // Subscribing to it in the iPhone's Calendar keeps it up to date by itself. We look the link up and hand it over as
    // webcal://, which makes Safari offer "Subscribe". If no lookup works, the view explains the manual steps.
    async function calFeed() {
      const c = store.get('calfeed');
      if (c && c.v && Date.now() - c.ts < 30 * 864e5) return c.v;
      const tries = ['/webapps/calendar/calendarFeed/url', '/learn/api/v1/calendars/calendarFeed/url', '/learn/api/v1/calendars/feed/url', '/learn/api/v1/calendars/calendarFeed'];
      for (const p of tries) {
        try {
          const r = await fetch(ULTRA + p, { credentials: 'include', cache: 'no-store', headers: { Accept: 'application/json, text/plain, */*' } });
          if (r.status === 401) throw new AuthError('401');
          if (!r.ok) continue;
          const m = /https?:\/\/[^\s"'<>\\]+?\.ics\b[^\s"'<>\\]*/.exec(await r.text());
          if (m) { const v = m[0].replace(/\\\//g, '/'); store.set('calfeed', { ts: Date.now(), v }); return v; }
        } catch (e) { if (e && e.auth) throw e; }
      }
      return '';
    }
    function agendaView() {
      const el = section();
      el.innerHTML = '<div class="lt"><h1>Toledo-agenda</h1><p class="lt-sub">Deadlines in de Agenda van je iPhone</p></div><div data-k="body"></div>';
      const st = { url: '', state: 'loading' };
      const steps = `<div class="group plain" style="margin-left:0;margin-right:0">${row({ icon: 'calendar', soft: true, title: '1. Open de agenda in Toledo', sub: 'Tik op het tandwiel (Kalenderinstellingen)', chevron: false })}${row({ icon: 'link', soft: true, title: '2. Kalender delen', sub: 'Tik op de drie puntjes, dan Kalender delen, en kopieer de link', chevron: false })}${row({ icon: 'calendar', soft: true, title: '3. Op je iPhone', sub: 'Instellingen › Agenda › Accounts › Account toevoegen › Andere › Voeg agenda-abonnement toe, en plak de link', chevron: false })}</div>`;
      function draw() {
        let h = '<p class="gf" style="margin:4px 4px 16px">Je deadlines van opdrachten en wat proffen in de vakagenda zetten, komen in de Agenda-app. Je iPhone werkt ze daarna vanzelf bij, ook als er iets verandert. Je lessen staan er niet in.</p>';
        if (st.state === 'loading') h += '<div class="center" style="min-height:30vh"><div class="spin"></div><span>Je agendalink ophalen…</span></div>';
        else if (st.url) {
          const web = st.url.replace(/^https?:\/\//, 'webcal://');
          h += `<a class="btn" style="display:flex;width:100%;height:52px" href="${esc(web)}">${ico('calendar')}Toevoegen aan Agenda</a>`;
          h += `<button type="button" class="btn ghost" style="display:flex;width:100%;margin-top:10px" data-act="calcopy">${ico('link')}Kopieer link</button>`;
          h += '<p class="gf" style="margin:12px 4px 0">Je iPhone vraagt of je je wil abonneren: tik op Abonneer en daarna op Voeg toe. Deze link is persoonlijk, deel hem niet.</p>';
        } else {
          h += '<p class="gf" style="margin:0 4px 12px">De link kon niet automatisch opgehaald worden. Zo doe je het zelf (eenmalig):</p>' + steps;
          h += `<a class="btn" style="display:flex;width:100%;margin-top:14px" href="${ULTRA}/ultra/calendar">${ico('calendar')}Open de agenda in Toledo</a>`;
        }
        put($('[data-k="body"]', el), `<div style="padding:0 16px">${h}</div>`);
      }
      async function load() {
        st.state = 'loading'; draw();
        try { st.url = await calFeed(); } catch (e) { if (e && e.auth) { relogin(); return; } }
        st.state = 'done'; draw();
      }
      let at = 0;
      return { el, title: () => 'Toledo-agenda',
        act(n) {
          if (n !== 'calcopy') return false;
          const done = () => toast('Link gekopieerd');
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(st.url).then(done, () => toast('Kopiëren lukte niet'));
          return true;
        },
        show() { if (!at) { at = 1; load(); } },
        refresh: () => { store.del('calfeed'); return load(); } };
    }

    /* ---------------- deep link from Updates: open the thing itself ---------------- */
    function directTarget(pk, it) {
      if (it.k === 'file') return (it.f && it.f.u) || '';
      if (it.k === 'doc' && !it.x && it.files && it.files.length === 1) return it.files[0].u;
      if (it.k === 'lti') return ltiUrl(pk, it.id);
      if (it.k === 'link') return it.u || '';
      if (it.k === 'task' || it.k === 'talk' || it.k === 'other') return deepLink(pk, it);
      return '';
    }
    function itemView(r) {
      const pk = r.pk, id = r.id, el = section();
      el.innerHTML = '<div class="center"><div class="spin"></div><span>Openen…</span></div>';
      const view = { el, title: () => '' };
      fetchItem(pk, id).then((it) => {
        const target = directTarget(pk, it);
        if (target) { goTo(target, { replace: true }); return; }
        if (it.ub && it.p) { replaceRoute(`#/c/${pk}/f/${it.p}`); return; }
        replaceRoute(it.k === 'folder' ? `#/c/${pk}/f/${id}` : it.k === 'doc' ? `#/c/${pk}/d/${id}` : `#/c/${pk}`);
      }, (e) => {
        if (e && e.auth) return relogin();
        el.innerHTML = `<div class="center">${ico('warn')}<b>Dit item kon niet geopend worden</b><a class="btn" href="${esc(deepLink(pk, { id }))}">Open in Blackboard</a></div>`;
      });
      return view;
    }
    function replaceRoute(hash) {
      const v = U.views.get(U.curKey);
      if (v) { v.el.remove(); U.views.delete(U.curKey); }
      history.replaceState(Object.assign({}, history.state, { tm: 1, d: U.depth }), '', hash);
      render('none');
    }

    /* ---------------- navigation ---------------- */
    function resolveLu(r) {
      const lu = r.lu;
      const finish = (pk) => {
        $('#tm-resolving')?.remove();
        const q = r.q;
        if (!q.get('lu')) q.set('lu', lu);
        history.replaceState({ tm: 1, d: U.depth }, '', `#/c/${pk}${r.rest ? '/' + r.rest : ''}?${q}`);
        render('none');
      };
      const known = store.get('lu:' + lu);
      if (known && known.v) { finish(known.v); return; }
      const box = document.createElement('div');
      box.id = 'tm-resolving';
      box.className = 'center';
      box.innerHTML = `<div class="spin"></div><span>${esc(r.q.get('t') || 'Vak openen')}…</span>`;
      $('#tm-main').appendChild(box);
      setNav({ back: { label: TAB_LABEL[r.q.get('f')] || 'Vakken', act: 'back', href: PORTAL + '?tm=vakken' } });
      uget(`/learn/api/public/v3/courses/courseId:${encodeURIComponent(lu)}?fields=id,name,courseId`).then((c) => {
        store.set('lu:' + lu, { ts: Date.now(), v: c.id });
        saveMeta(c.id, { name: c.name, lu });
        finish(c.id);
      }, () => { if (!TEST) goTo(JOURNEY + encodeURIComponent(lu), { replace: true }); });
    }
    const keyOf = (r) => (r.type === 'course' ? '/c/' + r.pk : r.path);
    function navFor(v) {
      const r = parse();
      const st = history.state || {};
      const f = tabOf(r);
      const back = U.depth > 0 ? { label: st.back || 'Terug', act: 'back', href: '#' } : { label: TAB_LABEL[f] || 'Vakken', act: 'back', href: PORTAL + '?tm=' + f };
      return { back, title: v.title(), right: v.right ? v.right() : '' };
    }
    function saveScroll() { if (U.curKey) U.scroll[U.curKey] = W.scrollY; }
    function render(anim) {
      const r = parse();
      if (r.type === 'resolve') { resolveLu(r); return; }
      if (r.type === 'none') {
        if (ROUTE_HASH) { history.replaceState(history.state, '', __TM_LOC__.origin + __TM_LOC__.pathname + __TM_LOC__.search + ROUTE_HASH); render(anim); return; }
        if (PATH_PK) { history.replaceState(history.state, '', __TM_LOC__.pathname + '#/c/' + PATH_PK); render(anim); return; }
        goTo(PORTAL + '?tm=vakken', { replace: true, dir: 'back' });
        return;
      }
      if (r.pk && [...r.q.keys()].length) saveCtx(r.pk, r.q);
      if (r.q.get('dl') != null) store.set('dlpks', { ts: Date.now(), v: String(r.q.get('dl')).split('.').filter((x) => /^_\d+_\d+$/.test(x)).slice(0, 10) });
      const key = keyOf(r);
      let v = U.views.get(key);
      if (!v) {
        v = r.type === 'grades' ? gradesView(r) : r.type === 'groups' ? groupsView(r) : r.type === 'search' ? searchView(r) : r.type === 'agenda' ? agendaView() : r.type === 'course' ? courseView(r) : r.type === 'folder' ? folderView(r) : r.type === 'doc' ? docView(r) : itemView(r);
        U.views.set(key, v);
        $('#tm-main').appendChild(v.el);
      } else if (v.route) v.route(r);
      U.views.forEach((x) => { if (x !== v) x.el.classList.remove('on', 'push', 'pop'); });
      v.el.classList.remove('push', 'pop');
      v.el.classList.add('on');
      if (anim === 'push' || anim === 'pop') { void v.el.offsetWidth; v.el.classList.add(anim); }
      U.cur = v;
      U.curKey = key;
      setNav(navFor(v));
      setTabOn(tabOf(r));
      const y = anim === 'push' ? 0 : U.scroll[key] || 0;
      W.scrollTo(0, y);
      if (y) requestAnimationFrame(() => W.scrollTo(0, y));
      watchTitle(v.el);
      if (v.show) v.show();
      if (U.views.size > 12) for (const [k, x] of U.views) { if (x !== v && U.views.size > 12) { x.el.remove(); U.views.delete(k); } }
    }
    function go(hash) {
      saveScroll();
      const back = U.cur ? U.cur.title() : '';
      U.depth += 1;
      history.pushState({ tm: 1, d: U.depth, back }, '', hash);
      render('push');
    }
    /* Which upcoming deadlines did you already hand in? The portal can't ask Blackboard itself (another site), so the
       course page checks the courses the portal named (?dl=) and tells it on the way back (?done=). */
    const doneMap = () => (store.get('done2') || {}).v || {};
    function scanDone() {
      const dl = store.get('dlpks');
      const pks = Array.from(new Set(((dl && Date.now() - dl.ts < 7 * 864e5 && dl.v) || []).concat(PATH_PK ? [PATH_PK] : [])));
      const st = store.get('done2') || { ts: 0, v: {} };
      if (!pks.length || Date.now() - st.ts < 10 * 60e3) return;
      st.ts = Date.now();
      store.set('done2', st);
      pks.reduce((chain, pk) => chain.then(() => fetchGrades(pk).then((g) => {
        const cur = store.get('done2') || { ts: Date.now(), v: {} };
        cur.v[pk] = g.filter((x) => x.cid && (x.g || x.st === 'NeedsGrading' || x.st === 'Graded')).map((x) => x.cid);
        store.set('done2', cur);
      }, () => {})), Promise.resolve());
    }
    const doneParam = () => {
      const m = doneMap();
      const s2 = Object.keys(m).slice(0, 12).map((pk) => [pk].concat(m[pk].slice(0, 40)).join('~')).join('!');
      return s2 ? '&done=' + encodeURIComponent(s2) : '';
    };
    function leave(tab) {
      const f = tabOf(parse());
      saveScroll();
      setTabOn(tab);
      // the portal already knows this list: just go back (fast, the page is kept); otherwise load it with the news
      const done = doneParam();
      const rn = rnParam();
      const gx = grpParam();
      const known = !rn && !gx && (!done || store.get('doneSent') === done);
      const url = PORTAL + '?tm=' + tab + (okAt ? '&ub=' + Math.floor(okAt / 1e3) : '') + done + rn + gx;
      if (fromPortal && f === tab && history.length > U.depth + 1 && known) {
        // Safari's history doesn't always lead back to the app (an entry it dropped, a page in between): when
        // nothing happened after a moment, load the app's tab instead of staying dimmed and loading forever
        if (!TEST) leaving('back');
        let gone = false;
        const g = () => { gone = true; };
        W.addEventListener('pagehide', g, { once: true });
        history.go(-(U.depth + 1));
        setTimeout(() => { W.removeEventListener('pagehide', g); if (!gone && document.visibilityState === 'visible') goTo(url, { dir: 'back' }); }, 2500);
        return;
      }
      if (done) store.set('doneSent', done);
      if (rn) store.set('rnSent', rn.slice(-7));
      if (gx) store.set('grpxSent', store.get('grpx'));
      goTo(url, { dir: 'back' });
    }
    W.addEventListener('popstate', (e) => {
      saveScroll();
      U.depth = (e.state && e.state.d) || 0;
      render(U.animBack ? 'pop' : 'none');
      U.animBack = false;
    });
    W.addEventListener('pagehide', () => { saveScroll(); ss.set('tm4-uscroll', JSON.stringify(U.scroll)); });

    // Signed out of Blackboard: load the course page once without the app, so Blackboard can sign you in its
    // own way; it then lands back on the course and the app takes over again (see the classic layer).
    let relogging = false;
    function relogin() {
      if (relogging) return;
      relogging = true;
      const r = parse();
      const pk = r.pk || PATH_PK;
      ss.set('tm4-resume', r.type === 'grades' || r.type === 'agenda' || r.type === 'search' || r.type === 'groups' ? location.hash : location.hash.split('?')[0]);
      const last = Number(ss.get('tm4-relogin')) || 0;
      const target = r.type === 'agenda' ? `${ULTRA}/ultra/calendar?tm=agenda` : r.type === 'groups' ? `${ULTRA}/ultra/calendar?tm=groepen` : `${ULTRA}/ultra/courses/${pk}/outline`;
      if (!TEST && (pk || r.type === 'agenda' || r.type === 'groups') && Date.now() - last > 60e3) {
        ss.set('tm4-relogin', String(Date.now()));
        ss.set('tm4-noapp', String(Date.now()));
        __TM_REPL__(target);
        return;
      }
      const box = document.createElement('div');
      box.className = 'center';
      box.innerHTML = `${ico('lock')}<b>Je bent afgemeld bij Blackboard</b><span>Log opnieuw in om verder te gaan.</span><button type="button" class="btn" id="tm4-relog">Inloggen</button>`;
      $('#tm-main').replaceChildren(box);
      U.views.clear();
      $('#tm4-relog').addEventListener('click', () => { ss.set('tm4-noapp', String(Date.now())); __TM_REPL__(target); });
    }

    const ACTS = {
      back: () => { if (U.depth > 0) { U.animBack = true; history.back(); } else leave(tabOf(parse())); },
      menu: () => {
        const pk = parse().pk;
        sheet({ title: meta(pk).name || 'Vak', actions: [
          { label: 'Openen in Blackboard', run: () => { ss.set('tm4-classic-ultra', String(Date.now())); goTo(`${ULTRA}/ultra/courses/${pk}/outline?tm=classic`); } },
          { label: 'Vernieuwen', run: () => { try { Object.keys(localStorage).filter((k) => k.startsWith(`${NS}c:${pk}:`) || k === `${NS}a:${pk}` || k === `${NS}g:${pk}` || k.startsWith(`${NS}i:${pk}:`)).forEach((k) => localStorage.removeItem(k)); } catch (_) {} location.reload(); } },
        ] });
      },
      att: async (b) => {
        const pk = parse().pk, id = b.dataset.id;
        const end = $('.end', b);
        if (end) end.innerHTML = '<span class="spin"></span>';
        try {
          const j = await uget(`/learn/api/public/v1/courses/${pk}/contents/${id}/attachments`);
          const a = (j.results || [])[0];
          if (a) { goTo(`${ULTRA}/learn/api/public/v1/courses/${pk}/contents/${id}/attachments/${a.id}/download`); return; }
        } catch (e) { if (e.auth) { relogin(); return; } }
        goTo(deepLink(pk, { id }));
      },
      retry: () => location.reload(),
    };
    W.addEventListener('click', (e) => {
      if (!e.target || !e.target.closest) return;
      const tab = e.target.closest('#tm-tabs a');
      if (tab) { e.preventDefault(); leave(tab.dataset.tab); return; }
      const act = e.target.closest('[data-act]');
      if (act) {
        const n = act.dataset.act;
        if (U.cur && U.cur.act && U.cur.act(n, act, e)) { e.preventDefault(); return; }
        if (ACTS[n]) { e.preventDefault(); ACTS[n](act, e); return; }
      }
      const nv = e.target.closest('a[data-nav]');
      if (nv) {
        e.preventDefault();
        const href = nv.getAttribute('href');
        const id = (/\/(?:f|d)\/(_\d+_\d+)/.exec(href) || [])[1];
        if (id && nv.dataset.title) U.titles[id] = nv.dataset.title;
        go(href);
        return;
      }
      const ann = e.target.closest('.ann');
      if (ann && !e.target.closest('a')) { toggleAnn(ann); return; }
      if (e.target.closest('a[href]')) saveScroll();
    }, true);

    if (!history.state || !history.state.tm) history.replaceState({ tm: 1, d: 0 }, '', location.hash);
    render('none');
    setTimeout(() => { scanDone(); getMe().catch(() => {}); }, 2500);
    pullRefresh(() => (U.cur && U.cur.refresh ? U.cur.refresh() : null));
    keepAlive('ultra', [[ULTRA + '/learn/api/public/v1/users/me?fields=id']], 5 * 60e3);
    updateWatch();
    const wake = () => { if (document.visibilityState === 'visible' && U.cur && U.cur.show) U.cur.show(); };
    document.addEventListener('visibilitychange', wake);
    W.addEventListener('pageshow', (e) => { if (e.persisted) wake(); });
  }
  /* ================================================================== KU Loket: timetable + exams */
  async function loketData() {
    const sapDay = (v) => { const m = /\/Date\((-?\d+)/.exec(String(v || '')); if (!m) return ''; const u = new Date(Number(m[1])); return `${u.getUTCFullYear()}-${pad(u.getUTCMonth() + 1)}-${pad(u.getUTCDate())}`; };
    const hm = (v) => { const m = /PT(\d+)H(\d+)M/.exec(String(v || '')); return m ? `${pad(m[1])}:${pad(m[2])}` : ''; };
    const res = (v) => (Array.isArray(v) ? v : v && Array.isArray(v.results) ? v.results : []);
    const https = (u) => { const s = String(u || '').trim().replace(/^http:\/\//i, 'https://'); return /^https:\/\/[^\s"'<>]+$/.test(s) ? s : ''; };
    const get = (p) => api(LOKET_ORIGIN + p);
    const from = addDays(mondayOf(Date.now()), -7);
    const to = addDays(from, 7 * 20);
    const filter = `(date ge datetime'${ymd(from)}T00:00:00' and date le datetime'${ymd(to)}T00:00:00')`;
    const [ev, ex] = await Promise.allSettled([
      get(`/sap/opu/odata/sap/ZC_EP_SCHEDULE_SRV/Events?sap-client=200&$format=json&$skip=0&$top=3000&$filter=${encodeURIComponent(filter)}&$expand=EventTeacherSet,EventLocationSet`),
      get('/sap/opu/odata/sap/ZC_IER_SRV/EvaluationSet?sap-client=200&$format=json&$expand=toLocation,toStaff'),
    ]);
    if (ev.status === 'rejected' && ex.status === 'rejected') {
      const x = ev.reason, y = ex.reason;
      const detail = `lessen: ${why(x)} · examens: ${why(y)}`;
      const e = (x && x.auth) ? x : (y && y.auth) ? y : new Error('KU Loket');
      e.detail = detail;
      e.http = !!(x && x.status && y && y.status); // KU Loket itself answered with an error
      throw e;
    }
    const lessons = ev.status === 'fulfilled' ? res(ev.value && ev.value.d).map((e) => {
      const loc = res(e.EventLocationSet)[0] || {};
      return {
        d: sapDay(e.date), s: hm(e.start_time), e: hm(e.end_time), t: String(e.ola_description || e.workFormDesc || '').trim(), c: String(e.ects_code || '').trim(),
        f: String(e.workFormDesc || '').trim(), g: String(e.groupinfo_general || '').trim(),
        r: [[loc.mnemonic, loc.roomNumber].filter(Boolean).join(' '), loc.roomName].filter(Boolean).join(' · '), u: https(loc.url_location) || (/^\d{6,10}$/.test(String(loc.locationId || loc.location_id || '')) ? `https://www.kuleuven.be/lokalen/${loc.locationId || loc.location_id}.htm` : ''),
        p: res(e.EventTeacherSet).map((x) => x.name || x.fullName || '').filter(Boolean).join(', '),
      };
    }).filter((x) => x.d && x.s).sort((a, b) => (a.d + a.s).localeCompare(b.d + b.s)) : null;
    const exams = ex.status === 'fulfilled' ? res(ex.value && ex.value.d).map((x) => {
      const loc = res(x.toLocation)[0] || {};
      return {
        d: sapDay(x.examDate), s: hm(x.examBegtime), e: hm(x.examEndtime), t: String(x.moduleTitle || '').trim(), c: String(x.moduleCode || '').trim(),
        r: [[loc.mnemonic, loc.roomNumber].filter(Boolean).join(' '), loc.roomName].filter(Boolean).join(' · '), u: https(loc.urlLocation) || (/^\d{6,10}$/.test(String(loc.locationId || '')) ? `https://www.kuleuven.be/lokalen/${loc.locationId}.htm` : ''), x: String(x.evaluationText || '').trim(),
      };
    }).filter((x) => x.d).sort((a, b) => (a.d + a.s).localeCompare(b.d + b.s)) : null;
    return { lessons, exams, range: [ymd(from), ymd(to)] }; // null = could not be read this time (keep the old copy)
  }

  /* ================================================================== KU Loket: study progress + ISP (read only) */
  const sapGet = (svc, path) => api(`${LOKET_ORIGIN}/sap/opu/odata/sap/${svc}/${path}${path.includes('?') ? '&' : '?'}$format=json&sap-client=200`);
  const odRes = (v) => { const d = v && v.d; return Array.isArray(d) ? d : d && Array.isArray(d.results) ? d.results : d ? [d] : []; };
  const arrOf = (v) => (Array.isArray(v) ? v : v && Array.isArray(v.results) ? v.results : []);
  const numOf = (v) => { const n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return Number.isFinite(n) ? n : null; };
  const sapDate = (v) => { const m = /^(\d{2})[.-](\d{2})[.-](\d{4})$/.exec(String(v || '').trim()) || /^(\d{4})(\d{2})(\d{2})$/.exec(String(v || '').trim()); if (!m) return ''; return m[1].length === 4 ? `${m[1]}-${m[2]}-${m[3]}` : `${m[3]}-${m[2]}-${m[1]}`; };
  // "Studievoortgangsdossier" (zr_1017) and "Mijn resultaten" (zr_1018): every study, its credits and every result
  async function studyData() {
    const HOME = 'ZC_ES_SVD_HOME_SRV', AW = 'ZC_ES_SVD_AW_SRV';
    const list = odRes(await sapGet(HOME, 'StudySet?$top=50')).filter((s) => s.studyId);
    list.sort((a, b) => (b.isActive === true) - (a.isActive === true) || String(b.acjaarLaatsteInschrijving).localeCompare(String(a.acjaarLaatsteInschrijving)));
    const out = await Promise.all(list.slice(0, 4).map(async (s) => {
      const id = s.studyId, acj = s.acjaarDiplomaObtained || '0000';
      const hk = `StudySet(studyId='${id}',acjaarDiplomaObtained='${acj}')`;
      const ak = `StudySet(studyId='${id}',acYearZittijd='9999',peridZittijd='999',studyIdZittijd='${id}',acjaarDiplomaObtained='${acj}',multipleStudyRecords=false)`;
      const [kn, prog, akn, aprog, years] = await Promise.allSettled([
        sapGet(HOME, hk + '/toKeyNumbers'), sapGet(HOME, hk + '/toStudyProgress'), sapGet(AW, ak + '/toKeyNumber'), sapGet(AW, ak + '/toStudyProgress'),
        sapGet(AW, ak + '/toAcyearTotal?$expand=toResultTotal/toRanking'),
      ]);
      const ok = (x) => (x.status === 'fulfilled' ? odRes(x.value) : []);
      const pct = ok(kn).find((k) => /diploma/i.test(k.keyName || ''));
      const total = numOf(String((ok(akn)[0] || {}).posStudyPoints || '').replace(/[^\d.,]/g, ''));
      return {
        id, name: String(s.oplName || '').trim(), inst: String(s.instName || '').trim(), active: !!s.isActive,
        done: s.diplomaObtained === 'DiplomaBehaald', doneYear: acj !== '0000' ? acj : '', pct: pct ? numOf(pct.keyValue) : null, total,
        last: sapDate(s.datumLaatsteVrijgave),
        prog: ok(prog).map((p) => [String(p.status || '').trim(), numOf(p.credits) || 0]),
        now: ok(aprog).map((p) => [String(p.status || '').trim(), numOf(p.credits) || 0]),
        years: ok(years).map((y) => ({
          y: String(y.academicYear || ''),
          c: arrOf(y.toResultTotal).map((r) => {
            const rk = arrOf(r.toRanking).map((k) => [String(k.code || ''), numOf(k.lowGrade), numOf(k.highGrade), numOf(k.numberOfStudents) || 0, numOf(k.percentage) || 0, k.myRanking === 'X' ? 1 : 0]);
            return { code: String(r.moduleCode || '').trim(), t: String(r.moduleDescription || '').trim(), sp: numOf(r.studyPoints) || 0, r: String(r.resultTotal || '').trim(),
              sc: String(r.resultTotalScale || '').trim(), st: String(r.awStatus || '').trim(), d: sapDate(r.releaseDate), n: Number(r.numberOfBookings) || 1, sit: String(r.situeringsCode || '').trim(), sy: Number(r.sitAantalJaar) || 0,
              tol: !!r.tolerance, rk: rk.length ? rk : undefined };
          }),
        })).filter((y) => y.c.length).sort((a, b) => b.y.localeCompare(a.y)),
      };
    }));
    return out;
  }
  // "Jouw individueel studieprogramma" (zr_0442): what you obtained and what you take this year, per part of the programme
  async function ispData() {
    const ISP = 'ZC_ISP_ST_OPO_SRV';
    const reg = odRes(await sapGet(ISP, "RegistrationSet?$filter=page%20eq%20%27boekOpo%27")).sort((a, b) => (a.ispPrio || 9) - (b.ispPrio || 9))[0];
    if (!reg) return null;
    const pid = reg.programmeId, yr = reg.academicYear;
    const [tree, spt] = await Promise.allSettled([
      sapGet(ISP, `IndividualStudyProgrammeSet?$filter=${encodeURIComponent(`programmeId eq '${pid}' and academicYear eq '${yr}'`)}`),
      sapGet(ISP, `RegistrationSet(page='boekOpo',programmeId='${pid}',academicYear='${yr}')/toStudyPointTotal`),
    ]);
    const nodes = tree.status === 'fulfilled' ? odRes(tree.value) : [];
    const groups = nodes.filter((n) => n.otype === 'CG').map((n) => ({ id: String(n.nodeId), p: String(n.parentNodeId || ''), t: String(n.title || '').trim(), l: Number(n.hierarchyLevel) || 0 }));
    const other = {};
    const courses = [];
    nodes.filter((n) => n.otype === 'SM').forEach((n) => {
      const b = String(n.bookingStatus || '');
      const g = String(n.parentNodeId || '');
      if (b === 'credit' || /^booked/.test(b)) {
        if (courses.some((c) => c.code === n.ectsCode && c.st === (b === 'credit' ? 'ok' : 'now'))) return;
        courses.push({ g, code: String(n.ectsCode || '').trim(), t: String(n.title || '').trim(), sp: numOf(n.credits) || 0, per: String(n.offerPeriod || ''),
          ph: [Number(n.startPhase) || 0, Number(n.endPhase) || 0], url: n.ectsURL ? 'https://' + String(n.ectsURL).replace(/^https?:\/\//, '') : '', st: b === 'credit' ? 'ok' : 'now', yr: String(n.academicYear || ''), must: n.opoObligated === 'X' });
      } else if (/bookable/.test(b)) other[g] = (other[g] || 0) + 1;
    });
    const t = (spt.status === 'fulfilled' ? odRes(spt.value)[0] : null) || {};
    const sp = nodes.find((n) => n.otype === 'SP');
    return { name: String(reg.programmeDescription || '').trim(), yr, spec: sp ? String(sp.description || '').trim() : '', deadline: sapDate(reg.deadlineDate),
      sem: [numOf(t.firstPeriod) || 0, numOf(t.secondPeriod) || 0, numOf(t.wholeYear) || 0], groups, courses, other };
  }

  /* what went wrong, in a few words: shown small under an error, so a screenshot says what happened */
  function why(e) {
    if (!e) return 'onbekend';
    if (e.detail) return e.detail;
    if (e.auth) return 'aanmelden nodig';
    if (e.status) return 'HTTP ' + e.status;
    if (e.name === 'SyntaxError') return 'onverwacht antwoord';
    return 'geen verbinding (' + String(e.message || e).slice(0, 40) + ')';
  }
  /* When KU Loket's own session has run out, the page we are on is its sign-in step: a form that sends you to
     the KU Leuven login by itself. Meanwhile the timetable requests fail (Safari cancels them, or they are sent to
     the login), so a failed request says nothing until we know which page this is. The sign-in step must never be stopped. */
  const signInStep = () => !!document.querySelector('input[name="SAMLRequest"],input[name="SAMLResponse"],form[action*="idp.kuleuven.be"]');
  const whenParsed = (fn) => {
    if (document.readyState !== 'loading') setTimeout(fn, 250);
    else document.addEventListener('DOMContentLoaded', () => setTimeout(fn, 250), { once: true });
  };

  // the timetable first; study progress and ISP along with it when the app asks (?x=study). Those never make it fail.
  function withStudy(p) {
    if (params.get('x') !== 'study' && !/(^|&)x=study\b/.test(ss.get('tm4-sync-x') || '')) return p;
    return p.then((data) => Promise.allSettled([studyData(), ispData()]).then(([a, b]) => {
      if (a.status === 'fulfilled') data.study = a.value;
      if (b.status === 'fulfilled') data.isp = b.value;
      return data;
    }));
  }

  /* ================================================================== room page (lokaalfiche), app style
     www.kuleuven.be/lokalen/<id>.htm lands on KU Loket's own room app (#zr_1011-display&/room/<id>); the app links
     straight to LOKET?tm=room&id=<id>. Where the room is matters most (map, address, photos); the rest stays small. */
  function roomPage() {
    const id = (/^\d{6,10}$/.test(params.get('id') || '') && params.get('id')) || (/\/room\/(\d{6,10})/.exec(decodeURIComponent(location.hash)) || [])[1] || '';
    const orig = `${LOKET}?tm=orig#zr_1011-display&/room/${id}`;
    takeover('Lokaal', []);
    buildShell([
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: PORTAL + '?tm=meer' },
    ], 'rooster');
    const canBack = history.length > 1 && /^https:\/\/(toledo\.kuleuven\.be|ultra\.edu\.kuleuven\.cloud)\//.test(document.referrer);
    setNav({ back: { label: canBack ? 'Terug' : 'Agenda', act: 'back', href: PORTAL + '?tm=rooster' }, title: '' });
    const main = $('#tm-main');
    const sec = document.createElement('section');
    sec.className = 'view on';
    sec.setAttribute('data-tm4', '');
    main.appendChild(sec);
    const ACR = /^(ICTS|PC|PCS|KU|AV|II|III|IV|VIP|LAB)$/;
    const nice = (t) => { const v = String(t || '').trim(); if (!v || v !== v.toUpperCase()) return v; return v.toLowerCase().replace(/(^|[\s(\-/.])([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase()).split(' ').map((w) => (/\d/.test(w) || ACR.test(w.toUpperCase()) ? w.toUpperCase() : w)).join(' '); };
    const num = (q) => String(q || '').trim().replace(/^0+(?=\d)/, '');
    function draw(d, fresh) {
      const room = d.number || '';
      const name = nice(d.name);
      const bld = String(d.buildingName || '').replace(/^\S+\s+/, '') || d.buildingName || '';
      const street = String(d.buildingStreetHouseNr || '').replace(/\s{2,}/g, ' ').trim();
      const city = [d.buildingPostalCode, d.buildingCity].filter(Boolean).join(' ');
      const addr = [street, city].filter(Boolean).join(', ');
      const q = encodeURIComponent([street, city].filter(Boolean).join(' ') || bld);
      const media = ((d.mediaSet && d.mediaSet.results) || []);
      const photos = media.filter((m) => /^(JPG|JPEG|PNG)$/i.test(m.type || '') && m.url);
      const docs = media.filter((m) => /^PDF$/i.test(m.type || '') && m.url);
      const res = ((d.resourceSet && d.resourceSet.results) || []);
      const cap = num(d.capacity);
      const examCap = (res.find((r) => /examencapaciteit/i.test(r.description || '')) || {}).quantity;
      document.title = room || 'Lokaal';
      // KU Leuven room codes: "<building> <floor>.<room>", e.g. PDS 01.30 = building PDS, 1st floor, room 30
      const code = /^(\S+)\s+(-?\d{1,2})\.(\w+)$/.exec(room.trim());
      const fl = code ? parseInt(code[2], 10) : NaN;
      const floor = isNaN(fl) ? '' : fl === 0 ? 'Gelijkvloers' : fl < 0 ? `Kelder ${fl}` : `${fl}e verdieping`;
      const rno = code ? code[3].replace(/^0+(?=\w)/, '') : '';
      const kulag = code && fl >= 0 && /^\d{1,4}$/.test(code[3]) && /^\d+-\d+$/.test(d.buildingNr || '') ? `https://www.kuleuven.be/kulag/nl/lokaal/${d.buildingNr}-${String(fl).padStart(2, '0')}${code[3].padStart(4, '0')}/onderwijs` : '';
      let h = `<div class="lt"><h1>${esc(room || 'Lokaal')}</h1><p class="lt-sub">${esc([name, bld].filter(Boolean).join(' · '))}</p></div>`;
      if (code) h += `<div class="rp-code"><div><small>Gebouw</small><b>${esc(code[1])}</b><span>${esc(bld || d.buildingName || '')}</span></div><div><small>Verdieping</small><b>${esc(code[2])}</b><span>${esc(floor)}</span></div><div><small>Lokaal</small><b>${esc(code[3])}</b><span>nr. ${esc(rno)} op die verdieping</span></div></div>`;
      if (photos.length) h += `<div class="rp-photos">${photos.map((m, i) => `<a href="${esc(m.url)}" class="rp-ph"><img src="${esc(m.url)}" alt="Foto ${i + 1} van ${esc(room)}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"></a>`).join('')}</div>${photos.length > 1 ? `<p class="rp-cnt">${photos.length} foto's · veeg opzij</p>` : ''}`;
      else if (!fresh) h += '<div class="rp-photos"><div class="rp-ph sk"></div></div>';
      if (addr) {
        h += `<div class="sh"><h2>Locatie</h2></div><div class="card rp-loc">
          <div class="rp-mapw"><span>${ico('pin')}Kaart laden…</span><iframe class="rp-map" src="https://maps.google.com/maps?q=${q}&z=17&output=embed" loading="lazy" referrerpolicy="no-referrer" title="Kaart van ${esc(street || bld)}"></iframe></div>
          <div class="rp-addr">${ico('pin')}<span><b>${esc(street || bld)}</b><br>${esc(city)}</span></div>
          ${code ? `<div class="rp-note">${ico('info')}<span>Ga naar gebouw <b>${esc(code[1])}</b>, ${fl === 0 ? 'blijf op het <b>gelijkvloers</b>' : fl < 0 ? `ga naar <b>kelder ${fl}</b>` : `ga naar de <b>${fl}e verdieping</b>`} en zoek lokaal <b>${esc(room)}</b>.</span></div>` : ''}
          ${d.access ? `<div class="rp-note">${ico('info')}<span>Toegang: ${esc(d.access)}</span></div>` : ''}
          <div class="rp-acts"><a class="pri" href="https://www.google.com/maps/search/?api=1&query=${q}">Google Maps</a><a href="https://maps.apple.com/?q=${q}">Apple Kaarten</a>${d.locationUrl ? `<a href="${esc(d.locationUrl)}">KU Leuven-kaart</a>` : ''}</div>
        </div>`;
      }
      if (kulag) h += `<div class="group" style="margin-top:12px">${row({ href: kulag, icon: 'help', soft: true, title: 'Route binnen het gebouw', sub: 'Ingang, lift en deuren (KULag)', external: true })}</div>`;
      if (docs.length) h += `<div class="group" style="margin-top:12px">${docs.map((m, i) => row({ href: m.url, icon: 'doc', soft: true, title: docs.length > 1 ? `Plan ${i + 1}` : 'Plan', sub: 'PDF', external: true })).join('')}</div>`;
      // the rest: small
      const facts = [['Soort', d.type], ['Plaatsen', cap], ['Plaatsen bij examens', examCap && num(examCap)], ['Oppervlakte', d.surface], ['Gebouw', d.buildingNr]].filter((x) => x[1]);
      if (facts.length) h += `<div class="gh">Over dit lokaal</div><div class="group plain rp-small">${facts.map(([k, v]) => `<div class="row"><span class="main"><span class="t">${esc(k)}</span></span><span class="end">${esc(String(v))}</span></div>`).join('')}</div>`;
      const groups = {};
      res.filter((r) => !/examencapaciteit|code (geel|oranje)/i.test(r.description || '')).forEach((r) => { (groups[r.group || 'Andere'] = groups[r.group || 'Andere'] || []).push(r); });
      const gk = Object.keys(groups);
      if (gk.length) h += `<details class="rp-more"><summary>Voorzieningen (${res.length})</summary>${gk.map((g) => `<div class="gh">${esc(g)}</div><p class="rp-list">${groups[g].map((r) => esc(r.description + (Number(r.quantity) > 1 ? ' (' + num(r.quantity) + ')' : ''))).join(' · ')}</p>`).join('')}</details>`;
      const resp = ((d.responsibleSet && d.responsibleSet.results) || []).map((r) => r.name).filter(Boolean);
      if (resp.length || d.assignedTo1) h += `<p class="rp-list rp-foot">${d.assignedTo1 ? 'Beheer: ' + esc(d.assignedTo1) + '<br>' : ''}${resp.length ? 'Verantwoordelijken: ' + esc(resp.join(', ')) : ''}</p>`;
      h += `<p class="fresh"><a href="${esc(orig)}" data-orig="1">Open in KU Loket</a></p>`;
      put(sec, h);
    }
    const KEY = 'room:' + id;
    const cached = store.get(KEY);
    if (cached && cached.v) draw(Object.assign({}, cached.v, { mediaSet: { results: [] } }), false);
    else put(sec, `<div class="lt"><h1>Lokaal</h1></div><div class="rp-photos"><div class="rp-ph sk"></div></div>${skGroup(3)}`);
    if (!id) { put(sec, empty('pin', 'Lokaal niet gevonden', '')); return; }
    api(`${LOKET_ORIGIN}/sap/opu/odata/sap/ZL_RE_LOK_FICHE_SRV/roomSet('${id}')?sap-client=200&$format=json&$expand=mediaSet,resourceSet,responsibleSet,infoLinkSet`)
      .then((j) => {
        const d = (j && j.d) || {};
        // photo links are one-time handles: keep the rest for a fast next visit
        const keep = Object.assign({}, d);
        delete keep.mediaSet;
        store.set(KEY, { ts: Date.now(), v: keep });
        draw(d, true);
      }, () => {
        if (cached && cached.v) { draw(Object.assign({}, cached.v, { mediaSet: { results: [] } }), true); return; }
        put(sec, empty('pin', 'Lokaal kon niet geladen worden', 'KU Loket reageert niet of je bent afgemeld.', `<p style="margin-top:14px"><a class="btn" href="${esc(orig)}" data-orig="1">Open in KU Loket</a></p>`));
      });
    W.addEventListener('click', (e) => {
      const b = e.target.closest && e.target.closest('[data-act="back"]');
      if (b) { e.preventDefault(); if (canBack) history.back(); else goTo(PORTAL + '?tm=rooster', { dir: 'back' }); return; }
      const t = e.target.closest && e.target.closest('#tm-tabs a');
      if (t) { e.preventDefault(); goTo(t.getAttribute('href'), { dir: 'back' }); }
    }, true);
  }

  /* runs inside the hidden KU Loket frame that the app opens. Read first, stop the page only when that worked. */
  function bridge() {
    let sent = false;
    const post = (m) => {
      if (sent) return;
      sent = true;
      try { W.parent.postMessage(Object.assign({ tm4: 'agenda' }, m), PORTAL_ORIGIN); } catch (_) {}
    };
    // leaving for the KU Leuven login (which can't finish inside a hidden frame): the app opens KU Loket itself
    W.addEventListener('pagehide', () => post({ ok: false, pending: 'login' }));
    let tries = 0;
    const attempt = () => {
      tries++;
      withStudy(loketData()).then((data) => { try { W.stop(); } catch (_) {} post({ ok: true, data }); }, (e) => {
        if (e && e.auth) { post({ ok: false, pending: 'login', why: why(e) }); return; }
        whenParsed(() => {
          if (sent) return;
          if (signInStep()) { post({ ok: false, pending: 'login', why: why(e) }); return; }
          if (tries < 2) { setTimeout(attempt, 1000); return; }
          post({ ok: false, error: why(e) });
        });
      });
    };
    attempt();
  }

  /* top-level: "Bijwerken" opens KU Loket itself (signing in if needed), which reads the timetable and goes
     straight back to the app with the data in the address (#...&tmsync=). */
  function syncBack() {
    let back = String(params.get('back') || '').replace(/[^a-z/]/g, '');
    if (!back) { try { back = (JSON.parse(ss.get('tm4-sync') || '{}').back || '').replace(/[^a-z/]/g, ''); } catch (_) {} }
    return back || 'rooster';
  }
  function syncPage() {
    const back = syncBack();
    if (params.get('x') === 'study') ss.set('tm4-sync-x', 'x=study');
    let prev = {};
    try { prev = JSON.parse(ss.get('tm4-sync') || '{}'); } catch (_) {}
    const reloads = prev.ts && Date.now() - prev.ts < 10 * 60e3 ? prev.reloads || 0 : 0;
    ss.set('tm4-sync', JSON.stringify({ back, ts: Date.now(), reloads }));
    // cover whatever KU Loket shows meanwhile, without touching it (its sign-in step has to keep running)
    const dark = isDark();
    const cover = document.createElement('style');
    cover.textContent = `html{background:${dark ? '#000' : '#f2f2f7'}!important}html::after{content:"${/^(studie|isp)/.test(back) ? 'KU Loket openen' : 'Lessen bijwerken'}\\2026";position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:${dark ? '#000' : '#f2f2f7'};color:${dark ? '#98989f' : '#6d6d72'};font:600 17px -apple-system,system-ui,sans-serif}`;
    (document.head || document.documentElement).appendChild(cover);
    let gone = false;
    W.addEventListener('pagehide', () => { gone = true; });
    W.addEventListener('beforeunload', () => { gone = true; });
    // came back here with the back button (e.g. from the KU Leuven login): return to the app instead of waiting
    W.addEventListener('pageshow', (ev) => { if (ev.persisted) { ss.del('tm4-sync'); __TM_REPL__(`${PORTAL}?tm=${back.split('/')[0]}`); } });
    const again = () => __TM_REPL__(`${LOKET}?tm=sync&back=${encodeURIComponent(back)}`);
    const fail = (title, text, detail) => {
      ss.del('tm4-sync');
      ss.del('tm4-sync-x');
      takeover('Lessen bijwerken', [PORTAL_ORIGIN]);
      document.body.classList.add('no-tabs');
      document.body.innerHTML = `<div class="sync" data-tm4>${ico('warn')}<b style="color:var(--text);font-size:19px">${esc(title)}</b><span>${esc(text)}</span><button type="button" class="btn" id="tm4-retry">Opnieuw proberen</button><a class="btn ghost" href="${PORTAL}?tm=${back.split('/')[0]}">Terug naar Toledo</a>${detail ? `<small>${esc(detail)}</small>` : ''}</div>`;
      document.getElementById('tm4-retry').addEventListener('click', again);
    };
    let tries = 0;
    const attempt = () => {
      tries++;
      withStudy(loketData()).then((data) => {
        ss.del('tm4-sync');
        ss.del('tm4-sync-x');
        try { W.stop(); } catch (_) {}
        __TM_REPL__(`${PORTAL}?tm=${back.split('/')[0]}#${back}&tmsync=${encodeURIComponent(JSON.stringify(data))}`);
      }, (e) => {
        if (gone) return; // on its way to the KU Leuven login: the page after it carries on
        whenParsed(() => {
          if (gone) return;
          if (signInStep()) {
            // KU Loket is signing you in from this very page: let it. If nothing happens, say so.
            setTimeout(() => { if (!gone) fail('Aanmelden bij KU Loket lukte niet', 'Open KU Loket één keer gewoon en probeer het daarna opnieuw.', why(e)); }, 30000);
            return;
          }
          if (tries < 3) { setTimeout(attempt, tries === 1 ? 1200 : 3000); return; }
          if (!(e && e.http) && reloads < 1) {
            // a fresh page from KU Loket: if its session ran out, that page signs you in again
            ss.set('tm4-sync', JSON.stringify({ back, ts: Date.now(), reloads: reloads + 1 }));
            again();
            return;
          }
          if (e && e.auth) fail('Aanmelden bij KU Loket lukte niet', 'Open KU Loket één keer gewoon en probeer het daarna opnieuw.', why(e));
          else fail('Het rooster kon niet geladen worden', 'KU Loket reageert nu niet. Probeer het over een paar minuten opnieuw.', why(e));
        });
      });
    };
    attempt();
  }

  /* portal while signing in: the normal Toledo page does the login, then we switch back to the app */
  function loginWatch() {
    const started = Date.now();
    const tick = () => fetch(PORTAL_ORIGIN + '/portal/api/user', { credentials: 'include', headers: { Accept: 'application/json' } })
      .then((r) => { if (r.ok) { ss.del('tm4-login'); location.reload(); } else again(); }, again);
    const again = () => { if (Date.now() - started > 30 * 60e3) { ss.del('tm4-login'); return; } setTimeout(tick, 2500); };
    setTimeout(tick, 1500);
  }

  /* classic portal (chosen in Meer): a button to come back */
  function classicPill() {
    const add = () => {
      if (!document.body) { setTimeout(add, 150); return; }
      if (document.getElementById('tm4-pill')) return;
      const b = document.createElement('button');
      b.id = 'tm4-pill';
      b.type = 'button';
      b.textContent = '← Terug naar de app';
      b.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:calc(18px + env(safe-area-inset-bottom));z-index:2147483000;padding:11px 18px;border:0;border-radius:22px;background:#0a6cd6;color:#fff;font:600 15px -apple-system,system-ui,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.25)';
      b.addEventListener('click', () => { ss.del('tm4-classic'); history.replaceState(null, '', __TM_LOC__.pathname + '#vandaag'); location.reload(); });
      document.body.appendChild(b);
      const st = document.createElement('style');
      st.textContent = '#tm-classic,#tm-on-pill{display:none!important}';
      document.head.appendChild(st);
    };
    add();
  }

  /* Version 4.4 switched KU Leuven's "Remember my device" preference on for you. That sends a notification to the
     Authenticator instead of showing the "Open de app" button, so it is switched off again once (cookie removed).
     After that the box is yours: the script no longer touches it. */
  function forgetDevice() {
    try {
      if (localStorage.getItem('tm4-rd-cleared')) return;
      localStorage.setItem('tm4-rd-cleared', '1');
      localStorage.removeItem('tm4-autopush');
    } catch (_) { return; }
    try { document.cookie = '__Host-rememberDevice=; secure; samesite=none; path=/; max-age=0'; } catch (_) {}
  }

  /* "Log in via KU Leuven Authenticator" normally opens a second step with an "Open KU Leuven Authenticator app" button.
     iOS only lets a web page open another app from a real tap, so the script uses your tap on the first button for it:
     it fetches that second step itself (the same request the button would send), shows it, and in the same moment
     opens the app link from it (icts.kuleuven.be/apps/authenticator/…). You approve in the app and come back to a page
     that finishes the login by itself, as before. If anything is off (slow network, page changed), the normal second
     step simply appears, so you never end up worse off. Nothing is filled in: no username, no password. */
  const APP_LINK = /^https:\/\/icts\.kuleuven\.be\/apps\/authenticator\/[\w-]+$/;
  // ask KU Leuven for the second step (the same request the blue button sends) and pull the app link out of it
  function fetchStep2(form, b) {
    const body = new URLSearchParams(new FormData(form));
    body.append(b.name, b.value || '');
    return fetch(form.action, { method: 'POST', body, credentials: 'include', redirect: 'follow' })
      .then((r) => (r.ok ? r.text().then((html) => ({ html, url: r.url })) : Promise.reject(new Error('HTTP ' + r.status))))
      .then(({ html, url }) => {
        const doc2 = new DOMParser().parseFromString(html, 'text/html');
        const a = doc2.getElementById('btnMobileDevice');
        const app = a && a.getAttribute('href');
        const cont = doc2.getElementById('loginformnextauth');
        if (!app || !APP_LINK.test(app) || !cont) throw new Error('no app link');
        return { html, url, app, action: new URL(cont.getAttribute('action'), url || location.href).href };
      });
  }
  // show the second step (it waits for your approval and finishes by itself), and open the app if this is still your tap
  function showStep2(st, openApp) {
    ss.set('tm4-fa', JSON.stringify({ action: st.action, ts: Date.now() })); // see finishAfterApp
    if (st.url && new URL(st.url).origin === __TM_LOC__.origin) history.replaceState(null, '', st.url);
    document.open();
    document.write(st.html);
    document.close();
    loginSkin(true);
    if (openApp) __TM_GO__(st.app);
    finishAfterApp();
  }
  const plainSubmit = (form, b) => {
    const h = document.createElement('input');
    h.type = 'hidden'; h.name = b.name; h.value = b.value || '';
    form.appendChild(h);
    HTMLFormElement.prototype.submit.call(form);
  };

  /* Opening Toledo from the home screen while signed out: the KU Leuven page becomes one big "tap to open the
     Authenticator" screen. The next step is already fetched in the background, so the moment you tap (anywhere),
     the app opens. A tap is needed because iOS never lets a page open another app on its own. "Andere manier" gives
     you the normal KU Leuven page (password, QR code). */
  function quickLogin() {
    const form = document.getElementById('nextauthLoginForm');
    const b = document.getElementById('btnnextauthlogin');
    if (!form || !b || ss.get('tm4-ql-off')) return false;
    const rd = form.querySelector('[name="__Host-rememberDevice"]');
    if (rd && rd.checked) return false;
    if (Array.from(document.querySelectorAll('.alert-danger, .alert-warning')).some((el) => el.offsetParent !== null && el.id !== 'rss-status')) return false; // a message from KU Leuven: let you read it
    const last = Number(ss.get('tm4-ql-at')) || 0;
    if (Date.now() - last < 20e3) return false; // just tried: don't loop
    ss.set('tm4-ql-at', String(Date.now()));
    const ov = document.createElement('div');
    ov.id = 'tm4-ql';
    ov.setAttribute('role', 'button');
    ov.innerHTML = '<img src="https://stijl.kuleuven.be/shibboleth/images/authenticator.svg" alt=""><b>Inloggen</b><span class="q">Even geduld…</span><button type="button" class="other">Andere manier</button>';
    const css = document.createElement('style');
    css.textContent = '#tm4-ql{position:fixed;inset:0;z-index:2147483000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;background:var(--bg,#f2f2f7);color:var(--text,#000);font:17px -apple-system,system-ui,sans-serif;text-align:center;-webkit-tap-highlight-color:transparent}'
      + '#tm4-ql img{width:96px;height:96px;border-radius:22px;box-shadow:0 8px 24px rgba(0,0,0,.15)}#tm4-ql b{font-size:26px;margin-top:8px}'
      + '#tm4-ql .q{min-height:50px;display:flex;align-items:center;padding:0 22px;border-radius:14px;color:var(--sub,#6d6d72)}'
      + '#tm4-ql.ready .q{background:var(--accent,#0a6cd6);color:#fff;font-weight:600}'
      + '#tm4-ql .other{position:absolute;bottom:calc(28px + env(safe-area-inset-bottom));border:0;background:none;color:var(--accent,#0a6cd6);font:500 16px -apple-system,system-ui,sans-serif;padding:10px}';
    document.head.appendChild(css);
    document.body.appendChild(ov);
    let st = null, gone = false;
    const off = () => { gone = true; ov.remove(); };
    ov.querySelector('.other').addEventListener('click', (e) => {
      e.stopPropagation();
      ss.set('tm4-ql-off', '1');
      if (st) showStep2(st, false); else off(); // the second step has a "Go back" to the password login
    });
    ov.addEventListener('click', () => {
      if (gone) return;
      if (st) { gone = true; showStep2(st, true); return; }
      ov.querySelector('.q').textContent = 'Bezig…';
    });
    fetchStep2(form, b).then((v) => {
      if (gone) return;
      st = v;
      ov.classList.add('ready');
      ov.querySelector('.q').textContent = 'Tik om de Authenticator te openen';
    }, () => { if (!gone) plainSubmit(form, b); }); // fetching failed: take the normal route (the button you would press)
    return true;
  }

  /* Your own tap on "Log in via KU Leuven Authenticator": fetch the second step and open the app from that same tap
     (iOS only opens another app from a real tap). If anything is off, the normal second step simply appears. */
  function fastAuthenticator() {
    let busy = false;
    W.addEventListener('click', (e) => {
      const b = e.target && e.target.closest && e.target.closest('#btnnextauthlogin');
      const form = b && b.form;
      if (!form || busy || e.defaultPrevented) return;
      const rd = form.querySelector('[name="__Host-rememberDevice"]');
      if (rd && rd.checked) return; // you chose the notification route yourself: leave it alone
      e.preventDefault();
      e.stopImmediatePropagation();
      busy = true;
      const t0 = Date.now();
      fetchStep2(form, b).then((v) => showStep2(v, Date.now() - t0 < 900)).catch(() => { busy = false; plainSubmit(form, b); });
    }, true);
    const ql = () => { try { quickLogin(); } catch (_) {} };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ql, { once: true }); else ql();
  }

  /* Back from the Authenticator app: KU Leuven's page should notice the approval by itself, but iOS pauses it while
     you are in the app (and sometimes reloads it as an empty page). So once you are back, the script presses KU Leuven's
     own "Click this button after you signed in with the app" for you: the same request, sent to the same step. */
  function finishAfterApp() {
    const saved = () => { try { const v = JSON.parse(ss.get('tm4-fa') || 'null'); return v && Date.now() - v.ts < 10 * 60e3 ? v : null; } catch (_) { return null; } };
    const go = () => {
      const v = saved();
      if (!v || new URL(v.action).origin !== __TM_LOC__.origin) return;
      ss.del('tm4-fa');
      const f = document.getElementById('loginformnextauth') || (() => {
        const n = document.createElement('form');
        n.method = 'post';
        n.innerHTML = '<input type="hidden" name="_eventId_proceed" value="">';
        (document.body || document.documentElement).appendChild(n);
        return n;
      })();
      f.setAttribute('action', f.id ? f.getAttribute('action') || v.action : v.action);
      HTMLFormElement.prototype.submit.call(f);
    };
    let away = document.visibilityState === 'hidden';
    const back = () => {
      if (document.visibilityState === 'hidden') { away = true; return; }
      if (away) setTimeout(() => { if (document.visibilityState === 'visible') go(); }, 1200); // KU Leuven's page gets a moment first
    };
    document.addEventListener('visibilitychange', back);
    W.addEventListener('pageshow', (e) => { if (e.persisted) { away = true; back(); } });
  }

  /* iOS reloaded the page while you were in the app (it then comes back empty, or as the waiting step again):
     finish the login from the saved step. The saved step only exists after the app was opened by fastAuthenticator. */
  function emptyAfterApp() {
    let v = null;
    try { v = JSON.parse(ss.get('tm4-fa') || 'null'); } catch (_) {}
    if (!v || Date.now() - v.ts > 10 * 60e3) return;
    const check = () => {
      if (document.getElementById('nextauthLoginForm') || document.querySelector('input[name="SAMLResponse"]')) { ss.del('tm4-fa'); return; }
      const wait = document.getElementById('loginformnextauth');
      if (!wait && document.body && document.body.innerText.trim().length > 40) return; // a real page (e.g. an error): leave it
      ss.del('tm4-fa');
      const n = wait || document.createElement('form');
      n.method = 'post';
      if (!wait) n.action = v.action;
      if (!wait) { n.innerHTML = '<input type="hidden" name="_eventId_proceed" value="">'; (document.body || document.documentElement).appendChild(n); }
      HTMLFormElement.prototype.submit.call(n);
    };
    if (document.readyState === 'complete') setTimeout(check, 600); else W.addEventListener('load', () => setTimeout(check, 600), { once: true });
  }

  /* The last step of a login is an empty-looking page that passes the result to Toledo / KU Loket by itself.
     If iOS paused it (you were in the app), it can stay white: send it on once you look at it again. */
  function nudgeSamlPost() {
    let sent = false;
    const nudge = () => {
      const i = document.querySelector('form input[name="SAMLResponse"]');
      if (sent || !i || document.visibilityState !== 'visible') return;
      sent = true;
      HTMLFormElement.prototype.submit.call(i.form);
    };
    W.addEventListener('beforeunload', () => { sent = true; }); // the page sent it itself: never twice
    const later = () => setTimeout(nudge, 1500);
    if (document.readyState === 'complete') later(); else W.addEventListener('load', later, { once: true });
    document.addEventListener('visibilitychange', later);
    W.addEventListener('pageshow', later);
  }

  /* KU Leuven sign-in page (idp.kuleuven.be): a new look, and the Authenticator app opened straight from your tap */
  /* "Stale Request": the KU Leuven login page you came back to (back button, or a tab reopened later) was already used.
     Nothing to do there: start again from where you were going, which signs you in afresh (usually without a password). */
  function staleLogin() {
    const check = () => {
      const b = document.body;
      if (!b || !/stale request|verouderd verzoek|verlopen aanvraag/i.test(b.innerText || '')) return;
      const ref = hostOf(document.referrer);
      const to = /^webwsp\./.test(ref) ? LOKET : /kuleuven\.cloud$/.test(ref) ? ULTRA + '/ultra/course' : PORTAL + '?tm=vandaag';
      cover('Opnieuw verbinden\u2026');
      setTimeout(() => __TM_REPL__(to), 150);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', check, { once: true }); else check();
  }
  function loginSkin(again) {
    if (!again) { forgetDevice(); fastAuthenticator(); emptyAfterApp(); nudgeSamlPost(); staleLogin(); }
    const r = document.documentElement;
    r.classList.add('tm4-login');
    const st = document.createElement('style');
    st.textContent = LOGIN_CSS;
    (document.head || r).appendChild(st);
    const finish = () => {
      applyTheme(THEME);
      const vp = document.querySelector('meta[name="viewport"]');
      if (vp && !/viewport-fit/.test(vp.content)) vp.content += ', viewport-fit=cover';
      if (document.head && st.parentNode !== document.head) document.head.appendChild(st);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', finish, { once: true }); else finish();
  }
  /* ================================================================== Attesten (KU Loket "Selfservice attesten", zr_0202)
     KU Loket never hands out the PDF itself: asking for an attest makes it mail the PDF straight to your student
     mailbox. So the app lists what you can ask for, and one tap ("Mail naar mij") does what KU Loket's form does:
     a MERGE of that AttestationRequestSet entry (with the English flag). Opened from Meer as LOKET?tm=attest. */
  const ATT_SRV = `${LOKET_ORIGIN}/sap/opu/odata/sap/ZC_ST_ATTESTEN_SRV`;
  // the order and a plain-language line for the ones we know; anything new KU Loket adds still shows up at the end
  const ATT_KNOWN = {
    'Insch_bewijs': ['Inschrijvingsbewijs', 'Voor je kotbaas, de gemeente of je werk'],
    'Insch_bewijs_stp': ['Inschrijvingsbewijs met studiepunten', 'Met je studiepunten, zodra je ISP is goedgekeurd'],
    'NMBS': ['Attest voor NMBS', 'Voor een schoolabonnement of Campus Pass'],
    'Betalingsbewijs': ['Betalingsbewijs', 'Bewijs dat je studiegeld betaald is'],
    'Attest Vlaams Opleidingsverlof': ['Vlaams opleidingsverlof', 'Voor je werkgever, als je werkt en studeert'],
    'Studiecurriculum': ['Studiecurriculum', 'Je inschrijvingen aan KU Leuven op een rij'],
    'Transcript': ['Transcript', 'Al je examenresultaten'],
    'Creditbewijs': ['Creditbewijs', 'De vakken waarvoor je geslaagd bent'],
    'Diplomagetuigschrift': ['Diplomagetuigschrift', 'Bewijs dat je je diploma behaald hebt'],
  };
  const ATT_ORDER = Object.keys(ATT_KNOWN);

  function attestPage() {
    takeover('Attesten', []);
    const meer = PORTAL + '?tm=meer';
    buildShell([
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: meer },
    ], 'meer');
    setNav({ back: { label: 'Meer', act: 'back', href: meer }, title: 'Attesten' });
    if (params.get('ma')) store.set('mailApp', params.get('ma') === 'web' ? 'web' : 'app');
    const orig = `${LOKET}?tm=orig#zr_0202-display`;
    const main = $('#tm-main');
    const sec = document.createElement('section');
    sec.className = 'view on';
    sec.setAttribute('data-tm4', '');
    main.appendChild(sec);
    watchTitle(sec);

    const yrTxt = (y) => (/^\d{4}$/.test(y) && y !== '0000' ? `${y}–${Number(y) + 1}` : '');
    const progTxt = (p) => String(p || '').trim().replace(/\s*\((Leuven|Brussel|Gent|Kortrijk|Antwerpen|Brugge|Geel|Diepenbeek|Aalst|Sint-Katelijne-Waver)\)$/, '');
    const plain = (html) => { const d = document.createElement('div'); d.innerHTML = sanitize(html); return d.textContent.replace(/^\s*ℹ️?\s*/, '').replace(/\s+/g, ' ').trim(); };
    const sentKey = (o) => `att:sent:${o.kind}|${o.prog}|${o.yr}`;
    const dayTxt = (ts) => { const d = new Date(ts), t = new Date(); const diff = Math.round((new Date(t.toDateString()) - new Date(d.toDateString())) / 864e5); return diff === 0 ? 'vandaag' : diff === 1 ? 'gisteren' : `${d.getDate()}/${d.getMonth() + 1}`; };

    // every entry KU Loket offers -> one row per kind of attest, its years/programmes as choices inside
    function groupsOf(list) {
      const seen = new Set();
      const kinds = {};
      list.forEach((x) => {
        const o = { id: String(x.attestRequestId), type: String(x.attestationType || ''), kind: String(x.attestationKind || '').trim(), desc: String(x.attestationDescription || '').trim(),
          info: String(x.attestationLongText || ''), yr: String(x.academicYear || ''), prog: String(x.programme || ''), progT: progTxt(x.programmeDescription), en: !!x.translationVisible, raw: x };
        const k = `${o.kind}|${o.yr}|${o.prog}`;
        if (!o.kind || seen.has(k)) return; // KU Loket sometimes lists the same transcript twice
        seen.add(k);
        (kinds[o.kind] = kinds[o.kind] || []).push(o);
      });
      const out = Object.keys(kinds).map((kind) => {
        const opts = kinds[kind].sort((a, b) => b.yr.localeCompare(a.yr) || b.prog.localeCompare(a.prog));
        const known = ATT_KNOWN[kind];
        const title = known ? known[0] : opts[0].desc || kind;
        // KU Loket's text often starts by repeating the name ("Inschrijvingsbewijs. Dit kan je ...")
        const info = plain((opts.find((o) => o.info) || {}).info).replace(new RegExp('^(' + [opts[0].desc, title].filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')\\.\\s*', 'i'), '');
        return { kind, type: opts[0].type, title, hint: known ? known[1] : '', info: info ? info[0].toUpperCase() + info.slice(1) : '', opts };
      });
      const pos = (g) => { const i = ATT_ORDER.indexOf(g.kind); return i < 0 ? 99 : i; };
      out.sort((a, b) => pos(a) - pos(b) || a.title.localeCompare(b.title));
      return out;
    }

    let GROUPS = [];
    function draw(list) {
      GROUPS = groupsOf(list);
      let h = `<div class="lt"><h1>Attesten</h1><p class="lt-sub">KU Loket mailt het attest meteen als pdf naar je studentenmail.</p></div>`;
      if (!GROUPS.length) { put(sec, h + empty('cert', 'Geen attesten', 'KU Loket biedt je nu geen attesten aan.', `<p style="margin-top:14px"><a class="btn" href="${esc(orig)}">Open in KU Loket</a></p>`)); return; }
      const section = (name, gs) => (gs.length ? `<div class="gh">${esc(name)}</div><div class="group">${gs.map((g) => {
        const last = g.opts.map((o) => store.get(sentKey(o))).filter(Boolean).sort((a, b) => b - a)[0];
        const sub = last ? `Gemaild ${dayTxt(last)}` : g.hint || (g.opts.length === 1 ? [yrTxt(g.opts[0].yr), g.opts[0].progT].filter(Boolean).join(' · ') : '');
        return row({ act: 'att', attrs: ` data-k="${esc(g.kind)}"`, iconHtml: `<span class="ic" style="--c:#8e5bd6">${ico('cert')}</span>`, title: g.title, sub });
      }).join('')}</div>` : '');
      h += section('Inschrijving', GROUPS.filter((g) => g.type !== '2'));
      h += section('Resultaten en diploma’s', GROUPS.filter((g) => g.type === '2'));
      h += `<p class="fresh">Komt er geen mail? Kijk ook bij ongewenste e-mail.<br><a href="${esc(orig)}">Open in KU Loket</a></p>`;
      put(sec, h);
    }

    // the sheet for one attest: pick the year/programme (newest first, already chosen) and the language, then send
    function open(g) {
      let pick = 0, en = false, all = g.opts.length <= 3;
      const opt = () => g.opts[pick];
      const optLabel = (o) => [yrTxt(o.yr), o.progT].filter(Boolean).join(' · ') || 'Algemeen';
      const body = () => {
        let h = `<div class="at-hd"><span class="ic" style="--c:#8e5bd6">${ico('cert')}</span><b>${esc(g.title)}</b>${g.info ? `<p>${esc(g.info)}</p>` : ''}</div>`;
        if (g.opts.length > 1) h += `<div class="at-l">${/\d/.test(g.opts.map((o) => yrTxt(o.yr)).join('')) ? 'Academiejaar' : 'Opleiding'}</div><div class="at-opts">${g.opts.slice(0, all ? 99 : 2).map((o, i) => `<button type="button" class="at-o${i === pick ? ' on' : ''}" data-o="${i}"><span><b>${esc(yrTxt(o.yr) || o.progT || 'Algemeen')}</b>${yrTxt(o.yr) && o.progT ? `<small>${esc(o.progT)}</small>` : ''}</span>${i === pick ? ico('check') : ''}</button>`).join('')}${all ? '' : `<button type="button" class="at-o at-more" data-all="1"><span>Oudere jaren (${g.opts.length - 2})</span>${ico('more')}</button>`}</div>`;
        else h += `<p class="at-one">${esc(optLabel(opt()))}</p>`;
        if (opt().en) h += `<div class="at-l">Taal</div><div class="at-seg"><button type="button" data-en="0"${en ? '' : ' class="on"'}>Nederlands</button><button type="button" data-en="1"${en ? ' class="on"' : ''}>Engels</button></div>`;
        h += `<button type="button" class="btn at-go">${ico('mail')}Mail naar mij</button><p class="at-note">Je krijgt het als pdf in je studentenmail, binnen een 5-tal minuten.</p>`;
        return h;
      };
      const { sh, close } = openLayer(`<div class="sg at-sh"></div><div class="sg"><button type="button" class="sa bold" data-x="1">Annuleer</button></div>`, '', g.title);
      const box = sh.querySelector('.at-sh');
      put(box, body());
      let busy = false;
      sh.addEventListener('click', (e) => {
        const t = e.target.closest('button');
        if (!t || busy) return;
        if (t.dataset.x) { close(); return; }
        if (t.dataset.all) { all = true; put(box, body()); return; }
        if (t.dataset.o) { pick = Number(t.dataset.o) || 0; if (!opt().en) en = false; put(box, body()); return; }
        if (t.dataset.en) { en = t.dataset.en === '1'; put(box, body()); return; }
        if (t.dataset.mail) { close(); mailOpen(); return; }
        if (t.classList.contains('at-go')) {
          busy = true;
          t.disabled = true;
          t.innerHTML = '<span class="spin"></span>Versturen…';
          send(opt(), en).then(() => {
            busy = false;
            store.set(sentKey(opt()), Date.now());
            put(box, `<div class="at-ok">${ico('check')}<b>Verstuurd</b><p>${esc(g.title)}${optLabel(opt()) !== 'Algemeen' ? ' (' + esc(optLabel(opt())) + ')' : ''} komt naar je studentenmail. Het kan tot een 5-tal minuten duren voor het in je mailbox staat.</p><button type="button" class="btn" data-mail="1">${ico('mail')}Open mail</button></div>`);
            sh.querySelector('[data-x]').textContent = 'Klaar';
            draw(LIST);
          }, (err) => {
            busy = false;
            put(box, body());
            const p = document.createElement('p');
            p.className = 'at-err';
            p.textContent = err && err.auth ? 'Je bent afgemeld bij KU Loket. Sluit dit en tik op "Aanmelden".' : `Versturen lukte niet${err && err.msg ? ': ' + err.msg : ''}. Probeer het opnieuw.`;
            box.insertBefore(p, box.querySelector('.at-go'));
            if (err && err.auth) signedOut();
          });
        }
      });
    }

    // what KU Loket's own form does on "Verzenden": update that entry (fresh CSRF token first)
    async function send(o, en) {
      const tk = await fetch(`${ATT_SRV}/?sap-client=200`, { method: 'HEAD', credentials: 'include', headers: { 'X-CSRF-Token': 'Fetch' } });
      const token = tk.headers.get('x-csrf-token');
      if (!token || /required/i.test(token)) { const e = new Error('csrf'); e.auth = tk.status === 401 || /html/.test(tk.headers.get('content-type') || ''); throw e; }
      const body = Object.assign({}, o.raw, { translation: !!en });
      delete body.__metadata;
      const r = await fetch(`${ATT_SRV}/AttestationRequestSet('${encodeURIComponent(o.id)}')?sap-client=200`, {
        method: 'POST', credentials: 'include',
        headers: { 'X-HTTP-Method': 'MERGE', 'X-CSRF-Token': token, 'Content-Type': 'application/json', Accept: 'application/json', 'sap-language': 'NL' },
        body: JSON.stringify(body),
      });
      if (r.ok) return;
      let msg = '';
      try { const j = await r.json(); msg = ((j.error || {}).message || {}).value || ''; } catch (_) {}
      const e = new Error(msg || 'HTTP ' + r.status);
      e.msg = msg.slice(0, 140);
      e.auth = r.status === 401;
      throw e;
    }

    // the mail app the person picked in Toledo Mobile (passed along from Meer, this is another site)
    function mailOpen() {
      if (store.get('mailApp') === 'web') { goTo(MAIL); return; }
      __TM_GO__('ms-outlook://emails');
    }

    function signedOut() {
      put(sec, `<div class="lt"><h1>Attesten</h1></div>${empty('lock', 'Aanmelden bij KU Loket', 'Je KU Loket-sessie is verlopen.', `<p style="margin-top:14px"><button type="button" class="btn" data-act="attlogin">Aanmelden</button></p><p class="fresh"><a href="${esc(orig)}">Open in KU Loket</a></p>`)}`);
    }

    let LIST = [];
    const KEY = 'att:list';
    const cached = store.get(KEY);
    if (cached && cached.v) { LIST = cached.v; draw(LIST); } else put(sec, `<div class="lt"><h1>Attesten</h1><p class="lt-sub">KU Loket mailt het attest meteen als pdf naar je studentenmail.</p></div><div class="gh">Inschrijving</div>${skGroup(4)}`);
    api(`${ATT_SRV}/AttestationRequestSet?$format=json&sap-client=200&sap-language=NL`).then((j) => {
      LIST = ((j && j.d && j.d.results) || []).map((x) => { const y = Object.assign({}, x); return y; });
      store.set(KEY, { ts: Date.now(), v: LIST });
      ss.del('tm4-att-pass');
      draw(LIST);
    }, (e) => {
      if (e && e.auth) { signedOut(); return; }
      if (cached && cached.v) return;
      put(sec, `<div class="lt"><h1>Attesten</h1></div>${empty('warn', 'Attesten konden niet geladen worden', 'KU Loket reageert nu niet. Probeer het zo opnieuw.', `<p style="margin-top:14px"><button type="button" class="btn" data-act="attlogin">Opnieuw</button></p><p class="fresh"><a href="${esc(orig)}">Open in KU Loket</a></p>`)}`);
    });

    W.addEventListener('click', (e) => {
      const b = e.target.closest && e.target.closest('[data-act="back"]');
      if (b) { e.preventDefault(); goTo(meer, { dir: 'back' }); return; }
      const t = e.target.closest && e.target.closest('#tm-tabs a');
      if (t) { e.preventDefault(); goTo(t.getAttribute('href'), { dir: 'back' }); return; }
      const a = e.target.closest && e.target.closest('[data-act="att"]');
      if (a) { const g = GROUPS.find((x) => x.kind === a.dataset.k); if (g) open(g); return; }
      if (e.target.closest && e.target.closest('[data-act="attlogin"]')) {
        // let KU Loket's own page sign you in once, then come back here (see attestPass in main.js)
        ss.set('tm4-att-pass', JSON.stringify({ ts: Date.now(), n: 0 }));
        __TM_REPL__(`${LOKET}?tm=attest`);
      }
    }, true);
  }

  /* signing in again: KU Loket's own page does the sign-in (it must not be taken over meanwhile); once a normal
     KU Loket page loads, go back to the Attesten screen */
  function attestPass() {
    let p = {};
    try { p = JSON.parse(ss.get('tm4-att-pass') || '{}'); } catch (_) {}
    const dark = isDark();
    const st = document.createElement('style');
    st.textContent = `html{background:${dark ? '#000' : '#f2f2f7'}!important}html::after{content:"Aanmelden bij KU Loket\\2026";position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:${dark ? '#000' : '#f2f2f7'};color:${dark ? '#98989f' : '#6d6d72'};font:600 17px -apple-system,system-ui,sans-serif}`;
    (document.head || document.documentElement).appendChild(st);
    whenParsed(() => {
      if (signInStep()) return; // on its way to the KU Leuven login; the page after it comes back here
      ss.set('tm4-att-pass', JSON.stringify({ ts: p.ts || Date.now(), n: (p.n || 0) + 1, done: 1 }));
      __TM_REPL__(`${LOKET}?tm=attest`);
    });
  }
  /* ================================================================== KURT (study places) */
  // kurt3.ghum.kuleuven.be is KU Leuven's study place booking app (Angular, JSON API under /api/, same origin, signed in
  // through the KU Leuven login). The app rebuilds it: your bookings and the libraries with live occupancy first, a
  // library shows its rooms with how many seats are free at the chosen hour, and a room opens straight on its floor
  // plan: tap a green seat, pick until when, book. Things the app doesn't cover (group rooms, laptops, check-in)
  // open KURT's own pages (?tm=orig).
  // your bookings that haven't ended yet, short, for the Agenda tab on the portal
  function krList(list) {
    const now = Date.now();
    return (Array.isArray(list) ? list : []).filter((r) => r && r.id != null && r.startDate && r.endDate && (String(r.endTime).slice(0, 5) === '00:00' ? fromYmd(r.endDate, '24:00') : fromYmd(r.endDate, r.endTime)) > now)
      .slice(0, 20).map((r) => ({ id: String(r.id), sd: r.startDate, st: String(r.startTime).slice(0, 5), ed: r.endDate, et: String(r.endTime).slice(0, 5), n: String(r.resourceName || '') }));
  }
  // the Agenda opens KURT in a hidden frame (?tm=krb, same site so you're signed in): read the bookings and hand them over
  function kurtBridge() {
    const say = (m) => { try { W.parent.postMessage(Object.assign({ tm4: 'kr' }, m), PORTAL_ORIGIN); } catch (_) {} };
    fetch(__TM_LOC__.origin + '/api/reservations', { credentials: 'include', cache: 'no-store', headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
      .then((list) => { if (!Array.isArray(list)) throw new Error('geen lijst'); store.set('kurt:res', { ts: Date.now(), v: list }); say({ ok: true, list: krList(list) }); })
      .catch(() => say({ ok: false }));
  }
  function kurtApp() {
    const K = __TM_LOC__.origin;
    const ORIG = (p) => K + (p || '/') + ((p || '/').includes('?') ? '&' : '?') + 'tm=orig';
    takeover('Studieplek', []);
    buildShell([
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: PORTAL + '?tm=meer' },
    ], 'meer');
    const main = $('#tm-main');
    const sec = document.createElement('section');
    sec.className = 'view on';
    sec.setAttribute('data-tm4', '');
    main.appendChild(sec);
    keepAlive('kurt', [[K + '/api/information']]);

    /* ---------- data */
    const get = (p) => api(K + '/api' + p, { cache: 'no-store' });
    const send = async (method, p, body) => {
      const r = await fetch(K + '/api' + p, { method, credentials: 'include', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
      const txt = await r.text();
      let j = null; try { j = txt ? JSON.parse(txt) : null; } catch (_) {}
      if (!r.ok) { const e = new Error((typeof j === 'string' && j) || (j && (j.detail || j.message || j.title || j.error)) || txt.slice(0, 200) || 'HTTP ' + r.status); e.status = r.status; throw e; }
      return j;
    };
    let ME = store.get('kurt:me');
    const meP = get('/information').then((m) => { ME = m; store.set('kurt:me', m); return m; });
    // not signed in: KURT's own /login sends you through the KU Leuven login and back here
    const signIn = () => {
      const last = Number(ss.get('tm4-kurt-login')) || 0;
      if (Date.now() - last > 60e3) { ss.set('tm4-kurt-login', String(Date.now())); __TM_REPL__(K + '/login?returnUrl=' + encodeURIComponent(location.href)); return true; }
      return false;
    };
    meP.catch((e) => {
      if ((e && e.auth) || (e instanceof TypeError)) {
        if (!signIn()) put(sec, empty('lock', 'Niet aangemeld bij KURT', 'Meld je aan met je KU Leuven-account.', `<p style="margin-top:14px"><a class="btn" href="${esc(K + '/login?returnUrl=' + encodeURIComponent(location.href))}">Aanmelden</a></p>`));
      }
    });

    const nm = (s) => String(s || '').replace(/^.*? - /, '').replace(/\bSilent Study Seat\b/i, 'Plaats').replace(/\bStudy Seat\b/i, 'Plaats').replace(/\bSeat\b/i, 'Plaats').trim() || s;
    const seatNo = (s) => (/(\d+[A-Za-z]?)\s*$/.exec(String(s || '')) || [])[1] || nm(s);
    const NL_TYPES = { 302: 'Studieplek', 303: 'Collectieplek', 1: 'Groepswerkruimte', 307: 'Videocallplek', 55: 'Mediaruimte', 12: 'Laptop', 11: 'Audiokit', 22: 'Pentablet', 48: 'Podcastset', 13: 'Projectorkit', 14: 'Videokit', 15: 'Webconferentiekit', 101: 'Databank-pc', 52: 'Bibliotheekspel', 56: 'Studio', 21: 'Camerakit' };
    const NL_TAGS = { 'power socket nearby': 'Stopcontact', silence: 'Stilte', 'adjustable desk': 'Verstelbaar bureau', 'desk lamp': 'Bureaulamp', window: 'Aan het raam', screen: 'Scherm' };
    const NL_CITY = { Leuven: 'Leuven', Antwerp: 'Antwerpen', Bruges: 'Brugge', Brussels: 'Brussel', Kortrijk: 'Kortrijk', 'Learning Lab': 'Learning Lab' };
    const hours = (s) => { const m = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/.exec(String(s || '')); return m ? `${m[1]}:${m[2]}–${m[3]}:${m[4]}` : ''; };
    // where today's opening hours stand right now: before opening, open, closing within the hour, or closed again
    const openNow = (l, now = new Date()) => {
      if (l.closedToday || /closed/i.test(l.openingHoursToday || '')) return { closed: true, txt: 'Vandaag gesloten' };
      const m = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/.exec(String(l.openingHoursToday || ''));
      if (!m) return { closed: false, txt: '' };
      const from = +m[1] * 60 + +m[2];
      let to = +m[3] * 60 + +m[4];
      if (to <= from) to += 24 * 60; // open past midnight
      const t = now.getHours() * 60 + now.getMinutes();
      const end = `${m[3]}:${m[4]}`;
      if (t < from) return { closed: false, txt: `Opent om ${m[1]}:${m[2]} (tot ${end})` };
      if (t >= to) return { closed: true, txt: 'Nu gesloten' };
      if (to - t <= 60) return { closed: false, txt: `Open · sluit om ${end}` };
      return { closed: false, txt: 'Open ' + hours(l.openingHoursToday) };
    };
    const openTxt = (l) => openNow(l).txt;
    const isClosed = (l) => openNow(l).closed;
    const toMin = (t) => { const [h, m] = String(t).split(':').map(Number); return h * 60 + (m || 0); };
    const hm = (min) => pad(Math.floor(min / 60)) + ':' + pad(min % 60);
    const dur = (min) => (min % 60 ? `${Math.floor(min / 60)} u ${min % 60}` : `${min / 60} u`);
    const dayLbl = (v) => { const t = fromYmd(v); const n = dayDiff(t, Date.now()); return n === 0 ? 'Vandaag' : n === 1 ? 'Morgen' : cap(dShort(t)); };
    const enDate = (v) => new Date(fromYmd(v)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', '');
    const occBar = (o) => {
      if (!o || !o.capacity) return '';
      const p = Math.min(100, Math.round((o.occupancy / o.capacity) * 100));
      return `<span class="ko-bar${p >= 90 ? ' full' : p >= 70 ? ' busy' : ''}"><i style="width:${p}%"></i></span>`;
    };
    const occTxt = (o) => (o && o.capacity ? (o.closed ? 'gesloten' : `${Math.max(0, o.capacity - o.occupancy)} van ${o.capacity} vrij`) : '');
    const favs = () => store.get('kurt:fav') || [];
    const seatFavs = () => store.get('kurt:seats') || [];
    const isSeatFav = (rid) => seatFavs().some((f) => f.rid === rid);
    const GROUP = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.2" r="3.2"/><path d="M3.2 19.6c.5-3.4 2.9-5.4 5.8-5.4s5.3 2 5.8 5.4"/><circle cx="16.8" cy="9.2" r="2.5"/><path d="M15.6 14.4c2.6-.5 4.7 1.2 5.2 4.4"/></svg>';
    const TRASH = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.8h15M9.5 6.8V4.6h5v2.2M6.6 6.8l.9 12.4a1.6 1.6 0 0 0 1.6 1.5h5.8a1.6 1.6 0 0 0 1.6-1.5l.9-12.4M10.2 10.6v6.4M13.8 10.6v6.4"/></svg>';
    const STAR = (on) => `<svg class="i kstar${on ? ' on' : ''}" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z"/></svg>`;
    // known rooms (from the libraries you opened): id -> { l: library, n: name, t: resource types }, so a floor plan opens without asking KURT first
    const ZONES = store.get('kurt:zones') || {};
    const keepZones = (lid, zones) => { (zones || []).forEach((z) => { ZONES[z.id] = { l: Number(lid), n: (z.name || '').trim(), t: z.resourceTypeIds || [] }; }); store.set('kurt:zones', ZONES); };
    // answers KURT gave a moment ago are reused while you move between screens and when the page is opened again
    // (library -> floor plan opens at once). Kept in memory and in sessionStorage; cleared after booking or cancelling.
    const MEM = new Map();
    const MK = 'tm4-km:';
    const memo = (key, maxAge, fn) => {
      const c = MEM.get(key);
      if (c && Date.now() - c.ts < maxAge) return c.p;
      try {
        const sv = JSON.parse(sessionStorage.getItem(MK + key) || 'null');
        if (sv && Date.now() - sv.ts < maxAge) { const pv = Promise.resolve(sv.v); MEM.set(key, { ts: sv.ts, p: pv }); return pv; }
      } catch (_) {}
      const ts = Date.now();
      const pr = fn().then((v) => { try { sessionStorage.setItem(MK + key, JSON.stringify({ ts, v })); } catch (_) {} return v; });
      MEM.set(key, { ts, p: pr });
      pr.catch(() => MEM.delete(key));
      return pr;
    };
    const memoClear = () => {
      MEM.clear();
      try { Object.keys(sessionStorage).filter((k) => k.startsWith(MK)).forEach((k) => sessionStorage.removeItem(k)); } catch (_) {}
    };
    const parFor = (lid, types) => memo(`par:${lid}:${mainType(types)}`, 10 * 60e3, () => get(`/parameters?locationId=${lid}&resourceTypeId=${mainType(types)}`));
    const zoneAvail = (lid, zid, d, t) => memo(`za:${zid}:${d}:${t}`, 90e3, () => get(`/zoneavailabilities?locationId=${lid}&zoneId=${zid}&startDate=${d}&startTime=${t}`));
    // when do you want to come? One choice for the whole app (this visit); "Nu" = the first hour you can still book
    const WHEN = {
      get() { try { const w = JSON.parse(ss.get('tm4-kurt-when') || 'null'); return w && w.d >= ymd(Date.now()) ? w : null; } catch (_) { return null; } },
      set(w) { if (w) ss.set('tm4-kurt-when', JSON.stringify(w)); else ss.del('tm4-kurt-when'); },
    };

    /* ---------- router: #/ home, #/l/<location>, #/z/<zone>[?seat=<resource>], #/g/<location>[?d=<day>] group rooms,
       #/s/<reservation> find my seat */
    // KURT's own addresses (/locations/10, /zone/1) become the app's
    // Groepswerken (on Toledo) hands over a group: ?tmg=<name>&tmm=<email,email>. It opens #/gk (pick a library), then
    // KURT's normal group-room steps; the booking sheet adds the whole group at once. The group is only "active" during
    // that trip (sessionStorage tm4-kurt-g, dropped as soon as you go elsewhere in Studieplek). It is also kept in
    // kurt:groups, so the booking sheet can offer it later when you start from Studieplek yourself.
    const GRPS = () => store.get('kurt:groups') || [];
    {
      const sp = new URLSearchParams(__TM_LOC__.search);
      // all your groups (Toledo hands them over: name~course~e-mail,e-mail!...), so the booking sheet can offer every one
      const all = sp.get('tmgs');
      if (all != null) {
        const list = String(all).split('!').map((x) => { const [n, c, m] = x.split('~'); const mm2 = String(m || '').split(',').map((y) => y.trim().toLowerCase()).filter((y) => /^[^@\s]+@[^@\s]+$/.test(y)).slice(0, 12); return n && mm2.length ? { n: n.slice(0, 60), c: String(c || '').slice(0, 80), m: mm2, id: (String(c || '') + '|' + n).toLowerCase() } : null; }).filter(Boolean).slice(0, 12);
        store.set('kurt:groups', list);
        if (!sp.get('tmm')) { try { history.replaceState(null, '', K + '/' + (location.hash || '#/')); } catch (_) {} }
      }
      const mm = (sp.get('tmm') || '').split(',').map((x) => x.trim().toLowerCase()).filter((x) => /^[^@\s]+@[^@\s]+$/.test(x)).slice(0, 12);
      if (mm.length) {
        const g = { n: (sp.get('tmg') || 'Groep').slice(0, 60), m: mm, c: (sp.get('tmc') || '').slice(0, 80), ts: Date.now() };
        g.id = (g.c + '|' + g.n).toLowerCase();
        store.set('kurt:groups', [g].concat(GRPS().filter((x) => x.id !== g.id)).slice(0, 8));
        ss.set('tm4-kurt-g', g.id);
        if (/^https:\/\/ultra\.edu\.kuleuven\.cloud\//.test(document.referrer)) ss.set('tm4-kurt-gback', document.referrer); else ss.del('tm4-kurt-gback');
        try { history.replaceState(null, '', K + '/#/gk'); } catch (_) {}
      }
    }
    const activeGrp = () => { const id = ss.get('tm4-kurt-g'); return id ? GRPS().find((x) => x.id === id) || null : null; };
    {
      const m = /^\/(locations|zone)\/(\d+)/.exec(__TM_LOC__.pathname);
      const r = m ? `#/${m[1] === 'zone' ? 'z' : 'l'}/${m[2]}` : (/^#\//.test(location.hash) ? location.hash : '#/');
      try { history.replaceState(null, '', K + '/' + r); } catch (_) {}
    }
    const route = () => {
      const h = location.hash.replace(/^#/, '') || '/';
      const [path, q] = h.split('?');
      const p = path.split('/').filter(Boolean);
      return { name: p[0] || 'home', id: p[1] || '', q: new URLSearchParams(q || '') };
    };
    let depth = 0;
    const nav = (hash) => { depth++; location.hash = hash; };
    const back = () => { if (depth > 0) { depth--; history.back(); } else { const r = route(); __TM_REPL__(K + '/' + (r.name === 'z' && zoneLoc[r.id] ? '#/l/' + zoneLoc[r.id] : r.name === 'g' ? (activeGrp() ? '#/gk' : '#/l/' + r.id) : '#/')); } };
    const zoneLoc = store.get('kurt:zl') || {};
    let token = 0, keepY = 0;
    const show = (anim) => {
      const my = ++token;
      const r = route();
      if (r.name !== 'g' && r.name !== 'gk') ss.del('tm4-kurt-g'); // the group from Groepswerken doesn't stay behind in Studieplek
      closeBook();
      document.body.classList.toggle('kfull', r.name === 'z' || r.name === 's');
      sec.classList.remove('push', 'pop');
      if (anim) { void sec.offsetWidth; sec.classList.add(anim); }
      W.scrollTo(0, keepY); keepY = 0;
      if (r.name === 'l') viewLoc(r.id, my);
      else if (r.name === 'z') viewZone(r.id, r.q, my);
      else if (r.name === 's') viewFind(r.id, my);
      else if (r.name === 'g') viewGroup(r.id, r.q, my);
      else if (r.name === 'gk' && activeGrp()) viewGk(my);
      else viewHome(my);
    };
    let lastLen = history.length, quiet = false;
    W.addEventListener('hashchange', () => { show(quiet ? '' : history.length > lastLen ? 'push' : 'pop'); quiet = false; lastLen = history.length; });
    // back in Safari after a while: occupancy and "open / gesloten" are stale, so draw the list again where you were
    let hiddenAt = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') { hiddenAt = Date.now(); return; }
      const r = route();
      if (!hiddenAt || Date.now() - hiddenAt < 3 * 60e3 || !['home', 'l'].includes(r.name) || $('.kb.on')) return;
      hiddenAt = 0;
      keepY = W.scrollY;
      show('');
    });

    /* ---------- home */
    // the libraries and their opening hours change once a day: fetched once a day; occupancy every time
    async function locData() {
      const today = ymd(Date.now());
      const old = store.get('kurt:locinfo');
      let tiles, info;
      if (old && old.day === today && old.tiles && old.v === 2) ({ tiles, info } = old);
      else {
        tiles = await get('/tiles');
        info = {};
        await Promise.all(tiles.flatMap((t) => t.locations).map((loc) => Promise.all([get('/locations/' + loc.id), get('/resourcetypes?locationId=' + loc.id).catch(() => [])]).then(([l, ty]) => {
          info[loc.id] = { unit: l.unit, address: l.address, openingHoursToday: l.openingHoursToday, closedToday: l.closedToday, zones: (l.zones || []).length, types: (ty || []).map((x) => x.id) };
          keepZones(loc.id, l.zones);
        }, () => {})));
        store.set('kurt:locinfo', { day: today, tiles, info, v: 2 });
      }
      const extra = {};
      await Promise.all(tiles.flatMap((t) => t.locations).map((loc) => get('/occupancies/' + loc.id).then((o) => o, () => null).then((o) => {
        extra[loc.id] = { l: info[loc.id], o: o && { capacity: o.capacity, occupancy: o.occupancy, closed: o.closed } };
      })));
      return { tiles, extra };
    }
    /* ---------- check in / check out (KURT's own /check-in page does the same: POST /validations/) */
    // a booking says "Booked" until you check in; remember our own check-ins too, KURT may be slow to show them
    const ciMap = () => { const m = store.get('kurt:ci') || {}; Object.keys(m).forEach((k) => { if (Date.now() - m[k] > 20 * 3600e3) delete m[k]; }); return m; };
    const isIn = (r) => !/checked[ -]?out|uitgecheckt/i.test(r.status || '') && (/checked[ -]?in|ingecheckt/i.test(r.status || '') || !!ciMap()[r.id]);
    const setIn = (id, on) => { const m = ciMap(); if (on) m[id] = Date.now(); else delete m[id]; store.set('kurt:ci', m); };
    // KURT's messages are a little markdown: keep bold and line breaks, drop links to its own pages
    const md = (t) => esc(String(t || '')).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
    function ciDone(ok, title, sub, msgs) {
      const { layer, close } = openLayer(`<div class="sg upd-c">
        <span class="upd-ok${ok ? '' : ' warn'}">${ico(ok ? 'check' : 'warn')}</span>
        <h2>${esc(title)}</h2>
        ${sub ? `<p class="upd-v">${esc(sub)}</p>` : ''}
        ${msgs && msgs.length ? `<div class="kci-msg">${msgs.map((m) => `<p>${md(m)}</p>`).join('')}</div>` : ''}
        <button type="button" class="btn upd-go">Klaar</button></div>`, 'upd-layer', title);
      layer.querySelector('.upd-go').addEventListener('click', close);
    }
    async function validate(b, action) {
      const { r: rid, id, n } = b.dataset;
      const label = b.textContent;
      b.disabled = true; b.innerHTML = `<span class="spin"></span> ${action === 10 ? 'Inchecken' : 'Uitchecken'}…`;
      let res;
      try { res = await send('POST', '/validations/', { resourceId: Number(rid), action }); }
      catch (err) { b.disabled = false; b.textContent = label; ciDone(false, action === 10 ? 'Inchecken lukte niet' : 'Uitchecken lukte niet', n, [err.message || 'Probeer het straks opnieuw.']); return; }
      const st = res && res.status, msgs = (res && res.messages) || [];
      if (st === 10 || st === 13) setIn(id, true);
      if (st === 14) setIn(id, false);
      freshRes(); memoClear(); show();
      if (st === 10) ciDone(true, 'Ingecheckt', n, msgs);
      else if (st === 13) ciDone(true, 'Je bent al ingecheckt', n, msgs);
      else if (st === 14) ciDone(true, 'Uitgecheckt', n, msgs);
      else if (st === 11) ciDone(false, 'Geen reservatie op deze plaats', n, msgs);
      else ciDone(false, action === 10 ? 'Inchecken lukte niet' : 'Uitchecken lukte niet', n, msgs);
    }

    function locRow(loc, x) {
      const l = (x && x.l) || {};
      const o = x && x.o;
      const closed = isClosed(l);
      const sub = [openTxt(l), !closed && occTxt(o)].filter(Boolean).join(' · ');
      const th = loc.thumbnailUrl ? `<span class="ko-th" style="background-image:url('${esc(loc.thumbnailUrl)}')"></span>` : `<span class="ic soft">${ico('seat')}</span>`;
      return row({ href: '#/l/' + loc.id, iconHtml: th, title: loc.unit, subHtml: `${esc(sub || l.address || '')}${closed ? '' : occBar(o)}`, cls: 'ko-row' + (closed ? ' off' : '') });
    }
    function warm(lid) {
      const L = store.get('kurt:loc:' + lid);
      const zp = L && L.l && L.l.zones ? Promise.resolve(L.l.zones)
        : memo('loc:' + lid, 10 * 60e3, () => get('/locations/' + lid)).then((l) => { keepZones(lid, l.zones); return l.zones || []; });
      return zp.then((zones) => {
        if (!zones.length) return null;
        return parFor(lid, zones[0].resourceTypeIds).then((par) => {
          const sel = pickTime(par);
          if (sel.t) zones.forEach((z) => zoneAvail(lid, z.id, sel.d.value, sel.t.value).catch(() => {}));
        });
      }).catch(() => {});
    }
    // start loading the moment a finger touches a library or room, not when the tap ends
    document.addEventListener('pointerdown', (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#/"]');
      const m = a && /^#\/(l|z)\/(\d+)/.exec(a.getAttribute('href'));
      if (!m) return;
      const lid = m[1] === 'l' ? m[2] : ZONES[m[2]] && ZONES[m[2]].l;
      if (lid) warm(lid);
    }, { passive: true });
    // a booking only names its seat ("Agora - Silent Study Seat 111"): find its library by that prefix
    // Some prefixes don't match ("CBA - Boekenzaal Seat 109" is 2Bergen Arenberg): then KURT's resource details say it
    // (resLoc, remembered per seat in kurt:rl).
    const RL = store.get('kurt:rl') || {};
    const resLoc = (rid) => (RL[rid] ? Promise.resolve(RL[rid]) : memo('rl:' + rid, 10 * 60e3, () => get('/resources/' + rid + '?withDetails=true')).then((x) => {
      if (x && x.locationId) { RL[rid] = x.locationId; store.set('kurt:rl', RL); }
      return RL[rid] || null;
    }));
    function libOf(r, locs) {
      const lid = r.locationId || RL[r.resourceId];
      if (lid) return locs.find((l) => l.id === lid) || { id: lid, unit: '' };
      const pre = fold(String(r.resourceName || '').split(' - ')[0]);
      const w1 = pre.split(' ')[0];
      return (pre && (locs.find((l) => fold(l.unit).startsWith(pre) || fold(l.unit).includes(pre)) || (w1.length > 3 && locs.find((l) => fold(l.unit).startsWith(w1))))) || null;
    }
    function viewHome(my) {
      document.title = 'Studieplek';
      setNav({ title: 'Studieplek', back: { label: 'Meer', href: PORTAL + '?tm=meer', act: 'meer' } });
      const draw = (d) => {
        if (my !== token) return;
        const { tiles, extra } = d.loc || { tiles: null, extra: {} };
        const name = (ME && ME.firstName) || '';
        let h = `<div class="lt"><h1>Studieplek</h1><p class="lt-sub">KURT</p></div>`;
        // bookings: always first
        const res = (d.res || []).slice().sort((a, b) => (a.startDate + a.startTime).localeCompare(b.startDate + b.startTime));
        h += `<div class="sh"><h2>Mijn reservaties</h2>${res.length ? `<span class="sh-note">${res.length}</span>` : ''}</div>`;
        if (d.res === undefined) h += skGroup(1);
        else if (!res.length) h += `<div class="card ko-empty">${ico('seat')}<span>Je hebt geen reservaties. Kies hieronder een favoriet of een bibliotheek.</span></div>`;
        else {
          h += res.map((r) => {
            const now = Date.now(), s = fromYmd(r.startDate, r.startTime), e = r.endTime === '00:00' ? fromYmd(r.endDate, '24:00') : fromYmd(r.endDate, r.endTime);
            const live = now >= s - 15 * 60e3 && now < e;
            const hit = libOf(r, d.loc ? d.loc.tiles.flatMap((t) => t.locations) : []);
            if (!hit && d.loc && r.resourceId && !RL[r.resourceId]) resLoc(r.resourceId).then((x) => { if (x) draw(d); }, () => {});
            const isRoom = !/\d\s*$/.test(String(r.resourceName || ''));
            const unit = hit ? hit.unit : '';
            const cin = live && isIn(r);
            const dn = esc(nm(r.resourceName) + ' · ' + dayLbl(r.startDate) + ' ' + r.startTime + '–' + (r.endTime === '00:00' ? '24:00' : r.endTime));
            return `<div class="card kr${live ? ' live' : ''}"><div class="kr-top">${isRoom ? `<span class="kr-seat kr-room">${GROUP}</span>` : `<span class="kr-seat">${esc(seatNo(r.resourceName))}</span>`}<span class="kr-main"><b>${esc(isRoom ? 'Groepsruimte ' + nm(r.resourceName) : nm(r.resourceName))}</b><span>${esc(unit || (r.resourceName || '').split(' - ')[0])}</span></span><button type="button" class="kr-del" data-act="cancel" data-id="${esc(r.id)}" data-n="${esc(nm(r.resourceName) + ' · ' + dayLbl(r.startDate) + ' ' + r.startTime)}" aria-label="Reservatie verwijderen">${TRASH}</button></div>
              <div class="kr-when">${ico('clock')}<span><b>${esc(dayLbl(r.startDate))}</b> ${esc(r.startTime)}–${esc(r.endTime === '00:00' ? '24:00' : r.endTime)}${cin ? ' · <em>ingecheckt</em>' : live ? ' · <em>nu</em>' : until(s).toLowerCase() === dayLbl(r.startDate).toLowerCase() ? '' : ` · ${esc(until(s))}`}</span></div>
              <div class="kr-acts">${live ? `<button type="button" class="${cin ? 'red' : 'pri'}" data-act="${cin ? 'checkout' : 'checkin'}" data-r="${esc(r.resourceId)}" data-id="${esc(r.id)}" data-n="${dn}">${cin ? 'Uitchecken' : 'Inchecken'}</button>` : ''}<a href="#/s/${esc(r.id)}">${isRoom ? 'Vind het lokaal' : 'Vind mijn stoel'}</a></div></div>`;
          }).join('');
          h += `<p class="ko-hint">${ico('info')}Check in met de knop Inchecken of met de QR-code op je plek, binnen het eerste halfuur. 3 keer niet komen opdagen in 14 dagen = een week geen reservaties.</p>`;
        }
        if (!tiles) { h += `<div class="sh"><h2>Bibliotheken</h2></div>${skGroup(6)}`; put(sec, h); watchTitle(sec); return; }
        const all = tiles.flatMap((t) => t.locations);
        const fl = favs().map((id) => all.find((l) => l.id === id)).filter(Boolean);
        const fs = seatFavs();
        h += `<div class="sh"><h2>Favorieten</h2></div>`;
        if (!fl.length && !fs.length) h += `<div class="card ko-empty">${STAR(false)}<span>Tik op de ster bij een bibliotheek of bij een stoel, dan vind je ze hier terug.</span></div>`;
        if (fl.length) h += `<div class="group">${fl.map((l) => locRow(l, extra[l.id])).join('')}</div>`;
        if (fs.length) h += `<div class="group kfs-g"${fl.length ? ' style="margin-top:12px"' : ''}>${fs.map((f) => row({ href: `#/z/${f.zone}?seat=${f.rid}`, iconHtml: `<span class="kr-seat">${esc(seatNo(f.name))}</span>`, title: nm(f.name), sub: [f.unit, f.zname].filter(Boolean).join(' · '), cls: 'kfs' })).join('')}</div>`;
        h += `<div class="sh"><h2>Bibliotheken</h2></div>`;
        tiles.filter((t) => t.tileGroup === 1).forEach((t) => {
          h += `<div class="gh">${esc(NL_CITY[t.name] || t.name)}</div><div class="group">${t.locations.map((l) => locRow(l, extra[l.id])).join('')}</div>`;
        });
        const other = tiles.filter((t) => t.tileGroup !== 1);
        if (other.length) h += `<details class="rp-more"><summary>Faculteiten en diensten</summary>${other.map((t) => `<div class="gh">${esc(NL_CITY[t.name] || t.name)}</div><div class="group">${t.locations.map((l) => locRow(l, extra[l.id])).join('')}</div>`).join('')}</details>`;
        h += `<p class="fresh"><a href="${esc(ORIG('/'))}">Open de originele KURT</a></p>`;
        put(sec, h);
        watchTitle(sec);
      };
      const d = { res: store.get('kurt:res') ? store.get('kurt:res').v : undefined, loc: null };
      const cached = store.get('kurt:locs');
      if (cached) d.loc = cached.v;
      draw(d);
      // favourite seats: free right now, and until when?
      // your favourites are probably next: get them ready
      setTimeout(() => { if (my === token) [...new Set(favs().concat(seatFavs().map((f) => f.loc)))].slice(0, 4).forEach(warm); }, 700);
      get('/reservations').then((r) => { d.res = Array.isArray(r) ? r : []; store.set('kurt:res', { ts: Date.now(), v: d.res }); draw(d); }, () => { if (d.res === undefined) { d.res = []; draw(d); } });
      if (!cached || Date.now() - cached.ts > 3 * 60e3) {
        once('kurt:locs', locData).then((v) => { store.set('kurt:locs', { ts: Date.now(), v }); d.loc = v; draw(d); }, (e) => {
          if (my === token && !d.loc && !(e && e.auth)) put(sec, empty('warn', 'KURT reageert niet', 'Probeer het straks opnieuw.', `<p style="margin-top:14px"><a class="btn" href="${esc(ORIG('/'))}">Open KURT</a></p>`));
        });
      }
    }

    /* ---------- a library: its rooms, with free seats at the chosen hour */
    const mainType = (ids) => [302, 303, 1, 5, 6, 55, 131].find((t) => (ids || []).includes(t)) || (ids && ids[0]) || 302;
    let PAR = null; // the opening hours of the library on screen, for the time sheet
    function pickTime(par) {
      const ds = (par && par.startDates) || [];
      const w = WHEN.get();
      let d = (w && ds.find((x) => x.value === w.d)) || ds[0];
      if (!d || !d.startTimes.length) return { ds, d: null, t: null, now: true };
      const t = (w && d.value === w.d && (d.startTimes.find((x) => x.value === w.t) || d.startTimes.find((x) => x.value > w.t))) || d.startTimes[0];
      return { ds, d, t, now: !w || (d === ds[0] && t === d.startTimes[0] && d.value === ymd(Date.now())) };
    }
    const whenPill = (sel) => !sel.d ? '' : `<button type="button" class="kw" data-act="when">${ico('clock')}<span class="kw-t"><b>${sel.now ? 'Nu' : esc(dayLbl(sel.d.value))}</b><span>${sel.now ? `${esc(dayLbl(sel.d.value)).toLowerCase()} vanaf ${esc(sel.t.display)}` : `vanaf ${esc(sel.t.display)}`}</span></span><span class="kw-ch">Wijzig</span></button>`;
    function whenSheet(after) {
      const par = PAR;
      if (!par || !par.startDates || !par.startDates.length) return;
      const sel = pickTime(par);
      let day = sel.d.value;
      const layer = kbLayer('<div class="kw-h"><b>Wanneer wil je komen?</b></div><div class="kw-body"></div>');
      const scrim = layer.querySelector('.scrim'), kb = layer.querySelector('.kb'), body = layer.querySelector('.kw-body');
      const close = () => { scrim.classList.remove('on'); kb.classList.remove('on'); setTimeout(() => layer.remove(), 320); };
      const draw = () => {
        const d = par.startDates.find((x) => x.value === day) || par.startDates[0];
        put(body, `<button type="button" class="btn kw-now${sel.now ? ' on' : ''}" data-w="now">${ico('clock')}Nu, zo snel mogelijk</button>
          <div class="kb-l">Of kies een dag</div>
          <div class="chips kw-days">${par.startDates.map((x) => `<button type="button" class="chip${x.value === day ? ' on' : ''}" data-day="${esc(x.value)}">${esc(dayLbl(x.value))}</button>`).join('')}</div>
          <div class="kb-l">en een beginuur</div>
          <div class="kw-hours">${d.startTimes.map((x) => `<button type="button" class="kw-hr${!sel.now && d.value === sel.d.value && x.value === sel.t.value ? ' on' : ''}" data-t="${esc(x.value)}">${esc(x.display)}</button>`).join('')}</div>`);
      };
      draw();
      scrim.addEventListener('click', close);
      kb.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.day) { day = b.dataset.day; draw(); return; }
        if (b.dataset.w === 'now') WHEN.set(null);
        else if (b.dataset.t) WHEN.set({ d: day, t: b.dataset.t });
        else return;
        close();
        if (after) after(); else { keepY = W.scrollY; show(''); }
      });
    }
    async function viewLoc(id, my) {
      setNav({ back: { label: 'Studieplek', act: 'kback', href: '#/' }, title: '' });
      const c = store.get('kurt:loc:' + id);
      const draw = (L, par, avail) => {
        if (my !== token) return;
        const l = L.l, o = L.o;
        const fav = favs().includes(Number(id));
        document.title = l.unit;
        setNav({ back: { label: 'Studieplek', act: 'kback', href: '#/' }, title: l.unit, right: `<button type="button" class="nb" data-act="fav" data-id="${esc(id)}" aria-label="${fav ? 'Uit favorieten' : 'Bij favorieten'}">${STAR(fav)}</button>` });
        if (par) PAR = par;
        const sel = pickTime(par);
        const zones = l.zones || [];
        zones.forEach((z) => { zoneLoc[z.id] = Number(id); });
        store.set('kurt:zl', zoneLoc);
        keepZones(id, zones);
        let h = l.fullImageUrl ? `<div class="ko-hero" style="background-image:url('${esc(l.fullImageUrl)}')"></div>` : '';
        const ll = l.navigationUrl && /query=([-\d.]+)%2C([-\d.]+)/.exec(l.navigationUrl);
        const rt = [ll ? `<a href="https://maps.apple.com/?daddr=${ll[1]},${ll[2]}&q=${encodeURIComponent(l.unit)}">Route</a>` : '', l.navigationUrl ? `<a href="${esc(l.navigationUrl)}">${ll ? 'Google Maps' : 'Route'}</a>` : ''].filter(Boolean);
        h += `<div class="lt"><h1${l.unit.length > 22 ? ' class="long"' : ''}>${esc(l.unit)}</h1><p class="lt-sub">${esc([openTxt(l), l.address].filter(Boolean).join(' · '))}</p>${rt.length ? `<p class="kroute">${ico('pin')}${rt.join('<i>·</i>')}</p>` : ''}</div>`;
        if (o && o.capacity && !o.closed) h += `<div class="ko-occ"><span><b>${Math.max(0, o.capacity - o.occupancy)}</b> van ${o.capacity} plaatsen vrij nu</span>${occBar(o)}</div>`;
        if ((L.types || []).some((t) => t.id === 1)) h += `<a class="card kg-cta" href="#/g/${esc(id)}"><span class="kg-ic">${GROUP}</span><span class="kr-main"><b>Groepswerkruimte reserveren</b><span>Zie welke lokalen vrij zijn en reserveer</span></span><svg class="chev" viewBox="0 0 8 14" aria-hidden="true"><path d="M1.5 1.5 6.5 7l-5 5.5"/></svg></a>`;
        if (zones.length) {
          h += `<div class="sh"><h2>Kies je plek</h2></div>`;
          h += par ? whenPill(sel) : '<div class="kw sk"></div>';
          h += `<div class="kz-list">${zones.map((z) => {
            const a = avail && avail[z.id];
            const free = a ? a.availabilities.filter((s) => s.availableHours > 0) : null;
            const best = free && free.length ? Math.max(...free.map((s) => s.availableHours)) : 0;
            const fp = a && a.floorPlan && a.floorPlan.floorPlanUrl;
            const fpc = fp || (store.get('kurt:fp') || {})[z.id];
            return `<a class="kz${free && !free.length ? ' none' : ''}" href="#/z/${z.id}"><span class="kz-fp"${fpc ? ` style="background-image:url('${esc(fpc)}')"` : ''}></span><span class="kz-t"><b>${esc(z.name.trim())}</b><span>${free == null ? '<span class="sk" style="display:inline-block;width:90px"></span>' : free.length ? `<em>${free.length} vrij</em> · max. ${best} u` : 'Niets vrij op dit uur'}</span></span><span class="kz-go">${ico('pin')}Kaart</span></a>`;
          }).join('')}</div>`;
        } else h += `<div class="card ko-none">${ico('info')}<span>Deze locatie heeft geen plattegrond in KURT. Reserveer hier via KURT zelf.</span></div>`;
        const types = (L.types || []).filter((t) => t.id !== 1 && (!zones.length || ![302, 303].includes(t.id)));
        if (types.length) h += `<div class="gh">Ook te reserveren</div><div class="group">${types.map((t) => row({ href: ORIG('/locations/' + id), icon: 'seat', soft: true, title: NL_TYPES[t.id] || t.name, sub: 'In KURT zelf', external: true })).join('')}</div>`;
        if (L.news && L.news.length) h += `<details class="rp-more"><summary>Berichten van ${esc(l.unit)}</summary>${L.news.map((n) => `<p class="rp-list">${esc(textOf(n.title || ''))}${n.title ? ': ' : ''}${esc(textOf(n.content || n.text || ''))}</p>`).join('')}</details>`;
        put(sec, h);
        watchTitle(sec);
      };
      // everything at once: the library, its hours and the free seats per room (rooms known from last time start right away)
      let L = c, par = null, avail = null;
      const redraw = () => { if (L) draw(L, par, avail); };
      if (c) redraw();
      else put(sec, `<div class="ko-hero sk"></div><div class="lt"><h1>&nbsp;</h1></div>${skGroup(3)}`);
      const loadAvail = (zones) => {
        if (!zones.length) return Promise.resolve();
        return parFor(id, zones[0].resourceTypeIds).catch(() => null).then((p) => {
          par = p; if (my !== token) return null;
          redraw();
          const sel = pickTime(par);
          if (!sel.t) return null;
          const got = {};
          return Promise.all(zones.map((z) => zoneAvail(id, z.id, sel.d.value, sel.t.value).then((a) => { got[z.id] = a; }, () => { got[z.id] = { availabilities: [] }; })))
            .then(() => {
              const fpm = store.get('kurt:fp') || {};
              Object.keys(got).forEach((zid) => { const u = got[zid].floorPlan && got[zid].floorPlan.floorPlanUrl; if (u) fpm[zid] = u; });
              store.set('kurt:fp', fpm);
              avail = got; redraw();
            });
        });
      };
      const early = c && (c.l.zones || []).length ? loadAvail(c.l.zones) : null;
      try {
        const [l, o, types, news] = await Promise.all([get('/locations/' + id), get('/occupancies/' + id).catch(() => null), get('/resourcetypes?locationId=' + id).catch(() => []), get('/news?locationId=' + id).catch(() => null)]);
        L = { l, o, types, news: Array.isArray(news) ? news : news ? [news] : [] };
        store.set('kurt:loc:' + id, L);
        redraw();
        const same = c && JSON.stringify((c.l.zones || []).map((z) => z.id)) === JSON.stringify((l.zones || []).map((z) => z.id));
        if (!early || !same) await loadAvail(l.zones || []); else await early;
      } catch (e) {
        if (my === token && !c && !(e && e.auth)) put(sec, empty('warn', 'Locatie kon niet geladen worden', '', `<p style="margin-top:14px"><a class="btn" href="${esc(ORIG('/locations/' + id))}">Open in KURT</a></p>`));
      }
    }

    /* ---------- group work rooms: a day, every room with its free hours, tap an hour to book */
    // one request gives every room of the day with its hours (startTime '' = the whole day)
    const roomsFor = (lid, day) => memo(`gr:${lid}:${day}`, 60e3, async () => {
      let all = [];
      for (let pg = 0; pg < 6; pg++) {
        const a = await get(`/resourcetypeavailabilities?locationId=${lid}&zoneId=-1&resourceTypeId=1&pageNumber=${pg}&startDate=${day}&startTime=&endDate=${day}&endTime=&participantCount=-1&tagIds=&exactMatch=false&onlyFavorites=false&resourceNameInfix=&version=2.0`);
        const v = (a && a.availabilities) || [];
        all = all.concat(v);
        if (v.length < 25) break;
      }
      return all;
    });
    const roomCode = (n) => String(n || '').split(' - ')[0].replace(/^\S+\s+/, '');
    // the hours of a room: free = 'A' and not already over
    const roomSlots = (a, day) => {
      const al = a.slotAllocation || '';
      const slot = Math.round(1440 / (al.length || 24)) || 60;
      const nowMin = day === ymd(Date.now()) ? (Date.now() - fromYmd(day)) / 60e3 : -1;
      const out = [];
      for (let i = 0; i < al.length; i++) {
        if (al[i] === 'C') continue;
        out.push({ i, m: i * slot, free: al[i] === 'A' && (i + 1) * slot > nowMin + 10 });
      }
      return { slot, out };
    };
    const blocks = (sl) => {
      const b = [];
      sl.out.forEach((x) => { if (!x.free) return; const l = b[b.length - 1]; if (l && l.e === x.m) l.e = x.m + sl.slot; else b.push({ s: x.m, e: x.m + sl.slot }); });
      return b;
    };
    let GR = null; // the group room page on screen
    // from Groepswerken: first which library (only those with group rooms, your favourites first), then the normal steps
    async function viewGk(my) {
      const g = activeGrp();
      document.title = 'Groepsruimte boeken';
      setNav({ back: { label: ss.get('tm4-kurt-gback') ? 'Groepswerken' : 'Studieplek', act: 'gkback', href: '#/' }, title: '', always: true });
      const head = `<div class="lt"><h1>Groepsruimte boeken</h1><p class="lt-sub">Voor ${esc(g.n)}${g.c ? ' · ' + esc(g.c) : ''} · ${g.m.length + 1} personen</p></div><div class="sh"><h2>Kies een bibliotheek</h2></div>`;
      const draw = (d) => {
        if (my !== token) return;
        if (!d) { put(sec, head + skGroup(6)); return; }
        const all = d.tiles.flatMap((t) => t.locations).filter((l) => ((d.extra[l.id] || {}).l || {}).types && d.extra[l.id].l.types.includes(1));
        const fav = favs();
        const rowG = (l) => {
          const x = d.extra[l.id] || {}, li = x.l || {};
          const closed = isClosed(li);
          const th = l.thumbnailUrl ? `<span class="ko-th" style="background-image:url('${esc(K + '/' + l.thumbnailUrl)}')"></span>` : `<span class="ic soft">${GROUP}</span>`;
          return row({ href: '#/g/' + l.id, iconHtml: th, title: (fav.includes(l.id) ? '★ ' : '') + l.unit, sub: openTxt(li) || li.address || '', cls: 'ko-row' + (closed ? ' off' : '') });
        };
        const top = fav.map((id) => all.find((l) => l.id === id)).filter(Boolean);
        let h = head;
        if (!all.length) h += empty('info', 'Geen bibliotheken gevonden', 'KURT geeft nu geen bibliotheken met groepswerkruimtes.');
        if (top.length) h += `<div class="gh">Favorieten</div><div class="group">${top.map(rowG).join('')}</div>`;
        d.tiles.forEach((t) => {
          const ls = t.locations.filter((l) => all.includes(l) && !top.includes(l));
          if (ls.length) h += `<div class="gh">${esc(NL_CITY[t.name] || t.name)}</div><div class="group">${ls.map(rowG).join('')}</div>`;
        });
        put(sec, h);
      };
      const cached = store.get('kurt:locs');
      draw(cached && cached.v);
      if (!cached || Date.now() - cached.ts > 3 * 60e3) once('kurt:locs', locData).then((v) => { store.set('kurt:locs', { ts: Date.now(), v }); draw(v); }, () => { if (!cached) put(sec, head + empty('warn', 'KURT reageert niet', 'Probeer het straks opnieuw.')); });
    }
    async function viewGroup(lid, q, my) {
      const info = ((store.get('kurt:locinfo') || {}).info || {})[lid] || {};
      const unit = info.unit || (((store.get('kurt:loc:' + lid) || {}).l) || {}).unit || '';
      document.title = 'Groepswerkruimtes';
      setNav({ back: { label: 'Terug', act: 'kback', href: '#/l/' + lid }, title: 'Groepsruimtes', always: true });
      store.set('kurt:glast', Number(lid));
      const ag = activeGrp();
      const head = `<div class="lt"><h1>Groepswerkruimtes</h1><p class="lt-sub">${esc(unit)}${ag ? ' · voor ' + esc(ag.n) : ''}</p></div>`;
      put(sec, head + '<div class="kg-days sk" style="height:50px"></div>' + skGroup(4));
      let par;
      try { par = await parFor(lid, [1]); } catch (e) { if (my === token && !(e && e.auth)) put(sec, head + empty('warn', 'Groepsruimtes konden niet geladen worden', '', `<p style="margin-top:14px"><a class="btn" href="${esc(ORIG('/locations/' + lid))}">Open in KURT</a></p>`)); return; }
      if (my !== token) return;
      const days = ((par && par.startDates) || []).map((d) => d.value);
      let day = q.get('d');
      if (!days.includes(day)) day = days[0];
      const dayRow = `<div class="kg-days">${days.map((v) => `<button type="button" class="chip${v === day ? ' on' : ''}" data-act="gday" data-l="${esc(lid)}" data-d="${v}">${esc(dayLbl(v))}<small>${esc(String(new Date(fromYmd(v)).getDate()))}/${new Date(fromYmd(v)).getMonth() + 1}</small></button>`).join('')}</div>`;
      if (!day) { put(sec, head + empty('info', 'Geen dagen om te reserveren', 'KURT geeft voor deze bibliotheek geen dagen voor groepsruimtes.')); return; }
      put(sec, head + dayRow + skGroup(4));
      const onDay = sec.querySelector('.kg-days .on'); if (onDay) onDay.scrollIntoView({ block: 'nearest', inline: 'center' });
      let rooms;
      try { rooms = await roomsFor(lid, day); } catch (e) { if (my === token && !(e && e.auth)) put(sec, head + dayRow + empty('warn', 'Groepsruimtes konden niet geladen worden', '')); return; }
      if (my !== token) return;
      const list = rooms.map((a) => { const sl = roomSlots(a, day); return { a, sl, b: blocks(sl) }; });
      list.sort((x, y) => (y.b.length > 0) - (x.b.length > 0) || String(x.a.name).localeCompare(String(y.a.name)));
      GR = { lid, day, unit, list };
      // first when, then which room: start hour and length at the top, below them the rooms that are free then
      let lo = 99, hi = 0;
      list.forEach(({ sl }) => { if (sl.out.length) { lo = Math.min(lo, sl.out[0].i); hi = Math.max(hi, sl.out[sl.out.length - 1].i + 1); } });
      if (lo >= hi) { lo = 8; hi = 22; }
      const slotM = (list[0] && list[0].sl.slot) || 60;
      const freeAt = (it, i) => { const x = it.sl.out.find((y) => y.i === i); return !!(x && x.free); };
      const runFrom = (it, i) => { let k = i; while (k < hi && freeAt(it, k)) k++; return k - i; };
      const hrs = [];
      for (let i = lo; i < hi; i++) if (list.some((it) => it.sl.out.some((x) => x.i === i && x.free)) || hrs.length) hrs.push(i);
      while (hrs.length && !list.some((it) => freeAt(it, hrs[hrs.length - 1]))) hrs.pop();
      const maxU = Math.max(1, Math.floor(Math.max(...list.map((x) => x.a.maxDurationMinutes || 240)) / slotM));
      const durs = [1, 2, 3, 4].filter((u) => u <= maxU);
      // rooms with the same name ("Tulp 1" three times): name them by their code instead
      const cnt = {};
      list.forEach(({ a }) => { const k = nm(a.name); cnt[k] = (cnt[k] || 0) + 1; });
      const names = (a) => { const dup = cnt[nm(a.name)] > 1 && roomCode(a.name); return { title: dup ? roomCode(a.name) : nm(a.name), sub: [dup ? nm(a.name) : roomCode(a.name), `${a.minParticipants}–${a.maxParticipants} pers.`].filter(Boolean).join(' · ') }; };
      let t = Number(q.get('t')), u = Number(q.get('u')) || store.get('kurt:gu') || 2;
      if (!hrs.includes(t)) t = hrs.find((i) => list.some((it) => runFrom(it, i) >= Math.min(u, 2))) != null ? hrs.find((i) => list.some((it) => runFrom(it, i) >= Math.min(u, 2))) : hrs[0];
      if (!durs.includes(u)) u = Math.min(2, durs[durs.length - 1]);
      const n = hi - lo, pct = (i) => ((i - lo) / n) * 100;
      const mini = (it) => {
        const cells = [];
        for (let i = lo; i < hi; i++) { const x = it.sl.out.find((y) => y.i === i); cells.push(`<i class="${x ? (x.free ? 'f' : 'b') : 'c'}"></i>`); }
        return `<span class="kg-mini">${cells.join('')}<span class="kg-win" style="left:${pct(t).toFixed(2)}%;width:${((u / n) * 100).toFixed(2)}%"></span></span>`;
      };
      const draw = () => {
        try { history.replaceState(null, '', K + `/#/g/${lid}?d=${day}&t=${t}&u=${u}`); } catch (_) {}
        const tEnd = t + u;
        const full = [], part = [], none = [];
        list.forEach((it) => { const run = t == null ? 0 : runFrom(it, t); (run >= u ? full : run > 0 ? part : none).push({ it, run }); });
        const row = ({ it, run }, kind) => {
          const { a } = it, nmv = names(a);
          let st, btn = '';
          if (kind === 'full') { st = `<em class="ok">Vrij ${hm(t * slotM)}–${hm(tEnd * slotM)}</em>`; btn = '<span class="kg-go">Kies</span>'; }
          else if (kind === 'part') { st = `<em class="half">Vrij tot ${hm((t + run) * slotM)}</em>`; btn = '<span class="kg-go alt">Kies</span>'; }
          else { const nx = it.sl.out.find((x) => x.i > t && x.free); st = `<em>${nx ? `Bezet · vrij vanaf ${hm(nx.i * slotM)}` : 'Bezet'}</em>`; }
          const end = kind === 'full' ? tEnd * slotM : (t + run) * slotM;
          return `<button type="button" class="kgr2 ${kind}" data-act="groom" data-r="${a.id}"${kind !== 'none' ? ` data-t="${t}" data-e="${end}"` : ''}${kind === 'none' && !it.b.length ? ' disabled' : ''}><span class="kr-main"><b>${esc(nmv.title)}</b><span>${esc(nmv.sub)}</span>${st}${mini(it)}</span>${btn}</button>`;
        };
        let h = head + dayRow;
        if (!hrs.length) {
          h += `<div class="card ko-empty">${ico('info')}<span>Alle ${list.length} lokalen zijn volzet ${esc(dayLbl(day).toLowerCase())}. Kies hierboven een andere dag.</span></div>`;
        } else {
          h += `<div class="kg-pick"><div class="kb-l">Beginuur</div><div class="kg-tchips">${hrs.map((i) => `<button type="button" class="chip${i === t ? ' on' : ''}" data-act="gt" data-v="${i}">${hm(i * slotM)}</button>`).join('')}</div>
            <div class="kb-l">Hoelang?</div><div class="kg-seg">${durs.map((d) => `<button type="button" class="${d === u ? 'on' : ''}" data-act="gu" data-v="${d}">${d} uur</button>`).join('')}</div></div>`;
          h += `<p class="kg-sum">${full.length ? `<b>${full.length}</b> ${full.length === 1 ? 'lokaal is' : 'lokalen zijn'} vrij van ${hm(t * slotM)} tot ${hm(tEnd * slotM)}.` : `Geen lokaal is de hele tijd vrij van ${hm(t * slotM)} tot ${hm(tEnd * slotM)}.${part.length ? ' Deze zijn korter vrij:' : ''}`}</p>`;
          if (full.length) h += `<div class="group kg-list2">${full.map((x) => row(x, 'full')).join('')}</div>`;
          if (part.length) h += `${full.length ? `<div class="gh">Korter vrij vanaf ${hm(t * slotM)}</div>` : ''}<div class="group kg-list2">${part.map((x) => row(x, 'part')).join('')}</div>`;
          if (none.length) h += `<details class="rp-more kg-full"><summary>${none.length} ${none.length === 1 ? 'lokaal' : 'lokalen'} bezet om ${hm(t * slotM)}</summary><div class="group kg-list2">${none.map((x) => row(x, 'none')).join('')}</div></details>`;
        }
        h += `<p class="fresh"><a href="${esc(ORIG('/locations/' + lid))}">Open in de originele KURT</a></p>`;
        put(sec, h);
        const a1 = sec.querySelector('.kg-days .on'); if (a1) a1.scrollIntoView({ block: 'nearest', inline: 'center' });
        const a2 = sec.querySelector('.kg-tchips .on'); if (a2) a2.scrollIntoView({ block: 'nearest', inline: 'center' });
      };
      GR.set = (k, v) => { const y = W.scrollY; if (k === 't') t = v; else { u = v; store.set('kurt:gu', v); } draw(); W.scrollTo(0, y); };
      draw();
    }

    // book a group room: until when, a subject and your group (KURT asks at least minParticipants people, you included)
    async function pickRoom(rid, at, wantEnd) {
      if (!GR) return;
      const it = GR.list.find((x) => String(x.a.id) === String(rid));
      if (!it) return;
      const { a, sl } = it, day = GR.day, slot = sl.slot;
      closeBook();
      const al = a.slotAllocation || '';
      const maxMin = a.maxDurationMinutes || 240;
      const starts = sl.out.filter((x) => x.free).map((x) => x.i);
      if (!starts.length) return;
      const endsFrom = (si) => { const e = []; for (let k = si; k < al.length && al[k] === 'A' && (k - si + 1) * slot <= maxMin; k++) e.push((k + 1) * slot); return e; };
      const me = ME || {};
      const st = {
        si: at == null ? starts[0] : (starts.find((i) => i >= at) != null ? starts.find((i) => i >= at) : starts[starts.length - 1]),
        end: 0,
        subj: store.get('kurt:gsubj') || 'Groepswerk',
        ppl: me.uid ? [{ uid: me.uid, email: me.email, me: true }] : [],
        q: '', busy: false, err: '',
      };
      const pickEnd = () => { const e = endsFrom(st.si); st.end = e[Math.min(e.length, 2) - 1]; };
      pickEnd();
      if (wantEnd && endsFrom(st.si).includes(wantEnd)) st.end = wantEnd;
      const dupName = GR.list.filter((x) => nm(x.a.name) === nm(a.name)).length > 1 && roomCode(a.name);
      const layer = kbLayer(`
        <div class="kb-h"><span class="kr-seat kr-room">${GROUP}</span><span class="kr-main"><b>${esc(dupName ? roomCode(a.name) : nm(a.name))}</b><span>${esc([dupName ? nm(a.name) : roomCode(a.name), GR.unit].filter(Boolean).join(' · '))}</span></span></div>
        <div class="kb-when kb-when-s">${ico('clock')}<span><b>${esc(dayLbl(day))}</b> · vrij ${esc(it.b.map((x) => `${hm(x.s)}–${hm(x.e)}`).join(', '))}</span></div>
        <div class="kb-body"></div>`);
      bookLayer = layer;
      const scrim = layer.querySelector('.scrim'), kb = layer.querySelector('.kb'), body = kb.querySelector('.kb-body');
      scrim.addEventListener('click', closeBook);
      let res = null;
      memo('res:' + a.id, 30 * 60e3, () => get(`/resources/${a.id}?withDetails=true`)).then((x) => { res = x; draw(); }, () => {});
      // saved groups with someone who isn't in the list yet
      const grpIn = (g) => g.m.every((em) => st.ppl.some((y) => String(y.email || '').toLowerCase() === em) || (me.email && String(me.email).toLowerCase() === em));
      // came from Kies with a start hour and a length already chosen: show them, don't ask again (Wijzig opens the chips)
      st.pick = !(wantEnd && st.end === wantEnd);
      if (!st.pick) kb.querySelector('.kb-when').hidden = true;
      const mates = () => (store.get('kurt:mates') || []).filter((m) => !st.ppl.some((x) => x.uid.toUpperCase() === m.uid.toUpperCase()));
      const draw = () => {
        if (!layer.isConnected) return;
        const n = st.ppl.length, min = a.minParticipants || 1, max = a.maxParticipants || 99;
        const need = Math.max(0, min - n);
        const subjOk = !(res && res.subjectIsRequired) || st.subj.trim().length >= 4;
        const ok = !need && subjOk && st.ppl.length && !st.busy;
        const rules = ((res && (res.conditionsOfUseNlUrl || res.conditionsOfUseEnUrl)) || '').trim();
        const start = st.si * slot, ends = endsFrom(st.si);
        const G = GRPS();
        body.innerHTML = (st.pick ? `<div class="kb-l">Vanaf</div>
          <div class="chips kb-ends kg-starts">${starts.map((i) => `<button type="button" class="chip${i === st.si ? ' on' : ''}${starts.includes(i - 1) ? '' : ' gap'}" data-act="start" data-i="${i}">${hm(i * slot)}</button>`).join('')}</div>
          <div class="kb-l">Tot</div>
          <div class="chips kb-ends">${ends.map((m) => `<button type="button" class="chip${m === st.end ? ' on' : ''}" data-act="end" data-m="${m}">${hm(m)}<small>${dur(m - start)}</small></button>`).join('')}</div>`
          : `<div class="kb-when kg-chosen">${ico('clock')}<span><b>${esc(dayLbl(day))}</b> · ${hm(start)}–${hm(st.end)} <small>(${dur(st.end - start)})</small></span><button type="button" data-act="gtime">Wijzig</button></div>`) + `
          <label class="kb-l" for="kg-subj">Onderwerp</label>
          <input id="kg-subj" class="kg-in" type="text" maxlength="100" autocomplete="off" value="${esc(st.subj)}" placeholder="Waarvoor? Bv. Groepswerk statistiek">
          <div class="kb-l kg-pl">Groepsleden <b>${n}</b><span> · ${min === max ? min : `${min} tot ${max}`} personen, jij inbegrepen</span></div>
          <div class="kg-ppl">${st.ppl.map((x) => `<div class="kg-p"><span class="kg-av">${esc((x.me ? (me.firstName || 'Jij') : x.email || x.uid).slice(0, 1).toUpperCase())}</span><span class="kr-main"><b>${esc(x.me ? 'Jij' : String(x.email || '').split('@')[0].replace(/\./g, ' ') || x.uid)}</b><span>${esc(x.uid)}</span></span>${x.me ? '' : `<button type="button" class="kg-x" data-act="gdel" data-u="${esc(x.uid)}" aria-label="Verwijder">${ico('close')}</button>`}</div>`).join('')}</div>
          ${G.length ? `<div class="kb-l kg-ml">Je groepen</div><div class="kg-glist">${G.map((g, i) => { const inn = grpIn(g); return `<div class="kg-g"><span class="kg-gi">${GROUP}</span><span class="kr-main"><b>${esc(g.n)}</b><span>${esc([g.c, (g.m.length + 1) + ' personen'].filter(Boolean).join(' · '))}</span></span>${inn ? `<span class="kg-gok">${ico('check')}Erin</span>` : `<button type="button" class="kg-gadd" data-act="ggrp" data-i="${i}"${st.busy || n >= max ? ' disabled' : ''}>Voeg toe</button>`}</div>`; }).join('')}</div>` : ''}
          ${n < max ? `<div class="kb-l kg-ml">${G.length ? 'Of iemand anders' : 'Voeg iemand toe'}</div><form class="kg-add"><input id="kg-q" class="kg-in" type="text" inputmode="email" autocapitalize="off" autocorrect="off" spellcheck="false" autocomplete="off" placeholder="r-nummer of e-mail" value="${esc(st.q)}"><button type="submit" class="kg-addb"${st.busy ? ' disabled' : ''}>${st.busy ? '<span class="spin"></span>' : 'Voeg toe'}</button></form>` : ''}
          ${st.err ? `<p class="ko-hint err">${ico('warn')}${esc(st.err)}</p>` : ''}
          ${n < max && mates().length ? `<div class="kb-l kg-ml">Eerder in je groep</div><div class="kg-mates">${mates().slice(0, 8).map((m) => `<button type="button" class="chip" data-act="gmate" data-u="${esc(m.uid)}">+ ${esc(String(m.email || '').split('@')[0].replace(/\./g, ' ') || m.uid)}</button>`).join('')}</div>` : ''}
          <button type="button" class="btn kb-go" data-act="gbook"${ok ? '' : ' disabled'}>${need ? `Nog ${need} ${need === 1 ? 'groepslid' : 'groepsleden'} nodig` : !subjOk ? 'Vul een onderwerp in (min. 4 tekens)' : `Reserveer · ${hm(start)}–${hm(st.end)}`}</button>
          <p class="kb-legal">Je gaat akkoord met het ${rules ? `<a href="${esc(rules)}">reglement</a>` : 'reglement'}. Check in met de QR-code in het lokaal, binnen het eerste halfuur.</p>`;
        const on = body.querySelector('.kb-ends .chip.on'); if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
      };
      const add = async (idf) => {
        idf = String(idf || '').trim();
        if (!idf || st.busy) return;
        if (/^[rusbm]\d{5,}$/i.test(idf)) idf = idf.toUpperCase();
        st.busy = true; st.err = ''; draw();
        try {
          const x = await get('/participants/' + encodeURIComponent(idf));
          if (!x || !x.uid) throw new Error('');
          if (st.ppl.some((y) => y.uid.toUpperCase() === x.uid.toUpperCase())) st.err = 'Die persoon staat al in je groep.';
          else { st.ppl.push({ uid: x.uid, email: x.email }); st.q = ''; }
        } catch (e) { st.err = `Niemand gevonden voor "${idf}". Typ een r-nummer (bv. r0123456) of een KU Leuven-mailadres.`; }
        st.busy = false; draw();
        const q = body.querySelector('#kg-q'); if (q && !st.q && st.ppl.length < (a.maxParticipants || 99) && st.ppl.length < (a.minParticipants || 1)) q.focus();
      };
      // a whole group at once (from Groepswerken): look everyone up by e-mail, one after the other
      const addGroup = async (g) => {
        if (!g || st.busy) return;
        st.busy = true; st.err = ''; draw();
        const miss = [];
        for (const em of g.m) {
          if (st.ppl.length >= (a.maxParticipants || 99)) { miss.push(em); continue; }
          if (st.ppl.some((y) => String(y.email || '').toLowerCase() === em || (me.email && String(me.email).toLowerCase() === em))) continue;
          try {
            const x = await memo('pp:' + em, 24 * 3600e3, () => get('/participants/' + encodeURIComponent(em)));
            if (!x || !x.uid) throw new Error('');
            if (!st.ppl.some((y) => y.uid.toUpperCase() === x.uid.toUpperCase())) st.ppl.push({ uid: x.uid, email: x.email });
          } catch (_) { miss.push(em); }
        }
        if (g.n && (!st.subj || st.subj === 'Groepswerk')) st.subj = (g.c ? g.c + ' – ' : '') + g.n;
        st.busy = false;
        if (miss.length) st.err = st.ppl.length >= (a.maxParticipants || 99) ? `Dit lokaal is voor max. ${a.maxParticipants} personen: niet iedereen past erin.` : `Niet gevonden in KURT: ${miss.join(', ')}. Voeg ze toe met hun r-nummer.`;
        draw();
      };
      body.addEventListener('input', (e) => { if (e.target.id === 'kg-subj') { st.subj = e.target.value; const b = body.querySelector('[data-act="gbook"]'); const need = Math.max(0, (a.minParticipants || 1) - st.ppl.length); const ok = !need && (!(res && res.subjectIsRequired) || st.subj.trim().length >= 4); b.disabled = !ok; b.textContent = need ? `Nog ${need} ${need === 1 ? 'groepslid' : 'groepsleden'} nodig` : ok ? `Reserveer · ${hm(st.si * slot)}–${hm(st.end)}` : 'Vul een onderwerp in (min. 4 tekens)'; } else if (e.target.id === 'kg-q') st.q = e.target.value; });
      body.addEventListener('submit', (e) => { e.preventDefault(); add(st.q); });
      kb.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-act]');
        if (!b) return;
        const act = b.dataset.act;
        if (act === 'end') { st.end = Number(b.dataset.m); draw(); return; }
        if (act === 'start') { st.si = Number(b.dataset.i); pickEnd(); draw(); return; }
        if (act === 'gdel') { st.ppl = st.ppl.filter((x) => x.me || x.uid !== b.dataset.u); draw(); return; }
        if (act === 'gmate') { const m = (store.get('kurt:mates') || []).find((x) => x.uid === b.dataset.u); if (m && st.ppl.length < (a.maxParticipants || 99)) { st.ppl.push({ uid: m.uid, email: m.email }); draw(); } return; }
        if (act === 'gtime') { st.pick = true; draw(); return; }
        if (act === 'ggrp') { addGroup(GRPS()[Number(b.dataset.i)]); return; }
        if (act === 'done') { closeBook(); ss.del('tm4-kurt-g'); nav('#/'); return; }
        if (act !== 'gbook' || b.disabled) return;
        b.disabled = true; b.innerHTML = '<span class="spin"></span> Reserveren…';
        try {
          if (!res) res = await memo('res:' + a.id, 30 * 60e3, () => get(`/resources/${a.id}?withDetails=true`));
          const end = st.end, start = st.si * slot;
          const endDate = end >= 1440 ? ymd(addDays(fromYmd(day), 1)) : day;
          const endTime = end >= 1440 ? '00:00' : hm(end);
          const parts = st.ppl.map(({ uid, email }) => ({ uid, email }));
          const subject = st.subj.trim() || res.name;
          // the same reservation KURT's own page sends
          const payload = {
            id: res.id, resourceName: res.name, subject, purpose: '', resourceId: a.id,
            startDate: day, startTime: hm(start), endDate, endTime, participants: parts,
            summary: [`Resource **${a.name}**`, `at **${a.unit}**`, `for **${parts.map((x) => String(x.email || '').replace('@', '&commat;')).join(', ')}**`, `from **${enDate(day)} ${hm(start)}** until **${enDate(endDate)} ${endTime}**`],
            withCheckIn: false,
          };
          if (res.additionalFields) payload.additionalFields = res.additionalFields;
          await send('POST', '/reservations/', payload);
          store.set('kurt:gsubj', subject);
          const others = parts.filter((x) => !me.uid || x.uid !== me.uid);
          store.set('kurt:mates', others.concat((store.get('kurt:mates') || []).filter((m) => !others.some((o) => o.uid === m.uid))).slice(0, 12));
          freshRes(); memoClear();
          kb.querySelector('.kb-when').hidden = true;
          body.innerHTML = `<div class="kb-ok">${ico('check')}<b>Gereserveerd</b><span>${esc(nm(a.name))} · ${esc(dayLbl(day))} ${hm(start)}–${hm(end)}</span><span>${parts.length} personen. Check in met de QR-code in het lokaal, binnen het eerste halfuur.</span></div><button type="button" class="btn kb-go" data-act="done">Klaar</button>`;
        } catch (err) {
          st.err = err.message || 'Reserveren lukte niet'; draw();
        }
      });
      draw();
      if (activeGrp()) addGroup(activeGrp());
    }

    /* ---------- a room: the floor plan */
    let Z = null; // current map state
    async function viewZone(id, q, my) {
      const lid = zoneLoc[id];
      setNav({ back: { label: 'Terug', act: 'kback', href: lid ? '#/l/' + lid : '#/' }, title: '', always: true });
      const known = ZONES[id];
      const fp0 = (store.get('kurt:fp') || {})[id];
      put(sec, `<div class="kmap-wrap"><div class="kw sk"></div><div class="kmap sk">${fp0 ? `<img class="kmap-pre" src="${esc(fp0)}" alt="">` : ''}</div></div>${skGroup(2)}`);
      let zone;
      if (known) zone = { id: Number(id), locationId: known.l, name: known.n, resourceTypeIds: known.t };
      else {
        try { zone = await get('/zones/' + id); } catch (e) { if (my === token) put(sec, empty('warn', 'Plattegrond kon niet geladen worden', '', `<p style="margin-top:14px"><a class="btn" href="${esc(ORIG('/zone/' + id))}">Open in KURT</a></p>`)); return; }
        ZONES[id] = { l: zone.locationId, n: (zone.name || '').trim(), t: zone.resourceTypeIds || [] }; store.set('kurt:zones', ZONES);
      }
      zoneLoc[id] = zone.locationId; store.set('kurt:zl', zoneLoc);
      const par = await parFor(zone.locationId, zone.resourceTypeIds).catch(() => null);
      if (par) PAR = par;
      const sel = pickTime(par);
      if (my !== token) return;
      if (!sel.t) { put(sec, empty('clock', 'Geen tijden beschikbaar', 'Deze ruimte is de komende dagen niet te reserveren.')); return; }
      let a;
      try { a = await zoneAvail(zone.locationId, id, sel.d.value, sel.t.value); } catch (e) { if (my === token) put(sec, empty('warn', 'Plattegrond kon niet geladen worden', '')); return; }
      if (my !== token) return;
      const unit = (a.location && a.location.unit) || '';
      document.title = ((a.zone && a.zone.name) || zone.name || '').trim() || 'Plattegrond';
      setNav({ back: { label: 'Terug', act: 'kback', href: '#/l/' + zone.locationId }, title: (a.zone && a.zone.name) || zone.name, always: true });
      const seats = a.availabilities || [];
      const free = seats.filter((s) => s.availableHours > 0).sort((x, y) => y.availableHours - x.availableHours || String(x.resourceName).localeCompare(String(y.resourceName), 'nl', { numeric: true }));
      const fp = a.floorPlan || {};
      const W0 = fp.floorPlanWidth || 1000, H0 = fp.floorPlanHeight || 1000;
      let h = `<div class="kmap-wrap">${whenPill(sel)}
        <div class="kmap" id="kmap"><div class="kp" style="width:${W0}px;height:${H0}px">${fp.floorPlanUrl ? `<img src="${esc(fp.floorPlanUrl)}" alt="Plattegrond ${esc(zone.name)}" draggable="false">` : ''}
        ${seats.map((s) => `<i class="ks${s.availableHours > 0 ? ' free' : ''}${isSeatFav(s.resourceId) ? ' fav' : ''}" data-r="${s.resourceId}" style="left:${s.positionX}px;top:${s.positionY}px">${s.availableHours > 0 ? s.availableHours : ''}</i>`).join('')}</div>
        <div class="kmap-tools"><button type="button" data-act="zin" aria-label="Inzoomen">+</button><button type="button" data-act="zout" aria-label="Uitzoomen">−</button><button type="button" data-act="zfit" aria-label="Hele plattegrond">⤢</button></div>
        <div class="kmap-cnt${free.length ? '' : ' none'}"><b>${free.length || 'Niets'}</b> ${free.length === 1 ? 'plaats' : 'plaatsen'} vrij</div>
        <div class="kmap-leg"><span><i class="ks free">n</i> n uur vrij</span><span><i class="ks"></i> bezet</span></div>
        <button type="button" class="kmap-list" data-act="list">${free.length ? `Lijst (${free.length})` : 'Lijst'}</button></div></div>`;
      put(sec, h);
      // favourite seats first, then the longest free
      free.sort((x, y) => (isSeatFav(y.resourceId) ? 1 : 0) - (isSeatFav(x.resourceId) ? 1 : 0));
      Z = { id, zone, sel, seats, free, unit, W0, H0 };
      initMap();
      // from a favourite: open that seat
      const want = Number(q.get('seat'));
      if (want) {
        const st = seats.find((x) => x.resourceId === want);
        if (st) setTimeout(() => pickSeat(want), 250);
        try { history.replaceState(null, '', K + '/#/z/' + id); } catch (_) {}
      }
    }

    /* ---------- find my seat: from a booking to the library, the room and the seat on its floor plan */
    // KURT knows where each library is (address + coordinates) and where each seat sits on its room's floor plan, but a
    // booking doesn't say which room: all rooms of the library are asked once (at the booked hour, in parallel) and the
    // answer is remembered per seat (kurt:sz).
    async function viewFind(id, my) {
      setNav({ back: { label: 'Terug', act: 'kback', href: '#/' }, title: '', always: true });
      put(sec, `<div class="card kf-card"><div class="sk" style="height:46px"></div><div class="sk" style="height:38px;margin-top:10px"></div></div><div class="kmap-wrap"><div class="kmap sk"></div></div>`);
      const fail = (t, sub) => { if (my === token) put(sec, empty('warn', t, sub || '', `<p style="margin-top:14px"><a class="btn" href="#/">Naar Studieplek</a></p>`)); };
      let list = store.get('kurt:res') ? store.get('kurt:res').v : null;
      let r = list && list.find((x) => String(x.id) === id);
      if (!r) {
        try { list = await get('/reservations'); store.set('kurt:res', { ts: Date.now(), v: list }); } catch (e) { fail('KURT reageert niet', 'Probeer het straks opnieuw.'); return; }
        r = (list || []).find((x) => String(x.id) === id);
      }
      if (my !== token) return;
      if (!r) { fail('Deze reservatie bestaat niet meer'); return; }
      const isRoom = !/\d\s*$/.test(String(r.resourceName || ''));
      const what = isRoom ? 'Groepsruimte ' + nm(r.resourceName) : nm(r.resourceName);
      document.title = what;
      setNav({ back: { label: 'Terug', act: 'kback', href: '#/' }, title: what, always: true });
      let tiles = (store.get('kurt:locinfo') || {}).tiles;
      if (!tiles) { try { tiles = await memo('tiles', 10 * 60e3, () => get('/tiles')); } catch (_) { tiles = []; } }
      let hit = libOf(r, tiles.flatMap((t) => t.locations));
      if (!hit) { const x = await resLoc(r.resourceId).catch(() => null); if (x) hit = { id: x }; }
      if (my !== token) return;
      if (!hit) { fail('Bibliotheek niet gevonden', nm(r.resourceName)); return; }
      const lid = hit.id;
      let L;
      try { L = await memo('loc:' + lid, 10 * 60e3, () => get('/locations/' + lid)); } catch (e) { fail('KURT reageert niet', 'Probeer het straks opnieuw.'); return; }
      if (my !== token) return;
      keepZones(lid, L.zones);
      // which room? the one we found before, else ask all rooms of the library at once
      const SZ = store.get('kurt:sz') || {};
      const zones = L.zones || [];
      const look = (z) => zoneAvail(lid, z.id, r.startDate, r.startTime).then((a) => ({ z, a, st: (a.availabilities || []).find((x) => x.resourceId === r.resourceId) }), () => null);
      let f = null;
      const known = zones.find((z) => z.id === SZ[r.resourceId]);
      if (known) { f = await look(known); if (f && !f.st) f = null; }
      if (!f) f = (await Promise.all(zones.map(look))).find((x) => x && x.st) || null;
      if (my !== token) return;
      if (f) { SZ[r.resourceId] = f.z.id; store.set('kurt:sz', SZ); zoneLoc[f.z.id] = lid; store.set('kurt:zl', zoneLoc); }
      const ll = L.navigationUrl && /query=([-\d.]+)%2C([-\d.]+)/.exec(L.navigationUrl);
      const route = ll ? `https://maps.apple.com/?daddr=${ll[1]},${ll[2]}&dirflg=w&q=${encodeURIComponent(L.unit)}` : L.address ? `https://maps.apple.com/?daddr=${encodeURIComponent(L.address)}&dirflg=w` : '';
      const now = Date.now(), s0 = fromYmd(r.startDate, r.startTime), e0 = r.endTime === '00:00' ? fromYmd(r.endDate, '24:00') : fromYmd(r.endDate, r.endTime);
      const live = now >= s0 - 15 * 60e3 && now < e0;
      const cin = live && isIn(r);
      const dn = esc(nm(r.resourceName) + ' · ' + dayLbl(r.startDate) + ' ' + r.startTime + '–' + (r.endTime === '00:00' ? '24:00' : r.endTime));
      const ciBtn = (cls) => `<button type="button" class="${cls}${cin ? ' red' : ' pri'}" data-act="${cin ? 'checkout' : 'checkin'}" data-r="${esc(r.resourceId)}" data-id="${esc(r.id)}" data-n="${dn}">${cin ? 'Uitchecken' : 'Inchecken'}</button>`;
      const zname = f ? (f.z.name || '').trim() : '';
      const street = String(L.address || '').replace(/\s*,\s*\d{4}\s.*$/, '').replace(/\s+/g, ' ').trim();
      const seat = seatNo(r.resourceName);
      let h = `<div class="card kf-card">
        <div class="kr-top">${isRoom ? `<span class="kr-seat kr-room">${GROUP}</span>` : `<span class="kr-seat">${esc(seat)}</span>`}<span class="kr-main"><b>${esc(what)}</b><span>${esc(dayLbl(r.startDate))} ${esc(r.startTime)}–${esc(r.endTime === '00:00' ? '24:00' : r.endTime)}${cin ? ' · ingecheckt' : live ? ' · nu' : ' · ' + esc(until(s0))}</span></span></div>
        <ol class="kf-steps">
          <li><i>1</i><span class="kr-main"><b>${esc(L.unit)}</b><span>${esc([street, openTxt(L)].filter(Boolean).join(' · '))}</span></span>${route ? `<a class="kf-go" href="${esc(route)}">${ico('pin')}Route</a>` : ''}</li>
          ${f ? `<li><i>2</i><span class="kr-main"><b>${esc(zname)}</b><span>${isRoom ? 'Het lokaal' : `Plaats ${esc(seat)}`} staat hieronder op de plattegrond</span></span></li>` : ''}
        </ol></div>`;
      if (!f || !f.a.floorPlan || !f.a.floorPlan.floorPlanUrl) {
        h += `<p class="ko-hint">${ico('info')}KURT heeft geen plattegrond voor deze plaats. Vraag de weg aan de balie van de bibliotheek.</p>`;
        if (live) h += `<div class="kr-acts kf-ci">${ciBtn('')}</div>`;
        put(sec, h);
        return;
      }
      const fp = f.a.floorPlan, W0 = fp.floorPlanWidth || 1000, H0 = fp.floorPlanHeight || 1000;
      const seats = f.a.availabilities || [];
      h += `<div class="kmap-wrap"><div class="kmap kf-map" id="kmap"><div class="kp" style="width:${W0}px;height:${H0}px"><img src="${esc(fp.floorPlanUrl)}" alt="Plattegrond ${esc(zname)}" draggable="false">
        ${seats.map((x) => (x.resourceId === r.resourceId ? '' : `<i class="ks" style="left:${x.positionX}px;top:${x.positionY}px"></i>`)).join('')}
        <i class="ks me${isRoom ? ' room' : ''}" data-r="${f.st.resourceId}" style="left:${f.st.positionX}px;top:${f.st.positionY}px">${isRoom ? '' : esc(seat)}</i></div>
        <div class="kmap-tools"><button type="button" data-act="zin" aria-label="Inzoomen">+</button><button type="button" data-act="zout" aria-label="Uitzoomen">−</button><button type="button" data-act="zfit" aria-label="Hele plattegrond">⤢</button><button type="button" data-act="zme" aria-label="Naar mijn plaats">${ico('pin')}</button></div>
        <div class="kmap-cnt kf-tag">${isRoom ? 'Hier is je lokaal' : `Hier is <b>plaats ${esc(seat)}</b>`}</div>
        ${live ? ciBtn('kmap-list kf-cib') : ''}</div></div>`;
      put(sec, h);
      Z = { id: f.z.id, zone: f.z, seats: [f.st], free: [], unit: L.unit, W0, H0, find: r.resourceId };
      initMap();
      // zoom in on the seat, and again once the map has its final size
      const go = () => { if (Z && Z.find === r.resourceId && Z.focus && $('#kmap')) Z.focus(r.resourceId); };
      setTimeout(go, 60); setTimeout(go, 480);
    }

    function listSheet() {
      if (!Z) return;
      const { free, sel } = Z;
      const layer = kbLayer(`
        <div class="kw-h"><b>${free.length ? `${free.length} ${free.length === 1 ? 'plaats' : 'plaatsen'} vrij` : 'Niets vrij'}</b><span class="kl-sub">${esc(dayLbl(sel.d.value))} vanaf ${esc(sel.t.display)} · ${esc((Z.zone.name || '').trim())}</span></div>
        ${free.length ? `<div class="kfree">${free.map((x) => `<button type="button" class="kf${isSeatFav(x.resourceId) ? ' fav' : ''}" data-r="${x.resourceId}"><b>${esc(seatNo(x.resourceName))}</b><span>${x.availableHours} u</span></button>`).join('')}</div>` : `<p class="ko-hint">${ico('info')}Kies een ander uur of een andere ruimte.</p>`}
        <button type="button" class="btn ghost kl-when" data-w="1">${ico('clock')}Andere dag of uur</button>
        <p class="fresh"><a href="${esc(ORIG('/zone/' + Z.id))}">Open in KURT</a></p>`);
      const scrim = layer.querySelector('.scrim'), kb = layer.querySelector('.kb');
      const close = () => { scrim.classList.remove('on'); kb.classList.remove('on'); setTimeout(() => layer.remove(), 320); };
      scrim.addEventListener('click', close);
      kb.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.r) { close(); pickSeat(Number(b.dataset.r)); }
        else if (b.dataset.w) { close(); whenSheet(); }
      });
    }

    function initMap() {
      const box = $('#kmap');
      if (!box) return;
      const kp = box.querySelector('.kp');
      // the map takes the rest of the screen, so the page itself doesn't need to scroll
      const fitH = () => {
        const tabs = $('#tm-tabs');
        const top = box.getBoundingClientRect().top + W.scrollY;
        const vh = Math.min(W.innerHeight, document.documentElement.clientHeight || W.innerHeight);
        box.style.height = Math.max(300, vh - top - (tabs ? tabs.offsetHeight : 0) - 10) + 'px';
      };
      fitH();
      // once the slide-in is over, measure again (and fit the plan to the final size)
      setTimeout(() => { if ($('#kmap') === box) { const h0 = box.style.height; fitH(); if (box.style.height !== h0) reset(false); } }, 420);
      const { W0, H0 } = Z;
      let s = 1, x = 0, y = 0, fit = 1;
      const bw = () => box.clientWidth, bh = () => box.clientHeight;
      const clamp = () => {
        const w = W0 * s, hh = H0 * s;
        x = w <= bw() ? (bw() - w) / 2 : Math.min(0, Math.max(bw() - w, x));
        y = hh <= bh() ? (bh() - hh) / 2 : Math.min(0, Math.max(bh() - hh, y));
      };
      const apply = (anim) => {
        clamp();
        kp.style.transition = anim ? 'transform .28s cubic-bezier(.2,.85,.25,1)' : 'none';
        kp.style.transform = `translate3d(${x}px,${y}px,0) scale(${s})`;
        kp.style.setProperty('--k', String(1 / s));
      };
      const MAX = () => Math.max(fit * 4, 1.2);
      const zoomAt = (ns, cx, cy, anim) => {
        ns = Math.max(fit, Math.min(MAX(), ns));
        x = cx - ((cx - x) * ns) / s; y = cy - ((cy - y) * ns) / s; s = ns; apply(anim);
      };
      const reset = (anim) => { fit = Math.min(bw() / W0, bh() / H0); s = fit; x = 0; y = 0; apply(anim); };
      Z.reset = reset;
      Z.focus = (rid) => {
        const st = Z.seats.find((q) => q.resourceId === rid);
        if (!st) return;
        const ns = Math.max(s, Math.min(MAX(), fit * 2.6));
        s = ns; x = bw() / 2 - st.positionX * s; y = bh() * 0.3 - st.positionY * s; apply(true);
        if (Z.find) return;
        $$('.ks.sel', kp).forEach((n) => n.classList.remove('sel'));
        const n = kp.querySelector(`.ks[data-r="${rid}"]`);
        if (n) n.classList.add('sel');
      };
      Z.zoom = (f) => zoomAt(s * f, bw() / 2, bh() / 2, true);
      reset(false);
      const img = kp.querySelector('img');
      if (img && !img.complete) img.addEventListener('load', () => box.classList.remove('sk'), { once: true }); else box.classList.remove('sk');
      W.addEventListener('resize', () => { if ($('#kmap') === box) { fitH(); reset(false); } });
      // touch: one finger pans, two fingers pinch, a tap picks the nearest seat, a double tap zooms in
      const pts = new Map();
      let start = null, lastTap = 0;
      const mid = () => { const v = [...pts.values()]; return v.length > 1 ? { cx: (v[0].x + v[1].x) / 2, cy: (v[0].y + v[1].y) / 2, d: Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y) } : { cx: v[0].x, cy: v[0].y, d: 0 }; };
      const rel = (e) => { const r = box.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      box.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.kmap-tools')) return;
        box.setPointerCapture(e.pointerId);
        pts.set(e.pointerId, rel(e));
        const m = mid();
        start = { s, x, y, m, t: Date.now(), moved: false, multi: pts.size > 1 || (start && start.multi && pts.size > 1) };
      });
      box.addEventListener('pointermove', (e) => {
        if (!pts.has(e.pointerId) || !start) return;
        pts.set(e.pointerId, rel(e));
        const m = mid();
        if (Math.hypot(m.cx - start.m.cx, m.cy - start.m.cy) > 7 || pts.size > 1) start.moved = true;
        if (pts.size > 1 && start.m.d) {
          const ns = Math.max(fit * 0.85, Math.min(MAX(), start.s * (m.d / start.m.d)));
          x = m.cx - ((start.m.cx - start.x) * ns) / start.s; y = m.cy - ((start.m.cy - start.y) * ns) / start.s; s = ns;
        } else { x = start.x + (m.cx - start.m.cx); y = start.y + (m.cy - start.m.cy); }
        apply(false);
      });
      const up = (e) => {
        if (!pts.has(e.pointerId)) return;
        const p = pts.get(e.pointerId);
        pts.delete(e.pointerId);
        if (pts.size) { start = { s, x, y, m: mid(), t: Date.now(), moved: true }; return; }
        if (s < fit) { s = fit; apply(true); }
        if (start && !start.moved && Date.now() - start.t < 450) {
          const now = Date.now();
          const px = (p.x - x) / s, py = (p.y - y) / s;
          let best = null, bd = Infinity;
          Z.seats.forEach((q) => { const d = Math.hypot(q.positionX - px, q.positionY - py) * s; if (d < bd) { bd = d; best = q; } });
          if (!Z.find && best && bd < 26) { lastTap = 0; pickSeat(best.resourceId); }
          else if (now - lastTap < 320) { lastTap = 0; zoomAt(s * 2, p.x, p.y, true); }
          else lastTap = now;
        }
        start = null;
      };
      box.addEventListener('pointerup', up);
      box.addEventListener('pointercancel', up);
      box.addEventListener('wheel', (e) => { e.preventDefault(); const r = rel(e); zoomAt(s * (e.deltaY < 0 ? 1.15 : 0.87), r.x, r.y, false); }, { passive: false });
      box.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
      box.addEventListener('gesturestart', (e) => e.preventDefault());
    }

    /* ---------- bottom sheets: one way to open them (closing differs per sheet) */
    function kbLayer(inner) {
      const layer = document.createElement('div');
      layer.setAttribute('data-tm4', '');
      layer.innerHTML = `<div class="scrim"></div><div class="kb" role="dialog" aria-modal="true"><div class="kb-grab"></div><div class="kb-in">${inner}</div></div>`;
      document.body.appendChild(layer);
      const sc = layer.querySelector('.scrim'), kb = layer.querySelector('.kb');
      requestAnimationFrame(() => requestAnimationFrame(() => { sc.classList.add('on'); kb.classList.add('on'); }));
      return layer;
    }
    /* ---------- booking sheet */
    let bookLayer = null;
    function closeBook() {
      if (!bookLayer) return;
      const l = bookLayer; bookLayer = null;
      l.querySelector('.scrim').classList.remove('on'); l.querySelector('.kb').classList.remove('on');
      setTimeout(() => l.remove(), 320);
      $$('.ks.sel').forEach((n) => n.classList.remove('sel'));
    }
    async function pickSeat(rid) {
      if (!Z) return;
      const st = Z.seats.find((q) => q.resourceId === rid);
      if (!st) return;
      if (Z.focus) Z.focus(rid);
      closeBook();
      const { d, t } = Z.sel;
      const layer = kbLayer(`
        <div class="kb-h"><span class="kr-seat">${esc(seatNo(st.resourceName))}</span><span class="kr-main"><b>${esc(nm(st.resourceName))}</b><span>${esc(Z.unit)} · ${esc((Z.zone.name || '').trim())}</span></span><button type="button" class="kb-fav" data-act="sfav" aria-label="Favoriete stoel">${STAR(isSeatFav(rid))}</button></div>
        <button type="button" class="kb-when" data-act="swhen">${ico('clock')}<span><b>${esc(dayLbl(d.value))}</b> vanaf ${esc(t.display)}</span><em>Wijzig</em></button>
        <div class="kb-body">${skRows(2)}</div>`);
      bookLayer = layer;
      const scrim = layer.querySelector('.scrim'), kb = layer.querySelector('.kb'), body = kb.querySelector('.kb-body');
      scrim.addEventListener('click', closeBook);
      let book = null; // filled in once KURT says the seat can be booked
      kb.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-act]');
        if (!b) return;
        const act = b.dataset.act;
        if (act === 'sfav') {
          const f = seatFavs(), on = isSeatFav(rid);
          store.set('kurt:seats', on ? f.filter((x) => x.rid !== rid) : [{ rid, name: st.resourceName, zone: Number(Z.id), zname: (Z.zone.name || '').trim(), loc: Z.zone.locationId, unit: Z.unit }].concat(f).slice(0, 8));
          b.innerHTML = STAR(!on);
          const n = document.querySelector(`.ks[data-r="${rid}"]`); if (n) n.classList.toggle('fav', !on);
          toast(on ? 'Uit je favorieten' : 'Favoriete stoel: je vindt hem op Studieplek');
          return;
        }
        if (act === 'swhen') {
          // another day or hour, then straight back to this seat
          const zid = Z.id;
          closeBook();
          whenSheet(() => { quiet = true; __TM_REPL__(K + '/#/z/' + zid + '?seat=' + rid); });
          return;
        }
        if (act === 'done') { closeBook(); nav('#/'); return; }
        if (!book) return;
        if (act === 'end') { book.end = Number(b.dataset.m); book.draw(); return; }
        if (act !== 'book' || b.disabled) return;
        b.disabled = true; b.innerHTML = '<span class="spin"></span> Reserveren…';
        const { av, res, end } = book;
        const me = ME || {};
        const endDate = end >= 1440 ? ymd(addDays(fromYmd(d.value), 1)) : d.value;
        const endTime = end >= 1440 ? '00:00' : hm(end);
        const parts = me.uid ? [{ uid: me.uid, email: me.email }] : [];
        // the same reservation KURT's own page sends
        const payload = {
          id: res.id, resourceName: res.name, subject: res.name, purpose: '', resourceId: av.id,
          startDate: d.value, startTime: t.value, endDate, endTime, participants: parts,
          summary: [`Resource **${av.name}**`, `at **${av.unit}**`, `for **${parts.map((x) => x.email.replace('@', '&commat;')).join(', ')}**`, `from **${enDate(d.value)} ${t.value}** until **${enDate(endDate)} ${endTime}**`],
          withCheckIn: false,
        };
        if (res.additionalFields) payload.additionalFields = res.additionalFields;
        try {
          await send('POST', '/reservations/', payload);
          freshRes(); memoClear();
          book = null;
          kb.querySelector('.kb-when').hidden = true;
          put(body, `<div class="kb-ok">${ico('check')}<b>Gereserveerd</b><span>${esc(nm(st.resourceName))} · ${esc(dayLbl(d.value))} ${esc(t.display)}–${hm(end)}</span><span>Check in met de QR-code op je plek, binnen het eerste halfuur.</span></div><button type="button" class="btn kb-go" data-act="done">Klaar</button>`);
        } catch (err) {
          book.draw();
          body.insertAdjacentHTML('afterbegin', `<p class="ko-hint err">${ico('warn')}${esc(err.message || 'Reserveren lukte niet')}</p>`);
        }
      });
      const taken = `<p class="ko-hint">${ico('info')}Deze plaats is niet vrij ${esc(dayLbl(d.value).toLowerCase())} om ${esc(t.display)}. Tik hierboven op Wijzig voor een andere dag of een ander uur.</p>`;
      let ra, res;
      try {
        const e1 = toMin(t.value) + 60;
        const ed = e1 >= 1440 ? ymd(addDays(fromYmd(d.value), 1)) : d.value;
        [ra, res] = await Promise.all([
          get(`/resourceavailabilities?resourceId=${rid}&startDate=${d.value}&startTime=${t.value}&endDate=${ed}&endTime=${e1 >= 1440 ? '00:00' : hm(e1)}&participantCount=1&exactMatch=false`),
          memo('res:' + rid, 30 * 60e3, () => get(`/resources/${rid}?withDetails=true`)),
          meP.catch(() => ME),
        ]);
      } catch (e) { if (bookLayer === layer) put(body, `<p class="ko-hint">${ico('warn')}Deze plaats kon niet geladen worden.</p>`); return; }
      if (bookLayer !== layer) return;
      const list = (ra && ra.availabilities) || [];
      const av = list.find((q) => q.id === rid) || list[0];
      if (!av || !av.slotAllocation) { put(body, taken); return; }
      const slot = Math.round(1440 / (av.slotAllocation.length || 24)) || 60;
      const si = Math.round(toMin(t.value) / slot);
      const maxMin = av.maxDurationMinutes || 960;
      const ends = [];
      for (let i = si; i < av.slotAllocation.length && av.slotAllocation[i] === 'A' && (i - si + 1) * slot <= maxMin; i++) ends.push((i + 1) * slot);
      if (!ends.length) { put(body, taken); return; }
      const tags = (av.tags || []).map((g) => NL_TAGS[g.id] || g.name).filter(Boolean);
      const rules = ((res && (res.conditionsOfUseNlUrl || res.conditionsOfUseEnUrl)) || '').trim();
      book = { av, res, end: ends[Math.min(ends.length, 4) - 1] }; // up to 4 hours by default
      book.draw = () => {
        const s0 = toMin(t.value);
        put(body, `${tags.length ? `<p class="kb-tags">${tags.map((g) => `<span>${esc(g)}</span>`).join('')}</p>` : ''}
          <div class="kb-l">Tot wanneer?</div>
          <div class="chips kb-ends">${ends.map((m) => `<button type="button" class="chip${m === book.end ? ' on' : ''}" data-act="end" data-m="${m}">${hm(m)}<small>${dur(m - s0)}</small></button>`).join('')}</div>
          <button type="button" class="btn kb-go" data-act="book">Reserveer ${esc(seatNo(st.resourceName))} · ${esc(t.display)}–${hm(book.end)}</button>
          <p class="kb-legal">Je gaat akkoord met het ${rules ? `<a href="${esc(rules)}">reglement</a>` : 'reglement'}. Vergeet niet in te checken met de QR-code op je plek.</p>`);
        const on = body.querySelector('.kb-ends .chip.on');
        if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
      };
      book.draw();
    }

    // after booking or cancelling: get the list again right away, so the Agenda tab gets the new one
    function freshRes() { store.del('kurt:res'); get('/reservations').then((r) => { if (Array.isArray(r)) store.set('kurt:res', { ts: Date.now(), v: r }); }, () => {}); }
    /* ---------- your bookings go along to the Agenda tab (the portal is another site): ?kr=id~day~from~day~until~name!... */
    const withRes = (u) => {
      const c = store.get('kurt:res');
      if (!c || !Array.isArray(c.v) || !/^https:\/\/toledo\.kuleuven\.be\/portal/.test(u)) return u;
      const kr = krList(c.v).map((r) => [r.id, r.sd, r.st, r.ed, r.et, r.n.replace(/[~!]/g, ' ')].join('~')).join('!');
      return u + (u.includes('?') ? '&' : '?') + 'kr=' + encodeURIComponent(kr);
    };
    /* ---------- taps */
    W.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('#tm-tabs a');
      if (t) { e.preventDefault(); goTo(withRes(t.getAttribute('href')), { dir: 'back' }); return; }
      const a = e.target.closest && e.target.closest('a[href^="#/"]');
      if (a) {
        e.preventDefault();
        const href = a.getAttribute('href');
        nav(href);
        return;
      }
      const b = e.target.closest && e.target.closest('[data-act]');
      if (!b || b.closest('.kb')) return;
      const act = b.dataset.act;
      if (act === 'kback') { e.preventDefault(); back(); }
      else if (act === 'gkback') { e.preventDefault(); const u = ss.get('tm4-kurt-gback'); ss.del('tm4-kurt-g'); if (u && history.length > 1) history.back(); else if (u) goTo(ULTRA + '/ultra/calendar?tm=groepen', { dir: 'back' }); else __TM_REPL__(K + '/#/'); }
      else if (act === 'meer') { e.preventDefault(); goTo(withRes(PORTAL + '?tm=meer'), { dir: 'back' }); }
      else if (act === 'when') { e.preventDefault(); whenSheet(); }
      else if (act === 'list') { e.preventDefault(); listSheet(); }
      else if (act === 'seat') { e.preventDefault(); pickSeat(Number(b.dataset.r)); }
      else if (act === 'zin' || act === 'zout') { e.preventDefault(); if (Z && Z.zoom) Z.zoom(act === 'zin' ? 1.6 : 1 / 1.6); }
      else if (act === 'zfit') { e.preventDefault(); if (Z && Z.reset) Z.reset(true); }
      else if (act === 'zme') { e.preventDefault(); if (Z && Z.focus && Z.find) Z.focus(Z.find); }
      else if (act === 'fav') {
        e.preventDefault();
        const id = Number(b.dataset.id); const f = favs();
        store.set('kurt:fav', f.includes(id) ? f.filter((x) => x !== id) : [id].concat(f).slice(0, 6));
        b.innerHTML = STAR(!f.includes(id));
        toast(f.includes(id) ? 'Uit je favorieten' : 'Bij je favorieten op Studieplek');
      } else if (act === 'gday') {
        e.preventDefault();
        quiet = true; __TM_REPL__(K + '/#/g/' + b.dataset.l + '?d=' + b.dataset.d);
      } else if (act === 'groom') {
        e.preventDefault();
        if (!b.disabled) pickRoom(b.dataset.r, b.dataset.t ? Number(b.dataset.t) : undefined, b.dataset.e ? Number(b.dataset.e) : undefined);
      } else if (act === 'gt' || act === 'gu') {
        e.preventDefault();
        if (GR && GR.set) GR.set(act === 'gt' ? 't' : 'u', Number(b.dataset.v));
      } else if (act === 'checkin') {
        e.preventDefault();
        if (!b.disabled) validate(b, 10);
      } else if (act === 'checkout') {
        e.preventDefault();
        sheet({ title: 'Uitchecken?', msg: b.dataset.n + '. Je plaats komt meteen vrij voor iemand anders.', actions: [{ label: 'Uitchecken', red: true, run: () => validate(b, 20) }] });
      } else if (act === 'cancel') {
        e.preventDefault();
        const id = b.dataset.id;
        sheet({ title: 'Reservatie verwijderen?', msg: b.dataset.n, actions: [{ label: 'Reservatie verwijderen', red: true, run: () => {
          send('DELETE', '/reservations/' + encodeURIComponent(id) + '/').then(() => { toast('Reservatie verwijderd'); freshRes(); memoClear(); show(); }, (err) => toast(err.message || 'Annuleren lukte niet'));
        } }] });
      }
    });
    pullRefresh(() => { store.del('kurt:locs'); freshRes(); memoClear(); show(); return new Promise((r) => setTimeout(r, 900)); });
    show();
  }

  /* ================================================================== KU Leuven Print (printing from your phone) */
  // print.kuleuven.be is PaperCut MF: server-rendered HTML pages, no JSON API except a little job status call. The app
  // reads those pages in the background (fetch + DOMParser) and rebuilds them: your balance, what waits at the printer,
  // a print screen that walks PaperCut's three-step Web Print wizard for you, history, top-up, transfer and voucher.
  // Sending goes to "KU Leuven Print Anywhere": the job waits until you scan your card at any KU Leuven printer.
  function printApp() {
    const O = __TM_LOC__.origin;
    const PG = (n) => O + '/app?service=page/' + n;
    const ORIG = PG('UserSummary') + '&tm=orig';
    takeover('Printen', []);
    buildShell([
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: PORTAL + '?tm=meer' },
    ], 'meer');
    const main = $('#tm-main');
    const sec = document.createElement('section');
    sec.className = 'view on';
    sec.setAttribute('data-tm4', '');
    main.appendChild(sec);
    // no keepAlive here: a background ping that hits an expired PaperCut session can be sent on to its sign-out address

    /* ---------- reading PaperCut's pages */
    let DEAD = false;
    const parse = (t) => new DOMParser().parseFromString(t, 'text/html');
    async function page(url, opt) {
      let r;
      try { r = await fetch(url, Object.assign({ credentials: 'include', cache: 'no-store', redirect: 'manual' }, opt || {})); }
      catch (_) { throw new AuthError('net'); }
      // a redirect here means PaperCut lost your session (it would lead to signing out): don't follow it, sign in again
      if (r.type === 'opaqueredirect' || (r.status >= 300 && r.status < 400)) throw new AuthError('redirect');
      if (new URL(r.url).host !== location.host) throw new AuthError('login');
      const d = parse(await r.text());
      // signed out, the server answers with its own "Shibboleth Authentication Request" page instead
      if (!d.querySelector('a[href*="logoutLink"]')) throw new AuthError('login');
      d.querySelectorAll('script, .responsive-label').forEach((n) => n.remove());
      return d;
    }
    const post = (o) => page(O + '/app', { method: 'POST', body: new URLSearchParams(o) });
    const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
    const cell = (tr, cls) => txt(tr.querySelector('td.' + cls));
    // "1,087" (thousands) and "0,05" (Dutch decimals) both occur
    const num = (s) => {
      let v = String(s == null ? '' : s).replace(/[^\d,.\-]/g, '');
      v = /^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(v) ? v.replace(/,/g, '') : v.replace(',', '.');
      const n = parseFloat(v);
      return isNaN(n) ? null : n;
    };
    const eur = (v) => (v == null ? '' : (v < 0 ? '− ' : '') + '€ ' + Math.abs(v).toFixed(2).replace('.', ','));
    const MON = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const when = (s) => {
      const m = /([A-Z][a-z]{2}) (\d{1,2}), (\d{4}),? (\d{1,2}):(\d{2})(?::(\d{2}))? ?([AP]M)?/.exec(String(s || ''));
      if (!m) return 0;
      let h = Number(m[4]) % 12; if (m[7] === 'PM') h += 12; if (!m[7]) h = Number(m[4]);
      return new Date(Number(m[3]), MON[m[1]] || 0, Number(m[2]), h, Number(m[5]), Number(m[6] || 0)).getTime();
    };
    const dutchDay = (x) => { const m = /([A-Z][a-z]{2}) (\d{1,2}), (\d{4})/.exec(x || ''); return m ? `${m[2]} ${MONTHS_S[MON[m[1]] || 0]} ${m[3]}` : x; };
    const whenTxt = (t) => { if (!t) return ''; const n = dayDiff(t, Date.now()); return (n === 0 ? 'vandaag' : n === -1 ? 'gisteren' : dShort(t)) + ' ' + hhmm(t); };
    const pages = (n) => `${n} pagina${n === 1 ? '' : "'s"}`;
    // the KU Leuven Print Anywhere queues: colour x paper x sides
    const PA = 'icts-s-prt6';
    const QUEUES = {
      'bw-A4-2': 'KULeuvenBlack_A4_Double-Sided', 'bw-A4-1': 'KULeuvenBlack_A4_Single-sided', 'bw-A3-1': 'KULeuvenBlack_A3_Single-Sided',
      'col-A4-2': 'KULeuvenColor_A4_Double-Sided', 'col-A4-1': 'KULeuvenColor_A4_Single-sided', 'col-A3-1': 'KULeuvenColor_A3_Single-Sided',
    };
    const prName = (p) => {
      const s = String(p || '').split('\\').pop().trim();
      const m = /^KULeuven(Black|Colou?r)_(A\d)_(Single|Double)/i.exec(s);
      if (m) return `${m[2]}, ${/black/i.test(m[1]) ? 'zwart-wit' : 'kleur'}, ${/double/i.test(m[3]) ? 'dubbelzijdig' : 'enkelzijdig'}`;
      const known = (store.get('print:printers2') || { v: [] }).v.find((x) => x.p === s);
      return known && known.loc ? known.loc : s;
    };
    const isPA = (p) => /KULeuven(Black|Colou?r)_/i.test(String(p || ''));
    const msgOf = (d) => {
      const el = d.querySelector('.errorMessage, .error-message, .infoMessage, .status-messages');
      return txt(el);
    };

    async function loadSummary() {
      const d = await page(PG('UserSummary'));
      const li = (c) => txt(d.querySelector('#enviroTable .' + c));
      return { bal: num(txt(d.querySelector('.stat-bal .val'))), jobs: num(txt(d.querySelector('.stat-jobs .val'))), pages: num(txt(d.querySelector('.stat-pages .val'))), tree: li('trees'), co2: li('co2'), since: dutchDay(li('since-date').replace(/^Since\s*/i, '')) };
    }
    async function loadHeld() {
      const d = await page(PG('UserReleaseJobs'));
      return $$('#jobs-table tr', d).filter((tr) => tr.querySelector('td.dateColumnValue')).map((tr) => {
        const a = tr.querySelector('a[href*="ReleaseStationJobs.cancel"]');
        return { t: when(cell(tr, 'dateColumnValue')), p: cell(tr, 'printerColumnValue'), doc: cell(tr, 'documentColumnValue'), pages: num(cell(tr, 'pagesColumnValue')), cost: num(cell(tr, 'costColumnValue')), cancel: a ? a.getAttribute('href') : '', busy: /cancel+ing/i.test(cell(tr, 'actionColumnValue')) };
      }).filter((j) => !j.busy);
    }
    async function loadLogs() {
      const d = await page(PG('UserPrintLogs'));
      return $$('table.results tr', d).filter((tr) => tr.querySelector('td.usageDateColumnValue')).map((tr) => {
        const pg = tr.querySelector('td.totalPagesColumnValue');
        const col = /Color:\s*(\d+)/i.exec(txt(pg));
        const at = txt(tr.querySelector('td.attributesColumnValue'));
        const st = tr.querySelector('td.statusColumnValue');
        return { t: when(cell(tr, 'usageDateColumnValue')), p: cell(tr, 'printerDisplayNameColumnValue'), pages: num((txt(pg).split(' ')[0])), color: col ? Number(col[1]) : 0, cost: num(cell(tr, 'usageCostColumnValue')), doc: cell(tr, 'documentNameColumnValue'), a3: /A3/.test(at), duplex: /Duplex:\s*Yes/i.test(at), st: txt(st && (st.querySelector('a') || st.querySelector('td + td') || st)), free: /Not Charged/i.test(txt(st)) };
      });
    }
    async function loadTrans() {
      const d = await page(PG('UserTransactions'));
      return $$('table.results tr', d).filter((tr) => tr.querySelector('td.transactionDateColumnValue')).map((tr) => ({
        t: when(cell(tr, 'transactionDateColumnValue')), by: cell(tr, 'transactedByColumnValue'), amt: num(cell(tr, 'amountColumnValue')), after: num(cell(tr, 'balanceColumnValue')), type: cell(tr, 'transTypeColumnValue'), note: cell(tr, 'commentColumnValue'),
      }));
    }
    // Web Print jobs you just sent and that are still being processed (not yet waiting at the printer)
    async function loadFresh() {
      const d = parse(await (await fetch(PG('UserWebPrint'), { credentials: 'include', cache: 'no-store', redirect: 'manual' })).text());
      const rows = $$('img[id^="spinner-"]', d).map((img) => { const tr = img.closest('tr'); return { uid: img.id.slice(8), t: when(txt(tr.querySelector('td.submitTimeColumnValue'))), doc: txt(tr.querySelector('#document-name')) }; });
      const recent = rows.filter((r) => Date.now() - r.t < 30 * 60e3);
      const st = await Promise.all(recent.map((r) => jobStatus(r.uid).then((j) => Object.assign(r, { j }), () => null)));
      return st.filter((r) => r && r.j && r.j.status && r.j.status.code !== 'hold-release' && !(r.j.status.complete && !/error|fail|cancel/i.test(r.j.status.code)));
    }
    const jobStatus = (uid) => fetch(O + '/rpc/web-print/job-status/' + encodeURIComponent(uid) + '.json', { credentials: 'include', cache: 'no-store', redirect: 'manual', headers: { Accept: 'application/json' } }).then((r) => r.json());

    // sign in again the way a browser does: load the page once without the app, so the server's own page can
    // send you through the KU Leuven login (main.js lets that one load through); it brings you back here
    let GOING = false;
    const login = () => {
      if (GOING) return;
      GOING = true;
      ss.set('tm4-print-login', String(Date.now()));
      ss.set('tm4-print-pass', String(Date.now()));
      __TM_REPL__(O + '/');
    };
    const signIn = () => {
      if (GOING) return true;
      const last = Number(ss.get('tm4-print-login')) || 0;
      if (Date.now() - last > 45e3) { login(); return true; }
      return false;
    };
    const failed = (e, my) => {
      if (my !== token) return;
      DEAD = true; // the other loaders must not draw over this message
      if (e && e.auth) {
        if (signIn()) put(sec, `<div class="empty"><div class="spin"></div><b style="margin-top:14px">Aanmelden bij KU Leuven Print…</b></div>`);
        else put(sec, empty('lock', 'Niet aangemeld bij KU Leuven Print', 'Meld je even opnieuw aan met je KU Leuven-account.', `<p style="margin-top:14px"><button type="button" class="btn" data-act="plogin">Aanmelden</button></p>`));
      }
      else put(sec, empty('warn', 'KU Leuven Print reageert niet', 'Probeer het straks opnieuw.', `<p style="margin-top:14px"><a class="btn" href="${esc(ORIG)}">Open de website</a></p>`));
    };

    /* ---------- router: #/ home, #/nieuw print, #/historiek, #/opladen, #/overmaken, #/kaart */
    {
      const r = /^#\//.test(location.hash) ? location.hash : '#/';
      try { history.replaceState(null, '', PG('UserSummary') + r); } catch (_) {}
    }
    const route = () => {
      const h = location.hash.replace(/^#/, '') || '/';
      const [path, q] = h.split('?');
      return { name: path.split('/').filter(Boolean)[0] || 'home', q: new URLSearchParams(q || '') };
    };
    let depth = 0, token = 0;
    const nav = (hash) => { depth++; location.hash = hash; };
    const back = () => { if (depth > 0) { depth--; history.back(); } else __TM_REPL__(PG('UserSummary') + '#/'); };
    const backBtn = { label: 'Printen', href: '#/', act: 'pback' };
    const show = (anim) => {
      const my = ++token;
      DEAD = false;
      const r = route();
      sec.classList.remove('push', 'pop');
      if (anim) { void sec.offsetWidth; sec.classList.add(anim); }
      W.scrollTo(0, 0);
      const v = { nieuw: viewNew, historiek: viewHist, opladen: viewTopup, overmaken: viewTransfer, kaart: viewCard }[r.name] || viewHome;
      v(my, r.q);
    };
    let lastLen = history.length;
    W.addEventListener('hashchange', () => { show(history.length > lastLen ? 'push' : 'pop'); lastLen = history.length; });

    /* ---------- home */
    const PRINTER = ico('printer');
    const pagesFor = (bal) => (bal == null ? '' : `Genoeg voor ${Math.floor(bal / 0.05 + 1e-6)} pagina's zwart-wit of ${Math.floor(bal / 0.15 + 1e-6)} in kleur`);
    function balCard(s, extra) {
      return `<div class="card pr-bal"><span class="pr-bal-l">Je printsaldo</span><b class="pr-bal-v">${s && s.bal != null ? esc(eur(s.bal)) : '<span class="sk" style="display:inline-block;width:110px;height:34px"></span>'}</b><span class="pr-bal-s">${esc(s ? pagesFor(s.bal) : '')}</span>${extra || ''}</div>`;
    }
    function jobCard(j) {
      return `<div class="card pr-job"><span class="pr-doc">${ico('doc')}</span><span class="pr-job-t"><b>${esc(j.doc || 'Document')}</b><span>${esc([j.pages != null ? pages(j.pages) : '', j.cost != null ? eur(j.cost) : '', prName(j.p)].filter(Boolean).join(' · '))}</span></span>${j.cancel ? `<button type="button" class="kr-del" data-act="pcancel" data-h="${esc(j.cancel)}" data-n="${esc(j.doc || '')}" aria-label="Uit de wachtrij halen">${ico('close')}</button>` : ''}</div>`;
    }
    function viewHome(my) {
      document.title = 'Printen';
      setNav({ title: 'Printen', back: { label: 'Meer', href: PORTAL + '?tm=meer', act: 'meer' } });
      const d = { sum: (store.get('print:sum') || {}).v, held: (store.get('print:held') || {}).v, logs: (store.get('print:logs') || {}).v, fresh: [] };
      const draw = () => {
        if (my !== token || DEAD) return;
        let h = `<div class="lt"><h1>Printen</h1><p class="lt-sub">KU Leuven Print</p></div>`;
        h += balCard(d.sum, `<a class="pr-bal-go" href="${O}/topup/nl">${ico('plus')}Opladen</a>`);
        h += `<a class="pr-go" href="#/nieuw"><span class="pr-go-ic">${PRINTER}</span><span class="pr-go-t"><b>Document printen</b><span>PDF of Word van je iPhone naar elke KU Leuven-printer</span></span>${CHEV}</a>`;
        // just sent, still being prepared
        d.fresh.forEach((f) => {
          const err = /error|fail|cancel/i.test(f.j.status.code);
          h += `<div class="card pr-job${err ? ' err' : ' busy'}"><span class="pr-doc">${err ? ico('warn') : '<span class="spin"></span>'}</span><span class="pr-job-t"><b>${esc(f.j.documentName || f.doc)}</b><span>${esc(f.j.status.formatted || f.j.status.text || 'Bezig')}</span></span></div>`;
        });
        const held = d.held || [];
        h += `<div class="sh"><h2>Klaar om af te drukken</h2>${held.length ? `<span class="sh-note">${held.length}</span>` : ''}</div>`;
        if (d.held === undefined) h += skGroup(1);
        else if (d.held === null) h += `<div class="card ko-empty">${ico("warn")}<span>De wachtrij kon niet geladen worden. Trek omlaag om opnieuw te proberen.</span></div>`;
        else if (!held.length) h += `<div class="card ko-empty">${PRINTER}<span>Niets in de wachtrij. Verstuur een document, dan wacht het hier tot je het afdrukt.</span></div>`;
        else {
          h += held.map(jobCard).join('');
          const tot = held.reduce((a, j) => a + (j.cost || 0), 0);
          if (d.sum && d.sum.bal != null && tot > d.sum.bal + 1e-6) h += `<p class="ko-hint err">${ico('warn')}<span>Samen kost dit ${esc(eur(tot))}, meer dan je saldo. <a href="${O}/topup/nl">Laad eerst op.</a></span></p>`;
          h += `<p class="ko-hint">${ico('info')}<span>Scan je studentenkaart aan eender welke KU Leuven-printer en kies je document. Je betaalt pas als het afgedrukt is.</span></p>`;
        }
        const logs = (d.logs || []).slice(0, 4);
        h += `<div class="sh"><h2>Recent</h2>${d.logs && d.logs.length ? '<a href="#/historiek">Alles</a>' : ''}</div>`;
        if (d.logs === undefined) h += skGroup(3);
        else if (d.logs === null) h += `<div class="card ko-empty">${ico("warn")}<span>Je afdrukken konden niet geladen worden. Trek omlaag om opnieuw te proberen.</span></div>`;
        else if (!logs.length) h += `<div class="card ko-empty">${ico('clock')}<span>Je hebt nog niets afgedrukt.</span></div>`;
        else h += `<div class="group">${logs.map(logRow).join('')}</div>`;
        h += `<div class="gh">Meer</div><div class="group">`
          + row({ href: '#/historiek?t=saldo', iconHtml: `<span class="ic" style="--c:#34aadc">${ico('chart')}</span>`, title: 'Saldo en betalingen', sub: 'Wat je opgeladen en uitgegeven hebt' })
          + row({ href: '#/overmaken', iconHtml: `<span class="ic" style="--c:#5856d6">${ico('swap')}</span>`, title: 'Saldo doorgeven', sub: 'Aan een andere student' })
          + row({ href: '#/kaart', iconHtml: `<span class="ic" style="--c:#ff9500">${ico('idcard')}</span>`, title: 'Waardebon inwisselen', sub: 'Een code van een printkaart' })
          + row({ href: ORIG, iconHtml: `<span class="ic" style="--c:#8e8e93">${ico('globe')}</span>`, title: 'Originele website', external: true })
          + `</div>`;
        if (d.sum && d.sum.pages) h += `<p class="foot">${esc(nl(d.sum.pages, 0))} pagina's afgedrukt${d.sum.since ? ' sinds ' + esc(d.sum.since) : ''}${d.sum.tree ? ' · ' + esc(d.sum.tree.replace(/of a tree/i, 'van een boom').replace(/(\d)\.(\d)/, '$1,$2')) : ''}</p>`;
        put(sec, h);
        watchTitle(sec);
      };
      draw();
      // answers that arrive close together are drawn once (no jumping list while the page fills)
      let queued = false;
      const redraw = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; draw(); }); } };
      const keep = (k, v) => store.set('print:' + k, { ts: Date.now(), v });
      loadSummary().then((v) => { d.sum = v; keep('sum', v); redraw(); }, (e) => { if ((e && e.auth) || !d.sum) failed(e, my); });
      loadHeld().then((v) => { d.held = v; keep('held', v); redraw(); }, (e) => { if (e && e.auth) failed(e, my); else if (d.held === undefined) { d.held = null; redraw(); } });
      loadLogs().then((v) => { d.logs = v.slice(0, 30); keep('logs', d.logs); redraw(); }, (e) => { if (e && e.auth) failed(e, my); else if (d.logs === undefined) { d.logs = null; redraw(); } });
      // jobs that are still being prepared: follow them until they wait at the printer
      const poll = (n) => loadFresh().then((f) => {
        if (my !== token) return;
        const was = d.fresh.length;
        d.fresh = f; draw();
        if (f.some((x) => !x.j.status.complete && !/error|fail/i.test(x.j.status.code)) && n < 40) setTimeout(() => poll(n + 1), 2500);
        else if (was) loadHeld().then((v) => { d.held = v; keep('held', v); draw(); }, () => {});
      }, () => {});
      if (Date.now() - (Number(store.get('print:sent')) || 0) < 30 * 60e3) poll(0);
    }
    function logRow(l) {
      const bad = l.st && !/^printed$/i.test(l.st);
      const st = /cancel/i.test(l.st) ? 'Geannuleerd' : /printed/i.test(l.st) ? '' : l.st;
      const sub = [whenTxt(l.t), l.pages != null ? pages(l.pages) + (l.color ? `, ${l.color} in kleur` : '') : '', l.free ? 'niet aangerekend' : eur(l.cost)].filter(Boolean).join(' · ');
      return row({ iconHtml: `<span class="ic" style="--c:${bad ? '#8e8e93' : '#1f6f8b'}">${ico('doc')}</span>`, title: l.doc || 'Document', sub, end: st ? `<span class="pr-st">${esc(st)}</span>` : '', cls: bad ? 'muted' : '' });
    }

    /* ---------- print a document */
    let FILES = [];
    const OPT = Object.assign({ col: 'bw', size: 'A4', sides: '2', copies: 1, printer: null }, store.get('print:opt') || {});
    const saveOpt = () => store.set('print:opt', { col: OPT.col, size: OPT.size, sides: OPT.sides, printer: OPT.printer });
    const ACCEPT = '.pdf,.doc,.docx,.docm,.dot,.dotx,.dotm,.rtf,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/rtf';
    // how many pages has a PDF? Good enough for a price estimate; PaperCut counts exactly after sending
    async function countPages(f) {
      if (!/\.pdf$/i.test(f.name) && f.type !== 'application/pdf') return null;
      if (f.size > 40e6) return null;
      try {
        const s = new TextDecoder('latin1').decode(await f.arrayBuffer());
        let max = 0; const re = /\/Count\s+(\d+)/g; let m;
        while ((m = re.exec(s))) max = Math.max(max, Number(m[1]));
        const typ = (s.match(/\/Type\s*\/Page(?![a-zA-Z])/g) || []).length;
        return max || typ || null;
      } catch (_) { return null; }
    }
    function estimate() {
      if (!FILES.length || FILES.some((f) => f.pages == null)) return null;
      const sheets = FILES.reduce((a, f) => a + f.pages, 0) * OPT.copies;
      if (OPT.printer || OPT.size === 'A3') return { pages: sheets, cost: null };
      return { pages: sheets, cost: sheets * (OPT.col === 'col' ? 0.15 : 0.05) };
    }
    function viewNew(my) {
      document.title = 'Document printen';
      setNav({ title: 'Document printen', back: backBtn });
      const sum = (store.get('print:sum') || {}).v;
      const draw = () => {
        if (my !== token) return;
        if (OPT.size === 'A3') OPT.sides = '1';
        let h = `<div class="lt"><h1>Document printen</h1></div>`;
        if (!FILES.length) h += `<label class="pr-pick"><input type="file" multiple accept="${ACCEPT}" data-k="file">${ico('doc')}<b>Kies een bestand</b><span>PDF of Word, tot 55 MB. PDF geeft het mooiste resultaat.</span></label>`;
        else {
          h += `<div class="group">${FILES.map((f, i) => row({ iconHtml: `<span class="ic" style="--c:${/\.pdf$/i.test(f.file.name) ? '#e5484d' : '#0a84ff'}">${ico('doc')}</span>`, title: f.file.name, sub: [fsize(f.file.size), f.pages ? pages(f.pages) : f.pages === null ? '' : 'pagina\'s tellen…'].filter(Boolean).join(' · '), end: `<button type="button" class="pr-x" data-act="prm" data-i="${i}" aria-label="Weghalen">${ico('close')}</button>`, chevron: false })).join('')}</div>`;
          h += `<p class="fresh" style="margin-top:10px"><label class="pr-more"><input type="file" multiple accept="${ACCEPT}" data-k="file">+ Nog een bestand</label></p>`;
        }
        if (OPT.printer) {
          h += `<div class="gh">Printer</div><div class="group">${row({ act: 'pprinter', iconHtml: `<span class="ic">${PRINTER}</span>`, title: OPT.printer.loc || OPT.printer.p, sub: OPT.printer.p, end: '<span class="pr-st">Wijzig</span>' })}</div><p class="gf"><button type="button" data-act="pnoprinter">Terug naar Print Anywhere (elke printer)</button></p>`;
        } else {
          h += `<div class="gh">Kleur</div>${segHtml([{ id: 'bw', label: 'Zwart-wit' }, { id: 'col', label: 'Kleur' }], OPT.col, 'pcol')}`;
          h += `<div class="gh">Papier</div>${segHtml([{ id: 'A4', label: 'A4' }, { id: 'A3', label: 'A3' }], OPT.size, 'psize')}`;
          h += `<div class="gh">Zijden</div>${OPT.size === 'A3' ? `<p class="gf" style="margin-top:0">A3 drukt altijd enkelzijdig af.</p>` : segHtml([{ id: '2', label: 'Dubbelzijdig' }, { id: '1', label: 'Enkelzijdig' }], OPT.sides, 'psides')}`;
        }
        h += `<div class="gh">Aantal</div><div class="group plain"><div class="row pr-copies"><span class="main"><span class="t">Exemplaren</span></span><span class="pr-step"><button type="button" data-act="pcopy" data-d="-1" aria-label="Minder"${OPT.copies <= 1 ? ' disabled' : ''}>−</button><b>${OPT.copies}</b><button type="button" data-act="pcopy" data-d="1" aria-label="Meer">+</button></span></div></div>`;
        const est = estimate();
        let line = '';
        if (est) line = `${pages(est.pages)}${est.cost != null ? ` · ongeveer ${eur(est.cost)}` : ''}`;
        const low = est && est.cost != null && sum && sum.bal != null && est.cost > sum.bal + 1e-6;
        h += `<div class="pr-send">${line ? `<p class="pr-est">${esc(line)}${sum && sum.bal != null ? `<span>Je saldo: ${esc(eur(sum.bal))}</span>` : ''}</p>` : ''}${low ? `<p class="ko-hint err">${ico('warn')}<span>Je saldo is te laag voor dit document. <a href="${O}/topup/nl">Laad eerst op</a>, of verstuur het nu en laad op voor je afdrukt.</span></p>` : ''}
          <button type="button" class="btn pr-go-btn" data-act="psend"${FILES.length ? '' : ' disabled'}>${PRINTER}Versturen</button>
          <p class="kb-legal">${OPT.printer ? 'Je document gaat naar deze printer.' : 'Je document wacht tot je je studentenkaart scant aan eender welke KU Leuven-printer. Je betaalt pas bij het afdrukken (zwart-wit 5 cent per pagina, kleur 15 cent).'}</p>
          ${OPT.printer ? '' : `<p class="gf" style="margin:8px 0 0"><button type="button" data-act="pprinter">Een bepaalde printer kiezen</button></p>`}</div>`;
        put(sec, h);
        watchTitle(sec);
      };
      NEW.draw = draw;
      draw();
    }
    const NEW = { draw: () => {} };
    sec.addEventListener('change', (e) => {
      const inp = e.target.closest && e.target.closest('input[data-k="file"]');
      if (!inp || !inp.files || !inp.files.length) return;
      const add = Array.from(inp.files).filter((f) => f.size <= 55e6);
      if (add.length < inp.files.length) toast('Een bestand is groter dan 55 MB');
      add.forEach((file) => {
        const f = { file, pages: undefined };
        FILES.push(f);
        countPages(file).then((n) => { f.pages = n; NEW.draw(); });
      });
      inp.value = '';
      NEW.draw();
    });

    // PaperCut's Web Print wizard, step by step, the way its own pages post it
    function upload(url, files, onProgress) {
      return new Promise((resolve, reject) => {
        const fd = new FormData();
        files.forEach((f) => fd.append('file', f, f.name));
        const x = new XMLHttpRequest();
        x.open('POST', url);
        x.withCredentials = true;
        x.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(e.loaded / e.total); };
        x.onload = () => (x.status >= 200 && x.status < 300 ? resolve() : reject(new Error('Uploaden lukte niet (' + x.status + ')')));
        x.onerror = () => reject(new Error('Geen verbinding'));
        x.send(fd);
      });
    }
    async function sendJob(onStep) {
      const pr = OPT.printer ? { s: OPT.printer.s, p: OPT.printer.p } : { s: PA, p: QUEUES[`${OPT.col}-${OPT.size}-${OPT.size === 'A3' ? '1' : OPT.sides}`] };
      onStep('Printer kiezen…');
      await page(O + '/app?service=action/1/UserWebPrint/0/$ActionLink');
      let d = await post({ service: 'direct/1/UserWebPrintSelectPrinter/$Form', sp: 'S0', Form0: '$Hidden,$Hidden$0,$TextField,$Submit,$RadioGroup,$Submit$0,$Submit$1', $Hidden: pr.s, $Hidden$0: pr.p });
      if (!d.querySelector('#copies-input')) throw new Error(msgOf(d) || 'Deze printer kon niet gekozen worden');
      // step 2 answers with the upload page; its upload address sits in a script, so read the raw page
      const r2 = await fetch(O + '/app', { method: 'POST', credentials: 'include', redirect: 'manual', body: new URLSearchParams({ service: 'direct/1/UserWebPrintOptionsAndAccountSelection/$Form', sp: 'S0', Form0: 'copies,$Submit,$Submit$0', copies: String(OPT.copies), $Submit: '3. Upload Documents »' }) });
      const raw = await r2.text();
      const up = (/uploadFormSubmitURL\s*=\s*'([^']+)'/.exec(raw) || [])[1];
      if (!up) throw new Error(msgOf(parse(raw)) || 'Uploaden kon niet starten');
      await upload(O + up, FILES.map((f) => f.file), (p) => onStep(`Uploaden… ${Math.round(p * 100)}%`));
      onStep('Verwerken…');
      const r = await fetch(O + '/app', { method: 'POST', credentials: 'include', redirect: 'manual', body: new URLSearchParams({ service: 'direct/1/UserWebPrintUpload/$Form$0', sp: 'S1', Form1: '' }) });
      const done = parse(await r.text());
      const names = FILES.map((f) => f.file.name);
      const uids = $$('img[id^="spinner-"]', done).map((img) => ({ uid: img.id.slice(8), doc: txt(img.closest('tr').querySelector('#document-name')) })).filter((x) => names.includes(x.doc) || !names.length);
      const want = uids.slice(0, names.length);
      if (!want.length) { const m = msgOf(done); if (m && !/success/i.test(m)) throw new Error(m); }
      // follow PaperCut until the documents wait at the printer (or a minute has passed)
      const res = [];
      for (const w of want) {
        let j = null;
        for (let i = 0; i < 30; i++) {
          try { j = await jobStatus(w.uid); } catch (_) {}
          if (j && j.status && (j.status.code === 'hold-release' || j.status.complete)) break;
          await new Promise((ok) => setTimeout(ok, 2000));
        }
        res.push(j || { documentName: w.doc });
      }
      return res;
    }
    let sending = false;
    async function doSend(b) {
      if (sending || !FILES.length) return;
      sending = true;
      b.disabled = true;
      const set = (t) => { b.innerHTML = `<span class="spin"></span>${esc(t)}`; };
      try {
        store.set('print:sent', Date.now());
        const res = await sendJob(set);
        const bad = res.filter((j) => j.status && /error|fail|cancel/i.test(j.status.code));
        const pg = res.reduce((a, j) => a + (Number(j.pages) || 0), 0);
        const cost = res.reduce((a, j) => a + (num(j.cost) || 0), 0);
        FILES = [];
        store.del('print:held');
        const { layer, close } = openLayer(`<div class="sg upd-c">
          <span class="upd-ok${bad.length ? ' warn' : ''}">${ico(bad.length ? 'warn' : 'check')}</span>
          <h2>${bad.length ? 'Er liep iets mis' : OPT.printer ? 'Verstuurd naar de printer' : 'Klaar om af te drukken'}</h2>
          ${pg ? `<p class="upd-v">${esc(pages(pg))}${cost ? ` · ${esc(eur(cost))}` : ''}</p>` : '<p class="upd-v"></p>'}
          ${bad.length ? `<div class="kci-msg">${bad.map((j) => `<p><b>${esc(j.documentName || '')}</b>: ${esc(j.status.formatted || j.status.text || '')}</p>`).join('')}</div>` : OPT.printer ? '' : `<div class="kci-msg"><p>Ga naar eender welke KU Leuven-printer, scan je studentenkaart en kies je document. Je document blijft een tijdje bewaard.</p></div>`}
          <button type="button" class="btn upd-go">Klaar</button></div>`, 'upd-layer', 'Verstuurd');
        layer.querySelector('.upd-go').addEventListener('click', () => { close(); depth = Math.max(0, depth - 1); __TM_REPL__(PG('UserSummary') + '#/'); });
      } catch (err) {
        if (err && err.auth) { toast('Je bent afgemeld. Even opnieuw aanmelden…'); setTimeout(() => signIn(), 900); }
        else sheet({ title: 'Versturen lukte niet', msg: (err && err.message) || 'Probeer het opnieuw.', actions: [{ label: 'Opnieuw proberen', run: () => doSend(b) }] });
        b.disabled = false; b.innerHTML = `${PRINTER}Versturen`;
      } finally { sending = false; }
    }
    // other printers (PaperCut's list, two pages of 25): rarely needed, so behind a link
    async function loadPrinters() {
      const c = store.get('print:printers2');
      if (c && Date.now() - c.ts < 7 * 864e5 && c.v.length) return c.v;
      const out = [];
      const grab = (d) => $$('table.results tr', d).forEach((tr) => {
        const lab = tr.querySelector('label'), loc = tr.querySelector('.locationColumnValue');
        if (!lab) return;
        const full = txt(lab).replace(/\s*\(virtual\)\s*$/i, '');
        const [s, p] = full.split('\\');
        if (p && !out.some((x) => x.s === s && x.p === p)) out.push({ s, p, loc: txt(loc) });
      });
      // PaperCut remembers the last table page you looked at: ask for each page by number
      await page(O + '/app?service=action/1/UserWebPrint/0/$ActionLink');
      for (let n = 1; n < 10; n++) {
        const before = out.length;
        grab(await page(O + '/app?service=direct/1/UserWebPrintSelectPrinter/table.tablePages.linkPage&sp=AUserWebPrintSelectPrinter%2Ftable.tableView&sp=' + n));
        if (out.length === before) break;
      }
      out.sort((a, b) => (a.loc || a.p).localeCompare(b.loc || b.p));
      store.set('print:printers2', { ts: Date.now(), v: out });
      return out;
    }
    function printerSheet() {
      const layer = document.createElement('div');
      layer.setAttribute('data-tm4', '');
      layer.innerHTML = '<div class="scrim"></div><div class="kb" role="dialog" aria-modal="true"><div class="kb-grab"></div><div class="kb-in"><div class="kw-h"><b>Kies een printer</b></div><input type="search" class="pr-q" placeholder="Zoek op gebouw of lokaal" autocomplete="off"><div class="pr-list"><div class="spin" style="margin:20px auto"></div></div></div></div>';
      document.body.appendChild(layer);
      const scrim = layer.querySelector('.scrim'), kb = layer.querySelector('.kb'), list = layer.querySelector('.pr-list'), q = layer.querySelector('.pr-q');
      const close = () => { scrim.classList.remove('on'); kb.classList.remove('on'); setTimeout(() => layer.remove(), 320); };
      requestAnimationFrame(() => requestAnimationFrame(() => { scrim.classList.add('on'); kb.classList.add('on'); }));
      scrim.addEventListener('click', close);
      let all = [];
      const draw = () => {
        const f = fold(q.value);
        const hit = all.filter((x) => !isPA(x.p) && (!f || fold(x.loc + ' ' + x.p).includes(f)));
        put(list, hit.length ? `<div class="group">${hit.map((x, i) => row({ act: 'pick', attrs: ` data-i="${all.indexOf(x)}"`, title: x.loc || x.p, sub: x.p, chevron: false })).join('')}</div>` : '<p class="fresh">Geen printer gevonden.</p>');
      };
      loadPrinters().then((v) => { all = v; draw(); }, () => put(list, '<p class="fresh">De printers konden niet geladen worden.</p>'));
      q.addEventListener('input', draw);
      kb.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act="pick"]');
        if (!b) return;
        OPT.printer = all[Number(b.dataset.i)];
        saveOpt(); close(); NEW.draw();
      });
    }

    /* ---------- history */
    function viewHist(my, q) {
      const tab = q.get('t') === 'saldo' ? 'saldo' : 'print';
      document.title = 'Geschiedenis';
      setNav({ title: 'Geschiedenis', back: backBtn });
      const d = { logs: (store.get('print:logs') || {}).v, trans: (store.get('print:trans') || {}).v };
      const draw = () => {
        if (my !== token) return;
        let h = `<div class="lt"><h1>Geschiedenis</h1></div>${segHtml([{ id: 'print', label: 'Afdrukken' }, { id: 'saldo', label: 'Saldo' }], tab, 'phist')}`;
        if (tab === 'print') {
          if (d.logs === undefined) h += skGroup(6);
          else if (!d.logs.length) h += empty('doc', 'Nog niets afgedrukt', '');
          else h += groupByDay(d.logs, logRow);
        } else {
          if (d.trans === undefined) h += skGroup(6);
          else if (!d.trans.length) h += empty('chart', 'Nog geen betalingen', '');
          else h += groupByDay(d.trans, transRow);
        }
        put(sec, h);
        watchTitle(sec);
      };
      draw();
      if (tab === 'print') loadLogs().then((v) => { d.logs = v; store.set('print:logs', { ts: Date.now(), v: v.slice(0, 30) }); draw(); }, (e) => { if ((e && e.auth) || !d.logs) failed(e, my); });
      else loadTrans().then((v) => { d.trans = v; store.set('print:trans', { ts: Date.now(), v: v.slice(0, 30) }); draw(); }, (e) => { if ((e && e.auth) || !d.trans) failed(e, my); });
    }
    function groupByDay(items, fn) {
      let h = '', cur = '', buf = '';
      const flush = () => { if (buf) h += `<div class="group">${buf}</div>`; buf = ''; };
      items.forEach((it) => {
        const k = it.t ? ymd(it.t) : '';
        if (k !== cur) { flush(); cur = k; const n = it.t ? dayDiff(it.t, Date.now()) : 0; h += `<div class="gh">${esc(!it.t ? '' : n === 0 ? 'Vandaag' : n === -1 ? 'Gisteren' : cap(dLong(it.t)))}</div>`; }
        buf += fn(it);
      });
      flush();
      return h;
    }
    function transRow(t) {
      const up = (t.amt || 0) > 0;
      const kind = /print|printer usage/i.test(t.type + t.by) ? 'Afgedrukt' : /top.?up/i.test(t.note) ? 'Opgeladen' : /transfer/i.test(t.type + t.note) ? (up ? 'Ontvangen' : 'Doorgegeven') : /card|voucher/i.test(t.type) ? 'Waardebon' : up ? 'Bijgeschreven' : t.type || 'Aanpassing';
      return row({ iconHtml: `<span class="ic" style="--c:${up ? '#2fb36b' : '#8e8e93'}">${ico(up ? 'plus' : 'doc')}</span>`, title: kind, sub: `${hhmm(t.t)}${t.after != null ? ' · saldo daarna ' + eur(t.after) : ''}`, end: `<span class="pr-amt${up ? ' up' : ''}">${esc((up ? '+ ' : '') + eur(t.amt))}</span>`, chevron: false });
    }

    /* ---------- top up: KU Leuven's own payment page does the paying */
    const AMOUNTS = [2, 5, 10, 25];
    function viewTopup(my) {
      document.title = 'Opladen';
      setNav({ title: 'Opladen', back: backBtn });
      let amt = Number(ss.get('tm4-print-amt')) || 5;
      const sum = (store.get('print:sum') || {}).v;
      const draw = () => {
        if (my !== token) return;
        put(sec, `<div class="lt"><h1>Opladen</h1></div>${balCard(sum)}
          <div class="gh">Bedrag</div><div class="pr-amts">${AMOUNTS.map((a) => `<button type="button" class="pr-amt-b${a === amt ? ' on' : ''}" data-act="pamt" data-v="${a}"><b>€ ${a}</b><span>${a * 20} pagina's</span></button>`).join('')}</div>
          <div class="pr-send"><button type="button" class="btn pr-go-btn" data-act="ppay">Verder naar betalen</button>
          <p class="kb-legal">Op de betaalpagina van KU Leuven staat je bedrag al klaar: tik daar op Betaal. Je betaalt met Bancontact, Visa, Mastercard of Maestro. Zwart-wit kost 5 cent per pagina, kleur 15 cent. Het saldo werkt op alle KU Leuven-campussen.</p></div>`);
        watchTitle(sec);
      };
      TOP_UP.set = (v) => { amt = v; ss.set('tm4-print-amt', String(v)); draw(); };
      TOP_UP.go = () => { goTo(O + '/topup/nl?amount=' + amt); };
      goTo(O + '/topup/nl', { replace: true });
    }
    const TOP_UP = { set() {}, go() {} };

    /* ---------- transfer credit / redeem a voucher: PaperCut's own forms, posted from here */
    function formView(my, o) {
      document.title = o.title;
      setNav({ title: o.title, back: backBtn });
      const sum = (store.get('print:sum') || {}).v;
      put(sec, `<div class="lt"><h1>${esc(o.title)}</h1></div>${o.bal ? balCard(sum) : ''}<form class="pr-form" data-k="${o.k}" novalidate>${o.fields.map((f) => `<label class="pr-f"><span>${esc(f.label)}</span><input name="${f.name}" ${f.attrs || ''} placeholder="${esc(f.ph || '')}"></label>`).join('')}
        <p class="ko-hint err" data-k="err" hidden></p><button type="submit" class="btn pr-go-btn">${esc(o.button)}</button><p class="kb-legal">${esc(o.note)}</p></form>`);
      watchTitle(sec);
    }
    const viewTransfer = (my) => formView(my, { k: 'transfer', title: 'Saldo doorgeven', bal: true, button: 'Doorgeven', note: 'Het bedrag gaat meteen van jouw saldo naar dat van de andere persoon. Dit kan je niet ongedaan maken.', fields: [
      { name: 'amount', label: 'Bedrag in euro', attrs: 'inputmode="decimal" autocomplete="off"', ph: '2,00' },
      { name: 'to', label: 'Aan (r-nummer of u-nummer)', attrs: 'autocapitalize="none" autocomplete="off" spellcheck="false"', ph: 'r0123456' },
      { name: 'note', label: 'Bericht (mag leeg)', attrs: 'autocomplete="off"', ph: 'Voor de cursus' },
    ] });
    const viewCard = (my) => formView(my, { k: 'card', title: 'Waardebon inwisselen', button: 'Inwisselen', note: 'Typ de code van je printkaart of waardebon. Het bedrag komt meteen bij je saldo.', fields: [
      { name: 'code', label: 'Code', attrs: 'autocapitalize="characters" autocomplete="off" spellcheck="false"', ph: '' },
    ] });
    async function submitForm(form) {
      const k = form.dataset.k;
      const v = Object.fromEntries(new FormData(form));
      const err = form.querySelector('[data-k="err"]');
      const fail = (m) => { err.hidden = false; err.innerHTML = `${ico('warn')}<span>${esc(m)}</span>`; };
      err.hidden = true;
      const btn = form.querySelector('button[type="submit"]');
      const label = btn.textContent;
      const run = async () => {
        btn.disabled = true; btn.innerHTML = `<span class="spin"></span>${esc(label)}…`;
        try {
          const name = k === 'transfer' ? 'UserTransfer' : 'UserTopUpCards';
          const d = await page(PG(name));
          const f = d.querySelector('#main form');
          if (!f) throw new Error('Dit formulier is nu niet beschikbaar');
          const body = new URLSearchParams();
          $$('input[type="hidden"]', f).forEach((i) => body.append(i.name, i.value));
          if (k === 'transfer') { body.set('inputAmount', v.amount); body.set('inputToUsername', v.to); body.set('inputComment', v.note || ''); body.set('$Submit', 'Transfer'); }
          else { body.set('$TextField', v.code); body.set('$Submit', 'Redeem Card'); }
          const res = await page(O + '/app', { method: 'POST', body });
          const m = msgOf(res);
          const bad = res.querySelector('.errorMessage, .error-message') || (m && !/success|credited|transferred|gelukt|geslaagd/i.test(m));
          if (bad) throw new Error(m || 'Dat lukte niet');
          store.del('print:sum');
          toast(k === 'transfer' ? 'Saldo doorgegeven' : 'Waardebon ingewisseld');
          __TM_REPL__(PG('UserSummary') + '#/');
        } catch (e) {
          if (e && e.auth) { signIn(); return; }
          fail((e && e.message) || 'Dat lukte niet');
          btn.disabled = false; btn.textContent = label;
        }
      };
      if (k === 'transfer') {
        const a = num(v.amount), to = String(v.to || '').trim();
        if (!a || a <= 0) return fail('Vul een bedrag in.');
        if (!/^[a-z]\d{7}$/i.test(to)) return fail('Vul een r-nummer of u-nummer in, bijvoorbeeld r0123456.');
        v.amount = a.toFixed(2); v.to = to.toLowerCase();
        sheet({ title: `${eur(a)} doorgeven aan ${v.to}?`, msg: 'Dit kan je niet ongedaan maken.', actions: [{ label: 'Doorgeven', run }] });
      } else {
        if (!String(v.code || '').trim()) return fail('Vul de code in.');
        v.code = String(v.code).trim();
        run();
      }
    }
    sec.addEventListener('submit', (e) => { const f = e.target.closest('form.pr-form'); if (f) { e.preventDefault(); submitForm(f); } });

    /* ---------- taps */
    W.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('#tm-tabs a');
      if (t) { e.preventDefault(); goTo(t.getAttribute('href'), { dir: 'back' }); return; }
      const a = e.target.closest && e.target.closest('a[href^="#/"]');
      if (a) { e.preventDefault(); nav(a.getAttribute('href')); return; }
      const b = e.target.closest && e.target.closest('[data-act]');
      if (!b || b.closest('.kb')) return;
      const act = b.dataset.act;
      if (act === 'pback') { e.preventDefault(); back(); }
      else if (act === 'plogin') { e.preventDefault(); login(); }
      else if (act === 'meer') { e.preventDefault(); goTo(PORTAL + '?tm=meer', { dir: 'back' }); }
      else if (act === 'pcol' || act === 'psize' || act === 'psides') { e.preventDefault(); OPT[{ pcol: 'col', psize: 'size', psides: 'sides' }[act]] = b.dataset.id; saveOpt(); NEW.draw(); }
      else if (act === 'pcopy') { e.preventDefault(); OPT.copies = Math.max(1, Math.min(99, OPT.copies + Number(b.dataset.d))); NEW.draw(); }
      else if (act === 'prm') { e.preventDefault(); FILES.splice(Number(b.dataset.i), 1); NEW.draw(); }
      else if (act === 'pprinter') { e.preventDefault(); printerSheet(); }
      else if (act === 'pnoprinter') { e.preventDefault(); OPT.printer = null; saveOpt(); NEW.draw(); }
      else if (act === 'psend') { e.preventDefault(); doSend(b); }
      else if (act === 'phist') { e.preventDefault(); __TM_REPL__(PG('UserSummary') + '#/historiek' + (b.dataset.id === 'saldo' ? '?t=saldo' : '')); }
      else if (act === 'pamt') { e.preventDefault(); TOP_UP.set(Number(b.dataset.v)); }
      else if (act === 'ppay') { e.preventDefault(); TOP_UP.go(); }
      else if (act === 'pcancel') {
        e.preventDefault();
        const href = b.dataset.h;
        sheet({ title: 'Uit de wachtrij halen?', msg: b.dataset.n, actions: [{ label: 'Uit de wachtrij halen', red: true, run: () => {
          page(O + href).then(() => { toast('Uit de wachtrij gehaald'); store.del('print:held'); show(); }, (err) => toast((err && err.message) || 'Dat lukte niet'));
        } }] });
      }
    });
    pullRefresh(() => { show(); return new Promise((r) => setTimeout(r, 700)); });
    // back in the app after a while (after paying, from another app, the back button): fetch fresh numbers,
    // except while you are filling in a form
    let away = 0;
    const fresh = () => { if (!GOING && !/^#\/(nieuw|overmaken|kaart)/.test(location.hash)) show(); };
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') away = Date.now();
      else if (away && Date.now() - away > 60e3) fresh();
    });
    W.addEventListener('pageshow', (e) => { if (e.persisted) fresh(); });
    show();
  }

  // print.kuleuven.be/topup: KU Leuven's payment page becomes the app's "Opladen" screen. The page's own form
  // stays (hidden) and is what gets sent when you tap Betaal, so the payment works exactly as on the site; it is
  // never sent by itself (sending it from a script right after the page loaded gave a "systeemfout").
  // Any other /topup page (after paying) keeps its own look, with a button back to the app at the top.
  function topupPage() {
    if (params.get('amount')) ss.set('tm4-print-amt', params.get('amount'));
    const hide = document.createElement('style');
    hide.textContent = 'html{background:' + (isDark() ? '#000' : '#f2f2f7') + '!important}body{visibility:hidden!important}';
    (document.head || document.documentElement).appendChild(hide);
    const unhide = () => hide.remove();
    setTimeout(unhide, 7000);
    const ready = (fn) => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn());
    ready(() => {
      if (!document.body || document.querySelector('form[action*="idp.kuleuven.be"]')) { unhide(); return; } // on its way to the login
      const form = document.querySelector('form[action*="/topup/topup"]') || (document.querySelector('input[name="amount"]') || {}).form;
      const radios = form ? Array.from(form.querySelectorAll('input[name="amount"]')) : [];
      if (!form || !radios.length) { unhide(); pill(); return; }
      const bt = (document.querySelector('.current-balance span') || {}).textContent || '';
      const bm = /(-?\d+)[.,](\d{2})/.exec(bt);
      const bal = bm ? Number(bm[1] + '.' + bm[2]) : null;
      const logos = Array.from(document.querySelectorAll('.payment-methods img')).map((m) => ({ src: m.src, alt: m.alt || '' }));
      const amounts = radios.map((r) => Number(r.value)).filter((v) => v > 0);
      let amt = Number(ss.get('tm4-print-amt'));
      if (!amounts.includes(amt)) amt = amounts.includes(5) ? 5 : amounts[0];
      const back = __TM_LOC__.origin + '/';
      takeover('Opladen', []);
      buildShell([
        { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
        { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
        { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
        { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
        { id: 'meer', label: 'Meer', icon: 'grid', href: PORTAL + '?tm=meer' },
      ], 'meer');
      setNav({ title: 'Opladen', back: { label: 'Printen', href: back } });
      form.hidden = true;
      document.body.appendChild(form); // the page's own form, sent as it is
      const main = $('#tm-main');
      const sec = document.createElement('section');
      sec.className = 'view on';
      sec.setAttribute('data-tm4', '');
      main.appendChild(sec);
      const eu = (v) => '€ ' + v.toFixed(2).replace('.', ',');
      const pg = (v) => { const n = Math.floor(v / 0.05 + 1e-6); return n === 1 ? '1 pagina zwart-wit' : n + " pagina's zwart-wit"; };
      let busy = false;
      const draw = () => {
        const after = bal != null ? bal + amt : null;
        put(sec, `<div class="lt"><h1>Opladen</h1><p class="lt-sub">KU Leuven Print</p></div>
          <div class="card pr-bal"><span class="pr-bal-l">Je printsaldo</span><b class="pr-bal-v">${bal != null ? esc(eu(bal)) : '–'}</b><span class="pr-bal-s">${bal != null ? esc(pg(bal)) : ''}</span></div>
          <div class="gh">Hoeveel wil je opladen?</div>
          <div class="pr-amts">${amounts.map((a) => `<button type="button" class="pr-amt-b${a === amt ? ' on' : ''}" data-v="${a}"><b>€ ${a}</b><span>${a * 20} pagina's</span></button>`).join('')}</div>
          <div class="pr-send">${after != null ? `<p class="pr-est">Na het opladen: ${esc(eu(after))}<span>${esc(pg(after))}</span></p>` : ''}
          <button type="button" class="btn pr-go-btn" data-act="pay"${busy ? ' disabled' : ''}>${busy ? '<span class="spin"></span>' : esc('Betaal ' + eu(amt).replace(',00', ''))}</button>
          ${logos.length ? `<p class="pr-logos">${logos.map((l) => `<img src="${esc(l.src)}" alt="${esc(l.alt)}">`).join('')}</p>` : ''}
          <p class="kb-legal">Je betaalt veilig bij de betaaldienst van KU Leuven, met Bancontact, Visa, Mastercard of Maestro. Daarna staat het bedrag meteen op je saldo. Zwart-wit kost 5 cent per pagina, kleur 15 cent; het saldo werkt op alle KU Leuven-campussen.</p></div>`);
      };
      sec.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b || busy) return;
        if (b.dataset.v) { amt = Number(b.dataset.v); ss.set('tm4-print-amt', String(amt)); draw(); return; }
        if (b.dataset.act === 'pay') {
          const r = radios.find((x) => Number(x.value) === amt);
          if (!r) return;
          r.checked = true;
          busy = true;
          draw();
          const sb = form.querySelector('button[type="submit"], input[type="submit"]');
          if (!TEST) leaving('fwd');
          try { if (form.requestSubmit) form.requestSubmit(sb || undefined); else if (sb) sb.click(); else form.submit(); }
          catch (_) { form.submit(); }
          setTimeout(() => { busy = false; draw(); }, 15000); // still here (no connection?): let you try again
        }
      });
      W.addEventListener('pageshow', (e) => { if (e.persisted && busy) { busy = false; draw(); } });
      draw();
    });
    function pill() {
      const st = document.createElement('style');
      st.textContent = '#tm-topback{position:fixed;z-index:99999;left:12px;top:calc(10px + env(safe-area-inset-top));padding:9px 15px;border-radius:19px;background:#1f6f8b;color:#fff!important;font:600 15px -apple-system,system-ui,sans-serif;text-decoration:none!important;box-shadow:0 4px 14px rgba(0,0,0,.2)}body{padding-top:52px!important}';
      document.head.appendChild(st);
      const a = document.createElement('a');
      a.id = 'tm-topback';
      a.href = __TM_LOC__.origin + '/';
      a.textContent = '‹ Terug naar Printen';
      document.body.appendChild(a);
    }
  }

  /* ================================================================== Alma (KU Leuven student restaurants) */
  // www.alma.be is public (no login). Each restaurant page is server-rendered HTML with the menu of one day
  // (?date=YYYY-MM-DD), three prices per dish, labels (vegetarian, vegan, meat, climate score), photos and the
  // opening hours of the coming 7 days. The app reads those pages in the background (same site, fetch + DOMParser)
  // and shows "your" Alma: the ones you starred, the first one opens straight away.
  const ALMAS = [
    { s: 'alma-1', n: 'Alma 1', c: 'Centrum Leuven' },
    { s: 'alma-2', n: 'Alma 2', c: 'Centrum Leuven' },
    { s: 'groep-t', n: 'Groep T', c: 'Centrum Leuven' },
    { s: 't-academisch-kwartier', n: "'t Academische kwartier", c: 'Centrum Leuven' },
    { s: 'alma-3', n: 'Alma 3', c: 'Campus Arenberg' },
    { s: 'de-moete', n: 'De Moete', c: 'Campus Arenberg' },
    { s: 'esat2', n: 'ESAT2', c: 'Campus Arenberg' },
    { s: 'alma-quadrivium', n: 'Alma Quadrivium', c: 'Campus Arenberg' },
    { s: 'alma-gasthuisberg', n: 'Alma Gasthuisberg', c: 'Campus Gasthuisberg' },
    { s: 'kulak-restaurant', n: 'KULAK Restaurant', c: 'Campus Kortrijk' },
    { s: 'kulak-campus-hal-a-broodje-app', n: 'KULAK Hal A Broodjesbar', c: 'Campus Kortrijk' },
  ];
  // "free of ..." filters; Alma filters on its own server (?allergie[]=id), nuts are one switch for all tree nuts
  const ALLERGENS = [
    { k: 'gluten', n: 'Gluten', ids: [206360] },
    { k: 'melk', n: 'Melk', ids: [1136] },
    { k: 'eieren', n: 'Eieren', ids: [1131] },
    { k: 'noten', n: 'Noten', ids: [1137, 1138, 1139, 1140, 1141, 1142, 1143, 1144] },
    { k: 'aardnoten', n: 'Aardnoten', ids: [1130] },
    { k: 'soja', n: 'Soja', ids: [1145] },
    { k: 'sesam', n: 'Sesam', ids: [767] },
    { k: 'selderij', n: 'Selderij', ids: [766] },
    { k: 'mosterd', n: 'Mosterd', ids: [765] },
    { k: 'vis', n: 'Vis', ids: [3431] },
    { k: 'schaaldieren', n: 'Schaaldieren', ids: [764] },
    { k: 'weekdieren', n: 'Weekdieren', ids: [1148] },
    { k: 'lupine', n: 'Lupine', ids: [1135] },
    { k: 'sulfiet', n: 'Sulfiet', ids: [1146] },
  ];
  const PRICE_GROUPS = [
    { k: 'kul', n: 'Studenten en personeel KU Leuven' },
    { k: 'notKul', n: 'Andere studenten' },
    { k: 'other', n: 'Andere klanten' },
  ];
  const ALMA_FOLDED = ['Ontbijt', 'Dessert', 'Drank', 'Diversen'];

  function almaApp() {
    const O = __TM_LOC__.origin;
    const pageUrl = (slug) => O + '/nl/restaurants' + (slug ? '/' + slug : '');
    // came in on one restaurant's own page (a link from elsewhere): that one is open first
    const direct = (/^\/(?:nl|en)\/restaurants\/([a-z0-9-]+)/.exec(PATH) || [])[1] || '';
    // opened inside the Toledo app: the app keeps your stars and filters (this frame's storage is separate from alma.be's own)
    const FRAME = !!W.__TM_FRAME__;
    const toApp = (msg) => { try { W.parent.postMessage(Object.assign({ tm4: 'alma' }, msg), PORTAL_ORIGIN); } catch (_) {} };
    if (FRAME) {
      try {
        const seed = JSON.parse(params.get('s') || 'null');
        if (seed) ['fav', 'flt', 'prijs'].forEach((k) => { if (seed[k] != null) store.set('alma:' + k, seed[k]); });
      } catch (_) {}
    }
    takeover('Alma', []);
    if (FRAME) {
      // a frame has no notch or home bar of its own: the app passes the real ones along
      const px = (k) => Math.max(0, Math.min(80, Number(params.get(k)) || 0)) + 'px';
      document.documentElement.style.setProperty('--st', px('st'));
      document.documentElement.style.setProperty('--sb', px('sb'));
      document.documentElement.classList.add('tm-frame');
      // the tab bar and "Meer": close the frame in the app instead of loading the portal again inside it
      document.addEventListener('click', (e) => {
        const a = e.target.closest && e.target.closest('a[href^="' + PORTAL + '"], [data-act="ameer"]');
        if (!a) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        const m = /[?&]tm=([a-z]+)/.exec(a.getAttribute('href') || '');
        toApp({ close: true, tab: a.dataset.act === 'ameer' ? 'meer' : (m ? m[1] : 'meer') });
      }, true);
    }
    buildShell([
      { id: 'vandaag', label: 'Vandaag', icon: 'house', href: PORTAL + '?tm=vandaag' },
      { id: 'vakken', label: 'Vakken', icon: 'book', href: PORTAL + '?tm=vakken' },
      { id: 'rooster', label: 'Agenda', icon: 'calendar', href: PORTAL + '?tm=rooster' },
      { id: 'updates', label: 'Updates', icon: 'bell', href: PORTAL + '?tm=updates' },
      { id: 'meer', label: 'Meer', icon: 'grid', href: PORTAL + '?tm=meer' },
    ], 'meer');
    const main = $('#tm-main');
    const sec = document.createElement('section');
    sec.className = 'view on';
    sec.setAttribute('data-tm4', '');
    main.appendChild(sec);

    /* ---------- settings (kept on this site: alma.be has its own storage) */
    const favs = () => (store.get('alma:fav') || []).filter((s) => ALMAS.some((a) => a.s === s));
    const syncApp = () => { if (FRAME) toApp({ save: { fav: store.get('alma:fav'), flt: store.get('alma:flt'), prijs: store.get('alma:prijs') } }); };
    const setFavs = (v) => { store.set('alma:fav', v); syncApp(); };
    const FLT = Object.assign({ veg: false, vegan: false, alg: [], sort: false }, store.get('alma:flt') || {});
    const saveFlt = () => { store.set('alma:flt', FLT); syncApp(); };
    const priceGroup = () => { const p = store.get('alma:prijs'); return PRICE_GROUPS.some((g) => g.k === p) ? p : 'kul'; };
    const almaOf = (s) => ALMAS.find((a) => a.s === s) || { s, n: s, c: '' };
    // which Alma and day you're looking at during this visit
    const today = () => ymd(Date.now());
    let CUR = direct && ALMAS.some((a) => a.s === direct) ? direct : (ss.get('tm4-alma-cur') || '');
    let DAY = ss.get('tm4-alma-day') || '';
    if (!DAY || DAY < today()) DAY = today();
    const setCur = (s) => { CUR = s; ss.set('tm4-alma-cur', s); };
    const setDay = (d) => { DAY = d; ss.set('tm4-alma-day', d); };

    /* ---------- reading Alma's pages */
    const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
    const algIds = () => ALLERGENS.filter((a) => FLT.alg.includes(a.k)).flatMap((a) => a.ids);
    const priceOf = (el) => { const m = /(\d+)\s*[.,]\s*(\d{2})/.exec(txt(el).replace('€', '')); return m ? Number(m[1]) + Number(m[2]) / 100 : null; };
    function parse(html, date) {
      const d = new DOMParser().parseFromString(html, 'text/html');
      d.querySelectorAll('script, style, svg').forEach((n) => n.remove());
      const cats = [];
      let cat = null, sub = '';
      d.querySelectorAll('div[id][class~="text-custom-title"], .py-4 > .text-lg, .js-menu').forEach((el) => {
        if (el.matches('.js-menu')) {
          if (!cat) return;
          const prices = {};
          el.querySelectorAll('.js-price[data-type]').forEach((p) => { prices[p.dataset.type] = priceOf(p); });
          const img = el.querySelector('picture img[srcset]');
          let photo = '', big = '';
          if (img) {
            const set = img.getAttribute('srcset').split(',').map((x) => x.trim().split(/\s+/)).filter((x) => x[0]);
            const small = set.find((x) => /^375w$/.test(x[1])) || set[set.length - 1];
            photo = (small && small[0]) || '';
            big = (set[0] && set[0][0]) || photo;
          }
          const labels = $$('.absolute img[alt]', el).map((i) => i.getAttribute('alt').trim()).filter(Boolean);
          cat.items.push({ id: el.id, n: txt(el.querySelector('h4')), p: prices, sub, photo, big, labels });
        } else if (el.matches('.text-lg')) sub = txt(el);
        else { cat = { n: txt(el).replace(/\s*\(\d+\)\s*$/, ''), items: [] }; cats.push(cat); sub = ''; }
      });
      // opening hours of the coming days: "Warme maaltijden" and "Snacks & sandwiches"
      const hours = {};
      const hh = $$('h4', d).find((h) => /Openingsdagen/i.test(h.textContent));
      const box = hh && hh.nextElementSibling;
      if (box) {
        $$('.grow', box).forEach((g) => {
          const kind = /warm/i.test(txt(g.querySelector('strong'))) ? 'warm' : 'snack';
          $$('dl > div', g).forEach((r) => {
            const m = /(\d{1,2})\/(\d{1,2})/.exec(txt(r.querySelector('dt')));
            if (!m) return;
            const now = new Date();
            let y = now.getFullYear();
            if (Number(m[2]) < now.getMonth() + 1 - 6) y++; // late December looking at January
            const key = `${y}-${pad(m[2])}-${pad(m[1])}`;
            const ranges = [];
            const re = /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/g;
            const s = txt(r.querySelector('dd'));
            let x;
            while ((x = re.exec(s))) ranges.push([pad(x[1]) + ':' + x[2], pad(x[3]) + ':' + x[4]]);
            (hours[key] = hours[key] || {})[kind] = ranges;
          });
        });
      }
      const box2 = (d.querySelector('div.relative > .not-italic') || {}).parentNode;
      const rl = (box2 && box2.querySelector('a[href*="google.com/maps"]')) || d.querySelector('a[href*="google.com/maps"]');
      const route = rl ? rl.getAttribute('href').replace(/\s+/g, '') : '';
      const addr = box2 ? $$('.not-italic > div', box2).map(txt).filter(Boolean).join(', ') : '';
      return { date, cats, hours, route, addr };
    }
    // in-memory + session cache: switching Alma's or days is instant once loaded
    const MEM = {};
    const keyOf = (slug, date, ids) => `${slug}|${date}|${ids.join('.')}`;
    function load(slug, date) {
      const ids = algIds();
      const k = keyOf(slug, date, ids);
      if (MEM[k] && Date.now() - MEM[k].ts < 15 * 60e3) return MEM[k].p;
      const kept = store.get('alma:m:' + k);
      if (kept && Date.now() - kept.ts < 15 * 60e3) { MEM[k] = { ts: kept.ts, p: Promise.resolve(kept.v) }; return MEM[k].p; }
      const q = new URLSearchParams({ date });
      ids.forEach((i) => q.append('allergie[]', String(i)));
      const p = fetch(pageUrl(slug) + '?' + q.toString(), { credentials: 'omit' })
        .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
        .then((t) => {
          const v = parse(t, date);
          store.set('alma:m:' + k, { ts: Date.now(), v });
          if (Object.keys(v.hours).length) store.set('alma:h:' + slug, { ts: Date.now(), v: v.hours });
          if (v.route) store.set('alma:r:' + slug, { route: v.route, addr: v.addr });
          return v;
        });
      MEM[k] = { ts: Date.now(), p };
      p.catch(() => { delete MEM[k]; });
      return p;
    }
    // what we saw before (also on an earlier visit): shown at once while the fresh menu loads
    const peek = (slug, date) => { const kept = store.get('alma:m:' + keyOf(slug, date, algIds())); return kept ? kept.v : null; };
    // menus of past days are of no use any more
    const dropMenus = (all) => {
      try {
        Object.keys(localStorage).filter((x) => x.startsWith('tm4:alma:m:')).forEach((x) => {
          if (all || (x.split('|')[1] || '') < ymd(Date.now())) localStorage.removeItem(x);
        });
      } catch (_) {}
    };
    dropMenus(false);

    /* ---------- opening hours */
    const toMin = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
    const span = (r) => r.map((x) => `${x[0]}–${x[1]}`).join(' en ');
    const hoursOf = (slug) => (store.get('alma:h:' + slug) || {}).v || {};
    function statusLine(slug, date) {
      const h = hoursOf(slug)[date];
      if (!h) return null;
      const warm = h.warm || [], snack = h.snack || [];
      if (!warm.length && !snack.length) return { cls: 'cl', t: date === today() ? 'Vandaag gesloten' : 'Gesloten' };
      const all = [warm.length ? `Warm eten ${span(warm)}` : '', snack.length ? `Broodjes en snacks ${span(snack)}` : ''].filter(Boolean).join(' · ');
      if (date !== today()) return { cls: '', t: all };
      const now = new Date().getHours() * 60 + new Date().getMinutes();
      const inR = (r) => r.find((x) => now >= toMin(x[0]) && now < toMin(x[1]));
      const next = (r) => r.find((x) => now < toMin(x[0]));
      const w = inR(warm), s = inR(snack);
      let head;
      if (w) head = { cls: 'open', t: `Open · warm eten tot ${w[1]}` };
      else if (s) {
        const nw = next(warm);
        head = { cls: 'open', t: `Open · broodjes en snacks tot ${s[1]}${nw ? `, warm vanaf ${nw[0]}` : ''}` };
      } else {
        const nw = next(warm) || next(snack);
        head = nw ? { cls: 'soon', t: `Nu dicht · open om ${nw[0]}` } : { cls: 'cl', t: 'Nu dicht' };
      }
      return { cls: head.cls, t: head.t, all };
    }
    // the days you can pick: today and the coming days the restaurant is open (from its hours table)
    function days(slug) {
      const h = hoursOf(slug);
      const t = today();
      let list = Object.keys(h).sort().filter((d) => d >= t && (d === t || (h[d].warm || []).length || (h[d].snack || []).length));
      if (!list.length) list = [t];
      if (list[0] !== t) list.unshift(t);
      return list.slice(0, 7);
    }
    const DS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    const dayChip = (d) => { const x = new Date(fromYmd(d)); return `<button type="button" class="al-day${d === DAY ? ' on' : ''}" data-act="aday" data-d="${d}"><span>${d === today() ? 'vandaag' : DS[x.getDay()]}</span><b>${x.getDate()}</b></button>`; };

    /* ---------- dishes */
    const isVegan = (it) => it.labels.some((l) => /^vegan/i.test(l));
    const isVeg = (it) => isVegan(it) || it.labels.some((l) => /^vegetarisch/i.test(l));
    const hasDiet = (it) => it.labels.some((l) => /vegan|vegetarisch|vis|vlees|varken|rund|gevogelte|kip|lam/i.test(l));
    const ECO = { 'heel laag': 'A', laag: 'B', gemiddeld: 'C', hoog: 'D', 'heel hoog': 'E' };
    const ecoOf = (it) => { const l = it.labels.find((x) => ECO[x.toLowerCase()]); return l ? ECO[l.toLowerCase()] : ''; };
    const MEAT = /^(varken|rund|gevogelte|vis|mix vlees en vis|vlees overige|varken en rund|niet-vegetarisch|lam|kip)/i;
    const eur = (v) => (v == null ? '' : '€' + v.toFixed(2).replace('.', ','));
    function tags(it) {
      let h = '';
      if (isVegan(it)) h += '<i class="al-tg vgn">vegan</i>';
      else if (isVeg(it)) h += '<i class="al-tg veg">veggie</i>';
      else { const m = it.labels.find((l) => /^vis$/i.test(l)); if (m) h += '<i class="al-tg fish">vis</i>'; }
      const e = ecoOf(it);
      if (e) h += `<i class="al-tg eco e${e}" title="Klimaatimpact">eco ${e}</i>`;
      return h;
    }
    const passes = (it) => {
      if (!FLT.veg && !FLT.vegan) return true;
      if (!hasDiet(it)) return true; // drinks, pastries, sweets: no labels, nothing to filter on
      return FLT.vegan ? isVegan(it) : isVeg(it);
    };
    function dishRow(it, cat, i) {
      const pg = priceGroup();
      const ph = it.photo ? `<img class="al-ph" src="${esc(it.photo)}" alt="" loading="lazy" decoding="async">` : `<span class="al-ph none">${ico('food')}</span>`;
      return `<button type="button" class="al-dish" data-act="adish" data-c="${esc(cat)}" data-i="${i}">${ph}<span class="al-dt"><b>${esc(it.n)}</b><span class="al-tgs">${tags(it)}</span></span><span class="al-pr">${esc(eur(it.p[pg]))}</span></button>`;
    }

    /* ---------- router: #/ your Alma, #/kies all Alma's (stars, price group) */
    {
      const r = /^#\/[a-z]*/.test(location.hash) ? location.hash.replace(/[?&]th=(light|dark|auto)\b/, '') : '#/';
      try { history.replaceState(null, '', pageUrl('') + (r === '#/?' ? '#/' : r)); } catch (_) {}
    }
    const route = () => (location.hash.replace(/^#\/?/, '').split(/[?/]/)[0] || 'home');
    let depth = 0, token = 0;
    let SETUP = false; // the very first time: star as many Alma's as you like, then Klaar
    const nav = (hash) => { depth++; location.hash = hash; };
    const back = () => { if (depth > 0) { depth--; history.back(); } else __TM_REPL__(pageUrl('') + '#/'); };
    // redraw the screen you're on without moving it (fold open, filters): only a new screen starts at the top
    const redraw = () => { ++token; if (route() === 'kies' || SETUP) viewPick(token); else viewMenu(token, true); };
    const show = (anim) => {
      const my = ++token;
      sec.classList.remove('push', 'pop');
      if (anim) { void sec.offsetWidth; sec.classList.add(anim); }
      W.scrollTo(0, 0);
      if (!favs().length && !CUR) SETUP = true;
      if (route() === 'kies' || SETUP) viewPick(my);
      else viewMenu(my);
    };
    let lastLen = history.length;
    W.addEventListener('hashchange', () => { show(history.length > lastLen ? 'push' : 'pop'); lastLen = history.length; });

    /* ---------- your Alma: chips, day, hours, filters, menu */
    let LAST = null; // the menu on screen (for the dish sheet)
    const OPEN = (() => { try { return JSON.parse(ss.get('tm4-alma-open') || '{}'); } catch (_) { return {}; } })();
    function viewMenu(my, keep) {
      const fs = favs();
      if (!CUR) setCur(fs[0]);
      const a = almaOf(CUR);
      document.title = a.n;
      setNav({ title: a.n, back: { label: 'Meer', href: PORTAL + '?tm=meer', act: 'ameer' } });
      const ds = days(CUR);
      if (!ds.includes(DAY)) setDay(ds[0]);
      const draw = (m, err) => {
        if (my !== token) return;
        sec.classList.remove('al-busy');
        LAST = m;
        const loc = store.get('alma:r:' + CUR) || {};
        let h = `<div class="lt"><h1>${esc(a.n)}</h1><p class="lt-sub">${esc(loc.addr || a.c)}${loc.route ? ` · <a class="al-route" href="${esc(loc.route)}" target="_blank" rel="noopener">Route</a>` : ''}</p></div>`;
        // your starred Alma's (and the one you're looking at, if it isn't one of them)
        const chips = fs.includes(CUR) ? fs : [CUR].concat(fs);
        h += `<div class="chips al-chips">${chips.map((s) => `<button type="button" class="chip${s === CUR ? ' on' : ''}" data-act="acur" data-s="${esc(s)}">${esc(almaOf(s).n)}</button>`).join('')}<a class="chip al-all" href="#/kies">${ico('plus')}Alle Alma's</a></div>`;
        h += `<div class="al-days">${days(CUR).map(dayChip).join('')}</div>`;
        const st = statusLine(CUR, DAY);
        if (st) h += `<div class="card al-st"><b class="${st.cls}">${st.cls === 'open' || st.cls === 'soon' ? '<i class="al-dot"></i>' : ''}${esc(st.t)}</b>${st.all && st.all !== st.t ? `<span>${esc(st.all)}</span>` : ''}</div>`;
        // filters
        const nAlg = FLT.alg.length;
        h += `<div class="chips al-flt">`
          + `<button type="button" class="chip${FLT.veg ? ' on' : ''}" data-act="aflt" data-k="veg">${FLT.veg ? ico('check') : ''}Veggie</button>`
          + `<button type="button" class="chip${FLT.vegan ? ' on' : ''}" data-act="aflt" data-k="vegan">${FLT.vegan ? ico('check') : ''}Vegan</button>`
          + `<button type="button" class="chip${FLT.alg.includes('gluten') ? ' on' : ''}" data-act="agluten">${FLT.alg.includes('gluten') ? ico('check') : ''}Zonder gluten</button>`
          + `<button type="button" class="chip${nAlg && !(nAlg === 1 && FLT.alg[0] === 'gluten') ? ' on' : ''}" data-act="aalg">Allergenen${nAlg ? ` (${nAlg})` : ''}</button>`
          + `<button type="button" class="chip${FLT.sort ? ' on' : ''}" data-act="aflt" data-k="sort">${FLT.sort ? ico('check') : ''}Goedkoopst eerst</button>`
          + `</div>`;
        if (!m) {
          h += err ? `<div class="card ko-empty">${ico('warn')}<span>Het menu kon niet geladen worden. Trek omlaag om opnieuw te proberen.</span></div>` : skGroup(5);
        } else {
          const warm = m.cats.filter((c) => /warm|soep/i.test(c.n)).some((c) => c.items.some((it) => !/optioneel/i.test(it.sub)));
          if (DAY > today() && !warm) h += `<p class="ko-hint">${ico('info')}<span>Het menu van deze dag staat nog niet online. Dit vind je er elke dag.</span></p>`;
          const sum = { shown: 0 };
          // what you eat first: warm, soup and sandwiches on top; breakfast, dessert and drinks folded at the bottom
          const RANK = ['warm buffet', 'soep', 'broodjes', 'salades', 'diverse snacks'];
          const rank = (n) => { const i = RANK.indexOf(n.toLowerCase()); return i < 0 ? (ALMA_FOLDED.includes(n) ? 50 + ALMA_FOLDED.indexOf(n) : 20) : i; };
          m.cats.map((c, ci) => [c, ci]).sort((x, y) => rank(x[0].n) - rank(y[0].n) || x[1] - y[1]).forEach(([c, ci]) => {
            let items = c.items.map((it, i) => ({ it, i })).filter((x) => passes(x.it));
            if (!items.length) return;
            const folded = ALMA_FOLDED.includes(c.n) && !OPEN[c.n];
            const fold = ALMA_FOLDED.includes(c.n);
            h += `<div class="sh al-sh">${fold ? `<button type="button" class="al-fold" data-act="afold" data-c="${esc(c.n)}"><h2>${esc(c.n)}</h2><span class="sh-note">${items.length}</span><span class="al-chev${folded ? '' : ' up'}">${CHEV}</span></button>` : `<h2>${esc(c.n)}</h2>`}</div>`;
            sum.shown += items.length;
            if (folded) return;
            // within each little group (Maaltijd I, Maaltijd II…) keep Alma's order, or cheapest first
            const groups = [];
            items.forEach((x) => { const g = groups.find((y) => y.n === x.it.sub); if (g) g.l.push(x); else groups.push({ n: x.it.sub, l: [x] }); });
            const pg = priceGroup();
            if (FLT.sort) groups.forEach((g) => g.l.sort((p, q) => (p.it.p[pg] ?? 99) - (q.it.p[pg] ?? 99)));
            h += `<div class="group al-g">${groups.map((g) => (g.n && groups.length > 1 && !/^(snacks|broodje)$/i.test(g.n) ? `<div class="al-sub">${esc(g.n)}</div>` : '') + g.l.map((x) => dishRow(x.it, String(ci), x.i)).join('')).join('')}</div>`;
          });
          if (!sum.shown) h += `<div class="card ko-empty">${ico('food')}<span>${FLT.veg || FLT.vegan || FLT.alg.length ? 'Niets op het menu dat bij je filters past.' : 'Geen menu voor deze dag.'}</span></div>`;
        }
        const pg = PRICE_GROUPS.find((g) => g.k === priceGroup());
        h += `<p class="foot al-foot">Prijzen voor ${esc(pg.n.toLowerCase().replace('ku leuven', 'KU Leuven'))} · <a href="#/kies">Wijzig</a><br><a href="${esc(pageUrl(CUR))}?tm=orig" target="_blank" rel="noopener">Bekijk op alma.be</a></p>`;
        put(sec, h);
        watchTitle(sec);
        const on = sec.querySelector('.al-chips .on');
        if (on && on.scrollIntoView && on.offsetLeft > sec.clientWidth - 120) on.parentNode.scrollLeft = on.offsetLeft - 16;
      };
      const cached = peek(CUR, DAY);
      if (cached || !keep) draw(cached);
      else {
        // a redraw keeps the old menu on screen (dimmed) until the new one is there; the chips move at once
        sec.classList.add('al-busy');
        $$('.al-day', sec).forEach((x) => x.classList.toggle('on', x.dataset.d === DAY));
        $$('.al-chips .chip[data-s]', sec).forEach((x) => x.classList.toggle('on', x.dataset.s === CUR));
      }
      load(CUR, DAY).then((m) => {
        // the first answer brings the opening hours: maybe today isn't a day to show any more
        if (my !== token) return;
        draw(m);
        prefetch();
      }, () => { if (!cached) draw(null, true); });
    }
    // the other starred Alma's today, and this Alma's next days: tapping a chip is instant
    function prefetch() {
      // first every day of this Alma, then your other Alma's: tapping a day or a chip is instant
      days(CUR).forEach((d) => load(CUR, d).catch(() => {}));
      favs().filter((s) => s !== CUR).forEach((s) => load(s, DAY).catch(() => {}));
      setTimeout(() => favs().filter((s) => s !== CUR).forEach((s) => days(s).forEach((d) => load(s, d).catch(() => {}))), 2500);
    }

    /* ---------- all Alma's: pick and star yours */
    function viewPick(my) {
      const fs = favs();
      const first = SETUP;
      document.title = "Alma's";
      setNav({ title: "Alma's", back: first ? { label: 'Meer', href: PORTAL + '?tm=meer', act: 'ameer' } : { label: almaOf(CUR || fs[0]).n, href: '#/', act: 'aback' } });
      if (my !== token) return;
      let h = `<div class="lt"><h1>${first ? "Welke Alma's zijn de jouwe?" : "Alle Alma's"}</h1><p class="lt-sub">${first ? 'Zet een ster bij elke Alma waar je eet en tik op Klaar. Ze staan dan bovenaan om snel te wisselen, en de eerste opent meteen.' : 'De Alma met een ster bovenaan opent meteen.'}</p></div>`;
      const starBtn = (s) => `<button type="button" class="al-star${fs.includes(s) ? ' on' : ''}" data-act="astar" data-s="${esc(s)}" aria-label="${fs.includes(s) ? 'Ster weghalen' : 'Ster geven'}">${ico('star')}</button>`;
      const rowOf = (a, extra) => `<div class="row al-row"><button type="button" class="al-open" data-act="aopen" data-s="${esc(a.s)}"><span class="main"><span class="t">${esc(a.n)}</span>${extra ? `<span class="s">${extra}</span>` : ''}</span></button>${starBtn(a.s)}</div>`;
      if (fs.length && !first) {
        h += `<div class="gh">Jouw Alma's</div><div class="group">${fs.map((s, i) => rowOf(almaOf(s), i === 0 ? 'Opent meteen' : `<button type="button" class="al-up" data-act="aup" data-s="${esc(s)}">Bovenaan zetten</button>`)).join('')}</div>`;
      }
      const camps = [...new Set(ALMAS.map((a) => a.c))];
      camps.forEach((c) => {
        const list = ALMAS.filter((a) => a.c === c && (first || !fs.includes(a.s)));
        if (list.length) h += `<div class="gh">${esc(c)}</div><div class="group">${list.map((a) => rowOf(a, '')).join('')}</div>`;
      });
      if (first) h += `<div class="al-done"><button type="button" class="btn" data-act="adone"${fs.length ? '' : ' disabled'}>${fs.length ? `Klaar (${fs.length})` : 'Kies minstens één Alma'}</button></div>`;
      const pg = priceGroup();
      h += `<div class="gh">Toon prijzen voor</div><div class="group">${PRICE_GROUPS.map((g) => `<button type="button" class="row" data-act="aprijs" data-k="${g.k}"><span class="main"><span class="t">${esc(g.n)}</span></span>${g.k === pg ? `<span class="end al-check">${ico('check')}</span>` : ''}</button>`).join('')}</div>`;
      h += `<div class="group" style="margin-top:24px">${row({ href: pageUrl('') + '?tm=orig', iconHtml: `<span class="ic" style="--c:#d9534f">${ico('globe')}</span>`, title: 'Website van Alma', external: true })}</div>`;
      put(sec, `<div class="al-pick">${h}</div>`);
      watchTitle(sec);
    }

    /* ---------- sheets */
    function dishSheet(it) {
      const pg = priceGroup();
      const diet = it.labels.filter((l) => /vegan|vegetarisch/i.test(l) || MEAT.test(l)).map((l) => l.replace(/\s*\(niet-vegan\)/i, ''));
      const e = ecoOf(it);
      const ECO_T = { A: 'heel laag', B: 'laag', C: 'gemiddeld', D: 'hoog', E: 'heel hoog' };
      const { sh, close } = openLayer(`<div class="al-sheet">${it.photo ? `<img class="al-big" src="${esc(it.big || it.photo)}" alt="">` : ''}<div class="al-sheet-in"><b class="al-sheet-t">${esc(it.n)}</b>${it.sub && !/optioneel/i.test(it.sub) ? `<span class="al-sheet-s">${esc(it.sub)}</span>` : ''}
        <div class="al-tags2">${diet.map((l) => `<span>${esc(l)}</span>`).join('')}${e ? `<span class="eco e${e}">Klimaatimpact ${e} · ${ECO_T[e]}</span>` : ''}</div>
        <div class="al-prices">${PRICE_GROUPS.map((g) => `<div class="${g.k === pg ? 'on' : ''}"><span>${esc(g.n)}</span><b>${esc(eur(it.p[g.k]))}</b></div>`).join('')}</div>
        <a class="btn al-orig" href="${esc(pageUrl(CUR))}?tm=orig&date=${DAY}" target="_blank" rel="noopener">Allergenen op alma.be</a></div></div>`, '', it.n);
      return close;
    }
    function allergenSheet() {
      const pick = new Set(FLT.alg);
      const { sh, close } = openLayer(`<div class="al-sheet"><div class="al-sheet-in"><b class="al-sheet-t">Allergenen</b><span class="al-sheet-s">Toon alleen gerechten zonder</span><div class="al-algs"></div><button type="button" class="btn al-algs-go" data-x="go">Toon</button><button type="button" class="al-algs-clear" data-x="clear">Alles wissen</button></div></div>`, '', 'Allergenen');
      const box = sh.querySelector('.al-algs');
      const draw = () => put(box, ALLERGENS.map((a) => `<button type="button" class="chip${pick.has(a.k) ? ' on' : ''}" data-k="${a.k}">${pick.has(a.k) ? ico('check') : ''}${esc(a.n)}</button>`).join(''));
      draw();
      sh.addEventListener('click', (e) => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.k) { if (pick.has(b.dataset.k)) pick.delete(b.dataset.k); else pick.add(b.dataset.k); draw(); return; }
        if (b.dataset.x === 'clear') { pick.clear(); draw(); return; }
        if (b.dataset.x === 'go') { FLT.alg = ALLERGENS.filter((a) => pick.has(a.k)).map((a) => a.k); saveFlt(); close(); redraw(); }
      });
    }

    /* ---------- taps */
    W.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('#tm-tabs a');
      if (t) { e.preventDefault(); goTo(t.getAttribute('href'), { dir: 'back' }); return; }
      const a = e.target.closest && e.target.closest('a[href^="#/"]');
      if (a) { e.preventDefault(); nav(a.getAttribute('href')); return; }
      const b = e.target.closest && e.target.closest('[data-act]');
      if (!b || b.closest('.sheet')) return;
      const act = b.dataset.act;
      if (!/^a/.test(act)) return;
      e.preventDefault();
      if (act === 'ameer') goTo(PORTAL + '?tm=meer', { dir: 'back' });
      else if (act === 'aback') back();
      else if (act === 'acur') { setCur(b.dataset.s); redraw(); }
      else if (act === 'aday') { setDay(b.dataset.d); redraw(); }
      else if (act === 'aflt') {
        const k = b.dataset.k;
        FLT[k] = !FLT[k];
        if (k === 'vegan' && FLT.vegan) FLT.veg = false;
        if (k === 'veg' && FLT.veg) FLT.vegan = false;
        saveFlt(); redraw();
      } else if (act === 'agluten') {
        FLT.alg = FLT.alg.includes('gluten') ? FLT.alg.filter((x) => x !== 'gluten') : FLT.alg.concat('gluten');
        saveFlt(); redraw();
      } else if (act === 'aalg') allergenSheet();
      else if (act === 'afold') { const c = b.dataset.c; OPEN[c] = !OPEN[c]; ss.set('tm4-alma-open', JSON.stringify(OPEN)); redraw(); }
      else if (act === 'adish') { const c = LAST && LAST.cats[Number(b.dataset.c)]; const it = c && c.items[Number(b.dataset.i)]; if (it) dishSheet(it); }
      else if (act === 'astar') {
        const s = b.dataset.s, fs = favs();
        setFavs(fs.includes(s) ? fs.filter((x) => x !== s) : fs.concat(s));
        viewPick(token); // redraw in place: no jump to the top, the list stays where it is
      } else if (act === 'adone') { SETUP = false; setCur(favs()[0]); show('push'); }
      else if (act === 'aup') { const s = b.dataset.s; setFavs([s].concat(favs().filter((x) => x !== s))); show(); }
      else if (act === 'aopen' && SETUP) { const s = b.dataset.s, fs = favs(); setFavs(fs.includes(s) ? fs.filter((x) => x !== s) : fs.concat(s)); viewPick(token); }
      else if (act === 'aopen') {
        setCur(b.dataset.s);
        if (route() !== 'kies') show();
        else if (depth > 0) back();
        else __TM_REPL__(pageUrl('') + '#/');
      } else if (act === 'aprijs') { store.set('alma:prijs', b.dataset.k); syncApp(); if (route() === 'kies' || SETUP) viewPick(token); else show(); }
    });
    pullRefresh(() => { Object.keys(MEM).forEach((k) => delete MEM[k]); dropMenus(true); show(); return new Promise((r) => setTimeout(r, 700)); });
    // back after a while (lunch tomorrow): today has moved on, and the status line with it
    let away = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') away = Date.now();
      else if (away && Date.now() - away > 5 * 60e3) { if (DAY < today()) setDay(today()); show(); }
    });
    W.addEventListener('pageshow', (e) => { if (e.persisted) show(); });
    show();
    // in the app: say when the first screen stands, so the app can slide it in
    if (FRAME) requestAnimationFrame(() => requestAnimationFrame(() => toApp({ ready: true })));
  }
  /* ================================================================== what does this page become? */
  if (!SITE) return;
  let mode = 'classic', target = '';
  if (SITE === 'install') mode = 'none'; // GitHub: only the update page below
  else if (SITE === 'idp') mode = TOP && PHONE ? 'login-skin' : 'none';
  else if (SITE === 'kurt' && !TOP && params.get('tm') === 'krb') mode = 'krbridge'; // hidden frame of the Agenda: reads your bookings
  else if (SITE === 'kurt') mode = TOP && PHONE && params.get('tm') !== 'orig' && !/^\/(check-in|login|logout|signin|saml|api)\b/i.test(PATH) ? 'kurt' : 'none'; // study places
  else if (SITE === 'print') {
    // KU Leuven Print (PaperCut): its own pages become the Print app; /topup is the payment page
    const svc = params.get('service') || '';
    if (params.get('tm') === 'orig') ss.set('tm4-classic-print', String(Date.now()));
    if (!TOP || !PHONE) mode = 'none';
    else if (/^\/topup(\/|$)/.test(PATH)) mode = 'topup';
    else if (Date.now() - (Number(ss.get('tm4-print-pass')) || 0) < 30e3) { ss.del('tm4-print-pass'); mode = 'none'; } // signing in again: let the server's login page through once
    else if (!classicOn('print') && /^\/app(;|$)/.test(PATH) && (!svc || /^page\/User/.test(svc))) mode = 'print';
    else mode = 'none';
  } else if (SITE === 'alma') {
    // Alma's restaurant pages become the Alma app; the rest of alma.be (news, catering…) stays as it is
    // ?tm=frame: opened inside the Toledo app (Meer > Alma), which shows it only once it is ready, so the original site never flashes
    const inFrame = !TOP && params.get('tm') === 'frame';
    mode = (TOP || inFrame) && PHONE && params.get('tm') !== 'orig' && /^\/(nl|en)\/restaurants(\/[a-z0-9-]+)?\/?$/.test(PATH) ? 'alma' : 'none';
    W.__TM_FRAME__ = inFrame && mode === 'alma';
  } else if (SITE === 'journey') mode = TOP && PHONE ? 'cover' : 'none'; // Toledo's link service, on its way to the course
  else if (SITE === 'loket') {
    if (!TOP && params.get('tm') === 'bridge') mode = 'bridge';
    else if (!TOP) mode = 'none';
    else if (params.get('tm') === 'sync') mode = 'sync';
    else if (PHONE && params.get('tm') !== 'orig' && (() => { try { const p = JSON.parse(ss.get('tm4-att-pass') || 'null'); return p && !p.done && Date.now() - p.ts < 5 * 60e3; } catch (_) { return false; } })()) mode = 'attpass'; // Attesten: signing in to KU Loket again
    else if (PHONE && params.get('tm') === 'attest') mode = 'attest'; // Meer > Attesten
    else if (PHONE && params.get('tm') !== 'orig' && (params.get('tm') === 'room' || /zr_1011-display.*\/room\/\d+/.test(decodeURIComponent(location.hash)))) mode = 'room'; // lokaalfiche
    else if ((() => { try { return Date.now() - (JSON.parse(ss.get('tm4-sync') || '{}').ts || 0) < 10 * 60e3; } catch (_) { return false; } })()) mode = 'sync'; // back from signing in (approving in the Authenticator can take a while)
    else if (PHONE && params.get('tm') === 'agenda') { mode = 'redirect'; target = PORTAL + '?tm=rooster'; } // link from v3
  } else if (!TOP && !TEST) mode = 'none';
  else if (!PHONE) mode = SITE === 'portal' ? 'none' : 'classic'; // a computer or iPad: Toledo's own site as it is
  else if (SITE === 'portal') {
    if (!/^\/portal\/?(index\.html)?$/.test(PATH)) mode = 'none';
    else if (ss.get('tm4-classic') === '1') mode = 'plain'; // "Klassieke Toledo" in Meer: the real Toledo, untouched (no v3 layer)
    else if (ss.get('tm4-login')) mode = 'login';
    else mode = 'app';
  } else if (SITE === 'ultra') {
    const outline = /^\/ultra\/courses\/(_\d+_\d+)\/outline\/?$/.exec(PATH);
    const tmq = params.get('tm');
    if (!PATH.startsWith('/ultra/')) mode = 'none';
    else if (/^\/ultra\/app\/?$/.test(PATH)) mode = 'app';
    else if (/^\/ultra\/calendar\/?$/.test(PATH) && tmq === 'agenda') { mode = 'app'; W.__TM_ROUTE__ = 'agenda'; } // Meer > Toledo-agenda
    else if (/^\/ultra\/calendar\/?$/.test(PATH) && tmq === 'groepen') { mode = 'app'; W.__TM_ROUTE__ = 'groepen'; } // Meer > Groepswerken (no course address: its hash got lost on the way)
    else if (outline && tmq === 'classic') { ss.set('tm4-classic-ultra', String(Date.now())); mode = 'classic'; }
    else if (outline && tmq !== 'app' && !__TM_LOC__.search && Date.now() - (Number(ss.get('tm4-noapp')) || 0) < 5 * 60e3) mode = 'classic';
    else if (outline && (!__TM_LOC__.search || tmq === 'app')) { mode = 'app'; W.__TM_PK__ = outline[1]; ss.del('tm4-noapp'); }
    else if (!classicOn('ultra') && /^\/ultra\/?$|^\/ultra\/(course|stream|institution-page)\/?$/.test(PATH)) {
      mode = 'redirect';
      target = PORTAL + (/stream/.test(PATH) ? '?tm=updates' : /\/course\/?$/.test(PATH) ? '?tm=vakken' : '?tm=vandaag');
    }
  }
  W.__TM_MODE__ = mode;

  if (SITE === 'install') {
    // the update page on GitHub: a friendly how-to instead of the script's code
    if (TOP && PHONE && /^\/vj4542662\/toledo-mobile\/[^?#]*\.user\.js$/.test(__TM_LOC__.pathname)) {
      whenRoot(() => { const st = document.createElement('style'); st.textContent = 'body{visibility:hidden!important}'; document.documentElement.appendChild(st); });
      installPage();
    }
    return;
  }
  if (mode === 'redirect') { try { W.stop(); } catch (_) {} whenRoot(() => cover('')); __TM_REPL__(target); return; }
  if (mode === 'bridge') {
    // the hidden frame only reads data: don't let the KU Loket launchpad (SAPUI5) boot in it as well
    if (/^\/sap\/bc\/ui2\/flp/.test(PATH)) blockScripts((n) => /ui5_ui5|sap-ui-core|ushell|\/resources\//.test(n.getAttribute('src') || '') || n.id === 'sap-ui-bootstrap');
    bridge();
    return;
  }
  if (mode === 'cover') {
    // came back here with the back button: this page would only send you forward again, so step over it
    const back = () => { try { return (performance.getEntriesByType('navigation')[0] || {}).type === 'back_forward'; } catch (_) { return false; } };
    if (back() && history.length > 1) { try { W.stop(); } catch (_) {} whenRoot(() => cover('')); history.back(); return; }
    W.addEventListener('pageshow', (e) => { if (e.persisted && history.length > 1) history.back(); });
    whenRoot(() => cover('Openen\u2026'));
    return;
  }
  if (mode === 'classic' && PHONE && TOP && (SITE === 'ultra' || SITE === 'loket')) classicDark();
  if (mode === 'sync') { whenRoot(syncPage); return; }
  if (mode === 'room') { whenRoot(roomPage); return; }
  if (mode === 'attest') { whenRoot(attestPage); return; }
  if (mode === 'attpass') { attestPass(); return; }
  if (mode === 'kurt') { whenRoot(kurtApp); return; }
  if (mode === 'krbridge') { kurtBridge(); return; }
  if (mode === 'alma') { whenRoot(almaApp); return; }
  if (mode === 'print') {
    // signed out, the server sends a small page that forwards to the KU Leuven login: let it (or send it on ourselves)
    if (document.querySelector('form[action*="idp.kuleuven.be"]') || /Shibboleth Authentication/i.test(document.title || '')) return;
    whenRoot(printApp);
    return;
  }
  if (mode === 'topup') { topupPage(); return; }
  if (mode === 'login-skin') { whenRoot(loginSkin); return; }
  if (mode === 'login') { loginWatch(); return; }
  if (mode === 'plain') { classicPill(); return; }
  if (mode === 'classic') return;
  if (mode !== 'app') return;
  whenRoot(SITE === 'portal' ? portalApp : ultraApp);
})();

/* ===== version 3 phone layout, for the Blackboard and KU Loket pages the app does not replace ===== */
(() => {
  const run = () => {
(() => {
  'use strict';
  if (window.__TM_MODE__ !== 'classic') return; // the app layer (above) decided this page keeps its own layout
  if (window.top !== window && !window.__TM_TEST__) return; // top frame only
  if (window.__TM_LOADED__) return;
  window.__TM_LOADED__ = true;

  const SITE = { 'toledo.kuleuven.be': 'portal', 'ultra.edu.kuleuven.cloud': 'ultra', 'webwsp.aps.kuleuven.be': 'loket' }[__TM_LOC__.hostname];
  if (!SITE) return;

  const PORTAL = 'https://toledo.kuleuven.be/portal/';
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ================================================================== CSS */
  const SHARED_CSS = String.raw`html.tm-on {
  --tm-bg: #f2f2f7; --tm-card: #fff; --tm-text: #1c1c1e; --tm-sub: #6e6e73; --tm-sep: rgba(60,60,67,.16);
  --tm-blue: #1d6f99; --tm-head: #124c6b; --tm-red: #ff3b30; --tm-tab-h: 58px;
  --tm-font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif;
  -webkit-text-size-adjust: 100%;
}
/* ---------- bottom tab bar ---------- */
html.tm-on #tm-tabbar {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 1031; display: flex;
  height: calc(var(--tm-tab-h) + env(safe-area-inset-bottom)); padding: 0 4px env(safe-area-inset-bottom);
  background: rgba(249,249,251,.92); -webkit-backdrop-filter: saturate(180%) blur(20px); backdrop-filter: saturate(180%) blur(20px);
  border-top: .5px solid rgba(0,0,0,.18);
}
html.tm-on #tm-tabbar a {
  position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  color: #8e8e93; text-decoration: none; font: 500 10.5px/1 var(--tm-font); -webkit-tap-highlight-color: transparent;
}
html.tm-on #tm-tabbar a.tm-active { color: var(--tm-blue); }
html.tm-on #tm-tabbar svg { width: 25px; height: 25px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
html.tm-on #tm-tabbar a.tm-active svg { stroke-width: 2.2; }
html.tm-on #tm-tabbar .tm-badge {
  position: absolute; top: 5px; left: calc(50% + 6px); min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px;
  background: var(--tm-red); color: #fff; font: 600 11px/18px var(--tm-font); text-align: center; box-sizing: border-box;
}
html.tm-on #tm-tabbar .tm-badge:empty { display: none; }

html.tm-on:not(.tm-tabs) #tm-tabbar { display: none !important; }
html.tm-on #tm-tabbar a.tm-ext-active { color: var(--tm-blue); }
`;

  const ULTRA_CSS = String.raw`
/* ---------- type + page ---------- */
html.tm-on body, html.tm-on :is(button, input, textarea, select, h1, h2, h3, h4, h5, .MuiTypography-root, .MuiButtonBase-root, .MuiInputBase-root) {
  font-family: var(--tm-font) !important;
}
html.tm-on body { -webkit-font-smoothing: antialiased; }
html.tm-on .course-content-container, html.tm-on main.course-main-content,
html.tm-on section.course-outline-content, html.tm-on .course-outline, html.tm-on .course-outline-grid, html.tm-on .outline-column {
  background: var(--tm-bg) !important;
}
html.tm-on.tm-tabs section.course-outline-content, html.tm-on.tm-tabs section.route-view-container.course-tool-content,
html.tm-on.tm-tabs .course-tool-content > section { padding-bottom: calc(var(--tm-tab-h) + env(safe-area-inset-bottom) + 28px) !important; }

/* ---------- course tabs: dark strip with arrow -> scrollable pills ---------- */
html.tm-on bb-course-navigation [role=toolbar] {
  background: #fff !important; color: var(--tm-text) !important; min-height: 0 !important;
  border-bottom: .5px solid var(--tm-sep) !important; box-shadow: none !important;
}
html.tm-on bb-course-navigation .js-course-navigation > button,
html.tm-on bb-course-navigation [role=toolbar] > div > button.MuiIconButton-root { display: none !important; }
html.tm-on bb-course-navigation .js-course-navigation > div {
  overflow-x: auto !important; overflow-y: hidden !important; scrollbar-width: none; -webkit-overflow-scrolling: touch; mask-image: none !important;
}
html.tm-on bb-course-navigation .js-course-navigation > div::-webkit-scrollbar { display: none; }
html.tm-on bb-course-navigation ul.bb-ui-navigation-list-horizontal {
  display: flex !important; flex-wrap: nowrap !important; gap: 8px; margin: 0 !important; padding: 9px 12px !important; width: max-content;
}
html.tm-on bb-course-navigation ul.bb-ui-navigation-list-horizontal > li { flex: none; margin: 0 !important; padding: 0 !important; }
html.tm-on bb-course-navigation nav a {
  display: inline-flex !important; align-items: center; gap: 6px; height: 34px; min-height: 0 !important; padding: 0 14px !important;
  border: 0 !important; border-radius: 17px !important; box-shadow: none !important;
  background: #ececf1 !important; color: var(--tm-text) !important; font: 600 14.5px/1 var(--tm-font) !important;
}
html.tm-on bb-course-navigation nav a * { color: inherit !important; font: inherit !important; }
html.tm-on bb-course-navigation nav a.active { background: var(--tm-head) !important; color: #fff !important; }
html.tm-on bb-course-navigation nav a::before, html.tm-on bb-course-navigation nav a::after { display: none !important; }

/* ---------- Course Staff / Details & Actions ---------- */
html.tm-on section.course-outline-content .MuiAccordion-root {
  border: 0 !important; border-radius: 14px !important; box-shadow: none !important; overflow: hidden; background: var(--tm-card) !important;
}
html.tm-on section.course-outline-content .MuiAccordion-root::before { display: none !important; }
html.tm-on section.course-outline-content .outline-action-block { border: 0 !important; border-radius: 14px !important; overflow: hidden; box-shadow: none !important; }
html.tm-on section.course-outline-content .MuiAccordionSummary-root { min-height: 52px !important; }
html.tm-on section.course-outline-content .MuiAccordionSummary-content :is(h2, h3, .MuiTypography-root) { font: 700 18px/1.2 var(--tm-font) !important; }
html.tm-on li.js-instructor-list-item { padding-top: 6px !important; padding-bottom: 6px !important; }

/* ---------- content list ---------- */
html.tm-on react-course-content-header :is(h2, h3) { font: 700 22px/1.2 var(--tm-font) !important; letter-spacing: -.2px; }
html.tm-on react-course-content-outline .content-list-item > div {
  border: 0 !important; border-radius: 14px !important; box-shadow: none !important; overflow: hidden;
}
html.tm-on react-course-content-outline .itemContainer { border-radius: 14px !important; }
html.tm-on react-course-content-outline .content-list-item .content-list-item .itemContainer { border-radius: 0 !important; }
html.tm-on react-course-content-outline h3, html.tm-on react-course-content-outline h3 button {
  font: 600 16px/1.3 var(--tm-font) !important; color: var(--tm-text) !important; text-decoration: none !important;
}
html.tm-on react-course-content-outline .js-description, html.tm-on react-course-content-outline .js-description * {
  font-size: 14.5px !important; line-height: 1.42 !important; color: var(--tm-sub) !important;
}
html.tm-on react-course-content-outline .js-description a { color: var(--tm-blue) !important; }
html.tm-on .js-description.tm-clamp:not(.tm-open) {
  display: -webkit-box !important; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden !important; max-height: 4.4em;
}
html.tm-on .tm-more {
  display: block; align-self: flex-start; text-align: left; margin: 2px 0 0; padding: 4px 0; border: 0; background: none; cursor: pointer;
  color: var(--tm-blue); font: 600 14px var(--tm-font);
}
html.tm-on .js-completion-chart [role=progressbar] { border-radius: 3px; overflow: hidden; }

/* ---------- list pages (Announcements, ...): rows that wrap instead of one cut-off line ---------- */
html.tm-on .tabular-list-container, html.tm-on .tabular-list { background: var(--tm-bg) !important; }
html.tm-on tr.announcement-item-row { background: var(--tm-card) !important; }
html.tm-on tr.announcement-item-row > td { border: 0 !important; border-bottom: .5px solid var(--tm-sep) !important; background: transparent !important; padding-top: 12px !important; padding-bottom: 12px !important; }
html.tm-on tr.announcement-item-row > td.announcement-header-column { width: 100% !important; max-width: none !important; }
html.tm-on tr.announcement-item-row :is(.announcement-header, .click-message-detail, .announcement-title-detail) { flex: 1 1 auto !important; min-width: 0 !important; max-width: none !important; }
html.tm-on tr.announcement-item-row a.list-item-title { max-width: none !important; width: auto !important; }
html.tm-on a.list-item-title {
  display: -webkit-box !important; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden !important;
  white-space: normal !important; text-overflow: clip !important; font: 600 16px/1.3 var(--tm-font) !important; color: var(--tm-text) !important;
}
html.tm-on p.list-item-body {
  display: -webkit-box !important; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden !important;
  white-space: normal !important; text-overflow: clip !important; margin-top: 3px !important; text-align: left !important;
  font: 400 14.5px/1.4 var(--tm-font) !important; color: var(--tm-sub) !important;
}
html.tm-on span.list-item-date-sent { font: 500 12.5px var(--tm-font) !important; color: var(--tm-sub) !important; }
html.tm-on tr.announcement-item-row:not(.is-read) a.list-item-title::before {
  content: ""; display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #2b8fc1; margin: 0 6px 2px 0; vertical-align: middle;
}

/* ---------- Blackboard's own page header (Activiteit, Cijfers, Berichten, ...) ---------- */
html.tm-on .base-header { background: var(--tm-head) !important; color: #fff !important; }
html.tm-on .base-header h1.page-title { font: 700 17px/1.2 var(--tm-font) !important; color: #fff !important; }
html.tm-on .base-header :is(button, a) { color: #fff !important; }

/* ---------- Activity stream: full-width cards, "Negeren" below instead of beside ---------- */
html.tm-on .base-recent-activity, html.tm-on #activity-stream { background: var(--tm-bg) !important; }
html.tm-on ul.activity-feed { padding: 0 !important; margin: 0 !important; border: 0 !important; }
html.tm-on li.stream-item-container { margin: 0 0 10px !important; padding: 0 !important; list-style: none !important; }
html.tm-on li.stream-item-container .stream-item {
  flex-wrap: wrap !important; margin: 0 12px !important; padding: 12px 14px !important;
  background: var(--tm-card) !important; border: 0 !important; border-radius: 14px !important; box-shadow: none !important;
}
html.tm-on .stream-item .stream-item-contents { flex: 1 1 100% !important; min-width: 0 !important; max-width: none !important; width: auto !important; }
html.tm-on .stream-item :is(.element-card, .element-details) { flex: 1 1 auto !important; min-width: 0 !important; max-width: none !important; width: auto !important; }
html.tm-on .stream-item .card-actions {
  flex: 1 1 100% !important; display: flex !important; justify-content: flex-end; width: auto !important; margin: 0 !important; padding: 6px 0 0 !important;
}
html.tm-on .stream-item .card-actions button { border-radius: 8px !important; font: 600 13px var(--tm-font) !important; }
html.tm-on .stream-item :is(.name, .js-title-link) { font: 600 15.5px/1.3 var(--tm-font) !important; color: var(--tm-text) !important; }

/* ---------- Grades overview: compact cards ---------- */
html.tm-on .base-grades-course-tile { border: 0 !important; border-radius: 14px !important; box-shadow: none !important; overflow: hidden; }
html.tm-on .base-grades-course-tile h3.subheader { font: 600 17px/1.3 var(--tm-font) !important; }
html.tm-on :is(.base-grades-empty-element, .base-grades-empty-state) { background: none !important; background-image: none !important; margin: 0 !important; padding: 0 0 8px !important; text-align: left !important; }
html.tm-on .base-grades-empty-state p.main { margin: 0 !important; font: 400 13px/1.35 var(--tm-font) !important; color: var(--tm-sub) !important; }

/* ---------- files: open PDFs / videos / slides in Safari's own viewer ---------- */
html.tm-on .tm-open-file {
  display: flex; align-items: center; justify-content: center; gap: 8px; margin: 8px 0 14px; padding: 12px 16px;
  border-radius: 12px; background: var(--tm-head); color: #fff !important; font: 600 15.5px var(--tm-font); text-decoration: none !important;
}
html.tm-on .tm-file-pill {
  display: inline-flex; align-items: center; gap: 5px; margin: 6px 0 2px; padding: 5px 11px; border-radius: 14px;
  background: #e3eef5; color: var(--tm-blue) !important; font: 600 13px var(--tm-font); text-decoration: none !important;
}
html.tm-on h3 > .tm-file-pill { display: flex; width: fit-content; margin: 8px 0 2px; }
html.tm-on :has(> .tm-file-pill) { flex-wrap: wrap !important; }
html.tm-on :has(> .tm-file-pill) > :not(.tm-file-pill) { flex: 1 1 100% !important; max-width: 100% !important; }
html.tm-on :is(.tm-open-file, .tm-file-pill, .tm-float) svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
html.tm-on #tm-filebar {
  position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom)); z-index: 1301; display: flex; gap: 8px;
}
html.tm-on #tm-filebar .tm-open-file { flex: 1; margin: 0; box-shadow: 0 6px 20px rgba(0,0,0,.25); }
html.tm-on .tm-float {
  position: fixed; top: 62px; right: 12px; z-index: 1301; display: inline-flex; align-items: center; gap: 6px; padding: 8px 13px;
  border-radius: 18px; background: rgba(18,76,107,.95); color: #fff !important; font: 600 13.5px var(--tm-font); text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(0,0,0,.3);
}
html.tm-on .bb-editor-file-viewer :is(.js-file-viewer-attachment-meta, .js-file-viewer-attachment-meta *) { word-break: normal !important; overflow-wrap: anywhere !important; }

/* ---------- lift Blackboard's own help button above the tab bar ---------- */
html.tm-on.tm-tabs .pagehelp-directive { top: auto !important; bottom: calc(var(--tm-tab-h) + env(safe-area-inset-bottom) + 6px) !important; }
`;

  const LOKET_CSS = String.raw`
/* ---------- all KU Loket lists: card look (not tables) ---------- */
html.tm-on .sapFDynamicPageContentWrapper, html.tm-on .sapFDynamicPage, html.tm-on .sapMPageEnableScrolling,
html.tm-on .sapMList.sapMListBGSolid:not(.sapMListTbl) { background: var(--tm-bg) !important; }
html.tm-on .sapMList:not(.sapMListTbl) > .sapMListUl { padding: 6px 0 96px !important; background: transparent !important; }
html.tm-on .sapMList:not(.sapMListTbl) li.sapMLIB:not(.sapMGHLI) {
  background: var(--tm-card) !important; border: 0 !important; border-radius: 14px !important; box-shadow: none !important;
  margin: 0 12px 10px !important; overflow: hidden;
}
html.tm-on .sapMList:not(.sapMListTbl) li.sapMGHLI {
  background: transparent !important; border: 0 !important; margin: 10px 14px 4px !important; padding: 0 !important; height: auto !important;
}
html.tm-on .sapMList:not(.sapMListTbl) li.sapMGHLI .sapMGHLITitle, html.tm-on .sapMList:not(.sapMListTbl) li.sapMGHLI * {
  font: 600 12.5px/1.3 var(--tm-font) !important; text-transform: uppercase; letter-spacing: .4px; color: var(--tm-sub) !important;
}
html.tm-on .sapMList:not(.sapMListTbl) .sapMListInfoTBar, html.tm-on .sapMList:not(.sapMListTbl) > .sapMIBar.sapMTB {
  background: transparent !important; border: 0 !important; margin: 4px 6px 0 !important; height: auto !important; min-height: 0 !important;
}
html.tm-on .sapMList:not(.sapMListTbl) > .sapMIBar.sapMTB .sapMText, html.tm-on .sapMList:not(.sapMListTbl) > .sapMIBar.sapMTB .sapMLabel {
  font: 400 13px/1.35 var(--tm-font) !important; color: var(--tm-sub) !important; white-space: normal !important;
}
html.tm-on .sapFDynamicPageFooter .sapMIBar, html.tm-on footer.sapFDynamicPageFooter > .sapMIBar {
  border-radius: 16px !important; box-shadow: 0 6px 24px rgba(0,0,0,.14) !important; border: 0 !important;
}
html.tm-on .sapFDynamicPageFooter .sapMBtn .sapMBtnInner { border-radius: 10px !important; }
html.tm-on .sapFDynamicPageFooter .sapMBtn bdi { font-weight: 600 !important; }

/* ---------- exam schedule (IER): date tile + countdown ---------- */
html.tm-on.tm-ier .sapFDynamicPageTitleMainHeading .sapMTitle, html.tm-on.tm-ier .sapFDynamicPageTitleMainHeading .sapMTitle * {
  font-size: 22px !important; font-weight: 700 !important; letter-spacing: -.2px;
}
html.tm-on.tm-ier li.tm-exam { padding: 0 !important; min-height: 0 !important; height: auto !important; }
html.tm-on.tm-ier li.tm-exam .sapMLIBContent {
  display: grid !important; grid-template-columns: 56px minmax(0, 1fr); column-gap: 14px; align-items: center; padding: 12px 14px !important;
  min-height: 0 !important; height: auto !important;
}
html.tm-on.tm-ier li.tm-exam :is(.sapMObjLTitle, .sapMObjLTitle *, .sapMObjectAttributeDiv .sapMText) { word-break: normal !important; overflow-wrap: break-word !important; hyphens: auto; }
html.tm-on.tm-ier li.tm-exam .sapMLIBContent > * { grid-column: 2; min-width: 0; }
html.tm-on.tm-ier li.tm-exam .sapMLIBContent > .tm-datetile { grid-column: 1; grid-row: 1 / span 4; }
html.tm-on.tm-ier li.tm-exam .sapMObjLTopRow { display: flex !important; flex-direction: column-reverse; gap: 4px; padding: 0 !important; margin: 0 !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjLTopRow > div { float: none !important; width: auto !important; max-width: none !important; padding: 0 !important; margin: 0 !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjLNumberDiv, html.tm-on.tm-ier li.tm-exam .sapMObjectNumber { text-align: left !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjectNumberText { display: none !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjectNumberUnit {
  display: inline !important; padding: 0 !important; font: 600 14.5px var(--tm-font) !important; color: var(--tm-blue) !important;
}
html.tm-on.tm-ier li.tm-exam .sapMObjLTitle, html.tm-on.tm-ier li.tm-exam .sapMObjLTitle * {
  font: 600 16.5px/1.3 var(--tm-font) !important; color: var(--tm-text) !important; padding: 0 !important;
}
html.tm-on.tm-ier li.tm-exam .sapMTextLineClamp { -webkit-line-clamp: 3 !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjLBottomRow { padding: 3px 0 0 !important; margin: 0 !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjLAttrRow { padding: 0 !important; }
html.tm-on.tm-ier li.tm-exam .sapMObjectAttributeDiv, html.tm-on.tm-ier li.tm-exam .sapMObjectAttributeDiv .sapMText {
  font: 400 13.5px/1.35 var(--tm-font) !important; color: var(--tm-sub) !important; white-space: normal !important; overflow: visible !important; max-width: none !important;
}
html.tm-on .tm-datetile {
  display: flex; flex-direction: column; align-items: center; justify-content: center; height: 64px;
  border-radius: 12px; background: #eaf3f8; line-height: 1;
}
html.tm-on .tm-datetile .m { font: 700 11px var(--tm-font); text-transform: uppercase; letter-spacing: .5px; color: var(--tm-red); }
html.tm-on .tm-datetile .d { font: 700 25px var(--tm-font); color: var(--tm-text); margin: 3px 0 2px; }
html.tm-on .tm-datetile .w { font: 500 11px var(--tm-font); color: var(--tm-sub); }
html.tm-on .tm-count {
  display: inline-block; margin-left: 8px; padding: 0 8px; border-radius: 10px; vertical-align: 1px;
  background: #eef0f3; color: var(--tm-sub); font: 600 12px/20px var(--tm-font);
}
html.tm-on .tm-count.soon { background: #fff1e6; color: #b54d00; }
html.tm-on .tm-count.past { background: #f2f2f2; color: #9a9a9a; }

/* ---------- timetable (Uurrooster): list view ---------- */
html.tm-on #tm-agenda {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; overflow-y: auto; -webkit-overflow-scrolling: touch;
  background: var(--tm-bg); font-family: var(--tm-font); padding-bottom: calc(24px + env(safe-area-inset-bottom));
}
html.tm-on .tm-ag-head {
  position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 12px 14px 10px 16px; background: rgba(242,242,247,.94); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
}
html.tm-on .tm-ag-h { font: 700 22px/1.2 var(--tm-font); color: var(--tm-text); letter-spacing: -.2px; }
html.tm-on .tm-seg { display: inline-flex; padding: 2px; border-radius: 9px; background: #e3e3e8; }
html.tm-on .tm-seg button { border: 0; background: transparent; padding: 6px 14px; border-radius: 7px; font: 600 13.5px var(--tm-font); color: var(--tm-text); }
html.tm-on .tm-seg button.on { background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.12); }
html.tm-on .tm-ag-day { margin: 16px 16px 6px; font: 600 13px/1.2 var(--tm-font); text-transform: uppercase; letter-spacing: .4px; color: var(--tm-sub); }
html.tm-on .tm-ag-card { margin: 0 12px; background: var(--tm-card); border-radius: 14px; overflow: hidden; }
html.tm-on .tm-ag-row { display: flex; gap: 12px; padding: 11px 14px 11px 12px; border-left: 4px solid var(--c); border-bottom: .5px solid var(--tm-sep); }
html.tm-on .tm-ag-row:last-child { border-bottom: 0; }
html.tm-on .tm-ag-time { flex: none; width: 48px; display: flex; flex-direction: column; gap: 2px; }
html.tm-on .tm-ag-time b { font: 600 15px var(--tm-font); color: var(--tm-text); }
html.tm-on .tm-ag-time span { font: 400 13px var(--tm-font); color: var(--tm-sub); }
html.tm-on .tm-ag-main { flex: 1; min-width: 0; }
html.tm-on .tm-ag-title { font: 600 16px/1.3 var(--tm-font); color: var(--tm-text); }
html.tm-on .tm-ag-meta { margin-top: 2px; font: 400 13.5px/1.35 var(--tm-font); color: var(--tm-sub); }
html.tm-on .tm-ag-meta a { color: var(--tm-blue); text-decoration: none; }
html.tm-on .tm-ag-note { margin: 18px 16px; font: 400 14.5px/1.4 var(--tm-font); color: var(--tm-sub); }
html.tm-on .tm-ag-more { display: block; margin: 16px auto 0; padding: 10px 18px; border: 0; border-radius: 10px; background: #e3e3e8; color: var(--tm-blue); font: 600 14.5px var(--tm-font); }
html.tm-on #tm-ag-pill {
  position: fixed; left: 12px; bottom: calc(14px + env(safe-area-inset-bottom)); z-index: 40; padding: 9px 14px; border: 0; border-radius: 20px;
  background: var(--tm-head); color: #fff; font: 600 13px var(--tm-font); box-shadow: 0 4px 14px rgba(0,0,0,.25);
}
`;

  const GLOBAL_CSS = String.raw`
@media (min-width: 768px) { #tm-tabbar, #tm-title, #tm-classic, .tm-more, .tm-datetile, .tm-count, .tm-open-file, .tm-file-pill, #tm-filebar, .tm-float, #tm-agenda, #tm-ag-pill { display: none !important; } }
`;

  function addStyle() {
    if (document.getElementById('tm-style')) return;
    const css = { ultra: ULTRA_CSS, loket: LOKET_CSS }[SITE];
    const s = document.createElement('style');
    s.id = 'tm-style';
    s.textContent = `@media (max-width: 767px) {\n${SHARED_CSS}\n${css}\n}\n${GLOBAL_CSS}`;
    const put = () => (document.head || document.documentElement).appendChild(s);
    if (document.head || document.documentElement) put();
    else { const mo = new MutationObserver(() => { if (document.documentElement) { mo.disconnect(); put(); } }); mo.observe(document, { childList: true }); }
  }

  /* ================================================================== shared: tab bar */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    courses: '<path d="M5 4.5h11.5a1.5 1.5 0 0 1 1.5 1.5v14H6.5A1.5 1.5 0 0 1 5 18.5z"/><path d="M5 18.5A1.5 1.5 0 0 1 6.5 17H18"/><path d="M9 8.5h5"/>',
    updates: '<path d="M6 16.5v-5.5a6 6 0 1 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    messages: '<path d="M21 3 3 10.5l7.2 2.6L12.8 21z"/><path d="m21 3-10.8 10.1"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    vandaag: '<path d="M3.8 10.4 12 3.8l8.2 6.6V19a1.6 1.6 0 0 1-1.6 1.6h-4v-5.8H9.4v5.8h-4A1.6 1.6 0 0 1 3.8 19z"/>',
    vakken: '<path d="M5 5.6A2.1 2.1 0 0 1 7.1 3.5H19v13.8H7.1A2.1 2.1 0 0 0 5 19.4z"/><path d="M5 19.4a2.1 2.1 0 0 0 2.1 2.1H19v-4.2"/><path d="M9 7.8h6"/>',
    rooster: '<rect x="3.6" y="4.8" width="16.8" height="15.8" rx="3"/><path d="M3.6 9.6h16.8M8 3v3.4M16 3v3.4"/>',
    meer: '<rect x="4" y="4" width="6.6" height="6.6" rx="1.8"/><rect x="13.4" y="4" width="6.6" height="6.6" rx="1.8"/><rect x="4" y="13.4" width="6.6" height="6.6" rx="1.8"/><rect x="13.4" y="13.4" width="6.6" height="6.6" rx="1.8"/>',
  };
  // Same five destinations everywhere; on the portal they are in-page, elsewhere they lead back to the portal.
  const TABS = SITE !== 'portal' ? [
    { id: 'vandaag', label: 'Vandaag', url: PORTAL + '?tm=vandaag' },
    { id: 'vakken', label: 'Vakken', url: PORTAL + '?tm=vakken' },
    { id: 'rooster', label: 'Rooster', url: PORTAL + '?tm=rooster' },
    { id: 'updates', label: 'Updates', url: PORTAL + '?tm=updates' },
    { id: 'meer', label: 'Meer', url: PORTAL + '?tm=meer' },
  ] : [
    { id: 'home', label: 'Home', hash: '#/home', url: PORTAL + '#/home' },
    { id: 'courses', label: 'Vakken', hash: '#/home', url: PORTAL + '?tm=courses#/home' },
    { id: 'updates', label: 'Updates', hash: '#/updates', url: PORTAL + '#/updates' },
    { id: 'messages', label: 'Communicatie', hash: '#/messages', url: PORTAL + '#/messages' },
    { id: 'menu', label: 'Menu', hash: '', url: PORTAL + '?tm=menu#/home' },
  ];

  function ensureTabbar(onClick) {
    if (!document.body || $('#tm-tabbar')) return;
    const nav = document.createElement('nav');
    nav.id = 'tm-tabbar';
    nav.setAttribute('aria-label', 'Toledo');
    nav.innerHTML = TABS.map((t) => `<a href="${SITE === 'portal' ? (t.hash || '#') : t.url}" data-tab="${t.id}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[t.id]}</svg><span>${t.label}</span>${SITE === 'portal' && (t.id === 'updates' || t.id === 'messages') ? '<i class="tm-badge"></i>' : ''}</a>`).join('');
    if (onClick) nav.addEventListener('click', onClick);
    document.body.appendChild(nav);
  }
  const setActiveTab = (id) => $$('#tm-tabbar a[data-tab]').forEach((a) => a.classList.toggle('tm-active', a.dataset.tab === id));

  const waitFor = (sel, ms = 8000) => new Promise((res) => {
    const t0 = Date.now();
    (function tick() { const el = $(sel); if (el || Date.now() - t0 > ms) res(el); else setTimeout(tick, 120); })();
  });

  function fixViewport() {
    const m = $('meta[name=viewport]');
    if (m && !/viewport-fit/.test(m.content)) m.content += ', viewport-fit=cover';
  }
  /* ================================================================== Ultra (course pages) */
  const ultra = (() => {
    // Show the tab bar on list-type pages only; hide it while an item, assignment or test is open,
    // so it can never cover Blackboard's own buttons (Submit, Save, ...).
    const BASE = /^\/ultra\/(course|stream|calendar|messages|grades|institution-page|profile|organizations|tools)\/?$/;
    const COURSE = /^\/ultra\/(courses|organizations)\/[^/]+\/[^/]+\/?$/;
    const overlayOpen = () => $$('.MuiDialog-root, .bb-offcanvas-panel.active, [role=dialog]').some((d) => d.offsetParent !== null && d.getBoundingClientRect().height > 100);

    function syncTabs() {
      const show = (BASE.test(__TM_LOC__.pathname) || COURSE.test(__TM_LOC__.pathname)) && !overlayOpen();
      root.classList.toggle('tm-tabs', show);
      setActiveTab(/^\/ultra\/(courses|course)\b/.test(__TM_LOC__.pathname) ? 'vakken' : '');
    }

    function foldDescriptions() {
      $$('react-course-content-outline .js-description:not([data-tm])').forEach((d) => {
        const lh = parseFloat(getComputedStyle(d).lineHeight) || 20;
        if (!d.textContent.trim()) return;
        d.setAttribute('data-tm', '1');
        if (d.scrollHeight <= lh * 4.2) return;
        d.classList.add('tm-clamp');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'tm-more';
        b.textContent = 'Meer';
        b.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const open = d.classList.toggle('tm-open');
          b.textContent = open ? 'Minder' : 'Meer';
        });
        d.insertAdjacentElement('afterend', b);
      });
    }

    /* ---------- files: one tap to Safari's own PDF / video viewer ---------- */
    const OPEN_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';
    function fileLabel(name, mime) {
      const s = `${name || ''} ${mime || ''}`.toLowerCase();
      if (/pdf/.test(s)) return 'Open PDF';
      if (/video|\.(mp4|mov|m4v)\b/.test(s)) return 'Speel video af';
      if (/audio|\.(mp3|m4a|wav)\b/.test(s)) return 'Speel audio af';
      if (/image|\.(png|jpe?g|gif|heic|webp)\b/.test(s)) return 'Bekijk afbeelding';
      if (/ppt|powerpoint|presentation|keynote/.test(s)) return 'Open presentatie';
      if (/\.docx?\b|msword|wordprocessing/.test(s)) return 'Open document';
      if (/xls|excel|spreadsheet/.test(s)) return 'Open rekenblad';
      return 'Open bestand';
    }
    function openLink(href, label, cls) {
      const a = document.createElement('a');
      a.className = cls;
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.innerHTML = OPEN_ICON;
      const s = document.createElement('span');
      s.textContent = label;
      a.appendChild(s);
      a.addEventListener('click', (e) => e.stopPropagation()); // don't also open Blackboard's own viewer
      return a;
    }
    const attCache = new Map();
    function attachments(cid, ctid) {
      const k = cid + '/' + ctid;
      if (!attCache.has(k)) {
        attCache.set(k, fetch(`${__TM_LOC__.origin}/learn/api/public/v1/courses/${encodeURIComponent(cid)}/contents/${encodeURIComponent(ctid)}/attachments`,
          { credentials: 'same-origin', headers: { Accept: 'application/json' } })
          .then((r) => (r.ok ? r.json() : { results: [] })).then((j) => (j && j.results) || []).catch(() => []));
      }
      return attCache.get(k);
    }
    const downloadUrl = (cid, ctid, aid) => `${__TM_LOC__.origin}/learn/api/public/v1/courses/${encodeURIComponent(cid)}/contents/${encodeURIComponent(ctid)}/attachments/${encodeURIComponent(aid)}/download`;
    const ID = /^_\d+_\d+$/;

    // 1) PDFs / files embedded in a document page.
    // Blackboard builds these blocks in more than one way, so the link is looked for in several places:
    // the block's own href, a link inside it, the file info (data-bbfile), and as a last resort the
    // document's attachment list via Blackboard's own API (matched on file name).
    const DOC_ROUTE = /^\/ultra\/(?:courses|organizations)\/([^/]+)\/(?:outline\/)?(?:edit\/)?document\/([^/?#]+)/;
    function sameOriginFile(raw) {
      if (!raw) return '';
      let s = String(raw).trim().replace(/^@X@[^@]*@X@/i, '/');
      if (/^xid-\d+_\d+$/.test(s)) s = '/bbcswebdav/' + s;
      try {
        const u = new URL(s, __TM_LOC__.origin);
        if (u.origin === __TM_LOC__.origin && u.pathname.startsWith('/bbcswebdav/')) return u.href;
      } catch (_) {}
      return '';
    }
    function fileInfo(host) {
      let info = {};
      try { info = JSON.parse(host.getAttribute('data-bbfile') || '{}') || {}; } catch (_) {}
      const cands = [host.getAttribute('href'), ...$$('a[href]', host).map((a) => a.getAttribute('href'))];
      Object.values(info).forEach((v) => { if (typeof v === 'string' && /bbcswebdav|^xid-\d+_\d+$/.test(v)) cands.push(v); });
      const xid = JSON.stringify(info).match(/xid-\d+_\d+/);
      if (xid) cands.push(xid[0]);
      let href = '';
      for (const c of cands) { href = sameOriginFile(c); if (href) break; }
      const meta = $('.js-file-viewer-attachment-meta', host);
      const name = info.fileName || info.displayName || info.linkName || (meta ? meta.textContent.trim() : '') || host.textContent.trim().slice(0, 120);
      return { href, name, mime: info.mimeType || '' };
    }
    const norm = (s) => String(s || '').toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '').replace(/[^a-z0-9]+/g, ' ').trim();

    function findAttachment(route, name) {
      if (!route || !ID.test(route[1]) || !ID.test(route[2])) return Promise.resolve(null);
      return attachments(route[1], route[2]).then((atts) => {
        const want = norm(name);
        const a = atts.find((x) => norm(x.fileName) === want)
          || atts.find((x) => want && (norm(x.fileName).startsWith(want) || want.startsWith(norm(x.fileName))))
          || (atts.length === 1 ? atts[0] : null);
        return a ? { href: downloadUrl(route[1], route[2], a.id), label: fileLabel(a.fileName, a.mimeType) } : null;
      });
    }

    function embeddedFiles() {
      const set = new Set();
      $$('[data-bbfile]').forEach((el) => set.add(el));
      $$('.bb-editor-file-viewer').forEach((v) => set.add(v.closest('[data-bbfile]') || v));
      const hosts = [...set].filter((h) => ![...set].some((o) => o !== h && o.contains(h)));
      const route = DOC_ROUTE.exec(__TM_LOC__.pathname);
      hosts.forEach((host) => {
        const next = host.nextElementSibling;
        let btn = next && next.classList.contains('tm-open-file') ? next : null;
        const f = fileInfo(host);
        if (!btn) {
          btn = openLink(f.href || '#', fileLabel(f.name, f.mime), 'tm-open-file');
          btn.dataset.tmName = f.name;
          btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href') !== '#') return;
            // link not known yet: look it up now; open the tab right away so Safari doesn't block it
            e.preventDefault();
            const again = fileInfo(host);
            if (again.href) { btn.setAttribute('href', again.href); window.open(again.href, '_blank'); return; }
            const w = window.open('', '_blank');
            findAttachment(route, btn.dataset.tmName).then((hit) => {
              if (hit) { btn.setAttribute('href', hit.href); if (w) w.location.href = hit.href; else __TM_GO__(hit.href); }
              else { if (w) w.close(); btn.querySelector('span').textContent = 'Tik op ⌄ hierboven om te openen'; }
            });
          });
          host.insertAdjacentElement('afterend', btn);
        }
        if (f.href) {
          if (btn.getAttribute('href') !== f.href) btn.setAttribute('href', f.href);
          if (btn.textContent === 'Open bestand' && !btn.dataset.tmLabel) {
            // name without extension (e.g. "Session 1 Slidedeck"): ask Blackboard what kind of file it is
            btn.dataset.tmLabel = '1';
            findAttachment(route, btn.dataset.tmName).then((hit) => { if (hit) btn.querySelector('span').textContent = hit.label; });
          }
        } else if (btn.getAttribute('href') === '#' && !btn.dataset.tmLookup) {
          btn.dataset.tmLookup = '1';
          findAttachment(route, btn.dataset.tmName).then((hit) => {
            if (hit && btn.getAttribute('href') === '#') { btn.setAttribute('href', hit.href); btn.querySelector('span').textContent = hit.label; }
          });
        }
      });
    }

    // 2) a file item opened in Blackboard's viewer: floating "Open PDF" bar
    const FILE_ROUTE = /^\/ultra\/(?:courses|organizations)\/([^/]+)\/(?:outline\/)?file\/([^/?#]+)/;
    let fileKey = '';
    function fileBar() {
      const m = FILE_ROUTE.exec(__TM_LOC__.pathname);
      const key = m && ID.test(m[1]) && ID.test(m[2]) ? m[1] + '/' + m[2] : '';
      if (key === fileKey) return;
      fileKey = key;
      $('#tm-filebar')?.remove();
      if (!key) return;
      attachments(m[1], m[2]).then((atts) => {
        if (fileKey !== key || !atts.length || $('#tm-filebar')) return;
        const bar = document.createElement('div');
        bar.id = 'tm-filebar';
        atts.slice(0, 2).forEach((a) => bar.appendChild(openLink(downloadUrl(m[1], m[2], a.id), fileLabel(a.fileName, a.mimeType), 'tm-open-file')));
        document.body.appendChild(bar);
      });
    }

    // 3) course content list: a small "Open PDF" pill under every file, so you skip the viewer entirely
    function outlinePills() {
      $$('react-course-content-outline a[href*="/file/_"]:not([data-tm-pill])').forEach((a) => {
        const m = /\/(?:courses|organizations)\/([^/]+)\/(?:outline\/)?file\/([^/?#]+)/.exec(a.getAttribute('href') || '');
        if (!m || !ID.test(m[1]) || !ID.test(m[2])) return;
        a.setAttribute('data-tm-pill', '1');
        attachments(m[1], m[2]).then((atts) => {
          if (!atts.length || !a.isConnected) return;
          const h3 = a.closest('h3');
          if ((h3 || a.parentElement).querySelector(':scope > .tm-file-pill')) return;
          const pill = openLink(downloadUrl(m[1], m[2], atts[0].id), fileLabel(atts[0].fileName, atts[0].mimeType), 'tm-file-pill');
          if (h3) h3.appendChild(pill); // under the title, so the title keeps its full width
          else a.insertAdjacentElement('afterend', pill);
        });
      });
    }

    // 4) weblectures (Kaltura via LTI): "Open apart" gives the player the whole screen
    function lectureButton() {
      const on = /\/lti\/launchFrame/.test(__TM_LOC__.pathname);
      const fr = on && $('iframe[name="lti-launch-iframe"]');
      let b = $('#tm-lecture');
      let src = '';
      try { if (fr && fr.src) { const u = new URL(fr.src); if (u.origin === __TM_LOC__.origin) src = u.href; } } catch (_) {}
      if (!src) { b?.remove(); return; }
      if (!b) { b = openLink(src, 'Open apart', 'tm-float'); b.id = 'tm-lecture'; document.body.appendChild(b); }
      else if (b.href !== src) b.href = src;
    }

    // Keep the active course pill visible in the scrollable strip
    let lastPill = null;
    function revealActivePill() {
      const a = $('bb-course-navigation nav a.active');
      if (!a || a === lastPill) return;
      lastPill = a;
      const strip = a.closest('.js-course-navigation > div');
      if (strip) strip.scrollTo({ left: Math.max(0, a.offsetLeft - 12), behavior: 'smooth' });
    }

    function ensure() {
      ensureTabbar();
      syncTabs();
      foldDescriptions();
      revealActivePill();
      embeddedFiles();
      fileBar();
      outlinePills();
      lectureButton();
    }
    return {
      start() {
        ensure();
        window.addEventListener('popstate', schedule);
        // Ultra navigates with pushState: watch for URL changes
        let last = location.href;
        // closing an item in Blackboard lands on the course outline: go back to the app's course page
        const toApp = () => {
          const m = /^\/ultra\/courses\/(_\d+_\d+)\/outline\/?$/.exec(__TM_LOC__.pathname);
          let c = 0; try { c = Number(sessionStorage.getItem('tm4-classic-ultra')) || 0; } catch (_) {}
          const classic = c && Date.now() - c < 30 * 60e3;
          if (classic || Math.min(screen.width, screen.height) >= 600) return;
          if (m && !__TM_LOC__.search) {
            const toAppUrl = 'https://ultra.edu.kuleuven.cloud/ultra/courses/' + m[1] + '/outline?tm=app#/c/' + m[1];
            const noapp = Number(sessionStorage.getItem('tm4-noapp')) || 0;
            if (noapp && Date.now() - noapp < 5 * 60e3) {
              // the app stepped aside so Blackboard could sign you in: go back once that is done
              if (window.__tm4wait) return;
              window.__tm4wait = true;
              const check = () => fetch('/learn/api/public/v1/users/me', { credentials: 'include', headers: { Accept: 'application/json' } })
                .then((r) => { if (r.ok && /json/.test(r.headers.get('content-type') || '')) { sessionStorage.removeItem('tm4-noapp'); __TM_REPL__(toAppUrl); } else setTimeout(check, 2500); }, () => setTimeout(check, 4000));
              setTimeout(check, 1500);
              return;
            }
            __TM_REPL__(toAppUrl);
            return;
          }
          // Blackboard's own start pages (e.g. after signing in): back to the app
          const home = /^\/ultra\/?$|^\/ultra\/(course|stream|institution-page)\/?$/.exec(__TM_LOC__.pathname);
          if (home) __TM_REPL__('https://toledo.kuleuven.be/portal/' + (/stream/.test(__TM_LOC__.pathname) ? '?tm=updates' : /\/course\/?$/.test(__TM_LOC__.pathname) ? '?tm=vakken' : '?tm=vandaag'));
        };
        // the app's tab bar: handle the tap before Blackboard's own click handling can swallow it
        window.addEventListener('click', (e) => {
          const a = e.target && e.target.closest && e.target.closest('#tm-tabbar a[href]');
          if (!a) return;
          e.preventDefault(); e.stopImmediatePropagation();
          __TM_GO__(a.href);
        }, true);
        toApp();
        setInterval(() => { if (location.href !== last) { last = location.href; toApp(); schedule(); } }, 400);
      },
      ensure,
    };
  })();

  /* ================================================================== KU Loket (exam schedule) */
  const loket = (() => {
    const MONTHS = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    const DATE = /\b([a-z]{2})\.?\s+(\d{1,2})\.(\d{1,2})\.(\d{4})\b/i;

    function countdown(date) {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const days = Math.round((date - today) / 864e5);
      if (days < 0) return { t: 'voorbij', c: 'past' };
      if (days === 0) return { t: 'vandaag', c: 'soon' };
      if (days === 1) return { t: 'morgen', c: 'soon' };
      return { t: `over ${days} dagen`, c: days <= 14 ? 'soon' : '' };
    }

    function decorate() {
      root.classList.toggle('tm-ier', /^#zr_0363/i.test(location.hash));
      if (!root.classList.contains('tm-ier')) return;
      $$('li.sapMLIB').forEach((li) => {
        const txt = $('.sapMObjectNumberText', li);
        const content = $('.sapMLIBContent', li);
        if (!txt || !content) return;
        const m = DATE.exec(txt.textContent || '');
        if (!m) return;
        const key = m[0];
        if (li.dataset.tmDate === key && $('.tm-datetile', content)) return;
        li.dataset.tmDate = key;
        li.classList.add('tm-exam');
        const date = new Date(Number(m[4]), Number(m[3]) - 1, Number(m[2]));
        $$('.tm-datetile', content).forEach((n) => n.remove());
        const tile = document.createElement('div');
        tile.className = 'tm-datetile';
        tile.setAttribute('aria-hidden', 'true');
        tile.innerHTML = `<span class="m">${MONTHS[date.getMonth()]}</span><span class="d">${date.getDate()}</span><span class="w">${m[1].toLowerCase()}</span>`;
        content.prepend(tile);
        const unit = $('.sapMObjectNumberUnit', li);
        if (unit) {
          $$('.tm-count', li).forEach((n) => n.remove());
          const cd = countdown(date);
          const pill = document.createElement('span');
          pill.className = 'tm-count' + (cd.c ? ' ' + cd.c : '');
          pill.textContent = cd.t;
          unit.insertAdjacentElement('afterend', pill);
        }
      });
    }
    /* ---------- Uurrooster (zr_0367): a day-by-day list instead of the cramped 7-column week grid ---------- */
    const DAYS = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'];
    const COLORS = ['#2b8fc1', '#34a853', '#e8710a', '#a142f4', '#d93025', '#12a4af', '#c5221f', '#5f6368'];
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const pad = (n) => String(n).padStart(2, '0');
    const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const res = (v) => (Array.isArray(v) ? v : (v && Array.isArray(v.results) ? v.results : []));
    const colorOf = (s) => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) | 0; return COLORS[Math.abs(h) % COLORS.length]; };
    const WEEK_KEY = 'tm-ag-week';
    let agDays = 14, agLoadedFor = '', agBusy = false;

    function sapDay(v) {
      const m = /\/Date\((-?\d+)/.exec(String(v || ''));
      if (!m) return null;
      const u = new Date(Number(m[1]));
      return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
    }
    function hm(v) {
      const m = /PT(\d+)H(\d+)M/.exec(String(v || ''));
      return m ? `${pad(m[1])}:${m[2]}` : '';
    }
    function dayLabel(d) {
      const t = new Date(); t.setHours(0, 0, 0, 0);
      const diff = Math.round((d - t) / 864e5);
      const base = `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
      return diff === 0 ? `Vandaag · ${base}` : diff === 1 ? `Morgen · ${base}` : base;
    }

    async function loadAgenda(body) {
      const from = new Date(); from.setHours(0, 0, 0, 0);
      const to = new Date(from.getTime() + (agDays - 1) * 864e5);
      const key = ymd(from) + '/' + agDays;
      if (agBusy || agLoadedFor === key) return;
      agBusy = true;
      body.innerHTML = '<p class="tm-ag-note">Laden…</p>';
      try {
        const filter = `(date ge datetime'${ymd(from)}T00:00:00' and date le datetime'${ymd(to)}T00:00:00')`;
        const url = `/sap/opu/odata/sap/ZC_EP_SCHEDULE_SRV/Events?sap-client=200&$format=json&$skip=0&$top=1000&$filter=${encodeURIComponent(filter)}&$expand=EventTeacherSet,EventLocationSet`;
        const r = await fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' } });
        const j = await r.json();
        const rows = res(j && j.d).map((e) => {
          const day = sapDay(e.date);
          if (!day) return null;
          const loc = res(e.EventLocationSet)[0] || {};
          const place = [[loc.mnemonic, loc.roomNumber].filter(Boolean).join(' '), loc.roomName].filter(Boolean).join(' · ');
          const link = String(loc.url_location || '').replace(/^http:\/\//i, 'https://');
          return {
            day, start: hm(e.start_time), end: hm(e.end_time),
            title: e.ola_description || e.workFormDesc || '—', form: e.workFormDesc || '',
            place, link: /^https:\/\/[^\s"'<>]+$/.test(link) ? link : '',
            teachers: res(e.EventTeacherSet).map((x) => x.name || x.fullName || '').filter(Boolean).join(', '),
          };
        }).filter(Boolean).sort((a, b) => (a.day - b.day) || a.start.localeCompare(b.start));
        const groups = new Map();
        rows.forEach((x) => { const k = ymd(x.day); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(x); });
        let html = '';
        if (!groups.size) html += `<p class="tm-ag-note">Geen lessen in de komende ${agDays} dagen.</p>`;
        for (const items of groups.values()) {
          html += `<h4 class="tm-ag-day">${esc(dayLabel(items[0].day))}</h4><div class="tm-ag-card">`;
          html += items.map((x) => `<div class="tm-ag-row" style="--c:${colorOf(x.title)}"><div class="tm-ag-time"><b>${esc(x.start)}</b><span>${esc(x.end)}</span></div><div class="tm-ag-main"><div class="tm-ag-title">${esc(x.title)}</div>${x.form ? `<div class="tm-ag-meta">${esc(x.form)}</div>` : ''}${x.place ? `<div class="tm-ag-meta">${x.link ? `<a href="${esc(x.link)}" target="_blank" rel="noopener">${esc(x.place)}</a>` : esc(x.place)}</div>` : ''}${x.teachers ? `<div class="tm-ag-meta">${esc(x.teachers)}</div>` : ''}</div></div>`).join('');
          html += '</div>';
        }
        html += `<button type="button" class="tm-ag-more">Toon ${agDays + 14} dagen</button>`;
        body.innerHTML = html;
        agLoadedFor = key;
      } catch (e) {
        body.innerHTML = '<p class="tm-ag-note">Het uurrooster kon niet geladen worden. Kies "Week" voor de gewone weergave, of probeer opnieuw.</p>';
        agLoadedFor = '';
      } finally {
        agBusy = false;
      }
    }

    function agenda() {
      const on = /^#zr_0367/i.test(location.hash) && window.innerWidth <= 767;
      let box = $('#tm-agenda');
      let week = false;
      try { week = sessionStorage.getItem(WEEK_KEY) === '1'; } catch (_) {}
      root.classList.toggle('tm-uur', on);
      if (!on) { if (box) box.remove(); $('#tm-ag-pill')?.remove(); return; }
      if (week) {
        if (box) box.remove();
        if (!$('#tm-ag-pill')) {
          const p = document.createElement('button');
          p.id = 'tm-ag-pill'; p.type = 'button'; p.textContent = 'Lijstweergave';
          p.addEventListener('click', () => { try { sessionStorage.removeItem(WEEK_KEY); } catch (_) {} agLoadedFor = ''; schedule(); });
          document.body.appendChild(p);
        }
        return;
      }
      $('#tm-ag-pill')?.remove();
      const page = $('.sapMSinglePlanningCalendar, .sapMSinglePC, .sapMPlanCal');
      const pageBox = page && (page.closest('.sapMPage, .sapFDynamicPage') || page);
      const top = pageBox ? Math.max(0, Math.round(pageBox.getBoundingClientRect().top)) : 0;
      if (!top) return; // the app is not rendered yet
      if (!box) {
        box = document.createElement('div');
        box.id = 'tm-agenda';
        box.innerHTML = '<div class="tm-ag-head"><span class="tm-ag-h">Uurrooster</span><div class="tm-seg"><button type="button" class="on">Lijst</button><button type="button" data-week>Week</button></div></div><div class="tm-ag-body"></div>';
        box.querySelector('[data-week]').addEventListener('click', () => { try { sessionStorage.setItem(WEEK_KEY, '1'); } catch (_) {} schedule(); });
        box.addEventListener('click', (e) => {
          if (e.target.closest('.tm-ag-more')) { agDays += 14; loadAgenda(box.querySelector('.tm-ag-body')); }
        });
        document.body.appendChild(box);
        agLoadedFor = '';
      }
      box.style.top = top + 'px';
      loadAgenda(box.querySelector('.tm-ag-body'));
    }

    return {
      start() { decorate(); agenda(); window.addEventListener('hashchange', schedule); window.addEventListener('resize', schedule); },
      ensure() { decorate(); agenda(); },
    };
  })();

  /* ================================================================== boot */
  const MOD = { ultra, loket }[SITE];
  let queued = false;
  function ensureAll() { queued = false; if (document.body) MOD.ensure(); }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(ensureAll); } }

  if (!MOD) return;
  addStyle();
  root.classList.add('tm-on');

  const start = () => {
    fixViewport();
    MOD.start();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  };
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
})();
  };
  if (document.documentElement) run();
  else { const mo = new MutationObserver(() => { if (document.documentElement) { mo.disconnect(); run(); } }); mo.observe(document, { childList: true }); }
})();
