// 'use strict'
let Sl = {
  exports: {}
}
let Pl = {
  exports: {}
}

  ; (function () {
    var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      t = {
        rotl: function (n, r) {
          return (n << r) | (n >>> (32 - r))
        },
        rotr: function (n, r) {
          return (n << (32 - r)) | (n >>> r)
        },
        endian: function (n) {
          if (n.constructor == Number)
            return (t.rotl(n, 8) & 16711935) | (t.rotl(n, 24) & 4278255360)

          for (var r = 0; r < n.length; r++) n[r] = t.endian(n[r])

          return n
        },
        randomBytes: function (n) {
          for (var r = []; n > 0; n--) r.push(Math.floor(Math.random() * 256))

          return r
        },
        bytesToWords: function (n) {
          for (var r = [], s = 0, o = 0; s < n.length; s++, o += 8)
            r[o >>> 5] |= n[s] << (24 - (o % 32))

          return r
        },
        wordsToBytes: function (n) {
          for (var r = [], s = 0; s < n.length * 32; s += 8)
            r.push((n[s >>> 5] >>> (24 - (s % 32))) & 255)

          return r
        },
        bytesToHex: function (n) {
          for (var r = [], s = 0; s < n.length; s++)
            r.push((n[s] >>> 4).toString(16)), r.push((n[s] & 15).toString(16))

          return r.join('')
        },
        hexToBytes: function (n) {
          for (var r = [], s = 0; s < n.length; s += 2)
            r.push(parseInt(n.substr(s, 2), 16))

          return r
        },
        bytesToBase64: function (n) {
          for (var r = [], s = 0; s < n.length; s += 3)
            for (
              var o = (n[s] << 16) | (n[s + 1] << 8) | n[s + 2], i = 0;
              i < 4;
              i++
            )
              s * 8 + i * 6 <= n.length * 8
                ? r.push(e.charAt((o >>> (6 * (3 - i))) & 63))
                : r.push('=')

          return r.join('')
        },
        base64ToBytes: function (n) {
          n = n.replace(/[^A-Z0-9+\/]/gi, '')

          for (var r = [], s = 0, o = 0; s < n.length; o = ++s % 4)
            o != 0 &&
              r.push(
                ((e.indexOf(n.charAt(s - 1)) & (Math.pow(2, -2 * o + 8) - 1)) <<
                  (o * 2)) |
                (e.indexOf(n.charAt(s)) >>> (6 - o * 2))
              )

          return r
        }
      }
    Pl.exports = t
  })()

var vs = {
  utf8: {
    stringToBytes: function (e) {
      return vs.bin.stringToBytes(unescape(encodeURIComponent(e)))
    },
    bytesToString: function (e) {
      return decodeURIComponent(escape(vs.bin.bytesToString(e)))
    }
  },
  bin: {
    stringToBytes: function (e) {
      for (var t = [], n = 0; n < e.length; n++) t.push(e.charCodeAt(n) & 255)

      return t
    },
    bytesToString: function (e) {
      for (var t = [], n = 0; n < e.length; n++)
        t.push(String.fromCharCode(e[n]))

      return t.join('')
    }
  }
},
  Si = vs
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var I0 = function (e) {
  return e != null && (Rl(e) || L0(e) || !!e._isBuffer)
}

function Rl(e) {
  return (
    !!e.constructor &&
    typeof e.constructor.isBuffer == 'function' &&
    e.constructor.isBuffer(e)
  )
}

function L0(e) {
  return (
    typeof e.readFloatLE == 'function' &&
    typeof e.slice == 'function' &&
    Rl(e.slice(0, 0))
  )
}

; (function () {
  var e = Pl.exports,
    t = Si.utf8,
    n = I0,
    r = Si.bin,
    s = function (o, i) {
      o.constructor == String
        ? i && i.encoding === 'binary'
          ? (o = r.stringToBytes(o))
          : (o = t.stringToBytes(o))
        : n(o)
          ? (o = Array.prototype.slice.call(o, 0))
          : !Array.isArray(o) &&
          o.constructor !== Uint8Array &&
          (o = o.toString())

      for (
        var c = e.bytesToWords(o),
        a = o.length * 8,
        u = 1732584193,
        l = -271733879,
        f = -1732584194,
        d = 271733878,
        p = 0;
        p < c.length;
        p++
      )
        c[p] =
          (((c[p] << 8) | (c[p] >>> 24)) & 16711935) |
          (((c[p] << 24) | (c[p] >>> 8)) & 4278255360)
          ; (c[a >>> 5] |= 128 << a % 32), (c[(((a + 64) >>> 9) << 4) + 14] = a)

      for (
        var g = s._ff, E = s._gg, _ = s._hh, b = s._ii, p = 0;
        p < c.length;
        p += 16
      ) {
        var y = u,
          M = l,
          S = f,
          k = d
          ; (u = g(u, l, f, d, c[p + 0], 7, -680876936)),
            (d = g(d, u, l, f, c[p + 1], 12, -389564586)),
            (f = g(f, d, u, l, c[p + 2], 17, 606105819)),
            (l = g(l, f, d, u, c[p + 3], 22, -1044525330)),
            (u = g(u, l, f, d, c[p + 4], 7, -176418897)),
            (d = g(d, u, l, f, c[p + 5], 12, 1200080426)),
            (f = g(f, d, u, l, c[p + 6], 17, -1473231341)),
            (l = g(l, f, d, u, c[p + 7], 22, -45705983)),
            (u = g(u, l, f, d, c[p + 8], 7, 1770035416)),
            (d = g(d, u, l, f, c[p + 9], 12, -1958414417)),
            (f = g(f, d, u, l, c[p + 10], 17, -42063)),
            (l = g(l, f, d, u, c[p + 11], 22, -1990404162)),
            (u = g(u, l, f, d, c[p + 12], 7, 1804603682)),
            (d = g(d, u, l, f, c[p + 13], 12, -40341101)),
            (f = g(f, d, u, l, c[p + 14], 17, -1502002290)),
            (l = g(l, f, d, u, c[p + 15], 22, 1236535329)),
            (u = E(u, l, f, d, c[p + 1], 5, -165796510)),
            (d = E(d, u, l, f, c[p + 6], 9, -1069501632)),
            (f = E(f, d, u, l, c[p + 11], 14, 643717713)),
            (l = E(l, f, d, u, c[p + 0], 20, -373897302)),
            (u = E(u, l, f, d, c[p + 5], 5, -701558691)),
            (d = E(d, u, l, f, c[p + 10], 9, 38016083)),
            (f = E(f, d, u, l, c[p + 15], 14, -660478335)),
            (l = E(l, f, d, u, c[p + 4], 20, -405537848)),
            (u = E(u, l, f, d, c[p + 9], 5, 568446438)),
            (d = E(d, u, l, f, c[p + 14], 9, -1019803690)),
            (f = E(f, d, u, l, c[p + 3], 14, -187363961)),
            (l = E(l, f, d, u, c[p + 8], 20, 1163531501)),
            (u = E(u, l, f, d, c[p + 13], 5, -1444681467)),
            (d = E(d, u, l, f, c[p + 2], 9, -51403784)),
            (f = E(f, d, u, l, c[p + 7], 14, 1735328473)),
            (l = E(l, f, d, u, c[p + 12], 20, -1926607734)),
            (u = _(u, l, f, d, c[p + 5], 4, -378558)),
            (d = _(d, u, l, f, c[p + 8], 11, -2022574463)),
            (f = _(f, d, u, l, c[p + 11], 16, 1839030562)),
            (l = _(l, f, d, u, c[p + 14], 23, -35309556)),
            (u = _(u, l, f, d, c[p + 1], 4, -1530992060)),
            (d = _(d, u, l, f, c[p + 4], 11, 1272893353)),
            (f = _(f, d, u, l, c[p + 7], 16, -155497632)),
            (l = _(l, f, d, u, c[p + 10], 23, -1094730640)),
            (u = _(u, l, f, d, c[p + 13], 4, 681279174)),
            (d = _(d, u, l, f, c[p + 0], 11, -358537222)),
            (f = _(f, d, u, l, c[p + 3], 16, -722521979)),
            (l = _(l, f, d, u, c[p + 6], 23, 76029189)),
            (u = _(u, l, f, d, c[p + 9], 4, -640364487)),
            (d = _(d, u, l, f, c[p + 12], 11, -421815835)),
            (f = _(f, d, u, l, c[p + 15], 16, 530742520)),
            (l = _(l, f, d, u, c[p + 2], 23, -995338651)),
            (u = b(u, l, f, d, c[p + 0], 6, -198630844)),
            (d = b(d, u, l, f, c[p + 7], 10, 1126891415)),
            (f = b(f, d, u, l, c[p + 14], 15, -1416354905)),
            (l = b(l, f, d, u, c[p + 5], 21, -57434055)),
            (u = b(u, l, f, d, c[p + 12], 6, 1700485571)),
            (d = b(d, u, l, f, c[p + 3], 10, -1894986606)),
            (f = b(f, d, u, l, c[p + 10], 15, -1051523)),
            (l = b(l, f, d, u, c[p + 1], 21, -2054922799)),
            (u = b(u, l, f, d, c[p + 8], 6, 1873313359)),
            (d = b(d, u, l, f, c[p + 15], 10, -30611744)),
            (f = b(f, d, u, l, c[p + 6], 15, -1560198380)),
            (l = b(l, f, d, u, c[p + 13], 21, 1309151649)),
            (u = b(u, l, f, d, c[p + 4], 6, -145523070)),
            (d = b(d, u, l, f, c[p + 11], 10, -1120210379)),
            (f = b(f, d, u, l, c[p + 2], 15, 718787259)),
            (l = b(l, f, d, u, c[p + 9], 21, -343485551)),
            (u = (u + y) >>> 0),
            (l = (l + M) >>> 0),
            (f = (f + S) >>> 0),
            (d = (d + k) >>> 0)
      }

      return e.endian([u, l, f, d])
    }

    ; (s._ff = function (o, i, c, a, u, l, f) {
      var d = o + ((i & c) | (~i & a)) + (u >>> 0) + f
      return ((d << l) | (d >>> (32 - l))) + i
    }),
      (s._gg = function (o, i, c, a, u, l, f) {
        var d = o + ((i & a) | (c & ~a)) + (u >>> 0) + f
        return ((d << l) | (d >>> (32 - l))) + i
      }),
      (s._hh = function (o, i, c, a, u, l, f) {
        var d = o + (i ^ c ^ a) + (u >>> 0) + f
        return ((d << l) | (d >>> (32 - l))) + i
      }),
      (s._ii = function (o, i, c, a, u, l, f) {
        var d = o + (c ^ (i | ~a)) + (u >>> 0) + f
        return ((d << l) | (d >>> (32 - l))) + i
      }),
      (s._blocksize = 16),
      (s._digestsize = 16),
      (Sl.exports = function (o, i) {
        if (o == null) throw new Error('Illegal argument ' + o)
        var c = e.wordsToBytes(s(o, i))
        return i && i.asBytes
          ? c
          : i && i.asString
            ? r.bytesToString(c)
            : e.bytesToHex(c)
      })
})()

var _s = Sl.exports

export function F0() {
  const e = parseInt(Date.now() / 1e3),
    t = e + 'LGD_Sunday-1991-12-30'
  return {
    icode: _s(t),
    time: e
  }
}
