<!--
 * @Author: zd
 * @Date: 2023-10-25 14:43:45
 * @LastEditors: zd
 * @LastEditTime: 2023-10-30 22:31:24
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
        <el-table-column prop="test1" label="大类"></el-table-column>
        <el-table-column prop="test2" label="子类"></el-table-column>
      </el-table-column>
      <el-table-column label="压力情景">
        <el-table-column
          v-for="(stressSceneData, key) in tableDataGroupByStressScene"
          :key="key"
          :prop="key"
          :label="key"
        >
          <el-table-column
            :key="`volatility_value_${key}`"
            prop="test11"
            label=""
          />
          <el-table-column
            :key="`volatility_value_${key}`"
            prop="test12"
            label=""
          />
          <el-table-column
            :key="`credit_min_profit_${key}`"
            prop="test13"
            label=""
          />
          <el-table-column
            :key="`credit_min_profit_${key}`"
            prop="test14"
            label=""
          />
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { groupByArray } from '../utils'

export default {
  name: 'StressTestPageTable',

  props: {
    tableData: {
      type: Array,
      default: () => []
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
      const result = []

      Object.keys(tableDataFormatObj).forEach(scene => {
        tableDataFormatObj[scene].forEach(config => {
          let newConfig = { ...config }
          let key = `stress_scene_${scene}`
          newConfig[key] = newConfig['stress_scene']
          delete newConfig['stress_scene']
          result.push(newConfig)
        })
      })
      console.log(tableDataFormatObj)
      // return this.tableData
      return [{ test1: '测试1' }]
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
