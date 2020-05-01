import toTypeof from './toTypeof'

const toWeek = (val = new Date()) => {
  const obj = toTypeof(val)
  if (obj !== 'date') {
    val = new Date()
  }
  return val.getDay()
}
export default toWeek
