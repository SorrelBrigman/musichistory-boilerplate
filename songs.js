var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

console.log("starting " + songs);
//add one song to the beginning 

songs.unshift("Tennessee Whiskey by Chris Stapleton on the album Traveler");
console.log("added beginning" + songs);
//and end of the array
songs.push("Young as the Morning Old as the Sea by Passenger on the album Young as the Morning Old as the Sea");
console.log("added end" + songs)
//Loop over the array and remove any words or characters that obviously don't belong
	//convert to a string
	var songString = songs.join();
	console.log(songString);
	//interate over entire string to remove each character


	// for (var i = songString.length; i > 0;  i--) {
		// if (songString[i] === ">" || songString[i] === "*" || songString[i] === "@" || songString[i] === "(") {
		  //>
	  // *
	  // @
	  //(	
	  	console.log("I made it to the loop");
	  	songString = songString.split(">").join("");
	  	songString = songString.split("*").join("");
	  	songString = songString.split("@").join("");
	  	songString = songString.split("(").join("");
	  	songString = songString.split("!").join("");
	  	
	  	console.log("in loop edit" + songString);

	// }
	console.log("editted" + songString);
	//convert back to an array

	var edittedSongs = songString.split(",");
	console.log(edittedSongs);

//add each string to the DOM in index.html in main content area

document.querySelector(".addingSongs").innerHTML = edittedSongs;

//Create new var
var songName;
var album;
var artist;

//a loop to fill in said array object

var breakDownString = function (i) {

if (i < edittedSongs.length) {
	//cycle through each part of the stringsongList[i] = new songNumber;
		//song title
			//everything before the word "by"
			songName = edittedSongs[i].split(" by")[0];
			console.log(songName);
		//album
			//everything after the phrase "the album "
			album  = edittedSongs[i].split("the album ")[1];
			console.log(album);
		// for (var j = 0; j < edittedSongs[i].length; j++) {
		// 	if (edittedSongs[i][j] === )
		// }
		// var albumName = edittedSongs[i].
		//artist
			//between "by " and " the album "
			artist = edittedSongs[i].split(" by ")[1].split(" on the album")[0];
			console.log(artist);
	}			
}


//post to page
breakDownString(0);

