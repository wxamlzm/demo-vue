<!--
 * @Author: zd
 * @Date: 2023-10-25 14:04:45
 * @LastEditors: zd
 * @LastEditTime: 2023-10-27 16:42:09
 * @FilePath: \demo-vue\src\views\stressTestPage\StressTestPage.vue
 * @Description: 压力测试情景
-->

<template>
  <div class="global-c-page otc-pnl-warning">
    <header class="global-c-screen-main">
      <div class="global-c-screen-div global-c-screen-1-line">
        <div class="global-c-screen-left">
          <el-row :gutter="70" type="flex">
            <el-col :span="8">
              <div class="global-c-input-div">
                <div class="global-c-input-lable">业务日期</div>
                <div class="global-c-input-value">
                  <el-date-picker
                    v-model="searchContent.business_date"
                    :clearable="false"
                    value-format="yyyyMMdd"
                    size="mini"
                    type="date"
                    placeholder="请选择开始日期"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="global-c-screen-right">
          <el-button
            icon="el-icon-search"
            size="mini"
            type="primary"
            @click="handleSearchClick"
            >查询</el-button
          >
        </div>
      </div>
    </header>

    <div class="global-c-content-transverse-division" />

    <main class="global-c-div-main" style="overflow: auto">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="市场" name="market">
          <StressTestPageTable
            v-if="activeTab === 'market'"
            :tableData="tableData"
            tableType="credit"
          />
        </el-tab-pane>
        <el-tab-pane label="信用" name="credit"
          ><StressTestPageTable
            v-if="activeTab === 'credit'"
            :tableData="tableData"
            tableType="credit"
        /></el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
// import { listPlateStressTestingResult } from '@/api/otc/stressTestPage.js'
import StressTestPageTable from './components/StressTestPageTable'

// zdtest
import { testData } from './testData'

export default {
  name: 'StressTestPage',

  components: { StressTestPageTable },

  data () {
    return {
      searchContent: {
        business_date: '20230912'
      },
      tableData: testData,

      activeTab: 'market'
    }
  },

  mounted () {
    // this.initPage()
  },

  methods: {
    // async initPage () {
    //   const businessData = this.searchContent.business_date
    //   try {
    //     const res = await listPlateStressTestingResult({
    //       business_date: businessData
    //     })
    //     this.tableData = res
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    // 点击查询
    handleSearchClick () {}
  }
}
</script>
