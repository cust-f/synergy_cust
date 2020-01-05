<template>
  <div>
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
            <el-page-header @back="goBack" content="详情页面">
</el-page-header>
 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <el-form ref="form" :model="form" label-width="100px">
            <el-row  :gutter="80">
                <el-col :span="11">
                    <el-form-item label="主项目ID">
                        <el-input v-model="form.id" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="主项目名称">
                        <el-input v-model="form.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="80">
                <el-col :span="11">
                    <el-form-item label="主项目类型">
                        <el-input v-model="form.type" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="主项目结束时间">
                        <el-input v-model="form.endtime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="80">
                <el-col :span="11">
                    <el-form-item label="主项目设计人员">
                        <el-input v-model="form.leader" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="主项目细节">
                        <el-input v-model="form.detail" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="80">
                <el-col :span="11">
                    <el-form-item label="活动名称2">
                        <el-input v-model="form.name2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="活动区域2">
                        <el-select v-model="form.region2" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div id="div2" align="center">
            <el-button type="primary" class="button1">下载装配文档</el-button>
        </div>  
         <el-divider></el-divider>

           <el-table style="width: 100%" border :data="tableData">
  <template v-for="(item,index) in tableHead">
    <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>

  </template>      
  <el-table-column label="操作" min-width="100px" align="center">
       <template >
          <el-button @click="mainStaskDetail" type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">删除</el-button>
       </template>
    </el-table-column>
</el-table>
        </el-main>
    </el-container>
</div>


           
  </div>
</template>




<script>
export default {
    name:'substaskDetail',
    data(){
      return {tableHead:[
            {
                column_name:"Substask_ID",column_comment:"子任务ID"
            },
            {
                column_name:"Substask_Name",column_comment:"子任务名称"
            },
            {
                column_name:"Substask_Type",column_comment:"子任务类别"
            },
            {
                column_name:"Substask_End_Time",column_comment:"子任务截至时间"
            }
        ],
        tableData:[{
            Substask_ID:'000101',
            Substask_Name:'小汽车零件的装配',
            Substask_Type:'零件装配制造',
            Substask_End_Time:'2019-10-17'
        },
        {
            Substask_ID:'000102',
            Substask_Name:'帆船的制造',
            Substask_Type:'零件装配制造',
            Substask_End_Time:'2019-9-15'
        },
        {
            Substask_ID:'000103',
            Substask_Name:'火箭模拟装配',
            Substask_Type:'零件装配制造',
            Substask_End_Time:'2019-12-17'
        }],
          

        form: {
          id:'000101',
          name: '小汽车零件的装配',
          type: '零件装配制造',
          endtime: '2019-10-17',
          detail: '人生路上，总会有那么几场疾风骤雨，就像是老天爷在提醒世人，你们是在寄人篱下，要乖乖低头。比如陈平安在泥瓶巷自家门口遇上了个蔡金简，在蛟龙沟遇上法袍金醴的原先主人，误入藕花深处，就迎来了一场宗师联手的围剿。就看熬不熬得过去了。熬过去，雨后天晴，熬不过去，最多也就只能像武夫那般，嚷着十八年后还是条好汉。',
          leader:'陈平安',
        },
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
        
      }
    },
    methods:{
      /*
      *转跳对应任务信息页面
      */
     mainStaskDetail(){
         this.$router.push('/mainStaskDetail')
     },
     goBack() {
        
        this.$router.push('/mainStaskShow');
      
      }
  }
}
</script>

<style>

</style>