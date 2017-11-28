import { getType } from './index'
import { presetRules } from './preset-rules'
import customRules from './custom-rules'

const runRule = (queryStr, value) => {
  let [ruleName, params] = queryStr.split(':').map(s => s.trim())
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

const runMultiRule = (queryStr, value) => {
  const orArr = queryStr.split('||')
  console.info('orArr:')
  console.info(orArr)
  console.info('andArr')

  const parsedStr = orArr.map(oStr => {
    oStr = oStr.trim()
    if (/&&/.test(oStr)) {
      const andArr = oStr.split('&&')
      console.info(andArr)
      return andArr.map(aStr => {
        aStr = aStr.trim()
        return runRule(aStr, value)
      }).join('&&')
    } else {
      return runRule(oStr, value)
    }
  }).join('||')

  console.info('parsedStr:')
  console.info(parsedStr)
  return new Function(`return ${parsedStr}`)()
}

export default function runPresetRule (queryStr, value) {
  if (!queryStr) throw new Error('Can not parse rule of undefined')

  if (/&&|\|\|/.test(queryStr)) {
    return runMultiRule(queryStr, value)
  } else {
    return runRule(queryStr, value)
  }
}
