<!--
 * @Author: zd
 * @Date: 2024-03-08 13:25:16
 * @LastEditors: zd
 * @LastEditTime: 2024-03-08 15:41:37
 * @Description: 视频滑块
-->

<template>
  <div class="video-slide-bar" ref="videoSlideBarRef">
    <div class="video-slide-bar-item-box">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoSlideBar',

  props: {
    initIndex: {
      type: Number,
      default: 0
    },
    itemWidth: {
      type: Number,
      default: 0
    }
  },

  watch: {
    initIndex: {
      handler (initIndex) {
        this.$nextTick(() => {
          const width = initIndex * this.itemWidth

          const maxScrollLeft =
            this.$refs.videoSlideBarRef.scrollWidth -
            this.$refs.videoSlideBarRef.clientWidth

          // 确保滚动位置在有效范围内

          const clampedWidth = Math.min(width, maxScrollLeft)
          if (clampedWidth >= 0) {
            this.$refs.videoSlideBarRef.scrollLeft = clampedWidth
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
.video-slide-bar {
  width: 100%;
  overflow-x: auto;
  .video-slide-bar-item-box {
    display: flex;
    flex-wrap: nowrap
  }
}
</style>
