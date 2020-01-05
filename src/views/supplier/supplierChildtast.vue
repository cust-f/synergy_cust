<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <h3>子任务详细情况</h3>
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
 
           
<el-table
    :data="tableData1" border stripe 
    style="width: 100%"
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
      label="文件名称"
      >
      <template slot-scope="scope">
        <el-popover >
          
          <div slot="reference" >
            <el-tag size="medium">{{ scope.row.desighstate }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    
    <el-table-column label="操作" >
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
        }],
         form: {
          tast:'整车组装任务图',
          username: '王虎',
         
        },
         
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