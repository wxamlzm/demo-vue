/*
 * @Author: zd
 * @Date: 2023-10-26 08:55:58
 * @LastEditors: zd
 * @LastEditTime: 2023-10-30 14:58:16
 * @FilePath: \demo-vue\src\views\stressTestPage\utils\index.js
 * @Description: 压力测试情景页面公共方法
 */
export function groupByArray (array, groupByKey) {
  let result = array.reduce((acc, cur) => {
    let key = cur[groupByKey]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
  const arrayGroupByObject = result
  const groupKeyArray = Object.keys(result)
  return {
    arrayGroupByObject,
    groupKeyArray
  }
}
