;(function () {
    var $carousel = $(".wjs_banner .carousel");
    var $img = $(".wjs_banner .carousel .item img");

    $(window).on("resize", function (e) {
        var pageWidth = $(this).width();
        // console.log(pageWidth)
        var isMobile = pageWidth <= 640 ? true : false;
        $img.each(function () {
            var src;
            if (isMobile) {
                src = $(this).data("msrc")
            } else {
                src = $(this).data("psrc")
            }
            $(this).attr("src", src)
        })
    }).resize();

    var start;
    $carousel.on("touchstart", function (e) {
        start = e.originalEvent.touches[0].clientX;
    });
    $carousel.on("touchend", function (e) {
        var distance = e.originalEvent.changedTouches[0].clientX - start;
        if (distance >= 50) {
            // console.log("上一页")
            $carousel.carousel('prev')
        }
        if (distance <= -50) {
            // console.log("下一页")
            $carousel.carousel('next')
        }
    })


})();

;(function(){
    // var $nav = $(".wjs_product .nav");
    // var $lis =$(".wjs_product ul li");
    // $lis.each(function(i){
    //     // console.log($lis.width());
    //     width += $(this).outerWidth(true)
    // });
    // $nav.width(width);
    // new IScroll(".nav_wrap");

    // $(function () {
    //     var $nav = $(".wjs_product .nav");
    //     var $li = $nav.find("li");
    //     var width = 0;
    //     $li.each(function () {
    //         //width: width
    //         //innerWidth:padding +width
    //         //outerWidth(false) : padding + border + width
    //         //outerWidth(true) : padding + border + margin + width
    //         width += $(this).outerWidth(true);
    //     });
    //     $nav.width(width);
    //     new IScroll(".nav_wrap");
    // });

})();