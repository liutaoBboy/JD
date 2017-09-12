/*修改用户名*/
var iCur = null;
var iName = null;
$(function() {

	$.cookie.json = true;
	if ($.cookie("userInfo")) {
		iCur = $.cookie('userInfo').length;
		iName = $.cookie('userInfo')[iCur - 1].userName;
		if (iName !== null) {
			$("#user-name a:first").text("欢迎您，" + iName);
		}
	} else {
		$("#user-name a:first").text("你好，请登录！");
	}
});