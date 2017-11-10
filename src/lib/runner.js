import { getType } from './index'
import { presetRules } from './preset-rules'

export default function runPresetRule (queryStr, value) {
  if (!queryStr) throw new Error('can not parse rule of undefined')

  let [ruleName, params] = queryStr.split(':')
  const rule = presetRules[ruleName]
  if (!rule) throw new Error(`does not has the rule ${ruleName}`)
  
  if (getType(rule) === 'RegExp') return rule.test(value)

  params = /(size|in|not_in)/.test(ruleName)
    ? params.split(/,|-|~/)
    : params

  return rule(value, params)
}
