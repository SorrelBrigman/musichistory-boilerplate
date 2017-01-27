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
  .controller('ListCtr', function($scope, songFactory){
    songFactory
    .getSongs()
    .then((response)=>{
      $scope.songs = response
    })//end of then

    $scope.delete = (song) => {

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
      writingsongFactory.writeSongs($scope.songName, $scope.artistName, $scope.albumName)
      .then((e)=>{
       console.log("wrote song", e)
    })
    }
  })//end of controller
  .factory('songFactory', ($http)=>{
    return {
      getSongs : ()=> {
        return $http
        .get("https://musichistoryskb.firebaseio.com/songs.json")
        .then((response)=>{
          return response.data
          console.log(response.data)
        }) //end of then
      } //end of function

    }//end of object
  })//end of factory
  .factory('writingsongFactory', ($http)=>{
    return{
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
            //create an array of song objects
            let currentSong = {
              album : val[key].album,
              artist : val[key].artist,
              title : val[key].title,
            } //end of currentSong Object
            songs.push(currentSong)
          }
          console.log("songs", val)
          return songs
        })//end of then
      }//end of songArray()
    }//end of factory object
  })
