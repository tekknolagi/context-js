all: out/context_js.js test.js

target/wasm32-unknown-unknown/release/context_js.wasm: src/lib.rs
	cargo build --target wasm32-unknown-unknown --release

out/context_js.js: target/wasm32-unknown-unknown/release/context_js.wasm
	wasm-bindgen --no-typescript --target nodejs target/wasm32-unknown-unknown/release/context_js.wasm --out-dir out

test.js: compiler.py prospero.vm
	python3 compiler.py prospero.vm > test.js

clean:
	cargo clean
	rm -rf out

.PHONY: clean
