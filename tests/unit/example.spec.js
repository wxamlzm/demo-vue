import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView.vue', () => {
  it('renders the correct text', () => {
    const wrapper = shallowMount(HomeView)
    expect(wrapper.text()).toBe('这是首页')
  })
})
