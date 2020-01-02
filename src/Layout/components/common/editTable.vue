<template>
  <div>
    <el-row>
      <el-col span="24">
        <el-table
          size="mini"
          :data="master_user.data"
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
      <el-col span="24">
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
      table: ["子任务编号", "任务名称", "任务类别", "开标时间", "操作"],
      tableDat: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableData: {
        sel: null, //选中行
        columns: [
          { field: "type", title: "远程类型", width: 120 },
          { field: "addport", title: "连接地址", width: 150 },
          { field: "user", title: "登录用户", width: 120 },
          { field: "pwd", title: "登录密码", width: 220 },
          { field: "info", title: "其他信息" }
        ],
        data: []
      }
    };
  },
  methods: {
    //读取表格数据
    readMasterUser() {
      //根据实际情况，自己改下啊
      app.master_user.data.map(i => {
        i.id = generateId.get(); //模拟后台插入成功后有了id
        i.isSet = false; //给后台返回数据添加`isSet`标识
        return i;
      });
    },
    //添加账号
    addMasterUser() {
      for (let i of app.master_user.data) {
        if (i.isSet) return app.$message.warning("请先保存当前编辑项");
      }
      let j = {
        id: 0,
        type: "",
        addport: "",
        user: "",
        pwd: "",
        info: "",
        isSet: true,
        _temporary: true
      };
      app.master_user.data.push(j);
      app.master_user.sel = JSON.parse(JSON.stringify(j));
    },
    //修改
    pwdChange(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of app.master_user.data) {
        if (i.isSet && i.id != row.id) {
          app.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!app.master_user.sel.id) app.master_user.data.splice(index, 1);
        return (row.isSet = !row.isSet);
      }
      //提交数据
      if (row.isSet) {
        //项目是模拟请求操作  自己修改下
        (function() {
          let data = JSON.parse(JSON.stringify(app.master_user.sel));
          for (let k in data) row[k] = data[k];
          app.$message({
            type: "success",
            message: "保存成功!"
          });
          //然后这边重新读取表格数据
          app.readMasterUser();
          row.isSet = false;
        })();
      } else {
        app.master_user.sel = JSON.parse(JSON.stringify(row));
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