$(function(){
	$(".contant-left li").mouseenter(function(){
		if($(this).hasClass("one")||$(this).hasClass("two")||$(this).hasClass("three")||$(this).hasClass("four")){
			$(this).css({"opacity":"0.3"});
			
		}
	}).mouseleave(function(){
		$(this).css({"opacity":"1"});
		
	})
	
	$(".contant-left li a.ex").mouseenter(function(){
//		$(".contant-left li a.er").css({"display":"none"});
		$(".contant-left li a.er").stop(false,true);
		$(this).next().slideToggle();
		
	}).mouseleave(function(){
		$(this).next().slideToggle();
	})
	
})