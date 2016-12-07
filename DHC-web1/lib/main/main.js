$(function(){
	
})

window.onload = function(){
	var opt =$("#picture ul");
	var iwidth = $("#picture li")[0].offsetWidth;
	var btdiv = $("#picture input");
	var oa = $("#picture span");
	PiMove(opt,btdiv,oa,iwidth);
}

				
function PiMove(opt,btdiv,oa,iwidth){

	opt[0].innerHTML+=opt[0].innerHTML;
	
	var i=0;
	var ileft =0;
	
	
	var timer = setInterval(move,3000);
	
	
	
	function move(){
		i++;
		ileft = -i*iwidth;
		for(var j=0;j<$("#picture input").length;j++){
			if(i%5==j){
				btdiv.eq(j).addClass("select");
			}else{
				btdiv.eq(j).removeClass("select");
			}
		}
		console.log(ileft);
		opt.animate({left:ileft},function(){
			back();
		})
	}
	function back(){
		if(i>=$("#picture li").length/2){
			i=0;
			opt.css({left:0});
		}
	}
	
	for(var k=0;k<btdiv.length;k++){
		btdiv[k].index=k;
		btdiv[k].onclick=function(){
			i=this.index;
			btnmove();
		}
	}
	
	function btnmove(){
		opt.stop();
		i--;
		move();
		clearInterval(timer);
		timer=setInterval(move,3000);
	}
	
	oa[0].onclick = function(){
		opt.stop();
		if(i==0){
			i=$("#picture li").length/2-1;
			opt.css({left:-$("#picture li").length/2*iwidth}); 
		}else{
			i--;
		}
		btnmove();
	}
	oa[1].onclick = function(){
		opt.stop();
		back();
		i++;
		btnmove();
	}
}	