
<template>
  <el-container>
    <el-aside width="3%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <el-page-header @back="goBack" content="流通任务"></el-page-header>
        <h3></h3>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 30px">
            <el-form-item label="未接受流通任务列表：">
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
            <el-form-item label="已接受流通任务列表：">
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
          <el-form-item label="已完成流通任务列表：">
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

    <el-dialog title="流通任务详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="流通任务ID">
                <el-input v-model="form.Circulation_ID" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="流通任务名称">
                <el-input v-model="form.Circulation_Name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="流通任务类型">
                <el-input v-model="form.Circulation_Type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="11">
              <el-form-item label="截止日期">
                <el-input v-model="form.Circulation_End_Time" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="流通任务详情">
              <el-input
                type="textarea"
                :rows="7"
                v-model="form.Circulation_Task_Details"
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
      tableHead: [
        {
          column_name: "Circulation_ID",
          column_comment: "流通任务ID"
        },
        {
          column_name: "Circulation_Name",
          column_comment: "任务名称"
        },
        {
          column_name: "Circulation_Type",
          column_comment: "任务类别"
        },
        {
          column_name: "Circulation_End_Time",
          column_comment: "截至时间"
        }
      ],
      tableHead_finished: [
        {
          column_name: "Circulation_ID",
          column_comment: "流通任务ID"
        },
        {
          column_name: "Circulation_Name",
          column_comment: "任务名称"
        },
        {
          column_name: "Circulation_Type",
          column_comment: "任务类别"
        },
        {
          column_name: "Circulation_Finish_Time",
          column_comment: "完成时间"
        },
        {
          column_name: "Circulation_Completion_Status",
          column_comment: "完成状态"
        }
      ],
      no_accepted_tableData: [
        {
          Circulation_ID: "0001",
          Circulation_Name: "大汽车零件的装配",
          Circulation_Type: "零件装配制造",
          Circulation_End_Time: "2019-10-17"
        },
        {
          Circulation_ID: "0002",
          Circulation_Name: "大帆船的制造",
          Circulation_Type: "中形设备制造",
          Circulation_End_Time: "2019-9-15"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "大火箭模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "铁轨零件制造",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "武器装备模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        }
      ],
      accepted_tableData: [
        {
          Circulation_ID: "0001",
          Circulation_Name: "小汽车零件的装配",
          Circulation_Type: "零件装配制造",
          Circulation_End_Time: "2019-10-17"
        },
        {
          Circulation_ID: "0002",
          Circulation_Name: "小帆船的制造",
          Circulation_Type: "中形设备制造",
          Circulation_End_Time: "2019-9-15"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "小火箭模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_End_Time: "2019-12-17"
        }
      ],
      tableData_finished: [
        {
          Circulation_ID: "0003",
          Circulation_Name: "大火箭模拟装配",
          Circulation_Type: "高端装配制造",
          Circulation_Finish_Time: "2019-12-17",
          Circulation_Completion_Status: "已完成"
        },
        {
          Circulation_ID: "0003",
          Circulation_Name: "铁轨零件制造",
          Circulation_Type: "高端装配制造",
          Circulation_Finish_Time: "2019-12-17",
          Circulation_Completion_Status: "已完成"
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
      this.$router.push("/supplierChildtast");
    },
    goBack() {
      this.$router.push("/#");
    }
  }
};
</script>


