<!--
 * @Author: zd
 * @Date: 2023-10-26 08:45:23
 * @LastEditors: zd
 * @LastEditTime: 2023-10-27 13:23:06
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\components\StressTestTableMainCategory.vue
 * @Description: 用于渲染压力测试情景页面的大类列表
-->
<template>
  <div class="category-body">
    <!-- 大类 -->
    <div class="table-main-category table-cell">{{ mainCategoryName }}</div>

    <!-- 子类级关联数据的遍历 -->
    <div class="data-panel" ref="mainCategoryPanelRef">
      <div
        v-for="(
          subCategoryDataArray, subCategory
        ) in tableDataGroupBySubCategory"
        :key="subCategory"
      >
        <div style="display: flex">
          <div class="table-cell table-sub-category">{{ subCategory }}</div>
          <StressTestTableSubCategory
            v-bind="$attrs"
            :subCategoryDataArray="subCategoryDataArray"
          />
        </div>
      </div>
      <!-- 合计 -->
      <div style="display: flex">
        <div class="table-cell table-sub-category">合计</div>
        <div style="display: flex">
          <div :style="{ width: stressSceneWidth }" class="table-cell">0</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { groupByArray } from '../utils'
import StressTestTableSubCategory from './StressTestTableSubCategory'

export default {
  name: 'StressTestTableMainCategory',

  components: { StressTestTableSubCategory },

  props: {
    mainCategoryName: {
      type: String,
      default: 'defaultKey'
    },
    mainCategoryDataArray: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      stressSceneWidth: '200px'
    }
  },

  computed: {
    tableDataGroupBySubCategory () {
      // 按plate_type_name分组
      const plateTypeNameResult = groupByArray(
        this.mainCategoryDataArray,
        'plate_code_name'
      )
      const subCategoryGroup = plateTypeNameResult.arrayGroupByObject
      return subCategoryGroup
    }
  },

  watch: {
    stressSceneWidth: {
      handler (stressSceneWidth) {
        this.$emit('updateLabelWidth', stressSceneWidth)
      },
      immediate: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initTablePanel()
    })
  },

  methods: {
    initTablePanel () {
      this.setCellWidth()
    },
    // 累加获得合计宽度
    setCellWidth () {
      const stressTestTableDom = this.$refs.mainCategoryPanelRef
      const calcPanelDom = stressTestTableDom.querySelector('.calc-panel')
      const volatilityPanelDom = stressTestTableDom.querySelector(
        '.volatility-label-panel'
      )
      const calcPanelWidth = calcPanelDom?.offsetWidth
      const volatilityPanelWidth = volatilityPanelDom?.offsetWidth
      const sum = calcPanelWidth + volatilityPanelWidth
      console.log(calcPanelWidth, volatilityPanelWidth)
      this.stressSceneWidth = `${sum}px`
    }
  }
}
</script>

<style lang="stylus">
.category-body {
  display: flex;
}
</style>
