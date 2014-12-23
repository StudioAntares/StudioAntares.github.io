
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

////////////////////////
// SETUP ON READY

$(document).ready(function() {

    if (document.getElementById("fullBg") !== null && document.getElementById("fullBg") !== undefined) {
        //alert("Home Page");
        whichPage = "home";
        $("body").addClass("homePage");
        pageBg = $("#fullBg");
        pageBg.backstretch(["img/main/1.jpg"],{duration: 5500, fade: 3000});
        resizeBg(pageBg);
    } else if (document.getElementById("workBg") !== null && document.getElementById("workBg") !== undefined) {
        //alert("Work Page");
        whichPage = "work";
        $("body").addClass("workPage");
        pageBg = $("#workBg");
        pageBg.backstretch(["img/work/mesh.jpg"],{duration: 6500, fade: 3000});
        paneFade = 10;
        resizeThumbs();
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
    };

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

$( window ).load(function() {
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
    };
});

$(window).on("backstretch.before", function (e, instance, index) {
    $("#projName, #projDesc").fadeOut(1500,function(){
        $("#projName").html(titles[index]);
        $("#projDesc").html(descriptions[index]);
        $("#projName, #projDesc").fadeIn(1500);
    });

    if (whichPage === "work" && Modernizr.opacity) {
        $("#projMargin").fadeTo(2000,1.0);
    };
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

    // $container.masonry( 'on', 'layoutComplete', function() {
    //   expandThumbBgs(filter);
    //   return true;
    // });

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
                    $container.masonry('reloadItems').masonry();
                }, 600);
            };
        });
    }
});

$(".closeOver").click(function(){
    hideOver();
});

$("#logoTop, #antaresName").click(function(){
    // if (showAbout || showContact) {
    //     hideOver();
    // };
    if (whichPage !== "home") {
        $("#container").fadeOut(1000,function(){
            document.location.href = "index.html";
        })
    };
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

    if (whichPage === "work" && $container != undefined) {
        resizeThumbs();
        $container.masonry();
    };
    resizeBg(pageBg);
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


