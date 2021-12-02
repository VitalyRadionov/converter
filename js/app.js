!(function (M) {
  function A(e) {
    delete installedChunks[e];
  }
  var n = window.webpackHotUpdate;
  window.webpackHotUpdate = function (e, t) {
    !(function (e, t) {
      if (F[e] && d[e]) {
        for (var n in ((d[e] = !1), t))
          Object.prototype.hasOwnProperty.call(t, n) && (H[n] = t[n]);
        0 == --c && 0 === s && v();
      }
    })(e, t),
      n && n(e, t);
  };
  var B,
    r = !0,
    R = "83fc31e16a6ce6501645",
    t = 1e4,
    N = {},
    I = [],
    o = [];
  function a(t) {
    var n = Y[t];
    if (!n) return q;
    function r(e) {
      return (
        n.hot.active
          ? (Y[e]
            ? -1 === Y[e].parents.indexOf(t) && Y[e].parents.push(t)
            : ((I = [t]), (B = e)),
            -1 === n.children.indexOf(e) && n.children.push(e))
          : (console.warn(
            "[HMR] unexpected require(" + e + ") from disposed module " + t
          ),
            (I = [])),
        q(e)
      );
    }
    for (var e in q)
      Object.prototype.hasOwnProperty.call(q, e) &&
        "e" !== e &&
        "t" !== e &&
        Object.defineProperty(
          r,
          e,
          (function (t) {
            return {
              configurable: !0,
              enumerable: !0,
              get: function () {
                return q[t];
              },
              set: function (e) {
                q[t] = e;
              },
            };
          })(e)
        );
    return (
      (r.e = function (e) {
        return (
          "ready" === l && D("prepare"),
          s++,
          q.e(e).then(t, function (e) {
            throw (t(), e);
          })
        );
        function t() {
          s--, "prepare" === l && (f[e] || h(e), 0 === s && 0 === c && v());
        }
      }),
      (r.t = function (e, t) {
        return 1 & t && (e = r(e)), q.t(e, -2 & t);
      }),
      r
    );
  }
  var i = [],
    l = "idle";
  function D(e) {
    l = e;
    for (var t = 0; t < i.length; t++) i[t].call(null, e);
  }
  var u,
    H,
    T,
    L,
    c = 0,
    s = 0,
    f = {},
    d = {},
    F = {};
  function U(e) {
    return +e + "" === e ? +e : e;
  }
  function p(e) {
    if ("idle" !== l) throw new Error("check() is only allowed in idle status");
    return (
      (r = e),
      D("check"),
      (a = (a = t) || 1e4),
      new Promise(function (t, n) {
        if ("undefined" == typeof XMLHttpRequest)
          return n(new Error("No browser support"));
        try {
          var r = new XMLHttpRequest(),
            o = q.p + "" + R + ".hot-update.json";
          r.open("GET", o, !0), (r.timeout = a), r.send(null);
        } catch (e) {
          return n(e);
        }
        r.onreadystatechange = function () {
          if (4 === r.readyState)
            if (0 === r.status)
              n(new Error("Manifest request to " + o + " timed out."));
            else if (404 === r.status) t();
            else if (200 !== r.status && 304 !== r.status)
              n(new Error("Manifest request to " + o + " failed."));
            else {
              try {
                var e = JSON.parse(r.responseText);
              } catch (e) {
                return void n(e);
              }
              t(e);
            }
        };
      }).then(function (e) {
        if (!e) return D(V() ? "ready" : "idle"), null;
        (d = {}), (f = {}), (F = e.c), (T = e.h), D("prepare");
        e = new Promise(function (e, t) {
          u = { resolve: e, reject: t };
        });
        H = {};
        return h(0), "prepare" === l && 0 === s && 0 === c && v(), e;
      })
    );
    var a;
  }
  function h(e) {
    var t, n;
    F[e]
      ? ((d[e] = !0),
        c++,
        (t = e),
        ((n = document.createElement("script")).charset = "utf-8"),
        (n.src = q.p + "" + t + "." + R + ".hot-update.js"),
        document.head.appendChild(n))
      : (f[e] = !0);
  }
  function v() {
    D("ready");
    var t = u;
    if (((u = null), t))
      if (r)
        Promise.resolve()
          .then(function () {
            return y(r);
          })
          .then(
            function (e) {
              t.resolve(e);
            },
            function (e) {
              t.reject(e);
            }
          );
      else {
        var e,
          n = [];
        for (e in H) Object.prototype.hasOwnProperty.call(H, e) && n.push(U(e));
        t.resolve(n);
      }
  }
  function y(e) {
    if ("ready" !== l)
      throw new Error("apply() is only allowed in ready status");
    return (function e(n) {
      V();
      var t;
      var r;
      var o;
      var s;
      function a(e) {
        for (
          var t = [e],
          n = {},
          r = t.map(function (e) {
            return { chain: [e], id: e };
          });
          0 < r.length;

        ) {
          var o = r.pop(),
            a = o.id,
            i = o.chain;
          if ((s = Y[a]) && (!s.hot._selfAccepted || s.hot._selfInvalidated)) {
            if (s.hot._selfDeclined)
              return { type: "self-declined", chain: i, moduleId: a };
            if (s.hot._main)
              return { type: "unaccepted", chain: i, moduleId: a };
            for (var l = 0; l < s.parents.length; l++) {
              var u = s.parents[l],
                c = Y[u];
              if (c) {
                if (c.hot._declinedDependencies[a])
                  return {
                    type: "declined",
                    chain: i.concat([u]),
                    moduleId: a,
                    parentId: u,
                  };
                -1 === t.indexOf(u) &&
                  (c.hot._acceptedDependencies[a]
                    ? (n[u] || (n[u] = []), f(n[u], [a]))
                    : (delete n[u],
                      t.push(u),
                      r.push({ chain: i.concat([u]), id: u })));
              }
            }
          }
        }
        return {
          type: "accepted",
          moduleId: e,
          outdatedModules: t,
          outdatedDependencies: n,
        };
      }
      function f(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          -1 === e.indexOf(r) && e.push(r);
        }
      }
      var i = {};
      var l = [];
      var u = {};
      var c = function () {
        console.warn(
          "[HMR] unexpected require(" + p.moduleId + ") to disposed module"
        );
      };
      for (var d in H)
        if (Object.prototype.hasOwnProperty.call(H, d)) {
          var p;
          (b = U(d)), (p = H[d] ? a(b) : { type: "disposed", moduleId: d });
          var h = !1,
            v = !1,
            y = !1,
            m = "";
          switch (
          (p.chain && (m = "\nUpdate propagation: " + p.chain.join(" -> ")),
            p.type)
          ) {
            case "self-declined":
              n.onDeclined && n.onDeclined(p),
                n.ignoreDeclined ||
                (h = new Error(
                  "Aborted because of self decline: " + p.moduleId + m
                ));
              break;
            case "declined":
              n.onDeclined && n.onDeclined(p),
                n.ignoreDeclined ||
                (h = new Error(
                  "Aborted because of declined dependency: " +
                  p.moduleId +
                  " in " +
                  p.parentId +
                  m
                ));
              break;
            case "unaccepted":
              n.onUnaccepted && n.onUnaccepted(p),
                n.ignoreUnaccepted ||
                (h = new Error(
                  "Aborted because " + b + " is not accepted" + m
                ));
              break;
            case "accepted":
              n.onAccepted && n.onAccepted(p), (v = !0);
              break;
            case "disposed":
              n.onDisposed && n.onDisposed(p), (y = !0);
              break;
            default:
              throw new Error("Unexception type " + p.type);
          }
          if (h) return D("abort"), Promise.reject(h);
          if (v)
            for (var b in ((u[b] = H[b]),
              f(l, p.outdatedModules),
              p.outdatedDependencies))
              Object.prototype.hasOwnProperty.call(p.outdatedDependencies, b) &&
                (i[b] || (i[b] = []), f(i[b], p.outdatedDependencies[b]));
          y && (f(l, [p.moduleId]), (u[b] = c));
        }
      var g = [];
      for (r = 0; r < l.length; r++)
        (b = l[r]),
          Y[b] &&
          Y[b].hot._selfAccepted &&
          u[b] !== c &&
          !Y[b].hot._selfInvalidated &&
          g.push({
            module: b,
            parents: Y[b].parents.slice(),
            errorHandler: Y[b].hot._selfAccepted,
          });
      D("dispose");
      Object.keys(F).forEach(function (e) {
        !1 === F[e] && A(e);
      });
      var w;
      var _ = l.slice();
      for (; 0 < _.length;)
        if (((b = _.pop()), (s = Y[b]))) {
          var O = {},
            P = s.hot._disposeHandlers;
          for (o = 0; o < P.length; o++) (t = P[o])(O);
          for (
            N[b] = O, s.hot.active = !1, delete Y[b], delete i[b], o = 0;
            o < s.children.length;
            o++
          ) {
            var k = Y[s.children[o]];
            k && 0 <= (w = k.parents.indexOf(b)) && k.parents.splice(w, 1);
          }
        }
      var E;
      var x;
      for (b in i)
        if (Object.prototype.hasOwnProperty.call(i, b) && (s = Y[b]))
          for (x = i[b], o = 0; o < x.length; o++)
            (E = x[o]),
              0 <= (w = s.children.indexOf(E)) && s.children.splice(w, 1);
      D("apply");
      void 0 !== T && ((R = T), (T = void 0));
      H = void 0;
      for (b in u) Object.prototype.hasOwnProperty.call(u, b) && (M[b] = u[b]);
      var S = null;
      for (b in i)
        if (Object.prototype.hasOwnProperty.call(i, b) && (s = Y[b])) {
          x = i[b];
          var C = [];
          for (r = 0; r < x.length; r++)
            (E = x[r]),
              (t = s.hot._acceptedDependencies[E]) &&
              -1 === C.indexOf(t) &&
              C.push(t);
          for (r = 0; r < C.length; r++) {
            t = C[r];
            try {
              t(x);
            } catch (e) {
              n.onErrored &&
                n.onErrored({
                  type: "accept-errored",
                  moduleId: b,
                  dependencyId: x[r],
                  error: e,
                }),
                n.ignoreErrored || (S = S || e);
            }
          }
        }
      for (r = 0; r < g.length; r++) {
        var j = g[r];
        (b = j.module), (I = j.parents), (B = b);
        try {
          q(b);
        } catch (t) {
          if ("function" == typeof j.errorHandler)
            try {
              j.errorHandler(t);
            } catch (e) {
              n.onErrored &&
                n.onErrored({
                  type: "self-accept-error-handler-errored",
                  moduleId: b,
                  error: e,
                  originalError: t,
                }),
                (S = (S = !n.ignoreErrored ? S || e : S) || t);
            }
          else
            n.onErrored &&
              n.onErrored({
                type: "self-accept-errored",
                moduleId: b,
                error: t,
              }),
              n.ignoreErrored || (S = S || t);
        }
      }
      if (S) return D("fail"), Promise.reject(S);
      if (L)
        return e(n).then(function (t) {
          return (
            l.forEach(function (e) {
              t.indexOf(e) < 0 && t.push(e);
            }),
            t
          );
        });
      D("idle");
      return new Promise(function (e) {
        e(l);
      });
    })((e = e || {}));
  }
  function V() {
    if (L) return (H = H || {}), L.forEach(m), !(L = void 0);
  }
  function m(e) {
    Object.prototype.hasOwnProperty.call(H, e) || (H[e] = M[e]);
  }
  var Y = {};
  function q(e) {
    if (Y[e]) return Y[e].exports;
    var t,
      r,
      n = (Y[e] = {
        i: e,
        l: !1,
        exports: {},
        hot:
          ((r = {
            _acceptedDependencies: {},
            _declinedDependencies: {},
            _selfAccepted: !1,
            _selfDeclined: !1,
            _selfInvalidated: !1,
            _disposeHandlers: [],
            _main: B !== (t = e),
            active: !0,
            accept: function (e, t) {
              if (void 0 === e) r._selfAccepted = !0;
              else if ("function" == typeof e) r._selfAccepted = e;
              else if ("object" == typeof e)
                for (var n = 0; n < e.length; n++)
                  r._acceptedDependencies[e[n]] = t || function () { };
              else r._acceptedDependencies[e] = t || function () { };
            },
            decline: function (e) {
              if (void 0 === e) r._selfDeclined = !0;
              else if ("object" == typeof e)
                for (var t = 0; t < e.length; t++)
                  r._declinedDependencies[e[t]] = !0;
              else r._declinedDependencies[e] = !0;
            },
            dispose: function (e) {
              r._disposeHandlers.push(e);
            },
            addDisposeHandler: function (e) {
              r._disposeHandlers.push(e);
            },
            removeDisposeHandler: function (e) {
              e = r._disposeHandlers.indexOf(e);
              0 <= e && r._disposeHandlers.splice(e, 1);
            },
            invalidate: function () {
              switch (((this._selfInvalidated = !0), l)) {
                case "idle":
                  ((H = {})[t] = M[t]), D("ready");
                  break;
                case "ready":
                  m(t);
                  break;
                case "prepare":
                case "check":
                case "dispose":
                case "apply":
                  (L = L || []).push(t);
              }
            },
            check: p,
            apply: y,
            status: function (e) {
              if (!e) return l;
              i.push(e);
            },
            addStatusHandler: function (e) {
              i.push(e);
            },
            removeStatusHandler: function (e) {
              e = i.indexOf(e);
              0 <= e && i.splice(e, 1);
            },
            data: N[t],
          }),
            (B = void 0),
            r),
        parents: ((o = I), (I = []), o),
        children: [],
      });
    return M[e].call(n.exports, n, n.exports, a(e)), (n.l = !0), n.exports;
  }
  (q.m = M),
    (q.c = Y),
    (q.d = function (e, t, n) {
      q.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (q.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (q.t = function (t, e) {
      if ((1 & e && (t = q(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (q.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
      )
        for (var r in t)
          q.d(
            n,
            r,
            function (e) {
              return t[e];
            }.bind(null, r)
          );
      return n;
    }),
    (q.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
            return e.default;
          }
          : function () {
            return e;
          };
      return q.d(t, "a", t), t;
    }),
    (q.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (q.p = ""),
    (q.h = function () {
      return R;
    }),
    a(14)((q.s = 14));
})([
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.extend = l),
      (t.indexOf = function (e, t) {
        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
        return -1;
      }),
      (t.escapeExpression = function (e) {
        if ("string" != typeof e) {
          if (e && e.toHTML) return e.toHTML();
          if (null == e) return "";
          if (!e) return e + "";
          e = "" + e;
        }
        return a.test(e) ? e.replace(o, i) : e;
      }),
      (t.isEmpty = function (e) {
        return (!e && 0 !== e) || !(!s(e) || 0 !== e.length);
      }),
      (t.createFrame = function (e) {
        var t = l({}, e);
        return (t._parent = e), t;
      }),
      (t.blockParams = function (e, t) {
        return (e.path = t), e;
      }),
      (t.appendContextPath = function (e, t) {
        return (e ? e + "." : "") + t;
      });
    var r = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;",
    },
      o = /[&<>"'`=]/g,
      a = /[&<>"'`=]/;
    function i(e) {
      return r[e];
    }
    function l(e) {
      for (var t = 1; t < arguments.length; t++)
        for (var n in arguments[t])
          Object.prototype.hasOwnProperty.call(arguments[t], n) &&
            (e[n] = arguments[t][n]);
      return e;
    }
    var u = Object.prototype.toString;
    t.toString = u;
    var c = function (e) {
      return "function" == typeof e;
    };
    c(/x/) &&
      (t.isFunction = c =
        function (e) {
          return "function" == typeof e && "[object Function]" === u.call(e);
        }),
      (t.isFunction = c);
    var s =
      Array.isArray ||
      function (e) {
        return !(!e || "object" != typeof e) && "[object Array]" === u.call(e);
      };
    t.isArray = s;
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var u = [
      "description",
      "fileName",
      "lineNumber",
      "endLineNumber",
      "message",
      "name",
      "number",
      "stack",
    ];
    function c(e, t) {
      var n = t && t.loc,
        r = void 0,
        o = void 0,
        a = void 0,
        t = void 0;
      n &&
        ((r = n.start.line),
          (o = n.end.line),
          (a = n.start.column),
          (t = n.end.column),
          (e += " - " + r + ":" + a));
      for (
        var i = Error.prototype.constructor.call(this, e), l = 0;
        l < u.length;
        l++
      )
        this[u[l]] = i[u[l]];
      Error.captureStackTrace && Error.captureStackTrace(this, c);
      try {
        n &&
          ((this.lineNumber = r),
            (this.endLineNumber = o),
            Object.defineProperty
              ? (Object.defineProperty(this, "column", {
                value: a,
                enumerable: !0,
              }),
                Object.defineProperty(this, "endColumn", {
                  value: t,
                  enumerable: !0,
                }))
              : ((this.column = a), (this.endColumn = t)));
      } catch (e) { }
    }
    (c.prototype = new Error()), (t.default = c), (e.exports = t.default);
  },
  function (e, t, n) {
    e.exports = n(16).default;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.__esModule = !0), (t.HandlebarsEnvironment = f);
    var o = n(0),
      a = r(n(1)),
      i = n(4),
      l = n(24),
      u = r(n(6)),
      c = n(7);
    t.VERSION = "4.7.7";
    t.COMPILER_REVISION = 8;
    t.LAST_COMPATIBLE_COMPILER_REVISION = 7;
    t.REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0 <4.3.0",
      8: ">= 4.3.0",
    };
    var s = "[object Object]";
    function f(e, t, n) {
      (this.helpers = e || {}),
        (this.partials = t || {}),
        (this.decorators = n || {}),
        i.registerDefaultHelpers(this),
        l.registerDefaultDecorators(this);
    }
    f.prototype = {
      constructor: f,
      logger: u.default,
      log: u.default.log,
      registerHelper: function (e, t) {
        if (o.toString.call(e) === s) {
          if (t) throw new a.default("Arg not supported with multiple helpers");
          o.extend(this.helpers, e);
        } else this.helpers[e] = t;
      },
      unregisterHelper: function (e) {
        delete this.helpers[e];
      },
      registerPartial: function (e, t) {
        if (o.toString.call(e) === s) o.extend(this.partials, e);
        else {
          if (void 0 === t)
            throw new a.default(
              'Attempting to register a partial called "' + e + '" as undefined'
            );
          this.partials[e] = t;
        }
      },
      unregisterPartial: function (e) {
        delete this.partials[e];
      },
      registerDecorator: function (e, t) {
        if (o.toString.call(e) === s) {
          if (t)
            throw new a.default("Arg not supported with multiple decorators");
          o.extend(this.decorators, e);
        } else this.decorators[e] = t;
      },
      unregisterDecorator: function (e) {
        delete this.decorators[e];
      },
      resetLoggedPropertyAccesses: function () {
        c.resetLoggedProperties();
      },
    };
    n = u.default.log;
    (t.log = n), (t.createFrame = o.createFrame), (t.logger = u.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.__esModule = !0),
      (t.registerDefaultHelpers = function (e) {
        o.default(e),
          a.default(e),
          i.default(e),
          l.default(e),
          u.default(e),
          c.default(e),
          s.default(e);
      }),
      (t.moveHelperToHooks = function (e, t, n) {
        e.helpers[t] && ((e.hooks[t] = e.helpers[t]), n || delete e.helpers[t]);
      });
    var o = r(n(17)),
      a = r(n(18)),
      i = r(n(19)),
      l = r(n(20)),
      u = r(n(21)),
      c = r(n(22)),
      s = r(n(23));
  },
  function (e, t) {
    var n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = n(0),
      o = {
        methodMap: ["debug", "info", "warn", "error"],
        level: "info",
        lookupLevel: function (e) {
          var t;
          return (e =
            "string" == typeof e
              ? 0 <= (t = r.indexOf(o.methodMap, e.toLowerCase()))
                ? t
                : parseInt(e, 10)
              : e);
        },
        log: function (e) {
          if (
            ((e = o.lookupLevel(e)),
              "undefined" != typeof console && o.lookupLevel(o.level) <= e)
          ) {
            e = o.methodMap[e];
            console[e] || (e = "log");
            for (
              var t = arguments.length, n = Array(1 < t ? t - 1 : 0), r = 1;
              r < t;
              r++
            )
              n[r - 1] = arguments[r];
            console[e].apply(console, n);
          }
        },
      };
    (t.default = o), (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.createProtoAccessControl = function (e) {
        var t = Object.create(null);
        (t.constructor = !1),
          (t.__defineGetter__ = !1),
          (t.__defineSetter__ = !1),
          (t.__lookupGetter__ = !1);
        var n = Object.create(null);
        return (
          (n.__proto__ = !1),
          {
            properties: {
              whitelist: r.createNewLookupObject(n, e.allowedProtoProperties),
              defaultValue: e.allowProtoPropertiesByDefault,
            },
            methods: {
              whitelist: r.createNewLookupObject(t, e.allowedProtoMethods),
              defaultValue: e.allowProtoMethodsByDefault,
            },
          }
        );
      }),
      (t.resultIsAllowed = function (e, t, n) {
        return i("function" == typeof e ? t.methods : t.properties, n);
      }),
      (t.resetLoggedProperties = function () {
        Object.keys(a).forEach(function (e) {
          delete a[e];
        });
      });
    var r = n(26),
      o = (function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(6)),
      a = Object.create(null);
    function i(e, t) {
      return void 0 !== e.whitelist[t]
        ? !0 === e.whitelist[t]
        : void 0 !== e.defaultValue
          ? e.defaultValue
          : (!0 !== a[(t = t)] &&
            ((a[t] = !0),
              o.log(
                "error",
                'Handlebars: Access has been denied to resolve the property "' +
                t +
                '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details'
              )),
            !1);
    }
  },
  function (e, t, n) {
    n = n(2);
    e.exports = (n.default || n).template({
      compiler: [8, ">= 4.3.0"],
      main: function (e, t, n, r, o) {
        var a = e.lambda,
          i = e.escapeExpression,
          l =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          '<h1>Currency Converter</h1>\n<div class="currency-header">\n  <span>' +
          i(
            a(
              null != (e = null != t ? l(t, "usd") : t)
                ? l(e, "Cur_Abbreviation")
                : e,
              t
            )
          ) +
          " " +
          i(
            a(
              null != (e = null != t ? l(t, "usd") : t)
                ? l(e, "Cur_OfficialRate")
                : e,
              t
            )
          ) +
          "</span>\n  <span>" +
          i(
            a(
              null != (e = null != t ? l(t, "eur") : t)
                ? l(e, "Cur_Abbreviation")
                : e,
              t
            )
          ) +
          " " +
          i(
            a(
              null != (e = null != t ? l(t, "eur") : t)
                ? l(e, "Cur_OfficialRate")
                : e,
              t
            )
          ) +
          "</span>\n  <span>" +
          i(
            a(
              null != (e = null != t ? l(t, "rub") : t)
                ? l(e, "Cur_Abbreviation")
                : e,
              t
            )
          ) +
          " " +
          i(
            a(
              null != (e = null != t ? l(t, "rub") : t)
                ? l(e, "Cur_OfficialRate")
                : e,
              t
            )
          ) +
          "</span>\n  <span>" +
          i(
            a(
              null != (e = null != t ? l(t, "pln") : t)
                ? l(e, "Cur_Abbreviation")
                : e,
              t
            )
          ) +
          " " +
          i(
            a(
              null != (e = null != t ? l(t, "pln") : t)
                ? l(e, "Cur_OfficialRate")
                : e,
              t
            )
          ) +
          "</span>\n</div>"
        );
      },
      useData: !0,
    });
  },
  function (e, t, n) {
    n = n(2);
    e.exports = (n.default || n).template({
      compiler: [8, ">= 4.3.0"],
      main: function (e, t, n, r, o) {
        return '<p class="footer__info">\n  &copy; All Rights Reserved, 2021\n</p>';
      },
      useData: !0,
    });
  },
  function (e, t, n) {
    n = n(2);
    e.exports = (n.default || n).template({
      compiler: [8, ">= 4.3.0"],
      main: function (e, t, n, r, o) {
        var a = e.escapeExpression,
          i = e.lambda,
          l =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          '<table class="bank-info-head">\r\n  <caption class="converter-head">Курсы в банках Минска на\r\n    ' +
          a(
            "function" ==
              typeof (n =
                null != (n = l(n, "date") || (null != t ? l(t, "date") : t))
                  ? n
                  : e.hooks.helperMissing)
              ? n.call(null != t ? t : e.nullContext || {}, {
                name: "date",
                hash: {},
                data: o,
                loc: {
                  start: { line: 3, column: 4 },
                  end: { line: 3, column: 12 },
                },
              })
              : n
          ) +
          "</caption>\r\n  <thead>\r\n    <tr>\r\n      <th>Валюта</th>\r\n      <th>Покупка</th>\r\n      <th>Продажа</th>\r\n      <th>НБ РБ</th>\r\n    </tr>\r\n  </thead>\r\n  <tr>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "usd") : n)
                ? l(n, "Cur_Scale")
                : n,
              t
            )
          ) +
          " " +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "usd") : n)
                ? l(n, "Cur_Name")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "alfaBank") : t)
                    ? l(n, "usd")
                    : n)
                ? l(n, "buyRate")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "alfaBank") : t)
                    ? l(n, "usd")
                    : n)
                ? l(n, "sellRate")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "usd") : n)
                ? l(n, "Cur_OfficialRate")
                : n,
              t
            )
          ) +
          "</td>\r\n  </tr>\r\n  <tr>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "eur") : n)
                ? l(n, "Cur_Scale")
                : n,
              t
            )
          ) +
          " " +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "eur") : n)
                ? l(n, "Cur_Name")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "alfaBank") : t)
                    ? l(n, "eur")
                    : n)
                ? l(n, "buyRate")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "alfaBank") : t)
                    ? l(n, "eur")
                    : n)
                ? l(n, "sellRate")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "eur") : n)
                ? l(n, "Cur_OfficialRate")
                : n,
              t
            )
          ) +
          "</td>\r\n  </tr>\r\n  <tr>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "rub") : n)
                ? l(n, "Cur_Scale")
                : n,
              t
            )
          ) +
          " " +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "rub") : n)
                ? l(n, "Cur_Name")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "alfaBank") : t)
                    ? l(n, "rub")
                    : n)
                ? l(n, "buyRate")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "alfaBank") : t)
                    ? l(n, "rub")
                    : n)
                ? l(n, "sellRate")
                : n,
              t
            )
          ) +
          "</td>\r\n    <td>" +
          a(
            i(
              null !=
                (n =
                  null != (n = null != t ? l(t, "nbrb") : t) ? l(n, "rub") : n)
                ? l(n, "Cur_OfficialRate")
                : n,
              t
            )
          ) +
          "</td>\r\n  </tr>\r\n</table>"
        );
      },
      useData: !0,
    });
  },
  function (e, t, c) {
    var n = c(2);
    e.exports = (n.default || n).template({
      1: function (e, t, n, r, o) {
        var a = e.lambda,
          i = e.escapeExpression,
          e =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          "        <option value=" +
          i(a(null != t ? e(t, "Cur_Abbreviation") : t, t)) +
          ">\r\n          " +
          i(a(null != t ? e(t, "Cur_Abbreviation") : t, t)) +
          "\r\n        </option>\r\n"
        );
      },
      3: function (e, t, n, r, o) {
        var a,
          i = e.lambda,
          l = e.escapeExpression,
          u =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          "        <option value=" +
          l(i(null != t ? u(t, "Cur_Abbreviation") : t, t)) +
          " " +
          (null !=
            (o = ((a = c(31)) && (a.__esModule ? a.default : a)).call(
              null != t ? t : e.nullContext || {},
              null != t ? u(t, "Cur_Abbreviation") : t,
              "==",
              "USD",
              {
                name: "ifCond",
                hash: {},
                fn: e.program(4, o, 0),
                inverse: e.noop,
                data: o,
                loc: {
                  start: { line: 25, column: 48 },
                  end: { line: 26, column: 21 },
                },
              }
            ))
            ? o
            : "") +
          ">\r\n          " +
          l(i(null != t ? u(t, "Cur_Abbreviation") : t, t)) +
          "\r\n        </option>\r\n"
        );
      },
      4: function (e, t, n, r, o) {
        return 'selected="selected"\r\n          ';
      },
      compiler: [8, ">= 4.3.0"],
      main: function (e, t, n, r, o) {
        var a,
          i = null != t ? t : e.nullContext || {},
          l =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          '<select name="selBank" id="csb" class="converter_select-bank">\r\n  <option value="NBRB">НБРБ</option>\r\n</select>\r\n\r\n<div class="curr-list">\r\n  <div class="input-select">\r\n    <label for="i1">\r\n      <select name="val" id="si1">\r\n        <option value="BYN">BYN</option>\r\n' +
          (null !=
            (a = l(n, "each").call(
              i,
              null != (a = null != t ? l(t, "db") : t) ? l(a, "dir") : a,
              {
                name: "each",
                hash: {},
                fn: e.program(1, o, 0),
                inverse: e.noop,
                data: o,
                loc: {
                  start: { line: 10, column: 8 },
                  end: { line: 14, column: 17 },
                },
              }
            ))
            ? a
            : "") +
          '      </select>\r\n    </label>\r\n    <input id="i1" type="text" autocomplete="off" maxlength="10" value=' +
          e.escapeExpression(
            e.lambda(
              null != (a = null != t ? l(t, "usd") : t)
                ? l(a, "Cur_OfficialRate")
                : a,
              t
            )
          ) +
          ' />\r\n  </div>\r\n\r\n  <div class="input-select">\r\n    <label for="i2">\r\n      <select name="val" id="si2">\r\n        <option value="BYN">BYN</option>\r\n' +
          (null !=
            (a = l(n, "each").call(
              i,
              null != (a = null != t ? l(t, "db") : t) ? l(a, "dir") : a,
              {
                name: "each",
                hash: {},
                fn: e.program(3, o, 0),
                inverse: e.noop,
                data: o,
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 29, column: 17 },
                },
              }
            ))
            ? a
            : "") +
          '      </select>\r\n    </label>\r\n    <input id="i2" type="text" autocomplete="off" maxlength="10" value="1" />\r\n  </div>\r\n</div>\r\n<div class="input-select">\r\n  <button class="input-select_btn-add" type="button">Add</button>\r\n</div>'
        );
      },
      useData: !0,
    });
  },
  function (e, t, n) {
    n = n(2);
    e.exports = (n.default || n).template({
      1: function (e, t, n, r, o) {
        var a = e.lambda,
          i = e.escapeExpression,
          e =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          "      <option value=" +
          i(a(null != t ? e(t, "Cur_Abbreviation") : t, t)) +
          ">\r\n        " +
          i(a(null != t ? e(t, "Cur_Abbreviation") : t, t)) +
          "\r\n      </option>\r\n"
        );
      },
      compiler: [8, ">= 4.3.0"],
      main: function (e, t, n, r, o) {
        var a,
          i,
          l = null != t ? t : e.nullContext || {},
          u = e.hooks.helperMissing,
          c = "function",
          s = e.escapeExpression,
          f =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          '<div class="input-select">\r\n  <label for="i' +
          s(
            typeof (i =
              null != (i = f(n, "id") || (null != t ? f(t, "id") : t))
                ? i
                : u) == c
              ? i.call(l, {
                name: "id",
                hash: {},
                data: o,
                loc: {
                  start: { line: 2, column: 15 },
                  end: { line: 2, column: 21 },
                },
              })
              : i
          ) +
          '">\r\n    <select name="val" id="si' +
          s(
            typeof (i =
              null != (i = f(n, "id") || (null != t ? f(t, "id") : t))
                ? i
                : u) == c
              ? i.call(l, {
                name: "id",
                hash: {},
                data: o,
                loc: {
                  start: { line: 3, column: 29 },
                  end: { line: 3, column: 35 },
                },
              })
              : i
          ) +
          '">\r\n      <option value="BYN">BYN</option>\r\n' +
          (null !=
            (a = f(n, "each").call(
              l,
              null != (a = null != t ? f(t, "db") : t) ? f(a, "dir") : a,
              {
                name: "each",
                hash: {},
                fn: e.program(1, o, 0),
                inverse: e.noop,
                data: o,
                loc: {
                  start: { line: 5, column: 6 },
                  end: { line: 9, column: 15 },
                },
              }
            ))
            ? a
            : "") +
          '    </select>\r\n  </label>\r\n  <input id="i' +
          s(
            typeof (i =
              null != (i = f(n, "id") || (null != t ? f(t, "id") : t))
                ? i
                : u) == c
              ? i.call(l, {
                name: "id",
                hash: {},
                data: o,
                loc: {
                  start: { line: 12, column: 14 },
                  end: { line: 12, column: 20 },
                },
              })
              : i
          ) +
          '" type="text" autocomplete="off" maxlength="10" value=' +
          s(
            e.lambda(
              null != (a = null != t ? f(t, "usd") : t)
                ? f(a, "Cur_OfficialRate")
                : a,
              t
            )
          ) +
          " />\r\n</div>"
        );
      },
      useData: !0,
    });
  },
  function (e, t, n) {
    n = n(2);
    e.exports = (n.default || n).template({
      compiler: [8, ">= 4.3.0"],
      main: function (e, t, n, r, o) {
        var a = e.lambda,
          i = e.escapeExpression,
          l =
            e.lookupProperty ||
            function (e, t) {
              if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
            };
        return (
          '<table class="rates-table-sort">\r\n  <caption class="rates-table-nav">\r\n    <ul>\r\n      <li>Минск</li>\r\n      <li>Брет</li>\r\n      <li>Витебск</li>\r\n      <li>Гродно</li>\r\n      <li>Гомель</li>\r\n      <li>Могилёв</li>\r\n    </ul>\r\n  </caption>\r\n  <thead>\r\n    <tr>\r\n      <th rowspan="2">Bank</th>\r\n      <th colspan="2">USD</th>\r\n      <th colspan="2">EUR</th>\r\n      <th colspan="2">RUB</th>\r\n    </tr>\r\n    <tr class="sort">\r\n      <td>Покупка</td>\r\n      <td>Продажа</td>\r\n      <td>Покупка</td>\r\n      <td>Продажа</td>\r\n      <td>Покупка</td>\r\n      <td>Продажа</td>\r\n\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr>\r\n      <td>' +
          i(
            a(
              null != (e = null != t ? l(t, "alfaBank") : t) ? l(e, "name") : e,
              t
            )
          ) +
          "</td>\r\n      <td>" +
          i(
            a(
              null !=
                (e =
                  null != (e = null != t ? l(t, "alfaBank") : t)
                    ? l(e, "usd")
                    : e)
                ? l(e, "buyRate")
                : e,
              t
            )
          ) +
          "</td>\r\n      <td>" +
          i(
            a(
              null !=
                (e =
                  null != (e = null != t ? l(t, "alfaBank") : t)
                    ? l(e, "usd")
                    : e)
                ? l(e, "sellRate")
                : e,
              t
            )
          ) +
          "</td>\r\n      <td>" +
          i(
            a(
              null !=
                (e =
                  null != (e = null != t ? l(t, "alfaBank") : t)
                    ? l(e, "eur")
                    : e)
                ? l(e, "buyRate")
                : e,
              t
            )
          ) +
          "</td>\r\n      <td>" +
          i(
            a(
              null !=
                (e =
                  null != (e = null != t ? l(t, "alfaBank") : t)
                    ? l(e, "eur")
                    : e)
                ? l(e, "sellRate")
                : e,
              t
            )
          ) +
          "</td>\r\n      <td>" +
          i(
            a(
              null !=
                (e =
                  null != (e = null != t ? l(t, "alfaBank") : t)
                    ? l(e, "rub")
                    : e)
                ? l(e, "buyRate")
                : e,
              t
            )
          ) +
          "</td>\r\n      <td>" +
          i(
            a(
              null !=
                (e =
                  null != (e = null != t ? l(t, "alfaBank") : t)
                    ? l(e, "rub")
                    : e)
                ? l(e, "sellRate")
                : e,
              t
            )
          ) +
          "</td>\r\n    </tr>\r\n  </tbody>\r\n</table>"
        );
      },
      useData: !0,
    });
  },
  function (e, t, n) {
    e.exports = n(32);
  },
  function (e, t, n) { },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function o(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    t.__esModule = !0;
    var a = o(n(3)),
      i = r(n(27)),
      l = r(n(1)),
      u = o(n(0)),
      c = o(n(28)),
      s = r(n(30));
    function f() {
      var t = new a.HandlebarsEnvironment();
      return (
        u.extend(t, a),
        (t.SafeString = i.default),
        (t.Exception = l.default),
        (t.Utils = u),
        (t.escapeExpression = u.escapeExpression),
        (t.VM = c),
        (t.template = function (e) {
          return c.template(e, t);
        }),
        t
      );
    }
    n = f();
    (n.create = f),
      s.default(n),
      (n.default = n),
      (t.default = n),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var a = n(0);
    (t.default = function (o) {
      o.registerHelper("blockHelperMissing", function (e, t) {
        var n = t.inverse,
          r = t.fn;
        return !0 === e
          ? r(this)
          : !1 === e || null == e
            ? n(this)
            : a.isArray(e)
              ? 0 < e.length
                ? (t.ids && (t.ids = [t.name]), o.helpers.each(e, t))
                : n(this)
              : (t.data &&
                t.ids &&
                (((n = a.createFrame(t.data)).contextPath = a.appendContextPath(
                  t.data.contextPath,
                  t.name
                )),
                  (t = { data: n })),
                r(e, t));
      });
    }),
      (e.exports = t.default);
  },
  function (n, r, o) {
    "use strict";
    !function (h) {
      r.__esModule = !0;
      var e,
        v = o(0),
        t = o(1),
        y = (e = t) && e.__esModule ? e : { default: e };
      (r.default = function (e) {
        e.registerHelper("each", function (r, e) {
          if (!e) throw new y.default("Must pass iterator to #each");
          var t,
            o = e.fn,
            n = e.inverse,
            a = 0,
            i = "",
            l = void 0,
            u = void 0;
          function c(e, t, n) {
            l &&
              ((l.key = e),
                (l.index = t),
                (l.first = 0 === t),
                (l.last = !!n),
                u && (l.contextPath = u + e)),
              (i += o(r[e], {
                data: l,
                blockParams: v.blockParams([r[e], e], [u + e, null]),
              }));
          }
          if (
            (e.data &&
              e.ids &&
              (u = v.appendContextPath(e.data.contextPath, e.ids[0]) + "."),
              v.isFunction(r) && (r = r.call(this)),
              e.data && (l = v.createFrame(e.data)),
              r && "object" == typeof r)
          )
            if (v.isArray(r))
              for (var s = r.length; a < s; a++)
                a in r && c(a, a, a === r.length - 1);
            else if (h.Symbol && r[h.Symbol.iterator]) {
              for (
                var f = [], d = r[h.Symbol.iterator](), p = d.next();
                !p.done;
                p = d.next()
              )
                f.push(p.value);
              for (s = (r = f).length; a < s; a++) c(a, a, a === r.length - 1);
            } else
              (t = void 0),
                Object.keys(r).forEach(function (e) {
                  void 0 !== t && c(t, a - 1), (t = e), a++;
                }),
                void 0 !== t && c(t, a - 1, !0);
          return (i = 0 === a ? n(this) : i);
        });
      }),
        (n.exports = r.default);
    }.call(this, o(5));
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      o = n(1),
      a = (r = o) && r.__esModule ? r : { default: r };
    (t.default = function (e) {
      e.registerHelper("helperMissing", function () {
        if (1 !== arguments.length)
          throw new a.default(
            'Missing helper: "' + arguments[arguments.length - 1].name + '"'
          );
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      o = n(0),
      a = n(1),
      i = (r = a) && r.__esModule ? r : { default: r };
    (t.default = function (n) {
      n.registerHelper("if", function (e, t) {
        if (2 != arguments.length)
          throw new i.default("#if requires exactly one argument");
        return (
          o.isFunction(e) && (e = e.call(this)),
          (!t.hash.includeZero && !e) || o.isEmpty(e)
            ? t.inverse(this)
            : t.fn(this)
        );
      }),
        n.registerHelper("unless", function (e, t) {
          if (2 != arguments.length)
            throw new i.default("#unless requires exactly one argument");
          return n.helpers.if.call(this, e, {
            fn: t.inverse,
            inverse: t.fn,
            hash: t.hash,
          });
        });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.default = function (o) {
        o.registerHelper("log", function () {
          for (
            var e = [void 0], t = arguments[arguments.length - 1], n = 0;
            n < arguments.length - 1;
            n++
          )
            e.push(arguments[n]);
          var r = 1;
          null != t.hash.level
            ? (r = t.hash.level)
            : t.data && null != t.data.level && (r = t.data.level),
            (e[0] = r),
            o.log.apply(o, e);
        });
      }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.default = function (e) {
        e.registerHelper("lookup", function (e, t, n) {
          return e && n.lookupProperty(e, t);
        });
      }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r,
      o = n(0),
      a = n(1),
      i = (r = a) && r.__esModule ? r : { default: r };
    (t.default = function (e) {
      e.registerHelper("with", function (e, t) {
        if (2 != arguments.length)
          throw new i.default("#with requires exactly one argument");
        o.isFunction(e) && (e = e.call(this));
        var n = t.fn;
        if (o.isEmpty(e)) return t.inverse(this);
        var r = t.data;
        return (
          t.data &&
          t.ids &&
          ((r = o.createFrame(t.data)).contextPath = o.appendContextPath(
            t.data.contextPath,
            t.ids[0]
          )),
          n(e, {
            data: r,
            blockParams: o.blockParams([e], [r && r.contextPath]),
          })
        );
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.registerDefaultDecorators = function (e) {
        a.default(e);
      });
    var r,
      o = n(25),
      a = (r = o) && r.__esModule ? r : { default: r };
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var i = n(0);
    (t.default = function (e) {
      e.registerDecorator("inline", function (r, o, a, e) {
        var t = r;
        return (
          o.partials ||
          ((o.partials = {}),
            (t = function (e, t) {
              var n = a.partials;
              a.partials = i.extend({}, n, o.partials);
              t = r(e, t);
              return (a.partials = n), t;
            })),
          (o.partials[e.args[0]] = e.fn),
          t
        );
      });
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.createNewLookupObject = function () {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return r.extend.apply(void 0, [Object.create(null)].concat(t));
      });
    var r = n(0);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      this.string = e;
    }
    (t.__esModule = !0),
      (r.prototype.toString = r.prototype.toHTML =
        function () {
          return "" + this.string;
        }),
      (t.default = r),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.checkRevision = function (e) {
        var t = (e && e[0]) || 1,
          n = d.COMPILER_REVISION;
        if (
          !(
            t >= d.LAST_COMPATIBLE_COMPILER_REVISION && t <= d.COMPILER_REVISION
          )
        ) {
          if (t < d.LAST_COMPATIBLE_COMPILER_REVISION) {
            (n = d.REVISION_CHANGES[n]), (t = d.REVISION_CHANGES[t]);
            throw new f.default(
              "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
              n +
              ") or downgrade your runtime to an older version (" +
              t +
              ")."
            );
          }
          throw new f.default(
            "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
            e[1] +
            ")."
          );
        }
      }),
      (t.template = function (u, c) {
        if (!c) throw new f.default("No environment passed to template");
        if (!u || !u.main)
          throw new f.default("Unknown template object: " + typeof u);
        (u.main.decorator = u.main_d), c.VM.checkRevision(u.compiler);
        var n = u.compiler && 7 === u.compiler[0];
        var i = {
          strict: function (e, t, n) {
            if (!(e && t in e))
              throw new f.default('"' + t + '" not defined in ' + e, {
                loc: n,
              });
            return i.lookupProperty(e, t);
          },
          lookupProperty: function (e, t) {
            var n = e[t];
            return null == n ||
              Object.prototype.hasOwnProperty.call(e, t) ||
              h.resultIsAllowed(n, i.protoAccessControl, t)
              ? n
              : void 0;
          },
          lookup: function (e, t) {
            for (var n = e.length, r = 0; r < n; r++)
              if (null != (e[r] && i.lookupProperty(e[r], t))) return e[r][t];
          },
          lambda: function (e, t) {
            return "function" == typeof e ? e.call(t) : e;
          },
          escapeExpression: s.escapeExpression,
          invokePartial: function (e, t, n) {
            n.hash && ((t = s.extend({}, t, n.hash)), n.ids && (n.ids[0] = !0)),
              (e = c.VM.resolvePartial.call(this, e, t, n));
            var r = s.extend({}, n, {
              hooks: this.hooks,
              protoAccessControl: this.protoAccessControl,
            }),
              o = c.VM.invokePartial.call(this, e, t, r);
            if (
              (null == o &&
                c.compile &&
                ((n.partials[n.name] = c.compile(e, u.compilerOptions, c)),
                  (o = n.partials[n.name](t, r))),
                null == o)
            )
              throw new f.default(
                "The partial " +
                n.name +
                " could not be compiled when running in runtime-only mode"
              );
            if (n.indent) {
              for (
                var a = o.split("\n"), i = 0, l = a.length;
                i < l && (a[i] || i + 1 !== l);
                i++
              )
                a[i] = n.indent + a[i];
              o = a.join("\n");
            }
            return o;
          },
          fn: function (e) {
            var t = u[e];
            return (t.decorator = u[e + "_d"]), t;
          },
          programs: [],
          program: function (e, t, n, r, o) {
            var a = this.programs[e],
              i = this.fn(e);
            return (a =
              t || o || r || n
                ? v(this, e, i, t, n, r, o)
                : a || (this.programs[e] = v(this, e, i)));
          },
          data: function (e, t) {
            for (; e && t--;) e = e._parent;
            return e;
          },
          mergeIfNeeded: function (e, t) {
            var n = e || t;
            return (n = e && t && e !== t ? s.extend({}, t, e) : n);
          },
          nullContext: Object.seal({}),
          noop: c.VM.noop,
          compilerInfo: u.compiler,
        };
        function l(e) {
          var t =
            arguments.length <= 1 || void 0 === arguments[1]
              ? {}
              : arguments[1],
            n = t.data;
          l._setup(t),
            !t.partial &&
            u.useData &&
            (n = (function (e, t) {
              (t && "root" in t) ||
                ((t = t ? d.createFrame(t) : {}).root = e);
              return t;
            })(e, n));
          var r = void 0,
            o = u.useBlockParams ? [] : void 0;
          function a(e) {
            return "" + u.main(i, e, i.helpers, i.partials, n, o, r);
          }
          return (
            u.useDepths &&
            (r = t.depths
              ? e != t.depths[0]
                ? [e].concat(t.depths)
                : t.depths
              : [e]),
            (a = y(u.main, a, i, t.depths || [], n, o))(e, t)
          );
        }
        return (
          (l.isTop = !0),
          (l._setup = function (e) {
            var t, r, o;
            e.partial
              ? ((i.protoAccessControl = e.protoAccessControl),
                (i.helpers = e.helpers),
                (i.partials = e.partials),
                (i.decorators = e.decorators),
                (i.hooks = e.hooks))
              : ((t = s.extend({}, c.helpers, e.helpers)),
                (r = t),
                (o = i),
                Object.keys(r).forEach(function (e) {
                  var t,
                    n = r[e];
                  r[e] =
                    ((t = o.lookupProperty),
                      p.wrapHelper(n, function (e) {
                        return s.extend({ lookupProperty: t }, e);
                      }));
                }),
                (i.helpers = t),
                u.usePartial &&
                (i.partials = i.mergeIfNeeded(e.partials, c.partials)),
                (u.usePartial || u.useDecorators) &&
                (i.decorators = s.extend({}, c.decorators, e.decorators)),
                (i.hooks = {}),
                (i.protoAccessControl = h.createProtoAccessControl(e)),
                (e = e.allowCallsToHelperMissing || n),
                a.moveHelperToHooks(i, "helperMissing", e),
                a.moveHelperToHooks(i, "blockHelperMissing", e));
          }),
          (l._child = function (e, t, n, r) {
            if (u.useBlockParams && !n)
              throw new f.default("must pass block params");
            if (u.useDepths && !r)
              throw new f.default("must pass parent depths");
            return v(i, e, u[e], t, 0, n, r);
          }),
          l
        );
      }),
      (t.wrapProgram = v),
      (t.resolvePartial = function (e, t, n) {
        e
          ? e.call || n.name || ((n.name = e), (e = n.partials[e]))
          : (e =
            "@partial-block" === n.name
              ? n.data["partial-block"]
              : n.partials[n.name]);
        return e;
      }),
      (t.invokePartial = function (e, t, r) {
        var o = r.data && r.data["partial-block"];
        (r.partial = !0),
          r.ids && (r.data.contextPath = r.ids[0] || r.data.contextPath);
        var a = void 0;
        r.fn &&
          r.fn !== i &&
          (function () {
            r.data = d.createFrame(r.data);
            var n = r.fn;
            (a = r.data["partial-block"] =
              function (e) {
                var t =
                  arguments.length <= 1 || void 0 === arguments[1]
                    ? {}
                    : arguments[1];
                return (
                  (t.data = d.createFrame(t.data)),
                  (t.data["partial-block"] = o),
                  n(e, t)
                );
              }),
              n.partials && (r.partials = s.extend({}, r.partials, n.partials));
          })();
        void 0 === e && a && (e = a);
        {
          if (void 0 === e)
            throw new f.default(
              "The partial " + r.name + " could not be found"
            );
          if (e instanceof Function) return e(t, r);
        }
      }),
      (t.noop = i);
    var r,
      s = (function (e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return (t.default = e), t;
      })(n(0)),
      o = n(1),
      f = (r = o) && r.__esModule ? r : { default: r },
      d = n(3),
      a = n(4),
      p = n(29),
      h = n(7);
    function v(r, e, o, a, t, i, l) {
      function n(e) {
        var t =
          arguments.length <= 1 || void 0 === arguments[1]
            ? {}
            : arguments[1],
          n = l;
        return (
          !l ||
          e == l[0] ||
          (e === r.nullContext && null === l[0]) ||
          (n = [e].concat(l)),
          o(
            r,
            e,
            r.helpers,
            r.partials,
            t.data || a,
            i && [t.blockParams].concat(i),
            n
          )
        );
      }
      return (
        ((n = y(o, n, r, l, a, i)).program = e),
        (n.depth = l ? l.length : 0),
        (n.blockParams = t || 0),
        n
      );
    }
    function i() {
      return "";
    }
    function y(e, t, n, r, o, a) {
      return (
        e.decorator &&
        ((t = e.decorator(t, (e = {}), n, r && r[0], o, a, r)),
          s.extend(t, e)),
        t
      );
    }
  },
  function (e, t, n) {
    "use strict";
    (t.__esModule = !0),
      (t.wrapHelper = function (t, n) {
        return "function" == typeof t
          ? function () {
            var e = arguments[arguments.length - 1];
            return (
              (arguments[arguments.length - 1] = n(e)),
              t.apply(this, arguments)
            );
          }
          : t;
      });
  },
  function (e, t, n) {
    "use strict";
    !function (r) {
      (t.__esModule = !0),
        (t.default = function (e) {
          var t = void 0 !== r ? r : window,
            n = t.Handlebars;
          e.noConflict = function () {
            return t.Handlebars === e && (t.Handlebars = n), e;
          };
        }),
        (e.exports = t.default);
    }.call(this, n(5));
  },
  function (e, t, n) {
    "use strict";
    function r(e, t, n, r) {
      switch (t) {
        case "==":
          return e == n ? r.fn(this) : r.inverse(this);
        case "===":
          return e === n ? r.fn(this) : r.inverse(this);
        case "!==":
          return e !== n ? r.fn(this) : r.inverse(this);
        case "<":
          return e < n ? r.fn(this) : r.inverse(this);
        case "<=":
          return e <= n ? r.fn(this) : r.inverse(this);
        case ">":
          return n < e ? r.fn(this) : r.inverse(this);
        case ">=":
          return n <= e ? r.fn(this) : r.inverse(this);
        case "&&":
          return e && n ? r.fn(this) : r.inverse(this);
        case "||":
          return e || n ? r.fn(this) : r.inverse(this);
        default:
          return r.inverse(this);
      }
    }
    n.r(t),
      n.d(t, "default", function () {
        return r;
      });
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    function a(t) {
      var e = JSON.parse(localStorage.getItem("db"));
      return t
        ? Object.assign(
          e.dir.find(function (e) {
            return e.Cur_Abbreviation == t;
          }),
          e.daily.find(function (e) {
            return e.Cur_Abbreviation == t;
          }),
          e.monthly.find(function (e) {
            return e.Cur_Abbreviation == t;
          })
        )
        : e;
    }
    n(15);
    var t = n(8),
      o = n.n(t);
    function i(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    var f = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "render",
            value: function () {
              return new Promise(function (e) {
                e(
                  o()({
                    usd: a("USD"),
                    eur: a("EUR"),
                    rub: a("RUB"),
                    pln: a("PLN"),
                  })
                );
              });
            },
          },
        ]) && i(t.prototype, n),
        r && i(t, r),
        e
      );
    })(),
      t = n(9),
      l = n.n(t);
    function u(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function c(t) {
      var e = JSON.parse(localStorage.getItem("db"));
      return t
        ? e.allAlfaBank.find(function (e) {
          return e.sellIso == t;
        })
        : e;
    }
    var d = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "render",
            value: function () {
              return new Promise(function (e) {
                return e(l()());
              });
            },
          },
        ]) && u(t.prototype, n),
        r && u(t, r),
        e
      );
    })(),
      t = n(10),
      s = n.n(t);
    function p(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function h() {
      return Math.random().toString(36).substr(2, 10);
    }
    var v = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "render",
            value: function () {
              return new Promise(function (e) {
                e(
                  s()({
                    date: (function () {
                      var e = new Date(),
                        t = {
                          yer: e.getFullYear(),
                          month: e.getMonth(),
                          date: e.getDate(),
                        };
                      switch (t.month) {
                        case 0:
                          return (
                            t.date.toString() + " января " + t.yer.toString()
                          );
                        case 1:
                          return (
                            t.date.toString() + " февраля " + t.yer.toString()
                          );
                        case 2:
                          return (
                            t.date.toString() + " марта " + t.yer.toString()
                          );
                        case 3:
                          return (
                            t.date.toString() + " апреля " + t.yer.toString()
                          );
                        case 4:
                          return (
                            t.date.toString() + " мая " + t.yer.toString()
                          );
                        case 5:
                          return (
                            t.date.toString() + " июня " + t.yer.toString()
                          );
                        case 6:
                          return (
                            t.date.toString() + " июля " + t.yer.toString()
                          );
                        case 7:
                          return (
                            t.date.toString() + " августа " + t.yer.toString()
                          );
                        case 8:
                          return (
                            t.date.toString() +
                            " сентября " +
                            t.yer.toString()
                          );
                        case 9:
                          return (
                            t.date.toString() + " октября " + t.yer.toString()
                          );
                        case 10:
                          return (
                            t.date.toString() + " ноября " + t.yer.toString()
                          );
                        case 11:
                          return (
                            t.date.toString() + " декабря " + t.yer.toString()
                          );
                      }
                    })(),
                    nbrb: {
                      usd: a("USD"),
                      eur: a("EUR"),
                      rub: a("RUB"),
                      pln: a("PLN"),
                    },
                    alfaBank: { usd: c("USD"), eur: c("EUR"), rub: c("RUB") },
                  })
                );
              });
            },
          },
        ]) && p(t.prototype, n),
        r && p(t, r),
        e
      );
    })(),
      t = n(11),
      y = n.n(t);
    function m(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    var b = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "getCurrenciesValueFromBanks",
            value: function () {
              var t = this;
              return new Promise(function (e) {
                t.getDirCurrFromNBRB().then(function (e) {
                  return t.sendToServer(e, "dir");
                }),
                  t.getCurrDailyFromNBRB().then(function (e) {
                    return t.sendToServer(e, "daily");
                  }),
                  t.getCurrMonthlyFromNBRB().then(function (e) {
                    return t.sendToServer(e, "monthly");
                  }),
                  t.getCurrenciesFromAlfaBank().then(function (e) {
                    return t.sendToServer(e, "AB");
                  }),
                  e();
              });
            },
          },
          {
            key: "getCurrenciesFromAlfaBank",
            value: function () {
              return new Promise(function (t) {
                fetch(
                  "https://developerhub.alfabank.by:8273/partner/1.0.1/public/rates"
                )
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    e = JSON.stringify(
                      e.rates.filter(function (e) {
                        return 1 == e.buyIso.includes("BYN");
                      })
                    );
                    t(e);
                  });
              });
            },
          },
          {
            key: "getDirCurrFromNBRB",
            value: function () {
              return new Promise(function (t) {
                fetch("https://www.nbrb.by/api/exrates/currencies")
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    e = JSON.stringify(
                      e.filter(function (e) {
                        return 1 == e.Cur_DateEnd.includes("2050");
                      })
                    );
                    t(e);
                  })
                  .catch(function (e) {
                    return alert("Данные не получены \n".concat(e));
                  });
              });
            },
          },
          {
            key: "getCurrDailyFromNBRB",
            value: function () {
              return new Promise(function (t) {
                fetch("https://www.nbrb.by/api/exrates/rates?periodicity=0")
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    t(JSON.stringify(e));
                  })
                  .catch(function (e) {
                    return alert("Данные не получены \n".concat(e));
                  });
              });
            },
          },
          {
            key: "getCurrMonthlyFromNBRB",
            value: function () {
              return new Promise(function (t) {
                fetch("https://www.nbrb.by/api/exrates/rates?periodicity=1")
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    e = JSON.stringify(e);
                    t(e);
                  })
                  .catch(function (e) {
                    return alert("Данные не получены \n".concat(e));
                  });
              });
            },
          },
          {
            key: "sendToServer",
            value: function (t, n) {
              return new Promise(function (e) {
                fetch("https://vitalyradionov.github.io/converter/api/curr/".concat(n), {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: t,
                })
                  .then(function () {
                    e();
                  })
                  .catch(function (e) {
                    return alert(
                      "Данные не отправлены на сервер \n".concat(e)
                    );
                  });
              });
            },
          },
          {
            key: "getCurrList",
            value: function () {
              return new Promise(function (t) {
                fetch("https://vitalyradionov.github.io/converter/api/currencies")
                  .then(function (e) {
                    return e.json();
                  })
                  .then(function (e) {
                    t(e);
                  })
                  .catch(function (e) {
                    return alert("Данные не получены с сервера \n".concat(e));
                  });
              });
            },
          },
        ]) && m(t.prototype, n),
        r && m(t, r),
        e
      );
    })(),
      t = n(12),
      g = n.n(t);
    function w(e) {
      return (w =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
            return typeof e;
          }
          : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
    }
    function _(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function O(e, t) {
      return (O =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function P(n) {
      var r = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () { })
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var e,
          t = k(n);
        return (function (e, t) {
          {
            if (t && ("object" === w(t) || "function" == typeof t)) return t;
            if (void 0 !== t)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
          }
          return (function (e) {
            if (void 0 !== e) return e;
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          })(e);
        })(
          this,
          r
            ? ((e = k(this).constructor), Reflect.construct(t, arguments, e))
            : t.apply(this, arguments)
        );
      };
    }
    function k(e) {
      return (k = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }
    var r = (function () {
      !(function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && O(e, t);
      })(o, b);
      var e,
        t,
        n,
        r = P(o);
      function o() {
        var e;
        return (
          (function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, o),
          ((e = r.call(this)).calc = new C()),
          e
        );
      }
      return (
        (e = o),
        (t = [
          {
            key: "render",
            value: function () {
              return new Promise(function (e) {
                return e(g()({ id: h(), db: a(), usd: a("USD") }));
              });
            },
          },
        ]) && _(e.prototype, t),
        n && _(e, n),
        o
      );
    })();
    function E(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return x(e);
        })(e) ||
        (function (e) {
          if (
            ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
            null != e["@@iterator"]
          )
            return Array.from(e);
        })(e) ||
        (function (e, t) {
          if (e) {
            if ("string" == typeof e) return x(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" ===
              (n = "Object" === n && e.constructor ? e.constructor.name : n) ||
              "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? x(e, t)
                : void 0;
          }
        })(e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()
      );
    }
    function x(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function S(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    var C = (function () {
      function o() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, o);
      }
      var e, t, n;
      return (
        (e = o),
        (t = [
          {
            key: "setActions",
            value: function () {
              var n = this,
                r = E(document.getElementsByTagName("input")),
                e = E(document.getElementsByTagName("select")),
                t = document.getElementsByClassName("input-select_btn-add")[0],
                o = [
                  "input",
                  "keyup",
                  "keydown",
                  "mousedown",
                  "mouseup",
                  "select",
                  "contextmenu",
                  "drop",
                ];
              e.forEach(function (e) {
                return e.addEventListener("change", n.render);
              }),
                t.addEventListener("click", this.addCurr),
                r.forEach(function (t) {
                  return o.forEach(function (e) {
                    t.addEventListener(e, n.setInputFilter),
                      t.addEventListener(e, function () {
                        return n.calculate(r);
                      });
                  });
                });
            },
          },
          {
            key: "setInputFilter",
            value: function () {
              /^\d*[.,]?\d*$/.test(this.value)
                ? ((this.oldValue = this.value),
                  (this.oldSelectionStart = this.selectionStart),
                  (this.oldSelectionEnd = this.selectionEnd))
                : this.hasOwnProperty("oldValue")
                  ? ((this.value = this.oldValue),
                    this.setSelectionRange(
                      this.oldSelectionStart,
                      this.oldSelectionEnd
                    ))
                  : (this.value = "");
            },
          },
          {
            key: "addCurr",
            value: function () {
              var t = document.getElementsByClassName("curr-list")[0];
              new r().render().then(function (e) {
                t.insertAdjacentHTML("beforeend", e), o.prototype.setActions();
              });
            },
          },
          {
            key: "calculate",
            value: function (e) {
              var n = event.target,
                t = o.prototype.getElement("s" + n.id).value,
                r = n.value;
              "INPUT" == n.tagName && "BYN" == t
                ? e
                  .filter(function (e) {
                    return e.id != n.id;
                  })
                  .forEach(function (e) {
                    var t;
                    "BYN" == o.prototype.getElement("s" + e.id).value
                      ? (e.value = n.value)
                      : ((t = a(
                        o.prototype.getElement("s" + e.id).value
                      ).Cur_OfficialRate),
                        (e.value = +(r / t).toFixed(4)));
                  })
                : "INPUT" == n.tagName &&
                "BYN" != t &&
                (e
                  .filter(function (e) {
                    return e.id != n.id;
                  })
                  .forEach(function (e) {
                    var t;
                    "BYN" == o.prototype.getElement("s" + e.id).value &&
                      ((t = a(
                        o.prototype.getElement("s" + n.id).value
                      ).Cur_OfficialRate),
                        (e.value = +(r * t).toFixed(4)));
                  }),
                  e
                    .filter(function (e) {
                      return e.id == n.id;
                    })
                    .forEach(function (e) {
                      e.value = n.value;
                    }));
            },
          },
          {
            key: "getElement",
            value: function (e) {
              return (
                document.getElementById(e) ||
                document.getElementsByClassName(e)[0]
              );
            },
          },
          {
            key: "render",
            value: function () {
              var e = event.target,
                t = e.value,
                n = e.id,
                e = e.id.slice(1);
              n.startsWith("si") &&
                "BYN" != t &&
                (document.getElementById(e).value = a(t).Cur_OfficialRate);
            },
          },
        ]) && S(e.prototype, t),
        n && S(e, n),
        o
      );
    })();
    function j(e) {
      return (j =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
            return typeof e;
          }
          : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
    }
    function M(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    function A(e, t) {
      return (A =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function B(n) {
      var r = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () { })
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function () {
        var e,
          t = R(n);
        return (function (e, t) {
          {
            if (t && ("object" === j(t) || "function" == typeof t)) return t;
            if (void 0 !== t)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
          }
          return (function (e) {
            if (void 0 !== e) return e;
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          })(e);
        })(
          this,
          r
            ? ((e = R(this).constructor), Reflect.construct(t, arguments, e))
            : t.apply(this, arguments)
        );
      };
    }
    function R(e) {
      return (R = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e);
        })(e);
    }
    var N = (function () {
      !(function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && A(e, t);
      })(o, b);
      var e,
        t,
        n,
        r = B(o);
      function o() {
        var e;
        return (
          (function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, o),
          ((e = r.call(this)).calc = new C()),
          e
        );
      }
      return (
        (e = o),
        (t = [
          {
            key: "render",
            value: function () {
              return new Promise(function (e) {
                return e(y()({ id: h(), db: a(), usd: a("USD") }));
              });
            },
          },
        ]) && M(e.prototype, t),
        n && M(e, n),
        o
      );
    })(),
      t = n(13),
      I = n.n(t);
    function D(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    var H = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
      }
      var t, n, r;
      return (
        (t = e),
        (n = [
          {
            key: "render",
            value: function () {
              return new Promise(function (e) {
                e(
                  I()({
                    alfaBank: {
                      name: "Альфа-Банк",
                      usd: c("USD"),
                      eur: c("EUR"),
                      rub: c("RUB"),
                    },
                  })
                );
              });
            },
          },
        ]) && D(t.prototype, n),
        r && D(t, r),
        e
      );
    })();
    function T() {
      var t = document.getElementsByTagName("header")[0],
        n = document.getElementsByTagName("footer")[0],
        r = document.getElementsByClassName("converter content")[0],
        o = document.getElementsByClassName("converter sidebar")[0],
        e = new f(),
        a = new v(),
        i = new N(),
        l = new d(),
        u = new C(),
        c = new b(),
        s = new H();
      c.getCurrenciesValueFromBanks()
        .then(function () {
          return c.getCurrList().then(function (e) {
            function t(e, t) {
              return e.Cur_Abbreviation > t.Cur_Abbreviation
                ? 1
                : e.Cur_Abbreviation < t.Cur_Abbreviation
                  ? -1
                  : 0;
            }
            (e = {
              dir: e.dir.sort(t),
              daily: e.daily.sort(t),
              monthly: e.monthly.sort(t),
              allAlfaBank: e.allAlfaBank,
            }),
              localStorage.setItem("db", JSON.stringify(e));
          });
        })
        .then(function () {
          return e.render().then(function (e) {
            return (t.innerHTML = e);
          });
        })
        .then(function () {
          return a.render().then(function (e) {
            return (r.innerHTML = e);
          });
        })
        .then(function () {
          return i.render().then(function (e) {
            return (o.innerHTML = e);
          });
        })
        .then(function () {
          return u.setActions();
        })
        .then(function () {
          return s.render().then(function (e) {
            return (r.innerHTML += e);
          });
        })
        .then(function () {
          return l.render().then(function (e) {
            return (n.innerHTML = e);
          });
        });
    }
    e.hot.accept(T()), window.addEventListener("hashchange", T);
  },
]);
