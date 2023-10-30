<!--
 * @Author: zd
 * @Date: 2023-10-27 14:27:31
 * @LastEditors: zd
 * @LastEditTime: 2023-10-27 15:16:27
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\components\StressTestTableStressScene.vue
 * @Description: 按压力来分的面板
-->

<template>
  <div>
    <div style="display: flex">
      <div class="calc-panel" style="display: flex">
        <div class="table-cell table-label">计算结果</div>
        <div class="table-cell table-value">{{ calcValue }}</div>
      </div>
      <div
        class="volatility-label-panel"
        style="display: flex; flex-direction: column"
      >
        <div class="table-cell">波动率涨跌</div>
        <div style="display: flex">
          <div class="table-cell table-value">-3%</div>
          <div class="table-cell table-value">-3%</div>
        </div>
      </div>
    </div>
    <div style="display: flex">
      <div class="" style="display: flex">
        <div class="table-cell table-label">标的价格涨跌</div>
        <div>
          <div class="table-cell table-value">20%分位数(标的价格下跌情形)</div>
          <div class="table-cell table-value">80%分位数(标的价格上涨情形)</div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column">
        <div style="display: flex">
          <div class="table-cell table-value">-3%</div>
          <div class="table-cell table-value">-3%</div>
        </div>
        <div style="display: flex">
          <div class="table-cell table-value">-3%</div>
          <div class="table-cell table-value">-3%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StressTestTableStressScene',

  props: {
    stressSceneDataArray: {
      type: Array,
      default: () => []
    },
    tableType: {
      type: String,
      default: ''
    }
  },

  computed: {
    // 提取渲染数据
    // 计算结果根据tabletype来确定用市场还是信用
    calcValue () {
      if (this.tableType === 'market') {
        return this.stressSceneDataArray[0].market_min_profit
      } else {
        return this.stressSceneDataArray[0].credit_min_profit
      }
    }
    // 标的价格下跌情形和标的价格上涨情形对应的值
  }
}
</script>
