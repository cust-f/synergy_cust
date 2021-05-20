/** 
  * 时间间隔 <15 return 1;
  *          >=15 && <=30 return 2;
  *          >30 return 3;
  * 时间类型 0：2020-04-16T12:26:21.000+0800;
  *          1：Thu May 20 2021 11:15:48 GMT+0800 (中国标准时间)
*/ 
export function intervalTime(startTime,startType,endTime,endType) {
    // var arr = [1, 2, 3];
    // var a = arr[Math.floor(Math.random() * arr.length)];
    // return a;  // a随机为1或者2或者3
    var time1;
    var time2;
    if(startType == 0){
        time1 = formatDate0(startTime);
    }else{
        time1 = formatDate1(startTime);
    }
    if(endType == 0){
        time2 = formatDate0(endTime);
    }else{
        time2 = formatDate1(endTime);
    }
    var days = dateDays(time1,time2);
    // console.log("时间差"+days);
    // console.log("");
    if( days>=0 && days<15 )
        return 1;
    else if( days>=15 && days<=30 )
        return 2;
    else if( days>30 || days<0 )
        return 3;
}

// new Date()-Wed Oct 07 2020 00:00:00 GMT 0800(中国标准时间) 转 yyyy-MM-dd hh:mm:ss
function formatDate1 (dataTime) {
    var date  = new Date(dataTime);
    var strMonth = date.getMonth()+1;
    var strDate = date.getDate();
    var strHour = date.getHours();
    var strMinute =  date.getMinutes();
    var strSecond = date.getSeconds();
    if(strMonth>=1 && strMonth<=9){
        strMonth = "0"+strMonth;
    }
    if(strDate>=0&& strDate<=9){
        strDate = "0"+ strDate;
    }
    if(strHour>=0&& strHour<=9){
        strHour = "0"+ strHour;
    }
    if(strMinute>=0&& strMinute<=9){
        strMinute = "0"+ strMinute;
    }
    if(strSecond>=0&& strSecond<=9){
        strSecond = "0"+ strSecond;
    }
    var currentdate = date.getFullYear() + '-' + strMonth + '-' + strDate + ' ' + strHour + ':' + strMinute + ':' + strSecond;
    // console.log("测试转换时间1:" + currentdate);
    return currentdate;
}

// 2020-04-16T12:26:21.000+0800 转 yyyy-MM-dd hh:mm:ss
function formatDate0(dateTime) {
    var date = new Date(dateTime).toJSON();
    date = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    // console.log("测试转换时间0:" + date);
    return date;
}

// js获取连个时间间隔天数date1，date2为date类型
function dateDays(date1,date2){
    var sdate = new Date(formatDate(date1)); 
    var now = new Date(formatDate(date2)); 
    var days = now.getTime() - sdate.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24)); 
    return day; 
}
// js转换时间格式yyyy-mm-dd:hh:mm:ss  obj为date类型
function formatDate(obj) {
    if (obj == null || obj == "") {
        return 0;
    }
    var obj = new Date(obj);
    var year = 1900 + obj.getYear();
    var month = "0" + (obj.getMonth() + 1);
    var date = "0" + obj.getDate();
    var hour = "0" + obj.getHours();
    var minute = "0" + obj.getMinutes();
    var second = "0" + obj.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length) + " " + hour.substring(hour.length - 2, hour.length) + ":"
                    + minute.substring(minute.length - 2, minute.length) + ":" + second.substring(second.length - 2, second.length);
}