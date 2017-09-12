//左侧楼梯效果
$(function() {
	var
		winHeight = $(window).height(),
		headerHeight = $(".floor1").offset().top,
		halfHeight = $(".floor1").height() / 2,
		isClick = false;
	$(window).on("scroll", function() {
		if (!isClick) {
			var scrollTop = $(this).scrollTop();

			if (scrollTop > headerHeight - winHeight + halfHeight) {
				$("#index-nav-left").stop().fadeIn();
			} else {
				$("#index-nav-left").stop().fadeOut();
			}
			$(".floor").each(function(index, element) {
				$(this).index = index;
				var
					iTop = $(this).offset().top;
				if (scrollTop > iTop - winHeight / 2) {
					$('#index-nav-left li:not(:last)').eq(index).children('span').show()
						.end().siblings().children('span').hide();
				}
			});
		}
	});
	//右侧楼梯效果
	$(function() {
		$("#index-nav-right li").hover(function() {
			$(this).find("span").stop(true).animate({
				"left": -65,
				"opacity": '1'
			}, 1000);
		}, function() {
			$(this).find("span").stop(true).animate({
				"left": 0,
				"opacity": '0'
			}, 500);
		})

	});
	//点击事件
	$('#index-nav-left li:not(:last)').on("click", function() {
		isClick = true;
		$(this).children("span").show().end().siblings().children('span').hide();
		var iIndex = $(this).index();
		var iTop = $(".floor").eq(iIndex).offset().top - 50;
		$("html,body").stop(true).animate({
			scrollTop: iTop
		}, 2000, function() {
			isClick = false;
		});
	}).hover(function() {
		if (!isClick)
			$(this).children('span').show();
	}, function() {
		if (!isClick)
			$(this).children('span').hide();
	});
	//点击top
	$("#index-nav-left li:last").on("click", function() {
		isClick = true;
		$('html,body').stop(true).animate({
			scrollTop: 0
		}, 2000, function() {
			isClick = false;
			$("#index-nav-left").stop(true).fadeOut();
		});
	});
});
//轮播图
$(function() {
		opacityMove("imgbox0", "pages0");
		moreMove("imgbox1");
		opacityMove("imgbox3", "page3", "click");
		rollMove("imgbox4", "page4", "click");
	})
//跨域
$(function() {
	var iValue = '';
	$('#txt').on('input', function() {
		//输入框内容变化时获取数据
		iValue = $("#txt").val();

		console.log(iValue)
		$.getJSON(
			"https://suggest.taobao.com/sug?code=utf-8&q=" + iValue + "&_ksTS=1473162695743_464&callback=?&k=1&area=c2c&bucketid=0",
			//"http://dd-search.jd.com/?ver=2&zip=1&key=1&pvid=1alkqfsi.kiv7lmmc&t=1472456613994&curr_url=www.jd.com%2F&callback=?",
			function(data) {
				//console.log(data)
				$("#cross-domain ul li").remove();
				var html = "";
				var oArry = data.result;
				//console.log(oArry);
				for (var i in oArry) {
					//console.log(oArry[i][0]);
					html += "<li>" + oArry[i][0] + "</li>"
				}
				console.log(html)
				$('#cross-domain').css('display','block').children('ul').append(html)
				$("#cross-domain ul li:first").on('click',function(){
					if($(this).text() === '手机'){
						window.open('moregoods.html');
					}
				});
			}
		)
	});
});



