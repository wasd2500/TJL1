$(function(){
	$("#nav li").mouseenter(function(){
		$(this).addClass("select");
	}).mouseleave(function(){
		$(this).removeClass("select");
	})
	
	if(getCookie("search-value")){
		$("#search .s-text").val(getCookie("search-value"));
		
	}
	
	if(getCookie('nowuser')){
		$(".login-status").html("欢迎用户 "+getCookie('nowuser'));
		$("<a class='outuser'>[退出当前用户]</a>").appendTo(".login-status");
		
		var productmoneyArray = [];
		var productamountArray = [];
		var allamount = 0;
		var allmoney = 0;
		
		productmoneyArray = getCookie("productmoney").split("&");
		productamountArray = getCookie("productamount").split("&");
		
		if(!getCookie("productamount")){
			$(".header-right li.first p span").eq(0).text(" 0件");
			$(".header-right li.first p span").eq(1).text(" 0元");
		}else{
			for(var i =0;i<productmoneyArray.length;i++){
				allamount += parseInt(productamountArray[i]);
				allmoney += parseInt(productamountArray[i]*productmoneyArray[i]);
			}
			
			$(".header-right li.first p span").eq(0).text(allamount+" 件");
			$(".header-right li.first p span").eq(1).text(allmoney+" 元");
		}
		
	}
	
	$(".login-status .outuser").click(function(){
		removeCookie('nowuser');
		location.reload();
	})
	
	
	$("#search .s-search").click(function(){
		if($(this).prev().val().length ==  0){
			alert("搜索内容不能为空");
		}else{
			var d = new Date();
			d.setDate(d.getDate()+20);
			setCookie("search-value",$(this).prev().val(),d)
			console.log(getCookie("search-value"));
			location.assign("product.html");
		}
		
	})
	
	$("#header .f-tobuy").click(function(){
		if(!getCookie('nowuser')){
			location.assign("login.html");
		}else{
			location.assign("buycar.html");
		}
	})
	
	$(".header-left li.underline img").mouseenter(function(){
		if($(this).hasClass("callme")){
			
		}else{
			var imgstr = $(this).attr("src");
			imgstr = imgstr.replace("png","jpg");
			console.log(imgstr);
			$(this).attr("src",imgstr);
		}
		
	}).mouseleave(function(){
		if($(this).hasClass("callme")){
			
		}else{
			var imgstr = $(this).attr("src");
			imgstr = imgstr.replace("jpg","png");
			$(this).attr("src",imgstr);
		}
		
	})
	
	
	
})