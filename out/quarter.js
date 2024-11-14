import {initSync, Context} from './context_js.js';
const module = await WebAssembly.compileStreaming(fetch("out/context_js_bg.wasm"));
initSync(module);
const ctx = new Context();
const y = ctx.y();
const x = ctx.x();
const mxy = ctx.max(x, y);
const y2 = ctx.square(y);
const x2 = ctx.square(x);
const r2 = ctx.add(x2, y2);
const f = ctx.constant(0.5);
const circle = ctx.sub(r2, f);
const out = ctx.max(mxy, circle);
const canvas = document.getElementById('canvas');
const size = canvas.width;  // assumed square
const ms_before = performance.now();

const rgbas = ctx.render(out, size);
const ms_after = performance.now();
console.log("Took", ms_after - ms_before, "ms to render");
const ctx2d = canvas.getContext('2d');
ctx2d.putImageData(new ImageData(new Uint8ClampedArray(rgbas), size, size), 0, 0);

