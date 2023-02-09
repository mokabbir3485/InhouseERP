app.controller("BankDocumentEntryController", function ($scope, $rootScope, $http, $window, $filter) {

    Clear();

    function Clear() {

        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.UserId = $scope.LoginUser.UserId;
        $scope.FullName = $scope.LoginUser.FullName;

        var PermissionData = sessionStorage.getItem("PermissionDataSession");
        if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
        $scope.ScreenId = Permission.find(v => v.ScreenName == 'Bank Document').ScreenId;
        GetUsersPermissionDetails();

        $scope.IsUpdate = false;
        $scope.ddlBankAccount = null;
        $scope.BankAccountList = [];
        $scope.BankDocumentlist = [];
        $scope.IsDisable = true;
        $scope.BankDocumentDetaillist = [];
        $scope.BankDocumentDetail = {};

        GetAllBankAccount();
        $scope.ConfirmationMessageForAdmin = false;
        GetConfirmationMessageForAdmin();
        GetUsersPermissionDetails();
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
    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (aData) {
                if (aData.AccountFor == 'Customer') {
                    aData.TempBankName = aData.CompanyName + "  ~  " + aData.BankName + "  ~  " + aData.BranchName + "  ~  " + aData.AccountNo + "  ~  " + aData.BIN;
                    $scope.BankAccountList.push(aData);
                }
               
            })
        });
    }

    $scope.ResetBankDocumentDetail = function () {
        $scope.BankDocumentlist = [];
    }

    $scope.DefaultBankDocumentDetail = function () {
        $scope.BankDocumentlist = [
            { NameOfDocument: 'BILL OF EXCHANGE', OriginSet: '01 + 02 Copies', Sets: '01' },
            { NameOfDocument: 'BILL OF EXCHANGE', OriginSet: '01 + 02 Copies', Sets: '01' },
            { NameOfDocument: 'DELIVERY CHALLAN', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'TRUCK CHALLAN', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'PACKING LIST', OriginSet: '01 + 04 Copies', Sets: '01' },
            { NameOfDocument: 'COMMERCIAL INVOICE', OriginSet: '01 + 08 Copies', Sets: '01' },
            { NameOfDocument: "BENEFICIARY'S CERTIFICATE", OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'CERTIFICATE OF ORIGIN', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'LC COPY', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'PROFORMA INVOICE', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'BILL OF ENTRY/ EXPORT', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'EXP ORIGINAL', OriginSet: '01', Sets: '01' },
            { NameOfDocument: 'EXPORT PERMIT', OriginSet: '01', Sets: '01' }
        ];
    }

    $scope.GetBankDocumentlistByBankAccountId = function () {
        $scope.IsDisable = false;
        $http({
            url: '/BankDocumentEntry/GetBankDocumentlistByBankAccountId?BankAccountId=' + $scope.ddlBankAccount.BankAccountId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length != 0) {
                alert("Bank document has already saved.You can update it.");
                $scope.BankDocumentlist = data;
                $scope.IsUpdate = true;
            } else {
                alertify.log('Bank document not found! Please click Load default button or Add data Manually.', 'error', '7000');
            }
        });
    }

    $scope.AddBankDocumentDetail = function () {
        if ($scope.SN == undefined || $scope.SN == null) {
            $scope.BankDocumentlist.push($scope.BankDocumentDetail);
        } else {
            $scope.BankDocumentlist.splice($scope.SN - 1, 0, $scope.BankDocumentDetail);
            $scope.SN = null;
        }
        
        $scope.BankDocumentDetail = {};
        $scope.BankDocumentEntry.$setPristine();
        $scope.BankDocumentEntry.$setUntouched();

    };

    $scope.removeDocumentName = function (aBankDocument) {
            var ind = $scope.BankDocumentlist.indexOf(aBankDocument);
            $scope.BankDocumentlist.splice(ind, 1);
        
    };
    function PostBankDocument() {
        angular.forEach($scope.BankDocumentlist, function (aData) {
            aData.BankAccountId = $scope.ddlBankAccount.BankAccountId;
            aData.UpdatedBy = $scope.LoginUser.UpdatorId;
            aData.UpdatedDate = null;

        })
        var params = JSON.stringify({ BankDocumentlist: $scope.BankDocumentlist });
        $http.post('/BankDocumentEntry/Post', params).success(function (data) {
            if (data > 0) {
                alertify.log('Bank Document saved successfully!', 'success', '5000');
                Clear();
            }
        }).error(function (msg) {
            alertify.log('Save failed, refresh page and try again', 'error', '5000');
        });
    }

    $scope.Save = function () {
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.IsUpdate == false && $scope.CreatePermission) {
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        PostBankDocument();
                    }
                })
            }
            else if ($scope.IsUpdate == false && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.IsUpdate == true && $scope.RevisePermission) {
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        PostBankDocument();
                    }
                })
            }
            else if ($scope.IsUpdate == true && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        else {
            if ($scope.IsUpdate == false && $scope.CreatePermission) {
                PostBankDocument();
            }
            else if ($scope.IsUpdate == false && !$scope.CreatePermission) {
                alertify.log('You do not have permission to save!', 'error', '5000');
            }
            else if ($scope.IsUpdate == true && $scope.RevisePermission) {
                PostBankDocument();
            }
            else if ($scope.IsUpdate == true && !$scope.RevisePermission) {
                alertify.log('You do not have permission to Update!', 'error', '5000');
            }
        }
        
    }


    $scope.Reset = function () {
        Clear();
    }


})