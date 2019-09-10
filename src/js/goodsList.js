$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "http://10.31.157.56/JS-1907/project1/php/goodslist.php",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            let strhtml = '';
            $.each(data, function (index, value) {
                strhtml += `
                    <li class="product-item">
                        <a href="http://10.31.157.56/JS-1907/project1/dist/html/details.html?sid=${value.sid}">
                            <img sid="${value.sid}"src="${value.url}" alt="">
                        </a>
                        <div class="pro-info">
                            <a href="http://10.31.157.56/JS-1907/project1/dist/html/details.html?sid=${value.sid}">
                                <p>${value.title}</p>
                            </a>
                            <span>￥<em>${value.price}</em></span>
                        </div>
                        <div class="buy-btn">
                            <a href="javascript:;">加入购物车</a>
                        </div>
                    </li>
                `;
            });

            $('.goodslist ul').html(strhtml);

            // 鼠标悬停li显示加入购物车，移开隐藏
            $(".goodslist ul").find('li').hover(function () {
                $(this).children('.buy-btn').show();
            }, function () {
                $(this).children('.buy-btn').hide();
            })


            // 点击加入购物车，商品加入购物车
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

            //加入购物车。
            function cookieToArray() {
                if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
                    sidarr = myobj.getcookie('cookiesid').split(',') //cookie存放商品编号的key值
                    numarr = myobj.getcookie('cookienum').split(',') //cookie存放商品数量的key值
                }
            }

            $('.buy-btn a').on('click', function () {
                var $sid = $(this).parents('li').children('a').find('img').attr('sid');
                cookieToArray();
                if ($.inArray($sid, sidarr) !== -1) {
                    var changenum = parseInt(numarr[$.inArray($sid, sidarr)]) + 1;
                    numarr[$.inArray($sid, sidarr)] = changenum;
                    myobj.addcookie('cookienum', numarr.toString(), 10);
                } else {
                    sidarr.push($sid);
                    myobj.addcookie('cookiesid', sidarr.toString(), 10);
                    numarr.push(1);
                    myobj.addcookie('cookienum', numarr.toString(), 10);
                }
                alert('添加购物车成功')
            });
            
        }
    });

});