
app.directive('companyDirective', [function () {
    return {
        restrict: 'EA',
        controller: function ($scope, $rootScope, $http, $cookieStore, $window) {
            $scope.name = 'My name is directive controller';
            
            $scope.name = 'Shuvo';

            ClearCompany();
            function ClearCompany() {
                var UserData = sessionStorage.getItem("UserDataSession");
            if (UserData != null) {
                $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            }
                $scope.UserId = $scope.LoginUser.UserId;

                var PermissionData = sessionStorage.getItem("PermissionDataSession");
                if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
                $scope.ScreenId = Permission.find(v => v.ScreenName == 'Company').ScreenId;
                GetUsersPermissionDetails();

                $scope.ScreenLockInfo = [];
                //ScreenLock();
                $scope.isDefaultBilling = false;
                $scope.isDefaultDelivery = false;
                //$scope.emplyoeeid = 0;
                $scope.EmployeeList = [];
                $scope.companyList = [];
                $scope.supplierlist = [];
                $scope.companyAddresslist = [];
                $scope.companyBillPolicylist = [];
                $scope.companyTypeList = [];
                $scope.Branchlist = [];
                $scope.msgAlert = "Save";
                $scope.hidePayable = true;
                $scope.duplicateCompName = false;
                $scope.duplicateCompCode = false;
                $scope.IsUpdate = false
                $scope.ad_Company = {};
                $scope.company = {};
                $scope.ad_Company.CompanyWiseSupplierId = 0;
                $scope.ad_Company.SupplierId = 0;
                $scope.ad_Company.IsSupplier = false;
                $scope.ddlCompanyType = null;
                $scope.ddlBranch = null;
                $scope.ad_Company.CompanyId = 0;
                $scope.ad_Company.IsActive = true;
                $scope.ddlEmployeeRef = null;
                $scope.buttonSupp = "Save";
                $scope.btnDeleteShow = false;
                $scope.ConfirmationMessageForAdmin = false;
                GetConfirmationMessageForAdmin();
                GetAllCompanyType();
                GetAllEmployee();
                GetSupplier();
                ClearCompanyAddress();
                ClearCompanyBillPolicy();
                //GetUsersPermissionDetails();
            }

            //$scope.GetEmpIdForCompany = function () {
            //    var val = $('#ddlEmployeeRef').val()
            //    var xyz = $('#ddlEmployeeRefid option').filter(function () {
            //        return this.value == val;
            //    }).data('xyz');


            //    $scope.emplyoeeid = xyz;

            //}

            function GetAllEmployee() {
                $http({
                    url: '/Employee/GetAllEmployee',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    angular.forEach(data, function (aData) {
                        if (aData.BranchId == 1) {
                            $scope.EmployeeList.push(aData);
                        }
                    })
                });
            }

            function GetAllCompanyType() {
                var criteria = " [IsActive]=1";
                $http({
                    url: '/Company/GetCompanyType?searchCriteria=' + criteria + '&orderBy=CompanyTypeName',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.CompanyTypeList = data;
                });
            }
            //$scope.GetSupplier = function () {
            //    GetSupplier();
            //}
            function GetSupplier() {
                $http({
                    url: '/Supplier/GetAllSuppler',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.supplierlist = data;
                    $scope.supplierlist.unshift({ SupplierId: 0, SupplierName: 'Select Supplier'});
                })
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
            $scope.stopProp = function () {
                event.stopPropagation();
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



            function GetCompanyAddress(code) {
                $http({
                    url: '/Company/GetCompanyAddressByCompanyId',
                    method: "GET",
                    params: { companyId: code },
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.companyAddresslist = [];
                    var slNo = 1;
                    angular.forEach(data, function (aData) {
                        var companyAddress = {};
                        companyAddress = aData;
                        companyAddress.Status = 'No';
                        if (aData.IsDefault) {
                            companyAddress.Status = 'Yes';
                        }
                        companyAddress.SlNo = slNo;
                        $scope.companyAddresslist.push(aData);
                        slNo++;
                    });
                });
            }

            function GetCompanyBillPolicy(code) {
                $http({
                    url: '/Company/GetCompanyBillPolicyByCompanyId',
                    method: "GET",
                    params: { companyId: code },
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    $scope.companyBillPolicylist = [];
                    var slNo = 1;
                    angular.forEach(data, function (aData) {
                        var companyBillPolicy = {};
                        companyBillPolicy = aData;
                        companyBillPolicy.SlNo = slNo;
                        $scope.companyBillPolicylist.push(aData);
                        slNo++;
                    });

                    $scope.companyBillPolicylist = data;
                });
            }

            function ClearCompanyAddress() {
                $scope.ad_CompanyAddress = new Object();
                $scope.ad_CompanyAddress.AddressType = 'Billing';
                $scope.ad_CompanyAddress.IsDefault = true;
                $scope.buttonComAddress = "Add";
                $scope.btnSuppAddressDeleteShow = false;
                $scope.addressRowIndex = '';
            }

            function ClearCompanyBillPolicy() {
                $scope.ad_CompanyBillPolicy = new Object();
                $scope.buttonBillPolicy = "Add";
                $scope.btnSuppBillPolicyDeleteShow = false;
                $scope.billRowIndex = '';
            }

            function SaveCompany() {
                $.ajax({
                    url: "/Company/SaveCompany",
                    contentType: "application/json;charset=utf-8",
                    type: "POST",
                    data: JSON.stringify({ _ad_Company: $scope.ad_Company, _ad_CompanyAddressList: $scope.companyAddresslist, ad_CompanyBillPolicyList: $scope.companyBillPolicylist }),
                    success: function (data) {
                        if (data > 0) {
                            if ($scope.ad_Company.CompanyId > 0) {
                                alertify.log('Company Details Updated Successfully.', 'success', '5000');
                            } else {
                                alertify.log('Company Details Saved Successfully.', 'success', '5000');
                            }
                            //GetAllCompanyLoad();
                            
                            ClearCompany();
                            $('#ddlEmployeeRef').select2('destroy');
                            $('#ddlEmployeeRef').val('').select2({
                                placeholder: "Search for: Referece Employee",
                                theme: "classic",
                                dropdownAutoWidth: false
                            });
                            $('#supplierId').select2('destroy');
                            $('#supplierId').val('').select2({
                                placeholder: "Select Supplier",
                                //theme: "classic",
                                dropdownAutoWidth: false
                            });
                            $scope.ddlEmployeeRef = null;
                            $scope.ddlSupplier = null;
                            $scope.companyEntryForm.$setPristine();
                            $scope.companyEntryForm.$setUntouched();
                        }
                        else {
                            alertify.log('Server Errors!', 'error', '5000');
                        }
                    },
                    error: function () {
                        alertify.log('Server Errors!', 'error', '5000');
                    }
                });
            }

            //Company Save,Edit,Delete start form here
            $scope.CheckDuplicateCompanyName = function () {
                var criteria = " [CompanyName]='" + $scope.ad_Company.CompanyName + "'";
                if ($scope.ad_Company.CompanyId > 0) {
                    criteria += " AND CompanyId<>" + $scope.ad_Company.CompanyId;
                }

                $http({
                    url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + '&orderBy=CompanyId',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length > 0) {
                        $scope.duplicateCompName = true;
                        alertify.log($scope.ad_Company.CompanyName + ' Name No. already exists!', 'already', '5000');
                        $('#txtCompanyName').focus();
                    } else {
                        $scope.duplicateCompName = false;
                    }
                });
            }

            $scope.CheckDuplicateCompanyCode = function () {
                var criteria = " [CompanyCode]='" + $scope.ad_Company.CompanyCode + "'";
                if ($scope.ad_Company.CompanyId > 0) {
                    criteria += " AND CompanyId<>" + $scope.ad_Company.CompanyId;
                }

                $http({
                    url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + '&orderBy=CompanyId',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length > 0) {
                        $scope.duplicateCompCode = true;
                        alertify.log('Code "' + $scope.ad_Company.CompanyCode + '" No. already exists!', 'already', '5000');
                        $('#txtCompanyCode').focus();
                    } else {
                        $scope.duplicateCompCode = false;
                    }
                });
            }

            $scope.AddCompany = function () {
                if ($scope.companyAddresslist.length < 1) {
                    alertify.log('At least one address is required with default!', 'error', '5000');
                    return;
                }

                var Address1 = false;
                var Address2 = false;

                angular.forEach($scope.companyAddresslist, function (data) {
                    if (data.AddressType == 'Billing') {
                        Address1 = true;
                    }
                    if (data.AddressType == 'Delivery') {
                        Address2 = true;
                    }
                });

                if (!Address1 || !Address2) {
                    alertify.log('Minimum one of Each Type is Required!', 'error', '5000');
                    return;
                }

                var hasDefaultAddress = Enumerable.From($scope.companyAddresslist).Where('$.IsDefault').FirstOrDefault();
                if (hasDefaultAddress == null || angular.isUndefined(hasDefaultAddress)) {
                    alertify.log('One default address is required!', 'error', '5000');
                    return;
                }
                //alert($scope.emplyoeeid)
                //$scope.ddlEmployeeRef.EmployeeId = $scope.emplyoeeid;

                //if ($scope.emplyoeeid != 0) {
                //    $scope.ad_Company.RefEmployeeId = $scope.emplyoeeid;
                //}


                $scope.ad_Company.CreatorId = $scope.UserId;
                $scope.ad_Company.UpdatorId = $scope.UserId;
                //$scope.ad_Company.RefEmployeeId = $scope.emplyoeeid;
                //alert($scope.ad_Company.RefEmployeeId);
                $scope.ad_Company.CompanyTypeId = $scope.ddlCompanyType.CompanyTypeId;
                if ($scope.ConfirmationMessageForAdmin) {
                    if ($scope.ad_Company.CompanyId == 0 && $scope.CreatePermission) {
                        alertify.confirm("Are you sure to save?", function (e) {
                            if (e) {
                                SaveCompany();
                            }
                        })
                    }
                    else if ($scope.ad_Company.CompanyId == 0 && !$scope.CreatePermission) {
                        alertify.log('You do not have permission to save!', 'error', '5000');
                    }
                    else if ($scope.ad_Company.CompanyId > 0 && $scope.RevisePermission) {
                        alertify.confirm("Are you sure to update?", function (e) {
                            if (e) {
                                SaveCompany();
                            }
                        })
                    }
                    else if ($scope.ad_Company.CompanyId > 0 && !$scope.RevisePermission) {
                        alertify.log('You do not have permission to Update!', 'error', '5000');
                    }
                }
                else {
                    if ($scope.ad_Company.CompanyId == 0 && $scope.CreatePermission) {
                        SaveCompany();
                    }
                    else if ($scope.ad_Company.CompanyId == 0 && !$scope.CreatePermission) {
                        alertify.log('You do not have permission to save!', 'error', '5000');
                    }
                    else if ($scope.ad_Company.CompanyId > 0 && $scope.RevisePermission) {
                        SaveCompany();
                    }
                    else if ($scope.ad_Company.CompanyId > 0 && !$scope.RevisePermission) {
                        alertify.log('You do not have permission to Update!', 'error', '5000');
                    }
                }
            }

            //Address Add, Edit, Delete starts from here 
            $scope.AddCompanyAddress = function () {

                var isExistDefaultBilling;
                var isExistDefaultDelivery;

                if ($scope.ad_CompanyAddress.IsDefault) {
                    $scope.ad_CompanyAddress.Status = 'Yes';
                }
                else {
                    $scope.ad_CompanyAddress.Status = 'No';
                }

                if ($scope.buttonComAddress == "Add") {
                    if (!$scope.companyAddresslist.length) {
                        $scope.ad_CompanyAddress.SlNo = 1;
                    } else {
                        $scope.ad_CompanyAddress.SlNo = Enumerable.From($scope.companyAddresslist).Max('$.SlNo') + 1;
                    }
                    if (!$scope.companyAddresslist.length) {
                        $scope.companyAddresslist.push($scope.ad_CompanyAddress);
                    }
                    else {
                        if (!$scope.isDefaultBilling) {
                            angular.forEach($scope.companyAddresslist, function (aAddress) {
                                if (aAddress.AddressType == $scope.ad_CompanyAddress.AddressType && aAddress.IsDefault == $scope.ad_CompanyAddress.IsDefault) {
                                    if ($scope.ad_CompanyAddress.AddressType == 'Billing') {
                                        isExistDefaultBilling = aAddress;
                                    }
                                }
                            });
                            if (isExistDefaultBilling && $scope.ad_CompanyAddress.IsDefault) {
                                $scope.isDefaultBilling = true;
                            }
                        }
                        if (!$scope.isDefaultDelivery) {
                            angular.forEach($scope.companyAddresslist, function (aAddress) {
                                if (aAddress.AddressType == $scope.ad_CompanyAddress.AddressType && aAddress.IsDefault == $scope.ad_CompanyAddress.IsDefault) {
                                    if ($scope.ad_CompanyAddress.AddressType == 'Delivery') {
                                        isExistDefaultDelivery = aAddress;
                                    }

                                }
                            });
                            if (isExistDefaultDelivery && $scope.ad_CompanyAddress.IsDefault) {
                                $scope.isDefaultDelivery = true;
                            }
                        }
                        if ($scope.isDefaultBilling) {
                            alertify.log('Already billing address has default value', 'error', '5000');
                            $scope.isDefaultBilling = false;
                            return;
                        }
                        else if ($scope.isDefaultDelivery) {
                            alertify.log('Already delivery address has default value', 'error', '5000');
                            $scope.isDefaultDelivery = false;
                            return;
                        }
                        if (!$scope.isDefaultBilling || !$scope.isDefaultDelivery) {
                            $scope.companyAddresslist.push($scope.ad_CompanyAddress);
                        }
                    }

                    $scope.companyEntryForm.$setPristine();
                    $scope.companyEntryForm.$setUntouched();
                } else {
                    console.log(" update");
                    //var checkAddressForUpdate = Enumerable.From($scope.companyAddresslist).Where('$.Address =="' + $scope.ad_CompanyAddress.Address + '" && $.SlNo!=' + $scope.ad_CompanyAddress.SlNo).FirstOrDefault();
                    var updateAddress = Enumerable.From($scope.companyAddresslist).Where('$.SlNo==' + $scope.ad_CompanyAddress.SlNo).FirstOrDefault();
                    //if (checkAddressForUpdate == null || angular.isUndefined(checkAddressForUpdate)) {
                        updateAddress.Address = $scope.ad_CompanyAddress.Address;
                        updateAddress.BIN = $scope.ad_CompanyAddress.BIN;
                    //}

                    $scope.companyEntryForm.$setPristine();
                    $scope.companyEntryForm.$setUntouched();
                }
                $("#tbxCompanyAddressHidden").val("");
                ClearCompanyAddress();
                $scope.IsUpdate = false;
            };

            $scope.CheckDefault = function (defaultAdd) {
                if (defaultAdd) {
                    angular.forEach($scope.companyAddresslist, function (address) {
                        if ($scope.ad_CompanyAddress.AddressType == 'Delivery') {
                            if (address.Status == 'Yes' && address.AddressType == 'Delivery') {
                                alertify.log('One Default Delivery Address Accepted!', 'error', '5000');
                                $scope.ad_CompanyAddress.IsDefault = false;
                                return;
                            }
                        }
                        if ($scope.ad_CompanyAddress.AddressType == 'Billing') {
                            if (address.Status == 'Yes' && address.AddressType == 'Billing') {
                                alertify.log('One Default Billing Address Accepted!', 'error', '5000');
                                $scope.ad_CompanyAddress.IsDefault = false;
                                return;
                            }
                        }
                    });
                }
            };

            $scope.CheckCompanyAddress = function (IsCompany) {

                if (IsCompany) {
                    //alert(IsCompany + " IsCompany");
                    $scope.ad_CompanyAddress.AddressCompanyName = $scope.ad_Company.CompanyName;

                }
                if (!IsCompany) {
                    //alert(IsCompany + " IsCompany");
                    $("#AddressCompanyName").focus();
                    $scope.ad_CompanyAddress.AddressCompanyName = "";
                }


            }

            $scope.SelCompanyAddress = function (companyAddress) {
                $("#tbxCompanyAddressHidden").val(companyAddress.Address);
                $scope.ad_CompanyAddress = companyAddress;
                $scope.buttonComAddress = "Change";
                $scope.IsUpdate = true;
            };

            $scope.removeAddress = function (aCompanyAddress) {
                var ind = $scope.companyAddresslist.indexOf(aCompanyAddress);
                $scope.companyAddresslist.splice(ind, 1);
                ClearCompanyAddress();
            }

            //Bill Policy Add, Edit, Delete starts from here
            $scope.AddCompanyBillPolicy = function () {

                if ($scope.buttonBillPolicy == "Add") {

                    if (!$scope.companyBillPolicylist.length) {
                        $scope.ad_CompanyBillPolicy.SlNo = 1;
                    } else {
                        $scope.ad_CompanyBillPolicy.SlNo = Enumerable.From($scope.companyBillPolicylist).Max('$.SlNo') + 1;
                    }
                    var checkPolicy = Enumerable.From($scope.companyBillPolicylist).Where('$.PolicyDescription =="' + $scope.ad_CompanyBillPolicy.PolicyDescription + '"').FirstOrDefault();
                    if (checkPolicy != null || !angular.isUndefined(checkPolicy)) {
                        alertify.log('Bill Policy <b style="color:yellow">' + $scope.ad_CompanyBillPolicy.PolicyDescription + '</b> Already Added!', 'error', '5000');
                        $("#tbxPolicy").focus();
                        return;
                    }
                    $scope.companyBillPolicylist.push($scope.ad_CompanyBillPolicy);

                    $scope.companyEntryForm.$setPristine();
                    $scope.companyEntryForm.$setUntouched();
                } else {
                    var checkUpdateBPolicy = Enumerable.From($scope.companyBillPolicylist).Where('$.PolicyDescription =="' + $scope.ad_CompanyBillPolicy.PolicyDescription + '" && $.SlNo!=' + $scope.ad_CompanyBillPolicy.SlNo).FirstOrDefault();
                    var updateBillPolicy = Enumerable.From($scope.companyBillPolicylist).Where('$.SlNo==' + $scope.ad_CompanyBillPolicy.SlNo).FirstOrDefault();
                    if (checkUpdateBPolicy == null || angular.isUndefined(checkUpdateBPolicy)) {
                        updateBillPolicy.PolicyDescription = $scope.ad_CompanyBillPolicy.PolicyDescription;
                    } else {
                        updateBillPolicy.PolicyDescription = $("#tbxPolicyHidden").val();
                        alertify.log('Bill Policy <b style="color:yellow">' + checkUpdateBPolicy.PolicyDescription + '</b> Already Added!', 'error', '5000');
                        $("#tbxPolicy").focus();
                    }
                }
                $("#tbxPolicyHidden").val("");
                ClearCompanyBillPolicy();

            };

            $scope.SelCompanyBillPolicy = function (customerbillpolicy, index) {
                $("#tbxPolicyHidden").val(customerbillpolicy.PolicyDescription);
                $scope.ad_CompanyBillPolicy = customerbillpolicy;
                $scope.buttonBillPolicy = "Change";
                $scope.btnSuppBillPolicyDeleteShow = true;
            };

            $scope.removeBillPolicy = function (aBillPolicy) {
                var ind = $scope.companyBillPolicylist.indexOf(aBillPolicy);
                $scope.companyBillPolicylist.splice(ind, 1);
                ClearCompanyBillPolicy();
            },

                $scope.Delete = function () {
                    alertify.confirm("Are you sure to delete?", function (e) {
                        if (e) {
                            var parms = JSON.stringify({ CompanyId: $scope.ad_Company.CompanyId });
                            $http.post('/CustomerEntry/DeleteCustomer', parms).success(function (data) {
                                if (data > 0) {
                                    alertify.log('Company( ' + $scope.ad_Company.CompanyCode + ' ) Deleted Successfully!', 'success', '5000');
                                    ClearCompany();
                                } else {
                                    alertify.log('Delete Failed!', 'error', '5000');
                                }
                            }).error(function (data) {
                                alertify.log('Server Errors!', 'error', '5000');
                            });
                        }
                    });
                };

           

            $scope.foundChange = function () {
                $scope.duplicateCompName = true;
                $scope.duplicateCompCode = true;
            };
            function SelCompany(Company) {

                $scope.ad_Company = Company;
                $scope.ddlCompanyType = { "CompanyTypeId": $scope.ad_Company.CompanyTypeId };

                //$('#ddlEmployeeRef').select2('destroy');
                //$('#ddlEmployeeRef').val($scope.ad_Company.RefEmployeeId).select2();
                
                setTimeout(function () {

                    $("#ddlEmployeeRef").select2().val($scope.ad_Company.RefEmployeeId).trigger("change");

                }, 0);

                if ($scope.ad_Company.SupplierId > 0) {
                    $('#supplierId').select2('destroy');
                    $('#supplierId').val($scope.ad_Company.SupplierId).select2();

                    $scope.ad_Company.IsSupplier = true;
                }
                

                GetCompanyAddress($scope.ad_Company.CompanyId);
                GetCompanyBillPolicy($scope.ad_Company.CompanyId);
                $scope.buttonSupp = "Update";
                $scope.btnDeleteShow = false;
                $window.scrollTo(0, 0);
            }
            $scope.SelCompany = function (Company) {
                SelCompany(Company);

            };


            function resetForm() {
                $('#ddlEmployeeRef').select2('destroy');
                $('#ddlEmployeeRef').val('').select2({
                    placeholder: "Search for: Referece Employee",
                    theme: "classic",
                    dropdownAutoWidth: false
                });
                $scope.ddlEmployeeRef = null;
                ClearCompany();
                $scope.company = null;
                
                $scope.companyEntryForm.$setPristine();
                $scope.companyEntryForm.$setUntouched();
            }
            $scope.resetForm1 = function () {
                resetForm();
            };
            $scope.$on('ResetForm', function (event) {
                resetForm();
            });
            $scope.$on('EditCompany', function (event, company) {
                if ($scope.company.IsNew == undefined) {
                    $scope.company = company;
                   
                }
                
                SelCompany($scope.company);
            });

           
            function GetAllCompanyLoad() {
                var criteria = "C.IsActive=1";
                $http({
                    url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyId",
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (companyList) {
                    $rootScope.companyList = companyList;

                    if ($scope.company != null || $scope.company != undefined) {
                        var SelectedCompany = $rootScope.companyList.find(company => company.CompanyId === $scope.company.CompanyId);
                        SelectedCompany.IsNew = false;

                        $scope.company = SelectedCompany;
                    } else {
                        var SelectedCompany = _.last($rootScope.companyList);
                        SelectedCompany.IsNew = true;
                        $scope.company = SelectedCompany;
                    }

                    $scope.$broadcast('updateCompany', SelectedCompany, $rootScope.companyList);
                })
            };

            


        },
        scope: {
            component: '=data'
        },
        link: function (scope, element, attrs, vm) {

        },

        templateUrl: "/SPA/ReusableComponent/CompanyEntryComponent/CompanyEntryReuse.html"
    };
}]);