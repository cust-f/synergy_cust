<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <el-page-header @back="goBack" content="子任务详细情况">
</el-page-header>
<br/>
        <h3></h3>
        </div>

      
       <el-form   style="margin: 5px" ref="form" :model="form" label-width="110px">
          
            <el-row>
                <el-col :span="8">
                    <el-form-item label="子任务名称：">
                        <el-input v-model="form.tast" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="负责人：">
                        <el-input v-model="form.username" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="子任务介绍：">
                        <el-input style="width:800px" type="textarea" :rows="10"  v-model="form.tastinfo" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>
 
           
<el-table style="width: 100%" border :data="tableData">
  <template v-for="(item,index) in tableHead">
    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>

  </template>      
  <el-table-column label="操作" min-width="100px" align="center">
       <template >
          <el-button @click="distribution" type="text" size="small">下载</el-button>
          <el-button @click="substaskDetail" type="text" size="small">查看详情</el-button>
          
       </template>
    </el-table-column>
</el-table>

  <div class="con" style="text-align:center">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>

</div>
  <br/>
    <div style="text-align:center">
    <el-button type="primary" style="">关闭页面</el-button>
  </div> 

       </el-form>
       
    
    </el-main>
  </el-container>
  </template>

  <script>
  export default {
    name:"supplierChildtast",
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          desighstate:'',
          region: '',
          type: ''
        },
          tableHead:[
            {
                column_name:"Substask_time",column_comment:"上传时间"
            },
            {
                column_name:"Substask_file",column_comment:"文件名称"
            },
            
            
        ],
        tableData:[{
            Substask_time:'2019-02-23',
            Substask_file:'技术文档',
           
            
        },
        {
            Substask_time:'2019-02-23',
            Substask_file:'合同',
           
            
        },
        {
            Substask_time:'2019-02-23',
            Substask_file:'其他文件',
     
            
        }],



         form: {
          tast:'整车组装任务图',
          username: '王虎',
          tastinfo:''
         
        },
         
      };
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
       goBack() {
        this.$router.push('/supplierTast');
      }

    }

  }
</script>