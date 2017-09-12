/*头部右侧动画*/
$(function() {
	$('#right-ul').children('li').hover(function() {
		$(this).children('ul,dl,div').show();
	}, function() {
		$(this).children('ul,dl,div').hide();
	});
});

$(function(){
	$.cookie.json = true;
	
	var iCur = $.cookie('userInfo').length;
	var iName = $.cookie('userInfo')[iCur-1].userName;
	if(iName !== null){
		$("#user-name a:first").text("你好，"+iName);
	}
	else{
	
	}

});
/*地址*/
$(function() {
	$.get(
		"../adress.json",
		function(data) {
			//console.log(data);
			var html = "",
				iIndex = 0;
			//鼠标划入显示地址
			$('#left-ul li').hover(function() {
				$('#index-adress').show();
				$(this).children().children('li').eq(iIndex).css('background', "red").siblings().css('background', '#fff');
			}, function() {
				$('#index-adress').hide();
			})

			for (var i in data) {
				html += "<li>" + data[i] + "</li>";
			}
			$(html).appendTo("#index-adress");
			$('#index-adress li').css({
				"width": 60,
				"height": 30,
				"text-align": "center",
				"margin": "0 5px"
			});
			$("#index-adress li:first").css('background', "red");
			$("#index-adress li").hover(function() {
				$(this).css("background", "#E38A91");
			}, function() {
				$(this).css("background", "#fff");
			}).stop().on('click', function() {
				$(this).css("background", 'red');
				iIndex = $(this).index();
				$(this).parents("li").children('span').text($(this).text());
				$('#index-adress').hide();
			});
		}
	);
});