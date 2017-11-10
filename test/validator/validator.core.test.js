import { simpleForm } from './../mock/simple-form'
import Validation from '@/index'
import chai from 'chai'
chai.should()

const info = console.info.bind(console)
describe('validator core', function () {
  let validation = null
  beforeEach('new validation instance', () => {
    validation = new Validation(simpleForm)
    // validation.use(simpleForm)
  })

  describe('preset RegExp', function () {
    it('required', () => {
      validation.test('', 'required').should.be.equal(false)
      validation.test('x', 'required').should.be.equal(true)
    })
    it('phone', () => {
      validation.test('', 'phone').should.be.equal(false)
      validation.test('1356458752', 'phone').should.be.equal(false)
      validation.test('13564587523', 'phone').should.be.equal(true)
      validation.test('135645875231', 'phone').should.be.equal(false)
    })
    it('email', () => {
      validation.test('test@gmail.com', 'email').should.be.equal(true)
      validation.test('i@html.love', 'email').should.be.equal(true)
      validation.test('394229785@qq.com', 'email').should.be.equal(true)
      validation.test('test@com', 'email').should.be.equal(false)
    })
    it('url', () => {
      validation.test('ws://xxx', 'url').should.be.equal(false)
      validation.test('https://github.com', 'url').should.be.equal(true)
      validation.test('https://caniuse.com/#search=Object.assign', 'url').should.be.equal(true)
      validation.test('http://www.cnblogs.com/chenny7/p/4498322.html', 'url').should.be.equal(true)
      validation.test('https://www.google.com/search?ei=wLACWt-KH4jwmQH1k7mQDA&q=javascript&oq=javascript&gs_l=psy-ab.3...17536786.17538497.0.17538699.10.8.0.0.0.0.372.372.3-1.1.0....0...1.1.64.psy-ab..9.1.372...0j0i67k1.0.4TVzMGaJxCo', 'url').should.be.equal(true)
    })
    it('integer', () => {
      validation.test(10, 'integer').should.be.equal(true)
      validation.test(-10, 'integer').should.be.equal(true)
      validation.test(0, 'integer').should.be.equal(true)
      validation.test(1.01, 'integer').should.be.equal(false)
    })
    it('id_card', () => {
      // 新身份证都是18位
      validation.test('610724197303236577', 'id_card').should.be.equal(true)
      validation.test('61072419730323657X', 'id_card').should.be.equal(true)
      validation.test('61072419730323657x', 'id_card').should.be.equal(true)
      // 旧身份证，有可能是 15位
      validation.test('610724197303236', 'id_card').should.be.equal(true)
      // 其他不合法
      validation.test('6107241973032360', 'id_card').should.be.equal(false)
      validation.test('61072419730323657A', 'id_card').should.be.equal(false)
    })
  })

  describe('preset validation function', function () {
    it('after', () => {
      validation.test(null, 'after:2017/11/07').should.be.equal(false)
      validation.test('2017/11/08', 'after:2017/11/07').should.be.equal(true)
      validation.test('2017/11/08', 'after:2017/11/7').should.be.equal(true)
      validation.test('2017-11-08', 'after:2017-11-07').should.be.equal(true)
      validation.test('2017-11-08', 'after:2017-11-09').should.be.equal(false)
      validation.test('2017-11-08', 'after:2017-11-08').should.be.equal(false)

      validation.test('2017.11.08', 'after:2017.11.08').should.be.equal(false)
      validation.test(new Date('2017-11-09'), 'after:2017-11-08').should.be.equal(true)
    })
    it('after_equal', () => {
      validation.test(null, 'after_equal:2017/11/07').should.be.equal(false)
      validation.test('2017/11/08', 'after_equal:2017/11/07').should.be.equal(true)
      validation.test('2017/11/08', 'after_equal:2017/11/7').should.be.equal(true)
      validation.test('2017-11-08', 'after_equal:2017-11-07').should.be.equal(true)
      validation.test('2017-11-08', 'after_equal:2017-11-09').should.be.equal(false)
      // equal is ok
      validation.test('2017-11-08', 'after_equal:2017-11-08').should.be.equal(true)
      validation.test('2017.11.08', 'after_equal:2017.11.08').should.be.equal(true)
    })
    it('before', () => {
      validation.test(null, 'before:2017/11/07').should.be.equal(false)
      validation.test('2017/11/06', 'before:2017/11/07').should.be.equal(true)
      validation.test('2017/11/06', 'before:2017/11/7').should.be.equal(true)
      validation.test('2017-11-06', 'before:2017-11-07').should.be.equal(true)
      validation.test('2017-11-06', 'before:2017-11-05').should.be.equal(false)
      validation.test('2017-11-06', 'before:2017-11-06').should.be.equal(false)
      validation.test('2017.11.06', 'before:2017.11.06').should.be.equal(false)
    })
    it('before_equal', () => {
      validation.test(null, 'before_equal:2017/11/07').should.be.equal(false)
      validation.test('2017/11/06', 'before_equal:2017/11/07').should.be.equal(true)
      validation.test('2017/11/06', 'before_equal:2017/11/7').should.be.equal(true)
      validation.test('2017-11-06', 'before_equal:2017-11-07').should.be.equal(true)
      validation.test('2017-11-06', 'before_equal:2017-11-05').should.be.equal(false)
      // equal is ok
      validation.test('2017-11-06', 'before_equal:2017-11-06').should.be.equal(true)
      validation.test('2017.11.06', 'before_equal:2017.11.06').should.be.equal(true)
    })
    it('size', () => {
      validation.test('1234', 'size:4').should.be.equal(true)
      validation.test('12345', 'size:4').should.be.equal(false)
      
      validation.test('1234', 'size:2-4').should.be.equal(true)
      validation.test('1', 'size:2-4').should.be.equal(false)

      validation.test(null, 'size:2-4').should.be.equal(false)
      validation.test(1, 'size:2-4').should.be.equal(false)
    })
    it('max', () => {
      validation.test('200', 'max:400').should.be.equal(false)
      validation.test(200, 'max:400').should.be.equal(true)
      validation.test(400, 'max:400').should.be.equal(false)
      validation.test(401, 'max:400').should.be.equal(false)
    })
    it('max_equal', () => {
      validation.test('200', 'max_equal:400').should.be.equal(false)
      validation.test(200, 'max_equal:400').should.be.equal(true)
      validation.test(401, 'max_equal:400').should.be.equal(false)
      // equal is ok
      validation.test(400, 'max_equal:400').should.be.equal(true)
      validation.test(400.12, 'max_equal:400.12').should.be.equal(true)
    })
    it('min', () => {
      validation.test('500', 'min:400').should.be.equal(false)
      validation.test(500, 'min:400').should.be.equal(true)
      validation.test(399, 'min:400').should.be.equal(false)
      validation.test(400, 'min:400').should.be.equal(false)
    })
    it('min_equal', () => {
      validation.test('500', 'min_equal:400').should.be.equal(false)
      validation.test(500, 'min_equal:400').should.be.equal(true)
      validation.test(399, 'min_equal:400').should.be.equal(false)
      // equal is ok
      validation.test(400, 'min_equal:400').should.be.equal(true)
      validation.test(400.12, 'min_equal:400.12').should.be.equal(true)
    })
    it('equal', () => {
      validation.test('500', 'equal:500').should.be.equal(false)
      validation.test(500, 'equal:500').should.be.equal(true)
      validation.test(500.233, 'equal:500.233').should.be.equal(true)
      validation.test(399, 'equal:500').should.be.equal(false)
    })
    it('in', () => {
      validation.test(true, 'in:true').should.be.equal(true)
      validation.test(false, 'in:true').should.be.equal(false)
      validation.test('500', 'in:500').should.be.equal(true)
      validation.test(500, 'in:500,600').should.be.equal(true)
      validation.test('leo', 'in:aim,leo,ttt').should.be.equal(true)

      validation.test('le', 'in:aim,leo').should.be.equal(false)
      validation.test('', 'in:aim,leo').should.be.equal(false)
      validation.test(null, 'in:aim,leo').should.be.equal(false)
    })
    it('not_in', () => {
      validation.test(true, 'not_in:true').should.be.equal(false)
      validation.test(false, 'not_in:true').should.be.equal(true)
      validation.test('400', 'not_in:500').should.be.equal(true)
      validation.test(500.1, 'not_in:500').should.be.equal(true)
      validation.test('tttt', 'not_in:aim,leo,ttt').should.be.equal(true)

      validation.test('le', 'not_in:aim,leo').should.be.equal(true)
      validation.test('', 'not_in:aim,leo').should.be.equal(true)

      validation.test('leo', 'not_in:aim,leo').should.be.equal(false)
      validation.test(null, 'not_in:aim,leo').should.be.equal(false)
    })
  })

  describe('validator core test with custom RegExp', function () {
    it('=3=', () => {
      validation.test('=3=', /=3=/).should.be.equal(true)
      validation.test('=3=o', /=3=/).should.be.equal(true)
      validation.test('=3=o', /=3=$/).should.be.equal(false)
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

      validation.test(2, isPrimeNum).should.be.equal(true)
      validation.test(991, isPrimeNum).should.be.equal(true)
      validation.test(8, isPrimeNum).should.be.equal(false)
    })
  })

  describe('validator core exception', function () {
    it('string that not built in rule', () => {
      const testSuit = () => validation.test('some', 'hallo')
      testSuit.should.to.throw('hallo')
      const testSuit2 = () => validation.test('some', '')
      testSuit2.should.to.throw('can not parse rule of undefined')
    })
    it('unsupport custome rule type', () => {
      const testSuit = () => validation.test('some', [])
      testSuit.should.to.throw(TypeError)
      const testSuit2 = () => validation.test('some', true)
      testSuit2.should.to.throw(TypeError)
    })
    it('not a valid date', () => {
      validation.test('2017-13-02', 'after:2017-12-01').should.be.equal(false)
      validation.test('2017-12-33', 'after:2017-12-01').should.be.equal(false)
      validation.test('217-12-02', 'after:217-12-01').should.be.equal(false)

      // cause new Date('2017-11-31') is treated as 2017-12-01
      validation.test('2017-11-31', 'after:2017-11-30').should.be.equal(true)
    })
  })
})
