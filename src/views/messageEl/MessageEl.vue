<template>
  <div>
    <el-button @click="isVisible = true">显示弹窗</el-button>
    <MessageDialog :visible.sync="isVisible" @addModel="addModel" />
  </div>
</template>

<script>
import { getCopy } from '@/utils/copy.js'

import MessageDialog from './components/MessageDialog'

export default {
  name: 'MessageEl',

  components: { MessageDialog },

  data () {
    return {
      isVisible: false
    }
  },

  methods: {
    addModel (val) {
      getCopy(val)
    }
  }
}
</script>
