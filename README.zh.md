# SME Validator

Fast, Lightweight, Flexible Validator.

Only 7KB(min ver) with 100% test coverage, yet powerful and extendable

![Travis branch](https://travis-ci.org/SME-FE/validator-core.svg?branch=master)
![coverage](https://img.shields.io/coveralls/github/SME-FE/validator-core/master.svg)
![download](https://img.shields.io/npm/dm/validator-core.svg)
![version](https://img.shields.io/npm/v/validator-core.svg)
![license](https://img.shields.io/badge/license-mit-green.svg)

- [English doc](https://github.com/SME-FE/validator-core/blob/master/README.md)

## 目录

- [安装和使用](#安装和使用)
- [内置规则](#内置规则)
- [注册内置规则](#注册内置规则)
- [逻辑操作符](#逻辑操作符)
- [自定义正则](#自定义正则)
- [自定义函数](#自定义函数)
- [使用一组规则校验](#使用一组规则校验)
- [联动检查多个表单 field](#联动检查多个表单-field)
- [API](#api)

## 安装和使用

### 安装

通过 npm

```s
npm install --save validator-core
```

### 用法

```js
const Validator = require('validator-core')
const validator = new Validator()
// or
import Validator from 'validator-core'
const validator = new Validator()
```

使用标签方式加载

```html
<script src="https://unpkg.com/validator-core"></script>
<script type="text/javascript">
  const validator = new Validator()
  validator.test('hwenleung@gmail.com', 'email') // => true
</script>
```

## 内置规则

使用前，先引入

```js
import Validator from 'validator-core'
const validator = new Validator()
```

<details>
  <summary>required</summary>

  ```js
  validator.test('', 'required') // => false
  validator.test('x', 'required') // => true
  ```

</details>
<details>
  <summary>email</summary>

  ```js
  validator.test('test@gmail.com', 'email') // => true
  validator.test('i@html.love', 'email') // => true
  validator.test('i@html', 'email') // => false
  ```

</details>
<details>
  <summary>url</summary>

  ```js
  validator.test('ws://xxx', 'url') // => false
  validator.test('https://github.com', 'url') // => true
  ```

</details>
<details>
  <summary>integer</summary>

  ```js
  validator.test(10, 'integer') // => true
  validator.test(-10, 'integer') // => true
  validator.test(1.01, 'integer') // => false
  ```

</details>
<details>
  <summary>id_card</summary>

  ```js
  validator.test('610724197303236577', 'id_card') // => true
  validator.test('61072419730323657X', 'id_card') // => true
  ```

</details>
<details>
  <summary>after:Date</summary>

  ```js
  validator.test(null, 'after:2017/11/07') // => false
  validator.test('2017/11/08', 'after:2017/11/07') // => true
  validator.test('2017/11/08', 'after:2017/11/7') // => true
  validator.test('2017-11-08', 'after:2017-11-07') // => true
  validator.test('2017-11-08', 'after:2017-11-09') // => false
  validator.test('2017-11-08', 'after:2017-11-08') // => false
  validator.test('2017.11.08', 'after:2017.11.08') // => false
  validator.test(new Date('2017-11-09'), 'after:2017-11-08') // => true
  ```

</details>
<details>
  <summary>after_equal:Date</summary>

  ```js
  validator.test('2017-11-08', 'after_equal:2017-11-07') // => true
  validator.test('2017-11-08', 'after_equal:2017-11-08') // => true
  ```

</details>
<details>
  <summary>before:Date</summary>

  ```js
  validator.test(null, 'before:2017/11/07') // => false
  validator.test('2017/11/06', 'before:2017/11/07') // => true
  validator.test('2017/11/06', 'before:2017/11/7') // => true
  validator.test('2017-11-06', 'before:2017-11-07') // => true
  validator.test('2017-11-06', 'before:2017-11-05') // => false
  validator.test('2017-11-06', 'before:2017-11-06') // => false
  validator.test('2017.11.06', 'before:2017.11.06') // => false
  validator.test(new Date('2017-11-09'), 'before:2017-11-10') // => true
  ```

</details>
<details>
  <summary>before_equal:Date</summary>

  ```js
  validator.test('2017-11-06', 'before_equal:2017-11-07') // => true
  validator.test('2017-11-06', 'before_equal:2017-11-05') // => false
  validator.test('2017-11-06', 'before_equal:2017-11-06') // => true
  ```

</details>
<details>
  <summary>size</summary>

  ```js
  validator.test('1234', 'size:4') // => true
  validator.test('12345', 'size:4') // => false
  validator.test('1234', 'size:2-4') // => true
  validator.test('1', 'size:2-4') // => false
  validator.test(null, 'size:2-4') // => false
  validator.test(123, 'size:2-4') // => false
  ```

</details>
<details>
  <summary>lt(less then)</summary>

  ```js
  validator.test('200', 'lt:400') // => false
  validator.test(200, 'lt:400') // => true
  validator.test(400, 'lt:400') // => false
  validator.test(401, 'lt:400') // => false
  ```

</details>
<details>
  <summary>lte(less and equal then)</summary>

  ```js
  validator.test('200', 'lte:400') // => false
  validator.test(200, 'lte:400') // => true
  validator.test(401, 'lte:400') // => false
  validator.test(400, 'lte:400') // => true
  validator.test(400.12, 'lte:400.12') // => true
  ```

</details>
<details>
  <summary>gt(greater then)</summary>

  ```js
  validator.test(401, 'gt:400') // => true
  validator.test(400, 'gt:400') // => false
  ```

</details>
<details>
  <summary>gte(greater and equal then)</summary>

  ```js
  validator.test(401, 'gte:400') // => true
  validator.test(400, 'gte:400') // => true
  validator.test(400.12, 'gte:400.12') // => true
  ```

</details>
<details>
  <summary>equal</summary>

  ```js
  validator.test('500', 'equal:500') // => false
  validator.test(500, 'equal:500') // => true
  validator.test(500.233, 'equal:500.233') // => true
  validator.test(399, 'equal:500') // => false
  ```

</details>
<details>
  <summary>in</summary>

  ```js
  validator.test(true, 'in:true') // => true
  validator.test(false, 'in:true') // => false
  validator.test('500', 'in:500') // => true
  validator.test(500, 'in:500,600') // => true
  validator.test('leo', 'in:aim,leo,ttt') // => true

  validator.test('le', 'in:aim,leo') // => false
  validator.test('', 'in:aim,leo') // => false
  validator.test(null, 'in:aim,leo') // => false
  ```

</details>
<details>
  <summary>not_in</summary>

  ```js
  validator.test(true, 'not_in:true') // => false
  validator.test(false, 'not_in:true') // => true
  validator.test('400', 'not_in:500') // => true
  validator.test(500.1, 'not_in:500') // => true
  validator.test('tttt', 'not_in:aim,leo,ttt') // => true

  validator.test('le', 'not_in:aim,leo') // => true
  validator.test('', 'not_in:aim,leo') // => true

  validator.test('leo', 'not_in:aim,leo') // => false
  validator.test(null, 'not_in:aim,leo') // => false
  ```

</details>

## 注册内置规则

可以通过 `registerRules(rules)` 方法来注册内置的规则，从而进行扩展。
有两点需要注意

- 在使用新增的规则前，必须先注册。

- 自定义的新规则名跟原内置规则名重复，则自定义规则会被忽略（即原内置的规则优先级最高）

```js
{
  'rule1': RegExp,
  /**
   * 当 rule 为函数时，有两个参数 rule(value, params)
   * 以 rule2 为例，`validator.test(value1, 'rule2:p1,p2,p3')`
   * rule2 函数接受到的参数为
   * value -> value1
   * params -> [p1, p2, p3]
   *
  **/
  'rule2': Function
}
```

- example

```js
const validator = new Validator()
const customRules = {
  'password': /^[^\s\u4E00-\u9FA5]{8,16}$/,
  'is_prime': function isPrimeNum (num, params) {
    if (params) console.log(params)
    if (typeof num !== 'number' || !Number.isInteger(num)) return false

    if (num === 2) {
      return true
    } else if (num % 2 === 0) {
      return false
    }

    const squareRoot = Math.sqrt(num)
    for (var i = 3; i <= squareRoot; i += 2) {
      if (num % i === 0) return false
    }

    return true
  },
  'contain': function (value, params) {
    if (!params) return false
    if (typeof value !== 'string') return false

    for (let i = 0; i < params.length; i++) {
      const item = params[i]
      if (value.indexOf(item) > -1) return true
    }
    return false
  }
}

validator.registerRules(customRules)

validator.test('abcd123', 'password') // => false
validator.test('abcd1234', 'password') // => true
validator.test(13, 'is_prime:just_test,hei')
// log: ['just_test', 'hei']
// => true
validator.test(24, 'is_prime') // => false
```

## 逻辑运算符

内置的规则可以用逻辑运算符进行连接，从而进行更复杂的判断。
从 [Register custom rules](#register-custom-rules) 例子里的代码继续

```js
validator.test('hwenleung@gmail.com', 'email && contain:gmail.com, qq.com') // => true
validator.test('hwenleung@163.com', 'email && contain:gmail.com, qq.com') // => false
validator.test('hwenleung@qq.com', 'email && contain:gmail.com, qq.com') // => true

validator.test(13, 'lt:20 || gt: 60 && is_prime') // => true
validator.test(23, 'lt:20 || gt: 60 && is_prime') // => false
validator.test(797, 'lt:20 || gt: 60 && is_prime') // => true
validator.test(4, 'lt:20 || (gt: 60 && is_prime)') // => true
validator.test(64, 'lt:20 || (gt: 60 && is_prime)') // => false
validator.test(797, 'lt:20 || (gt: 60 && is_prime)') // => true
validator.test(13, '((lt:20 || gt: 60) && is_prime)') // => true
validator.test(23, '((lt:20 || gt: 60) && is_prime)') // => false
```

## 自定义正则

```js
validator.test('=3=', /=3=/) // => true
validator.test('=3=o', /=3=/) // => true
validator.test('=3=o', /=3=$/) // => false
```

## 自定义方法

```js
function isPrimeNum (num) {
  if (typeof num !== 'number' || !Number.isInteger(num)) return false

  if (num === 2) {
    return true
  } else if (num % 2 === 0) {
    return false
  }

  const squareRoot = Math.sqrt(num)
  for (var i = 3; i <= squareRoot; i += 2) {
    if (num % i === 0) return false
  }

  return true
}

validator.test(2, isPrimeNum) // => true
validator.test(991, isPrimeNum) // => true
validator.test(8, isPrimeNum) // => false
```

## 使用一组规则校验

```js
// ruleSet must be an Object Array
const ruleSet = [
  {
    name: 'Email', // rule should have a unique name
    // set of rules will be checked in order
    rules: ['required', 'email', 'size:32'],
    // tips are one-to-one of the rules, but you can set only one tip like 'Price'
    tips: ['Required...', 'Not a valid Email', 'Email address too long']
  },
  {
    name: 'Price',
    rules: ['required', 'lt:5000'],
    tips: ['Common Mes: Error occur']
  }
]

const validator = new Validator(ruleSet)
// or
// const validator = new Validator()
// validator.use(ruleSet)

console.log(validator.check('', 'Email'))
// => {isError: true, isPass: false, name: 'Email', tip: 'Required...'}
console.log(validator.check('some@some', 'Email'))
// => {isError: true, isPass: false, name: 'Email', tip: 'Not a valid Email'}
console.log(validator.check('Iamveryloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo@gmail.com', 'Email'))
// => {isError: true, isPass: false, name: 'Email', tip: 'Email address too long'}
console.log(validator.check('hwenleung@gmail.com', 'Email'))
// => {isError: false, isPass: true, name: 'Email'}

// use common error tip
let price
console.log(validator.check(price, 'Price'))
// => {isError: true, isPass: false, name: 'Price', tip: 'Common Mes: Error occur'}
price = 5001
console.log(validator.check(price, 'Price'))
// => {isError: true, isPass: false, name: 'Price', tip: 'Common Mes: Error occur'}
price = 4999
console.log(validator.check(price, 'Price'))
// => {isError: false, isPass: true, name: 'Price'}
```

## 联动检查多个表单 field

```js
const ruleSet = [
  {
    name: 'ChineseName',
    rules: ['required', 'size:2-24', /^[\u4e00-\u9fa5]+$/],
    tips: ['不能为空', '长度为2到24', '不是中文']
  },
  {
    name: 'EnglishName',
    rules: ['required', 'size:2-24', /^[a-zA-Z\s]+$/],
    tips: ['Required...', 'Should have 2-24 letter', 'Not a valid English Name']
  }
]

const validator = new Validator(ruleSet)
const checkNameByLanguage = (language, data) => validator.checkWithDiff([language, data], ['ChineseName', 'EnglishName'], [/zh/i, /en/i])

let language = 'zh'
let data = '李狗蛋'
console.log(checkNameByLanguage(language, data))
// => {isError: false, isPass: true, name: 'ChineseName'}
language = 'en'
console.log(checkNameByLanguage(language, data))
// => {isError: true, isPass: false, name: 'EnglishName', tip: 'Not a valid English Name'}
data = 'Leon'
console.log(checkNameByLanguage(language, data))
// => {isError: false, isPass: true, name: 'EnglishName'}

// you may do this using Function
let language = 'zh'
let data = '李狗蛋'
const diffFn = (language, data) => {
  if (language === 'zh') {
    return {
      value: data,
      name: 'ChinaName'
    }
  }

  if (language === 'en') {
    return {
      value: data,
      name: 'EnglishName'
    }
  }
}

validator.checkWithDiff(diffFn(language, data))
data = 'Leon'
validator.checkWithDiff(diffFn(language, data))
language = 'en'
validator.checkWithDiff(diffFn(language, data))
```

## API

Create an validator instance.

```js
import Validator from 'validator-core'
const validator = new Validator()
```

### Validator(ruleSet)

init validator instance with ruleSet

**Params**

- {[Object]} ruleSet

### validator.test(value, rule)

use built-in rule or RegExp, Function to test value

**Params**

- {any} value - value to test
- {String | RegExp | Function} rule

#### Return Boolean

### validator.registerRules(rules)

add rules to built-in preset rules

**Params**

- {Object} rules - add rules to preset rules

#### Return undefined

### validator.use(ruleSet)

add ruleSet to validator

**Params**

- {[Object]} ruleSet

### validator.check(value, ruleName)

check by ruleSet

**Params**

- {any} value - value to check
- {String} ruleName - ruleName fo ruleSet

#### Return Object

- isError
- isPass
- ruleName
- tip - error tip

### validator.checkWithDiff(values, ruleNames, diffs)

check if one field rule will be affected by other field

**Params**

- {[any] | Object} value - value to check
- {[String]} ruleNames - list of ruleNames
- {[RegExp]} diffs

#### Return Object

- isError
- isPass
- ruleName
- tip - error tip

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/6712767?v=4" width="100px;"/><br /><sub>hwen</sub>](https://github.com/hwen)<br />[🤔](#ideas "Ideas & Planning") [💻](https://github.com/SME-FE/validator-core/commits?author=hwen "Code") [🎨](#design "Design") [📖](https://github.com/SME-FE/validator-core/commits?author=hwen "Documentation") [💡](#example "Examples") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
