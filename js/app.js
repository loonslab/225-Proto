// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var app = angular.module('myApp', ['ngRoute', 'Services']);

//services
app.service('petitionService', function () {
    this.petitions = [];
});

// configure our routess
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'mainController'
        })

        // route for the petition page
        .when('/petition/:petitionId', {
            templateUrl: 'partials/petition.html',
            controller: 'singlePetitionController'
        })

        // route for the petition creation page
        .when('/create-petition', {
            templateUrl: 'partials/create-petition.html',
            controller: 'petitionController'
        })

        // route for the petition list page
        .when('/petition-list', {
            templateUrl: 'partials/petition-list.html',
            controller: 'petitionController'
        })
        //route for ministries page
        .when('/ministries', {
            templateUrl: 'partials/ministries.html',
            controller: 'ministriesController'
        })
        
        .when('/ministers', {
            templateUrl: 'partials/ministers.html',
            controller: 'petitionController'
        })

});

// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope, dataServices, petitionService, $routeParams, $window) {
    // create a message to display in our view
    $scope.message = 'Home page!';

    $scope.petitions = ["test"];

    var promise = dataServices.query('petitions');
    promise.then(function (data) {
        $scope.petitions = data;
        petitionService.petitions = data;
    }, function (data) {});

});

app.controller('petitionController', function ($scope, dataServices, petitionService, $routeParams, $window) {
    $scope.petitions = petitionService.petitions;

    if ($scope.petitions.length == 0) {
        var promise = dataServices.query('petitions');
        promise.then(function (data) {
            $scope.petitions = data;
            petitionService.petitions = data;
        }, function (data) {});
    }

    $scope.addPetition = function () {
        var petition = {
            id: petitionService.petitions.length,
            title: $scope.title,
            party: $scope.party,
            desc: $scope.story,
            image: "res/img/petition-thumb/3.jpg"
        };
        petitionService.petitions.push(petition);
        $window.location = '#petition-list';
    };
});

app.controller('singlePetitionController', function ($scope, dataServices, petitionService, $routeParams) {
    $scope.currentPetition = petitionService.petitions[$routeParams.petitionId];

    $scope.vote = {};

    $scope.addVote = function () {
        //console.log($scope.vote);
        $scope.currentPetition.comments.push($scope.vote);
        $scope.currentPetition.votes = Number($scope.currentPetition.votes) + 1;

        $scope.vote = {};
    };



});
