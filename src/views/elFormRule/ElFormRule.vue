<!--
 * @Author: zd
 * @Date: 2023-11-29 13:16:41
 * @LastEditors: zd
 * @LastEditTime: 2023-11-29 13:17:46
 * @FilePath: \demo-vue\src\views\elFormRule\elFormRule.vue
 * @Description: element-ui中的form表单的校验
-->

<template>
  <div>
    <el-form
      v-show="operateType !== 'detail'"
      v-formTab
      ref="optionDetial"
      :model="optionDetialForm"
      :rules="rules"
      size="mini"
      label-width="140px"
      label-position="left"
      class="auto-pricing-option-detail"
    >
      <el-form-item prop="watch_start_date" label="观察开始日">
        <el-date-picker
          v-model="optionDetialForm.watch_start_date"
          :disabled="isEdit"
          type="date"
          placeholder="选择日期"
          format="yyyyMMdd"
          value-format="yyyyMMdd"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ElFormRule',

  data () {
    return {
      rules: {
        watch_start_date: [
          { required: true, message: '请选择观察开始日', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              const startDate = moment(this.optionDetialForm.start_date)
              const watchStartDate = moment(value)
              const endDate = moment(this.optionDetialForm.end_date)
              // 观察开始日需要在开始结束之间
              if (
                watchStartDate.isBefore(startDate) ||
                watchStartDate.isAfter(endDate)
              ) {
                callback(new Error('观察开始日需要在开始结束之间'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  }
}
</script>
