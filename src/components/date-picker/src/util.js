/**
 * 列出年
 * @param {Number} start 开始年
 * @param {Number} end 结束年
 * @param {Number} depth 列表深度
 *  1: 只包含年
 *  2: 包含年、月
 *  3: 包含年、月、日
 */
export let listYear = (start, end, depth) => { // 生成年份信息
  let yearList = []
  for (let year = start; year <= end; year++) {
    let yearOption = {
      label: year,
      text: year
    }
    if (depth === 2) {
      yearOption.children = listMonths(year, 1)
    }
    if (depth === 3) {
      yearOption.children = listMonths(year, 2)
    }
    yearList.push(yearOption)
  }
  return yearList
}

/**
 * 列出年份下的月和日信息
 * @param {Number} year 年份，用于区分闰年和平年
 * @param {Number} depth 列表深度
 *  1: 只包含月
 *  2: 包含月、日
 */
export let listMonths = (year, depth) => { // 生成月份信息
  let monthList = []
  for (let month = 1; month <= 12; month++) {
    let monthObj = {
      label: month,
      text: month
    }
    if (depth === 2) {
      monthObj.children = listDates(year, month)
    }
    monthList.push(monthObj)
  }
  return monthList
}

/**
 * 列出月份下日的信息
 * @param {Number} year 年份，用于区分闰年和平年
 * @param {Number} month 列表深度
 */
export let listDates = (year, month) => { // 生成日期信息
  let daycountList = []
  let dayList = []
  if (year % 400 === 0 || (year % 4 === 0 && year & 100 !== 0)) { // 闰年
    daycountList = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  } else {
    daycountList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  }
  for (let day = 1; day <= daycountList[month - 1]; day++) {
    dayList.push({
      label: day,
      text: day
    })
  }
  return dayList
}
