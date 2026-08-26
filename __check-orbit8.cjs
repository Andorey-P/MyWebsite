const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	const barLogs = [];
	const orbitLogs = [];
	page.on('console', (msg) => {
		const t = msg.text();
		if (t.includes('reformBar')) barLogs.push(t);
		if (t.includes('reformOrbit')) orbitLogs.push(t);
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
	console.log('bar log count:', barLogs.length, 'sample:', barLogs.slice(0, 3));
	console.log('orbit log count:', orbitLogs.length, 'sample:', orbitLogs.slice(0, 3));
	await browser.close();
})();
