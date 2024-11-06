import sys
filename = sys.argv[1]
print("""import pkg from './out/context_js.js';
const fidget = pkg.__wasm;
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
}
const ctx = new Context();""")
binary = ["add", "sub", "mul", "max", "min"]
unary = ["neg", "square", "sqrt"]
for line in open(filename, "r"):
    if line.startswith("#"):
        continue
    name, op, *args = line.split()
    match op:
        case "const":
            print(f"const {name} = ctx.constant({args[0]});")
        case "var-x":
            print(f"const {name} = ctx.x();")
        case "var-y":
            print(f"const {name} = ctx.y();")
        case "var-z":
            print(f"const {name} = ctx.z();")
        case _ if op in binary:
            print(f"const {name} = ctx.{op}({args[0]}, {args[1]});")
        case _ if op in unary:
            print(f"const {name} = ctx.{op}({args[0]});")
        case _:
            raise ValueError(f"Unknown opcode: {op}")
