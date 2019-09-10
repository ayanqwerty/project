$(document).ready(function () {
    class index {
        constructor() {
            this.$cityTit = $('.top-nav .targetCity .city-tit');
            this.$cityNav = $('.top-nav .targetCity .city-nav');
            this.$cityTab = $('.targetCity .city-nav .citytab li');
            this.$cityList = $('.targetCity .city-nav .citylist');
            this.$secondA = $('.city-nav .citylist dd>a')
            this.$cityListTab = $('.city-nav .citylist .citylist-tab');

            this.$search = $('.header .search [type="text"]');
            this.$reminder = $('.header #reminder');

            this.$allGoods = $('.allGoods .sort-title');
            this.$item = $('.allGoods .item h3 a');
            this.$itemDetail = $('.allGoods .item .sub-item');

            this.$louti = $('.louti');
            this.$loutiItem = $('.louti a b');

            this.$goTop = $('.sidenav .side-goTop');

            this.$cart = $('.header .cart');
            this.$banner=$(".banner");
            this.$A=$(".city-nav a").not("#allcity");
        }
        init() {
            let _this = this;
            //1.topnav-上海-tab切换
            // 1.1鼠标悬停二级出现，移开消失
            this.$cityTit.hover(function () {
                $(this).css({ backgroundColor: '#008842' }).children('a').css({ color: '#fff' }).children('span').css({ backgroundPosition: '-25px 0' });
                $(this).next().show();
            }, function () {
                $(this).css({ backgroundColor: '#f7f9f8' }).children('a').css({ color: '#008842' }).children('span').css({ backgroundPosition: '0 0' });
                $(this).next().hide();
            })
            // 1.2鼠标移入二级不消失，移出消失
            this.$cityNav.on('mouseover', function () {
                $(this).show();
                _this.$cityTit.trigger('hover');
            })
            this.$cityNav.on('mouseout', function () {
                $(this).hide();
            })
            // 1.3tab切换
            this.$cityTab.hover(function () {
                $(this).addClass('active').siblings().removeClass('active');
                _this.$cityList.eq($(this).index()).addClass('active').siblings('.citylist').removeClass('active');
            })
            // 2.搜索框的下拉提示
            this.$search.on('focus', function () {
                $(this).val(' ').css({ backgroundColor: '#fff' })
            })
            // this.$search.on('input',function () { 
            //     _this.createScript();
            //  })

            // 3.全部商品分类的二级效果
            // 3.1点击二级效果出现
            this.$allGoods.on('click', function () {
                let $sortList = $(this).siblings();
                if ($sortList.css('display') == 'none') {
                    $sortList.show();
                }
                else {
                    $sortList.hide();
                }
                _this.$itemDetail.hide();
            })
            // 3.2二级的tab切换
            this.$item.on('mouseover', function () {
                $(this).addClass('current').children('b').show();
                $(this).addClass('current').parent().siblings().show();
                _this.$item.not($(this)).removeClass('current').children('b').hide();
                _this.$item.not($(this)).parent().siblings().hide();
            })
            this.$item.on('mouseout', function () {
                _this.$itemDetail.hide();
                $(this).removeClass('current').children('b').hide();
            })
            this.$itemDetail.on('mouseover', function () {
                $(this).show();
                $(this).siblings().children().addClass('current').children('b').show();
            })
            this.$itemDetail.on('mouseout', function () {
                $(this).hide();
                $(this).siblings().children().removeClass('current').children('b').hide();;
            })

            // 4.楼梯效果

            // 4.2拖动滚动条，显示隐藏楼梯
            $(window).on('scroll', function () {
                _this.scroll($(this));
            })

            //  4.4给楼梯添加点击事件
            this.$loutiItem.parent().on('click', function () {
                $(this).addClass('active').siblings().removeClass("active");
                let $top = $('.floor').eq($(this).index()).offset().top;
                $('html,body').animate({
                    scrollTop: $top
                })
            })

            // 5.回到顶部
            this.$goTop.on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                })
            })

            //  6.购物车
            this.$cart.hover(function () {
                $(this).find('.shop-list').show(200);
                $('.nogoods').show();
            }, function () {
                $(this).find('.shop-list').hide();
            })
            $('.shop-list').on('mouseover', function () {
                $(this).show();
                $('.nogoods').show();
            })
            $('.shop-list').on('mouseout', function () {
                $(this).hide();
            })

            // 7.banner
            this.$banner.hover(function (param) {
                $(this).find(".banner-arrow a").show();
            }, function () {
                $(this).find(".banner-arrow a").hide();
            })

        }
        // 4.2
        scroll(obj) {
            let _this = this;
            let $scorlltop = obj.scrollTop();
            if ($scorlltop >= 700) {
                this.$louti.show();
            }
            else {
                this.$louti.hide();
            }
            // 4.3拖动滚轮，获取楼层top
            $('.floor').each(function (value, element) {
                let $floortop = $(element).offset().top;
                if ($scorlltop > $floortop - 250) {
                    _this.$loutiItem.eq(value).addClass('active');
                    _this.$loutiItem.not(_this.$loutiItem.eq(value)).removeClass('active');
                }
                
            })
            //5.
            if ($scorlltop >= 500) {
                _this.$goTop.show();
            }
            else {
                _this.$goTop.hide();
            }
        }
        

    }

    new index().init();
})
