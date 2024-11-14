/* tslint:disable */
/* eslint-disable */
export class Context {
  free(): void;
  constructor();
  /**
   * @returns {Node}
   */
  x(): Node;
  /**
   * @returns {Node}
   */
  y(): Node;
  /**
   * @returns {Node}
   */
  z(): Node;
  /**
   * @returns {Node}
   */
  variable(): Node;
  /**
   * @param {number} val
   * @returns {Node}
   */
  constant(val: number): Node;
  /**
   * @param {Node} node
   * @param {Var} _var
   * @returns {Node}
   */
  deriv(node: Node, _var: Var): Node;
  /**
   * @param {Node} node
   * @returns {number}
   */
  eval(node: Node): number;
  /**
   * @returns {string}
   */
  dot(): string;
  /**
   * @param {Node} root
   * @param {number} size
   * @returns {Uint8Array}
   */
  render(root: Node, size: number): Uint8Array;
  /**
   * @param {Node} a
   * @returns {Node}
   */
  neg(a: Node): Node;
  /**
   * @param {Node} a
   * @returns {Node}
   */
  square(a: Node): Node;
  /**
   * @param {Node} a
   * @returns {Node}
   */
  sqrt(a: Node): Node;
  /**
   * @param {Node} a
   * @param {Node} b
   * @returns {Node}
   */
  add(a: Node, b: Node): Node;
  /**
   * @param {Node} a
   * @param {Node} b
   * @returns {Node}
   */
  sub(a: Node, b: Node): Node;
  /**
   * @param {Node} a
   * @param {Node} b
   * @returns {Node}
   */
  mul(a: Node, b: Node): Node;
  /**
   * @param {Node} a
   * @param {Node} b
   * @returns {Node}
   */
  max(a: Node, b: Node): Node;
  /**
   * @param {Node} a
   * @param {Node} b
   * @returns {Node}
   */
  min(a: Node, b: Node): Node;
}
export class Node {
  free(): void;
}
export class Var {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_context_free: (a: number, b: number) => void;
  readonly __wbg_node_free: (a: number, b: number) => void;
  readonly __wbg_var_free: (a: number, b: number) => void;
  readonly context_new: () => number;
  readonly context_x: (a: number) => number;
  readonly context_y: (a: number) => number;
  readonly context_z: (a: number) => number;
  readonly context_variable: (a: number) => number;
  readonly context_constant: (a: number, b: number) => number;
  readonly context_deriv: (a: number, b: number, c: number) => number;
  readonly context_eval: (a: number, b: number) => number;
  readonly context_dot: (a: number, b: number) => void;
  readonly context_render: (a: number, b: number, c: number, d: number) => void;
  readonly context_neg: (a: number, b: number) => number;
  readonly context_square: (a: number, b: number) => number;
  readonly context_sqrt: (a: number, b: number) => number;
  readonly context_add: (a: number, b: number, c: number) => number;
  readonly context_sub: (a: number, b: number, c: number) => number;
  readonly context_mul: (a: number, b: number, c: number) => number;
  readonly context_max: (a: number, b: number, c: number) => number;
  readonly context_min: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
