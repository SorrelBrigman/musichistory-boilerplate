const app =
 angular
.module('musicHistoryApp', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
      controller : "ListCtr",
      templateUrl: "partials/listMusic.html"
    })
    .when('/addMusic', {
      controller : "AddMusicCtr",
      templateUrl : "partials/addMusic.html"
    })
    .when('/details', {
      controller : "DetailCtrl",
      templateUrl : "partials/song-details.html"
    })
    .otherwise({
      redirectTo: '/'
    })
  }) //end of config
  .controller('ListCtr', function($scope, songArrayFactory, deleteSongFactory){
    songArrayFactory
    .songArray()
    .then((response)=>{
      $scope.songs = response
    })//end of then

    $scope.logme = ()=>{
      console.log($scope.artistFilter)
    }

    $scope.delete = (song, index) => {
      console.log("song to delete", song)
      deleteSongFactory.deleteSong(song)
      .then((e)=>{
        //removes the deleted song from the array of ng-repeat items
        $scope.songs.splice(index, 1)
      })
    }

  })//end of controller
  .controller('DetailCtrl', function($scope, songArrayFactory){
    songArrayFactory
    .songArray()
    .then((response)=>{
      $scope.songs = response
    })//end of then

  })//end of controller
  .controller('AddMusicCtr', function(writingsongFactory, $scope) {
    $scope.writeSong = () => {
      //takes the user supplied info from the text inputs and
      //send to the writing song factory
      writingsongFactory.writeSongs($scope.songName, $scope.artistName, $scope.albumName)
      .then(()=>{
       //reset add music form to empty
       $scope.songName = ""
       $scope.artistName = ""
       $scope.albumName = ""
      })//end of then
    }//end of writeSong()
  })//end of controller
  .factory('songFactory', ($http)=>{
    return {
      getSongs : ()=> {
        //gets songs from the firebase file
        return $http
        .get("https://musichistoryskb.firebaseio.com/songs.json")
        .then((response)=>{
          //returns the data from firebase, slightly parsed
          return response.data
        }) //end of then
      } //end of function

    }//end of object
  })//end of factory
  .factory('writingsongFactory', ($http)=>{
    return {
      writeSongs : (title, artist, album)=>{
        let songToAdd = {};
        songToAdd.title = title;
        songToAdd.artist = artist;
        songToAdd.album = album;

        return $http
        .post("https://musichistoryskb.firebaseio.com/songs.json", songToAdd)
        .then(()=>{
          return songToAdd
        })
      }
    }
  })
  .factory("songArrayFactory", (songFactory)=>{
    return{
      songArray: () => {
        return songFactory.getSongs()
        .then((val)=>{
          //create new array of songs
          let songs = []
          for(var key in val){
            //create an array of song objects from the firebase data
            let currentSong = {
              album : val[key].album,
              artist : val[key].artist,
              title : val[key].title,
              key : key
            } //end of currentSong Object
            songs.push(currentSong)
          }
          //returns the array of songs with the key as an accessible value
          return songs
        })//end of then
      }//end of songArray()
    }//end of factory object
  })
  .factory("deleteSongFactory", ($http)=>{
    return {
      deleteSong : (song) => {
        let thisSong = song.key
        console.log("songkey", thisSong)
        return $http
        .delete(`https://musichistoryskb.firebaseio.com/songs/${thisSong}/.json`)
        .then((e)=>{
          return  e
        })
      }
    }
  })
