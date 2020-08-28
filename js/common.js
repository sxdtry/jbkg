$(function(){

    //菜单控制 Start！
    // $(".menu-list").niceScroll({
    //     cursorcolor: "#c8c8c8",
    //     cursorwidth: "4px",
    //     cursorborder: "0px solid #fff"
    // });

    $('.menu-btn').on('click',function(e){
        e=window.event||e;
        if(document.all){  //只有ie识别
            e.cancelBubble=true;
        }else{
            e.stopPropagation();
        }
        $(this).addClass('on');
        $('.menu-page').toggleClass('menu-show');
    });
    $('body').on('click',function(){
        $('.menu-page').removeClass('menu-show');
        $('.menu-btn').removeClass('on');
    });
    $('.menu-page').on('click',function(e){
        e=window.event||e;
        if(document.all){  //只有ie识别
            e.cancelBubble=true;
        }else{
            e.stopPropagation();
        }
    });
    $('.menu-list h3').on('click',function(){
        if(!$(this).next().is(':animated')){
            $(this).parent().siblings().removeClass('on');
            $(this).parent().toggleClass('on');
            $(this).next().slideToggle();
            $(this).parent().siblings().find('.drop').slideUp();
            $(this).parent().toggleClass('active');
            $(this).parent().siblings().removeClass('active');
            // setTimeout(function(){
            //     $(".menu-list").getNiceScroll().resize();
            // },400)
        }
    });

    if($(window).width()>768){
        var winTop = 0;
        $(window).on('scroll',function(){
            var st = $(this).scrollTop();
            if(st>winTop){
                $('.sub-menu').slideUp();
            }else{
                $('.sub-menu').slideDown();
            }
            winTop = st;
        })
        $('.page-header').hover(function(){
            $('.sub-menu').stop().slideDown();
        },function(){
            $('.sub-menu').stop().slideUp();
        })
    }
    
    //菜单控制 End！

    //搜索框控制 Start!
    $('.search-btn').on('click',function(e){
        e.stopPropagation();
        $('.search-form').slideToggle(300);
    });
    $('body').on('click',function(){
        $('.search-form').slideUp(300);
    });
    $('.search-form').on('click',function(e){
        e.stopPropagation();
    })
    //搜索框控制 End!

    IEAnimation();

    //底部分享
    if($('.my-share')){
        $('.my-share').share({sites: ['facebook', 'twitter', 'linkedin','weibo','wechat']});
    }

    //搜过框提示文字
    var searchTxt = '请输入关键字';
    $('.news-search').each(function(i,el){
        $(el).val(searchTxt);
        $(el).focus(function(){
            if($(el).val()==searchTxt)$(el).val('');
        });
        $(el).blur(function(){
            if($(el).val()=='')$(el).val(searchTxt);
        })
    });
    
});

function gerSectionTop(elem,arr) {
    var imgSrc = [];
    var imgs = []; 
    var c = 0;
    $('img').each(function(i,el){
        imgSrc.push($(el).attr('src'));
    });
    for (var i = 0; i < imgSrc.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = imgSrc[i];
        imgs[i].onload = function(){
            c++
            if(c == imgSrc.length){
                $(elem).each(function(i,el){
                    //var top = $(el).offset().top - $('.index-header').outerHeight() - $('.sub-menu').outerHeight();
                    var top = $(el).offset().top - $('.index-header').outerHeight();
                    arr.push(top);
                })
            }
        }
    }
}

function IEAnimation(){
    //兼容ie Start!
    var DEFAULT_VERSION = 11;
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var isIE11 = ua.match(/rv:([\d.]+)\) like gecko/);
    var isEdge = navigator.userAgent.indexOf("Edge") > -1; 
    if(isIE||isEdge||isIE11){
        $('.animated').animate({opacity: 1},800)
    }
}

function getSectionNum(str){
    var href = window.location.href;
    var num = href.split(str)[1]-1;
    return num==undefined?0:parseInt(num);
}

function addAnimation(){
    $('.animation-sec').each(function(i,el){
        move();
        $(window).on('scroll',function(){
            move();
        });
        function move(){
            var ot = $(el).offset().top;
            var top = $(window).scrollTop();
            var wh = $(window).height();
            if(top>=(ot-wh*2/3)&&top<=(ot+wh)){
                $(el).addClass('animation-action');
            }else{
                $(el).removeClass('animation-action');
            }
        }
    });
}

function setAnimDelay(parent,elem,num){
    $(parent).find(elem).each(function(i,el){
        $(el).css('animation-delay',(i*num+'s'));
    })
}