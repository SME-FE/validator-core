import { getType, dateCompare, numCompare, isContain } from './index'

export const presetRules = {
  required: /^.{1,}$/,
  phone: /(^[1][3-9][0-9]{9}$)/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/,
  url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  integer: /^-?\d+$/,
  id_card: /^(\d{18,18}|\d{15,15}|\d{17,17}(X|x))$/,
  // date
  after: (value, params) => dateCompare(value, params, 'after'),
  after_equal: (value, params) => dateCompare(value, params, 'after_equal'),
  before: (value, params) => dateCompare(value, params, 'before'),
  before_equal: (value, params) => dateCompare(value, params, 'before_equal'),
  // string
  size: (value, params) => {
    if (getType(value) !== 'String') return false

    if (params.length === 1) params.unshift(0)

    const len = value.length
    return len <= params[1] && len >= params[0]
  },
  // number
  gt: (value, params) => numCompare(value, params, 'gt'),
  gte: (value, params) => numCompare(value, params, 'gte'),
  lt: (value, params) => numCompare(value, params, 'lt'),
  lte: (value, params) => numCompare(value, params, 'lte'),
  equal: (value, params) => numCompare(value, params, 'equal'),

  in: (value, params) => isContain(value, params, 'in'),
  not_in: (value, params) => isContain(value, params, 'not_in')
}
