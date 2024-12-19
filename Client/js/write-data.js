var app= angular.module("addProductsApp", [])

    app.controller("addProductsCtrl", function($scope, $http){
        $scope.submitProduct = function(){
            console.log("dog");
        if($scope.ProductDescription == "" || $scope.Color == "" || $scope.ManufacturerName == "" || $scope.Type == "" || $scope.location == "" ||$scope.quantity == "" ){
        return;
        }
        $http({
            method: "post",
            url: indexURL + "/write_record",
            data:{
                ProductDescription: $scope.ProductDescription,
                Color: $scope.color,
                ManufacturerName: $scope.ManufacturerName,
                ProductType: $scope.type,
                Location: $scope.Location,
                Quantity: $scope.quantity

            }
        }).then(function(response){
            if(response.data.msg == "SUCCESS"){
                $scope.addResults = "Item is added!";
                $scope.productName = "";
                $scope.color ="";
                $scope.ManufacturerName="";
                $scope.type = "";
                $scope.Location= "";
                $scope.Quantity= "";
            }else{
                $scope.addResults = response.data.msg;
   
            }

        }), function(err){
            console.log(err);
        }
    }
    $scope.addResults = "";
})