/*!
 * urlcharset - test/urlencode.test.js
 *
 * Copyright(c) 2016 - 2018 seed <seed_1029@outlook.com>
 * MIT Licensed
 */
var urlcharset = require('../')
var expect = require('chai').expect
var querystring = require('querystring')

describe('urlcharset.test.js', function () {
  var items = [
    ['哎哟不错哦', null, encodeURIComponent('哎哟不错哦')],
    ['哎哟不错哦', undefined, encodeURIComponent('哎哟不错哦')],
    ['哎哟不错哦', '', encodeURIComponent('哎哟不错哦')],
    ['哎哟不错哦', 'utf8', encodeURIComponent('哎哟不错哦')],
    ['哎哟不错哦', 'utf-8', encodeURIComponent('哎哟不错哦')],
    ['Aiyo,not bad', 'gbk', 'Aiyo%2Cnot%20bad'],
    ['哎哟不错哦', 'gbk', '%B0%A5%D3%B4%B2%BB%B4%ED%C5%B6'],
    ['哎哟不错哦，Aiyo,not bad', 'gbk', '%B0%A5%D3%B4%B2%BB%B4%ED%C5%B6%A3%ACAiyo%2Cnot%20bad'],
    ['!-._~\'()*', 'gbk', '!-._~\'()*'],
    ['0123456789', 'gbk', '0123456789'],
    ['abcdefghijklmnopqrstuvwxyz', 'gbk', 'abcdefghijklmnopqrstuvwxyz'],
    ['&`·！@#$￥%…^（）—+=＝[]{}｛｝\\|;:："“,<《>》/?？', 'gbk', '%26%60%A1%A4%A3%A1%40%23%24%A3%A4%25%A1%AD%5E%A3%A8%A3%A9%A1%AA%2B%3D%A3%BD%5B%5D%7B%7D%A3%FB%A3%FD%5C%7C%3B%3A%A3%BA%22%A1%B0%2C%3C%A1%B6%3E%A1%B7%2F%3F%A3%BF'],
    ['中文&`·！@#$￥%…^（）—+=＝[]{}｛｝\\|;:："“,<《>》/?？abcde', 'gbk', '%D6%D0%CE%C4%26%60%A1%A4%A3%A1%40%23%24%A3%A4%25%A1%AD%5E%A3%A8%A3%A9%A1%AA%2B%3D%A3%BD%5B%5D%7B%7D%A3%FB%A3%FD%5C%7C%3B%3A%A3%BA%22%A1%B0%2C%3C%A1%B6%3E%A1%B7%2F%3F%A3%BFabcde'],
    ['铿https://github.com/zhengweikeng', 'gbk', '%EF%AChttps%3A%2F%2Fgithub.com%2Fzhengweikeng'],
    [' ', 'gbk', '%20'],
    ['\n\r\n', 'gbk', '%0A%0D%0A']
  ]
  describe('#encode', function () {
    items.forEach(function(item) {
      var str = item[0]
      var charset = item[1]
      var expectRes = item[2]

      it('encode ' + str + ' with ' + charset + ' to ' + expectRes, function() {
        expect(urlcharset.encode(str, charset)).to.equal(expectRes)
      })
    })
  })

  describe('#decode', function () {
    items.forEach(function(item) {
      var str = item[2]
      var charset = item[1]
      var expectRes = item[0]

      it('decode ' + str + 'with ' + charset + ' to ' + expectRes, function() {
        expect(urlcharset.decode(str, charset)).to.equal(expectRes)
      })
    })
  })

  describe('#UriComponent', function() {
    var obj = {
      foo: 'bar',
      content: 'The content is 哎哟不错哦。Check it.'
    }

    it('querystring.stringify with no Specified charset', function () {
      var res = querystring.stringify(obj, null, null, {
        encodeURIComponent: urlcharset.encodeUriComponent()
      })

      var defaultStr = querystring.stringify(obj)
      expect(res).to.eql(defaultStr)
    })

    it('querystring.stringify with charset of gbk', function() {
      var res = querystring.stringify(obj, null, null, {
        encodeURIComponent: urlcharset.encodeUriComponent('gbk')
      })

      expect(res).to.equal('foo=bar&content=The%20content%20is%20%B0%A5%D3%B4%B2%BB%B4%ED%C5%B6%A1%A3Check%20it.')
    })

    it('querystring.parse with no Specified charset', function() {
      var res = querystring.parse('foo=bar&content=The%20content%20is%20%E5%93%8E%E5%93%9F%E4%B8%8D%E9%94%99%E5%93%A6%E3%80%82Check%20it.', null, null, {
        decodeURIComponent: urlcharset.decodeUriComponent()
      })
      expect(res).to.eql(obj)
    })

    it('querystring.parse with charset of gbk', function() {
      var res = querystring.parse('foo=bar&content=The%20content%20is%20%B0%A5%D3%B4%B2%BB%B4%ED%C5%B6%A1%A3Check%20it.', null, null, {
        decodeURIComponent: urlcharset.decodeUriComponent('gbk')
      })
      expect(res).to.eql(obj)
    })
  })


})