app.controller("BankAccountController", function ($scope, $rootScope, $http, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    $scope.UserId = $scope.LoginUser.UserId;
    //$scope.ScreenId = parseInt(sessionStorage.getItem("BankAccountScreenId"));
 

    function Clear() {
        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Bank Account').ScreenId;
        GetUsersPermissionDetails();

        $scope.AccountForList = [{ AccountFor: "Exporter" }, { AccountFor: "Customer" }, { AccountFor: "Supplier" }, { AccountFor: "Salary" }];
        $scope.BankAccountList = [];
        $scope.ExporterList = [];
        $scope.CompanyList = [];
        $scope.CompanyDropdownList = [];
        $scope.ad_BankAccount = {};
        $scope.ad_BankAccount.BankAccountId = 0;
        //$scope.ddlAccountFor = '';
        //$scope.ddlAccountRef = '';
        $scope.ad_BankAccount.IsActive = true;
        $scope.btnDeleleShow = false;
        $scope.ConfirmationMessageForAdmin = false;
        $scope.currentPage = 1;
        $scope.PerPage = 10;
        $scope.total_count = 0; 
        $scope.button = "Save";
        getAllExporter();
        GetActiveCompany();
        GetAllBankAccount();
        //GetUsersPermissionDetails();
        GetBankAccountPaged($scope.currentPage);
        GetConfirmationMessageForAdmin();
    }
    Clear();



    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    $scope.selectionBranchAddress = '';
    $("#tbxBranchAddress").select(function () {
        $scope.selectionBranchAddress = window.getSelection().toString();
    });
    $scope.ChangeCaseBranchAddress = function (IsSelect) {
        if (IsSelect == true) {
            $scope.PreBranchAddress = angular.copy($scope.ad_BankAccount.BranchAddress);
            if ($scope.selectionBranchAddress) {
                var ProperCase = $scope.selectionBranchAddress.toProperCase();
                $scope.ad_BankAccount.BranchAddress = $scope.ad_BankAccount.BranchAddress.replace($scope.selectionBranchAddress, ProperCase);
                $scope.selectionBranchAddress = '';
            }
        } else {
            $scope.ad_BankAccount.BranchAddress = $scope.PreBranchAddress;
            $scope.PreBranchAddress = '';
        }
    }

    function GetAllBankAccount() {
        
        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList = data;
        });
    }
    function SaveBankAccount(Status) {
        if ($scope.ad_BankAccount.AccountFor == 'Customer' || $scope.ad_BankAccount.AccountFor == 'Supplier') {
            if ($scope.ad_BankAccount.AccountRefId == 0 || $scope.ad_BankAccount.AccountRefId == null || $scope.ad_BankAccount.AccountRefId == undefined) {
                alertify.log('Please select account reference!', 'error', '5000');
                return;
            } else {
                $scope.ad_BankAccount.AccountRefId = $scope.ddlAccountRef.AccountRefId;
            }
            
        }
        //else if ($scope.ad_BankAccount.AccountFor == 'Exporter') {
        //    $scope.ad_BankAccount.AccountRefId = 0;
        //}
        var parms = JSON.stringify({ ad_BankAccount: $scope.ad_BankAccount });
        $http.post('/BankAccount/Save', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Bank ' + Status + ' Successfully!', 'success', '5000');
                Clear();
                $('#ddlAccountRefId').select2('destroy');
                $('#ddlAccountRefId').val('').select2({
                    placeholder: "Account Referance",
                    theme: "classic",
                    dropdownAutoWidth: false
                });
                $scope.ddlAccountFor = null;
                $scope.bankAccountForm.$setPristine();
                $scope.bankAccountForm.$setUntouched();
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }
   
    function GetConfirmationMessageForAdmin() {
        $http({
            url: '/Role/GetConfirmationMessageForAdmin',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.ConfirmationMessageForAdmin = (data === 'true');
        });
    }

    function GetUsersPermissionDetails() {
        $scope.CreatePermission = false;
        $scope.RevisePermission = false;
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
    function getAllExporter() {
        $http({
            url: "/ExpInvoice/GetAllExporter",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.ExporterList = data;
        });
    };
    function GetActiveCompany() {
        var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyName",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CompanyList = data;
           
        })
    }

    $scope.GetAccountFor = function (AccountFor) {
        GetCompanyByAccountFor(AccountFor);
    }
   function GetCompanyByAccountFor(AccountFor) {
        if (!angular.isUndefined($scope.ddlAccountFor) && $scope.ddlAccountFor != null) {
            var criteria = "C.IsActive=1";

            if (AccountFor == 'Customer') {

                $http({
                    url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyName",
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.CompanyDropdownList = [];
                    angular.forEach(data, function (aData) {
                        aData.AccountRefId = aData.CompanyId;
                        aData.AccountRefName = aData.CompanyName;
                        $scope.CompanyDropdownList.push(aData);

                    });
                })
            } else if (AccountFor == 'Supplier') {
                $http({
                    url: '/Supplier/GetAllSuppler',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.CompanyDropdownList = [];
                    angular.forEach(data, function (aData) {
                        aData.AccountRefId = aData.SupplierId;
                        aData.AccountRefName = aData.SupplierName;
                        $scope.CompanyDropdownList.push(aData);

                    });
                })
            }
            else if (AccountFor == 'Exporter') {
                $http({
                    url: "/ExpInvoice/GetAllExporter",
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.CompanyDropdownList = [];
                    angular.forEach(data, function (aData) {
                        aData.AccountRefId = aData.ExporterId;
                        aData.AccountRefName = aData.ExporterName + ' ~ ' + aData.ExporterAddress2;
                        $scope.CompanyDropdownList.push(aData);
                    });
                });
                

            }


        } 
    }
  
    $scope.SelBankAccount = function (aBankAccount) {
        $scope.ad_BankAccount = aBankAccount;
        $scope.ddlAccountFor = { AccountFor: aBankAccount.AccountFor };
        GetCompanyByAccountFor(aBankAccount.AccountFor);
        $('#ddlAccountRefId').select2('destroy');
        $('#ddlAccountRefId').val(aBankAccount.AccountRefId).select2();
        $scope.ddlAccountRef = { AccountRefId: aBankAccount.AccountRefId}
        $scope.button = "Update";
        $scope.btnDeleleShow = false;
    };
    $scope.SaveBankAccount = function () {
        $scope.ad_BankAccount.UpdatorId = $scope.UserId;
       
        if ($scope.found) {
            $('#txtBankAccountName').focus();
        }
        else {
            if ($scope.ConfirmationMessageForAdmin) {
                if ($scope.ad_BankAccount.BankAccountId == 0 && $scope.CreatePermission) {
                    alertify.confirm("Are you sure to save?", function (e) {
                        if (e) {
                            SaveBankAccount('Saved');
                        }
                    })
                }
                else if ($scope.ad_BankAccount.BankAccountId == 0 && !$scope.CreatePermission) {
                    alertify.log('You do not have permission to save!', 'error', '5000');
                }
              
                else if ($scope.ad_BankAccount.BankAccountId > 0 && $scope.RevisePermission) {
                    alertify.confirm("Are you sure to update?", function (e) {
                        if (e) {
                            SaveBankAccount('Updated');
                        }
                    })
                }
                else if ($scope.ad_BankAccount.BankAccountId > 0 && !$scope.RevisePermission) {
                    alertify.log('You do not have permission to Update!', 'error', '5000');
                }
            }
            else {
                if ($scope.ad_BankAccount.BankAccountId == 0 && $scope.CreatePermission) {
                    SaveBankAccount('Saved');
                }
                else if ($scope.ad_BankAccount.BankAccountId == 0 && !$scope.CreatePermission) {
                    alertify.log('You do not have permission to save!', 'error', '5000');
                }
                else if ($scope.ad_BankAccount.BankAccountId > 0 && $scope.RevisePermission) {
                    SaveBankAccount('Updated');
                }
                else if ($scope.ad_BankAccount.BankAccountId > 0 && !$scope.RevisePermission) {
                    alertify.log('You do not have permission to Update!', 'error', '5000');
                }
            }
        }
    };

    $scope.resetForm = function () {
        Clear();
        $scope.bankAccountForm.$setPristine();
        $scope.bankAccountForm.$setUntouched();
    }

     $scope.reloadBtn = function () {
         $('#textBankNameCompnayNameAndAccNo').val('');
         $scope.SearchBankNameCompnayNameAndAccNo = null;
         GetBankAccountPaged(1);
        
    }

    $scope.BankAccountSearch = function () {
        GetBankAccountPaged(1);

    }

    function GetBankAccountPaged(curPage) {
        if (curPage == null) curPage = 1;
        var StartRecordNo = ($scope.PerPage * (curPage - 1)) + 1;

        var SearchCriteria = "";

        if ($scope.SearchBankNameCompnayNameAndAccNo !== undefined && $scope.SearchBankNameCompnayNameAndAccNo != null && $scope.SearchBankNameCompnayNameAndAccNo != "") {
            SearchCriteria = "[CompanyName] LIKE '%" + $scope.SearchBankNameCompnayNameAndAccNo + "%' OR [BankName] LIKE '%" + $scope.SearchBankNameCompnayNameAndAccNo + "%' OR [AccountNo] LIKE '%" + $scope.SearchBankNameCompnayNameAndAccNo + "%'";
            //alert("Name Success!!!!!");
        }
        
        $http({
            url: encodeURI('/BankAccount/GetBankAccountPaged?StartRecordNo=' + StartRecordNo + '&RowPerPage=' + $scope.PerPage + "&whereClause="+ SearchCriteria + '&rows=' + 0),
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList= data.ListData;
            $scope.total_count = data.TotalRecord;
            
        });
    }
  
    $scope.getData = function (curPage) {
     
        if ($scope.PerPage > 100) {
            $scope.PerPage = 100;
            $scope.currentPage = curPage;
            GetBankAccountPaged($scope.currentPage);
            alertify.log('Maximum record  per page is 100', 'error', '5000');
         
        }
        else if ($scope.PerPage < 1) {
            $scope.PerPage = 1;
            $scope.currentPage = curPage;
            GetBankAccountPaged($scope.currentPage);
            alertify.log('Minimum record  per page is 1', 'error', '5000');
        }
        else {
            $scope.currentPage = curPage;
            GetBankAccountPaged($scope.currentPage);
       
        }
    }

    $scope.Delete = function () {
        alertify.confirm("Are you sure to delete?", function (e) {
            if (e) {
                var parms = JSON.stringify({ roleId: $scope.s_Role.RoleId });
                $http.post('/BankAccount/Delete', parms).success(function (data) {
                    if (data > 0) {
                       
                        alertify.log('Role Deleted Successfully!', 'success', '5000');
                        Clear();
                    } else {
                        alertify.log('Delete Failed!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
        });
    };

});
