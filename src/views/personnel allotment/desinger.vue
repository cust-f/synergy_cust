
<template>
  <el-container>
    <el-aside width="3%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <el-page-header @back="goBack" content="设计任务"></el-page-header>
        <h3></h3>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 30px">
            <el-form-item label="未接受设计任务列表：">
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
                    <el-button type="text" size="small">接受任务</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="con" style="text-align:center; height=15px">
                <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 30px">
            <el-form-item label="已接受设计任务列表：">
              <el-table style="width: 100%" border :data="tableData">
                <template v-for="(item,index) in tableHead">
                  <el-table-column
                    :prop="item.column_name"
                    :label="item.column_comment"
                    :key="index"
                    v-if="item.column_name != 'id'"
                    min-width="90px"
                    align="center"
                  ></el-table-column>
                </template>
                <el-table-column label="操作" min-width="70px" align="center">
                  <template>
                    <el-button type="text" size="small">进入工作台</el-button>
                    <el-button @click="dialogVisible = true" type="text" size="small">查看任务详情</el-button>
                    <el-button type="text" size="small">提交任务</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="con" style="text-align:center; height=15px">
                <!-- <span class="demonstration"></span> -->
                <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
            <el-divider></el-divider>
      <el-row>
        <el-form :label-position="labelPosition" :model="formLabelAlign1" style="margin: 10px">
          <el-form-item label="已完成设计任务列表：">
            <el-table style="width: 100%" border :data="tableData">
              <template v-for="(item,index) in tableHead">
                <el-table-column
                  :prop="item.column_name"
                  :label="item.column_comment"
                  :key="index"
                  v-if="item.column_name != 'id'"
                ></el-table-column>
              </template>
              <el-table-column label="状态" min-width="100px" align="center">
                <template></template>
              </el-table-column>
            </el-table>

            <div class="con" style="text-align:center">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </div>
          </el-form-item>
          <br />
        </el-form>
      </el-row>

    </el-main>
    <el-aside width="3%"></el-aside>
    <el-dialog title="设计任务详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="设计任务ID">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
          column_comment: "任务名称"
        },
        {
          column_name: "Substask_Type",
          column_comment: "任务类别"
        },
        {
          column_name: "Substask_End_Time",
          column_comment: "截至时间"
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

      tableData2: [
        {
          tasktype: "组装",
          servicetask: "汽车保险杠",
          deadline: "2019-10-08",
          designer: 200333
        },
        {
          tasktype: "设计",
          servicetask: "铣床刀头插口",
          deadline: "2019-10-08",
          designer: 200333
        },
        {
          tasktype: "设计",
          servicetask: "机械臂前臂设计",
          deadline: "2019-10-08",
          designer: 200333
        },
        {
          tasktype: "设计",
          servicetask: "普陀区",
          deadline: "2019-10-08",
          designer: 200333
        },
        {
          tasktype: "设计",
          servicetask: "普陀区",
          deadline: "2019-10-08",
          designer: 200333
        },
        {
          tasktype: "设计",
          servicetask: "普陀区",
          deadline: "2019-10-08",
          designer: 200333
        },
        {
          tasktype: "设计",
          servicetask: "普陀区",
          deadline: "2019-10-08",
          designer: 200333
        }
      ],
      form: {
        name: "123456"
      },
      // tableData1: [
      //   {
      //     personlist: "马工",
      //     level: "高级工程师"
      //   }
      //],
      dialogVisible: false
    };
  },
  methods: {
    // handleEdit(index, row) {
    //   console.log(index, row);
    //   this.$router.push("/supplierCTdistribution")
    // },
    onSubmit() {
      console.log(123);
    },
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


