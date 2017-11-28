import { simpleForm } from './../mock/simple-form'
import Validator from '@/index'
import chai from 'chai'
chai.should()

const info = console.info.bind(console)
describe('validator core', function () {
  let validator = null
  beforeEach('new validator instance', () => {
    validator = new Validator(simpleForm)
    const customRules = {
      'password': /^[^\s\u4E00-\u9FA5]{8,16}$/,
      'is_prime': function isPrimeNum (num, params) {
        if (params) info(params)
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
  })

  describe('custom preset rules', function () {
    it('custom regexp rule', () => {
      validator.test('abcd123', 'password').should.be.equal(false)
      validator.test('abcd1234', 'password').should.be.equal(true)
    })
    it('custom function rule', () => {
      validator.test(13, 'is_prime:just_test,hei').should.be.equal(true)
      validator.test(24, 'is_prime').should.be.equal(false)
    })
  })

  describe('multi rules', function () {
    it('custom multi rule', () => {
      validator.test('hwenleung@gmail.com', 'email && contain:gmail.com').should.be.equal(true)
      validator.test('hwenleung@163.com', 'email && contain:gmail.com').should.be.equal(false)

      validator.test(13, 'lt:20 || gt: 60 && is_prime').should.be.equal(true)
      validator.test(23, 'lt:20 || gt: 60 && is_prime').should.be.equal(false)
      validator.test(797, 'lt:20 || gt: 60 && is_prime').should.be.equal(true)
      validator.test(4, 'lt:20 || (gt: 60 && is_prime)').should.be.equal(true)
      validator.test(64, 'lt:20 || (gt: 60 && is_prime)').should.be.equal(false)
      validator.test(797, 'lt:20 || (gt: 60 && is_prime)').should.be.equal(true)
      validator.test(13, '((lt:20 || gt: 60) && is_prime)').should.be.equal(true)
      validator.test(23, '((lt:20 || gt: 60) && is_prime)').should.be.equal(false)
    })
  })

  describe('custom rules exception', function () {
    it('custom rules not an Object', () => {
      const testSuit = () => validator.registerRules('23333')
      testSuit.should.to.throw('Custom rules must be Object')
      testSuit.should.to.throw('Custom rules must be Object')
    })
    it('rule type not Function or RegExp', () => {
      const testSuit2 = () => validator.registerRules({
        ecc: '66666'
      })
      testSuit2.should.to.throw(TypeError)
      testSuit2.should.to.throw('Rule [ecc] must be Function or RegExp')
    })
  })
})
