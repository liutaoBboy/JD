/*头部右侧动画*/
$(function() {
	$('#right-ul').children('li').hover(function() {
		$(this).children('ul,dl,div').show();
	}, function() {
		$(this).children('ul,dl,div').hide();
	});
});
/*地址*/
$(function() {
	$.get(
		"adress.json",
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
/*封装透明度轮播图
 
 * obj1是包裹图片的盒子
 * circles是小圆点
 * 
 * html代码格式
 * <div>
 * 		<ul id="obj1">
 * 			<li><img></li>
 * 		</ul>
 * 		<div id="pages"></div>
 * 		<div id="prev"><img src="img/prev.jpg"/></div>
 * 		<div id="next"><img src="img/next.jpg"/></div>
 * </div> 
 * */
function opacityMove(obj, circles) {
	var
		index = 1,
		oTimer = null,
		len = $("#" + obj + " li").length;
	//创建小圆点var html = ''
	var html = "";
	for (var i = 0; i < len; i++) {
		html += "<div></div>"
	}
	$(html).appendTo($("#" + circles))
		//设置小圆点样式
	$("#" + circles).css({
		"width": "30" * len,
		"height": "20",
		"position": "absolute",
		"left": "50%",
		"margin-left": "-30" * len / 2,
		"bottom": 0
	});

	$("#" + circles + " div").css({
		"float": "left",
		"width": "20",
		"height": "20",
		"border-radius": "50%",
		"background": "white",
		"margin-right": 10,
		"cursor": "pointer"
	});
	//点击上一页下一页按钮
	$("#" + obj).siblings('#prev').on('click', function() {
		clearInterval(oTimer);
		index -= 2;
		if (index < 0)
			index = len + index;
		opacityShow();
	});
	$("#" + obj).siblings('#next').on('click', function() {
		clearInterval(oTimer);
		opacityShow();
	});
	//鼠标划入清除定时器

	$("#" + obj + ",#" + circles).hover(function() {
		clearInterval(oTimer);
	}, function() {
		oTimer = setInterval(opacityShow, 2000)
	});

	//初始化
	$("#" + obj + " li:first").css("z-index", 98);
	$("#" + circles).css('z-index', 999)
	$("#" + circles + " div:first").css("background", 'red')

	//点击小圆点
	$("#" + circles + " div").on('click', function() {
		clearInterval(oTimer);
		index = $(this).index();
		opacityShow();
	});
	//自动播放
	oTimer = setInterval(function() {
		opacityShow();
	}, 2000);
	//透明度移动函数
	function opacityShow() {
		$("#" + obj + " li").eq(index).fadeIn(1000).siblings().fadeOut(500);
		//遍历每一个div,使得样式复原
		$("#" + circles + " div").eq(index).css({
			"background": "red"
		}).siblings().css({
			"background": "white"
		});
		index++
		if (index >= len) {
			index = 0;
		}
	}
}

/*
 * 封装滚动轮播图
 * obj是包含图片的ul
 * circles是小圆点
 * clickbtn是点击翻页按钮
 * 大盒子的css自己写
 * 
 * html代码格式
 * <div>
 * 		<ul id="obj">
 * 			<li><img></li>
 * 		</ul>
 * 		<div id="pages"></div>
 * 		<div id="prev"><img src="img/prev.jpg"/></div>
 * 		<div id="next"><img src="img/next.jpg"/></div>
 * </div> 
 * */

function rollMove(obj, circles, clickbtn) {
	var
		oTimer = null, //创建定时器
		oImgNum = $("#" + obj + " li").length, //获取图片数量；
		oImgWidth = $("#" + obj + " li").width(), //获取图片的宽
		iIndex = 1; //当前图片的下标
	//克隆第一张给最后一张，克隆最后一张给第一张

	$('#' + obj + ' li:first').clone(true).insertAfter($('#' + obj + ' li:last'));
	$('#' + obj + ' li:last').prev().clone(true).insertBefore($('#' + obj + ' li:first'));
	//给ul加宽度，并初始化
	$('#' + obj).css({
		'width': (oImgNum + 2) * oImgWidth,
		left: -oImgWidth
	});
	///创建小圆点
	var html = ''
	for (var m = 0; m < oImgNum; m++) {
		html += "<div></div>";
	}
	$(html).appendTo("#" + circles);

	//小圆点css样式
	$("#" + circles).css({
		'position': 'absolute',
		'bottom': 20,
		'left': '50%',
		'margin-left': -135
	});
	$("#" + circles).children('div').css({
		'float': 'left',
		'margin': '0 10px',
		'width': 25,
		'height': 25,
		'background': '#ccc',
		'color': 'white',
		'line-height': 25,
		'text-align': 'center',
		'border-radius': '50%',
		'cursor': 'pointer'
	});
	//小圆点变化，并对应图片
	//初始第一个小圆点的样式
	$('#' + circles + ' div:first').css({
		'background': 'red'
	});
	$('#' + circles + ' div').hover(function() {
		$(this).css({
			'background': '#CCC'
		});
		$(this).css({
			'background': 'red'
		});
		//清除定时器
		clearInterval(oTimer)
			//获取当前下标,并调用函数使其移动到指定图片
		iIndex = $(this).index() + 1;
		ulMove(iIndex);
	}, function() {
		//鼠标移开继续播放
		clearInterval(oTimer)
		autoMove();
	});
	//方向键按钮显示隐藏
	$("#" + obj + ",#" + circles).hover(function() {
		clearInterval(oTimer);
	}, function() {
		clearInterval(oTimer);
		autoMove();
	});
	//点击方向按钮

	$("#" + obj).siblings("#next").on("click", function() {
		clearInterval(oTimer)
		ulMove(++iIndex);
	});
	$("#" + obj).siblings("#prev").on("click", function() {
		clearInterval(oTimer)
		ulMove(--iIndex);
	});
	//自动播放
	autoMove();
	//自动播放函数
	function autoMove() {
		oTimer = setInterval(function() {
			iIndex++
			ulMove(iIndex);
		}, 3000);
	}
	//移动函数
	function ulMove(index) {
		$('#' + obj).stop().animate({
			left: -index * oImgWidth
		}, 1000, function() {
			if (index > oImgNum) {
				$('#' + obj).css({
					left: -oImgWidth
				});
				iIndex = 1;
			}
			if (index <= 0) {
				$('#' + obj).css({
					left: -6 * oImgWidth
				});
				iIndex = oImgNum;
			}
		});
		// 小圆点随着图片变换而变化
		$('#' + circles + ' div').css({
			'background': '#ccc'
		});
		var othis = index - 1;
		if (othis === oImgNum) {
			othis = 0;
		}
		$('#' + circles + ' div').eq(othis).css({
			'background': 'red'
		});
	}
}
/*
 
 * 多图轮播，仅向右轮播,4秒自动轮播一次
 * obj是要运动的ul
 * 
 * html格式代码
 * <div id="goods-box">//设置宽和position
 *		<ul id="goods-move">//设置position
 * 			<li></li>
 * 		</ul>
 *		<div id="prev"><img src="img/prev.jpg"/></div>
 *		<div id="next"><img src="img/next.jpg"/></div>
 *	</div>
 * */
function moreMove(obj) {
	var
		len = $("#" + obj + " li").length,
		liWidth = $("#" + obj + " li").width(),
		iIndex = 0,
		oTimer = null;
	//console.log(liWidth)
	//克隆添加到最后和头部
	//	$('#goods-box li:first').clone(true).insertAfter($('#goods-box li:last'));
	//$('#goods-box li:last').prev().clone(true).insertBefore($('#goods-box li:first'));
	var newli = $("#" + obj + " li").clone(true);
	$(newli).appendTo("#" + obj);

	//设置ul宽度
	$("#" + obj).css("width", (len * 3) * liWidth);

	//初始化
	$("#" + obj).on("mouseover", function() {
		clearInterval(oTimer);
	});
	$("#" + obj).on("mouseout", function() {
		clearInterval(oTimer);
		oTimer = setInterval(move, 4000);
	});

	$("#next").on('click', function() {
		clearInterval(oTimer)
		move();
	});

	//自动轮播
	oTimer = setInterval(function() {
		move()
	}, 4000);

	function move() {
		iIndex++
		$("#" + obj).stop(true).animate({
			'left': -iIndex * liWidth
		}, 1000, function() {
			if (iIndex === len) {
				iIndex = 0;
				$("#" + obj).css("left", -iIndex * liWidth);
			}
		});
	}
}


/*
 封装选项卡
 * obj为包含ul li的盒子
 * imgobj为包含图片的盒子
 * */
function choseCard(obj, imgobj) {
	//必要的css样式
	$(obj).children().find('li').css('float', 'left');
	$(obj).children().find('a').css({
		'dispaly': 'block',
		float: 'left'
	});
	$(imgobj).children().find('img').css('float', 'left');

	$(obj).children().find('a').hover(function() {
		var html = '';
		$(this).css({
			background: 'green'
		});
		$(this).parents(obj).siblings(imgobj).hide();
		//改变图片
		var len = $(imgobj + " img").length;

		$(imgobj + " img").each(function(index, element) {
			$div = $("<div></div>");
			var num = Math.floor(Math.random() * len) + 1;
			html += '<img src="img/pic' + num + '.jpg"/>';
		});
		$div.html(html);
		$div.appendTo($(this).parents('li'));
		$(this).parents('li').siblings().find('div').remove();
	}, function() {
		$(this).css({
			background: 'yellow'
		});
	});
}