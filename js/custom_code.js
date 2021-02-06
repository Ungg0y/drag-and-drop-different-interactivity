var useTopNav = false;

showCertainPage= function(page)
{
    var quizPage = false;
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#transcript").hide();
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.resetAnimation == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.resetAnimation();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioStop == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioStop();
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audio.currentTime = 0;
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#audio source").each(function(){
            if($(this).attr("data-default") != undefined)
            {
                $(this).attr("src", audioPath + $(this).attr("data-default"));
            }
        });
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audio.load();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.stopYTVideo == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.stopYTVideo();
    }
    if($("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#video").length > 0)
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#videoModal").modal("hide");
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.videoStop();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.reset == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.usersObjIndex = 0;
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.conversationIndex = 0;
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.reset();
    }
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$(".audioPlayer").each(function(){
        $(this).each(function(){
            if($(this).find("source").attr("src") != undefined)
            {
                $(this)[0].pause();
            }
        });
    });
    $.each(pages,function(index,val){
        if(val.pageName == page)
        {
            wrapperObj.currentPage = index;
            return false;
        }
    });
    
    if((pages[wrapperObj.currentPage].pageName).search('quiz') < 0)
    {
        useTopNav = true;
    }
    else
    {
        useTopNav = false;
    }
    console.log(useTopNav);
    setPage();
    showProperAudioBtn();
}

retakeCourse = function()
{
    wrapperObj.score = 0;
    numOfAttempt = numOfAttempt >= 3 ? 3 : numOfAttempt + 1;
    wrapperObj.numOfAttempt = numOfAttempt;
    repeatCourse = true;
    quizPageIndex = 0;

    for(var i = 0; i < pages.length; i++)
    {
        $("#pageContent .page").eq(i)[0].contentWindow.pageFinish = false;
        $("#pageContent .page").eq(i)[0].contentWindow.audioPlayed = false;
        $("#pageContent .page").eq(i)[0].contentWindow.resetAnimation();
        $("#pageContent .page").eq(i)[0].contentWindow.audioStop();
        $("#pageContent .page").eq(i)[0].contentWindow.audio.currentTime = 0;
        $("#pageContent .page").eq(i)[0].contentWindow.audioProgress = 0;

        for(var j = 0; j < quizes.length; j++)
        {
            if(pages[i].pageName == quizes[j])
            {
                if(typeof $("#pageContent .page").eq(i)[0].contentWindow.resetQuizPage == "function")
                {
                    if(shuffleAnswer)
                    {
                        $("#pageContent .page").eq(i)[0].contentWindow.shuffleAnswer();
                    }
                    $("#pageContent .page").eq(i)[0].contentWindow.resetQuizPage();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#responseSelectAnswer").hide();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#responseCorrect").hide();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#responseIncorrect").hide();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#responseCorrectOnScreen").hide();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#responseIncorrectOnScreen").hide();

                    $("#pageContent .page").eq(i)[0].contentWindow.$("#submitBtn").show();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#submitDragDropBtn").show();
                    $("#pageContent .page").eq(i)[0].contentWindow.$("#submitDropDownBtn").show();
                }
            }
        }
    }
    $.each(pages,function(index,val){
        if(val.pageName == quizes[0])
        {
            wrapperObj.currentPage = index;
            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.startTimer == "function")
            {
                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.startTimer();
            }
            return false;
        }
    });
    $('.next-page-btn').hide();
    showCertainPage(pages[wrapperObj.currentPage].pageName);
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioPlay();
}

resetAnimation = function()
{
    seriesOfImagesIndex = 0;

    $(".imgContainer").each(function(){
        $(this).attr("src",$(this).data("default"));
    });
    $(".hideElement").each(function(){
        $(this).css({opacity:0});
    });
    $(".wow").each(function(){
        $(this).removeClass($(this).data("animation"));
        if($(this).hasClass("hideElement"))
        {
            $(this).css({opacity:0});
        }
    });

    $(".addAnimation").each(function(a){
        $(this).removeClass($(this).data("animation"));
        if($(this).hasClass("hideElement"))
        {
            $(this).css({opacity:0});
        }
    });
}

playAnimation = function()
{
    $(".addAnimation.imgContainer").data("timing",$(".seriesOfImages img").eq(seriesOfImagesIndex).data("timing"));
    $(".addAnimation.imgContainer").data("animation",$(".seriesOfImages img").eq(seriesOfImagesIndex).data("animation"));

    // Disabled for now
    /*if($(".seriesOfImages img").eq(seriesOfImagesIndex).data("exit-timing"))
    {
        $(".addAnimation.imgContainer").data("timing",$(".seriesOfImages img").eq(seriesOfImagesIndex).data("exit-timing"));
        $(".addAnimation.imgContainer").data("animation",$(".seriesOfImages img").eq(seriesOfImagesIndex).data("exit-animation"));
    }*/
    $(".next-fade-in").each(function(a){
        var currentElementAnimating = null;
        var elementExitAnimating = null;
        var currentImageAnimating = null;
        var imageExitAnimating = null;

        if(audio.currentTime >= parseFloat($(this).data("timing")) && audio.currentTime <= parseFloat($(this).data("timing") + 0.5))
        {
            $(this).fadeIn();
        }
    });
    
    $(".trigger-audio").each(function(a){
        var currentElementAnimating = null;
        var elementExitAnimating = null;
        var currentImageAnimating = null;
        var imageExitAnimating = null;

        if(audio.currentTime >= parseFloat($(this).data("trigger-timing")) && audio.currentTime <= parseFloat($(this).data("trigger-timing") + 0.5))
        {
            $(($(this).attr('data-element'))).trigger('click');
        }
    });
    

    $(".addAnimation").each(function(a){
        var currentElementAnimating = null;
        var elementExitAnimating = null;
        var currentImageAnimating = null;
        var imageExitAnimating = null;

        if(audio.currentTime >= parseFloat($(this).data("timing")) && audio.currentTime <= parseFloat($(this).data("timing") + 0.5))
        {
            currentElementAnimating = $(this);
            currentElementAnimating.css({opacity:1});
            currentElementAnimating.addClass($(this).data("animation"));

            //scrollTop = scrollTop + 30;

            //$("body").scrollTop(scrollTop);

            if($(this).hasClass("imgContainer"))
            {

                $(this).attr("src",$(".seriesOfImages img").eq(seriesOfImagesIndex).attr("src"));
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(".seriesOfImages img").each(function(){
                        $(currentElementAnimating).removeClass($(this).data("animation"));
                    });
                });
                seriesOfImagesIndex = (seriesOfImagesIndex < $(".seriesOfImages img").length) ? (seriesOfImagesIndex + 1) : seriesOfImagesIndex;
            }
            else
            {
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass($(this).data("animation"));
                });
            }
        }
        if(audio.currentTime >= parseFloat($(this).data("exit-timing")) && audio.currentTime <= parseFloat($(this).data("exit-timing") + 0.5))
        {
            elementExitAnimating = $(this);
            elementExitAnimating.css({opacity:1});
            elementExitAnimating.addClass($(this).data("exit-animation"));

            // Disabled for now
            /*if($(this).hasClass("imgContainer"))
            {
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(".seriesOfImages img").each(function(){
                        $(elementExitAnimating).removeClass($(this).data("exit-animation"));
                    });
                });
            }
            else
            {
                $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass($(this).data("exit-animation"));
                });
            }*/
            $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass($(this).data("exit-animation"));
                if(elementExitAnimating.hasClass("hideElement"))
                {
                    elementExitAnimating.css({opacity:0});
                }
            });
        }
    });

    if(self != top)
    {
        if((window.location.href).search("quiz") < 0)
        {
            if((parseInt((audio.currentTime / audio.duration) * 100) >= audioProgress))
            {
                audioProgress = parseInt((audio.currentTime / audio.duration) * 100);
            }
            parent.showPageProgress();
        }
        else
        {
            if((parseInt((audio.currentTime / audio.duration) * 100) >= audioProgress))
            {
                audioProgress = parseInt((audio.currentTime / audio.duration) * 100) - 1;
            }
            parent.showPageProgress();
        }
    }
}

nextPage = function()
{
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#transcript").hide();
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.resetAnimation == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.resetAnimation();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioStop == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioStop();
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audio.currentTime = 0;
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#audio source").each(function(){
            if($(this).attr("data-default") != undefined)
            {
                $(this).attr("src", audioPath + $(this).attr("data-default"));
            }
        });
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audio.load();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.stopYTVideo == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.stopYTVideo();
    }
    if($("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#video").length > 0)
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#videoModal").modal("hide");
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.videoStop();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.reset == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.reset();
    }

    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$(".audioPlayer").each(function(){
        $(this).each(function(){
            if($(this).find("source").attr("src") != undefined)
            {
                $(this)[0].pause();
            }
        });
    });
    
    wrapperObj.currentPage += 1;

    if(repeatCourse || coursePass)
    {
        quizPageIndex = (quizPageIndex < (quizes.length - 1)) ? (useTopNav ? quizPageIndex : (quizPageIndex + 1)) : quizPageIndex;
        useTopNav = false;
        $.each(pages,function(index,val){
            if(val.pageName == quizes[quizPageIndex])
            {
                wrapperObj.currentPage = index;
                return false;
            }
        });
    }

    for(var i = 0; i < quizes.length; i++)
    {
        if(pages[wrapperObj.currentPage].pageName == quizes[i])
        {
            if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.startTimer == "function")
            {
                $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.startTimer();
            }
        }
    }
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.setSeeMoreBtn();
    setPage();
    showProperAudioBtn();
}
prevPage = function()
{
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#transcript").hide();
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.resetAnimation == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.resetAnimation();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioStop == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audioStop();
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audio.currentTime = 0;
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#audio source").each(function(){
            if($(this).attr("data-default") != undefined)
            {
                $(this).attr("src", audioPath + $(this).attr("data-default"));
            }
        });
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.audio.load();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.stopYTVideo == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.stopYTVideo();
    }
    if($("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#video").length > 0)
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$("#videoModal").modal("hide");
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.videoStop();
    }
    if(typeof $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.reset == "function")
    {
        $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.reset();
    }
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.$(".audioPlayer").each(function(){
        $(this).each(function(){
            if($(this).find("source").attr("src") != undefined)
            {
                $(this)[0].pause();
            }
        });
    });
    
    wrapperObj.currentPage -= 1;
    
    if(repeatCourse || coursePass)
    {
        quizPageIndex = (quizPageIndex <= (quizes.length - 1) && quizPageIndex > 0) ? (useTopNav ? quizPageIndex : (quizPageIndex - 1)) : quizPageIndex;
        useTopNav = false;
        $.each(pages,function(index,val){
            if(val.pageName == quizes[quizPageIndex])
            {
                wrapperObj.currentPage = index;
                return false;
            }
        });
    }
    $("#pageContent .page").eq(wrapperObj.currentPage)[0].contentWindow.setSeeMoreBtn();
    setPage();
    showProperAudioBtn();
}