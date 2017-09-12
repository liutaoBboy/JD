/*登录界面*/
$(function() {
	//获取cookie中的登录信息
	$.cookie.json = true;
	var userInfo = $.cookie("userInfo");
	
	$("#logining").on("click", function() {
		var user = $("#nametxt").val();
		var word = $("#wordtxt").val();
		//console.log($('#autologin').prop("checked"));
		$.each(userInfo, function(index, element) {
			if(element.userName === user && element.passWord === word){
				
				window.open("../index.html");
				
				/*if($('#autologin').prop("checked")){
					
				}*/
			}
		});
	})
});