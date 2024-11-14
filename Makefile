all: out/small.js out/prospero.js out/quarter.js

target/wasm32-unknown-unknown/release/context_js.wasm: src/lib.rs
	cargo build --target wasm32-unknown-unknown --release

out/context_js.js: target/wasm32-unknown-unknown/release/context_js.wasm
	wasm-bindgen --target web target/wasm32-unknown-unknown/release/context_js.wasm --out-dir out

out/%.js: %.vm compiler.py out/context_js.js
	python3 compiler.py $< > $@

clean:
	cargo clean
	rm -rf out
	rm -f test.js

.PHONY: clean
