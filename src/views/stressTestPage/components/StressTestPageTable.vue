<!--
 * @Author: zd
 * @Date: 2023-10-25 14:43:45
 * @LastEditors: zd
 * @LastEditTime: 2023-11-08 17:01:24
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\components\StressTestPageTable.vue
 * @Description: 压力情景测试的列表
-->
<template>
  <el-table
    :data="tableDataFormat"
    :header-cell-style="headerStyle"
    :span-method="setSpan"
    :cell-style="setCellStyle"
    height="100%"
  >
    <el-table-column prop="date" label="板块" width="150">
      <el-table-column prop="plate_type_name" label="大类" align="center" />
      <el-table-column
        prop="plate_code_name"
        label="子类"
        align="center"
        width="120"
      />
    </el-table-column>
    <el-table-column label="压力情景">
      <el-table-column
        v-for="(stressSceneData, key) in tableDataGroupByStressScene"
        :key="key"
        :prop="key"
        :label="getLabelByKey(key)"
      >
        <el-table-column
          :key="`label_${key}`"
          :prop="`label_${key}`"
          width="150"
          align="center"
        />
        <el-table-column
          :key="`value_${key}`"
          :prop="`value_${key}`"
          width="250"
          align="center"
        />
        <el-table-column
          :key="`volatility_down_${key}`"
          :prop="`volatility_down_${key}`"
          align="center"
        />
        <el-table-column
          :key="`volatility_up_${key}`"
          :prop="`volatility_down_${key}`"
          align="center"
        />
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import { groupByArray, groupByDeep } from '../utils'
const CALC_LABEL_TYPE1 = '计算结果'
const CALC_LABEL_TYPE2 = '标的价格涨跌'
const VOLATILITY_LABEL = '波动率涨跌'

export default {
  name: 'StressTestPageTable',

  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableType: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      //
      shangpinPlateTypeNameGroup: [],
      shangpinPlateCodeNameArray: [],
      sumCategoryCellWidth: '100px',
      subHeaderWidth: '200px',
      tableKey: 0
    }
  },

  computed: {
    // 按大类分组
    tableDataGroupBymainCategory () {
      // 按plate_type_name分组
      const plateTypeNameResult = groupByArray(
        this.tableData,
        'plate_type_name'
      )
      const plateTypeNameGroup = plateTypeNameResult.arrayGroupByObject
      return plateTypeNameGroup
    },
    // 按压力等级分
    tableDataGroupByStressScene () {
      // 按stress_scene分组
      const stressSceneResult = groupByArray(this.tableData, 'stress_scene')
      const stressSceneGroup = stressSceneResult.arrayGroupByObject
      const tableDataGroupByStressSceneSort = {}
      const SCENES = [
        'MildStressScene', // 轻度
        'ModerateStressScene', // 中度
        'SeverStressScene' //重度
      ]
      // 对象排序
      SCENES.forEach(scene => {
        tableDataGroupByStressSceneSort[scene] = stressSceneGroup[scene]
      })
      return tableDataGroupByStressSceneSort
    },
    // 按压力等级分
    tableDataGroupByPlateCode () {
      // 按stress_scene分组
      const plateCodeResult = groupByArray(this.tableData, 'plate_code')
      const plateCodeGroup = plateCodeResult.arrayGroupByObject
      return plateCodeGroup
    },
    tableDataFormat () {
      const tableDataMap = groupByDeep(
        this.tableData,
        ['plate_type_name', 'plate_code_name'],
        'stress_scene'
      )

      console.log(tableDataMap)

      // 获取数组中对应的type对应的value
      const getValueByType = (key, typeValue, array) => {
        const targetItem = array.find(item => {
          if (
            item[`${key}_type`].toLowerCase().includes(typeValue.toLowerCase())
          ) {
            return item
          }
        })
        return targetItem[`${key}_value`]
      }

      const getDataFormat = (dataObj, key) => {
        const plateTypeName = key.split('#')[0]
        const plateCodeName = key.split('#')[1]
        const array = []

        const getData = (scene, index) => {
          const calcValue =
            this.tableType === 'market'
              ? dataObj[scene][0].market_min_profit
              : dataObj[scene][0].credit_min_profit

          const dataMap = {
            0: {
              [`label_${scene}`]: CALC_LABEL_TYPE1,
              [`value_${scene}`]: calcValue,
              [`volatility_down_${scene}`]: VOLATILITY_LABEL,
              [`volatility_up_${scene}`]: VOLATILITY_LABEL
            },
            1: {
              [`label_${scene}`]: CALC_LABEL_TYPE1,
              [`value_${scene}`]: calcValue,
              [`volatility_down_${scene}`]: `${
                getValueByType('volatility', 'down', dataObj[scene]) * 100
              }%`,
              [`volatility_up_${scene}`]: `${
                getValueByType('volatility', 'up', dataObj[scene]) * 100
              }%`
            },
            2: {
              [`label_${scene}`]: CALC_LABEL_TYPE2,
              [`value_${scene}`]: `${
                getValueByType('quantile', 'down', dataObj[scene]) * 100
              }%分数位（标的价格下跌情形）`,
              [`volatility_down_${scene}`]: dataObj[scene][0].today_profit,
              [`volatility_up_${scene}`]: dataObj[scene][0].today_profit
            },
            3: {
              [`label_${scene}`]: CALC_LABEL_TYPE2,
              [`value_${scene}`]: `${
                getValueByType('quantile', 'up', dataObj[scene]) * 100
              }%分数位（标的价格上涨情形）`,
              [`volatility_down_${scene}`]: dataObj[scene][0].today_profit,
              [`volatility_up_${scene}`]: dataObj[scene][0].today_profit
            }
          }
          return dataMap[index]
        }
        for (let i = 0; i <= 3; i++) {
          const subObj = {
            plate_type_name: plateTypeName,
            plate_code_name: plateCodeName
          }

          const sceneLevels = [
            'MildStressScene', // 轻度
            'ModerateStressScene', // 中度
            'SeverStressScene' //重度
          ]
          sceneLevels.forEach(scene => {
            const dataArray = getData(scene, i)
            Object.assign(subObj, dataArray)
          })

          array.push(subObj)
        }
        return array
      }

      const tableDataFormatArray = []
      let lastKey = null
      // 合计
      let valueMildStressSceneSum = 0
      let valueModerateStressSceneSum = 0
      let valueSeverStressSceneSum = 0
      // 总计
      let valueMildStressSceneSumAll = 0
      let valueModerateStressSceneSumAll = 0
      let valueSeverStressSceneSumAll = 0

      tableDataMap.forEach((value, key, map) => {
        const plateTypeName = key.split('#')[0]
        // 在大类变更前，加入合计
        if (plateTypeName !== lastKey && lastKey !== null) {
          console.log(
            tableDataFormatArray,
            valueMildStressSceneSum,
            valueModerateStressSceneSum,
            valueSeverStressSceneSum
          )
          tableDataFormatArray.push({
            plate_type_name: lastKey,
            plate_code_name: '合计',
            label_MildStressScene: valueMildStressSceneSum,
            label_ModerateStressScene: valueModerateStressSceneSum,
            label_SeverStressScene: valueSeverStressSceneSum
          })

          // 重置
          valueMildStressSceneSum = 0
          valueModerateStressSceneSum = 0
          valueSeverStressSceneSum = 0
        }
        const newRowGroup = getDataFormat(value, key)
        tableDataFormatArray.push(newRowGroup)
        // 累加
        valueMildStressSceneSum += newRowGroup[0].value_MildStressScene
        valueModerateStressSceneSum += newRowGroup[0].value_ModerateStressScene
        valueSeverStressSceneSum += newRowGroup[0].value_SeverStressScene
        // 总计
        valueMildStressSceneSumAll += newRowGroup[0].value_MildStressScene
        valueModerateStressSceneSumAll +=
          newRowGroup[0].value_ModerateStressScene
        valueSeverStressSceneSumAll += newRowGroup[0].value_SeverStressScene

        lastKey = plateTypeName
      })

      if (lastKey !== null) {
        tableDataFormatArray.push({
          plate_type_name: lastKey,
          plate_code_name: '合计',
          label_MildStressScene: valueMildStressSceneSum,
          label_ModerateStressScene: valueModerateStressSceneSum,
          label_SeverStressScene: valueSeverStressSceneSum
        })
      }
      console.log(
        valueMildStressSceneSumAll,
        valueModerateStressSceneSumAll,
        valueSeverStressSceneSumAll
      )
      tableDataFormatArray.push({
        plate_type_name: '总计',
        plate_code_name: '总计',
        label_MildStressScene: valueMildStressSceneSumAll,
        label_ModerateStressScene: valueModerateStressSceneSumAll,
        label_SeverStressScene: valueSeverStressSceneSumAll
      })

      return tableDataFormatArray.flat()
    }
  },

  methods: {
    initTable () {
      this.setCellWidth()
    },

    setCellWidth () {
      const stressTestTableDom = this.$refs.stressTestTableRef
      const mainTableTitleDom = stressTestTableDom?.querySelector(
        '.table-main-category'
      )
      const subTableTitleDom = stressTestTableDom?.querySelector(
        '.table-sub-category'
      )
      const mainTitleWidth = mainTableTitleDom?.offsetWidth
      const subTitleWidth = subTableTitleDom?.offsetWidth
      const sum = mainTitleWidth + subTitleWidth
      console.log(mainTitleWidth, subTitleWidth)
      this.sumCategoryCellWidth = `${sum}px`
    },
    // 同步字标题宽度
    updateLabelWidth (width) {
      this.subHeaderWidth = width
      this.initTable()
    },
    // 处理表头样式
    headerStyle ({ row, column, rowIndex, columnIndex }) {
      row, column, rowIndex, columnIndex

      // 第三级表头不显示
      if (rowIndex === 2) {
        return 'display: none'
      }

      return {
        background: '#eef1f6',
        color: '#606266',
        textAlign: 'center'
      }
    },
    // 回调：换算合并列的格式
    setSpan ({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      const prop = column.property
      if (this.tableDataFormat.length < 1) return

      // 合并总计
      if (row.plate_code_name === '总计' && columnIndex === 1) {
        return { colspan: 0, rowspan: 0 }
      }
      if (row.plate_type_name === '总计') {
        if (columnIndex === 0) {
          return { colspan: 2, rowspan: 1 }
        }

        const columnIndexLabelArray = [2, 6, 10]
        if (columnIndex === 1) return { rowspan: 1, colspan: 1 }
        if (columnIndexLabelArray.includes(columnIndex)) {
          return { rowspan: 1, colspan: 4 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }

      // 合并合计
      if (row.plate_code_name === '合计') {
        const columnIndexLabelArray = [2, 6, 10]
        if (columnIndex === 1) return { rowspan: 1, colspan: 1 }
        if (columnIndexLabelArray.includes(columnIndex)) {
          return { rowspan: 1, colspan: 4 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }

      // 合并波动率涨跌
      if (prop.includes('volatility')) {
        if (row[prop] === '波动率涨跌') {
          if (columnIndex === 4) return { rowspan: 1, colspan: 2 }
          if (columnIndex === 5) return { rowspan: 0, colspan: 0 }

          if (columnIndex === 8) return { rowspan: 1, colspan: 2 }
          if (columnIndex === 9) return { rowspan: 0, colspan: 0 }

          if (columnIndex === 12) return { rowspan: 1, colspan: 2 }
          if (columnIndex === 13) return { rowspan: 0, colspan: 0 }
        }
      }

      // 格式化大类和子类
      if (columnIndex === 0 || columnIndex === 1) {
        if (
          rowIndex === 0 ||
          this.tableDataFormat[rowIndex - 1][prop] !== row[prop]
        ) {
          let count = 1
          let len = this.tableDataFormat.length
          while (
            rowIndex + count < len &&
            row[prop] === this.tableDataFormat[rowIndex + count][prop]
          ) {
            count++
          }
          return { rowspan: count, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
      // 格式化label列
      const labelColumnIndexArr = [2, 3, 6, 7, 10, 11]
      if (labelColumnIndexArr.includes(columnIndex)) {
        if (row.plate_code_name === '总计') return
        if (
          rowIndex === 0 ||
          this.tableDataFormat[rowIndex - 1][prop] !== row[prop]
        ) {
          let count = 1
          let len = this.tableDataFormat.length
          while (
            rowIndex + count < len &&
            row[prop] === this.tableDataFormat[rowIndex + count][prop]
          ) {
            count++
          }
          return { rowspan: count, colspan: 1 }
        } else {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    getLabelByKey (key) {
      const map = {
        MildStressScene: '轻度压力',
        ModerateStressScene: '中度压力',
        SeverStressScene: '重度压力'
      }
      return map[key]
    },
    // 配置单元格样式
    setCellStyle ({ row, column, rowIndex, columnIndex }) {
      const prop = column.property
      // 合计
      if (row.plate_code_name === '合计') {
        const columnIndexLabelArray = [2, 6, 10]
        if (columnIndexLabelArray.includes(columnIndex)) {
          return {
            background: '#92d050'
          }
        }
      }
      // 总计
      if (row.plate_code_name === '总计') {
        const columnIndexLabelArray = [2, 6, 10]
        if (columnIndexLabelArray.includes(columnIndex)) {
          return {
            background: '#ffc000'
          }
        }
      }
      // 添加计算结果的样式
      if (prop.includes('value')) {
        if (isNaN(row[prop]) === false) {
          return {
            background: '#ffff00'
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.stress-test-page-table {
  width: 100%;
  overflow:auto;
  position: relative;

  .table-header {
    // 让两个子项横向排列
    width: 100%;
    display: flex;
    // 添加border
    div {
      width: auto;
    }
    div.data-col {
      flex-grow:1;
    }

    // 子标题样式
    .sub-header {
      display: flex;
      div {
        flex-grow:1;
      }
    }
  }

  .table-cell {
      border: 1px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding:5px;
      box-sizing: border-box;
      border-right:none;
      border-bottom:none;
      flex-shrink: 0;
  }

  // 子类的样式，期望让遍历渲染的子类能呈现对齐的样式
  .table-sub-category {
    width:100px;
  }
  // 列表中的label样式，一般用于渲染固定字符串
  .table-label {
    width: 120px;
  }
  .table-value {
    width: 250px;
  }
}
</style>
