import { getType } from './index'
import { presetRules } from './preset-rules'
import customRules from './custom-rules'

export default function runPresetRule (queryStr, value) {
  if (!queryStr) throw new Error('Can not parse rule of undefined')

  let [ruleName, params] = queryStr.split(':')
  let customFnKey = ''
  const rule = presetRules[ruleName] || customRules.get(ruleName)
  if (!rule) throw new Error(`Does not has the rule ${ruleName}`)
  
  if (getType(rule) === 'RegExp') return rule.test(value)

  if (
    !presetRules[ruleName] && 
    customRules.get(ruleName) && 
    getType(customRules.get(ruleName)) === 'Function'
  ) {
    customFnKey = ruleName
  }

  const paramsReg = customFnKey 
    ? new RegExp(`(size|in|not_in|${customFnKey})`)
    : /(size|in|not_in)/
  params = paramsReg.test(ruleName)
    ? params && params.split(/,|-|~/)
    : params

  return rule(value, params)
}
