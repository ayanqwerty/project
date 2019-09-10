$(document).ready(function () {
    let $hrefsid = location.search.substring(1).split('=')[1];
    const $spic = $('.pic-preview .spic');
    const $bpic = $('.pic-preview .bf img');
    const $sf = $('.pic-preview .spic .sf');
    const $bf = $('.pic-preview .bf');
    const $smallpic = $('.pic-preview .picList ul li img');
    let $bili = null;

    var sidarr = []; //存放商品的编号数组
    var numarr = []; //存放商品的数量数组

    var myobj = {
        addcookie: function (key, value, day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + date;
        },
        getcookie: function (key) {
            let arr = decodeURIComponent(document.cookie).split('; ');
            for (let value of arr) {
                let newarr = value.split('=');
                if (key === newarr[0]) {
                    return newarr[1];
                }
            }
        },
        delcookie: function (key) {
            addcookie(key, '', -1);
        }
    }

    $.ajax({
        type: "post",
        url: "http://10.31.157.56/JS-1907/project1/php/details.php",
        data: {
            sid: $hrefsid
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            let imgsurl = data.urls.split('，');
            $spic.children('img').attr('src', data.url);

            $spic.children('img').attr('sid', data.sid);

            $bpic.attr('src', data.url);
            $('.pic-preview .picList img').eq(0).attr('src', imgsurl[0]);
            $('.pic-preview .picList img').eq(1).attr('src', imgsurl[1]);
            $('.pic-preview .picList img').eq(2).attr('src', imgsurl[2]);
            $('.product-info .summary-name h1').html(data.title);
            $('.product-info .summary-name p').html(data.info);
            $('.product-info .summary-price strong').html(data.price);
            $('.summary-other .selected span').eq(0).html(data.standard_price);
            $('.summary-other .selected span').eq(1).html(data.standard_num);
            $('.summary-other .right td').eq(0).html(data.ori_address);
            $('.summary-other .right td').eq(1).html(data.good_id);
            $('.summary-other .right td').eq(2).html(data.brand);
        },
        error: function (e) {
            console.log(e);
        }
    });

    // 放大镜效果
    //  1.移入显示小放和大放
    $spic.hover(function (param) {
        $sf.show();
        $bf.show();

        // 3.鼠标移，小放跟
        $spic.on('mousemove', function (ev) {
            sfmove(ev);
        })

    }, function () {
        $sf.hide();
        $bf.hide();
    })

    // 2.求小放的尺寸
    $sf.css({
        width: $spic.width() * $bf.width() / $bpic.width(),
        height: $spic.height() * $bf.height() / $bpic.height()
    })
    // 4.求比例
    $bili = $bpic.width() / $bf.width();
    // 5.点击切换图片
    $smallpic.hover(function () {
        let $picurl = $(this).attr('src');
        $spic.children('img').attr('src', $picurl);
        $bpic.attr('src', $picurl);
    })

    // 小放运动的封装
    function sfmove(ev) {
        let l = ev.pageX - $spic.offset().left - $sf.width() / 2;
        let t = ev.pageY - $spic.offset().top - $sf.height() / 2;

        if (l <= 0) {
            l = 0;
        } else if (l >= $spic.width() - $sf.width()) {
            l = $spic.width() - $sf.width();
        }
        if (t <= 0) {
            t = 0;
        } else if (t >= $spic.height() - $sf.height()) {
            t = $spic.height() - $sf.height();
        }

        $sf.css({
            left: l,
            top: t
        });
        $bpic.css({
            left: -l * $bili,
            top: -t * $bili
        })
    }

    //加入购物车。
    function cookieToArray() {
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            sidarr = myobj.getcookie('cookiesid').split(',') //cookie存放商品编号的key值
            numarr = myobj.getcookie('cookienum').split(',') //cookie存放商品数量的key值
        }
    }
    
    $('.addcart').on('click', function () {
        var $sid = $(this).parents('.product-intro').find('.spic').find('img').attr('sid');
        cookieToArray();
        if ($.inArray($sid, sidarr) !== -1) { 
            var changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + parseInt($('#p_number').val());
            numarr[$.inArray($sid, sidarr)] = changenum;
            myobj.addcookie('cookienum', numarr.toString(), 10);
        } else { 
            sidarr.push($sid);
            myobj.addcookie('cookiesid', sidarr.toString(), 10);
            numarr.push($('#p_number').val());
            myobj.addcookie('cookienum', numarr.toString(), 10);
        }
        alert('添加购物车成功');
    });

    

    // 点击+-号，商品数量加减
    $('.increase').on('click', function () {
        let $num = parseInt($('#p_number').val())
        $num++;
        $('#p_number').val($num);
    })
    $('.decrease').on('click', function () {
        let $num = parseInt($('#p_number').val())
        $num--;
        if ($num <= 0) {
            $num = 0;
        }
        $('#p_number').val($num);
    })

});