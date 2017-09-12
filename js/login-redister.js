/*头部右侧动画*/
$(function() {
	$('#right-ul').children('li').hover(function() {
		$(this).children('ul,dl,div').show();
	}, function() {
		$(this).children('ul,dl,div').hide();
	});
});
/* 表单验证插件*/
$(function() {
	$("#subredisterinfo1").validate();
	//$("#subredisterinfo2").validate();
	//$("#subredisterinfo3").validate();
});
/*选项卡*/
$(function() {

	$("#position-ul li").hover(function() {
		$(this).addClass("curr").siblings('li').removeClass();
		var index = $(this).index();
		$("#redidster-con .page").eq(index).css('display', 'block').siblings('.page').css('display', 'none')
	}, function() {

	})
});
/*获取表单元素并存入cookie中*/
$(function() {
	//验证手机号
	$("#phone").on('blur', function() {
		var phone = $("#phone").val();
		var reg = /^1[0-9]{10}$/g;
		if (reg.test(phone)) {
			$("#phone-error").text("对的，没毛病").css('display', 'block');
		} else {
			$("#phone-error").text("错了，请重新输入").css('display', 'block');
		}
	});
	//验证验证码
	$("#massages1").on('blur', function() {
		var inputChar = $(this).val();
		var iChar = $("#myspan").text();
		if (inputChar.toUpperCase() !== iChar.toUpperCase()) {
			$("#myspan").text('输错了');
		}

	});


	//点击同意协议
	var isClick = false;
	$("#agree").on('click', function() {
		if ($("#iagree").prop('checked')) {
			$("#logining").css('background', '#e4393c');
			isClick = true;
		} else {
			$("#logining").css('background', '#ccc');
			isClick = false;
		}
	});


	//获取用户名和密码
	$("#logining").on("click", function() {
		if (isClick) {
			var
				usersName = $("#cname").val(),
				passWord = $("#password").val(),
				phone = $("#phone").val();

			//console.log(usersName,passWord,phone);
			var user = {
				userName: usersName,
				passWord: passWord,
				phone: phone
			};
			$.cookie.json = true;
			var userInfo = $.cookie("userInfo");
			// 判断是否读取到数组
			if (!userInfo) { // 未读取到，说明是第一次添加购物车，则创建数组对象
				userInfo = [];
			}
			//判断是否存在用户名
			var index = findIndex(user.userName, userInfo);
			if (index === -1) {
				userInfo.push(user);
			} else {
				alert("用户名已存在");
			}
			$.cookie("userInfo", userInfo, {
				expires: 7,
				path: "/"
			});
			alert('注册成功');
			window.open('login.html');
			//找出数组中同名用户
			function findIndex(id, products) {
				for (var i in products) {
					if (products[i].id === id)
						return i;
				}
				return -1;
			}
		}
	});
});