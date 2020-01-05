<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <h3>子任务详细情况</h3>
        </div>

    <div style="margin: 10px;border:2px solid #f0f0f4;width: 850px;">
      
       <el-form   style="margin: 10px" >
            <div style="margin: 5px;border:2px solid #f0f0f4;width: 350px;">
   <el-form-item style="margin: 5px; "  label="子任务名称:"><el-form-item label="门把手设计任务">
         </el-form-item>   
   </el-form-item>
       </div>
       <div style="margin: 5px;border:2px solid #f0f0f4;width: 350px;">
       <el-form-item style="margin: 5px;" label="发布任务企业："> <el-form-item label="中国创造科技集团">  
             </el-form-item>  
  </el-form-item>
 
           </div>
<el-table
    :data="tableData1" border stripe 
    style="width: 680px;" >
    <el-table-column
      label="发布日期"
      width="150">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="文件名称"
      width="300">
      <template slot-scope="scope">
        <el-popover >
          
          <div slot="reference" >
            <el-tag size="medium">{{ scope.row.desighstate }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="success"
          @click="labelPosition(scope.$index, scope.row)">下载</el-button>
        <el-button
          size="mini"
          type="info"
          @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        
      </template>
    </el-table-column>
  </el-table><br/>
    <div style="text-align:center">
    <el-button type="primary" style="">关闭页面</el-button>
  </div> 

       </el-form>
       
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
          desighstate:'技术文档',
          
        }, {
          date: '2016-05-04',
          desighstate:'合同',
          
        }, {
          date: '2016-05-01',
          desighstate:'设计图纸',
         
        }, {
          date: '2016-05-03',
          desighstate:'其他文件',
        }]
         
      };
    },
     methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }

  }
</script>