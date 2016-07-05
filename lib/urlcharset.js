/*!
 * urlcharset - test/urlencode.test.js
 *
 * Copyright(c) 2016 - 2018 seed <seed_1029@outlook.com>
 * MIT Licensed
 */
var iconv = require('iconv-lite')

var encode = function (str, charset) {
  if (!charset) {
    charset = 'utf8'
  }

  var out = ''
  var buf = iconv.encode(str, charset)
  for (var i = 0; i < buf.length; i++) {
    var c = buf[i]

    // These characters do not need escaping (in order):
    // ! - . _ ~
    // ' ( ) *
    // digits
    // alpha (uppercase)
    // alpha (lowercase)
    if (c === 0x21 || c === 0x2D || c === 0x2E || c === 0x5F || c === 0x7E ||
      (c >= 0x27 && c <= 0x2A) ||
      (c >= 0x30 && c <= 0x39) ||
      (c >= 0x41 && c <= 0x5A) ||
      (c >= 0x61 && c <= 0x7A)) {
      out += String.fromCharCode(c)
      continue
    }

    out += '%' + ( c < 16 ? '0' : '' ) + c.toString(16).toUpperCase()
  }
  return out
}

var decode = function (str, charset) {
  if (!charset) {
    charset = 'utf8'
  }
  var bytes = []

  for (var i = 0; i < str.length;) {
    if (str[i] === '%') {
      bytes.push(parseInt(str.substring(++i, i+2), 16))
      i += 2
      continue
    }
    
    bytes.push(str.charCodeAt(i))
    i++
  }

  var buf = new Buffer(bytes)
  var out = iconv.decode(buf, charset)

  return out
}

var encodeUriComponent = function (encoding) {
  if (!encoding) {
    encoding = 'utf8'
  }
  encoding = encoding.toLowerCase()

  var stringify = function (str) {
    if (encoding === 'utf8' || encoding === 'utf-8') 
      return encodeURIComponent(str)

    return encode(str, encoding)
  }

  return stringify
}

var decodeUriComponent = function (encoding) {
  if (!encoding) {
    encoding = 'utf8'
  }
  encoding = encoding.toLowerCase()

  var parse = function (str) {
    if (encoding === 'utf8' || encoding === 'utf-8') {
      return decodeURIComponent(str)
    }
    
    return decode(str, encoding)
  }

  return parse
}

module.exports = {
  encodeUriComponent: encodeUriComponent,
  decodeUriComponent: decodeUriComponent,
  encode: encode,
  decode: decode
}