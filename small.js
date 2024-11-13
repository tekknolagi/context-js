import {initSync, Context} from './out/context_js.js';
const module = await WebAssembly.compileStreaming(fetch("out/context_js_bg.wasm"));
initSync(module);
const ctx = new Context();
const _0 = ctx.constant(2.95);
const _1 = ctx.x();
const _2 = ctx.constant(8.13008);
const _3 = ctx.mul(_1, _2);
const _4 = ctx.add(_0, _3);
const size = 256;
const rgbas = ctx.render(_4, size);
const canvas = document.getElementById('canvas');
canvas.width = size;
canvas.height = size;
const ctx2d = canvas.getContext('2d');
ctx2d.putImageData(new ImageData(new Uint8ClampedArray(rgbas), size, size), 0, 0);

