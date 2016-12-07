$(function(){
	var searchvalue = getCookie("search-value");
	$.get("../data/products.txt",{"searchvalue":searchvalue},function(_respon){
		_respon = typeof _respon=="string" ? JSON.parse(_respon) : _respon;
		
		var allcount = _respon.result.length;
		
		var pagesnum = Math.ceil(allcount/_respon.pageSize);
		
		var _html="";
		_html +="<p><b>["+getCookie("search-value")+"]</b> 检索结果 "+_respon.result.length+"件中（"+1+" - "+_respon.pageSize+"件）</p>";
		for(var i =0;i<_respon.pageSize;i++){
			_html += '<ul><li><a href="Product Details.html"><img src="'+_respon.result[i].src+'"></a></li>'
			_html += '<li><a href="Product Details.html">'+_respon.result[i].title+'</a></li>';
			_html += '<li>'+_respon.result[i].explain+'</li>';
			_html += '<li>价格：￥<span>'+_respon.result[i].price+'</span></li>';
			_html += '<li>商品编号：<span>'+_respon.result[i].id+'</span></li>';
			_html += '<li>数量<select><option>1</option><option>2</option><option>3</option></select></li>';
			_html += '<li class="tobuycar"><img src="../img/products/search_buy.gif"></li>';
			_html += '<li class="tokeep"><img src="../img/products/search_favorites.gif"></li></ul>';
		}
		
//		 href="Product Details.html"
		
		$(_html).appendTo('#products .product-search');
		
		var _button = "";
		_button += '<a class="prevpage">上页</a>';
		for(var j =0;j<pagesnum;j++){
			_button += '<input type="button" value="'+parseInt(j+1)+'" />';
		}
		
		_button += '<a class="nextpage">下页</a>';
		$(_button).appendTo('#products .products-button div');

		$(".products-button div input").eq(0).addClass("now");
		
		$(".products-button div a").click(function(){
			var page = 0;
			for(page;page<$(".products-button div input").length;page++){
				if($(".products-button div input").eq(page).hasClass("now")){
					break;
				}
			}
			console.log(page);
			if($(this).hasClass("prevpage")){
				if(page==0){
					
				}else{
					
					page--;
					$(".products-button div input").removeClass("now");
					$(".products-button div input").css("background-color","white");
					$(".products-button div input").eq(page).css("background-color","#ccc");
					$(".products-button div input").eq(page).addClass("now");
					getajax(page,_respon);
				}
			}else{
				if(page==(pagesnum-1)){
					
				}else{
					
					page++;
					$(".products-button div input").removeClass("now");
					$(".products-button div input").css("background-color","white");
					$(".products-button div input").eq(page).css("background-color","#ccc");
					$(".products-button div input").eq(page).addClass("now");
					getajax(page,_respon);
				}
			}
			
		})
		
		$(".products-button div input").mouseenter(function(){
			if($(this).hasClass("now")){
				$(this).css("background-color","#ccc");
			}else{
				$(this).css("background-color","skyblue");
			}
		}).mouseleave(function(){
			if($(this).hasClass("now")){
				$(this).css("background-color","#ccc");
			}else{
				$(this).css("background-color","white");
			}
		})
		
		$(".products-button div input").click(function(evt){
			
			$(".products-button div input").removeClass("now");
			$(".products-button div input").css("background-color","white");
			$(this).css("background-color","#ccc");
			$(this).addClass("now");

			getajax($(evt.target).val()-1,_respon);
			
			
			$("li.tobuycar img").click(function(){
				tobuycar(this);
				
				var productname = $(this).parents("ul").children("li").eq(1).text();
				var productmoney = $(this).parents("ul").children("li").eq(3).children("span").text();
				var productnum = $(this).parents("ul").children("li").eq(4).children("span").text();
				var productamount = $(this).parents("ul").children("li").eq(5).children("select").val();
				
				$("#buyshow div li").eq(0).html($(this).parents("ul").children("li").eq(0).children("a").html());
				$("#buyshow div li p").eq(0).html(productname);
				$("#buyshow div li p").eq(1).html("￥ "+productmoney);
				$("#buyshow div li p").eq(2).html("数量: "+productamount);
				
				showbuydiv();
				$("#buyshow").css("display","block");
			})
			
		})
		
		$("li.tobuycar img").click(function(){
			tobuycar(this);
	
			var productname = $(this).parents("ul").children("li").eq(1).text();
			var productmoney = $(this).parents("ul").children("li").eq(3).children("span").text();
			var productnum = $(this).parents("ul").children("li").eq(4).children("span").text();
			var productamount = $(this).parents("ul").children("li").eq(5).children("select").val();
			
			$("#buyshow div li").eq(0).html($(this).parents("ul").children("li").eq(0).children("a").html());
			$("#buyshow div li p").eq(0).html(productname);
			$("#buyshow div li p").eq(1).html("￥ "+productmoney);
			$("#buyshow div li p").eq(2).html("数量: "+productamount);
			
			showbuydiv();
			$("#buyshow").css("display","block");
		})
		
		$("#products .product-search li").click(function(){
			
			if($(this).index()==0 || $(this).index()==1){
				
				console.log($(this).parents("ul").children("li").eq(4).children("span").text());
				var d = new Date();
				d.setDate(d.getDate()+10);
				setCookie("productid",$(this).parents("ul").children("li").eq(4).children("span").text(),d);
			}
		})
		
	});
	
	
	$(document).scroll(function(){
		showbuydiv();
		
	})
	
	$("#buyshow div a").click(function(){
		$("#buyshow").css("display","none");
	})
	
})

function showbuydiv(){
	var bodyheight = $("body").height();
	var scrolltop = $(document).scrollTop()+200;
	$("#buyshow").css("height",bodyheight);
	$("#buyshow div").css("top",scrolltop);
}


function getajax (pagesindex,_respon){
	
	var endpage = _respon.pageSize*(pagesindex+1);
	pagesindex *=_respon.pageSize;
	var beginpage = pagesindex +1;
	if(endpage>_respon.result.length){
		endpage = _respon.result.length;
	}
	console.log("aa")
	var newhtml = '';
	newhtml +="<p><b>["+getCookie("search-value")+"]</b> 检索结果 "+_respon.result.length+"件中（"+beginpage+" - "+endpage+"件）</p>";
	for(var i =pagesindex;i<(pagesindex+_respon.pageSize);i++){
		if(i>=_respon.result.length){
			break;
		}
		console.log(_respon.result.length);
		
		newhtml += '<ul><li><a href="Product Details.html"><img src="'+_respon.result[i].src+'"></a></li>'
		newhtml += '<li><a href="Product Details.html">'+_respon.result[i].title+'</a></li>';
		newhtml += '<li>'+_respon.result[i].explain+'</li>';
		newhtml += '<li>价格：￥<span>'+_respon.result[i].price+'</span></li>';
		newhtml += '<li>商品编号：<span>'+_respon.result[i].id+'</span></li>';
		newhtml += '<li>数量<select><option>1</option><option>2</option><option>3</option></select></li>';
		newhtml += '<li class="tobuycar"><img src="../img/products/search_buy.gif"></li>';
		newhtml += '<li class="tokeep"><img src="../img/products/search_favorites.gif"></li></ul>';
		
	}
	$('#products .product-search').html(newhtml);
	
	
	$("#products .product-search li").click(function(){
			
			if($(this).index()==0 || $(this).index()==1){
				
				console.log($(this).parents("ul").children("li").eq(4).children("span").text());
				var d = new Date();
				d.setDate(d.getDate()+10);
				setCookie("productid",$(this).parents("ul").children("li").eq(4).children("span").text(),d);
			}
		})
	
}


function tobuycar(thi){
	
	var productname = $(thi).parents("ul").children("li").eq(1).text();
	var productmoney = $(thi).parents("ul").children("li").eq(3).children("span").text();
	var productnum = $(thi).parents("ul").children("li").eq(4).children("span").text();
	var productamount = $(thi).parents("ul").children("li").eq(5).children("select").val();
	
	tobuyproducts(productname,productmoney,productnum,productamount,1);
}
