"use strict";$(document).ready(function(){var s=$(".message p .change"),i=!0,a=!0,l=!0,e=!0,t=!0,n=!0;s.on("click",function(){$(this).siblings("b").html(function(s,i){return Math.round(Math.random()*(i-s)+s)}(1e3,9999))}),$("#in2").on("blur",function(){if(""!==$(this).val()){if(/^1[3578]\d{9}$/.test($(this).val())){$(this).siblings("#phonenum").removeClass().addClass("pass-succ").html("<i></i>"),a=!0;var s=$("#in2").val();$.ajax({type:"post",url:"http://10.31.157.56/JS-1907/project1/php/register.php",data:{checkphone:s},success:function(s){a=s?($("#in2").siblings("#phonenum").removeClass().addClass("pass-error").html("<i></i>该手机号已存在"),!1):($("#in2").siblings("#phonenum").removeClass().addClass("pass-succ").html("<i></i>"),!0)}})}else $(this).siblings("#phonenum").removeClass().addClass("pass-error").html("<i></i>手机号格式不正确"),a=!1}else $(this).siblings("#phonenum").removeClass().addClass("pass-tip").html("<i></i>手机号不能为空"),a=!1}),$("#in3").on("blur",function(){if(""!==$("#in1").val())if($("#in1").val()==$(".mes-left p:first b").html()){if(""!==$(this).val()){l=/^\d{4}$/.test($(this).val())?($(this).siblings("#phonehint").removeClass().addClass("pass-succ").html("<i></i>"),!0):($(this).siblings("#phonehint").removeClass().addClass("pass-error").html("<i></i>请正确输入验证码"),!1)}else $(this).siblings("#phonehint").removeClass().addClass("pass-tip").html("<i></i>验证码不能为空"),l=!1;i=!0}else $(this).siblings("#phonehint").removeClass().addClass("pass-error").html("<i></i>请正确输入图形验证码"),i=!1;else $(this).siblings("#phonehint").removeClass().addClass("pass-error").html("<i></i>请输入图形验证码"),i=!1}),$("#in5").on("blur",function(){e=""!==$(this).val()&&""!==$("#in4").val()?6<=$(this).val().length&&6<=$("#in4").val().length?$(this).val()===$("#in4").val()?($(this).siblings("#repass").removeClass().addClass("pass-succ").html("<i></i>"),!0):($(this).siblings("#repass").removeClass().addClass("pass-error").html("<i></i>两次密码不一致"),!1):($(this).siblings("#repass").removeClass().addClass("pass-error").html("<i></i>密码不能小于六位"),!1):($(this).siblings("#repass").removeClass().addClass("pass-tip").html("<i></i>密码不能为空"),!1)}),$("#in4").on("blur",function(){e=""!==$(this).val()&&""!==$("#in5").val()?6<=$(this).val().length&&6<=$("#in5").val().length?$(this).val()===$("#in5").val()?($(this).parents().find("#repass").removeClass().addClass("pass-succ").html("<i></i>"),!0):($(this).parents().find("#repass").removeClass().addClass("pass-error").html("<i></i>两次密码不一致"),!1):($(this).parents().find("#repass").removeClass().addClass("pass-error").html("<i></i>密码不能小于六位"),!1):($(this).parents().find("#repass").removeClass().addClass("pass-tip").html("<i></i>密码不能为空"),!1)}),$("#in6").on("blur",function(){t=/^\d{6}$/.test($(this).val())||/^\s*$|^(\d+|\-){7,}$/.test($(this).val())?($(this).siblings("#invitecode").removeClass().addClass("pass-succ").html("<i></i>"),!0):($(this).siblings("#invitecode").removeClass().addClass("pass-error").html("<i></i>请输入正确的邀请码"),!1)}),$("#check").on("click",function(){n=$(this).prop("checked")?($("button").css({backgroundColor:"#008842"}),!0):($("button").css({backgroundColor:"grey"}),!1)}),$(".form2").on("submit",function(){return""===$("#in1").val()?($("#phonehint").removeClass().addClass("pass-error").html("<i></i>请输入图形验证码"),!1):""===$("#in2").val()?($("#phonenum").removeClass().addClass("pass-error").html("<i></i>手机号不能为空"),!1):""===$("#in3").val()?($("#phonehint").removeClass().addClass("pass-error").html("<i></i>验证码不能为空"),!1):""===$("#in4").val()&&""===$("#in5").val()?($("#repass").removeClass().addClass("pass-error").html("<i></i>密码不能为空"),!1):(n=0==$("#check").prop("checked")?($("#inputcheck").addClass("pass-error").html("<i></i>请接受服务协议"),!1):($("#inputcheck").removeClass().html(""),!0),!!(i&&a&&l&&e&&t&&n)&&void 0)})});