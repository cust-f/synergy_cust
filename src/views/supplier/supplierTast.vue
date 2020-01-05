
<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <h3>任务列表</h3>
        </div>


<el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 10px" >
   
  <el-form-item label="所有任务搜索：">
    <el-input v-model="formLabelAlign.region"  placeholder="请输入" style="width: 600px;"></el-input>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
  <el-form-item label="所有任务列表：">
<el-table
    :data="tableData1" border stripe 
    >
    <el-table-column
      label="发布日期"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

        <el-table-column
      label="任务名称"
      >
      <template slot-scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.tastname }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="状态"
      >
      <template slot-scope="scope">
        <el-popover >
         
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.desighstate }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="负责人"
      >
      <template slot-scope="scope">
        <el-popover >
         
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
         <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">分配人员</el-button>
        <el-button
          size="mini"
          @click="handleDetail(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  </el-form-item>
  <br/>

</el-form>

 <div style="text-align:center">
    <el-button type="primary" style="">关闭页面</el-button>
  </div> 
    </el-main>
   </el-container>
</template>




<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          desighstate:'',
          region: '',
          type: ''
        },
         tableData1: [{
          date: '2016-05-02',
          tastname:'整车组装任务图',
          desighstate:'完成',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          tastname:'整车组装任务图',
          desighstate:'未完成',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          tastname:'整车组装任务图',
          desighstate:'未分配',
          name: '王小虎',         
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          tastname:'整车组装任务图',
          desighstate:'未分配',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
         
      };
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push("/supplierCTdistribution")
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleDetail(index,row) {
        this.$router.push("/supplierChildtast")
      }
    }

  }
</script>


