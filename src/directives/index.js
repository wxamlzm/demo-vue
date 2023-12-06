/*
 * @Author: zd
 * @Date: 2023-03-27 16:41:13
 * @LastEditors: zd
 * @LastEditTime: 2023-12-06 16:50:39
 * @Description: 指令
 */
import Vue from 'vue'

// 获取当前操作是上向下滑动还是向上滑动
Vue.directive('swipe', {
  bind (el, binding) {
    let startY = 0
    let endY = 0
    el.addEventListener('touchstart', e => {
      startY = e.touches[0].pageY
    })
    el.addEventListener('touchmove', e => {
      endY = e.touches[0].pageY
    })
    el.addEventListener('touchend', e => {
      if (endY === 0) return
      const distance = endY - startY
      if (distance > 0) {
        binding.value('down') // 向下滑动
      } else {
        binding.value('up') // 向上滑动
      }
    })
  }
})

// 禁用滑动
Vue.directive('disableTouchMove', {
  bind (el, binding) {
    const preventDefault = e => {
      e.preventDefault()
    }
    el.addEventListener('touchmove', preventDefault, { passive: false })
  }
})

// 模拟拖动
Vue.directive('drag', {
  bind (el, binding) {
    let startX, startY
    const handleTouchStart = event => {
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    }
    const handleTouchMove = event => {
      if (!startX || !startY) {
        return
      }
      const currentX = event.touches[0].clientX
      const currentY = event.touches[0].clientY
      const deltaX = currentX - startX
      const deltaY = currentY - startY
      binding.value({
        el,
        event,
        startX,
        startY,
        currentX,
        currentY,
        deltaX,
        deltaY
      })
    }
    const handleTouchEnd = event => {
      startX = null
      startY = null
    }
    el.addEventListener('touchstart', handleTouchStart)
    el.addEventListener('touchmove', handleTouchMove)
    el.addEventListener('touchend', handleTouchEnd)
    return {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    }
  },
  unbind (
    el,
    bindings,
    vnode,
    oldVnode,
    { handleTouchStart, handleTouchMove, handleTouchEnd }
  ) {
    el.removeEventListener('touchstart', handleTouchStart)
    el.removeEventListener('touchmove', handleTouchMove)
    el.removeEventListener('touchend', handleTouchEnd)
  }
})

// 滚轴事件
Vue.directive('scroll', {
  bind (el, binding) {
    let scrollTopBefore = el.scrollTop
    const onScroll = () => {
      const scrollTopAfter = el.scrollTop
      const innerClientHeight =
        el.getElementsByTagName('section')[0].clientHeight
      const outerClientHeight = el.clientHeight

      // const misLen = 100
      if (scrollTopBefore < 0) {
        scrollTopBefore = scrollTopAfter
        return
      }
      if (scrollTopBefore + outerClientHeight > innerClientHeight) {
        // alert('miss')
        scrollTopBefore = scrollTopAfter
        return
      }

      if (scrollTopBefore > scrollTopAfter) {
        // alert(`up${innerClientHeight}, ${scrollTopBefore}, ${outerClientHeight}`)
        binding.value('up')
      } else {
        binding.value('down')
      }
      scrollTopBefore = scrollTopAfter
    }
    el.addEventListener('scroll', onScroll)
  },

  unbind (el, bindings, vnode, oldVnode, { onScroll }) {
    el.removeEventListener('scroll', onScroll)
  }
})
