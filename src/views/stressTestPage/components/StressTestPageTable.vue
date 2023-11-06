<!--
 * @Author: zd
 * @Date: 2023-10-25 14:43:45
 * @LastEditors: zd
 * @LastEditTime: 2023-11-05 20:39:53
 * @FilePath: \demo-vue\src\views\stressTestPage\components\StressTestPageTable.vue
 * @Description: 压力情景测试的列表
-->
<template>
  <div class="stress-test-page-table table-border">
    <el-table
      :data="tableDataFormat"
      :header-cell-style="headerStyle"
      style="width: 100%"
    >
      <el-table-column prop="date" label="板块" width="150">
        <el-table-column prop="plate_type_name" label="大类"></el-table-column>
        <el-table-column prop="plate_code_name" label="子类"></el-table-column>
      </el-table-column>
      <el-table-column label="压力情景">
        <el-table-column
          v-for="(stressSceneData, key) in tableDataGroupByStressScene"
          :key="key"
          :prop="key"
          :label="key"
        >
          <el-table-column :key="`label_${key}`" :prop="`label_${key}`" />
          <el-table-column :key="`value_${key}`" :prop="`value_${key}`" />
          <el-table-column
            :key="`volatility_down_${key}`"
            :prop="`volatility_down_${key}`"
          />
          <el-table-column
            :key="`volatility_up_${key}`"
            :prop="`volatility_down_${key}`"
          />
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { groupByArray, transform, groupByDeep } from '../utils'
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
      return stressSceneGroup
    },
    // 按压力等级分
    tableDataGroupByPlateCode () {
      // 按stress_scene分组
      const plateCodeResult = groupByArray(this.tableData, 'plate_code')
      const plateCodeGroup = plateCodeResult.arrayGroupByObject
      return plateCodeGroup
    },
    tableDataFormat () {
      const tableDataFormatObj = {}
      for (const key in this.tableDataGroupByPlateCode) {
        tableDataFormatObj[key] = groupByArray(
          this.tableDataGroupByPlateCode[key],
          'stress_scene'
        ).arrayGroupByObject
      }
      // return this.tableData
      const tableDataMap = groupByDeep(
        this.tableData,
        ['plate_type_name', 'plate_code_name'],
        'stress_scene'
      )
      console.log()
      const getDataFormat = (dataArray, key) => {
        const plateTypeName = key.split('#')[0]
        const plateCodeName = key.split('#')[1]
        console.log(dataArray)
        return [
          {
            plate_type_name: plateTypeName,
            plate_code_name: plateCodeName,
            // 轻度压力的计算结果
            label_ModerateStressScene: CALC_LABEL_TYPE1,
            value_ModerateStressScene:
            // 这里期望根据tableType的值来判断用credit_min_profit或market_min_profit
              this.tableType === 'market'
                ? dataArray.MildStressScene[0].market_min_profit
                : dataArray.MildStressScene[0].credit_min_profit,
            volatility_down_ModerateStressScene: VOLATILITY_LABEL,
            volatility_up_ModerateStressScene: VOLATILITY_LABEL,
            // 中度压力数据
            label_SeverStressScene: CALC_LABEL_TYPE1,
            value_SeverStressScene: '123',
            volatility_down_SeverStressScene: VOLATILITY_LABEL,
            volatility_up_SeverStressScene: VOLATILITY_LABEL,
            // 重度压力数据
            label_MildStressScene: CALC_LABEL_TYPE1,
            value_MildStressScene: '123',
            volatility_down_MildStressScene: VOLATILITY_LABEL,
            volatility_up_MildStressScene: VOLATILITY_LABEL
          },
          {
            plate_type_name: plateTypeName,
            plate_code_name: plateCodeName,
            // 轻度压力的计算结果
            label_ModerateStressScene: CALC_LABEL_TYPE1,
            value_ModerateStressScene: '123',
            volatility_down_ModerateStressScene: '-3%',
            volatility_up_ModerateStressScene: '+3%',
            // 中度压力数据
            label_SeverStressScene: CALC_LABEL_TYPE1,
            value_SeverStressScene: '123',
            volatility_down_SeverStressScene: '-3%',
            volatility_up_SeverStressScene: '+3%',
            // 重度压力数据
            label_MildStressScene: CALC_LABEL_TYPE1,
            value_MildStressScene: '123',
            volatility_down_MildStressScene: '-3%',
            volatility_up_MildStressScene: '+3%'
          },
          {
            plate_type_name: plateTypeName,
            plate_code_name: plateCodeName,
            // 轻度压力的计算结果
            label_ModerateStressScene: CALC_LABEL_TYPE2,
            value_ModerateStressScene: '123',
            volatility_down_ModerateStressScene: '-3%',
            volatility_up_ModerateStressScene: '+3%',
            // 中度压力数据
            label_SeverStressScene: CALC_LABEL_TYPE2,
            value_SeverStressScene: '123',
            volatility_down_SeverStressScene: '-3%',
            volatility_up_SeverStressScene: '+3%',
            // 重度压力数据
            label_MildStressScene: CALC_LABEL_TYPE2,
            value_MildStressScene: '123',
            volatility_down_MildStressScene: '-3%',
            volatility_up_MildStressScene: '+3%'
          },
          {
            plate_type_name: plateTypeName,
            plate_code_name: plateCodeName,
            // 轻度压力的计算结果
            label_ModerateStressScene: CALC_LABEL_TYPE2,
            value_ModerateStressScene: '123',
            volatility_down_ModerateStressScene: '-3%',
            volatility_up_ModerateStressScene: '+3%',
            // 中度压力数据
            label_SeverStressScene: CALC_LABEL_TYPE2,
            value_SeverStressScene: '123',
            volatility_down_SeverStressScene: '-3%',
            volatility_up_SeverStressScene: '+3%',
            // 重度压力数据
            label_MildStressScene: CALC_LABEL_TYPE2,
            value_MildStressScene: '123',
            volatility_down_MildStressScene: '-3%',
            volatility_up_MildStressScene: '+3%'
          }
        ]
      }

      const tableDataFormatArray = []
      tableDataMap.forEach((value, key, map) => {
        tableDataFormatArray.push(getDataFormat(value, key))
      })

      return tableDataFormatArray.flat().sort((a, b) => {
        if (a.plate_type_name !== b.plate_type_name) {
          return a.plate_type_name.localeCompare(b.plate_type_name)
        }

        if (a.plate_code_name !== b.plate_code_name) {
          return a.plate_code_name.localeCompare(b.plate_code_name)
        }

        return 0
      })
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
