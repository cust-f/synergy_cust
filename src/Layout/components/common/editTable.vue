<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table
          size="mini"
          :data="tableData.data"
          border
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column
            v-for="v in tableData.columns"
            :key="v.title"
            :prop="v.field"
            :label="v.title"
            :width="v.width"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input size="mini" placeholder="请输入内容" v-model="tableData.sel[v.field]"></el-input>
              </span>
              <span v-else>{{scope.row[v.field]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span
                class="el-tag el-tag--info el-tag--mini"
                style="cursor: pointer;"
                @click="pwdChange(scope.row,scope.$index,true)"
              >{{scope.row.isSet?'保存':"修改"}}</span>
              <span
                v-if="!scope.row.isSet"
                class="el-tag el-tag--danger el-tag--mini"
                style="cursor: pointer;"
              >删除</span>
              <span
                v-else
                class="el-tag el-tag--mini"
                style="cursor: pointer;"
                @click="pwdChange(scope.row,scope.$index,false)"
              >取消</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <div class="el-table-add-row" style="width: 99.2%;" @click="addMasterUser()">
          <span>+ 添加</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "editTable",
  data() {
    return {
      tableData: {
        sel: null, //选中行
        columns: [
          { field: "num", title: "子任务编号", width: 120 },
          { field: "name", title: "任务名称", width: 150 },
          { field: "types", title: "任务类别", width: 120 },
          { field: "bidTime", title: "开标时间", width: 220 }
        ],
        data: []
      }
    };
  },
  methods: {
    // //读取表格数据
    // readMasterUser() {
    //   //根据实际情况，自己改下啊
    //   this.tableData.data.map(i => {
    //     i.id = generateId.get(); //模拟后台插入成功后有了id
    //     i.isSet = false; //给后台返回数据添加`isSet`标识
    //     return i;
    //   });
    // },
    //添加账号
    addMasterUser() {
      for (let i of this.tableData.data) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑项");
      }
      let j = {
        num: 0,
        type: "",
        name: "",
        bidTime: "",
        isSet: true
      };
      this.tableData.data.push(j);
      this.tableData.sel = JSON.parse(JSON.stringify(j));
    },
    //修改
    pwdChange(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of this.tableData.data) {
        if (i.isSet && i.id != row.id) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!this.tableData.sel.id) this.tableData.data.splice(index, 1);
        return (row.isSet = !row.isSet);
      }
      //提交数据
      if (row.isSet) {
        //项目是模拟请求操作  自己修改下
          let data = JSON.parse(JSON.stringify(this.tableData.sel));
          for (let k in data) row[k] = data[k];
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          //然后这边重新读取表格数据
          //this.readMasterUser();
          row.isSet = false;
        
      } else {
        this.tableData.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    }
  }
};
</script>

<style scoped>
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