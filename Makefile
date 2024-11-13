all: small.js prospero.js

target/wasm32-unknown-unknown/release/context_js.wasm: src/lib.rs
	cargo build --target wasm32-unknown-unknown --release

out/context_js.js: target/wasm32-unknown-unknown/release/context_js.wasm
	wasm-bindgen --target web target/wasm32-unknown-unknown/release/context_js.wasm --out-dir out

prospero.js: compiler.py prospero.vm out/context_js.js
	python3 compiler.py prospero.vm > $@

small.js: compiler.py small.vm out/context_js.js
	python3 compiler.py small.vm > $@

clean:
	cargo clean
	rm -rf out
	rm -f test.js

.PHONY: clean
