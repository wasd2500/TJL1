$(function(){

	var productnameArray = [];
	var productmoneyArray = [];
	var productnumArray = [];
	var productamountArray = [];
	
	productnameArray = getCookie("productname").split("&");
	productmoneyArray = getCookie("productmoney").split("&");
	productnumArray = getCookie("productnum").split("&");
	productamountArray = getCookie("productamount").split("&");
	
	if(getCookie("productamount")){
		
		$("#buycar .empty").css("display","none");
		$("#buycar .notempty").css("display","block");
		
		var producthtml = "";
		
		for(var i =0 ;i<productnameArray.length;i++){
			
			producthtml += '<tr>';
			if(productnumArray[i]==298){
				producthtml += '<td><a><img src="../img/buycar/298_S.jpg"></a></td>';
			}else if(productnumArray[i]==3699){
				producthtml += '<td><a><img src="../img/buycar/3699_S.jpg"></a></td>';
			}else if(productnumArray[i]==3898){
				producthtml += '<td><a><img src="../img/buycar/3898_S.jpg"></a></td>';
			}else if(productnumArray[i]==3899){
				producthtml += '<td><a><img src="../img/buycar/3899_S.jpg"></a></td>';
			}else if(productnumArray[i]==1764){
				producthtml += '<td><a><img src="../img/buycar/66_R.jpg"></a></td>';
			}else if(productnumArray[i]==1777){
				producthtml += '<td><a><img src="../img/buycar/2_S.jpg"></a></td>';
			}else{
				producthtml += '<td><a><img src="../img/buycar/1022.gif"></a></td>';
			}
			
			producthtml += '<td><a>'+productnumArray[i]+'</a></td>';
			producthtml += '<td><a>'+productnameArray[i]+'</a></td>';
			producthtml += '<td>￥<span>'+productmoneyArray[i]+'</span></td>';
			producthtml += '<td><select>';
			for(var j = 1; j<=3;j++){
				
				if(j==productamountArray[i]){
					producthtml += '<option selected>'+j+'</option>';
				}else{
					producthtml += '<option>'+j+'</option>';
				}
			}
			producthtml += '</td></select>';
			producthtml += '<td class="littlepay">￥<span>'+parseInt(productmoneyArray[i]*productamountArray[i])+'</span></td>';
			producthtml += '<td><a class="delete">删除</a></td></tr>';
		}
		
		$(producthtml).appendTo("table.allproduct tbody");
		
		$("table.allproduct tbody select").change(function(){
			var amount = $(this).val();
			var money = $(this).parent().prev().find("span").text();
			$(this).parent().next().html('￥<span>'+parseInt(amount*money)+'</span>');
			mathmoney();
			mathtran();
			resetproduct();
		})
		
		$("table.allproduct tbody a.delete").click(function(){

			$(this).parent("td").parent("tr").remove();
			mathmoney();
			mathtran();
			resetproduct();
			
			if($("table.allproduct tbody tr").length==0){
				$("#buycar .notempty").css("display","none");
				$("#buycar .empty").css("display","block");
			}
			
		})

		mathmoney();
		mathtran();
		
	}else{
		$("#buycar .notempty").css("display","none");
		$("#buycar .empty").css("display","block");
	}
		
	$("li a.tobuy").click(function(){
		var productname = $(this).parent("li").parent("ul").find("li").eq(1).find("b").text();
		var productmoney = $(this).parent("li").parent("ul").find("li").eq(4).find("b").text();
		productmoney = productmoney.replace("￥","")
		console.log(productname);
		console.log(productmoney);
		tobuyproducts(productname,productmoney,1764,1,1);
		location.reload();
	})
	
})

function mathmoney(){
	var allmony = 0;
		
	for(var k=0;k<$("td.littlepay").length;k++){
		allmony += parseInt($("td.littlepay span").eq(k).text()); 
		console.log($("td.littlepay").eq(k).text());
	}
	 
	$(".allmoney .allpay span").text(allmony);
}

function mathtran(){
	if($(".allmoney .allpay span").text()<250){
		console.log("aa");
		var tranmoney = 250 -$(".allmoney .allpay span").text();
		$(".allmoney .tran p").html("距离免运费还差 <span>￥"+tranmoney+"</span>");
	}else{
		$(".allmoney .tran p").text("您目前可享受免运费优惠");
	}
}


function resetproduct(){
	
	var productnameArray = [];
	var productmoneyArray = [];
	var productnumArray = [];
	var productamountArray = [];
	
	removeCookie("productname");
	removeCookie("productmoney");
	removeCookie("productnum");
	removeCookie("productamount");
	
	var resetproduct= "table.allproduct tbody tr";
	for(var k=0;k<$(resetproduct).length;k++){
		
		productnameArray.push($(resetproduct).eq(k).find("td").eq(2).find("a").text());
		productmoneyArray.push($(resetproduct).eq(k).find("td").eq(3).find("span").text());
		productnumArray.push($(resetproduct).eq(k).find("td").eq(1).find("a").text());
		productamountArray.push($(resetproduct).eq(k).find("td").eq(4).find("select").val());
	}

	console.log($(resetproduct).length);
	var d = new Date();
	d.setDate(d.getDate()+10);
	
	setCookie("productname",productnameArray.join("&"),d);
	setCookie("productmoney",productmoneyArray.join("&"),d);
	setCookie("productnum",productnumArray.join("&"),d);
	setCookie("productamount",productamountArray.join("&"),d);
}
