var urlcharset = require('./lib/urlcharset')

module.exports = {
  encodeUriComponent: urlcharset.encodeUriComponent,
  decodeUriComponent: urlcharset.decodeUriComponent,
  encode: urlcharset.encode,
  decode: urlcharset.decode
}

// var querystring = require('querystring')
// var obj = {
//   foo: 'bar',
//   content: 'The content is 哎哟不错哦。Check it.'
// }
// var res = querystring.stringify(obj, null, null, {
//   encodeURIComponent: urlcharset.encodeUriComponent()
// })

// console.log(res)