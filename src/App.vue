<!--
 * @Description: 
 * @Autor: shen
 * @Date: 2020-07-28 17:45:39
 * @LastEditTime: 2020-08-24 20:12:13
-->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <STable
      ref="table"
      v-loading="tableLoading"
      :tableData="tableData"
      :pageQuery="pageQuery"
      :total="total"
      rowId="id"
      :columns="tableColumn"
      @selectionChange="selectionChange"
      @getList="getList"
      @pageChange="pageChange"
      @sizeChange="sizeChange"
    >
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="{ row }">
          <el-button size="small" type="text" @click="fileManage(row)">文件管理</el-button>
          <el-button size="small" type="text" @click="getProjectInfo(row)">项目信息</el-button>
          <el-button size="small" type="text" @click="deleteRow(row, deleteSure, '是否删除此项目')">删除</el-button>
        </template>
      </el-table-column>
    </STable>
  </div>
</template>

<script>
import PageMixin from "./mixins/pageMixin";
export default {
  name: "app",
  mixins: [PageMixin],
  data() {
    return {
      tableColumn: [
        { type: "index", label: "序号" },
        {
          prop: "name",
          label: "项目名称",
          render(h, params) {
            return h(
              "div",
              {
                style: {
                  color: "red",
                },
              },
              params.row.name
            );
          },
        },
        { prop: "projectManager", label: "项目经理" },
        { prop: "projectLocation", label: "项目地址" },
        { prop: "phoneNum", label: "联系电话" },
        { prop: "description", label: "项目概况" },
      ],
      requestFlag: false,
      tableData: [
        {
          name: "测试项目名称",
          projectManager: "项目经理-申先生",
          projectLocation: "项目地址-北京市西二旗",
          phoneNum: "774779341",
          description: "面向表格编程",
        },
      ],
    };
  },
  methods: {
    fileManage() {
      console.log("文件管理");
    },
    getProjectInfo() {
      console.log("查看项目信息");
    },
    deleteProject() {
      console.log("删除项目");
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
