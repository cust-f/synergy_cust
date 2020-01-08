<template>
  <el-container>
    <el-aside width="3%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <h3>设计任务</h3>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 30px">
            <el-form-item label="未接受设计任务列表：">
              <el-table style="width: 100%" border :data="no_accepted_tableData">
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
              <el-table style="width: 100%" border :data="accepted_tableData">
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
                    <el-button @click="handleDetail" type="text" size="small">进入工作台</el-button>
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
            <el-table style="width: 100%" border :data="tableData_finished">
              <template v-for="(item,index) in tableHead_finished">
                <el-table-column
                  :prop="item.column_name"
                  :label="item.column_comment"
                  :key="index"
                  v-if="item.column_name != 'id'"
                  align="center"
                ></el-table-column>
              </template>
              <el-table-column label="操作" min-width="50px" align="center">
                  <template>
                    <el-button type="text" size="small">下载图纸</el-button>
                  </template>
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

    <el-dialog title="设计任务详情" :visible.sync="dialogVisible" width="60%" >
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="设计任务ID">
                <el-input v-model="form.Desinger_ID" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="设计任务名称">
                <el-input v-model="form.Desinger_Name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="设计任务类型">
                <el-input v-model="form.Desinger_Type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form.Desinger_End_Time" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="设计任务详情">
              <el-input
              :disabled="true"
                type="textarea"
                :rows="7"
                v-model="form.Desinger_Task_Details"
                style="width:100%;"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
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
      formLabelAlign1:{},
      tableHead: [
        {
          column_name: "Desinger_ID",
          column_comment: "设计任务ID"
        },
        {
          column_name: "Desinger_Name",
          column_comment: "任务名称"
        },
        {
          column_name: "Desinger_Type",
          column_comment: "任务类别"
        },
        {
          column_name: "Desinger_End_Time",
          column_comment: "截至时间"
        }
      ],
      tableHead_finished: [
        {
          column_name: "Desinger_ID",
          column_comment: "设计任务ID"
        },
        {
          column_name: "Desinger_Name",
          column_comment: "任务名称"
        },
        {
          column_name: "Desinger_Type",
          column_comment: "任务类别"
        },
        {
          column_name: "Desinger_Finish_Time",
          column_comment: "完成时间"
        },
        {
          column_name: "Desinger_Completion_Status",
          column_comment: "完成状态"
        }
      ],
      no_accepted_tableData: [
        {
          Desinger_ID: "0001",
          Desinger_Name: "大汽车零件的装配",
          Desinger_Type: "零件装配制造",
          Desinger_End_Time: "2019-10-17"
        },
        {
          Desinger_ID: "0002",
          Desinger_Name: "大帆船的制造",
          Desinger_Type: "中形设备制造",
          Desinger_End_Time: "2019-9-15"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "大火箭模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_End_Time: "2019-12-17"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "铁轨零件制造",
          Desinger_Type: "高端装配制造",
          Desinger_End_Time: "2019-12-17"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "武器装备模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_End_Time: "2019-12-17"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_End_Time: "2019-12-17"
        }
      ],
      accepted_tableData: [
        {
          Desinger_ID: "0001",
          Desinger_Name: "小汽车零件的装配",
          Desinger_Type: "零件装配制造",
          Desinger_End_Time: "2019-10-17"
        },
        {
          Desinger_ID: "0002",
          Desinger_Name: "小帆船的制造",
          Desinger_Type: "中形设备制造",
          Desinger_End_Time: "2019-9-15"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "小火箭模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_End_Time: "2019-12-17"
        }
      ],
      tableData_finished: [
        {
          Desinger_ID: "0003",
          Desinger_Name: "大火箭模拟装配",
          Desinger_Type: "高端装配制造",
          Desinger_Finish_Time: "2019-12-17",
          Desinger_Completion_Status: "已完成"
        },
        {
          Desinger_ID: "0003",
          Desinger_Name: "铁轨零件制造",
          Desinger_Type: "高端装配制造",
          Desinger_Finish_Time: "2019-12-17",
          Desinger_Completion_Status: "已完成"
        }
      ],
      form: {
        name: "123456"
      },
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
      this.$router.push("/admin/personnel_allotment/virtualMachine");
    },
    goBack() {
      this.$router.push("/#");
    }
  }
};
</script>
