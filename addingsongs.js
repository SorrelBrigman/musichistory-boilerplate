

//On load hide the add music player

$(".addmusic").hide();

//when you click on add music
$("#addMusic").click(showAddMusic);

function showAddMusic() {
    //hides list
  $(".section1").hide();
  $(".section2").hide();
    //show's add music thing
  $(".addmusic").show();
}

//Global variable
  var moreSongsHTML = "";




//when you enter or submit
$("#submitButton").click(addMusicToPlayer);

function addMusicToPlayer() {
  //adds song to list
    //gets user info
  var song = $("#songName").val();
  var artist = $("#artistName").val();
  var album = $("#albumName").val()
    //adds to page
  var songHTML = ""
  songHTML += `<div class="song-player-">`;
  songHTML += `<h1>${song}</h1>`;
  songHTML += `<ul><li class="player-artist">${artist}</li>`
  songHTML += `<li class="player-album">${album}</li>`
  songHTML += `<li><button class="delete-button">DELETE</button></li>`
  songHTML += `</ul></div>`;
  $(".section2 .wrapper").append(songHTML);
  //hides add music
  $(".addmusic").hide();
  //shows list
  $(".section1").show();
  $(".section2").show();
  //add event listener on delete button
  $(".delete-button").click(deleteSong);
  //adds to JSON file
  writeSongsToJSON(song, artist, album);
}

//when user clicks on list music, add music should be hiddern

$("#listMusic").click(showList);

function showList() {
  $(".addmusic").hide();
  $(".section1").show();
  $(".section2").show();
}

//load JSON song file

var promise1 = new Promise (function(resolve, reject){
  $.ajax({
    url : "https://musichistoryskb.firebaseio.com/.json"
  })
  .done(function(data, t, x){
    resolve(data);
  })
});


promise1.then(function(data) {
  var songList1 = data;
  fillSongs(songList1);
});

//fill the  song list with JSON file

function fillSongs(songList1) {
  var songs = songList1;
  var songsHTML = "";
//interate through all the songs
     for (var key in songs.songs) {
      songsHTML += `<div class="song-player" data-songsID=${key}>`;
      songsHTML += `<h1>${songs.songs[key].title}</h1>`;
      songsHTML += `<ul><li class="player-artist">${songs.songs[key].artist}</li>`
      songsHTML += `<li class="player-album">${songs.songs[key].album}</li>`
      songsHTML += `<li><button class="delete-button">DELETE</button></li>`
      songsHTML += `</ul></div>`;
    }

  //Put in div
  $(".section2 .wrapper").html(songsHTML);
  //add event listener on delete button
  $(".delete-button").click(deleteSong);
}

//function that deletes song
function deleteSong(e) {
  $(e.target).parentsUntil(".wrapper").remove();
}

//write songs to JSON file

function writeSongsToJSON(title, artist, album) {
  var songToAdd = {};
  songToAdd.title = title;
  songToAdd.artist = artist;
  songToAdd.album = album;
  $.ajax({
    url : "https://musichistoryskb.firebaseio.com/songs.json",
    method : "POST",
    data : JSON.stringify(songToAdd)
  })
  .then((e)=>{
    console.log(e)
  })
  .catch(function(e){
    alert(e)
  })
}
