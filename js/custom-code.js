var playAudio = function(audioPath) {
    audioStop();
    $('#audio source').eq(0).attr("src",'');
    $('#audio source').eq(0).attr("src",(parent.audioPath + audioPath));
    audio.load();
    var playPromise = audio.play();
    playPromise.then(_ => {
        audio.pause();
        audio.play();
    })
    .catch(error => {
        audio.pause();
        audio.play();
    });
    //audioPlay();
    parent.showPauseBtn();
}