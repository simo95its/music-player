

$(function() {
    var audio = document.getElementById('audio');
    var playpause = document.getElementById("play");
    var bars = document.getElementById("bars");
    var title = document.getElementById("title");
    var artist = document.getElementById("artist");
    var items = {};
    var track;

    $('#toogle').click(function () {
        $('#popup').css( "display", "block" );
    });

    var list = document.getElementById('list');
    //var items = listFiles();
    $.ajax({
        url: "http://localhost:3003/list"
    }).done(function (data) {

        items = $.parseJSON(data);

        console.log('data: ' + data);
        console.log(typeof data);
        //var items = data;
        console.log('items: ' + items);
        console.log(typeof items);

        for (var i = 0; i < items.metadata.length; i++) {
            var song = document.createElement('tr');
            song.class = 'song';
            list.appendChild(song);
            var nr = document.createElement('td');
            nr.class = 'nr';
            var title = document.createElement('td');
            title.class = 'title';
            //var length = document.createElement('length');
            //length.class = 'length';
            song.appendChild(nr);
            song.appendChild(title);
            //song.appendChild(length);
            var number = document.createElement('h5');
            number.innerHTML = i + 1;
            nr.appendChild(number);
            var li_song = document.createElement('li');
            var nome = items.files[i];
            li_song.id = nome;
            title.appendChild(li_song);
            song.setAttribute('onclick', 'updateSource("' + li_song.id + '")');
            var title_header = document.createElement('h6');
            title_header.innerHTML = items.files[i].split(".", 1);
            var artist_node = document.createElement('h5');
            artist_node.id = 'artist';
            artist_node.innerHTML = items.metadata[i].artist;
            li_song.appendChild(title_header);
            li_song.appendChild(artist)
            var no_length = document.createElement('h5');
            //no_length.innerHTML = "length";
            //length.appendChild(no_length);
        }
    });
    while (items.files !== undefined) {
        track = items.files[0];
        audio.src = 'http://localhost:3003/music?id=' + track;
        audio.load();
    }
});

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
    tooglePlayPause();
    for (var i = 0; i < items.files.length; i++) {
        if (items.files[i] === track) {
            track = items.files[++i];
        }
    }
    audio.src = "http://localhost:3003/music?id=" + track;
    tooglePlayPause();
}

function updateSource(id) {
    togglePlayPause();
    track = document.getElementById(id).getAttribute('id');
    audio.src = "http://localhost:3003/music?id=" + track;
    title.innerHTML = id.split(".", 1);
    var artist_name = document.getElementById(artist).innerHTML;
    artist.innerHTML = artist_name;
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
