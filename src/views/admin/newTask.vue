<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="newTask">
        <h3>招标信息</h3>
        <el-form
          ref="newTask"
          :model="newTask"
          label-width="120px"
          :inline="true"
          label-position="right"
        >
          <el-row>
            <el-form-item label="项目名称">
              <el-input v-model="newTask.name"></el-input>
            </el-form-item>
            <el-form-item label="项目类别">
              <el-select v-model="newTask.region" placeholder="请选择项目类别">
                <el-option label="全部" value></el-option>
                <el-option v-for="tag in statuses" :key="tag" :label="tag" :value="tag"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="总负责人">
              <el-select v-model="newTask.head" placeholder="请选择总负责人">
                <el-option label="全部" value></el-option>
                <el-option v-for="head in personnel" :key="head" :label="head" :value="head"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="投标截止日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newTask.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="开标日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newTask.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="任务详情">
              <el-input
                type="textarea"
                autosize
                v-model="newTask.detail"
                style="width:100%;"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div>
        <h3>子任务信息</h3>
        <edit-table></edit-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import editTable from '../../Layout/components/common/editTable'

export default {
  name: "newTask",
  components:{
    "edit-table":editTable
  },
  data() {
    return {
      personnel: ["张三", "李四"],
      statuses: ["A类别", "B类别"],
      newTask: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        head: "",
        detail: ""
      },
    };
  },
  methods: {
    addChild() {
      this.tableData.push({
        num: "",
        name: "",
        childRegion: "",
        bidTime: ""
      });
    }
  }
};
</script>

<style>
.newTask textarea {
  min-height: 100px !important;
  width: 500px !important;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
</style>