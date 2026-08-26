const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await page.goto('http://localhost:5173/MyWebsite/', { waitUntil: 'load', timeout: 60000 });
	await page.waitForTimeout(4000);

	async function scrollTo(y) {
		for (let i = 0; i < 100; i++) {
			const cur = await page.evaluate(() => window.scrollY);
			if (cur >= y - 3) break;
			await page.mouse.wheel(0, 100);
			await page.waitForTimeout(60);
		}
		await page.waitForTimeout(600);
		return page.evaluate(() => window.scrollY);
	}

	const targets = [7900, 8100, 8300, 8500, 8700, 8900];
	for (const y of targets) {
		const actual = await scrollTo(y);
		const up = await page.evaluate(() => window.__debug.landingScene.camera.up.toArray());
		console.log('target', y, 'actual', actual, 'up', JSON.stringify(up.map(n => Number(n.toFixed(3)))));
		await page.screenshot({ path: __dirname + `/__s6-y${y}.png` });
	}
	await browser.close();
})();
