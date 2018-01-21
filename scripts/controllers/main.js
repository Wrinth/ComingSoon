'use strict';


/**
 * @ngdoc function
 * @name hw2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hw2App
 */
angular.module('ComingSoonApp')
  .controller('MainCtrl', ['$cookies', '$window', '$firebaseObject', '$firebaseArray', '$scope', function ($cookies,$window, $firebaseObject, $firebaseArray, $scope) {

      let controller = this;
      this.expireDate = new Date();
      this.expireDate.setDate(this.expireDate.getDate() + 365);

      let ref = firebase.database().ref();
      // download the data into a local object
      let syncObject = $firebaseObject(ref);

      syncObject.$bindTo($scope, "data").then(function() {
          //console.log($scope.data.data.request);
          //console.log($scope.data.data.customers);
          controller.requests = $scope.data.data.request;
          //controller.requests = controller.requests.reverse();
          controller.customers = $scope.data.data.customers;
      });

      let unwatch = syncObject.$watch(function() {
          syncObject.$loaded()
              .then(function(data) {
                  controller.requests = data.data.request;
                  //controller.requests = controller.requests.reverse();
                  controller.customers = data.data.customers;
              })
      });

      this.getUserInforById = (id) => {
          if(id == 1) {
              return {name: "John", address: "123 main st, CA"}
          } else {
              return {name: "Yoho", address: "456 Testing St"}
          }
      };

      this.updateFireBaseData = function() {
          ref.set({
              request: controller.requests,
          });  // this would update the database and $scope.data
      } ;

      $scope.acceptRequest = function() {
          //console.log("hi");
          /*
          var xhttp = new XMLHttpRequest();
          xhttp.open("POST", "https://rest.nexmo.com/sms/json", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send("from=Nexmo&text=A text message sent using the Nexmo SMS API&to=6174801331&api_key=5532c049&api_secret=4f5cc627acaadb3e");
          */
      };
  }]);