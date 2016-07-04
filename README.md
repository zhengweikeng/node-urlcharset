# node-urlcharset
> To get encodeURIComponent and decodeURIComponent with more encoding

## Install
```bash
$ npm install node-urlcharset
```

## Usage
```javascript
var querystring = require('querystring')
var urlcharset = require('urlcharset')

querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null, {
  { decodeURIComponent: urlcharset.decodeUriComponent('gbk') }
})
// will parse the string as:
{
  w: '中文',
  foo: 'bar'
}

querystring.stringify({
  w: '中文',
  foo: 'bar'
}, null, null, {
  encodeURIComponent: urlcharset.decodeUriComponent('gbk')
})
// the object will stringify as:
// w=%D6%D0%CE%C4&foo=bar
```

## Supported encodings
The same with the [iconv-lite](https://github.com/ashtuchkin/iconv-lite#supported-encodings)

## Basic Api
### encodeUriComponent(charset)
get a encodeUriComponent with the specifed charset

### encodeUriComponent(charset) 
get a decodeUriComponent with the specifed charset

### encode(str, charset)
encode a string with a specifed charset.  
But the following characters will not escape:  
! - . _ ~ ' ( ) * 0-9 a-z A-Z
```javascript
var res = urlcharset.encode('中文', 'gbk')
// %D6%D0%CE%C4
```

### decode(str, charset)
decode a string with a specifed charset.  
```javascript
var res = urlcharset.encode('%D6%D0%CE%C4', 'gbk')
// 中文
```

## Testing
```bash
$ git clone git@github.com:zhengweikeng/node-urlcharset.git
$ cd node-urlcharset
$ npm install
$ npm test

# To view test coverage:
$ npm run test-cov
$ open coverage/lcov-report/index.html
```
