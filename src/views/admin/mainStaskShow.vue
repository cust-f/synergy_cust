<template>
<div>
    <el-container>
        <el-aside>
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
        <el-main>
            <el-table style="width: 100%" border :data="tableData">
  <template v-for="(item,index) in tableHead">
    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>

  </template>      
  <el-table-column label="操作" min-width="100px" align="center">
       <template >
          <el-button @click="substaskDetail" type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">删除</el-button>
       </template>
    </el-table-column>
</el-table>

<div class="con">
  <span class="demonstration"></span>
  <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
</div>
        </el-main>
    </el-container>
     

</div>
      
</template>

<script>
export default {
  name: "mainStaskShow",
  data() {
    return {
        tableHead:[
            {
                column_name:"Substask_ID",column_comment:"主任务ID"
            },
            {
                column_name:"Substask_Name",column_comment:"主任务名称"
            },
            {
                column_name:"Substask_Type",column_comment:"主任务类别"
            },
            {
                column_name:"Substask_End_Time",column_comment:"主任务截至时间"
            }
        ],
        tableData:[{
            Substask_ID:'0001',
            Substask_Name:'小汽车零件的装配',
            Substask_Type:'零件装配制造',
            Substask_End_Time:'2019-10-17'
        },
        {
            Substask_ID:'0002',
            Substask_Name:'帆船的制造',
            Substask_Type:'中形设备制造',
            Substask_End_Time:'2019-9-15'
        },
        {
            Substask_ID:'0003',
            Substask_Name:'火箭模拟装配',
            Substask_Type:'高端装配制造',
            Substask_End_Time:'2019-12-17'
        }],
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
    };
  },
  methods:{
      /*
      *转跳对应任务信息页面
      */
     substaskDetail(){
         this.$router.push('/substaskDetail')
     }
  }
};
</script>
<style>
.con{
    width:500px;
    height: 1000px;
    margin:0 auto;
    text-align: center
}

</style>
