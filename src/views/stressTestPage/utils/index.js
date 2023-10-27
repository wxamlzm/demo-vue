/*
 * @Author: zd
 * @Date: 2023-10-26 08:55:58
 * @LastEditors: zd
 * @LastEditTime: 2023-10-26 08:56:44
 * @FilePath: \zb-risk-web-dev\src\views\otc\stressTestPage\utils\index.js
 * @Description: 压力测试情景页面公共方法
 */
export function groupByArray (array, groupByKey) {
  console.log(array)
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
