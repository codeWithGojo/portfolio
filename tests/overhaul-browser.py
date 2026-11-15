from playwright.sync_api import sync_playwright
from pathlib import Path
import json, os
base=os.environ.get('BASE_URL','http://127.0.0.1:4175')
out=Path('work-shots/overhaul');out.mkdir(parents=True,exist_ok=True)
report={'pages':[],'errors':[],'checks':[]}
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome')
 ctx=browser.new_context(viewport={'width':1440,'height':900},color_scheme='dark',reduced_motion='reduce')
 page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
 page.on('console',lambda m:report['errors'].append(m.text) if m.type=='error' and ('hydration' in m.text.lower() or 'Minified React' in m.text) else None)
 for width in [320,360,390,430,768,1024,1440]:
  page.set_viewport_size({'width':width,'height':900 if width>760 else 844})
  for route in ['/','/about','/work','/hobbies','/pricing','/contact','/work/afri-index','/work/wedding']:
   page.goto(base+route);page.wait_for_timeout(300)
   overflow=page.evaluate('''() => [...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.right>innerWidth+2&&s.position!=='fixed'&&s.position!=='absolute'}).map(e=>e.className).slice(0,6)''')
   report['pages'].append({'route':route,'width':width,'overflow':overflow,'h1':page.locator('h1').count()})
   if width in [390,1440] and route in ['/','/about','/hobbies','/contact']:
    page.screenshot(path=str(out/f"{route.strip('/') or 'home'}-{width}.png"),full_page=True)
 page.set_viewport_size({'width':1440,'height':900});page.goto(base+'/');page.wait_for_timeout(500)
 page.evaluate('window.__navigationProof=42')
 page.get_by_role('navigation',name='Main navigation',exact=True).get_by_role('link',name='About',exact=True).click();page.wait_for_url('**/about');assert page.evaluate('window.__navigationProof')==42;assert 'About Favour' in page.title()
 page.go_back();assert page.locator('h1').inner_text()=='Favour\nImegu.';assert page.evaluate('window.__navigationProof')==42
 page.go_forward();assert 'Still curious' in page.locator('h1').inner_text()
 report['checks'].append('Client navigation and back/forward preserve document; route title updates')
 page.locator('#skills').scroll_into_view_if_needed();page.get_by_role('button',name='TypeScript',exact=True).first.click();assert page.get_by_text('See TypeScript in the work').is_visible()
 report['checks'].append('Capabilities technology control reveals actual project links')
 page.set_viewport_size({'width':390,'height':844});page.get_by_role('button',name='Menu',exact=True).click();assert page.get_by_role('navigation',name='Main navigation',exact=True).is_visible();page.get_by_role('button',name='Close navigation',exact=True).click(position={'x':10,'y':400});assert page.get_by_role('button',name='Menu',exact=True).get_attribute('aria-expanded')=='false'
 page.get_by_role('button',name='Menu',exact=True).click();page.keyboard.press('Escape');assert page.get_by_role('button',name='Menu',exact=True).evaluate('(e)=>e===document.activeElement')
 report['checks'].append('Mobile backdrop and Escape dismiss menu with focus restored')
 page.get_by_role('button',name='Switch to light theme').click();assert page.locator('html').get_attribute('data-theme')=='light';assert page.locator('meta[name=theme-color]').first.get_attribute('content')=='#faf9f6';page.reload();assert page.locator('html').get_attribute('data-theme')=='light'
 report['checks'].append('Theme persists and toolbar metadata updates')
 page.goto(base+'/hobbies');page.get_by_role('button',name='Why this character').first.click();assert page.get_by_text("I've always liked naturally gifted characters, and Gojo is my favourite across anime.",exact=False).is_visible()
 report['checks'].append('Character explanation expands')
 page.goto(base+'/contact?service=landing-page');page.wait_for_timeout(300);assert page.locator('[name=projectType]').input_value()=='Landing page'
 page.route('**/api/contact',lambda route:route.fulfill(status=503,json={'error':'The contact form is unavailable right now. Please use email or WhatsApp.'}))
 page.locator('[name=name]').fill('Test visitor');page.locator('[name=email]').fill('test@example.com');page.locator('[name=message]').fill('I would like to discuss a website project.');page.get_by_role('button',name='Send message',exact=False).click();page.get_by_role('alert').wait_for(state='visible');assert 'unavailable' in page.get_by_role('alert').inner_text()
 report['checks'].append('Contact service prefill and honest unavailable state')
 # Mock accepted response only: no real email is sent.
 page.unroute('**/api/contact');page.route('**/api/contact',lambda route:route.fulfill(status=200,json={'ok':True}));page.get_by_role('button',name='Send message',exact=False).click();page.wait_for_timeout(250);assert 'accepted' in page.locator('[role=status]').inner_text().lower() or 'sent' in page.locator('[role=status]').inner_text().lower()
 report['checks'].append('Contact accepted state exercised with mock response')
 nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844});n=nojs.new_page()
 for route in ['/','/about','/work','/hobbies','/pricing','/contact','/work/afri-index','/work/wedding']:
  n.goto(base+route);assert n.locator('h1').is_visible();assert len(n.locator('main').inner_text())>150
 report['checks'].append('Eight representative routes have readable content with JavaScript disabled')
 assert not report['errors'], report['errors']
 assert all(not item['overflow'] and item['h1']==1 for item in report['pages']), report['pages']
 browser.close()
(out/'verification.json').write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))

