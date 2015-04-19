
////////////////////////
// GLOBAL VARS
var whichPage;

var mainProjects;

var showAbout = false;
var showContact = false;
var trans = false;

var workDest = "work.html"
var mediaDest = "media.html"
var procDest = "process/"
var homeDest = "index.html"

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

    if (document.getElementById("fullBg") !== null && document.getElementById("fullBg") !== undefined) {
        //alert("Home Page");
        whichPage = "home";

        mainProjects = [
                  ["clubsuites","1","Santa Anita Club Suites",
                   "Arcadia, CA"],

                  ["mcc","1","Manhattan Country Club",
                   "Manhattan Beach, CA"],

                  ["sarenovation","1","Santa Anita Park Renovations",
                   "Arcadia, CA"],

                  ["quartet","1","QUARTET v4.0",
                   "Theatrical Stage Design, NYC"],

                  ["summitridge","1","Summitridge",
                   "Los Angeles, CA"],

                  ["redwood","1","Mar Vista Residence",
                   "Mar Vista, CA"],

                  ["sarenovation","2","Santa Anita Park Renovations",
                   "Arcadia, CA"],

                  ["mur","2","Multiple Unit Residence",
                   "Sofia, Bulgaria"],

                  ["horseinstall","1","Video Installation Proposal",
                   "Santa Anita Park, Arcadia, CA"],

                  ["resortspa","1","Resort & Spa",
                   "Rhodope Mountains, Bulgaria"]
                ]

        $("body").addClass("homePage");
        pageBg = $("#fullBg");
        var bgSrc = "projects/" + mainProjects[0][0] + "/img/cover" + mainProjects[0][1] + ".jpg";
        pageBg.backstretch([bgSrc],{duration: 2500, fade: 3000});
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
    } else if (document.getElementById("mediaBg") !== null && document.getElementById("workBg") !== undefined) {
        //alert("Work Page");
        whichPage = "media";
        $("body").addClass("mediaPage");
        pageBg = $("#mediaBg");
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

        $(".innerImage").each(function(){
            $(this).magnificPopup({
                type: 'ajax'
            });
        });

        

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
        mediaDest = "../../media.html"
        procDest = "../../process/"
        homeDest = "../../index.html"
        if (Modernizr.csstransitions && Modernizr.opacity) {
            $("#projMargin").addClass("fadeMeIn");
        };
        $(".introCurtainOverlay").fadeOut(2000,function(){
            $(this).addClass("hidden");
        });
    };

    // console.log(aboutInfoText);
    $("#aboutInfo").append(aboutInfoText);
    $("#contactInfo").append(contactInfoText + rot13rot5Encode(hide));

    if (whichPage === "home") {
        
    };

    //$("#projName").html(titles[0]);
    //$("#projDesc").html(descriptions[0]);

    var Menu;
    if (Modernizr.csstransitions && Modernizr.csstransforms) {
        /*
        Menu = {
            el: {
                ham: $('.menu'),
                menuTop: $('.menu-top'),
                menuMiddle: $('.menu-middle'),
                menuBottom: $('.menu-bottom')
            },
            init: function() {
                Menu.bindUIactions();
            }, bindUIactions: function() {
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
        //Menu.init();
        */
    } else {
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    };

    $("#my-menu").mmenu({
        offCanvas: {
           position  : "right"
        }
     }).on( "closing.mm", function() {
        $(".menu").removeClass("clicked");
     }).css("visibility","visible");

    //$("body").addClass("good");
    // alert("loaded");

    // $(".movHolder").each(function(){
    //     // $(this).fitVids();
    // });

});

////////////////////////
// EVENTS

$( window ).load(function() {
    //console.log("loaded");
    // $("#container").removeAttr("style");
    // alert("loaded");
    if (jQuery.browser.mobile == true) {
        //isMobile = true;
        $("body").addClass("isMobile");
    } else {
        $("body").addClass("isNotMobile");
    };
    if (whichPage === "home") {
        var bgArray = pageBg.data('backstretch');
        for (var i = 1; i < mainProjects.length; i++) {
            var pictureSrc = "projects/" + mainProjects[i][0] + "/img/cover" + mainProjects[i][1] + ".jpg";
            //bgArray.images.push('img/main/' + i + '.jpg');
            bgArray.images.push(pictureSrc);

        };
    } else if (whichPage === "work" || whichPage === "media") {
        createThumbImages();
    } else if (whichPage === "project") {
        addTextBg();
        resizeCover();
    };
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

$("#fullBg").click(function(){
    var whereTo = $(this).attr("data-dest");
    //alert(whereTo);
    if (whereTo !== null && whereTo !== undefined && whereTo !== "") {
        $("#container").fadeOut(1000,function(){
            document.location.href = whereTo;
        })
        // alert(whereTo);
    };
});

var lastScrollLeft = 0;
$("#projContainer.singleProject").scroll(function() {
    var containerScrollLeft = $(this).scrollLeft();
    if (lastScrollLeft != containerScrollLeft) {
        if (whichPage === "project"){
            //console.log(containerScrollLeft);

            var maxScroll = $(".slides").width() - $(".projNav").width() - (2 * $(".rightFade").width() );// - 10;
            var perc = (containerScrollLeft*100)/maxScroll;

            if (perc > 100) {perc = 100;};
            if (perc < 0) {perc = 0;};

            perc = perc + "%";
            //console.log(perc);
            $(".projBar").css("width",perc);      
        }
        lastScrollLeft = containerScrollLeft;
    }
});

$(window).scroll(function() {
    if (whichPage === "project"){
        if (jQuery.browser.mobile) {
            var startOff = $(this).scrollTop();
            if (startOff > 50) {
                startOff = 50
            } else if (startOff < 0) {
                startOff = 0;
            };
            barStartTop = 50 - startOff;
        };
        var containerScrollTop = $(this).scrollTop();

        var maxScroll = totBarHeight;
        var perc = (containerScrollTop*100)/maxScroll;

        if (perc > 100) {perc = 100;};
        if (perc < 0) {perc = 0;};

        perc = perc + "%";
        $(".projBarSide").css("height",perc);

        var pushUp = $(this).scrollTop() - totBarHeight;
        if (pushUp > leftoverHeight) {pushUp = leftoverHeight};
        if (pushUp > 0) {
            // console.log("bang");
            $(".projNavSide").css("top", (barStartTop - pushUp) + "px");
        } else {
            $(".projNavSide").css("top", barStartTop + "px"); 
        }
    }
});

$(window).on("backstretch.before", function (e, instance, index) {
    if (whichPage === "home") {
        //$("#fullBg").removeAttr("data-dest");
        var coverDest = "projects/" + mainProjects[index][0] + "/index.html";
        // $("#fullBg").attr("data-dest",coverDest).addClass("hasLink");
        $("#projName, #projDesc").fadeOut(1500,function(){
            $("#projName").html(mainProjects[index][2]).attr("data-dest",coverDest);
            $("#projDesc").html(mainProjects[index][3]).attr("data-dest",coverDest);
            $("#projName, #projDesc").fadeIn(1500);
            // console.log("before: " + index);
            //$("#fullBg").attr("data-dest",coverDest).addClass("hasLink");
        });
    };
});

$(window).on("backstretch.after", function (e, instance, index) {
    // console.log("after: " + index);
    if (whichPage === "home") {
        var coverDest = "projects/" + mainProjects[index][0] + "/index.html";
        $("#fullBg").attr("data-dest",coverDest).addClass("hasLink");  
    };
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

$(".navLink, #projName, #projDesc").click(function(event){
    event.preventDefault();

    var dest = $(this).attr("data-dest");
    var active = $(this).index();

    $(".navLink").each(function(){
        $(this).removeClass("underlined");
    })

    if (dest == "work") {
        if (whichPage === "work") {
            hideOver();
        } else if (whichPage === "project") {
            curtainTransition(workDest);
        } else {
            $("#container").fadeOut(1000,function(){
                document.location.href = workDest;
            })
        };
    } else if (dest == "process") {
        if (whichPage === "process") {
            hideOver();
        } else if (whichPage === "project") {
            curtainTransition(procDest);
        } else {
            $("#container").fadeOut(1000,function(){
                document.location.href = procDest;
            })
        };        
    } else if (dest.indexOf("projects/") >= 0) {
        //alert("yes");
        $("#container").fadeOut(1000,function(){
            document.location.href = dest;
        })
    } else if (dest == "media") {
        if (whichPage === "media") {
            hideOver();
        } else if (whichPage === "project") {
            curtainTransition(mediaDest);
        } else {
            $("#container").fadeOut(1000,function(){
                document.location.href = mediaDest;
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
    } else if (dest == "media") {
        if (whichPage === "media") {
            hideOver();
            $("#my-menu").trigger("close.mm");
        } else {
            document.location.href = mediaDest;
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

$(".leftFade").hover(
  function() {
    //console.log("L - ininin")
    projectImagesLoopL();
  }, function() {
    //console.log("L - outoutout")
    projectImagesStop();
  }
);

$(".rightFade").hover(
  function() {
    //console.log("R - ininin")
    projectImagesLoopR();
  }, function() {
    //console.log("R - outoutout")
    projectImagesStop();
  }
);

$(".innerImage, .sideLink").click(function(event){
    if (whichPage !== "media") {
        event.preventDefault();
        var projDest = $(this).attr("href");
        // $("#container").fadeOut(1000,function(){
        //     document.location.href = projDest;
        // })
        curtainTransition(projDest);
    };
});

// $('#projContainer').on('click','.sidelink', function(event) {
//     
//     console.log("didit");
// });

$('.projectInfo').on('click', 'a.sideLink', function(event) {
    event.preventDefault();
    var projDest = $(this).attr("href");
    curtainTransition(projDest);
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
            curtainTransition(homeUrl);
        } else {
            $("#container").fadeOut(1000,function(){
                document.location.href = homeUrl;
            });
        }
        
    };
});

//*
$("#projContainer.singleProject .slides").imagesLoaded()
  .done( function( instance ) {
    //console.log('all images successfully loaded');
    imgLoaded = true;
    // alert("imagesLoaded() was called DONE");
    resizeCover();
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
    imgLoaded = true;
    // alert("imagesLoaded() was called FAIL");
    resizeCover();
  });
//*/

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
    getScreenAspect();
    if ((whichPage === "work" || whichPage === "media") && $container != undefined) {
        resizeThumbs();
        $container.masonry();
    };
    resizeBg(pageBg);
    if (whichPage === "project") {
        resizeCover();
    };
});

$('body').on('click', 'a.popupLink', function(event) {
    event.preventDefault();
    //alert("Link Test");
    var projDest = $(this).attr("href");
    curtainTransition(projDest);
});

////////////////////////
// CUSTOM FUNCTIONS

function hideOver(){
    $(".navLink").each(function(){
        $(this).removeClass("underlined");
    })

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
    if (whichPage === "media") {
        $(".navLink:eq(1)").addClass("underlined");
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
                        if (whichPage === "media") {
                            $(".navLink:eq(1)").addClass("underlined");
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
                        if (whichPage === "media") {
                            $(".navLink:eq(1)").addClass("underlined");
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

function curtainTransition(dest) {
    $(".curtainOverlay").height(window.innerHeight);
    $(".curtainOverlay").fadeIn(1000,function(){
        document.location.href = dest;
        //alert("yasssss");
    })
}

function createThumbImages() {
    if (whichPage === "work") {
        $(".innerImage").each(function(){
            var $thumb = $(this);
            var thumbHref = $thumb.attr("href");
            if (thumbHref !== null && thumbHref !== undefined 
                 && thumbHref !== "#" && thumbHref !== "") {
                //var projectDir = $thumb.attr("data-dir");
                var projectDir = thumbHref.split('/')[1];
                //console.log(projectDir);
                var thumbPath = "projects/" + projectDir + "/img/thumb.jpg";
                if (projectDir =="mur") {
                    thumbPath = "projects/" + projectDir + "/img/thumb2.jpg";
                };
                
                $thumb.backstretch([thumbPath],{duration: 6500, fade: 3000});
                //projectDir = "projects/" + projectDir;// + "/index.html";
                projectDir = "projects/" + projectDir + "/index.html";
                $thumb.attr("href",projectDir);
            };
        });
    } else if (whichPage === "media") {
        $(".innerImage").each(function(){
            var $thumb = $(this);
            var thumbMediaSrc = $thumb.attr("data-mediasrc");
            if (thumbMediaSrc !== null && thumbMediaSrc !== undefined 
                 && thumbMediaSrc !== "#" && thumbMediaSrc !== "") {
                var thumbPath = "mediaEntries/" + thumbMediaSrc + "/img/thumb.jpg";
                $thumb.backstretch([thumbPath],{duration: 6500, fade: 3000});
                //projectDir = "projects/" + projectDir;// + "/index.html";
                //var clickThrough = $thumb.attr("data-clickthrough");
                //$thumb.attr("href",clickThrough);
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
        } else if ($(this).hasClass("vidThumb")) {
            $(this).css("height", (w * (9/16)) + "px");
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
    getScreenAspect();
    // $("#projContainer").addClass("sideScroll");
    if (whichPage === "project") {
        if ($("#projContainer").hasClass("sideScroll")) {
            $(".aboutPage .sideScroll .slide img").css("max-height",window.innerHeight*0.65 + "px");

            $("#projMargin").addClass("flowRight");

            $(".movHolder").each(function(){
                $(this).removeAttr("style");
            });

            //*
            if (imgLoaded == true) {
                var totWidth = 0;
                $(".slide").each(function(){
                    if ($(this).hasClass("firstSlide")) {
                        var margWidth = $(".leftFade").width();
                        $(this).width($(this).children("img").first().width() + margWidth);
                        $(".aboutPage .bioInfoFirst").css({"margin-left":margWidth + "px","float":"left"});
                        totWidth += $(this).width();
                    } else if ($(this).hasClass("imgSlideLast")) {
                        var margWidth = $(".rightFade").width();
                        $(this).width($(this).children("img").first().width() + margWidth);
                        totWidth += $(this).width();
                    } else if ($(this).hasClass("vidSlideLast")) {
                        var margWidth = $(".rightFade").width();
                        var vidW =  $(this).height() * 1.7777;
                        $(this).children(".movHolder").first().width(vidW)
                        $(this).width($(this).children(".movHolder").first().width() + margWidth);
                        totWidth += $(this).width();
                    } else if ($(this).hasClass("vidSlide")) {
                        var vidW =  $(this).height() * 1.7777;
                        $(this).children(".movHolder").first().width(vidW)
                        $(this).width($(this).children(".movHolder").first().width());
                        totWidth += $(this).width();
                    } else if ($(this).hasClass("imgSlide")) {
                        $(this).width($(this).children("img").first().width());
                        totWidth += $(this).width();
                    };
                });
                $(".slides").width(totWidth);
                //alert("resized after images loaded : " + imgLoaded);
                // if ($("body").hasClass("aboutPage")) {
                //     $("p.bioInfo").each(function(){
                //         //$(this).width($(this).parent().width());
                //     })
                // };
            } else {
                //something is wrong...
            };
            //*/

            var firstImgW = $(".imgSlide").first().children("img").first().width();
            if (firstImgW > window.innerWidth*0.8*0.5 && firstImgW < window.innerWidth*0.88) {
                $(".projPageDesc, .projectInfo").width(firstImgW);
            } else {
                $(".projPageDesc, .projectInfo").removeAttr("style");
            };
            
            var bar = $(".slides").offset().top + $(".slides").height();

            if ($("body").hasClass("aboutPage")) {
                bar = $(".slides").offset().top + $(".slides img:first-of-type").height() - 4;
            };

            var textHeight = 0;
            $(".aboutPage .bioInfo").each(function(){
                var thisHeight = $(this).outerHeight();
                if (thisHeight>textHeight) {
                    textHeight = thisHeight;
                };
            });
            console.log("img: " + $(".aboutPage .slides img:first-of-type").height());
            console.log("text: " + textHeight);
            var contHeight = $(".aboutPage .slides img:first-of-type").height() + textHeight + 50;
            console.log("container: " + contHeight);
            $(".aboutPage #projContainer").css("height",contHeight + "px");

            $(".projNav").css("top",bar+"px").removeClass("hidden");
            $(".projNavSide").addClass("hidden");
            $(".projectInfo").html($(".vertInfo").html()).removeClass("hidden");
            $(".vertInfo").addClass("hidden");
        } else {
            $(".movHolder").each(function(){
                $(this).removeAttr("style");
                $(this).height($(this).width() * 0.5625);
            });
            $("#projMargin").removeClass("flowRight");
            $(".projPageDesc, .projectInfo").removeAttr("style");
            $(".slides").removeAttr("style");
            // console.log("stuff");
            $(".slide").each(function(){
                $(this).removeAttr("style");
            });

            totBarHeight = $(".imgSlide").last().offset().top - window.innerHeight + $(".imgSlide").last().height();
            leftoverHeight = $(document).height() - ($(".imgSlide").last().offset().top + $(".imgSlide").last().height());
            $(".projNavSide").css("height",( window.innerHeight - barStartTop )+"px").removeClass("hidden");
            $(".projNav").addClass("hidden");
            $(".projectInfo").addClass("hidden");
            $(".vertInfo").removeClass("hidden");
        };
    };
    

    //$("#container").height(window.innerHeight);
    // getScreenAspect();
    // var margWidth = $(".projMarginL").width();
    // var windowWidth = window.innerWidth;
    // $("header").css("max-width",windowWidth + "px");
    // $(".spacer").css("width",margWidth+"px");

    // //alert("called resizeCover() : " + imgLoaded + ":" +  screenAspect);
    // if (screenAspect==="landscape" && !$("body").hasClass("isMobile")) {

    //     if (imgLoaded == true) {
    //         var totWidth = 0;
    //         $(".slide").each(function(){
    //             if ($(this).hasClass("imgSlide")) {
    //                 $(this).width($(this).children("img").first().width());
    //             };
    //             totWidth += $(this).width();
    //         });
    //         //console.log(totWidth);
    //         $(".slides").width(totWidth);
    //         //alert("resized after images loaded : " + imgLoaded);
    //     } else {
    //         //something is wrong...
    //     };

    //     var navTop = $(".slides").height() + 50;
    //     $(".projNav").css("top",navTop + "px")

    //     var textBlockWidth = $(".firstSlide").width();
    //     if (textBlockWidth > 740) {
    //         textBlockWidth = 740;
    //     } else if(textBlockWidth > window.innerWidth * 0.80){
    //         textBlockWidth = window.innerWidth * 0.80;
    //     };

    //     $(".landscape .projPageDesc").width(textBlockWidth);

    // } else if (screenAspect==="portrait" || $("body").hasClass("isMobile")) {
    //     alert("vertical?");
    //     $(".projNavSide").height(window.innerHeight-100);
    //     $(".slides").removeAttr('style');
    //     $(".projPageDesc, .vertInfo").removeAttr('style');
    //     $(".vertInfo").html($(".projectInfo").html());
    // };  
}

function addTextBg() {
    $(".textSlide").each(function(){
        var $slide = $(this);
        if ($slide.attr("data-bg") !== null && $slide.attr("data-bg") !== undefined) {
            var bgPath = "img/" + $slide.attr("data-bg");
            //console.log(bgPath);
            $slide.backstretch(bgPath);
        };
    });
}

function getScreenAspect() {
    ratio = window.innerHeight/window.innerWidth;
    if (ratio <= 1) {
        screenAspect = "landscape";
        $("body").removeClass("portrait");
        $("body").addClass("landscape");
        $("#projContainer").addClass("sideScroll");
    } else {
        screenAspect = "portrait";
        $("body").removeClass("landscape");
        $("body").addClass("portrait");
        $("#projContainer").removeClass("sideScroll");
        $(".aboutPage .slide img").css("max-height","none");
        $(".aboutPage .bioInfoFirst").removeAttr("style");
    };
    //console.log(screenAspect);
}

function projectImagesLoopL(){
    if (whichPage === "project") {
        if ($("#projContainer").hasClass("sideScroll")) {
            var content = $("#projContainer.singleProject")
            var maxScroll = $(".slides").width() - $(".projNav").width() - (2 * $(".rightFade").width() )
            var speed = Math.floor(maxScroll/50)
            if (speed < 200) {
                speed = 200;
            };
            // console.log(speed);
            content.stop();
            if (content.scrollLeft() > 0) {
                content.animate({scrollLeft:'-=' + speed}, 1000, 'linear', projectImagesLoopL);
            };
        }
    }
}

function projectImagesLoopR(){
    if (whichPage === "project") {
        if ($("#projContainer").hasClass("sideScroll")) {
            var content = $("#projContainer.singleProject")
            var maxScroll = $(".slides").width() - $(".projNav").width() - (2 * $(".rightFade").width() )
            var speed = Math.floor(maxScroll/50)
            if (speed < 200) {
                speed = 200;
            };
            // console.log(speed);
            content.stop();
            if (content.scrollLeft() < maxScroll) {
                content.animate({scrollLeft:'+=' + speed}, 1000, 'linear', projectImagesLoopR);
            };
        }
    }
}       

function projectImagesStop(){
    $("#projContainer.singleProject").stop();
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


