$(function(){
	
	$.get("../data/productsdetail.txt",function(_respon){
		_respon = typeof _respon=="string" ? JSON.parse(_respon) : _respon;
		for(var i in _respon.result){
			if(getCookie("productid")==_respon.result[i].id){
				$(".product-titile").text(_respon.result[i].title);
				$(".product-titile2").text(_respon.result[i].explain);
				$(".products-detail img").eq(0).attr("src",_respon.result[i].src);
				$(".products-detail").find("p.money span").text(_respon.result[i].price);
				$(".products-detail").find("p.product-num span").text(getCookie("productid"));
				break;
			}
		}
	})
	
	
	
	$("#details .dabuy img").click(function(){
		
		var productname = $(this).parents(".details-right").find("h3.product-titile").text();
		var productmoney = $(this).parents(".details-right").find("p.money span").text();
		var productnum = $(this).parents(".details-right").find("p.product-num span").text();
		var productamount = $(this).parents(".details-right").find("li.last select").val();
		
		tobuyproducts(productname,productmoney,productnum,productamount);
		
	})
	
	$(".products-detail li.last .look2").click(function(){
		if(getCookie("nowuser")){
			location.assign("write.html");
		}else{
			location.assign("login.html");
		}
	})
	
	$("li.tobuycar img").click(function(){
		var productname = $(this).parent("li").parent("ul").find("li").eq(1).find("a").text();
		var productmoney = $(this).parent("li").parent("ul").find("li").eq(2).text();
		productmoney = productmoney.replace("￥","")
		console.log(productname);
		console.log(productmoney);
		tobuyproducts(productname,productmoney,1777,1);
		
	})
	
})



