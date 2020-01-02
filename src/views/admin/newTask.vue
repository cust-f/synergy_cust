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
        <el-button style="float:right;" @click="addChild()">新增</el-button>
        <el-row>
          <el-table :data="tableData" class="tb-edit" style="width: 100%" highlight-current-row>
            <el-table-column label="子任务编号" width="180">
              <template slot-scop="scope">
                <el-input size="small" v-model="scope.row.num" placeholder="请输入内容"></el-input>
                <span>{{tableData.num}}</span>
              </template>
            </el-table-column>
            <el-table-column label="任务名称" width="180">
              <template slot-scop="scope">
                <el-input size="small" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                <span>{{tableData.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="任务类别">
              <template slot-scop="scope">
                <el-select v-model="childRegion" placeholder="请选择项目类别">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="tag in statuses" :key="tag" :label="tag" :value="tag"></el-option>
                </el-select>
                <span>{{tableData.childRegion}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="bidTime" label="开标时间">
              <template slot-scop="scope">
                <el-input size="small" v-model="scope.row.bidTime" placeholder="请输入内容"></el-input>
                <span>{{tableData.bidTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scop="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "newTask",
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
      tableData: [
        {
          num: "00001",
          name: "默认",
          childRegion: "全部",
          bidTime: "2018-08-12"
        },
        {
          num: "00001",
          name: "默认",
          childRegion: "全部",
          bidTime: "2018-08-12"
        },
        {
          num: "",
          name: "",
          childRegion: "",
          bidTime: ""
        }
      ],
      childRegion: ""
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