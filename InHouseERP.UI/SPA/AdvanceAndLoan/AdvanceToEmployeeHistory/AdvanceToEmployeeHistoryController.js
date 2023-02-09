app.controller("AdvanceToEmployeeHistoryController", function ($rootScope, $scope, $cookieStore, $window, $cookies, $http, $filter) {

    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Advance To Employee History').ScreenId;

        $scope.ddlEmployee = null;
        $scope.FromDate = null;
        $scope.ToDate = null;


        $scope.AdvanceToEmployeeList = [];
        $scope.EmployeeList = [];
        GetEmployee();
    }

    function GetEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
        })
    }
    $scope.onLoadBtn = function () {
        var whereCondition = '1=1';

        //if ($scope.FromDate != null && $scope.ToDate != null) {
        //    whereCondition = "([PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and AE.EmployeeId =" + $scope.ddlEmployee.EmployeeId + "";
        //} else if ($scope.FromDate != null) {
        //    whereCondition = "([PaymentDate]>='" + $scope.FromDate + "') and AE.EmployeeId =" + $scope.ddlEmployee.EmployeeId + "";
        //} else if ($scope.ToDate != null) {
        //    whereCondition = "([PaymentDate]<='" + $scope.ToDate + "') and AE.EmployeeId =" + $scope.ddlEmployee.EmployeeId + "";
        //} else if ($scope.ddlEmployee != null) {
        //    whereCondition = "AE.EmployeeId =" + $scope.ddlEmployee.EmployeeId + "";
        //}


        if ($scope.ddlEmployee != null  && $scope.FromDate != null && $scope.ToDate != null) {
            whereCondition = "([PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and AE.[EmployeeId] = " + $scope.ddlEmployee.EmployeeId;

        }
        else if ($scope.ddlEmployee != null) {
            whereCondition = "AE.[EmployeeId] = " + $scope.ddlEmployee.EmployeeId;

        }
        else if ($scope.FromDate != null && $scope.ToDate != null) {
            whereCondition = "[PaymentDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }
        

        $http({
            url: '/AdvanceToEmployee/GetDynamicAdvanceToEmployee?whereCondition=' + whereCondition + '&orderByExpression=PaymentDate',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AdvanceToEmployeeList = data;

            $scope.TotalPaidAmount = 0;

            angular.forEach($scope.AdvanceToEmployeeList, function (aEvent) {
                var res1 = aEvent.PaymentDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aEvent.PaymentDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aEvent.PaymentDate = date1;
                }

                $scope.TotalPaidAmount += aEvent.PaidAmount;
            })
          
        });
    }

    $scope.ClearForm = function () {
        $scope.ddlEmployee = null;
        $scope.FromDate = null;
        $scope.ToDate = null;
        $('#ddlEmployee').select2('destroy');
        $("#ddlEmployee").val('').select2({
            placeholder: "Select Employee",
            //theme: "classic",
            dropdownAutoWidth: false
        });
    }

    $("#txtFromDateForSD").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChangeForSD = function () {
        $("#txtFromDateForSD").val('');
        $("#txtFromDateForSD").focus();
        $("#txtFromDateForSD").trigger("click");
    }


    $("#txtToDateForSD").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true,
    });

    $scope.ToDateChangeForSD = function () {
        $("#txtToDateForSD").val('');
        $("#txtToDateForSD").focus();
        $("#txtToDateForSD").trigger("click");

    }

})