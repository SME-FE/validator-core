import { getType } from './index'
import { presetRules } from './preset-rules'
import customRules from './custom-rules'

const runRule = (queryStr, value) => {
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

const runMultiRule = (queryStr, value) => {
  const parse = logicalStr => {
    const orArr = logicalStr.split('||')
    const parsedStr = orArr.map(oStr => {
      if (!oStr) return ''
      if (/&&/.test(oStr)) {
        const andArr = oStr.split('&&')
        return andArr.map(aStr => {
          if (!aStr) return ''
          return runRule(aStr, value)
        }).join('&&')
      } else {
        return runRule(oStr, value)
      }
    }).join('||')
    return parsedStr
  }

  let resultStr
  if (queryStr.indexOf('(') > -1) {
    const leftBrac = queryStr.split('(')
    resultStr = leftBrac.map(lbStr => {
      const rightBrac = lbStr.split(')')
      return rightBrac.map(rbStr => {
        return parse(rbStr)
      }).join(')')
    }).join('(')
  } else {
    resultStr = parse(queryStr)
  }

  return new Function(`return ${resultStr};`)()
}

export default function runPresetRule (queryStr, value) {
  if (!queryStr) throw new Error('Can not parse rule of undefined')

  queryStr = queryStr.replace(/\s/g, '')
  if (/&&|\|\|/.test(queryStr)) {
    return runMultiRule(queryStr, value)
  } else {
    return runRule(queryStr, value)
  }
}
