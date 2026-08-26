const { chromium } = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	await page.goto('http://localhost:5173/MyWebsite/', { waitUntil: 'load', timeout: 60000 });
	await page.waitForTimeout(4000);

	const result = await page.evaluate(() => {
		const tl = window.__debug.landingSceneTimeline;
		const total = tl.totalDuration();
		const c = window.__debug.landingScene.camera;
		const samples = [];
		for (let f = 0; f <= 1.0001; f += 0.02) {
			tl.progress(Math.min(f, 1));
			samples.push({
				f: Number(f.toFixed(3)),
				time: Number((f * total).toFixed(3)),
				pos: c.position.toArray().map((n) => Number(n.toFixed(1))),
				up: c.up.toArray().map((n) => Number(n.toFixed(4))),
			});
		}
		return { total, samples };
	});

	console.log('total duration:', result.total);
	// Only print rows where the camera actually moved from the previous row.
	let prev = null;
	for (const s of result.samples) {
		const moved = prev && (Math.abs(s.pos[0]-prev.pos[0])+Math.abs(s.pos[1]-prev.pos[1])+Math.abs(s.pos[2]-prev.pos[2]) > 0.5);
		if (!prev || moved) console.log(JSON.stringify(s));
		prev = s;
	}
	await browser.close();
})();
