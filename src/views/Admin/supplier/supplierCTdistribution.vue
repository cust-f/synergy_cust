<template>
  <el-container>
    <el-aside width="15%"></el-aside>
    <el-main>
      <div class="supplierTask">
         <el-page-header @back="goBack" content="子任务分配情况">
</el-page-header>
        <h3></h3>
        </div>

<el-form :label-position="labelPosition" :model="form" style="margin: 10px" >

    <el-form-item label="子任务名称：">
    <el-input  style="width: 600px;" v-model="form.tast" :disabled="true" ></el-input>
       </el-form-item>
   
    <el-form-item label="设计人员列表：">
    <el-select style="width: 510px;" v-model="form.region" placeholder="请选择">
      <el-option label="王五" value="wangwu"></el-option>
      <el-option label="陈工" value="chengong"></el-option>
      <el-option label="李想" value="lixing"></el-option>
    </el-select>
    <el-button type="primary">查询</el-button>
    </el-form-item>
    

     
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
      label="子任务名称"
     >
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
      >
      <template slot-scope="scope">
        <el-popover >
         
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
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
  
</el-form>


 <div style="text-align:center">
      <el-button type="primary" style="" @click="queding">确定</el-button>
    <el-button type="primary" style="">关闭</el-button>
  </div> 


        </el-main>
        </el-container>
        </template>
 
 <script>
  export default {
      name:'supplierCTdistribution',
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
          desighstate:'门把手设计图',
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
        form: {
          tast:'整车组装任务图',
         
         
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
      queding() {
        this.$confirm('确定将任务分配给'+'王五'+'吗？', '分配设计任务', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '分配成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消分配'
          });          
        });
      },
      goBack() {
        this.$router.push('/supplierTast');
      }
     }
  }
</script>