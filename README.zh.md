# SME Validator

Fast, Lightweight, Flexible Validator.

Only 7KB(min ver) with 100% test coverage, yet powerful and extendable

![Travis branch](https://travis-ci.org/SME-FE/validator-core.svg?branch=master)
![coverage](https://img.shields.io/coveralls/github/SME-FE/validator-core/master.svg)
![download](https://img.shields.io/npm/dm/validator-core.svg)
![version](https://img.shields.io/npm/v/validator-core.svg)
![license](https://img.shields.io/badge/license-mit-green.svg)

- [中文文档](https://sme-fe.github.io/website-validator/zh/guide/install-and-usage.html)

## 文档

[详细文档](https://sme-fe.github.io/website-validator/)

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/6712767?v=4" width="100px;"/><br /><sub>hwen</sub>](https://github.com/hwen)<br />[🤔](#ideas "Ideas & Planning") [💻](https://github.com/SME-FE/validator-core/commits?author=hwen "Code") [🎨](#design "Design") [📖](https://github.com/SME-FE/validator-core/commits?author=hwen "Documentation") [💡](#example "Examples") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, hwen <hwenleung@gmail.com>
