<template>
  <div class="container">
    <el-table
      ref="elTable"
      v-loading="loading"
      :data="tableData"
      :row-key="rowKey"
      style="width: 100%"
      @selection-change="selectionChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
    >
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="column.render"
          :key="column.prop"
          :label="column.label"
          :width="column.width"
          align="center"
        >
          <template slot-scope="scope">
            <Render :row="scope.row" :index="index" :render="column.render" />
          </template>
        </el-table-column>
        <el-table-column v-else :key="column.prop" v-bind="setAttrs(column)" />
      </template>
      <!-- table中的默认插槽，不在tabledata中表明相应属性的原因是：那样太麻烦，显得data太臃肿。 -->
      <slot />
    </el-table>
    <!--分页栏-->
    <div class="toolbar">
      <el-pagination
        :page-sizes="pageSizes"
        class="pagination"
        :layout="layout"
        :total="total"
        :page-size="pageQuery.rows"
        :current-page.sync="pageQuery.page"
        @current-change="pageChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>
<script>
import Render from "./Render";

export default {
  name: "Table",
  components: {
    Render,
  },
  props: {
    align: {
      type: String,
      default: "center",
    },
    // table主键
    rowKey: {
      type: String,
      default: "id",
    },
    // 列表数据
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 数据总数
    total: {
      type: Number,
      default: 0,
    },
    // 定义列
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 分页查询参数
    pageQuery: {
      type: Object,
      default: () => ({
        page: 1,
        rows: 10,
      }),
    },
    // 每页条数选择器
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
  },
  data() {
    return {
      downloadLoading: false,
    };
  },
  computed: {
    layout() {
      const layout = ["total", "prev", "pager", "next"];
      if (this.pageSizes.length) {
        layout.push("sizes");
      }
      return layout.join(", ");
    },
  },
  methods: {
    rowDblclick(row) {
      this.$emit("row-dblclick", row);
    },
    rowClick(row, column) {
      let target = this.tableData.findIndex((item) => item.id === row.id);
      this.$refs.elTable.toggleRowSelection(this.tableData[target]);
    },
    // 取消全部选择内容
    setAllSelection(flag) {
      this.$nextTick(() => {
        this.$refs.elTable.clearSelection();
      });
    },
    // 多选切换单行选中状态
    setSelection(row, checked, id) {
      this.$nextTick(() => {
        let target = this.tableData.findIndex((item) => item.id === id);
        this.$refs.elTable.toggleRowSelection(this.tableData[target], checked);
      });
    },
    // 已选项
    selectionChange(selections) {
      this.$emit("selectionChange", selections);
    },
    // 切换页面
    pageChange(page) {
      this.$emit("pageChange", page);
    },
    sizeChange(size) {
      this.$emit("sizeChange", size);
    },
    setAttrs(params) {
      const { slot, ...options } = params;
      if (!options.align) {
        options.align = "center";
      }
      return { ...options };
    },
  },
};
</script>
<style scoped>
.table-img {
  cursor: pointer;
}
.toolbar {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}
.toolbar .handle-wrap {
  position: absolute;
  left: 0;
}
.handle-wrap {
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
}
.table-export_btn {
  margin-left: 15px;
}
</style>
