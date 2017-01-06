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
    songsHTML += `</ul></div>`;
  }
  //Put in div
  $(".section2 .wrapper").html(songsHTML);
}
