var audio = document.getElementById('audio');
var playpause = document.getElementById("play");
var bars = document.getElementById("bars");
var title = document.getElementById("title");
var artist = document.getElementById("artist");

function togglePlayPause() {
    if (audio.paused || audio.ended) {
        $('#btnPlayPause').removeClass('play');
        $('#btnPlayPause').addClass('pause');
        audio.load()
        audio.play();
        bars.hidden = false;
    } else {
        $('#btnPlayPause').removeClass('pause');
        $('#btnPlayPause').addClass('play');
        audio.pause();
        bars.hidden = true;
    }
}

function changeTracks() {
    audio.src = "http://localhost:3003/music?id=hello.mp3";
    audio.load();
    playpause.title = "Pause";
    audio.play();
    bars.hidden = false;
}

function updateSource(id) {
    togglePlayPause();
    audio.src = "http://localhost:3003/music?id=" + document.getElementById(id).getAttribute('id');
    togglePlayPause();

    /*
    var audioPlay = audio.play();
    if (audioPlay !== undefined) {
        audioPlay.then(_ => {
            audio.pause();
        }).catch(e => {
            console.log("ccsinid");
        })
    }*/
}

function handleKeyPress(e) { //non usare!
    console.log("tasto premuto");
    if (e.KeyCode == 13 || e.which == 13) {
        console.log("return pressed");

        console.log("call api");
        playSong('strobe', 'deadmau5');
    }
}
/*
var urlParams = new URLSearchParams(window.location.search);
var access_token;
if (urlParams.has('access_token')) {
    access_token = urlParams.get('access_token');

    //var search = document.getElementById("searchbar");
    //var artist_string = search.value.split()[0];
    //var track_string = search.value.split()[1];
    playSong('strobe', 'deadmau5');
}
*/
/*
function searchTracks(query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        headers: { 'Authorization': 'Bearer ' + access_token },
        data: {
            q: query,
            type: 'track'
        },
        success: function (response) {

            if (response.tracks.items.length) {
                audio.crossOrigin = 'anonymous';
                var track = response.tracks.items[0];
                audio.src = track.external_urls.spotify;
                audio.play();
                console.log("arrivato");
                //communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
            }
        }
    });
}

function playSong(songName, artistName) {
    var query = songName;
    if (artistName) {
        query += ' artist:' + artistName;
    }

    searchTracks(query);
}

function communicateAction(text) {
    var rec = document.getElementById('conversation');
    rec.innerHTML += '<div class="action">' + text + '</div>';
}
*/
