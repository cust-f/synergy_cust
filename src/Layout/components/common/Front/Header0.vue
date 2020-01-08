<template>
    <div>


        <el-row gutter="20">
            <el-col :span="20" :push="2" :pull="2" >
                <div class="elcolCSS0 bg-purple-dark">

                    <div class="CSS1">
                        <div class="CSS1Child0">
                            <span>欢迎访问&nbsp;<font class="fontStyle">高端装备制造领域的科技服务SaaS应用构建以及示范</font></span>
                        </div>
                        <div class="CSS1Child1">
                            <ul class="ulCSS">
                                <li><a href="#home">登录</a>&nbsp;</li>
                                <el-divider direction="vertical"></el-divider>
                                <li><a href="#news">&nbsp;联系客服&nbsp;</a></li>
                                <li><a href="#contact">&nbsp;关于我们&nbsp;</a></li>
                                <li><a href="#about">&nbsp;帮助中心&nbsp;</a></li>
                            </ul>
                        </div>

                    </div>
                    <div class="CSS2">
                    
                    </div>
                    <div class="CSSN">
                    
                    </div>

                </div>
            </el-col>
        </el-row>
         
    </div>
</template>

<script>
export default {
    name:'footerSynergy'
}
</script>

<style scoped>


    /**顶栏ulcss */
    .ulCSS
    {
	    list-style-type:none;
	    margin:0;
	    padding:0;
    }
    .ulCSS li
    {
        display:inline;
    }

    .ulCSS li a
    {
        color: rgb(112, 112, 112);
    }
    /**顶栏平台名CSS */
    .fontStyle
    {
        font-size: 18px;
        color: rgb(80, 77, 77);
    }
    /**本行用CSS */
    .elcolCSS0
    {
        height: 200px;
        padding: 0;
    }
    
    /** 顶栏用CSS*/
    .CSS1
    {
        height:30px;
        padding: 0;
        width: 100%;
        background-color:rgb(194, 198, 207);
    }
    /**顶栏内内容所用CSS*/
    .CSS1Child0
    {
        height:30px;
        width: 50%;
        /* background-color:coral; */
        text-align: center;
        line-height: 30px;
        float: left;
        color: rgb(112, 112, 112);
    }
    .CSS1Child1
    {
        height:30px;
        width: 50%;
        /* background-color:brown; */
         text-align: right;
        line-height: 30px;
        float: right;
    }
    /**搜索栏用CSS */
    .CSS2
    {
        height:100px;
        padding: 0;
        width: 100%;
        background-color: aqua;
    }
    /**导航栏用CSS */
    .CSSN
    {
        height:70px;
        padding: 0;
        width: 100%;
        background-color:bisque
    }
</style>