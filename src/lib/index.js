
export const getType = (v) => Object.prototype.toString.call(v).slice(8, -1)

export const isValidDate = (inDate) => {
  if (!inDate) return false

  let valid = true
  // yyyy.mm.dd => yyyy-mm-dd
  if (typeof inDate === 'string') {
    let pos = inDate.indexOf('.')
    if ((pos > 0 && pos <= 6)) {
      inDate = inDate.replace(/\./g, '-')
    }
  }

  let testDate = new Date(inDate)
  let yr = testDate.getFullYear()
  let mo = testDate.getMonth()

  if (yr < 1000) { return false }
  if (isNaN(mo)) { return false }

  return valid
}

export const dateCompare = (value, params, type) => {
  if (!isValidDate(value) || !isValidDate(params)) return false

  const v = getType(value) === 'Date' ? value : new Date(value)

  if (type === 'after') return v.getTime() > new Date(params).getTime()
  if (type === 'after_equal') return v.getTime() >= new Date(params).getTime()
  if (type === 'before') return v.getTime() < new Date(params).getTime()
  /* istanbul ignore else */
  if (type === 'before_equal') return v.getTime() <= new Date(params).getTime()
}

export const numCompare = (value, params, type) => {
  if (getType(value) !== 'Number') return false

  if (type === 'lt') return parseFloat(value) < parseFloat(params)
  if (type === 'lte') return parseFloat(value) <= parseFloat(params)
  if (type === 'gt') return parseFloat(value) > parseFloat(params)
  if (type === 'gte') return parseFloat(value) >= parseFloat(params)
  /* istanbul ignore else */
  if (type === 'equal') return parseFloat(value) === parseFloat(params)
}

export const isContain = (value, params, type) => {
  let isEqual = null
  if (getType(value) === 'Number') isEqual = (value, item) => value == item
  if (getType(value) === 'Boolean') isEqual = (value, item) => value === (item === 'true')
  if (getType(value) === 'String') isEqual = (value, item) => value === item

  if (isEqual === null) return false

  for (let i = 0; i < params.length; i++) {
    const item = params[i]
    if (isEqual(value, item)) return type === 'in'
  }

  return type !== 'in'
}
