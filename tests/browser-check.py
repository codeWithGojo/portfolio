from playwright.sync_api import sync_playwright
from pathlib import Path
import json
out=Path('work-shots');out.mkdir(exist_ok=True)
report={'pages':[],'errors':[],'interactions':[]}
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome')
 ctx=browser.new_context(viewport={'width':1440,'height':900},color_scheme='dark')
 page=ctx.new_page();page.on('pageerror',lambda e:report['errors'].append(str(e)))
 for width in [1440,390,360]:
  page.set_viewport_size({'width':width,'height':900 if width==1440 else 844})
  for route in ['/','/about','/work','/hobbies','/pricing','/contact','/work/afri-index','/work/wedding']:
   page.goto('http://127.0.0.1:4173'+route);page.wait_for_timeout(750)
   bad=page.evaluate('''() => [...document.querySelectorAll('main *')].filter(e=>{let r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&r.right>innerWidth+2&&s.position!=='fixed'&&s.position!=='absolute'}).map(e=>e.className).slice(0,8)''')
   report['pages'].append({'route':route,'width':width,'overflow':bad,'h1':page.locator('h1').count()})
   if width in [1440,390] and route in ['/','/hobbies','/work','/contact']:
    page.evaluate("async () => { for (const img of document.images) { img.loading='eager'; } await Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))); }")
    page.screenshot(path=str(out/f"{route.strip('/') or 'home'}-{width}.png"),full_page=True)
 page.set_viewport_size({'width':390,'height':844});page.goto('http://127.0.0.1:4173/')
 page.get_by_role('button',name='Menu',exact=True).click();assert page.get_by_role('navigation',name='Main navigation').is_visible()
 page.keyboard.press('Escape');assert page.get_by_role('button',name='Menu',exact=True).get_attribute('aria-expanded')=='false'
 report['interactions'].append('Mobile menu opens, Escape closes')
 page.get_by_role('button',name='Switch to light theme').click();page.reload();assert page.locator('html').get_attribute('data-theme')=='light'
 report['interactions'].append('Theme persists across reload')
 page.goto('http://127.0.0.1:4173/work');page.get_by_role('button',name='SaaS',exact=True).click();page.wait_for_timeout(1000)
 assert page.locator('.wm-dust-card').count()==1
 for name in ['All Projects','SaaS','Regular Projects','All Projects']:
  page.get_by_role('button',name=name,exact=True).click();page.wait_for_timeout(70)
 page.wait_for_timeout(1200);assert page.locator('.wm-dust-card').count()==11
 report['interactions'].append('SaaS filter and rapid changes restore all 11 personal projects')
 page.get_by_role('searchbox').fill('no-such-project');page.wait_for_timeout(1000);assert page.locator('.wm-dust-card').count()==0
 report['interactions'].append('Search empty state works')
 page.goto('http://127.0.0.1:4173/hobbies');page.get_by_role('button',name='Discover a little Arsenal surprise').click();assert page.locator('dialog').is_visible();page.keyboard.press('Escape');page.wait_for_timeout(200);assert not page.locator('dialog').is_visible()
 report['interactions'].append('Starboy opens and Escape dismisses')
 page.locator('.life-chapter summary').first.click();assert page.locator('.life-chapter').first.get_attribute('open') is not None
 report['interactions'].append('Timeline chapter expands')
 page.goto('http://127.0.0.1:4173/contact?service=landing-page');assert page.locator('[name=service]').input_value()=='landing-page'
 page.get_by_label('Your name',exact=True).fill('Test Visitor');page.get_by_label('Email address',exact=True).fill('test@example.com');page.get_by_label('Your project',exact=True).fill('A website for a local business with services and contact information.');page.locator('[name=budget]').select_option(label='Let’s discuss');page.locator('[name=timeframe]').fill('Flexible');page.get_by_role('button',name='Prepare my enquiry').click();assert page.get_by_text('Nothing has been sent yet.',exact=False).is_visible();assert 'wa.me/2349127971199?text=' in page.get_by_role('link',name='Continue in WhatsApp').get_attribute('href')
 report['interactions'].append('Service prefill, validation and honest WhatsApp handoff work')
 ctx.close()
 reduced=browser.new_context(viewport={'width':390,'height':844},reduced_motion='reduce',color_scheme='dark');r=reduced.new_page();r.goto('http://127.0.0.1:4173/');assert r.locator('.wm-ninja').count()==0
 r.goto('http://127.0.0.1:4173/work');r.get_by_role('button',name='SaaS',exact=True).click();r.wait_for_timeout(1000);assert r.locator('.wm-dust-card').count()==1
 report['interactions'].append('Reduced motion skips intro and filters immediately')
 browser.close()
Path('work-shots/verification.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
