// PRESS THE MENU BUTTON TO TRIGGER ANIMATION
// PRESS PLAY BUTTON TO LISTEN THE DEMO SONG

// As seen on: "https://dribbble.com/shots/2144866-Day-5-Music-Player-Rebound/"

// THANK YOU!

var audio = document.getElementById('audio');
var playpause = document.getElementById("play");

function togglePlayPause() {
   if (audio.paused || audio.ended) {
      playpause.title = "Pause";
      audio.play();
   } else {
      playpause.title = "Play";
      audio.pause();
   }
}

//traccia iniziale
//le canzoni che ho messo in music sono 3 i cui file si chiamano come nel tutorial
//hello.mp3, divine.mp3, beginning.mp3
audio.src ="http://localhost:3003/music?id=divine.mp3";
document.getElementById('title').innerHTML="Shape of You";
document.getElementById('artist').innerHTML="Ed Sheeran";

function changeTracks(){
        audio.src ="http://localhost:3003/music?id=hello.mp3";
        audio.load(); 
        playpause.title = "Pause";
        audio.play();
        
};

function updateSource(id){    
    audio.src="http://localhost:3003/music?id=" + document.getElementById(id).getAttribute('data-value');
    //document.getElementById('title').innerHTML="Shape of You";
    //document.getElementById('artist').innerHTML="Ed Sheeran";
    audio.load();
    playpause.title = "Pause"; //non funziona
    audio.play();
    
}
