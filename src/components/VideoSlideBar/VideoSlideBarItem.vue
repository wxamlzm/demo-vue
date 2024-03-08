<!--
 * @Author: zd
 * @Date: 2024-03-08 13:34:13
 * @LastEditors: zd
 * @LastEditTime: 2024-03-08 14:57:11
 * @Description: 视频滑块的Item
-->

<template>
  <div
    :style="{ width: `${width}px`, height: `${height}px` }"
    class="video-slide-bar-item"
    :key="itemKey"
  >
    <div class="video-scan-box">
      <div class="video-scan-item" @click="handleClickDiv">
        <div
          v-if="videoIntro.finish_status === 'Finished'"
          class="global-video-mark-left-top"
        >
          <van-icon name="success" />
        </div>

        <LottieOnLiveBox
          v-if="videoIntro.isOnPlay && curFileType === 'isVideo'"
          class="on-play-icon"
        />
        <img
          v-if="videoIntro.isOnPlay && curFileType !== 'isVideo'"
          :src="require('@/assets/icon/file_on_view.png')"
          alt=""
          class="on-play-icon"
          width="25px"
        />

        <ItemCover :videoOptions="videoIntro" style="height: 54px" />
        <div
          v-if="videoIntro.isOnPlay"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #c6c6cb80;
            top: 0;
            left: 0;
          "
        />
      </div>
    </div>
    <div
      class="global-text-elipsis-line-2"
      style="margin-top: 6px; font-size: 12px; color: #9b9ba5"
    >
      {{ videoIntro.file_name }}
    </div>
  </div>
</template>

<script>
import LottieOnLiveBox from '@/components/lottie/LottieOnLiveBox'
import ItemCover from '@/components/ItemCover'

export default {
  name: 'VideoSlideBarItem',
  components: { ItemCover, LottieOnLiveBox },

  props: {
    videoIntro: {
      type: Object,
      default: () => {}
    },

    width: {
      type: [String, Number],
      default: 0
    },

    height: {
      type: [String, Number],
      default: 0
    }
  },

  data () {
    return {
      itemKey: 0
    }
  },

  computed: {
    // 当前课件类型控制样式类型
    curFileType () {
      const fileTypeStrategies = [
        {
          type: 'isVideo',

          extensions: ['mp4', 'mpg', 'wmv', 'avi', 'video'],

          match (itemType) {
            return this.extensions.includes(itemType)
          }
        },

        {
          type: 'isOther',

          extensions: ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'],

          match (itemType) {
            return this.extensions.includes(itemType)
          }
        }
      ]
      function getMatchedFileType (itemType) {
        const matchedStrategy = fileTypeStrategies.find(strategy =>
          strategy.match(itemType)
        )
        return matchedStrategy ? matchedStrategy.type : 'notMatched'
      }

      const curVideoItemType = this.videoIntro.itemType.toLowerCase()

      return getMatchedFileType(curVideoItemType)
    }
  },

  methods: {
    // 回调：进入视频详情
    handleClickDiv () {
      this.$emit('handleClickDiv')
    }
  }
}
</script>

<style lang="stylus">
.video-slide-bar-item {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;

  .video-scan-box {
    box-sizing: border-box;
    .video-scan-item {
      width:100%;
      position:relative
      border-radius: 8px;
      overflow: hidden;

      .global-video-mark-left-top {
        background-image: linear-gradient(225deg, #69ade4 0%, #3875c5 100%);
      }
    }
    img {
      vertical-align: middle;
    }
  }
}
.video-slide-bar-item + .video-slide-bar-item{
  margin-left: 10px;
}

.on-play-icon {
  position:absolute;
  left:50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index:99
  svg {
    position: absolute;
  }
}
</style>
