import { isToday, isYesterday } from '../date'

describe('date utilities', () => {
  it('determines whether the given datetime occurred today', () => {
    const d = new Date()
    expect(isToday(d)).toBe(true)

    const dy = new Date(new Date(d).getDate() - 1)

    expect(isToday(dy)).toBe(false)
  })

  it('determines whether the given datetime occurred yesterday', () => {
    const d = new Date()
    expect(isYesterday(d)).toBe(false)

    const d2 = new Date()
    d2.setDate(d2.getDate() - 1)

    expect(isYesterday(d2)).toBe(true)
  })
})
