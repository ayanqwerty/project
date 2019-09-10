$(document).ready(function () {
    
    //cookie操作方法
    let myobj = {
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

    //获取cookie,进行商品列表的渲染。
    if (parseInt(myobj.getcookie('cookiesid')) && parseInt(myobj.getcookie('cookienum'))) {
        var csid = myobj.getcookie('cookiesid').split(','); //数组
        var cnum = myobj.getcookie('cookienum').split(',');
        $.each(csid, function (index, value) {
            showgoodslist(csid[index], cnum[index]);
        })
    }
    //封装函数，实现商品列表的渲染。
    function showgoodslist(sid, num) {
        $.ajax({
            type: "post",
            url: "http://10.31.157.56/JS-1907/project1/php/cart.php",
            dataType: "json",
            success: function (data) {
                let strhtml = '';
                $.each(data, function (index, value) {
                    if (value.sid == sid) {
                        strhtml += `
                    <table class="cart-table">
                        <tbody>
                            <tr>
                                <td class="cart-t-check"><input type="checkbox" checked=""></td>
                                <td class="cart-t-img"><a href="http://www.yiguo.com/product/6000037371.html"><img sid=${value.sid}
                                            src="${value.url}"></a>
                                </td>
                                <td class="cart-t-info"><a
                                        href="http://www.yiguo.com/product/6000037371.html">${value.title}</a>
                                    <p class="red"> </p>
                                </td>
                                <td class="cart-t-ub" style="width:75px;"></td>
                                <td class="cart-t-price">￥${value.price}</td>
                                <td class="cart-t-num">
                                    <div class="quantity-form">
                                        <a href="javascript:void(0);" class="decrement"></a>
                                        <input type="text" class="itxt" value="${num}" >
                                        <a href="javascript:void(0);" class="increment"></a>
                                    </div>
                                </td>
                                <td class="cart-t-total">￥<span>${(value.price * num).toFixed(2)}</span></td>
                                <td class="cart-t-spec">${value.standard_num}</td>
                                <td class="cart-t-opera">
                                    <a href="javascript:void(0);">移入收藏</a>
                                    <br>
                                    <a id="del"href="javascript:void(0);" >删除</a>
                                </td>
                            </tr>
        
                        </tbody>
                    </table>
                    `;
                        $(strhtml).insertBefore('.cart-list #theCart');
                        calc();
                    }
                })

            }
        });
    }
    //如果购物车为空,隐藏empty-cart
    empty();
    function empty() {
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            $('.cart-none').hide();
        } else {
            $('.cart-none').show();
        }
    }

    //全选
    $('.chkAll').on('click', function () {
        //$(this).parents().find('.goods-info').find('.cart-checkbox').find('input')
        $('.cart-alert').find('.cart-t-check').find('input').prop('checked', $(this).prop('checked'));
        calc();//重新计算
    });
    $('.cart-list').on('click', 'input:checkbox', function () {
        if (($('.cart-alert').find('.cart-t-check').find('input')).length === $('.cart-alert').find('.cart-t-check').find('input:checked').length) {
            $('.chkAll').prop('checked', true);
        } else {
            $('.chkAll').prop('checked', false);
        }
        calc();//重新计算
    });



    //总价和总的数量
    function calc() {
        let allprice = 0;//总价
        $('.cart-list .cart-table').each(function (index, element) {//遍历复选框是否选中
            if ($(element).find('.cart-t-check').find('input').is(':checked')) {
                allprice += parseInt($(element).find('.cart-t-total span').html());
            }
        });
        $('.fs14 span').html(allprice);
    }

    // cookie转数组
    var sidarr = []; //存放商品的编号数组
    var numarr = []; //存放商品的数量数组
    function cookieToArray() {
        if (myobj.getcookie('cookiesid') && myobj.getcookie('cookienum')) {
            sidarr = myobj.getcookie('cookiesid').split(',') //cookie存放商品编号的key值
            numarr = myobj.getcookie('cookienum').split(',') //cookie存放商品数量的key值
        }
    }

    //商品数量的改变
    // 点击+-号，商品数量加减
    $(".cart-list").on('click', '.increment', function () {
        let $num=parseInt($(this).siblings('.itxt').val());
        $num++;
        if ($num >= 99) {
	        $num = 99;
	    }
        $(this).siblings('.itxt').val($num);
        $(this).parents('.cart-t-num').siblings('.cart-t-total').find('span').html(singlegoodsprice($(this)));
	    calc();//重新计算总和。
	    setcookie($(this));//将改变的数量重新添加到cookie
    })
    $(".cart-list").on('click', '.decrement', function () {
        let $num=parseInt($(this).siblings('.itxt').val());
        $num--;
        if ($num <=1) {
	        $num = 1;
	    }
        $(this).siblings('.itxt').val($num);
        $(this).parents('.cart-t-num').siblings('.cart-t-total').find('span').html(singlegoodsprice($(this)));
	    calc();//重新计算总和。
	    setcookie($(this));//将改变的数量重新添加到cookie
    })

    //直接输入改变数量
	$('.cart-list').on('blur','.quantity-form input', function() {
        var $reg = /^\d+$/g; //只能输入数字
        console.log(singlegoodsprice($(this)))
	    var $value = parseInt($(this).val());
	    if ($reg.test($value)) {//是数字
	        if ($value >= 99) {//限定范围
	            $(this).val(99);
	        } else if ($value <= 0) {
	            $(this).val(1);
	        } else {
	            $(this).val($value);
	        }
	    } else {//不是数字
	        $(this).val(1);
	    }
	    $(this).parents('.cart-t-num').siblings('.cart-t-total').find('span').html(singlegoodsprice($(this)));
	    calc();
	    setcookie($(this));
	});


    //计算数量改变后单个商品的价格
	function singlegoodsprice(obj) { //obj:当前元素
	    var $dj = parseFloat(obj.parents('.cart-list').find('.cart-t-price').html().substring(1));//单价
	    var $cnum = parseInt(obj.parents('.quantity-form').find('input').val());//数量
	    return ($dj * $cnum).toFixed(2);//结果
    }
    // 存cookie
    function setcookie(obj) { //obj:当前操作的对象
		cookieToArray();//得到数组
	    var $index = obj.parents('.cart-list').find('.cart-t-img img').attr('sid');//通过id找数量的位置
	    numarr[$.inArray($index,sidarr)] = obj.siblings('.itxt').val();
	    myobj.addcookie('cookienum', numarr.toString(), 10);
    }
    

    //删除cookie
	function delgoodslist(sid, sidarr) {//sid：当前删除的sid，arrsid:cookie的sid的值
	    var $index = -1;
	    $.each(sidarr,function(index,value){//删除的sid对应的索引位置。 index:数组项的索引
	    	if(sid==value){ 
	    		$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
	    	}
	    });
	    sidarr.splice($index, 1);//删除数组对应的值
	    numarr.splice($index, 1);//删除数组对应的值
	    myobj.addcookie('cookiesid', sidarr.toString(), 10);//添加cookie
	    myobj.addcookie('cookienum', numarr.toString(), 10);//添加cookie
	}
	
	//删除单个商品的函数(委托)
	$('.cart-list').on('click', '.cart-t-opera #del', function(ev) {
		cookieToArray();//得到数组,上面的删除cookie需要。
	    if(confirm('你确定要删除吗？')){
	     	$(this).parents('.cart-table').remove();//通过当前点击的元素找到整个一行列表，删除
	    }
	    delgoodslist($(this).parents('.cart-t-img').find('img').attr('sid'), sidarr);
	    calc();
    });
    

	// 删除全部商品的函数
	$('.fl a:last').on('click', function() {
		cookieToArray();//得到数组,上面的删除cookie需要。
		if(confirm('你确定要全部删除吗？')){
            sidarr.splice(0);
            numarr.splice(0);
            myobj.addcookie('cookiesid', sidarr.toString(), 10);
            myobj.addcookie('cookienum', numarr.toString(), 10);
            location.reload();
		    calc();
		}
	});



});