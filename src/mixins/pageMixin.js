export default {
  data() {
    return {
      // table分页查询参数
      pageQuery: {
        page: 1,
        rows: 10,
      },
      total: 0,
      // 请求方法，在api文件封装
      request: null,
      tableLoading: false,
      tableData: [],
      //是否一进来就请求
      requestFlag: true,
      // 多选数组
      selectedList: [],
      // 单选
      radioRow: {},
      // 默认封装的table
      tableType: 'ele',
      // 多选数组
      selectedList: [],
    }
  },
  mounted() {
    //有些页面不希望一进去就直接请求数据，设置requestFlag为false，则为手动触发
    if (this.requestFlag) {
      this.getList()
    }
  },
  methods: {
    selectionChange(selections) {
      this.selectedList = selections
      //暂时关闭跨页多选
      return
      if (this.selectedList.length > 0) {
        let copy = this.selectedList.filter(
          (item) => item.page !== this.pageQuery.page
        )
        copy.push(...selections)
        this.selectedList = copy
      } else {
        this.selectedList = selections
      }
    },
    // 清空选中状态
    setAllSelection() {
      this.selectedList = []
      if (this.$refs.table) {
        this.$refs.table.setAllSelection(false)
      }
    },
    radioChange(row) {
      this.radioRow = row
    },
    reset() {
      this.setAllSelection()
      if (this.$refs.pageQuery) {
        this.$refs.pageQuery.resetFields()
      }
      this.clear()
      this.search()
    },
    // 删除:一般用于删除行
    deleteRow(row, callBack, text) {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          callBack(row)
        })
        .catch(() => {
          console.log('取消')
        })
    },
    // 查询
    search() {
      this.pageQuery.page = 1
      this.getList()
    },
    // 页码切换
    pageChange(page) {
      this.pageQuery.page = page
      this.getList()
    },
    // 每页条数切换
    sizeChange(size) {
      this.pageQuery.rows = size
      this.getList()
    },
    // 获取列表数据
    getList() {
      if (!this.request || typeof this.request !== 'function') {
        this.$message.error('请传递请求函数')
        return
      }
      this.tableLoading = true
      this.request(this.pageQuery)
        .then((res) => {
          // 基于接口统一处理
          this.tableLoading = false
          this.tableData = res.data.list || []
          //每个数据新增页码标志：便于对比
          this.tableData.forEach((e) => {
            e.page = this.pageQuery.page
          })
          this.total = res.data.total ? res.data.total : 0
          // 选中本页之前选中的数据：暂时关闭
          return
          let selectedListCopy = this.selectedList.filter(
            (item) => item.page === this.pageQuery.page
          )
          for (let item of selectedListCopy) {
            this.$refs.table.setSelection(item, true, item.id)
          }
        })
        .catch((error) => {
          this.tableLoading = false
        })
    },
  },
}
