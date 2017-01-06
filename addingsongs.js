

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
  songHTML += `</ul></div>`;
  $(".section2 .wrapper").append(songHTML);
  //hides add music
  $(".addmusic").hide();
  //shows list
  $(".section1").show();
  $(".section2").show();

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
    url : "songs.json"
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
  for(var i = 0; i < songs.songs.length; i++) {
    songsHTML += `<div class="song-player">`;
    songsHTML += `<h1>${songs.songs[i].title}</h1>`;
    songsHTML += `<ul><li class="player-artist">${songs.songs[i].artist}</li>`
    songsHTML += `<li class="player-album">${songs.songs[i].album}</li>`
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

//promise to pull in second JSON file

var promise2 = new Promise (function(resolve, reject){
  $.ajax({
    url : "moresongs.json"
  })
  .done(function(data, t, x){
    resolve(data);
  })
});

promise2.then(function(data) {
  var songList2 = data;
  createMoreSongs(songList2);
});

function createMoreSongs(songList2) {
  var songs = songList2;

  for(var i = 0; i < songs.songs.length; i++) {
    moreSongsHTML += `<div class="song-player">`;
    moreSongsHTML += `<h1>${songs.songs[i].title}</h1>`;
    moreSongsHTML += `<ul><li class="player-artist">${songs.songs[i].artist}</li>`
    moreSongsHTML += `<li class="player-album">${songs.songs[i].album}</li>`
    moreSongsHTML += `<li><button class="delete-button">DELETE</button></li>`
    moreSongsHTML += `</ul></div>`;
  }
}

//on clicking the more button, add the second songs json

$("#moreMusic").click(function(){
  $(".section2 .wrapper").append(moreSongsHTML);
})
