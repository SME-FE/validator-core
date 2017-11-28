import { simpleForm } from './../mock/simple-form'
import Validator from '@/index'
import chai from 'chai'
chai.should()

const info = console.info.bind(console)
describe('validator core', function () {
  let validator = null
  beforeEach('new validator instance', () => {
    validator = new Validator(simpleForm)
    // validator.use(simpleForm)
  })

  describe('preset RegExp', function () {
    it('required', () => {
      validator.test('', 'required').should.be.equal(false)
      validator.test('x', 'required').should.be.equal(true)
    })
    it('phone', () => {
      validator.test('', 'phone').should.be.equal(false)
      validator.test('1356458752', 'phone').should.be.equal(false)
      validator.test('13564587523', 'phone').should.be.equal(true)
      validator.test('135645875231', 'phone').should.be.equal(false)
    })
    it('email', () => {
      validator.test('test@gmail.com', 'email').should.be.equal(true)
      validator.test('i@html.love', 'email').should.be.equal(true)
      validator.test('394229785@qq.com', 'email').should.be.equal(true)
      validator.test('test@com', 'email').should.be.equal(false)
    })
    it('url', () => {
      validator.test('ws://xxx', 'url').should.be.equal(false)
      validator.test('https://github.com', 'url').should.be.equal(true)
      validator.test('https://caniuse.com/#search=Object.assign', 'url').should.be.equal(true)
      validator.test('http://www.cnblogs.com/chenny7/p/4498322.html', 'url').should.be.equal(true)
      validator.test('https://www.google.com/search?ei=wLACWt-KH4jwmQH1k7mQDA&q=javascript&oq=javascript&gs_l=psy-ab.3...17536786.17538497.0.17538699.10.8.0.0.0.0.372.372.3-1.1.0....0...1.1.64.psy-ab..9.1.372...0j0i67k1.0.4TVzMGaJxCo', 'url').should.be.equal(true)
    })
    it('integer', () => {
      validator.test(10, 'integer').should.be.equal(true)
      validator.test(-10, 'integer').should.be.equal(true)
      validator.test(0, 'integer').should.be.equal(true)
      validator.test(1.01, 'integer').should.be.equal(false)
    })
    it('id_card', () => {
      // 新身份证都是18位
      validator.test('610724197303236577', 'id_card').should.be.equal(true)
      validator.test('61072419730323657X', 'id_card').should.be.equal(true)
      validator.test('61072419730323657x', 'id_card').should.be.equal(true)
      // 旧身份证，有可能是 15位
      validator.test('610724197303236', 'id_card').should.be.equal(true)
      // 其他不合法
      validator.test('6107241973032360', 'id_card').should.be.equal(false)
      validator.test('61072419730323657A', 'id_card').should.be.equal(false)
    })
  })

  describe('preset validator function', function () {
    it('after', () => {
      validator.test(null, 'after:2017/11/07').should.be.equal(false)
      validator.test('2017/11/08', 'after:2017/11/07').should.be.equal(true)
      validator.test('2017/11/08', 'after:2017/11/7').should.be.equal(true)
      validator.test('2017-11-08', 'after:2017-11-07').should.be.equal(true)
      validator.test('2017-11-08', 'after:2017-11-09').should.be.equal(false)
      validator.test('2017-11-08', 'after:2017-11-08').should.be.equal(false)

      validator.test('2017.11.08', 'after:2017.11.08').should.be.equal(false)
      validator.test(new Date('2017-11-09'), 'after:2017-11-08').should.be.equal(true)
    })
    it('after_equal', () => {
      validator.test(null, 'after_equal:2017/11/07').should.be.equal(false)
      validator.test('2017/11/08', 'after_equal:2017/11/07').should.be.equal(true)
      validator.test('2017/11/08', 'after_equal:2017/11/7').should.be.equal(true)
      validator.test('2017-11-08', 'after_equal:2017-11-07').should.be.equal(true)
      validator.test('2017-11-08', 'after_equal:2017-11-09').should.be.equal(false)
      // equal is ok
      validator.test('2017-11-08', 'after_equal:2017-11-08').should.be.equal(true)
      validator.test('2017.11.08', 'after_equal:2017.11.08').should.be.equal(true)
    })
    it('before', () => {
      validator.test(null, 'before:2017/11/07').should.be.equal(false)
      validator.test('2017/11/06', 'before:2017/11/07').should.be.equal(true)
      validator.test('2017/11/06', 'before:2017/11/7').should.be.equal(true)
      validator.test('2017-11-06', 'before:2017-11-07').should.be.equal(true)
      validator.test('2017-11-06', 'before:2017-11-05').should.be.equal(false)
      validator.test('2017-11-06', 'before:2017-11-06').should.be.equal(false)
      validator.test('2017.11.06', 'before:2017.11.06').should.be.equal(false)
    })
    it('before_equal', () => {
      validator.test(null, 'before_equal:2017/11/07').should.be.equal(false)
      validator.test('2017/11/06', 'before_equal:2017/11/07').should.be.equal(true)
      validator.test('2017/11/06', 'before_equal:2017/11/7').should.be.equal(true)
      validator.test('2017-11-06', 'before_equal:2017-11-07').should.be.equal(true)
      validator.test('2017-11-06', 'before_equal:2017-11-05').should.be.equal(false)
      // equal is ok
      validator.test('2017-11-06', 'before_equal:2017-11-06').should.be.equal(true)
      validator.test('2017.11.06', 'before_equal:2017.11.06').should.be.equal(true)
    })
    it('size', () => {
      validator.test('1234', 'size:4').should.be.equal(true)
      validator.test('12345', 'size:4').should.be.equal(false)
      
      validator.test('1234', 'size:2-4').should.be.equal(true)
      validator.test('1', 'size:2-4').should.be.equal(false)

      validator.test(null, 'size:2-4').should.be.equal(false)
      validator.test(1, 'size:2-4').should.be.equal(false)
      validator.test(123, 'size:2-4').should.be.equal(false)
    })
    it('lt', () => {
      validator.test('200', 'lt:400').should.be.equal(false)
      validator.test(200, 'lt:400').should.be.equal(true)
      validator.test(400, 'lt:400').should.be.equal(false)
      validator.test(401, 'lt:400').should.be.equal(false)
    })
    it('lte', () => {
      validator.test('200', 'lte:400').should.be.equal(false)
      validator.test(200, 'lte:400').should.be.equal(true)
      validator.test(401, 'lte:400').should.be.equal(false)
      // equal is ok
      validator.test(400, 'lte:400').should.be.equal(true)
      validator.test(400.12, 'lte:400.12').should.be.equal(true)
    })
    it('gt', () => {
      validator.test('500', 'gt:400').should.be.equal(false)
      validator.test(500, 'gt:400').should.be.equal(true)
      validator.test(399, 'gt:400').should.be.equal(false)
      validator.test(400, 'gt:400').should.be.equal(false)
    })
    it('gte', () => {
      validator.test('500', 'gte:400').should.be.equal(false)
      validator.test(500, 'gte:400').should.be.equal(true)
      validator.test(399, 'gte:400').should.be.equal(false)
      // equal is ok
      validator.test(400, 'gte:400').should.be.equal(true)
      validator.test(400.12, 'gte:400.12').should.be.equal(true)
    })
    it('equal', () => {
      validator.test('500', 'equal:500').should.be.equal(false)
      validator.test(500, 'equal:500').should.be.equal(true)
      validator.test(500.233, 'equal:500.233').should.be.equal(true)
      validator.test(399, 'equal:500').should.be.equal(false)
    })
    it('in', () => {
      validator.test(true, 'in:true').should.be.equal(true)
      validator.test(false, 'in:true').should.be.equal(false)
      validator.test('500', 'in:500').should.be.equal(true)
      validator.test(500, 'in:500,600').should.be.equal(true)
      validator.test('leo', 'in:aim,leo,ttt').should.be.equal(true)

      validator.test('le', 'in:aim,leo').should.be.equal(false)
      validator.test('', 'in:aim,leo').should.be.equal(false)
      validator.test(null, 'in:aim,leo').should.be.equal(false)
    })
    it('not_in', () => {
      validator.test(true, 'not_in:true').should.be.equal(false)
      validator.test(false, 'not_in:true').should.be.equal(true)
      validator.test('400', 'not_in:500').should.be.equal(true)
      validator.test(500.1, 'not_in:500').should.be.equal(true)
      validator.test('tttt', 'not_in:aim,leo,ttt').should.be.equal(true)

      validator.test('le', 'not_in:aim,leo').should.be.equal(true)
      validator.test('', 'not_in:aim,leo').should.be.equal(true)

      validator.test('leo', 'not_in:aim,leo').should.be.equal(false)
      validator.test(null, 'not_in:aim,leo').should.be.equal(false)
    })
  })

  describe('validator core test with custom RegExp', function () {
    it('=3=', () => {
      validator.test('=3=', /=3=/).should.be.equal(true)
      validator.test('=3=o', /=3=/).should.be.equal(true)
      validator.test('=3=o', /=3=$/).should.be.equal(false)
    })
  })

  describe('validator core test with custom Function', function () {
    it('if prime number', () => {
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

      validator.test(2, isPrimeNum).should.be.equal(true)
      validator.test(991, isPrimeNum).should.be.equal(true)
      validator.test(8, isPrimeNum).should.be.equal(false)
    })
  })

  describe('multi rules', function () {
    it('built in multi rule', () => {
      validator.test(50, 'gt:20 && lt: 60').should.be.equal(true)
      validator.test(61, 'gt:20 && lt: 60').should.be.equal(false)
      validator.test(19, 'gt:20 && lt: 60').should.be.equal(false)
      validator.test(50, 'lt:20 || gt: 60').should.be.equal(false)
      validator.test(61, 'lt:20 || gt: 60').should.be.equal(true)
      validator.test(19, 'lt:20 || gt: 60').should.be.equal(true)
      validator.test(61, 'in:51,61 && gt:60').should.be.equal(true)
      validator.test(51, 'in:51,61 && gt:60').should.be.equal(false)
      validator.test(51, 'in:51,61 || gt:60').should.be.equal(true)
      validator.test(51, '(gt:20 && lt:60) || (in:71,81,91 && not_in:81)').should.be.equal(true)
      validator.test(71, '(gt:20 && lt:60) || (in:71,81,91 && not_in:81)').should.be.equal(true)
      validator.test(81, '(gt:20 && lt:60) || (in:71,81,91 && not_in:81)').should.be.equal(false)
      validator.test(12, '(gt:20 && lt:60) || (in:71,81,91 && not_in:81)').should.be.equal(false)
      validator.test(70, '(gt:20 && lt:60) || (in:71,81,91 && not_in:81)').should.be.equal(false)
      /**
       * 😂😭
       * It work if you wrote it in ungly way...
       * but I suggest you not to write something like this
       */
      validator.test(70, '( gt:20 &&  lt:    60) || (       in:71,81  ,91 && not_in:81)     ').should.be.equal(false)
      validator.test(71, '( gt:20 &&  lt:    60) || (       in:71,81  ,91 && not_in:81)     ').should.be.equal(true)
    })
  })

  describe('validator core exception', function () {
    it('string that not built in rule', () => {
      const testSuit = () => validator.test('some', 'hallo')
      testSuit.should.to.throw('hallo')
      const testSuit2 = () => validator.test('some', '')
      testSuit2.should.to.throw('Can not parse rule of undefined')
    })
    it('unsupport custome rule type', () => {
      const testSuit = () => validator.test('some', [])
      testSuit.should.to.throw(TypeError)
      const testSuit2 = () => validator.test('some', true)
      testSuit2.should.to.throw(TypeError)
      const testSuit3 = () => validator.test('some', 'xxx')
      testSuit3.should.to.throw('Does not has the rule')
    })
    it('not a valid date', () => {
      validator.test('2017-13-02', 'after:2017-12-01').should.be.equal(false)
      validator.test('2017-12-33', 'after:2017-12-01').should.be.equal(false)
      validator.test('217-12-02', 'after:217-12-01').should.be.equal(false)

      // cause new Date('2017-11-31') is treated as 2017-12-01
      validator.test('2017-11-31', 'after:2017-11-30').should.be.equal(true)
    })
  })
})
