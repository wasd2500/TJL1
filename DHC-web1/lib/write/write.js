$(function(){
	$("#write .gotowrite").click(function(){
		
		var submittrue = true;
		
		var d = new Date();
		
		var nowtime = d.getFullYear() +'年'+d.getMonth()+'月'+d.getDate()+'日';
		var classification = $("#write .form-write input[name='classification']").val();
		var year = $("#write .form-write input[name='year']").val();
		
		if((/^\d{4}$/).test(year) == false){
			alert("年份填写错误");
			submittrue = false;
			return;
		}else if(year.length==0){
			alert("年份不能为空");
			submittrue = false;
			return;
		}
		
		var mouth = $("#write .form-write input[name='mouth']").val();
		
		if((/^\d{2}$/).test(mouth) == false){
			alert("月份填写错误");
			submittrue = false;
			return;
		}else if(mouth.length==0){
			alert("月份不能为空");
			submittrue = false;
			return;
		}
		
		var from = $("#write .form-write select[name='from']").val();
		var name = $("#write .form-write input[name='name']").val();
		var age = $("#write .form-write input[name='age']").val();
		
		if(age.length==0){
			alert("年龄不能为空");
			submittrue = false;
			return;
		}else if((/^\d{2}$/).test(age) == false){
			alert("年龄不正确");
			submittrue = false;
			return;
		}
		
		var nature = $("#write .form-write select[name='nature']").val();
		var feel = $("#write .form-write select[name='feel']").val();
		
		
		var title1 = $("#write .form-write input[name='title1']").val();
		
		if(title1.length==0){
			alert("标题不能为空");
			submittrue = false;
			return;
		}
		
		var thiskey = $("#write .form-write input[name='thiskey']").val();
		
		if(thiskey.length==0){
			alert("关键字不能为空");
			submittrue = false;
			return;
		}
		
		var title2 = $("#write .form-write textarea[name='title2']").val();
		
		if(title2.length==0){
			alert("真情留言不能为空");
			submittrue = false;
			return;
		}
		
        d.setDate(d.getDate()+20);
		
		if(submittrue){
			setCookie("nowtime", nowtime, d);
			setCookie("classification", classification, d);
			setCookie("year", year, d);
			setCookie("mouth", mouth, d);
			setCookie("from", from, d);
			setCookie("name", name, d);
			setCookie("age", age, d);
			setCookie("nature", nature, d);
			setCookie("feel", feel, d);
			setCookie("thiskey", thiskey, d);
			setCookie("title1", title1, d);
			setCookie("title2", title2, d);
			alert("评论成功");
			location.assign("review.html");
		}
		
		
		
	})
})