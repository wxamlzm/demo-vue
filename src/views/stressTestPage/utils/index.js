/*
 * @Author: zd
 * @Date: 2023-10-26 08:55:58
 * @LastEditors: zd
 * @LastEditTime: 2023-10-31 09:44:19
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

export function transform (data) {
  const result = {}

  Object.keys(data).forEach(id => {
    result[id] = []

    const item = data[id]

    Object.keys(item).forEach(key => {
      const obj = {}
      item[key].forEach(ele => {
        Object.keys(ele).forEach(prop => {
          obj[`${prop}_${key}`] = ele[prop]
        })
        result[id].push(obj)
      })
    })
  })

  return result
}

// const before = {
//   id1: {
//     mild: [{ value: 1 }],
//     moderate: [{ value: 2 }],
//     server: [{ value: 3 }]
//   }
// }
// const after = {
//   id1: [{ value_mild: 1 }, { value_moderate: 2 }, { value_server: 3 }]
// }
