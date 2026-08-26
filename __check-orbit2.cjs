const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
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

	await scrollTo(7793);
	const info = await page.evaluate(() => {
		const c = window.__debug.landingScene.camera;
		c.updateMatrixWorld();
		const forward = new (Object.getPrototypeOf(c.position).constructor)();
		c.getWorldDirection(forward);
		return {
			pos: c.position.toArray(),
			up: c.up.toArray(),
			forward: forward.toArray(),
			fov: c.fov,
		};
	});
	console.log(JSON.stringify(info, null, 2));
	await browser.close();
})();
