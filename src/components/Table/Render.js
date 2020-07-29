/*
 * @Description:
 * @Autor: shen
 * @Date: 2020-07-28 17:59:13
 * @LastEditTime: 2020-07-28 18:20:11
 */

export default {
  functional: true, //函数化开关
  props: {
    row: Object,
    render: Function,
  },
  render: (h, ctx) => {
    // h是createElement函数，ctx是指当前实例
    let params = {
      row: ctx.props.row,
    }
    return ctx.props.render(h, params)
  },
}
