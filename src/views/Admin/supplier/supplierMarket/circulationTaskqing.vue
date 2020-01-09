<template>
  
    <el-container>
      <el-main style="overflow:hidden">
        <el-page-header @back="goBack" content="任务详情"></el-page-header>
        <br />
        
        <el-form ref="form" :model="form" label-width="110px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="任务ID">
                <el-input v-model="form.id" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务名称">
                <el-input v-model="form.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="任务类型">
                <el-input v-model="form.type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="任务截止时间">
                <el-input v-model="form.endtime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="负责人员">
                <el-input v-model="form.leader" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="负责人电话">
                <el-input v-model="form.leaderTel" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="发布任务企业">
                <el-input v-model="form.company" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="需要数量">
                <el-input v-model="form.number" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col  width="100%">
              <el-form-item label="任务细节">
               <el-input type="textarea" :rows="3" style="width:90%" v-model="form.detail" :disabled="true"></el-input>
                   
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="80"></el-row>
        </el-form>

        <div align="right">
         <!-- <el-button type="primary" class="button1">下载图纸</el-button>-->
          <el-button type="primary" class="button1">下载相关文档</el-button>
           <el-divider></el-divider>
        </div>
        <h3>二级供应商列表</h3>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      

      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="bname" label="企业名称" ></el-table-column>
       <el-table-column prop="tastname" label="任务名称" ></el-table-column>
        
        <el-table-column prop="name" label="负责人" align="center"></el-table-column>
        <el-table-column prop="bussessType" label="任务类型"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
            >{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="任务完成时间" ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <!-- <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button> -->
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          <el-button @click="mainStaskDetail" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      
      </el-main>
    </el-container>
  
</template>

<script>
export default {
  name: "circulationTaskqing",
  data() {
    return {
      dialogTableVisible: false,
      dialogVisible: false,

      form: {
        id: "100035",
        name: "小汽车零件的装配",
        type: "零件装配制造",
        endtime: "2019-10-17",
        detail:
          "",
        leader: "陈平安",
        company: "一汽大众",
        number: "40000件",
        leaderTel: "18088675187"
      },
      formLabelWidth: "120px",
      tableData: [
        {
          id: 1,
          bussessType: "车间零部件生产",
          bname: "精密制造厂",
          name: "张亮",
          tastname: "小型车辆车顶设计",
          state: "进行中",
          date: "2019-11-1"
        },
        {
          id: 2,
          bussessType: "卫星微型零件制作",
          bname: "赛轮空管制造厂",
          name: "李鹏",
          tastname: "小型车辆车顶设计",
          state: "进行中",
          date: "2019-11-1"
        },
        {
          id: 3,
          bussessType: "导弹装配与改革",
          bname: "东方电线制造厂",
          name: "王星",
          tastname: "小型车辆车顶设计",
          state: "进行中",
          date: "2019-11-1"
        }
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/admin/circulationTaskq");
    },
  }
};
</script>

<style>
</style>
