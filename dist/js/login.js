"use strict";$(document).ready(function(){var i=!0,t=$(".right-frame .repass a");if(t.on("click",function(){$(this).siblings("b").html(function(t,n){return Math.round(Math.random()*(n-t)+t)}(1e3,9999))}),t.trigger("click"),$("[type='submit']").on("click",function(){if(""==$("#PhoneNum").val())return $(".msg-wrap").show().children().html("登录名不能为空"),""==$("#Password").val()&&$(".msg-wrap").show().children().html("登录名不能为空"),!1;if(""==$("#Password").val())return $(".msg-wrap").show().children().html("密码不能为空"),!1;if(""==$("#code").val()||$("#code").val()!==$("#yzm").html())return $(".msg-wrap").show().children().html("请输入正确的验证码"),!1;var t=$("#PhoneNum").val(),n=$("#Password").val();console.log(t),console.log(n),$.ajax({type:"post",url:"http://10.31.157.56/JS-1907/project1/php/login.php",data:{phonenum:t,password:n},success:function(t){console.log(t),t?(i=!0,alert("恭喜你，登录成功！"),location.href="http://10.31.157.56/JS-1907/project1/dist/html/"):($(".msg-wrap").show().children().html("账号或者密码错误"),i=!1)}})}),!i)return!1;$(".qq").on("click",function(){$(this).parents(".right-frame").find(".login-dialog").show(),$(this).parents(".right-frame").find(".mask").show()}),$(".weibo").on("click",function(){$(this).parents(".right-frame").find(".login-dialog").show(),$(this).parents(".right-frame").find(".mask").show()}),$(".close").on("click",function(){$(this).parent().hide(),$(this).parent().siblings(".mask").hide()})});