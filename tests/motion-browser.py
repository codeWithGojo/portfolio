from playwright.sync_api import sync_playwright, expect
from pathlib import Path
import json,os
base=os.environ.get('BASE_URL','http://127.0.0.1:4175');out=Path('work-shots/overhaul');checks=[]
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome');page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='no-preference',color_scheme='light');errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(base);page.wait_for_timeout(500);page.screenshot(path=str(out/'intro-desktop.png'));page.wait_for_timeout(3500);assert page.locator('.wm-identity').count()==0;checks.append('Circular intro completes and leaves content interactive')
 page.goto(base+'/hobbies');g=page.locator('.personal-gallery');g.scroll_into_view_if_needed();page.mouse.move(0,0);page.wait_for_timeout(5500);assert g.locator('.is-active').get_attribute('aria-label')=='2 of 2';checks.append('Visible gallery advances after five seconds')
 page.get_by_role('button',name='Pause slideshow').click();active=g.locator('.is-active').get_attribute('aria-label');page.wait_for_timeout(5200);assert active==g.locator('.is-active').get_attribute('aria-label');checks.append('Pause stops automatic gallery advance')
 page.get_by_role('button',name='Previous photograph').click();expect(g.locator('.is-active')).to_have_attribute('aria-label','1 of 2');page.wait_for_timeout(650);g.screenshot(path=str(out/'gallery-light.png'))
 page.get_by_role('button',name='Discover a little Arsenal surprise').click();expect(page.locator('dialog')).to_be_visible();page.keyboard.press('Escape');expect(page.locator('dialog')).not_to_be_visible();checks.append('Starboy dialog opens and Escape closes it')
 page.locator('#football').scroll_into_view_if_needed();page.wait_for_timeout(500);page.locator('#football').screenshot(path=str(out/'football-desktop-light.png'))
 page.set_viewport_size({'width':390,'height':844});page.locator('#football').scroll_into_view_if_needed();page.wait_for_timeout(500);page.screenshot(path=str(out/'football-mobile-light.png'))
 page.emulate_media(reduced_motion='reduce');page.locator('.personal-gallery').scroll_into_view_if_needed();assert page.get_by_role('button',name='Play slideshow').is_disabled();checks.append('Reduced motion disables automatic slideshow')
 page.goto(base+'/about');page.locator('#skills').scroll_into_view_if_needed();page.screenshot(path=str(out/'skills-mobile-light.png'))
 assert not errors,errors;b.close()
 (out/'motion-verification.json').write_text(json.dumps(checks,indent=2));print(json.dumps(checks))
