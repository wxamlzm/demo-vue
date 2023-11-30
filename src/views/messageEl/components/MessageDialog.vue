<template>
  <el-dialog :visible.sync="visibleCopy">
    <el-button @click="onClick">提交</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: 'MessageDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    visibleCopy: {
      get () {
        return this.visible
      },

      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },

  methods: {
    onClick () {
      setTimeout(() => {
        this.$message({ message: '保存成功！', type: 'success' })

        this.$emit('addModel', '这是测试')
      }, 1000)
    }
  }
}
</script>
