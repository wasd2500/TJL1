$(function(){
	
	$(".resign .num1 b").text(mathematical()).click(function(){
		$(this).text(mathematical());
	})
	$(".resign .num2 b").text(mathematical()).click(function(){
		$(this).text(mathematical());
	});
	
	
	
	var oldUsername = getCookie("username");
    var oldPassword = getCookie("password");
    console.log(document.cookie);
    if (oldUsername) {
        $(".form-enter input").eq(0).val(oldUsername);
        $(".form-enter input").eq(1).val(oldPassword);
    }
	
	//用户登录
	$(".form-enter .sub input").click(function(){

		var acc =$(".form-enter input").eq(0).val();
		var pas =$(".form-enter input").eq(1).val();
		
		if(checkenter(".form-enter input")){
			
			$.get("../data/login.txt",{"account":acc,"password":pas},function(respon){
				
				respon = typeof respon=="string" ? JSON.parse(respon) : respon;
				
				if(respon.message && respon.data){
					if(respon.menber=="unfinish"){
						alert("请完善信息");
						return;
					}else if(respon.menber=="finish"){
						alert("登录成功");
						var d = new Date();
						d.setDate(d.getDate()+20);
						setCookie("nowuser",acc, d);
						location.assign("main.html");
					}	
				}else{
					alert("登录失败");
				}
				
			})
		}
		
		if ($(".form-enter input").eq(2).is(":checked")){
			var user = acc; //账号
            var pwd = pas; //密码

            var d = new Date();
            d.setDate(d.getDate()+20); 
            setCookie("username", user, d);
            setCookie("password", pwd, d);
            console.log("提交之后："+document.cookie);
		}
		
		
		return false;	
	})
	
	//完善用户信息
	$(".form-finish .sub input").click(function(){
		
		var menber =$(".form-finish input").eq(0).val();
		var mob =$(".form-finish input").eq(1).val();
		
		if(checkfinish(".form-finish input")){
			
			$.get("../data/finish.txt",{"menber":menber,"mobile":mob},function(respon){
				
				respon = typeof respon=="string" ? JSON.parse(respon) : respon;
				
				if(respon.message == "finish" && respon.data){
					alert("完善信息成功");
				}else{
					alert("完善信息失败");
				}	
			})
		}
		return false;
	})
		
	//用户注册
	$(".form-resign .sub input").click(function(){
		
		var mb = $(".form-resign input").eq(0).val();
		var em = $(".form-resign input").eq(3).val();
		var repas = $(".form-resign input").eq(5).val();
		
		if(checkresign(".form-resign input")){

			$.get("../data/resign.txt",{"mobile":mb,"email":em,"password":repas},function(respon){
				
				respon = typeof respon=="string" ? JSON.parse(respon) : respon;
				if(respon.message && respon.data){
					console.log(respon);
					alert("注册成功");
					location.reload();
				}else{
					alert(respon.message);
				}
				
			})
		}
		return false;
	})
	
})


//确认用户完善信息格式的方法
function checkfinish(finish){
	var isTrue = true;
	
	var menber = $(finish).eq(0).val();
	var checkmen = /^[a-zA-Z]{2}\d{4}$/
	
	if(menber.length==0){
		alert("会员号不能为空");
		isTrue = false;
		return false;
	}else if(!checkmen.test(menber)){
		alert("会员号格式不正确");
		return false;
		isTrue = false;
	}
	
	var mb = $(finish).eq(1).val();
	var checkmb = /^1\d{10}$/ ;
	
	if(mb.length==0){
		alert("手机号不能为空");
		isTrue = false;
		return false;
	}else if(!checkmb.test(mb)){
		alert("手机号不合法");
		return false;
		isTrue = false;
	}
	
	return isTrue;
}


//确认用户注册格式的方法
function checkresign(resign){
	var isTrue = true;
	
	var mb = $(resign).eq(0).val();
	var checkmb = /^1\d{10}$/ ;
	
	if(mb.length==0){
		alert("手机号不能为空");
		isTrue = false;
		return false;
	}else if(!checkmb.test(mb)){
		alert("手机号不合法");
		return false;
		isTrue = false;
	}
	
	var nub1 = $(resign).eq(1).val();
	var checknub1 = $(".form-resign input").eq(1).next("b").text();
	if(nub1.length==0){
		alert("验证码不能为空");
		return false;
		isTrue = false;
	}else if(!nub1 == checknub1){
		alert("验证码输入错误");
		return false;
		isTrue = false;
	}
	
	var nub2 = $(resign).eq(2).val();
	var checknub2 = $(".form-resign input").eq(2).next("b").text();
	
	if(nub2.length==0){
		alert("短信验证码不能为空");
		return false;
		isTrue = false;
	}else if(!nub2 == checknub2){
		alert("短信验证码输入错误");
		return false;
		isTrue = false;
	}
	
	var em = $(resign).eq(3).val();
	var checkem = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(em.length==0){
		alert("邮箱不能为空");
		return false;
		isTrue = false;
	}else if(!checkem.test(em)){
		alert("邮箱格式错误");
		return false;
		isTrue = false;
	}
	
	var pas = $(resign).eq(4).val();
	if(pas.length==0){
		alert("密码不能为空");
		return false;
		isTrue = false;
	}else if(pas.length<5 && pas.length>0){
		alert("密码长度不能小于5");
		return false;
		isTrue = false;
	}
	
	
	var repas = $(resign).eq(5).val();
	if(repas.length==0){
		alert("重复密码不能为空");
		return false;
		isTrue = false;
	}else if((repas==pas)==false){
		alert("两次密码不一样");
		return false;
		isTrue = false;
	}
	return isTrue;
}

//确认用户登录格式的方法
function checkenter(enter){
	
	var isTrue = true;
	var acc = $(enter).eq(0).val();
	var pas = $(enter).eq(1).val();
	if(acc.length==0){
		alert("帐号名不能为空");
		
		isTrue = false;
		return false;
	}else if(acc.length<5 && acc.length>0){
		alert("帐号长度不能小于5");
		isTrue = false;
		return false;
	}
	
	if(pas.length==0){
		alert("密码不能为空");
		isTrue = false;
		return false;
	}else if(pas.length<5 && pas.length>0){
		alert("密码长度不能小于5");
		isTrue = false;
		return false;
	}
	return isTrue;
}

function mathematical(){
	var randomArray = [];
	for(var i =0;i<4;i++){
		randomArray.push(parseInt(Math.random()*9));
	}
	return randomArray.join("");
}
