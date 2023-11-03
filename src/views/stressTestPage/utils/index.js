/*
 * @Author: zd
 * @Date: 2023-10-26 08:55:58
 * @LastEditors: zd
 * @LastEditTime: 2023-11-03 15:06:06
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

// 按多个key对数组进行分组
export function groupBy (array, keys) {
  let map = new Map()
  array.forEach(item => {
    let key = ''
    keys.forEach(k => {
      key += item[k]
    })

    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key).push(item)
  })

  return map
}

// 按多个key对数组进行分组,并进行二次分组
export function groupByDeep (array, keys1, key2) {
  let map = new Map()

  array.forEach(item => {
    let groupKey = ''
    keys1.forEach((k, i) => {
      if (i > 0) {
        groupKey += '#'
      }
      groupKey += item[k]
    })

    if (!map.has(groupKey)) {
      map.set(groupKey, {})
    }

    let subGroupKey = item[key2]
    if (!map.get(groupKey)[subGroupKey]) {
      map.get(groupKey)[subGroupKey] = []
    }
    map.get(groupKey)[subGroupKey].push(item)
  })

  return map
}
