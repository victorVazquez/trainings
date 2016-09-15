angular.module('twitchTvApp', [])
.factory('TwitchTvService', ['$http', function ($http) {
  var api = 'https://api.twitch.tv/kraken/';
  var cb = '&callback=JSON_CALLBACK';
  var returnResponse = function(response){
    return response;
  };

  return {
    getChannels: function(){
      var offset = Math.floor( Math.random() * (250 - 1) + 1 );
      var query = 'search/channels?limit=25&offset=' + offset + '&q=all';
      // var query = 'search/channels?limit=5&q=all';
      var url = api + query + cb;

      // console.log(url);

      return $http.jsonp(url)
      .then(returnResponse)
      ;

    },


    getStream: function(channel){
      var query = 'streams/' + channel + '?' + cb;
      var url = api + query;
      // console.log(url);
      return $http.jsonp(url)
      .then(returnResponse)
      ;
    }
  }
}])
.value('channelNames', [])
.filter('streamsFilter', function () {
  // return false;

})
.controller('twitchTvCtrl', ['$scope', '$http', 'TwitchTvService', 'channelNames', function ($scope, $http, TwitchTvService, channelNames) {
  // $scope.statusChannels = [];
  $scope.channels = [];
  // $scope.show = true;
  // $scope.showStream = 'all';

  $scope.showStreams = function(value){

    angular.forEach($scope.channels, function (ch, i) {
      var elements = $('#results .' + value);
      $('#results .row').removeClass('show hide');
      $('#filter a').removeClass('selected');
      switch (value) {
        case 'all':
          // Mostrar todos los elementos
          $('#results .row').addClass('show');
          $('#results .row').removeClass('hide');
          $('#filter .all').addClass('selected')
          break;

        case 'online':
          // Mostrar solo elementos online
          $('#results .offline').addClass('hide');
          $('#results .online').addClass('show');
          $('#filter .online').addClass('selected')
          break;

        case 'offline':
          // Mostrar solo elementos online
          $('#results .offline').addClass('show');
          $('#results .online').addClass('hide');
          $('#filter .offline').addClass('selected')
          break;
        default:

      }

      return;


      if (ch.status === value) {
        elements.addClass('show').removeClass('hide');
      }else{
        elements.addClass('hide').removeClass('show');
      }
    });
  };

  TwitchTvService.getChannels()
  .then(function(dataChannels){

    var channels = dataChannels.data.channels;
    angular.forEach(channels, function(channel, i){
      channelNames.push(channel.name);
      $scope.channels.push({
        logo: channel.logo,
        name: channel.name,
        url: channel.url,
        show: true
        // status: $scope.statusChannels[i]
      });
      // console.log($scope.statusChannels);
    });


    angular.forEach(channelNames, function(channel, i){
      TwitchTvService.getStream(channel)
      .then(function(dataStream){
        if(dataStream.data.stream === null){
            $scope.channels[i].status = 'offline';
        }else{
          $scope.channels[i].status = 'online';
        }
      })
      ;
    });

    // console.log($scope.channels);

  });

}]);
