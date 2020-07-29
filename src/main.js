/*
 * @Description:
 * @Autor: shen
 * @Date: 2020-07-28 17:45:39
 * @LastEditTime: 2020-07-29 10:09:37
 */

import Vue from 'vue'
import App from './App.vue'
import {
  Table,
  TableColumn,
  Pagination,
  Loading,
  Message,
  Button,
} from 'element-ui'
import STable from './components/Table'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)
Vue.use(Loading)
Vue.prototype.$message = Message
Vue.use(STable)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
