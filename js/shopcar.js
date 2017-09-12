/*底部轮播图*/
$(function() {
	moreMove("goods-move");
});

/*读取商品*/
$(function() {
	$.cookie.json = true;
	var userGoods = $.cookie('userGoods');
	if (!userGoods) {
		userGoods = [];
	}
	//便利数组并添加到网页中
	$.each(userGoods, function(index, element) {
		$(".shop-goods:last").clone(true).insertBefore($("#goods-pay")).data('UserGood', element)
			.find(".goodID").text(element.goodsName).end()
			.find(".goods-text .color").text(element.goodsColor).end()
			.find(".goods-text .edition").text(element.goodsEdition).end()
			.find(".goods-info .price").text(element.goodsPrice).end()
			.find(".goods-info .goodsNum").text(element.goodsNum).end()
			.find(".goods-info .total").text(element.goodsPrice * element.goodsNum).end()
			.find('.goodsImg img').attr('src', element.goodsImg);

	});
	$(".shop-goods:first").remove();
	//增加数量
	var i = 0;
	$(".goods-info .add").on('click', function() {
		i = $(this).siblings('.goodsNum').text();
		i++;
		var iPrice = $(this).parents('li').siblings('.price').text();
		$(this).siblings('.goodsNum').text(i);
		$(this).parents('li').siblings('.total').text(iPrice * i);

		//改变cookie的值
		var $shopGoods = $(this).parents('.shop-goods');
		//console.log($shopGoods.data('NewUserGoods'))
		var userGood = $shopGoods.data("UserGood");
		var index = $.inArray(userGood, userGoods);
		//console.log(index);
		userGoods[index].goodsNum++;
		//存入cookie中
		$.cookie('userGoods', userGoods, {
			expires: 7,
			path: "/"
		});

	});
	//减少数量
	$(".goods-info .del").on('click', function() {
		i = $(this).siblings('.goodsNum').text();
		i--;
		if (i <= 0) {
			i = 0;
		}

		var iPrice = $(this).parents('li').siblings('.price').text();
		$(this).siblings('.goodsNum').text(i);
		$(this).parents('li').siblings('.total').text(iPrice * i);

		//改变cookie的值
		var $shopGoods = $(this).parents('.shop-goods');
		//console.log($shopGoods.data('NewUserGoods'))
		var userGood = $shopGoods.data("UserGood");
		var index = $.inArray(userGood, userGoods);
		//console.log(index);
		userGoods[index].goodsNum--;
		if (userGoods[index].goodsNum <= 0) {
			userGoods[index].goodsNum = 0;
		}
		//存入cookie中
		$.cookie('userGoods', userGoods, {
			expires: 7,
			path: "/"
		});


	});
	//删除按钮
	$(".model .delete").on('click', function() {
		$(this).parents('.shop-goods').remove();
	});
	//全选
	$(".all-choice").on('click', function() {
		$(".check").prop('checked', $(this).prop("checked"));

		scaleTotal();
	});
	//单选
	$('.check').click(function() {
		scaleTotal();
	});

	//删除选中行
	$("#delete-choice").click(function() {
		$(".check").each(function(index, element) {
			if ($(this).is(":checked")) {
				$(this).parents('.shop-goods').remove();

				//改变cookie的值
				var $shopGoods = $(this).parents('.shop-goods');
				//console.log($shopGoods.data('NewUserGoods'))
				var userGood = $shopGoods.data("UserGood");
				var index = $.inArray(userGood, userGoods);
				//console.log(index);
				userGoods.splice(index, 1);
				//存入cookie中
				$.cookie('userGoods', userGoods, {
					expires: 7,
					path: "/"
				});
			}
		});
	});

	//计算总价
	function scaleTotal() {
		var totalPay = 0;
		$(".check:checked").parents(".shop-goods").find(".total").each(function(index, element) {
			totalPay += parseFloat($(this).text());
		})
		$("#pay #goods-total").text(totalPay + '.00');

		var m = 0;
		$(".check:checked").each(function() {
			m++;
		});
		$("#goods-num").text(m);
	}
	//选中个数
	var m = 0;
	$(".check:checked").each(function() {
		m++;
	});
	$("#goods-num").text(m);
});

/*加入购物车*/
$(function() {
	$.cookie.json = true;
	
	var userGoods = $.cookie('userGoods');
	if (!userGoods) {
		userGoods = [];
	}
	//点击加入购物车 ，获取商品名字
	$(".add-shopcar").on('click', function() {
		var $addShop = $(this).parents(".shopdd");

		var product = {
				goodsNum: 1,
				goodsImg: $addShop.siblings().find('img').attr('src'),
				goodsName: $addShop.find(".good-id").text(),
				goodsPrice: $addShop.find(".goods-price").text(),
			}
			//console.log(product);
			/*userGoods.push(product);
			$.cookie("userGoods", userGoods, {
				expires: 7,
				path: "/"
			});*/

		/*假如有相同的商品，数量++*/
		//console.log(product.goodsPrice);
		//console.log(userGoods);

		var flag = true;
		for (var i in userGoods) {
			if (userGoods[i].goodsPrice === product.goodsPrice) {
				userGoods[i].goodsNum++;
				flag = false; //商品相同数量++，关闭flag，阻止products.push(product)执行
			}
		}
		if (flag) {
			//将当前次添加到购物车的商品保存到数组中
			userGoods.push(product);
		}

		$.cookie("userGoods", userGoods, {
			expires: 7,
			path: "/"
		});

		window.location.reload();
	})
});
$(function() {
	$('#gotopay').on('click', function() {
		window.open("topay.html");
	});
});