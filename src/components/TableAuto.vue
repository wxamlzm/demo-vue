<!--
 * @Author: zd
 * @Date: 2024-03-12 13:28:28
 * @LastEditors: zd
 * @LastEditTime: 2024-03-12 13:28:38
 * @Description: 列表自动化的思路
-->

<template>
  <el-table-column
    v-for="(col, index) in tableHeader"
    :key="index"
    :prop="col.prop"
    :label="col.label"
    :align="col.align"
    :width="col.width"
    :column-key="index.toString()"
  >
    <template slot-scope="scope">
      <div v-if="col.label === '品名' && type != 'detail'">
        <el-select
          :ref="'varieties_code' + scope.row.index"
          @change="goodsIdChange(scope.row.index)"
          @focus="goodsfocus(scope.row.index)"
          v-model="scope.row.varieties_code"
          placeholder="请选择"
          filterable
          remote
          :remote-method="remoteMethod"
          size="mini"
          :loading="loading"
        >
          <el-option
            v-for="item in goodsIdList"
            :key="item.varieties_code"
            :label="item.varieties_name + '(' + item.varieties_code + ')'"
            :value="item.varieties_code"
          ></el-option>
        </el-select>
      </div>
      <div v-else-if="col.label === '品名' && type == 'detail'">
        {{ scope.row.varieties_name }} ({{ scope.row.varieties_code }})
      </div>
      <div
        v-else-if="
          scope.row.varieties_code &&
          col.label === '申请上浮比例' &&
          type != 'detail'
        "
      >
        <el-input
          size="mini"
          v-model="scope.row.float_percentage"
          v-limit-input-number="{
            toFixed: 3
          }"
          :custom-validation="/^(\d{1,8}(\.\d{0,4})?)?$/"
          @blur="onfloatPercentageBlur(scope.row)"
        ></el-input>
      </div>

      <div v-else>{{ scope.row[col.prop] }}</div>
    </template>
  </el-table-column>
</template>
