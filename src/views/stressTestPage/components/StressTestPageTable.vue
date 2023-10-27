<!--
 * @Author: zd
 * @Date: 2023-10-25 14:43:45
 * @LastEditors: zd
 * @LastEditTime: 2023-10-27 15:03:41
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\components\StressTestPageTable.vue
 * @Description: 压力情景测试的列表
-->
<template>
  <div class="stress-test-page-table table-border">
    <div class="table-header">
      <div
        :style="{ width: sumCategoryCellWidth }"
        class="category-col table-cell"
      >
        板块
      </div>
      <div class="data-col">
        <div class="table-cell">压力情景</div>
        <div class="sub-header">
          <div :style="{ width: subHeaderWidth }" class="table-cell">
            轻度压力
          </div>
          <div :style="{ width: subHeaderWidth }" class="table-cell">
            中度压力
          </div>
          <div :style="{ width: subHeaderWidth }" class="table-cell">
            重度压力
          </div>
        </div>
      </div>
    </div>

    <div class="table-body" ref="stressTestTableRef" :key="tableKey">
      <StressTestTableMainCategory
        v-for="(mainCategoryDataArray, key) in tableDataGroupBymainCategory"
        v-bind="$attrs"
        :key="key"
        :mainCategoryDataArray="mainCategoryDataArray"
        :mainCategoryName="key"
        @updateLabelWidth="updateLabelWidth"
      />
    </div>
  </div>
</template>

<script>
import StressTestTableMainCategory from './StressTestTableMainCategory'
import { groupByArray } from '../utils'

export default {
  name: 'StressTestPageTable',

  components: { StressTestTableMainCategory },

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
    tableDataGroupBymainCategory () {
      // 按plate_type_name分组
      const plateTypeNameResult = groupByArray(
        this.tableData,
        'plate_type_name'
      )
      const plateTypeNameGroup = plateTypeNameResult.arrayGroupByObject
      return plateTypeNameGroup
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
