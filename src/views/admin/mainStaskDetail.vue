<template>
<div>
    <el-container>

        <el-aside width="15%" style="overflow:hidden">
            <div class="backGround_0">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史记录</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多详情</el-button>
            </div>
            <div v-for="o in tenderTrendsList" :key="o" class="text item">
                {{ o }}
            </div>  
        </el-card>
      </div>
        </el-aside>

        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面">
</el-page-header>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;

            <el-form ref="form" :model="form" label-width="110px">
            <el-row >
                <el-col :span="11">
                    <el-form-item label="子项目ID">
                        <el-input v-model="form.id" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="子项目名称">
                        <el-input v-model="form.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="11">
                    <el-form-item label="子项目类型" >
                        <el-input v-model="form.type" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="子项目结束时间">
                        <el-input v-model="form.endtime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="11">
                    <el-form-item label="设计人员">
                        <el-input v-model="form.leader" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="子项目细节">
                        <el-input v-model="form.detail" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

             <el-row >
                <el-col :span="11">
                    <el-form-item label="设计任务状态">
                        <el-input v-model="form.designState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="评价状态">
                        <el-input v-model="form.remakeState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

            <el-row >
                <el-col :span="11">
                    <el-form-item label="完成状态">
                        <el-input v-model="form.completionState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="项目截至日期">
                        <el-input v-model="form.deadLine" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

            <el-row >
                <el-col :span="11">
                    <el-form-item label="主任务名称">
                        <el-input v-model="form.mainTaskName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="任务类别">
                        <el-input v-model="form.mainTaskType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

            <el-row >
                <el-col :span="11">
                    <el-form-item label="开始时间">
                        <el-input v-model="form.beginTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="投标截止时间">
                        <el-input v-model="form.endTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

            
             

        </el-form>

        <div align="right">   
              <!-- <el-button type="primary" class="button1" @click="dialogVisible = true">分配设计人员</el-button> -->
            <el-button type="primary" class="button1">下载设计文档</el-button>
                        <el-button type="primary" class="button1">下载合同</el-button>
        </div>

         <el-divider></el-divider>
<h3>供应商设计</h3>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
              <div>


    <div class="container">
      <div class="handle-box">

        <!-- <el-button type="primary" class="handle-del mr10" @click="addData">新增</el-button> -->
      </div>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column label="订单金额">
          <template slot-scope="scope">￥{{scope.row.money}}</template>
        </el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>

        <el-table-column prop="date" label="任务完成时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
          <el-button @click="mainStaskDetail" type="text" size="small">下载图纸</el-button>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
 
    <!-- 新增弹出框
    <el-dialog title="新增" :visible.sync="addVisible" width="50%">
      <el-form ref="form" :model="addList" label-width="70px">
        <el-form-item label="企业名称">
          <el-input v-model="addList.name"></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input v-model="addList.address"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="addList.money"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addList.state" placeholder="请选择状态">
            <el-option label="成功" value="成功"></el-option>
            <el-option label="失败" value="失败"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addList.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
        </el-main>
    </el-container>

  <el-dialog
  title="人员分配"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="handleClose">
  <div>
   <el-row :gutter="0">
      <el-col :span="8">
  <el-table
    :data="tableData1"
    >
    <el-table-column
      prop="personlist"
      label="人员列表"
      width="150">
    </el-table-column>
      <el-table-column
        prop="level"
        label="人员等级"
        width="120">
      </el-table-column>
  </el-table>
      </el-col>
      <el-col :span="16">
  <el-table
  :data="tableData2"
    style="width: 100%">
  
        <el-table-column
          prop="tasktype"
          label="任务类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="servicetask"
          label="服务任务"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deadline"
          label="任务截止日期"
          width="300">
        </el-table-column>
        <el-table-column
          prop="designer"
          label="设计人员"
          width="120">
        </el-table-column>
</el-table>
      </el-col>
   </el-row>
</div>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

</div>
    
</template>

<script>
  export default {
      name:"mainStaskDetail",
    data() {
      return {
        dialogVisible: false,

        form: {
          id:'000101',
          name: '小汽车零件的装配',
          type: '零件装配制造',
          endtime: '2019-10-17',
          detail: '人生路上，总会有那么几场疾风骤雨，就像是老天爷在提醒世人，你们是在寄人篱下，要乖乖低头。比如陈平安在泥瓶巷自家门口遇上了个蔡金简，在蛟龙沟遇上法袍金醴的原先主人，误入藕花深处，就迎来了一场宗师联手的围剿。就看熬不熬得过去了。熬过去，雨后天晴，熬不过去，最多也就只能像武夫那般，嚷着十八年后还是条好汉。',
          leader:'陈平安',
          designState:'设计完成',
          remakeState:'评价完成',
          completionState:'已完成',
          deadLine:'2022-12-5',
          mainTaskName:'汽车装配制造',
          mainTaskType:'大型交通工具制造',
          beginTime:'2019-10-15',
          endTime:'2019-12-18'

          
        },
                query: {
        pageIndex: 1,
        pageSize: 10
        },
        tableData: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          name: "长光电子",
          money: 30000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "卫星微型零件制作",
          name: "长光电子",
          money: 5000,
          state: "成功",
          date: "2019-11-1"
        },
        {
          id: 1,
          bussessType: "导弹装配与改革",
          name: "长光电子",
          money: 7000,
          state: "成功",
          date: "2019-11-1"
        }
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },
        
        tenderTrendsList:[
        { column_name: "黄河远上白云间" },
        { column_name: "九曲黄河万里沙" },
        { column_name: "君不见黄河之水天上来"},
        { column_name: "白日依山尽，黄河入海流"},
        { column_name: "黄河落天走东海，万里尘沙入胸怀"},
        { column_name: "明月隐高树，长河没晓天"},
        { column_name :"萧萧远树疏林外，一半秋山带夕阳。"},
        { column_name: "黄河西来决昆仑，咆哮万里触龙门。"}
         ],
                 multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
      }
    },
    methods:{
      goBack() {
        this.$router.push('/substaskDetail');
      }
    }
  }
</script>

<style>
    
</style>
