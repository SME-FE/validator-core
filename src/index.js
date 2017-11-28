import { getType } from './lib'
import runPresetRule from './lib/runner'
import customRules from './lib/custom-rules'

class Validator {
  constructor (ruleList) {
    this._rules = {}
    this._tips = {}
    this._optional = {}

    if (getType(ruleList) === 'Array') this.use(ruleList)
  }

  _runSingleRule (value, rule) {
    if (getType(rule) === 'Function') {
      return rule(value)
    } else if (getType(rule) === 'String') {
      return runPresetRule(rule, value)
    } else {
      if (getType(rule) !== 'RegExp') throw new TypeError('rule type error!! rule type must be Function or RegExp or String!')

      return rule.test(value)
    }
  }

  _runRuleSet (name, value, ruleSet) {
    if (!ruleSet) throw new TypeError(`There are no ruleset that name ${name}`)
    // 如果是可选，不填也是正确的
    if (this._optional[name] && !value) return -1 

    for (let idx = 0; idx < ruleSet.length; idx++) {
      const rule = ruleSet[idx]
      if (!this._runSingleRule(value, rule)) return idx
    }

    return -1
  }

  _getResult (name, index) {
    if (index === -1) {
      return {
        isError: false,
        isPass: true,
        name: name
      }
    }
    
    let tipSet = this._tips[name] || ['Error']
    let tip = tipSet.length === 1
      ? tipSet[0]
      : tipSet[index]

    return {
      isError: true,
      isPass: false,
      name: name,
      tip: tip
    }
  }

  /**
   * Init validator with a set of rule
   * @param {[Object]} ruleList 
   */
  use (ruleList) {
    for (let i = 0; i < ruleList.length; i++) {
      let item = ruleList[i]

      if (item.optional) this._optional[item.name] = true
      if (item.tips) this._tips[item.name] = item.tips
      this._rules[item.name] = item.rules
    }
  }

  /**
   * check with preset ruleset
   * @param {any} value 
   * @param {String} name 
   */
  check (value, name) {
    if (getType(name) === 'String') {
      const errIdx = this._runRuleSet(name, value, this._rules[name])
      return this._getResult(name, errIdx)
    }

    throw new TypeError(`params: [${name}] should be String`)
  }

  /**
   * check with different input field
   * @param {[any]|Object} values 
   * @param {[String]?} name 
   * @param {[RegExp]?} diffs 
   */
  checkWithDiff (values, names, diffs) {
    if (getType(values) === 'Object') {
      const { name, value } = values
      const errIdx = this._runRuleSet(name, value, this._rules[name])
      return this._getResult(name, errIdx)
    }

    if (getType(values) === 'Array' && diffs) {
      // 根据 diff 正则匹配校验规则
      let diffName
      diffs.forEach((item, index) => { 
        if (getType(item) === 'RegExp' && item.test(values[0])) {
          diffName = names[index]
        }
      })
      const errIdx = this._runRuleSet(diffName, values[1], this._rules[diffName])
      return this._getResult(diffName, errIdx)
    }
    
    throw new TypeError(`If the first args is not an Object, then all args should be Array`)
  }

  /**
   * use validator core to run a single test
   * @param {any} value 
   * @param {String} rule 
   */
  test (value, rule) {
    return this._runSingleRule(value, rule)
  }

  /**
   * register rules to preset rules
   * @param {Object} rules 
   * @memberof Validator
   */
  registerRules (rules) {
    customRules.add(rules)
  }
}

exports.default = Validator
module.exports = exports['default']
