$(function(){
	
	
	
	$.get("../data/review.txt",function(_respon){
		_respon = typeof _respon=="string" ? JSON.parse(_respon) : _respon;

		var allcount = _respon.result.length;
		
		var pagesnum = Math.ceil(allcount/_respon.pageSize);
		
		console.log(_respon.pageSize);
		var _html="";
		for(var i =0;i<_respon.pageSize;i++){
			_html += '<ul><li class="ur-head"><img src="'+_respon.result[i].src+'">'
			_html += '<div><p>发表日期：'+_respon.result[i].data+'</p>';
			_html += '<h5>'+_respon.result[i].classification+'</h5></div></li>';
			_html += '<li class="ur-feel"><div>满意度：</div><div class="star">';
			for(var k=0;k<_respon.result[i].feel;k++){
				_html += '<img src="../img/review/star2.gif">';
			};
			_html += '</div></li>';
			_html += '<li class="ur-contant"><div class="title"><h5>'+_respon.result[i].title1+'</h5>';
			_html += '<p>'+_respon.result[i].title2+'</p>';
			_html += '<p>'+_respon.result[i]["this key"]+'</p></div>';
			_html += '<div class="message"><p><b>'+_respon.result[i].name+'</b>小姐 </p>';
			_html += '<p>'+_respon.result[i].from +' '+_respon.result[i].age+'岁</p>';
			_html += '<p>使用时间'+_respon.result[i].usetime+'</p>';
			_html += '<p>'+_respon.result[i].nature +'</p></div></li></ul>'
			
		}
		
		$(_html).appendTo('#review .userreview');
		
		var _button = "";
		for(var j =1;j<pagesnum+1;j++){
			_button += '<input type="button" value="'+j+'" />';
			console.log(j);
		}
		
		$(_button).appendTo('#review .review-button');

		
		$("#review .review-button input").click(function(evt){
			getajax($(evt.target).val()-1);
			console.log($(evt.target).val());
		})
		
		var getajax = function(pagesindex){
			pagesindex *=6;
			
			var newhtml = '';
			for(var i =pagesindex;i<(pagesindex+_respon.pageSize);i++){
				if(i>=allcount){
					break;
				}
				console.log(allcount);
				newhtml += '<ul><li class="ur-head"><img src="'+_respon.result[i].src+'">'
				newhtml += '<div><p>发表日期：'+_respon.result[i].data+'</p>';
				newhtml += '<h5>'+_respon.result[i].classification+'</h5></div></li>';
				newhtml += '<li class="ur-feel"><div>满意度：</div><div class="star">';
				for(var k=0;k<_respon.result[i].feel;k++){
					newhtml += '<img src="../img/review/star2.gif">';
				};
				newhtml += '</div></li>';
				newhtml += '<li class="ur-contant"><div class="title"><h5>'+_respon.result[i].title1+'</h5>';
				newhtml += '<p>'+_respon.result[i].title2+'</p>';
				newhtml += '<p>'+_respon.result[i]["this key"]+'</p></div>';
				newhtml += '<div class="message"><p><b>'+_respon.result[i].name+'</b></p>';
				newhtml += '<p>'+_respon.result[i].from +' '+_respon.result[i].age+'岁</p>';
				newhtml += '<p>使用时间'+_respon.result[i].usetime+'</p>';
				newhtml += '<p>'+_respon.result[i].nature +'</p></div></li></ul>'
				
			}
			$('#review .userreview').html(newhtml);
			
		}
	
	});
	
	
	getmyreview();
	
	$("#review .toreview img").click(function(){
		if(getCookie("nowuser")){
			location.assign("write.html");
		}else{
			location.assign("login.html");
		}
	})
})



function getmyreview(){
	
	var nowtime = getCookie("nowtime");
	var classification = getCookie("classification");
	var year = getCookie("year");
	var mouth = getCookie("mouth");
	var from = getCookie("from");
	var name = getCookie("name");
	var age = getCookie("age");
	var nature = getCookie("nature");
	var feel = getCookie("feel");
	var thiskey = getCookie("thiskey");
	var title1 = getCookie("title1");
	var title2 = getCookie("title2");
	
	
	if(title1 && title2){

		var _html = '';

		_html += '<ul><li class="ur-head"><img src="../img/review/298_S.jpg">'
		_html += '<div><p>发表日期：'+nowtime+'</p>';
		_html += '<h5>'+classification+'</h5></div></li>';
		_html += '<li class="ur-feel"><div>满意度：</div><div class="star">';
		
		for(var k=0;k<feel;k++){
			_html += '<img src="../img/review/star2.gif">';
		};
		
		_html += '</div></li>';
		_html += '<li class="ur-contant"><div class="title"><h5>'+title1+'</h5>';
		_html += '<p>'+title2+'</p>';
		_html += '<p>'+thiskey+'</p></div>';
		_html += '<div class="message"><p><b>'+name+'</b></p>';
		_html += '<p>'+from +' '+age+'岁</p>';
		_html += '<p>使用时间'+year+'年'+mouth+'月'+'</p>';
		_html += '<p>'+nature +'</p></div></li></ul>'
		$(_html).appendTo('#review .myreview');
		
		removeCookie("nowtime");
		removeCookie("classification");
		removeCookie("year");
		removeCookie("mouth");
		removeCookie("from");
		removeCookie("name");
		removeCookie("age");
		removeCookie("nature");
		removeCookie("feel");
		removeCookie("thiskey");
		removeCookie("title1");
		removeCookie("title2");
	}
	
	
	
}
