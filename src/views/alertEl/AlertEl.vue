<!--
 * @Author: zd
 * @Date: 2024-01-03 09:27:31
 * @LastEditors: zd
 * @LastEditTime: 2024-01-03 09:37:28
 * @Description: 
-->
<template>
  <div>
    <el-form>
      <el-form-item>
        <input type="text" @input="showAlert" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AlertEl',

  methods: {
    showAlert () {
      this.$alert('测试焦点返回', '测试', {
        confirmButtonText: '确定'
      })
    }
  }
}
</script>
