var audio = document.getElementById('audio');
var playpause = document.getElementById("play");
var bars = document.getElementById("bars");
var title = document.getElementById("title");
var artist = document.getElementById("artist");

function togglePlayPause() {
   if (audio.paused || audio.ended) {
      playpause.title = "Pause";
      audio.play();
      bars.hidden = false;
   } else {
      playpause.title = "Play";
      audio.pause();
      bars.hidden = true;
   }
}

//traccia iniziale
//le canzoni che ho messo in music sono 3 i cui file si chiamano come nel tutorial
//hello.mp3, divine.mp3, beginning.mp3


//audio.src ="http://localhost:3003/music?id=song1.mp3";
//title.innerHTML="song1";
//artist.innerHTML="artist1";


function listFiles() {
    var items = {};
    $.ajax({
        url: "http://localhost:3003/list"
    })
    .done(function (data) {
        //items = JSON.parse(data);
        items = data;
        console.log('data: ' + typeof data);
    });
    console.log('items: ' + typeof items)
    return items;
}

function changeTracks(){
        audio.src ="http://localhost:3003/music?id=hello.mp3";
        audio.load();
        playpause.title = "Pause";
        audio.play();
        bars.hidden = false;
}

function updateSource(id){
    audio.pause()
    playpause.title = "Pause";
    bars.hidden = "true";
    audio.src="http://localhost:3003/music?id=" + document.getElementById(id).getAttribute('data-value');
    //title.innerHTML="Shape of You";
    //artist.innerHTML="Ed Sheeran";
    audio.load();
    audio.play();
    playpause.title = "Play";
}

function listSong() {
    var list = document.getElementById('list');
    var items = listFiles();
    for (var i = 0; i < items.length; i++) {
        var song = document.createElement('tr');
        song.class = 'song';
        list.appendChild(song);
        var nr = document.createElement('td');
        nr.class = 'nr';
        var title = document.createElement('td');
        title.class = 'title';
        var length = document.createElement('length');
        length.class = 'length';
        var heart_td = document.createElement('td');
        heart_td.id = 'heart_td_' + (i+1);
        song.appendChild(nr);
        song.appendChild(title);
        song.appendChild(length);
        song.appendChild(heart_td);
        var number = document.createElement('h5');
        number.innerHTML = i + 1;
        nr.appendChild(number);
        var li_song = document.createElement('li');
        li_song.id = items[i];
        li_song.dataValue = items[i];
        li_song.onclick = updateSource(items[i]);
        title.appendChild(li_song);
        var title_header = document.createElement('h6');
        title_header.innerHTML = items[i];
        li_song.appendChild(title_header);
        var no_length = document.createElement('h5');
        no_length.innerHTML = "length";
        length.appendChild(no_length);
        var input = document.createElement('input');
        input.type = "checkbox";
        input.id = "heart" + (i+1);
        input.checked = "true";
        heart_td.appendChild(input);
        var label = document.createElement('label');
        label.class = "zmr";
        label.for = "heart" + (i+1);
        label.checked = "true";
        heart_td.appendChild(label);
        console.log("L'interfaccia è uscita?");
    }
}

function handleKeyPress(e) { //non usare!
    console.log("tasto premuto");
    if(e.KeyCode == 13 || e.which == 13) {
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
