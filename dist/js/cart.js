"use strict";$(document).ready(function(){var e={addcookie:function(t,i,c){var n=new Date;n.setDate(n.getDate()+c),document.cookie=t+"="+encodeURIComponent(i)+";expires="+n},getcookie:function(t){var i=decodeURIComponent(document.cookie).split("; "),c=!0,n=!1,e=void 0;try{for(var a,o=i[Symbol.iterator]();!(c=(a=o.next()).done);c=!0){var r=a.value.split("=");if(t===r[0])return r[1]}}catch(t){n=!0,e=t}finally{try{!c&&o.return&&o.return()}finally{if(n)throw e}}},delcookie:function(t){addcookie(t,"",-1)}};if(parseInt(e.getcookie("cookiesid"))&&parseInt(e.getcookie("cookienum"))){var c=e.getcookie("cookiesid").split(","),n=e.getcookie("cookienum").split(",");$.each(c,function(t,i){!function(n,e){$.ajax({type:"post",url:"http://10.31.157.56/JS-1907/project1/php/cart.php",dataType:"json",success:function(t){var c="";$.each(t,function(t,i){i.sid==n&&(c+='\n                    <table class="cart-table">\n                        <tbody>\n                            <tr>\n                                <td class="cart-t-check"><input type="checkbox" checked=""></td>\n                                <td class="cart-t-img"><a href="http://www.yiguo.com/product/6000037371.html"><img sid='+i.sid+'\n                                            src="'+i.url+'"></a>\n                                </td>\n                                <td class="cart-t-info"><a\n                                        href="http://www.yiguo.com/product/6000037371.html">'+i.title+'</a>\n                                    <p class="red"> </p>\n                                </td>\n                                <td class="cart-t-ub" style="width:75px;"></td>\n                                <td class="cart-t-price">￥'+i.price+'</td>\n                                <td class="cart-t-num">\n                                    <div class="quantity-form">\n                                        <a href="javascript:void(0);" class="decrement"></a>\n                                        <input type="text" class="itxt" value="'+e+'" >\n                                        <a href="javascript:void(0);" class="increment"></a>\n                                    </div>\n                                </td>\n                                <td class="cart-t-total">￥<span>'+(i.price*e).toFixed(2)+'</span></td>\n                                <td class="cart-t-spec">'+i.standard_num+'</td>\n                                <td class="cart-t-opera">\n                                    <a href="javascript:void(0);">移入收藏</a>\n                                    <br>\n                                    <a id="del"href="javascript:void(0);" >删除</a>\n                                </td>\n                            </tr>\n        \n                        </tbody>\n                    </table>\n                    ',$(c).insertBefore(".cart-list #theCart"),a())})}})}(c[t],n[t])})}function a(){var c=0;$(".cart-list .cart-table").each(function(t,i){$(i).find(".cart-t-check").find("input").is(":checked")&&(c+=parseInt($(i).find(".cart-t-total span").html()))}),$(".fs14 span").html(c)}e.getcookie("cookiesid")&&e.getcookie("cookienum")?$(".cart-none").hide():$(".cart-none").show(),$(".chkAll").on("click",function(){$(".cart-alert").find(".cart-t-check").find("input").prop("checked",$(this).prop("checked")),a()}),$(".cart-list").on("click","input:checkbox",function(){$(".cart-alert").find(".cart-t-check").find("input").length===$(".cart-alert").find(".cart-t-check").find("input:checked").length?$(".chkAll").prop("checked",!0):$(".chkAll").prop("checked",!1),a()});var o=[],r=[];function s(){e.getcookie("cookiesid")&&e.getcookie("cookienum")&&(o=e.getcookie("cookiesid").split(","),r=e.getcookie("cookienum").split(","))}function i(t){return(parseFloat(t.parents(".cart-list").find(".cart-t-price").html().substring(1))*parseInt(t.parents(".quantity-form").find("input").val())).toFixed(2)}function l(t){s();var i=t.parents(".cart-list").find(".cart-t-img img").attr("sid");r[$.inArray(i,o)]=t.siblings(".itxt").val(),e.addcookie("cookienum",r.toString(),10)}$(".cart-list").on("click",".increment",function(){var t=parseInt($(this).siblings(".itxt").val());99<=++t&&(t=99),$(this).siblings(".itxt").val(t),$(this).parents(".cart-t-num").siblings(".cart-t-total").find("span").html(i($(this))),a(),l($(this))}),$(".cart-list").on("click",".decrement",function(){var t=parseInt($(this).siblings(".itxt").val());--t<=1&&(t=1),$(this).siblings(".itxt").val(t),$(this).parents(".cart-t-num").siblings(".cart-t-total").find("span").html(i($(this))),a(),l($(this))}),$(".cart-list").on("blur",".quantity-form input",function(){console.log(i($(this)));var t=parseInt($(this).val());/^\d+$/g.test(t)?99<=t?$(this).val(99):t<=0?$(this).val(1):$(this).val(t):$(this).val(1),$(this).parents(".cart-t-num").siblings(".cart-t-total").find("span").html(i($(this))),a(),l($(this))}),$(".cart-list").on("click",".cart-t-opera #del",function(t){s(),confirm("你确定要删除吗？")&&$(this).parents(".cart-table").remove(),function(c,t){var n=-1;$.each(t,function(t,i){c==i&&(n=t)}),t.splice(n,1),r.splice(n,1),e.addcookie("cookiesid",t.toString(),10),e.addcookie("cookienum",r.toString(),10)}($(this).parents(".cart-t-img").find("img").attr("sid"),o),a()}),$(".fl a:last").on("click",function(){s(),confirm("你确定要全部删除吗？")&&(o.splice(0),r.splice(0),e.addcookie("cookiesid",o.toString(),10),e.addcookie("cookienum",r.toString(),10),location.reload(),a())})});