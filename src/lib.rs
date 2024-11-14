use fidget::shape::RenderHints;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Context {
    inner: fidget::context::Context,
}

#[wasm_bindgen]
pub struct Node {
    inner: fidget::context::Node,
}

impl From<fidget::context::Node> for Node {
    fn from(inner: fidget::context::Node) -> Self {
        Self { inner }
    }
}

impl Node {
    pub fn get(&self) -> fidget::context::Node {
        self.inner
    }
}

#[wasm_bindgen]
pub struct Var {
    inner: fidget::var::Var,
}

#[wasm_bindgen]
impl Context {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            inner: fidget::context::Context::new(),
        }
    }

    pub fn x(&mut self) -> Node {
        self.inner.x().into()
    }

    pub fn y(&mut self) -> Node {
        self.inner.y().into()
    }

    pub fn z(&mut self) -> Node {
        self.inner.z().into()
    }

    pub fn var(&mut self) -> Node {
        self.inner.var(fidget::var::Var::new()).into()
    }

    pub fn constant(&mut self, val: f64) -> Node {
        self.inner.constant(val).into()
    }

    pub fn deriv(&mut self, node: &Node, var: Var) -> Node {
        self.inner.deriv(node.inner, var.inner).unwrap().into()
    }

    pub fn eval(&mut self, node: &Node) -> f64 {
        self.inner.eval_xyz(node.inner, 0.0, 0.0, 0.0).unwrap()
    }

    pub fn dot(&mut self) -> String {
        self.inner.dot()
    }

    pub fn render(&mut self, root: &Node, size: usize) -> Vec<u8> {
        let shape_vm = fidget::vm::VmShape::new(&self.inner, root.inner).unwrap();
        let cfg = fidget::render::RenderConfig {
            image_size: size,
            tile_sizes: fidget::vm::VmFunction::tile_sizes_2d().to_vec(),
            ..Default::default()
        };
        let rgbs = fidget::render::render2d::<_, fidget::render::BitRenderMode>(shape_vm, &cfg);
        rgbs.iter()
            .flat_map(|b| {
                let b = *b as u8 * u8::MAX;
                [b, b, b, 255]
            })
            .collect::<Vec<u8>>()
    }

    // Unary

    pub fn neg(&mut self, a: &Node) -> Node {
        self.inner.neg(a.inner).unwrap().into()
    }

    pub fn square(&mut self, a: &Node) -> Node {
        self.inner.square(a.inner).unwrap().into()
    }

    pub fn sqrt(&mut self, a: &Node) -> Node {
        self.inner.sqrt(a.inner).unwrap().into()
    }

    // Binary

    pub fn add(&mut self, a: &Node, b: &Node) -> Node {
        self.inner.add(a.inner, b.inner).unwrap().into()
    }

    pub fn sub(&mut self, a: &Node, b: &Node) -> Node {
        self.inner.sub(a.inner, b.inner).unwrap().into()
    }

    pub fn mul(&mut self, a: &Node, b: &Node) -> Node {
        self.inner.mul(a.inner, b.inner).unwrap().into()
    }

    pub fn max(&mut self, a: &Node, b: &Node) -> Node {
        self.inner.max(a.inner, b.inner).unwrap().into()
    }

    pub fn min(&mut self, a: &Node, b: &Node) -> Node {
        self.inner.min(a.inner, b.inner).unwrap().into()
    }
}
