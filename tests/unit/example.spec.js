/*
 * @Author: zd
 * @Date: 2023-12-28 09:30:55
 * @LastEditors: zd
 * @LastEditTime: 2023-12-29 15:42:43
 * @Description:
 */
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

// 这里我们在设法处理因为单组件的测试而引起的store无法在测试文件访问的问题
const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: 'alice'
  }
})

describe('HelloWorld.vue', () => {
  it('renders test when passed', () => {
    const msg = '刷新'
    const wrapper = shallowMount(HomeView, {
      store,
      localVue
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
