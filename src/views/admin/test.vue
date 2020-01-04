<template>
<div>
    <el-container>

        <el-aside>

        </el-aside>

        <el-main>
            <el-form ref="form" :model="form" label-width="110px">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="子项目ID">
                        <el-input v-model="form.id" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="子项目名称">
                        <el-input v-model="form.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="子项目类型">
                        <el-input v-model="form.type" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="子项目结束时间">
                        <el-input v-model="form.endtime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="子项目设计人员">
                        <el-input v-model="form.leader" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="子项目细节">
                        <el-input v-model="form.detail" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="活动名称2">
                        <el-input v-model="form.name2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域2">
                        <el-select v-model="form.region2" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        </el-main>
    </el-container>
  
</div>
    
</template>

<script>
  export default {
      name:"test",
    data() {
      return {
        form: {
          id:'000101',
          name: '小汽车零件的装配',
          type: '零件装配制造',
          endtime: '2019-10-17',
          detail: '人生路上，总会有那么几场疾风骤雨，就像是老天爷在提醒世人，你们是在寄人篱下，要乖乖低头。比如陈平安在泥瓶巷自家门口遇上了个蔡金简，在蛟龙沟遇上法袍金醴的原先主人，误入藕花深处，就迎来了一场宗师联手的围剿。就看熬不熬得过去了。熬过去，雨后天晴，熬不过去，最多也就只能像武夫那般，嚷着十八年后还是条好汉。',
          leader:'陈平安',
        }
      }
    },
  }
</script>