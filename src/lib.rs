use fidget::context::Context;

#[no_mangle]
pub fn new_context() -> Box<Context> {
    Box::new(Context::new())
}
