app.controller("Mushak_6_6_GenerateController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {


    Clear();
    $scope.MushakData.TotalAmount = 0;
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        //$scope.ScreenId = parseInt(sessionStorage.getItem("SalesOrderScreenId"));
        if ($rootScope.$PermissionList !== undefined) {
            $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Mushak_6_6').ScreenId;
            // GetUsersPermissionDetails();
        }
        else {
            setTimeout(function () {
                $scope.ScreenId = $rootScope.$PermissionList.find(v => v.ScreenName == 'Mushak_6_6').ScreenId;
                // GetUsersPermissionDetails();
            }, 500);
        }


        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForMushakIssue($scope.currentPage);

    
        $scope.ddlSupplier = null;
        $scope.MushakData = {};


        $scope.SupplierBillList = [];
        $scope.SupplierBillFilterList = [];
        $scope.SupplierBillList1 = [];
        $scope.CheckSupplierBillIssue = [];
        $scope.MushakIssueGetPagedlist = [];
        $scope.MushakData.IssueDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
       
        getMaxSupplierVdsIssue();
   

        GetAllEmployee();
        $scope.EmployeeList = [];

        GetActiveSupplier();
        $scope.supplierList = [];

        $scope.SupplierBillFilterList = [];
        $scope.SupplierBillList = [];

        $scope.TempTotalBillAmount = 0;
        $scope.TempTotalVATAmount = 0;
        $scope.TempTotalVDSAmount = 0;
       
    }


    $("#IssueDateText").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ChangeForIssueDate = function () {
        $("#IssueDateText").focus();
        $("#IssueDateText").trigger("click");
    }


    function GetActiveSupplier() {
        $http({
            url: '/Supplier/GetBySupplierFormushak_6_6',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          
           
            angular.forEach(data,function (aData) {
                var res1 = aData.ChallanDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(aData.ChallanDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                    aData.ChallanDate = date1;
                    aData.TrChallanDate = aData.ChallanDate;
                    aData.TrChallanNo = aData.ChallanNo;
                }
            })
            $scope.SupplierBillFilterList = data;
            $scope.supplierList = data.filter((Sup, aData, index) => index.findIndex(v => v.SupplierName === Sup.SupplierName) === aData);

        })
    }


    $scope.GetBySupplier = function (ddlSupplier) {

        $scope.SupplierBillList1 = $scope.SupplierBillFilterList.filter(aData => aData.SupplierId == ddlSupplier.SupplierId)
    }

   

   
   

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.EmployeeList = data;
            $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };

        });
    }


    function getMaxSupplierVdsIssue() {

        $http({
            url: '/VAT/vat_Mushak_6_6_GetMaxIssueNo',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MaxReqNo = data;
            var criteria = "IsActive=1";
            $http({
                url: '/FiscalYear/GetDynamic?searchCriteria=' + criteria + "&orderBy=FiscalYearId",
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                angular.forEach(data, function (aData) {
                    if (aData.BranchId == 1) {
                        $scope.finYearHeadOffice = aData.FiscalYearName;
                    } else if (aData.BranchId == 3) {
                        $scope.finYearEPZ = aData.FiscalYearName;
                    }
                })
                $scope.MushakData.IssueNo = 'RTL/' + $scope.finYearEPZ + '/' + $scope.MaxReqNo;
            });


        });


    }

  

  

    $scope.CheckSupplierVatIssue = function () {
        $scope.$SupplierBillList1 = $scope.SupplierBillList1.filter(aData => aData.IsCheck == true);

     
        angular.forEach($scope.$SupplierBillList1, function (aData) {
            $scope.TempTotalBillAmount += aData.TotalBillAmount;
            $scope.TempTotalVATAmount += aData.TotalVATAmount;
            $scope.TempTotalVDSAmount += aData.TotalVDSAmount;

        })

    }


   

    $scope.MusukSave = function () {
       

        var isValid = true;
        if ($scope.ddlPreparedBy == null || $scope.ddlPreparedBy == undefined) {
            alertify.log('Prepared by must be entry!!!', 'error', '5000');
            return;
        }

        $scope.MushakData.SubmittedBy = $scope.ddlPreparedBy.EmployeeId;
        $scope.MushakData.SupplierId = $scope.ddlSupplier.SupplierId;
        $scope.MushakData.CreatorId = $scope.LoginUser.UserId;
        $scope.MushakData.UpdatorId = $scope.LoginUser.UserId;

       


        if ($scope.$SupplierBillList1.lngth != 0) {

            var prams = JSON.stringify({ _Mushak_6_6: $scope.MushakData, _MushakDetails_6_6: $scope.$SupplierBillList1 });
            console.log($scope.MushakData);
            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {

                    $http.post('/VAT/Mushak_6_6Save', prams).success(function (data) {
                        Clear();
                        $scope.$SupplierBillList1 = [];
                        alertify.log('Musuk 6.6 Save' + status + ' Successfully!', 'success', '5000');
                    }).error(function (data) {
                        alertify.log('Server Errors!', 'error', '5000');
                    });

                }
            });
        } else {
            alertify.log('Bill Details Must be entry', 'error', '5000');
        }


    }
   

    

    function GetByVoucherGenerate() {

        $http({
            url: '/CompanyAdvance/GetByVoucherGenerate?VoucherName=RV',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.MushakData.ReceiptVoucherNo = data;
            console.log('Rcv', data);

        });

    }

    $scope.Reset = function () {
        Clear();
    }


    $("#txtFromVDS").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.FormDateChangeForVDS = function () {
        $("#txtFromVDS").focus();
        $("#txtFromVDS").trigger("click");
    }


    $("#txtToDateForVDS").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.ToDateChangeForVDS = function () {
        $("#txtToDateForVDS").focus();
        $("#txtToDateForVDS").trigger("click");
    }

    $scope.reloadBtn = function () {
        $('#txtFromVDS').val('');
        $('#txtToDateForVDS').val('');
        $('#ProductionAndCompany').val('');
        $scope.FromDate = "";
        $scope.ToDate = "";
        $scope.SearchProductionNoAndStore = null;
        GetPagedForMushakIssue(1);
        $scope.isReportDisabled = false;
    }

    $scope.SpplierVDSSearch = function () {
        GetPagedForMushakIssue(1);

    }

    function GetPagedForMushakIssue(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromVDS").val();
        $scope.FromDate = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForVDS").val();
        $scope.ToDate = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchProductionNoAndStore != undefined && $scope.SearchProductionNoAndStore != "" && $scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "([VM].[IssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([VM].[IssueNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%')";

        }
        else if ($scope.SearchProductionNoAndStore !== undefined && $scope.SearchProductionNoAndStore != null && $scope.SearchProductionNoAndStore != "") {
            SearchCriteria = "[VM].[IssueNo] LIKE '%" + $scope.SearchProductionNoAndStore + "%'";

        }
        else if ($scope.FromDate != "" && $scope.ToDate != "") {
            SearchCriteria = "[VM].[IssueDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";

        }



        $http({
            url: encodeURI('/Vat/Musuk_6_GetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.MushakIssueGetPagedlist = data.ListData;
            //  $scope.total_count = data.TotalRecord;
            $scope.total_count = data.TotalRecord;
            if (data.ListData.length > 0) {

                angular.forEach(data.ListData, function (aPro) {

                   

                    var res2 = aPro.IssueDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPro.IssueDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aPro.IssueDate = date1;
                    }
                })

            }
            else {

                alertify.log('VDS Issue Not Found', 'error', '5000');

            }

        });
    }

    $scope.getData = function (curPage) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForMushakIssue($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForMushakIssue($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForMushakIssue($scope.currentPage);
        }
        //  }


    }

    $scope.ReportView = function (aSupVds) {
       
       var mushakBtn = {};
        mushakBtn.IssueId = aSupVds.IssueId;
        mushakBtn.SupplierId = aSupVds.SupplierId;
 
       $window.open("#/Mushak6_6", "popup", "width=850,height=550,left=280,top=80");
       $cookieStore.put("Mushak6_6", mushakBtn);
        event.stopPropagation();
    }


});