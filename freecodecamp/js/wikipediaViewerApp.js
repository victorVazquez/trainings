angular.module('wikipediaViewerApp', [])
.factory('WikipediaService', ['$http', function ($http) {
  return {
    getArticle: function(title){
      var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
      var cb = '&callback=JSON_CALLBACK';
      var url = api + title + cb;
      return $http.jsonp(url)
      .then(function (response) {
        return response;
      })
      ;
    }
  }
}])

.controller('wikipediaViewerCtrl', ['$scope', '$http', 'WikipediaService', function ($scope, $http, WikipediaService) {
  $scope.resultsShow = false;
  $scope.searchArticle = function(){
    $scope.articles = [];
    var title = $scope.searchText;
    var article = 'https://en.wikipedia.org/?curid=';

    WikipediaService.getArticle(title)
    .then(function (dataWikipedia) {
      var articles = dataWikipedia.data.query.pages;
      angular.forEach(articles, function(q,i){
        $scope.articles.push({
          title: q.title,
          extract: q.extract,
          page: article + q.pageid
        });
      });
      $scope.resultsShow = true;
      // console.log($scope.articles);
    })
    ;
  }
}])

;
