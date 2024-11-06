all: out/context_js.js small.js

target/wasm32-unknown-unknown/release/context_js.wasm: src/lib.rs
	cargo build --target wasm32-unknown-unknown --release

out/context_js.js: target/wasm32-unknown-unknown/release/context_js.wasm
	wasm-bindgen --no-typescript --target nodejs target/wasm32-unknown-unknown/release/context_js.wasm --out-dir out

prospero.js: compiler.py prospero.vm
	python3 compiler.py prospero.vm > prospero.js

small.js: compiler.py small.vm
	python3 compiler.py small.vm > small.js

clean:
	cargo clean
	rm -rf out
	rm -f test.js

.PHONY: clean
