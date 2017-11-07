var express = require('express');
var fs = require('fs');
var path = require('path');
var audioMetaData = require('audio-metadata');
/*
var request = require('request');

var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
*/
/*
var client_id = ''; // Your client id
var client_secret = ''; // Your secret
var redirect_uri = ''; // Your redirect uri
*/

//var stateKey = 'spotify_auth_state';

var app = express();
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
app.use('/public', express.static(__dirname + '/public'));
/*
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
*/
/*
app.post('/public', function(req, res, next) {
    var code = req.query.code || null;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      }
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token

        // we can also pass the token to the browser to make requests from there
        res.redirect('/public' +
          querystring.stringify({
            access_token: access_token
          }));
      } else {
        res.redirect('/public' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
});
*/
/*
app.get('/callback', function(req, res, next) {
    var code = req.query.code ? req.query.code : null;
  var state = req.query.state ? req.query.state : null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (!state) {
      console.log(state);
    res.redirect('/public?' +
      querystring.stringify({
        error: 'state_mismatch'
    }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/public?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
        }));
      } else {
        res.redirect('/public?' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});
*/
app.get('/', function(req, res) {
    return res.redirect('./public');
});

app.get('/list', function(req,res) {
    const path = './music';
    var files = fileList(path).map((file) => file.split(path.sep).slice(-1)[0]);
    files = files.map((file) => file.split("\\").slice(-1)[0]);
    console.log('files: ' + typeof files);
    console.log(files);
    var metadata_files = metadata(files);
    var obj = {
        files: files,
        metadata: metadata_files
    };
    var json = JSON.stringify(obj);
    console.log(metadata(files));
    res.send(json);
    res.end();
});

function fileList(dir) {
    return fs.readdirSync(dir).reduce(function(list, file) {
        var name = path.join(dir, file);
        var isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? fileList(name) : [name]);
    }, []);
}

app.get('/music', function(req, res) {
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

app.listen(3003, function() {
    console.log('App listening on port 3003!');
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 /*
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
*/

function metadata(filename) {
    var array = [];
    for (var i = 0; i < filename.length; i++) {
        var oggData = fs.readFileSync(__dirname + '/music/' + filename[i]);
        //var metadataOgg = audioMetaData.ogg(oggData);
        //var metadataID3V1 = audioMetaData.id3v1(oggData);
        var metadataID3V2 = audioMetaData.id3v2(oggData);
        array.push(metadataID3V2);

    }
    return array;
}
