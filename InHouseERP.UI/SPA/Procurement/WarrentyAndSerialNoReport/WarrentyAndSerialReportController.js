app.controller("WarrentyAndSerialReportController", function ($scope, $cookieStore, $http, $filter) {
   
    $scope.WarrentyAndSerialNoReport = $cookieStore.get("WarrentyAndSerialNoReportObj");
    Clear();

    function Clear() {
        $scope.name = "Warrenty And Serial Report";
        $scope.WarrentyAndSerialList = [];
       //GetAllWarrenty();

        //$scope.WarrentyAndSerialList.push($scope.WarrentyAndSerialNoReport);

        var SerialNoArr = $scope.WarrentyAndSerialNoReport.SerialNo.split(',');
        var WarrentyInDaysArr = $scope.WarrentyAndSerialNoReport.WarrentyInDays_Str.split(',');
        var PBDetailSerialIdsArr = $scope.WarrentyAndSerialNoReport.PBDetailSerialIds.split(',');
        $scope.WarrentyAndSerialNoDetailAdAttributeLst = [];

        SerialNoArr.forEach(function (v, i) {
            var obj = {};
            obj.SerialNo = v;
            obj.WarrentyInDays = parseInt(WarrentyInDaysArr[i]);
            obj.PBDetailSerialId = parseInt(PBDetailSerialIdsArr[i]);
            obj.ItemName = $scope.WarrentyAndSerialNoReport.ItemName;
            obj.Description = $scope.WarrentyAndSerialNoReport.Description;
            obj.Description = $scope.WarrentyAndSerialNoReport.Description;
            obj.Qty = $scope.WarrentyAndSerialNoReport.Qty;
            $scope.WarrentyAndSerialList.push(obj);
        });
    }


    function GetAllWarrenty() {


        $http({
            url: '/WarrentyAndSerialNo/GetAllWarrentryReport?PBDetailSerialId=' + $scope.WarrentyAndSerialNoReport.PBDetailSerialId + '&ItemId=' + $scope.WarrentyAndSerialNoReport.ItemId + '&IsLocal=' + $scope.WarrentyAndSerialNoReport.IsLocal,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.WarrentyAndSerialList = data;
            console.log($scope.WarrentyAndSerialList)

        })

    }

});