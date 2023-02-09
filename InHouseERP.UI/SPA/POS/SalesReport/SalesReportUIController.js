
app.controller("SalesReportUIController", function ($rootScope, $scope, $cookieStore, $http, $window, $filter) {

 
    Clear();

    function Clear() {


        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Sales Report').ScreenId;
        GetUsersPermissionDetails();


        $scope.SalesRegisterReportName = "Sales Register Report";
        $scope.ExportSalesReportName = "EPZ Export Sales Report";
        $scope.SalesProductivityReportName = "Sales Productivity Report";
        $scope.CIFReportName = "Customer Information Formation (CIF)";
        $scope.CompanyPaymentStatusReportName = "Customer Payment Status";
        $scope.CompanyWiseTotalSalesReportName = "Customer Wise Total Sales";
        //$scope.FromDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        //$scope.ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');
        $scope.FromDate = null;
        $scope.ToDate = null;
        $scope.SalesRegisterReportDate = {};
        $scope.ExportSalesReportDate = {};

        $scope.SalesOrderTypeList = ["Local", "Export"];
        $scope.IndividualOrTeamList = ["Individual", "Team"];
        $scope.ddlIndividualOrTeam = "Individual";
        $scope.salesReport = "SalesRegisterReport";
        $scope.FilterType = "Sales Order";
        $scope.IsSalesTeam = false;

        if ($scope.LoginUser.DepartmentName.match("Sales")) {
            $scope.IsSalesTeam = true;
        } else {
            $scope.IsSalesTeam = false;
        }

       // GetUsersPermissionDetails();

        $scope.EmployeeList = [];
        GetAllEmployee();

        $scope.companyList = [];
        GetActiveCompany();
        GetAllBranch();

        $scope.ddlEmployee = null;


        
        $scope.example8settings = {
            scrollableHeight: '300px',
            scrollable: true,
            dynamicTitle: true,
            selectionOf: true,
            showUncheckAll: true,
            showCheckAll: true,
            enableSearch: true,
            //selectedToTop: true,
            //selectionLimit: 1,
            //smartButtonMaxItems: 1,
            //dynamicTitle: true,
            //smartButtonTextConverter: function (itemText) { return itemText; }
        };
        $scope.CompanyIdList = [];
        $scope.example8data = [];
        $scope.companyPlaceholder = {
            buttonDefaultText: "Select Customer",
            searchPlaceholder: "Search Customer"
        };
        $scope.selectCompany = document.getElementById("selectCompany").getElementsByTagName('button')[0];
        $scope.selectCompanyMenu = document.getElementById("selectCompany").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectCompany.setAttribute("disabled", "disabled");
        $scope.selectCompany.style.width = "100%";
        $scope.selectCompanyMenu.style.width = "100%";

        //$scope.selectJumbo = document.getElementById("selectJumbo").getElementsByTagName('button')[0];
        //$scope.selectJumboMenu = document.getElementById("selectJumbo").getElementsByClassName('dropdown-menu')[0];
        //$scope.selectJumbo.setAttribute("disabled", "disabled");
        //$scope.selectJumbo.style.width = "100%";
        //$scope.selectJumboMenu.style.width = "100%";


    }
    $scope.fouseSearchBox = function () {
        $('#selectCompany > div > ul > li:nth-child(4) > div > input').focus();
    }
    $("#txtFromDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.FormDateChange = function () {
        $("#txtFromDate").focus();
        $("#txtFromDate").trigger("click");
    }

    $("#txtToDate").datepicker({
        dateFormat: "M dd, yy",
        changeMonth: true,
        changeYear: true
    });

    $scope.ToDateChange = function () {
        $("#txtToDate").focus();
        $("#txtToDate").trigger("click");
    }
    function GetAllBranch() {
        $http({
            url: '/Branch/GetAllBranch',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.Branchlist = Enumerable.From(data).Where(function (x) {
                //return (x.BranchId == 2 || x.BranchId == 3);
                return (x.BranchId != 1);
            }).ToArray();

        });

    }
    $scope.ChangeEmployee = function (ddlEmployee) {
        if ($scope.LoginUser.DepartmentName.match("Sales")) {
            if (ddlEmployee == undefined) {
                $scope.IsSalesTeam = true;
            } else {
                $scope.IsSalesTeam = false;
            }
            
        } else {
            $scope.IsSalesTeam = false;
        }
    }


    $scope.SalesReportButton = function () {
        if ($scope.salesReport != 'SalesProductivityReport' && $scope.salesReport != 'CIFReport') {
            if ($scope.IsSalesTeam) {
                alertify.log('Please select employee!', 'error', '5000');
                return;
            }
        }
        
        $scope.CompanyIds = '';
        angular.forEach($scope.CompanyIdList, function (data) {
            $scope.CompanyIds += $scope.CompanyIds == '' ? data.id : (',' + data.id)

        });

        if ($scope.salesReport == 'SalesRegisterReport' || $scope.salesReport == 'ExportSalesReport') {
            $window.open("#/SalesRegisterReport", "popup", "width=850,height=550,left=280,top=80");
           
            $scope.SalesRegisterReportDate.FromDate = $scope.FromDate;
            $scope.SalesRegisterReportDate.ToDate = $scope.ToDate;

            if ($scope.ddlEmployee == null) {
                $scope.SalesRegisterReportDate.SectionId = null;
                $scope.SalesRegisterReportDate.EmployeeId = null;
            } else {
                $scope.SalesRegisterReportDate.SectionId = $scope.ddlEmployee.SectionId;
                $scope.SalesRegisterReportDate.EmployeeId = $scope.ddlEmployee.EmployeeId;
                $scope.SalesRegisterReportDate.EmployeeName = $scope.ddlEmployee.FullName;
            }

            if ($scope.CompanyIds == '') {
                $scope.SalesRegisterReportDate.CompanyId = '';
            } else {
                $scope.SalesRegisterReportDate.CompanyId = $scope.CompanyIds;
            }
           
            if ($scope.ddlSalesOrderType == undefined) {
                $scope.SalesRegisterReportDate.SalesOrderType = "";
            } else {
                $scope.SalesRegisterReportDate.SalesOrderType = $scope.ddlSalesOrderType;
            }
            if ($scope.ddlBrunch == undefined) {
                $scope.SalesRegisterReportDate.BranchId = null;
                $scope.SalesRegisterReportDate.BranchName = '';
            } else {
                $scope.SalesRegisterReportDate.BranchId = $scope.ddlBrunch.BranchId;
                $scope.SalesRegisterReportDate.BranchName = $scope.ddlBrunch.BranchName;
            }
            if ($scope.ConversionRate == undefined) {
                $scope.SalesRegisterReportDate.ConversionRate = null;
            } else {
                $scope.SalesRegisterReportDate.ConversionRate = $scope.ConversionRate;
            }

            $scope.SalesRegisterReportDate.IndividualOrTeam = $scope.ddlIndividualOrTeam;
            

            if ($scope.salesReport == 'SalesRegisterReport') {
                $scope.SalesRegisterReportDate.IsEPZExport = false;
                $scope.SalesRegisterReportDate.ReportName = $scope.SalesRegisterReportName;
            } else {
                $scope.SalesRegisterReportDate.IsEPZExport = true;
                $scope.SalesRegisterReportDate.ReportName = $scope.ExportSalesReportName;
            }

            $cookieStore.put("SalesRegisterReportDate", $scope.SalesRegisterReportDate);
            event.stopPropagation();
        }
        else if ($scope.salesReport == 'CompanyWiseTotalSalesReport') {
            $window.open("#/CompanyWiseTotalSalesReport", "popup", "width=850,height=550,left=280,top=80");
            $scope.CompanyWiseTotalSalesReportDate = {};
            $scope.CompanyWiseTotalSalesReportDate.FromDate = $scope.FromDate;
            $scope.CompanyWiseTotalSalesReportDate.ToDate = $scope.ToDate;

            if ($scope.ddlEmployee == null) {
                $scope.CompanyWiseTotalSalesReportDate.SectionId = null;
                $scope.CompanyWiseTotalSalesReportDate.EmployeeId = null;
            } else {
                $scope.CompanyWiseTotalSalesReportDate.SectionId = $scope.ddlEmployee.SectionId;
                $scope.CompanyWiseTotalSalesReportDate.EmployeeId = $scope.ddlEmployee.EmployeeId;
            }

            if ($scope.CompanyIds == '') {
                $scope.CompanyWiseTotalSalesReportDate.CompanyId = '';
            } else {
                $scope.CompanyWiseTotalSalesReportDate.CompanyId = $scope.CompanyIds;
            }
           
            if ($scope.ddlSalesOrderType == undefined) {
                $scope.CompanyWiseTotalSalesReportDate.SalesOrderType = "";
            } else {
                $scope.CompanyWiseTotalSalesReportDate.SalesOrderType = $scope.ddlSalesOrderType;
            }
            $scope.CompanyWiseTotalSalesReportDate.IndividualOrTeam = $scope.ddlIndividualOrTeam;
            $cookieStore.put("CompanyWiseTotalSalesReportDate", $scope.CompanyWiseTotalSalesReportDate);
            event.stopPropagation();
        }
        else if ($scope.salesReport == 'SalesProductivityReport') {
            $window.open("#/SalesProductivityReport", "popup", "width=850,height=550,left=280,top=80");
            event.stopPropagation();
        } else if ($scope.salesReport == "CIFReport") {
            $scope.company = {};
            $scope.company['companyId'] = $scope.CompanyIds;
            $scope.company['CIFFromDate'] = $scope.FromDate;
            $scope.company['CIFToDate'] = $scope.ToDate;
            sessionStorage.setItem("Company", JSON.stringify($scope.company));
            $window.open("#/CIFReport", "popup", "width=850,height=550,left=280,top=80");
            event.stopPropagation();
        }
        else if ($scope.salesReport == "CompanyPaymentStatusReport") {
            $scope.CompanyPaymentStatusDate = {};
            $scope.CompanyPaymentStatusDate.FromDate = $scope.FromDate;
            $scope.CompanyPaymentStatusDate.ToDate = $scope.ToDate;
            if ($scope.ddlEmployee == null) {
                $scope.CompanyPaymentStatusDate.SectionId = null;
                $scope.CompanyPaymentStatusDate.EmployeeId = null;
                $scope.CompanyPaymentStatusDate.EmployeeName = null;
            } else {
                $scope.CompanyPaymentStatusDate.SectionId = $scope.ddlEmployee.SectionId;
                $scope.CompanyPaymentStatusDate.EmployeeId = $scope.ddlEmployee.EmployeeId;
                $scope.CompanyPaymentStatusDate.EmployeeName = $scope.ddlEmployee.FullName;
            }
            if ($scope.CompanyIds == '') {
                $scope.CompanyPaymentStatusDate.CompanyId = '';
            } else {
                $scope.CompanyPaymentStatusDate.CompanyId = $scope.CompanyIds;
            }
            if ($scope.ddlSalesOrderType == undefined) {
                $scope.CompanyPaymentStatusDate.SalesOrderType = "";
            } else {
                $scope.CompanyPaymentStatusDate.SalesOrderType = $scope.ddlSalesOrderType;
            }
            if ($scope.ddlBrunch == undefined) {
                $scope.CompanyPaymentStatusDate.BranchId = null;
                $scope.CompanyPaymentStatusDate.BranchName = '';
            } else {
                $scope.CompanyPaymentStatusDate.BranchId = $scope.ddlBrunch.BranchId;
                $scope.CompanyPaymentStatusDate.BranchName = $scope.ddlBrunch.BranchName;
            }

            $scope.CompanyPaymentStatusDate.IndividualOrTeam = $scope.ddlIndividualOrTeam;
            $scope.CompanyPaymentStatusDate.FilterType = $scope.FilterType;
            $cookieStore.put("CompanyPaymentStatusReportDate", $scope.CompanyPaymentStatusDate);
            $window.open("#/CompanyPaymentStatusReport", "popup", "width=850,height=550,left=280,top=80");
            event.stopPropagation();
        }
        
    }


    $scope.ResetButton = function(){
        $scope.ddlSalesOrderType = null;
        $scope.CompanyIds = '';
        $scope.ddlEmployee = null;
        $scope.FromDate = null;
        $scope.ToDate = null;

        $('#ddlSalesReport').select2('destroy');
        $('#ddlSalesReport').val('').select2({
            //placeholder: "Select Supplier",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $('#ddlsection').select2('destroy');
        $('#ddlsection').val('').select2({
            //placeholder: "Select Supplier",
            //theme: "classic",
            dropdownAutoWidth: false
        });
    }
    function GetAllEmployee() {
        $scope.EmployeeList = [];
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                angular.forEach(data, function (aData) {
                    if (aData.SectionId == $scope.LoginUser.SectionId) {
                        $scope.EmployeeList.push(aData);
                    }
                })
            } else {
                $scope.EmployeeList = data;
            }
            
            

            // $scope.ddlPreparedBy = { EmployeeId: $scope.LoginUser.EmployeeId };
        });
    }


    function GetActiveCompany() {
        $scope.companyList = [];
        var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {

            if ($scope.LoginUser.DepartmentName.match("Sales")) {
                angular.forEach(companyList, function (aData) {
                    if (aData.SectionId == $scope.LoginUser.SectionId) {
                        $scope.companyList.push(aData);
                    }
                })
            } else {
                $scope.companyList = companyList;
            }

            angular.forEach($scope.companyList, function (aData) {
                $scope.example8data.push({ id: aData.CompanyId, label: aData.CompanyName });
            })
            
        })
    }
    ////Permision======>>>
   
    function GetUsersPermissionDetails() {


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
                else if (aPermissionDetails.FunctionName == 'Export Sales Report') {
                    $scope.ExportSales = true;

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