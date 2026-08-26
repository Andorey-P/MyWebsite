const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	const errors = [];
	page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
	page.on('pageerror', (err) => errors.push('pageerror: ' + err.message));
	await page.goto('http://localhost:5173/MyWebsite/', { waitUntil: 'load', timeout: 60000 });
	await page.waitForTimeout(4000);

	async function scrollTo(y) {
		for (let i = 0; i < 80; i++) {
			const cur = await page.evaluate(() => window.scrollY);
			if (cur >= y - 5) break;
			await page.mouse.wheel(0, 150);
			await page.waitForTimeout(50);
		}
		await page.waitForTimeout(400);
		return page.evaluate(() => window.scrollY);
	}

	// Just before the reform's own drop-in begins.
	const before = await scrollTo(7600);
	const camBefore = await page.evaluate(() => {
		const c = window.__debug.landingScene.camera;
		return { pos: c.position.toArray(), up: c.up.toArray() };
	});

	// Well after the reform (and its orbit) should have completed.
	const after = await scrollTo(8300);
	const camAfter = await page.evaluate(() => {
		const c = window.__debug.landingScene.camera;
		return { pos: c.position.toArray(), up: c.up.toArray() };
	});

	console.log('scrollY before/after:', before, after);
	console.log('camera before:', JSON.stringify(camBefore));
	console.log('camera after: ', JSON.stringify(camAfter));

	console.log('ERRORS', JSON.stringify(errors, null, 2));
	await browser.close();
})();
