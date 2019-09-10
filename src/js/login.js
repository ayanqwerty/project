$(document).ready(function () {

    let flag=true;

    const $change = $(".right-frame .repass a");
    $change.on('click', function () {
        $(this).siblings('b').html(randomNum(1000, 9999));
    });
    $change.trigger('click');


    $("[type='submit']").on('click', function () {
        
        if ($("#PhoneNum").val() == '') {
            $(".msg-wrap").show().children().html('登录名不能为空');
            if ($("#Password").val() == '') {
                $(".msg-wrap").show().children().html('登录名不能为空');
            }
            return false;
        }
        if ($("#Password").val() == '') {
            $(".msg-wrap").show().children().html('密码不能为空');
            return false;
        }
        if ($("#code").val() == '' || $("#code").val() !== $("#yzm").html()) {
            $(".msg-wrap").show().children().html('请输入正确的验证码');
            return false;
        }

        let $phonenum = $("#PhoneNum").val();
        let $password = $("#Password").val();
        console.log($phonenum);
        console.log($password);
        $.ajax({
            type: "post",
            url: "http://10.31.157.56/JS-1907/project1/php/login.php",
            data: {
                phonenum: $phonenum,
                password: $password
            },
            success: function (d) {
                console.log(d);
                if (d) {
                    flag=true;
                    alert('恭喜你，登录成功！');
                    location.href = "http://10.31.157.56/JS-1907/project1/dist/html/";
                    
                } else {
                    $(".msg-wrap").show().children().html('账号或者密码错误');
                    flag=false;
                }
            }
        });
    })

    if(!flag){
        return false;
    }
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    $(".qq").on('click',function(){
        $(this).parents('.right-frame').find('.login-dialog').show();
        $(this).parents('.right-frame').find('.mask').show();
    })
    $(".weibo").on('click',function(){
        $(this).parents('.right-frame').find('.login-dialog').show();
        $(this).parents('.right-frame').find('.mask').show();
    })
    $(".close").on('click',function(){
        $(this).parent().hide();
        $(this).parent().siblings('.mask').hide();
    })
});