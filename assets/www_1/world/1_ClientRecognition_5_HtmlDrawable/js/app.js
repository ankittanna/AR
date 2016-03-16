(function(){
    // DigitalAR
    angular.module('DigitalAR', [
                'ionic',
                'LocalStorageModule'
                ]).config(coreRouteConfig)
                .controller('SplashCtrl', function(){
                    var vm = this;
                    vm.name = 'Ankit';
                });

    coreRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    function coreRouteConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider)
    {
        // Configure your basic splash screen for the app
                $stateProvider
                .state('splashScreen', {
                    url: '/splash',
                    templateUrl: 'app/splash/splash.html',
                    controller: 'SplashCtrl',
                    controllerAs: 'splash'
                });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/splash');

                // Do not cache any screen views
                $ionicConfigProvider.views.maxCache(0);
    }

})();