var express = require('express');
var fs = require('fs');
var path = require('path');
var audioMetaData = require('audio-metadata');

var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/music', express.static(__dirname + '/music'));

app.get('/', function(req, res) {
    return res.redirect('./public');
});

app.get('/list', function(req,res) {
    const path = './music';
    var files = fileList(path).map((file) => file.split(path.sep).slice(-1)[0]);
    //console.log(files);
    files = files.map((file) => file.split("\\").slice(-1)[0]);
    //console.log(files);
    var metadata_files = metadata(files);
    var tracks = [];
    for (var i = 0; i < files.length; i++) {
        var obj = {};
        obj.track = i + 1;
        obj.name = files[i].split('.')[0];
        //console.log(metadata_files[i].title);
        obj.length = "--:--";
        obj.file = files[i].split('.')[0];
        console.log(files[i].split('.')[0]);
        tracks.push(obj);
    }
    var json = JSON.stringify(tracks);
    res.send(json);
    res.end();
});

/*
app.get('/music', function(req, res) {
    res.setHeader("Content-Type", "audio/mp3");
    var fileId = req.query.id;
    var file = __dirname + '/music/' + fileId;
    fs.exists(file, function(exists) {
        if(exists)
        {
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        }
        else
        {
            res.send("Its a 404");
            res.end();
        }
    });
});
*/

/*
app.get('/download', function(req, res) {
    var fileId = req.query.id;
    var file = __dirname + '/music/' + fileId;
    fs.exists(file, function(exists) {
        if(exists)
        {
            res.setHeader('Content-disposition', 'attachment; filename=' + fileId);
            res.setHeader('Content-Type', 'application/audio/mpeg3');
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        }
        else
        {
            res.send("Its a 404");
            res.end();
        }
    });
});
*/

app.listen(3003, function() {
    console.log('App listening on port 3003!');
});

function metadata(filename) {
    var array = [];
    for (var i = 0; i < filename.length; i++) {
        var oggData = fs.readFileSync(__dirname + '/music/' + filename[i]);
        //var metadataOgg = audioMetaData.ogg(oggData);
        var metadataID3V1 = audioMetaData.id3v1(oggData);
        //var metadataID3V2 = audioMetaData.id3v2(oggData);
        if(metadataID3V1 !== null) {
            array.push(metadataID3V1);
        }
    }
    return array;
}

function fileList(dir) {
    return fs.readdirSync(dir).reduce(function(list, file) {
        var name = path.join(dir, file);
        var isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? fileList(name) : [name]);
    }, []);
}
