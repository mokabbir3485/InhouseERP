
app.controller("SalesInvoiceAditionalCostController", function ($rootScope,$scope, $cookieStore, $http, $window, $filter) {
    $scope.ScreenId = parseInt(sessionStorage.getItem("SalesInvoiceAditionalCostScreenId"));
    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sales Invoice Aditional Discount').ScreenId;
        GetUsersPermissionDetails();


        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        $scope.TotalAmount = 0;
        GetAdditionalAmountPaged($scope.currentPage);
        $scope.InvoiceAdditionalCost = {};
        $scope.SalesInvoiceAdditionalList = [];
        $scope.SalesInvoiceList = [];
        $scope.SalesInvoiceAdditionalCost = [];

        GetAllSalesInvoice();
      //  GetUsersPermissionDetails();
    }



    function GetAllSalesInvoice() {
        $http({
            url: '/SalesInvoice/GetAllSalesInvoice',
            method: 'GET',
        }).success(function (data) {
            $scope.SalesInvoiceList = data;
        });
    }

    var isValid = true;
    var isValid1 = true;
    var isValid2 = true;
    
    $scope.AddInvoiceAdditionalCost = function () {
      
        if ($scope.InvoiceAdditionalCost.CostPurpose == "" || $scope.InvoiceAdditionalCost.CostPurpose == undefined) {
            isValid = false;
            alertify.log('Cost Purpose must be entry!', 'error', '5000');
        }
        if ($scope.InvoiceAdditionalCost.Amount == 0 || $scope.InvoiceAdditionalCost.Amount == undefined) {
            isValid1 = false;
            alertify.log('Amount must be entry!', 'error', '5000');
        }

        if ($scope.ddlSalesInvoice == null || $scope.ddlSalesInvoice == undefined) {
            isValid2 = false;
            alertify.log('Sales Invoice must be entry!', 'error', '5000');
        }
        if (isValid && isValid1 && isValid2) {
            $scope.InvoiceAdditionalCost.SalesInvoiceNo = $scope.ddlSalesInvoice.SalesInvoiceNo;
            $scope.InvoiceAdditionalCost.SalesInvoiceId = $scope.ddlSalesInvoice.SalesInvoiceId;
            $scope.TotalAmount += $scope.InvoiceAdditionalCost.Amount;
            $scope.SalesInvoiceAdditionalList.push($scope.InvoiceAdditionalCost);
            $scope.InvoiceAdditionalCost = {};
            $scope.ddlSalesInvoice = null;
            $('#ddlSalesInvoice').select2('destroy');
            $("#ddlSalesInvoice").val('').select2({
                selectOnClose: true,
                theme: "classic",
            });
        }
      
    }
    $scope.OpenPopupWindow = function (ddlSalesInvoice, IsManualInvoice) {
        $window.open("#/SalesInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesInvoiceId", JSON.stringify(siId));
        ddlSalesInvoice.IsManualInvoice = IsManualInvoice;
        $cookieStore.put("aCompanySalesInvoice", ddlSalesInvoice);
        event.stopPropagation();
    };
    $scope.RemoveSalesInvoiceCost = function (ind) {
        var index = $scope.SalesInvoiceAdditionalList.indexOf(ind);
        $scope.SalesInvoiceAdditionalList.splice(index, 1);
        $scope.TotalAmount -= ind.Amount;
    }

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
        $scope.RemovePermission = false;
        $scope.ListViewPermission = false;
       
        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {
                if (aPermissionDetails.FunctionName == 'Create') {
                    $scope.CreatePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'Revise') {
                    $scope.RevisePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }

    $scope.Save = function () {

        if ($scope.CreatePermission) {
            SaveInvoiceAdditionalAmount();
        } else {

            alertify.log('don`t have Create Permision!', 'error', '5000');
        }

    }




    function SaveInvoiceAdditionalAmount() {

        var parms = JSON.stringify({ _pos_AdditionalSalesInvoiceCost: $scope.SalesInvoiceAdditionalList });
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $http.post('/SalesInvoice/AdditionalSalesInvoiceCostSave', parms).success(function (data) {
                    Clear();
                    $scope.InvoiceAdditionalCost = {};
                    $scope.SalesInvoiceAdditionalList = [];
                    alertify.log('Sales Invoice  ' + Status + ' Successfully!', 'success', '5000');

                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
        })
       
    }

    function GetAdditionalAmountPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "") {
            SearchCriteria = "CostPurpose LIKE '%" + $scope.SearchCompanyName + "%' OR Amount LIKE '%" + $scope.SearchCompanyName + "%'";

        }
        $http({
            url: encodeURI('/SalesInvoice/AdditionalSalesInvoiceGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesInvoiceAdditionalCost = data.ListData;
            $scope.total_count = data.TotalRecord;
        });
    }

    $scope.CompanySalesInvoiceSearch = function () {
        GetAdditionalAmountPaged(1);
    }

    $scope.reloadBtn = function () {
        GetAdditionalAmountPaged(1);
        $scope.SearchCompanyName = "";
        $scope.SearchCompanyName =null;
    }
    $scope.Reset = function () {
        Clear();
    }
});