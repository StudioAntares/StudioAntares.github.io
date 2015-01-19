
////////////////////////
// GLOBAL VARS
var whichPage;

var titles;
var descriptions;

var showAbout = false;
var showContact = false;
var trans = false;

var workDest = "work.html"
var procDest = "process/"
var homeDest = "index.html"

var paneFade = "slow"
var $container;
var pageBg;

var whichThumbs = "all";
var sorting = false;

var orientation = "landscape";
var imagesLoaded = false;

////////////////////////
// SETUP ON READY

jQuery(window).bind("unload", jQuery.noop);

$(document).ready(function() {
    getOrientation();

    if (document.getElementById("fullBg") !== null && document.getElementById("fullBg") !== undefined) {
        //alert("Home Page");
        whichPage = "home";
        $("body").addClass("homePage");
        pageBg = $("#fullBg");
        pageBg.backstretch(["img/main/1.jpg"],{duration: 2500, fade: 3000});
        resizeBg(pageBg);
    } else if (document.getElementById("workBg") !== null && document.getElementById("workBg") !== undefined) {
        //alert("Work Page");
        whichPage = "work";
        $("body").addClass("workPage");
        pageBg = $("#workBg");
        pageBg.backstretch(["img/work/mesh.jpg"],{duration: 6500, fade: 3000});
        //paneFade = 10;
        resizeThumbs();
        if (Modernizr.csstransitions && Modernizr.opacity) {
            $("#projMargin").addClass("fadeMeIn");
        };
        $container = $('#projContainer');
        // initialize
        $container.masonry({
            "columnWidth": ".projThumb",
            "gutter": ".gutter",
            "itemSelector": '.activeThumb',
            "isResizeBound": false
        });
        $container.masonry( 'on', 'layoutComplete', expandThumbBgs);
        resizeBg(pageBg);
    } else if (document.getElementById("projBg") !== null && document.getElementById("projBg") !== undefined) {
        //alert("Work Page");
        whichPage = "project";
        $("body").addClass("projPage");
        pageBg = $("#projBg");
        // pageBgSrc = pageBg.attr("data-src");
        // pageBg.backstretch([pageBgSrc],{duration: 6500, fade: 3000});
        //paneFade = 10;
        // resizeThumbs();
        // $container = $('#projContainer');
        workDest = "../../work.html"
        procDest = "../../process/"
        homeDest = "../../index.html"
        if (Modernizr.csstransitions && Modernizr.opacity) {
            $("#projMargin").addClass("fadeMeIn");
        };
    };

    // console.log(aboutInfoText);
    $("#aboutInfo").append(aboutInfoText);
    $("#contactInfo").append(contactInfoText);

    if (whichPage === "home") {
        titles = ["001",
                  "002",
                  "003",
                  "004",
                  "005",
                  "006",
                  "007",
                  "008",
                  "009",
                  "010"];
    
        descriptions = ["Description description content description stuff", 
                        "stuff stuff stuff describing things that are real", 
                        "Description description content description stuff", 
                        "stuff stuff stuff describing things that are real", 
                        "Description description content description stuff", 
                        "stuff stuff stuff describing things that are real", 
                        "Description description content description stuff",
                        "stuff stuff stuff describing things that are real",
                        "Description description content description stuff",
                        "stuff stuff stuff describing things that are real"]
    };

    //$("#projName").html(titles[0]);
    //$("#projDesc").html(descriptions[0]);

    var Menu;
    if (Modernizr.csstransitions && Modernizr.csstransforms) {
        Menu = {
            el: {
                ham: $('.menu'),
                menuTop: $('.menu-top'),
                menuMiddle: $('.menu-middle'),
                menuBottom: $('.menu-bottom')
            },
            init: function() {
                Menu.bindUIactions();
            },
            bindUIactions: function() {
                Menu.el.ham
                .on('click',
                    function(event) {
                    Menu.activateMenu(event);
                    event.preventDefault();
                    $("#my-menu").trigger("open.mm");
                    }
                );
            },
            activateMenu: function() {
                Menu.el.menuTop.toggleClass('menu-top-click');
                Menu.el.menuMiddle.toggleClass('menu-middle-click');
                Menu.el.menuBottom.toggleClass('menu-bottom-click'); 
            }
        };
        Menu.init();
    } else {

    };

    $("#my-menu").mmenu({
        offCanvas: {
           position  : "right"
        }
     }).on( "closing.mm", function() {
        Menu.el.menuTop.removeClass('menu-top-click');
        Menu.el.menuMiddle.removeClass('menu-middle-click');
        Menu.el.menuBottom.removeClass('menu-bottom-click'); 
     }).css("visibility","visible");

    //$("body").addClass("good");

});

////////////////////////
// EVENTS

var lastScrollLeft = 0;
$("#projContainer.singleProject").scroll(function() {
    if (orientation === "landscape") {
        var containerScrollLeft = $(this).scrollLeft();
        if (lastScrollLeft != containerScrollLeft) {
            if (whichPage === "project"){
                //console.log(containerScrollLeft);

                var maxScroll = $(".slides table").width() - window.innerWidth - 10;
                var perc = (containerScrollLeft*100)/maxScroll;

                if (perc > 100) {perc = 100;};
                if (perc < 0) {perc = 0;};

                perc = perc + "%";
                //console.log(perc);
                $(".projBar").css("width",perc);      
            }
            lastScrollLeft = containerScrollLeft;
        }
    } 
});

$(window).scroll(function() {
    if (orientation === "portrait") {
        if (whichPage === "project"){
            var containerScrollTop = $(this).scrollTop();
            //console.log(containerScrollTop);

            var maxScroll = $(document).height() - window.innerHeight - 10;            
            var perc = (containerScrollTop*100)/maxScroll;

            if (perc > 100) {perc = 100;};
            if (perc < 0) {perc = 0;};

            perc = perc + "%";
            //console.log(perc);
            $(".projBar").css("height",perc);       
        }
    };
});

$( window ).load(function() {
    //console.log("loaded");
    if (jQuery.browser.mobile == true) {
        //isMobile = true;
        $("body").addClass("isMobile");
    } else {
        $("body").addClass("isNotMobile");
    };
    if (whichPage === "home") {
        var bgArray = pageBg.data('backstretch');
        for (var i = 2; i <= 11; i++) {
            bgArray.images.push('img/main/' + i + '.jpg');
        };
    } else if (whichPage === "work") {
        createThumbImages();
    } else if (whichPage === "project") {
        addTextBg();
        resizeCover();
    };
});

$(window).on("backstretch.before", function (e, instance, index) {
    $("#projName, #projDesc").fadeOut(1500,function(){
        $("#projName").html(titles[index]);
        $("#projDesc").html(descriptions[index]);
        $("#projName, #projDesc").fadeIn(1500);
    });
});

$(window).on("backstretch.after", function (e, instance, index) {
});

$(".mediaButton").click(function(){
    var what = $(this).attr("data-control");
    pageBg.backstretch(what);
    if (what == "pause") {
        //alert(what);
        $(this).attr("data-control","resume");
        $(this).addClass("play");
    } else if (what == "resume") {
        //alert(what);
        $(this).attr("data-control","pause");
        $(this).removeClass("play");
    };
});

$(".navLink").click(function(event){
    event.preventDefault();
    var dest = $(this).attr("data-dest");
    var active = $(this).index();
    $(".navLink").each(function(){
        $(this).removeClass("underlined");
    })

    if (dest == "work") {
        if (whichPage === "work") {
            hideOver();
        } else {
            $("#container").fadeOut(1000,function(){
                document.location.href = workDest;
            })
        };
    } else if (dest == "process") {
        if (whichPage === "process") {
            hideOver();
        } else {
            $("#container").fadeOut(1000,function(){
                document.location.href = procDest;
            })
        };        
    } else {
        overlay(dest,active);
    };
});

$(".mmenuLink").click(function(event){
    event.preventDefault();
    var dest = $(this).attr("data-dest");

    if (dest == "work") {
        if (whichPage === "work") {
            hideOver();
            $("#my-menu").trigger("close.mm");
        } else {
            document.location.href = workDest;
        };
    } else if (dest == "process") {
        if (whichPage === "process") {
            hideOver();
            $("#my-menu").trigger("close.mm");
        } else {
            document.location.href = procDest;
        };
    } else if (dest == "home") {
        if (whichPage === "home") {
            hideOver();
            $("#my-menu").trigger("close.mm");
        } else {
            document.location.href = homeDest;
        };
    } else {
        $("#my-menu").trigger("close.mm");
        overlay(dest,99);
    };
});

$(".tagLink").click(function(event){
    event.preventDefault();
    var filter = $(this).attr("data-filter");

    if (filter === whichThumbs) {
        //alert("This IS active");
        // Do nothing
    } else if (filter === "all") {
        //alert("Will show All")
        sorting = true;
        whichThumbs = filter;

        $(".projThumb").each(function(index){
            // console.log(index);
            var outer = $(this);
            outer.addClass("activeThumb");
            outer.removeClass("projHidden");

            setTimeout(function() {
                //alert("woo")
                resizeThumbs();
                $container.masonry('reloadItems').masonry();
            }, 50);
        });
    } else {
        sorting = true;
        whichThumbs = filter;
        var amt = $('.projThumb').length;
        //alert(amt);
        $(".projThumb").each(function(index){
            // console.log(index);
            var outer = $(this);
            if ($(this).hasClass(filter)) {
                outer.addClass("activeThumb");
                outer.removeClass("projHidden");
            } else {
                $("p",this).fadeOut();
                $(".innerImage", this).animate({
                    height: "0px"
                  }, 500, function() {
                    outer.removeClass("activeThumb");
                    outer.addClass("projHidden");
                    //$container.masonry('reloadItems').masonry();
                  }
                );
            }
            if (index == amt-1) {
                setTimeout(function() {
                    //alert("woo")
                    resizeThumbs();
                    $container.masonry('reloadItems').masonry();
                }, 600);
            };
        });
    }
});

$(".innerImage").click(function(event){
    event.preventDefault();
    var projDest = $(this).attr("href");
    $("#container").fadeOut(1000,function(){
        document.location.href = projDest;
    })
});

$(".closeOver").click(function(){
    hideOver();
});

$("#logoTop, #antaresName").click(function(){
    // if (showAbout || showContact) {
    //     hideOver();
    // };
    if (whichPage !== "home") {
        var homeUrl = "index.html";
        if (whichPage === "project") {
            homeUrl = "../../index.html";
        };
        $("#container").fadeOut(1000,function(){
            document.location.href = homeUrl;
        })
    };
});

$("#projContainer.singleProject .slides").imagesLoaded()
  .done( function( instance ) {
    console.log('all images successfully loaded');
  })
  .fail( function(instance) {
    //console.log('all images loaded, at least one is broken');
    //console.log( instance.images.length + ' images loaded' );
    // detect which image is broken
    for ( var i = 0, len = instance.images.length; i < len; i++ ) {
        var image = instance.images[i];
        var result = image.isLoaded ? 'loaded' : 'broken';
        if (result === "broken") {
            $(".imgSlide").eq(i).detach();
            console.log( 'image is ' + result + ' for ' + image.img.src );
        };
    }

  });

$(document).keyup(function(e) {
    if (e.keyCode == 27) {            // ESC
        hideOver();
    }   
});

on_resize(function() {
    //Throttled on-resize handler
    
    
})();

$( window ).resize(function() {
    //Normal on-resize handler
    getOrientation();
    if (whichPage === "work" && $container != undefined) {
        resizeThumbs();
        $container.masonry();
    };
    resizeBg(pageBg);
    if (whichPage === "project") {
        resizeCover();
    };
});

////////////////////////
// CUSTOM FUNCTIONS

function hideOver(){
    if (showAbout && !trans) {
        trans = true;
        $("#aboutInfo").fadeOut("slow",function(){
            $("#headerbg").animate({height: "100%"},function(){
                fadeRGBA($("#headerbg"),0.75);
                $("#labelPane").fadeIn(paneFade,function(){
                    showAbout = false;
                    trans = false;        
                });
            });
        });
    } else if (showContact && !trans) {
        trans = true;
        $("#contactInfo").fadeOut("slow",function(){
            $("#headerbg").animate({height: "100%"},function(){
                fadeRGBA($("#headerbg"),0.75);
                $("#labelPane").fadeIn(paneFade,function(){
                    showContact = false;
                    trans = false;        
                });
            });
        });
    };
    if (whichPage === "work") {
        $(".navLink:eq(0)").addClass("underlined");
    };
};

function fadeRGBA(thing, target) {
    if (Modernizr.rgba) {
        thing.animate({backgroundColor: jQuery.Color( "rgba(0,0,0," + target + ")" )});
    };
};

function overlay(dest,active) {
    var winHeight = window.innerHeight;
    // console.log(trans);

    if (dest == "about" && !trans) {
        if (!showAbout && !showContact) {
            trans = true;
            $("#labelPane").fadeOut( paneFade);
            $("#headerbg").animate({height: winHeight +"px"}, function(){
                fadeRGBA($("#headerbg"),0.9);
                $("#aboutInfo").fadeIn("slow",function(){
                    showAbout = true;
                    $(".navLink:eq(" + active + ")").addClass("underlined");
                    trans = false;
                });
            });
        } else if (showAbout && !showContact) {
            trans = true;
            $("#aboutInfo").fadeOut("slow",function(){
                $("#headerbg").animate({height: "100%"},function(){
                    fadeRGBA($("#headerbg"),0.75);
                    $("#labelPane").fadeIn(paneFade,function(){
                        showAbout = false;
                        if (whichPage === "work") {
                            $(".navLink:eq(0)").addClass("underlined");
                        };
                        trans = false;        
                    });
                });
            });
        } else if (!showAbout && showContact) {
            trans = true;
            $("#contactInfo").fadeOut(function(){
                showContact = false;
                $("#aboutInfo").fadeIn("slow",function(){
                    showAbout = true;
                    $(".navLink:eq(" + active + ")").addClass("underlined");
                    trans = false;
                });
            });
        };

    } else if (dest == "contact" && !trans) {
        if (!showContact && !showAbout) {
            trans = true;
            $("#labelPane").fadeOut( paneFade);
            $("#headerbg").animate({height: winHeight +"px"}, function(){
                fadeRGBA($("#headerbg"),0.9);
                $("#contactInfo").fadeIn("slow",function(){
                    showContact = true;
                    $(".navLink:eq(" + active + ")").addClass("underlined");
                    trans = false;
                });
            });
        } else if (showContact && !showAbout) {
            trans = true;
            $("#contactInfo").fadeOut("slow",function(){
                $("#headerbg").animate({height: "100%"},function(){
                    fadeRGBA($("#headerbg"),0.75);
                    $("#labelPane").fadeIn(paneFade,function(){
                        showContact = false;
                        if (whichPage === "work") {
                            $(".navLink:eq(0)").addClass("underlined");
                        };
                        trans = false;        
                    });
                });
            });
        } else if (!showContact && showAbout) {
            trans = true;
            $("#aboutInfo").fadeOut(function(){
                showAbout = false;
                $("#contactInfo").fadeIn("slow",function(){
                    showContact = true;
                    $(".navLink:eq(" + active + ")").addClass("underlined");
                    trans = false;
                });
            });
        };
    };
}

function createThumbImages() {
    if (whichPage === "work") {
        $(".innerImage").each(function(){
            var $thumb = $(this);
            if ($thumb.attr("data-dir") !== null && $thumb.attr("data-dir") !== undefined) {
                var projectDir = $thumb.attr("data-dir");
                //console.log(projectDir);
                var thumbPath = "projects/" + projectDir + "/img/thumb.jpg";
                $thumb.backstretch([thumbPath],{duration: 6500, fade: 3000});
                projectDir = "projects/" + projectDir + "/index.html";
                $thumb.attr("href",projectDir);
            };
        });
    };
}

function resizeThumbs(){
    $(".projThumb").css("margin-bottom", $(".gutter").width()+"px");
    $(".projThumb").each(function(){
        var w = $(this).width();
        if ($(this).hasClass("vertThumb")) {
            $(this).css("height", (w * 1.5) + "px");
        } else {
            $(this).css("height", w + "px");
        };
    });
}

function resizeBg(bg) {
    //bg.height(jQuery(window).height());
    if (bg !== undefined) {
        bg.height(jQuery(window).height()+60);
    };
    //resizeBg(pageBg);
}

function expandThumbBgs(target) {
    if (sorting) {
        //alert("Expanded");
        $(".projThumb").each(function(){
            if ($(this).hasClass(whichThumbs) || whichThumbs === "all") {
                $(".innerImage", this).animate({
                    width: "100%",
                    height: "100%"
                  }, 500);
                $("p",this).fadeIn();
            }
        });
        sorting = false;
    };
}

function resizeCover(){
    getOrientation();

    if (orientation==="landscape") {

    }
    //var viewH = Math.floor(window.innerHeight * 0.8) - 50;
    //var viewW = Math.floor(window.innerWidth * 0.8);
    //var margWidth = $(".projMarginL").width();
    //var coverImage = $("#projContainer.singleProject");
    //var contWidth = coverImage.width();

    /*

    if (orientation==="landscape") {
        coverImage.css("height",viewH+"px");
        $("table", coverImage).css("height",viewH+"px");
        $(".spacer").css("width",margWidth+"px");
        $("img", coverImage).each(function(){
            //console.log($(this).attr("src"));
            $(this).css({"height":viewH+"px","width":"auto"});
        })
        $(".textSlide", coverImage).each(function(){
            //console.log("didsomething");
            $(this).css({"max-height":viewH+"px"});
        })
    } else {
        coverImage.css("height","100%");
        $("table", coverImage).css({"height":"auto","width":contWidth + "px"});
        $("img", coverImage).each(function(){
            //console.log($(this).attr("src"));
            $(this).css({"width":contWidth + "px","height":"auto"});
        })
        $(".textSlide", coverImage).each(function(){
            //console.log("didsomething");
            $(this).css({"width":contWidth + "px","max-height":viewH+"px"});
        })

        var barHeight = window.innerHeight - 2* $("header").height();
        $(".portrait .projNav").css({"height":barHeight + "px"})
    };

    $(".innerText", coverImage).each(function(){
        if ($(this).height() > $(this).parent().height()) {
            $(this).removeClass("vCenter");
        } else {
            // $(this).addClass("vCenter");
        };
    });
    


    /*
    // $(".firstSlide").css("width",viewW+"px");
    $("img", coverImage).each(function(){
        //console.log($(this).attr("src"));
        $(this).css({"height":viewH+"px","width":"auto"});
    })
    $(".textSlide", coverImage).each(function(){
        //console.log("didsomething");
        $(this).css({"max-height":viewH+"px"});
    })
    */  
}

function addTextBg() {
    $(".textSlide").each(function(){
        var $slide = $(this);
        if ($slide.attr("data-bg") !== null && $slide.attr("data-bg") !== undefined) {
            var bgPath = $slide.attr("data-bg");
            //console.log(bgPath);
            $slide.backstretch(bgPath);
        };
    });
}

function getOrientation() {
    ratio = window.innerHeight/window.innerWidth;
    if (ratio <= 1) {
        orientation = "landscape";
        $("body").removeClass("portrait");
        $("body").addClass("landscape");
    } else {
        orientation = "portrait";
        $("body").removeClass("landscape");
        $("body").addClass("portrait");
    };
    //console.log(orientation);
}

////////////////////////
// UTILITIES

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,150)};return c};

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*
event.preventDefault();
var items = $container.masonry('getItemElements');
//$container.masonry( 'remove', item[1] );
//$container.masonry( 'remove', document.getElementById("firstThumb") ).masonry();
var item = $container.masonry( 'getItem', items[0] );
console.log(item);
$container.masonry( 'remove', items[0] );
*/


