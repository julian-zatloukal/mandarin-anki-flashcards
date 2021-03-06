(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.pinyinSeparate = f();
  }
})(function () {
  var define, module, exports;
  return (function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw ((a.code = "MODULE_NOT_FOUND"), a);
          }
          var p = (n[i] = { exports: {} });
          e[i][0].call(
            p.exports,
            function (r) {
              var n = e[i][1][r];
              return o(n || r);
            },
            p,
            p.exports,
            r,
            e,
            n,
            t
          );
        }
        return n[i].exports;
      }
      for (
        var u = "function" == typeof require && require, i = 0;
        i < t.length;
        i++
      )
        o(t[i]);
      return o;
    }
    return r;
  })()(
    {
      1: [
        function (require, module, exports) {
          "use strict";
          var a = "aāáǎăàeēéěĕèiīíǐĭìoōóǒŏòuūúǔŭùüǖǘǚǚü̆ǜvv̄v́v̆v̌v̀",
            b = "āáǎăàēéěĕèīíǐĭìōóǒŏòūúǔŭùǖǘǚǚü̆ǜv̄v́v̆v̌v̀";
          function c(e) {
            return e
              .replace(/'/g, " ")
              .replace(
                new RegExp("([" + a + "])([^" + a + "nr])", "gi"),
                "$1 $2"
              )
              .replace(new RegExp("(\\w)([csz]h)", "gi"), "$1 $2")
              .replace(
                new RegExp("([" + a + "]{2}(ng? )?)([^\\snr])", "gi"),
                "$1 $3"
              )
              .replace(
                new RegExp("([" + a + "]{2})(n[" + a + "])", "gi"),
                "$1 $2"
              )
              .replace(new RegExp("(n)([^" + a + "vg])", "gi"), "$1 $2")
              .replace(
                new RegExp(
                  "([" + a + "v])([^" + a + "\\w\\s])([" + a + "v])",
                  "gi"
                ),
                "$1 $2$3"
              )
              .replace(
                new RegExp("([" + a + "v])(n)(g)([" + a + "v])", "gi"),
                "$1$2 $3$4"
              )
              .replace(new RegExp("([gr])([^" + a + "])", "gi"), "$1 $2")
              .replace(new RegExp("([^eēéěĕè\\w\\s])(r)", "gi"), "$1 $2")
              .replace(new RegExp("([^\\w\\s])([eēéěĕè]r)", "gi"), "$1 $2")
              .replace(/\s{2,}/g, " ");
          }
          module.exports = function (e, r) {
            if (!e) return [];
            if (r) return e.split(String.fromCharCode(160));
            var n = c(e).split(" "),
              a = [];
            return (
              n.forEach(function (e) {
                var r = 1,
                  n = e.match(new RegExp("([" + b + "])", "g"));
                n && (r = n.length),
                  4 < e.length || 1 < r
                    ? c(e)
                        .split(" ")
                        .forEach(function (e) {
                          (n = e.match(new RegExp("([" + b + "])", "g"))) &&
                            (r = n.length),
                            4 < e.length || 1 < r
                              ? c(e)
                                  .split(" ")
                                  .forEach(function (e) {
                                    a.push(e.trim());
                                  })
                              : a.push(e.trim());
                        })
                    : a.push(e.trim());
              }),
              a
            );
          };
        },
        {},
      ],
      2: [
        function (require, module, exports) {
          "use strict";
          Object.defineProperty(exports, "__esModule", { value: !0 });
          var a = require("./helpers/separate-pinyin-in-syllables"),
            b = c(a);
          function c(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var d = { byNbsp: !1 },
            e = function (e) {
              var t =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : d;
              return (
                t !== d && (t = Object.assign({}, d, t)),
                (0, b.default)(e, t.byNbsp)
              );
            };
          (exports.default = e), (module.exports = exports.default);
        },
        { "./helpers/separate-pinyin-in-syllables": 1 },
      ],
    },
    {},
    [2]
  )(2);
});
