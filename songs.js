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
songs.push("Young as the Morning Old as the Sea by Passenger on the album Yound as the Morning Old as the Sea");
console.log("added end" + songs)
//Loop over the array and remove any words or characters that obviously don't belong
	//convert to a string
	var songString = songs.join();
	console.log(songString);
	//interate over entire string to remove each character


	for (var i = songString.length; i > 0;  i--) {
		// if (songString[i] === ">" || songString[i] === "*" || songString[i] === "@" || songString[i] === "(") {
		  //>
	  // *
	  // @
	  //(	
	  	console.log("I made it to the loop");
	  	songString = songString.split(">").join("");
	  	songString = songString.split("*").join("");
	  	songString = songString.split("@").join("");
	  	songString = songString.split(")").join("");
	  	console.log("in loop edit" + songString);

	}
	console.log("editted" + songString);
	//convert back to an array

	var edittedSongs = songString.split(",");
	console.log(edittedSongs);

//add each string to the DOM in index.html in main content area