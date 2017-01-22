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
  }) //end of config
  .controller('ListCtr', function($scope, songFactory){
    songFactory
    .getSongs()
    .then((response)=>{
      $scope.songs = response
    })//end of then

  })//end of controller
  .controller('AddMusicCtr', function(writingsongFactory) {
    writingsongFactory
    .writeSongs()
    .then(()=>{

    })

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
