angular.module('LocalWeatherApp', ['ngSanitize'])
.factory('WeatherService', ['$http', function($http){
  return {
    getLocation: function () {
      return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
    },
    getWeather: function(city, country){
      var query = city + ',' + country;
      return $http.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: query,
          appId: '127c88f0f2fa0de3bed0082a0a502bd5',
          units: 'metric',
          cb: 'JSON_CALLBACK'
        }
      })
      .then(function(response){
        return response;
      })
      ;
    }
  }
}])
.controller('LocalWeatherCtrl', ['$scope', '$rootScope', '$timeout', 'WeatherService', function($scope, $rootScope, $timeout, WeatherService){
    $scope.weatherDescription = "Fetching Weather . . . ";
    $scope.bg;
    $rootScope.icon;
    WeatherService.getLocation()
    .then(function(dataLocation){
      // console.log(dataLocation);
      $scope.city = dataLocation.data.city;
      $scope.country = dataLocation.data.country;
      WeatherService.getWeather($scope.city, $scope.country)
      .then(function(dataWeather){
        $scope.unitA = 'C';
        $scope.unitB = 'F';
        $scope.celsius = Math.round(dataWeather.data.main.temp);
        $scope.fahrenheit = Math.round(dataWeather.data.main.temp * 9 / 5 + 32);
        $scope.temperatureNumber = $scope.celsius;
        $scope.description = dataWeather.data.weather[0].description;
        // $scope.description = 'row';
        // console.log($scope.attrClass);
        setClime($scope.description);
        setDateAndTime();
        // console.log(dataWeather.data.weather[0].main);
      });
    });
    var setClime = function(description){
      switch (description) {
        case 'clear sky':
          $scope.bg = 'clear-sky';
          $rootScope.icon = 'wi-day-sunny';
          break;

        case 'few clouds':
          $scope.bg = 'few-clouds';
          $rootScope.icon = 'wi-day-cloudy';
          break;

        case 'scattered clouds':
          $scope.bg = 'scattered-clouds';
          $rootScope.icon = 'wi-day-cloudy-gusts';
          break;

        case 'broken clouds':
          $scope.bg = 'broken-clouds';
          $rootScope.icon = 'wi-smoke';
          break;

        case 'shower rain':
          $scope.bg = 'shower-rain';
          $rootScope.icon = 'wi-showers';
          break;

        case 'rain':
          $scope.bg = 'rain';
          $rootScope.icon = 'wi-rain';
          break;

        case 'thunderstorm':
          $scope.bg = 'thunderstorm';
          $rootScope.icon = 'wi-thunderstorm';
          break;

        case 'snow':
          $scope.bg = 'snow';
          $rootScope.icon = 'wi-snow';
          break;

        case 'mist':
          $scope.bg = 'mist';
          $rootScope.icon = 'wi-fog';
          break;

        default:
          $scope.bg = 'default';
          $rootScope.icon = 'wi-na';
      }
    };

    var setDateAndTime = function() {
      var dayNames = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur'];
      var months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];
      var date = new Date();
      $scope.dayName = dayNames[date.getDay()];
      $scope.dayNumber = date.getDate();
      $scope.month = months[date.getMonth()];
      $scope.year = date.getFullYear();

      $scope.hours = date.getHours();
      $scope.minutes = date.getMinutes();
      $scope.seconds = date.getSeconds();

      if ($scope.hours < 10) {
        $scope.hours = '0' + $scope.hours;
      }
      if ($scope.minutes < 10) {
        $scope.minutes = '0' + $scope.minutes;
      }
      if ($scope.seconds < 10) {
        $scope.seconds = '0' + $scope.seconds;
      }
      $timeout(setDateAndTime, 1000); // reset the timer
    };

    $timeout(setDateAndTime, 1000);

    $scope.convertSystem = function () {
      if ($scope.unitB == 'F') {
        $scope.unitA = 'F';
        $scope.unitB = 'C';
        $scope.temperatureNumber = $scope.fahrenheit;
      }else{
        $scope.unitA = 'C';
        $scope.unitB = 'F';
        $scope.temperatureNumber = $scope.celsius;
      }
    };


}])
.directive('weatherIcon', function(){
  return{
    restrict: 'E',
    replace: true,
    template: '<i class="wi {{$root.icon}}"></i>'
  }
})
;
