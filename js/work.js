
////////////////////////
// GLOBAL VARS

var whichPage;

var showAbout = false;
var showContact = false;
var trans = false;

var workDest = "work.html"
var procDest = "process/"

////////////////////////
// SETUP ON READY

$(document).ready(function() {

    $("#workBg").backstretch("img/main/1.jpg");
    alert(document.getElementById("workBg"));

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
});

$(".navLink").click(function(event){
    event.preventDefault();
    var dest = $(this).attr("data-dest");
    var active = $(this).index();
    $(".navLink").each(function(){
        $(this).removeClass("underlined");
    })

    if (dest == "work") {
        $("#container").fadeOut(1000,function(){
            document.location.href = workDest;
        })
    } else if (dest == "process") {
        $("#container").fadeOut(1000,function(){
            document.location.href = procDest;
        })
    } else {
        overlay(dest,active);
    };
});

$(".mmenuLink").click(function(event){
    event.preventDefault();
    var dest = $(this).attr("data-dest");

    if (dest == "work") {
        document.location.href = workDest;
    } else if (dest == "process") {
        document.location.href = procDest;
    } else {
        $("#my-menu").trigger("close.mm");
        overlay(dest,99);
    };
});

$(".closeOver").click(function(){
    hideOver();
});

$("#logoTop, #antaresName").click(function(){
    if (showAbout || showContact) {
        hideOver();
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

////////////////////////
// CUSTOM FUNCTIONS

function hideOver(){
    if (showAbout && !trans) {
        trans = true;
        $("#aboutInfo").fadeOut("slow",function(){
            $("#headerbg").animate({height: "100%"},function(){
                fadeRGBA($("#headerbg"),0.75);
                $("#labelPane").fadeIn("slow",function(){
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
                $("#labelPane").fadeIn("slow",function(){
                    showContact = false;
                    trans = false;        
                });
            });
        });
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
            $("#labelPane").fadeOut( "slow");
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
                    $("#labelPane").fadeIn("slow",function(){
                        showAbout = false;
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
            $("#labelPane").fadeOut( "slow");
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
                    $("#labelPane").fadeIn("slow",function(){
                        showContact = false;
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

////////////////////////
// UTILITIES

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,250)};return c};

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

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

