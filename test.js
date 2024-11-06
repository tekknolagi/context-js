import pkg from './out/context_js.js';
const fidget = pkg.__wasm;
const ctx = fidget.new_context();
console.log(ctx);
