<!--
 * @Author: zd
 * @Date: 2023-10-25 14:04:45
 * @LastEditors: zd
 * @LastEditTime: 2023-11-08 09:48:00
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\StressTestPage.vue
 * @Description: 压力测试情景
-->

<template>
  <el-tabs v-model="activeTab" class="otc-stress-test-page" type="border-card">
    <el-tab-pane label="市场" name="market">
      <StressTestPagePanel :activeTab="activeTab" />
    </el-tab-pane>
    <el-tab-pane label="信用" name="credit" lazy>
      <StressTestPagePanel :activeTab="activeTab" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import StressTestPagePanel from './components/StressTestPagePanel'

// zdtest
// import { testData } from './testData'

export default {
  name: 'StressTestPage',

  components: { StressTestPagePanel },

  data () {
    return {
      activeTab: 'market'
    }
  }
}
</script>

<style lang="stylus">
.otc-stress-test-page {
  padding: 10px;
  background-color $global-v-background-color;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;

  .el-tabs__content {
    flex-grow:1;
    height:0;
    background-color: #FFF;
  }

  .el-tab-pane {
    height: 100%;
  }

}
</style>
