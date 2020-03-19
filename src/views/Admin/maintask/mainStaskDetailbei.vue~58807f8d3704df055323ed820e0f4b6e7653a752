<template>
<div>
    <el-container>


        <el-main style="overflow:hidden">
          <el-page-header @back="goBack" content="详情页面">
</el-page-header>
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;

            <el-form ref="form" :model="mainStask" labael-width="110px">
            <el-row >
                
                <el-col :span="11">
                    <el-form-item label="分解任务名称">
                        <el-input v-model="mainStask.taskName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="分解任务状态">
                        <el-input v-model="mainStask.taskState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row >
                <el-col :span="11">
                    <el-form-item label="分解任务类型" >
                        <el-input v-model="mainStask.type" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="任务类型">
                        <el-input v-model="mainStask.taskType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

           
<!-- v-bind:value="cool.deadline | formatDate" -->
             <el-row >
                <el-col :span="11">
                    <el-form-item label="发布时间">
                        <el-input v-bind:value="mainStask.publishTime | formatDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="截止时间">
                        <el-input v-bind:value="mainStask.deadline | formatDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

            <el-row >
                <el-col :span="11">
                    <el-form-item label="开始时间">
                        <el-input v-bind:value="mainStask.beginTime | formatDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="完成时间">
                        <el-input v-bind:value="mainStask.finishTime | formatDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >

            <el-row >
                <el-col :span="11">
                    <el-form-item label="发布企业名称">
                        <el-input v-model="mainStask.companyName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="接受企业名称">
                        <el-input v-model="mainStask.supplierName" :disabled="true"></el-input>
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
<!-- <h3>供应方设计</h3>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; -->
              <div>


    <!-- <div class="container">
      <div class="handle-box">

      </div>

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="供应商名称"></el-table-column>

        <el-table-column prop="bussessType" label="任务类型"></el-table-column>

        <el-table-column prop="date" label="开始时间"></el-table-column>
                <el-table-column prop="money" label="完成时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
         
          <el-button @click="mainStaskDetail" type="text" size="small">查看</el-button>
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
    </div> -->

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
import  Qs from 'qs';
import {formatDate} from "./dataChange";
  export default {
      name:"mainStaskDetail",
    data() {
      return {
        dialogVisible: false,

        mainStask: {
          taskName:"",
          taskState:'',
          type:'汽车零部件',
          taskType:'',
          publishTime:'',
          deadline:'',
          beginTime:'',
          finishTime:'',
          companyName:'',
          supplierName:'',

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
          money: "2020-2-12",
          state: "成功",
          date: "2019-11-1"
        },
      ],
      addList: {
        id: null,
        address: "",
        name: "",
        money: null,
        state: null,
        date: null
      },  
      multipleSelection: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      taskId:''
      }
    },

    filters:{
      formatDate(time){
        let date = new Date(time);
      return formatDate(date, "yyyy.MM.dd");
      }
    },
    created() {
      this.getParams();
      this.showData();
    },
    methods:{
      getParams() {
  
      var routerParams = this.$route.query.taskId
      this.taskId = routerParams
      console.log(routerParams)

    },

      showData(){
            console.log(this.taskId);
      var that = this;
      var data = Qs.stringify({
        subStaskID : this.taskId
      });
      console.log(data);
      that
        .axios({
          method: 'post',
          url: "http://127.0.0.1:8082/SubstaskInformation/list",
          data: data,

          // data:this.$store.state.userName
        })
        .then(response => {
           console.log(response)
           console.log(response.data.allData);
        });
      },
      goBack() {
         this.$router.push({
        path:"/admin/substaskDetail",
        query:{
          mainTaskID : this.mainTaskID
        }
        });
  
      }
    }
  }
</script>

<style>
.table{
  font-size: 14px;
}
    
</style>
