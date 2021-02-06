$(document).ready(function(){
    var onMousedown = false;
    var onMouseHover = false;
    var desktopTable = "";
    var mobileSize = "";
    var onHoverSideBar = false;
    var index = 0;
    var numChildren = $("[class*='showClicked']").length;
    var elementClicked = null;
    var winLoseNumTotal = 0;
    var winLoseNumSelected = 0;
    
    $('.next-page-btn').off().on('click', function(){
        parent.nextPage();
    });
    
    $(".mcafeePPTresources").each(function(){
	   $(this).attr("href",(pptPath + $(this).attr("data-ppt")));
    });
    
    $(".resource").each(function(){
        $(this).attr("href",(resourcesPath + $(this).attr("href")));
    });
    if(parent != top)
    {
        $(".stop_and_think_answer").off("click").on("click",function(){
            parent.showCertainPage("stop_and_think_answer");
        });
        $("#prevQuiz").off("click").on("click",function(){
            parent.gotoPrevQuizPage();
        });

        $("#nextQuiz").off("click").on("click",function(){
            if(nextQuizPage != null || nextQuizPage != undefined)
            {
                parent.showCertainPage(nextQuizPage);
            }
        });
    }
    $("#transcriptShow").html($("#transcriptText").html());
    
    $("#transcriptIcon").off("click").on("click",function(){
        $("#transcript").slideToggle("fast");
    });
    $("#transcriptCloseBtn").off("click").on("click",function(){
        $("#transcript").slideToggle("fast");
    });
    $("#show-result-close-btn").off("click").on("click",function(){
        $("#show-result-wrap").slideToggle("fast");
    });
    $("#go-to-next-page-correct").off("click").on("click",function(){
        $("#show-result-close-btn").trigger('click');
        $('#responseCorrectOnScreen').show();
        parent.nextPage();
    });
    $("#go-to-next-page-incorrect").off("click").on("click",function(){
        $("#show-result-close-btn").trigger('click');
        $('#responseIncorrectOnScreen').show();
        parent.nextPage();
    });
    $(".next-page").off("click").on("click",function(){
        parent.nextPage();
    });
    $(".imgContainer").each(function(){
        $(this).attr("src",($(this).data("default")));;
    });

    $(".bounce, .flash, .pulse, .rubberBand, .shake, .headShake, .swing, .tada, .wobble, .jello, .bounceIn, .bounceInLeft, .bounceInRight, .bounceInUp, .bounceOut, .bounceOutDown, .bounceOutLeft, .bounceOutRight, .bounceOutUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeOut, .fadeOutDown, .fadeOutDownBig, .fadeOutLeft, .fadeOutLeftBig, .fadeOutRight, .fadeOutRightBig, .fadeOutUp, .fadeOutUpBig, .flipInX, .flipInY, .flipOutX, .flipOutY, .lightSpeedIn, .lightSpeedOut, .rotateIn ,.rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .rotateOut, .rotateOutDownLeft, .rotateOutDownRight, .rotateOutUpLeft, .rotateOutUpRight, .hinge, .rollIn, .rollOut, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .zoomOut, .zoomOutDown, .zoomOutLeft, .zoomOutRight, .zoomOutUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .slideOutDown, .slideOutLeft, .slideOutRight, .slideOutUp").addClass("wow");
    
    $(".addAnimation").each(function(){
        $(this).addClass("wow");
    });
    $(".repeatAnimation").each(function(){
        $(this).addClass("wow");
    });
    
    $(".resetScreenBtn").each(function(){
        $(this).off("click").on("click",function(){
            index = 0;
            $(".hideElement").css({opacity:0});
            audioReplay();
            if(self != top)
            {
                parent.$("#playBtn").hide();
                parent.$("#pauseBtn").show();
            }
        });
    });
    
    $(".wow.repeatAnimation").each(function(){
        $(this).off("click").on("click",function(){
            $(this).addClass($(this).data("animation"));
            $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass($(this).data("animation"));
            });
        });
    });
    
    if(wrapperPage)
    {
        $("body").append("<div id='couseLoader' style='position: fixed; width: 100%; height: 100%; z-index: 1000; background-color: rgba(0,0,0,0.5); top: 0'><img id='menuAudio' class='screenElem' src='./img/essentials/elem/menuAudio.svg'><img id='seeMoreScreenBtn' class='screenElem' src='./img/essentials/elem/seeMoreBtn.svg'><img id='prevNextScreenBtn' class='screenElem' src='./img/essentials/elem/prevNextBtn.svg'><img id='prevNextScreenBtnSmall' class='screenElem' src='./img/essentials/elem/prevNextBtnSmall.svg'><img id='slideIndicatorScreen' class='screenElem' src='./img/essentials/elem/slideIndicator.svg'><img id='submitScreenBtn' class='screenElem' src='./img/essentials/elem/submitScreenBtn.svg'><div style='width: 100%; text-align: center; position: relative; top: 40%'><p style='font-size: 2em; color: #fff;'>Course Loading...<br><span style=''>Please Wait</span></p></div></div>");
        setCoursePage();
        if(document.getElementById("quizPages"))
        {
            quizNames = ($("#quizPages").text()).split(",");
            $.each(quizNames,function(index,val){
                quizes.push((val).trim());
            });
        }
        if(document.getElementById("pageNames"))
        {
            pageNames = ($("#pageNames").text()).split(",");
            hidePages();

            $.each(pageNames,function(index,val){
                var page = new Object();
                page.pageName = (val).trim();
                page.opened = false;
                pages.push(page);

                if($(window).width() > 1024) // Desktop
                {
                    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 153) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");

                    }
                    else
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 153) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");
                    }
                }
                else if($(window).width() <= 1024 && $(window).width() > 767) // Tablet
                {
                    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 112) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");

                    }
                    else
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 112) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");
                    }
                }
                else if($(window).width() <= 766 && $(window).width() >= 480)
                {
                    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 92) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");

                    }
                    else
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 92) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");
                    }
                }
                else
                {
                    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 )
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 92) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");

                    }
                    else
                    {
                        $("#pageContent").append("<iframe class='page' src='pages/" + page.pageName + ".html' height='" + ($(window).height() - 92) + "' width='100%' scrolling='yes' frameBorder='0' overflow='visible'></iframe>");
                    }
                }


            });

            if(SCORM)
            {
                initSCORM();
            }
            else
            {
                $("#pageContent .page").eq(wrapperObj.currentPage).load(function(){
                    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$(window).load(function(){

                        $("#couseLoader p").html("<span id='clickHereToStart'>Click here to Start...</span>")
                        $("#couseLoader p").off("click").on("click",function(){
                            $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioPlay();
                            $("#playBtn").hide();
                            $("#pauseBtn").show();

                            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo == "function")
                            {
                                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo();
                            }
                            $("#couseLoader").remove();
                            setPage();
                            showProperAudioBtn();
                        });
                    });
                });
            }
        }

        $("#prevPage").off("click").on("click",function(){
            prevPage();
        });

        $("#nextPage").off("click").on("click",function(){
            nextPage();
        });

        $("#playBtn").off("click").on("click",function(){
            $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioPlay();
            $("#playBtn").hide();
            $("#pauseBtn").show();

            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo == "function")
            {
                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo();
            }
        });
        $("#pauseBtn").off("click").on("click",function(){
            $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioPause();
            $("#playBtn").show();
            $("#pauseBtn").hide();

            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo == "function")
            {
                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo();
            }
        });
        $("#muteBtn").off("click").on("click",function(){

            $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioMute();
            $("#muteBtn").hide();
            $("#unmuteBtn").removeClass("hidden");
            $("#unmuteBtn").show();

            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo == "function")
            {
                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo();
            }
        });
        $("#unmuteBtn").off("click").on("click",function(){

            $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioUnmute();
            $("#muteBtn").show();
            $("#unmuteBtn").hide();

            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo == "function")
            {
                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.pauseYTVideo();
            }
        });
        $("#closedCaptionBtn").off("click").on("click",function(){		
            $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#transcript").slideToggle("fast");		
        });
        $("#audioIconBtn").off("click").on("click",function(){
            $("#btnControls").slideToggle("fast");
        });
        $(".mainMenuLink").each(function(){
            $(this).off("click").on("click",function(){
                if($(this).data("page").length > 1)
                {
                    showCertainPage($(this).data("page"));
                    $("#nav-overlay").modal("hide");
                }
            });
        });
        $(".mcafeePDFresources").each(function(){
            $(this).off("click").on("click",function(){
                $(this).attr("href",(pdfPath + $(this).data("pdf")));
                $(this)[0].click();
            });
        });

        $(window).resize(function(){
            setCoursePage();
        });

        $("#vidModal.modal .close").off().on("click",function(){
            $("#vidPlayer video").eq(0)[0].pause();
        });
        $("#audioModal.modal .close").off().on("click",function(){
            $("#audioPlayer")[0].pause();
        });
    }
    if(!wrapperPage)
    {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;
        var stopYTVideo = null;
        var pauseYTVideo = null;

        setTimeout(function(){
            percentMagnifierSize =  $("#magnifyImg img").eq(0).width() / $("#previewImg img").eq(0).width();
            magnifyElemWidth = $("#magnifyImg").width();
            magnifyImgWidth = $("#magnifyImg img").eq(0).width();
            magnifyElemHeight = $("#magnifyImg").height();
            magnifyImgHeight = $("#magnifyImg img").eq(0).height();
            previewElemWidth = $("#previewImg").width();
            previewImgWidth = $("#previewImg img").eq(0).width();
            previewElemHeight = $("#previewImg").height();
            previewImgHeight = $("#previewImg img").eq(0).height();
        }, 500);

        $("#audio source").each(function(){
            $(this).attr("src",parent.audioPath + $(this).data("path"));
        });
        audio.load();
        if($("#video").length > 0)
        {
            $("#video source").each(function(){
                $(this).attr("src",parent.videoPath + $(this).data("path"));
            });
            video.load();
        }
        //audioPlay();
        audio.addEventListener("timeupdate",playAnimation);
        //audio.ontimeupdate = function(){playAnimation()};
        audio.addEventListener("ended",function(){
            if(self != top)
            {
                if($("#ytVideo").length <= 0 || $("#video").length <= 0)
                {
                    parent.setWhenAudioIsFinish();
                }
                $('.next-page-btn').fadeIn();
            }
        });

        if($("#video video").length > 0)
        {
            video.addEventListener("playing", function(){
                if(self != top)
                {
                    parent.showPlayBtn();
                }
                audioStop();
                audio.currentTime = 0;
            });
            video.addEventListener("ended",function(){
                if(self != top)
                {
                    if($("#ytVideo").length <= 0)
                    {
                        parent.setWhenAudioIsFinish();
                    }
                }
            });
        }

        $("body").append("<div id='seeMoreBtn'><span>See More...<span></div>");
        $("#seeMoreBtn").hide();

        $("#closeBtn").off("click").on("click",function(){
            parent.closeCourse();
        });
        $("#reviewBtn").unbind().bind("click",function(){
            parent.gotoFistQuizPage();
        });
        $("#retakeBtn").unbind().bind("click",function(){
            parent.retakeCourse();
        });

        $(".showVidModal").off("click").on("click",function(){
            if(parent.$("#vidPlayer video").eq(0).attr("data-video-id") != undefined && parent.$("#vidPlayer video").eq(0).attr("data-video-id") == $(this).data("video"))
            {
                parent.$("#vidPlayer video").eq(0)[0].play();
            }
            else
            {
                parent.$("#vidPlayer").empty().html('<div style="position: relative; display: block; max-width: 100%;"><div style="padding-top: 56.25%;"><video data-video-id="' + $(this).data("video") + '" data-account="21478975001" data-player="SyzBB4N5Zg" data-embed="default" data-application-id class="video-js" controls style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; width: 100%; height: 100%;"></video><script src="//players.brightcove.net/21478975001/SyzBB4N5Zg_default/index.min.js"></script></div></div>');
            }
            parent.$("#vidModal").modal("show");
            parent.$("#pauseBtn").trigger("click");
        });
        $(".play-audio").off("click").on("click",function(){
            parent.$("#audioPlayer source").attr("src",(parent.audioPath + $(this).data("audio")));
            parent.$("#audioPlayer")[0].load();
            parent.$("#audioPlayer")[0].play();
            parent.$("#audioModal").modal("show");
            parent.$("#pauseBtn").trigger("click");
        });

        $(".play-audio2").each(function(){
            $(this).off("click").on("click", function(){
                $(".audioPlayer").each(function(){
                    if($(this).find("source").attr("src") != undefined)
                    {
                        $(this)[0].pause();
                    }
                });
                $(this).next().find("source").attr("src",(parent.audioPath + $(this).data("audio")));
                $(this).next()[0].load();
                $(this).next()[0].play();
                $(this).next().slideDown();
                parent.$("#pauseBtn").trigger("click");
            });
        });

        $(".pageLink").each(function(){
            $(this).off("click").on("click",function(){
                if($(this).data("page").length > 1)
                {
                    parent.showCertainPage($(this).data("page"));
                }
            });
        });
    }
    
    $('[data-toggle="tooltip"]').each(function(){
        var glossaryWord = $(this).data("word");
        $(this).attr("title",glossary[glossaryWord])
    });
    $('[data-toggle="tooltip"]').tooltip();
    
    $(".glossaryText").each(function(){
        var glossaryWord = $(this).data("word");
        //addMenuEvent($(this),glossaryWord,"hover",onMouseHover);
    });
    
    desktopTable = "<div class='aTable elementCenter' style='height: 100%'>";
    
    desktopTable += "<div class='aTR' style='height: 100%;'>";
    $("#mainContext .contextHead p").each(function(){
        desktopTable += "<div class='aTD text-center' style='font-weight: bold; height: 100%; vertical-align: middle; border-bottom: 2px solid #F5C714''>";
        desktopTable += "<p>" + $(this).html() + "</p>";
        desktopTable += "</div>";// close aTD
    });
    desktopTable += "</div>";// close aTR
    
    $("#mainContext .contextItem").each(function(){
        desktopTable += ($(this).hasClass("redHLBox")) ? "<div class='aTR redHLBox' style='height: 100%'>" : "<div class='aTR' style='height: 100%'>";
        $(this).find(".textContent").each(function(){
            desktopTable += "<div class='aTD bottomDashedBlue' style='height: 100%; vertical-align: middle;'>";
            desktopTable += $(this).html();
            desktopTable += "</div>";// close aTD
        });
        desktopTable += "</div>";// close aTR
    });
    
    desktopTable += "</div>"; // close aTable
    
    mobileSize = '<div class="panel-group" id="mobileAccordion" role="tablist" aria-multiselectable="true">';
    
    $("#mainContext .contextItem").each(function(index){
        mobileSize += ($(this).hasClass("redHLBox")) ? '<div class="panel redHLBox panel-default">' : '<div class="panel panel-default">';
        mobileSize += '<div class="panel-heading" role="tab" id="heading' + index + '">';
        mobileSize += '<h4 class="panel-title">';
        mobileSize += '<a role="button" data-toggle="collapse" data-parent="#mobileAccordion" href="#collapse' + index + '" aria-expanded="true" aria-controls="collapse' + index + '">' + $(this).find(".textContent").eq(0).html() + '<span class="accordionArrow glyphicon glyphicon-triangle-right"></span></a>';
        mobileSize += '</h4>';
        mobileSize += "</div>"; // close .panel-heading
        
        mobileSize += '<div id="collapse' + index + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading' + index + '">';
        mobileSize += '<div class="panel-body">';
        
        mobileSize += '<p class="hLight"><strong>Sales Play</strong></p>';
        mobileSize += $(this).find(".textContent").eq(1).html();
        
        mobileSize += '<p class="hLight"><strong>Solutions to Sell Today</strong></p>';
        mobileSize += $(this).find(".textContent").eq(2).html();
        
        mobileSize += '<p class="hLight"><strong>Available Assets</strong></p>';
        mobileSize += $(this).find(".textContent").eq(3).html();
        
        mobileSize += '</div>'; // close .panel-body;
        mobileSize += '</div>'; // close .panel-collapse;
        mobileSize += '</div>'; // close .panel-default;
    });
    
    mobileSize += '</div>'; // close .panel-group;
    
    $("#desktopTableSize").html(desktopTable);
    $("#mobileSize").html(mobileSize);
    $("#mobileSize .panel-title a").each(function(){
        $(this).off("click").on("click",function(){
            if($(this).find(".accordionArrow").hasClass("glyphicon-triangle-bottom"))
            {
                $(this).find(".accordionArrow").removeClass("glyphicon-triangle-bottom");
                $(this).find(".accordionArrow").addClass("glyphicon-triangle-right");
            }
            else if($(this).find(".accordionArrow").hasClass("glyphicon-triangle-right"))
            {
                $(this).find(".accordionArrow").removeClass("glyphicon-triangle-right");
                $(this).find(".accordionArrow").addClass("glyphicon-triangle-bottom");
            }
        });
    });
    
    $("#winLosesResult").off("click").on("click",function(){
        $(".winLose").each(function(){
            var str = $(this).find(".winLoseTxt").text().replace(/( - Correct!| - Incorrect!)/,"");
            if($(this).find(".winLoseTxt").text().search("McAfee") >= 0)
            {
                if($(this).hasClass($(this).data("correct")))
                {
                    $(this).find(".winLoseTxt").text((str + " - Correct!"));
                }
                else
                {
                    $(this).find(".winLoseTxt").text((str + " - Incorrect!"));
                }
            }
        });
    });

    $(".winLose").each(function(){
        var winLoseObj = $(this);
        winLoseNumTotal = winLoseNumTotal + 1;
        $(this).prepend("<span class='winBtn glyphicon glyphicon-ok'></span><span class='winLoseTxt'>Select if this Win or Lose</span><span class='loseBtn glyphicon glyphicon-remove'></span>");
        
        $(this).find(".winBtn").off("click").on("click",function(){
            winLoseNumSelected = 0;
            winLoseObj.find("span").css({color: "#fff"});
            winLoseObj.css({backgroundColor: "#8CC74F"});
            winLoseObj.find(".winLoseTxt").text("McAfee Wins");
            winLoseObj.removeClass("lose");
            winLoseObj.addClass("win");
            winLoseObj.attr("data-selected", "true");
            $(".winLose").each(function(){
                if($(this).attr("data-selected") == "true")
                {
                    winLoseNumSelected = winLoseNumSelected + 1;
                }
            });
            if(winLoseNumTotal == winLoseNumSelected)
            {
                $("#winLosesResult").removeClass("hidden");
            }
        });
        $(this).find(".loseBtn").off("click").on("click",function(){
            winLoseNumSelected = 0;
            winLoseObj.css({backgroundColor: "#00AEEF"});
            winLoseObj.find("span").css({color: "#fff"});
            winLoseObj.find(".winLoseTxt").text("McAfee Lose");
            winLoseObj.removeClass("win");
            winLoseObj.addClass("lose");
            winLoseObj.attr("data-selected", "true");
            $(".winLose").each(function(){
                if($(this).attr("data-selected") == "true")
                {
                    winLoseNumSelected = winLoseNumSelected + 1;
                }
            });
            if(winLoseNumTotal == winLoseNumSelected)
            {
                $("#winLosesResult").removeClass("hidden");
            }
        });
    });
    $(".sliderItems").each(function(){
        var sliderHolder = $(this).parent();
        var slider = "";
        var imgIndex = 0;
        var sliderPre = null;
        var sliderNext = null;
        
        slider += "<div class='container-fluid'>";
        
        slider += "<div class='row'>";
        slider += "<div class='col-md-12'>";
        
        slider += "<div class='sliderIndicator'>";
        $(this).find(".sliderItem").each(function(index){
            slider += "<span data-index='" + index + "'></span>";
        });
        slider += "</div>";
        
        slider += "</div>"; // close col-md-12
        slider += "</div>"; // close row
        
        slider += "<div class='row' style='position: absolute; width: 100%; top: 50%; z-index: 500'>";
        slider += "<div class='col-md-12'>";
        slider += "<div class='prevNextSliderBtn'><span class='prevSliderBtn glyphicon glyphicon-triangle-left'></span><span class='prevNextSliderBtnSpliter'></span><span class='nextSliderBtn glyphicon glyphicon-triangle-right'></span></div>";
        slider += "</div>"; // close col-md-12
        slider += "</div>"; // close row
        
        slider += "<div class='row'>";
        slider += "<div class='col-md-12 col-md-push-0 col-xs-8 col-xs-push-2'>";
        slider += "<div class='sliderImage'>";
        
        $(this).find(".sliderItem").each(function(){
            slider += $(this).html(); // Image
        });
        
        slider += "</div>"; // close sliderImage
        slider += "</div>"; // close col-md-12
        slider += "</div>"; // close row
        
        slider += "</div>"; // close container-fluid
        
        
        sliderHolder.html(slider);
        sliderHolder.find(".sliderItemImage").hide();
        sliderHolder.find(".sliderItemImage").eq(0).show();
        
        sliderPre = sliderHolder.find(".prevSliderBtn");
        sliderNext = sliderHolder.find(".nextSliderBtn");
        
        sliderPre.off("click").on("click",function(){
            sliderHolder.find(".sliderItemImage").each(function(i){
                if($(this).css("display") == "block")
                {
                    if(i == 0)
                    {
                        sliderHolder.find(".sliderItemImage").eq(imgIndex).hide('slide', {direction: 'right'}, "slow",function(){
                            imgIndex = sliderHolder.find(".sliderItemImage").length - 1;
                            sliderHolder.find(".sliderItemImage").eq(imgIndex).show('slide', {direction: 'left'}, "slow");
                            sliderIndicatorDot(sliderHolder, imgIndex);
                        });
                    }
                    else
                    {
                        sliderHolder.find(".sliderItemImage").eq(imgIndex).hide('slide', {direction: 'right'}, "slow",function(){
                            imgIndex = i - 1;
                            sliderHolder.find(".sliderItemImage").eq(imgIndex).show('slide', {direction: 'left'}, "slow");
                            sliderIndicatorDot(sliderHolder, imgIndex);
                        });
                    }
                    return false;
                }
            });
        });
        sliderNext.off("click").on("click",function(){
            sliderHolder.find(".sliderItemImage").each(function(i){
                if($(this).css("display") == "block")
                {
                    if(i == (sliderHolder.find(".sliderItemImage").length - 1))
                    {
                        sliderHolder.find(".sliderItemImage").eq(imgIndex).hide('slide', {direction: 'left'}, "slow",function(){
                            imgIndex = 0;
                            sliderHolder.find(".sliderItemImage").eq(imgIndex).show('slide', {direction: 'right'}, "slow");
                            sliderIndicatorDot(sliderHolder, imgIndex);
                        });
                    }
                    else
                    {
                        sliderHolder.find(".sliderItemImage").eq(imgIndex).hide('slide', {direction: 'left'}, "slow",function(){
                            imgIndex = i + 1;
                            sliderHolder.find(".sliderItemImage").eq(imgIndex).show('slide', {direction: 'right'}, "slow");
                            sliderIndicatorDot(sliderHolder, imgIndex);
                        });
                    }
                    return false;
                }
            });
        });
        $(sliderHolder).find(".sliderIndicator span").each(function(){
            $(this).off("click").on("click",function(){
                var int = parseInt($(this).data("index"));
                if(int > imgIndex)
                {
                    sliderHolder.find(".sliderItemImage").eq(imgIndex).hide('slide', {direction: 'left'}, "slow",function(){
                        imgIndex = int;
                        sliderIndicatorDot(sliderHolder, imgIndex);
                        sliderHolder.find(".sliderItemImage").eq(imgIndex).show('slide', {direction: 'right'}, "slow");
                    });
                }
                else if(int < imgIndex)
                {
                    sliderHolder.find(".sliderItemImage").eq(imgIndex).hide('slide', {direction: 'right'}, "slow",function(){
                        imgIndex = int;
                        sliderHolder.find(".sliderItemImage").eq(imgIndex).show('slide', {direction: 'left'}, "slow");
                        sliderIndicatorDot(sliderHolder, imgIndex);
                    });
                }
            })
        });
        $(sliderHolder).find(".sliderIndicator span").eq(imgIndex).addClass("active");
    });
    $('.collapse').collapse();
    
    
    $("#slideSideBarBody").hide();
    $("#slideSideBarMenuBtn").click(function(){
        $("#slideSideBarBody").height($(window).height());
        if(parseInt(($("#slideSideBar").css("right")).replace("px","")) < 0)
        {
            $("#slideSideBar").animate({right:"0px"},function(){
                $("#slideSideBarBody").slideDown();
                $("#slideSideBarMenuText").text("X");
            });
        }
        else
        {
            $("#slideSideBarBody").slideUp(function(){
                $("#slideSideBar").animate({right:"-300px"});
                $("#slideSideBarMenuText").text("Menu");
            });
        }
    });

    $(".modal-body").height(winHeight - 250);
    
    $(".slideSideBarResource").each(function(){
        $(this).off().on("click",function(){
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            $("#slideSideBarResourceResult").html("");
            $("#slideSideBarResourceResult").html($(this).find(".slideSideBarItemIndicator").html());

            $("#slideSideBarResourceResult iframe").attr("width",(winWidth * 0.85));
            $("#slideSideBarResourceResult iframe").attr("height",(winHeight - 260));
            $("#slideSideBarResourceResult").attr("style",("height:" + (winHeight - 250) + "px; overflow: auto"));
            $("#slideSideBarResourceResult").parent().attr("style",("height:" + (winHeight - 250) + "px"));
            
            $("#viewPDF").attr("href",($(this).find(".slideSideBarItemIndicator iframe").eq(0).attr("src")));
            $("#downloadPDF").attr("href",($(this).find(".slideSideBarItemIndicator iframe").eq(0).attr("src")));
            $("#downloadPDF").attr("download",($(this).find(".slideSideBarItemIndicator iframe").eq(0).attr("data-path")));
        });
    });
	
    setSameHeight();
    setWinHeightByPercent();
    setBodyContainer();
    
    stretchImg();
    
    $("#showMenu2").off("click").on("click",function(){
        $("#menu1").addClass("hidden");
        $("#menu2").removeClass("hidden");
    });
    $("#showMenu").off("click").on("click",function(){
        $("#menu1").removeClass("hidden");
        $("#menu2").addClass("hidden");
    });
    $("#previewImg").html("<img src='" + $("#magnifyImg img").eq(0).attr("src") + "'>");
    $("#magnifyImg img").eq(0).off("mousemove").on("mousemove", function(e){
        var offset = manageManifier(e);
        $("#previewImg img").css({top: offset.y, left: offset.x});
    });
    
    setSeeMoreBtn();
    
    $(".pdfModal").off("click").on("click",function(){
        if(self != top)
        {
            parent.openPDFModal($(this).data("pdf"));
        }
        else
        {
            openPDFModal($(this).data("pdf"));
        }
    });
    if(winWidth >= 760)
    {
        $("#videoModal .modal-dialog, #videoModal .modal-content, #quizModal .modal-content, #disclaimer .modal-content").width(730);
        //$("#pdfModal .modal-dialog, #pdfModal .modal-content").width(730);
        $("#vidPlayer").width(700);
        $(".pdfFrame, .video-js").each(function(){
            $(this).width(700);
        });
    }

    if(winWidth <= 760)
    {
        $("#videoModal .modal-dialog, #videoModal .modal-content, #quizModal .modal-content, #disclaimer .modal-content").width((winWidth - 30));
        //$("#pdfModal .modal-dialog, #pdfModal .modal-content").width((winWidth - 30));
        $("#vidPlayer").width((winWidth - 60));
        $(".pdfFrame, .video-js").each(function(){
            $(this).width((winWidth - 60));
        });
    }

    $("#vidImg, .show-video").off().on("click",function(){
        videoPlay();

        if(self != top)
        {
            parent.$("#pauseBtn").trigger("click");
        }
        else
        {
            audioPause()
        }
    });
    $(".modal .close").on("click",function(){
        videoPause();
        if(self != top)
        {
            parent.$("#pauseBtn").trigger("click");
        }
        else
        {
            audioPause()
        }
    });
    $("#tableOfContentsBtn").off().on("click",function(){
        $("#tableOfContentsBtn").css({backgroundColor:"#7a787c"});
        $("#resourcesBtn").css({backgroundColor:"transparent"});
        $("#glossaryBtn").css({backgroundColor:"transparent"});
        
        $("#tableOfContentsWrapper").fadeIn();
        $("#resourcesWrapper").hide();
        $("#glossaryWrapper").hide();
    });
    $("#resourcesBtn").off().on("click",function(){
        $("#tableOfContentsBtn").css({backgroundColor:"transparent"});
        $("#resourcesBtn").css({backgroundColor:"#7a787c"});
        $("#glossaryBtn").css({backgroundColor:"transparent"});
        
        $("#tableOfContentsWrapper").hide();
        $("#resourcesWrapper").fadeIn();
        $("#glossaryWrapper").hide();
    });
    $("#glossaryBtn").off().on("click",function(){
        $("#tableOfContentsBtn").css({backgroundColor:"transparent"});
        $("#resourcesBtn").css({backgroundColor:"transparent"});
        $("#glossaryBtn").css({backgroundColor:"#7a787c"});
        
        $("#tableOfContentsWrapper").hide();
        $("#resourcesWrapper").hide();
        $("#glossaryWrapper").fadeIn();
    });
    
    $("#tableOfContentsBtn").css({backgroundColor:"#7a787c"});
    $("#resourcesBtn").css({backgroundColor:"transparent"});
    $("#glossaryBtn").css({backgroundColor:"transparent"});

    $("#tableOfContentsWrapper").fadeIn();
    $("#resourcesWrapper").hide();
    $("#glossaryWrapper").hide();
    
    /*
        This for the Quiz pages
    */

    if(quizPage)
    {   
        $(".mapQuiz .iconRadioLabel").each(function(){
            $(this).off("click").on("click", function(){
                var obj = $(this);
                $(".mapQuiz .iconRadioLabel").each(function(){
                    $(this).css({backgroundColor: "#E6E7E8"});
                });
                obj.css({backgroundColor: "#B1BABF"});
            });
        });
        if(self != top)
        {
            //if(!quizCountID && parent.SCORM && scorm)
            if(!quizCountID)
            {
                var multipleAnswerAry = new Array();
                var multipleAnswerStr = "";
                var obj = new Object();
                quizCountID = parent.getInteractionsCount();
                obj.num = quizCountID;
                obj.id = quizID ? quizID : null;
                obj.objectives = quizObjectives ? quizObjectives : null;
                obj.type =  quizType ? quizType : null;
                obj.description = labelText ? labelText : null;

                $("#trueFalse .radioBtn .quizSelect").each(function(){
                    if($(this).val() == "correct")
                    {
                        obj.correctResponses = (setupCorrectResponses($(this).parent().find("label").text()).toLowerCase());
                        return false;
                    }
                });
                $("#choice .radioBtn .quizSelect").each(function(){
                    if($(this).val() == "correct")
                    {
                        obj.correctResponses = setupCorrectResponses($(this).parent().find("label").text());
                        return false;
                    }
                });
                $("#choice .checkboxesBtn .quizSelect").each(function(){
                    if($(this).val() == "correct")
                    {
                        multipleAnswerAry.push(setupCorrectResponses($(this).parent().find("label").text()));
                    }
                });
                if($("#choice .checkboxesBtn").length > 0)
                {
                    $.each(multipleAnswerAry, function(index, value) {
                        if(index > 0)
                        {
                            multipleAnswerStr += "-" + value;
                        }
                        else
                        {
                            multipleAnswerStr += value;
                        }
                    });
                    obj.correctResponses = multipleAnswerStr;
                }

                $("#matching .droppable").each(function(){
                    var dropVal = $(this).data("droppable").split(",").map(function(item) {return item.trim();});
                    var dropText = (setupCorrectResponses($(this).parent().find("p").text())).replace(/\./g,"_");
                    dropText = (dropText).replace(/\,/g,"_");
                    dropText = (dropText).replace(/\W^-/g,"_");
                    matchingTxt += "[,]" + dropText + "[.]";

                    $("#matching .draggable").each(function(dragIndex){
                        var dragVal = $(this).data("draggable");
                        var dragTextVal = $(this).find("p").text();

                        $.each(dropVal, function(dropIndex, value){
                            var indexVal = dropIndex;

                            if(dragVal == value)
                            {
                                var dragText = (setupCorrectResponses(dragTextVal)).replace(/\./g,"_");
                                dragText = (dragText).replace(/\,/g,"_");
                                dragText = (dragText).replace(/\W^-/g,"_");
                                if(indexVal > 0)
                                {
                                    matchingTxt += "-" + dragText;
                                }
                                else
                                {
                                    matchingTxt += dragText;
                                }
                                return false;
                            }
                        });
                    });   
                });

                if($("#matching").length > 0)
                {
                    obj.correctResponses = (new RegExp(/\[\,\]/)).test(matchingTxt) ?  matchingTxt.replace(/\[\,\]/,"") : matchingTxt;
                }

                parent.setCMIInteractions(obj);
            }
        }
        $(".iconRadioLabel").each(function(){
            $(this).click(function(){
                $(this).find("input").prop("checked", true);
            });
        });

        $("#submitBtn").off().on("click",function(){
            var numMultiCorrect = 0;
            var numMultiIncorrect = 0;
            var numMultiAnswer = 0;

            if(timer)
            {
                clearInterval(timer);
            }

            if($("#choice .checkboxesBtn").length > 0)
            {
                $("#choice .checkboxesBtn .quizSelect").each(function(index){
                    if($(this).attr("value") == "correct")
                    {
                        numMultiCorrect++;
                    }
                    if($(this).prop("checked"))
                    {
                        if($(this).attr("value") == "correct")
                        {
                            numMultiAnswer++;
                        }
                        else
                        {
                            numMultiIncorrect++;
                        }

                        if(index > 0)
                        {
                            response += "-" + setupCorrectResponses($(this).parent().find("label").text());
                        }
                        else
                        {
                            response += setupCorrectResponses($(this).parent().find("label").text());
                        }
                        answered = true;
                    }
                });
                if(numMultiCorrect == numMultiAnswer && numMultiIncorrect == 0)
                {
                    answer = "correct";
                }
            }
            else
            {
                $(".quizSelect").each(function(index){
                    if($(this).prop("checked"))
                    {
                        answer = $(this).val();
                        if($("#trueFalse").length > 0)
                        {
                            response = (setupCorrectResponses($(this).parent().find("label").text()).toLowerCase())
                        }
                        else if($("#choice").length > 0)
                        {
                            response = setupCorrectResponses($(this).parent().find("label").text());
                        }
                        answered = true;
                    }
                });
            }

            $(".quizResponse").hide();

            if(answered)
            {
                pageFinish = true;

                if(answer == "correct")
                {
                    if(self != top)
                    {
                        if(!gainScore)
                        {
                            parent.addScore();
                            gainScore = true;
                        }
                    }
                    doneAnswering = true;
                    $("#responseCorrect").show();
                    $("#responseSelectAnswer").hide();


                }
                else
                {
                    doneAnswering = true;
                    $("#responseIncorrect").show();
                    $("#responseSelectAnswer").hide();
                }
                $('#show-result-wrap').fadeIn();
                $("#submitBtn").hide();
                $("#submitDragDropBtn").hide();
                $("#submitDropDownBtn").hide();

                if(self != top)
                {
                    parent.showNextPageBtn();
                    if(scorm)
                    {
                        parent.setCMIInteractionsLatency(quizCountID,response,answer,((time).getMilliseconds() * 10));
                    }
                }

                if(typeof audioStop == "function")
                {
                    audioStop();

                    if($(audio).find("#primaryAudio").length || 
                       $(audio).find("#fallbackAudio").length)
                    {
                        $(audio).find("#primaryAudio").attr("src",$(audio).find("#primaryAudio").data("first"));
                        $(audio).find("#fallbackAudio").attr("src",$(audio).find("#fallbackAudio").data("first"));
                        audio.load();
                        audioPlay();
                        if(self != top)
                        {
                            parent.hideNextBtn();
                            parent.showPauseBtn()
                        }

                        audio.addEventListener("ended",function(){
                            $(audio).find("#primaryAudio").attr("src",$(audio).find("#primaryAudio").data("second"));
                            $(audio).find("#fallbackAudio").attr("src",$(audio).find("#fallbackAudio").data("second"));
                            audio.load();

                            if(self != top)
                            {
                                parent.showNextPageBtn();
                                parent.setWhenAudioIsFinish();
                            }
                            if(!$("#resetScreenBtn"))
                            {
                                addResetBtn();
                            }
                            else
                            {
                                $("#resetScreenBtn").remove();
                                addResetBtn();
                            }
                        });
                    }
                }
            }
            else
            {
                $("#responseSelectAnswer").show();
            }
        });

        $(".draggable").draggable({
            zIndex: 50,
            revert: true
        });
        $(".droppable").droppable({
            drop: function(event,ui){
                var droppableCorrect = 0;
                var numIncorrect = 0;
                var draggableValue = $(ui.draggable).data("draggable");
                var droppableValueAry = $(this).data("droppable").split(",").map(function(item) {return item.trim();});

                $(ui.draggable).css({margin:"2px"});
                $(ui.draggable).find("p").css({paddingBottom:0,marginBottom:0});

                $(ui.draggable).detach().css({top: 0,left: 0}).appendTo($(this));
                $("#resetDragDropBtn").css({opacity:1});

                if($(this).find(".draggable").length == droppableValueAry.length)
                {
                    for(var i = 0; i < droppableValueAry.length; i++)
                    {
                        $(this).find(".draggable").each(function(){
                            if($(this).data("draggable") == droppableValueAry[i])
                            {
                                droppableCorrect++;
                                return false;
                            }
                        });
                    }
                    if(droppableCorrect == droppableValueAry.length)
                    {
                        $(this).attr("data-result","correct");
                    }
                    else
                    {
                        $(this).attr("data-result","incorrect");
                    }
                }
                else
                {
                    $(this).attr("data-result","incorrect");
                }
            }
        });
        $("#resetDragDropBtn").off().on("click",function(){
            $(".draggable").each(function(){
                $(this).css({padding:"5px"});
                $(".droppable").attr("data-result","incorrect");
                $(this).appendTo(("." + $(this).data("draggable")));
            });
        });

        $("#submitDragDropBtn").off("click").on("click",function(){

            $(".droppable").each(function(){
                if($(this).find(".draggable").length > 0)
                {
                    answered = true;
                }
                else
                {
                    answered = false;
                    return false;
                }
            });

            if(timer)
            {
                clearInterval(timer);
            }

            if(answered)
            {
                pageFinish = true;
                $("#resetDragDropBtn").css({opacity:0});

                $(".droppable").each(function(){
                    if($(this).attr("data-result") == "correct")
                    {
                        numCorrect++;
                    }
                });
                scoreValue = (parseFloat($("#score").text()) * numCorrect);
                doneAnswering = true;
                $("#responseSelectAnswer").hide();

                if(numCorrect >= $(".droppable").length)
                {
                    answer = "correct";
                    $("#responseCorrect").show();
                }
                else
                {
                    answer = "incorrect";
                    $("#responseIncorrect").show();
                }

                if(self != top)
                {
                    if(!gainScore)
                    {
                        $(".draggableContainer").each(function(){
                            var dragVal = "";

                            for(var i = 0; i < $(this).children().find("p").length; i++)
                            {
                                if(i > 0)
                                {
                                    dragVal += "-" + $(this).children().find("p").eq(i).text();
                                }
                                else
                                {
                                    dragVal += $(this).children().find("p").eq(i).text();
                                }
                            }
                            dragVal = (setupCorrectResponses(dragVal)).replace(/\./g,"_");
                            dragVal = (dragVal).replace(/\,/g,"_");
                            dragVal = (dragVal).replace(/\W^-/g,"_");

                            var dropVal = (setupCorrectResponses($(this).children().eq(2).text())).replace(/\./g,"_");
                            dropVal = (dropVal).replace(/\,/g,"_");
                            dropVal = (dropVal).replace(/\W^-/g,"_");

                            response += "[,]" + dropVal + "[.]" + dragVal;
                        });
                        response = (new RegExp(/\[\,\]/)).test(response) ?  response.replace(/\[\,\]/,"") : response;

                        parent.addScore();

                        if(scorm)
                        {
                            parent.setCMIInteractionsLatency(quizCountID,response,answer,((time).getMilliseconds() * 10));
                        }

                        parent.showNextPageBtn();
                        parent.showPageProgress();
                        parent.setWhenAudioIsFinish();
                        gainScore = true;
                    }
                }
                $('#show-result-wrap').fadeIn();
                $("#submitBtn").hide();
                $("#submitDragDropBtn").hide();
                $("#submitDropDownBtn").hide();
            }
            else
            {
                $("#responseSelectAnswer").show();
            }
        });

        $("#submitDropDownBtn").off().on("click",function(){
            answered = true;
            pageFinish = true;
            $(".dropDownSelection").each(function(){
                if($(this).val() == "true")
                {
                    numCorrect++;
                }
            });
            scoreValue = (parseFloat($("#score").text()) * numCorrect);
            doneAnswering = true;
            $("#responseSelectAnswer").hide();

            if(numCorrect >= $(".draggable").length)
            {
                answer = "correct";
                $("#responseCorrect").show();
            }
            else
            {
                answer = "incorrect";
                $("#responseIncorrect").show();
            }

            if(timer)
            {
                clearInterval(timer);
            }

            if(self != top)
            {
                if(!gainScore)
                {
                    $("#dropDownAnswer .selectWrapper").each(function(){
                        var drop = (setupCorrectResponses($(this).prev().text())).replace(/\,/g,"_");
                        drop = (drop).replace(/\./g,"_");
                        drop = (drop).replace(/\W^-/g,"_");
                        response += "[,]" + drop + "[.]";
                        var drag = (setupCorrectResponses($(this).find("select").eq(0).find("option:selected").text())).replace(/\,/g,"_");
                        drag = (drag).replace(/\W^-/g,"_");
                        response += (drag).replace(/\./g,"_");
                    });

                    response = (new RegExp(/\[\,\]/)).test(response) ?  response.replace(/\[\,\]/,"") : response;
                    parent.addScore();

                    if(scorm)
                    {
                        parent.setCMIInteractionsLatency(quizCountID,response,answer,((time).getMilliseconds() * 10));
                    }

                    parent.showNextPageBtn();
                    parent.showPageProgress();
                    parent.setWhenAudioIsFinish();
                    gainScore = true;
                }
            }
            $('#show-result-wrap').fadeIn();
            $("#submitBtn").hide();
            $("#submitDragDropBtn").hide();
            $("#submitDropDownBtn").hide();
        });

        $("#nextPage").hide();
    }
    $(window).resize(function(){
        winWidth = $(window).width();
        winHeight = $(window).height();
        percentMagnifierSize =  $("#magnifyImg img").eq(0).width() / $("#previewImg img").eq(0).width();
        magnifyElemWidth = $("#magnifyImg").width();
        magnifyImgWidth = $("#magnifyImg img").eq(0).width();
        magnifyElemHeight = $("#magnifyImg").height();
        magnifyImgHeight = $("#magnifyImg img").eq(0).height();
        previewElemWidth = $("#previewImg").width();
        previewImgWidth = $("#previewImg img").eq(0).width();
        previewElemHeight = $("#previewImg").height();
        previewImgHeight = $("#previewImg img").eq(0).height();

        $("#magnifyImg img").eq(0).off("mousemove").on("mousemove", function(e){
            var offset = manageManifier(e);
            $("#previewImg img").css({top: offset.y, left: offset.x});
        })
        $(".stretchImgContainer").each(function(){
            var imgHeight = $(this).parent().height();
            $(this).css({height:(imgHeight + "px")});
        });
        setSameHeight();
        setWinHeightByPercent();
        setBodyContainer();

        $("#slideSideBarResourceResult iframe").attr("width",(winWidth * 0.85));
        $("#slideSideBarResourceResult iframe").attr("height",(winHeight - 260));
        $(".modal-body").height(winHeight - 250);

        if(winWidth <= 760)
        {
            $("#videoModal .modal-dialog, #videoModal .modal-content, #quizModal .modal-content, #disclaimer .modal-content").width((winWidth - 30));
            //$("#pdfModal .modal-dialog, #pdfModal .modal-content").width((winWidth - 30));
            $("#vidPlayer").width((winWidth - 60));
            $(".pdfFrame, .video-js").each(function(){
                $(this).width((winWidth - 60));
            });
        }
        if(winWidth >= 760)
        {
            $("#videoModal .modal-dialog, #videoModal .modal-content, #quizModal .modal-content, #disclaimer .modal-content").width(730);
            //$("#pdfModal .modal-dialog, #pdfModal .modal-content").width(730);
            $("#vidPlayer").width(700);
            $(".pdfFrame, .video-js").each(function(){
                $(this).width(700);
            });
        }

        setSeeMoreBtn();
    });
});