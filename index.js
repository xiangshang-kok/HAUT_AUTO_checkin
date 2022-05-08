auto.waitFor()
device.keepScreenDim();
launchApp("完美校园");

sleep(5000);
back();
var {people_con}=hamibot.env;
var {get_Conid} =hamibot.env;
var{pushplus_token}=hamibot.env;
var myDate = new Date();
function my_click(target){
	text(target).waitFor();
  click(target);
}
function my_click_num(target,num){
	text(target).waitFor();
  click(target,num);
}
// // toastLog(get_Conid);



my_click("健康打卡");
my_click("校内打卡（请于10点前填报）");
sleep(5000);



// var account = id('my_display_name').findOne().text();
if(className("android.view.View").text("重新打卡").exists()){
	push_weixin_message_alredy();
//   alert('程序运行结束');
	throw SyntaxError();
}
else{
	my_click("立即打卡");
//第一个否,是否有中高风险地区人员接触史
my_click_num(people_con,1);

//这里的是--昨日是否进行核酸检测
my_click_num(get_Conid,4);

my_click("已接种加强针");
my_click("确认打卡");
sleep(10000);

home();  


if(className("android.view.View").text("重新打卡").exists()){
	push_weixin_message();
}
else{
http.postJson(
        'http://www.pushplus.plus/send',
        {
            token: pushplus_token,
            title: '完美校园打卡状态',
            content: myDate.getMonth() + "月" +myDate.getDate()+"日"+myDate.getHours()+"点"+myDate.getMinutes()+"分"+myDate.getSeconds()+"秒"+ "打卡失败，请检查！"
        }
    );
}

}


function push_weixin_message() {
    http.postJson(
        'http://www.pushplus.plus/send',
        {
            token: pushplus_token,
            title: '完美校园打卡状态',
            content: myDate.getMonth() + "月" +myDate.getDate()+"日"+myDate.getHours()+"点"+myDate.getMinutes()+"分"+myDate.getSeconds()+"秒"+ "打卡成功"
        }
    );
}

function push_weixin_message_alredy() {
    http.postJson(
        'http://www.pushplus.plus/send',
        {
            token: pushplus_token,
            title: '完美校园打卡状态',
            content: "之前已打卡"
        }
    );
}
