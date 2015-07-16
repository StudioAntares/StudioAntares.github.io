
////////////////////////
// GLOBAL VARS
var whichPage;

var mainProjects;

var showAbout = false;
var showContact = false;
var trans = false;

var workDest = "http://studio-antares.com/work.html"
var mediaDest = "http://studio-antares.com/media.html"
var procDest = "http://ongoing.studio-antares.com"
var homeDest = "http://studio-antares.com"
var aboutDest = "http://studio-antares.com/about/index.html"

var paneFade = "slow"
var $container;
var pageBg;

var whichThumbs = "all";
var sorting = false;

var screenAspect = "landscape";
var imgLoaded = false;
var totBarHeight = 0;
var leftoverHeight = 0;
var barStartTop = 50;

////////////////////////
// SETUP ON READY

jQuery(window).bind("unload", jQuery.noop);

$(document).ready(function() {
    getScreenAspect();
    FastClick.attach(document.body);

    $(".navLink").each(function(){
        var $this = $(this);
        if ($this.attr("data-dest")==="process") {
            $this.addClass("hidden");
        };
    })

    $("#my-menu ul li a").each(function(){
        var $this = $(this);
        if ($this.attr("data-dest")==="process") {
            $this.parent().addClass("hidden");
        };
    })

    $(".movHolder").each(function(){
        $(this).fitVids();
    });

    whichPage = "blog";
    pageBg = $("#blogBg");
    pageBg.backstretch(["mesh.jpg"],{duration: 6500, fade: 3000});

    if (Modernizr.csstransitions && Modernizr.opacity) {
        $("#projMargin").addClass("fadeMeIn");
    };

    $(".introCurtainOverlay").fadeOut(2000,function(){
        $(this).addClass("hidden");
    });

    // console.log(aboutInfoText);
    $("#aboutInfo").append(aboutInfoText);
    $("#contactInfo").append(contactInfoText + rot13rot5Encode(hide));


    $("#my-menu").mmenu({
        offCanvas: {
           position  : "right"
        }
     }).on( "closing.mm", function() {
        $(".menu").removeClass("clicked");
     }).css("visibility","visible");
});

////////////////////////
// EVENTS

$( window ).load(function() {
    if (jQuery.browser.mobile == true) {
        $("body").addClass("isMobile");
    } else {
        $("body").addClass("isNotMobile");
    };
    blogMargin();

    //resizeCover();
});

// window.onunload = function () {
//     console.log("fade");
// };

//need this for iphone back button
window.onpageshow = function (event) {
    if (event.persisted) {
        // alert("loaded");
        $("#container").removeAttr("style");
        $(".curtainOverlay").removeAttr("style");
        $(".introCurtainOverlay").addClass("hidden");
        //window.location.reload()
    }
};

// $(".menu").click(function(){
//     //alert("menu");
//     $("#my-menu").trigger("open.mm");
// });

var flag = false;
$(".menu, .touchPad").bind('touchstart click', function(){
  if (!flag) {
    flag = true;
    setTimeout(function(){ flag = false; }, 100);
    // alert("woo");
    $("#my-menu").trigger("open.mm");
    $(".menu").addClass("clicked");
  }

  return false
});

$(".navLink").click(function(event){
    event.preventDefault();

    var dest = $(this).attr("data-dest");
    var active = $(this).index();

    // alert(dest);

    if (dest == "home") {
        $("#container").fadeOut(1000,function(){
            document.location.href = homeDest;
        })
    } else if (dest == "work") {
        $("#container").fadeOut(1000,function(){
            document.location.href = workDest;
        })
    } else if (dest == "media") {
        $("#container").fadeOut(1000,function(){
            document.location.href = mediaDest;
        })
    } else if (dest == "about") {
        $("#container").fadeOut(1000,function(){
            document.location.href = aboutDest;
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
    } else if (dest == "home") {
        document.location.href = homeDest;
    } else if (dest == "media") {
        document.location.href = mediaDest;
    } else if (dest == "about") {
        document.location.href = aboutDest;
    } else {
        $("#my-menu").trigger("close.mm");
        overlay(dest,99);
    };
});

$(".closeOver").click(function(){
    hideOver();
});

$("#logoTop, #antaresName").click(function(){
    $("#container").fadeOut(1000,function(){
        document.location.href = homeDest;
    });
});


$(document).keyup(function(e) {
    if (e.keyCode == 27) {            // ESC
        hideOver();
    }   
});

on_resize(function() {
    //Throttled on-resize handler
    blogMargin();
})();

$( window ).resize(function() {
    //Normal on-resize handler
    //resizeBg(pageBg);
    //resizeCover();
});

////////////////////////
// CUSTOM FUNCTIONS

function blogMargin(){
    if (window.innerWidth > 768) {
        var bMargin = $("#antaresName").offset().left + $("#antaresName").width();
        $("#projMargin").css("margin-left",bMargin+"px");
        $("#blogNavBlock").css("width",bMargin+"px");
    } else {
        $("#projMargin").removeAttr("style");
    }
}

function hideOver(){
    if (showContact && !trans) {
        trans = true;
        $("#contactInfo").fadeOut("slow",function(){
            $(".curtainOverlay").fadeIn(1000,function() {
                $(".curtainOverlay").height("0px");
                $(".curtainOverlay").removeClass("transBG");
                showContact = false;
                trans = false;      
            })
        })
    }
};

function fadeRGBA(thing, target) {
    if (Modernizr.rgba) {
        thing.animate({backgroundColor: jQuery.Color( "rgba(0,0,0," + target + ")" )});
    };
};

function overlay(dest,active) {
    var winHeight = window.innerHeight;
    // console.log(trans);

    if (!showContact && !trans) {
        trans = true;
        $(".curtainOverlay").addClass("transBG");
        $(".curtainOverlay").height(window.innerHeight);
        $(".curtainOverlay").fadeIn(1000,function() {
            //*
            $("#contactInfo").fadeIn("slow",function(){
                showContact = true;
                trans = false;
            });
            //*/
        })
    }
}

function curtainTransition(dest) {
    $(".curtainOverlay").height(window.innerHeight);
    $(".curtainOverlay").fadeIn(1000,function(){
        document.location.href = dest;
        //alert("yasssss");
    })
}

function resizeBg(bg) {
    //bg.height(jQuery(window).height());
    if (bg !== undefined) {
        bg.height(jQuery(window).height()+60);
    };
    //resizeBg(pageBg);
}

function getScreenAspect() {
    ratio = window.innerHeight/window.innerWidth;
    if (ratio <= 1 && !($("body").hasClass("isMobile") && $("body").hasClass("aboutPage"))) {
        screenAspect = "landscape";
        $("body").removeClass("portrait");
        $("body").addClass("landscape");
        $("#projContainer").addClass("sideScroll");
        if ($("body").hasClass("aboutPage")) {
            $("body").removeClass("infoTop");
        };
    } else {
        screenAspect = "portrait";
        $("body").removeClass("landscape");
        $("body").addClass("portrait");
        $("#projContainer").removeClass("sideScroll");
        if ($("body").hasClass("aboutPage")) {
            $("body").addClass("infoTop");
        };
        $(".aboutPage .slide img").css("max-height","none");
        $(".aboutPage .bioInfoFirst").removeAttr("style");
        $(".bioOverlay").empty().removeAttr("style");
    };
    //console.log(screenAspect);
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

// Simple ROT13+ROT5 cipher (Javascript implementation)
// Copyright StatiX Industries 2013 (MIT License)
 
//This is the alphabet array
var alphaBetString = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z";
var alphaBetTable = alphaBetString.split(" ");
 
//This is the lookup table/array for the ROT13 characters
var rot13String = "N O P Q R S T U V W X Y Z A B C D E F G H I J K L M n o p q r s t u v w x y z a b c d e f g h i j k l m";
var rot13Table = rot13String.split(" ");
 
//This is for numbers. Numbers will be passed thru ROT5
var numberString = "1 2 3 4 5 6 7 8 9 0";
var numberTable = numberString.split(" ");
 
//This is the lookup table of ROT5
var rot5String = "6 7 8 9 0 1 2 3 4 5";
var rot5Table = rot5String.split(" ");
 
//Here's the table for symbols. Symbols will remain the same
var symbolString = "~ ` ! @ # $ % ^ & * ( ) _ + - = { } [ ] \\ | ; \' : \" < > ? , . /";
var symbolTable = symbolString.split(" ");
 
//Main function
var rot13rot5Encode = function(input) {
    var output = "";
    for (var i=0; i<input.length; i++) { //This is checking for spaces and if yes, add a space to the output
        for (var y=0; y<numberTable.length; y++) { //This is the ROT5 cipher for numbers
            if (input[i]==numberTable[y]) {
                output+=rot5Table[y];
            }
        }
        for (var x=0; x<alphaBetTable.length; x++) { //This is the ROT13 cipher for letters
            if (input[i]==alphaBetTable[x]) {
                output+=rot13Table[x];
            }
        }
        for (var w=0; w<symbolTable.length; w++) {
            if (input[i]==symbolTable[w]) {
                output+=symbolTable[w];
            }
        }
        if (input[i]==" ") {
            output+=" ";
        }
    }
    return output; //Ultimately, return the output
};
 
//If you want to run the cipher, uncomment the following lines and change userInput to your desired input
//var userInput = "Developed by Pan Ziyue (@sammy0025) in StatiX Industries.";
//console.log(rot13rot5Encode(userInput));


