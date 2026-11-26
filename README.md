# Toledo Mobile · installeren en demo

Live: https://vj4542662.github.io/toledo-mobile-demo/

- `index.html`: startpagina voor op de gsm. Kies de demo of installeer Toledo Mobile in 4 stappen (Userscripts downloaden, aanzetten in Safari, script installeren, inloggen en op het beginscherm zetten). De pagina onthoudt bij welke stap je zit en vraagt "Gelukt?" als je terugkomt.
- `demo/`: speelbare demo met een fictieve student (Lotte Vermeulen). Op een computer in een iPhone-kader, op een gsm schermvullend. Alle gegevens zijn verzonnen; er wordt niets naar KU Leuven of KURT gestuurd.
  - `demo/app.html` laadt `mock.js` (nepgegevens en nep-API's) en `tm.js` (het echte script, aangepast zodat het op een gewone webpagina draait).
- `make_demo.py` bouwt `demo/tm.js` uit de broncode (kloon vj4542662/toledo-mobile naar `src-repo/`, branch main).

Toledo Mobile is onofficieel en heeft niets te maken met KU Leuven of Toledo.
