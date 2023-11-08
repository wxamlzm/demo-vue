<!--
 * @Author: zd
 * @Date: 2023-10-25 14:04:45
 * @LastEditors: zd
 * @LastEditTime: 2023-11-08 10:45:54
 * @FilePath: \zb-risk-web-testing\src\views\otc\stressTestPage\components\StressTestPagePanel.vue
 * @Description: 压力测试情景
-->

<template>
  <div style="height: 100%; display: flex; flex-direction: column">
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
              <el-button
                icon="el-icon-search"
                size="mini"
                type="primary"
                @click="initPage"
                >查询</el-button
              >
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

    <main style="overflow: auto; flex-grow: 1; height: 0">
      <StressTestPageTable
        v-if="activeTab === 'market'"
        :tableData="tableData"
        :tableType="activeTab"
        :key="tableKey"
      />
      <StressTestPageTable
        v-if="activeTab === 'credit'"
        :tableData="tableData"
        :tableType="activeTab"
        :key="tableKey"
      />
    </main>
  </div>
</template>

<script>
import { listPlateStressTestingResult } from '@/api/otc/stressTestPage.js'
import StressTestPageTable from './StressTestPageTable'
import {
  downloadExcel,
  tableDomToSheetData,
  mergeDownSheetData,
  sheetDataListToExcel
} from 'yafco-build-excel'
import moment from 'moment'

export default {
  name: 'StressTestPage',

  components: { StressTestPageTable },

  props: {
    activeTab: {
      type: String,
      default: 'market'
    }
  },

  data () {
    return {
      searchContent: {
        business_date: '20230912'
      },
      tableData: [],
      tableKey: 0
    }
  },

  mounted () {
    this.initPage()
  },

  methods: {
    async initPage () {
      const businessData = this.searchContent.business_date
      try {
        const res = await listPlateStressTestingResult({
          business_date: businessData
        })
        this.tableData = res
        this.tableKey = Math.random()
      } catch (err) {
        console.log(err)
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
