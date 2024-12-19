var app = angular.module('viewDataApp',[]);
app.controller('viewDataCtrl', function($scope, $http) {

    $scope.get_records = function() {
        $http({
            //send request to the server
            method:'get',
            url: indexURL + "/get-products"

        }).then(function(response){
            //if successfully connected to the server
            console.log(response.data.products);
            if(response.data.msg === "SUCCESS"){
                $scope.products = response.data.products;
                $scope.types= getTypes(response.data.products);
                $scope.selectedType= $scope.types[0];
            
            }else {
                console.log(response.data.msg);

            }
        }), function(error) {
            console.log(error);
        }
    }
    $scope.get_records();

    $scope.redrawTable= function() {
        var type= $scope.selectedType.value;


        $http({
            method: 'get',
            url: idnexURL + "/get-productsByType",
            params:{type:type}

        }).then(function(response){
            if (response.data.msg==="SUCCESS"){
                $scope.products = response.data.products;
            }else{
                console.log(response.data.msg);
            }

        }), function (error){
            console.log(error);
        }    
    }
    $scope.editProduct = function(productNumber) {
        $scope.ProductDescription = $scope.products[productNumber].$scope.editProduct = function(productNumber) {
        $scope.ProductName = $scope.products[productNumber].name;
        $scope.Color = $scope.products[productNumber].color; 
        $scope.ManufacturerName = $scope.products[productNumber].manufacturer; 
        $scope.Type = $scope.products[productNumber].type;
        $scope.Location = $scope.products[productNumber].Location;
        $scope.Quantity = $scope.quantity[productNumber].quantity;
        $scope.productID= $scope.products[productNumber]['_id'];

    
        $scope.hideTable= true;
        $scope.hideForm= false;
    }
    $scope.cancelUpdate = function() {
        $scope.hideTable= false;
        $scope.hideForm= true; ;
        
        }
        $scope.updateProduct = function() {
            if($scope.ProductName === "" || $scope.Color === "" || $scope.ManufacturerName === "" || $scope.Type === ""|| $scope.Location === ""|| $scope.Quantity=== "")
            {
                $scope.addResults= "Name, color and type are required".
                return;
            }  
            $http({
                method:'put',
                url: indexURL + "/update-products",
                data:{
                    ProductDescription: $scope.ProductDescription,
                    Color: $scope.Color,
                    ManufacturerName: $scope.ManufacturerName,
                    ProductType: $scope.type.toLowerCase(),
                    Location: $scope.Location,
                    Quantity: $scope.Quantity
                }
    
        }).then(function(response){
            //if successfully connected to the server
            if(response.data.msg === "SUCCESS"){
                $scope.cancelUpdate();
                $scope.redrawTable();

                $scope.ProductDescription
                $scope.Color="";
                $scope.ManufacturerName="";
                $scope.ProductType="";
                $scope.Location="";
                $scope.Quantity="";
            
            }else{
                $scope.addResults = response.data.msg;
            }

            }),function(error) {
                console.log(error);
            }
        }

    $scope.deleteProduct = function(productName) {
        console.log(spellName)

        $http({
            method:'delete',
            url: indexURL + "/delete-product",
            params:{name: productName}

        }).then(function(response){
            if(response.data.msg == "SUCCESS"){
                $scope.redrawTable();

            }else{
                console.log(response.data.msg);
            }
        }),function (error){
            console.log(error);

        }
    }
}
});

function getTypes(productTableData) {
    var typeExists;
    typesArray = [{value:"", display:"ALL"}];

    for(var i = 0; i< productTableData.length; i++){
        if(productTableData[i].type){}
        typeExists = typesArray.find(function (element){
            return element.value ===productTableData[i].type;

        });
        if (!typeExists) {
            typesArray.push({
                value: productTableData[i].type,
                display: productTableData[i].type
            });
        }
    }    
        

    return typesArray;

}
