const Qt = function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) a(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerpolicy && (i.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (i.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function a(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = t(r);
    fetch(r.href, i);
  }
};
Qt();
function Ma(e, o) {
  const t = Object.create(null),
    a = e.split(",");
  for (let r = 0; r < a.length; r++) t[a[r]] = !0;
  return o ? (r) => !!t[r.toLowerCase()] : (r) => !!t[r];
}
const Wt =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Xt = Ma(Wt);
function Ks(e) {
  return !!e || e === "";
}
function Ua(e) {
  if (U(e)) {
    const o = {};
    for (let t = 0; t < e.length; t++) {
      const a = e[t],
        r = ue(a) ? Gt(a) : Ua(a);
      if (r) for (const i in r) o[i] = r[i];
    }
    return o;
  } else {
    if (ue(e)) return e;
    if (ce(e)) return e;
  }
}
const Yt = /;(?![^(]*\))/g,
  Zt = /:(.+)/;
function Gt(e) {
  const o = {};
  return (
    e.split(Yt).forEach((t) => {
      if (t) {
        const a = t.split(Zt);
        a.length > 1 && (o[a[0].trim()] = a[1].trim());
      }
    }),
    o
  );
}
function Ba(e) {
  let o = "";
  if (ue(e)) o = e;
  else if (U(e))
    for (let t = 0; t < e.length; t++) {
      const a = Ba(e[t]);
      a && (o += a + " ");
    }
  else if (ce(e)) for (const t in e) e[t] && (o += t + " ");
  return o.trim();
}
function ei(e, o) {
  if (e.length !== o.length) return !1;
  let t = !0;
  for (let a = 0; t && a < e.length; a++) t = Do(e[a], o[a]);
  return t;
}
function Do(e, o) {
  if (e === o) return !0;
  let t = ms(e),
    a = ms(o);
  if (t || a) return t && a ? e.getTime() === o.getTime() : !1;
  if (((t = U(e)), (a = U(o)), t || a)) return t && a ? ei(e, o) : !1;
  if (((t = ce(e)), (a = ce(o)), t || a)) {
    if (!t || !a) return !1;
    const r = Object.keys(e).length,
      i = Object.keys(o).length;
    if (r !== i) return !1;
    for (const s in e) {
      const l = e.hasOwnProperty(s),
        c = o.hasOwnProperty(s);
      if ((l && !c) || (!l && c) || !Do(e[s], o[s])) return !1;
    }
  }
  return String(e) === String(o);
}
function ja(e, o) {
  return e.findIndex((t) => Do(t, o));
}
const d = (e) =>
    e == null
      ? ""
      : U(e) || (ce(e) && (e.toString === Ws || !K(e.toString)))
      ? JSON.stringify(e, zs, 2)
      : String(e),
  zs = (e, o) =>
    o && o.__v_isRef
      ? zs(e, o.value)
      : mo(o)
      ? {
          [`Map(${o.size})`]: [...o.entries()].reduce(
            (t, [a, r]) => ((t[`${a} =>`] = r), t),
            {}
          ),
        }
      : So(o)
      ? { [`Set(${o.size})`]: [...o.values()] }
      : ce(o) && !U(o) && !Xs(o)
      ? String(o)
      : o,
  ae = {},
  po = [],
  Ie = () => {},
  oi = () => !1,
  ai = /^on[^a-z]/,
  ia = (e) => ai.test(e),
  Ha = (e) => e.startsWith("onUpdate:"),
  fe = Object.assign,
  La = (e, o) => {
    const t = e.indexOf(o);
    t > -1 && e.splice(t, 1);
  },
  si = Object.prototype.hasOwnProperty,
  X = (e, o) => si.call(e, o),
  U = Array.isArray,
  mo = (e) => na(e) === "[object Map]",
  So = (e) => na(e) === "[object Set]",
  ms = (e) => e instanceof Date,
  K = (e) => typeof e == "function",
  ue = (e) => typeof e == "string",
  Ja = (e) => typeof e == "symbol",
  ce = (e) => e !== null && typeof e == "object",
  Qs = (e) => ce(e) && K(e.then) && K(e.catch),
  Ws = Object.prototype.toString,
  na = (e) => Ws.call(e),
  ti = (e) => na(e).slice(8, -1),
  Xs = (e) => na(e) === "[object Object]",
  Ka = (e) =>
    ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Ko = Ma(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  la = (e) => {
    const o = Object.create(null);
    return (t) => o[t] || (o[t] = e(t));
  },
  ii = /-(\w)/g,
  Re = la((e) => e.replace(ii, (o, t) => (t ? t.toUpperCase() : ""))),
  ni = /\B([A-Z])/g,
  Po = la((e) => e.replace(ni, "-$1").toLowerCase()),
  ra = la((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  va = la((e) => (e ? `on${ra(e)}` : "")),
  qo = (e, o) => !Object.is(e, o),
  zo = (e, o) => {
    for (let t = 0; t < e.length; t++) e[t](o);
  },
  Xo = (e, o, t) => {
    Object.defineProperty(e, o, { configurable: !0, enumerable: !1, value: t });
  },
  Yo = (e) => {
    const o = parseFloat(e);
    return isNaN(o) ? e : o;
  };
let _s;
const li = () =>
  _s ||
  (_s =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let Ye;
const Uo = [];
class ri {
  constructor(o = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !o &&
        Ye &&
        ((this.parent = Ye),
        (this.index = (Ye.scopes || (Ye.scopes = [])).push(this) - 1));
  }
  run(o) {
    if (this.active)
      try {
        return this.on(), o();
      } finally {
        this.off();
      }
  }
  on() {
    this.active && (Uo.push(this), (Ye = this));
  }
  off() {
    this.active && (Uo.pop(), (Ye = Uo[Uo.length - 1]));
  }
  stop(o) {
    if (this.active) {
      if (
        (this.effects.forEach((t) => t.stop()),
        this.cleanups.forEach((t) => t()),
        this.scopes && this.scopes.forEach((t) => t.stop(!0)),
        this.parent && !o)
      ) {
        const t = this.parent.scopes.pop();
        t &&
          t !== this &&
          ((this.parent.scopes[this.index] = t), (t.index = this.index));
      }
      this.active = !1;
    }
  }
}
function ci(e, o) {
  (o = o || Ye), o && o.active && o.effects.push(e);
}
const za = (e) => {
    const o = new Set(e);
    return (o.w = 0), (o.n = 0), o;
  },
  Ys = (e) => (e.w & Qe) > 0,
  Zs = (e) => (e.n & Qe) > 0,
  di = ({ deps: e }) => {
    if (e.length) for (let o = 0; o < e.length; o++) e[o].w |= Qe;
  },
  hi = (e) => {
    const { deps: o } = e;
    if (o.length) {
      let t = 0;
      for (let a = 0; a < o.length; a++) {
        const r = o[a];
        Ys(r) && !Zs(r) ? r.delete(e) : (o[t++] = r),
          (r.w &= ~Qe),
          (r.n &= ~Qe);
      }
      o.length = t;
    }
  },
  Aa = new WeakMap();
let To = 0,
  Qe = 1;
const Na = 30,
  xo = [];
let oo;
const ao = Symbol(""),
  ka = Symbol("");
class Qa {
  constructor(o, t = null, a) {
    (this.fn = o),
      (this.scheduler = t),
      (this.active = !0),
      (this.deps = []),
      ci(this, a);
  }
  run() {
    if (!this.active) return this.fn();
    if (!xo.includes(this))
      try {
        return (
          xo.push((oo = this)),
          ui(),
          (Qe = 1 << ++To),
          To <= Na ? di(this) : vs(this),
          this.fn()
        );
      } finally {
        To <= Na && hi(this), (Qe = 1 << --To), io(), xo.pop();
        const o = xo.length;
        oo = o > 0 ? xo[o - 1] : void 0;
      }
  }
  stop() {
    this.active && (vs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function vs(e) {
  const { deps: o } = e;
  if (o.length) {
    for (let t = 0; t < o.length; t++) o[t].delete(e);
    o.length = 0;
  }
}
let vo = !0;
const Wa = [];
function Ao() {
  Wa.push(vo), (vo = !1);
}
function ui() {
  Wa.push(vo), (vo = !0);
}
function io() {
  const e = Wa.pop();
  vo = e === void 0 ? !0 : e;
}
function Se(e, o, t) {
  if (!Gs()) return;
  let a = Aa.get(e);
  a || Aa.set(e, (a = new Map()));
  let r = a.get(t);
  r || a.set(t, (r = za())), et(r);
}
function Gs() {
  return vo && oo !== void 0;
}
function et(e, o) {
  let t = !1;
  To <= Na ? Zs(e) || ((e.n |= Qe), (t = !Ys(e))) : (t = !e.has(oo)),
    t && (e.add(oo), oo.deps.push(e));
}
function Ue(e, o, t, a, r, i) {
  const s = Aa.get(e);
  if (!s) return;
  let l = [];
  if (o === "clear") l = [...s.values()];
  else if (t === "length" && U(e))
    s.forEach((c, _) => {
      (_ === "length" || _ >= a) && l.push(c);
    });
  else
    switch ((t !== void 0 && l.push(s.get(t)), o)) {
      case "add":
        U(e)
          ? Ka(t) && l.push(s.get("length"))
          : (l.push(s.get(ao)), mo(e) && l.push(s.get(ka)));
        break;
      case "delete":
        U(e) || (l.push(s.get(ao)), mo(e) && l.push(s.get(ka)));
        break;
      case "set":
        mo(e) && l.push(s.get(ao));
        break;
    }
  if (l.length === 1) l[0] && ya(l[0]);
  else {
    const c = [];
    for (const _ of l) _ && c.push(..._);
    ya(za(c));
  }
}
function ya(e, o) {
  for (const t of U(e) ? e : [...e])
    (t !== oo || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
const fi = Ma("__proto__,__v_isRef,__isVue"),
  ot = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(Ja)
  ),
  pi = Xa(),
  mi = Xa(!1, !0),
  _i = Xa(!0),
  gs = vi();
function vi() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((o) => {
      e[o] = function (...t) {
        const a = Z(this);
        for (let i = 0, s = this.length; i < s; i++) Se(a, "get", i + "");
        const r = a[o](...t);
        return r === -1 || r === !1 ? a[o](...t.map(Z)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((o) => {
      e[o] = function (...t) {
        Ao();
        const a = Z(this)[o].apply(this, t);
        return io(), a;
      };
    }),
    e
  );
}
function Xa(e = !1, o = !1) {
  return function (a, r, i) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_raw" && i === (e ? (o ? qi : nt) : o ? it : tt).get(a))
      return a;
    const s = U(a);
    if (!e && s && X(gs, r)) return Reflect.get(gs, r, i);
    const l = Reflect.get(a, r, i);
    return (Ja(r) ? ot.has(r) : fi(r)) || (e || Se(a, "get", r), o)
      ? l
      : _e(l)
      ? !s || !Ka(r)
        ? l.value
        : l
      : ce(l)
      ? e
        ? lt(l)
        : Ga(l)
      : l;
  };
}
const gi = at(),
  Ci = at(!0);
function at(e = !1) {
  return function (t, a, r, i) {
    let s = t[a];
    if (!e && !os(r) && ((r = Z(r)), (s = Z(s)), !U(t) && _e(s) && !_e(r)))
      return (s.value = r), !0;
    const l = U(t) && Ka(a) ? Number(a) < t.length : X(t, a),
      c = Reflect.set(t, a, r, i);
    return (
      t === Z(i) && (l ? qo(r, s) && Ue(t, "set", a, r) : Ue(t, "add", a, r)), c
    );
  };
}
function bi(e, o) {
  const t = X(e, o);
  e[o];
  const a = Reflect.deleteProperty(e, o);
  return a && t && Ue(e, "delete", o, void 0), a;
}
function Si(e, o) {
  const t = Reflect.has(e, o);
  return (!Ja(o) || !ot.has(o)) && Se(e, "has", o), t;
}
function Pi(e) {
  return Se(e, "iterate", U(e) ? "length" : ao), Reflect.ownKeys(e);
}
const st = { get: pi, set: gi, deleteProperty: bi, has: Si, ownKeys: Pi },
  Ai = {
    get: _i,
    set(e, o) {
      return !0;
    },
    deleteProperty(e, o) {
      return !0;
    },
  },
  Ni = fe({}, st, { get: mi, set: Ci }),
  Ya = (e) => e,
  ca = (e) => Reflect.getPrototypeOf(e);
function Bo(e, o, t = !1, a = !1) {
  e = e.__v_raw;
  const r = Z(e),
    i = Z(o);
  o !== i && !t && Se(r, "get", o), !t && Se(r, "get", i);
  const { has: s } = ca(r),
    l = a ? Ya : t ? as : Vo;
  if (s.call(r, o)) return l(e.get(o));
  if (s.call(r, i)) return l(e.get(i));
  e !== r && e.get(o);
}
function jo(e, o = !1) {
  const t = this.__v_raw,
    a = Z(t),
    r = Z(e);
  return (
    e !== r && !o && Se(a, "has", e),
    !o && Se(a, "has", r),
    e === r ? t.has(e) : t.has(e) || t.has(r)
  );
}
function Ho(e, o = !1) {
  return (
    (e = e.__v_raw), !o && Se(Z(e), "iterate", ao), Reflect.get(e, "size", e)
  );
}
function Cs(e) {
  e = Z(e);
  const o = Z(this);
  return ca(o).has.call(o, e) || (o.add(e), Ue(o, "add", e, e)), this;
}
function bs(e, o) {
  o = Z(o);
  const t = Z(this),
    { has: a, get: r } = ca(t);
  let i = a.call(t, e);
  i || ((e = Z(e)), (i = a.call(t, e)));
  const s = r.call(t, e);
  return (
    t.set(e, o), i ? qo(o, s) && Ue(t, "set", e, o) : Ue(t, "add", e, o), this
  );
}
function Ss(e) {
  const o = Z(this),
    { has: t, get: a } = ca(o);
  let r = t.call(o, e);
  r || ((e = Z(e)), (r = t.call(o, e))), a && a.call(o, e);
  const i = o.delete(e);
  return r && Ue(o, "delete", e, void 0), i;
}
function Ps() {
  const e = Z(this),
    o = e.size !== 0,
    t = e.clear();
  return o && Ue(e, "clear", void 0, void 0), t;
}
function Lo(e, o) {
  return function (a, r) {
    const i = this,
      s = i.__v_raw,
      l = Z(s),
      c = o ? Ya : e ? as : Vo;
    return (
      !e && Se(l, "iterate", ao), s.forEach((_, g) => a.call(r, c(_), c(g), i))
    );
  };
}
function Jo(e, o, t) {
  return function (...a) {
    const r = this.__v_raw,
      i = Z(r),
      s = mo(i),
      l = e === "entries" || (e === Symbol.iterator && s),
      c = e === "keys" && s,
      _ = r[e](...a),
      g = t ? Ya : o ? as : Vo;
    return (
      !o && Se(i, "iterate", c ? ka : ao),
      {
        next() {
          const { value: A, done: N } = _.next();
          return N
            ? { value: A, done: N }
            : { value: l ? [g(A[0]), g(A[1])] : g(A), done: N };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function He(e) {
  return function (...o) {
    return e === "delete" ? !1 : this;
  };
}
function ki() {
  const e = {
      get(i) {
        return Bo(this, i);
      },
      get size() {
        return Ho(this);
      },
      has: jo,
      add: Cs,
      set: bs,
      delete: Ss,
      clear: Ps,
      forEach: Lo(!1, !1),
    },
    o = {
      get(i) {
        return Bo(this, i, !1, !0);
      },
      get size() {
        return Ho(this);
      },
      has: jo,
      add: Cs,
      set: bs,
      delete: Ss,
      clear: Ps,
      forEach: Lo(!1, !0),
    },
    t = {
      get(i) {
        return Bo(this, i, !0);
      },
      get size() {
        return Ho(this, !0);
      },
      has(i) {
        return jo.call(this, i, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: Lo(!0, !1),
    },
    a = {
      get(i) {
        return Bo(this, i, !0, !0);
      },
      get size() {
        return Ho(this, !0);
      },
      has(i) {
        return jo.call(this, i, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: Lo(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = Jo(i, !1, !1)),
        (t[i] = Jo(i, !0, !1)),
        (o[i] = Jo(i, !1, !0)),
        (a[i] = Jo(i, !0, !0));
    }),
    [e, t, o, a]
  );
}
const [yi, xi, Ti, Ii] = ki();
function Za(e, o) {
  const t = o ? (e ? Ii : Ti) : e ? xi : yi;
  return (a, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? a
      : Reflect.get(X(t, r) && r in a ? t : a, r, i);
}
const Ei = { get: Za(!1, !1) },
  Oi = { get: Za(!1, !0) },
  Fi = { get: Za(!0, !1) },
  tt = new WeakMap(),
  it = new WeakMap(),
  nt = new WeakMap(),
  qi = new WeakMap();
function Vi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ri(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Vi(ti(e));
}
function Ga(e) {
  return e && e.__v_isReadonly ? e : es(e, !1, st, Ei, tt);
}
function $i(e) {
  return es(e, !1, Ni, Oi, it);
}
function lt(e) {
  return es(e, !0, Ai, Fi, nt);
}
function es(e, o, t, a, r) {
  if (!ce(e) || (e.__v_raw && !(o && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const s = Ri(e);
  if (s === 0) return e;
  const l = new Proxy(e, s === 2 ? a : t);
  return r.set(e, l), l;
}
function _o(e) {
  return os(e) ? _o(e.__v_raw) : !!(e && e.__v_isReactive);
}
function os(e) {
  return !!(e && e.__v_isReadonly);
}
function rt(e) {
  return _o(e) || os(e);
}
function Z(e) {
  const o = e && e.__v_raw;
  return o ? Z(o) : e;
}
function ct(e) {
  return Xo(e, "__v_skip", !0), e;
}
const Vo = (e) => (ce(e) ? Ga(e) : e),
  as = (e) => (ce(e) ? lt(e) : e);
function dt(e) {
  Gs() && ((e = Z(e)), e.dep || (e.dep = za()), et(e.dep));
}
function ht(e, o) {
  (e = Z(e)), e.dep && ya(e.dep);
}
function _e(e) {
  return Boolean(e && e.__v_isRef === !0);
}
function p(e) {
  return Di(e, !1);
}
function Di(e, o) {
  return _e(e) ? e : new wi(e, o);
}
class wi {
  constructor(o, t) {
    (this._shallow = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = t ? o : Z(o)),
      (this._value = t ? o : Vo(o));
  }
  get value() {
    return dt(this), this._value;
  }
  set value(o) {
    (o = this._shallow ? o : Z(o)),
      qo(o, this._rawValue) &&
        ((this._rawValue = o),
        (this._value = this._shallow ? o : Vo(o)),
        ht(this));
  }
}
function Mi(e) {
  return _e(e) ? e.value : e;
}
const Ui = {
  get: (e, o, t) => Mi(Reflect.get(e, o, t)),
  set: (e, o, t, a) => {
    const r = e[o];
    return _e(r) && !_e(t) ? ((r.value = t), !0) : Reflect.set(e, o, t, a);
  },
};
function ut(e) {
  return _o(e) ? e : new Proxy(e, Ui);
}
class Bi {
  constructor(o, t, a) {
    (this._setter = t),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new Qa(o, () => {
        this._dirty || ((this._dirty = !0), ht(this));
      })),
      (this.__v_isReadonly = a);
  }
  get value() {
    const o = Z(this);
    return (
      dt(o),
      o._dirty && ((o._dirty = !1), (o._value = o.effect.run())),
      o._value
    );
  }
  set value(o) {
    this._setter(o);
  }
}
function ji(e, o) {
  let t, a;
  const r = K(e);
  return (
    r ? ((t = e), (a = Ie)) : ((t = e.get), (a = e.set)), new Bi(t, a, r || !a)
  );
}
Promise.resolve();
function Hi(e, o, ...t) {
  const a = e.vnode.props || ae;
  let r = t;
  const i = o.startsWith("update:"),
    s = i && o.slice(7);
  if (s && s in a) {
    const g = `${s === "modelValue" ? "model" : s}Modifiers`,
      { number: A, trim: N } = a[g] || ae;
    N ? (r = t.map((V) => V.trim())) : A && (r = t.map(Yo));
  }
  let l,
    c = a[(l = va(o))] || a[(l = va(Re(o)))];
  !c && i && (c = a[(l = va(Po(o)))]), c && xe(c, e, 6, r);
  const _ = a[l + "Once"];
  if (_) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), xe(_, e, 6, r);
  }
}
function ft(e, o, t = !1) {
  const a = o.emitsCache,
    r = a.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let s = {},
    l = !1;
  if (!K(e)) {
    const c = (_) => {
      const g = ft(_, o, !0);
      g && ((l = !0), fe(s, g));
    };
    !t && o.mixins.length && o.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !i && !l
    ? (a.set(e, null), null)
    : (U(i) ? i.forEach((c) => (s[c] = null)) : fe(s, i), a.set(e, s), s);
}
function ss(e, o) {
  return !e || !ia(o)
    ? !1
    : ((o = o.slice(2).replace(/Once$/, "")),
      X(e, o[0].toLowerCase() + o.slice(1)) || X(e, Po(o)) || X(e, o));
}
let ye = null,
  pt = null;
function Zo(e) {
  const o = ye;
  return (ye = e), (pt = (e && e.type.__scopeId) || null), o;
}
function Li(e, o = ye, t) {
  if (!o || e._n) return e;
  const a = (...r) => {
    a._d && Fs(-1);
    const i = Zo(o),
      s = e(...r);
    return Zo(i), a._d && Fs(1), s;
  };
  return (a._n = !0), (a._c = !0), (a._d = !0), a;
}
function ga(e) {
  const {
    type: o,
    vnode: t,
    proxy: a,
    withProxy: r,
    props: i,
    propsOptions: [s],
    slots: l,
    attrs: c,
    emit: _,
    render: g,
    renderCache: A,
    data: N,
    setupState: V,
    ctx: j,
    inheritAttrs: H,
  } = e;
  let D, B;
  const O = Zo(e);
  try {
    if (t.shapeFlag & 4) {
      const Q = r || a;
      (D = Ve(g.call(Q, Q, A, i, V, N, j))), (B = c);
    } else {
      const Q = o;
      (D = Ve(
        Q.length > 1 ? Q(i, { attrs: c, slots: l, emit: _ }) : Q(i, null)
      )),
        (B = o.props ? c : Ji(c));
    }
  } catch (Q) {
    (Eo.length = 0), fa(Q, e, 1), (D = Ee($e));
  }
  let z = D;
  if (B && H !== !1) {
    const Q = Object.keys(B),
      { shapeFlag: ee } = z;
    Q.length && ee & 7 && (s && Q.some(Ha) && (B = Ki(B, s)), (z = go(z, B)));
  }
  return (
    t.dirs && (z.dirs = z.dirs ? z.dirs.concat(t.dirs) : t.dirs),
    t.transition && (z.transition = t.transition),
    (D = z),
    Zo(O),
    D
  );
}
const Ji = (e) => {
    let o;
    for (const t in e)
      (t === "class" || t === "style" || ia(t)) && ((o || (o = {}))[t] = e[t]);
    return o;
  },
  Ki = (e, o) => {
    const t = {};
    for (const a in e) (!Ha(a) || !(a.slice(9) in o)) && (t[a] = e[a]);
    return t;
  };
function zi(e, o, t) {
  const { props: a, children: r, component: i } = e,
    { props: s, children: l, patchFlag: c } = o,
    _ = i.emitsOptions;
  if (o.dirs || o.transition) return !0;
  if (t && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return a ? As(a, s, _) : !!s;
    if (c & 8) {
      const g = o.dynamicProps;
      for (let A = 0; A < g.length; A++) {
        const N = g[A];
        if (s[N] !== a[N] && !ss(_, N)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : a === s
      ? !1
      : a
      ? s
        ? As(a, s, _)
        : !0
      : !!s;
  return !1;
}
function As(e, o, t) {
  const a = Object.keys(o);
  if (a.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < a.length; r++) {
    const i = a[r];
    if (o[i] !== e[i] && !ss(t, i)) return !0;
  }
  return !1;
}
function Qi({ vnode: e, parent: o }, t) {
  for (; o && o.subTree === e; ) ((e = o.vnode).el = t), (o = o.parent);
}
const Wi = (e) => e.__isSuspense;
function Xi(e, o) {
  o && o.pendingBranch
    ? U(e)
      ? o.effects.push(...e)
      : o.effects.push(e)
    : Yn(e);
}
function Yi(e, o) {
  if (de) {
    let t = de.provides;
    const a = de.parent && de.parent.provides;
    a === t && (t = de.provides = Object.create(a)), (t[e] = o);
  }
}
function Ca(e, o, t = !1) {
  const a = de || ye;
  if (a) {
    const r =
      a.parent == null
        ? a.vnode.appContext && a.vnode.appContext.provides
        : a.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return t && K(o) ? o.call(a.proxy) : o;
  }
}
function Zi() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    gt(() => {
      e.isMounted = !0;
    }),
    Ct(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Ae = [Function, Array],
  Gi = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: Ae,
      onEnter: Ae,
      onAfterEnter: Ae,
      onEnterCancelled: Ae,
      onBeforeLeave: Ae,
      onLeave: Ae,
      onAfterLeave: Ae,
      onLeaveCancelled: Ae,
      onBeforeAppear: Ae,
      onAppear: Ae,
      onAfterAppear: Ae,
      onAppearCancelled: Ae,
    },
    setup(e, { slots: o }) {
      const t = Mn(),
        a = Zi();
      let r;
      return () => {
        const i = o.default && _t(o.default(), !0);
        if (!i || !i.length) return;
        const s = Z(e),
          { mode: l } = s,
          c = i[0];
        if (a.isLeaving) return ba(c);
        const _ = Ns(c);
        if (!_) return ba(c);
        const g = xa(_, s, a, t);
        Ta(_, g);
        const A = t.subTree,
          N = A && Ns(A);
        let V = !1;
        const { getTransitionKey: j } = _.type;
        if (j) {
          const H = j();
          r === void 0 ? (r = H) : H !== r && ((r = H), (V = !0));
        }
        if (N && N.type !== $e && (!Ge(_, N) || V)) {
          const H = xa(N, s, a, t);
          if ((Ta(N, H), l === "out-in"))
            return (
              (a.isLeaving = !0),
              (H.afterLeave = () => {
                (a.isLeaving = !1), t.update();
              }),
              ba(c)
            );
          l === "in-out" &&
            _.type !== $e &&
            (H.delayLeave = (D, B, O) => {
              const z = mt(a, N);
              (z[String(N.key)] = N),
                (D._leaveCb = () => {
                  B(), (D._leaveCb = void 0), delete g.delayedLeave;
                }),
                (g.delayedLeave = O);
            });
        }
        return c;
      };
    },
  },
  en = Gi;
function mt(e, o) {
  const { leavingVNodes: t } = e;
  let a = t.get(o.type);
  return a || ((a = Object.create(null)), t.set(o.type, a)), a;
}
function xa(e, o, t, a) {
  const {
      appear: r,
      mode: i,
      persisted: s = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: _,
      onEnterCancelled: g,
      onBeforeLeave: A,
      onLeave: N,
      onAfterLeave: V,
      onLeaveCancelled: j,
      onBeforeAppear: H,
      onAppear: D,
      onAfterAppear: B,
      onAppearCancelled: O,
    } = o,
    z = String(e.key),
    Q = mt(t, e),
    ee = (J, G) => {
      J && xe(J, a, 9, G);
    },
    le = {
      mode: i,
      persisted: s,
      beforeEnter(J) {
        let G = l;
        if (!t.isMounted)
          if (r) G = H || l;
          else return;
        J._leaveCb && J._leaveCb(!0);
        const Y = Q[z];
        Y && Ge(e, Y) && Y.el._leaveCb && Y.el._leaveCb(), ee(G, [J]);
      },
      enter(J) {
        let G = c,
          Y = _,
          re = g;
        if (!t.isMounted)
          if (r) (G = D || c), (Y = B || _), (re = O || g);
          else return;
        let he = !1;
        const pe = (J._enterCb = (Oe) => {
          he ||
            ((he = !0),
            Oe ? ee(re, [J]) : ee(Y, [J]),
            le.delayedLeave && le.delayedLeave(),
            (J._enterCb = void 0));
        });
        G ? (G(J, pe), G.length <= 1 && pe()) : pe();
      },
      leave(J, G) {
        const Y = String(e.key);
        if ((J._enterCb && J._enterCb(!0), t.isUnmounting)) return G();
        ee(A, [J]);
        let re = !1;
        const he = (J._leaveCb = (pe) => {
          re ||
            ((re = !0),
            G(),
            pe ? ee(j, [J]) : ee(V, [J]),
            (J._leaveCb = void 0),
            Q[Y] === e && delete Q[Y]);
        });
        (Q[Y] = e), N ? (N(J, he), N.length <= 1 && he()) : he();
      },
      clone(J) {
        return xa(J, o, t, a);
      },
    };
  return le;
}
function ba(e) {
  if (da(e)) return (e = go(e)), (e.children = null), e;
}
function Ns(e) {
  return da(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Ta(e, o) {
  e.shapeFlag & 6 && e.component
    ? Ta(e.component.subTree, o)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = o.clone(e.ssContent)),
      (e.ssFallback.transition = o.clone(e.ssFallback)))
    : (e.transition = o);
}
function _t(e, o = !1) {
  let t = [],
    a = 0;
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    i.type === T
      ? (i.patchFlag & 128 && a++, (t = t.concat(_t(i.children, o))))
      : (o || i.type !== $e) && t.push(i);
  }
  if (a > 1) for (let r = 0; r < t.length; r++) t[r].patchFlag = -2;
  return t;
}
const Ia = (e) => !!e.type.__asyncLoader,
  da = (e) => e.type.__isKeepAlive;
function on(e, o) {
  vt(e, "a", o);
}
function an(e, o) {
  vt(e, "da", o);
}
function vt(e, o, t = de) {
  const a =
    e.__wdc ||
    (e.__wdc = () => {
      let r = t;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((ha(o, a, t), t)) {
    let r = t.parent;
    for (; r && r.parent; )
      da(r.parent.vnode) && sn(a, o, t, r), (r = r.parent);
  }
}
function sn(e, o, t, a) {
  const r = ha(o, e, a, !0);
  bt(() => {
    La(a[o], r);
  }, t);
}
function ha(e, o, t = de, a = !1) {
  if (t) {
    const r = t[e] || (t[e] = []),
      i =
        o.__weh ||
        (o.__weh = (...s) => {
          if (t.isUnmounted) return;
          Ao(), Co(t);
          const l = xe(o, t, e, s);
          return to(), io(), l;
        });
    return a ? r.unshift(i) : r.push(i), i;
  }
}
const Be =
    (e) =>
    (o, t = de) =>
      (!aa || e === "sp") && ha(e, o, t),
  tn = Be("bm"),
  gt = Be("m"),
  nn = Be("bu"),
  ln = Be("u"),
  Ct = Be("bum"),
  bt = Be("um"),
  rn = Be("sp"),
  cn = Be("rtg"),
  dn = Be("rtc");
function hn(e, o = de) {
  ha("ec", e, o);
}
let Ea = !0;
function un(e) {
  const o = Pt(e),
    t = e.proxy,
    a = e.ctx;
  (Ea = !1), o.beforeCreate && ks(o.beforeCreate, e, "bc");
  const {
    data: r,
    computed: i,
    methods: s,
    watch: l,
    provide: c,
    inject: _,
    created: g,
    beforeMount: A,
    mounted: N,
    beforeUpdate: V,
    updated: j,
    activated: H,
    deactivated: D,
    beforeDestroy: B,
    beforeUnmount: O,
    destroyed: z,
    unmounted: Q,
    render: ee,
    renderTracked: le,
    renderTriggered: J,
    errorCaptured: G,
    serverPrefetch: Y,
    expose: re,
    inheritAttrs: he,
    components: pe,
    directives: Oe,
    filters: No,
  } = o;
  if ((_ && fn(_, a, null, e.appContext.config.unwrapInjectedRef), s))
    for (const ne in s) {
      const se = s[ne];
      K(se) && (a[ne] = se.bind(t));
    }
  if (r) {
    const ne = r.call(t, t);
    ce(ne) && (e.data = Ga(ne));
  }
  if (((Ea = !0), i))
    for (const ne in i) {
      const se = i[ne],
        De = K(se) ? se.bind(t, t) : K(se.get) ? se.get.bind(t, t) : Ie,
        pa = !K(se) && K(se.set) ? se.set.bind(t) : Ie,
        ko = ji({ get: De, set: pa });
      Object.defineProperty(a, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => ko.value,
        set: (no) => (ko.value = no),
      });
    }
  if (l) for (const ne in l) St(l[ne], a, t, ne);
  if (c) {
    const ne = K(c) ? c.call(t) : c;
    Reflect.ownKeys(ne).forEach((se) => {
      Yi(se, ne[se]);
    });
  }
  g && ks(g, e, "c");
  function ve(ne, se) {
    U(se) ? se.forEach((De) => ne(De.bind(t))) : se && ne(se.bind(t));
  }
  if (
    (ve(tn, A),
    ve(gt, N),
    ve(nn, V),
    ve(ln, j),
    ve(on, H),
    ve(an, D),
    ve(hn, G),
    ve(dn, le),
    ve(cn, J),
    ve(Ct, O),
    ve(bt, Q),
    ve(rn, Y),
    U(re))
  )
    if (re.length) {
      const ne = e.exposed || (e.exposed = {});
      re.forEach((se) => {
        Object.defineProperty(ne, se, {
          get: () => t[se],
          set: (De) => (t[se] = De),
        });
      });
    } else e.exposed || (e.exposed = {});
  ee && e.render === Ie && (e.render = ee),
    he != null && (e.inheritAttrs = he),
    pe && (e.components = pe),
    Oe && (e.directives = Oe);
}
function fn(e, o, t = Ie, a = !1) {
  U(e) && (e = Oa(e));
  for (const r in e) {
    const i = e[r];
    let s;
    ce(i)
      ? "default" in i
        ? (s = Ca(i.from || r, i.default, !0))
        : (s = Ca(i.from || r))
      : (s = Ca(i)),
      _e(s) && a
        ? Object.defineProperty(o, r, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (l) => (s.value = l),
          })
        : (o[r] = s);
  }
}
function ks(e, o, t) {
  xe(U(e) ? e.map((a) => a.bind(o.proxy)) : e.bind(o.proxy), o, t);
}
function St(e, o, t, a) {
  const r = a.includes(".") ? Ht(t, a) : () => t[a];
  if (ue(e)) {
    const i = o[e];
    K(i) && Sa(r, i);
  } else if (K(e)) Sa(r, e.bind(t));
  else if (ce(e))
    if (U(e)) e.forEach((i) => St(i, o, t, a));
    else {
      const i = K(e.handler) ? e.handler.bind(t) : o[e.handler];
      K(i) && Sa(r, i, e);
    }
}
function Pt(e) {
  const o = e.type,
    { mixins: t, extends: a } = o,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: s },
    } = e.appContext,
    l = i.get(o);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !t && !a
      ? (c = o)
      : ((c = {}), r.length && r.forEach((_) => Go(c, _, s, !0)), Go(c, o, s)),
    i.set(o, c),
    c
  );
}
function Go(e, o, t, a = !1) {
  const { mixins: r, extends: i } = o;
  i && Go(e, i, t, !0), r && r.forEach((s) => Go(e, s, t, !0));
  for (const s in o)
    if (!(a && s === "expose")) {
      const l = pn[s] || (t && t[s]);
      e[s] = l ? l(e[s], o[s]) : o[s];
    }
  return e;
}
const pn = {
  data: ys,
  props: Ze,
  emits: Ze,
  methods: Ze,
  computed: Ze,
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  components: Ze,
  directives: Ze,
  watch: _n,
  provide: ys,
  inject: mn,
};
function ys(e, o) {
  return o
    ? e
      ? function () {
          return fe(
            K(e) ? e.call(this, this) : e,
            K(o) ? o.call(this, this) : o
          );
        }
      : o
    : e;
}
function mn(e, o) {
  return Ze(Oa(e), Oa(o));
}
function Oa(e) {
  if (U(e)) {
    const o = {};
    for (let t = 0; t < e.length; t++) o[e[t]] = e[t];
    return o;
  }
  return e;
}
function me(e, o) {
  return e ? [...new Set([].concat(e, o))] : o;
}
function Ze(e, o) {
  return e ? fe(fe(Object.create(null), e), o) : o;
}
function _n(e, o) {
  if (!e) return o;
  if (!o) return e;
  const t = fe(Object.create(null), e);
  for (const a in o) t[a] = me(e[a], o[a]);
  return t;
}
function vn(e, o, t, a = !1) {
  const r = {},
    i = {};
  Xo(i, ua, 1), (e.propsDefaults = Object.create(null)), At(e, o, r, i);
  for (const s in e.propsOptions[0]) s in r || (r[s] = void 0);
  t ? (e.props = a ? r : $i(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function gn(e, o, t, a) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: s },
    } = e,
    l = Z(r),
    [c] = e.propsOptions;
  let _ = !1;
  if ((a || s > 0) && !(s & 16)) {
    if (s & 8) {
      const g = e.vnode.dynamicProps;
      for (let A = 0; A < g.length; A++) {
        let N = g[A];
        const V = o[N];
        if (c)
          if (X(i, N)) V !== i[N] && ((i[N] = V), (_ = !0));
          else {
            const j = Re(N);
            r[j] = Fa(c, l, j, V, e, !1);
          }
        else V !== i[N] && ((i[N] = V), (_ = !0));
      }
    }
  } else {
    At(e, o, r, i) && (_ = !0);
    let g;
    for (const A in l)
      (!o || (!X(o, A) && ((g = Po(A)) === A || !X(o, g)))) &&
        (c
          ? t &&
            (t[A] !== void 0 || t[g] !== void 0) &&
            (r[A] = Fa(c, l, A, void 0, e, !0))
          : delete r[A]);
    if (i !== l) for (const A in i) (!o || !X(o, A)) && (delete i[A], (_ = !0));
  }
  _ && Ue(e, "set", "$attrs");
}
function At(e, o, t, a) {
  const [r, i] = e.propsOptions;
  let s = !1,
    l;
  if (o)
    for (let c in o) {
      if (Ko(c)) continue;
      const _ = o[c];
      let g;
      r && X(r, (g = Re(c)))
        ? !i || !i.includes(g)
          ? (t[g] = _)
          : ((l || (l = {}))[g] = _)
        : ss(e.emitsOptions, c) ||
          ((!(c in a) || _ !== a[c]) && ((a[c] = _), (s = !0)));
    }
  if (i) {
    const c = Z(t),
      _ = l || ae;
    for (let g = 0; g < i.length; g++) {
      const A = i[g];
      t[A] = Fa(r, c, A, _[A], e, !X(_, A));
    }
  }
  return s;
}
function Fa(e, o, t, a, r, i) {
  const s = e[t];
  if (s != null) {
    const l = X(s, "default");
    if (l && a === void 0) {
      const c = s.default;
      if (s.type !== Function && K(c)) {
        const { propsDefaults: _ } = r;
        t in _ ? (a = _[t]) : (Co(r), (a = _[t] = c.call(null, o)), to());
      } else a = c;
    }
    s[0] &&
      (i && !l ? (a = !1) : s[1] && (a === "" || a === Po(t)) && (a = !0));
  }
  return a;
}
function Nt(e, o, t = !1) {
  const a = o.propsCache,
    r = a.get(e);
  if (r) return r;
  const i = e.props,
    s = {},
    l = [];
  let c = !1;
  if (!K(e)) {
    const g = (A) => {
      c = !0;
      const [N, V] = Nt(A, o, !0);
      fe(s, N), V && l.push(...V);
    };
    !t && o.mixins.length && o.mixins.forEach(g),
      e.extends && g(e.extends),
      e.mixins && e.mixins.forEach(g);
  }
  if (!i && !c) return a.set(e, po), po;
  if (U(i))
    for (let g = 0; g < i.length; g++) {
      const A = Re(i[g]);
      xs(A) && (s[A] = ae);
    }
  else if (i)
    for (const g in i) {
      const A = Re(g);
      if (xs(A)) {
        const N = i[g],
          V = (s[A] = U(N) || K(N) ? { type: N } : N);
        if (V) {
          const j = Es(Boolean, V.type),
            H = Es(String, V.type);
          (V[0] = j > -1),
            (V[1] = H < 0 || j < H),
            (j > -1 || X(V, "default")) && l.push(A);
        }
      }
    }
  const _ = [s, l];
  return a.set(e, _), _;
}
function xs(e) {
  return e[0] !== "$";
}
function Ts(e) {
  const o = e && e.toString().match(/^\s*function (\w+)/);
  return o ? o[1] : e === null ? "null" : "";
}
function Is(e, o) {
  return Ts(e) === Ts(o);
}
function Es(e, o) {
  return U(o) ? o.findIndex((t) => Is(t, e)) : K(o) && Is(o, e) ? 0 : -1;
}
const kt = (e) => e[0] === "_" || e === "$stable",
  ts = (e) => (U(e) ? e.map(Ve) : [Ve(e)]),
  Cn = (e, o, t) => {
    const a = Li((...r) => ts(o(...r)), t);
    return (a._c = !1), a;
  },
  yt = (e, o, t) => {
    const a = e._ctx;
    for (const r in e) {
      if (kt(r)) continue;
      const i = e[r];
      if (K(i)) o[r] = Cn(r, i, a);
      else if (i != null) {
        const s = ts(i);
        o[r] = () => s;
      }
    }
  },
  xt = (e, o) => {
    const t = ts(o);
    e.slots.default = () => t;
  },
  bn = (e, o) => {
    if (e.vnode.shapeFlag & 32) {
      const t = o._;
      t ? ((e.slots = Z(o)), Xo(o, "_", t)) : yt(o, (e.slots = {}));
    } else (e.slots = {}), o && xt(e, o);
    Xo(e.slots, ua, 1);
  },
  Sn = (e, o, t) => {
    const { vnode: a, slots: r } = e;
    let i = !0,
      s = ae;
    if (a.shapeFlag & 32) {
      const l = o._;
      l
        ? t && l === 1
          ? (i = !1)
          : (fe(r, o), !t && l === 1 && delete r._)
        : ((i = !o.$stable), yt(o, r)),
        (s = o);
    } else o && (xt(e, o), (s = { default: 1 }));
    if (i) for (const l in r) !kt(l) && !(l in s) && delete r[l];
  };
function E(e, o) {
  const t = ye;
  if (t === null) return e;
  const a = t.proxy,
    r = e.dirs || (e.dirs = []);
  for (let i = 0; i < o.length; i++) {
    let [s, l, c, _ = ae] = o[i];
    K(s) && (s = { mounted: s, updated: s }),
      s.deep && eo(l),
      r.push({
        dir: s,
        instance: a,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: _,
      });
  }
  return e;
}
function We(e, o, t, a) {
  const r = e.dirs,
    i = o && o.dirs;
  for (let s = 0; s < r.length; s++) {
    const l = r[s];
    i && (l.oldValue = i[s].value);
    let c = l.dir[a];
    c && (Ao(), xe(c, t, 8, [e.el, l, e, o]), io());
  }
}
function Tt() {
  return {
    app: null,
    config: {
      isNativeTag: oi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Pn = 0;
function An(e, o) {
  return function (a, r = null) {
    r != null && !ce(r) && (r = null);
    const i = Tt(),
      s = new Set();
    let l = !1;
    const c = (i.app = {
      _uid: Pn++,
      _component: a,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Gn,
      get config() {
        return i.config;
      },
      set config(_) {},
      use(_, ...g) {
        return (
          s.has(_) ||
            (_ && K(_.install)
              ? (s.add(_), _.install(c, ...g))
              : K(_) && (s.add(_), _(c, ...g))),
          c
        );
      },
      mixin(_) {
        return i.mixins.includes(_) || i.mixins.push(_), c;
      },
      component(_, g) {
        return g ? ((i.components[_] = g), c) : i.components[_];
      },
      directive(_, g) {
        return g ? ((i.directives[_] = g), c) : i.directives[_];
      },
      mount(_, g, A) {
        if (!l) {
          const N = Ee(a, r);
          return (
            (N.appContext = i),
            g && o ? o(N, _) : e(N, _, A),
            (l = !0),
            (c._container = _),
            (_.__vue_app__ = c),
            ls(N.component) || N.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(_, g) {
        return (i.provides[_] = g), c;
      },
    });
    return c;
  };
}
function qa(e, o, t, a, r = !1) {
  if (U(e)) {
    e.forEach((N, V) => qa(N, o && (U(o) ? o[V] : o), t, a, r));
    return;
  }
  if (Ia(a) && !r) return;
  const i = a.shapeFlag & 4 ? ls(a.component) || a.component.proxy : a.el,
    s = r ? null : i,
    { i: l, r: c } = e,
    _ = o && o.r,
    g = l.refs === ae ? (l.refs = {}) : l.refs,
    A = l.setupState;
  if (
    (_ != null &&
      _ !== c &&
      (ue(_)
        ? ((g[_] = null), X(A, _) && (A[_] = null))
        : _e(_) && (_.value = null)),
    K(c))
  )
    ze(c, l, 12, [s, g]);
  else {
    const N = ue(c),
      V = _e(c);
    if (N || V) {
      const j = () => {
        if (e.f) {
          const H = N ? g[c] : c.value;
          r
            ? U(H) && La(H, i)
            : U(H)
            ? H.includes(i) || H.push(i)
            : N
            ? (g[c] = [i])
            : ((c.value = [i]), e.k && (g[e.k] = c.value));
        } else
          N
            ? ((g[c] = s), X(A, c) && (A[c] = s))
            : _e(c) && ((c.value = s), e.k && (g[e.k] = s));
      };
      s ? ((j.id = -1), ge(j, t)) : j();
    }
  }
}
const ge = Xi;
function Nn(e) {
  return kn(e);
}
function kn(e, o) {
  const t = li();
  t.__VUE__ = !0;
  const {
      insert: a,
      remove: r,
      patchProp: i,
      createElement: s,
      createText: l,
      createComment: c,
      setText: _,
      setElementText: g,
      parentNode: A,
      nextSibling: N,
      setScopeId: V = Ie,
      cloneNode: j,
      insertStaticContent: H,
    } = e,
    D = (
      f,
      m,
      v,
      S = null,
      C = null,
      y = null,
      I = !1,
      k = null,
      x = !!m.dynamicChildren
    ) => {
      if (f === m) return;
      f && !Ge(f, m) && ((S = Mo(f)), je(f, C, y, !0), (f = null)),
        m.patchFlag === -2 && ((x = !1), (m.dynamicChildren = null));
      const { type: P, ref: w, shapeFlag: q } = m;
      switch (P) {
        case is:
          B(f, m, v, S);
          break;
        case $e:
          O(f, m, v, S);
          break;
        case Qo:
          f == null && z(m, v, S, I);
          break;
        case T:
          Oe(f, m, v, S, C, y, I, k, x);
          break;
        default:
          q & 1
            ? le(f, m, v, S, C, y, I, k, x)
            : q & 6
            ? No(f, m, v, S, C, y, I, k, x)
            : (q & 64 || q & 128) && P.process(f, m, v, S, C, y, I, k, x, lo);
      }
      w != null && C && qa(w, f && f.ref, y, m || f, !m);
    },
    B = (f, m, v, S) => {
      if (f == null) a((m.el = l(m.children)), v, S);
      else {
        const C = (m.el = f.el);
        m.children !== f.children && _(C, m.children);
      }
    },
    O = (f, m, v, S) => {
      f == null ? a((m.el = c(m.children || "")), v, S) : (m.el = f.el);
    },
    z = (f, m, v, S) => {
      [f.el, f.anchor] = H(f.children, m, v, S);
    },
    Q = ({ el: f, anchor: m }, v, S) => {
      let C;
      for (; f && f !== m; ) (C = N(f)), a(f, v, S), (f = C);
      a(m, v, S);
    },
    ee = ({ el: f, anchor: m }) => {
      let v;
      for (; f && f !== m; ) (v = N(f)), r(f), (f = v);
      r(m);
    },
    le = (f, m, v, S, C, y, I, k, x) => {
      (I = I || m.type === "svg"),
        f == null ? J(m, v, S, C, y, I, k, x) : re(f, m, C, y, I, k, x);
    },
    J = (f, m, v, S, C, y, I, k) => {
      let x, P;
      const {
        type: w,
        props: q,
        shapeFlag: M,
        transition: L,
        patchFlag: W,
        dirs: ie,
      } = f;
      if (f.el && j !== void 0 && W === -1) x = f.el = j(f.el);
      else {
        if (
          ((x = f.el = s(f.type, y, q && q.is, q)),
          M & 8
            ? g(x, f.children)
            : M & 16 &&
              Y(f.children, x, null, S, C, y && w !== "foreignObject", I, k),
          ie && We(f, null, S, "created"),
          q)
        ) {
          for (const te in q)
            te !== "value" &&
              !Ko(te) &&
              i(x, te, null, q[te], y, f.children, S, C, we);
          "value" in q && i(x, "value", null, q.value),
            (P = q.onVnodeBeforeMount) && qe(P, S, f);
        }
        G(x, f, f.scopeId, I, S);
      }
      ie && We(f, null, S, "beforeMount");
      const oe = (!C || (C && !C.pendingBranch)) && L && !L.persisted;
      oe && L.beforeEnter(x),
        a(x, m, v),
        ((P = q && q.onVnodeMounted) || oe || ie) &&
          ge(() => {
            P && qe(P, S, f), oe && L.enter(x), ie && We(f, null, S, "mounted");
          }, C);
    },
    G = (f, m, v, S, C) => {
      if ((v && V(f, v), S)) for (let y = 0; y < S.length; y++) V(f, S[y]);
      if (C) {
        let y = C.subTree;
        if (m === y) {
          const I = C.vnode;
          G(f, I, I.scopeId, I.slotScopeIds, C.parent);
        }
      }
    },
    Y = (f, m, v, S, C, y, I, k, x = 0) => {
      for (let P = x; P < f.length; P++) {
        const w = (f[P] = k ? Je(f[P]) : Ve(f[P]));
        D(null, w, m, v, S, C, y, I, k);
      }
    },
    re = (f, m, v, S, C, y, I) => {
      const k = (m.el = f.el);
      let { patchFlag: x, dynamicChildren: P, dirs: w } = m;
      x |= f.patchFlag & 16;
      const q = f.props || ae,
        M = m.props || ae;
      let L;
      v && Xe(v, !1),
        (L = M.onVnodeBeforeUpdate) && qe(L, v, m, f),
        w && We(m, f, v, "beforeUpdate"),
        v && Xe(v, !0);
      const W = C && m.type !== "foreignObject";
      if (
        (P
          ? he(f.dynamicChildren, P, k, v, S, W, y)
          : I || De(f, m, k, null, v, S, W, y, !1),
        x > 0)
      ) {
        if (x & 16) pe(k, m, q, M, v, S, C);
        else if (
          (x & 2 && q.class !== M.class && i(k, "class", null, M.class, C),
          x & 4 && i(k, "style", q.style, M.style, C),
          x & 8)
        ) {
          const ie = m.dynamicProps;
          for (let oe = 0; oe < ie.length; oe++) {
            const te = ie[oe],
              Te = q[te],
              ro = M[te];
            (ro !== Te || te === "value") &&
              i(k, te, Te, ro, C, f.children, v, S, we);
          }
        }
        x & 1 && f.children !== m.children && g(k, m.children);
      } else !I && P == null && pe(k, m, q, M, v, S, C);
      ((L = M.onVnodeUpdated) || w) &&
        ge(() => {
          L && qe(L, v, m, f), w && We(m, f, v, "updated");
        }, S);
    },
    he = (f, m, v, S, C, y, I) => {
      for (let k = 0; k < m.length; k++) {
        const x = f[k],
          P = m[k],
          w =
            x.el && (x.type === T || !Ge(x, P) || x.shapeFlag & 70)
              ? A(x.el)
              : v;
        D(x, P, w, null, S, C, y, I, !0);
      }
    },
    pe = (f, m, v, S, C, y, I) => {
      if (v !== S) {
        for (const k in S) {
          if (Ko(k)) continue;
          const x = S[k],
            P = v[k];
          x !== P && k !== "value" && i(f, k, P, x, I, m.children, C, y, we);
        }
        if (v !== ae)
          for (const k in v)
            !Ko(k) && !(k in S) && i(f, k, v[k], null, I, m.children, C, y, we);
        "value" in S && i(f, "value", v.value, S.value);
      }
    },
    Oe = (f, m, v, S, C, y, I, k, x) => {
      const P = (m.el = f ? f.el : l("")),
        w = (m.anchor = f ? f.anchor : l(""));
      let { patchFlag: q, dynamicChildren: M, slotScopeIds: L } = m;
      L && (k = k ? k.concat(L) : L),
        f == null
          ? (a(P, v, S), a(w, v, S), Y(m.children, v, w, C, y, I, k, x))
          : q > 0 && q & 64 && M && f.dynamicChildren
          ? (he(f.dynamicChildren, M, v, C, y, I, k),
            (m.key != null || (C && m === C.subTree)) && It(f, m, !0))
          : De(f, m, v, w, C, y, I, k, x);
    },
    No = (f, m, v, S, C, y, I, k, x) => {
      (m.slotScopeIds = k),
        f == null
          ? m.shapeFlag & 512
            ? C.ctx.activate(m, v, S, I, x)
            : wo(m, v, S, C, y, I, x)
          : ve(f, m, x);
    },
    wo = (f, m, v, S, C, y, I) => {
      const k = (f.component = wn(f, S, C));
      if ((da(f) && (k.ctx.renderer = lo), Un(k), k.asyncDep)) {
        if ((C && C.registerDep(k, ne), !f.el)) {
          const x = (k.subTree = Ee($e));
          O(null, x, m, v);
        }
        return;
      }
      ne(k, f, m, v, C, y, I);
    },
    ve = (f, m, v) => {
      const S = (m.component = f.component);
      if (zi(f, m, v))
        if (S.asyncDep && !S.asyncResolved) {
          se(S, m, v);
          return;
        } else (S.next = m), Wn(S.update), S.update();
      else (m.component = f.component), (m.el = f.el), (S.vnode = m);
    },
    ne = (f, m, v, S, C, y, I) => {
      const k = () => {
          if (f.isMounted) {
            let { next: w, bu: q, u: M, parent: L, vnode: W } = f,
              ie = w,
              oe;
            Xe(f, !1),
              w ? ((w.el = W.el), se(f, w, I)) : (w = W),
              q && zo(q),
              (oe = w.props && w.props.onVnodeBeforeUpdate) && qe(oe, L, w, W),
              Xe(f, !0);
            const te = ga(f),
              Te = f.subTree;
            (f.subTree = te),
              D(Te, te, A(Te.el), Mo(Te), f, C, y),
              (w.el = te.el),
              ie === null && Qi(f, te.el),
              M && ge(M, C),
              (oe = w.props && w.props.onVnodeUpdated) &&
                ge(() => qe(oe, L, w, W), C);
          } else {
            let w;
            const { el: q, props: M } = m,
              { bm: L, m: W, parent: ie } = f,
              oe = Ia(m);
            if (
              (Xe(f, !1),
              L && zo(L),
              !oe && (w = M && M.onVnodeBeforeMount) && qe(w, ie, m),
              Xe(f, !0),
              q && _a)
            ) {
              const te = () => {
                (f.subTree = ga(f)), _a(q, f.subTree, f, C, null);
              };
              oe
                ? m.type.__asyncLoader().then(() => !f.isUnmounted && te())
                : te();
            } else {
              const te = (f.subTree = ga(f));
              D(null, te, v, S, f, C, y), (m.el = te.el);
            }
            if ((W && ge(W, C), !oe && (w = M && M.onVnodeMounted))) {
              const te = m;
              ge(() => qe(w, ie, te), C);
            }
            m.shapeFlag & 256 && f.a && ge(f.a, C),
              (f.isMounted = !0),
              (m = v = S = null);
          }
        },
        x = (f.effect = new Qa(k, () => Dt(f.update), f.scope)),
        P = (f.update = x.run.bind(x));
      (P.id = f.uid), Xe(f, !0), P();
    },
    se = (f, m, v) => {
      m.component = f;
      const S = f.vnode.props;
      (f.vnode = m),
        (f.next = null),
        gn(f, m.props, S, v),
        Sn(f, m.children, v),
        Ao(),
        cs(void 0, f.update),
        io();
    },
    De = (f, m, v, S, C, y, I, k, x = !1) => {
      const P = f && f.children,
        w = f ? f.shapeFlag : 0,
        q = m.children,
        { patchFlag: M, shapeFlag: L } = m;
      if (M > 0) {
        if (M & 128) {
          ko(P, q, v, S, C, y, I, k, x);
          return;
        } else if (M & 256) {
          pa(P, q, v, S, C, y, I, k, x);
          return;
        }
      }
      L & 8
        ? (w & 16 && we(P, C, y), q !== P && g(v, q))
        : w & 16
        ? L & 16
          ? ko(P, q, v, S, C, y, I, k, x)
          : we(P, C, y, !0)
        : (w & 8 && g(v, ""), L & 16 && Y(q, v, S, C, y, I, k, x));
    },
    pa = (f, m, v, S, C, y, I, k, x) => {
      (f = f || po), (m = m || po);
      const P = f.length,
        w = m.length,
        q = Math.min(P, w);
      let M;
      for (M = 0; M < q; M++) {
        const L = (m[M] = x ? Je(m[M]) : Ve(m[M]));
        D(f[M], L, v, null, C, y, I, k, x);
      }
      P > w ? we(f, C, y, !0, !1, q) : Y(m, v, S, C, y, I, k, x, q);
    },
    ko = (f, m, v, S, C, y, I, k, x) => {
      let P = 0;
      const w = m.length;
      let q = f.length - 1,
        M = w - 1;
      for (; P <= q && P <= M; ) {
        const L = f[P],
          W = (m[P] = x ? Je(m[P]) : Ve(m[P]));
        if (Ge(L, W)) D(L, W, v, null, C, y, I, k, x);
        else break;
        P++;
      }
      for (; P <= q && P <= M; ) {
        const L = f[q],
          W = (m[M] = x ? Je(m[M]) : Ve(m[M]));
        if (Ge(L, W)) D(L, W, v, null, C, y, I, k, x);
        else break;
        q--, M--;
      }
      if (P > q) {
        if (P <= M) {
          const L = M + 1,
            W = L < w ? m[L].el : S;
          for (; P <= M; )
            D(null, (m[P] = x ? Je(m[P]) : Ve(m[P])), v, W, C, y, I, k, x), P++;
        }
      } else if (P > M) for (; P <= q; ) je(f[P], C, y, !0), P++;
      else {
        const L = P,
          W = P,
          ie = new Map();
        for (P = W; P <= M; P++) {
          const Ce = (m[P] = x ? Je(m[P]) : Ve(m[P]));
          Ce.key != null && ie.set(Ce.key, P);
        }
        let oe,
          te = 0;
        const Te = M - W + 1;
        let ro = !1,
          us = 0;
        const yo = new Array(Te);
        for (P = 0; P < Te; P++) yo[P] = 0;
        for (P = L; P <= q; P++) {
          const Ce = f[P];
          if (te >= Te) {
            je(Ce, C, y, !0);
            continue;
          }
          let Fe;
          if (Ce.key != null) Fe = ie.get(Ce.key);
          else
            for (oe = W; oe <= M; oe++)
              if (yo[oe - W] === 0 && Ge(Ce, m[oe])) {
                Fe = oe;
                break;
              }
          Fe === void 0
            ? je(Ce, C, y, !0)
            : ((yo[Fe - W] = P + 1),
              Fe >= us ? (us = Fe) : (ro = !0),
              D(Ce, m[Fe], v, null, C, y, I, k, x),
              te++);
        }
        const fs = ro ? yn(yo) : po;
        for (oe = fs.length - 1, P = Te - 1; P >= 0; P--) {
          const Ce = W + P,
            Fe = m[Ce],
            ps = Ce + 1 < w ? m[Ce + 1].el : S;
          yo[P] === 0
            ? D(null, Fe, v, ps, C, y, I, k, x)
            : ro && (oe < 0 || P !== fs[oe] ? no(Fe, v, ps, 2) : oe--);
        }
      }
    },
    no = (f, m, v, S, C = null) => {
      const { el: y, type: I, transition: k, children: x, shapeFlag: P } = f;
      if (P & 6) {
        no(f.component.subTree, m, v, S);
        return;
      }
      if (P & 128) {
        f.suspense.move(m, v, S);
        return;
      }
      if (P & 64) {
        I.move(f, m, v, lo);
        return;
      }
      if (I === T) {
        a(y, m, v);
        for (let q = 0; q < x.length; q++) no(x[q], m, v, S);
        a(f.anchor, m, v);
        return;
      }
      if (I === Qo) {
        Q(f, m, v);
        return;
      }
      if (S !== 2 && P & 1 && k)
        if (S === 0) k.beforeEnter(y), a(y, m, v), ge(() => k.enter(y), C);
        else {
          const { leave: q, delayLeave: M, afterLeave: L } = k,
            W = () => a(y, m, v),
            ie = () => {
              q(y, () => {
                W(), L && L();
              });
            };
          M ? M(y, W, ie) : ie();
        }
      else a(y, m, v);
    },
    je = (f, m, v, S = !1, C = !1) => {
      const {
        type: y,
        props: I,
        ref: k,
        children: x,
        dynamicChildren: P,
        shapeFlag: w,
        patchFlag: q,
        dirs: M,
      } = f;
      if ((k != null && qa(k, null, v, f, !0), w & 256)) {
        m.ctx.deactivate(f);
        return;
      }
      const L = w & 1 && M,
        W = !Ia(f);
      let ie;
      if ((W && (ie = I && I.onVnodeBeforeUnmount) && qe(ie, m, f), w & 6))
        zt(f.component, v, S);
      else {
        if (w & 128) {
          f.suspense.unmount(v, S);
          return;
        }
        L && We(f, null, m, "beforeUnmount"),
          w & 64
            ? f.type.remove(f, m, v, C, lo, S)
            : P && (y !== T || (q > 0 && q & 64))
            ? we(P, m, v, !1, !0)
            : ((y === T && q & 384) || (!C && w & 16)) && we(x, m, v),
          S && ds(f);
      }
      ((W && (ie = I && I.onVnodeUnmounted)) || L) &&
        ge(() => {
          ie && qe(ie, m, f), L && We(f, null, m, "unmounted");
        }, v);
    },
    ds = (f) => {
      const { type: m, el: v, anchor: S, transition: C } = f;
      if (m === T) {
        Kt(v, S);
        return;
      }
      if (m === Qo) {
        ee(f);
        return;
      }
      const y = () => {
        r(v), C && !C.persisted && C.afterLeave && C.afterLeave();
      };
      if (f.shapeFlag & 1 && C && !C.persisted) {
        const { leave: I, delayLeave: k } = C,
          x = () => I(v, y);
        k ? k(f.el, y, x) : x();
      } else y();
    },
    Kt = (f, m) => {
      let v;
      for (; f !== m; ) (v = N(f)), r(f), (f = v);
      r(m);
    },
    zt = (f, m, v) => {
      const { bum: S, scope: C, update: y, subTree: I, um: k } = f;
      S && zo(S),
        C.stop(),
        y && ((y.active = !1), je(I, f, m, v)),
        k && ge(k, m),
        ge(() => {
          f.isUnmounted = !0;
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          f.asyncDep &&
          !f.asyncResolved &&
          f.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve());
    },
    we = (f, m, v, S = !1, C = !1, y = 0) => {
      for (let I = y; I < f.length; I++) je(f[I], m, v, S, C);
    },
    Mo = (f) =>
      f.shapeFlag & 6
        ? Mo(f.component.subTree)
        : f.shapeFlag & 128
        ? f.suspense.next()
        : N(f.anchor || f.el),
    hs = (f, m, v) => {
      f == null
        ? m._vnode && je(m._vnode, null, null, !0)
        : D(m._vnode || null, f, m, null, null, null, v),
        Ut(),
        (m._vnode = f);
    },
    lo = {
      p: D,
      um: je,
      m: no,
      r: ds,
      mt: wo,
      mc: Y,
      pc: De,
      pbc: he,
      n: Mo,
      o: e,
    };
  let ma, _a;
  return (
    o && ([ma, _a] = o(lo)), { render: hs, hydrate: ma, createApp: An(hs, ma) }
  );
}
function Xe({ effect: e, update: o }, t) {
  e.allowRecurse = o.allowRecurse = t;
}
function It(e, o, t = !1) {
  const a = e.children,
    r = o.children;
  if (U(a) && U(r))
    for (let i = 0; i < a.length; i++) {
      const s = a[i];
      let l = r[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = Je(r[i])), (l.el = s.el)),
        t || It(s, l));
    }
}
function yn(e) {
  const o = e.slice(),
    t = [0];
  let a, r, i, s, l;
  const c = e.length;
  for (a = 0; a < c; a++) {
    const _ = e[a];
    if (_ !== 0) {
      if (((r = t[t.length - 1]), e[r] < _)) {
        (o[a] = r), t.push(a);
        continue;
      }
      for (i = 0, s = t.length - 1; i < s; )
        (l = (i + s) >> 1), e[t[l]] < _ ? (i = l + 1) : (s = l);
      _ < e[t[i]] && (i > 0 && (o[a] = t[i - 1]), (t[i] = a));
    }
  }
  for (i = t.length, s = t[i - 1]; i-- > 0; ) (t[i] = s), (s = o[s]);
  return t;
}
const xn = (e) => e.__isTeleport,
  Et = "components";
function Ne(e, o) {
  return In(Et, e, !0, o) || e;
}
const Tn = Symbol();
function In(e, o, t = !0, a = !1) {
  const r = ye || de;
  if (r) {
    const i = r.type;
    if (e === Et) {
      const l = Ln(i);
      if (l && (l === o || l === Re(o) || l === ra(Re(o)))) return i;
    }
    const s = Os(r[e] || i[e], o) || Os(r.appContext[e], o);
    return !s && a ? i : s;
  }
}
function Os(e, o) {
  return e && (e[o] || e[Re(o)] || e[ra(Re(o))]);
}
const T = Symbol(void 0),
  is = Symbol(void 0),
  $e = Symbol(void 0),
  Qo = Symbol(void 0),
  Eo = [];
let so = null;
function h(e = !1) {
  Eo.push((so = e ? null : []));
}
function En() {
  Eo.pop(), (so = Eo[Eo.length - 1] || null);
}
let ea = 1;
function Fs(e) {
  ea += e;
}
function Ot(e) {
  return (
    (e.dynamicChildren = ea > 0 ? so || po : null),
    En(),
    ea > 0 && so && so.push(e),
    e
  );
}
function u(e, o, t, a, r, i) {
  return Ot(n(e, o, t, a, r, i, !0));
}
function ke(e, o, t, a, r) {
  return Ot(Ee(e, o, t, a, r, !0));
}
function On(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ge(e, o) {
  return e.type === o.type && e.key === o.key;
}
const ua = "__vInternal",
  Ft = ({ key: e }) => (e != null ? e : null),
  Wo = ({ ref: e, ref_key: o, ref_for: t }) =>
    e != null
      ? ue(e) || _e(e) || K(e)
        ? { i: ye, r: e, k: o, f: !!t }
        : e
      : null;
function n(
  e,
  o = null,
  t = null,
  a = 0,
  r = null,
  i = e === T ? 0 : 1,
  s = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: o,
    key: o && Ft(o),
    ref: o && Wo(o),
    scopeId: pt,
    slotScopeIds: null,
    children: t,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: a,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    l
      ? (ns(c, t), i & 128 && e.normalize(c))
      : t && (c.shapeFlag |= ue(t) ? 8 : 16),
    ea > 0 &&
      !s &&
      so &&
      (c.patchFlag > 0 || i & 6) &&
      c.patchFlag !== 32 &&
      so.push(c),
    c
  );
}
const Ee = Fn;
function Fn(e, o = null, t = null, a = 0, r = null, i = !1) {
  if (((!e || e === Tn) && (e = $e), On(e))) {
    const l = go(e, o, !0);
    return t && ns(l, t), l;
  }
  if ((Jn(e) && (e = e.__vccOpts), o)) {
    o = qn(o);
    let { class: l, style: c } = o;
    l && !ue(l) && (o.class = Ba(l)),
      ce(c) && (rt(c) && !U(c) && (c = fe({}, c)), (o.style = Ua(c)));
  }
  const s = ue(e) ? 1 : Wi(e) ? 128 : xn(e) ? 64 : ce(e) ? 4 : K(e) ? 2 : 0;
  return n(e, o, t, a, r, s, i, !0);
}
function qn(e) {
  return e ? (rt(e) || ua in e ? fe({}, e) : e) : null;
}
function go(e, o, t = !1) {
  const { props: a, ref: r, patchFlag: i, children: s } = e,
    l = o ? Vn(a || {}, o) : a;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Ft(l),
    ref:
      o && o.ref ? (t && r ? (U(r) ? r.concat(Wo(o)) : [r, Wo(o)]) : Wo(o)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: o && e.type !== T ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && go(e.ssContent),
    ssFallback: e.ssFallback && go(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function $(e = " ", o = 0) {
  return Ee(is, null, e, o);
}
function qt(e, o) {
  const t = Ee(Qo, null, e);
  return (t.staticCount = o), t;
}
function b(e = "", o = !1) {
  return o ? (h(), ke($e, null, e)) : Ee($e, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean"
    ? Ee($e)
    : U(e)
    ? Ee(T, null, e.slice())
    : typeof e == "object"
    ? Je(e)
    : Ee(is, null, String(e));
}
function Je(e) {
  return e.el === null || e.memo ? e : go(e);
}
function ns(e, o) {
  let t = 0;
  const { shapeFlag: a } = e;
  if (o == null) o = null;
  else if (U(o)) t = 16;
  else if (typeof o == "object")
    if (a & 65) {
      const r = o.default;
      r && (r._c && (r._d = !1), ns(e, r()), r._c && (r._d = !0));
      return;
    } else {
      t = 32;
      const r = o._;
      !r && !(ua in o)
        ? (o._ctx = ye)
        : r === 3 &&
          ye &&
          (ye.slots._ === 1 ? (o._ = 1) : ((o._ = 2), (e.patchFlag |= 1024)));
    }
  else
    K(o)
      ? ((o = { default: o, _ctx: ye }), (t = 32))
      : ((o = String(o)), a & 64 ? ((t = 16), (o = [$(o)])) : (t = 8));
  (e.children = o), (e.shapeFlag |= t);
}
function Vn(...e) {
  const o = {};
  for (let t = 0; t < e.length; t++) {
    const a = e[t];
    for (const r in a)
      if (r === "class")
        o.class !== a.class && (o.class = Ba([o.class, a.class]));
      else if (r === "style") o.style = Ua([o.style, a.style]);
      else if (ia(r)) {
        const i = o[r],
          s = a[r];
        i !== s && !(U(i) && i.includes(s)) && (o[r] = i ? [].concat(i, s) : s);
      } else r !== "" && (o[r] = a[r]);
  }
  return o;
}
function qe(e, o, t, a = null) {
  xe(e, o, 7, [t, a]);
}
function F(e, o, t, a) {
  let r;
  const i = t && t[a];
  if (U(e) || ue(e)) {
    r = new Array(e.length);
    for (let s = 0, l = e.length; s < l; s++)
      r[s] = o(e[s], s, void 0, i && i[s]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let s = 0; s < e; s++) r[s] = o(s + 1, s, void 0, i && i[s]);
  } else if (ce(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (s, l) => o(s, l, void 0, i && i[l]));
    else {
      const s = Object.keys(e);
      r = new Array(s.length);
      for (let l = 0, c = s.length; l < c; l++) {
        const _ = s[l];
        r[l] = o(e[_], _, l, i && i[l]);
      }
    }
  else r = [];
  return t && (t[a] = r), r;
}
const Va = (e) => (e ? (Vt(e) ? ls(e) || e.proxy : Va(e.parent)) : null),
  oa = fe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Va(e.parent),
    $root: (e) => Va(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Pt(e),
    $forceUpdate: (e) => () => Dt(e.update),
    $nextTick: (e) => zn.bind(e.proxy),
    $watch: (e) => Zn.bind(e),
  }),
  Rn = {
    get({ _: e }, o) {
      const {
        ctx: t,
        setupState: a,
        data: r,
        props: i,
        accessCache: s,
        type: l,
        appContext: c,
      } = e;
      let _;
      if (o[0] !== "$") {
        const V = s[o];
        if (V !== void 0)
          switch (V) {
            case 1:
              return a[o];
            case 2:
              return r[o];
            case 4:
              return t[o];
            case 3:
              return i[o];
          }
        else {
          if (a !== ae && X(a, o)) return (s[o] = 1), a[o];
          if (r !== ae && X(r, o)) return (s[o] = 2), r[o];
          if ((_ = e.propsOptions[0]) && X(_, o)) return (s[o] = 3), i[o];
          if (t !== ae && X(t, o)) return (s[o] = 4), t[o];
          Ea && (s[o] = 0);
        }
      }
      const g = oa[o];
      let A, N;
      if (g) return o === "$attrs" && Se(e, "get", o), g(e);
      if ((A = l.__cssModules) && (A = A[o])) return A;
      if (t !== ae && X(t, o)) return (s[o] = 4), t[o];
      if (((N = c.config.globalProperties), X(N, o))) return N[o];
    },
    set({ _: e }, o, t) {
      const { data: a, setupState: r, ctx: i } = e;
      if (r !== ae && X(r, o)) r[o] = t;
      else if (a !== ae && X(a, o)) a[o] = t;
      else if (X(e.props, o)) return !1;
      return o[0] === "$" && o.slice(1) in e ? !1 : ((i[o] = t), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: o,
          accessCache: t,
          ctx: a,
          appContext: r,
          propsOptions: i,
        },
      },
      s
    ) {
      let l;
      return (
        !!t[s] ||
        (e !== ae && X(e, s)) ||
        (o !== ae && X(o, s)) ||
        ((l = i[0]) && X(l, s)) ||
        X(a, s) ||
        X(oa, s) ||
        X(r.config.globalProperties, s)
      );
    },
  },
  $n = Tt();
let Dn = 0;
function wn(e, o, t) {
  const a = e.type,
    r = (o ? o.appContext : e.appContext) || $n,
    i = {
      uid: Dn++,
      vnode: e,
      type: a,
      parent: o,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new ri(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: o ? o.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Nt(a, r),
      emitsOptions: ft(a, r),
      emit: null,
      emitted: null,
      propsDefaults: ae,
      inheritAttrs: a.inheritAttrs,
      ctx: ae,
      data: ae,
      props: ae,
      attrs: ae,
      slots: ae,
      refs: ae,
      setupState: ae,
      setupContext: null,
      suspense: t,
      suspenseId: t ? t.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = o ? o.root : i),
    (i.emit = Hi.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let de = null;
const Mn = () => de || ye,
  Co = (e) => {
    (de = e), e.scope.on();
  },
  to = () => {
    de && de.scope.off(), (de = null);
  };
function Vt(e) {
  return e.vnode.shapeFlag & 4;
}
let aa = !1;
function Un(e, o = !1) {
  aa = o;
  const { props: t, children: a } = e.vnode,
    r = Vt(e);
  vn(e, t, r, o), bn(e, a);
  const i = r ? Bn(e, o) : void 0;
  return (aa = !1), i;
}
function Bn(e, o) {
  const t = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = ct(new Proxy(e.ctx, Rn)));
  const { setup: a } = t;
  if (a) {
    const r = (e.setupContext = a.length > 1 ? Hn(e) : null);
    Co(e), Ao();
    const i = ze(a, e, 0, [e.props, r]);
    if ((io(), to(), Qs(i))) {
      if ((i.then(to, to), o))
        return i
          .then((s) => {
            qs(e, s, o);
          })
          .catch((s) => {
            fa(s, e, 0);
          });
      e.asyncDep = i;
    } else qs(e, i, o);
  } else Rt(e, o);
}
function qs(e, o, t) {
  K(o)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = o)
      : (e.render = o)
    : ce(o) && (e.setupState = ut(o)),
    Rt(e, t);
}
let Vs;
function Rt(e, o, t) {
  const a = e.type;
  if (!e.render) {
    if (!o && Vs && !a.render) {
      const r = a.template;
      if (r) {
        const { isCustomElement: i, compilerOptions: s } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = a,
          _ = fe(fe({ isCustomElement: i, delimiters: l }, s), c);
        a.render = Vs(r, _);
      }
    }
    e.render = a.render || Ie;
  }
  Co(e), Ao(), un(e), io(), to();
}
function jn(e) {
  return new Proxy(e.attrs, {
    get(o, t) {
      return Se(e, "get", "$attrs"), o[t];
    },
  });
}
function Hn(e) {
  const o = (a) => {
    e.exposed = a || {};
  };
  let t;
  return {
    get attrs() {
      return t || (t = jn(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: o,
  };
}
function ls(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ut(ct(e.exposed)), {
        get(o, t) {
          if (t in o) return o[t];
          if (t in oa) return oa[t](e);
        },
      }))
    );
}
function Ln(e) {
  return (K(e) && e.displayName) || e.name;
}
function Jn(e) {
  return K(e) && "__vccOpts" in e;
}
function ze(e, o, t, a) {
  let r;
  try {
    r = a ? e(...a) : e();
  } catch (i) {
    fa(i, o, t);
  }
  return r;
}
function xe(e, o, t, a) {
  if (K(e)) {
    const i = ze(e, o, t, a);
    return (
      i &&
        Qs(i) &&
        i.catch((s) => {
          fa(s, o, t);
        }),
      i
    );
  }
  const r = [];
  for (let i = 0; i < e.length; i++) r.push(xe(e[i], o, t, a));
  return r;
}
function fa(e, o, t, a = !0) {
  const r = o ? o.vnode : null;
  if (o) {
    let i = o.parent;
    const s = o.proxy,
      l = t;
    for (; i; ) {
      const _ = i.ec;
      if (_) {
        for (let g = 0; g < _.length; g++) if (_[g](e, s, l) === !1) return;
      }
      i = i.parent;
    }
    const c = o.appContext.config.errorHandler;
    if (c) {
      ze(c, null, 10, [e, s, l]);
      return;
    }
  }
  Kn(e, t, r, a);
}
function Kn(e, o, t, a = !0) {
  console.error(e);
}
let sa = !1,
  Ra = !1;
const be = [];
let Me = 0;
const Oo = [];
let Io = null,
  uo = 0;
const Fo = [];
let Le = null,
  fo = 0;
const $t = Promise.resolve();
let rs = null,
  $a = null;
function zn(e) {
  const o = rs || $t;
  return e ? o.then(this ? e.bind(this) : e) : o;
}
function Qn(e) {
  let o = Me + 1,
    t = be.length;
  for (; o < t; ) {
    const a = (o + t) >>> 1;
    Ro(be[a]) < e ? (o = a + 1) : (t = a);
  }
  return o;
}
function Dt(e) {
  (!be.length || !be.includes(e, sa && e.allowRecurse ? Me + 1 : Me)) &&
    e !== $a &&
    (e.id == null ? be.push(e) : be.splice(Qn(e.id), 0, e), wt());
}
function wt() {
  !sa && !Ra && ((Ra = !0), (rs = $t.then(Bt)));
}
function Wn(e) {
  const o = be.indexOf(e);
  o > Me && be.splice(o, 1);
}
function Mt(e, o, t, a) {
  U(e)
    ? t.push(...e)
    : (!o || !o.includes(e, e.allowRecurse ? a + 1 : a)) && t.push(e),
    wt();
}
function Xn(e) {
  Mt(e, Io, Oo, uo);
}
function Yn(e) {
  Mt(e, Le, Fo, fo);
}
function cs(e, o = null) {
  if (Oo.length) {
    for (
      $a = o, Io = [...new Set(Oo)], Oo.length = 0, uo = 0;
      uo < Io.length;
      uo++
    )
      Io[uo]();
    (Io = null), (uo = 0), ($a = null), cs(e, o);
  }
}
function Ut(e) {
  if (Fo.length) {
    const o = [...new Set(Fo)];
    if (((Fo.length = 0), Le)) {
      Le.push(...o);
      return;
    }
    for (Le = o, Le.sort((t, a) => Ro(t) - Ro(a)), fo = 0; fo < Le.length; fo++)
      Le[fo]();
    (Le = null), (fo = 0);
  }
}
const Ro = (e) => (e.id == null ? 1 / 0 : e.id);
function Bt(e) {
  (Ra = !1), (sa = !0), cs(e), be.sort((t, a) => Ro(t) - Ro(a));
  const o = Ie;
  try {
    for (Me = 0; Me < be.length; Me++) {
      const t = be[Me];
      t && t.active !== !1 && ze(t, null, 14);
    }
  } finally {
    (Me = 0),
      (be.length = 0),
      Ut(),
      (sa = !1),
      (rs = null),
      (be.length || Oo.length || Fo.length) && Bt(e);
  }
}
const Rs = {};
function Sa(e, o, t) {
  return jt(e, o, t);
}
function jt(
  e,
  o,
  { immediate: t, deep: a, flush: r, onTrack: i, onTrigger: s } = ae
) {
  const l = de;
  let c,
    _ = !1,
    g = !1;
  if (
    (_e(e)
      ? ((c = () => e.value), (_ = !!e._shallow))
      : _o(e)
      ? ((c = () => e), (a = !0))
      : U(e)
      ? ((g = !0),
        (_ = e.some(_o)),
        (c = () =>
          e.map((B) => {
            if (_e(B)) return B.value;
            if (_o(B)) return eo(B);
            if (K(B)) return ze(B, l, 2);
          })))
      : K(e)
      ? o
        ? (c = () => ze(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return A && A(), xe(e, l, 3, [N]);
          })
      : (c = Ie),
    o && a)
  ) {
    const B = c;
    c = () => eo(B());
  }
  let A,
    N = (B) => {
      A = D.onStop = () => {
        ze(B, l, 4);
      };
    };
  if (aa)
    return (N = Ie), o ? t && xe(o, l, 3, [c(), g ? [] : void 0, N]) : c(), Ie;
  let V = g ? [] : Rs;
  const j = () => {
    if (!!D.active)
      if (o) {
        const B = D.run();
        (a || _ || (g ? B.some((O, z) => qo(O, V[z])) : qo(B, V))) &&
          (A && A(), xe(o, l, 3, [B, V === Rs ? void 0 : V, N]), (V = B));
      } else D.run();
  };
  j.allowRecurse = !!o;
  let H;
  r === "sync"
    ? (H = j)
    : r === "post"
    ? (H = () => ge(j, l && l.suspense))
    : (H = () => {
        !l || l.isMounted ? Xn(j) : j();
      });
  const D = new Qa(c, H);
  return (
    o
      ? t
        ? j()
        : (V = D.run())
      : r === "post"
      ? ge(D.run.bind(D), l && l.suspense)
      : D.run(),
    () => {
      D.stop(), l && l.scope && La(l.scope.effects, D);
    }
  );
}
function Zn(e, o, t) {
  const a = this.proxy,
    r = ue(e) ? (e.includes(".") ? Ht(a, e) : () => a[e]) : e.bind(a, a);
  let i;
  K(o) ? (i = o) : ((i = o.handler), (t = o));
  const s = de;
  Co(this);
  const l = jt(r, i.bind(a), t);
  return s ? Co(s) : to(), l;
}
function Ht(e, o) {
  const t = o.split(".");
  return () => {
    let a = e;
    for (let r = 0; r < t.length && a; r++) a = a[t[r]];
    return a;
  };
}
function eo(e, o) {
  if (!ce(e) || e.__v_skip || ((o = o || new Set()), o.has(e))) return e;
  if ((o.add(e), _e(e))) eo(e.value, o);
  else if (U(e)) for (let t = 0; t < e.length; t++) eo(e[t], o);
  else if (So(e) || mo(e))
    e.forEach((t) => {
      eo(t, o);
    });
  else if (Xs(e)) for (const t in e) eo(e[t], o);
  return e;
}
const Gn = "3.2.25",
  el = "http://www.w3.org/2000/svg",
  co = typeof document != "undefined" ? document : null,
  $s = new Map(),
  ol = {
    insert: (e, o, t) => {
      o.insertBefore(e, t || null);
    },
    remove: (e) => {
      const o = e.parentNode;
      o && o.removeChild(e);
    },
    createElement: (e, o, t, a) => {
      const r = o
        ? co.createElementNS(el, e)
        : co.createElement(e, t ? { is: t } : void 0);
      return (
        e === "select" &&
          a &&
          a.multiple != null &&
          r.setAttribute("multiple", a.multiple),
        r
      );
    },
    createText: (e) => co.createTextNode(e),
    createComment: (e) => co.createComment(e),
    setText: (e, o) => {
      e.nodeValue = o;
    },
    setElementText: (e, o) => {
      e.textContent = o;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => co.querySelector(e),
    setScopeId(e, o) {
      e.setAttribute(o, "");
    },
    cloneNode(e) {
      const o = e.cloneNode(!0);
      return "_value" in e && (o._value = e._value), o;
    },
    insertStaticContent(e, o, t, a) {
      const r = t ? t.previousSibling : o.lastChild;
      let i = $s.get(e);
      if (!i) {
        const s = co.createElement("template");
        if (((s.innerHTML = a ? `<svg>${e}</svg>` : e), (i = s.content), a)) {
          const l = i.firstChild;
          for (; l.firstChild; ) i.appendChild(l.firstChild);
          i.removeChild(l);
        }
        $s.set(e, i);
      }
      return (
        o.insertBefore(i.cloneNode(!0), t),
        [r ? r.nextSibling : o.firstChild, t ? t.previousSibling : o.lastChild]
      );
    },
  };
function al(e, o, t) {
  const a = e._vtc;
  a && (o = (o ? [o, ...a] : [...a]).join(" ")),
    o == null
      ? e.removeAttribute("class")
      : t
      ? e.setAttribute("class", o)
      : (e.className = o);
}
function sl(e, o, t) {
  const a = e.style,
    r = ue(t);
  if (t && !r) {
    for (const i in t) Da(a, i, t[i]);
    if (o && !ue(o)) for (const i in o) t[i] == null && Da(a, i, "");
  } else {
    const i = a.display;
    r ? o !== t && (a.cssText = t) : o && e.removeAttribute("style"),
      "_vod" in e && (a.display = i);
  }
}
const Ds = /\s*!important$/;
function Da(e, o, t) {
  if (U(t)) t.forEach((a) => Da(e, o, a));
  else if (o.startsWith("--")) e.setProperty(o, t);
  else {
    const a = tl(e, o);
    Ds.test(t)
      ? e.setProperty(Po(a), t.replace(Ds, ""), "important")
      : (e[a] = t);
  }
}
const ws = ["Webkit", "Moz", "ms"],
  Pa = {};
function tl(e, o) {
  const t = Pa[o];
  if (t) return t;
  let a = Re(o);
  if (a !== "filter" && a in e) return (Pa[o] = a);
  a = ra(a);
  for (let r = 0; r < ws.length; r++) {
    const i = ws[r] + a;
    if (i in e) return (Pa[o] = i);
  }
  return o;
}
const Ms = "http://www.w3.org/1999/xlink";
function il(e, o, t, a, r) {
  if (a && o.startsWith("xlink:"))
    t == null
      ? e.removeAttributeNS(Ms, o.slice(6, o.length))
      : e.setAttributeNS(Ms, o, t);
  else {
    const i = Xt(o);
    t == null || (i && !Ks(t))
      ? e.removeAttribute(o)
      : e.setAttribute(o, i ? "" : t);
  }
}
function nl(e, o, t, a, r, i, s) {
  if (o === "innerHTML" || o === "textContent") {
    a && s(a, r, i), (e[o] = t == null ? "" : t);
    return;
  }
  if (o === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = t;
    const l = t == null ? "" : t;
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      t == null && e.removeAttribute(o);
    return;
  }
  if (t === "" || t == null) {
    const l = typeof e[o];
    if (l === "boolean") {
      e[o] = Ks(t);
      return;
    } else if (t == null && l === "string") {
      (e[o] = ""), e.removeAttribute(o);
      return;
    } else if (l === "number") {
      try {
        e[o] = 0;
      } catch {}
      e.removeAttribute(o);
      return;
    }
  }
  try {
    e[o] = t;
  } catch {}
}
let ta = Date.now,
  Lt = !1;
if (typeof window != "undefined") {
  ta() > document.createEvent("Event").timeStamp &&
    (ta = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  Lt = !!(e && Number(e[1]) <= 53);
}
let wa = 0;
const ll = Promise.resolve(),
  rl = () => {
    wa = 0;
  },
  cl = () => wa || (ll.then(rl), (wa = ta()));
function Ke(e, o, t, a) {
  e.addEventListener(o, t, a);
}
function dl(e, o, t, a) {
  e.removeEventListener(o, t, a);
}
function hl(e, o, t, a, r = null) {
  const i = e._vei || (e._vei = {}),
    s = i[o];
  if (a && s) s.value = a;
  else {
    const [l, c] = ul(o);
    if (a) {
      const _ = (i[o] = fl(a, r));
      Ke(e, l, _, c);
    } else s && (dl(e, l, s, c), (i[o] = void 0));
  }
}
const Us = /(?:Once|Passive|Capture)$/;
function ul(e) {
  let o;
  if (Us.test(e)) {
    o = {};
    let t;
    for (; (t = e.match(Us)); )
      (e = e.slice(0, e.length - t[0].length)), (o[t[0].toLowerCase()] = !0);
  }
  return [Po(e.slice(2)), o];
}
function fl(e, o) {
  const t = (a) => {
    const r = a.timeStamp || ta();
    (Lt || r >= t.attached - 1) && xe(pl(a, t.value), o, 5, [a]);
  };
  return (t.value = e), (t.attached = cl()), t;
}
function pl(e, o) {
  if (U(o)) {
    const t = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        t.call(e), (e._stopped = !0);
      }),
      o.map((a) => (r) => !r._stopped && a(r))
    );
  } else return o;
}
const Bs = /^on[a-z]/,
  ml = (e, o, t, a, r = !1, i, s, l, c) => {
    o === "class"
      ? al(e, a, r)
      : o === "style"
      ? sl(e, t, a)
      : ia(o)
      ? Ha(o) || hl(e, o, t, a, s)
      : (
          o[0] === "."
            ? ((o = o.slice(1)), !0)
            : o[0] === "^"
            ? ((o = o.slice(1)), !1)
            : _l(e, o, a, r)
        )
      ? nl(e, o, a, i, s, l, c)
      : (o === "true-value"
          ? (e._trueValue = a)
          : o === "false-value" && (e._falseValue = a),
        il(e, o, a, r));
  };
function _l(e, o, t, a) {
  return a
    ? !!(
        o === "innerHTML" ||
        o === "textContent" ||
        (o in e && Bs.test(o) && K(t))
      )
    : o === "spellcheck" ||
      o === "draggable" ||
      o === "form" ||
      (o === "list" && e.tagName === "INPUT") ||
      (o === "type" && e.tagName === "TEXTAREA") ||
      (Bs.test(o) && ue(t))
    ? !1
    : o in e;
}
const vl = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
en.props;
const bo = (e) => {
  const o = e.props["onUpdate:modelValue"];
  return U(o) ? (t) => zo(o, t) : o;
};
function gl(e) {
  e.target.composing = !0;
}
function js(e) {
  const o = e.target;
  o.composing && ((o.composing = !1), Cl(o, "input"));
}
function Cl(e, o) {
  const t = document.createEvent("HTMLEvents");
  t.initEvent(o, !0, !0), e.dispatchEvent(t);
}
const ho = {
    created(e, { modifiers: { lazy: o, trim: t, number: a } }, r) {
      e._assign = bo(r);
      const i = a || (r.props && r.props.type === "number");
      Ke(e, o ? "change" : "input", (s) => {
        if (s.target.composing) return;
        let l = e.value;
        t ? (l = l.trim()) : i && (l = Yo(l)), e._assign(l);
      }),
        t &&
          Ke(e, "change", () => {
            e.value = e.value.trim();
          }),
        o ||
          (Ke(e, "compositionstart", gl),
          Ke(e, "compositionend", js),
          Ke(e, "change", js));
    },
    mounted(e, { value: o }) {
      e.value = o == null ? "" : o;
    },
    beforeUpdate(
      e,
      { value: o, modifiers: { lazy: t, trim: a, number: r } },
      i
    ) {
      if (
        ((e._assign = bo(i)),
        e.composing ||
          (document.activeElement === e &&
            (t ||
              (a && e.value.trim() === o) ||
              ((r || e.type === "number") && Yo(e.value) === o))))
      )
        return;
      const s = o == null ? "" : o;
      e.value !== s && (e.value = s);
    },
  },
  R = {
    deep: !0,
    created(e, o, t) {
      (e._assign = bo(t)),
        Ke(e, "change", () => {
          const a = e._modelValue,
            r = $o(e),
            i = e.checked,
            s = e._assign;
          if (U(a)) {
            const l = ja(a, r),
              c = l !== -1;
            if (i && !c) s(a.concat(r));
            else if (!i && c) {
              const _ = [...a];
              _.splice(l, 1), s(_);
            }
          } else if (So(a)) {
            const l = new Set(a);
            i ? l.add(r) : l.delete(r), s(l);
          } else s(Jt(e, i));
        });
    },
    mounted: Hs,
    beforeUpdate(e, o, t) {
      (e._assign = bo(t)), Hs(e, o, t);
    },
  };
function Hs(e, { value: o, oldValue: t }, a) {
  (e._modelValue = o),
    U(o)
      ? (e.checked = ja(o, a.props.value) > -1)
      : So(o)
      ? (e.checked = o.has(a.props.value))
      : o !== t && (e.checked = Do(o, Jt(e, !0)));
}
const bl = {
  deep: !0,
  created(e, { value: o, modifiers: { number: t } }, a) {
    const r = So(o);
    Ke(e, "change", () => {
      const i = Array.prototype.filter
        .call(e.options, (s) => s.selected)
        .map((s) => (t ? Yo($o(s)) : $o(s)));
      e._assign(e.multiple ? (r ? new Set(i) : i) : i[0]);
    }),
      (e._assign = bo(a));
  },
  mounted(e, { value: o }) {
    Ls(e, o);
  },
  beforeUpdate(e, o, t) {
    e._assign = bo(t);
  },
  updated(e, { value: o }) {
    Ls(e, o);
  },
};
function Ls(e, o) {
  const t = e.multiple;
  if (!(t && !U(o) && !So(o))) {
    for (let a = 0, r = e.options.length; a < r; a++) {
      const i = e.options[a],
        s = $o(i);
      if (t) U(o) ? (i.selected = ja(o, s) > -1) : (i.selected = o.has(s));
      else if (Do($o(i), o)) {
        e.selectedIndex !== a && (e.selectedIndex = a);
        return;
      }
    }
    !t && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function $o(e) {
  return "_value" in e ? e._value : e.value;
}
function Jt(e, o) {
  const t = o ? "_trueValue" : "_falseValue";
  return t in e ? e[t] : o;
}
const Sl = fe({ patchProp: ml }, ol);
let Js;
function Pl() {
  return Js || (Js = Nn(Sl));
}
const Al = (...e) => {
  const o = Pl().createApp(...e),
    { mount: t } = o;
  return (
    (o.mount = (a) => {
      const r = Nl(a);
      if (!r) return;
      const i = o._component;
      !K(i) && !i.render && !i.template && (i.template = r.innerHTML),
        (r.innerHTML = "");
      const s = t(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        s
      );
    }),
    o
  );
};
function Nl(e) {
  return ue(e) ? document.querySelector(e) : e;
}
var Pe = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [a, r] of o) t[a] = r;
  return t;
};
const kl = {
    emits: ["selecionarItem"],
    setup() {
      return {
        categorias: p([
          { nome: "CAF\xC9", img: "coffe.png" },
          { nome: "P\xC3O NA CHAPA", img: "pao.png" },
          { nome: "CREPIOCA", img: "crepioca.png" },
          { nome: "TAPIOCA", img: "tapioca.png" },
          { nome: "SUCOS", img: "suco.png" },
          { nome: "OMELETE", img: "omelete.png" },
          { nome: "VITAMINAS", img: "vitaminas.png" },
          { nome: "CUSCUZ", img: "cuscuz.png" },
          { nome: "SANDU\xCDCHE", img: "sanduiche.png" },
          { nome: "SALGADINHO", img: "salgadinho.png" },
        ]),
      };
    },
    methods: {
      selecionarItem(e) {
        this.$emit("selecionarItem", e);
      },
    },
  },
  yl = { id: "imgEtitulo" },
  xl = { id: "titulo" },
  Tl = ["src"],
  Il = { class: "menu" },
  El = { id: "ck-button" },
  Ol = ["onClick"],
  Fl = n("span", { id: "burger" }, "Selecionar", -1);
function ql(e, o, t, a, r, i) {
  return (
    h(!0),
    u(
      T,
      null,
      F(
        a.categorias,
        (s, l) => (
          h(),
          u("div", { id: "selecionar", key: s }, [
            n("div", yl, [
              n("h2", xl, d(s.nome), 1),
              n(
                "img",
                { class: "swing", id: "imgcomida", src: s.img },
                null,
                8,
                Tl
              ),
            ]),
            n("div", Il, [
              n("div", El, [
                n("label", null, [
                  n(
                    "input",
                    {
                      onClick: (c) => i.selecionarItem(l),
                      class: "burger1",
                      type: "checkbox",
                    },
                    null,
                    8,
                    Ol
                  ),
                  Fl,
                ]),
              ]),
            ]),
          ])
        )
      ),
      128
    )
  );
}
var Vl = Pe(kl, [["render", ql]]);
const Rl = {},
  $l = { class: "rodape" },
  Dl = qt(
    '<br> Segunda a Sabado<br><br> 05:30 as 10:30 || 14:00 as 19:30 <br><br> Domingo: 05:30 as 10:30 <br><br> Rua Ant\xF4nio Nogueira Sousa, 1691 <br><br><a href="https://www.instagram.com/saofranciscoce/" class="fa fa-lg fa-instagram"></a><a href="https://www.instagram.com/saofranciscoce/"> @saofranciscoce </a><br><br><a href="https://api.whatsapp.com/send?phone=558893185656" class="fab fa-whatsapp"></a><a href="https://api.whatsapp.com/send?phone=558893185656"> (88) 9318-5656 </a><br><br> Criado e desenvolvido por <a id="nomeDev" href="https://www.instagram.com/wesleyj.dev/?hl=pt-br"> Wesley Jonatha </a><br><br>',
    25
  ),
  wl = [Dl];
function Ml(e, o) {
  return h(), u("div", $l, wl);
}
var Ul = Pe(Rl, [["render", Ml]]);
const Bl = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([]),
        t = p([!1, !1, !1, !1, !1, !1, !1]),
        a = p([]),
        r = p(0),
        i = p(""),
        s = p(!0),
        l = p([
          {
            nome: "P\xE3o Com Manteiga",
            descricao: "",
            preco: 2,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "P\xE3o Com Queijo Qualho",
            descricao: "",
            preco: 4,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "P\xE3o Com Mussarela",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "P\xE3o Com Mussarela e Presunto",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "P\xE3o Com Ovo",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "P\xE3o Com Carne Moida",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "P\xE3o Com Nata",
            descricao: "",
            preco: 1,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
        ]),
        c = p([!1, !1, !1, !1, !1, !1, !1]),
        _ = p([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        g = p(!0),
        A = p(""),
        N = p([!0, !0, !0, !0, !0, !0, !0]),
        V = p([!1, !1, !1, !1, !1, !1, !1, !1]),
        j = p(!1),
        H = p([!1, !1, !1, !1, !1, !1, !1]),
        D = p([!1, !1, !1, !1, !1, !1, !1]),
        B = p([!1, !1, !1, !1, !1, !1, !1]),
        O = p([!1, !1, !1, !1, !1, !1, !1]),
        z = p([!1, !1, !1, !1, !1, !1, !1]),
        Q = p([!1, !1, !1, !1, !1, !1, !1]),
        ee = p([!1, !1, !1, !1, !1, !1, !1]),
        le = p([!1, !1, !1, !1, !1, !1, !1]),
        J = p([]);
      p([]);
      const G = p([]);
      p([]);
      const Y = 0,
        re = p(!1);
      return {
        valorTemp: Y,
        adicionalsSelecionados: a,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: g,
        observacoes: A,
        PaesNaChapaEstaSelecioando: N,
        adicionalEstaSelecioando: V,
        estaSelecionado: j,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: H,
        adicionalSelecionado2: D,
        adicionalSelecionado3: B,
        adicionalSelecionado4: O,
        adicionalSelecionado5: z,
        adicionalSelecionado6: Q,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        idPaesNaChapaelecionado: J,
        listaBurges: G,
        valorAtual: r,
        categoriaItem: i,
        mostrarCategoria: s,
        pedidosSelecionados: o,
        temItens: re,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -7 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual),
          console.log(this.listaBurges);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado2 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado3 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado4 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado5 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado6 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado7 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado8 = [!1, !1, !1, !1, !1, !1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var a = this.PaesNaChapa[e].selecionados.reduce(function (r, i) {
            return r + i.preco;
          }, 0);
          (this.valorAtual -= a),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []),
            (this.PaesNaChapa[4].selecionados = []),
            (this.PaesNaChapa[5].selecionados = []),
            (this.PaesNaChapa[6].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1, !1, !1, !1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1, !1, !1, !1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []),
          (this.PaesNaChapa[4].selecionados = []),
          (this.PaesNaChapa[5].selecionados = []),
          (this.PaesNaChapa[6].selecionados = []);
      },
    },
  },
  jl = { id: "fixedContainer" },
  Hl = { id: "textoPreco" },
  Ll = n("span", null, "R$: ", -1),
  Jl = { id: "totalcost" },
  Kl = { class: "Categoria" },
  zl = n("strong", { id: "categoria" }, "P\xC3O NA CHAPA:", -1),
  Ql = { key: 0, id: "item" },
  Wl = { class: "container-checkbox", id: "textoPreco3" },
  Xl = ["value", "onUpdate:modelValue", "onChange"],
  Yl = n("span", { class: "checkmark" }, null, -1),
  Zl = { style: { "pointer-events": "none" }, for: "adicional" },
  Gl = { id: "preco" },
  er = { id: "itens" },
  or = n("br", null, null, -1),
  ar = { key: 0, id: "listar" },
  sr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  tr = { class: "container-checkbox", id: "textoPreco3" },
  ir = ["value", "onChange"],
  nr = n("span", { class: "checkmark" }, null, -1),
  lr = { style: { "pointer-events": "none" }, for: "adicional" },
  rr = { id: "preco" },
  cr = { id: "itens" },
  dr = { key: 1, id: "listar" },
  hr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  ur = { class: "container-checkbox", id: "textoPreco3" },
  fr = ["value", "onChange"],
  pr = n("span", { class: "checkmark" }, null, -1),
  mr = { style: { "pointer-events": "none" }, for: "adicional" },
  _r = { id: "preco" },
  vr = { id: "itens" },
  gr = { key: 2, id: "listar" },
  Cr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  br = { class: "container-checkbox", id: "textoPreco3" },
  Sr = ["value", "onChange"],
  Pr = n("span", { class: "checkmark" }, null, -1),
  Ar = { style: { "pointer-events": "none" }, for: "adicional" },
  Nr = { id: "preco" },
  kr = { id: "itens" },
  yr = { key: 3, id: "listar" },
  xr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Tr = { class: "container-checkbox", id: "textoPreco3" },
  Ir = ["value", "onChange"],
  Er = n("span", { class: "checkmark" }, null, -1),
  Or = { style: { "pointer-events": "none" }, for: "adicional" },
  Fr = { id: "preco" },
  qr = { id: "itens" },
  Vr = { key: 4, id: "listar" },
  Rr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  $r = { class: "container-checkbox", id: "textoPreco3" },
  Dr = ["value", "onChange"],
  wr = n("span", { class: "checkmark" }, null, -1),
  Mr = { style: { "pointer-events": "none" }, for: "adicional" },
  Ur = { id: "preco" },
  Br = { id: "itens" },
  jr = { key: 5, id: "listar" },
  Hr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Lr = { class: "container-checkbox", id: "textoPreco3" },
  Jr = ["value", "onChange"],
  Kr = n("span", { class: "checkmark" }, null, -1),
  zr = { style: { "pointer-events": "none" }, for: "adicional" },
  Qr = { id: "preco" },
  Wr = { id: "itens" },
  Xr = { key: 6, id: "listar" },
  Yr = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Zr = { class: "container-checkbox", id: "textoPreco3" },
  Gr = ["value", "onChange"],
  ec = n("span", { class: "checkmark" }, null, -1),
  oc = { style: { "pointer-events": "none" }, for: "adicional" },
  ac = { id: "preco" },
  sc = { id: "itens" },
  tc = { key: 7, id: "listar" },
  ic = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  nc = { class: "container-checkbox", id: "textoPreco3" },
  lc = ["value", "onChange"],
  rc = n("span", { class: "checkmark" }, null, -1),
  cc = { style: { "pointer-events": "none" }, for: "adicional" },
  dc = { id: "preco" },
  hc = { id: "itens" };
function uc(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", jl, [
        n("div", Hl, [
          Ll,
          n(
            "span",
            Jl,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", Kl, [
        zl,
        (h(!0),
        u(
          T,
          null,
          F(
            a.PaesNaChapa,
            (s, l) => (
              h(),
              u("div", { id: "listar", key: s }, [
                a.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    u("div", Ql, [
                      n("label", Wl, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              "onUpdate:modelValue": (c) =>
                                (a.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                i.adicionalSelecionado(l, s.preco),
                                (a.estaSelecionado = !a.estaSelecionado),
                                i.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            Xl
                          ),
                          [[R, a.PaesNaChapaSelecionados[l]]]
                        ),
                        Yl,
                      ]),
                      n("label", Zl, d(s.nome), 1),
                      n("label", Gl, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", er, d(s.descricao), 1),
                    ]))
                  : b("", !0),
              ])
            )
          ),
          128
        )),
        or,
        a.adicionalEstaSelecioando[0]
          ? (h(),
            u("div", ar, [
              sr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", tr, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado1[l] =
                                  !a.adicionalSelecionado1[l]),
                                  i.somarAdicionais1(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (a.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            ir
                          ),
                          [[R, a.PaesNaChapa[0].selecionados]]
                        ),
                        nr,
                      ]),
                      n("label", lr, d(s.nome), 1),
                      n("label", rr, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", cr, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[1]
          ? (h(),
            u("div", dr, [
              hr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", ur, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado2[l] =
                                  !a.adicionalSelecionado2[l]),
                                  i.somarAdicionais2(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (a.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            fr
                          ),
                          [[R, a.PaesNaChapa[1].selecionados]]
                        ),
                        pr,
                      ]),
                      n("label", mr, d(s.nome), 1),
                      n("label", _r, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", vr, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[2]
          ? (h(),
            u("div", gr, [
              Cr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", br, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado3[l] =
                                  !a.adicionalSelecionado3[l]),
                                  i.somarAdicionais3(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (a.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            Sr
                          ),
                          [[R, a.PaesNaChapa[2].selecionados]]
                        ),
                        Pr,
                      ]),
                      n("label", Ar, d(s.nome), 1),
                      n("label", Nr, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", kr, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[3]
          ? (h(),
            u("div", yr, [
              xr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Tr, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado4[l] =
                                  !a.adicionalSelecionado4[l]),
                                  i.somarAdicionais4(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (a.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            Ir
                          ),
                          [[R, a.PaesNaChapa[3].selecionados]]
                        ),
                        Er,
                      ]),
                      n("label", Or, d(s.nome), 1),
                      n("label", Fr, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", qr, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[4]
          ? (h(),
            u("div", Vr, [
              Rr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", $r, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado5[l] =
                                  !a.adicionalSelecionado5[l]),
                                  i.somarAdicionais5(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[4] ||
                                (o[4] = (c) =>
                                  (a.PaesNaChapa[4].selecionados = c)),
                            },
                            null,
                            40,
                            Dr
                          ),
                          [[R, a.PaesNaChapa[4].selecionados]]
                        ),
                        wr,
                      ]),
                      n("label", Mr, d(s.nome), 1),
                      n("label", Ur, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Br, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[5]
          ? (h(),
            u("div", jr, [
              Hr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Lr, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado6[l] =
                                  !a.adicionalSelecionado6[l]),
                                  i.somarAdicionais6(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[5] ||
                                (o[5] = (c) =>
                                  (a.PaesNaChapa[5].selecionados = c)),
                            },
                            null,
                            40,
                            Jr
                          ),
                          [[R, a.PaesNaChapa[5].selecionados]]
                        ),
                        Kr,
                      ]),
                      n("label", zr, d(s.nome), 1),
                      n("label", Qr, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Wr, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[6]
          ? (h(),
            u("div", Xr, [
              Yr,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Zr, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado7[l] =
                                  !a.adicionalSelecionado7[l]),
                                  i.somarAdicionais7(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[6] ||
                                (o[6] = (c) =>
                                  (a.PaesNaChapa[6].selecionados = c)),
                            },
                            null,
                            40,
                            Gr
                          ),
                          [[R, a.PaesNaChapa[6].selecionados]]
                        ),
                        ec,
                      ]),
                      n("label", oc, d(s.nome), 1),
                      n("label", ac, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", sc, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[7]
          ? (h(),
            u("div", tc, [
              ic,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", nc, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado8[l] =
                                  !a.adicionalSelecionado8[l]),
                                  i.somarAdicionais8(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[7] ||
                                (o[7] = (c) =>
                                  (a.PaesNaChapa[7].selecionados = c)),
                            },
                            null,
                            40,
                            lc
                          ),
                          [[R, a.PaesNaChapa[7].selecionados]]
                        ),
                        rc,
                      ]),
                      n("label", cc, d(s.nome), 1),
                      n("label", dc, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", hc, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.temItens == !0
          ? (h(),
            u(
              "button",
              {
                key: 8,
                onClick:
                  o[8] ||
                  (o[8] = (s) => (
                    i.somarValorTotal(),
                    i.pedirOutroBurguer(),
                    i.desmarcarTodos(),
                    i.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.temItens == !1
          ? (h(),
            u(
              "button",
              {
                key: 9,
                id: "butOpcoes",
                onClick: o[9] || (o[9] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var fc = Pe(Bl, [["render", uc]]);
const pc = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([]),
        t = p([!1, !1, !1, !1, !1, !1, !1]),
        a = p([]),
        r = p(0),
        i = p(""),
        s = p(!0),
        l = p([
          {
            nome: "Cuscuz com Ovo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Frango",
            descricao: "",
            preco: 5.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Ovo e Frango",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Carne de Sol",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Carne de Sol e Queijo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Carne Moida",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Calabresa",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Calabresa e Queijo",
            descricao: "",
            preco: 7.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
        ]),
        c = p([!1, !1, !1, !1, !1, !1, !1]),
        _ = p([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        g = p(!0),
        A = p(""),
        N = p([!0, !0, !0, !0, !0, !0, !0]),
        V = p([!1, !1, !1, !1, !1, !1, !1, !1]),
        j = p(!1),
        H = p([!1, !1, !1, !1, !1, !1, !1]),
        D = p([!1, !1, !1, !1, !1, !1, !1]),
        B = p([!1, !1, !1, !1, !1, !1, !1]),
        O = p([!1, !1, !1, !1, !1, !1, !1]),
        z = p([!1, !1, !1, !1, !1, !1, !1]),
        Q = p([!1, !1, !1, !1, !1, !1, !1]),
        ee = p([!1, !1, !1, !1, !1, !1, !1]),
        le = p([!1, !1, !1, !1, !1, !1, !1]),
        J = p([]);
      p([]);
      const G = p([]);
      p([]);
      const Y = 0;
      return {
        temItens: p(!1),
        valorTemp: Y,
        adicionalsSelecionados: a,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: g,
        observacoes: A,
        PaesNaChapaEstaSelecioando: N,
        adicionalEstaSelecioando: V,
        estaSelecionado: j,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: H,
        adicionalSelecionado2: D,
        adicionalSelecionado3: B,
        adicionalSelecionado4: O,
        adicionalSelecionado5: z,
        adicionalSelecionado6: Q,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        idPaesNaChapaelecionado: J,
        listaBurges: G,
        valorAtual: r,
        categoriaItem: i,
        mostrarCategoria: s,
        pedidosSelecionados: o,
      };
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -7 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado2 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado3 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado4 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado5 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado6 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado7 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado8 = [!1, !1, !1, !1, !1, !1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var a = this.PaesNaChapa[e].selecionados.reduce(function (r, i) {
            return r + i.preco;
          }, 0);
          (this.valorAtual -= a),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []),
            (this.PaesNaChapa[4].selecionados = []),
            (this.PaesNaChapa[5].selecionados = []),
            (this.PaesNaChapa[6].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1, !1, !1, !1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1, !1, !1, !1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []),
          (this.PaesNaChapa[4].selecionados = []),
          (this.PaesNaChapa[5].selecionados = []),
          (this.PaesNaChapa[6].selecionados = []);
      },
    },
  },
  mc = { id: "fixedContainer" },
  _c = { id: "textoPreco" },
  vc = n("span", null, "R$: ", -1),
  gc = { id: "totalcost" },
  Cc = { class: "Categoria" },
  bc = n("strong", { id: "categoria" }, "CUSCUZ:", -1),
  Sc = { key: 0, id: "item" },
  Pc = { class: "container-checkbox", id: "textoPreco3" },
  Ac = ["value", "onUpdate:modelValue", "onChange"],
  Nc = n("span", { class: "checkmark" }, null, -1),
  kc = { style: { "pointer-events": "none" }, for: "adicional" },
  yc = { id: "preco" },
  xc = { id: "itens" },
  Tc = n("br", null, null, -1),
  Ic = { key: 0, id: "listar" },
  Ec = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Oc = { class: "container-checkbox", id: "textoPreco3" },
  Fc = ["value", "onChange"],
  qc = n("span", { class: "checkmark" }, null, -1),
  Vc = { style: { "pointer-events": "none" }, for: "adicional" },
  Rc = { id: "preco" },
  $c = { id: "itens" },
  Dc = { key: 1, id: "listar" },
  wc = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Mc = { class: "container-checkbox", id: "textoPreco3" },
  Uc = ["value", "onChange"],
  Bc = n("span", { class: "checkmark" }, null, -1),
  jc = { style: { "pointer-events": "none" }, for: "adicional" },
  Hc = { id: "preco" },
  Lc = { id: "itens" },
  Jc = { key: 2, id: "listar" },
  Kc = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  zc = { class: "container-checkbox", id: "textoPreco3" },
  Qc = ["value", "onChange"],
  Wc = n("span", { class: "checkmark" }, null, -1),
  Xc = { style: { "pointer-events": "none" }, for: "adicional" },
  Yc = { id: "preco" },
  Zc = { id: "itens" },
  Gc = { key: 3, id: "listar" },
  ed = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  od = { class: "container-checkbox", id: "textoPreco3" },
  ad = ["value", "onChange"],
  sd = n("span", { class: "checkmark" }, null, -1),
  td = { style: { "pointer-events": "none" }, for: "adicional" },
  id = { id: "preco" },
  nd = { id: "itens" },
  ld = { key: 4, id: "listar" },
  rd = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  cd = { class: "container-checkbox", id: "textoPreco3" },
  dd = ["value", "onChange"],
  hd = n("span", { class: "checkmark" }, null, -1),
  ud = { style: { "pointer-events": "none" }, for: "adicional" },
  fd = { id: "preco" },
  pd = { id: "itens" },
  md = { key: 5, id: "listar" },
  _d = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  vd = { class: "container-checkbox", id: "textoPreco3" },
  gd = ["value", "onChange"],
  Cd = n("span", { class: "checkmark" }, null, -1),
  bd = { style: { "pointer-events": "none" }, for: "adicional" },
  Sd = { id: "preco" },
  Pd = { id: "itens" },
  Ad = { key: 6, id: "listar" },
  Nd = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  kd = { class: "container-checkbox", id: "textoPreco3" },
  yd = ["value", "onChange"],
  xd = n("span", { class: "checkmark" }, null, -1),
  Td = { style: { "pointer-events": "none" }, for: "adicional" },
  Id = { id: "preco" },
  Ed = { id: "itens" },
  Od = { key: 7, id: "listar" },
  Fd = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  qd = { class: "container-checkbox", id: "textoPreco3" },
  Vd = ["value", "onChange"],
  Rd = n("span", { class: "checkmark" }, null, -1),
  $d = { style: { "pointer-events": "none" }, for: "adicional" },
  Dd = { id: "preco" },
  wd = { id: "itens" };
function Md(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", mc, [
        n("div", _c, [
          vc,
          n(
            "span",
            gc,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", Cc, [
        bc,
        (h(!0),
        u(
          T,
          null,
          F(
            a.PaesNaChapa,
            (s, l) => (
              h(),
              u("div", { id: "listar", key: s }, [
                a.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    u("div", Sc, [
                      n("label", Pc, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              "onUpdate:modelValue": (c) =>
                                (a.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                i.adicionalSelecionado(l, s.preco),
                                (a.estaSelecionado = !a.estaSelecionado),
                                i.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            Ac
                          ),
                          [[R, a.PaesNaChapaSelecionados[l]]]
                        ),
                        Nc,
                      ]),
                      n("label", kc, d(s.nome), 1),
                      n("label", yc, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", xc, d(s.descricao), 1),
                    ]))
                  : b("", !0),
              ])
            )
          ),
          128
        )),
        Tc,
        a.adicionalEstaSelecioando[0]
          ? (h(),
            u("div", Ic, [
              Ec,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Oc, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado1[l] =
                                  !a.adicionalSelecionado1[l]),
                                  i.somarAdicionais1(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (a.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            Fc
                          ),
                          [[R, a.PaesNaChapa[0].selecionados]]
                        ),
                        qc,
                      ]),
                      n("label", Vc, d(s.nome), 1),
                      n("label", Rc, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", $c, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[1]
          ? (h(),
            u("div", Dc, [
              wc,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Mc, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado2[l] =
                                  !a.adicionalSelecionado2[l]),
                                  i.somarAdicionais2(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (a.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            Uc
                          ),
                          [[R, a.PaesNaChapa[1].selecionados]]
                        ),
                        Bc,
                      ]),
                      n("label", jc, d(s.nome), 1),
                      n("label", Hc, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Lc, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[2]
          ? (h(),
            u("div", Jc, [
              Kc,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", zc, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado3[l] =
                                  !a.adicionalSelecionado3[l]),
                                  i.somarAdicionais3(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (a.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            Qc
                          ),
                          [[R, a.PaesNaChapa[2].selecionados]]
                        ),
                        Wc,
                      ]),
                      n("label", Xc, d(s.nome), 1),
                      n("label", Yc, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Zc, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[3]
          ? (h(),
            u("div", Gc, [
              ed,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", od, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado4[l] =
                                  !a.adicionalSelecionado4[l]),
                                  i.somarAdicionais4(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (a.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            ad
                          ),
                          [[R, a.PaesNaChapa[3].selecionados]]
                        ),
                        sd,
                      ]),
                      n("label", td, d(s.nome), 1),
                      n("label", id, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", nd, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[4]
          ? (h(),
            u("div", ld, [
              rd,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", cd, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado5[l] =
                                  !a.adicionalSelecionado5[l]),
                                  i.somarAdicionais5(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[4] ||
                                (o[4] = (c) =>
                                  (a.PaesNaChapa[4].selecionados = c)),
                            },
                            null,
                            40,
                            dd
                          ),
                          [[R, a.PaesNaChapa[4].selecionados]]
                        ),
                        hd,
                      ]),
                      n("label", ud, d(s.nome), 1),
                      n("label", fd, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", pd, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[5]
          ? (h(),
            u("div", md, [
              _d,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", vd, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado6[l] =
                                  !a.adicionalSelecionado6[l]),
                                  i.somarAdicionais6(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[5] ||
                                (o[5] = (c) =>
                                  (a.PaesNaChapa[5].selecionados = c)),
                            },
                            null,
                            40,
                            gd
                          ),
                          [[R, a.PaesNaChapa[5].selecionados]]
                        ),
                        Cd,
                      ]),
                      n("label", bd, d(s.nome), 1),
                      n("label", Sd, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Pd, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[6]
          ? (h(),
            u("div", Ad, [
              Nd,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", kd, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado7[l] =
                                  !a.adicionalSelecionado7[l]),
                                  i.somarAdicionais7(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[6] ||
                                (o[6] = (c) =>
                                  (a.PaesNaChapa[6].selecionados = c)),
                            },
                            null,
                            40,
                            yd
                          ),
                          [[R, a.PaesNaChapa[6].selecionados]]
                        ),
                        xd,
                      ]),
                      n("label", Td, d(s.nome), 1),
                      n("label", Id, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Ed, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[7]
          ? (h(),
            u("div", Od, [
              Fd,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", qd, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado8[l] =
                                  !a.adicionalSelecionado8[l]),
                                  i.somarAdicionais8(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[7] ||
                                (o[7] = (c) =>
                                  (a.PaesNaChapa[7].selecionados = c)),
                            },
                            null,
                            40,
                            Vd
                          ),
                          [[R, a.PaesNaChapa[7].selecionados]]
                        ),
                        Rd,
                      ]),
                      n("label", $d, d(s.nome), 1),
                      n("label", Dd, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", wd, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.temItens == !0
          ? (h(),
            u(
              "button",
              {
                key: 8,
                onClick:
                  o[8] ||
                  (o[8] = (s) => (
                    i.somarValorTotal(),
                    i.pedirOutroBurguer(),
                    i.desmarcarTodos(),
                    i.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.temItens == !1
          ? (h(),
            u(
              "button",
              {
                key: 9,
                id: "butOpcoes",
                onClick: o[9] || (o[9] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var Ud = Pe(pc, [["render", Md]]);
const Bd = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([]),
        t = p([!1, !1, !1, !1]),
        a = p([]),
        r = p(0),
        i = p(""),
        s = p(!0),
        l = p([
          {
            nome: "Carne de Sol",
            descricao: "",
            preco: 10,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Queijo Coalho",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne Moida",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
        ]),
        c = p([!1, !1, !1, !1, !1, !1, !1]),
        _ = p([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        g = p(!0),
        A = p(""),
        N = p([!0, !0, !0, !0]),
        V = p([!1]),
        j = p(!1),
        H = p([!1, !1, !1, !1, !1, !1, !1]),
        D = p([!1, !1, !1, !1, !1, !1, !1]),
        B = p([!1, !1, !1, !1, !1, !1, !1]),
        O = p([!1, !1, !1, !1, !1, !1, !1]),
        z = p([!1, !1, !1, !1, !1, !1, !1]),
        Q = p([!1, !1, !1, !1, !1, !1, !1]),
        ee = p([!1, !1, !1, !1, !1, !1, !1]),
        le = p([!1, !1, !1, !1, !1, !1, !1]),
        J = p([]);
      p([]);
      const G = p([]);
      p([]);
      const Y = 0;
      return {
        temItens: p(!1),
        valorTemp: Y,
        adicionalsSelecionados: a,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: g,
        observacoes: A,
        PaesNaChapaEstaSelecioando: N,
        adicionalEstaSelecioando: V,
        estaSelecionado: j,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: H,
        adicionalSelecionado2: D,
        adicionalSelecionado3: B,
        adicionalSelecionado4: O,
        adicionalSelecionado5: z,
        adicionalSelecionado6: Q,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        idPaesNaChapaelecionado: J,
        listaBurges: G,
        valorAtual: r,
        categoriaItem: i,
        mostrarCategoria: s,
        pedidosSelecionados: o,
      };
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -4 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1]),
          (this.adicionalSelecionado2 = [!1]),
          (this.adicionalSelecionado3 = [!1]),
          (this.adicionalSelecionado4 = [!1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var a = this.PaesNaChapa[e].selecionados.reduce(function (r, i) {
            return r + i.preco;
          }, 0);
          (this.valorAtual -= a),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []);
      },
    },
  },
  jd = { id: "fixedContainer" },
  Hd = { id: "textoPreco" },
  Ld = n("span", null, "R$: ", -1),
  Jd = { id: "totalcost" },
  Kd = { class: "Categoria" },
  zd = n("strong", { id: "categoria" }, "OMELETES:", -1),
  Qd = { key: 0, id: "item" },
  Wd = { class: "container-checkbox", id: "textoPreco3" },
  Xd = ["value", "onUpdate:modelValue", "onChange"],
  Yd = n("span", { class: "checkmark" }, null, -1),
  Zd = { style: { "pointer-events": "none" }, for: "adicional" },
  Gd = { id: "preco" },
  eh = { id: "itens" },
  oh = n("br", null, null, -1),
  ah = { key: 0, id: "listar" },
  sh = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  th = { class: "container-checkbox", id: "textoPreco3" },
  ih = ["value", "onChange"],
  nh = n("span", { class: "checkmark" }, null, -1),
  lh = { style: { "pointer-events": "none" }, for: "adicional" },
  rh = { id: "preco" },
  ch = { id: "itens" },
  dh = { key: 1, id: "listar" },
  hh = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  uh = { class: "container-checkbox", id: "textoPreco3" },
  fh = ["value", "onChange"],
  ph = n("span", { class: "checkmark" }, null, -1),
  mh = { style: { "pointer-events": "none" }, for: "adicional" },
  _h = { id: "preco" },
  vh = { id: "itens" },
  gh = { key: 2, id: "listar" },
  Ch = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  bh = { class: "container-checkbox", id: "textoPreco3" },
  Sh = ["value", "onChange"],
  Ph = n("span", { class: "checkmark" }, null, -1),
  Ah = { style: { "pointer-events": "none" }, for: "adicional" },
  Nh = { id: "preco" },
  kh = { id: "itens" },
  yh = { key: 3, id: "listar" },
  xh = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Th = { class: "container-checkbox", id: "textoPreco3" },
  Ih = ["value", "onChange"],
  Eh = n("span", { class: "checkmark" }, null, -1),
  Oh = { style: { "pointer-events": "none" }, for: "adicional" },
  Fh = { id: "preco" },
  qh = { id: "itens" };
function Vh(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", jd, [
        n("div", Hd, [
          Ld,
          n(
            "span",
            Jd,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", Kd, [
        zd,
        (h(!0),
        u(
          T,
          null,
          F(
            a.PaesNaChapa,
            (s, l) => (
              h(),
              u("div", { id: "listar", key: s }, [
                a.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    u("div", Qd, [
                      n("label", Wd, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              "onUpdate:modelValue": (c) =>
                                (a.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                i.adicionalSelecionado(l, s.preco),
                                (a.estaSelecionado = !a.estaSelecionado),
                                i.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            Xd
                          ),
                          [[R, a.PaesNaChapaSelecionados[l]]]
                        ),
                        Yd,
                      ]),
                      n("label", Zd, d(s.nome), 1),
                      n("label", Gd, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", eh, d(s.descricao), 1),
                    ]))
                  : b("", !0),
              ])
            )
          ),
          128
        )),
        oh,
        a.adicionalEstaSelecioando[0]
          ? (h(),
            u("div", ah, [
              sh,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", th, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado1[l] =
                                  !a.adicionalSelecionado1[l]),
                                  i.somarAdicionais1(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (a.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            ih
                          ),
                          [[R, a.PaesNaChapa[0].selecionados]]
                        ),
                        nh,
                      ]),
                      n("label", lh, d(s.nome), 1),
                      n("label", rh, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", ch, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[1]
          ? (h(),
            u("div", dh, [
              hh,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", uh, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado2[l] =
                                  !a.adicionalSelecionado2[l]),
                                  i.somarAdicionais2(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (a.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            fh
                          ),
                          [[R, a.PaesNaChapa[1].selecionados]]
                        ),
                        ph,
                      ]),
                      n("label", mh, d(s.nome), 1),
                      n("label", _h, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", vh, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[2]
          ? (h(),
            u("div", gh, [
              Ch,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", bh, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado3[l] =
                                  !a.adicionalSelecionado3[l]),
                                  i.somarAdicionais3(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (a.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            Sh
                          ),
                          [[R, a.PaesNaChapa[2].selecionados]]
                        ),
                        Ph,
                      ]),
                      n("label", Ah, d(s.nome), 1),
                      n("label", Nh, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", kh, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[3]
          ? (h(),
            u("div", yh, [
              xh,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", Th, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado4[l] =
                                  !a.adicionalSelecionado4[l]),
                                  i.somarAdicionais4(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (a.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            Ih
                          ),
                          [[R, a.PaesNaChapa[3].selecionados]]
                        ),
                        Eh,
                      ]),
                      n("label", Oh, d(s.nome), 1),
                      n("label", Fh, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", qh, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.temItens == !0
          ? (h(),
            u(
              "button",
              {
                key: 4,
                onClick:
                  o[4] ||
                  (o[4] = (s) => (
                    i.somarValorTotal(),
                    i.pedirOutroBurguer(),
                    i.desmarcarTodos(),
                    i.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.temItens == !1
          ? (h(),
            u(
              "button",
              {
                key: 5,
                id: "butOpcoes",
                onClick: o[5] || (o[5] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var Rh = Pe(Bd, [["render", Vh]]);
const $h = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([]),
        t = p([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
        a = p([]),
        r = p(0),
        i = p(""),
        s = p(!0),
        l = p([
          {
            nome: "Tapioca de Coco",
            descricao: "",
            preco: 2.75,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Manteiga",
            descricao: "",
            preco: 2,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Ovo",
            descricao: "",
            preco: 4,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Queijo",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Frango",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Carne de Sol",
            descricao: "",
            preco: 7.5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Ovo e Queijo",
            descricao: "",
            preco: 6,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Frango e Queijo",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Carne de Sol e Queijo",
            descricao: "",
            preco: 8.5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Carne de Sol com Requeij\xE3o",
            descricao: "",
            preco: 7.5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca de Frango com Requeij\xE3o",
            descricao: "",
            preco: 5.5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Tapioca com Carne Moida",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
        ]),
        c = p([!1, !1, !1, !1, !1, !1, !1]),
        _ = p([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        g = p(!0),
        A = p(""),
        N = p([!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0]),
        V = p([!1, !1, !1, !1, !1, !1, !1]),
        j = p(!1),
        H = p([!1, !1, !1, !1, !1, !1, !1]),
        D = p([!1, !1, !1, !1, !1, !1, !1]),
        B = p([!1, !1, !1, !1, !1, !1, !1]),
        O = p([!1, !1, !1, !1, !1, !1, !1]),
        z = p([!1, !1, !1, !1, !1, !1, !1]),
        Q = p([!1, !1, !1, !1, !1, !1, !1]),
        ee = p([!1, !1, !1, !1, !1, !1, !1]),
        le = p([!1, !1, !1, !1, !1, !1, !1]),
        J = p([!1, !1, !1, !1, !1, !1, !1]),
        G = p([!1, !1, !1, !1, !1, !1, !1]),
        Y = p([!1, !1, !1, !1, !1, !1, !1]),
        re = p([!1, !1, !1, !1, !1, !1, !1]),
        he = p([]);
      p([]);
      const pe = p([]);
      p([]), p(0);
      const Oe = 0;
      return {
        temItens: p(!1),
        valorTemp: Oe,
        adicionalsSelecionados: a,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: g,
        observacoes: A,
        PaesNaChapaEstaSelecioando: N,
        adicionalEstaSelecioando: V,
        estaSelecionado: j,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: H,
        adicionalSelecionado2: D,
        adicionalSelecionado3: B,
        adicionalSelecionado4: O,
        adicionalSelecionado5: z,
        adicionalSelecionado6: Q,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        adicionalSelecionado9: J,
        adicionalSelecionado10: G,
        adicionalSelecionado11: Y,
        adicionalSelecionado12: re,
        idPaesNaChapaelecionado: he,
        listaBurges: pe,
        valorAtual: r,
        categoriaItem: i,
        mostrarCategoria: s,
        pedidosSelecionados: o,
      };
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -12 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado2 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado3 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado4 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado5 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado6 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado7 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado8 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado9 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado10 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado11 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado12 = [!1, !1, !1, !1, !1, !1, !1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var a = this.PaesNaChapa[e].selecionados.reduce(function (r, i) {
            return r + i.preco;
          }, 0);
          (this.valorAtual -= a),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []),
            (this.PaesNaChapa[4].selecionados = []),
            (this.PaesNaChapa[5].selecionados = []),
            (this.PaesNaChapa[6].selecionados = []),
            (this.PaesNaChapa[7].selecionados = []),
            (this.PaesNaChapa[8].selecionados = []),
            (this.PaesNaChapa[9].selecionados = []),
            (this.PaesNaChapa[10].selecionados = []),
            (this.PaesNaChapa[11].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais9(e, o) {
        this.adicionalSelecionado9[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais10(e, o) {
        this.adicionalSelecionado10[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais11(e, o) {
        this.adicionalSelecionado11[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais12(e, o) {
        this.adicionalSelecionado12[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
          ]),
          (this.adicionalEstaSelecioando = [!1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
          ]),
          (this.adicionalEstaSelecioando = [!1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []),
          (this.PaesNaChapa[4].selecionados = []),
          (this.PaesNaChapa[5].selecionados = []),
          (this.PaesNaChapa[6].selecionados = []),
          (this.PaesNaChapa[7].selecionados = []),
          (this.PaesNaChapa[8].selecionados = []),
          (this.PaesNaChapa[9].selecionados = []),
          (this.PaesNaChapa[10].selecionados = []),
          (this.PaesNaChapa[11].selecionados = []);
      },
    },
  },
  Dh = { id: "fixedContainer" },
  wh = { id: "textoPreco" },
  Mh = n("span", null, "R$: ", -1),
  Uh = { id: "totalcost" },
  Bh = { class: "Categoria" },
  jh = n("strong", { id: "categoria" }, "TAPIOCA:", -1),
  Hh = { key: 0, id: "item" },
  Lh = { class: "container-checkbox", id: "textoPreco3" },
  Jh = ["value", "onUpdate:modelValue", "onChange"],
  Kh = n("span", { class: "checkmark" }, null, -1),
  zh = { style: { "pointer-events": "none" }, for: "adicional" },
  Qh = { id: "preco" },
  Wh = { id: "itens" },
  Xh = n("br", null, null, -1),
  Yh = { key: 0, id: "listar" },
  Zh = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Gh = { class: "container-checkbox", id: "textoPreco3" },
  eu = ["value", "onChange"],
  ou = n("span", { class: "checkmark" }, null, -1),
  au = { style: { "pointer-events": "none" }, for: "adicional" },
  su = { id: "preco" },
  tu = { id: "itens" },
  iu = { key: 1, id: "listar" },
  nu = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  lu = { class: "container-checkbox", id: "textoPreco3" },
  ru = ["value", "onChange"],
  cu = n("span", { class: "checkmark" }, null, -1),
  du = { style: { "pointer-events": "none" }, for: "adicional" },
  hu = { id: "preco" },
  uu = { id: "itens" },
  fu = { key: 2, id: "listar" },
  pu = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  mu = { class: "container-checkbox", id: "textoPreco3" },
  _u = ["value", "onChange"],
  vu = n("span", { class: "checkmark" }, null, -1),
  gu = { style: { "pointer-events": "none" }, for: "adicional" },
  Cu = { id: "preco" },
  bu = { id: "itens" },
  Su = { key: 3, id: "listar" },
  Pu = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Au = { class: "container-checkbox", id: "textoPreco3" },
  Nu = ["value", "onChange"],
  ku = n("span", { class: "checkmark" }, null, -1),
  yu = { style: { "pointer-events": "none" }, for: "adicional" },
  xu = { id: "preco" },
  Tu = { id: "itens" },
  Iu = { key: 4, id: "listar" },
  Eu = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Ou = { class: "container-checkbox", id: "textoPreco3" },
  Fu = ["value", "onChange"],
  qu = n("span", { class: "checkmark" }, null, -1),
  Vu = { style: { "pointer-events": "none" }, for: "adicional" },
  Ru = { id: "preco" },
  $u = { id: "itens" },
  Du = { key: 5, id: "listar" },
  wu = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Mu = { class: "container-checkbox", id: "textoPreco3" },
  Uu = ["value", "onChange"],
  Bu = n("span", { class: "checkmark" }, null, -1),
  ju = { style: { "pointer-events": "none" }, for: "adicional" },
  Hu = { id: "preco" },
  Lu = { id: "itens" },
  Ju = { key: 6, id: "listar" },
  Ku = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  zu = { class: "container-checkbox", id: "textoPreco3" },
  Qu = ["value", "onChange"],
  Wu = n("span", { class: "checkmark" }, null, -1),
  Xu = { style: { "pointer-events": "none" }, for: "adicional" },
  Yu = { id: "preco" },
  Zu = { id: "itens" },
  Gu = { key: 7, id: "listar" },
  ef = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  of = { class: "container-checkbox", id: "textoPreco3" },
  af = ["value", "onChange"],
  sf = n("span", { class: "checkmark" }, null, -1),
  tf = { style: { "pointer-events": "none" }, for: "adicional" },
  nf = { id: "preco" },
  lf = { id: "itens" },
  rf = { key: 8, id: "listar" },
  cf = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  df = { class: "container-checkbox", id: "textoPreco3" },
  hf = ["value", "onChange"],
  uf = n("span", { class: "checkmark" }, null, -1),
  ff = { style: { "pointer-events": "none" }, for: "adicional" },
  pf = { id: "preco" },
  mf = { id: "itens" },
  _f = { key: 9, id: "listar" },
  vf = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  gf = { class: "container-checkbox", id: "textoPreco3" },
  Cf = ["value", "onChange"],
  bf = n("span", { class: "checkmark" }, null, -1),
  Sf = { style: { "pointer-events": "none" }, for: "adicional" },
  Pf = { id: "preco" },
  Af = { id: "itens" },
  Nf = { key: 10, id: "listar" },
  kf = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  yf = { class: "container-checkbox", id: "textoPreco3" },
  xf = ["value", "onChange"],
  Tf = n("span", { class: "checkmark" }, null, -1),
  If = { style: { "pointer-events": "none" }, for: "adicional" },
  Ef = { id: "preco" },
  Of = { id: "itens" },
  Ff = { key: 11, id: "listar" },
  qf = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Vf = { class: "container-checkbox", id: "textoPreco3" },
  Rf = ["value", "onChange"],
  $f = n("span", { class: "checkmark" }, null, -1),
  Df = { style: { "pointer-events": "none" }, for: "adicional" },
  wf = { id: "preco" },
  Mf = { id: "itens" };
function Uf(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", Dh, [
        n("div", wh, [
          Mh,
          n(
            "span",
            Uh,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", Bh, [
        jh,
        (h(!0),
        u(
          T,
          null,
          F(
            a.PaesNaChapa,
            (s, l) => (
              h(),
              u("div", { id: "listar", key: s }, [
                a.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    u("div", Hh, [
                      n("label", Lh, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              "onUpdate:modelValue": (c) =>
                                (a.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                i.adicionalSelecionado(l, s.preco),
                                (a.estaSelecionado = !a.estaSelecionado),
                                i.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            Jh
                          ),
                          [[R, a.PaesNaChapaSelecionados[l]]]
                        ),
                        Kh,
                      ]),
                      n("label", zh, d(s.nome), 1),
                      n("label", Qh, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Wh, d(s.descricao), 1),
                    ]))
                  : b("", !0),
              ])
            )
          ),
          128
        )),
        Xh,
        a.adicionalEstaSelecioando[0]
          ? (h(),
            u("div", Yh, [
              Zh,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Gh, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado1[l] =
                                  !a.adicionalSelecionado1[l]),
                                  i.somarAdicionais1(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (a.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            eu
                          ),
                          [[R, a.PaesNaChapa[0].selecionados]]
                        ),
                        ou,
                      ]),
                      n("label", au, d(s.nome), 1),
                      n("label", su, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", tu, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[1]
          ? (h(),
            u("div", iu, [
              nu,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", lu, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado2[l] =
                                  !a.adicionalSelecionado2[l]),
                                  i.somarAdicionais2(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (a.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            ru
                          ),
                          [[R, a.PaesNaChapa[1].selecionados]]
                        ),
                        cu,
                      ]),
                      n("label", du, d(s.nome), 1),
                      n("label", hu, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", uu, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[2]
          ? (h(),
            u("div", fu, [
              pu,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", mu, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado3[l] =
                                  !a.adicionalSelecionado3[l]),
                                  i.somarAdicionais3(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (a.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            _u
                          ),
                          [[R, a.PaesNaChapa[2].selecionados]]
                        ),
                        vu,
                      ]),
                      n("label", gu, d(s.nome), 1),
                      n("label", Cu, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", bu, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[3]
          ? (h(),
            u("div", Su, [
              Pu,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Au, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado4[l] =
                                  !a.adicionalSelecionado4[l]),
                                  i.somarAdicionais4(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (a.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            Nu
                          ),
                          [[R, a.PaesNaChapa[3].selecionados]]
                        ),
                        ku,
                      ]),
                      n("label", yu, d(s.nome), 1),
                      n("label", xu, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Tu, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[4]
          ? (h(),
            u("div", Iu, [
              Eu,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Ou, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado5[l] =
                                  !a.adicionalSelecionado5[l]),
                                  i.somarAdicionais5(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[4] ||
                                (o[4] = (c) =>
                                  (a.PaesNaChapa[4].selecionados = c)),
                            },
                            null,
                            40,
                            Fu
                          ),
                          [[R, a.PaesNaChapa[4].selecionados]]
                        ),
                        qu,
                      ]),
                      n("label", Vu, d(s.nome), 1),
                      n("label", Ru, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", $u, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[5]
          ? (h(),
            u("div", Du, [
              wu,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Mu, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado6[l] =
                                  !a.adicionalSelecionado6[l]),
                                  i.somarAdicionais6(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[5] ||
                                (o[5] = (c) =>
                                  (a.PaesNaChapa[5].selecionados = c)),
                            },
                            null,
                            40,
                            Uu
                          ),
                          [[R, a.PaesNaChapa[5].selecionados]]
                        ),
                        Bu,
                      ]),
                      n("label", ju, d(s.nome), 1),
                      n("label", Hu, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Lu, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[6]
          ? (h(),
            u("div", Ju, [
              Ku,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", zu, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado7[l] =
                                  !a.adicionalSelecionado7[l]),
                                  i.somarAdicionais7(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[6] ||
                                (o[6] = (c) =>
                                  (a.PaesNaChapa[6].selecionados = c)),
                            },
                            null,
                            40,
                            Qu
                          ),
                          [[R, a.PaesNaChapa[6].selecionados]]
                        ),
                        Wu,
                      ]),
                      n("label", Xu, d(s.nome), 1),
                      n("label", Yu, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Zu, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[7]
          ? (h(),
            u("div", Gu, [
              ef,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", of, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado8[l] =
                                  !a.adicionalSelecionado8[l]),
                                  i.somarAdicionais8(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[7] ||
                                (o[7] = (c) =>
                                  (a.PaesNaChapa[7].selecionados = c)),
                            },
                            null,
                            40,
                            af
                          ),
                          [[R, a.PaesNaChapa[7].selecionados]]
                        ),
                        sf,
                      ]),
                      n("label", tf, d(s.nome), 1),
                      n("label", nf, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", lf, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[8]
          ? (h(),
            u("div", rf, [
              cf,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", df, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado9[l] =
                                  !a.adicionalSelecionado9[l]),
                                  i.somarAdicionais9(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[8] ||
                                (o[8] = (c) =>
                                  (a.PaesNaChapa[8].selecionados = c)),
                            },
                            null,
                            40,
                            hf
                          ),
                          [[R, a.PaesNaChapa[8].selecionados]]
                        ),
                        uf,
                      ]),
                      n("label", ff, d(s.nome), 1),
                      n("label", pf, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", mf, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[9]
          ? (h(),
            u("div", _f, [
              vf,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", gf, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado10[l] =
                                  !a.adicionalSelecionado10[l]),
                                  i.somarAdicionais10(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[9] ||
                                (o[9] = (c) =>
                                  (a.PaesNaChapa[9].selecionados = c)),
                            },
                            null,
                            40,
                            Cf
                          ),
                          [[R, a.PaesNaChapa[9].selecionados]]
                        ),
                        bf,
                      ]),
                      n("label", Sf, d(s.nome), 1),
                      n("label", Pf, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Af, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[10]
          ? (h(),
            u("div", Nf, [
              kf,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", yf, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado11[l] =
                                  !a.adicionalSelecionado11[l]),
                                  i.somarAdicionais11(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[10] ||
                                (o[10] = (c) =>
                                  (a.PaesNaChapa[10].selecionados = c)),
                            },
                            null,
                            40,
                            xf
                          ),
                          [[R, a.PaesNaChapa[10].selecionados]]
                        ),
                        Tf,
                      ]),
                      n("label", If, d(s.nome), 1),
                      n("label", Ef, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Of, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[11]
          ? (h(),
            u("div", Ff, [
              qf,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Vf, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado12[l] =
                                  !a.adicionalSelecionado12[l]),
                                  i.somarAdicionais12(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[11] ||
                                (o[11] = (c) =>
                                  (a.PaesNaChapa[11].selecionados = c)),
                            },
                            null,
                            40,
                            Rf
                          ),
                          [[R, a.PaesNaChapa[11].selecionados]]
                        ),
                        $f,
                      ]),
                      n("label", Df, d(s.nome), 1),
                      n("label", wf, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Mf, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.valorAtual > 0
          ? (h(),
            u(
              "button",
              {
                key: 12,
                onClick:
                  o[12] ||
                  (o[12] = (s) => (
                    i.somarValorTotal(),
                    i.pedirOutroBurguer(),
                    i.desmarcarTodos(),
                    i.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.valorAtual <= 0
          ? (h(),
            u(
              "button",
              {
                key: 13,
                id: "butOpcoes",
                onClick: o[13] || (o[13] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var Bf = Pe($h, [["render", Uf]]);
const jf = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([]),
        t = p([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
        a = p([]),
        r = p(0),
        i = p(""),
        s = p(!0),
        l = p([
          {
            nome: "Hamburger",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango",
            descricao: "",
            preco: 3.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne de Sol",
            descricao: "",
            preco: 5.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Ovo e Presunto",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Queijo e Ovo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Hamburger e Queijo",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne de Sol e Queijo",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango e Queijo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango e Hamburger",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango, Queijo e Hamburger",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Hamburger, Queijo e Presunto",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne de Sol, Queijo e Presunto",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Hamburger, Queijo, Presunto e Ovo",
            descricao: "",
            preco: 8.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
        ]),
        c = p([!1, !1, !1, !1, !1, !1, !1]),
        _ = p([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        g = p(!0),
        A = p(""),
        N = p([!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0]),
        V = p([!1, !1, !1]),
        j = p(!1),
        H = p([!1, !1, !1, !1, !1, !1, !1]),
        D = p([!1, !1, !1, !1, !1, !1, !1]),
        B = p([!1, !1, !1, !1, !1, !1, !1]),
        O = p([!1, !1, !1, !1, !1, !1, !1]),
        z = p([!1, !1, !1, !1, !1, !1, !1]),
        Q = p([!1, !1, !1, !1, !1, !1, !1]),
        ee = p([!1, !1, !1, !1, !1, !1, !1]),
        le = p([!1, !1, !1, !1, !1, !1, !1]),
        J = p([!1, !1, !1, !1, !1, !1, !1]),
        G = p([!1, !1, !1, !1, !1, !1, !1]),
        Y = p([!1, !1, !1, !1, !1, !1, !1]),
        re = p([!1, !1, !1, !1, !1, !1, !1]),
        he = p([!1, !1, !1, !1, !1, !1, !1]),
        pe = p([]);
      p([]);
      const Oe = p([]);
      p([]);
      const No = 0;
      return {
        temItens: p(!1),
        valorTemp: No,
        adicionalsSelecionados: a,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: g,
        observacoes: A,
        PaesNaChapaEstaSelecioando: N,
        adicionalEstaSelecioando: V,
        estaSelecionado: j,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: H,
        adicionalSelecionado2: D,
        adicionalSelecionado3: B,
        adicionalSelecionado4: O,
        adicionalSelecionado5: z,
        adicionalSelecionado6: Q,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        adicionalSelecionado9: J,
        adicionalSelecionado10: G,
        adicionalSelecionado11: Y,
        adicionalSelecionado12: re,
        adicionalSelecionado13: he,
        idPaesNaChapaelecionado: pe,
        listaBurges: Oe,
        valorAtual: r,
        categoriaItem: i,
        mostrarCategoria: s,
        pedidosSelecionados: o,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -4 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1]),
          (this.adicionalSelecionado2 = [!1]),
          (this.adicionalSelecionado3 = [!1]),
          (this.adicionalSelecionado4 = [!1]),
          (this.adicionalSelecionado5 = [!1]),
          (this.adicionalSelecionado6 = [!1]),
          (this.adicionalSelecionado7 = [!1]),
          (this.adicionalSelecionado8 = [!1]),
          (this.adicionalSelecionado9 = [!1]),
          (this.adicionalSelecionado10 = [!1]),
          (this.adicionalSelecionado11 = [!1]),
          (this.adicionalSelecionado12 = [!1]),
          (this.adicionalSelecionado13 = [!1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var a = this.PaesNaChapa[e].selecionados.reduce(function (r, i) {
            return r + i.preco;
          }, 0);
          (this.valorAtual -= a),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []),
            (this.PaesNaChapa[4].selecionados = []),
            (this.PaesNaChapa[5].selecionados = []),
            (this.PaesNaChapa[6].selecionados = []),
            (this.PaesNaChapa[7].selecionados = []),
            (this.PaesNaChapa[8].selecionados = []),
            (this.PaesNaChapa[9].selecionados = []),
            (this.PaesNaChapa[10].selecionados = []),
            (this.PaesNaChapa[11].selecionados = []),
            (this.PaesNaChapa[12].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais9(e, o) {
        this.adicionalSelecionado9[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais10(e, o) {
        this.adicionalSelecionado10[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais11(e, o) {
        this.adicionalSelecionado11[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais12(e, o) {
        this.adicionalSelecionado12[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais13(e, o) {
        this.adicionalSelecionado13[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
          ]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
          ]),
          (this.adicionalEstaSelecioando = [!1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []),
          (this.PaesNaChapa[4].selecionados = []),
          (this.PaesNaChapa[5].selecionados = []),
          (this.PaesNaChapa[6].selecionados = []),
          (this.PaesNaChapa[7].selecionados = []),
          (this.PaesNaChapa[8].selecionados = []),
          (this.PaesNaChapa[9].selecionados = []),
          (this.PaesNaChapa[10].selecionados = []),
          (this.PaesNaChapa[11].selecionados = []),
          (this.PaesNaChapa[12].selecionados = []);
      },
    },
  },
  Hf = { id: "fixedContainer" },
  Lf = { id: "textoPreco" },
  Jf = n("span", null, "R$: ", -1),
  Kf = { id: "totalcost" },
  zf = { class: "Categoria" },
  Qf = n("strong", { id: "categoria" }, "SANDU\xCDCHE:", -1),
  Wf = { key: 0, id: "item" },
  Xf = { class: "container-checkbox", id: "textoPreco3" },
  Yf = ["value", "onUpdate:modelValue", "onChange"],
  Zf = n("span", { class: "checkmark" }, null, -1),
  Gf = { style: { "pointer-events": "none" }, for: "adicional" },
  ep = { id: "preco" },
  op = { id: "itens" },
  ap = n("br", null, null, -1),
  sp = { key: 0, id: "listar" },
  tp = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  ip = { class: "container-checkbox", id: "textoPreco3" },
  np = ["value", "onChange"],
  lp = n("span", { class: "checkmark" }, null, -1),
  rp = { style: { "pointer-events": "none" }, for: "adicional" },
  cp = { id: "preco" },
  dp = { id: "itens" },
  hp = { key: 1, id: "listar" },
  up = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  fp = { class: "container-checkbox", id: "textoPreco3" },
  pp = ["value", "onChange"],
  mp = n("span", { class: "checkmark" }, null, -1),
  _p = { style: { "pointer-events": "none" }, for: "adicional" },
  vp = { id: "preco" },
  gp = { id: "itens" },
  Cp = { key: 2, id: "listar" },
  bp = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Sp = { class: "container-checkbox", id: "textoPreco3" },
  Pp = ["value", "onChange"],
  Ap = n("span", { class: "checkmark" }, null, -1),
  Np = { style: { "pointer-events": "none" }, for: "adicional" },
  kp = { id: "preco" },
  yp = { id: "itens" },
  xp = { key: 3, id: "listar" },
  Tp = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Ip = { class: "container-checkbox", id: "textoPreco3" },
  Ep = ["value", "onChange"],
  Op = n("span", { class: "checkmark" }, null, -1),
  Fp = { style: { "pointer-events": "none" }, for: "adicional" },
  qp = { id: "preco" },
  Vp = { id: "itens" },
  Rp = { key: 4, id: "listar" },
  $p = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Dp = { class: "container-checkbox", id: "textoPreco3" },
  wp = ["value", "onChange"],
  Mp = n("span", { class: "checkmark" }, null, -1),
  Up = { style: { "pointer-events": "none" }, for: "adicional" },
  Bp = { id: "preco" },
  jp = { id: "itens" },
  Hp = { key: 5, id: "listar" },
  Lp = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Jp = { class: "container-checkbox", id: "textoPreco3" },
  Kp = ["value", "onChange"],
  zp = n("span", { class: "checkmark" }, null, -1),
  Qp = { style: { "pointer-events": "none" }, for: "adicional" },
  Wp = { id: "preco" },
  Xp = { id: "itens" },
  Yp = { key: 6, id: "listar" },
  Zp = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Gp = { class: "container-checkbox", id: "textoPreco3" },
  em = ["value", "onChange"],
  om = n("span", { class: "checkmark" }, null, -1),
  am = { style: { "pointer-events": "none" }, for: "adicional" },
  sm = { id: "preco" },
  tm = { id: "itens" },
  im = { key: 7, id: "listar" },
  nm = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  lm = { class: "container-checkbox", id: "textoPreco3" },
  rm = ["value", "onChange"],
  cm = n("span", { class: "checkmark" }, null, -1),
  dm = { style: { "pointer-events": "none" }, for: "adicional" },
  hm = { id: "preco" },
  um = { id: "itens" },
  fm = { key: 8, id: "listar" },
  pm = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  mm = { class: "container-checkbox", id: "textoPreco3" },
  _m = ["value", "onChange"],
  vm = n("span", { class: "checkmark" }, null, -1),
  gm = { style: { "pointer-events": "none" }, for: "adicional" },
  Cm = { id: "preco" },
  bm = { id: "itens" },
  Sm = { key: 9, id: "listar" },
  Pm = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Am = { class: "container-checkbox", id: "textoPreco3" },
  Nm = ["value", "onChange"],
  km = n("span", { class: "checkmark" }, null, -1),
  ym = { style: { "pointer-events": "none" }, for: "adicional" },
  xm = { id: "preco" },
  Tm = { id: "itens" },
  Im = { key: 10, id: "listar" },
  Em = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Om = { class: "container-checkbox", id: "textoPreco3" },
  Fm = ["value", "onChange"],
  qm = n("span", { class: "checkmark" }, null, -1),
  Vm = { style: { "pointer-events": "none" }, for: "adicional" },
  Rm = { id: "preco" },
  $m = { id: "itens" },
  Dm = { key: 11, id: "listar" },
  wm = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Mm = { class: "container-checkbox", id: "textoPreco3" },
  Um = ["value", "onChange"],
  Bm = n("span", { class: "checkmark" }, null, -1),
  jm = { style: { "pointer-events": "none" }, for: "adicional" },
  Hm = { id: "preco" },
  Lm = { id: "itens" },
  Jm = { key: 12, id: "listar" },
  Km = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  zm = { class: "container-checkbox", id: "textoPreco3" },
  Qm = ["value", "onChange"],
  Wm = n("span", { class: "checkmark" }, null, -1),
  Xm = { style: { "pointer-events": "none" }, for: "adicional" },
  Ym = { id: "preco" },
  Zm = { id: "itens" };
function Gm(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", Hf, [
        n("div", Lf, [
          Jf,
          n(
            "span",
            Kf,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", zf, [
        Qf,
        (h(!0),
        u(
          T,
          null,
          F(
            a.PaesNaChapa,
            (s, l) => (
              h(),
              u("div", { id: "listar", key: s }, [
                a.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    u("div", Wf, [
                      n("label", Xf, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              "onUpdate:modelValue": (c) =>
                                (a.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                i.adicionalSelecionado(l, s.preco),
                                (a.estaSelecionado = !a.estaSelecionado),
                                i.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            Yf
                          ),
                          [[R, a.PaesNaChapaSelecionados[l]]]
                        ),
                        Zf,
                      ]),
                      n("label", Gf, d(s.nome), 1),
                      n("label", ep, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", op, d(s.descricao), 1),
                    ]))
                  : b("", !0),
              ])
            )
          ),
          128
        )),
        ap,
        a.adicionalEstaSelecioando[0]
          ? (h(),
            u("div", sp, [
              tp,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", ip, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado1[l] =
                                  !a.adicionalSelecionado1[l]),
                                  i.somarAdicionais1(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (a.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            np
                          ),
                          [[R, a.PaesNaChapa[0].selecionados]]
                        ),
                        lp,
                      ]),
                      n("label", rp, d(s.nome), 1),
                      n("label", cp, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", dp, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[1]
          ? (h(),
            u("div", hp, [
              up,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", fp, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado2[l] =
                                  !a.adicionalSelecionado2[l]),
                                  i.somarAdicionais2(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (a.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            pp
                          ),
                          [[R, a.PaesNaChapa[1].selecionados]]
                        ),
                        mp,
                      ]),
                      n("label", _p, d(s.nome), 1),
                      n("label", vp, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", gp, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[2]
          ? (h(),
            u("div", Cp, [
              bp,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Sp, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado3[l] =
                                  !a.adicionalSelecionado3[l]),
                                  i.somarAdicionais3(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (a.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            Pp
                          ),
                          [[R, a.PaesNaChapa[2].selecionados]]
                        ),
                        Ap,
                      ]),
                      n("label", Np, d(s.nome), 1),
                      n("label", kp, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", yp, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[3]
          ? (h(),
            u("div", xp, [
              Tp,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Ip, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado4[l] =
                                  !a.adicionalSelecionado4[l]),
                                  i.somarAdicionais4(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (a.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            Ep
                          ),
                          [[R, a.PaesNaChapa[3].selecionados]]
                        ),
                        Op,
                      ]),
                      n("label", Fp, d(s.nome), 1),
                      n("label", qp, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Vp, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[4]
          ? (h(),
            u("div", Rp, [
              $p,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Dp, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado5[l] =
                                  !a.adicionalSelecionado5[l]),
                                  i.somarAdicionais5(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[4] ||
                                (o[4] = (c) =>
                                  (a.PaesNaChapa[4].selecionados = c)),
                            },
                            null,
                            40,
                            wp
                          ),
                          [[R, a.PaesNaChapa[4].selecionados]]
                        ),
                        Mp,
                      ]),
                      n("label", Up, d(s.nome), 1),
                      n("label", Bp, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", jp, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[5]
          ? (h(),
            u("div", Hp, [
              Lp,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Jp, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado6[l] =
                                  !a.adicionalSelecionado6[l]),
                                  i.somarAdicionais6(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[5] ||
                                (o[5] = (c) =>
                                  (a.PaesNaChapa[5].selecionados = c)),
                            },
                            null,
                            40,
                            Kp
                          ),
                          [[R, a.PaesNaChapa[5].selecionados]]
                        ),
                        zp,
                      ]),
                      n("label", Qp, d(s.nome), 1),
                      n("label", Wp, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Xp, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[6]
          ? (h(),
            u("div", Yp, [
              Zp,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Gp, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado7[l] =
                                  !a.adicionalSelecionado7[l]),
                                  i.somarAdicionais7(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[6] ||
                                (o[6] = (c) =>
                                  (a.PaesNaChapa[6].selecionados = c)),
                            },
                            null,
                            40,
                            em
                          ),
                          [[R, a.PaesNaChapa[6].selecionados]]
                        ),
                        om,
                      ]),
                      n("label", am, d(s.nome), 1),
                      n("label", sm, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", tm, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[7]
          ? (h(),
            u("div", im, [
              nm,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", lm, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado8[l] =
                                  !a.adicionalSelecionado8[l]),
                                  i.somarAdicionais8(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[7] ||
                                (o[7] = (c) =>
                                  (a.PaesNaChapa[7].selecionados = c)),
                            },
                            null,
                            40,
                            rm
                          ),
                          [[R, a.PaesNaChapa[7].selecionados]]
                        ),
                        cm,
                      ]),
                      n("label", dm, d(s.nome), 1),
                      n("label", hm, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", um, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[8]
          ? (h(),
            u("div", fm, [
              pm,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", mm, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado9[l] =
                                  !a.adicionalSelecionado9[l]),
                                  i.somarAdicionais9(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[8] ||
                                (o[8] = (c) =>
                                  (a.PaesNaChapa[8].selecionados = c)),
                            },
                            null,
                            40,
                            _m
                          ),
                          [[R, a.PaesNaChapa[8].selecionados]]
                        ),
                        vm,
                      ]),
                      n("label", gm, d(s.nome), 1),
                      n("label", Cm, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", bm, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[9]
          ? (h(),
            u("div", Sm, [
              Pm,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Am, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado10[l] =
                                  !a.adicionalSelecionado10[l]),
                                  i.somarAdicionais10(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[9] ||
                                (o[9] = (c) =>
                                  (a.PaesNaChapa[9].selecionados = c)),
                            },
                            null,
                            40,
                            Nm
                          ),
                          [[R, a.PaesNaChapa[9].selecionados]]
                        ),
                        km,
                      ]),
                      n("label", ym, d(s.nome), 1),
                      n("label", xm, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Tm, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[10]
          ? (h(),
            u("div", Im, [
              Em,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Om, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado11[l] =
                                  !a.adicionalSelecionado11[l]),
                                  i.somarAdicionais11(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[10] ||
                                (o[10] = (c) =>
                                  (a.PaesNaChapa[10].selecionados = c)),
                            },
                            null,
                            40,
                            Fm
                          ),
                          [[R, a.PaesNaChapa[10].selecionados]]
                        ),
                        qm,
                      ]),
                      n("label", Vm, d(s.nome), 1),
                      n("label", Rm, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", $m, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[11]
          ? (h(),
            u("div", Dm, [
              wm,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", Mm, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado12[l] =
                                  !a.adicionalSelecionado12[l]),
                                  i.somarAdicionais12(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[11] ||
                                (o[11] = (c) =>
                                  (a.PaesNaChapa[11].selecionados = c)),
                            },
                            null,
                            40,
                            Um
                          ),
                          [[R, a.PaesNaChapa[11].selecionados]]
                        ),
                        Bm,
                      ]),
                      n("label", jm, d(s.nome), 1),
                      n("label", Hm, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Lm, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[12]
          ? (h(),
            u("div", Jm, [
              Km,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      $(d(a.PaesNaChapa[l].adicionais) + " ", 1),
                      n("label", zm, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado13[l] =
                                  !a.adicionalSelecionado13[l]),
                                  i.somarAdicionais13(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[12] ||
                                (o[12] = (c) =>
                                  (a.PaesNaChapa[12].selecionados = c)),
                            },
                            null,
                            40,
                            Qm
                          ),
                          [[R, a.PaesNaChapa[12].selecionados]]
                        ),
                        Wm,
                      ]),
                      n("label", Xm, d(s.nome), 1),
                      n("label", Ym, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", Zm, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.temItens == !0
          ? (h(),
            u(
              "button",
              {
                key: 13,
                onClick:
                  o[13] ||
                  (o[13] = (s) => (
                    i.somarValorTotal(),
                    i.pedirOutroBurguer(),
                    i.desmarcarTodos(),
                    i.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.temItens == !1
          ? (h(),
            u(
              "button",
              {
                key: 14,
                id: "butOpcoes",
                onClick: o[14] || (o[14] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var e_ = Pe(jf, [["render", Gm]]);
const o_ = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([
          {
            nome: "Cafezinho",
            descricao: "",
            preco: 1,
            quantidade: 0,
            id: 1,
            hash: "",
          },
          {
            nome: "Caf\xE9 (x\xEDcara)",
            descricao: "",
            preco: 2.5,
            quantidade: 0,
            id: 1,
            hash: "",
          },
          {
            nome: "Leite (x\xEDcara)",
            descricao: "",
            preco: 2.5,
            quantidade: 0,
            id: 1,
            hash: "",
          },
          {
            nome: "Caf\xE9 Com Leite",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 1,
            hash: "",
          },
        ]),
        t = p(0),
        a = p([]),
        r = p(0);
      return {
        temItens: p(0),
        valorTemp: r,
        pedidosSelecionados: a,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -4 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  a_ = { id: "fixedContainer" },
  s_ = { id: "textoPreco" },
  t_ = n("span", null, "R$: ", -1),
  i_ = { id: "totalcost" },
  n_ = { class: "Categoria" },
  l_ = n("strong", { id: "categoria" }, "CAF\xC9S:", -1),
  r_ = { id: "listar" },
  c_ = ["onClick"],
  d_ = ["onClick"],
  h_ = { class: "container-checkbox2" },
  u_ = { id: "preco" },
  f_ = { id: "itens" };
function p_(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", a_, [
        n("div", s_, [
          t_,
          n(
            "span",
            i_,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", n_, [
        l_,
        n("div", r_, [
          (h(!0),
          u(
            T,
            null,
            F(
              a.entradas,
              (s) => (
                h(),
                u("div", { id: "item", key: s }, [
                  n(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        s.quantidade++,
                        i.somarValor(s.preco),
                        i.adicionarPedido(s)
                      ),
                    },
                    " + ",
                    8,
                    c_
                  ),
                  s.quantidade > 0
                    ? (h(),
                      u(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            s.quantidade--,
                            i.subtrairValor(s.preco),
                            i.removerPedido(s)
                          ),
                        },
                        " - ",
                        8,
                        d_
                      ))
                    : b("", !0),
                  n("label", h_, [
                    $(" x" + d(s.quantidade) + " - " + d(s.nome) + " ", 1),
                    n("label", u_, "R$: " + d(s.preco.toFixed(2)), 1),
                  ]),
                  n("p", f_, d(s.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        a.valorAtual > 0
          ? (h(),
            u(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (s) => (
                    i.enviarPedido(), i.somarValorTotal(), i.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.valorAtual <= 0
          ? (h(),
            u(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var m_ = Pe(o_, [["render", p_]]);
const __ = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([
          {
            nome: "Acerola",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Caj\xE1 Umbu",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3.5,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Goiaba",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Graviola",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Manga",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Maracuj\xE1",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 8,
            hash: "",
          },
        ]),
        t = p(0),
        a = p([]);
      return {
        valorTemp: 0,
        pedidosSelecionados: a,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  v_ = { id: "fixedContainer" },
  g_ = { id: "textoPreco" },
  C_ = n("span", null, "R$: ", -1),
  b_ = { id: "totalcost" },
  S_ = { class: "Categoria" },
  P_ = n("strong", { id: "categoria" }, "SUCOS:", -1),
  A_ = { id: "listar" },
  N_ = ["onClick"],
  k_ = ["onClick"],
  y_ = { class: "container-checkbox2" },
  x_ = { id: "preco" },
  T_ = { id: "itens" };
function I_(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", v_, [
        n("div", g_, [
          C_,
          n(
            "span",
            b_,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", S_, [
        P_,
        n("div", A_, [
          (h(!0),
          u(
            T,
            null,
            F(
              a.entradas,
              (s) => (
                h(),
                u("div", { id: "item", key: s }, [
                  n(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        s.quantidade++,
                        i.somarValor(s.preco),
                        i.adicionarPedido(s)
                      ),
                    },
                    " + ",
                    8,
                    N_
                  ),
                  s.quantidade > 0
                    ? (h(),
                      u(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            s.quantidade--,
                            i.subtrairValor(s.preco),
                            i.removerPedido(s)
                          ),
                        },
                        " - ",
                        8,
                        k_
                      ))
                    : b("", !0),
                  n("label", y_, [
                    $(" x" + d(s.quantidade) + " - " + d(s.nome) + " ", 1),
                    n("label", x_, "R$: " + d(s.preco.toFixed(2)), 1),
                  ]),
                  n("p", T_, d(s.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        a.valorAtual > 0
          ? (h(),
            u(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (s) => (
                    i.enviarPedido(), i.somarValorTotal(), i.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.valorAtual <= 0
          ? (h(),
            u(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var E_ = Pe(__, [["render", I_]]);
const O_ = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([
          {
            nome: "Acerola",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Caj\xE1 Umbu",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3.5,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Goiaba",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Graviola",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Manga",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Maracuj\xE1",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 10,
            hash: "",
          },
        ]),
        t = p(0),
        a = p([]);
      return {
        valorTemp: 0,
        pedidosSelecionados: a,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  F_ = { id: "fixedContainer" },
  q_ = { id: "textoPreco" },
  V_ = n("span", null, "R$: ", -1),
  R_ = { id: "totalcost" },
  $_ = { class: "Categoria" },
  D_ = n("strong", { id: "categoria" }, "VITAMINAS:", -1),
  w_ = { id: "listar" },
  M_ = ["onClick"],
  U_ = ["onClick"],
  B_ = { class: "container-checkbox2" },
  j_ = { id: "preco" },
  H_ = { id: "itens" };
function L_(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", F_, [
        n("div", q_, [
          V_,
          n(
            "span",
            R_,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", $_, [
        D_,
        n("div", w_, [
          (h(!0),
          u(
            T,
            null,
            F(
              a.entradas,
              (s) => (
                h(),
                u("div", { id: "item", key: s }, [
                  n(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        s.quantidade++,
                        i.somarValor(s.preco),
                        i.adicionarPedido(s)
                      ),
                    },
                    " + ",
                    8,
                    M_
                  ),
                  s.quantidade > 0
                    ? (h(),
                      u(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            s.quantidade--,
                            i.subtrairValor(s.preco),
                            i.removerPedido(s)
                          ),
                        },
                        " - ",
                        8,
                        U_
                      ))
                    : b("", !0),
                  n("label", B_, [
                    $(" x" + d(s.quantidade) + " - " + d(s.nome) + " ", 1),
                    n("label", j_, "R$: " + d(s.preco.toFixed(2)), 1),
                  ]),
                  n("p", H_, d(s.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        a.valorAtual > 0
          ? (h(),
            u(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (s) => (
                    i.enviarPedido(), i.somarValorTotal(), i.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.valorAtual <= 0
          ? (h(),
            u(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var J_ = Pe(O_, [["render", L_]]);
const K_ = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([]),
        t = p([!1, !1, !1, !1]),
        a = p([]),
        r = p(0),
        i = p(""),
        s = p(!0),
        l = p([
          {
            nome: "Carne de Sol",
            descricao: "",
            preco: 10,
            quantidade: 0,
            id: 3,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 3,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne Moida",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 3,
            hash: "",
            selecionados: [],
          },
        ]),
        c = p([!1, !1, !1, !1, !1, !1, !1]),
        _ = p([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        g = p(!0),
        A = p(""),
        N = p([!0, !0, !0, !0]),
        V = p([!1]),
        j = p(!1),
        H = p([!1, !1, !1, !1, !1, !1, !1]),
        D = p([!1, !1, !1, !1, !1, !1, !1]),
        B = p([!1, !1, !1, !1, !1, !1, !1]),
        O = p([!1, !1, !1, !1, !1, !1, !1]),
        z = p([!1, !1, !1, !1, !1, !1, !1]),
        Q = p([!1, !1, !1, !1, !1, !1, !1]),
        ee = p([!1, !1, !1, !1, !1, !1, !1]),
        le = p([!1, !1, !1, !1, !1, !1, !1]),
        J = p([]);
      p([]);
      const G = p([]);
      p([]);
      const Y = 0;
      return {
        temItens: p(!1),
        valorTemp: Y,
        adicionalsSelecionados: a,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: g,
        observacoes: A,
        PaesNaChapaEstaSelecioando: N,
        adicionalEstaSelecioando: V,
        estaSelecionado: j,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: H,
        adicionalSelecionado2: D,
        adicionalSelecionado3: B,
        adicionalSelecionado4: O,
        adicionalSelecionado5: z,
        adicionalSelecionado6: Q,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        idPaesNaChapaelecionado: J,
        listaBurges: G,
        valorAtual: r,
        categoriaItem: i,
        mostrarCategoria: s,
        pedidosSelecionados: o,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -4 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1]),
          (this.adicionalSelecionado2 = [!1]),
          (this.adicionalSelecionado3 = [!1]),
          (this.adicionalSelecionado4 = [!1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var a = this.PaesNaChapa[e].selecionados.reduce(function (r, i) {
            return r + i.preco;
          }, 0);
          (this.valorAtual -= a),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []);
      },
    },
  },
  z_ = { id: "fixedContainer" },
  Q_ = { id: "textoPreco" },
  W_ = n("span", null, "R$: ", -1),
  X_ = { id: "totalcost" },
  Y_ = { class: "Categoria" },
  Z_ = n("strong", { id: "categoria" }, "CREPIOCA:", -1),
  G_ = { key: 0, id: "item" },
  e1 = { class: "container-checkbox", id: "textoPreco3" },
  o1 = ["value", "onUpdate:modelValue", "onChange"],
  a1 = n("span", { class: "checkmark" }, null, -1),
  s1 = { style: { "pointer-events": "none" }, for: "adicional" },
  t1 = { id: "preco" },
  i1 = { id: "itens" },
  n1 = n("br", null, null, -1),
  l1 = { key: 0, id: "listar" },
  r1 = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  c1 = { class: "container-checkbox", id: "textoPreco3" },
  d1 = ["value", "onChange"],
  h1 = n("span", { class: "checkmark" }, null, -1),
  u1 = { style: { "pointer-events": "none" }, for: "adicional" },
  f1 = { id: "preco" },
  p1 = { id: "itens" },
  m1 = { key: 1, id: "listar" },
  _1 = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  v1 = { class: "container-checkbox", id: "textoPreco3" },
  g1 = ["value", "onChange"],
  C1 = n("span", { class: "checkmark" }, null, -1),
  b1 = { style: { "pointer-events": "none" }, for: "adicional" },
  S1 = { id: "preco" },
  P1 = { id: "itens" },
  A1 = { key: 2, id: "listar" },
  N1 = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  k1 = { class: "container-checkbox", id: "textoPreco3" },
  y1 = ["value", "onChange"],
  x1 = n("span", { class: "checkmark" }, null, -1),
  T1 = { style: { "pointer-events": "none" }, for: "adicional" },
  I1 = { id: "preco" },
  E1 = { id: "itens" },
  O1 = { key: 3, id: "listar" },
  F1 = n("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  q1 = { class: "container-checkbox", id: "textoPreco3" },
  V1 = ["value", "onChange"],
  R1 = n("span", { class: "checkmark" }, null, -1),
  $1 = { style: { "pointer-events": "none" }, for: "adicional" },
  D1 = { id: "preco" },
  w1 = { id: "itens" };
function M1(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", z_, [
        n("div", Q_, [
          W_,
          n(
            "span",
            X_,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", Y_, [
        Z_,
        (h(!0),
        u(
          T,
          null,
          F(
            a.PaesNaChapa,
            (s, l) => (
              h(),
              u("div", { id: "listar", key: s }, [
                a.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    u("div", G_, [
                      n("label", e1, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              "onUpdate:modelValue": (c) =>
                                (a.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                i.adicionalSelecionado(l, s.preco),
                                (a.estaSelecionado = !a.estaSelecionado),
                                i.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            o1
                          ),
                          [[R, a.PaesNaChapaSelecionados[l]]]
                        ),
                        a1,
                      ]),
                      n("label", s1, d(s.nome), 1),
                      n("label", t1, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", i1, d(s.descricao), 1),
                    ]))
                  : b("", !0),
              ])
            )
          ),
          128
        )),
        n1,
        a.adicionalEstaSelecioando[0]
          ? (h(),
            u("div", l1, [
              r1,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", c1, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado1[l] =
                                  !a.adicionalSelecionado1[l]),
                                  i.somarAdicionais1(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (a.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            d1
                          ),
                          [[R, a.PaesNaChapa[0].selecionados]]
                        ),
                        h1,
                      ]),
                      n("label", u1, d(s.nome), 1),
                      n("label", f1, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", p1, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[1]
          ? (h(),
            u("div", m1, [
              _1,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", v1, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado2[l] =
                                  !a.adicionalSelecionado2[l]),
                                  i.somarAdicionais2(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (a.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            g1
                          ),
                          [[R, a.PaesNaChapa[1].selecionados]]
                        ),
                        C1,
                      ]),
                      n("label", b1, d(s.nome), 1),
                      n("label", S1, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", P1, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[2]
          ? (h(),
            u("div", A1, [
              N1,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", k1, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado3[l] =
                                  !a.adicionalSelecionado3[l]),
                                  i.somarAdicionais3(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (a.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            y1
                          ),
                          [[R, a.PaesNaChapa[2].selecionados]]
                        ),
                        x1,
                      ]),
                      n("label", T1, d(s.nome), 1),
                      n("label", I1, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", E1, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.adicionalEstaSelecioando[3]
          ? (h(),
            u("div", O1, [
              F1,
              (h(!0),
              u(
                T,
                null,
                F(
                  a.adicionais,
                  (s, l) => (
                    h(),
                    u("div", { id: "item", key: s }, [
                      n("label", q1, [
                        E(
                          n(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: s,
                              onChange: (c) => {
                                (a.adicionalSelecionado4[l] =
                                  !a.adicionalSelecionado4[l]),
                                  i.somarAdicionais4(l, s.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (a.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            V1
                          ),
                          [[R, a.PaesNaChapa[3].selecionados]]
                        ),
                        R1,
                      ]),
                      n("label", $1, d(s.nome), 1),
                      n("label", D1, "R$: " + d(s.preco.toFixed(2)), 1),
                      n("p", w1, d(s.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : b("", !0),
        a.temItens == !0
          ? (h(),
            u(
              "button",
              {
                key: 4,
                onClick:
                  o[4] ||
                  (o[4] = (s) => (
                    i.somarValorTotal(),
                    i.pedirOutroBurguer(),
                    i.desmarcarTodos(),
                    i.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.temItens == !1
          ? (h(),
            u(
              "button",
              {
                key: 5,
                id: "butOpcoes",
                onClick: o[5] || (o[5] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var U1 = Pe(K_, [["render", M1]]);
const B1 = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = p([
          {
            nome: "Enroladinho",
            preco: 0.37,
            quantidade: 0,
            id: 6,
            descricao: "",
          },
          {
            nome: "Coxinha p",
            preco: 0.37,
            quantidade: 0,
            id: 6,
            descricao: "",
          },
          {
            nome: "Coxinha g",
            preco: 3.9,
            quantidade: 0,
            id: 6,
            descricao: "",
          },
          {
            nome: "Bolinha de Queijo ",
            preco: 0.45,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Empada de Frango",
            preco: 5.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Empada de Carne de Sol",
            preco: 5.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastel de Carne",
            preco: 2.5,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastel de Queijo",
            preco: 2.5,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastel de Frango",
            preco: 2.5,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastelzinho de Carne",
            preco: 0.37,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Torta de Frango",
            preco: 4.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Torta de Carne de Sol",
            preco: 4.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pizza Fatia",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Canudinho",
            preco: 0.37,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Croquete",
            preco: 0.75,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Croissant",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Folheado de Frango",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Folheado de Carne de Sol",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Folheado de Queijo e Presunto",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Rosquinha de Queijo ",
            preco: 2.2,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Empadinha",
            preco: 0.45,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
        ]),
        t = p(0),
        a = p([]);
      return {
        valorTemp: 0,
        pedidosSelecionados: a,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((a) => a.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  j1 = { id: "fixedContainer" },
  H1 = { id: "textoPreco" },
  L1 = n("span", null, "R$: ", -1),
  J1 = { id: "totalcost" },
  K1 = { class: "Categoria" },
  z1 = n("strong", { id: "categoria" }, "SALGADINHOS:", -1),
  Q1 = { id: "listar" },
  W1 = ["onClick"],
  X1 = ["onClick"],
  Y1 = { class: "container-checkbox2" },
  Z1 = { id: "preco" },
  G1 = { id: "itens" };
function ev(e, o, t, a, r, i) {
  return (
    h(),
    u("div", null, [
      n("div", j1, [
        n("div", H1, [
          L1,
          n(
            "span",
            J1,
            d(a.valorAtual.toFixed(2) <= 0 ? "0.00" : a.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      n("div", K1, [
        z1,
        n("div", Q1, [
          (h(!0),
          u(
            T,
            null,
            F(
              a.entradas,
              (s) => (
                h(),
                u("div", { id: "item", key: s }, [
                  n(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        s.quantidade++,
                        i.somarValor(s.preco),
                        i.adicionarPedido(s)
                      ),
                    },
                    " + ",
                    8,
                    W1
                  ),
                  s.quantidade > 0
                    ? (h(),
                      u(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            s.quantidade--,
                            i.subtrairValor(s.preco),
                            i.removerPedido(s)
                          ),
                        },
                        " - ",
                        8,
                        X1
                      ))
                    : b("", !0),
                  n("label", Y1, [
                    $(" x" + d(s.quantidade) + " - " + d(s.nome) + " ", 1),
                    n("label", Z1, "R$: " + d(s.preco.toFixed(2)), 1),
                  ]),
                  n("p", G1, d(s.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        a.valorAtual > 0
          ? (h(),
            u(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (s) => (
                    i.enviarPedido(), i.somarValorTotal(), i.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : b("", !0),
        a.valorAtual <= 0
          ? (h(),
            u(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (s) => i.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : b("", !0),
      ]),
    ])
  );
}
var ov = Pe(B1, [["render", ev]]),
  av = "/logoD.png";
const sv = {
    setup() {
      const e = p(0),
        o = p([]);
      p([]);
      const t = p([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
        a = p(!0),
        r = p(),
        i = p(!1),
        s = p(!1),
        l = p(!1),
        c = p(!1),
        _ = p(!1),
        g = p(!1),
        A = p(!1),
        N = p(!1),
        V = p(!1),
        j = p(!1),
        H = p(""),
        D = p(""),
        B = p(""),
        O = p(""),
        z = p(""),
        Q = p(""),
        ee = p(""),
        le = p(""),
        J = p("");
      return {
        taxaDeEntrega: p(0),
        bairroSelect: J,
        aparecerFinalizarPedido: s,
        aparecerCarrinho: i,
        pedidosJson: r,
        valorAtual: e,
        todosOsPedidos: o,
        categoriaSelecionada: t,
        aparecerCardapio: a,
        nome: H,
        rua: D,
        observacoes: le,
        voubuscar: A,
        cartaoselecionado: g,
        pixselecionado: c,
        queroentrega: l,
        dinheiroselecionado: _,
        bairro: B,
        numero: O,
        formaDePagamento: ee,
        nome2: Q,
        pontodereferencia: z,
        checkCartao: V,
        checkDinheiro: j,
        checkPix: N,
      };
    },
    watch: {
      todosOsPedidos(e, o) {
        console.log(e);
        var t;
        (t = this.todosOsPedidos),
          (t = t.slice(0, t.length - 1)),
          (t = "[" + t + "]"),
          console.log(this.pedidosJson),
          (this.pedidosJson = JSON.parse(t));
        for (var a = 0; a < this.pedidosJson.length; a++)
          this.pedidosJson[a].hash = Math.random().toString(36).substring(5);
      },
      bairroSelect(e, o) {
        console.log(this.bairroSelect),
          this.bairroSelect == "Cidade Alta" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "Bom Fim" && (this.taxaDeEntrega = 3.5),
          this.bairroSelect == "S\xEDtio Arraial" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "Flores" && (this.taxaDeEntrega = 7),
          this.bairroSelect == "Luis Alves" && (this.taxaDeEntrega = 3.5),
          this.bairroSelect == "S\xEDtio Morros" && (this.taxaDeEntrega = 4),
          this.bairroSelect == "S\xEDtio Milagres" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "S\xE3o Raimundo" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "Multir\xE3o das Flores" &&
            (this.taxaDeEntrega = 4.5),
          this.bairroSelect == "Amaresco" && (this.taxaDeEntrega = 3),
          this.bairroSelect == "Boa F\xE9" && (this.taxaDeEntrega = 3.5),
          this.bairroSelect == "Bom Nome" && (this.taxaDeEntrega = 3),
          this.bairroSelect == "Provale" && (this.taxaDeEntrega = 4),
          this.bairroSelect == "S\xEDtio Socorro" && (this.taxaDeEntrega = 3),
          this.bairroSelect == "Centro" && (this.taxaDeEntrega = 2.5);
      },
    },
    components: {
      Crepiocas: U1,
      Vitaminas: J_,
      Sanduiches: e_,
      Tapiocas: Bf,
      Home: Vl,
      Footer: Ul,
      PaoNaChapa: fc,
      Cuscuz: Ud,
      Omeletes: Rh,
      Cafes: m_,
      Sucos: E_,
      Salgadinhos: ov,
    },
    mounted() {
      var e;
      (e = localStorage.getItem("enderecodousuario")),
        (e = JSON.parse(e)),
        e != null &&
          ((this.nome = e.nome),
          (this.rua = e.rua),
          (this.bairro = e.bairro),
          (this.numero = e.numero),
          (this.pontodereferencia = e.pontoderef),
          (this.nome2 = e.nome2));
    },
    methods: {
      enviar() {
        var e = {
          nome: this.nome,
          rua: this.rua,
          bairro: this.bairroSelect,
          numero: this.numero,
          pontoderef: this.pontodereferencia,
          nome2: this.nome2,
        };
        console.log(e),
          localStorage.setItem("enderecodousuario", JSON.stringify(e)),
          this.checkPix && (this.formaDePagamento = "PIX"),
          this.checkCartao && (this.formaDePagamento = "Cart\xE3o"),
          this.checkDinheiro && (this.formaDePagamento = "Dinheiro"),
          console.log(this.formaDePagamento),
          console.log(e),
          console.log(this.observacoes),
          console.log(this.pedidosJson),
          (window.location.href = `http://18.230.167.89:3333/api/enviarpedido/${JSON.stringify(
            this.pedidosJson
          )}/${JSON.stringify(e)}/${JSON.stringify(
            this.formaDePagamento
          )}/${JSON.stringify(this.observacoes)}/${JSON.stringify(
            this.valorAtual + this.taxaDeEntrega
          )}/${JSON.stringify(this.queroentrega)}`);
      },
      queroEntrega() {
        this.queroentrega == !1
          ? ((this.queroentrega = !0), (this.valorAtual += this.taxaDeEntrega))
          : ((this.queroentrega = !1), (this.valorAtual -= this.taxaDeEntrega));
      },
      vouBuscar() {
        this.voubuscar == !1 ? (this.voubuscar = !0) : (this.voubuscar = !1);
      },
      escolherPIX() {
        this.pixselecionado == !1
          ? (this.pixselecionado = !0)
          : (this.pixselecionado = !1),
          navigator.clipboard.writeText("00668081000100"),
          (this.checkCartao = !1),
          (this.checkDinheiro = !1),
          (this.checkPix = !0);
      },
      escolherDinheiro() {
        this.dinheiroselecionado == !1
          ? ((this.dinheiroselecionado = !0), (this.pixselecionado = !1))
          : (this.dinheiroselecionado = !1),
          (this.checkCartao = !1),
          (this.checkPix = !1),
          (this.checkDinheiro = !0);
      },
      escolherCartao() {
        this.cartaoselecionado == !1
          ? ((this.cartaoselecionado = !0), (this.pixselecionado = !1))
          : (this.cartaoselecionado = !1),
          (this.checkDinheiro = !1),
          (this.checkPix = !1),
          (this.checkCartao = !0);
      },
      removerPedido(e) {
        for (var o = 0, t = 0; t < this.pedidosJson.length; t++)
          this.pedidosJson[t].hash == e &&
            this.pedidosJson[t].selecionados == null &&
            ((o = this.pedidosJson[t].quantidade * this.pedidosJson[t].preco),
            (this.valorAtual -= o),
            (this.pedidosJson = this.pedidosJson.filter(function (r) {
              return r.hash !== e;
            })));
        for (var t = 0; t < this.pedidosJson.length; t++)
          if (
            this.pedidosJson[t].hash == e &&
            this.pedidosJson[t].selecionados != null
          ) {
            var a = this.pedidosJson[t].selecionados.reduce(function (i, s) {
              return i + s.preco;
            }, 0);
            (o = this.pedidosJson[t].preco + a),
              (this.valorAtual -= o),
              (this.pedidosJson = this.pedidosJson.filter(function (i) {
                return i.hash !== e;
              }));
          }
      },
      AparecerCardapio() {
        (this.aparecerCarrinho = !0),
          (this.categoriaSelecionada = [
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
          ]),
          (this.aparecerCardapio = !1);
      },
      desmarcarTodos() {
        (this.categoriaSelecionada = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
          (this.aparecerCardapio = !0);
      },
      voltarEnvio() {
        (this.categoriaSelecionada = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
          (this.aparecerCardapio = !0),
          (this.aparecerCarrinho = !1);
      },
      selecionarItem(e) {
        (this.categoriaSelecionada[e] = !0), (this.aparecerCardapio = !1);
      },
      receberPedido(e, o) {
        console.log(o),
          Array.isArray(e)
            ? (this.todosOsPedidos += e[0])
            : (this.todosOsPedidos += e),
          (this.todosOsPedidos = this.todosOsPedidos + ","),
          console.log("================="),
          console.log(e),
          console.log("=================");
      },
      somarValorTotal(e) {
        this.valorAtual += e;
      },
    },
  },
  tv = { id: "cardapio" },
  iv = n("img", { src: av, id: "logo", alt: "logo" }, null, -1),
  nv = { key: 0, id: "fixedContainer2" },
  lv = { id: "textoPreco" },
  rv = n("span", null, "R$: ", -1),
  cv = { id: "totalcost" },
  dv = { key: 1, id: "fixedContainer" },
  hv = { id: "textoPreco" },
  uv = n("span", null, "R$: ", -1),
  fv = { id: "totalcost" },
  pv = { id: "listar" },
  mv = { key: 0 },
  _v = n("br", null, null, -1),
  vv = n("br", null, null, -1),
  gv = n("br", null, null, -1),
  Cv = n("strong", { class: "carrinho", id: "categoria" }, "Carrinho:", -1),
  bv = { class: "carrinho", id: "categoria" },
  Sv = { class: "container-checkbox2" },
  Pv = { id: "preco" },
  Av = ["onClick"],
  Nv = { key: 0 },
  kv = n(
    "hr",
    { size: "1", id: "separador", style: { border: "1px dashed #e3a62b" } },
    null,
    -1
  ),
  yv = { key: 0, id: "textCarrinho" },
  xv = { key: 0, class: "escolhas" },
  Tv = { id: "opcoes" },
  Iv = n("br", null, null, -1),
  Ev = n("br", null, null, -1),
  Ov = n("strong", { class: "tituloEscolha" }, "MET\xD3DO DE ENTREGA:", -1),
  Fv = n("br", null, null, -1),
  qv = n("br", null, null, -1),
  Vv = { class: "container-checkbox", id: "textonaocelecionado2" },
  Rv = $("Quero Entrega"),
  $v = { id: "entregapreco" },
  Dv = ["disabled"],
  wv = n("span", { class: "checkmark" }, null, -1),
  Mv = n("br", null, null, -1),
  Uv = n("br", null, null, -1),
  Bv = { key: 0 },
  jv = n("strong", { class: "tituloEscolha" }, "SEU ENDERE\xC7O:", -1),
  Hv = $(),
  Lv = n("br", null, null, -1),
  Jv = qt(
    '<option disabled value="">Escolha Seu Bairro</option><option>Cidade Alta</option><option>Bom Fim</option><option>Sitio Arraial</option><option>Flores</option><option>Luis Alves</option><option>Sitio Morros</option><option>Sitio Milagres</option><option>S\xE3o Raimundo</option><option>Multir\xE3o das Flores</option><option>Amaresco</option><option>Boa F\xE9</option><option>Bom Nome</option><option>Provale</option>',
    14
  ),
  Kv = [Jv],
  zv = n("br", null, null, -1),
  Qv = n("br", null, null, -1),
  Wv = { class: "container-checkbox", id: "textonaocelecionado" },
  Xv = $("Vou Buscar"),
  Yv = n("label", { id: "entregapreco" }, "Gr\xE1tis", -1),
  Zv = n("br", null, null, -1),
  Gv = n("br", null, null, -1),
  eg = ["disabled"],
  og = n("span", { class: "checkmark" }, null, -1),
  ag = { key: 1 },
  sg = n("strong", { class: "tituloEscolha" }, "SEU NOME:", -1),
  tg = $(),
  ig = n("br", null, null, -1),
  ng = n("br", null, null, -1),
  lg = n("br", null, null, -1),
  rg = n("strong", { class: "tituloEscolha" }, "FORMA DE PAGAMENTO:", -1),
  cg = n("br", null, null, -1),
  dg = n("br", null, null, -1),
  hg = { id: "fomormaDePagamento" },
  ug = { class: "container-checkbox", id: "textoPreco1" },
  fg = $("Cart\xE3o"),
  pg = n("label", { id: "preco1" }, null, -1),
  mg = n("span", { class: "checkmark" }, null, -1),
  _g = { class: "container-checkbox", id: "textoPreco2" },
  vg = $("Dinheiro"),
  gg = n("label", { id: "preco2" }, null, -1),
  Cg = n("span", { class: "checkmark" }, null, -1),
  bg = { class: "container-checkbox", id: "textoPreco3" },
  Sg = $("PIX"),
  Pg = n("label", { id: "preco3" }, null, -1),
  Ag = n("span", { class: "checkmark" }, null, -1),
  Ng = { key: 0, id: "copiarpix" },
  kg = n(
    "p",
    { id: "infopix" },
    [
      $(" 00668081000100 \u25BC F das Chagas Nogueira Mendes "),
      n("button", { id: "butcopiarpix" }, "PIX Copiado com sucesso!"),
    ],
    -1
  ),
  yg = [kg],
  xg = n("br", null, null, -1),
  Tg = n("strong", { class: "tituloEscolha" }, "OBSERVA\xC7\xD5ES:", -1),
  Ig = $(),
  Eg = n("br", null, null, -1);
function Og(e, o, t, a, r, i) {
  const s = Ne("Cafes"),
    l = Ne("PaoNaChapa"),
    c = Ne("Crepiocas"),
    _ = Ne("Tapiocas"),
    g = Ne("Sucos"),
    A = Ne("Omeletes"),
    N = Ne("Vitaminas"),
    V = Ne("Cuscuz"),
    j = Ne("Sanduiches"),
    H = Ne("Salgadinhos"),
    D = Ne("Home"),
    B = Ne("Footer");
  return (
    h(),
    u(
      T,
      null,
      [
        n("div", tv, [
          iv,
          a.aparecerCardapio
            ? (h(),
              u("div", nv, [
                n("div", lv, [
                  rv,
                  n(
                    "span",
                    cv,
                    d(
                      a.valorAtual.toFixed(2) <= 0
                        ? "0.00"
                        : a.valorAtual.toFixed(2)
                    ),
                    1
                  ),
                ]),
                n(
                  "p",
                  {
                    onClick: o[0] || (o[0] = (O) => i.AparecerCardapio()),
                    id: "butConcluir",
                  },
                  "carrinho"
                ),
              ]))
            : b("", !0),
          a.aparecerFinalizarPedido
            ? (h(),
              u("div", dv, [
                n("div", hv, [
                  uv,
                  n(
                    "span",
                    fv,
                    d(
                      a.valorAtual.toFixed(2) <= 0
                        ? "0.00"
                        : (
                            Number(a.valorAtual) + Number(a.taxaDeEntrega)
                          ).toFixed(2)
                    ),
                    1
                  ),
                ]),
              ]))
            : b("", !0),
          n("div", pv, [
            a.aparecerCarrinho
              ? (h(),
                u("div", mv, [
                  _v,
                  vv,
                  gv,
                  Cv,
                  n("strong", bv, "Total: " + d(a.valorAtual.toFixed(2)), 1),
                  (h(!0),
                  u(
                    T,
                    null,
                    F(
                      a.pedidosJson,
                      (O) => (
                        h(),
                        u("div", { id: "item", class: "carrinho", key: O }, [
                          n("label", Sv, [
                            $(
                              d(O.quantidade == 0 ? 1 : O.quantidade) +
                                "x " +
                                d(O.nome) +
                                " ",
                              1
                            ),
                            n("label", Pv, [
                              n(
                                "button",
                                {
                                  onClick: (z) => i.removerPedido(O.hash),
                                  id: "butsomar",
                                },
                                " x ",
                                8,
                                Av
                              ),
                            ]),
                          ]),
                          O.selecionados != null
                            ? (h(),
                              u("ul", Nv, [
                                (h(!0),
                                u(
                                  T,
                                  null,
                                  F(
                                    O.selecionados,
                                    (z) => (
                                      h(),
                                      u(
                                        "li",
                                        { id: "itemSelecionado", key: z },
                                        d(z.nome),
                                        1
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ]))
                            : b("", !0),
                          kv,
                        ])
                      )
                    ),
                    128
                  )),
                  a.valorAtual == 0
                    ? (h(), u("p", yv, "Carrinho Vazio..."))
                    : b("", !0),
                  a.valorAtual > 0
                    ? (h(),
                      u(
                        "button",
                        {
                          key: 1,
                          id: "butOpcoes",
                          type: "submit",
                          value: "Submit",
                          onClick:
                            o[1] ||
                            (o[1] = (O) => (
                              (a.aparecerFinalizarPedido = !0),
                              (a.aparecerCarrinho = !1)
                            )),
                        },
                        " Concluir "
                      ))
                    : b("", !0),
                  a.valorAtual == 0
                    ? (h(),
                      u(
                        "button",
                        {
                          key: 2,
                          id: "butOpcoes",
                          onClick: o[2] || (o[2] = (O) => i.voltarEnvio()),
                          type: "submit",
                          value: "Submit",
                        },
                        " Voltar "
                      ))
                    : b("", !0),
                ]))
              : b("", !0),
          ]),
          a.categoriaSelecionada[0]
            ? (h(),
              ke(
                s,
                {
                  key: 2,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[1]
            ? (h(),
              ke(
                l,
                {
                  key: 3,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[2]
            ? (h(),
              ke(
                c,
                {
                  key: 4,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[3]
            ? (h(),
              ke(
                _,
                {
                  key: 5,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[4]
            ? (h(),
              ke(
                g,
                {
                  key: 6,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[5]
            ? (h(),
              ke(
                A,
                {
                  key: 7,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[6]
            ? (h(),
              ke(
                N,
                {
                  key: 8,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[7]
            ? (h(),
              ke(
                V,
                {
                  key: 9,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[8]
            ? (h(),
              ke(
                j,
                {
                  key: 10,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.categoriaSelecionada[9]
            ? (h(),
              ke(
                H,
                {
                  key: 11,
                  valorTotal: a.valorAtual,
                  onDesmarcarTodos: i.desmarcarTodos,
                  onSomarValorTotal: i.somarValorTotal,
                  onReceberPedido: i.receberPedido,
                },
                null,
                8,
                [
                  "valorTotal",
                  "onDesmarcarTodos",
                  "onSomarValorTotal",
                  "onReceberPedido",
                ]
              ))
            : b("", !0),
          a.aparecerCardapio
            ? (h(),
              ke(D, { key: 12, onSelecionarItem: i.selecionarItem }, null, 8, [
                "onSelecionarItem",
              ]))
            : b("", !0),
        ]),
        a.aparecerFinalizarPedido
          ? (h(),
            u("div", xv, [
              n("div", Tv, [
                Iv,
                Ev,
                Ov,
                Fv,
                qv,
                n("label", Vv, [
                  Rv,
                  n("label", $v, "R$: " + d(a.taxaDeEntrega.toFixed(2)), 1),
                  n(
                    "input",
                    {
                      name: "checkbox1",
                      type: "checkbox",
                      class: "checkbox1",
                      id: "game28",
                      onChange: o[3] || (o[3] = (O) => i.queroEntrega()),
                      disabled: a.voubuscar,
                      required: "",
                    },
                    null,
                    40,
                    Dv
                  ),
                  wv,
                ]),
                Mv,
                Uv,
                a.queroentrega
                  ? (h(),
                    u("div", Bv, [
                      jv,
                      Hv,
                      Lv,
                      E(
                        n(
                          "input",
                          {
                            id: "endereco",
                            type: "text",
                            name: "nome",
                            placeholder: "Seu Nome",
                            required: "",
                            "onUpdate:modelValue":
                              o[4] || (o[4] = (O) => (a.nome = O)),
                          },
                          null,
                          512
                        ),
                        [[ho, a.nome]]
                      ),
                      E(
                        n(
                          "input",
                          {
                            id: "endereco1",
                            type: "text",
                            name: "rua",
                            placeholder: "Sua Rua",
                            required: "",
                            "onUpdate:modelValue":
                              o[5] || (o[5] = (O) => (a.rua = O)),
                          },
                          null,
                          512
                        ),
                        [[ho, a.rua]]
                      ),
                      E(
                        n(
                          "select",
                          {
                            id: "endereco1",
                            "onUpdate:modelValue":
                              o[6] || (o[6] = (O) => (a.bairroSelect = O)),
                          },
                          Kv,
                          512
                        ),
                        [[bl, a.bairroSelect]]
                      ),
                      E(
                        n(
                          "input",
                          {
                            id: "endereco3",
                            name: "numero",
                            type: "text",
                            placeholder: " N\xFAmero da Casa",
                            required: "",
                            "onUpdate:modelValue":
                              o[7] || (o[7] = (O) => (a.numero = O)),
                            oninput:
                              "this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');",
                          },
                          null,
                          512
                        ),
                        [[ho, a.numero]]
                      ),
                      E(
                        n(
                          "input",
                          {
                            id: "endereco4",
                            type: "text",
                            name: "referencia",
                            "onUpdate:modelValue":
                              o[8] || (o[8] = (O) => (a.pontodereferencia = O)),
                            placeholder: " Ponto de Refer\xEAncia(opcional)",
                          },
                          null,
                          512
                        ),
                        [[ho, a.pontodereferencia]]
                      ),
                    ]))
                  : b("", !0),
                zv,
                Qv,
                n("label", Wv, [
                  Xv,
                  Yv,
                  Zv,
                  Gv,
                  n(
                    "input",
                    {
                      disabled: a.queroentrega,
                      onChange: o[9] || (o[9] = (O) => i.vouBuscar()),
                      type: "checkbox",
                      class: "checkbox2",
                      required: "",
                    },
                    null,
                    40,
                    eg
                  ),
                  og,
                ]),
                a.voubuscar
                  ? (h(),
                    u("div", ag, [
                      sg,
                      tg,
                      ig,
                      E(
                        n(
                          "input",
                          {
                            id: "endereco5",
                            type: "text",
                            name: "nome2",
                            placeholder: "Seu Nome",
                            required: "",
                            "onUpdate:modelValue":
                              o[10] || (o[10] = (O) => (a.nome2 = O)),
                          },
                          null,
                          512
                        ),
                        [[ho, a.nome2]]
                      ),
                    ]))
                  : b("", !0),
              ]),
              ng,
              lg,
              rg,
              cg,
              dg,
              n("div", hg, [
                n("label", ug, [
                  fg,
                  pg,
                  E(
                    n(
                      "input",
                      {
                        id: "vaiSerCartao",
                        type: "checkbox",
                        name: "cartao",
                        onChange: o[11] || (o[11] = (O) => i.escolherCartao()),
                        "onUpdate:modelValue":
                          o[12] || (o[12] = (O) => (a.checkCartao = O)),
                        required: "",
                      },
                      null,
                      544
                    ),
                    [[R, a.checkCartao]]
                  ),
                  mg,
                ]),
                n("label", _g, [
                  vg,
                  gg,
                  E(
                    n(
                      "input",
                      {
                        id: "vaiSerDinheiro",
                        type: "checkbox",
                        name: "Dinheiro",
                        onChange:
                          o[13] || (o[13] = (O) => i.escolherDinheiro()),
                        "onUpdate:modelValue":
                          o[14] || (o[14] = (O) => (a.checkDinheiro = O)),
                        required: "",
                      },
                      null,
                      544
                    ),
                    [[R, a.checkDinheiro]]
                  ),
                  Cg,
                ]),
                n("label", bg, [
                  Sg,
                  Pg,
                  E(
                    n(
                      "input",
                      {
                        name: "checkbox1",
                        type: "checkbox",
                        class: "checkbox1",
                        id: "game28",
                        onChange: o[15] || (o[15] = (O) => i.escolherPIX()),
                        "onUpdate:modelValue":
                          o[16] || (o[16] = (O) => (a.checkPix = O)),
                        required: "",
                      },
                      null,
                      544
                    ),
                    [[R, a.checkPix]]
                  ),
                  Ag,
                ]),
              ]),
              a.pixselecionado ? (h(), u("div", Ng, yg)) : b("", !0),
              xg,
              Tg,
              Ig,
              Eg,
              E(
                n(
                  "textarea",
                  {
                    placeholder: "Exemplo: Troco para 20 reais",
                    name: "observacao",
                    class: "textinput",
                    "onUpdate:modelValue":
                      o[17] || (o[17] = (O) => (a.observacoes = O)),
                  },
                  null,
                  512
                ),
                [[ho, a.observacoes]]
              ),
              n(
                "button",
                {
                  id: "butOpcoes",
                  onClick: o[18] || (o[18] = (O) => i.enviar()),
                  class: "checkBtn",
                  type: "submit",
                  value: "Submit",
                },
                " Enviar "
              ),
            ]))
          : b("", !0),
        Ee(B),
      ],
      64
    )
  );
}
var Fg = Pe(sv, [["render", Og]]);
Al(Fg).mount("#app");
