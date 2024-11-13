import pkg from './out/context_js.js';
const fidget = pkg.__wasm;
function c_string(buffer, offset) {
  const m = new DataView(buffer);
  let result = "";
  for (let i = 0; m.getUint8(offset + i) !== 0; i++) {
    result += String.fromCharCode(m.getUint8(offset + i));
  }
  return result;
}
class Context {
  constructor() {
    this.handle = fidget.new_context();
  }
  constant(a) { return fidget.ctx_constant(this.handle, a); }
  x() { return fidget.ctx_x(this.handle); }
  y() { return fidget.ctx_y(this.handle); }
  z() { return fidget.ctx_z(this.handle); }
  add(a, b) { return fidget.ctx_add(this.handle, a, b); }
  sub(a, b) { return fidget.ctx_sub(this.handle, a, b); }
  mul(a, b) { return fidget.ctx_mul(this.handle, a, b); }
  max(a, b) { return fidget.ctx_max(this.handle, a, b); }
  min(a, b) { return fidget.ctx_min(this.handle, a, b); }
  neg(a) { return fidget.ctx_neg(this.handle, a); }
  square(a) { return fidget.ctx_square(this.handle, a); }
  sqrt(a) { return fidget.ctx_sqrt(this.handle, a); }
  deriv(n, v) { return fidget.ctx_deriv(this.handle, n, v); }
  eval(node) { return fidget.ctx_eval(this.handle, node); }
  render(root) {
    if (root === null || root === undefined) {
      throw new Error("No nodes to render");
    }
    // TODO(max): Fix bindings; need to pass in array or something to actually
    // return Bytes
    return fidget.ctx_render(this.handle, root);
  }
  to_graphviz() {
      const offset = fidget.ctx_to_graphviz(this.handle);
      return c_string(fidget.memory.buffer, offset);
  }
}
const ctx = new Context();
const _0 = ctx.constant(2.95);
const _1 = ctx.x();
const _2 = ctx.constant(8.13008);
const _3 = ctx.mul(_1, _2);
const _4 = ctx.add(_0, _3);
console.log(ctx.render(_4));
