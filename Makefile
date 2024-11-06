all: out/context_js.js

target/wasm32-unknown-unknown/release/context_js.wasm: src/lib.rs
	cargo build --target wasm32-unknown-unknown --release

out/context_js.js: target/wasm32-unknown-unknown/release/context_js.wasm
	wasm-bindgen --no-typescript --target nodejs target/wasm32-unknown-unknown/release/context_js.wasm --out-dir out

clean:
	cargo clean
	rm -rf out

.PHONY: clean
