import {initSync, Context} from './context_js.js';
const module = await WebAssembly.compileStreaming(fetch("out/context_js_bg.wasm"));
initSync(module);
const ctx = new Context();
const _0 = ctx.variable();
const _1 = ctx.variable();
const _2 = ctx.add(_0, _1);
const canvas = document.getElementById('canvas');
const size = canvas.width;  // assumed square
const ms_before = performance.now();

const rgbas = ctx.render(_2, size);
const ms_after = performance.now();
console.log("Took", ms_after - ms_before, "ms to render");
const ctx2d = canvas.getContext('2d');
ctx2d.putImageData(new ImageData(new Uint8ClampedArray(rgbas), size, size), 0, 0);

