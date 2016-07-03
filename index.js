var urlcharset = require('./lib/urlcharset')

module.exports = {
  encodeUriComponent: urlcharset.encodeUriComponent,
  decodeUriComponent: urlcharset.decodeUriComponent,
  encode: urlcharset.encode,
  decode: urlcharset.decode
}