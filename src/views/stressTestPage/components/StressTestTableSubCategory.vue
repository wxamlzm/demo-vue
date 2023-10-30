<!--
 * @Author: zd
 * @Date: 2023-10-26 09:51:37
 * @LastEditors: zd
 * @LastEditTime: 2023-10-27 15:04:01
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\components\StressTestTableSubCategory.vue
 * @Description: 渲染压力测试情景的子类数据的列表组件
-->
<template>
  <div style="display: flex">
    <!-- 轻度 -->
    <StressTestTableStressScene
      v-bind="$attrs"
      :stressSceneDataArray="tableDataGroupByStressScene.MildStressScene"
    />
    <!-- 中度 -->
    <StressTestTableStressScene
      v-bind="$attrs"
      :stressSceneDataArray="tableDataGroupByStressScene.ModerateStressScene"
    />
    <!-- 重度 -->
    <StressTestTableStressScene
      v-bind="$attrs"
      :stressSceneDataArray="tableDataGroupByStressScene.QuantileDownSever"
    />
  </div>
</template>

<script>
import { groupByArray } from '../utils'
import StressTestTableStressScene from './StressTestTableStressScene'

export default {
  name: 'StressTestTableSubCategory',

  components: { StressTestTableStressScene },

  props: {
    subCategoryDataArray: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    tableDataGroupByStressScene () {
      // 按stress_scene分组
      const plateTypeNameResult = groupByArray(
        this.subCategoryDataArray,
        'stress_scene'
      )
      const stressSceneGroup = plateTypeNameResult.arrayGroupByObject
      return stressSceneGroup
    }
  }
}
</script>
