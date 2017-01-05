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
