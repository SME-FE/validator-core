import { simpleForm } from './../mock/simple-form'
import Validator from '@/index'
import chai from 'chai'
chai.should()

const info = console.info.bind(console)

describe('validator ruleset', function () {
  let validator = null
  let count = 0
  beforeEach('new validator instance', () => {
    count++
    // both way is ok
    if (count % 2 === 0) {
      validator = new Validator()
      validator.use(simpleForm)
    } else {
      validator = new Validator(simpleForm)
    }
  })

  describe('test simple field', function () {
    it('test name', () => {
      const result = validator.check('李狗蛋', 'ChinaName')
      const result2 = validator.check('李', 'ChinaName')
  
      info(result)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
      result2.tip.should.be.equal('长度为2到24')
    })
    it('test color', () => {
      const result = validator.check('blue', 'Color')
      const result2 = validator.check('purple', 'Color')
  
      info(result)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
      result2.tip.should.be.equal('Error')
    })
    it('test email', () => {
      const result = validator.check('hwenleung@gmail.com', 'Email')
      const result2 = validator.check('howabout@this', 'Email')
  
      info(result2)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('test startDate', () => {
      const result = validator.check('2017-10-04', 'StartDate')
      const result2 = validator.check('2017-10-02', 'StartDate')
  
      info(result2)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('test price', () => {
      const result = validator.check(2000, 'Price')
      const result2 = validator.check(5001, 'Price')
  
      info(result2)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('optional', () => {
      const result = validator.check(null, 'Age')
      const result2 = validator.check(20, 'Age')
      const result3 = validator.check(17, 'Age')
      info(result3)
      // should be pass cause Age is optional
      result.isPass.should.be.equal(true)

      result2.isPass.should.be.equal(true)
      result3.isPass.should.be.equal(false)
    })
  })

  describe('different test', function () {
    it('diff type', () => {
      let type = 'email'
      let data = 'hwenleung@gmail.com'
      validator.checkWithDiff([type, data], ['Email', 'Price'], [/email/i, /price/i]).isPass.should.be.equal(true)
      type = 'price'
      validator.checkWithDiff([type, data], ['Email', 'Price'], [/email/i, /price/i]).isPass.should.be.equal(false)
      data = 4999.9
      validator.checkWithDiff([type, data], ['Email', 'Price'], [/email/i, /price/i]).isPass.should.be.equal(true)
    })
    it('diff language', () => {
      let language = 'zh'
      let data = '李狗蛋'
      validator.checkWithDiff([language, data], ['ChinaName', 'EnglishName'], [/zh/i, /en/i]).isPass.should.be.equal(true)
      data = 'Leon'
      validator.checkWithDiff([language, data], ['ChinaName', 'EnglishName'], [/zh/i, /en/i]).isPass.should.be.equal(false)
      language = 'en'
      validator.checkWithDiff([language, data], ['ChinaName', 'EnglishName'], [/zh/i, /en/i]).isPass.should.be.equal(true)
    })
    it('diff by function 2', () => {
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

      validator.checkWithDiff(diffFn(language, data)).isPass.should.be.equal(true)
      data = 'Leon'
      validator.checkWithDiff(diffFn(language, data)).isPass.should.be.equal(false)
      language = 'en'
      validator.checkWithDiff(diffFn(language, data)).isPass.should.be.equal(true)
    })
  })

  describe('ruleset exception handle', function () {
    it('check', () => {
      const testSuit = () => validator.check('some', 'Agee')
      testSuit.should.to.throw(TypeError, 'There are no ruleset that name Agee')
      const testSuit2 = () => validator.check('some', function () {})
      testSuit2.should.to.throw(TypeError)
    })
    it('checkWithDiff', () => {
      const testSuit = () => validator.checkWithDiff(19, 'Age')
      testSuit.should.to.throw(TypeError)
    })
  })
})
