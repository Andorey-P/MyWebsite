const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	const logs = [];
	page.on('console', (msg) => {
		if (msg.text().includes('reformOrbit')) logs.push(msg.text());
	});
	await page.goto('http://localhost:5173/MyWebsite/', { waitUntil: 'load', timeout: 60000 });
	await page.waitForTimeout(4000);

	async function scrollTo(y) {
		for (let i = 0; i < 100; i++) {
			const cur = await page.evaluate(() => window.scrollY);
			if (cur >= y - 3) break;
			await page.mouse.wheel(0, 60);
			await page.waitForTimeout(60);
		}
		await page.waitForTimeout(800);
		return page.evaluate(() => window.scrollY);
	}

	await scrollTo(9000);
	console.log('total reformOrbit log lines:', logs.length);
	console.log('first 5:', logs.slice(0, 5));
	console.log('last 5:', logs.slice(-5));
	await browser.close();
})();
