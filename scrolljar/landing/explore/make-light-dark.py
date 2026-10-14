import sys,re
src,dst,iframe=sys.argv[1],sys.argv[2],sys.argv[3]
prefix=sys.argv[4] if len(sys.argv)>4 else ''
s=open(src).read()
def R(a,b,n=1):
    global s
    assert s.count(a)==n,(s.count(a),a[:70]); s=s.replace(a,b)
# which sections go light (dark: hero and demo, neon jar, science, mission and founder note, FAQ, sign-up)
R('<section class="band" id="difference">','<section class="band light" id="difference">')
R('<section id="refuse" class="band">','<section id="refuse" class="band light">')
R('<section id="more" class="band">','<section id="more" class="band light">')
R('src="../prototype/index.html?embed=1"',f'src="{iframe}"')
css='''
/* ── Light bands: every other section on a soft daylight background, with its own readable colours ── */
.light{color-scheme:light;position:relative;z-index:1;
  --ink:#16142F; --ink-2:#47436B; --ink-3:#66628A;
  --mint:#0A8A72; --lav:#6455D6; --gold-ink:#9A6200; --coral:#C8502F;
  --glass:rgba(255,255,255,.78); --glass-2:rgba(22,20,47,.045); --edge:rgba(22,20,47,.11); --hi:#fff;
  --line:rgba(22,20,47,.09);
  --sheen:linear-gradient(170deg,rgba(255,255,255,.7),rgba(255,255,255,0) 55%);
  --head-grad:linear-gradient(95deg,#0B9C80 0%,#6455D6 100%);
  background:radial-gradient(1200px 500px at 15% 0%,rgba(185,174,255,.28),transparent 60%),radial-gradient(900px 500px at 90% 100%,rgba(60,240,203,.18),transparent 60%),#F6F5FC;
  color:var(--ink);border-top:none}
.light .glass{box-shadow:inset 0 1px 0 #fff,0 22px 46px -30px rgba(40,30,100,.35)}
.light .node.dark{background:#E9E7F3;color:#5C5880}
.light .orb{background:#fff;color:var(--ink-2)}
.light .bub.c1{color:#0A7A64;border-color:rgba(10,138,114,.35)}
.light .bub.c2{color:#5040C2;border-color:rgba(100,85,214,.35)}
.light .bub.c3{color:#A8462A;border-color:rgba(200,80,47,.35)}
.light .tic{background:rgba(10,138,114,.1);border-color:rgba(10,138,114,.25)}
.light .refx{background:rgba(200,80,47,.1)}
.light .dcard.them{background:rgba(255,255,255,.5)}
.light .dcard.us{border-color:rgba(10,138,114,.4);box-shadow:inset 0 1px 0 #fff,0 24px 60px -34px rgba(10,138,114,.45)}
/* the menu bar and the bottom join bar keep a solid dark backing so they stay readable over light bands */
.navbar.glass,.stick{background:rgba(12,12,32,.82)}
'''
R('</head>','<style>'+css+'</style>\n</head>')

# ── key words in light-section headings get the same gradient as the dark sections ("do some good.") ──
def scoped(start_marker, pairs):
    global s
    a=s.index(start_marker); b=s.index('</section>',a)
    sec=s[a:b]
    for x,y in pairs:
        assert sec.count(x)==1,(start_marker,x[:50]); sec=sec.replace(x,y)
    s=s[:a]+sec+s[b:]
# (the gradient key words now live in landing/index.html itself)
# a touch more colour in the light gradient so it reads as vividly as on dark, while staying readable
s=s.replace("--head-grad:linear-gradient(95deg,#0B9C80 0%,#6455D6 100%);","--head-grad:linear-gradient(95deg,#0A9A7E 0%,#3F8FD6 50%,#6A55E0 100%);")
for x in ('site.css','site.js','teams.html','families.html'):
    s=s.replace('href="'+x,'href="'+prefix+x).replace('src="'+x,'src="'+prefix+x)
open(dst,'w').write(s)
