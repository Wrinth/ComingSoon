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
          console.log($scope.data.data.request);
          controller.requests = $scope.data.data.request;
      });

      let unwatch = syncObject.$watch(function() {
          syncObject.$loaded()
              .then(function(data) {
                  //console.log(data.data.request);
                  controller.requests = data.data.request;
              })
      });

      this.checkIfWin = (playerChoice) => {

          //check rows
          for(let i = 0; i <= 6; i = i + 3) {
              if(B[i] == playerChoice &&
                  B[i] === B[i + 1] &&
                  B[i + 1] == B[i + 2]) {
                  return true;
              }
          }

          //check columns
          for(let i = 0; i <= 2 ; i++) {
              if(B[i] == playerChoice &&
                  B[i] === B[i + 3] &&
                  B[i + 3] === B[i + 6]) {
                  return true;
              }
          }

          //check diagonals
          for(let i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
              if(B[i] == playerChoice &&
                  B[i] == B[i + j] &&
                  B[i + j] === B[i + 2*j]) {
                  //this.result = B[i] + "-won"; //update the state result
                  return true;
              }
          }

          return false;
      };

      this.updateFireBaseData = function() {
          ref.set({
              request: controller.requests,
          });  // this would update the database and $scope.data
      } ;

      this.updateBox = (boxNum, user) => {
          switch(boxNum) {
              case 1: if (controller.boxes1Status == "" && !controller.gamePause) {
                  controller.boxes1Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 2: if (controller.boxes2Status == "" && !controller.gamePause) {
                  controller.boxes2Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 3: if (controller.boxes3Status == "" && !controller.gamePause) {
                  controller.boxes3Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 4: if (controller.boxes4Status == "" && !controller.gamePause) {
                  controller.boxes4Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 5: if (controller.boxes5Status == "" && !controller.gamePause) {
                  controller.boxes5Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 6: if (controller.boxes6Status == "" && !controller.gamePause) {
                  controller.boxes6Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 7: if (controller.boxes7Status == "" && !controller.gamePause) {
                  controller.boxes7Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 8: if (controller.boxes8Status == "" && !controller.gamePause) {
                  controller.boxes8Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
              case 9: if (controller.boxes9Status == "" && !controller.gamePause) {
                  controller.boxes9Status = user;
                  controller.currentPlayer = !controller.currentPlayer;
                  controller.selectedNumber++;
              } break;
          }
          if (controller.selectedNumber == 9 || controller.checkIfWin('O') || controller.checkIfWin('X')) {
              if (controller.checkIfWin('O')) {
                  controller.userOScore++;
                  controller.message = "Congraduration, player O won!";
              } else if (controller.checkIfWin('X')) {
                  controller.userXScore++;
                  controller.message = "Congraduration, player X won!";
              } else {
                  controller.message = "Game Finish! Tie";
              }
              controller.gamePause = true;
          }
          controller.updateFireBaseData();
      };
  }]);