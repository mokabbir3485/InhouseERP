app.controller("Mushak_6_6_ReportController", function ($scope, $cookieStore, $http, $filter) {

    //$scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.SupplierVds = $cookieStore.get("Mushak6_6");

    //var res1 = $scope.SupplierVds.ChallanDate.substring(0, 5);
    //if (res1 == "/Date") {
    //    var parsedDate1 = new Date(parseInt($scope.SupplierVds.ChallanDate.substr(6)));
    //    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
    //    $scope.SupplierVds.ChallanDate = date1;
    //}
   
    Clear();

    function Clear() {
        $scope.Name = "Mushak_6.6";
        Mushak6_6_GetAllData();
        $scope.SupplierList = [];
    }

    function Mushak6_6_GetAllData() {

        $http({
            url: '/VAT/xRpt_vat_Mushak_6_6_GetByIssueId?SupplierId=' + $scope.SupplierVds.SupplierId + '&IssueId=' + $scope.SupplierVds.IssueId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierList = data;
            
            angular.forEach(data,function (aData) {
                var res1 = aData.TrChallanDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.TrChallanDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.TrChallanDate = date1;
                }


                var res2 = aData.IssueDate.substring(0, 5);
                if (res2 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.IssueDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.IssueDate = date1;
                }
            })
           
        });
    }

});