(function(){
    angular.module('DigitalAR', [
        'ionic',
        'LocalStorageModule'
    ]).config(arRouteConfig);

    arRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    function arRouteConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider)
    {
        $stateProvider
                .state('homeScreen', {
                    url: '/home',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

        // Do not cache any screen views
        $ionicConfigProvider.views.maxCache(0);
    }
})();