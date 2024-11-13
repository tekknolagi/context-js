import sys
filename = sys.argv[1]
print("""import {initSync, Context} from './context_js.js';
const module = await WebAssembly.compileStreaming(fetch("out/context_js_bg.wasm"));
initSync(module);
const ctx = new Context();""")
binary = ["add", "sub", "mul", "max", "min"]
unary = ["neg", "square", "sqrt"]
last = None
for line in open(filename, "r"):
    if line.startswith("#"):
        continue
    name, op, *args = line.split()
    last = name
    match op:
        case "const":
            print(f"const {name} = ctx.constant({args[0]});")
        case "var-x":
            print(f"const {name} = ctx.x();")
        case "var-y":
            print(f"const {name} = ctx.y();")
        case "var-z":
            print(f"const {name} = ctx.z();")
        case "deriv":
            varname = f"var_{args[1]}".upper()
            print(f"const {name} = ctx.deriv({args[0]}, fidget.{varname});")
        case _ if op in binary:
            print(f"const {name} = ctx.{op}({args[0]}, {args[1]});")
        case _ if op in unary:
            print(f"const {name} = ctx.{op}({args[0]});")
        case _:
            raise ValueError(f"Unknown opcode: {op}")
    # print(f"console.log(\"{name}\", ctx.eval({name}));")
assert last is not None, "Empty file"
print("""\
const canvas = document.getElementById('canvas');
const size = canvas.width;  // assumed square
""")
print(f"const rgbas = ctx.render({last}, size);")
print("""\
const ctx2d = canvas.getContext('2d');
ctx2d.putImageData(new ImageData(new Uint8ClampedArray(rgbas), size, size), 0, 0);
""")
