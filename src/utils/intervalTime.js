/**  
  * 时间间隔<15 return 1;
  * 15<=时间间隔<=30 return 2;
  * 时间间隔>30 return 3;
  * 时间类型 0：2020-08-12T19:06:44.000 0800；1：Thu May 20 2021 11:15:48 GMT+0800 (中国标准时间)
*/ 
export function intervalTime(startTime,startType,endTime,endType) {
    var arr = [1, 2, 3];
    var a = arr[Math.floor(Math.random() * arr.length)];
    return a;  // a随机为1或者2或者3
}