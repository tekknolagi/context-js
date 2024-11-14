let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const ContextFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_context_free(ptr >>> 0, 1));

export class Context {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ContextFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_context_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.context_new();
        this.__wbg_ptr = ret >>> 0;
        ContextFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Node}
     */
    x() {
        const ret = wasm.context_x(this.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @returns {Node}
     */
    y() {
        const ret = wasm.context_y(this.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @returns {Node}
     */
    z() {
        const ret = wasm.context_z(this.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {number} val
     * @returns {Node}
     */
    constant(val) {
        const ret = wasm.context_constant(this.__wbg_ptr, val);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} node
     * @param {Var} _var
     * @returns {Node}
     */
    deriv(node, _var) {
        _assertClass(node, Node);
        _assertClass(_var, Var);
        var ptr0 = _var.__destroy_into_raw();
        const ret = wasm.context_deriv(this.__wbg_ptr, node.__wbg_ptr, ptr0);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} node
     * @returns {number}
     */
    eval(node) {
        _assertClass(node, Node);
        const ret = wasm.context_eval(this.__wbg_ptr, node.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {string}
     */
    dot() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.context_dot(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {Node} root
     * @param {number} size
     * @returns {Uint8Array}
     */
    render(root, size) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(root, Node);
            wasm.context_render(retptr, this.__wbg_ptr, root.__wbg_ptr, size);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {Node} a
     * @returns {Node}
     */
    neg(a) {
        _assertClass(a, Node);
        const ret = wasm.context_neg(this.__wbg_ptr, a.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @returns {Node}
     */
    square(a) {
        _assertClass(a, Node);
        const ret = wasm.context_square(this.__wbg_ptr, a.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @returns {Node}
     */
    sqrt(a) {
        _assertClass(a, Node);
        const ret = wasm.context_sqrt(this.__wbg_ptr, a.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @param {Node} b
     * @returns {Node}
     */
    add(a, b) {
        _assertClass(a, Node);
        _assertClass(b, Node);
        const ret = wasm.context_add(this.__wbg_ptr, a.__wbg_ptr, b.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @param {Node} b
     * @returns {Node}
     */
    sub(a, b) {
        _assertClass(a, Node);
        _assertClass(b, Node);
        const ret = wasm.context_sub(this.__wbg_ptr, a.__wbg_ptr, b.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @param {Node} b
     * @returns {Node}
     */
    mul(a, b) {
        _assertClass(a, Node);
        _assertClass(b, Node);
        const ret = wasm.context_mul(this.__wbg_ptr, a.__wbg_ptr, b.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @param {Node} b
     * @returns {Node}
     */
    max(a, b) {
        _assertClass(a, Node);
        _assertClass(b, Node);
        const ret = wasm.context_max(this.__wbg_ptr, a.__wbg_ptr, b.__wbg_ptr);
        return Node.__wrap(ret);
    }
    /**
     * @param {Node} a
     * @param {Node} b
     * @returns {Node}
     */
    min(a, b) {
        _assertClass(a, Node);
        _assertClass(b, Node);
        const ret = wasm.context_min(this.__wbg_ptr, a.__wbg_ptr, b.__wbg_ptr);
        return Node.__wrap(ret);
    }
}

const NodeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_node_free(ptr >>> 0, 1));

export class Node {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Node.prototype);
        obj.__wbg_ptr = ptr;
        NodeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NodeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_node_free(ptr, 0);
    }
}

const VarFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_var_free(ptr >>> 0, 1));

export class Var {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VarFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_var_free(ptr, 0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;



    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('context_js_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
