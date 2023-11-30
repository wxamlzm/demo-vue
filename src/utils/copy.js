import { Message } from 'element-ui'

// 复制方法
export const getCopy = text => {
  // 兼容复制
  const reg = /(https):\/\/([\w.]+\/?)\S*/
  if (reg.test(window.location.href)) {
    getCopyNew(text)
  } else {
    getCopyOld(text)
  }
}
// 复制：兼容http下的复制，可能很快就不支持了
export const getCopyOld = text => {
  try {
    // 存储传递过来的数据
    const OrderNumber = text
    // 创建一个input 元素
    // createElement() 方法通过指定名称创建一个元素
    const newInput = document.createElement('textarea')
    // 讲存储的数据赋值给input的value值
    newInput.value = OrderNumber
    // appendChild() 方法向节点添加最后一个子节点。
    document.body.appendChild(newInput)
    // 选中input元素中的文本
    // select() 方法用于选择该元素中的文本。
    newInput.select()
    // 执行浏览器复制命令
    //  execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令
    const isCopySuccess = document.execCommand('Copy')
    // 清空输入框
    newInput.remove()
    if (isCopySuccess) {
      // 下面是element的弹窗 不需要的自行删除就好
      Message.success('复制成功')
    } else {
      throw new Error('复制失败')
    }
  } catch (err) {
    Message.error('复制异常，请重新尝试')
  }
}
// 复制：新接口的API；受浏览器策略影响
export const getCopyNew = text => {
  try {
    navigator.clipboard.writeText(text)
    Message.success('复制成功')
  } catch (err) {
    Message.error('复制失败！ 可能没开权限 请手打命令吧')
  }
}
