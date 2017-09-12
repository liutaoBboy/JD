$(function() {
	$('#person span,#payMethod span,#jdkd span').on('click', function() {
		$(this).css({
			"border": "1px solid #e4393c",
			"background": "url(img/moregoods-pic5.jpg) no-repeat right bottom"
		}).siblings('span').css({
			"border": "1px solid #ccc",
			"background": "none"
		});
	});
	//返回购物车
	$("#backShopCar").click(function() {
		window.open('myshopcar.html');
	});
});


$(function() {
	//点击新增显示遮罩层和弹出匡
	$("#add-newpreson").on('click', function() {
		//初始化对话框
		$("#personName").val('');
		$("#personAddress").val('');
		$("#personPhone").val('');
		$("#gdPhone").val('');
		$("#personEmail").val('');

		var
			winHeight = $(window).height(),
			winWidth = $(window).width(),
			boxHeight = $('#add-preson-addres').height(),
			boxWidth = $('#add-preson-addres').width();
		var
			iTop = (winHeight - boxHeight) / 2,
			iLeft = (winWidth - boxWidth) / 2;

		$('#add-preson-addres').css({
			top: iTop,
			left: iLeft,
			display: 'block'
		});
		$("#stopAll").css('display', 'block');


		//点击拖拽
		$('#add-preson-addres h3').on('mousedown', function(ev) {
			var
			//获取鼠标的落点
				clientX = ev.pageX,
				clientY = ev.pageY;
			var
			//获取h3当前位置
				iH3X = $(this).offset().left,
				iH3Y = $(this).offset().top;
			var
			//获取鼠标点击下距离h3左上距离
				iLeft = clientX - iH3X,
				iTop = clientY - iH3Y;

			//移动函数
			$(document).on('mousemove', function(ev) {
				var
				//获取鼠标移动的XY；
					iX = ev.pageX,
					iY = ev.pageY;
				var
				//获取left，top值
					moveX = iX - iLeft,
					moveY = iY - iTop;
				//判断边界
				if (moveX <= 0) {
					moveX = 0;
				}
				if (moveY <= 0) {
					moveY = 0;
				}
				if (moveX >= winWidth - boxWidth) {
					moveX = winWidth - boxWidth - 8;
				}
				if (moveY >= winHeight - boxHeight) {
					moveY = winHeight - boxHeight;
				}


				//移动框框
				$('#add-preson-addres').css({
					left: moveX,
					top: moveY
				});
			});
			$(document).on('mouseup', function() {
				$(document).off('mousemove');
				$(document).off('mousedown');
			});


		});

	});
	//点击关闭按钮，关闭遮罩层，和对话框
	$("#close").click(function() {
		$("#stopAll,#add-preson-addres").css('display', 'none');
	});

});


//获取表单的数据
$(function() {
	$("#saveBtn").on('click', function() {
		var
			personName = $("#personName").val(),
			personAddress = $("#personAddress").val(),
			personPhone = $("#personPhone").val(),
			gdPhone = $("#gdPhone").val(),
			personEmail = $("#personEmail").val(),
			adress = '',
			$html = '';
		/*$(".chose").each(function(index, element){
			 adress +=$(this).val(); 
		});*/
		$("#area select option:selected").each(function() {
			adress += $(this).val() + ' ';
		});
		$html = "<span>" + personName + ' ' + adress + personAddress + ' ' + personPhone + ' ' + gdPhone + ' ' + personEmail + "</span>";
		//console.log($html)
			/*$html.appendTo($("#person"));*/
		$("#person").append($html);
		$("#stopAll,#add-preson-addres").css('display', 'none');
	});
});

//收货地址二级联动
$(function() {
	// 后台获取地区数据
	var $province = $('#provice');
	var $city = $("#city");
	var $locality = $("#addr");
	$.get("json/more-address.json", function(data) {
		//console.log(data.length);
		//向省级地区添加元素
		for (var i = 0, len = data.length; i < len; i++) {
			var op1 = $("<option></option>");
			op1.html(data[i].name);
			op1.appendTo($province);
		}
		var provinceIndex = 0;
		//console.log($province.find('option').length);
		//根据省所在的索引确认城市
		$province.on('change', function() {
				$(this).children(".chose").remove();
				provinceIndex = $(this).children('option:selected').index();
				$("#city").children().remove();
				var se1 = $('<option >选择市</option>')
				se1.addClass("chose");
				se1.appendTo($city);
				for (var j = 0, len2 = data[provinceIndex].city.length; j < len2; j++) {
					var op2 = $("<option></option>");
					op2.html(data[provinceIndex].city[j].name);
					op2.appendTo($city);
				}
			})
			//根据城市所在的索引找出对应地区
		var cityIndex = 0;
		$city.on('change', function() {
			$(this).children(".chose").remove();
			cityIndex = $(this).children('option:selected').index();
			$locality.children().remove();
			var se1 = $('<option >选择县/区</option>')
			se1.addClass("chose");

			for (var k = 0, len3 = data[provinceIndex].city[cityIndex].area.length; k < len3; k++) {
				var op3 = $("<option></option>");
				op3.html(data[provinceIndex].city[cityIndex].area[k]);
				op3.appendTo($locality);
			}
		});
	});
}, 'json');

/*提交订单按钮*/
$(function() {
	$("#submitPay").on('click', function() {
		$("#successed").show();
	});
});