<!--内部审核组件-->
<template>
  <div class="InternalAudit">
    <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">人员分配与审核</div>
    <br />
    <el-table
      :data="InternalAudit"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="taskName" label="需求名称" width="240"></el-table-column>
      <el-table-column prop="supplierCheckDesignState" width="120" label="审核状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.supplierCheckDesignState === 0">待提交</el-tag>
          <el-tag type="warning" v-else-if="scope.row.supplierCheckDesignState === 1">待审核</el-tag>
          <el-tag type="success" v-else-if="scope.row.supplierCheckDesignState === 2">通过</el-tag>
          <el-tag type="danger" v-else-if="scope.row.supplierCheckDesignState === 3">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="designerName" width="80" label="设计师" align="center">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.designerName === 0">暂未分配设计人员</el-span>
          <el-span v-else>{{scope.row.designerName}}</el-span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadDesignTime" label="设计上传时间"  width="120">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.uploadDesignTime === 0">暂未上传</el-span>
          <el-span v-else>{{scope.row.uploadDesignTime | formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column prop="supplierCheckDesignTime" label="审核时间">
        <template slot-scope="scope">
          <el-span v-if="+scope.row.supplierCheckDesignTime === 0">暂未审核</el-span>
          <el-span v-else>{{scope.row.supplierCheckDesignTime| formatDate}}</el-span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" >
        <template slot-scope="scope">
          <div v-show="scope.row.supplierCheckDesignState ===0">
            <div v-if="scope.row.supplierDistributionState === 0">
              <el-button @click="assignDesigners(scope.row)" type="text" size="small">分配设计人员</el-button>
            </div>
          </div>
          <div v-show="scope.row.supplierCheckDesignState > 0">
            <el-button @click="LJTZ(scope.row)" type="text" size="small">查看成果</el-button>
          </div>
          <div v-show="scope.row.supplierCheckDesignState === 1">
            <el-button @click="designSuccess(scope.row)" type="text" size="small">通过</el-button>
            <el-button @click="designRefuse(scope.row)" type="text" size="small">拒绝</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配设计人员 -->
    <el-dialog :visible.sync="dialogTableVisible" width="350px">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">分配设计师</div>
      <br />
      <br />
      <el-form>
        <el-form-item label="设计师">
          <el-select v-model="design1" placeholder="请选择分配人员">
            <el-option
              v-for="designName in designTask"
              :key="designName.realName"
              :label="designName.realName"
              :value="designName.userName"
              @change = see(design1)
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="tijiao()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 拒绝设计原因 -->
    <el-dialog :visible.sync="designRefuseReason" width="50%" class="refuseDialog">
      <div class="biaoti" style="padding: 0 10px; border-left: 3px solid #4e58c5;">设计拒绝原因</div>
      <br />
      <el-form ref="applyList4" :model="addList4" label-width="0px">
        <el-row>
          <el-col :span="24" style="width:100%">
            <el-form-item>
              <el-input type="textarea" rows="3" v-model="addList4.SJrefuseReason" placeholder="请输入设计拒绝原因" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="designRefuseReason = false">取 消</el-button>
        <el-button type="primary" @click="SJJJYYTJ()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";
import { formatDate } from "../design/designDetails/dataChange";
export default {
  data() {

    return {
      mustHaveSomeThing: 0,
      taskId: 0,
      //设计人员
      design1: "",
      designTask: [],
      // formLabelWidth: "100px",
      userName: sessionStorage.getItem("ms_username"),
      InternalAudit: [],
      //拒绝设计原因
      addList4: {
        SJrefuseReason: "",
      },
      //设计人员分配
      dialogTableVisible: false,
      designRefuseReason: false,
    };
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
  methods: {
    see(msg){
      console.log("msg")
    },
    //获得信息
    getMsg(msg) {
      this.InternalAudit = msg;
      this.getParams();
    },
    getParams() {
      var routerParams = this.$route.query.taskId;
      this.taskId = routerParams;
    },
     passwordRequest(value){
      console.log("进来了")
      console.log("名字："+this.usernameX+"密码："+value)
      var that = this;
        var data = Qs.stringify({
            username: this.userName,
          });
           that
            .axios({
              method: "post",
              url: "api/users/isTrue",
              data: data,
            })
            .then((response) => {
            console.log(response.data.allData)
            if (response.data.allData == value) {
              this.ispassWord=true;
                this.$message({
                  type: "success",
                  message: "验证成功",
                });
              }else {
                this.$message({
                  type: "warning",
                  message: "验证失败",
                });
                 this.ispassWord=false;
              }
        });
    },
     JumpToVirtualmachine(row){
      console.log(row.gitadress);
      window.open(row.gitadress,'_blank')
    },
    //跳转虚拟机
    LJTZ(row) {
      this.$prompt('请输入密码', '提示', {
      showInput:true,
      inputType: 'password',
      // inputValidator: validator,
      inputPattern:/^[A-Za-z0-9]+$/,
      inputErrorMessage: '请输入正确密码！',
      confirmButtonText: '确定',
      showClose: false,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      // center: true
        }).then(({ value }) => {
          this.passwordRequest(value);
          setTimeout(() => {
          if(this.ispassWord==true){
              this.JumpToVirtualmachine(row);
          }
          },100);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消查看'
          });       
        });
    },
    //设计通过
    designSuccess(row) {
      this.$confirm("确定将设计审核通过么？", "提示", {
        type: "warning",
      }).then(() => {
        var that = this;
        var data = Qs.stringify({
          taskID: this.taskId,
          designCount: row.designCount,
          userName: this.userName,
        });
        that.axios({
          method: "post",
          url: "/api/supplier/designSuccess",
          data: data,
        });
        this.$message({
          message: "审核通过",
          type: "success",
        });
        // this.$router.go(0);
        setTimeout(() => {this.$router.go(0);}, 1000);
      });
    },
    //设计不通过
    designRefuse(row) {
      this.designRefuseReason = true;
    },
    //分配设计人员
    assignDesigners() {
      this.dialogTableVisible = true;
      var that = this;
      var data = Qs.stringify({
        userName: this.userName,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/findDesigner",
          data: data,
        })
        .then((response) => {
          this.designTask = response.data.allData.a;
          // this.designTask.id = response.data.allData.b;
        });
    },
    //分配设计人员上传
    tijiao() {
      var that = this;
      var data = Qs.stringify({
        userName: this.design1,
        taskId: this.taskId,
      });
      that
        .axios({
          method: "post",
          url: "/api/supplier/assignDesigners",
          data: data,
        })
        .then((response) => {
          this.$message.success("提交成功");
          this.dialogTableVisible = false;
        });
      this.$router.go(0);
    },
    //提交拒绝原因
    SJJJYYTJ() {
      if (this.addList4.SJrefuseReason == "") {
        this.$message.error("请输入拒绝原因");
      } else {
        var that = this;
        var data = Qs.stringify({
          taskId: this.taskId,
          HTrefuseReason: this.addList4.SJrefuseReason,
          userName: this.userName,
        });

        that.axios({
          method: "post",
          url: "/api/supplier/designRefuse",
          data: data,
        });
        this.$message.success("提交成功");
        this.addList4 = {};
        this.designRefuseReason = false;
        this.$router.go(0);
      }
    },
  },
};
</script>

<style lang="scss">
.InternalAudit {
  .table {
    font-size: 13px;
  }
  .biaoti {
    font-size: 18px;
    color: #303133;
  }
  .el-input.is-disabled .el-input__inner {
    color: #606266;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }

  .el-step__title.is-process {
    color: #f15e09;
    border-color: #f15e09;
  }
  .el-dialog__header {
    padding: 0px 0px 0px;
  }
}
</style>
<style>
.refuseDialog .el-dialog__body {
  padding-bottom: 0px;
}
.refuseDialog .el-dialog__footer {
  padding-top: 0px;
}
</style>