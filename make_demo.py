#!/usr/bin/env python3
"""Builds demo/tm.js: the real Toledo Mobile script (unminified build of src/), patched so it runs on any
static web page: it reads a fake address (?u=...) instead of the real one, and page changes go through the demo."""
import re, pathlib, subprocess, os
root = pathlib.Path(__file__).parent
repo = root / 'src-repo'
env = dict(os.environ, PATH='/usr/bin:/bin')
subprocess.run(['python3', 'build.py'], cwd=repo, env=dict(env, TM_CHANNEL='main'), check=True, capture_output=True)
js = (repo / 'toledo-mobile.user.js').read_text()
js = js.split('// ==/UserScript==', 1)[1]
N = r'(?<![\w.$])'
reps = [
    (r'const TOP = W\.top === W;', 'const TOP = true; // the demo runs inside a phone frame'),
    (N + r'location\.hostname', '__TM_LOC__.hostname'),
    (N + r'location\.origin', '__TM_LOC__.origin'),
    (N + r'location\.pathname', '__TM_LOC__.pathname'),
    (N + r'location\.search', '__TM_LOC__.search'),
    (N + r'location\.replace\(', '__TM_REPL__('),
    (N + r'location\.href = ([^;]+);', r'__TM_GO__(\1);'),
    (r"K \+ '/' \+ loc\.thumbnailUrl", 'loc.thumbnailUrl'),
    (r"K \+ '/' \+ l\.fullImageUrl", 'l.fullImageUrl'),
    # no hidden frames to the real KURT or Alma sites from the demo
    (r'function refreshKurt\(force\) \{', 'function refreshKurt(force) { if (TEST) return;'),
    (r'function openAlma\(href, tile\) \{', 'function openAlma(href, tile) { if (TEST) return __TM_GO__(href);'),
]
for pat, new in reps:
    js, n = re.subn(pat, new, js)
    print(f'{n:3d}  {pat}')
out = root / 'demo'
out.mkdir(exist_ok=True)
(out / 'tm.js').write_text(js)
print('demo/tm.js', len(js))
