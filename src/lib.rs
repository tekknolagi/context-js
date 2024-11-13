use fidget::context::{Context, Node};
use fidget::shape::RenderHints;
use fidget::var::Var;
use std::ffi::CString;
use std::os::raw::c_char;

#[no_mangle]
pub fn new_context() -> Box<Context> {
    Box::new(Context::new())
}

#[no_mangle]
pub fn ctx_x(ctx: &mut Context) -> Node {
    ctx.x()
}

#[no_mangle]
pub fn ctx_y(ctx: &mut Context) -> Node {
    ctx.y()
}

#[no_mangle]
pub fn ctx_constant(ctx: &mut Context, val: f64) -> Node {
    ctx.constant(val)
}

#[no_mangle]
pub fn ctx_add(ctx: &mut Context, a: Node, b: Node) -> Node {
    ctx.add(a, b).unwrap()
}

#[no_mangle]
pub fn ctx_sub(ctx: &mut Context, a: Node, b: Node) -> Node {
    ctx.sub(a, b).unwrap()
}

#[no_mangle]
pub fn ctx_mul(ctx: &mut Context, a: Node, b: Node) -> Node {
    ctx.mul(a, b).unwrap()
}

#[no_mangle]
pub fn ctx_neg(ctx: &mut Context, a: Node) -> Node {
    ctx.neg(a).unwrap()
}

#[no_mangle]
pub fn ctx_max(ctx: &mut Context, a: Node, b: Node) -> Node {
    ctx.max(a, b).unwrap()
}

#[no_mangle]
pub fn ctx_min(ctx: &mut Context, a: Node, b: Node) -> Node {
    ctx.min(a, b).unwrap()
}

#[no_mangle]
pub fn ctx_square(ctx: &mut Context, a: Node) -> Node {
    ctx.square(a).unwrap()
}

#[no_mangle]
pub fn ctx_sqrt(ctx: &mut Context, a: Node) -> Node {
    ctx.sqrt(a).unwrap()
}

#[no_mangle]
pub fn ctx_deriv(ctx: &mut Context, node: Node, var: &Var) -> Node {
    ctx.deriv(node, *var).unwrap()
}

#[no_mangle]
pub fn ctx_to_graphviz(ctx: &mut Context) -> *mut c_char {
    let result = ctx.dot();
    // TODO(max): Add an API to free this later because right now it leaks
    CString::new(result).unwrap().into_raw()
}

pub struct Bytes {
    pub data: *mut u8,
    pub size: usize,
}

#[no_mangle]
pub fn ctx_render(ctx: &mut Context, root: Node) -> *mut u8 {
    let shape_vm = fidget::vm::VmShape::new(&ctx, root).unwrap();
    let size = 1024;
    let cfg = fidget::render::RenderConfig {
        image_size: size,
        tile_sizes: fidget::vm::VmFunction::tile_sizes_2d().to_vec(),
        ..Default::default()
    };
    // let tape = shape_vm.clone();
    let rgbs = fidget::render::render2d::<
        _,
        fidget::render::SdfPixelRenderMode,
    >(shape_vm, &cfg);
    let mut rgbas = rgbs.iter().flat_map(|rgb| [rgb[0], rgb[1], rgb[2], 255]).collect::<Vec<u8>>();
    let data = rgbas.as_mut_ptr();
    let size = rgbas.len();
    // TODO(max): Add an API to free this later because right now it leaks
    std::mem::forget(rgbas);
    // Bytes { data, size }
    data
}
