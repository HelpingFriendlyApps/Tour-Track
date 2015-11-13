angular.module('Tour-Track')
.controller('TabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'Shows',
            url: 'shows.tpl.html'
        }, {
            title: 'Songs',
            url: 'two.tpl.html'
        }, {
            title: 'Years',
            url: 'three.tpl.html'
    }];

    $scope.currentTab = 'shows.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);