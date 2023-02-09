
app.controller("CancelProcessEntryController", function ($scope, $rootScope, $cookieStore, $http, $window) {
  
    Clear();

    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Cancel Process').ScreenId;
        GetUsersPermissionDetails();

        
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0;
        GetPagedForCancelProcess($scope.currentPage);

        $scope.ad_CancelProcess = {};
        $scope.ddlCompany = null;

        $scope.ScreenList = [];
        $scope.DocumentList = [];
        $scope.ReasonList = [];

        $scope.CancelList = [];
        $scope.companyList = [];
        $scope.ddlscreen = null;
        $scope.ddlDocument = null;
        $scope.ddlReason = null;



        GetAllScreen();
        GetAllReason();
        GetActiveCompany();
      //  GetAllDocument();
        $scope.employeeList = [];
        GetAllEmployee();
    }

    function GetAllEmployee() {
        $http({
            url: '/Employee/GetAllEmployee',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.employeeList = data;
        });
    }

    function GetAllScreen() {
        $http({
            url: '/CancelProcess/GetAllScreen',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
          
            $scope.ScreenList = data;
        });
    }


   
    $scope.DocumentGetById = function (ddlscreen) {

        if (ddlscreen != null) {
            $http({
                url: '/CancelProcess/GetAllDocument?DocumentTypeCode=' + ddlscreen.DocumentTypeCode,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                $scope.DocumentList = data;
            });
        } 
      
    }


    $scope.DocumentGetByCompanyId = function (ddlCompany) {

        if (ddlCompany != null && $scope.ddlscreen != null) {
            if ($scope.ddlscreen.DocumentTypeCode != undefined || $scope.ddlscreen.DocumentTypeCode!=null) {
                $http({
                    url: '/CancelProcess/GetAllDocument?DocumentTypeCode=' + $scope.ddlscreen.DocumentTypeCode + '&CompanyId=' + ddlCompany.CompanyId,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.DocumentList = data;
                });
            }

        }
       

    }


    function GetAllReason() {
        $http({
            url: '/CancelProcess/GetAllReason',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ReasonList = data;
        });
    }


    function GetActiveCompany() {
       var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (companyList) {
            $scope.companyList = companyList;
           
        })
    }

    $scope.SoAndCompanyClearDropdown = function () {

        $("#ddlscreen").val('').select2({
            placeholder: "Select Screen Name",
            theme: "classic",
            // allowClear: true
        });

        $("#ddlCompany").val('').select2({
            placeholder: "Select Company Name",
            theme: "classic",
            //allowClear: true
        });

        $scope.DocumentList = [];
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
                else if (aPermissionDetails.FunctionName == 'Remove') {
                    $scope.RemovePermission = aPermissionDetails.CanExecute;
                }
                else if (aPermissionDetails.FunctionName == 'ListView') {
                    $scope.ListViewPermission = aPermissionDetails.CanExecute;
                }
            });
        });
    }



    $scope.SaveCancel = function () {

        if ($scope.ad_CancelProcess.Id == 0 || $scope.ad_CancelProcess.Id == undefined) {
            if ($scope.CreatePermission) {
                SaveCancel()
            } else {
                alertify.log('Do not have create Permission!', 'error', '5000');
            }
        }

       
    }


    function SaveCancel() {
        var isValid = true;
        var isValid1 = true;
        var isValid2 = true;
        var isValid3 = true;
        var isValid4 = true;

        $scope.ad_CancelProcess.DocumentType = $scope.ddlscreen.DocumentTypeCode;
        $scope.ad_CancelProcess.DocumentId = $scope.ddlDocument.DocumentId;
      
     

        $scope.ad_CancelProcess.UpdatedBy = $scope.LoginUser.EmployeeId;

        if ($scope.ddlDocument == null || $scope.ddlDocument == undefined) {
            isValid = false;
            alertify.log('Document No must be entry!', 'error', '5000');
        }

        if ($scope.ddlDocument == null || $scope.ddlDocument == 0) {
            isValid1 = false;
            alertify.log('Document No must be entry!', 'error', '5000');
        }

        if ($scope.ddlReason == undefined || $scope.ddlReason == null) {
            isValid2 = false;
            alertify.log('Reason  must be entry!', 'error', '5000');
        } else {
            $scope.ad_CancelProcess.ReasonId = $scope.ddlReason.ReasonId;
        }

       

        if ($scope.ad_CancelProcess.ReasonDetails == undefined || $scope.ad_CancelProcess.ReasonDetails == "") {
            isValid3 = false;
            alertify.log('Reason Details  must be entry!', 'error', '5000');
        }
        if ($scope.ddlInformedby == undefined || $scope.ddlInformedby == null) {
            isValid4 = false;
            alertify.log('Informed by  must be entry!', 'error', '5000');
        } else {
            $scope.ad_CancelProcess.Informedby = $scope.ddlInformedby.EmployeeId;
        }

        if (isValid && isValid1 && isValid2 && isValid3) {
            var prams = JSON.stringify({ _ad_CancelProcess: $scope.ad_CancelProcess });

            alertify.confirm("Are you sure to save?", function (e) {
                if (e) {
                    $http.post('/CancelProcess/CancelProcessSave', prams).success(function (data) {

                        dropdowanClear();
                        Clear();

                        alertify.log('Cancel Process Save' + status + ' Successfully!', 'success', '5000');

                        $scope.ddlReason = null;
                        $("#ddlReason").val('').select2({
                            theme: "classic",
                        });

                        $("#ddlDocument").val('').select2({
                            theme: "classic",
                        });

                        $("#ddlCompany").val('').select2({
                           // theme: "classic",
                        });

                        $("#ddlscreen").val('').select2({
                            theme: "classic",
                        });

                    }).error(function (data) {
                        alertify.log('Server Errors!', 'error', '5000');
                    });
                }


            });
        }
       
    }

    $scope.Reset = function () {
       
        Clear();
        dropdowanClear();
    }

    function dropdowanClear() {

        $('#ddlscreen').select2('destroy');
        $('#ddlscreen').val('').select2({
            theme: "classic",
        });

        $('#ddlCompany').select2('destroy');
        $('#ddlCompany').val('').select2({
           // theme: "classic",
        });

        $('#ddlDocument').select2('destroy');
        $('#ddlDocument').val('').select2({
            theme: "classic",
        });

        $('#ddlReason').select2('destroy');
        $('#ddlReason').val('').select2({
            theme: "classic",
        });
    }




    //$("#txtFromReq").datepicker({
    //    dateFormat: "M d, yy"
    //});

    //$scope.FormDateChangeForReq = function () {
    //    $("#txtFromReq").focus();
    //    $("#txtFromReq").trigger("click");
    //}


    //$("#txtToDateForReq").datepicker({
    //    dateFormat: "M d, yy"
    //});

    //$scope.ToDateChangeForReq = function () {
    //    $("#txtToDateForReq").focus();
    //    $("#txtToDateForReq").trigger("click");
    //}


    //$scope.reloadBtn = function () {
    //    $('#txtFromReq').val('');
    //    $('#txtToDateForReq').val('');
    //    $('#ReqNoAndCompany').val('');
    //    $scope.FromDate = "";
    //    $scope.ToDate = "";
    //    $scope.IssueNoAndCompanyName = null;
    //    GetPagedForCancelProcess(1);
    //}

    $scope.ClearCancelProcess = function () {
        $("#SearchForCancel").val('');
        $scope.SearchForCancelModel = "";
    }
    $scope.CancelProcessSearch = function () {
        GetPagedForCancelProcess(1);

    }

    $scope.ClearBtn = function () {
        $("#SearchForCancel").val('');
        $scope.SearchForCancelModel = "";
        GetPagedForCancelProcess(1);
    }

    function GetPagedForCancelProcess(curPage) {

        if (curPage == null) curPage = 1;
        var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        //var formDateChange = $("#txtFromReq").val();
    
        //$scope.FromDate = formDateChange;

        //var toDateChange = $("#txtToDateForReq").val();
    
     //   $scope.ToDate = toDateChange;

        var SearchCriteria = "";

      
        if ($scope.SearchForCancelModel !== undefined && $scope.SearchForCancelModel != null && $scope.SearchForCancelModel != "") {
            SearchCriteria = "P.DocumentNo LIKE '%" + $scope.SearchForCancelModel + "%' OR P.ReasonName LIKE '%" + $scope.SearchForCancelModel + "%' OR ReasonDetails LIKE '%" + $scope.SearchForCancelModel + "%'  OR P.EmployeeName LIKE '%" + $scope.SearchForCancelModel + "%' ";
        }
      

        $http({
            url: encodeURI('/CancelProcess/CancelPrcessGetPaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.CancelList = data.ListData;
            $scope.total_count = data.TotalRecord;

            if ($scope.CancelList.length > 0) {
              
            }
            else {
                alertify.log('Cancel Process  Not Found', 'error', '5000');
            }
          
        });

      
    }

    $scope.getData = function (curPage) {

        // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetPagedForCancelProcess($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetPagedForCancelProcess($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetPagedForCancelProcess($scope.currentPage);
        }
        //  }


    }


});
