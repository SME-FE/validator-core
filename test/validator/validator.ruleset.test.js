import { simpleForm } from './../mock/simple-form'
import Validation from '@/index'
import chai from 'chai'
chai.should()

const info = console.info.bind(console)

describe('validator ruleset', function () {
  let validation = null
  let count = 0
  beforeEach('new validation instance', () => {
    count++
    // both way is ok
    if (count % 2 === 0) {
      validation = new Validation()
      validation.use(simpleForm)
    } else {
      validation = new Validation(simpleForm)
    }
  })

  describe('test simple field', function () {
    it('test name', () => {
      const result = validation.check('李狗蛋', 'ChinaName')
      const result2 = validation.check('李', 'ChinaName')
  
      info(result)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('test email', () => {
      const result = validation.check('hwenleung@gmail.com', 'Email')
      const result2 = validation.check('howabout@this', 'Email')
  
      info(result2)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('test startDate', () => {
      const result = validation.check('2017-10-04', 'StartDate')
      const result2 = validation.check('2017-10-02', 'StartDate')
  
      info(result2)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('test price', () => {
      const result = validation.check(2000, 'Price')
      const result2 = validation.check(5001, 'Price')
  
      info(result2)
      result.isError.should.be.equal(false)
      result2.isError.should.be.equal(true)
    })
    it('optional', () => {
      const result = validation.check(null, 'Age')
      const result2 = validation.check(20, 'Age')
      const result3 = validation.check(17, 'Age')
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
      validation.checkWithDiff([type, data], ['Email', 'Price'], [/email/i, /price/i]).isPass.should.be.equal(true)
      type = 'price'
      validation.checkWithDiff([type, data], ['Email', 'Price'], [/email/i, /price/i]).isPass.should.be.equal(false)
      data = 4999.9
      validation.checkWithDiff([type, data], ['Email', 'Price'], [/email/i, /price/i]).isPass.should.be.equal(true)
    })
    it('diff language', () => {
      let language = 'zh'
      let data = '李狗蛋'
      validation.checkWithDiff([language, data], ['ChinaName', 'EnglishName'], [/zh/i, /en/i]).isPass.should.be.equal(true)
      data = 'Leon'
      validation.checkWithDiff([language, data], ['ChinaName', 'EnglishName'], [/zh/i, /en/i]).isPass.should.be.equal(false)
      language = 'en'
      validation.checkWithDiff([language, data], ['ChinaName', 'EnglishName'], [/zh/i, /en/i]).isPass.should.be.equal(true)
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

      validation.checkWithDiff(diffFn(language, data)).isPass.should.be.equal(true)
      data = 'Leon'
      validation.checkWithDiff(diffFn(language, data)).isPass.should.be.equal(false)
      language = 'en'
      validation.checkWithDiff(diffFn(language, data)).isPass.should.be.equal(true)
    })
  })

  describe('ruleset exception handle', function () {
    it('check', () => {
      const testSuit = () => validation.check('some', 'Agee')
      testSuit.should.to.throw(TypeError, 'There are no ruleset that name Agee')
      const testSuit2 = () => validation.check('some', function () {})
      testSuit2.should.to.throw(TypeError)
    })
    it('checkWithDiff', () => {
      const testSuit = () => validation.checkWithDiff(19, 'Age')
      testSuit.should.to.throw(TypeError)
    })
  })
})
