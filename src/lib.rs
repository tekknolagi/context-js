use fidget::context::{Context, Node};
use fidget::var::Var;
use std::ffi::CString;
use std::os::raw::c_char;

pub const VAR_X: &Var = &Var::X;
pub const VAR_Y: &Var = &Var::Y;
pub const VAR_Z: &Var = &Var::Z;

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
    CString::new(result).unwrap().into_raw()
}
