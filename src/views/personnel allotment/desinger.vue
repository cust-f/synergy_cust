
<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <el-page-header @back="goBack" content="设计任务"></el-page-header>
        <h3></h3>
      </div>

      <el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 10px">
        <el-form-item label="所有设计任务搜索：">
          <el-input v-model="formLabelAlign.region" placeholder="请输入" style="width: 600px;"></el-input>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item label="所有设计任务列表：">
          <el-table style="width: 100%" border :data="tableData">
            <template v-for="(item,index) in tableHead">
              <el-table-column
                :prop="item.column_name"
                :label="item.column_comment"
                :key="index"
                v-if="item.column_name != 'id'"
              ></el-table-column>
            </template>
            <el-table-column label="操作" min-width="100px" align="center">
              <template>
                <el-button type="text" size="small" >进入工作台</el-button>
                <el-button @click="dialogVisible = true" type="text" size="small">查看任务详情</el-button>
                <el-button type="text" size="small">提交任务</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="con" style="text-align:center">
            <span class="demonstration"></span>
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
          </div>
        </el-form-item>
        <br />
      </el-form>
<!-- 
      <div style="text-align:center">
        <el-button type="primary" style>关闭页面</el-button>
      </div> -->
    </el-main>
    <el-dialog title="设计任务详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div>
        <el-row :gutter="0">
          <el-col :span="8">
            <el-table :data="tableData1">
              <el-table-column prop="personlist" label="人员列表" width="150"></el-table-column>
              <el-table-column prop="level" label="人员等级" width="120"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="16">
            <el-table :data="tableData2" style="width: 100%">
              <el-table-column prop="tasktype" label="任务类型" width="120"></el-table-column>
              <el-table-column prop="servicetask" label="服务任务" width="120"></el-table-column>
              <el-table-column prop="deadline" label="任务截止日期" width="300"></el-table-column>
              <el-table-column prop="designer" label="设计人员" width="120"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>




<script>
export default {
  data() {
    name: "supplierTask";
    return {
      labelPosition: "right",
      formLabelAlign: {},
      tableHead: [
        {
          column_name: "Substask_ID",
          column_comment: "设计任务ID"
        },
        {
          column_name: "Substask_Name",
          column_comment: "设计任务名称"
        },
        {
          column_name: "Substask_Type",
          column_comment: "设计任务类别"
        },
        {
          column_name: "Substask_End_Time",
          column_comment: "设计任务截至时间"
        }
      ],
      tableData: [
        {
          Substask_ID: "0001",
          Substask_Name: "小汽车零件的装配",
          Substask_Type: "零件装配制造",
          Substask_End_Time: "2019-10-17"
        },
        {
          Substask_ID: "0002",
          Substask_Name: "帆船的制造",
          Substask_Type: "中形设备制造",
          Substask_End_Time: "2019-9-15"
        },
        {
          Substask_ID: "0003",
          Substask_Name: "火箭模拟装配",
          Substask_Type: "高端装配制造",
          Substask_End_Time: "2019-12-17"
        }
      ],

    /*   tableData2: [
    //     {
    //       tasktype: "组装",
    //       servicetask: "汽车保险杠",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     },
    //     {
    //       tasktype: "设计",
    //       servicetask: "铣床刀头插口",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     },
    //     {
    //       tasktype: "设计",
    //       servicetask: "机械臂前臂设计",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     },
    //     {
    //       tasktype: "设计",
    //       servicetask: "普陀区",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     },
    //     {
    //       tasktype: "设计",
    //       servicetask: "普陀区",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     },
    //     {
    //       tasktype: "设计",
    //       servicetask: "普陀区",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     },
    //     {
    //       tasktype: "设计",
    //       servicetask: "普陀区",
    //       deadline: "2019-10-08",
    //       designer: 200333
    //     }
    //   ],

    //   tableData1: [
    //     {
    //       personlist: "马工",
    //       level: "高级工程师"
    //     }
    //   ],   
    */
      dialogVisible: false
    };
  },
  methods: {
    // handleEdit(index, row) {
    //   console.log(index, row);
    //   this.$router.push("/supplierCTdistribution")
    // },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleDetail(index, row) {
      this.$router.push("/supplierChildtast");
    },
    goBack() {
      this.$router.push("/#");
    }
  }
};
</script>


