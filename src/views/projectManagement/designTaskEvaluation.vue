<template>
<div>
    <el-container>
        <el-aside>
            <div class="backGround_0">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>历史评价</span>
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
          <el-button @click="supplyDetail" type="text" size="small">查看详情</el-button>
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
  name: "supplyBussess",
  data() {
    return {
        tableHead:[
            {
                column_name:"Remark_ID",column_comment:"评价ID"
            },
            {
                column_name:"Design_ID",column_comment:"设计任务ID"
            },
            {
                column_name:"Trade_Time",column_comment:"评价时间"
            },
            {
                column_name:"Remark_State",column_comment:"评价状态"
            }
        ],
        tableData:[{
            Remark_ID:'01',
            Design_ID:'02',
            Trade_Time:'2019-03-13',
            Remark_State:'已评价',
        },
        {
            Remark_ID:'02',
            Design_ID:'02',
            Trade_Time:'2019-03-13',
            Remark_State:'已评价',
            
        },
        {
            Remark_ID:'01',
            Design_ID:'02',
            Trade_Time:'2019-03-13',
            Remark_State:'已评价',
            
        },
                {
            Remark_ID:'01',
            Design_ID:'02',
            Trade_Time:'2019-03-13',
            Remark_State:'已评价',
            
        },        {
            Remark_ID:'01',
            Design_ID:'02',
            Trade_Time:'2019-03-13',
            Remark_State:'已评价',
            
        },],
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
     supplyDetail(){
         this.$router.push('/designTaskEvaluationDetils')
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