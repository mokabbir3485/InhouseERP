app.controller("SaleAcknowledgementEntryController", function ($scope, $rootScope, $cookieStore, $http, $filter, $window) {
    //#region GLOBAL VARIABLES & METHODS CALL
    //var UserData = sessionStorage.getItem("UserDataSession");
    //if (UserData != null) {
    //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    //}
    //var Valuation = sessionStorage.getItem("ValuationSession");
    //if (Valuation != null) {
    //    $scope.CurrentValuationSetup = JSON.parse(sessionStorage.ValuationSession);
    //}
    Clear();
   
    //#endregion 

    ////#region DATE CONFIG WITH JQUERY
    $("#dtFromDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenFromDate = function () {
        $("#dtFromDate").focus();
        $("#dtFromDate").trigger("click");
    }
    $("#dtToDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenToDate = function () {
        $("#dtToDate").focus();
        $("#dtToDate").trigger("click");
    }
    $("#dtApprovedDate").datepicker({
        dateFormat: "M d, yy",
        changeMonth: true,
        changeYear: true
        //minDate: $scope.MinDate,
        //maxDate: new Date(parseInt($scope.CurrentValuationSetup.ToDate.replace('/Date(', '')))
    });

    $scope.CalendarOpenToDate = function () {
        $("#dtApprovedDate").focus();
        $("#dtApprovedDate").trigger("click");
    }

    //#endregion 

    //#region METHODS
    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sale Acknowledgement').ScreenId;

        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetAcknowledgementPaged($scope.currentPage);

        var today = ($filter('date')(new Date(), 'MMM dd, yyyy')).toString();
        $scope.pos_SalesInvoiceList = [];
        //$scope.MinDate = new Date(parseInt($scope.CurrentValuationSetup.FromDate.replace('/Date(', '')));
        $scope.AcknowledgementDate = $scope.FromDate = $scope.ToDate = today;
        //$scope.AcknowledgementNo = 'Acknowledgement No';
        $scope.JvNo = '';
        GetActiveCompany();
        GetAllEmployee();
        GetAcknowledgementNo();
    }

    function GetActiveCompany() {
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyName',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyList = data;
        })
    }
    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
            $scope.ddlAcknowledgedBy = { "EmployeeId": $scope.LoginUser.EmployeeId };
            $('#ddlAcknowledgedBy').select2('destroy');
            $('#ddlAcknowledgedBy').val($scope.LoginUser.EmployeeId).select2();
        });
    }
    //$scope.getMaxAcknowledgementByDate = function () {
    //    GetAcknowledgementNo();
    //}
    function GetAcknowledgementNo() {
        var dateParts = ($filter('date')(new Date().toJSON().slice(0, 10), 'dd/MM/yyyy')).split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        var from = dateParts[3] + "-" + dateParts[2] + "-" + dateParts[1];
        $http({
            url: '/SalesInvoice/GetAcknowledgementNo?AcknowledgementDate=' + from,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.AcknowledgementNo = data;
        });

    }
    //#endregion 

    //#region EVENTS
    $scope.SearchSalesInvoice = function () {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var dateSplit = $scope.FromDate.split(' ');
        var date = dateSplit[1].replace(',', '');
        var year = dateSplit[2];
        var month;
        for (var j = 0; j < months.length; j++) {
            if (dateSplit[0] == months[j]) {
                month = months.indexOf(months[j]) + 1;
            }
        }
        var fromDate = year + "-" + month + "-" + date;

        dateSplit = $scope.ToDate.split(' ');
        date = dateSplit[1].replace(',', '');
        year = dateSplit[2];
        for (var j = 0; j < months.length; j++) {
            if (dateSplit[0] == months[j]) {
                month = months.indexOf(months[j]) + 1;
            }
        }
        var toDate = year + "-" + month + "-" + date;

        //var criteria = "IsOnCredit=1 AND SalesInvoiceDate BETWEEN '" + fromDate + "' AND '" + toDate + "'";

        //if ($scope.ddlCompany !== undefined && $scope.ddlCompany != null) {
        //    criteria += " AND CompanyId=" + $scope.ddlCompany.CompanyId + " and SalesInvoiceId not in (select SalesInvoiceId from rcv_SaleAcknowledgement)";
        //}

        $http({
            url: '/SalesInvoice/GetInvoiceWithAcknowledgement?companyId=' + $scope.ddlCompany.CompanyId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.SalesInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.SalesInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                        aSd.SalesInvoiceDate = date1;
                    }
                })
            }
            else
                alertify.log('No Sales Invoice Found', 'error', '5000');

            $scope.SalesInvoiceList = data;
        });
    }

    $scope.RowSelect = function (row) {
        $scope.pos_SalesInvoiceList = Enumerable.From($scope.SalesInvoiceList).Where('$.selected==true').ToArray();
        //$scope.pos_SalesInvoice.Amount = Enumerable.From($scope.pos_SalesInvoiceList).Sum('$.Amount').toFixed(2);
        //$scope.pos_SalesInvoiceList = $scope.SalesInvoiceList.filter(x => x.SalesInvoiceId === row.SalesInvoiceId);
    }
    $scope.SaveAcknowledgement = function () {
        
        alertify.confirm("Are you sure to save?", function (e) {
            if (e) {
                $scope.arr = $scope.AcknowledgementNo.split('/');
                $scope.num = parseInt($scope.arr[2]);
                angular.forEach($scope.pos_SalesInvoiceList, function (aData) {
                    aData.AcknowledgementNo = $scope.arr[0] + '/' + $scope.arr[1] + '/' + $scope.num++
                    aData.AcknowledgementDate = $scope.AcknowledgementDate;
                    aData.AcknowledgedBy = $scope.ddlAcknowledgedBy.EmployeeId;
                    aData.UpdatorId = $scope.LoginUser.UserId;
                })

                var params = JSON.stringify({ rcv_Acknowledge: $scope.pos_SalesInvoiceList });
                $http.post('/SalesInvoice/PostAcknowledge', params).success(function (data) {
                    if (data > 0) {
                        $window.open("#/SaleAcknowledgeReport", "popup", "width=800,height=550,left=280,top=80");
                        //sessionStorage.setItem("CompanyAdvanceObj", JSON.stringify(CompanyAdvanceObj));
                        $cookieStore.put('SaleAcknowlwdge', data);
                        alertify.log('Acknowledgements saved successfully!', 'success', '5000');
                        Clear();
                        $scope.SalesInvoiceList = [];
                        $scope.ddlCompany = null;
                        $('#ddlCompany').select2('destroy');
                        $('#ddlCompany').val('').select2({
                            placeholder: "Select Company Name",
                            theme: "classic",
                            dropdownAutoWidth: false
                        });
                    }
                    else {
                        alertify.log('Save failed, refresh page and try again', 'error', '5000');
                    }
                }).error(function (msg) {
                    alertify.log('Save failed, refresh page and try again', 'error', '5000');
                });
            }
        })
    }

    $scope.ResetForm = function () {
        Clear();
        $scope.SalesInvoiceList = [];
        $scope.ddlCompany = null;
        $('#ddlCompany').select2('destroy');
        $('#ddlCompany').val('').select2({
            placeholder: "Select Company Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.saleAcknowledgementEntryForm.$setPristine();
        $scope.saleAcknowledgementEntryForm.$setUntouched();
    }

    $scope.OpenPopupWindowSalesInvoiceReport = function (aCompanySalesInvoice, IsManualInvoice) {
        $window.open("#/SalesInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("SalesInvoiceId", JSON.stringify(siId));
        aCompanySalesInvoice.IsManualInvoice = IsManualInvoice;
        $cookieStore.put("aCompanySalesInvoice", aCompanySalesInvoice);
        event.stopPropagation();
    };
    //#endregion

    $scope.reloadBtn = function () {
        $('#txtFromDateForSA').val('');
        $('#txtToDateForSA').val('');
        $('#textSearchCompanyName').val('');
        $scope.FromDateSA = "";
        $scope.ToDateSA = "";
        $scope.SearchCompanyName = null;
        GetAcknowledgementPaged(1);
    }

    $scope.AcknowledgementSearch = function () {
        GetAcknowledgementPaged(1);

    }

    function GetAcknowledgementPaged(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var formDateChange = $("#txtFromDateForSA").val();
        $scope.FromDateSA = formDateChange.split('/').reverse().join('-');

        var toDateChange = $("#txtToDateForSA").val();
        $scope.ToDateSA = toDateChange.split('/').reverse().join('-');

        var SearchCriteria = "";

        if ($scope.SearchCompanyName != undefined && $scope.SearchCompanyName != "" && $scope.FromDateSA != "" && $scope.ToDateSA != "") {
            SearchCriteria = "([AcknowledgementDate] between '" + $scope.FromDateSA + "' and '" + $scope.ToDateSA + "') and ([CompanyName] LIKE '%" + $scope.SearchCompanyName + "%' or [AcknowledgementNo] LIKE '%" + $scope.SearchCompanyName + "%' or [SI].[SalesInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%')";
            //alert("Name, Date Success!!!!!");
        }
        else if ($scope.SearchCompanyName !== undefined && $scope.SearchCompanyName != null && $scope.SearchCompanyName != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchCompanyName + "%' or [AcknowledgementNo] LIKE '%" + $scope.SearchCompanyName + "%' or [SI].[SalesInvoiceNo] LIKE '%" + $scope.SearchCompanyName + "%'";
            //alert("Name Success!!!!!");
        }
        else if ($scope.FromDateSA != "" && $scope.ToDateSA != "") {
            SearchCriteria = "[AcknowledgementDate] between '" + $scope.FromDateSA + "' and '" + $scope.ToDateSA + "'";
            //alert("Date Success!!!!!");
        }


        //console.log(SearchCriteria);
        $http({
            url: encodeURI('/SalesInvoice/GetAcknowledgePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            if (data.ListData.length > 0) {
                angular.forEach(data.ListData, function (aSd) {
                    var res1 = aSd.AcknowledgementDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.AcknowledgementDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.AcknowledgementDate = date1;
                    }
                    



                })

            }
            else {
                alertify.log('Sales Acknowledgement  Not Found', 'error', '5000');
            }
            $scope.AcknowledgementListPaged = data.ListData;
            $scope.total_count = data.TotalRecord;


        });
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetAcknowledgementPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetAcknowledgementPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetAcknowledgementPaged($scope.currentPage);
        }
        //  }


    }

    $("#txtFromDateForSA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.FormDateChangeForSA = function () {
        $("#txtFromDateForSA").focus();
        $("#txtFromDateForSA").trigger("click");
    }


    $("#txtToDateForSA").datepicker({
        dateFormat: "dd/mm/yy"
    });

    $scope.ToDateChangeForSA = function () {
        $("#txtToDateForSA").focus();
        $("#txtToDateForSA").trigger("click");
    }


    $scope.OpenPopupWindow = function (ackId) {
     
        $window.open("#/SaleAcknowledgeReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("CompanyAdvanceObj", JSON.stringify(CompanyAdvanceObj));
        $cookieStore.put('SaleAcknowlwdge', ackId.SaleAcknowledgementId);
        event.stopPropagation();
    }
})