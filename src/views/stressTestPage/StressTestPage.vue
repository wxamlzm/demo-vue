<!--
 * @Author: zd
 * @Date: 2023-10-25 14:04:45
 * @LastEditors: zd
 * @LastEditTime: 2023-11-15 16:10:02
 * @FilePath: \zb-risk-web-dev\src\views\otc\stressTestPage\StressTestPage.vue
 * @Description: 压力测试情景
-->

<template>
  <div
    v-loading="isLoading"
    class="global-c-page otc-stress-test-page"
    style="display: flex; flex-direction: column; height: 100%"
  >
    <header class="global-c-screen-main">
      <div class="global-c-screen-div global-c-screen-1-line">
        <div class="global-c-screen-left">
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
        </div>
        <div class="global-c-screen-right">
          <el-button
            icon="el-icon-download"
            size="mini"
            type="primary"
            @click="onExportClick"
            >导出</el-button
          >
        </div>
      </div>
    </header>

    <div class="global-c-content-transverse-division"></div>

    <main
      class="global-c-table-main"
      style="flex-grow: 1; padding-bottom: 0; height: 0"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="市场" name="market">
          <StressTestPageTable
            v-if="activeTab === 'market'"
            :tableData="tableData"
            :key="tableKey"
            tableType="market"
          />
        </el-tab-pane>
        <el-tab-pane label="信用" name="credit">
          <StressTestPageTable
            v-if="activeTab === 'credit'"
            :tableData="tableData"
            :key="tableKey"
            tableType="credit"
          />
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script>
import { listPlateStressTestingResult } from '@/api/otc/stressTestPage.js'
import {
  downloadExcel,
  tableDomToSheetData,
  mergeDownSheetData,
  sheetDataListToExcel
} from 'yafco-build-excel'
import StressTestPageTable from './components/StressTestPageTable'
import moment from 'moment'

export default {
  name: 'StressTestPage',

  components: { StressTestPageTable },

  data () {
    return {
      activeTab: 'market',
      searchContent: {
        business_date: this.$store.getters.queryDate.toString()
      },
      tableData: [],
      tableKey: 0,
      // 控制加载效果
      isLoading: false
    }
  },

  watch: {
    searchContent: {
      handler (val) {
        this.initPage()
      },
      deep: true
    }
  },

  mounted () {
    this.initPage()
  },

  methods: {
    async initPage () {
      this.isLoading = true
      const businessData = this.searchContent.business_date
      try {
        const res = await listPlateStressTestingResult({
          business_date: businessData
        })
        this.tableData = res
        this.tableKey = Math.random()
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    // 导出
    onExportClick () {
      // 获取表头dom （第二个参数为是否需要获取样式）
      const headerSheet = tableDomToSheetData(
        document.querySelector('.el-table__header'),
        true
      )
      // 获取数据内容
      const dataSheet = tableDomToSheetData(
        document.querySelector('.el-table__body'),
        true
      )
      // 合并sheet
      const sheet = mergeDownSheetData([headerSheet, dataSheet])
      // 下载
      const dateStr = moment(
        this.searchContent.business_date.toString()
      ).format('YYYY-MM-DD')
      downloadExcel(sheetDataListToExcel([sheet]), `压力测试情景${dateStr}`)
    }
  }
}
</script>

<style lang="stylus">
.otc-stress-test-page {
  .el-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

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
