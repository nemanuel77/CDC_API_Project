var runApp = angular.module('cdcproj',[]);


runApp.controller('getAllFields', function($scope, $http){

   $http({
    method: 'GET',
    url: "https://data.cdc.gov/resource/9mfq-cb36.json",
    data: {
        "$limit" : 5000,
        "$$app_token" : "L8u7X4noy7vnpQ4d5SD0pZkPG"
    }
  
   }).then(function onSuccess(response){
    //alert("SUCCESS : " + response.length);
    
    $scope.federalData = response.data;

    $scope.sortDeaths = function(x){
        return -(parseInt(x.tot_death));
    }

    //This function incorrectly tallied the sum of the 
    //tot_death column. With duplicate entries by the same 
    //states, the calculated total deaths was inaccurate. 
    //total deaths reported for US as of 02/16/2020 are
    //1,880,000. 

    // $scope.getTotal = function(){

    //     var total = 0;
    //     for (var i = 0; i < response.data.length; i++){
    //         var deaths = response.data[i];
    //         total = ((total-0) + (deaths.tot_death-0));
    //     }
    //     return total;
    // }


    //Function to return unique states to the dropdown list

    $scope.getStats = function (){
        var states = [];
        var uniqueStates = [];
        for (var i = 0; i < response.data.length; i ++){
            var c = response.data[i];
            states.push(c.state);
        }

        $.each(states, function(j, dupe){
            if ($.inArray(dupe,uniqueStates) === -1){
                uniqueStates.push(dupe);
            }

        })

        return uniqueStates;
    }


   }, function onFail(response){
       alert("FAILURE: " +response.length);
   });



});


runApp.controller('fillDDL', function($scope, $http){

    $http({
        method: 'GET',
        url: "https://data.cdc.gov/resource/9mfq-cb36.json",
        data: {
            "$limit" : 5000,
            "$$app_token" : "L8u7X4noy7vnpQ4d5SD0pZkPG"
        }
      
       }).then(function onSuccess(response){
        //alert("SUCCESS : " + response.length);
        
        $scope.stateData = response.data;

       });

});

    



