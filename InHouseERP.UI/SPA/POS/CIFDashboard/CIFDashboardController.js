app.controller("CIFDashboardController", function ($rootScope,$scope, $cookieStore, $window, $cookies, $http, $filter) {
 
    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'CIF Dashboard').ScreenId;

        $scope.DashboardTypeList = [{ 'DashboardTypeId': 1, 'DashboardTypeName': 'Company' }, { 'DashboardTypeId': 2, 'DashboardTypeName': 'Employee' }, { 'DashboardTypeId': 3, 'DashboardTypeName': 'Item' }]
        $scope.CompanyEmployeeList = [];
        
        $scope.ddlDashboardType = null;
        $scope.CompanyShowDiv = false;
        $scope.EmployeeShowDiv = false;;

        $scope.CIFDashboardList = [];
        $scope.CompanyEmployeeItemList = [];
        GetCompanyEmployeeItem();
    }
    
    function GetCompanyEmployeeItem() {
        $http({
            url: '/SalesOrder/GetCompanyEmployeeItem',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyEmployeeItemList = data;
        })
    }
    $scope.onLoadBtn = function () {
        //var fromDate = $("#txtFromDateForSD").val();
        //$scope.CIFFromDate = fromDate.split("/").reverse().join("-");
        //var toDate = $("#txtToDateForSD").val();
        //$scope.CIFToDate = toDate.split("/").reverse().join("-");

        $scope.CIFFromDate = $("#txtFromDateForSD").val();
        $scope.CIFToDate = $("#txtToDateForSD").val();

        var whereCondition = '';

        if ($scope.ddlDashboardType.DashboardTypeId == 1) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "([SalesOrderDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and SO.CompanyId =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "([SalesOrderDate]>='" + $scope.CIFFromDate + "') and SO.CompanyId =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "([SalesOrderDate]<='" + $scope.CIFToDate + "') and SO.CompanyId =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.ddlCompanyEmployee.Id != undefined) {
                whereCondition = "SO.CompanyId =" + $scope.ddlCompanyEmployee.Id + "";
            }
        } else if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "([SalesOrderDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and SO.PreparedById =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "([SalesOrderDate]>='" + $scope.CIFFromDate + "') and SO.PreparedById =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "([SalesOrderDate]<='" + $scope.CIFToDate + "') and SO.PreparedById =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.ddlCompanyEmployee.Id != "") {
                whereCondition = "SO.PreparedById =" + $scope.ddlCompanyEmployee.Id + "";
            }
        } else if ($scope.ddlDashboardType.DashboardTypeId == 3) {
            if ($scope.CIFFromDate != "" && $scope.CIFToDate != "") {
                whereCondition = "([SalesOrderDate] between '" + $scope.CIFFromDate + "' and '" + $scope.CIFToDate + "') and SOD.ItemId =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.CIFFromDate != "") {
                whereCondition = "([SalesOrderDate]>='" + $scope.CIFFromDate + "') and SOD.ItemId =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.CIFToDate != "") {
                whereCondition = "([SalesOrderDate]<='" + $scope.CIFToDate + "') and SOD.ItemId =" + $scope.ddlCompanyEmployee.Id + "";
            } else if ($scope.ddlCompanyEmployee.Id != "") {
                whereCondition = "SOD.ItemId =" + $scope.ddlCompanyEmployee.Id + "";
            }
        }

        $http({
            url: '/SalesOrder/GetCIFDashboard?whereCondition=' + whereCondition + '&orderByExpression=SalesOrderDate',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CIFDashboardList = data;

            
            $scope.$CIFDashboardList = $scope.CIFDashboardList;
            $scope.CIFDashboardList = Array.from(
                $scope.CIFDashboardList.reduce((m, o) => m.set(o.CompanyName, (m.get(o.CompanyName) || []).concat(o)), new Map),
                ([CompanyName, events]) => ({ CompanyName, events })
            );
            console.log('$scope.$CIFDashboardList', $scope.$CIFDashboardList);
            console.log('$scope.CIFDashboardList', $scope.CIFDashboardList);
            angular.forEach($scope.CIFDashboardList, function (aData) {
                aData.DisplaySta = false;
                aData.DisplaySta2 = false;
                aData.RefEmployeeName = aData.events[0].RefEmployeeName;
                aData.ContactPerson = aData.events[0].ContactPerson;


                angular.forEach(aData.events, function (aEvent) {
                    aEvent.DisplaySta = false;
                    aEvent.DisplaySta2 = false;
                    var res1 = aEvent.SalesOrderDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aEvent.SalesOrderDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aEvent.SalesOrderDate = date1;
                    }
                })
            })

            
        });
    }

    $scope.GetCIFDetail = function (SalesOrderId) {
        $scope.SalesOrderDetailList = [];
        $http({
            url: '/SalesOrder/CIFDashboard_GetSalesOrderDetail?SalesOrderId=' + SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesOrderDetailList = data;
            angular.forEach($scope.SalesOrderDetailList, function (aData) {
                aData.DisplaySta2 = false;
                

            });
        });


    }
    $scope.AutoCollaseSalesOrder = function (aSalesOrder) {
        angular.forEach($scope.CIFDashboardList, function (aData) {
            angular.forEach(aData.events, function (aEvent) {
                aEvent.DisplaySta2 = false;
                if (aEvent.SalesOrderId == aSalesOrder.SalesOrderId) {
                    aEvent.DisplaySta2 = true;
                } else {
                    aEvent.DisplaySta2 = false;
                }
            })
        })
    }
    $scope.CIFReportBtn = function (companyId) {
        
        $scope.company = {};
        $scope.company['companyId'] = companyId;
        if ($scope.ddlDashboardType.DashboardTypeId == 2) {
            $scope.company['PreparedById'] = $scope.ddlCompanyEmployee.Id;
        } else {
            $scope.company['PreparedById'] = null;
        }
        $scope.company['CIFFromDate'] = $scope.CIFFromDate;
        $scope.company['CIFToDate'] = $scope.CIFToDate;
        //$cookies.remove("Company");
        //$cookies.putObject("Company", $scope.company);
        sessionStorage.setItem("Company", JSON.stringify($scope.company));
        $window.open("#/CIFReport", "popup", "width=850,height=550,left=280,top=80");
        event.stopPropagation();

    };
    $scope.CompanyInfoModal = function (CompanyId) {
        $scope.CompanyInfo = {};
        var criteria = "C.CompanyId=" + CompanyId;
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {
            $scope.CompanyInfo = companyList[0];
            console.log($scope.CompanyInfo);
        })
        
        $('#CompanyInfoModal').modal('show');
    }
    function uniqueByKey(array, key) {
        return [...new Map(array.map((x) => [x[key], x])).values()];
    }

    //console.log(uniqueByKey(array, 'age'));
    $scope.onDivShowGetById = function (id) {
        $scope.ddlCompanyEmployee = null;
        $scope.$CompanyEmployeeList = [];
        $scope.CompanyEmployeeList = [];
        $('#ddlCompanyEmployee').select2('destroy');
        $('#ddlCompanyEmployee').val('').select2({
            placeholder: "Select Company/Employee/Item",
            theme: "classic",
            dropdownAutoWidth: false
        });
        if ($scope.LoginUser.DepartmentName.match("Sales")) {
            if (id == 1) {
                $scope.$CompanyEmployeeList = uniqueByKey($scope.CompanyEmployeeItemList, 'CompanyId');
                angular.forEach($scope.$CompanyEmployeeList, function (aData) {
                    aData.Id = aData.CompanyId;
                    aData.Name = aData.CompanyName;
                    if (aData.PreparedBySectionId == $scope.LoginUser.SectionId) {
                        $scope.CompanyEmployeeList.push(aData);
                    }
                })
            }
            else if (id == 2) {
                $scope.$CompanyEmployeeList = uniqueByKey($scope.CompanyEmployeeItemList, 'PreparedById');
                angular.forEach($scope.$CompanyEmployeeList, function (aData) {
                    aData.Id = aData.PreparedById;
                    aData.Name = aData.PrepareByName;
                    if (aData.PreparedBySectionId == $scope.LoginUser.SectionId) {
                        $scope.CompanyEmployeeList.push(aData);
                    }
                })
            }
            else if (id == 3) {
                $scope.$CompanyEmployeeList = uniqueByKey($scope.CompanyEmployeeItemList, 'ItemId');
                angular.forEach($scope.$CompanyEmployeeList, function (aData) {
                    aData.Id = aData.ItemId;
                    aData.Name = aData.ItemName;
                    if (aData.PreparedBySectionId == $scope.LoginUser.SectionId) {
                        $scope.CompanyEmployeeList.push(aData);
                    }
                })
            }
        } else {
            if (id == 1) {
                $scope.CompanyEmployeeList = uniqueByKey($scope.CompanyEmployeeItemList, 'CompanyId');
                angular.forEach($scope.CompanyEmployeeList, function (aData) {
                    aData.Id = aData.CompanyId;
                    aData.Name = aData.CompanyName;
                })
            }
            else if (id == 2) {
                $scope.CompanyEmployeeList = uniqueByKey($scope.CompanyEmployeeItemList, 'PreparedById');
                angular.forEach($scope.CompanyEmployeeList, function (aData) {
                    aData.Id = aData.PreparedById;
                    aData.Name = aData.PrepareByName;
                })
            }
            else if (id == 3) {
                $scope.CompanyEmployeeList = uniqueByKey($scope.CompanyEmployeeItemList, 'ItemId');
                angular.forEach($scope.CompanyEmployeeList, function (aData) {
                    aData.Id = aData.ItemId;
                    aData.Name = aData.ItemName;
                })
            }
        }

        console.log('Em',$scope.CompanyEmployeeList)
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