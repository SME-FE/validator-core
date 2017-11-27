import { getType } from './index'

class CustomRule {
  constructor () {
    this.rules = {}
  }
  add (rules) {
    this.check(rules)
    for (let key in rules) {
      this.rules[key] = rules[key]
    }
  }

  get (key) {
    return this.rules[key]
  }

  check (rules) {
    if (getType(rules) !== 'Object') throw new Error('Custom rules must be Object')
    for (let key in rules) {
      if (getType(rules[key]) !== 'RegExp' && getType(rules[key]) !== 'Function') {
        throw new TypeError(`Rule [${key}] must be Function or RegExp`)
      }
    }
  }
}

export default new CustomRule()
