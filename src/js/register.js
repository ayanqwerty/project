$(document).ready(function () {
    const $changenum = $('.message p .change');

    let picyzmFlag = true;
    let phonenumFlag = true;
    let phonehintFlag = true;
    let repassFlag = true;
    let inviteFlag = true;
    let agreeFlag = true;
    // 1.给“换一张”添加点击事件
    $changenum.on('click', function () {
        $(this).siblings('b').html(randomNum(1000, 9999));
    })
    //  2.手机号的验证
    $('#in2').on('blur', function () {
        if ($(this).val() !== '') {
            let phonenumReg = /^1[3578]\d{9}$/;
            if (phonenumReg.test($(this).val())) {
                $(this).siblings('#phonenum').removeClass().addClass('pass-succ').html('<i></i>');
                phonenumFlag = true;
                let $phonenum = $('#in2').val();
                $.ajax({
                    type: "post",
                    url: "http://10.31.157.56/JS-1907/project1/php/register.php",
                    data: {
                        checkphone: $phonenum
                    },
                    success: function (response) {
                        if (!response) {
                            $('#in2').siblings('#phonenum').removeClass().addClass('pass-succ').html('<i></i>');
                            phonenumFlag = true;
                        } else {
                            $('#in2').siblings('#phonenum').removeClass().addClass('pass-error').html('<i></i>该手机号已存在');
                            phonenumFlag = false;
                        }
                    }
                });
            }
            else {
                $(this).siblings('#phonenum').removeClass().addClass('pass-error').html('<i></i>手机号格式不正确');
                phonenumFlag = false;
            }
        } else {
            $(this).siblings('#phonenum').removeClass().addClass('pass-tip').html('<i></i>手机号不能为空');
            phonenumFlag = false;
        }
    })



    //  3.手机验证码
    $('#in3').on('blur', function () {
        if ($('#in1').val() !== '') {
            if ($('#in1').val() == $(".mes-left p:first b").html()) {
                if ($(this).val() !== '') {
                    let phoneyzmReg = /^\d{4}$/;
                    if (phoneyzmReg.test($(this).val())) {
                        $(this).siblings('#phonehint').removeClass().addClass('pass-succ').html('<i></i>');
                        phonehintFlag = true;
                    }
                    else {
                        $(this).siblings('#phonehint').removeClass().addClass('pass-error').html('<i></i>请正确输入验证码');
                        phonehintFlag = false;
                    }
                } else {
                    $(this).siblings('#phonehint').removeClass().addClass('pass-tip').html('<i></i>验证码不能为空');
                    phonehintFlag = false;
                }
                picyzmFlag = true;
            } else {
                $(this).siblings('#phonehint').removeClass().addClass('pass-error').html('<i></i>请正确输入图形验证码');
                picyzmFlag = false;
            }

        } else {
            $(this).siblings('#phonehint').removeClass().addClass('pass-error').html('<i></i>请输入图形验证码');
            picyzmFlag = false;
        }
    })

    // 4.密码

    $('#in5').on('blur', function () {
        if ($(this).val() !== '' && $('#in4').val() !== '') {
            if ($(this).val().length >= 6 && $('#in4').val().length >= 6) {
                if ($(this).val() === $('#in4').val()) {
                    $(this).siblings('#repass').removeClass().addClass('pass-succ').html('<i></i>');
                    repassFlag = true;
                } else {
                    $(this).siblings('#repass').removeClass().addClass('pass-error').html('<i></i>两次密码不一致');
                    repassFlag = false;
                }
            } else {
                $(this).siblings('#repass').removeClass().addClass('pass-error').html('<i></i>密码不能小于六位');
                repassFlag = false;
            }
        }
        else {
            $(this).siblings('#repass').removeClass().addClass('pass-tip').html('<i></i>密码不能为空');
            repassFlag = false;
        }
    })

    $('#in4').on('blur', function () {
        if ($(this).val() !== '' && $('#in5').val() !== '') {
            if ($(this).val().length >= 6 && $('#in5').val().length >= 6) {
                if ($(this).val() === $('#in5').val()) {
                    $(this).parents().find('#repass').removeClass().addClass('pass-succ').html('<i></i>');
                    repassFlag = true;
                } else {
                    $(this).parents().find('#repass').removeClass().addClass('pass-error').html('<i></i>两次密码不一致');
                    repassFlag = false;
                }
            } else {
                $(this).parents().find('#repass').removeClass().addClass('pass-error').html('<i></i>密码不能小于六位');
                repassFlag = false;
            }
        }
        else {
            $(this).parents().find('#repass').removeClass().addClass('pass-tip').html('<i></i>密码不能为空');
            repassFlag = false;
        }
    })

    // 6.邀请码
    $('#in6').on('blur', function () {
        let invitecodeReg = /^\d{6}$/;
        if (invitecodeReg.test($(this).val()) || (/^\s*$|^(\d+|\-){7,}$/).test($(this).val())) {
            $(this).siblings('#invitecode').removeClass().addClass('pass-succ').html('<i></i>');
            inviteFlag = true;
        }
        else {
            $(this).siblings('#invitecode').removeClass().addClass('pass-error').html('<i></i>请输入正确的邀请码');
            inviteFlag = false;
        }
    })

    // 7.同意协议
    $('#check').on('click', function () {
        if ($(this).prop('checked')) {
            $('button').css({
                backgroundColor: '#008842'
            })
            agreeFlag = true;
        } else {
            $('button').css({
                backgroundColor: 'grey'
            })
            agreeFlag = false;
        }
    })

    // 8.提交
    $('.form2').on('submit', function () {
        if ($('#in1').val() === '') {
            $('#phonehint').removeClass().addClass('pass-error').html('<i></i>请输入图形验证码');
            return false;
        }
        if ($('#in2').val() === '') {
            $('#phonenum').removeClass().addClass('pass-error').html('<i></i>手机号不能为空');
            return false;
        }
        if ($('#in3').val() === '') {
            $('#phonehint').removeClass().addClass('pass-error').html('<i></i>验证码不能为空');
            return false;
        }
        if ($('#in4').val() === '' && $('#in5').val() === '') {
            $('#repass').removeClass().addClass('pass-error').html('<i></i>密码不能为空');
            return false;
        }
        if ($('#check').prop('checked') == false) {
            $('#inputcheck').addClass('pass-error').html('<i></i>请接受服务协议');
            agreeFlag = false;
        } else {
            $('#inputcheck').removeClass().html('');
            agreeFlag = true;
        }
        if (!picyzmFlag || !phonenumFlag || !phonehintFlag || !repassFlag || !inviteFlag || !agreeFlag) {//所有标记为假的项，提交都要阻止。
            return false;
        }


    })

    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }



});