<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
        <h3>子任务分配情况</h3>
        </div>
<div style="margin: 10px;border:2px solid #f0f0f4;width: 850px;" >
<el-form :label-position="labelPosition" :model="formLabelAlign" style="margin: 10px" >

    <el-form-item label="子任务名称：">
    <el-input  style="width: 600px;" readonly ></el-input>
    
    </el-form-item>
    <div style="margin-left:150px">

    <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入"
    v-model="value"
    :data="data"

    >
  </el-transfer>
  </div>
  <div style="margin-left:100px;margin-top:5px">
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
      label="子任务名称"
      width="300">
      <template slot-scope="scope">
        <el-popover  >
          
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.desighstate }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="设计人员"
      width="220">
      <template slot-scope="scope">
        <el-popover >
         
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
  
  </el-table>
  </div>
</el-form>
</div>

 <div style="text-align:center">
      <el-button type="primary" style="">确定</el-button>
    <el-button type="primary" style="">关闭</el-button>
  </div> 


        </el-main>
        </el-container>
        </template>
 
 <script>
  export default {
      name:'supplierCT',
    data() {
      const generateData = _ => {
        const data = [];
        const names = ['王五', '陈工', '李想',  '程程'];
        const pinyin = ['wangwu', 'chengong', 'lixing', 'chegncheng'];
        names.forEach((name, index) => {
          data.push({
            label: name,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
        data: generateData(),
        value: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        },
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          desighstate:''
         
        },
         tableData1: [{
          date: '2016-05-02',
          desighstate:'完成没把手设计图',
          name: '王五',
         
        }, {
          date: '2016-05-04',
          desighstate:'底盘设计图',
          name: '王五',
         
        }, {
          date: '2016-05-01',
          desighstate:'前灯设计方案',
          name: '陈工',         
         
        }, {
          date: '2016-05-03',
          desighstate:'整装设备方案图',
          name: '李想',
         
        }],
        
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