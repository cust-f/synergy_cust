<template>
  <div class="gobla">
    <el-row :gutter="12">
      <el-col :span="20" push="2" pull="2">
        <el-col :span="18">
          <div class="cardgroup">
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '20px 10px 20px' }">
                <div class="inline">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </div>
                <div class="title" @click="achieve">哈尔滨科大志远科技有限公司</div>
                <div class="design">行业分类：交通运输设备</div>
                <el-button type="warning" round class="designbutten" size="small">进入详情</el-button>
              </el-card>
            </el-col>
            <el-col :span="20" push="6">
              <div class="page">
                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>热门企业</span>
              </div>

              <div class="hotCompany">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="hotCompanyimage"
                />
                <div class="hotCompanyDesign" @click="achieve">哈尔滨科大志远科技有限公司</div>
              </div>

              <div class="hotCompany">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="hotCompanyimage"
                />
                <div class="hotCompanyDesign" @click="achieve">哈尔滨科大志远科技有限公司</div>
              </div>

              <div class="hotCompany">
                <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="hotCompanyimage"
                />
                <div class="hotCompanyDesign" @click="achieve">哈尔滨科大志远科技有限公司</div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "excellentCompany"
};
</script>
<style>
.page {
  float: left;
  position: relative;
  top: 50px;
}
.gobla {
  padding: 0 15px;
}

.image {
  width: 80%;
  /* height: 110px; */
}
.hotCompany {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
.hotCompanyimage {
  width: 20%;
  /* height: 110px; */
}

.inline {
  width: 50%;
  float: left;
}
.designbutten {
  position: relative;
  top: 30px;
  float: left;
}
.design {
  position: relative;
  top: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
}
.title {
  position: relative;
  top: 20px;
  float: top, left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  color: dodgerblue;
}
.hotCompanyDesign {
  width: 60%;
  top: 5px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  float: right;
}
</style>
