import { parseGIF, decompressFrames } from 'gifuct-js';

// Composites every frame of a gif in order and returns a canvas holding
// just the final, fully-composited frame. Used so we know what the
// animation looks like at its end without needing frame-by-frame playback
// control over it while it's loading.
export async function decodeFinalFrame(url) {
	const buffer = await fetch(url).then((res) => res.arrayBuffer());
	const gif = parseGIF(buffer);
	const frames = decompressFrames(gif, true);

	const composite = document.createElement('canvas');
	composite.width = gif.lsd.width;
	composite.height = gif.lsd.height;
	const compositeCtx = composite.getContext('2d');
	const patchCanvas = document.createElement('canvas');
	const patchCtx = patchCanvas.getContext('2d');

	for (let i = 0; i < frames.length; i++) {
		const frame = frames[i];
		patchCanvas.width = frame.dims.width;
		patchCanvas.height = frame.dims.height;
		const imageData = patchCtx.createImageData(frame.dims.width, frame.dims.height);
		imageData.data.set(frame.patch);
		patchCtx.putImageData(imageData, 0, 0);
		compositeCtx.drawImage(patchCanvas, frame.dims.left, frame.dims.top);

		if (frame.disposalType === 2) {
			compositeCtx.clearRect(frame.dims.left, frame.dims.top, frame.dims.width, frame.dims.height);
		}

		// Compositing ~250 frames back-to-back would block the main thread
		// for a few hundred ms in one go. Yielding periodically keeps that
		// off the critical path - notably, it keeps gsap's ticker clock
		// ticking normally, which matters because lagSmoothing is disabled
		// for Lenis (see gsap.ticker.lagSmoothing(0) in main.js): a single
		// long synchronous block right before creating a tween makes gsap's
		// next tick see a huge elapsed delta and jump that tween forward by
		// most of its duration on its very first frame.
		if (i % 20 === 19) {
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}
	}

	return composite;
}

// Swaps a live, freely-autoplaying <img> gif for a same-sized <canvas> in
// place, so playback can be stopped/taken over at an arbitrary moment
// without a visible jump - the canvas starts out blank, so callers should
// paint a frozen frame into it themselves right after this.
export function replaceImgWithCanvas(imgEl, width, height) {
	const canvas = document.createElement('canvas');
	canvas.id = imgEl.id;
	canvas.className = imgEl.className;
	canvas.width = width;
	canvas.height = height;
	imgEl.replaceWith(canvas);
	return canvas;
}
