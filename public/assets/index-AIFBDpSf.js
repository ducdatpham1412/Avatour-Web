var n2 = Object.defineProperty;
var a2 = (t, e, n) =>
  e in t ? n2(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : (t[e] = n);
var t0 = (t, e, n) => (a2(t, typeof e != 'symbol' ? e + '' : e, n), n);
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) a(s);
  new MutationObserver(s => {
    for (const o of s)
      if (o.type === 'childList')
        for (const r of o.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && a(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : s.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function a(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function P() {}
const o0 = t => t;
function F1(t, e) {
  for (const n in e) t[n] = e[n];
  return t;
}
function S0(t) {
  return t();
}
function C0() {
  return Object.create(null);
}
function u1(t) {
  t.forEach(S0);
}
function o1(t) {
  return typeof t == 'function';
}
function G(t, e) {
  return t != t ? e == e : t !== e || (t && typeof t == 'object') || typeof t == 'function';
}
let V1;
function w1(t, e) {
  return t === e ? !0 : (V1 || (V1 = document.createElement('a')), (V1.href = e), t === V1.href);
}
function s2(t) {
  return Object.keys(t).length === 0;
}
function c0(t, e, n, a) {
  if (t) {
    const s = N0(t, e, n, a);
    return t[0](s);
  }
}
function N0(t, e, n, a) {
  return t[1] && a ? F1(n.ctx.slice(), t[1](a(e))) : n.ctx;
}
function u0(t, e, n, a) {
  if (t[2] && a) {
    const s = t[2](a(n));
    if (e.dirty === void 0) return s;
    if (typeof s == 'object') {
      const o = [],
        r = Math.max(e.dirty.length, s.length);
      for (let c = 0; c < r; c += 1) o[c] = e.dirty[c] | s[c];
      return o;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function f0(t, e, n, a, s, o) {
  if (s) {
    const r = N0(e, n, a, o);
    t.p(r, s);
  }
}
function d0(t) {
  if (t.ctx.length > 32) {
    const e = [],
      n = t.ctx.length / 32;
    for (let a = 0; a < n; a++) e[a] = -1;
    return e;
  }
  return -1;
}
function V0(t) {
  const e = {};
  for (const n in t) n[0] !== '$' && (e[n] = t[n]);
  return e;
}
function K1(t, e) {
  const n = {};
  e = new Set(e);
  for (const a in t) !e.has(a) && a[0] !== '$' && (n[a] = t[a]);
  return n;
}
function i2(t) {
  const e = {};
  for (const n in t) e[n] = !0;
  return e;
}
function c1(t) {
  return t && o1(t.destroy) ? t.destroy : P;
}
const T0 = typeof window < 'u';
let I0 = T0 ? () => window.performance.now() : () => Date.now(),
  p0 = T0 ? t => requestAnimationFrame(t) : P;
const M1 = new Set();
function R0(t) {
  M1.forEach(e => {
    e.c(t) || (M1.delete(e), e.f());
  }),
    M1.size !== 0 && p0(R0);
}
function G0(t) {
  let e;
  return (
    M1.size === 0 && p0(R0),
    {
      promise: new Promise(n => {
        M1.add((e = { c: t, f: n }));
      }),
      abort() {
        M1.delete(e);
      },
    }
  );
}
function i(t, e) {
  t.appendChild(e);
}
function K0(t) {
  if (!t) return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && e.host ? e : t.ownerDocument;
}
function r2(t) {
  const e = h('style');
  return (e.textContent = '/* empty */'), o2(K0(t), e), e.sheet;
}
function o2(t, e) {
  return i(t.head || t, e), e.sheet;
}
function O(t, e, n) {
  t.insertBefore(e, n || null);
}
function H(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function Y1(t, e) {
  for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function h(t) {
  return document.createElement(t);
}
function _(t) {
  return document.createElementNS('http://www.w3.org/2000/svg', t);
}
function J(t) {
  return document.createTextNode(t);
}
function L() {
  return J(' ');
}
function Q0() {
  return J('');
}
function v1(t, e, n, a) {
  return t.addEventListener(e, n, a), () => t.removeEventListener(e, n, a);
}
function l(t, e, n) {
  n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function c2(t) {
  return Array.from(t.childNodes);
}
function A1(t, e) {
  (e = '' + e), t.data !== e && (t.data = e);
}
function p1(t, e, n, a) {
  n == null ? t.style.removeProperty(e) : t.style.setProperty(e, n, a ? 'important' : '');
}
function f(t, e, n) {
  t.classList.toggle(e, !!n);
}
function W0(t, e, { bubbles: n = !1, cancelable: a = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: n, cancelable: a });
}
function w0(t, e) {
  return new t(e);
}
const Q1 = new Map();
let W1 = 0;
function u2(t) {
  let e = 5381,
    n = t.length;
  for (; n--; ) e = ((e << 5) - e) ^ t.charCodeAt(n);
  return e >>> 0;
}
function f2(t, e) {
  const n = { stylesheet: r2(e), rules: {} };
  return Q1.set(t, n), n;
}
function X0(t, e, n, a, s, o, r, c = 0) {
  const u = 16.666 / a;
  let d = `{
`;
  for (let x = 0; x <= 1; x += u) {
    const y = e + (n - e) * o(x);
    d +=
      x * 100 +
      `%{${r(y, 1 - y)}}
`;
  }
  const g =
      d +
      `100% {${r(n, 1 - n)}}
}`,
    p = `__svelte_${u2(g)}_${c}`,
    m = K0(t),
    { stylesheet: C, rules: v } = Q1.get(m) || f2(m, t);
  v[p] || ((v[p] = !0), C.insertRule(`@keyframes ${p} ${g}`, C.cssRules.length));
  const b = t.style.animation || '';
  return (t.style.animation = `${b ? `${b}, ` : ''}${p} ${a}ms linear ${s}ms 1 both`), (W1 += 1), p;
}
function a0(t, e) {
  const n = (t.style.animation || '').split(', '),
    a = n.filter(e ? o => o.indexOf(e) < 0 : o => o.indexOf('__svelte') === -1),
    s = n.length - a.length;
  s && ((t.style.animation = a.join(', ')), (W1 -= s), W1 || d2());
}
function d2() {
  p0(() => {
    W1 ||
      (Q1.forEach(t => {
        const { ownerNode: e } = t.stylesheet;
        e && H(e);
      }),
      Q1.clear());
  });
}
let D1;
function B1(t) {
  D1 = t;
}
function J0() {
  if (!D1) throw new Error('Function called outside component initialization');
  return D1;
}
function p2(t) {
  J0().$$.on_mount.push(t);
}
function h2() {
  const t = J0();
  return (e, n, { cancelable: a = !1 } = {}) => {
    const s = t.$$.callbacks[e];
    if (s) {
      const o = W0(e, n, { cancelable: a });
      return (
        s.slice().forEach(r => {
          r.call(t, o);
        }),
        !o.defaultPrevented
      );
    }
    return !0;
  };
}
function l1(t, e) {
  const n = t.$$.callbacks[e.type];
  n && n.slice().forEach(a => a.call(this, e));
}
const k1 = [],
  s0 = [];
let E1 = [];
const x0 = [],
  m2 = Promise.resolve();
let i0 = !1;
function g2() {
  i0 || ((i0 = !0), m2.then(U0));
}
function L1(t) {
  E1.push(t);
}
const l0 = new Set();
let $1 = 0;
function U0() {
  if ($1 !== 0) return;
  const t = D1;
  do {
    try {
      for (; $1 < k1.length; ) {
        const e = k1[$1];
        $1++, B1(e), v2(e.$$);
      }
    } catch (e) {
      throw ((k1.length = 0), ($1 = 0), e);
    }
    for (B1(null), k1.length = 0, $1 = 0; s0.length; ) s0.pop()();
    for (let e = 0; e < E1.length; e += 1) {
      const n = E1[e];
      l0.has(n) || (l0.add(n), n());
    }
    E1.length = 0;
  } while (k1.length);
  for (; x0.length; ) x0.pop()();
  (i0 = !1), l0.clear(), B1(t);
}
function v2(t) {
  if (t.fragment !== null) {
    t.update(), u1(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(L1);
  }
}
function C2(t) {
  const e = [],
    n = [];
  E1.forEach(a => (t.indexOf(a) === -1 ? e.push(a) : n.push(a))), n.forEach(a => a()), (E1 = e);
}
let q1;
function Y0() {
  return (
    q1 ||
      ((q1 = Promise.resolve()),
      q1.then(() => {
        q1 = null;
      })),
    q1
  );
}
function X1(t, e, n) {
  t.dispatchEvent(W0(`${e ? 'intro' : 'outro'}${n}`));
}
const R1 = new Set();
let C1;
function z1() {
  C1 = { r: 0, c: [], p: C1 };
}
function H1() {
  C1.r || u1(C1.c), (C1 = C1.p);
}
function D(t, e) {
  t && t.i && (R1.delete(t), t.i(e));
}
function z(t, e, n, a) {
  if (t && t.o) {
    if (R1.has(t)) return;
    R1.add(t),
      C1.c.push(() => {
        R1.delete(t), a && (n && t.d(1), a());
      }),
      t.o(e);
  } else a && a();
}
const e2 = { duration: 0 };
function w2(t, e, n) {
  const a = { direction: 'in' };
  let s = e(t, n, a),
    o = !1,
    r,
    c,
    u = 0;
  function d() {
    r && a0(t, r);
  }
  function g() {
    const { delay: m = 0, duration: C = 300, easing: v = o0, tick: b = P, css: x } = s || e2;
    x && (r = X0(t, 0, 1, C, m, v, x, u++)), b(0, 1);
    const y = I0() + m,
      $ = y + C;
    c && c.abort(),
      (o = !0),
      L1(() => X1(t, !0, 'start')),
      (c = G0(w => {
        if (o) {
          if (w >= $) return b(1, 0), X1(t, !0, 'end'), d(), (o = !1);
          if (w >= y) {
            const k = v((w - y) / C);
            b(k, 1 - k);
          }
        }
        return o;
      }));
  }
  let p = !1;
  return {
    start() {
      p || ((p = !0), a0(t), o1(s) ? ((s = s(a)), Y0().then(g)) : g());
    },
    invalidate() {
      p = !1;
    },
    end() {
      o && (d(), (o = !1));
    },
  };
}
function x2(t, e, n) {
  const a = { direction: 'out' };
  let s = e(t, n, a),
    o = !0,
    r;
  const c = C1;
  c.r += 1;
  let u;
  function d() {
    const { delay: g = 0, duration: p = 300, easing: m = o0, tick: C = P, css: v } = s || e2;
    v && (r = X0(t, 1, 0, p, g, m, v));
    const b = I0() + g,
      x = b + p;
    L1(() => X1(t, !1, 'start')),
      'inert' in t && ((u = t.inert), (t.inert = !0)),
      G0(y => {
        if (o) {
          if (y >= x) return C(0, 1), X1(t, !1, 'end'), --c.r || u1(c.c), !1;
          if (y >= b) {
            const $ = m((y - b) / p);
            C(1 - $, $);
          }
        }
        return o;
      });
  }
  return (
    o1(s)
      ? Y0().then(() => {
          (s = s(a)), d();
        })
      : d(),
    {
      end(g) {
        g && 'inert' in t && (t.inert = u),
          g && s.tick && s.tick(1, 0),
          o && (r && a0(t, r), (o = !1));
      },
    }
  );
}
function x1(t) {
  return (t == null ? void 0 : t.length) !== void 0 ? t : Array.from(t);
}
function R(t) {
  t && t.c();
}
function T(t, e, n) {
  const { fragment: a, after_update: s } = t.$$;
  a && a.m(e, n),
    L1(() => {
      const o = t.$$.on_mount.map(S0).filter(o1);
      t.$$.on_destroy ? t.$$.on_destroy.push(...o) : u1(o), (t.$$.on_mount = []);
    }),
    s.forEach(L1);
}
function I(t, e) {
  const n = t.$$;
  n.fragment !== null &&
    (C2(n.after_update),
    u1(n.on_destroy),
    n.fragment && n.fragment.d(e),
    (n.on_destroy = n.fragment = null),
    (n.ctx = []));
}
function _2(t, e) {
  t.$$.dirty[0] === -1 && (k1.push(t), g2(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function K(t, e, n, a, s, o, r = null, c = [-1]) {
  const u = D1;
  B1(t);
  const d = (t.$$ = {
    fragment: null,
    ctx: [],
    props: o,
    update: P,
    not_equal: s,
    bound: C0(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (u ? u.$$.context : [])),
    callbacks: C0(),
    dirty: c,
    skip_bound: !1,
    root: e.target || u.$$.root,
  });
  r && r(d.root);
  let g = !1;
  if (
    ((d.ctx = n
      ? n(t, e.props || {}, (p, m, ...C) => {
          const v = C.length ? C[0] : m;
          return (
            d.ctx &&
              s(d.ctx[p], (d.ctx[p] = v)) &&
              (!d.skip_bound && d.bound[p] && d.bound[p](v), g && _2(t, p)),
            m
          );
        })
      : []),
    d.update(),
    (g = !0),
    u1(d.before_update),
    (d.fragment = a ? a(d.ctx) : !1),
    e.target)
  ) {
    if (e.hydrate) {
      const p = c2(e.target);
      d.fragment && d.fragment.l(p), p.forEach(H);
    } else d.fragment && d.fragment.c();
    e.intro && D(t.$$.fragment), T(t, e.target, e.anchor), U0();
  }
  B1(u);
}
class Q {
  constructor() {
    t0(this, '$$');
    t0(this, '$$set');
  }
  $destroy() {
    I(this, 1), (this.$destroy = P);
  }
  $on(e, n) {
    if (!o1(n)) return P;
    const a = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return (
      a.push(n),
      () => {
        const s = a.indexOf(n);
        s !== -1 && a.splice(s, 1);
      }
    );
  }
  $set(e) {
    this.$$set && !s2(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
  }
}
const b2 = '4';
typeof window < 'u' && (window.__svelte || (window.__svelte = { v: new Set() })).v.add(b2);
function _0(t, { delay: e = 0, duration: n = 400, easing: a = o0 } = {}) {
  const s = +getComputedStyle(t).opacity;
  return { delay: e, duration: n, easing: a, css: o => `opacity: ${o * s}` };
}
function y2(t) {
  return t();
}
function $2(t) {
  t.forEach(y2);
}
const T1 = [],
  b0 = [],
  G1 = [],
  y0 = [],
  t2 = Promise.resolve();
let r0 = !1;
function k2() {
  r0 || ((r0 = !0), t2.then(E2));
}
function A2() {
  return k2(), t2;
}
function M2(t) {
  G1.push(t);
}
const n0 = new Set();
let I1 = 0;
function E2() {
  do {
    for (; I1 < T1.length; ) {
      const t = T1[I1];
      I1++, L2(t.$$);
    }
    for (T1.length = 0, I1 = 0; b0.length; ) b0.pop()();
    for (let t = 0; t < G1.length; t += 1) {
      const e = G1[t];
      n0.has(e) || (n0.add(e), e());
    }
    G1.length = 0;
  } while (T1.length);
  for (; y0.length; ) y0.pop()();
  (r0 = !1), n0.clear();
}
function L2(t) {
  if (t.fragment !== null) {
    t.update(), $2(t.before_update);
    const e = t.dirty;
    (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(M2);
  }
}
const Z2 = { root: null, rootMargin: '0px', threshold: 0, unobserveOnEnter: !1 },
  g1 = (t, e) => new CustomEvent(t, { detail: e });
function q2(t, e = {}) {
  const {
    root: n,
    rootMargin: a,
    threshold: s,
    unobserveOnEnter: o,
  } = Object.assign(Object.assign({}, Z2), e);
  let r = { x: void 0, y: void 0 },
    c = { vertical: void 0, horizontal: void 0 };
  if (typeof IntersectionObserver < 'u' && t) {
    const u = new IntersectionObserver(
      (d, g) => {
        d.forEach(p => {
          r.y > p.boundingClientRect.y ? (c.vertical = 'up') : (c.vertical = 'down'),
            r.x > p.boundingClientRect.x ? (c.horizontal = 'left') : (c.horizontal = 'right'),
            (r = { y: p.boundingClientRect.y, x: p.boundingClientRect.x });
          const m = {
            inView: p.isIntersecting,
            entry: p,
            scrollDirection: c,
            node: t,
            observer: g,
          };
          t.dispatchEvent(g1('inview_change', m)),
            t.dispatchEvent(g1('change', m)),
            p.isIntersecting
              ? (t.dispatchEvent(g1('inview_enter', m)),
                t.dispatchEvent(g1('enter', m)),
                o && g.unobserve(t))
              : (t.dispatchEvent(g1('inview_leave', m)), t.dispatchEvent(g1('leave', m)));
        });
      },
      { root: n, rootMargin: a, threshold: s },
    );
    return (
      A2().then(() => {
        t.dispatchEvent(g1('inview_init', { observer: u, node: t })),
          t.dispatchEvent(g1('init', { observer: u, node: t }));
      }),
      u.observe(t),
      {
        destroy() {
          u.unobserve(t);
        },
      }
    );
  }
}
const B2 = t => ({ mount: t & 2 }),
  $0 = t => ({ mount: t[1] });
function k0(t) {
  let e, n, a, s, o, r;
  const c = t[4].default,
    u = c0(c, t, t[3], $0);
  return {
    c() {
      (e = h('div')), u && u.c(), l(e, 'class', 'container hidden-scrollbar svelte-2dv82k');
    },
    m(d, g) {
      O(d, e, g),
        u && u.m(e, null),
        (s = !0),
        o ||
          ((r = [
            v1(e, 'introstart', t[7]),
            v1(e, 'outrostart', t[8]),
            v1(e, 'introend', t[5]),
            v1(e, 'outroend', t[6]),
          ]),
          (o = !0));
    },
    p(d, g) {
      u && u.p && (!s || g & 10) && f0(u, c, d, d[3], s ? u0(c, d[3], g, B2) : d0(d[3]), $0);
    },
    i(d) {
      s ||
        (D(u, d),
        L1(() => {
          s && (a && a.end(1), (n = w2(e, _0, { duration: 1e3 })), n.start());
        }),
        (s = !0));
    },
    o(d) {
      z(u, d), n && n.invalidate(), (a = x2(e, _0, { duration: 1e3 })), (s = !1);
    },
    d(d) {
      d && H(e), u && u.d(d), d && a && a.end(), (o = !1), u1(r);
    },
  };
}
function F2(t) {
  let e,
    n,
    a,
    s,
    o,
    r = t[0] && k0(t);
  return {
    c() {
      (e = h('div')), r && r.c(), l(e, 'class', (n = 'base ' + t[2].class + ' svelte-2dv82k'));
    },
    m(c, u) {
      O(c, e, u),
        r && r.m(e, null),
        (a = !0),
        s || ((o = [c1(q2.call(null, e)), v1(e, 'inview_enter', t[9])]), (s = !0));
    },
    p(c, [u]) {
      c[0]
        ? r
          ? (r.p(c, u), u & 1 && D(r, 1))
          : ((r = k0(c)), r.c(), D(r, 1), r.m(e, null))
        : r &&
          (z1(),
          z(r, 1, 1, () => {
            r = null;
          }),
          H1()),
        (!a || (u & 4 && n !== (n = 'base ' + c[2].class + ' svelte-2dv82k'))) && l(e, 'class', n);
    },
    i(c) {
      a || (D(r), (a = !0));
    },
    o(c) {
      z(r), (a = !1);
    },
    d(c) {
      c && H(e), r && r.d(), (s = !1), u1(o);
    },
  };
}
function D2(t, e, n) {
  const a = [];
  let s = K1(e, a),
    { $$slots: o = {}, $$scope: r } = e,
    c = !1,
    u = !1;
  function d(v) {
    l1.call(this, t, v);
  }
  function g(v) {
    l1.call(this, t, v);
  }
  const p = () => n(1, (u = !0)),
    m = () => n(1, (u = !1)),
    C = () => n(0, (c = !0));
  return (
    (t.$$set = v => {
      (e = F1(F1({}, e), V0(v))), n(2, (s = K1(e, a))), '$$scope' in v && n(3, (r = v.$$scope));
    }),
    [c, u, s, r, o, d, g, p, m, C]
  );
}
class Z1 extends Q {
  constructor(e) {
    super(), K(this, e, D2, F2, G, {});
  }
}
const P2 = `<svg width="1em" height="1em" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">\r
<path d="M8.09176 33.8836C7.92553 33.7792 7.98365 33.5237 8.14792 33.3972C8.3122 33.2707 8.54097 33.2341 8.75089 33.2096C13.8675 32.5342 18.998 32.0797 24.12 31.8465C25.1685 31.7951 26.4041 31.6683 27.0105 30.8687C26.1926 30.8894 25.3995 30.5938 24.8767 30.0756C24.5988 29.7989 24.0907 29.8036 23.65 29.8331C21.7754 29.9526 19.8925 30.1195 18.0203 30.3218C15.3084 30.6221 12.5989 31.0052 9.9169 31.5794C9.53695 31.6614 9.15014 31.7455 8.76799 31.7703C8.95132 31.6573 8.99015 31.3627 8.96248 31.1459C8.9534 31.0907 8.94257 31.0297 8.88893 31.0007C8.75572 30.9314 8.63864 31.1403 8.6364 31.2824C8.6326 31.4444 8.63057 31.6122 8.6199 31.7762C8.41841 31.7788 8.22712 31.7656 8.0407 31.7187C8.45732 31.0854 8.50402 30.2932 8.16121 29.6758C7.92601 29.7658 7.64051 29.6136 7.63523 29.3965C7.84956 29.4865 8.069 29.5685 8.28334 29.6584L7.99977 28.7146C8.50751 29.2824 8.743 30.0413 8.64778 30.7966C9.019 29.8876 8.92431 28.8742 8.39755 28.0934C8.36094 28.2459 8.32612 28.4043 8.28952 28.5568C8.1408 28.4857 7.98165 28.4049 7.93224 28.2654C7.8897 28.1238 8.03782 27.9185 8.20007 27.9598C8.16994 27.8595 8.06599 27.7879 7.94873 27.7716C7.8221 26.8514 7.68859 25.9332 7.56373 25.0189C7.40697 23.9983 7.25198 22.9837 7.09522 21.9632C6.75801 19.7685 6.42591 17.5658 6.33297 15.3362C7.28009 16.9425 8.22897 18.5547 9.17608 20.161C9.57098 20.827 9.97629 21.5028 10.604 21.9959C11.2385 22.487 12.1555 22.7711 13.0094 22.521C14.3323 22.1364 14.9149 20.7587 15.2941 19.5771C15.6246 18.5324 15.9619 17.4856 16.2924 16.4409C16.3813 16.1633 16.4632 15.8622 16.332 15.6251C16.5669 14.8856 16.8 14.1403 17.0348 13.4008C16.8405 13.2277 16.759 12.9563 16.8257 12.7048C17.0493 12.8755 17.2747 13.0522 17.4915 13.2251C17.2593 12.6517 17.3671 11.9633 17.7811 11.4208C17.6037 11.4291 17.4275 11.3663 17.3181 11.2512C17.577 11.315 17.7794 11.0162 17.8721 10.7761C18.2376 9.79803 18.6099 8.81791 18.9754 7.83986C19.0546 7.62956 19.1266 7.39567 19.0201 7.21545C19.2828 6.71846 19.5542 6.22531 19.8187 5.73422C19.5613 9.91484 19.9048 14.0757 20.8413 18.0906C20.9791 18.6988 21.1428 19.3184 21.5346 19.8246C21.9247 20.3248 22.6029 20.687 23.3238 20.5926C23.735 20.5399 24.1174 20.3414 24.4426 20.1022C25.1786 19.5594 25.6713 18.7554 25.7643 17.9428C25.9286 18.0157 25.9718 18.2342 25.8472 18.3681C27.115 17.5756 26.852 15.8024 27.913 14.7954C28.5487 14.1928 29.0282 13.4699 29.2904 12.6966C29.9259 12.4928 30.4066 11.8981 30.3914 11.3239C30.8618 11.144 31.2549 10.7815 31.4356 10.3606C31.3567 10.3971 31.2621 10.4063 31.2184 10.3358C31.1275 10.183 31.2861 9.98747 31.433 9.85327C31.7303 9.571 32.0294 9.29463 32.3199 9.01443C31.7495 10.6072 31.1791 12.1999 30.6415 13.802C29.2791 17.8709 28.1547 21.9839 27.3837 26.1259C27.1796 27.242 26.9928 28.3658 27.0418 29.4766C27.0771 30.1927 27.1985 30.8959 27.4178 31.576C28.7727 29.6768 29.3104 27.4765 29.8348 25.3316C30.5087 22.5373 31.1826 19.7429 31.8565 16.9486C32.1212 15.8593 32.3822 14.7583 32.4195 13.6602C31.9964 14.1474 31.8383 14.7931 32.0049 15.3476C31.6939 15.4346 31.5922 15.0214 31.6432 14.7424C31.8509 13.6381 32.0568 12.5279 32.2713 11.4215C32.9054 11.0381 33.0039 10.2689 33.0242 9.61319C33.0338 9.32089 33.0416 9.0227 33.058 8.72834C33.1213 8.46495 32.7442 8.28237 32.4488 8.37115C32.1533 8.45992 31.9486 8.70149 31.7697 8.92889C30.7915 10.1618 29.8115 11.3888 28.8264 12.6237C27.2654 14.5848 25.6992 16.5539 23.854 18.3174C23.6926 18.1794 23.6563 17.9587 23.6373 17.7458C23.1468 13.3203 22.6564 8.89492 22.1659 4.46949C22.1155 4.00229 21.5829 3.75069 21.1094 3.57136C20.7448 3.43007 20.3716 3.28496 20.0001 3.14574C19.1823 4.81279 18.6373 6.56509 18.3888 8.33125C18.0134 8.75273 17.8231 9.26653 17.6362 9.76647C16.3524 13.1492 14.77 16.4609 12.9026 19.6717C12.6853 20.0457 12.4321 20.4498 11.9978 20.6253C10.439 18.5789 8.88014 16.5326 7.32131 14.4862C7.50454 14.9714 7.6964 15.4604 7.88651 15.9435C7.33573 15.5816 7.05811 14.9319 7.19055 14.3004C7.22871 14.1281 7.02457 14.0222 6.85346 13.9514C6.29712 13.7456 5.74077 13.5397 5.18442 13.3338C6.2178 19.8407 6.90738 26.4252 7.25446 33.0418C7.26506 33.2766 7.27919 33.5232 7.41858 33.7128C7.55798 33.9025 7.86208 34.0169 8.10217 33.8933L8.09176 33.8836ZM28.7003 28.0393C28.7548 28.1708 28.7033 28.3985 28.5413 28.3829C28.4085 28.3649 28.4106 28.1971 28.4492 28.0761C28.4826 27.9632 28.5179 27.8561 28.5514 27.7431L28.6186 27.7423C28.5423 27.688 28.7084 27.5674 28.7538 27.6437C28.601 27.7089 28.644 27.9018 28.7003 28.0393ZM30.7659 15.6877L30.7761 15.6717C30.6999 15.6175 30.8659 15.4968 30.9096 15.5673C30.8189 15.6396 30.7577 15.7352 30.7362 15.8381C30.64 15.867 30.6677 15.685 30.7728 15.6856L30.7659 15.6877ZM30.6121 20.7118L30.5123 20.729C30.566 20.7579 30.5132 20.8316 30.4514 20.8502C30.4308 20.8564 30.3997 20.8528 30.3858 20.8313C30.4805 20.6228 30.5683 20.4163 30.663 20.2078C30.6454 20.3738 30.6228 20.5479 30.6052 20.7139L30.6121 20.7118ZM30.9806 18.8711C30.9048 19.0675 30.834 19.256 30.7582 19.4524C30.531 19.2698 30.4714 18.9469 30.6087 18.6805C30.746 18.4142 30.8901 18.1458 31.0273 17.8794C31.2929 18.1148 31.1103 18.5298 30.9806 18.8711ZM31.2187 17.4939L31.1965 17.5199C31.0542 17.3954 31.1004 17.15 31.2786 17.045C31.3533 17.1191 31.4298 17.199 31.4357 17.2937C31.4435 17.3943 31.336 17.5102 31.2238 17.486L31.2187 17.4939ZM31.6683 15.8732C31.6683 15.8732 31.6339 15.8835 31.6098 15.8779C31.4236 15.8567 31.5088 15.5417 31.683 15.5729C31.845 15.5886 31.7989 15.834 31.6614 15.8753L31.6683 15.8732ZM32.5285 9.85858C32.5285 9.85858 32.501 9.86684 32.4941 9.86891C32.3705 9.90607 32.255 9.69636 32.3958 9.6412L32.5299 9.81316L32.5423 9.85445L32.5285 9.85858ZM26.3914 16.7383C26.4475 16.6507 26.604 16.6229 26.6769 16.6911C26.6157 16.7866 26.5596 16.8742 26.4984 16.9698C26.388 16.9515 26.3284 16.8279 26.3845 16.7403L26.3914 16.7383ZM24.6218 18.2797C24.6626 18.2159 24.7034 18.1522 24.7442 18.0885C24.8568 18.164 24.8874 18.3156 24.816 18.4271C24.7752 18.4908 24.7067 18.5371 24.6242 18.5619C24.5624 18.5805 24.4952 18.5814 24.4313 18.5684C24.4925 18.4728 24.5537 18.3773 24.6149 18.2817L24.6218 18.2797ZM22.5101 17.8593L22.47 17.8006C22.4002 17.693 22.3904 17.5608 22.4272 17.434C22.6086 17.4889 22.6588 17.731 22.5101 17.8593ZM23.2783 18.2717C23.2938 18.4728 23.1991 18.6814 23.1853 18.8849C23.0914 18.5722 22.9425 18.2761 22.7627 18.0021C22.7503 17.9608 22.8051 17.9186 22.855 17.9101C23.0871 17.8596 23.2628 18.0705 23.2783 18.2717ZM22.7503 16.7388C22.6484 16.6987 22.5515 16.6506 22.4496 16.6105L22.7453 16.1486L22.7591 16.1445C22.9479 16.2743 22.9419 16.5784 22.7452 16.7468L22.7503 16.7388ZM22.6868 15.1308C22.5806 15.2012 22.4367 15.2959 22.4617 15.4042C22.5726 15.4738 22.7007 15.5511 22.7173 15.6811C22.7283 15.7678 22.6465 15.8696 22.5572 15.8964C22.5228 15.9068 22.478 15.9074 22.4486 15.8841C22.4122 15.8628 22.3947 15.8295 22.3772 15.7962C22.2897 15.6295 22.2192 15.4449 22.2521 15.2549C22.2849 15.065 22.4434 14.8694 22.6567 14.8311C22.6979 14.8187 22.7445 14.824 22.7722 14.8414C22.8794 14.8992 22.7843 15.0564 22.6799 15.1328L22.6868 15.1308ZM21.5778 4.78125C21.731 4.76739 21.7928 4.94819 21.7595 5.08682C21.7262 5.22544 21.65 5.37056 21.7233 5.49001C21.9381 5.83068 22.155 6.22857 21.9842 6.60788C21.7174 6.41793 21.5891 6.1156 21.4712 5.82301C21.364 5.56581 21.2636 5.30655 21.1546 5.04345C21.2138 5.11571 21.3328 5.13784 21.429 5.10893C21.4496 5.10274 21.4703 5.09655 21.4891 5.08445C21.5971 5.01986 21.6372 4.87917 21.5796 4.78715L21.5778 4.78125ZM21.1988 4.36772L21.2263 4.35946C21.2944 4.46122 21.311 4.59129 21.2655 4.71429C21.1223 4.68656 20.9634 4.63141 20.933 4.50546C20.9027 4.37952 21.1479 4.24797 21.1988 4.36772ZM21.8119 8.4283C21.8091 8.09472 21.8063 7.76113 21.8052 7.43344C21.8037 7.25382 21.8055 7.06032 21.9213 6.89692C21.9875 6.99278 21.9988 7.10516 22.0101 7.21754L22.1435 8.53449C22.149 8.57785 22.1495 8.62917 22.124 8.66898C22.1087 8.69287 22.083 8.70704 22.0555 8.71529C21.9936 8.73388 21.9125 8.71323 21.8777 8.67223C21.8203 8.60587 21.8161 8.51708 21.8137 8.4342L21.8119 8.4283ZM21.3622 8.00387C21.4259 7.99118 21.4646 8.0953 21.3977 8.12185C21.329 8.14249 21.2953 8.03041 21.3622 8.00387ZM22.0186 9.24089C22.0286 9.1993 22.0386 9.15772 22.0745 9.12763C22.1993 9.01939 22.3354 9.2229 22.3349 9.37097C22.3344 9.9178 22.3185 10.4885 22.0196 10.9899C21.8874 10.4251 21.8875 9.82696 22.0117 9.24296L22.0186 9.24089ZM22.0314 11.9768C22.0341 11.886 22.0368 11.7952 22.0964 11.7194C22.1561 11.6436 22.2848 11.5984 22.3542 11.6548C22.2229 12.0158 22.3434 12.4169 22.652 12.6458C22.5959 12.7334 22.5415 12.8269 22.4855 12.9145C22.3281 12.8396 22.1707 12.7647 22.0133 12.6897C22.0165 12.4508 22.0283 12.2158 22.0314 11.9768ZM22.4077 13.7032C22.5465 13.6165 22.7548 13.8111 22.6125 13.8861L22.6214 13.9156C22.4509 14.1211 22.7984 14.4798 22.539 14.5642C22.381 14.6116 22.295 14.4252 22.2886 14.2792C22.2864 14.222 22.2842 14.1648 22.2733 14.1037C22.2601 13.9598 22.2672 13.784 22.4077 13.7032ZM19.309 5.53365C19.3132 5.42304 19.4141 5.33485 19.503 5.25669C19.6395 5.31214 19.6361 5.52539 19.4938 5.60031L19.5578 5.63895C19.5578 5.63895 19.5288 5.66697 19.5082 5.67316C19.4257 5.69794 19.3149 5.62833 19.3107 5.53955L19.309 5.53365ZM16.0347 15.9073C16.1034 15.8867 16.1371 15.9988 16.0702 16.0253C16.0014 16.0459 15.9678 15.9339 16.0347 15.9073ZM15.2424 16.512C15.2601 16.571 15.1295 16.6102 15.1049 16.5532C15.0872 16.4943 15.2178 16.455 15.2424 16.512ZM15.0959 17.7201C15.0782 17.4617 15.2895 17.1924 15.5624 17.0783C15.6186 17.4151 15.5132 17.7876 15.2884 18.0867C15.1723 17.9994 15.1023 17.8661 15.0976 17.726L15.0959 17.7201ZM14.7999 19.3783L14.8947 19.3948C14.9639 19.6249 14.8594 19.9006 14.6386 20.0634C14.475 19.8682 14.5844 19.5588 14.8067 19.3762L14.7999 19.3783ZM14.3909 20.3115C14.4597 20.2909 14.4933 20.4029 14.4264 20.4295C14.3577 20.4501 14.324 20.338 14.3909 20.3115ZM11.2887 20.4846C11.4095 20.5126 11.4556 20.666 11.3702 20.756C11.2494 20.728 11.2016 20.5687 11.2887 20.4846ZM10.7192 19.736C10.7748 19.7965 10.8304 19.857 10.8861 19.9174L10.8552 19.9395C10.9319 20.0451 10.9452 20.1891 10.886 20.3162C10.7109 20.1823 10.64 19.9463 10.7174 19.7301L10.7192 19.736ZM8.03564 16.2653C8.05893 16.1683 8.21853 16.1011 8.27947 16.1792C8.72912 16.803 9.15129 17.4351 9.57522 18.0731C9.88924 18.5447 10.205 19.0223 10.519 19.4939C10.1675 19.4709 9.96516 19.1715 9.80273 18.9052C9.30656 18.0766 8.75211 17.2785 8.14111 16.5166C8.08017 16.4385 8.01745 16.3544 8.04074 16.2574L8.03564 16.2653Z" fill="#FFFBF0"/>\r
</svg>\r
`;
function P1(t, e) {
  return n(), { update: n };
  function n(a) {
    if ((a && (e = a), e.enable && !t.className.includes(e.class)))
      t.className = `${t.className} ${e.class}`;
    else if (!e.enable && t.className.includes(e.class)) {
      const s = t.className;
      t.className = s.replace(e.class, '').trim();
    }
  }
}
function z2(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x, y, $, w, k, Z, q, j, F, E;
  return {
    c() {
      (e = h('div')),
        (n = h('h1')),
        (a = J('Mua càng nhiều, giá càng ')),
        (s = h('br')),
        (o = J(` ưu đãi\r
    `)),
        (r = h('span')),
        (c = L()),
        (u = h('div')),
        (d = h('div')),
        (d.innerHTML =
          '<div class="w-full h-160px rounded-[10px_10px_0px_0px] overflow-hidden"><img src="https://s3-alpha-sig.figma.com/img/8776/5202/c913abfa765ddb1730e027b83afd3164?Expires=1705881600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=SG~hxjBgm7ARnlnYAmwGQMsYCrOd0LbJUI2~c2hG9xeMLXqDsH0LY4Rw5t~uBc4dEli1RD1i1qFuH5WtKKrQZLpfHak46tTtuP-ySWecGnz1yWAz2qQCbtbBRk88diDkz87JpsOP04c3mgD3y2-MnaOcpfj9HfR0Vfm7-hCxFl6-znlyRE2Pfdzsllh6rYxrKO60c4b2P96mx8q2ubxdVhm5jltBF5cj0kapDg7cX5UFr9ibSO0WZyuaP5UG6Jg58Mk4pKKtixOJrMNU9kVaSupKRdvLLdvCJ3TJtU6f75vQK-NoQqh5DkaRygjcKWQ6xpRhxbKq-f7T65ctB8n6Cg__" class="w-full h-full object-cover" alt=""/></div> <div class="flex flex-col gap-0.5 items-start pb-5px"><h3 class="text-17px font-bold px10px">Bún chả đặc biệt</h3> <span class="text-9px text-#9A9A9A px10px">Bún, chả viên, chả miếng xương sông...</span> <div class="h-65px w-full relative"><div class="bg-white flex items-center justify-between rounded-[10px] w-full py-10px px10px shadow-[0px_6px_24px_0px_rgba(0,_0,_0,_0.10),_0px_2px_6px_-1px_rgba(0,_0,_0,_0.10)] op-0"><div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>1 suất</span> <span class="font-bold">45.000 đ</span></div> <div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>2 suất</span> <span class="font-bold">40.000 đ</span></div> <div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>1 suất</span> <span class="font-bold">30.000 đ</span></div></div></div></div>'),
        (g = L()),
        (p = h('div')),
        (m = h('div')),
        (C = L()),
        (v = h('div')),
        (b = h('h3')),
        (b.textContent = 'Bún chả đặc biệt'),
        (x = L()),
        (y = h('span')),
        (y.textContent = 'Bún, chả viên, chả miếng xương sông...'),
        ($ = L()),
        (w = h('div')),
        (k = h('div')),
        (k.innerHTML =
          '<div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>1 suất</span> <span class="font-bold">45.000 đ</span></div> <div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>2 suất</span> <span class="font-bold">40.000 đ</span></div> <div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>5 suất</span> <span class="font-bold">30.000 đ</span></div>'),
        (q = L()),
        (j = h('div')),
        (j.innerHTML =
          '<div class="w-full h-160px rounded-[10px_10px_0px_0px] overflow-hidden"><img src="https://s3-alpha-sig.figma.com/img/4a71/08f3/9b1a1fdbc271822c197230c381ca5a0a?Expires=1705881600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=FF2fwiA-I9xD8H97Y8GtipP8MLqwau-zY8pLivklKCOOgPe0hBWmGD2SRomcE6-RNc7RVVMsplcL14tsqaY3h-MKRApWqPkiUa~q6~LSCN3qvrQHQOnCyvmrqMWfTg4QpIZFFhVNNPW9a98ZQI5E9i19VnZUe1~DlabvG1l2vxA056I~l0WCG2XFoTcWQlteSYFxwW2T4etdKDXyU4mmzRfWaQwOBG8SDnvl9BeJ1nvbQp3M0GqVL4f69jtHXGovk4XOINFqtee5LP-~XeH0ZtN69Mrjft~yr2JihKceSvQb34cmfgMdWrvvnJOEvzL5iWroaZFd~Oq0e6Sv~17r6w__" class="w-full h-full object-cover" alt=""/></div> <div class="flex flex-col gap-0.5 items-start pb-5px"><h3 class="text-17px font-bold px10px">Cơm cháy Ninh Bình</h3> <span class="text-9px text-#9A9A9A px10px">Gạo giòn tan thơm ngon, ăn kèm với ruốc cùng ...</span> <div class="h-65px w-full relative"><div class="absolute -left-10% top-20% bg-white flex items-center justify-between rounded-[10px] w-full py-10px px10px shadow-[0px_6px_24px_0px_rgba(0,_0,_0,_0.10),_0px_2px_6px_-1px_rgba(0,_0,_0,_0.10)]"><div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>1 suất</span> <span class="font-bold">45.000 đ</span></div> <div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>2 suất</span> <span class="font-bold">40.000 đ</span></div> <div class="flex flex-col gap-1 text-11px rounded-[8px] bg-[#FFF8E1] w-31% p-8px"><span>1 suất</span> <span class="font-bold">30.000 đ</span></div></div></div></div>'),
        l(s, 'class', 'hidden sm:block'),
        l(r, 'class', '[&_>_svg]:inline-block'),
        l(n, 'class', 'text-[2.2rem] font-bold op-0 duration-1000'),
        f(n, 'delay-2000', t[0]),
        f(n, 'op-100', t[0]),
        l(
          d,
          'class',
          'absolute top-1/20 left-1/15 w-300px flex flex-col gap-1.5 bg-white rounded-10px op-0 duration-1000 translate-y-1/3',
        ),
        f(d, 'delay-2000', t[0]),
        f(d, '!op-100', t[0]),
        f(d, '!translate-y-0', t[0]),
        l(m, 'class', 'w-full h-160px rounded-[10px_10px_0px_0px] overflow-hidden op-0'),
        l(b, 'class', 'text-17px font-bold px10px op-0'),
        l(y, 'class', 'text-9px text-#9A9A9A px10px op-0'),
        l(
          k,
          'class',
          'bg-white/0 flex items-center justify-between rounded-[10px] w-full py-10px px10px absolute z-10 duration-1000',
        ),
        l(w, 'class', 'h-65px w-full relative'),
        l(v, 'class', 'flex flex-col gap-0.5 items-start pb-5px'),
        l(
          p,
          'class',
          'absolute top-1/20 left-1/15 w-300px flex flex-col gap-1.5 bg-transparent rounded-10px op-0 duration-1000 translate-y-1/3 z-1',
        ),
        f(p, 'delay-2000', t[0]),
        f(p, '!op-100', t[0]),
        f(p, '!translate-y-0', t[0]),
        l(
          j,
          'class',
          'absolute top-1/2 left-1/2.5 w-300px flex flex-col gap-1.5 bg-white rounded-10px op-0 duration-1000 translate-y-1/3',
        ),
        f(j, 'delay-2500', t[0]),
        f(j, '!op-100', t[0]),
        f(j, '!translate-y-0', t[0]),
        l(u, 'class', 'relative flex flex-grow items-center gap-3'),
        l(
          e,
          'class',
          'relative z-1 h-[550px] w-2.4/5 rounded-2.5rem flex flex-col justify-between gap-4 bg-#8CC5FF duration-[1000ms,_2000ms] op-0 -translate-x-1/5 p-[30px_40px] overflow-hidden',
        ),
        p1(e, 'transition-property', 'transform, opacity'),
        f(e, '!delay-[1000ms,_1200ms]', t[0]),
        f(e, '!op-100', t[0]),
        f(e, '!translate-x-0', t[0]);
    },
    m(M, A) {
      O(M, e, A),
        i(e, n),
        i(n, a),
        i(n, s),
        i(n, o),
        i(n, r),
        (r.innerHTML = P2),
        i(e, c),
        i(e, u),
        i(u, d),
        i(u, g),
        i(u, p),
        i(p, m),
        i(p, C),
        i(p, v),
        i(v, b),
        i(v, x),
        i(v, y),
        i(v, $),
        i(v, w),
        i(w, k),
        i(u, q),
        i(u, j),
        F ||
          ((E = c1(
            (Z = P1.call(null, k, {
              class:
                'translate-x-[-15%] translate-y-[20%] delay-2500 shadow-[0px_6px_24px_0px_rgba(0,_0,_0,_0.10),_0px_2px_6px_-1px_rgba(0,_0,_0,_0.10)] !bg-white',
              enable: t[0],
            })),
          )),
          (F = !0));
    },
    p(M, [A]) {
      A & 1 && f(n, 'delay-2000', M[0]),
        A & 1 && f(n, 'op-100', M[0]),
        A & 1 && f(d, 'delay-2000', M[0]),
        A & 1 && f(d, '!op-100', M[0]),
        A & 1 && f(d, '!translate-y-0', M[0]),
        Z &&
          o1(Z.update) &&
          A & 1 &&
          Z.update.call(null, {
            class:
              'translate-x-[-15%] translate-y-[20%] delay-2500 shadow-[0px_6px_24px_0px_rgba(0,_0,_0,_0.10),_0px_2px_6px_-1px_rgba(0,_0,_0,_0.10)] !bg-white',
            enable: M[0],
          }),
        A & 1 && f(p, 'delay-2000', M[0]),
        A & 1 && f(p, '!op-100', M[0]),
        A & 1 && f(p, '!translate-y-0', M[0]),
        A & 1 && f(j, 'delay-2500', M[0]),
        A & 1 && f(j, '!op-100', M[0]),
        A & 1 && f(j, '!translate-y-0', M[0]),
        A & 1 && f(e, '!delay-[1000ms,_1200ms]', M[0]),
        A & 1 && f(e, '!op-100', M[0]),
        A & 1 && f(e, '!translate-x-0', M[0]);
    },
    i: P,
    o: P,
    d(M) {
      M && H(e), (F = !1), E();
    },
  };
}
function H2(t, e, n) {
  let { mount: a = !1 } = e;
  return (
    (t.$$set = s => {
      'mount' in s && n(0, (a = s.mount));
    }),
    [a]
  );
}
class O2 extends Q {
  constructor(e) {
    super(), K(this, e, H2, z2, G, { mount: 0 });
  }
}
function J1(t, e) {
  if (typeof t == 'string') {
    const n = +t;
    return isNaN(n) ? e : n;
  }
  return e ?? t;
}
function j2(t) {
  let e, n, a, s, o, r, c;
  return {
    c() {
      (e = h('div')),
        (n = _('svg')),
        (a = _('path')),
        (s = _('rect')),
        l(a, 'class', 'line'),
        l(a, 'stroke', '#FBBD05'),
        l(a, 'stroke-width', '3'),
        l(a, 'stroke-dasharray', '10.7 10.7'),
        l(s, 'y', (o = t[0] ? '100%' : '0')),
        l(s, 'x', '0'),
        l(s, 'class', 'w-full h-full duration-2000 ease-in'),
        l(s, 'fill', 'white'),
        f(s, 'delay-200', t[0]),
        l(n, 'class', 'absolute left-0 top-0 w-full h-full'),
        l(n, 'fill', 'none'),
        l(n, 'xmlns', 'http://www.w3.org/2000/svg'),
        l(e, 'class', 'w-full h-full');
    },
    m(u, d) {
      O(u, e, d), i(e, n), i(n, a), i(n, s), r || ((c = c1(t[1].call(null, n))), (r = !0));
    },
    p(u, [d]) {
      d & 1 && o !== (o = u[0] ? '100%' : '0') && l(s, 'y', o), d & 1 && f(s, 'delay-200', u[0]);
    },
    i: P,
    o: P,
    d(u) {
      u && H(e), (r = !1), c();
    },
  };
}
const S2 = [
  { key: 'M', value: ['160', '0'] },
  { key: 'C', value: ['172', '545.5', '219.5', '670.423', '219.5', '882.5'] },
  { key: 'C', value: ['219.5', '1178.5', '58', '1294', '-11', '1294'] },
];
function N2(t, e, n) {
  let { mount: a = !1 } = e;
  function s(c) {
    const u = new ResizeObserver(d => {
      const g = d[0].contentRect,
        p = S2.reduce((C, v) => C + ' ' + o(g, v), ''),
        m = c.querySelector('path.line');
      m && m.setAttribute('d', p);
    });
    return (
      u.observe(c),
      {
        destroy() {
          u.disconnect();
        },
      }
    );
  }
  function o(c, u) {
    const d = c.width / r.width,
      g = c.height / r.height;
    return u.key + u.value.map((p, m) => (m % 2 === 0 ? J1(p, 0) * d : J1(p, 0) * g)).join(' ');
  }
  const r = { width: 1438, height: 2400 };
  return (
    (t.$$set = c => {
      'mount' in c && n(0, (a = c.mount));
    }),
    [a, s]
  );
}
let V2 = class extends Q {
  constructor(e) {
    super(), K(this, e, N2, j2, G, { mount: 0 });
  }
};
const T2 = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 18 19" fill="none">\r
<path d="M9.91601 15.137V13.6761C9.91601 11.6592 8.28094 10.0241 6.26398 10.0241C4.24701 10.0241 2.61194 11.6592 2.61194 13.6761V15.137H9.91601ZM9.91601 15.137H15.7593V14.4066C15.7593 12.2551 14.1242 10.7545 12.1072 10.7545C11.0749 10.7545 10.1427 11.2114 9.47845 11.9459M8.4552 5.64166C8.4552 6.85184 7.47415 7.83288 6.26398 7.83288C5.0538 7.83288 4.07275 6.85184 4.07275 5.64166C4.07275 4.43148 5.0538 3.45044 6.26398 3.45044C7.47415 3.45044 8.4552 4.43148 8.4552 5.64166ZM13.5681 7.10248C13.5681 7.90926 12.914 8.56329 12.1072 8.56329C11.3004 8.56329 10.6464 7.90926 10.6464 7.10248C10.6464 6.29569 11.3004 5.64166 12.1072 5.64166C12.914 5.64166 13.5681 6.29569 13.5681 7.10248Z" stroke="#644B00" stroke-width="1.09561" stroke-linecap="round" stroke-linejoin="round"/>\r
</svg>`,
  I2 = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 17 17" fill="none">\r
<path d="M8.40158 3.16285C8.55592 2.8166 8.63309 2.64348 8.74055 2.59016C8.83389 2.54384 8.94352 2.54384 9.03687 2.59016C9.14432 2.64348 9.22149 2.8166 9.37584 3.16285L10.6052 5.92081C10.6508 6.02317 10.6736 6.07435 10.7089 6.11354C10.7402 6.14822 10.7783 6.17596 10.821 6.19495C10.8692 6.21641 10.9249 6.22229 11.0363 6.23406L14.0392 6.55099C14.4162 6.59078 14.6047 6.61068 14.6886 6.6964C14.7615 6.77086 14.7954 6.87513 14.7802 6.97821C14.7627 7.09689 14.6219 7.22378 14.3403 7.47757L12.0972 9.49901C12.0139 9.57404 11.9723 9.61155 11.9459 9.65724C11.9226 9.69766 11.908 9.74254 11.9032 9.78895C11.8976 9.84141 11.9093 9.89623 11.9325 10.0059L12.559 12.9597C12.6377 13.3305 12.677 13.516 12.6214 13.6223C12.5731 13.7146 12.4844 13.779 12.3817 13.7964C12.2634 13.8165 12.0992 13.7217 11.7708 13.5323L9.15517 12.0237C9.05809 11.9677 9.00955 11.9397 8.95795 11.9288C8.9123 11.9191 8.86511 11.9191 8.81946 11.9288C8.76786 11.9397 8.71932 11.9677 8.62224 12.0237L6.00658 13.5323C5.6782 13.7217 5.514 13.8165 5.39573 13.7964C5.29299 13.779 5.20429 13.7146 5.156 13.6223C5.10041 13.516 5.13973 13.3305 5.21839 12.9597L5.8449 10.0059C5.86816 9.89623 5.87978 9.84141 5.87426 9.78895C5.86937 9.74254 5.85479 9.69766 5.83146 9.65724C5.8051 9.61155 5.76347 9.57404 5.68022 9.49901L3.43714 7.47757C3.15553 7.22378 3.01473 7.09689 2.99722 6.97821C2.98202 6.87513 3.0159 6.77086 3.08879 6.6964C3.17271 6.61068 3.36121 6.59078 3.73821 6.55099L6.74107 6.23406C6.85252 6.22229 6.90824 6.21641 6.95643 6.19495C6.99906 6.17596 7.03724 6.14822 7.06847 6.11354C7.10378 6.07435 7.12659 6.02317 7.17222 5.92081L8.40158 3.16285Z" fill="#FBBD05"/>\r
</svg>`,
  R2 = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" fill="none">\r
<path d="M7.88888 12.4722C9.93054 10.3722 11.9722 8.49176 11.9722 6.17217C11.9722 3.85257 10.144 1.97217 7.88888 1.97217C5.63371 1.97217 3.80554 3.85257 3.80554 6.17217C3.80554 8.49176 5.84721 10.3722 7.88888 12.4722Z" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>\r
<path d="M7.88888 7.8055C8.85537 7.8055 9.63888 7.022 9.63888 6.0555C9.63888 5.089 8.85537 4.3055 7.88888 4.3055C6.92238 4.3055 6.13888 5.089 6.13888 6.0555C6.13888 7.022 6.92238 7.8055 7.88888 7.8055Z" stroke="#717171" stroke-linecap="round" stroke-linejoin="round"/>\r
</svg>`,
  G2 = t => ({}),
  A0 = t => ({});
function K2(t) {
  let e,
    n = t[1].action + '',
    a;
  return {
    c() {
      (e = h('button')),
        (a = J(n)),
        l(e, 'class', 'bg-#FBBD05 mt-1 text-white text-14px w-full rounded-full py-2');
    },
    m(s, o) {
      O(s, e, o), i(e, a);
    },
    p(s, o) {
      o & 2 && n !== (n = s[1].action + '') && A1(a, n);
    },
    i: P,
    o: P,
    d(s) {
      s && H(e);
    },
  };
}
function Q2(t) {
  let e;
  const n = t[6].action,
    a = c0(n, t, t[5], A0);
  return {
    c() {
      a && a.c();
    },
    m(s, o) {
      a && a.m(s, o), (e = !0);
    },
    p(s, o) {
      a && a.p && (!e || o & 32) && f0(a, n, s, s[5], e ? u0(n, s[5], o, G2) : d0(s[5]), A0);
    },
    i(s) {
      e || (D(a, s), (e = !0));
    },
    o(s) {
      z(a, s), (e = !1);
    },
    d(s) {
      a && a.d(s);
    },
  };
}
function W2(t) {
  let e,
    n,
    a,
    s,
    o,
    r,
    c,
    u,
    d = t[1].name + '',
    g,
    p,
    m,
    C,
    v,
    b,
    x = t[1].location + '',
    y,
    $,
    w,
    k,
    Z,
    q,
    j = t[1].rating.rate + '',
    F,
    E,
    M,
    A,
    B,
    N,
    n1 = t[1].rating.count + '',
    a1,
    m1,
    s1,
    U,
    W,
    h1,
    i1,
    e1;
  const _1 = [Q2, K2],
    r1 = [];
  function b1(S, X) {
    return S[4].action ? 0 : 1;
  }
  return (
    (U = b1(t)),
    (W = r1[U] = _1[U](t)),
    {
      c() {
        (e = h('div')),
          (n = h('img')),
          (s = L()),
          (o = h('div')),
          (r = h('div')),
          (c = h('div')),
          (u = h('h3')),
          (g = J(d)),
          (p = L()),
          (m = h('div')),
          (C = h('span')),
          (v = L()),
          (b = h('span')),
          (y = J(x)),
          ($ = L()),
          (w = h('div')),
          (k = h('span')),
          (Z = L()),
          (q = h('span')),
          (F = J(j)),
          (E = L()),
          (M = _('svg')),
          (A = _('circle')),
          (B = L()),
          (N = h('span')),
          (a1 = J(n1)),
          (m1 = J(' đánh giá')),
          (s1 = L()),
          W.c(),
          w1(n.src, (a = t[1].image)) || l(n, 'src', a),
          l(n, 'alt', ''),
          l(n, 'class', 'h-160px object-cover'),
          l(u, 'class', 'font-bold'),
          l(C, 'class', 'text-16px'),
          l(b, 'class', 'text-#717171'),
          l(m, 'class', 'flex items-center text-12px gap-1 -mt-1'),
          l(k, 'class', 'text-16px'),
          l(A, 'cx', '1.04443'),
          l(A, 'cy', '1.22217'),
          l(A, 'r', '1'),
          l(A, 'fill', 'black'),
          l(M, 'width', '3'),
          l(M, 'height', '3'),
          l(M, 'viewBox', '0 0 3 3'),
          l(M, 'fill', 'none'),
          l(w, 'class', 'flex items-center gap-1 text-12px'),
          l(c, 'class', 'flex flex-col gap-1.5 p-3'),
          l(r, 'class', 'overflow-hidden'),
          l(
            o,
            'class',
            (h1 = 'grid ' + (t[2] ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]') + ' duration-1000'),
          ),
          f(o, 'delay-2400', t[0]),
          f(o, '!grid-rows-[1fr]', t[0]),
          l(
            e,
            'class',
            (i1 =
              'w-240px rounded-8px flex flex-col overflow-hidden bg-white shadow-[0px_3.867px_15.467px_0px_rgba(0,0,0,0.10),0px_1.289px_3.867px_-0.644px_rgba(0,0,0,0.10)] ' +
              t[3].class),
          );
      },
      m(S, X) {
        O(S, e, X),
          i(e, n),
          i(e, s),
          i(e, o),
          i(o, r),
          i(r, c),
          i(c, u),
          i(u, g),
          i(c, p),
          i(c, m),
          i(m, C),
          (C.innerHTML = R2),
          i(m, v),
          i(m, b),
          i(b, y),
          i(c, $),
          i(c, w),
          i(w, k),
          (k.innerHTML = I2),
          i(w, Z),
          i(w, q),
          i(q, F),
          i(w, E),
          i(w, M),
          i(M, A),
          i(w, B),
          i(w, N),
          i(N, a1),
          i(N, m1),
          i(c, s1),
          r1[U].m(c, null),
          (e1 = !0);
      },
      p(S, [X]) {
        (!e1 || (X & 2 && !w1(n.src, (a = S[1].image)))) && l(n, 'src', a),
          (!e1 || X & 2) && d !== (d = S[1].name + '') && A1(g, d),
          (!e1 || X & 2) && x !== (x = S[1].location + '') && A1(y, x),
          (!e1 || X & 2) && j !== (j = S[1].rating.rate + '') && A1(F, j),
          (!e1 || X & 2) && n1 !== (n1 = S[1].rating.count + '') && A1(a1, n1);
        let f1 = U;
        (U = b1(S)),
          U === f1
            ? r1[U].p(S, X)
            : (z1(),
              z(r1[f1], 1, 1, () => {
                r1[f1] = null;
              }),
              H1(),
              (W = r1[U]),
              W ? W.p(S, X) : ((W = r1[U] = _1[U](S)), W.c()),
              D(W, 1),
              W.m(c, null)),
          (!e1 ||
            (X & 4 &&
              h1 !==
                (h1 =
                  'grid ' + (S[2] ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]') + ' duration-1000'))) &&
            l(o, 'class', h1),
          (!e1 || X & 5) && f(o, 'delay-2400', S[0]),
          (!e1 || X & 5) && f(o, '!grid-rows-[1fr]', S[0]),
          (!e1 ||
            (X & 8 &&
              i1 !==
                (i1 =
                  'w-240px rounded-8px flex flex-col overflow-hidden bg-white shadow-[0px_3.867px_15.467px_0px_rgba(0,0,0,0.10),0px_1.289px_3.867px_-0.644px_rgba(0,0,0,0.10)] ' +
                  S[3].class))) &&
            l(e, 'class', i1);
      },
      i(S) {
        e1 || (D(W), (e1 = !0));
      },
      o(S) {
        z(W), (e1 = !1);
      },
      d(S) {
        S && H(e), r1[U].d();
      },
    }
  );
}
function X2(t, e, n) {
  const a = ['mount', 'data', 'detailAnimation'];
  let s = K1(e, a),
    { $$slots: o = {}, $$scope: r } = e;
  const c = i2(o);
  let { mount: u = !1 } = e,
    { data: d } = e,
    { detailAnimation: g = !1 } = e;
  return (
    (t.$$set = p => {
      (e = F1(F1({}, e), V0(p))),
        n(3, (s = K1(e, a))),
        'mount' in p && n(0, (u = p.mount)),
        'data' in p && n(1, (d = p.data)),
        'detailAnimation' in p && n(2, (g = p.detailAnimation)),
        '$$scope' in p && n(5, (r = p.$$scope));
    }),
    [u, d, g, s, c, r, o]
  );
}
class l2 extends Q {
  constructor(e) {
    super(), K(this, e, X2, W2, G, { mount: 0, data: 1, detailAnimation: 2 });
  }
}
function M0(t, e, n) {
  const a = t.slice();
  return (a[2] = e[n]), (a[4] = n), a;
}
function J2(t) {
  let e, n, a;
  return {
    c() {
      (e = h('button')),
        (n = h('span')),
        (a = J(`\r
            Mua chung`)),
        l(n, 'class', 'text-16px'),
        l(e, 'slot', 'action'),
        l(
          e,
          'class',
          'bg-#FEEBB2 text-#644B00 text-14px font-bold w-full rounded-full py-2 flex items-center gap-2 justify-center mt-1',
        );
    },
    m(s, o) {
      O(s, e, o), i(e, n), (n.innerHTML = T2), i(e, a);
    },
    p: P,
    d(s) {
      s && H(e);
    },
  };
}
function E0(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x;
  return {
    c() {
      (e = h('div')),
        (n = h('div')),
        (a = h('img')),
        (o = L()),
        (r = h('div')),
        (c = h('h3')),
        (c.textContent = `${t[2].name}`),
        (u = L()),
        (d = h('span')),
        (d.textContent = `${t[2].buyCount} lượt mua`),
        (g = L()),
        (p = h('span')),
        (m = h('span')),
        (m.textContent = `${t[2].minPrice}`),
        (C = J(`\r
                -\r
                `)),
        (v = h('span')),
        (v.textContent = `${t[2].maxPrice}`),
        (b = J(`\r
                đ`)),
        (x = L()),
        w1(a.src, (s = t[2].image)) || l(a, 'src', s),
        l(a, 'class', 'w-full h-full object-cover'),
        l(a, 'alt', ''),
        l(n, 'class', 'w-170px h-160px rounded-10px overflow-hidden'),
        l(c, 'class', 'text-15px font-bold'),
        l(d, 'class', 'text-13px text-#9A9A9A'),
        l(p, 'class', 'text-14px text-#FB8C00 font-bold'),
        l(r, 'class', 'flex flex-col gap-0.5 items-start px10px pb-5px'),
        l(e, 'class', 'dish flex flex-col gap-1.5 bg-white rounded-10px svelte-159w4d3'),
        p1(e, '--pos', '-' + (130 + 130 * t[4]) + '%'),
        p1(e, '--delay', 2700 - 110 * t[4] + 'ms'),
        f(e, 'active', t[0]);
    },
    m(y, $) {
      O(y, e, $),
        i(e, n),
        i(n, a),
        i(e, o),
        i(e, r),
        i(r, c),
        i(r, u),
        i(r, d),
        i(r, g),
        i(r, p),
        i(p, m),
        i(p, C),
        i(p, v),
        i(p, b),
        i(e, x);
    },
    p(y, $) {
      $ & 1 && f(e, 'active', y[0]);
    },
    d(y) {
      y && H(e);
    },
  };
}
function U2(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x;
  o = new l2({
    props: {
      class: 'w-260px h-300px !rounded-20px',
      data: {
        image:
          'https://s3-alpha-sig.figma.com/img/605f/558f/b698cdfb720a4af9656004861f2a4191?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XZxckn2VMRi-jDWOTxLbzcbxSk9MS4910ygXQpWMFSwf0vE7btS36baMUyVDjd-JtyTbrv9uu6XrPoWih8cP9SFb8sBbITCgnG76-J~Hmb-yZAbd5FxRVa82IqGgm~yM9DATJF1NXz88qjx5dSLQNoE6-LCHI-Ogd2RJLO-GusBH-KThVOTYTj8rV-NH60FR~SQUnfIpugjOg4-zJLEZBZ~I5RWrlD67hOoAI4DqHwm3rsUgJnm~zOFvLLe58csNzjX0hFV6ZXJLK4aJvv~QP4G1ALDSsww32LCltlv5aiWZnmH7wmty8TAtMCmY~3HOBawFbxsXFM2DosS-VHGELQ__',
        name: 'Quán bánh đa cua bể Bà Cụ',
        location: '179 Cầu Đất, Ngô Quyền, Hải Phòng',
        rating: { rate: 5, count: 1e3 },
      },
      mount: t[0],
      $$slots: { action: [J2] },
      $$scope: { ctx: t },
    },
  });
  let y = x1(t[1]),
    $ = [];
  for (let w = 0; w < y.length; w += 1) $[w] = E0(M0(t, y, w));
  return {
    c() {
      (e = h('div')),
        (n = h('div')),
        (a = h('div')),
        (s = h('div')),
        R(o.$$.fragment),
        (r = L()),
        (c = h('div')),
        (u = h('h1')),
        (u.textContent = 'Menu'),
        (d = L()),
        (g = h('div'));
      for (let w = 0; w < $.length; w += 1) $[w].c();
      (p = L()),
        (m = h('div')),
        (C = h('h1')),
        (C.innerHTML =
          'Chúng tôi mang đến <br class="&lt;sm:hidden"/> hình thức mua hoàn toàn mới'),
        (v = L()),
        (b = h('div')),
        (b.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="233" height="9" viewBox="0 0 233 9" fill="none"><path d="M142.823 2.85719C147.655 2.94027 151.191 2.66612 154.413 2.25072C166.316 0.705426 179.159 0.506017 192.718 1.27866C201.623 1.78545 210.931 1.81039 220.104 1.95162C222.163 1.98485 224.356 1.95993 226.28 2.07624C228.204 2.19255 230.083 2.40024 231.56 2.64117C233.798 3.01503 233.35 3.62985 230.755 3.91233C228.159 4.18649 225.519 4.5105 222.7 4.61019C216.927 4.81789 211.244 5.16681 205.068 4.96742C197.774 4.72649 190.346 4.57694 182.962 4.4274C177.548 4.31939 172.312 4.41912 167.435 4.95083C163.318 5.39946 159.111 5.81485 154.77 6.1804C152.086 6.40472 149.177 6.55427 146.268 6.64566C141.838 6.7869 138.124 6.52105 135.439 5.78995C133.112 5.15023 130.516 4.53541 127.921 3.93723C124.162 3.08151 121.209 2.93195 116.331 3.55506C106.531 4.80957 95.6121 5.73179 86.5728 7.20231C83.2614 7.74233 79.2339 8.1411 75.3855 8.55651C69.1206 9.22115 65.4065 9.15467 59.9918 8.24909C56.2329 7.62599 52.9214 6.90321 49.1625 6.2718C46.5223 5.83147 43.6135 5.44929 40.6153 5.09204C37.5724 4.72649 34.3952 4.75143 31.4865 5.19175C26.1614 5.98933 20.7916 6.77857 15.5112 7.58445C13.9003 7.82538 12.5577 8.13278 10.9019 8.37371C7.99324 8.79742 5.30829 8.78911 2.84709 8.37371C-0.151104 7.88354 -0.911709 7.31029 1.1915 6.76196C3.07097 6.27179 5.12925 5.75672 7.7247 5.41609C11.2151 4.96745 13.9897 4.41078 17.0327 3.88738C21.6418 3.09811 27.0564 2.51655 33.0528 2.14269C37.3487 1.87683 41.1523 1.90178 44.8665 2.41688C50.5944 3.21445 56.367 3.99541 62.0949 4.78467C63.0347 4.9176 63.7955 5.10037 64.6905 5.23329C67.4202 5.63208 69.2548 5.68192 71.9845 5.3496C77.4439 4.67665 82.9929 4.02864 88.1838 3.28922C96.2834 2.14271 105.233 1.28696 114.004 0.356464C118.121 -0.0755534 122.506 -0.108753 126.937 0.223568C132.575 0.647278 137.587 1.20392 140.496 2.25904C141.122 2.45012 141.928 2.61626 142.823 2.85719Z" fill="white"></path></svg>'),
        l(s, 'class', 'card relative z-2 svelte-159w4d3'),
        f(s, 'active', t[0]),
        l(a, 'class', 'bg-white w-max rounded-20px op-0 duration-1000'),
        f(a, '!delay-1500', t[0]),
        f(a, '!op-100', t[0]),
        l(u, 'class', 'text-17px font-bold'),
        l(g, 'class', 'flex items-center gap-4'),
        l(
          c,
          'class',
          'bg-white min-w-100px flex flex-col items-start gap-2 rounded-[20px_0px_0px_20px] h-300px p-[18px_20px] op-0 duration-1000',
        ),
        f(c, '!delay-1800', t[0]),
        f(c, '!op-100', t[0]),
        l(n, 'class', 'flex items-stretch gap-4'),
        l(C, 'class', 'text-2rem leading-3rem font-bold op-0 duration-2000ms overflow-y-hidden'),
        f(C, 'delay-2700', t[0]),
        f(C, '!op-100', t[0]),
        l(b, 'class', 'h-4 flex items-center justify-end pr-14 -mt-10 op-0 duration-2000'),
        f(b, 'delay-3000', t[0]),
        f(b, '!op-100', t[0]),
        l(
          e,
          'class',
          'relative z-2 h-[550px] w-2.4/5 rounded-2.5rem flex flex-col justify-between gap-4 bg-#FADCDE duration-[1000ms,_1000ms] op-0 -translate-x-1/5 p-8 pr-0 overflow-hidden',
        ),
        p1(e, 'transition-property', 'transform, opacity'),
        f(e, '!delay-[500ms,_600ms]', t[0]),
        f(e, '!op-100', t[0]),
        f(e, '!translate-x-0', t[0]);
    },
    m(w, k) {
      O(w, e, k),
        i(e, n),
        i(n, a),
        i(a, s),
        T(o, s, null),
        i(n, r),
        i(n, c),
        i(c, u),
        i(c, d),
        i(c, g);
      for (let Z = 0; Z < $.length; Z += 1) $[Z] && $[Z].m(g, null);
      i(e, p), i(e, m), i(m, C), i(e, v), i(e, b), (x = !0);
    },
    p(w, [k]) {
      const Z = {};
      if (
        (k & 1 && (Z.mount = w[0]),
        k & 32 && (Z.$$scope = { dirty: k, ctx: w }),
        o.$set(Z),
        (!x || k & 1) && f(s, 'active', w[0]),
        (!x || k & 1) && f(a, '!delay-1500', w[0]),
        (!x || k & 1) && f(a, '!op-100', w[0]),
        k & 3)
      ) {
        y = x1(w[1]);
        let q;
        for (q = 0; q < y.length; q += 1) {
          const j = M0(w, y, q);
          $[q] ? $[q].p(j, k) : (($[q] = E0(j)), $[q].c(), $[q].m(g, null));
        }
        for (; q < $.length; q += 1) $[q].d(1);
        $.length = y.length;
      }
      (!x || k & 1) && f(c, '!delay-1800', w[0]),
        (!x || k & 1) && f(c, '!op-100', w[0]),
        (!x || k & 1) && f(C, 'delay-2700', w[0]),
        (!x || k & 1) && f(C, '!op-100', w[0]),
        (!x || k & 1) && f(b, 'delay-3000', w[0]),
        (!x || k & 1) && f(b, '!op-100', w[0]),
        (!x || k & 1) && f(e, '!delay-[500ms,_600ms]', w[0]),
        (!x || k & 1) && f(e, '!op-100', w[0]),
        (!x || k & 1) && f(e, '!translate-x-0', w[0]);
    },
    i(w) {
      x || (D(o.$$.fragment, w), (x = !0));
    },
    o(w) {
      z(o.$$.fragment, w), (x = !1);
    },
    d(w) {
      w && H(e), I(o), Y1($, w);
    },
  };
}
function Y2(t, e, n) {
  let { mount: a = !1 } = e;
  const s = [
    {
      image:
        'https://s3-alpha-sig.figma.com/img/9f8f/6fec/85e413a0b48cbee5096fc2247d2d0391?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oGePIO4M1R2GVTCbGvIGDu8B9S-Eg9xOqjI6hPK0HzTbU00Lv-LDHu3BhmSGAQ8i~gh7y~LPBdv-ut40sySO-cvnIvhHXyHAFgn5gqAxTPDEmvV1zQV-3g55k2uNvlKRPVu~9cEtRF55KbEdoe2UVjx2uiZybGrHFoYJm5tybdwSkxAq--P3Cfxyj1jy2Y8ITAasDEZ32x6WFGIAXPitr9PUh9hhIEmUAUxxGVRu0zB0ee9lwR~Sp823Wz5lNfwlZZINK2ASf1l9IxXy5lgW14P6Y9ph-K2ApVHURYmATMSE6~u89vZhLdgFXuJnrTuiMlDVIKOFOkwMYGwfi-2dEw__',
      name: 'Nem cua bể',
      buyCount: 728,
      minPrice: '40.000',
      maxPrice: '50.000',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/5de4/8084/b42e51eac6ea1c3886adca16c3ff96a8?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TJTkeTg794TV-0E0~Lhr11dTMgLDVfbzT7bmm2st6aI2v1TVIk8Ol2DeYeqA8Z9uigooSXhhQybzeIkhcW4VKhxBp2wZf0VspE3TcqWt3ynWz~JFlOfj9vRVoVM2-NzrGcPKSEYSh9EZOQ93j-C8XrTESAnLUypbDRBpX-LZKIWYk5yOwu6~zM08HGzITO1GJ8TGHOtb4DYPO7e9vQmDjiprJROmejOcrB8bCvy6nNUNfPeMj1lDr0DWzeQzqNQ4k7ZJlfcpzQqWXoTLz3nwzHn8nFYRgra3364ZGEuCLXRjvjHfxr3vVJlv1hcA1aFep2ZNFmx3BvUHE4bsa6GnwA__',
      name: 'Nem cua bể',
      buyCount: 728,
      minPrice: '40.000',
      maxPrice: '50.000',
    },
    {
      image:
        'https://s3-alpha-sig.figma.com/img/5de4/8084/b42e51eac6ea1c3886adca16c3ff96a8?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TJTkeTg794TV-0E0~Lhr11dTMgLDVfbzT7bmm2st6aI2v1TVIk8Ol2DeYeqA8Z9uigooSXhhQybzeIkhcW4VKhxBp2wZf0VspE3TcqWt3ynWz~JFlOfj9vRVoVM2-NzrGcPKSEYSh9EZOQ93j-C8XrTESAnLUypbDRBpX-LZKIWYk5yOwu6~zM08HGzITO1GJ8TGHOtb4DYPO7e9vQmDjiprJROmejOcrB8bCvy6nNUNfPeMj1lDr0DWzeQzqNQ4k7ZJlfcpzQqWXoTLz3nwzHn8nFYRgra3364ZGEuCLXRjvjHfxr3vVJlv1hcA1aFep2ZNFmx3BvUHE4bsa6GnwA__',
      name: 'Nem cua bể',
      buyCount: 728,
      minPrice: '40.000',
      maxPrice: '50.000',
    },
  ];
  return (
    (t.$$set = o => {
      'mount' in o && n(0, (a = o.mount));
    }),
    [a, s]
  );
}
class ee extends Q {
  constructor(e) {
    super(), K(this, e, Y2, U2, G, { mount: 0 });
  }
}
function te(t) {
  let e, n, a, s, o, r, c, u, d, g, p;
  return (
    (o = new ee({ props: { mount: t[2] } })),
    (c = new O2({ props: { mount: t[2] } })),
    (g = new V2({ props: { mount: t[2] } })),
    {
      c() {
        (e = h('div')),
          (n = h('h1')),
          (n.innerHTML = 'Đi <span class="text-#FBBD05">du lịch tiết kiệm</span> cùng Avatour'),
          (a = L()),
          (s = h('div')),
          R(o.$$.fragment),
          (r = L()),
          R(c.$$.fragment),
          (u = L()),
          (d = h('div')),
          R(g.$$.fragment),
          l(
            n,
            'class',
            'text-2.5rem leading-3rem font-bold op-0 duration-2000ms overflow-y-hidden',
          ),
          f(n, 'delay-400', t[2]),
          f(n, '!op-100', t[2]),
          l(s, 'class', 'flex-grow flex items-start justify-center gap-4 w-full pb-4'),
          l(d, 'class', 'absolute left-0 top-0 w-full h-full'),
          l(
            e,
            'class',
            'relative w-full h-full flex flex-col justify-center items-center gap-4 pt-5',
          );
      },
      m(m, C) {
        O(m, e, C),
          i(e, n),
          i(e, a),
          i(e, s),
          T(o, s, null),
          i(s, r),
          T(c, s, null),
          i(e, u),
          i(e, d),
          T(g, d, null),
          (p = !0);
      },
      p(m, C) {
        (!p || C & 4) && f(n, 'delay-400', m[2]), (!p || C & 4) && f(n, '!op-100', m[2]);
        const v = {};
        C & 4 && (v.mount = m[2]), o.$set(v);
        const b = {};
        C & 4 && (b.mount = m[2]), c.$set(b);
        const x = {};
        C & 4 && (x.mount = m[2]), g.$set(x);
      },
      i(m) {
        p || (D(o.$$.fragment, m), D(c.$$.fragment, m), D(g.$$.fragment, m), (p = !0));
      },
      o(m) {
        z(o.$$.fragment, m), z(c.$$.fragment, m), z(g.$$.fragment, m), (p = !1);
      },
      d(m) {
        m && H(e), I(o), I(c), I(g);
      },
    }
  );
}
function le(t) {
  let e, n;
  return (
    (e = new Z1({
      props: {
        $$slots: { default: [te, ({ mount: a }) => ({ 2: a }), ({ mount: a }) => (a ? 4 : 0)] },
        $$scope: { ctx: t },
      },
    })),
    e.$on('introend', t[0]),
    e.$on('outroend', t[1]),
    {
      c() {
        R(e.$$.fragment);
      },
      m(a, s) {
        T(e, a, s), (n = !0);
      },
      p(a, [s]) {
        const o = {};
        s & 12 && (o.$$scope = { dirty: s, ctx: a }), e.$set(o);
      },
      i(a) {
        n || (D(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        z(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        I(e, a);
      },
    }
  );
}
function ne(t) {
  function e(a) {
    l1.call(this, t, a);
  }
  function n(a) {
    l1.call(this, t, a);
  }
  return [e, n];
}
class ae extends Q {
  constructor(e) {
    super(), K(this, e, ne, le, G, {});
  }
}
function se(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x, y, $, w, k, Z, q, j;
  return {
    c() {
      (e = h('div')),
        (n = _('svg')),
        (a = _('path')),
        (s = _('rect')),
        (o = L()),
        (r = _('svg')),
        (c = _('g')),
        (u = _('path')),
        (d = _('path')),
        (g = _('defs')),
        (p = _('clipPath')),
        (m = _('rect')),
        (C = L()),
        (v = _('svg')),
        (b = _('g')),
        (x = _('path')),
        (y = _('path')),
        ($ = _('path')),
        (w = _('defs')),
        (k = _('clipPath')),
        (Z = _('rect')),
        l(a, 'class', 'line'),
        l(a, 'stroke', '#FBBD05'),
        l(a, 'stroke-width', '3'),
        l(a, 'stroke-dasharray', '10.7 10.7'),
        l(s, 'x', '0'),
        l(s, 'y', '0'),
        l(s, 'class', 'w-full h-full duration-2000 ease-in'),
        l(s, 'fill', 'white'),
        f(s, '!w-0', t[0]),
        f(s, 'delay-200', t[0]),
        l(n, 'class', 'absolute left-0 top-0 w-full h-full'),
        l(n, 'fill', 'none'),
        l(n, 'xmlns', 'http://www.w3.org/2000/svg'),
        l(
          u,
          'd',
          'M45.5 22.7499C45.5 38.4999 28 50.7499 28 50.7499C28 50.7499 10.5 38.4999 10.5 22.7499C10.5 18.1086 12.3437 13.6574 15.6256 10.3755C18.9075 7.09362 23.3587 5.24988 28 5.24988C32.6413 5.24988 37.0925 7.09362 40.3744 10.3755C43.6563 13.6574 45.5 18.1086 45.5 22.7499Z',
        ),
        l(u, 'fill', '#FBBD05'),
        l(
          d,
          'd',
          'M19.3105 30.137L20.3213 24.0719C20.3876 23.6743 20.4207 23.4755 20.4904 23.2912C20.5523 23.1277 20.6353 22.973 20.7374 22.831C20.8524 22.6711 20.9997 22.5336 21.2944 22.2586L28 16L34.7056 22.2586C35.0002 22.5336 35.1475 22.6711 35.2626 22.831C35.3646 22.973 35.4477 23.1277 35.5095 23.2912C35.5792 23.4755 35.6124 23.6743 35.6786 24.0719L36.6895 30.137C36.7963 30.7779 36.8497 31.0984 36.7569 31.3482C36.6755 31.5674 36.5199 31.7511 36.3171 31.8674C36.0859 32 35.761 32 35.1112 32H33.8868C33.5631 32 33.4012 32 33.2552 31.9542C33.126 31.9138 33.0063 31.8474 32.9035 31.7593C32.7873 31.6597 32.7015 31.5225 32.53 31.248L28 24V30.4C28 30.9601 28 31.2401 27.891 31.454C27.7951 31.6422 27.6421 31.7951 27.454 31.891C27.24 32 26.96 32 26.4 32H20.8887C20.2389 32 19.914 32 19.6829 31.8674C19.48 31.7511 19.3244 31.5674 19.243 31.3482C19.1502 31.0984 19.2036 30.7779 19.3105 30.137Z',
        ),
        l(d, 'fill', 'white'),
        l(c, 'clip-path', 'url(#clip0_4_1724)'),
        l(m, 'width', '56'),
        l(m, 'height', '56'),
        l(m, 'fill', 'white'),
        l(p, 'id', 'clip0_4_1724'),
        l(r, 'class', 'absolute op-0 duration-1000 svelte-agfqpv'),
        l(r, 'width', '56'),
        l(r, 'height', '56'),
        l(r, 'viewBox', '0 0 56 56'),
        l(r, 'fill', 'none'),
        l(r, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(r, '!op-100', t[0]),
        f(r, 'delay-1700', t[0]),
        f(r, 'fly-animation', t[0]),
        l(
          x,
          'd',
          'M45.5 22.7498C45.5 38.4998 28 50.7498 28 50.7498C28 50.7498 10.5 38.4998 10.5 22.7498C10.5 18.1085 12.3437 13.6573 15.6256 10.3754C18.9075 7.0935 23.3587 5.24976 28 5.24976C32.6413 5.24976 37.0925 7.0935 40.3744 10.3754C43.6563 13.6573 45.5 18.1085 45.5 22.7498Z',
        ),
        l(x, 'fill', '#FBBD05'),
        l(
          y,
          'd',
          'M21.5 20.2C21.5 19.0799 21.5 18.5198 21.718 18.092C21.9097 17.7157 22.2157 17.4097 22.592 17.218C23.0198 17 23.5799 17 24.7 17L31.3 17C32.4201 17 32.9802 17 33.408 17.218C33.7843 17.4097 34.0903 17.7157 34.282 18.092C34.5 18.5198 34.5 19.0799 34.5 20.2V23.5C34.5 24.8945 34.5 25.5918 34.3619 26.1672C33.9229 27.9955 32.4955 29.4229 30.6672 29.8619C30.0918 30 29.3945 30 28 30C26.6055 30 25.9082 30 25.3328 29.8619C23.5045 29.4229 22.0771 27.9955 21.6382 26.1672C21.5 25.5918 21.5 24.8945 21.5 23.5L21.5 20.2Z',
        ),
        l(y, 'fill', 'white'),
        l(
          $,
          'd',
          'M34.5 20H35C35.4647 20 35.697 20 35.8902 20.0384C36.6836 20.1962 37.3038 20.8164 37.4616 21.6098C37.5 21.803 37.5 22.0354 37.5 22.5C37.5 22.9646 37.5 23.197 37.4616 23.3902C37.3038 24.1836 36.6836 24.8038 35.8902 24.9616C35.697 25 35.4647 25 35 25H34.5M19 33H37M28 30C26.6055 30 25.9082 30 25.3328 29.8619C23.5045 29.4229 22.0771 27.9955 21.6382 26.1672C21.5 25.5918 21.5 24.8945 21.5 23.5L21.5 20.2C21.5 19.0799 21.5 18.5198 21.718 18.092C21.9097 17.7157 22.2157 17.4097 22.592 17.218C23.0198 17 23.5799 17 24.7 17L31.3 17C32.4201 17 32.9802 17 33.408 17.218C33.7843 17.4097 34.0903 17.7157 34.282 18.092C34.5 18.5198 34.5 19.0799 34.5 20.2V23.5C34.5 24.8945 34.5 25.5918 34.3619 26.1672C33.9229 27.9955 32.4955 29.4229 30.6672 29.8619C30.0918 30 29.3945 30 28 30Z',
        ),
        l($, 'stroke', 'white'),
        l($, 'stroke-width', '1.5'),
        l($, 'stroke-linecap', 'round'),
        l($, 'stroke-linejoin', 'round'),
        l(b, 'clip-path', 'url(#clip0_4_1729)'),
        l(Z, 'width', '56'),
        l(Z, 'height', '56'),
        l(Z, 'fill', 'white'),
        l(k, 'id', 'clip0_4_1729'),
        l(v, 'width', '56'),
        l(v, 'height', '56'),
        l(v, 'class', 'absolute op-0 duration-1000 svelte-agfqpv'),
        l(v, 'viewBox', '0 0 56 56'),
        l(v, 'fill', 'none'),
        l(v, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(v, '!op-100', t[0]),
        f(v, 'delay-300', t[0]),
        f(v, 'fly-animation', t[0]),
        l(e, 'class', 'relative w-full h-full');
    },
    m(F, E) {
      O(F, e, E),
        i(e, n),
        i(n, a),
        i(n, s),
        i(e, o),
        i(e, r),
        i(r, c),
        i(c, u),
        i(c, d),
        i(r, g),
        i(g, p),
        i(p, m),
        i(e, C),
        i(e, v),
        i(v, b),
        i(b, x),
        i(b, y),
        i(b, $),
        i(v, w),
        i(w, k),
        i(k, Z),
        q ||
          ((j = [
            c1(t[1].call(null, n)),
            c1(L0.call(null, r, { left: 258, top: 472 })),
            c1(L0.call(null, v, { left: 1320, top: 35 })),
          ]),
          (q = !0));
    },
    p(F, [E]) {
      E & 1 && f(s, '!w-0', F[0]),
        E & 1 && f(s, 'delay-200', F[0]),
        E & 1 && f(r, '!op-100', F[0]),
        E & 1 && f(r, 'delay-1700', F[0]),
        E & 1 && f(r, 'fly-animation', F[0]),
        E & 1 && f(v, '!op-100', F[0]),
        E & 1 && f(v, 'delay-300', F[0]),
        E & 1 && f(v, 'fly-animation', F[0]);
    },
    i: P,
    o: P,
    d(F) {
      F && H(e), (q = !1), u1(j);
    },
  };
}
const ie = [
    { key: 'M', value: ['1436', '10.5'] },
    { key: 'C', value: ['1375.33', '67.6667', '1253.6', '216.4', '1252', '354'] },
    { key: 'C', value: ['1250', '526', '753', '600.5', '629.5', '584.5'] },
    { key: 'C', value: ['506', '568.5', '216.222', '449.316', '160', '647'] },
  ],
  U1 = { width: 1438, height: 647 };
function L0(t, e) {
  const n = t.parentElement;
  if (!n) return;
  const a = new ResizeObserver(s => {
    const o = s[0].contentRect,
      r = o.width / U1.width,
      c = o.height / U1.height;
    let u = e.left * r;
    o.width - u < 66 && (u = o.width - 66),
      (t.style.left = `${u}px`),
      (t.style.top = `${e.top * c}px`);
  });
  return (
    a.observe(n),
    {
      destroy() {
        a.disconnect();
      },
    }
  );
}
function re(t, e, n) {
  let { mount: a = !1 } = e;
  function s(r) {
    const c = new ResizeObserver(u => {
      const d = u[0].contentRect,
        g = ie.reduce((m, C) => m + ' ' + o(d, C), ''),
        p = r.querySelector('path.line');
      p && p.setAttribute('d', g);
    });
    return (
      c.observe(r),
      {
        destroy() {
          c.disconnect();
        },
      }
    );
  }
  function o(r, c) {
    const u = r.width / U1.width,
      d = r.height / U1.height;
    return c.key + c.value.map((g, p) => (p % 2 === 0 ? J1(g, 0) * u : J1(g, 0) * d)).join(' ');
  }
  return (
    (t.$$set = r => {
      'mount' in r && n(0, (a = r.mount));
    }),
    [a, s]
  );
}
class oe extends Q {
  constructor(e) {
    super(), K(this, e, re, se, G, { mount: 0 });
  }
}
function ce(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v;
  return {
    c() {
      (e = h('span')),
        (n = _('svg')),
        (a = _('g')),
        (s = _('path')),
        (o = _('defs')),
        (r = _('clipPath')),
        (c = _('rect')),
        (u = L()),
        (d = _('svg')),
        (g = _('g')),
        (p = _('path')),
        (m = _('defs')),
        (C = _('clipPath')),
        (v = _('rect')),
        l(
          s,
          'd',
          'M23.9299 20.3711C23.8115 19.24 23.7523 18.6744 23.9515 18.3747C24.1245 18.1143 24.4094 17.9499 24.7213 17.9302C25.0805 17.9076 25.5407 18.2416 26.4611 18.9097L33.792 24.231C34.064 24.4285 34.2001 24.5273 34.3506 24.5761C34.4838 24.6194 34.6245 24.6342 34.7638 24.6196C34.9212 24.603 35.0748 24.5347 35.382 24.3981L43.6591 20.7173C44.6982 20.2551 45.2178 20.0241 45.5644 20.1209C45.8655 20.205 46.1099 20.4251 46.225 20.7157C46.3576 21.0503 46.1821 21.5912 45.8311 22.673L43.0356 31.2895C42.9318 31.6093 42.88 31.7692 42.88 31.9274C42.88 32.0674 42.9094 32.2059 42.9664 32.3338C43.0307 32.4784 43.1431 32.6034 43.368 32.8533L49.4265 39.5878C50.1871 40.4333 50.5674 40.8561 50.5824 41.2156C50.5954 41.528 50.4617 41.8284 50.2208 42.0277C49.9436 42.2572 49.3749 42.2574 48.2377 42.2579L39.179 42.2618C38.8428 42.262 38.6747 42.2621 38.5242 42.311C38.3911 42.3543 38.2685 42.4251 38.1644 42.5187C38.0468 42.6246 37.9627 42.7702 37.7944 43.0612L33.2617 50.9043C32.6927 51.8889 32.4081 52.3813 32.0708 52.5067C31.7778 52.6156 31.4507 52.5812 31.1867 52.4137C30.8828 52.221 30.7069 51.6802 30.355 50.5988L27.5519 41.9847C27.4479 41.665 27.3959 41.5052 27.3028 41.3771C27.2205 41.2639 27.1153 41.1692 26.9941 41.0991C26.857 41.02 26.6926 40.985 26.3638 40.9149L17.5039 39.0277C16.3916 38.7907 15.8355 38.6723 15.612 38.3902C15.4178 38.1452 15.3495 37.8235 15.4271 37.5207C15.5166 37.1721 15.9765 36.8376 16.8963 36.1688L24.2225 30.841C24.4944 30.6433 24.6304 30.5444 24.7234 30.4164C24.8057 30.3031 24.8633 30.1738 24.8924 30.0368C24.9253 29.882 24.9078 29.7149 24.8728 29.3805L23.9299 20.3711Z',
        ),
        l(s, 'stroke', '#FBBD05'),
        l(s, 'stroke-width', '4'),
        l(s, 'stroke-linecap', 'round'),
        l(s, 'stroke-linejoin', 'round'),
        l(a, 'clip-path', 'url(#clip0_4_1791)'),
        l(c, 'width', '48'),
        l(c, 'height', '48'),
        l(c, 'fill', 'white'),
        l(c, 'transform', 'translate(0 24) rotate(-30)'),
        l(r, 'id', 'clip0_4_1791'),
        l(n, 'width', '1em'),
        l(n, 'height', '1em'),
        l(n, 'viewBox', '0 0 66 66'),
        l(n, 'class', 'inline-block -mt-2 svelte-1qrph6e'),
        l(n, 'fill', 'none'),
        l(n, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(n, 'mount', t[0]),
        l(
          p,
          'd',
          'M23.9299 20.3711C23.8115 19.24 23.7523 18.6744 23.9515 18.3747C24.1245 18.1143 24.4094 17.9499 24.7213 17.9302C25.0805 17.9076 25.5407 18.2416 26.4611 18.9097L33.792 24.231C34.064 24.4285 34.2001 24.5273 34.3506 24.5761C34.4838 24.6194 34.6245 24.6342 34.7638 24.6196C34.9212 24.603 35.0748 24.5347 35.382 24.3981L43.6591 20.7173C44.6982 20.2551 45.2178 20.0241 45.5644 20.1209C45.8655 20.205 46.1099 20.4251 46.225 20.7157C46.3576 21.0503 46.1821 21.5912 45.8311 22.673L43.0356 31.2895C42.9318 31.6093 42.88 31.7692 42.88 31.9274C42.88 32.0674 42.9094 32.2059 42.9664 32.3338C43.0307 32.4784 43.1431 32.6034 43.368 32.8533L49.4265 39.5878C50.1871 40.4333 50.5674 40.8561 50.5824 41.2156C50.5954 41.528 50.4617 41.8284 50.2208 42.0277C49.9436 42.2572 49.3749 42.2574 48.2377 42.2579L39.179 42.2618C38.8428 42.262 38.6747 42.2621 38.5242 42.311C38.3911 42.3543 38.2685 42.4251 38.1644 42.5187C38.0468 42.6246 37.9627 42.7702 37.7944 43.0612L33.2617 50.9043C32.6927 51.8889 32.4081 52.3813 32.0708 52.5067C31.7778 52.6156 31.4507 52.5812 31.1867 52.4137C30.8828 52.221 30.7069 51.6802 30.355 50.5988L27.5519 41.9847C27.4479 41.665 27.3959 41.5052 27.3028 41.3771C27.2205 41.2639 27.1153 41.1692 26.9941 41.0991C26.857 41.02 26.6926 40.985 26.3638 40.9149L17.5039 39.0277C16.3916 38.7907 15.8355 38.6723 15.612 38.3902C15.4178 38.1452 15.3495 37.8235 15.4271 37.5207C15.5166 37.1721 15.9765 36.8376 16.8963 36.1688L24.2225 30.841C24.4944 30.6433 24.6304 30.5444 24.7234 30.4164C24.8057 30.3031 24.8633 30.1738 24.8924 30.0368C24.9253 29.882 24.9078 29.7149 24.8728 29.3805L23.9299 20.3711Z',
        ),
        l(p, 'stroke', '#FBBD05'),
        l(p, 'stroke-width', 'var(--stroke-width)'),
        l(p, 'stroke-linecap', 'round'),
        l(p, 'stroke-linejoin', 'round'),
        l(g, 'clip-path', 'url(#clip0_4_1791)'),
        l(v, 'width', '48'),
        l(v, 'height', '48'),
        l(v, 'fill', 'white'),
        l(v, 'transform', 'translate(0 24) rotate(-30)'),
        l(C, 'id', 'clip0_4_1791'),
        l(d, 'width', '1em'),
        l(d, 'height', '1em'),
        l(d, 'viewBox', '0 0 66 66'),
        l(d, 'class', 'star-animate inline-block -mt-2 absolute svelte-1qrph6e'),
        l(d, 'fill', 'none'),
        l(d, 'xmlns', 'http://www.w3.org/2000/svg'),
        f(d, 'mount', t[0]),
        l(e, 'class', 'relative text-48px inline-flex items-center justify-center');
    },
    m(b, x) {
      O(b, e, x),
        i(e, n),
        i(n, a),
        i(a, s),
        i(n, o),
        i(o, r),
        i(r, c),
        i(e, u),
        i(e, d),
        i(d, g),
        i(g, p),
        i(d, m),
        i(m, C),
        i(C, v);
    },
    p(b, [x]) {
      x & 1 && f(n, 'mount', b[0]), x & 1 && f(d, 'mount', b[0]);
    },
    i: P,
    o: P,
    d(b) {
      b && H(e);
    },
  };
}
function ue(t, e, n) {
  let { mount: a = !1 } = e;
  return (
    (t.$$set = s => {
      'mount' in s && n(0, (a = s.mount));
    }),
    [a]
  );
}
class fe extends Q {
  constructor(e) {
    super(), K(this, e, ue, ce, G, { mount: 0 });
  }
}
const de = '/assets/phone-2-L_9lFg8U.png';
function pe(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x, y, $, w, k, Z, q, j, F, E, M, A;
  return (
    (a = new oe({ props: { mount: t[2] } })),
    (m = new fe({ props: { mount: t[2] } })),
    ($ = new l2({
      props: {
        mount: t[2],
        data: {
          image:
            'https://s3-alpha-sig.figma.com/img/d573/baf7/9fd70ee9613aabea8a4f64d67d573ce2?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i0GS3J-Smgjbx~E3tVtMJa7Y3rkbyqM8yoog1vNPL1aqJnyzrak6~kznjxT8Qpb3A7Vr7zUc5sScBce1FoaVa2bw3rS7twHt0zreA5zk1WwifxjUD2zsPGKE9xjnEnPzrs9IRPkQFOlGypEl-3rQczlVDYEJK24EckYlD-hsPfv60kj57B6FwA8Jglcq3QJhmrQegwTrPx-t6N5k-OxmAWtVzWb4jDHnSkm6L5CsA6kAMMagxfN4THlOBDmX1~HZltvSdF-lcKvo2gangeJQ6u7mIB30MQloYesSLzKGFECaLIJtGydZ3O1mQJrZys1Dw9e-hyNpPSNkEbfLqBYc9g__',
          name: 'Rạn Nam Ô',
          location: 'Quận Liên Chiểu, TP. Đà Nẵng',
          rating: { rate: 4.8, count: 2e3 },
          action: 'Bắt đầu ngay',
        },
      },
    })),
    {
      c() {
        (e = h('div')),
          (n = h('div')),
          R(a.$$.fragment),
          (s = L()),
          (o = h('div')),
          (r = h('div')),
          (c = h('div')),
          (u = h('h1')),
          (d = J('Tự tạo ')),
          (g = h('span')),
          (g.textContent = 'lịch trình theo ý muốn'),
          (p = L()),
          R(m.$$.fragment),
          (C = L()),
          (v = h('p')),
          (v.textContent = `Cảm thấy gò bó với lịch trình có sẵn? Bạn hoàn toàn có thể chỉnh sửa và tạo những dấu ấn\r
            của riêng mình trên hành trình du lịch. Hãy bắt đầu và chia sẻ với bạn bè ngay thôi!`),
          (b = L()),
          (x = h('div')),
          (y = h('div')),
          R($.$$.fragment),
          (w = L()),
          (k = h('div')),
          (Z = h('div')),
          (q = h('img')),
          (F = L()),
          (E = h('img')),
          l(n, 'class', 'absolute w-full h-full'),
          l(g, 'class', 'text-#FBBD05'),
          l(
            u,
            'class',
            'text-3rem font-bold op-0 duration-[2000ms,_1000ms] h-115px overflow-y-hidden leading-7rem',
          ),
          p1(u, 'transition-property', 'opacity, line-height'),
          f(u, 'delay-[400ms,_2000ms]', t[2]),
          f(u, '!op-100', t[2]),
          f(u, '!leading-3.5rem', t[2]),
          l(v, 'class', 'op-0 duration-2000'),
          f(v, 'delay-800', t[2]),
          f(v, '!op-100', t[2]),
          l(y, 'class', 'absolute top-0 left-0 flex items-center h-300px'),
          l(x, 'class', 'relative h-[200px] w-200px min-h-20 scale-0 op-0 duration-1000'),
          f(x, 'delay-1000', t[2]),
          f(x, '!scale-100', t[2]),
          f(x, '!op-100', t[2]),
          l(c, 'class', 'flex flex-col gap-6 items-end justify-center h-full max-w-500px'),
          l(r, 'class', 'w-2.2/5 h-full flex justify-end'),
          l(q, 'class', 'w-full h-full object-cover'),
          w1(
            q.src,
            (j =
              'https://s3-alpha-sig.figma.com/img/339c/6140/651bdb0a56a7428c1dba7601155e9236?Expires=1705276800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DEet4nwR94j3Zktwu9blUb77Mmstc7q4oQwOwE8-CUuMVM8geqCvHOCA6p9uiehmWKBPuynRnR8lc8G-kcK8n5UlMUk3HWALObEaSsRU7ZUfaCKMK-RUOe2psJS0SEMc9poKfx3M1qpgYz5lAvmf~Xkt7~T51IJNaaqvgsVEHrSHYjXIW9JTlgJx6BRHwJDEsISiiCEyIDufkhODxu-WEjQAgznsrhpMitrdgKZsOh7s38tZOwWceQNmqmxq5VMFL6x3H8KuFyfKzrx1qxOJ8bq-FDOkstgkNt2gU6cWnB8tQ1m66SynvRk1NIr19mgxEG03hp974766p-NxN53t8w__'),
          ) || l(q, 'src', j),
          l(q, 'alt', ''),
          l(
            E,
            'class',
            'absolute w-344px h-660px bottom-0 translate-y-25% op-0 duration-1000 scale-[7.3] origin-[74px_336px]',
          ),
          w1(E.src, (M = de)) || l(E, 'src', M),
          l(E, 'alt', ''),
          f(E, 'delay-1700', t[2]),
          f(E, 'scale-100', t[2]),
          f(E, '!op-100', t[2]),
          l(
            Z,
            'class',
            'relative w-570px h-580px rounded-36px overflow-hidden flex items-center justify-center op-0 scale-0 duration-1000',
          ),
          f(Z, 'delay-600', t[2]),
          f(Z, '!scale-100', t[2]),
          f(Z, '!op-100', t[2]),
          l(k, 'class', 'w-2.35/5 flex items-center justify-start'),
          l(o, 'class', 'relative flex items-center justify-between h-full z-1'),
          l(e, 'class', 'relative w-full h-full');
      },
      m(B, N) {
        O(B, e, N),
          i(e, n),
          T(a, n, null),
          i(e, s),
          i(e, o),
          i(o, r),
          i(r, c),
          i(c, u),
          i(u, d),
          i(u, g),
          i(u, p),
          T(m, u, null),
          i(c, C),
          i(c, v),
          i(c, b),
          i(c, x),
          i(x, y),
          T($, y, null),
          i(o, w),
          i(o, k),
          i(k, Z),
          i(Z, q),
          i(Z, F),
          i(Z, E),
          (A = !0);
      },
      p(B, N) {
        const n1 = {};
        N & 4 && (n1.mount = B[2]), a.$set(n1);
        const a1 = {};
        N & 4 && (a1.mount = B[2]),
          m.$set(a1),
          (!A || N & 4) && f(u, 'delay-[400ms,_2000ms]', B[2]),
          (!A || N & 4) && f(u, '!op-100', B[2]),
          (!A || N & 4) && f(u, '!leading-3.5rem', B[2]),
          (!A || N & 4) && f(v, 'delay-800', B[2]),
          (!A || N & 4) && f(v, '!op-100', B[2]);
        const m1 = {};
        N & 4 && (m1.mount = B[2]),
          $.$set(m1),
          (!A || N & 4) && f(x, 'delay-1000', B[2]),
          (!A || N & 4) && f(x, '!scale-100', B[2]),
          (!A || N & 4) && f(x, '!op-100', B[2]),
          (!A || N & 4) && f(E, 'delay-1700', B[2]),
          (!A || N & 4) && f(E, 'scale-100', B[2]),
          (!A || N & 4) && f(E, '!op-100', B[2]),
          (!A || N & 4) && f(Z, 'delay-600', B[2]),
          (!A || N & 4) && f(Z, '!scale-100', B[2]),
          (!A || N & 4) && f(Z, '!op-100', B[2]);
      },
      i(B) {
        A || (D(a.$$.fragment, B), D(m.$$.fragment, B), D($.$$.fragment, B), (A = !0));
      },
      o(B) {
        z(a.$$.fragment, B), z(m.$$.fragment, B), z($.$$.fragment, B), (A = !1);
      },
      d(B) {
        B && H(e), I(a), I(m), I($);
      },
    }
  );
}
function he(t) {
  let e, n;
  return (
    (e = new Z1({
      props: {
        $$slots: { default: [pe, ({ mount: a }) => ({ 2: a }), ({ mount: a }) => (a ? 4 : 0)] },
        $$scope: { ctx: t },
      },
    })),
    e.$on('introend', t[0]),
    e.$on('outroend', t[1]),
    {
      c() {
        R(e.$$.fragment);
      },
      m(a, s) {
        T(e, a, s), (n = !0);
      },
      p(a, [s]) {
        const o = {};
        s & 12 && (o.$$scope = { dirty: s, ctx: a }), e.$set(o);
      },
      i(a) {
        n || (D(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        z(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        I(e, a);
      },
    }
  );
}
function me(t) {
  function e(a) {
    l1.call(this, t, a);
  }
  function n(a) {
    l1.call(this, t, a);
  }
  return [e, n];
}
class ge extends Q {
  constructor(e) {
    super(), K(this, e, me, he, G, {});
  }
}
function ve(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x, y, $, w, k, Z, q, j;
  return {
    c() {
      (e = _('svg')),
        (n = _('defs')),
        (a = _('clipPath')),
        (s = _('rect')),
        (o = _('clipPath')),
        (r = _('rect')),
        (c = _('title')),
        (u = J('Road (Stroke) 2')),
        (d = _('g')),
        (g = _('rect')),
        (m = _('path')),
        (C = _('path')),
        (v = _('g')),
        (b = _('g')),
        (x = _('path')),
        (y = _('path')),
        ($ = _('path')),
        (w = _('g')),
        (k = _('g')),
        (Z = _('path')),
        (q = _('path')),
        (j = _('path')),
        l(s, 'class', 'cls-1 svelte-cmk3rx'),
        l(s, 'x', '878.61'),
        l(s, 'y', '68.16'),
        l(s, 'width', '56'),
        l(s, 'height', '56'),
        l(a, 'id', 'clip-path'),
        l(r, 'class', 'cls-1 svelte-cmk3rx'),
        l(r, 'x', '1542.8'),
        l(r, 'y', '362.82'),
        l(r, 'width', '56'),
        l(r, 'height', '56'),
        l(o, 'id', 'clip-path-2'),
        l(g, 'class', 'base svelte-cmk3rx'),
        l(g, 'x', '1'),
        l(g, 'y', '1'),
        l(g, 'width', (p = t[0] ? 'calc(100% - 10px)' : '0')),
        l(g, 'height', 'calc(100% - 5px)'),
        l(g, 'fill', '#fbbd05'),
        f(g, 'delay-100', t[0]),
        l(m, 'class', 'cls-2 svelte-cmk3rx'),
        l(
          m,
          'd',
          'M1646.48,421.43a1.54,1.54,0,0,1,.07-.68,1.65,1.65,0,0,1-.07-.32,1.49,1.49,0,0,1,1.3-1.67l1.87-.23.35,0V0H0V500H1650V422.5l-1.85.24A1.5,1.5,0,0,1,1646.48,421.43ZM17.62,286.12q-3.86,4-7.55,7.64A2,2,0,0,1,8,290.63c2.45-2.41,4.94-4.95,7.5-7.59a2,2,0,0,1,2.16,3.08Zm14.66-15.57q-3.72,4-7.29,7.82a1.5,1.5,0,0,1-2.5-1.56,1.47,1.47,0,0,1,.31-1.49q3.57-3.81,7.28-7.81a1.5,1.5,0,0,1,2.5,1.55A1.47,1.47,0,0,1,32.28,270.55ZM46.85,254.9q-3.72,4-7.29,7.81a2,2,0,0,1-2.2-3c2.38-2.56,4.82-5.18,7.3-7.82a2,2,0,0,1,2.19,3.05Zm14.74-15.43q-3.77,3.85-7.39,7.66a1.51,1.51,0,0,1-2.13.05,3.75,3.75,0,0,1,0-3.12q3.63-3.81,7.42-7.69a1.5,1.5,0,0,1,2.12,0,1.47,1.47,0,0,1,.35,1.58A1.49,1.49,0,0,1,61.59,239.47Zm15.12-15q-3.88,3.74-7.62,7.45A2,2,0,0,1,67,228.77q3.75-3.74,7.65-7.49a1.5,1.5,0,0,1,2.12.05,1.46,1.46,0,0,1,.33,1.51A1.51,1.51,0,0,1,76.71,224.45ZM92.37,210c-2.68,2.38-5.32,4.78-7.9,7.17a1.51,1.51,0,0,1-2.12-.08,3.76,3.76,0,0,1,.08-3.12q3.9-3.62,7.95-7.21a1.5,1.5,0,0,1,2.12.13,1.47,1.47,0,0,1,.28,1.48A1.5,1.5,0,0,1,92.37,210Zm16.26-13.77q-4.17,3.36-8.2,6.78a1.49,1.49,0,0,1-2.11-.18,1.45,1.45,0,0,1-.26-1.46,1.49,1.49,0,0,1,.43-1.65q4.07-3.44,8.26-6.82a1.5,1.5,0,0,1,2.11.22,3.66,3.66,0,0,1-.23,3.11Zm16.92-12.92q-4.35,3.15-8.55,6.35a2,2,0,0,1-1.82-3.38q4.23-3.24,8.62-6.4a1.5,1.5,0,0,1,2.28,1.73A1.47,1.47,0,0,1,125.55,183.27Zm17.63-12q-4.52,2.88-8.89,5.84a2.06,2.06,0,0,1-1.69-3.48q4.41-3,9-5.89a1.51,1.51,0,0,1,2.08.46,1.54,1.54,0,0,1,.14,1.3A1.49,1.49,0,0,1,143.18,171.32Zm18.3-10.83q-4.69,2.58-9.24,5.28a2.06,2.06,0,0,1-1.53-3.58q4.59-2.73,9.33-5.33a2.07,2.07,0,0,1,1.44,3.63Zm19-9.62q-4.85,2.25-9.54,4.64a1.51,1.51,0,0,1-2-.66,1.44,1.44,0,0,1-.07-1.18,1.5,1.5,0,0,1,.73-1.84q4.74-2.4,9.63-4.68a2.09,2.09,0,0,1,1.27,3.72Zm19.59-8.33q-5,1.94-9.89,4a1.49,1.49,0,0,1-2-.79,1.47,1.47,0,0,1,0-1.09,1.5,1.5,0,0,1,.82-1.88q4.92-2.09,10-4a1.5,1.5,0,0,1,1.94.86,1.55,1.55,0,0,1,0,1A1.5,1.5,0,0,1,200.05,142.54Zm21.06-8.81a1.5,1.5,0,0,1-1,1.87q-5.13,1.58-10.1,3.3a1.5,1.5,0,0,1-1.9-1.91v0a1.49,1.49,0,0,1,.92-1.91c3.35-1.15,6.75-2.27,10.2-3.33a1.5,1.5,0,0,1,1.85,1.94A.14.14,0,0,0,221.11,133.73Zm19.55-3.68q-5.22,1.22-10.28,2.59a1.5,1.5,0,0,1-1.84-1.06,1.45,1.45,0,0,1,0-.9.3.3,0,0,1,0-.1,1.49,1.49,0,0,1,1.05-1.84q5.13-1.38,10.38-2.61a1.49,1.49,0,0,1,1.8,1.12,1.45,1.45,0,0,1-.05.85.88.88,0,0,1,.05.15A1.5,1.5,0,0,1,240.66,130.05Zm20.9-4.15q-5.32.87-10.51,1.9a1.48,1.48,0,0,1-1.7-2,1.29,1.29,0,0,1-.07-.21,1.5,1.5,0,0,1,1.18-1.76c3.49-.69,7-1.34,10.61-1.92a1.48,1.48,0,0,1,1.72,1.23,1.42,1.42,0,0,1-.07.74,1.11,1.11,0,0,1,.07.26A1.5,1.5,0,0,1,261.56,125.9ZM284,121.49a1.51,1.51,0,0,1-1.35,1.64q-5.37.53-10.61,1.22a1.5,1.5,0,0,1-1.69-1.29,1.45,1.45,0,0,1,.08-.69,1.57,1.57,0,0,1-.08-.31,1.51,1.51,0,0,1,1.29-1.69q5.3-.69,10.72-1.23a1.51,1.51,0,0,1,1.64,1.35,1.39,1.39,0,0,1-.09.64A2.11,2.11,0,0,1,284,121.49Zm21.29-1.37a1.5,1.5,0,0,1-1.44,1.56c-3.59.14-7.13.32-10.63.56a1.49,1.49,0,0,1-1.6-1.39,1.53,1.53,0,0,1,.08-.61,1.59,1.59,0,0,1-.08-.39,1.49,1.49,0,0,1,1.39-1.6c3.54-.24,7.11-.43,10.73-.57a1.5,1.5,0,0,1,1.55,1.44,1.37,1.37,0,0,1-.09.57A1.27,1.27,0,0,1,305.28,120.12Zm21.36-.11a1.5,1.5,0,0,1-1.53,1.47q-5.37-.09-10.62,0a1.49,1.49,0,0,1-1.51-1.49,1.44,1.44,0,0,1,.09-.51,1.33,1.33,0,0,1-.09-.49,1.49,1.49,0,0,1,1.48-1.51q5.3,0,10.71,0a1.51,1.51,0,0,1,1.47,1.53,1.78,1.78,0,0,1-.09.47A1.6,1.6,0,0,1,326.64,120ZM348,121.08a1.49,1.49,0,0,1-1.6,1.38q-5.34-.37-10.58-.63a1.49,1.49,0,0,1-1.43-1.56,1.43,1.43,0,0,1,.09-.42,1.6,1.6,0,0,1-.09-.58,1.5,1.5,0,0,1,1.57-1.43q5.28.24,10.66.63a1.5,1.5,0,0,1,1.38,1.61,1.61,1.61,0,0,1-.08.38A1.42,1.42,0,0,1,348,121.08Zm21.26,1.15a1.65,1.65,0,0,1-.07.32,1.54,1.54,0,0,1,.07.68,1.49,1.49,0,0,1-1.67,1.3q-5.31-.65-10.52-1.16a1.5,1.5,0,0,1-1.35-1.64,1.37,1.37,0,0,1,.08-.35,1.55,1.55,0,0,1-.08-.65,1.5,1.5,0,0,1,1.64-1.34q5.25.51,10.6,1.17A1.48,1.48,0,0,1,369.23,122.23Zm21.15,4.15a1.5,1.5,0,0,1-1.73,1.23q-5.29-.9-10.48-1.65a1.5,1.5,0,0,1-1.27-1.7,1.47,1.47,0,0,1,.08-.3,1.48,1.48,0,0,1,1.62-2q5.23.77,10.55,1.66a1.5,1.5,0,0,1,1.23,1.73,1.82,1.82,0,0,1-.07.25A1.58,1.58,0,0,1,390.38,126.38Zm21.14,4a1.49,1.49,0,0,1-1.75,1.19c-1.75-.33-3.52-.68-5.29-1l-5.32-1.05a1.51,1.51,0,0,1-1.2-1.76c0-.07.05-.14.07-.22a1.46,1.46,0,0,1-.07-.78,1.52,1.52,0,0,1,1.76-1.19c1.78.34,3.56.69,5.36,1.06l5.25,1a1.49,1.49,0,0,1,1.19,1.75.79.79,0,0,1-.06.22A1.37,1.37,0,0,1,411.52,130.39Zm20.92,3.45a1.51,1.51,0,0,1-1.7,1.27q-5.22-.77-10.54-1.65a1.5,1.5,0,0,1-1.23-1.73,2,2,0,0,1,.07-.26,1.53,1.53,0,0,1-.07-.74,1.5,1.5,0,0,1,1.73-1.23q5.28.88,10.47,1.64a1.5,1.5,0,0,1,1.27,1.7,1.37,1.37,0,0,1-.07.29A1.53,1.53,0,0,1,432.44,133.84Zm21,2.47a1.5,1.5,0,0,1-1.64,1.35c-3.5-.34-7.05-.73-10.62-1.16a1.5,1.5,0,0,1-1.31-1.67,1.32,1.32,0,0,1,.08-.33,1.37,1.37,0,0,1-.08-.67,1.5,1.5,0,0,1,1.67-1.31q5.32.64,10.55,1.15a1.5,1.5,0,0,1,1.35,1.64,1.37,1.37,0,0,1-.08.35A1.57,1.57,0,0,1,453.47,136.31Zm21.09,1.45a1.5,1.5,0,0,1-1.57,1.43q-5.24-.25-10.57-.64A1.49,1.49,0,0,1,461,137a1.69,1.69,0,0,1,.08-.39A1.53,1.53,0,0,1,461,136a1.5,1.5,0,0,1,1.6-1.39q5.31.39,10.5.63a1.5,1.5,0,0,1,1.43,1.57,1.4,1.4,0,0,0,0,1Zm21.21.39a1.51,1.51,0,0,1-1.49,1.51q-5.25,0-10.62-.1a1.51,1.51,0,0,1-1.47-1.53,1.46,1.46,0,0,1,.1-.47,1.47,1.47,0,0,1,1.44-2q5.32.12,10.53.1a1.49,1.49,0,0,1,1.51,1.49,1.71,1.71,0,0,1-.09.51A1.58,1.58,0,0,1,495.77,138.15Zm21.18-.7a1.49,1.49,0,0,1-1.41,1.58c-3.52.19-7.07.35-10.66.45a1.51,1.51,0,0,1-1.55-1.45,1.63,1.63,0,0,1,.09-.55,1.71,1.71,0,0,1-.09-.45,1.51,1.51,0,0,1,1.46-1.55c3.57-.1,7.09-.25,10.58-.45a1.5,1.5,0,0,1,1.58,1.42,1.62,1.62,0,0,1-.08.59A1.86,1.86,0,0,1,517,137.45Zm19.74-.14q-5.21.57-10.55,1a1.5,1.5,0,0,1-1.61-1.38,1.42,1.42,0,0,1,.08-.62,1.61,1.61,0,0,1-.08-.38,1.49,1.49,0,0,1,1.37-1.61q5.29-.44,10.48-1a1.5,1.5,0,0,1,1.65,1.33,1.6,1.6,0,0,1-.08.66,3.38,3.38,0,0,1,.08.34A1.5,1.5,0,0,1,536.69,137.31Zm21.11-2.78q-5.2.81-10.53,1.52a1.51,1.51,0,0,1-1.69-1.29,1.46,1.46,0,0,1,.08-.69,1.57,1.57,0,0,1-.08-.31,1.49,1.49,0,0,1,1.29-1.68q5.29-.71,10.47-1.52a1.49,1.49,0,0,1,1.64,2,1.19,1.19,0,0,1,.07.27A1.5,1.5,0,0,1,557.8,134.53Zm20.9-3.79q-5.16,1.06-10.42,2a1.49,1.49,0,0,1-1.74-1.21,1.5,1.5,0,0,1,.06-.76,1.68,1.68,0,0,1-.06-.24,1.5,1.5,0,0,1,1.2-1.74q5.24-.95,10.36-2a1.49,1.49,0,0,1,1.77,1.16,1.58,1.58,0,0,1-.07.81,1.46,1.46,0,0,1,.07.19A1.5,1.5,0,0,1,578.7,130.74Zm20.73-4.68q-5.11,1.26-10.36,2.45a1.49,1.49,0,0,1-1.73-2,1,1,0,0,1-.06-.16,1.51,1.51,0,0,1,1.13-1.8q5.21-1.17,10.3-2.44a1.5,1.5,0,0,1,1.77,2,1.12,1.12,0,0,1,0,.13A1.51,1.51,0,0,1,599.43,126.06Zm21.57-7.3a1.49,1.49,0,0,1-1,1.85q-5.06,1.42-10.24,2.81a1.5,1.5,0,0,1-1.79-2s0-.07,0-.11a1.49,1.49,0,0,1,1.07-1.83c3.43-.91,6.83-1.85,10.19-2.79a1.5,1.5,0,0,1,1.82,1.94Zm20.3-6a1.5,1.5,0,0,1-1,1.87q-5,1.55-10.15,3.06a1.5,1.5,0,0,1-1.87-1,1.55,1.55,0,0,1,0-.93l0-.07a1.5,1.5,0,0,1,1-1.86q5.12-1.52,10.12-3.06a1.51,1.51,0,0,1,1.88,1,1.44,1.44,0,0,1,0,.94Zm20.19-6.36a1.49,1.49,0,0,1-1,1.88l-10.1,3.2a1.5,1.5,0,0,1-1.88-1,1.54,1.54,0,0,1,0-1l0,0a1.5,1.5,0,0,1,1-1.88l10.09-3.2a1.5,1.5,0,0,1,1.88,1,1.41,1.41,0,0,1,0,.95S661.49,106.35,661.49,106.37ZM681.7,100a1.48,1.48,0,0,1-1,1.87L670.62,105a1.51,1.51,0,0,1-1.89-1,1.46,1.46,0,0,1,0-1l0,0a1.51,1.51,0,0,1,1-1.89L679.82,98a1.49,1.49,0,0,1,1.88,1,1.44,1.44,0,0,1,0,.94A.14.14,0,0,1,681.7,100ZM702,93.9a1.49,1.49,0,0,1-1,1.85q-5,1.44-10.15,3a1.5,1.5,0,0,1-1.87-1,1.55,1.55,0,0,1,0-.93l0-.07a1.5,1.5,0,0,1,1-1.87q5.13-1.55,10.19-3a1.49,1.49,0,0,1,1.85,1,1.52,1.52,0,0,1,0,.92Zm19.39-3.45q-5.08,1.17-10.24,2.52a1.5,1.5,0,0,1-1.79-2s0-.07,0-.11a1.5,1.5,0,0,1,1.08-1.83q5.19-1.36,10.32-2.55a1.51,1.51,0,0,1,1.8,1.13,1.49,1.49,0,0,1,0,.84.75.75,0,0,1,0,.16A1.51,1.51,0,0,1,721.4,90.45Zm20.68-4q-5.16.75-10.37,1.76A1.51,1.51,0,0,1,730,87.07a1.46,1.46,0,0,1,.07-.78,1.42,1.42,0,0,1-.07-.22,1.52,1.52,0,0,1,1.19-1.76q5.28-1,10.51-1.78a1.5,1.5,0,0,1,1.7,1.26,1.41,1.41,0,0,1-.07.71,1.53,1.53,0,0,1,.07.29A1.51,1.51,0,0,1,742.08,86.5ZM764.46,83A1.5,1.5,0,0,1,763,84.59q-5.24.16-10.48.65a1.49,1.49,0,0,1-1.63-1.35,1.37,1.37,0,0,1,.08-.64,1.55,1.55,0,0,1-.08-.36,1.5,1.5,0,0,1,1.35-1.64c3.56-.33,7.11-.55,10.67-.66A1.49,1.49,0,0,1,764.46,82a1.41,1.41,0,0,1-.09.55A1.34,1.34,0,0,1,764.46,83Zm21.14,0a1.87,1.87,0,0,1-.08.34,1.62,1.62,0,0,1,.08.66,1.5,1.5,0,0,1-1.66,1.33q-5.22-.58-10.45-.78a1.5,1.5,0,0,1-1.44-1.55,1.56,1.56,0,0,1,.09-.44,1.46,1.46,0,0,1-.09-.56,1.49,1.49,0,0,1,1.56-1.44q5.32.19,10.66.79A1.49,1.49,0,0,1,785.6,83.06Zm21,5.17a1.49,1.49,0,0,1-1.81,1.09q-2.64-.66-5.33-1.28T794.29,87a1.5,1.5,0,0,1-1.19-1.76c0-.07,0-.14.06-.22a1.56,1.56,0,0,1-.06-.78A1.5,1.5,0,0,1,794.85,83c1.76.34,3.51.71,5.27,1.11s3.6.86,5.37,1.3a1.49,1.49,0,0,1,1.09,1.82s0,.08,0,.12A1.46,1.46,0,0,1,806.58,88.23Zm21,6.15a1.51,1.51,0,0,1-1.89,1c-3.41-1.12-6.87-2.18-10.41-3.2a1.5,1.5,0,0,1-1-1.85.19.19,0,0,1,0-.08,1.52,1.52,0,0,1,0-.92,1.49,1.49,0,0,1,1.85-1q5.35,1.53,10.51,3.23a1.49,1.49,0,0,1,1,1.89s0,0,0,0A1.46,1.46,0,0,1,827.58,94.38Zm20.5,7.68a1.51,1.51,0,0,1-2,.82q-5-2.05-10.15-4a1.51,1.51,0,0,1-.9-1.92,1.46,1.46,0,0,1,0-1A1.49,1.49,0,0,1,837,95.1q5.24,1.92,10.27,4a1.5,1.5,0,0,1,.83,1.89A1.47,1.47,0,0,1,848.08,102.06Zm19.85,9.23a1.5,1.5,0,0,1-2,.66q-4.8-2.43-9.8-4.73a1.49,1.49,0,0,1-.79-1.85,1.53,1.53,0,0,1,0-1.13,1.49,1.49,0,0,1,2-.74q5.05,2.31,9.91,4.78a1.5,1.5,0,0,1,.73,1.83A1.52,1.52,0,0,1,867.93,111.29ZM887,122a1.51,1.51,0,0,1-2.06.51q-4.62-2.81-9.43-5.48a1.5,1.5,0,0,1-.68-1.81,1.5,1.5,0,0,1,2.14-1.81q4.86,2.7,9.52,5.53A3.6,3.6,0,0,1,887,122Zm18.23,12.1a1.49,1.49,0,0,1-2.09.36q-4.41-3.14-9-6.14a1.51,1.51,0,0,1-.59-1.76,1.49,1.49,0,0,1,.16-1.32,1.51,1.51,0,0,1,2.08-.43q4.62,3,9.08,6.2a1.52,1.52,0,0,1,.54,1.72A1.47,1.47,0,0,1,905.24,134.12Zm17.39,13.32a1.51,1.51,0,0,1-2.11.22c-2.82-2.28-5.67-4.52-8.58-6.73a1.92,1.92,0,0,1,1.81-3.39q4.41,3.35,8.65,6.79a3.66,3.66,0,0,1,.23,3.11Zm16.57,14.3a1.49,1.49,0,0,1-2.11.1q-4.05-3.65-8.2-7.2a1.91,1.91,0,0,1,2-3.28q4.17,3.58,8.25,7.26a3.77,3.77,0,0,1,.1,3.12Zm15.9,15a1.5,1.5,0,0,1-2.12,0q-3.9-3.81-7.87-7.57a1.89,1.89,0,0,1,2-3.18q4,3.78,7.92,7.61a1.51,1.51,0,0,1,.35,1.58A1.49,1.49,0,0,1,955.1,176.79Zm15.38,15.59a1.51,1.51,0,0,1-2.13,0q-3.78-3.93-7.63-7.82a1.88,1.88,0,1,1,2.13-3.11q3.85,3.9,7.66,7.85a1.48,1.48,0,0,1,.33,1.52A1.5,1.5,0,0,1,970.48,192.38Zm15.06,15.89a1.49,1.49,0,0,1-2.12-.07q-3.75-4-7.51-8a1.48,1.48,0,0,1-.31-1.5,1.5,1.5,0,0,1,2.49-1.56q3.76,4,7.52,8a1.48,1.48,0,0,1,.3,1.5A1.5,1.5,0,0,1,985.54,208.27Zm15,16a1.5,1.5,0,0,1-2.12-.07l-7.49-8a1.48,1.48,0,0,1-.3-1.5,1.49,1.49,0,0,1,2.49-1.55l7.49,8a1.48,1.48,0,0,1,.31,1.5A1.5,1.5,0,0,1,1000.51,224.25Zm14.91,15.64a1.5,1.5,0,0,1-2.12,0c-1.22-1.27-2.42-2.51-3.6-3.75l-3.79-4a1.5,1.5,0,0,1-.31-1.51A1.48,1.48,0,0,1,1006,229a1.5,1.5,0,0,1,2.12.05l3.77,4,3.6,3.73a3.75,3.75,0,0,1,0,3.12Zm14.94,14.92a1.51,1.51,0,0,1-2.12,0q-3.87-3.78-7.53-7.44a3.72,3.72,0,0,1,0-3.13,1.5,1.5,0,0,1,2.12,0q3.63,3.65,7.49,7.41a3.7,3.7,0,0,1,0,3.12Zm15.4,14.45a1.5,1.5,0,0,1-2.12.1q-4-3.63-7.74-7.19a1.89,1.89,0,0,1,2-3.18c2.51,2.36,5.07,4.74,7.71,7.15a3.77,3.77,0,0,1,.1,3.12Zm15.82,13.88a1.5,1.5,0,0,1-2.12.17q-4.08-3.48-8-6.92a1.49,1.49,0,0,1-.42-1.63,1.49,1.49,0,0,1,2.4-1.62q3.88,3.42,8,6.89a1.47,1.47,0,0,1,.43,1.64A1.52,1.52,0,0,1,1061.58,283.14Zm16.35,13.37a1.5,1.5,0,0,1-2.11.24q-4.2-3.31-8.22-6.63a1.91,1.91,0,0,1,1.9-3.32q4,3.3,8.18,6.6a1.48,1.48,0,0,1,.48,1.67A1.5,1.5,0,0,1,1077.93,296.51Zm16.79,12.75a1.51,1.51,0,0,1-2.1.32q-4.32-3.18-8.48-6.36a1.92,1.92,0,0,1,1.82-3.38q4.14,3.15,8.44,6.32a1.5,1.5,0,0,1,.52,1.7A1.48,1.48,0,0,1,1094.72,309.26ZM1112,321.37a1.51,1.51,0,0,1-2.08.4q-4.41-3-8.66-6a1.5,1.5,0,0,1-.55-1.72,1.48,1.48,0,0,1,.19-1.37,1.49,1.49,0,0,1,2.09-.36q4.23,3,8.61,6a3.64,3.64,0,0,1,.4,3.09Zm17.69,11.49a1.49,1.49,0,0,1-2.06.48q-4.51-2.83-8.88-5.69a1.5,1.5,0,0,1-.59-1.76,1.46,1.46,0,0,1,.16-1.31,1.49,1.49,0,0,1,2.07-.44q4.35,2.83,8.83,5.65a1.49,1.49,0,0,1,.61,1.78A1.45,1.45,0,0,1,1129.64,332.86Zm18.13,10.85a1.5,1.5,0,0,1-2,.55q-4.63-2.68-9.14-5.39a3.6,3.6,0,0,1-.51-3.06,1.5,1.5,0,0,1,2.06-.51q4.47,2.7,9.09,5.36a1.51,1.51,0,0,1,.66,1.81A1.47,1.47,0,0,1,1147.77,343.71Zm18.49,10.17a1.5,1.5,0,0,1-2,.62q-4.74-2.5-9.35-5.06a2,2,0,0,1,1.45-3.63q4.59,2.55,9.31,5a1.5,1.5,0,0,1,.7,1.83A1.49,1.49,0,0,1,1166.26,353.88Zm18.81,9.48a1.5,1.5,0,0,1-2,.7q-4.82-2.34-9.5-4.72a1.48,1.48,0,0,1-.73-1.83,1.54,1.54,0,0,1,.07-1.19,1.5,1.5,0,0,1,2-.65q4.66,2.35,9.45,4.69a3.59,3.59,0,0,1,.7,3Zm19.14,8.81a1.5,1.5,0,0,1-2,.77q-4.87-2.16-9.65-4.37a2,2,0,0,1,1.27-3.72q4.74,2.19,9.6,4.34a1.51,1.51,0,0,1,.8,1.87A1.53,1.53,0,0,1,1204.21,372.17Zm19.45,8.15a1.51,1.51,0,0,1-2,.83q-4.95-2-9.79-4a2,2,0,0,1,1.17-3.76q4.82,2,9.73,4a3.69,3.69,0,0,1,.84,3Zm19.71,7.47a1.5,1.5,0,0,1-1.92.9q-5-1.81-9.91-3.69a1.52,1.52,0,0,1-.88-1.92,1.49,1.49,0,0,1,1.95-1.88q4.88,1.86,9.87,3.67a1.49,1.49,0,0,1,.89,1.92A1.43,1.43,0,0,1,1243.37,387.79Zm20,6.82a1.5,1.5,0,0,1-1.9,1q-5.07-1.65-10-3.36a1.5,1.5,0,0,1-.93-1.91v0a1.43,1.43,0,0,1,0-1,1.51,1.51,0,0,1,1.91-.93q4.95,1.71,10,3.35a1.51,1.51,0,0,1,1,1.89s0,0,0,.05A1.54,1.54,0,0,1,1263.34,394.61Zm20.18,6.18a1.51,1.51,0,0,1-1.86,1q-5.15-1.5-10.17-3.05a1.49,1.49,0,0,1-1-1.87s0,0,0-.06a1.5,1.5,0,0,1,1.85-1.94q5,1.55,10.13,3a1.5,1.5,0,0,1,1,1.86l0,.08A1.51,1.51,0,0,1,1283.52,400.79Zm20.38,5.54a1.51,1.51,0,0,1-1.83,1.08q-5.19-1.35-10.3-2.74a1.51,1.51,0,0,1-1-1.85.36.36,0,0,1,0-.09,1.41,1.41,0,0,1,0-.91,1.51,1.51,0,0,1,1.85-1.05q5.07,1.39,10.25,2.73a1.51,1.51,0,0,1,1.08,1.83s0,.07,0,.11A1.49,1.49,0,0,1,1303.9,406.33Zm20.47,4.9a1.49,1.49,0,0,1-1.79,1.13q-5.22-1.17-10.35-2.42a1.49,1.49,0,0,1-1.1-1.81.69.69,0,0,1,0-.13,1.43,1.43,0,0,1,0-.87,1.49,1.49,0,0,1,1.81-1.1q5.1,1.23,10.3,2.41a1.49,1.49,0,0,1,1.13,1.79s0,.1,0,.16A1.49,1.49,0,0,1,1324.37,411.23Zm20.61,4.3a1.5,1.5,0,0,1-1.76,1.18q-5.23-1-10.37-2.11a1.48,1.48,0,0,1-1.15-1.77,1.27,1.27,0,0,1,.06-.18,1.43,1.43,0,0,1-.06-.82,1.49,1.49,0,0,1,1.77-1.16q5.12,1.08,10.32,2.1a1.49,1.49,0,0,1,1.19,1.76,1.72,1.72,0,0,1-.07.21A1.49,1.49,0,0,1,1345,415.53Zm20.73,3.71a1.5,1.5,0,0,1-1.73,1.23q-5.22-.87-10.36-1.8a1.5,1.5,0,0,1-1.2-1.74,1.68,1.68,0,0,1,.06-.24,1.5,1.5,0,0,1-.06-.76,1.49,1.49,0,0,1,1.74-1.21q5.11.91,10.32,1.79a1.5,1.5,0,0,1,1.23,1.73,1.82,1.82,0,0,1-.07.25A1.58,1.58,0,0,1,1365.71,419.24Zm21.34,3.21a1.51,1.51,0,0,1-1.68,1.31c-3.5-.43-7-.89-10.43-1.36a1.5,1.5,0,0,1-1.27-1.69,1.55,1.55,0,0,1,.07-.31,1.6,1.6,0,0,1-.07-.69,1.5,1.5,0,0,1,1.69-1.29q5.15.72,10.38,1.36a1.5,1.5,0,0,1,1.31,1.67,2.49,2.49,0,0,1-.08.32A1.57,1.57,0,0,1,1387.05,422.45Zm20.49,1.53a3.38,3.38,0,0,1-.08.34,1.6,1.6,0,0,1,.08.66,1.51,1.51,0,0,1-1.66,1.33q-5.3-.6-10.51-1.26a1.49,1.49,0,0,1-1.3-1.67,1.16,1.16,0,0,1,.08-.32,1.41,1.41,0,0,1-.08-.68,1.49,1.49,0,0,1,1.67-1.3c3.47.43,7,.85,10.47,1.24A1.51,1.51,0,0,1,1407.54,424Zm21,3.06a1.5,1.5,0,0,1-1.62,1.37c-3.56-.31-7.1-.64-10.6-1a1.51,1.51,0,0,1-1.35-1.65,1.37,1.37,0,0,1,.08-.35,1.55,1.55,0,0,1-.08-.65,1.5,1.5,0,0,1,1.64-1.34q5.25.52,10.57,1a1.5,1.5,0,0,1,1.36,1.62,1.12,1.12,0,0,1-.09.37A1.49,1.49,0,0,1,1428.55,427Zm21,1.54a1.52,1.52,0,0,1-1.6,1.41q-5.29-.35-10.52-.73a1.5,1.5,0,0,1-1.39-1.61,1.24,1.24,0,0,1,.09-.38,1.42,1.42,0,0,1-.09-.62,1.5,1.5,0,0,1,1.61-1.38q5.21.39,10.49.72a1.51,1.51,0,0,1,1.41,1.59,1.79,1.79,0,0,1-.09.4A1.51,1.51,0,0,1,1449.51,428.58Zm21,1.05a1.5,1.5,0,0,1-1.56,1.44q-5.25-.21-10.44-.47a1.51,1.51,0,0,1-1.42-1.58,1.36,1.36,0,0,1,.09-.41,1.46,1.46,0,0,1-.09-.59,1.5,1.5,0,0,1,1.58-1.42q5.16.27,10.4.47a1.51,1.51,0,0,1,1.44,1.56,1.43,1.43,0,0,1-.09.43A1.55,1.55,0,0,1,1470.56,429.63Zm21.16.58a1.49,1.49,0,0,1-1.52,1.47q-5.35-.09-10.62-.24a1.51,1.51,0,0,1-1.46-1.55,1.34,1.34,0,0,1,.09-.45,1.41,1.41,0,0,1-.09-.55,1.48,1.48,0,0,1,1.54-1.45q5.27.15,10.59.24a3.47,3.47,0,0,1,1.47,2.53Zm21,.11a1.5,1.5,0,0,1-1.49,1.51q-5.34,0-10.6,0a1.5,1.5,0,0,1-1.49-1.51,1.58,1.58,0,0,1,.09-.49,1.71,1.71,0,0,1-.09-.51,1.5,1.5,0,0,1,1.51-1.49q5.25,0,10.57,0a1.48,1.48,0,0,1,1.5,1.49,1.44,1.44,0,0,1-.09.51A1.58,1.58,0,0,1,1512.75,430.32Zm21-.32a1.5,1.5,0,0,1-1.47,1.53c-3.51.09-7,.15-10.47.2a1.5,1.5,0,0,1-1.52-1.48,1.54,1.54,0,0,1,.09-.52,1.51,1.51,0,0,1-.09-.48,1.5,1.5,0,0,1,1.48-1.52c3.46-.05,6.94-.11,10.44-.2a1.51,1.51,0,0,1,1.54,1.47,1.61,1.61,0,0,1-.09.54A1.63,1.63,0,0,1,1533.8,430Zm21.16-.76a1.5,1.5,0,0,1-1.43,1.57c-3.55.15-7.09.29-10.6.41a1.49,1.49,0,0,1-1.55-1.45,1.45,1.45,0,0,1,.09-.55,1.34,1.34,0,0,1-.09-.45,1.5,1.5,0,0,1,1.44-1.55c3.51-.12,7-.25,10.58-.41a1.48,1.48,0,0,1,1.56,1.43,1.4,1.4,0,0,0,0,1Zm21-1.15a1.5,1.5,0,0,1-1.4,1.59c-3.54.22-7.07.43-10.57.62a1.51,1.51,0,0,1-1.58-1.42,1.39,1.39,0,0,0,0-1,1.5,1.5,0,0,1,1.42-1.58c3.49-.19,7-.39,10.54-.61a1.49,1.49,0,0,1,1.59,1.4,1.51,1.51,0,0,1-.09.6A1.37,1.37,0,0,1,1576,428.09Zm21-1.55a1.5,1.5,0,0,1-1.37,1.62q-5.23.42-10.41.8a1.5,1.5,0,0,1-1.61-1.39,1.56,1.56,0,0,1,.08-.61,1.69,1.69,0,0,1-.08-.39A1.5,1.5,0,0,1,1585,425q5.16-.37,10.38-.8a1.5,1.5,0,0,1,1.62,1.37,1.46,1.46,0,0,1-.09.63A1.18,1.18,0,0,1,1597,426.54Zm19.78-.29c-3.56.35-7.11.69-10.63,1a1.5,1.5,0,0,1-1.55-2,1.55,1.55,0,0,1-.08-.36,1.49,1.49,0,0,1,1.36-1.63c3.51-.32,7.05-.65,10.6-1a1.5,1.5,0,0,1,1.64,1.35,1.55,1.55,0,0,1-.08.65,1.37,1.37,0,0,1,.08.35A1.49,1.49,0,0,1,1616.74,426.25Zm20.85-2.24-10.46,1.17a1.51,1.51,0,0,1-1.65-1.34,1.41,1.41,0,0,1,.08-.65,1.37,1.37,0,0,1-.08-.35,1.5,1.5,0,0,1,1.33-1.65q5.19-.56,10.43-1.16a1.5,1.5,0,0,1,1.67,1.31,1.65,1.65,0,0,1-.08.67c0,.11.06.22.08.33A1.51,1.51,0,0,1,1637.59,424Z',
        ),
        l(C, 'class', 'cls-2 svelte-cmk3rx'),
        l(C, 'd', 'M1653.34,421.08l.13,0-.38-3-3.09.39v4l3.47-.44Z'),
        l(x, 'class', 'cls-4 svelte-cmk3rx'),
        l(
          x,
          'd',
          'M924.11,90.91c0,15.75-17.5,28-17.5,28s-17.5-12.25-17.5-28a17.5,17.5,0,0,1,35,0Z',
        ),
        l(y, 'class', 'cls-2 svelte-cmk3rx'),
        l(
          y,
          'd',
          'M911.44,84.9h-10a2,2,0,0,0-1.74,1l-1.37,2.61a2,2,0,0,0,1.23,2.82,1.88,1.88,0,0,0,1.1,0l1.35-.43a2,2,0,0,1,1.57.18l1.89,1.09a1.93,1.93,0,0,0,2,0l1.88-1.09a2,2,0,0,1,1.58-.18l1.35.43a1.88,1.88,0,0,0,1.1,0,2,2,0,0,0,1.23-2.82L913.18,86A2,2,0,0,0,911.44,84.9Z',
        ),
        l($, 'class', 'cls-2 svelte-cmk3rx'),
        l(
          $,
          'd',
          'M912.22,91.36l-1.35-.43a2,2,0,0,0-1.58.18l-1.88,1.09a1.93,1.93,0,0,1-2,0l-1.89-1.09a2,2,0,0,0-1.57-.18l-1.35.43a1.88,1.88,0,0,1-1.1,0v8.29a2,2,0,0,0,2,2h3V97.7a2,2,0,0,1,3.94,0v3.94h3a2,2,0,0,0,2-2V91.38A1.88,1.88,0,0,1,912.22,91.36Z',
        ),
        l(v, 'class', 'cls-3 home home-1 duration-1000 svelte-cmk3rx'),
        f(v, '!op-100', t[0]),
        f(v, 'delay-1000', t[0]),
        l(Z, 'class', 'cls-4 svelte-cmk3rx'),
        l(
          Z,
          'd',
          'M1588.3,385.57c0,15.75-17.5,28-17.5,28s-17.5-12.25-17.5-28a17.5,17.5,0,1,1,35,0Z',
        ),
        l(q, 'class', 'cls-2 svelte-cmk3rx'),
        l(
          q,
          'd',
          'M1575.62,379.56h-10a2,2,0,0,0-1.75,1.05l-1.36,2.61a2,2,0,0,0,2.33,2.79l1.35-.42a2,2,0,0,1,1.57.18l1.88,1.09a2,2,0,0,0,2,0l1.88-1.09a2,2,0,0,1,1.58-.18l1.34.42a2,2,0,0,0,2.34-2.79l-1.37-2.61A2,2,0,0,0,1575.62,379.56Z',
        ),
        l(j, 'class', 'cls-2 svelte-cmk3rx'),
        l(
          j,
          'd',
          'M1576.4,386l-1.34-.42a2,2,0,0,0-1.58.18l-1.88,1.09a2,2,0,0,1-2,0l-1.88-1.09a2,2,0,0,0-1.57-.18l-1.35.42a2,2,0,0,1-1.1,0v8.29a2,2,0,0,0,2,2h3v-3.94a2,2,0,1,1,3.94,0v3.94h3a2,2,0,0,0,2-2V386A2,2,0,0,1,1576.4,386Z',
        ),
        l(w, 'class', 'cls-5 home home-2 duration-1000 svelte-cmk3rx'),
        f(w, '!op-100', t[0]),
        f(w, 'delay-1800', t[0]),
        l(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        l(e, 'xmlns:xlink', 'http://www.w3.org/1999/xlink'),
        l(e, 'id', 'Layer_1'),
        l(e, 'data-name', 'Layer 1'),
        l(e, 'viewBox', '0 0 1653.47 500'),
        l(e, 'class', 'svelte-cmk3rx');
    },
    m(F, E) {
      O(F, e, E),
        i(e, n),
        i(n, a),
        i(a, s),
        i(n, o),
        i(o, r),
        i(e, c),
        i(c, u),
        i(e, d),
        i(d, g),
        i(d, m),
        i(d, C),
        i(e, v),
        i(v, b),
        i(b, x),
        i(b, y),
        i(b, $),
        i(e, w),
        i(w, k),
        i(k, Z),
        i(k, q),
        i(k, j);
    },
    p(F, [E]) {
      E & 1 && p !== (p = F[0] ? 'calc(100% - 10px)' : '0') && l(g, 'width', p),
        E & 1 && f(g, 'delay-100', F[0]),
        E & 1 && f(v, '!op-100', F[0]),
        E & 1 && f(v, 'delay-1000', F[0]),
        E & 1 && f(w, '!op-100', F[0]),
        E & 1 && f(w, 'delay-1800', F[0]);
    },
    i: P,
    o: P,
    d(F) {
      F && H(e);
    },
  };
}
function Ce(t, e, n) {
  let { mount: a } = e;
  return (
    (t.$$set = s => {
      'mount' in s && n(0, (a = s.mount));
    }),
    [a]
  );
}
class we extends Q {
  constructor(e) {
    super(), K(this, e, Ce, ve, G, { mount: 0 });
  }
}
const xe = '/assets/img_ios-jKsPiCOo.svg',
  _e = '/assets/img_android-sYNu0EcH.svg',
  be = '/assets/phone-29TYwFpi.png',
  ye = '/assets/head_cafe-MRQnMB5h.jpg';
function $e(t) {
  let e, n, a, s;
  return {
    c() {
      (e = h('div')),
        (e.innerHTML = `<img src="${ye}" alt="" class="w-176px h-146px"/> <div class="flex flex-col p-[15px_12px] gap-2"><div class="p-[5px_10px] rounded-full bg-[#FDB706] w-max text-0.6rem">Ẩm thực</div> <div class="text-0.8rem">Cà phê Việt Nam</div></div>`),
        l(
          e,
          'class',
          'flex flex-col overflow-hidden bg-white shadow-[0px_16px_40px_0px_rgba(0,0,0,0.16),0px_2px_14px_0px_rgba(0,0,0,0.16)] scale-0 rounded-[10px] duration-1000 translate-x-0 translate-y-0 op-0',
        );
    },
    m(o, r) {
      O(o, e, r), a || ((s = c1((n = P1.call(null, e, { class: Z0, enable: t[0] })))), (a = !0));
    },
    p(o, [r]) {
      n && o1(n.update) && r & 1 && n.update.call(null, { class: Z0, enable: o[0] });
    },
    i: P,
    o: P,
    d(o) {
      o && H(e), (a = !1), s();
    },
  };
}
const Z0 =
  '!delay-1000 scale-90 !translate-x-[-120%] !translate-y-[80%] !rotate-z-[-30deg] !op-100';
function ke(t, e, n) {
  let { mount: a } = e;
  return (
    (t.$$set = s => {
      'mount' in s && n(0, (a = s.mount));
    }),
    [a]
  );
}
class Ae extends Q {
  constructor(e) {
    super(), K(this, e, ke, $e, G, { mount: 0 });
  }
}
const Me = '/assets/head_noodle-m6sdy-yf.jpg';
function Ee(t) {
  let e, n, a, s;
  return {
    c() {
      (e = h('div')),
        (e.innerHTML = `<img src="${Me}" alt="" class="w-176px h-146px"/> <div class="flex flex-col p-[15px_12px] gap-2"><div class="p-[5px_10px] rounded-full bg-[#FDB706] w-max text-0.6rem">Ẩm thực</div> <div class="text-0.8rem">Phở gia truyền Hà Nội</div></div>`),
        l(
          e,
          'class',
          'flex flex-col overflow-hidden bg-white shadow-[0px_16px_40px_0px_rgba(0,0,0,0.16),0px_2px_14px_0px_rgba(0,0,0,0.16)] scale-0 rounded-[10px] delay-0 duration-1000 translate-x-0 translate-y-0 op-0',
        );
    },
    m(o, r) {
      O(o, e, r), a || ((s = c1((n = P1.call(null, e, { class: q0, enable: t[0] })))), (a = !0));
    },
    p(o, [r]) {
      n && o1(n.update) && r & 1 && n.update.call(null, { class: q0, enable: o[0] });
    },
    i: P,
    o: P,
    d(o) {
      o && H(e), (a = !1), s();
    },
  };
}
const q0 =
  '!delay-1000 scale-90 <xl:!translate-x-[80%] !translate-x-[140%] !translate-y-[-80%] !rotate-z-[20deg] !op-100';
function Le(t, e, n) {
  let { mount: a } = e;
  return (
    (t.$$set = s => {
      'mount' in s && n(0, (a = s.mount));
    }),
    [a]
  );
}
class Ze extends Q {
  constructor(e) {
    super(), K(this, e, Le, Ee, G, { mount: 0 });
  }
}
function qe(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x, y, $;
  return (
    (v = new Ae({ props: { mount: t[0] } })),
    (y = new Ze({ props: { mount: t[0] } })),
    {
      c() {
        (e = h('div')),
          (n = h('div')),
          (a = L()),
          (s = h('div')),
          (o = _('svg')),
          (r = _('ellipse')),
          (c = _('ellipse')),
          (u = _('circle')),
          (d = _('circle')),
          (g = _('image')),
          (p = _('path')),
          (m = L()),
          (C = h('div')),
          R(v.$$.fragment),
          (b = L()),
          (x = h('div')),
          R(y.$$.fragment),
          l(
            n,
            'class',
            'absolute bottom-0 w-full aspect-ratio-1/1 rounded-full scale-0 delay-1000 duration-1000 backdrop-hue-rotate-180',
          ),
          f(n, '!scale-100', t[0]),
          l(r, 'class', 'scale-0 op-0 duration-1000 delay-600'),
          l(r, 'transform-origin', 'center'),
          l(r, 'cx', '284'),
          l(r, 'cy', '359'),
          l(r, 'rx', '284'),
          l(r, 'ry', '283.5'),
          l(r, 'fill', '#FBBD05'),
          l(r, 'fill-opacity', '0.1'),
          f(r, '!scale-100', t[0]),
          f(r, '!op-100', t[0]),
          l(c, 'class', 'scale-0 op-0 duration-1000 delay-600'),
          l(c, 'transform-origin', 'center'),
          l(c, 'cx', '284'),
          l(c, 'cy', '359'),
          l(c, 'rx', '246'),
          l(c, 'ry', '245.5'),
          l(c, 'fill', '#FBBD05'),
          l(c, 'fill-opacity', '0.4'),
          f(c, '!scale-100', t[0]),
          f(c, '!op-100', t[0]),
          l(u, 'class', 'scale-0 op-0 duration-1000 delay-600'),
          l(u, 'transform-origin', 'center'),
          l(u, 'cx', '284.115'),
          l(u, 'cy', '359'),
          l(u, 'r', '207.958'),
          l(u, 'fill', '#FBBD05'),
          l(u, 'fill-opacity', '0.6'),
          f(u, '!scale-100', t[0]),
          f(u, '!op-100', t[0]),
          l(d, 'class', 'scale-0 op-0 duration-1000 delay-600'),
          l(d, 'transform-origin', 'center'),
          l(d, 'cx', '284.112'),
          l(d, 'cy', '359'),
          l(d, 'r', '161.946'),
          l(d, 'fill', '#FBBD05'),
          l(d, 'fill-opacity', '0.8'),
          f(d, '!scale-100', t[0]),
          f(d, '!op-100', t[0]),
          l(g, 'href', be),
          l(g, 'width', '342'),
          l(g, 'height', 658),
          l(g, 'x', 113),
          l(g, 'y', 50),
          l(g, 'class', 'translate-y-120% duration-1000 delay-300'),
          l(g, 'transform-origin', 'center'),
          f(g, '!translate-y-0', t[0]),
          l(p, 'xmlns', 'http://www.w3.org/2000/svg'),
          l(
            p,
            'd',
            'M284,717.5C127.15,717.5,0,590.57,0,434V718H568V434C568,590.57,440.85,717.5,284,717.5Z',
          ),
          l(p, 'transform', 'translate(0 -74.5)'),
          l(p, 'fill', 'white'),
          l(o, 'viewBox', '0 0 568 567'),
          l(o, 'fill', 'none'),
          l(o, 'xmlns', 'http://www.w3.org/2000/svg'),
          l(o, 'class', 'svelte-124g0bd'),
          l(s, 'class', 'w-full h-full absolute flex items-center justify-center z-[10]'),
          l(C, 'class', 'absolute w-auto h-auto z-11'),
          l(x, 'class', 'absolute w-auto h-auto z-9'),
          l(e, 'class', 'w-full max-w-[550px] h-full relative flex items-center justify-center');
      },
      m(w, k) {
        O(w, e, k),
          i(e, n),
          i(e, a),
          i(e, s),
          i(s, o),
          i(o, r),
          i(o, c),
          i(o, u),
          i(o, d),
          i(o, g),
          i(o, p),
          i(e, m),
          i(e, C),
          T(v, C, null),
          i(e, b),
          i(e, x),
          T(y, x, null),
          ($ = !0);
      },
      p(w, [k]) {
        (!$ || k & 1) && f(n, '!scale-100', w[0]),
          (!$ || k & 1) && f(r, '!scale-100', w[0]),
          (!$ || k & 1) && f(r, '!op-100', w[0]),
          (!$ || k & 1) && f(c, '!scale-100', w[0]),
          (!$ || k & 1) && f(c, '!op-100', w[0]),
          (!$ || k & 1) && f(u, '!scale-100', w[0]),
          (!$ || k & 1) && f(u, '!op-100', w[0]),
          (!$ || k & 1) && f(d, '!scale-100', w[0]),
          (!$ || k & 1) && f(d, '!op-100', w[0]),
          (!$ || k & 1) && f(g, '!translate-y-0', w[0]);
        const Z = {};
        k & 1 && (Z.mount = w[0]), v.$set(Z);
        const q = {};
        k & 1 && (q.mount = w[0]), y.$set(q);
      },
      i(w) {
        $ || (D(v.$$.fragment, w), D(y.$$.fragment, w), ($ = !0));
      },
      o(w) {
        z(v.$$.fragment, w), z(y.$$.fragment, w), ($ = !1);
      },
      d(w) {
        w && H(e), I(v), I(y);
      },
    }
  );
}
function Be(t, e, n) {
  let { mount: a } = e;
  return (
    (t.$$set = s => {
      'mount' in s && n(0, (a = s.mount));
    }),
    [a]
  );
}
class Fe extends Q {
  constructor(e) {
    super(), K(this, e, Be, qe, G, { mount: 0 });
  }
}
function De(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v, b, x, y, $, w, k, Z, q, j, F, E;
  return (
    (n = new we({ props: { mount: t[2] } })),
    (q = new Fe({ props: { mount: t[2] } })),
    {
      c() {
        (e = h('div')),
          R(n.$$.fragment),
          (a = L()),
          (s = h('div')),
          (o = h('div')),
          (r = h('div')),
          (c = h('div')),
          (u = h('h1')),
          (d = h('div')),
          (g = h('div')),
          (g.textContent = 'Khám phá'),
          (p = L()),
          (m = h('div')),
          (m.textContent = 'nét bản địa'),
          (C = L()),
          (v = h('div')),
          (b = h('div')),
          (b.textContent = 'cùng Avatour'),
          (x = L()),
          (y = h('p')),
          (y.textContent = `Tất cả trong một ứng dụng du lịch, không cần mất thời gian để tìm hiểu và sắp xếp,\r
            Avatour gợi ý ngay cho bạn một lịch trình khám phá như ý muốn.`),
          ($ = L()),
          (w = h('div')),
          (w.innerHTML = `<a href="https://play.google.com/store/apps/details?id=com.doffy.android.production&amp;hl=en" target="_blank"><img src="${_e}" alt=""/></a> <a href="https://apps.apple.com/vn/app/avatour-kh%C3%A1m-ph%C3%A1-ch%E1%BA%A5t-b%E1%BA%A3n-%C4%91%E1%BB%8Ba/id6449328273" target="_blank"><img src="${xe}" alt=""/></a>`),
          (k = L()),
          (Z = h('div')),
          R(q.$$.fragment),
          (j = L()),
          (F = h('div')),
          l(e, 'class', 'line 2xl:translate-y-[-5%] svelte-e0645r'),
          l(g, 'class', 'translate-y-[-100%] duration-1000 op-0 text-shadow svelte-e0645r'),
          f(g, 'translate-y-0', t[2]),
          f(g, 'delay-600', t[2]),
          f(g, 'op-100', t[2]),
          l(d, 'class', 'overflow-hidden'),
          l(
            m,
            'class',
            'relative font-[Brownhill] font-400 text-8.5rem xl:text-8.75rem 2xl:text-9rem leading-[98px] text-[#644B00] duration-2000 op-0 scale-0',
          ),
          f(m, 'op-100', t[2]),
          f(m, 'scale-100', t[2]),
          l(b, 'class', 'translate-y-[100%] duration-1000 op-0 text-shadow svelte-e0645r'),
          f(b, 'translate-y-0', t[2]),
          f(b, 'delay-600', t[2]),
          f(b, 'op-100', t[2]),
          l(v, 'class', 'overflow-hidden'),
          l(
            u,
            'class',
            'text-[#FBBD05] text-3.5rem xl:text-3.8rem 2xl:text-3.725rem not-italic font-semibold leading-[normal]; font-family: Lexend',
          ),
          l(y, 'class', 'font-300 op-0 duration-1000'),
          f(y, 'op-100', t[2]),
          f(y, 'delay-1000', t[2]),
          l(w, 'class', 'flex items-center gap-2 mt-4 op-0 duration-1000'),
          f(w, 'op-100', t[2]),
          f(w, 'delay-1000', t[2]),
          l(c, 'class', 'flex flex-col gap-2 items-start'),
          l(r, 'class', 'flex flex-col items-end max-w-[450px]'),
          l(
            o,
            'class',
            'w-1/2 relative z-[100] <md:w-full flex flex-col items-center justify-center gap-3 px-10 h-full',
          ),
          l(
            Z,
            'class',
            'w-1/2 <md:w-full <md:absolute left-0 top-0 flex flex-col items-start justify-center gap-3 px-10 h-full <md:blur-10px',
          ),
          l(F, 'class', 'absolute left-0 top-0 w-full h-full <md:bg-white/70 md:hidden blur-10px'),
          l(s, 'class', 'relative flex gap-2 items-start h-full');
      },
      m(M, A) {
        O(M, e, A),
          T(n, e, null),
          O(M, a, A),
          O(M, s, A),
          i(s, o),
          i(o, r),
          i(r, c),
          i(c, u),
          i(u, d),
          i(d, g),
          i(u, p),
          i(u, m),
          i(u, C),
          i(u, v),
          i(v, b),
          i(c, x),
          i(c, y),
          i(c, $),
          i(c, w),
          i(s, k),
          i(s, Z),
          T(q, Z, null),
          i(s, j),
          i(s, F),
          (E = !0);
      },
      p(M, A) {
        const B = {};
        A & 4 && (B.mount = M[2]),
          n.$set(B),
          (!E || A & 4) && f(g, 'translate-y-0', M[2]),
          (!E || A & 4) && f(g, 'delay-600', M[2]),
          (!E || A & 4) && f(g, 'op-100', M[2]),
          (!E || A & 4) && f(m, 'op-100', M[2]),
          (!E || A & 4) && f(m, 'scale-100', M[2]),
          (!E || A & 4) && f(b, 'translate-y-0', M[2]),
          (!E || A & 4) && f(b, 'delay-600', M[2]),
          (!E || A & 4) && f(b, 'op-100', M[2]),
          (!E || A & 4) && f(y, 'op-100', M[2]),
          (!E || A & 4) && f(y, 'delay-1000', M[2]),
          (!E || A & 4) && f(w, 'op-100', M[2]),
          (!E || A & 4) && f(w, 'delay-1000', M[2]);
        const N = {};
        A & 4 && (N.mount = M[2]), q.$set(N);
      },
      i(M) {
        E || (D(n.$$.fragment, M), D(q.$$.fragment, M), (E = !0));
      },
      o(M) {
        z(n.$$.fragment, M), z(q.$$.fragment, M), (E = !1);
      },
      d(M) {
        M && (H(e), H(a), H(s)), I(n), I(q);
      },
    }
  );
}
function Pe(t) {
  let e, n;
  return (
    (e = new Z1({
      props: {
        $$slots: { default: [De, ({ mount: a }) => ({ 2: a }), ({ mount: a }) => (a ? 4 : 0)] },
        $$scope: { ctx: t },
      },
    })),
    e.$on('introend', t[0]),
    e.$on('outroend', t[1]),
    {
      c() {
        R(e.$$.fragment);
      },
      m(a, s) {
        T(e, a, s), (n = !0);
      },
      p(a, [s]) {
        const o = {};
        s & 12 && (o.$$scope = { dirty: s, ctx: a }), e.$set(o);
      },
      i(a) {
        n || (D(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        z(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        I(e, a);
      },
    }
  );
}
function ze(t) {
  function e(a) {
    l1.call(this, t, a);
  }
  function n(a) {
    l1.call(this, t, a);
  }
  return [e, n];
}
class He extends Q {
  constructor(e) {
    super(), K(this, e, ze, Pe, G, {});
  }
}
function B0(t, e, n) {
  const a = t.slice();
  return (a[7] = e[n]), a;
}
function F0(t) {
  let e, n, a;
  var s = t[7];
  function o(r, c) {
    return {};
  }
  return (
    s && ((e = w0(s, o())), e.$on('introend', t[3]), e.$on('outroend', D0)),
    {
      c() {
        e && R(e.$$.fragment), (n = Q0());
      },
      m(r, c) {
        e && T(e, r, c), O(r, n, c), (a = !0);
      },
      p(r, c) {
        if (c & 1 && s !== (s = r[7])) {
          if (e) {
            z1();
            const u = e;
            z(u.$$.fragment, 1, 0, () => {
              I(u, 1);
            }),
              H1();
          }
          s
            ? ((e = w0(s, o())),
              e.$on('introend', r[3]),
              e.$on('outroend', D0),
              R(e.$$.fragment),
              D(e.$$.fragment, 1),
              T(e, n.parentNode, n))
            : (e = null);
        }
      },
      i(r) {
        a || (e && D(e.$$.fragment, r), (a = !0));
      },
      o(r) {
        e && z(e.$$.fragment, r), (a = !1);
      },
      d(r) {
        r && H(n), e && I(e, r);
      },
    }
  );
}
function Oe(t) {
  let e,
    n,
    a = x1(t[0]),
    s = [];
  for (let r = 0; r < a.length; r += 1) s[r] = F0(B0(t, a, r));
  const o = r =>
    z(s[r], 1, 1, () => {
      s[r] = null;
    });
  return {
    c() {
      e = h('div');
      for (let r = 0; r < s.length; r += 1) s[r].c();
      l(e, 'class', 'w-full flex flex-col gap-10px h-100svh overflow-y-scroll'),
        p1(e, 'scroll-snap-type', 'y mandatory');
    },
    m(r, c) {
      O(r, e, c);
      for (let u = 0; u < s.length; u += 1) s[u] && s[u].m(e, null);
      n = !0;
    },
    p(r, [c]) {
      if (c & 3) {
        a = x1(r[0]);
        let u;
        for (u = 0; u < a.length; u += 1) {
          const d = B0(r, a, u);
          s[u]
            ? (s[u].p(d, c), D(s[u], 1))
            : ((s[u] = F0(d)), s[u].c(), D(s[u], 1), s[u].m(e, null));
        }
        for (z1(), u = a.length; u < s.length; u += 1) o(u);
        H1();
      }
    },
    i(r) {
      if (!n) {
        for (let c = 0; c < a.length; c += 1) D(s[c]);
        n = !0;
      }
    },
    o(r) {
      s = s.filter(Boolean);
      for (let c = 0; c < s.length; c += 1) z(s[c]);
      n = !1;
    },
    d(r) {
      r && H(e), Y1(s, r);
    },
  };
}
const D0 = () => {};
function je(t, e, n) {
  let { pages: a } = e,
    s = { current: 0, previous: -1 },
    o = !1;
  const r = () => n(1, (o = !1));
  return (
    (t.$$set = c => {
      'pages' in c && n(0, (a = c.pages));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 5 && a[s.current];
    }),
    [a, o, s, r]
  );
}
class Se extends Q {
  constructor(e) {
    super(), K(this, e, je, Oe, G, { pages: 0 });
  }
}
const Ne = '/assets/img_ios_white-FL86YIZS.svg',
  Ve = '/assets/img_android_white-xXNoA9Q3.svg',
  Te = '/assets/img_qrcode-0vUNGD2e.svg',
  Ie =
    "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2024.0.0,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20165%2040'%20style='enable-background:new%200%200%20165%2040;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%23110B0B;}%20%3c/style%3e%3cpath%20class='st0'%20d='M2.8,35.7c-0.7,0-1.3-0.3-1.7-1c-0.4-0.6-0.4-1.3-0.1-2L12.2,5.8c0.4-0.9,1.1-1.4,2-1.4c1,0,1.6,0.5,2,1.4%20l11.3,26.9c0.3,0.7,0.2,1.4-0.2,2c-0.4,0.6-0.9,0.9-1.7,0.9c-0.4,0-0.8-0.1-1.2-0.3c-0.3-0.2-0.6-0.6-0.8-1L13.6,9.8h1.1L4.7,34.4%20c-0.2,0.4-0.5,0.7-0.8,1C3.5,35.6,3.1,35.7,2.8,35.7z%20M4.9,28.8l1.6-3.4h15.7l1.6,3.4H4.9z%20M37.5,35.6c-0.8,0-1.5-0.4-1.9-1.3%20l-8.5-17.9c-0.2-0.5-0.2-0.9-0.1-1.3c0.2-0.5,0.5-0.8,1-1c0.5-0.2,0.9-0.3,1.4-0.1c0.5,0.2,0.8,0.5,1.1,0.9L38.4,32h-1.9l7.8-17.1%20c0.2-0.5,0.6-0.8,1.1-0.9c0.5-0.2,1-0.1,1.5,0.1c0.5,0.2,0.8,0.5,1,1c0.2,0.5,0.1,0.9-0.1,1.4l-8.5,17.9%20C39,35.2,38.4,35.6,37.5,35.6z%20M60.4,35.8c-1.9,0-3.7-0.5-5.2-1.4c-1.5-1-2.8-2.3-3.7-4c-0.9-1.7-1.3-3.6-1.3-5.7s0.5-4,1.4-5.7%20c1-1.7,2.3-3,4-4c1.7-1,3.6-1.5,5.6-1.5s3.9,0.5,5.6,1.5c1.7,1,3,2.3,3.9,4c1,1.7,1.5,3.6,1.5,5.7h-1.6c0,2.1-0.5,4-1.4,5.7%20c-0.9,1.7-2.1,3-3.6,4C64.1,35.4,62.3,35.8,60.4,35.8z%20M61.2,32.2c1.4,0,2.6-0.3,3.6-1c1.1-0.7,1.9-1.6,2.5-2.7%20c0.6-1.1,0.9-2.4,0.9-3.8c0-1.4-0.3-2.7-0.9-3.8c-0.6-1.1-1.5-2-2.5-2.7c-1.1-0.7-2.3-1-3.6-1c-1.3,0-2.5,0.3-3.6,1%20c-1.1,0.6-1.9,1.5-2.6,2.7c-0.6,1.1-0.9,2.4-0.9,3.8c0,1.4,0.3,2.7,0.9,3.8c0.6,1.1,1.5,2,2.6,2.7C58.6,31.9,59.8,32.2,61.2,32.2z%20M70.1,35.7c-0.6,0-1.1-0.2-1.5-0.6c-0.4-0.4-0.6-0.9-0.6-1.5v-6.1l0.8-4.2l3.3,1.4v8.9c0,0.6-0.2,1.1-0.6,1.5%20C71.2,35.5,70.7,35.7,70.1,35.7z%20M86.2,35.7c-1.3,0-2.5-0.3-3.6-1c-1.1-0.7-1.9-1.6-2.5-2.8c-0.6-1.2-0.9-2.5-0.9-4V8.8%20c0-0.6,0.2-1.1,0.6-1.4c0.4-0.4,0.9-0.6,1.4-0.6c0.6,0,1.1,0.2,1.4,0.6c0.4,0.4,0.6,0.9,0.6,1.4v19.1c0,1.1,0.3,2,0.9,2.7%20c0.6,0.7,1.3,1.1,2.2,1.1h1.4c0.5,0,0.9,0.2,1.2,0.6c0.3,0.4,0.5,0.9,0.5,1.4s-0.2,1.1-0.7,1.4c-0.4,0.4-1,0.6-1.7,0.6H86.2z%20M77.3,18c-0.6,0-1-0.2-1.4-0.5c-0.3-0.3-0.5-0.7-0.5-1.2c0-0.5,0.2-1,0.5-1.3c0.3-0.3,0.8-0.5,1.4-0.5h9.2c0.6,0,1,0.2,1.4,0.5%20c0.3,0.3,0.5,0.7,0.5,1.3c0,0.5-0.2,0.9-0.5,1.2c-0.3,0.3-0.8,0.5-1.4,0.5H77.3z%20M104.2,35.8c-2.2,0-4.1-0.5-5.7-1.4%20c-1.7-1-3-2.3-3.9-3.9c-0.9-1.7-1.4-3.6-1.4-5.8c0-2.2,0.5-4.1,1.4-5.8c1-1.7,2.3-3,3.9-3.9c1.7-1,3.6-1.4,5.7-1.4%20c2.1,0,4,0.5,5.7,1.4c1.7,0.9,2.9,2.2,3.9,3.9c1,1.7,1.4,3.6,1.4,5.8c0,2.2-0.5,4.1-1.4,5.8c-0.9,1.7-2.2,3-3.9,3.9%20C108.3,35.4,106.4,35.8,104.2,35.8z%20M104.2,32.2c1.4,0,2.6-0.3,3.7-1s1.9-1.5,2.5-2.6c0.6-1.1,0.9-2.4,0.9-3.9%20c0-1.5-0.3-2.8-0.9-3.9c-0.6-1.1-1.4-2-2.5-2.7s-2.3-1-3.7-1s-2.6,0.3-3.7,1c-1.1,0.6-1.9,1.5-2.5,2.7c-0.6,1.1-0.9,2.4-0.9,3.9%20c0,1.5,0.3,2.8,0.9,3.9c0.6,1.1,1.5,2,2.5,2.6C101.6,31.9,102.8,32.2,104.2,32.2z%20M130.5,35.9c-1.8,0-3.5-0.4-5-1.2%20c-1.4-0.8-2.6-2-3.4-3.5c-0.8-1.5-1.2-3.4-1.2-5.6v-9.8c0-0.6,0.2-1.1,0.6-1.4c0.4-0.4,0.9-0.6,1.5-0.6c0.6,0,1.1,0.2,1.4,0.6%20c0.4,0.4,0.6,0.9,0.6,1.4v9.8c0,1.5,0.3,2.7,0.8,3.7c0.6,1,1.3,1.7,2.3,2.2c1,0.5,2,0.7,3.2,0.7c1.1,0,2.2-0.2,3-0.7%20c0.9-0.5,1.6-1.1,2.2-1.8c0.5-0.8,0.8-1.6,0.8-2.6h2.5c0,1.7-0.4,3.1-1.2,4.5c-0.8,1.3-1.9,2.4-3.3,3.2%20C133.9,35.5,132.3,35.9,130.5,35.9z%20M139.3,35.7c-0.6,0-1.1-0.2-1.5-0.6c-0.4-0.4-0.6-0.9-0.6-1.5V15.8c0-0.6,0.2-1.1,0.6-1.5%20c0.4-0.4,0.9-0.6,1.5-0.6c0.6,0,1.1,0.2,1.5,0.6c0.4,0.4,0.6,0.9,0.6,1.5v17.8c0,0.6-0.2,1.1-0.6,1.5%20C140.4,35.5,139.9,35.7,139.3,35.7z%20M150.5,22c0-1.6,0.4-3,1.2-4.3c0.8-1.3,1.9-2.3,3.2-3c1.3-0.7,2.8-1.1,4.4-1.1%20c1.6,0,2.8,0.3,3.6,0.8c0.8,0.5,1.1,1.1,0.9,1.8c-0.1,0.4-0.2,0.7-0.5,0.9c-0.2,0.2-0.5,0.3-0.8,0.4c-0.3,0.1-0.6,0-1,0%20c-1.7-0.3-3.2-0.4-4.6-0.1c-1.4,0.3-2.4,0.8-3.2,1.6c-0.8,0.8-1.2,1.8-1.2,3H150.5z%20M150.6,35.7c-0.6,0-1.1-0.2-1.5-0.5%20c-0.3-0.3-0.5-0.9-0.5-1.5V15.8c0-0.6,0.2-1.1,0.5-1.5s0.8-0.5,1.5-0.5c0.7,0,1.2,0.2,1.5,0.5c0.3,0.3,0.5,0.8,0.5,1.5v17.9%20c0,0.6-0.2,1.1-0.5,1.5C151.7,35.5,151.2,35.7,150.6,35.7z'/%3e%3c/svg%3e",
  Re =
    "data:image/svg+xml,%3csvg%20stroke='currentColor'%20fill='currentColor'%20stroke-width='0'%20viewBox='0%200%20512%20512'%20height='1em'%20width='1em'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M504%20256C504%20119%20393%208%20256%208S8%20119%208%20256c0%20123.78%2090.69%20226.38%20209.25%20245V327.69h-63V256h63v-54.64c0-62.15%2037-96.48%2093.67-96.48%2027.14%200%2055.52%204.84%2055.52%204.84v61h-31.28c-30.8%200-40.41%2019.12-40.41%2038.73V256h68.78l-11%2071.69h-57.78V501C413.31%20482.38%20504%20379.78%20504%20256z'%3e%3c/path%3e%3c/svg%3e",
  Ge =
    "data:image/svg+xml,%3csvg%20stroke='currentColor'%20fill='currentColor'%20stroke-width='0'%20viewBox='0%200%2016%2016'%20height='1em'%20width='1em'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.051%201.999h.089c.822.003%204.987.033%206.11.335a2.01%202.01%200%200%201%201.415%201.42c.101.38.172.883.22%201.402l.01.104.022.26.008.104c.065.914.073%201.77.074%201.957v.075c-.001.194-.01%201.108-.082%202.06l-.008.105-.009.104c-.05.572-.124%201.14-.235%201.558a2.007%202.007%200%200%201-1.415%201.42c-1.16.312-5.569.334-6.18.335h-.142c-.309%200-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007%202.007%200%200%201-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09%209.82l-.008-.104A31.4%2031.4%200%200%201%200%207.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007%202.007%200%200%201%201.415-1.42c.487-.13%201.544-.21%202.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788%2099.788%200%200%201%207.858%202h.193zM6.4%205.209v4.818l4.157-2.408L6.4%205.209z'%3e%3c/path%3e%3c/svg%3e";
function Ke(t) {
  let e;
  return {
    c() {
      (e = h('div')),
        (e.innerHTML = `<div class="absolute left-0 top-full w-full h-[250px] bg-[#FBBD05] &lt;sm:h-auto"><div class="p-[50px_100px] h-[100%] flex items-center &lt;sm:px-10 &lt;sm:flex-col &lt;sm:gap-7"><div class="h-[100%] w-[25%] &lt;sm:w-full flex flex-col"><img alt="" src="${Ie}" width="165" height="89" decoding="async" data-nimg="1" loading="lazy" style="color: transparent"/> <div class="h-[40px] w-full flex items-center gap-4 mt-3"><a class="w-[24px] h-[24px]" href="https://www.facebook.com/avatour.dattourcungnhau" target="_blank" rel="noreferrer"><img class="w-full h-full object-contain" src="${Re}" alt=""/></a><a class="w-[28px] h-[28x]" href="https://www.youtube.com/watch?v=g8epBllXZjo" target="_blank" rel="noreferrer"><img class="w-full h-full object-contain" src="${Ge}" alt=""/></a></div></div> <div class="h-[100%] w-[25%] &lt;sm:w-full flex flex-col gap-2"><h5 class="font-bold mb-2">Về chúng tôi</h5> <a href="#" class="hover:underline text-[14px] opacity-70">Gợi ý lịch trình du lịch thông minh</a> <a href="#" class="hover:underline text-[14px] opacity-70">Đặt tour chung với nhiều ưu đãi</a> <div><a class="hover:underline text-[14px] opacity-70" href="https://www.avatour.life/about-us/terms">Điều khoản sử dụng</a></div> <div><a class="hover:underline text-[14px] opacity-70" href="https://www.avatour.life/about-us/policy">Chính sách bảo mật</a></div></div> <div class="h-[100%] w-[25%] &lt;sm:w-full flex flex-col gap-2"><h5 class="font-bold mb-2">Thông tin liên hệ</h5> <div class="flex items-start gap-2"><svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="mt-1"><path d="M8 10.6836C6.9 10.6836 6 9.78359 6 8.68359C6 7.58359 6.9 6.68359 8 6.68359C9.1 6.68359 10 7.58359 10 8.68359C10 9.78359 9.1 10.6836 8 10.6836ZM14 8.88359C14 5.25359 11.35 2.68359 8 2.68359C4.65 2.68359 2 5.25359 2 8.88359C2 11.2236 3.95 14.3236 8 18.0236C12.05 14.3236 14 11.2236 14 8.88359ZM8 0.683594C12.2 0.683594 16 3.90359 16 8.88359C16 12.2036 13.33 16.1336 8 20.6836C2.67 16.1336 0 12.2036 0 8.88359C0 3.90359 3.8 0.683594 8 0.683594Z" fill="#112211"></path></svg> <div class="max-w-[175px] text-[#112211] text-[14px] opacity-70">25/79 Dương Quảng Hàm, Cầu Giấy, Hà Nội</div></div> <div class="flex items-center gap-2"><svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2.43359C18 1.47109 17.19 0.683594 16.2 0.683594H1.8C0.81 0.683594 0 1.47109 0 2.43359V12.9336C0 13.8961 0.81 14.6836 1.8 14.6836H16.2C17.19 14.6836 18 13.8961 18 12.9336V2.43359ZM16.2 2.43359L9 6.80859L1.8 2.43359H16.2ZM16.2 12.9336H1.8V4.18359L9 8.55859L16.2 4.18359V12.9336Z" fill="Black"></path></svg> <div class="max-w-[180px] text-[#112211] text-[14px] opacity-70">service.avatour@gmail.com</div></div> <div class="flex items-center gap-2"><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2584 17.6836C5.49927 17.6836 0 12.1843 0 5.42516C0.00255584 4.26577 0.426043 3.14675 1.19173 2.27616C1.95741 1.40557 3.01318 0.842642 4.16276 0.692047C4.45581 0.659554 4.75159 0.721253 5.00721 0.868196C5.26283 1.01514 5.465 1.23969 5.5844 1.50928L7.29547 5.50178C7.38422 5.70901 7.41981 5.93514 7.399 6.15962C7.37819 6.3841 7.30163 6.59982 7.17629 6.78721L5.76316 8.94946C6.40306 10.2481 7.45742 11.2965 8.75967 11.9289L10.8964 10.5073C11.0836 10.3811 11.2998 10.3047 11.5248 10.2854C11.7497 10.266 11.9758 10.3043 12.1818 10.3966L16.1743 12.0992C16.4439 12.2186 16.6685 12.4208 16.8154 12.6764C16.9623 12.932 17.024 13.2278 16.9915 13.5208C16.841 14.6704 16.278 15.7262 15.4074 16.4919C14.5368 17.2576 13.4178 17.681 12.2584 17.6836ZM4.33301 2.04558C3.51149 2.15119 2.75662 2.55262 2.20975 3.1747C1.66288 3.79679 1.3615 4.59688 1.36205 5.42516C1.3643 8.31437 2.51303 11.0846 4.55601 13.1276C6.59899 15.1706 9.36922 16.3193 12.2584 16.3215C13.0867 16.3221 13.8868 16.0207 14.5089 15.4738C15.131 14.927 15.5324 14.1721 15.638 13.3506L11.6455 11.648L9.51731 13.0697C9.32149 13.1991 9.09553 13.2758 8.86136 13.2922C8.62719 13.3086 8.39276 13.2642 8.1808 13.1633C6.59482 12.3961 5.31193 11.1192 4.53732 9.53685C4.43519 9.32561 4.38936 9.09156 4.40428 8.85741C4.41919 8.62325 4.49435 8.39691 4.62245 8.20034L6.04409 6.03808L4.33301 2.04558Z" fill="black"></path></svg> <div class="max-w-[175px] text-[#112211] text-[14px] opacity-70">(+84) 886141200</div></div></div> <div class="h-[100%] w-[25%] &lt;sm:w-full flex flex-col gap-2"><h5 class="font-bold mb-2">Tải xuống trên điện thoại</h5> <div class="flex gap-3"><div class="flex flex-col gap-[4px]"><div class=""><a target="_blank" class="border-[1px] min-w-[150px] h-[49px] inline-block overflow-hidden rounded-[5px] relative" href="https://play.google.com/store/apps/details?id=com.doffy.android.production&amp;hl=en"><img alt="" src="${Ve}" width="150" height="49" decoding="async" data-nimg="1" class="min-w-[154px] h-[53px] translate-x-[-2px] translate-y-[-2px] absolute left-0" loading="lazy" style="color: transparent"/></a></div> <div class=""><a target="_blank" class="border-[1px] min-w-[150px] h-[49px] inline-block overflow-hidden rounded-[5px] relative" href="https://apps.apple.com/vn/app/avatour-kh%C3%A1m-ph%C3%A1-ch%E1%BA%A5t-b%E1%BA%A3n-%C4%91%E1%BB%8Ba/id6449328273"><img alt="" src="${Ne}" width="150" height="49" decoding="async" data-nimg="1" class="min-w-[154px] h-[53px] translate-x-[-2px] translate-y-[-2px] absolute left-0" loading="lazy" style="color: transparent"/></a></div></div> <div class=""><img alt="" src="${Te}" width="110" height="110" decoding="async" data-nimg="1" class="min-w-[110px] h-[110px]" loading="lazy" style="color: transparent"/></div></div></div></div></div>`),
        l(e, 'class', 'h-250px');
    },
    m(n, a) {
      O(n, e, a);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && H(e);
    },
  };
}
class Qe extends Q {
  constructor(e) {
    super(), K(this, e, null, Ke, G, {});
  }
}
function We(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v;
  return {
    c() {
      (e = h('button')),
        (n = h('div')),
        (a = h('div')),
        (s = h('h2')),
        (o = J(t[0])),
        (r = L()),
        (c = h('div')),
        (u = h('div')),
        (d = h('p')),
        (p = L()),
        (m = h('div')),
        (m.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M9 13.5L18 22.5L27 13.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'),
        l(s, 'class', 'h-36px leading-36px font-600 text-start'),
        l(d, 'class', 'mt-3 text-start font-300'),
        l(u, 'class', 'overflow-hidden'),
        l(c, 'class', (g = 'grid duration-500 ' + (t[2] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'))),
        l(a, 'class', 'flex flex-col'),
        l(
          n,
          'class',
          'bg-#F5F5F5 p-[36px_24px] flex items-start justify-between gap-3 max-w-900px rounded-24px',
        ),
        l(n, 'tabindex', '-1'),
        l(n, 'role', 'button'),
        l(e, 'class', 'contents');
    },
    m(b, x) {
      O(b, e, x),
        i(e, n),
        i(n, a),
        i(a, s),
        i(s, o),
        i(a, r),
        i(a, c),
        i(c, u),
        i(u, d),
        (d.innerHTML = t[1]),
        i(n, p),
        i(n, m),
        C || ((v = v1(e, 'click', t[3])), (C = !0));
    },
    p(b, [x]) {
      x & 1 && A1(o, b[0]),
        x & 2 && (d.innerHTML = b[1]),
        x & 4 &&
          g !== (g = 'grid duration-500 ' + (b[2] ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')) &&
          l(c, 'class', g);
    },
    i: P,
    o: P,
    d(b) {
      b && H(e), (C = !1), v();
    },
  };
}
function Xe(t, e, n) {
  let { title: a } = e,
    { description: s } = e,
    { open: o = !1 } = e;
  const r = h2();
  function c() {
    r('toggle');
  }
  return (
    (t.$$set = u => {
      'title' in u && n(0, (a = u.title)),
        'description' in u && n(1, (s = u.description)),
        'open' in u && n(2, (o = u.open));
    }),
    [a, s, o, c]
  );
}
class Je extends Q {
  constructor(e) {
    super(), K(this, e, Xe, We, G, { title: 0, description: 1, open: 2 });
  }
}
function P0(t, e, n) {
  const a = t.slice();
  return (a[6] = e[n]), (a[8] = n), a;
}
function z0(t) {
  let e, n, a, s, o;
  function r() {
    return t[2](t[8]);
  }
  return (
    (n = new Je({
      props: { open: t[0] === t[8], title: t[6].title, description: t[6].description },
    })),
    n.$on('toggle', r),
    {
      c() {
        (e = h('div')),
          R(n.$$.fragment),
          (a = L()),
          l(e, 'class', 'translate-y-1/3 op-0 duration-1000'),
          l(e, 'style', (s = t[5] ? `transition-delay: ${200 + t[8] * 200}ms` : '')),
          f(e, '!translate-y-0', t[5]),
          f(e, '!op-100', t[5]);
      },
      m(c, u) {
        O(c, e, u), T(n, e, null), i(e, a), (o = !0);
      },
      p(c, u) {
        t = c;
        const d = {};
        u & 1 && (d.open = t[0] === t[8]),
          n.$set(d),
          (!o || (u & 32 && s !== (s = t[5] ? `transition-delay: ${200 + t[8] * 200}ms` : ''))) &&
            l(e, 'style', s),
          (!o || u & 32) && f(e, '!translate-y-0', t[5]),
          (!o || u & 32) && f(e, '!op-100', t[5]);
      },
      i(c) {
        o || (D(n.$$.fragment, c), (o = !0));
      },
      o(c) {
        z(n.$$.fragment, c), (o = !1);
      },
      d(c) {
        c && H(e), I(n);
      },
    }
  );
}
function Ue(t) {
  let e,
    n,
    a,
    s,
    o,
    r,
    c,
    u = x1(t[1]),
    d = [];
  for (let p = 0; p < u.length; p += 1) d[p] = z0(P0(t, u, p));
  const g = p =>
    z(d[p], 1, 1, () => {
      d[p] = null;
    });
  return (
    (r = new Qe({})),
    {
      c() {
        (e = h('div')), (n = h('h1')), (n.textContent = 'Q&A'), (a = L()), (s = h('div'));
        for (let p = 0; p < d.length; p += 1) d[p].c();
        (o = L()),
          R(r.$$.fragment),
          l(n, 'class', 'text-3rem font-bold op-0 duration-1000'),
          f(n, '!delay-200', t[5]),
          f(n, '!op-100', t[5]),
          l(s, 'class', 'flex flex-col gap-3'),
          l(e, 'class', 'px-10 py-6 flex flex-col gap-4 items-center');
      },
      m(p, m) {
        O(p, e, m), i(e, n), i(e, a), i(e, s);
        for (let C = 0; C < d.length; C += 1) d[C] && d[C].m(s, null);
        i(e, o), T(r, e, null), (c = !0);
      },
      p(p, m) {
        if (
          ((!c || m & 32) && f(n, '!delay-200', p[5]),
          (!c || m & 32) && f(n, '!op-100', p[5]),
          m & 35)
        ) {
          u = x1(p[1]);
          let C;
          for (C = 0; C < u.length; C += 1) {
            const v = P0(p, u, C);
            d[C]
              ? (d[C].p(v, m), D(d[C], 1))
              : ((d[C] = z0(v)), d[C].c(), D(d[C], 1), d[C].m(s, null));
          }
          for (z1(), C = u.length; C < d.length; C += 1) g(C);
          H1();
        }
      },
      i(p) {
        if (!c) {
          for (let m = 0; m < u.length; m += 1) D(d[m]);
          D(r.$$.fragment, p), (c = !0);
        }
      },
      o(p) {
        d = d.filter(Boolean);
        for (let m = 0; m < d.length; m += 1) z(d[m]);
        z(r.$$.fragment, p), (c = !1);
      },
      d(p) {
        p && H(e), Y1(d, p), I(r);
      },
    }
  );
}
function Ye(t) {
  let e, n;
  return (
    (e = new Z1({
      props: {
        $$slots: { default: [Ue, ({ mount: a }) => ({ 5: a }), ({ mount: a }) => (a ? 32 : 0)] },
        $$scope: { ctx: t },
      },
    })),
    e.$on('introend', t[3]),
    e.$on('outroend', t[4]),
    {
      c() {
        R(e.$$.fragment);
      },
      m(a, s) {
        T(e, a, s), (n = !0);
      },
      p(a, [s]) {
        const o = {};
        s & 545 && (o.$$scope = { dirty: s, ctx: a }), e.$set(o);
      },
      i(a) {
        n || (D(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        z(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        I(e, a);
      },
    }
  );
}
function et(t, e, n) {
  let a = -1;
  const s = [
      {
        title: 'Tôi nhận lịch trình gợi ý như thế nào?',
        description:
          'Rất đơn giản, bạn chỉ cần vào Avatour, tìm kiếm địa điểm mong muốn cùng với các điều kiện số người, số lượng ngày đi,... là đã có ngay một lộ trình nhanh chóng.',
      },
      {
        title: 'Avatour có những tour nào?',
        description:
          'Avatour tập trung vào 4 loại hình du lịch chính: Food tour, Cắm trại, Đi phượt và Team building nha bạn.',
      },
      {
        title: 'Tôi tham gia mua chung như thế nào?',
        description:
          'Sau khi tham khảo sản phẩm, dịch vụ từ các đối tác của Avatour, bạn thực hiện thao tác mua, sau đó hệ thống sẽ cho bạn biết bạn sẽ được hưởng bao nhiêu ưu đãi khi có người tham gia mua cùng bạn. Bạn có thể xem video hướng dẫn sau để hiểu hơn về mua chung nha.',
      },
    ],
    o = u => {
      a === u ? n(0, (a = -1)) : n(0, (a = u));
    };
  function r(u) {
    l1.call(this, t, u);
  }
  function c(u) {
    l1.call(this, t, u);
  }
  return [a, s, o, r, c];
}
class tt extends Q {
  constructor(e) {
    super(), K(this, e, et, Ye, G, {});
  }
}
function lt(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m, C, v;
  const b = t[6].default,
    x = c0(b, t, t[5], null);
  return {
    c() {
      (e = h('div')),
        (n = h('div')),
        (a = h('h1')),
        (a.textContent = 'Mọi người nghĩ gì về Avatour?'),
        (s = L()),
        (o = h('div')),
        (r = h('button')),
        (c = L()),
        (u = h('button')),
        (d = L()),
        (g = h('div')),
        (p = h('div')),
        x && x.c(),
        l(a, 'class', 'text-2.5rem font-600'),
        l(u, 'class', 'rotate-z-180deg'),
        l(o, 'class', 'flex items-center gap-2'),
        l(n, 'class', 'flex items-center justify-between'),
        l(p, 'class', 'flex gap-[15px] h-full w-max duration-[0.3s]'),
        p1(p, 'transform', 'translateX(' + t[1] + 'px)'),
        l(p, 'data-list', !0),
        l(g, 'class', 'w-full h-full overflow-hidden'),
        l(e, 'class', 'h-full relative flex flex-col gap-4');
    },
    m(y, $) {
      O(y, e, $),
        i(e, n),
        i(n, a),
        i(n, s),
        i(n, o),
        i(o, r),
        (r.innerHTML = H0),
        i(o, c),
        i(o, u),
        (u.innerHTML = H0),
        i(e, d),
        i(e, g),
        i(g, p),
        x && x.m(p, null),
        t[7](g),
        (m = !0),
        C || ((v = [v1(r, 'click', t[3]), v1(u, 'click', t[2])]), (C = !0));
    },
    p(y, [$]) {
      x && x.p && (!m || $ & 32) && f0(x, b, y, y[5], m ? u0(b, y[5], $, null) : d0(y[5]), null),
        (!m || $ & 2) && p1(p, 'transform', 'translateX(' + y[1] + 'px)');
    },
    i(y) {
      m || (D(x, y), (m = !0));
    },
    o(y) {
      z(x, y), (m = !1);
    },
    d(y) {
      y && H(e), x && x.d(y), t[7](null), (C = !1), u1(v);
    },
  };
}
const H0 = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="black"/>
<path d="M16 22H28M16 22L21 17M16 22L21 27" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
function nt(t, e, n) {
  let { $$slots: a = {}, $$scope: s } = e,
    o,
    r = 0,
    c = {
      slider: { size: 0, min: 0, max: 0 },
      moveLeft: { active: !1, value: 0 },
      moveRight: { active: !1, value: 0 },
    };
  p2(
    () => (
      g(), window.addEventListener('resize', g), () => window.removeEventListener('resize', g)
    ),
  );
  function u() {
    c.moveRight.active && (n(1, (r = Math.floor(r - c.moveRight.value))), g());
  }
  function d() {
    c.moveLeft.active && (n(1, (r = Math.floor(r + c.moveLeft.value))), g());
  }
  function g() {
    if (o) {
      const m = o.querySelector('div[data-list]');
      if (m) {
        const C = o.getBoundingClientRect().width,
          v = m.getBoundingClientRect().width;
        if (v - C > 0) {
          const x = m.querySelector('div'),
            y = ((x == null ? void 0 : x.getBoundingClientRect().width) ?? 100) + 15;
          let $ = Math.abs(r) >= y ? y : -r,
            w = v - C + r;
          n(
            4,
            (c = {
              slider: { size: C / v, min: 0, max: v - C },
              moveLeft: { active: Math.abs(r) > 0, value: $ },
              moveRight: { active: w > 0, value: w > y ? y : w },
            }),
          );
        }
      }
    }
  }
  function p(m) {
    s0[m ? 'unshift' : 'push'](() => {
      (o = m), n(0, o);
    });
  }
  return (
    (t.$$set = m => {
      '$$scope' in m && n(5, (s = m.$$scope));
    }),
    (t.$$.update = () => {
      t.$$.dirty & 16 && console.log('currentStatus', c);
    }),
    [o, r, u, d, c, s, a, p]
  );
}
class at extends Q {
  constructor(e) {
    super(), K(this, e, nt, lt, G, {});
  }
}
const st = '/assets/user1-b6Uz95dF.svg',
  it =
    "data:image/svg+xml,%3csvg%20id='Layer_1'%20data-name='Layer%201'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='170'%20height='170'%20viewBox='0%200%20170%20170'%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20none;%20}%20.cls-2%20{%20fill:%20%23f9b44d;%20}%20.cls-3%20{%20clip-path:%20url(%23clip-path);%20}%20.cls-4%20{%20fill:%20%23191009;%20}%20.cls-5%20{%20fill:%20%23434345;%20}%20.cls-6%20{%20fill:%20%233e3d42;%20}%20.cls-7%20{%20fill:%20%23fcfcfc;%20}%20.cls-8%20{%20fill:%20%234e4741;%20}%20.cls-9%20{%20fill:%20%23e3e1e2;%20}%20%3c/style%3e%3cclipPath%20id='clip-path'%20transform='translate(0%200)'%3e%3cpath%20class='cls-1'%20d='M170,85a85,85,0,1,0-85,85A85,85,0,0,0,170,85Z'/%3e%3c/clipPath%3e%3c/defs%3e%3ctitle%3euser2%3c/title%3e%3cg%3e%3cpath%20class='cls-2'%20d='M170,85a85,85,0,1,0-85,85A85,85,0,0,0,170,85Z'%20transform='translate(0%200)'/%3e%3cg%20class='cls-3'%3e%3cg%3e%3cpath%20class='cls-4'%20d='M85,116.45c-28.12,0-50.92,24-50.92,53.55H135.91C135.91,140.42,113.12,116.45,85,116.45Z'%20transform='translate(0%200)'/%3e%3cpolygon%20class='cls-5'%20points='62.6%20120.99%2085%20170%20109.12%20122.83%20124.1%20126.01%20110.45%20140.47%20118.43%20143.22%2085%20170%2059.74%20149.53%2065.99%20143.22%2050.63%20127.79%2062.6%20120.99'/%3e%3cpath%20class='cls-4'%20d='M66,53a9.73,9.73,0,1,0-9.73,9.73A9.72,9.72,0,0,0,66,53Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-4'%20d='M123.31,53a9.73,9.73,0,1,0-9.73,9.73A9.73,9.73,0,0,0,123.31,53Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-6'%20d='M118.43,54.63A6.47,6.47,0,1,0,112,61.1,6.47,6.47,0,0,0,118.43,54.63Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-6'%20d='M63.94,54.63a6.47,6.47,0,1,0-6.46,6.47A6.47,6.47,0,0,0,63.94,54.63Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-7'%20d='M126.58,88.83a41.65,41.65,0,1,0-41.65,41.65A41.65,41.65,0,0,0,126.58,88.83Z'%20transform='translate(0%200)'/%3e%3cg%3e%3cpath%20class='cls-4'%20d='M82.33,87c3-7-3.88-15.81-12.78-14.19S50.94,93.63,56.6,99.46,78.29,96.61,82.33,87Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-8'%20d='M75.7,85.16A3.67,3.67,0,1,0,72,88.83,3.66,3.66,0,0,0,75.7,85.16Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-9'%20d='M73.82,85.16A1.79,1.79,0,1,0,72,87,1.79,1.79,0,0,0,73.82,85.16Z'%20transform='translate(0%200)'/%3e%3c/g%3e%3cg%3e%3cpath%20class='cls-4'%20d='M87.41,87c-2.94-7,3.89-15.81,12.79-14.19s18.61,20.87,12.94,26.7S91.46,96.61,87.41,87Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-8'%20d='M94.05,85.16a3.67,3.67,0,1,1,3.67,3.67A3.66,3.66,0,0,1,94.05,85.16Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-9'%20d='M95.93,85.16A1.79,1.79,0,1,1,97.72,87,1.79,1.79,0,0,1,95.93,85.16Z'%20transform='translate(0%200)'/%3e%3c/g%3e%3cpath%20class='cls-4'%20d='M87.57,102.08c3.13,0,4.11,2,2.18,4.47l-1.24,1.58a4.26,4.26,0,0,1-7,0l-1.24-1.58c-1.93-2.46-1-4.47,2.18-4.47Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-4'%20d='M75.41,112.4A9.85,9.85,0,0,0,84.88,110c3.56,2.84,5.82,3.67,9.71,1.39A9.15,9.15,0,0,1,84.76,114C81.69,114.85,76.22,114.67,75.41,112.4Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-5'%20d='M87.73,141.85A2.73,2.73,0,1,0,85,144.57,2.73,2.73,0,0,0,87.73,141.85Z'%20transform='translate(0%200)'/%3e%3cpath%20class='cls-5'%20d='M87.73,151.28A2.73,2.73,0,1,0,85,154,2.73,2.73,0,0,0,87.73,151.28Z'%20transform='translate(0%200)'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e",
  rt = '/assets/user3-IXBhg9kf.svg';
function O0(t, e, n) {
  const a = t.slice();
  return (a[4] = e[n]), (a[6] = n), a;
}
function j0(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m;
  return {
    c() {
      (e = h('div')),
        (n = h('div')),
        (a = h('img')),
        (o = L()),
        (r = h('img')),
        (u = L()),
        (d = h('div')),
        (g = h('div')),
        (p = h('span')),
        (p.textContent = `${t[4].comment}`),
        (m = L()),
        l(a, 'class', 'w-full h-full object-cover blur-[0] duration-1000'),
        w1(a.src, (s = t[4].background)) || l(a, 'src', s),
        l(a, 'alt', ''),
        l(n, 'class', 'base absolute left-0 top-0 w-full h-full'),
        l(r, 'class', 'avatar w-72px h-72px absolute top-5 right-5 object-cover svelte-jc964t'),
        w1(r.src, (c = t[4].avatar)) || l(r, 'src', c),
        l(r, 'alt', ''),
        l(p, 'class', 'text-1em duration-0'),
        l(g, 'class', 'p4 bg-black/30 text-white rounded-16px'),
        l(d, 'class', 'absolute bottom-0 left-0 p-6'),
        l(
          e,
          'class',
          'w-520px h-480px relative rounded-2rem overflow-hidden [&_>_div.base_>_img]:hover:scale-120 [&_>_div.base_>_img]:hover:blur-[5px] duration-1000',
        ),
        p1(e, 'transform', 'translateX(' + (t[3] ? 0 : 100 + t[6] * 50) + '%)');
    },
    m(C, v) {
      O(C, e, v), i(e, n), i(n, a), i(e, o), i(e, r), i(e, u), i(e, d), i(d, g), i(g, p), i(e, m);
    },
    p(C, v) {
      v & 8 && p1(e, 'transform', 'translateX(' + (C[3] ? 0 : 100 + C[6] * 50) + '%)');
    },
    d(C) {
      C && H(e);
    },
  };
}
function ot(t) {
  let e,
    n = x1(t[0]),
    a = [];
  for (let s = 0; s < n.length; s += 1) a[s] = j0(O0(t, n, s));
  return {
    c() {
      for (let s = 0; s < a.length; s += 1) a[s].c();
      e = Q0();
    },
    m(s, o) {
      for (let r = 0; r < a.length; r += 1) a[r] && a[r].m(s, o);
      O(s, e, o);
    },
    p(s, o) {
      if (o & 9) {
        n = x1(s[0]);
        let r;
        for (r = 0; r < n.length; r += 1) {
          const c = O0(s, n, r);
          a[r] ? a[r].p(c, o) : ((a[r] = j0(c)), a[r].c(), a[r].m(e.parentNode, e));
        }
        for (; r < a.length; r += 1) a[r].d(1);
        a.length = n.length;
      }
    },
    d(s) {
      s && H(e), Y1(a, s);
    },
  };
}
function ct(t) {
  let e, n, a;
  return (
    (n = new at({ props: { $$slots: { default: [ot] }, $$scope: { ctx: t } } })),
    {
      c() {
        (e = h('div')), R(n.$$.fragment), l(e, 'class', 'px-10 py-6');
      },
      m(s, o) {
        O(s, e, o), T(n, e, null), (a = !0);
      },
      p(s, o) {
        const r = {};
        o & 136 && (r.$$scope = { dirty: o, ctx: s }), n.$set(r);
      },
      i(s) {
        a || (D(n.$$.fragment, s), (a = !0));
      },
      o(s) {
        z(n.$$.fragment, s), (a = !1);
      },
      d(s) {
        s && H(e), I(n);
      },
    }
  );
}
function ut(t) {
  let e, n;
  return (
    (e = new Z1({
      props: {
        $$slots: { default: [ct, ({ mount: a }) => ({ 3: a }), ({ mount: a }) => (a ? 8 : 0)] },
        $$scope: { ctx: t },
      },
    })),
    e.$on('introend', t[1]),
    e.$on('outroend', t[2]),
    {
      c() {
        R(e.$$.fragment);
      },
      m(a, s) {
        T(e, a, s), (n = !0);
      },
      p(a, [s]) {
        const o = {};
        s & 136 && (o.$$scope = { dirty: s, ctx: a }), e.$set(o);
      },
      i(a) {
        n || (D(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        z(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        I(e, a);
      },
    }
  );
}
function ft(t) {
  const e = [
    {
      background:
        'https://s3-alpha-sig.figma.com/img/d0d7/b311/bcb701ff6623685006948a4a7eabfaa3?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iI7zq8f2Nz9BBKY5p1juV2BWhwaVzf6FlLs8s6lPaUjyr8q5foRmM0twq~YMoIjFuxgsGUI~pGrXpqw3Rwo5ggiM0YHg9qOf01kLoS9suDMSSOEu0tIOK7GwiKAHNpBQZVGzg4RQVsECuxEWwb0F0eE5cewpKubU5d9kIoUZ5KRcb6E5hsIgVyDlkjFscZypaaTEBB1KnDqqX~K~BiXg9kw77rWEc67NbOYwOEQHX9kmPSAqz6qgfvnsjlgDBeXpKw50gNiBGhivXrko7uAmBdrUsE-SdgqIj3PznqjapwZUGBgxuUBBzSGk4PuxknkgOqYkD0XlR4miN9MkP~PZkQ__',
      avatar: st,
      comment:
        '“Wow! Một ý tưởng thật tuyệt vời, rất mong Avatour ngày càng phát triển để chúng tớ không phải mò mẫm mỗi khi đi du lịch 😘”',
    },
    {
      background: 'https://tiki.vn/blog/wp-content/uploads/2023/03/cau-rong-da-nang.jpg',
      avatar: it,
      comment:
        '“Đây đích thị là vấn đề tớ gặp phải, giá mà chuyến đi Đà Nẵng tháng trước của tớ biết đến Avatour sớm hơn”',
    },
    {
      background:
        'https://s3-alpha-sig.figma.com/img/27c9/fc0a/3c696134c26642f754706551cfee102f?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Xkh0f5Ve6vLD8b9rKhWyEd~j2AsEt0r~IBhAE2uyCEjBwLdK6NmQWrH8QV~vYx9IHoCl6iR2rb2qLcVRaa-Vo16bcnOGhFs-Jw8EkiV5N9PkV4SLMrV~iMoVN6zAbpzCetleE5qHkUnoHB1k2L-xGpbfCx8lj8GIafI190RCOtzaIR6CyK3rs0TZdEWjMW~4BOFzB4oPZfk9jCaDD0S7mYYf-bkWXipdtxTELGLt64-9oMhHjfbtCdfTuR67XX-HpHxdVSWpftg8svpOVxnk0DCrX6-cn~V1vungxt2JTn70Qvk8do0pq1vU~OQggVBcCA-JsG9cbJfinhGCCgoWJA__',
      avatar: rt,
      comment:
        '“Giao diện đẹp, dễ nhìn. Mong các cậu sớm lan toả sản phẩm của mình trên mọi tỉnh thành để mọi người cùng tạo ra một cộng đồng du lịch tuyệt vời”',
    },
  ];
  function n(s) {
    l1.call(this, t, s);
  }
  function a(s) {
    l1.call(this, t, s);
  }
  return [e, n, a];
}
class dt extends Q {
  constructor(e) {
    super(), K(this, e, ft, ut, G, {});
  }
}
const pt = '/assets/suggest_tour_thumbnail-IZCiTtIX.png';
function ht(t, e) {
  t.innerHTML = '';
  for (let n = 0; n < e.content.length; n++) {
    const a = e.content[n],
      s = document.createElement('span');
    (s.className = e.class),
      (s.innerHTML = a),
      t.appendChild(s),
      e.mount &&
        setTimeout(() => {
          s.style.opacity = '0';
        }, n * 20);
  }
  return {
    update(n) {
      if (n.mount)
        for (let a = 0; a < t.childNodes.length; a++) {
          const s = t.childNodes[a];
          setTimeout(() => {
            s.style.opacity = '0';
          }, a * 20);
        }
    },
  };
}
function mt(t) {
  let e, n, a, s, o, r, c;
  return {
    c() {
      (e = _('svg')),
        (n = _('circle')),
        (a = _('path')),
        (s = _('path')),
        (o = _('mask')),
        (r = _('path')),
        (c = _('path')),
        l(n, 'cx', '18'),
        l(n, 'cy', '18'),
        l(n, 'r', '18'),
        l(n, 'fill', '#FDDE81'),
        l(a, 'd', 'M34 14C31.7056 12.5423 30.3984 12.6007 28 14'),
        l(a, 'stroke', 'black'),
        l(s, 'd', 'M22 14C19.7056 12.5423 18.3984 12.6007 16 14'),
        l(s, 'stroke', 'black'),
        l(
          r,
          'd',
          'M31 17C31 18.0506 30.8448 19.0909 30.5433 20.0615C30.2417 21.0321 29.7998 21.914 29.2426 22.6569C28.6855 23.3997 28.0241 23.989 27.2961 24.391C26.5681 24.7931 25.7879 25 25 25C24.2121 25 23.4319 24.7931 22.7039 24.391C21.9759 23.989 21.3145 23.3997 20.7574 22.6569C20.2002 21.914 19.7583 21.0321 19.4567 20.0615C19.1552 19.0909 19 18.0506 19 17L25 17H31Z',
        ),
        l(o, 'id', 'path-4-inside-1_2176_15647'),
        l(o, 'fill', 'white'),
        l(
          c,
          'd',
          'M31 17C31 18.0506 30.8448 19.0909 30.5433 20.0615C30.2417 21.0321 29.7998 21.914 29.2426 22.6569C28.6855 23.3997 28.0241 23.989 27.2961 24.391C26.5681 24.7931 25.7879 25 25 25C24.2121 25 23.4319 24.7931 22.7039 24.391C21.9759 23.989 21.3145 23.3997 20.7574 22.6569C20.2002 21.914 19.7583 21.0321 19.4567 20.0615C19.1552 19.0909 19 18.0506 19 17L25 17H31Z',
        ),
        l(c, 'stroke', 'black'),
        l(c, 'stroke-width', '2'),
        l(c, 'mask', 'url(#path-4-inside-1_2176_15647)'),
        l(e, 'width', '1em'),
        l(e, 'height', '1em'),
        l(e, 'viewBox', '0 0 36 36'),
        l(e, 'fill', 'none'),
        l(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(u, d) {
      O(u, e, d), i(e, n), i(e, a), i(e, s), i(e, o), i(o, r), i(e, c);
    },
    p: P,
    i: P,
    o: P,
    d(u) {
      u && H(e);
    },
  };
}
class gt extends Q {
  constructor(e) {
    super(), K(this, e, null, mt, G, {});
  }
}
function vt(t) {
  let e, n, a, s, o;
  return {
    c() {
      (e = _('svg')),
        (n = _('circle')),
        (a = _('circle')),
        (s = _('circle')),
        (o = _('path')),
        l(n, 'cx', '18'),
        l(n, 'cy', '18'),
        l(n, 'r', '18'),
        l(n, 'fill', '#FDDE81'),
        l(a, 'cx', '20.5'),
        l(a, 'cy', '12.5'),
        l(a, 'r', '2.5'),
        l(a, 'fill', 'black'),
        l(s, 'cx', '30.5'),
        l(s, 'cy', '12.5'),
        l(s, 'r', '1.25'),
        l(s, 'stroke', 'black'),
        l(s, 'stroke-width', '2.5'),
        l(o, 'd', 'M22 18C25.0556 20.4912 26.8017 20.4667 30 18'),
        l(o, 'stroke', 'black'),
        l(o, 'stroke-linecap', 'round'),
        l(e, 'width', '1em'),
        l(e, 'height', '1em'),
        l(e, 'viewBox', '0 0 36 36'),
        l(e, 'fill', 'none'),
        l(e, 'xmlns', 'http://www.w3.org/2000/svg');
    },
    m(r, c) {
      O(r, e, c), i(e, n), i(e, a), i(e, s), i(e, o);
    },
    p: P,
    i: P,
    o: P,
    d(r) {
      r && H(e);
    },
  };
}
class Ct extends Q {
  constructor(e) {
    super(), K(this, e, null, vt, G, {});
  }
}
function wt(t) {
  let e, n, a, s, o, r, c, u, d, g, p, m;
  return {
    c() {
      (e = _('svg')),
        (n = _('g')),
        (a = _('circle')),
        (s = _('path')),
        (o = _('path')),
        (r = _('path')),
        (c = _('path')),
        (u = _('path')),
        (d = _('path')),
        (g = _('defs')),
        (p = _('clipPath')),
        (m = _('rect')),
        l(a, 'cx', '15'),
        l(a, 'cy', '15'),
        l(a, 'r', '15'),
        l(a, 'fill', '#FBBD05'),
        l(
          s,
          'd',
          'M16.8915 14.9754C17.2451 14.9754 17.5316 14.6888 17.5316 14.3352C17.5316 13.9817 17.2451 13.6951 16.8915 13.6951C16.538 13.6951 16.2514 13.9817 16.2514 14.3352C16.2514 14.6888 16.538 14.9754 16.8915 14.9754Z',
        ),
        l(s, 'fill', '#54B3E9'),
        l(
          o,
          'd',
          'M22.8451 15.8917L22.4033 15.3034C22.368 15.2564 22.3571 15.198 22.3754 15.1422C22.6023 14.4499 24.0896 9.74641 23.5368 7.06171C23.5042 6.90327 23.2945 6.88692 23.2199 7.03045C22.7534 7.92785 21.4939 10.1458 19.5844 11.9774C19.5105 12.0482 19.3925 12.0403 19.321 11.967C19.224 11.8676 19.1183 11.7769 19.0051 11.696C18.7073 11.4737 18.3785 11.2961 18.0292 11.169C17.1115 10.833 15.7093 10.6785 13.7158 11.3326C13.6782 11.345 13.6371 11.3448 13.5998 11.3317L10.5193 10.2468C10.3956 10.2032 10.2723 10.303 10.2955 10.4322C10.3851 10.9308 10.6381 12.0566 11.2745 13.4823C11.3275 13.6008 11.2449 13.7313 11.1156 13.72C9.95299 13.6178 5.10209 12.8481 -3.37781 7.0532C-3.54058 6.94197 -3.77149 7.14796 -3.67389 7.31926C-2.22318 9.86536 1.53609 17.7495 -4.94203 21.6485C-4.94653 21.6512 -4.95089 21.6541 -4.95516 21.6571C-5.08696 21.7509 -7.32208 23.3061 -10.4283 23.1671C-10.4348 23.1668 -10.4413 23.169 -10.4462 23.1734C-10.453 23.1794 -10.456 23.1885 -10.4541 23.1973C-10.1278 24.7373 -9.4449 26.1784 -8.1653 27.1791C-8.16167 27.182 -8.15803 27.1846 -8.15417 27.1871C-8.11435 27.213 -7.86192 27.3745 -7.31138 27.6748C-6.04032 28.3675 -2.30231 29.2966 5.7095 27.4703C5.71261 27.4696 5.71194 27.4699 5.71501 27.469C5.81351 27.4408 15.5261 24.6557 17.8722 21.6257C17.9052 21.583 17.9521 21.5582 18.0059 21.5546C18.7787 21.5028 24.6131 20.9588 23.2038 16.3966C23.198 16.3779 23.1887 16.3593 23.1771 16.3435L22.8451 15.8917Z',
        ),
        l(o, 'fill', 'white'),
        l(o, 'stroke', '#FBBD05'),
        l(o, 'stroke-width', '0.734723'),
        l(o, 'stroke-miterlimit', '10'),
        l(r, 'd', 'M11.1755 13.2867C11.1755 13.2867 12.9134 24.808 -4.10235 28.3574'),
        l(r, 'stroke', '#FBBD05'),
        l(r, 'stroke-width', '0.734723'),
        l(r, 'stroke-miterlimit', '10'),
        l(c, 'd', 'M10.1474 19.0092C10.1474 19.0092 14.3114 22.3441 19.472 21.3319'),
        l(c, 'stroke', '#FBBD05'),
        l(c, 'stroke-width', '0.734723'),
        l(c, 'stroke-miterlimit', '10'),
        l(u, 'd', 'M19.4044 11.9825C19.4044 11.9825 19.3708 13.1517 22.3514 15.2283'),
        l(u, 'stroke', '#FBBD05'),
        l(u, 'stroke-width', '0.734723'),
        l(u, 'stroke-miterlimit', '10'),
        l(u, 'stroke-linecap', 'round'),
        l(
          d,
          'd',
          'M16.6971 15.1755C17.0146 15.1755 17.2721 14.9181 17.2721 14.6005C17.2721 14.2829 17.0146 14.0255 16.6971 14.0255C16.3795 14.0255 16.1221 14.2829 16.1221 14.6005C16.1221 14.9181 16.3795 15.1755 16.6971 15.1755Z',
        ),
        l(d, 'fill', '#FBBD05'),
        l(n, 'clip-path', 'url(#clip0_2140_31272)'),
        l(m, 'width', '30'),
        l(m, 'height', '30'),
        l(m, 'rx', '15'),
        l(m, 'fill', 'white'),
        l(p, 'id', 'clip0_2140_31272'),
        l(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        l(e, 'width', '30'),
        l(e, 'height', '30'),
        l(e, 'viewBox', '0 0 30 30'),
        l(e, 'fill', 'none');
    },
    m(C, v) {
      O(C, e, v),
        i(e, n),
        i(n, a),
        i(n, s),
        i(n, o),
        i(n, r),
        i(n, c),
        i(n, u),
        i(n, d),
        i(e, g),
        i(g, p),
        i(p, m);
    },
    p: P,
    i: P,
    o: P,
    d(C) {
      C && H(e);
    },
  };
}
class xt extends Q {
  constructor(e) {
    super(), K(this, e, null, wt, G, {});
  }
}
function _t(t) {
  let e, n, a, s, o;
  return {
    c() {
      (e = _('svg')),
        (n = _('circle')),
        (a = _('circle')),
        (s = _('circle')),
        (o = _('path')),
        l(n, 'cx', '18'),
        l(n, 'cy', '18'),
        l(n, 'r', '18'),
        l(n, 'fill', '#FDDE81'),
        l(a, 'cx', '20.5'),
        l(a, 'cy', '12.5'),
        l(a, 'r', '2.5'),
        l(a, 'fill', 'black'),
        l(s, 'cx', '30.5'),
        l(s, 'cy', '12.5'),
        l(s, 'r', '1.25'),
        l(s, 'stroke', 'black'),
        l(s, 'stroke-width', '2.5'),
        l(
          o,
          'd',
          'M29.5 20.5C29.5 22.8334 28.0472 24.5 26.5 24.5C24.9528 24.5 23.5 22.8334 23.5 20.5C23.5 18.1666 24.9528 16.5 26.5 16.5C28.0472 16.5 29.5 18.1666 29.5 20.5Z',
        ),
        l(o, 'stroke', 'black'),
        l(e, 'xmlns', 'http://www.w3.org/2000/svg'),
        l(e, 'width', '1em'),
        l(e, 'height', '1em'),
        l(e, 'viewBox', '0 0 36 36'),
        l(e, 'fill', 'none');
    },
    m(r, c) {
      O(r, e, c), i(e, n), i(e, a), i(e, s), i(e, o);
    },
    p: P,
    i: P,
    o: P,
    d(r) {
      r && H(e);
    },
  };
}
class bt extends Q {
  constructor(e) {
    super(), K(this, e, null, _t, G, {});
  }
}
function yt(t) {
  let e,
    n,
    a,
    s,
    o,
    r,
    c,
    u,
    d,
    g,
    p,
    m,
    C,
    v,
    b,
    x,
    y,
    $,
    w,
    k,
    Z,
    q,
    j,
    F,
    E,
    M,
    A,
    B,
    N,
    n1,
    a1,
    m1,
    s1,
    U,
    W,
    h1,
    i1,
    e1,
    _1,
    r1,
    b1,
    S,
    X,
    f1,
    h0,
    O1,
    m0,
    j1,
    d1,
    S1,
    y1,
    g0,
    N1,
    t1,
    e0,
    v0;
  return (
    (b = new xt({})),
    (i1 = new bt({})),
    (f1 = new gt({})),
    (y1 = new Ct({})),
    {
      c() {
        (e = h('div')),
          (n = h('div')),
          (a = h('div')),
          (s = h('img')),
          (c = L()),
          (u = h('div')),
          (d = h('div')),
          (g = h('h4')),
          (g.textContent = 'Khám phá 3 ngày Hà Nội'),
          (p = L()),
          (m = h('p')),
          (m.innerHTML =
            '<span class="font-bold text-#FB8C00">0 - 500.000đ</span> <span class="-mt-0.5">|</span> <span>2 người</span>'),
          (C = L()),
          (v = h('div')),
          R(b.$$.fragment),
          (x = J(' Avatour')),
          ($ = L()),
          (w = h('div')),
          (k = h('h2')),
          (Z = J('Có ngay ')),
          (q = h('span')),
          (q.textContent = 'lịch trình mong muốn'),
          (j = J(` chỉ bằng vài cú nhấp\r
          chuột\r
          `)),
          (F = h('span')),
          (E = _('svg')),
          (M = _('path')),
          (A = _('path')),
          (B = _('path')),
          (N = L()),
          (n1 = h('span')),
          (n1.innerHTML = ''),
          (m1 = L()),
          (s1 = h('div')),
          (U = h('div')),
          (W = h('div')),
          (h1 = h('span')),
          R(i1.$$.fragment),
          (e1 = L()),
          (_1 = h('span')),
          (_1.textContent = 'Chỉ mất "vài click" có ngay một lộ trình khám phá'),
          (r1 = L()),
          (b1 = h('div')),
          (S = h('div')),
          (X = h('span')),
          R(f1.$$.fragment),
          (h0 = L()),
          (O1 = h('span')),
          (O1.textContent =
            'Lịch trình bao gồm chi tiết chỗ ở, khám phá ẩm thực, địa điểm check-in,...'),
          (m0 = L()),
          (j1 = h('div')),
          (d1 = h('div')),
          (S1 = h('span')),
          R(y1.$$.fragment),
          (g0 = L()),
          (N1 = h('span')),
          (N1.textContent =
            'Địa điểm được đánh giá và thông qua bởi Avatour và người dân bản địa.'),
          l(
            s,
            'class',
            'absolute top-0 left-0 w-full duration-1000 h-full object-cover op-0 transform-origin-center <md:scale-150',
          ),
          w1(s.src, (o = pt)) || l(s, 'src', o),
          l(s, 'alt', 'thumbnail'),
          l(s, 'loading', 'lazy'),
          l(g, 'class', 'font-bold text-20px'),
          l(m, 'class', 'flex items-center gap-2'),
          l(v, 'class', 'flex items-center gap-2'),
          l(d, 'class', 'w-full bg-white flex flex-col gap-2 p-15px'),
          l(
            u,
            'class',
            'absolute hidden md:flex w-[150%] aspect-ratio-390/420 border-8 border-white rounded-25px items-end duration-1000 op-0',
          ),
          l(
            a,
            'class',
            'absolute z-2 md:relative w-full md:w-1/2 h-full flex items-center justify-center overflow-hidden',
          ),
          l(q, 'class', 'text-[#FBBD05]'),
          l(M, 'class', 'op-0 duration-200 delay-300'),
          l(M, 'd', 'M3 13.5L13 2.5'),
          l(M, 'stroke', '#FBBD05'),
          l(M, 'stroke-width', '5'),
          l(M, 'stroke-linecap', 'round'),
          f(M, '!delay-1300', t[2]),
          f(M, 'op-100', t[2]),
          l(A, 'class', 'op-0 duration-200 delay-200'),
          l(A, 'd', 'M3.99994 22L19.4297 20.1833'),
          l(A, 'stroke', '#FBBD05'),
          l(A, 'stroke-width', '5'),
          l(A, 'stroke-linecap', 'round'),
          f(A, '!delay-1500', t[2]),
          f(A, 'op-100', t[2]),
          l(B, 'class', 'op-0 duration-200 delay-100'),
          l(B, 'd', 'M4 31L18.5 38.5'),
          l(B, 'stroke', '#FBBD05'),
          l(B, 'stroke-width', '5'),
          l(B, 'stroke-linecap', 'round'),
          f(B, '!delay-1700', t[2]),
          f(B, 'op-100', t[2]),
          l(E, 'xmlns', 'http://www.w3.org/2000/svg'),
          l(E, 'width', '22'),
          l(E, 'height', '41'),
          l(E, 'viewBox', '0 0 22 41'),
          l(E, 'fill', 'none'),
          l(E, 'class', 'inline -mt-6 cursor'),
          l(n1, 'class', 'typing absolute left-0 top-0 pointer-events-none'),
          l(
            k,
            'class',
            'text-[2.4rem] leading-3rem md:text-2.6rem md:leading-3.2rem xl:text-2.8rem xl:leading-3.5rem 2xl:text-3rem 2xl:leading-[3.75rem] font-bold relative',
          ),
          l(h1, 'class', 'text-2.2rem'),
          l(_1, 'class', 'mt-2'),
          l(W, 'class', 'flex items-start gap-2 duration-500 translate-y-[-120%]'),
          f(W, '!translate-y-0', t[2]),
          f(W, '!delay-1500', t[2]),
          l(U, 'class', 'overflow-hidden'),
          l(X, 'class', 'text-[2.2rem]'),
          l(O1, 'class', 'mt-2'),
          l(S, 'class', 'flex items-start gap-2 duration-500 translate-y-[-120%]'),
          f(S, '!translate-y-0', t[2]),
          f(S, '!delay-2000', t[2]),
          l(b1, 'class', 'overflow-hidden'),
          l(S1, 'class', 'text-2.2rem'),
          l(N1, 'class', 'mt-2'),
          l(d1, 'class', 'flex items-start gap-2 duration-500 translate-y-[-120%]'),
          f(d1, '!translate-y-0', t[2]),
          f(d1, '!delay-2500', t[2]),
          l(j1, 'class', 'overflow-hidden'),
          l(s1, 'class', 'flex flex-col gap-4 mt-2'),
          l(
            w,
            'class',
            'absolute z-1 bg-#FFF8E1 md:bg-transparent w-full md:relative md:w-1/2 h-full flex flex-col gap-4 items-start justify-center overflow-hidden px-10 md:px-8 xl:px-12 2xl:px-16',
          ),
          l(
            n,
            'class',
            'relative w-[calc(100%_-_100px)] h-[580px] rounded-[15px] bg-[#FFF8E1] overflow-hidden flex',
          ),
          l(e, 'class', 'w-full h-full flex items-center justify-center');
      },
      m(V, Y) {
        O(V, e, Y),
          i(e, n),
          i(n, a),
          i(a, s),
          i(a, c),
          i(a, u),
          i(u, d),
          i(d, g),
          i(d, p),
          i(d, m),
          i(d, C),
          i(d, v),
          T(b, v, null),
          i(v, x),
          i(n, $),
          i(n, w),
          i(w, k),
          i(k, Z),
          i(k, q),
          i(k, j),
          i(k, F),
          i(F, E),
          i(E, M),
          i(E, A),
          i(E, B),
          i(k, N),
          i(k, n1),
          i(w, m1),
          i(w, s1),
          i(s1, U),
          i(U, W),
          i(W, h1),
          T(i1, h1, null),
          i(W, e1),
          i(W, _1),
          i(s1, r1),
          i(s1, b1),
          i(b1, S),
          i(S, X),
          T(f1, X, null),
          i(S, h0),
          i(S, O1),
          i(s1, m0),
          i(s1, j1),
          i(j1, d1),
          i(d1, S1),
          T(y1, S1, null),
          i(d1, g0),
          i(d1, N1),
          (t1 = !0),
          e0 ||
            ((v0 = [
              c1(
                (r = P1.call(null, s, {
                  class: '<md:op-15 <md:!scale-100 duration-2000 op-100',
                  enable: t[2],
                })),
              ),
              c1((y = P1.call(null, u, { class: '!w-390px !op-100 delay-1400', enable: t[2] }))),
              c1(
                (a1 = ht.call(null, n1, {
                  content: 'Có ngay lịch trình mong muốn chỉ bằng vài cú nhấp chuột',
                  speed: 200,
                  class: 'text-#FFF8E1 bg-#FFF8E1',
                  mount: t[2],
                })),
              ),
            ]),
            (e0 = !0));
      },
      p(V, Y) {
        r &&
          o1(r.update) &&
          Y & 4 &&
          r.update.call(null, {
            class: '<md:op-15 <md:!scale-100 duration-2000 op-100',
            enable: V[2],
          }),
          y &&
            o1(y.update) &&
            Y & 4 &&
            y.update.call(null, { class: '!w-390px !op-100 delay-1400', enable: V[2] }),
          (!t1 || Y & 4) && f(M, '!delay-1300', V[2]),
          (!t1 || Y & 4) && f(M, 'op-100', V[2]),
          (!t1 || Y & 4) && f(A, '!delay-1500', V[2]),
          (!t1 || Y & 4) && f(A, 'op-100', V[2]),
          (!t1 || Y & 4) && f(B, '!delay-1700', V[2]),
          (!t1 || Y & 4) && f(B, 'op-100', V[2]),
          a1 &&
            o1(a1.update) &&
            Y & 4 &&
            a1.update.call(null, {
              content: 'Có ngay lịch trình mong muốn chỉ bằng vài cú nhấp chuột',
              speed: 200,
              class: 'text-#FFF8E1 bg-#FFF8E1',
              mount: V[2],
            }),
          (!t1 || Y & 4) && f(W, '!translate-y-0', V[2]),
          (!t1 || Y & 4) && f(W, '!delay-1500', V[2]),
          (!t1 || Y & 4) && f(S, '!translate-y-0', V[2]),
          (!t1 || Y & 4) && f(S, '!delay-2000', V[2]),
          (!t1 || Y & 4) && f(d1, '!translate-y-0', V[2]),
          (!t1 || Y & 4) && f(d1, '!delay-2500', V[2]);
      },
      i(V) {
        t1 ||
          (D(b.$$.fragment, V),
          D(i1.$$.fragment, V),
          D(f1.$$.fragment, V),
          D(y1.$$.fragment, V),
          (t1 = !0));
      },
      o(V) {
        z(b.$$.fragment, V),
          z(i1.$$.fragment, V),
          z(f1.$$.fragment, V),
          z(y1.$$.fragment, V),
          (t1 = !1);
      },
      d(V) {
        V && H(e), I(b), I(i1), I(f1), I(y1), (e0 = !1), u1(v0);
      },
    }
  );
}
function $t(t) {
  let e, n;
  return (
    (e = new Z1({
      props: {
        $$slots: { default: [yt, ({ mount: a }) => ({ 2: a }), ({ mount: a }) => (a ? 4 : 0)] },
        $$scope: { ctx: t },
      },
    })),
    e.$on('introend', t[0]),
    e.$on('outroend', t[1]),
    {
      c() {
        R(e.$$.fragment);
      },
      m(a, s) {
        T(e, a, s), (n = !0);
      },
      p(a, [s]) {
        const o = {};
        s & 12 && (o.$$scope = { dirty: s, ctx: a }), e.$set(o);
      },
      i(a) {
        n || (D(e.$$.fragment, a), (n = !0));
      },
      o(a) {
        z(e.$$.fragment, a), (n = !1);
      },
      d(a) {
        I(e, a);
      },
    }
  );
}
function kt(t) {
  function e(a) {
    l1.call(this, t, a);
  }
  function n(a) {
    l1.call(this, t, a);
  }
  return [e, n];
}
class At extends Q {
  constructor(e) {
    super(), K(this, e, kt, $t, G, {});
  }
}
function Mt(t) {
  let e, n, a;
  return (
    (n = new Se({ props: { pages: [He, At, ge, ae, dt, tt] } })),
    {
      c() {
        (e = h('div')), R(n.$$.fragment), l(e, 'class', 'contents');
      },
      m(s, o) {
        O(s, e, o), T(n, e, null), (a = !0);
      },
      p: P,
      i(s) {
        a || (D(n.$$.fragment, s), (a = !0));
      },
      o(s) {
        z(n.$$.fragment, s), (a = !1);
      },
      d(s) {
        s && H(e), I(n);
      },
    }
  );
}
function Et(t) {
  return (document.querySelector('html').className = 'text-16px <sm:text-14px'), [];
}
class Lt extends Q {
  constructor(e) {
    super(), K(this, e, Et, Mt, G, {});
  }
}
new Lt({ target: document.getElementById('app') });
