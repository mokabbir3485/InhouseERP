app.controller("InventoryReportsMushakController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
   // $scope.LoginUser = $cookieStore.get('UserData');
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }

    load();

    //Functions
    function load() {
        //$scope.Mushak4_3Report = 'Mushak4_3ReportFalse';
        //$scope.Mushak6_1Report = 'Mushak6_1ReportFalse';
        //$scope.Mushak6_2Report = 'Mushak6_2ReportFalse';
        //$scope.Mushak6_3Report = 'Mushak6_3ReportFalse';

        //$scope.TejariChallanReport = 'TejariChallanReportFalse';

        //$scope.Mushak6_6Report = 'Mushak6_6ReportFalse';

      

        //$scope.Mushak6_1Report = 'Mushak6_1Report';

        $scope.MusukReport="SalesReport"

        $scope.MusukReport = "ReportMusuk_4_3";
        $scope.suppilerList = [];
        $scope.suppilerImportPBList = [];
        $scope.BillOfMaterialList = [];
        $scope.ddlSupplier = null;
        $scope.ddlPB = null;
        $scope.ddlLocalOrImp = null;
        $scope.ddlBillOfMaterial = null;
        GetBillOfMaterial();
        //$scope.Mushak6_1Report = true;
        //GetUsersPermissionDetails();
        $scope.Mushak_6_1 = true;
        $scope.Mushak_6_2 = true;
        $scope.Mushak_6_3 = true;
        $scope.Mushak_4_3 = true;
        $scope.TreasuryChallan = true;
        $scope.Mushak_6_6 = true;

        $scope.SupplierList = [];
        $scope.SupplierBillFiltereList = [];
        $scope.SupplierIssueBillFiltereList = [];
        GetAllSupplier();
        GetMusuk6_6ReportAndDropdownDataLoad();

    }

    function GetBillOfMaterial() {
            $http({
                url: '/BillOfMaterial/GetBillOfMaterialByBillOfMaterialId',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.BillOfMaterialList = data;

            })
    }

    GetCompanyForMushak_6_3();
    function GetCompanyForMushak_6_3() {
        $http({
            url: '/SalesInvoice/GetMushak_6_3BySalesInvoiceId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.companyList = [...new Map(data.map(item =>
                [item['CompanyId'], item])).values()];

        })

    }
    $scope.GetSalesInvoiceForMushak_6_3 = function (CompanyId) {
        $http({
            url: '/SalesInvoice/GetMushak_6_3BySalesInvoiceId?CompanyId=' + CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SalesInvoiceList = [...new Map(data.map(item =>
                [item['SalesInvoiceId'], item])).values()];
        })

    }


    $scope.PDTypeList = [
        { PDTypeId: 1, PDTypeName: "Local Purchase Bill" },
        { PDTypeId: 2, PDTypeName: "Import Purchase Bill" }
    ]
    $scope.GetByPurchaseBillId = function (PDTypeId) {
        $scope.supplierlist = [];
        if (PDTypeId == 1) {
            angular.forEach($scope.supplierlistSearch, function (aData) {
                if (aData.SuppilerTypeName == "Local") {
                    $scope.supplierlist.push(aData);
                }

            })
            $scope.ddlSupplier = null;
            $scope.ddlPB = null;

        } else if (PDTypeId == 2) {
            angular.forEach($scope.supplierlistSearch, function (aData) {
                if (aData.SuppilerTypeName != "Local") {
                    $scope.supplierlist.push(aData);
                }

            })
            $scope.ddlSupplier = null;
            $scope.ddlPB = null;

        }
    }

    function GetAllSupplier() {
        
        $http({
            url: '/Supplier/GetAllSuppler',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.supplierlistSearch = angular.copy(data);
            
        })
    }



    $scope.GetPBBySuppilerId = function (SupplierId) {
        $http({
            url: '/PurchaseBill/LocalSuppilerPBId?supId=' + SupplierId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PBList = data;
            $scope.ddlPB = null;
        });

    }

    $scope.MushakBtn_6_2 = function () {
        $window.open("#/Mushak6_2", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("PBId", $scope.ddlPB.PBId);
        event.stopPropagation();

    }

    $scope.MushakBtn_6_1 = function () {
            $window.open("#/Mushak6_1", "popup", "width=850,height=550,left=280,top=80");
        $cookieStore.put("PBId", $scope.ddlPB.PBId);
        if ($scope.ddlPDType.PDTypeId == 1) {
            $cookieStore.put("IsLocal", true);
        } else {
            $cookieStore.put("IsLocal", false);
        }
        
            event.stopPropagation(); 

    }

    $scope.MushakBtn_4_3 = function () {
        $window.open("#/Mushak4_3", "popup", "width=850,height=550,left=280,top=80");
        var BillOfMaterialObj = $scope.ddlBillOfMaterial;
        $cookieStore.put("BillOfMaterialObj", BillOfMaterialObj);
        event.stopPropagation();

    };

    $scope.MushakBtn_6_6 = function () {
        var mushakBtn = {};

        if ($scope.ddlSupplier == null || $scope.ddlSupplier == undefined) {
            mushakBtn.SupplierId = null;
        } else {
            mushakBtn.SupplierId = $scope.ddlSupplier.SupplierId;
        }
        if ($scope.ddlIssue == null || $scope.ddlIssue == undefined) {
            mushakBtn.IssueId = null;
        } else {
            mushakBtn.IssueId = $scope.ddlIssue.IssueId;
        }


 
        $window.open("#/Mushak6_6", "popup", "width=850,height=550,left=280,top=80");
       // var BillOfMaterialObj = $scope.ddlBillOfMaterial;
        $cookieStore.put("Mushak6_6", mushakBtn);
       
        event.stopPropagation();

    };

    $scope.MushakBtn_6_3 = function () {
        $window.open("#/Mushak6_3", "popup", "width=850,height=550,left=280,top=80");
        //var BillOfMaterialObj = $scope.ddlBillOfMaterial;
        $cookieStore.put("Mushak6_3SalesInvoiceId", $scope.ddlSalesInvoice.SalesInvoiceId);
        //sessionStorage.setItem("Mushak6_3Obj", JSON.stringify(Mushak6_3Obj));
        event.stopPropagation();

    };

    $scope.TejariChallanBtn = function () {
        $window.open("#/TreasuryChallan", "popup", "width=850,height=550,left=280,top=80");
        var TDSIssueId = null;
        $cookieStore.put("TDSIssueId", TDSIssueId);
        //sessionStorage.setItem("TejariChallanObj", JSON.stringify(TejariChallanObj));
        event.stopPropagation();

    };


    $scope.CheckReport = function (report) {
        //if (report == 'ReportMusuk_6_1') {
        //    $scope.MusukReport = "ReportMusuk_6_1";
        //} else if (report == 'ReportMusuk_6_2') {
        //    $scope.MusukReport = "ReportMusuk_6_2";
        //} else if () {

        //}
       
    }


    function GetMusuk6_6ReportAndDropdownDataLoad() {
        

        $http({
            url: '/VAT/xRpt_vat_Mushak_6_6_GetByIssueId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.SupplierList = data;
            $scope.SupplierBillFiltereList = data.filter((Sup, aData, index) => index.findIndex(v => v.SupplierName === Sup.SupplierName) === aData);
            //$scope.SupplierIssueBillFiltereList = data.filter((Sup, aData, index) => index.findIndex(v => v.VDSIssueNo === Sup.VDSIssueNo) === aData);
        });
    }

    $scope.GetSullpierForIssue = function (ddlSup) {
     //   $scope.SupplierBillFiltereList = $scope.SupplierList.filter((Sup, aData, index) => index.findIndex(v => v.IssueNo === Sup.IssueNo) === aData);
        $scope.SupplierIssueBillFiltereList = $scope.SupplierList.filter((Sup, aData, index) => index.findIndex(v => v.IssueNo === Sup.IssueNo) === aData);
    }

    function GetUsersPermissionDetails() {

        $scope.Mushak_6_1 = true;
        $scope.Mushak_6_2 = true;
        $scope.Mushak_6_3 = true;
        $scope.Mushak_4_3 = true;
        $scope.TreasuryChallan = true;
        $scope.Mushak_6_6 = true;

        $scope.SalesRegister = false;
        $scope.SalesProductivity = false;
        //$scope.salesReport = true;


        var searchCriteria = 'P.RoleId=' + $scope.LoginUser.RoleId + ' AND S.ScreenId=' + $scope.ScreenId;
        $http({
            url: '/Permission/GetUsersPermissionDetails?searchCriteria=' + searchCriteria + '&orderBy=PermissionDetailId',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PermissionDetails = data;
            angular.forEach($scope.PermissionDetails, function (aPermissionDetails) {

                if (aPermissionDetails.FunctionName == 'Sales Register Report') {
                    $scope.SalesRegister = true;
                }
                else if (aPermissionDetails.FunctionName == 'Company Wise Total Sales Report') {
                    $scope.CompanyWiseTotalSales = true;

                }
                else if (aPermissionDetails.FunctionName == 'Sales Productivity Report') {
                    $scope.SalesProductivity = true;

                }
                else if (aPermissionDetails.FunctionName == 'CIF Report') {
                    $scope.CIF = true;

                }
                else if (aPermissionDetails.FunctionName == 'Company Payment Status Report') {
                    $scope.CompanyPaymentStatus = true;

                }

            });
        });
    }


    

});
