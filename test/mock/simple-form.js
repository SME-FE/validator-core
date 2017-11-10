
export const simpleForm = [
  {
    name: 'ChinaName',
    rules: ['required', 'size:2-24', /^[\u4e00-\u9fa5]+$/],
    tips: ['不能为空', '长度为2到24', '不是中文']
  },
  {
    name: 'EnglishName',
    rules: ['required', 'size:2-24', /^[a-zA-Z\s]+$/],
    tips: ['Required...', 'Should have 2-24 letter', 'Not a valid English Name']
  },
  {
    name: 'Age',
    optional: true,
    rules: ['gt:18'],
    tips: ['age should be large then 18']
  },
  {
    name: 'Email',
    rules: ['required', 'email', 'size:24'],
    tips: ['不能为空', '不是合法的 Email 地址', 'Email 地址过长']
  },
  {
    name: 'StartDate',
    rules: ['required', 'after:2017-10-03'],
    tips: ['需要', '2017-10-03号之后']
  },
  {
    name: 'Price',
    rules: ['required', 'lt:5000'],
    tips: ['错啦错啦']
  },
  {
    name: 'Color',
    rules: ['required', 'in:blue,red,orange']
  }
]
