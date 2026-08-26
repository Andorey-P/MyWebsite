const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await page.goto('http://localhost:5173/MyWebsite/', { waitUntil: 'load', timeout: 60000 });
	await page.waitForTimeout(4000);

	for (const f of [0.78, 0.9]) {
		await page.evaluate((ff) => {
			window.__debug.landingSceneTimeline.progress(ff);
		}, f);
		await page.waitForTimeout(300);
		await page.screenshot({ path: __dirname + `/__orbit-f${f}.png` });
	}
	await browser.close();
})();
