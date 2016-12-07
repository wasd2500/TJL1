$(function(){
	$("#main-header").load("header.html");
	$("#main-footer").load("footer.html");
	$(".contant-left").load("contant-left.html");
	$("#totop").load("totop.html");
	
})

function tobuyproducts(productname,productmoney,productnum,productamount,num){
	
	if(getCookie("nowuser")){
		if(num==1){
			
		}else{
			alert("已添加到购物车");
		}
		
		
		var productnameArray = [];
		var productmoneyArray = [];
		var productnumArray = [];
		var productamountArray = [];
	
		if(getCookie("productname")){
			
			productnameArray = getCookie("productname").split("&");
			productmoneyArray = getCookie("productmoney").split("&");
			productnumArray = getCookie("productnum").split("&");
			productamountArray = getCookie("productamount").split("&");
			
			removeCookie("productname");
			removeCookie("productmoney");
			removeCookie("productnum");
			removeCookie("productamount");
		}
		
		productnameArray.push(productname);
		productmoneyArray.push(productmoney);
		productnumArray.push(productnum);
		productamountArray.push(productamount);
		
		var productnamestr = productnameArray.join("&");
		var productmoneystr = productmoneyArray.join("&");
		var productnumstr = productnumArray.join("&");
		var productamountstr = productamountArray.join("&");
		
		var d = new Date();
		d.setDate(d.getDate()+20);
		
		setCookie("productname",productnamestr,d);
		setCookie("productmoney",productmoneystr,d);
		setCookie("productnum",productnumstr,d);
		setCookie("productamount",productamountstr,d);
		
		console.log(productnamestr);
		console.log(productmoneystr);
		console.log(productnumstr);
		console.log(productamountstr);
		
	}else{
		location.assign("login.html");
	}
}


