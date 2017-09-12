
/*放大镜效果*/
$(function() {
	$("#ul-click li").on('click', function() {
		$(this).addClass('curr').siblings().removeClass('curr');
	});

	$("#middle-box").hover(function() {
		$("#glass,#big-box").show();
	}, function() {
		$("#glass,#big-box").hide();
	});

	$("#middle-box").on('mousemove', function(ev) {
		var
		//获取放大镜的宽高
			glassWidth = $("#glass").width(),
			glassHeight = $("#glass").height(),
			//获取鼠标落点位置
			clientX = ev.pageX,
			clientY = ev.pageY,
			//获取middle left  top 
			mLeft = $('#middle-box').offset().left,
			mTop = $('#middle-box').offset().top,
			//获取大盒子的宽高
			bigWidth = $("#big-box").width(),
			bigHeight = $("#big-box").height();
		var
		//鼠标移动位置
			moveX = clientX - glassWidth / 2 - mLeft,
			moveY = clientY - glassHeight / 2 - mTop;

		//判断边界值
		if (moveX <= 0) {
			moveX = 0;
		}
		if (moveY <= 0) {
			moveY = 0;
		}

		if (moveX >= $("#middle-box").innerWidth() - glassWidth) {
			moveX = $("#middle-box").innerWidth() - glassWidth;
		}
		if (moveY >= $("#middle-box").height() - glassHeight) {
			moveY = $("#middle-box").height() - glassHeight;
		}
		//放大镜框移动
		$("#glass").css({
			left: moveX,
			top: moveY
		});
		var
		//计算big-box比例
			bigLeft = moveX / ($("#middle-box").innerWidth() - glassWidth) * bigWidth,
			bigTop = moveY / ($("#middle-box").height() - glassHeight) * bigHeight;
		$("#big-box img").css({
			top: -bigTop,
			left: -bigLeft
		});
	});
});

/*商品信息*/
$(function() {
	/*获取当前信息*/
	var
		iColor = '深空灰色',
		iEdition = '16G',
		iWhite = '30天免息',
		iGoodsNum = 1;



	/*初始化页面内容 默认选择第一个*/
	$("#color-choice span:first,#edition-choice span:first,#white-choice span:first").css({
		"border": "2px solid #e4393c",
		"background": "url(img/moregoods-pic5.jpg) no-repeat right bottom"
	});

	$("#service-choice select:first").addClass('icur');
	/*选择颜色,版本,白条*/
	$("#color-choice span,#edition-choice span,#white-choice span").on('click', function() {
		$(this).css({
			"border": "2px solid #e4393c",
			"background": "url(img/moregoods-pic5.jpg) no-repeat right bottom"
		}).siblings().css({
			"border": "1px solid #ccc",
			"background": "none"
		});
		if ($(this).parent().attr("id").indexOf("color-choice") != -1) {
			iColor = $(this).text();
		}
		if ($(this).parent().attr("id").indexOf("edition-choice") != -1) {
			iEdition = $(this).text();
		}
		if ($(this).parent().attr("id").indexOf("white-choice") != -1) {
			iWhite = $(this).text();
		}
	});
	/*选择服务*/
	var flag = true;
	$("#service-choice select").on('click', function() {
		if (flag) {
			$(this).addClass('icur');
			flag = false;
		} else {
			flag = true;
			$(this).removeClass('icur');
		}
	});
	/*数量加减*/
	var i = 1;
	$("#goods-number #add").on('click', function() {
		i++;
		$("#goods-content").text(i);
		iGoodsNum = $("#goods-content").text();
	});
	$("#goods-number #delete").on('click', function() {
		i--;
		if (i <= 0) {
			i = 0;
		}
		$("#goods-content").text(i);
		iGoodsNum = $("#goods-content").text();
	});

	$('#add-btn').on('click', function() {
		var iService = '';
		//遍历
		$("#service-choice .icur option:selected").each(function(index, element) {
			//if ($(this).attr("class").indexOf("icur") != -1) {
			iService += $(this).text();
			//}
		});
		//console.log(iColor, iEdition, iWhite, iGoodsNum, iService, iName);
		var product = {
			iName : iName,
			goodsImg : $("#middle-box").find('img').attr('src'),
			goodsName : $("#goodsInfo .goods-bt").text(),
			goodsColor : iColor,
			goodsEdition : iEdition,
			goodsNum : iGoodsNum,
			goodsWhite : iWhite,
			goodsService : iService,
			goodsPrice : $("#reduce-price .price").text()
		}
		console.log(product.goodsImg);
		var userGoods = []
		
		userGoods.push(product);
		console.log(userGoods);
		$.cookie.json = true;
		$.cookie("userGoods",userGoods,{expires:7,path:"/"});
		
		
		var isOpen = confirm('要去看看购物车么？？？');
		if(isOpen){
			window.open('myshopcar.html');
		}
		
	});
});