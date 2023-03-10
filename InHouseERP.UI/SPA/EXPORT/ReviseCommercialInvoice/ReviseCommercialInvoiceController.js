app.controller("ReviseCommercialInvoiceController", function ($scope, hotkeys, $cookieStore, $http, $filter, $window) {
    
    function Clear() {
        var UserData = sessionStorage.getItem("UserDataSession");
        if (UserData != null) {
            $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
        }
        $scope.FullName = $scope.LoginUser.FullName;

        $scope.POReference = {};
        $scope.POReferencelist = [];
        $scope.POReferencelistTemp = [];
        $scope.productList = [];
        $scope.productListTemp = [];
        $scope.duplicateProduct = [];
        $scope.margeProduct = [];
        $scope.chkDisable = true;
        $scope.btnSwapDisable = true;
        $scope.btnRemoveEditDisable = true;
        $scope.DisddlImpoter = true;
        $scope.invalid = false;
        $scope.btnRemoveHide = false;
        $scope.isInfoShow = false;
        $scope.row_numP1 = null;
        $scope.indexForCheck = 0;
        $scope.index = 0;
        $scope.counter = 0;
        $scope.baseHeaderCount = 0;
        $scope.baseRowCount = 0;
        $scope.CiCheck = '';
        $scope.IsCiNoExist = '';
        $scope.ddlPaymentProcessType = '';
        $scope.ddlImporterBank = '';
        $scope.ddlImporter = null;
        $scope.ddlExporterBank = '';
        $scope.Count = 0;
        $scope.column_num = 0;
        $scope.row_num = 0;
        $scope.CountAmount = 0;
        $scope.AppSorting = 0;
        $scope.LcInfoSorting = 0;
        $scope.ImpoterBankInfoSorting = 0;
        $scope.CiFooterSorting = 0;
        $scope.DcFooterSorting = 0;
        $scope.InvCount = 0;
        $scope.AmountSumForItem = 0;
        $scope.QtySumForItem = 0;
        $scope.TotalCPTCost = 0;
        $scope.totalAmountWithCPT = 0;
        $scope.CiiInfo = [];
        $scope.AppInfo = {};
        $scope.LcInfo = {};
        $scope.CiFooter = {};
        $scope.DcFooter = {};
        $scope.ImpoterBankInfo = {};
        $scope.distCount = 1;
        $scope.exp_CommercialInvoice = {};
        $scope.exp_CommercialInvoiceDetail = {};
        $scope.CommercialInvoiceList = [];
        $scope.CommercialInvoiceInfoList = [];
        $scope.CompanyDropdownList = [];
        $scope.PaymentProcessList = [];
        $scope.AmendmentReasonList = [];
        $scope.HsCodeList = [];
        $scope.TableHtmlData = {};
        $scope.CustomiseTableDataList = [];
        $scope.CustomiseTableData = {};
        $scope.ItemTableHeaders1 = [];
        $scope.ItemTableHeadersN = [];
        $scope.ItemTableHeaders = [];
        $scope.ItemTableFooter = [];
        $scope.ItemTableFooterForCPT = [];
        $scope.ItemTableFooterForCPTTotal = [];
        $scope.ItemTableDataRow = [];
        $scope.ItemRow = [];
        $scope.PiRefDate = [];
        $scope.PiRefNo = [];
        $scope.PIH = 0;
        $scope.InvoiceSearchList = [];
        $scope.BankAccountList = [];
        $scope.ImporterBankList = [];
        $scope.ItemCategory = [];
        $scope.CommercialInvoiceDetailList = [];
        $scope.ad_BankAccount = {};
        $scope.ad_BankAccount.BankAccountId = 0;
        $scope.ad_BankAccount.IsActive = true;
        $scope.isEmpty = false;
        $scope.found = false;
        $scope.btnDeleleShow = false;
        $scope.itemFlag = false;
        $scope.ddlExpNo = null;
        $scope.ConfirmationMessageForAdmin = false;
        $scope.exp_CommercialInvoiceDetail.CommercialInvoiceDetailId = 0;
        $scope.exp_CommercialInvoice.CommercialInvoiceId = 0;
        $scope.exp_CommercialInvoice.IsActive = true;
        GetAllCommercialInvoice();
        GetAllPaymentProcess();
        GetConfirmationMessageForAdmin();
        $scope.InvoiceDropdownList = [];
        $scope.AfterUnmerge = [];
        $scope.InvoiceWiseItem = [];
        $scope.InvoiceWiseItemList = [];
        $scope.ItemLists = [];
        $scope.ExporterList = [];
        $scope.Show = true;
        $scope.ddlImporterBank = null;
        $scope.btnCI = "Save";
        GetAllPaymentProcessType();
        //$scope.PaymentProcessTypeList = [{ PaymentProcessType: 'LC' }, { PaymentProcessType: 'TT' }, { PaymentProcessType: 'FDD' }];
        $scope.PaymentProcessTypeList = [];
        $scope.AccountForList = [{ AccountFor: "Exporter" }, { AccountFor: "Customer" }, { AccountFor: "Salary" }];
        $scope.exp_CommercialInvoice.CommercialInvoiceNo = '';
        $scope.exp_CommercialInvoice.CiFooterValue1 = "We here by certify that the information on this Invoice is true and correct and that the contents of this shipment are as per Proforma Invoice.";
        $scope.exp_CommercialInvoice.DcFooter1 = "Delivery Challan should be treated as transport Document/Truck Receipt. The goods have been received by the applicants in good condition."
        $scope.exp_CommercialInvoice.ShipmentMode = "By Road, Dhaka, Bangladesh. Inco terms 2020";
        $scope.exp_CommercialInvoice.Covering = "Accessories For 100% Export Oriented Garments Industries are made in Bangladesh.";
        $scope.exp_CommercialInvoice.CountryOfOrigin = "Bangladesh";
        $scope.exp_CommercialInvoice.HsCode = "HS Code";
        $scope.exp_CommercialInvoice.MasterContactNo = "Master Contact No";
        $scope.exp_CommercialInvoice.TermsOfPayment = "";
        $scope.exp_CommercialInvoice.PiRefNo = '';
        $scope.exp_CommercialInvoice.PiRefDate = '';
        //packing info
        $scope.exp_PackingInfo = {};
        $scope.packingInfoCombind = {};
        $scope.packingInfo = {};
        $scope.PackingInfoList = [];
        $scope.LcNoWiseItemList = [];
        $scope.ExporterBankList = [];
        $scope.exp_PackingInfo.PackingInfoId = 0;
        $scope.exp_PackingInfo.IsActive = true;
        $scope.test = [];
        $scope.exp_AmendmentRequest = {};
        $scope.companyList = [];
        GetInvoiceList();
        GetAllItem();
        getAllExporter();
        GetAllActiveCompany();
        GetExporterBankAccount();
        GetHsCode();
        GetAllSPCase();
        ReportNotificationDetail_Get();
        $scope.ReportNotificationDetailList = [];

        $scope.EmailSendNotification = {};

        $scope.AppNotificationSetupList = [];
        GetAppNotificationSetupByReportCode();
    }
    Clear();

    function ReportNotificationDetail_Get() {


        $http({
            url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'CIR',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.ReportNotificationDetailList = notification;


            // console.log('$scope.ReportNotificationDetailList',$scope.ReportNotificationDetailList);
        });

    }
    function GetAppNotificationSetupByReportCode() {
        $http({
            url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'CIR',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (notification) {
            $scope.AppNotificationSetupList = notification;
        });

    }
    function AppNotificationLogPost(exp_CommercialInvoice, NotificaitonTitle) {
        $scope.AppNotificationLogList = [];
        if ($scope.ddlImporter != null) {
            exp_CommercialInvoice.CompanyName = $scope.ddlImporter.CompanyName;
        }

        angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
            var obj = {}
            obj = aNotify
            obj.NotificaitonTitle = NotificaitonTitle
            obj.NotificationDetail = 'Commercial Invoice No: ' + exp_CommercialInvoice.CommercialInvoiceNo + ' Company Name: ' + exp_CommercialInvoice.CompanyName + ' Prepared By: ' + $scope.FullName;
            $scope.AppNotificationLogList.push(obj);

        })
        var params = JSON.stringify({ AppNotificationLogList: $scope.AppNotificationLogList });
        $http.post('/EmailNotificationSetup/AppNotificationLogPost', params).success(function (data) {
            if (data > 0) {

            }
            else {
                //alertify.log('Network Error, refresh page and try again', 'error', '5000');
            }
        }).error(function (msg) {
            //alertify.log('Network Error, refresh page and try again', 'error', '5000');
        });
    }
    $scope.getItemInfo = function () {
        if ($scope.isInfoShow == true) {
            $scope.isInfoShow = false;
        } else {
            $scope.isInfoShow = true;
        }
    };
    String.prototype.toProperCase = function () {
        return this.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    $scope.selectionAddressBilling = '';
    $("#AddressBilling").select(function () {
        $scope.selectionAddressBilling = window.getSelection().toString();
    });
    $scope.ChangeCaseAddressBilling = function (IsSelect) {
        if (IsSelect == true) {
            $scope.PreAddressBilling = angular.copy($scope.exp_CommercialInvoice.AddressBilling);
            if ($scope.selectionAddressBilling) {
                var ProperCase = $scope.selectionAddressBilling.toProperCase();
                $scope.exp_CommercialInvoice.AddressBilling = $scope.exp_CommercialInvoice.AddressBilling.replace($scope.selectionAddressBilling, ProperCase);
                $scope.selectionAddressBilling = '';
            }
        } else {
            $scope.exp_CommercialInvoice.AddressBilling = $scope.PreAddressBilling;
            $scope.PreAddressBilling = '';
        }
    }

    $scope.selectionAddressDelivery = '';
    $("#AddressDelivery").select(function () {
        $scope.selectionAddressDelivery = window.getSelection().toString();
    });
    $scope.ChangeCaseAddressDelivery = function (IsSelect) {
        if (IsSelect == true) {
            $scope.PreAddressDelivery = angular.copy($scope.exp_CommercialInvoice.AddressDelivery);
            if ($scope.selectionAddressDelivery) {
                var ProperCase = $scope.selectionAddressDelivery.toProperCase();
                $scope.exp_CommercialInvoice.AddressDelivery = $scope.exp_CommercialInvoice.AddressDelivery.replace($scope.selectionAddressDelivery, ProperCase);
                $scope.selectionAddressDelivery = '';
            }
        } else {
            $scope.exp_CommercialInvoice.AddressDelivery = $scope.PreAddressDelivery;
            $scope.PreAddressDelivery = '';
        }
    }

    $scope.selectionTermsOfPayment = '';
    $("#TermsOfPayment").select(function () {
        $scope.selectionTermsOfPayment = window.getSelection().toString();
    });
    $scope.ChangeCaseTermsOfPayment = function (IsSelect) {
        if (IsSelect == true) {
            $scope.PreTermsOfPayment = angular.copy($scope.exp_CommercialInvoice.TermsOfPayment);
            if ($scope.selectionTermsOfPayment) {
                var ProperCase = $scope.selectionTermsOfPayment.toProperCase();
                $scope.exp_CommercialInvoice.TermsOfPayment = $scope.exp_CommercialInvoice.TermsOfPayment.replace($scope.selectionTermsOfPayment, ProperCase);
                $scope.selectionTermsOfPayment = '';
            }
        } else {
            $scope.exp_CommercialInvoice.TermsOfPayment = $scope.PreTermsOfPayment;
            $scope.PreTermsOfPayment = '';
        }
    }

    $scope.selectionShipmentMode = '';
    $("#ShipmentMode").select(function () {
        $scope.selectionShipmentMode = window.getSelection().toString();
    });
    $scope.ChangeCaseShipmentMode = function (IsSelect) {
        if (IsSelect == true) {
            $scope.PreShipmentMode = angular.copy($scope.exp_CommercialInvoice.ShipmentMode);
            if ($scope.selectionShipmentMode) {
                var ProperCase = $scope.selectionShipmentMode.toProperCase();
                $scope.exp_CommercialInvoice.ShipmentMode = $scope.exp_CommercialInvoice.ShipmentMode.replace($scope.selectionShipmentMode, ProperCase);
                $scope.selectionShipmentMode = '';
            }
        } else {
            $scope.exp_CommercialInvoice.ShipmentMode = $scope.PreShipmentMode;
            $scope.PreShipmentMode = '';
        }
    }
    function GetAllPaymentProcessType() {
        $http({
            url: "/ExpCommercialInvoice/GetAllPaymentProcessType",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.PaymentProcessTypeList = data;
            $scope.PaymentProcessTypeList.shift();
            $scope.PaymentProcessTypeList.reverse();
        })
    }
    $scope.PaymentProcessTypeChange = function () {
        PaymentProcessTypeChange();
    }

    function PaymentProcessTypeChange() {
        if ($scope.exp_CommercialInvoice.PaymentProcessTypeId == 4) {
            $scope.exp_CommercialInvoice.TermsOfPayment = "";
            $scope.exp_CommercialInvoice.CiFooterValue1 = "We here by certify that the information on this Invoice is true and correct and that the contents of this shipment are as per Proforma Invoice.";
        } else if ($scope.exp_CommercialInvoice.PaymentProcessTypeId == 2) {
            $scope.exp_CommercialInvoice.LcScNo = '';
            $scope.exp_CommercialInvoice.LcScDate = null;
            $scope.exp_CommercialInvoice.TermsOfPayment = "By TT";
            $scope.exp_CommercialInvoice.CiFooterValue1 = "We here by certify that the information on this Invoice is true and correct and that the contents of this shipment are as per Sales Contract.";
        } else if ($scope.exp_CommercialInvoice.PaymentProcessTypeId == 3) {
            $scope.exp_CommercialInvoice.LcScNo = '';
            $scope.exp_CommercialInvoice.LcScDate = null;
            $scope.exp_CommercialInvoice.TermsOfPayment = "By FDD";
            $scope.exp_CommercialInvoice.CiFooterValue1 = "We here by certify that the information on this Invoice is true and correct and that the contents of this shipment are as per Sales Contract.";
        }
    }
    function ClearBankField() {
        $scope.AccountForList = [{ AccountFor: "Exporter" }, { AccountFor: "Customer" }, { AccountFor: "Salary" }];
        $scope.BankAccountList = [];
        $scope.CompanyList = [];
        $scope.CompanyDropdownList = [];
        $scope.ad_BankAccount = {};
        $scope.ddlAccountFor = undefined;
        $scope.ad_BankAccount.BankAccountId = 0;
        $scope.ad_BankAccount.IsActive = true;
        $scope.btnDeleleShow = false;
        $scope.button = "Save";
        GetActiveCompany();
        GetAllBankAccount();

    }
    function changeImpoterReset() {
        $scope.ddlImporterBank = '';
        $scope.ddlExporterBank = '';
        $scope.exp_CommercialInvoice.LcScNo = '';
        $scope.exp_CommercialInvoice.LcScDate = '';
        $scope.exp_CommercialInvoice.ImporterBankBin = '';
        $scope.exp_CommercialInvoice.ExporterBankInfo = '';
        $scope.exp_CommercialInvoice.PiRefNo = '';
        $scope.exp_CommercialInvoice.ExpNo = '';
        $scope.exp_CommercialInvoice.CommercialInvoiceDate = '';
        $scope.exp_CommercialInvoice.PiRefDate = '';
        $scope.exp_CommercialInvoice.ExpDate = '';
        //$scope.exp_CommercialInvoice.HsCode = '';
        //$scope.exp_CommercialInvoice.TermsOfPayment = '';
        //$scope.exp_CommercialInvoice.ShipmentMode = '';
        //$scope.exp_CommercialInvoice.Covering = '';
        //$scope.exp_CommercialInvoice.CountryOfOrigin = '';
        //$scope.exp_CommercialInvoice.MasterContactNo = '';
        $scope.exp_CommercialInvoice.AppLabel1 = '';
        $scope.exp_CommercialInvoice.AppValue1 = '';
        $scope.exp_CommercialInvoice.AppLabel2 = '';
        $scope.exp_CommercialInvoice.AppValue2 = '';
        $scope.exp_CommercialInvoice.AppLabel3 = '';
        $scope.exp_CommercialInvoice.AppValue3 = '';
        $scope.exp_CommercialInvoice.AppLabel4 = '';
        $scope.exp_CommercialInvoice.AppValue4 = '';
        $scope.exp_CommercialInvoice.AppLabel5 = '';
        $scope.exp_CommercialInvoice.AppValue5 = '';
        $scope.exp_CommercialInvoice.AppLabel6 = '';
        $scope.exp_CommercialInvoice.AppValue6 = '';
        $scope.exp_CommercialInvoice.AppLabel7 = '';
        $scope.exp_CommercialInvoice.AppValue7 = '';
        $scope.exp_CommercialInvoice.AppLabel8 = '';
        $scope.exp_CommercialInvoice.AppValue8 = '';
        $scope.exp_CommercialInvoice.AppLabel9 = '';
        $scope.exp_CommercialInvoice.AppValue9 = '';
        $scope.exp_CommercialInvoice.AppLabel10 = '';
        $scope.exp_CommercialInvoice.AppValue10 = '';
        $scope.exp_CommercialInvoice.LcInfoLabel1 = '';
        $scope.exp_CommercialInvoice.LcInfoValue1 = '';
        $scope.exp_CommercialInvoice.LcInfoLabel2 = '';
        $scope.exp_CommercialInvoice.LcInfoValue2 = '';
        $scope.exp_CommercialInvoice.LcInfoLabel3 = '';
        $scope.exp_CommercialInvoice.LcInfoValue3 = '';
        $scope.exp_CommercialInvoice.LcInfoLabel4 = '';
        $scope.exp_CommercialInvoice.LcInfoValue4 = '';
        $scope.exp_CommercialInvoice.LcInfoLabel5 = '';
        $scope.exp_CommercialInvoice.LcInfoValue5 = '';
        $scope.exp_CommercialInvoice.LcInfoLabel6 = '';
        $scope.exp_CommercialInvoice.LcInfoValue6 = '';
        //$scope.exp_CommercialInvoice.CiFooterValue1 = '';
        $scope.exp_CommercialInvoice.CiFooterValue2 = '';
        $scope.exp_CommercialInvoice.CiFooterValue3 = '';
        $scope.exp_CommercialInvoice.CiFooterValue4 = '';
        //$scope.exp_CommercialInvoice.DcFooter1 = '';
        $scope.exp_CommercialInvoice.DcFooter2 = '';
        $scope.exp_CommercialInvoice.DcFooter3 = '';
        $scope.exp_CommercialInvoice.DcFooter4 = '';
        $scope.exp_CommercialInvoice.BankInfoLabel1 = '';
        $scope.exp_CommercialInvoice.BankInfoValue1 = '';

    }
    //Dynamic Table Code
    //Juery part
    function newFun() {
        $scope.CustomiseTableDataList = [];
        var table = document.getElementById("ciTable");

        var x = 1, m = 0, l = 0;
        for (var s = 0; s < $scope.ItemTableHeadersN[0].length; s++) {
            for (l = 0; l < $scope.ItemTableDataRow.length; l++) {
                for (m = 0; m <= 1; m++) {
                    if (m === s) {

                        $scope.CustomiseTableData.Id = x++;
                        $scope.CustomiseTableData.RowNo = l + 1;
                        $scope.CustomiseTableData.ColName = $scope.ItemTableHeadersN[0][s];
                        $scope.CustomiseTableData.ColValue = $scope.ItemTableDataRow[l][s];
                        $scope.CustomiseTableDataList.push($scope.CustomiseTableData);
                        $scope.CustomiseTableData = {};

                    }

                }
            }
        }
        var pb = [[]];
        var tableRows = [];
        tableRows = Array.from(table.rows);
        /*if ($scope.exp_CommercialInvoice.IsCPT == true) {*/
            tableRows.splice(-2);
       /* }*/
        for (var i = 0, row; row = tableRows[i]; i++) {
            pb[i] = [];
            //rows would be accessed using the "row" variable assigned in the for loop
            for (var j = 0, col; col = row.cells[j]; j++) {

                pb[i][j] = (col.innerText);
                if (j == 0) {
                    $("#ciTable tbody tr td:first").val(i);
                }
            }
        }

        var y = 0;
        var z = 0;
        pb.splice(pb.length - 1, 1);
        for (var p = 0; p < pb[0].length; p++) {

            //rows would be accessed using the "row" variable assigned in the for loop
            for (var k = 0; k < pb.length - 1; k++) {

                $scope.CustomiseTableData.Id = x++;
                $scope.CustomiseTableData.RowNo = k + 1;
                $scope.CustomiseTableData.ColName = pb[y][z];
                $scope.CustomiseTableData.ColValue = pb[k + 1][p];

                $scope.CustomiseTableDataList.push($scope.CustomiseTableData);
                $scope.CustomiseTableData = {};
            }
            z++;
        }
    }

    $scope.tableInputDisable = function () {
        $scope.btnRemoveHide = true;
        editAble();
    }
    function editAble() {
        var rowNumber = $scope.ItemTableHeadersN[0].length - 4;

        $("#ciTable tbody tr td:nth-child(-n+" + rowNumber + ")").each(function () {
            $(this).attr("contenteditable", "true");
        });

        //$("#ciTable tfoot tr th").each(function () {
        //    $(this).attr("contenteditable", "true");
        //});
        //$("#ciTable  tr th:nth-child(n)").each(function () {
        //    $(this).attr("contenteditable", "true");
        //});
        $("#ciTable tfoot tr:nth-last-child(1) th:nth-last-child(1)").each(function () {
            $(this).attr("contenteditable", "true");
            //$(this).css("background-color", "red")
        });
        $("#ciTable tbody tr td:nth-child(1),#mofiz tbody tr td:nth-child(2)").each(function () {
            $(this).attr("contenteditable", "false");
        });
        $("#ciTable  tr th:nth-child(1),#mofiz tr th:nth-child(2)").each(function () {
            $(this).attr("contenteditable", "false");
        });
        $("#ciTable tbody tr td").each(function () {
            $(this).attr("contenteditable", "false");
        });
        $("#ciTable tbody td").find(":input").each(function () {
            $(this).attr("disabled", false);
        });
        //$("#ciTable tbody tr td:nth-last-child(1)").find(":input").each(function () {
        //    $(this).attr("disabled", true);
        //});
        $("#ciTable tfoot tr th").each(function () {
            $(this).attr("contenteditable", "true");
        });
        //$("#ciTable tfoot tr:nth-child(2) th,#ciTable tfoot tr:nth-child(3) th").each(function () {
        $("#ciTable tfoot tr:nth-child(2) th").each(function () {
            $(this).attr("contenteditable", "false");
            //$(this).css("background-color", "red")
        });
    }
    $scope.tableInsertCol = function () {
        $("#ciTable tbody td").find(":input").each(function () {
            $(this).replaceWith(this.value);
        });
        newFun();
    }
    hotkeys.add({
        combo: 'ctrl+backspace',
        description: 'This one goes to 11',
        callback: function () {
            if ($scope.btnRemoveHide) {
                alertify.log("Please click item reset button !!!", "error", "5000");
                return;
            } else {
                if ($scope.row_numP1 != null) {

                    var r = confirm("Are you sure to remove " + $scope.row_numP1 + " SL number item ?");
                    if (r == true) {
                        tableRemoveRow();
                    }
                } else {
                    alertify.log("Please select a item !!!", "error", "5000");
                    $scope.row_numP1 = null;
                }
            }


        }
    });

    $scope.tableRemoveRow = function () {
        if ($scope.row_numP1 != null) {

            var r = confirm("Are you sure to remove " + $scope.row_numP1 + " SL number item ?");
            if (r == true) {
                tableRemoveRow();
            }
        } else {
            alertify.log("Please select a item !!!", "error", "5000");
            $scope.row_numP1 = null;
        }
    }
    function tableRemoveRow() {
        $scope.chkDisable = true;
        //var rowNo = prompt("Please enter a row number");
        //var piOrderItemList =
        //    Enumerable.From($scope.InvoiceWiseItemList).Where("$.SalesOrderId !== 0").ToArray();
        var row = $scope.ItemTableDataRow[Number($scope.row_numP1 - 1)];

        if ($scope.ItemTableDataRow.length > 1) {
            //remove item table data row here
            $scope.ItemTableDataRow.splice(Number($scope.row_numP1 - 1), 1);
            $scope.InvoiceWiseItemList.splice(Number($scope.row_numP1 - 1), 1);
            //$scope.productList.splice(Number($scope.row_numP1 - 1), 1);

            /////////////////////
            angular.forEach($scope.productList, function (aProduct) {
                if (aProduct.ItemId == row[2] && aProduct.Quantity == row[6] && aProduct.UnitPrice == row[7]) {
                    //if (aProduct.SalesOrderId == row[1] && aProduct.ItemId == row[2] && aProduct.Quantity == qtyTemp && aProduct.UnitPrice == unitPriceTemp) {
                    var index = $scope.productList.indexOf(aProduct);
                    $scope.productList.splice(index, 1);
                }
            });
            /////////////////

            QuantityAndAmountSum();
            rearrangeSerial();
            var integerPartQty = parseInt($scope.QtySumForItem);
            var decimalPartQty = $scope.QtySumForItem - integerPartQty;

            if (decimalPartQty == 0) {
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = $scope.QtySumForItem;
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = $scope.QtySumForItem;
            }
            else {
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
            }
            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = parseFloat($scope.AmountSumForItem).toFixed(2);
            $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = parseFloat($scope.TotalCPTCost).toFixed(2);
            $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = parseFloat($scope.totalAmountWithCPT).toFixed(2);

            $scope.row_numP1 = null;
        }
        else if (row[0] == 0) {
            //remove item table data row here
            $scope.ItemTableDataRow.splice(Number($scope.row_numP1 - 1), 1);
            $scope.invoiceDetailList.splice(Number($scope.row_numP1 - 1), 1);
            //$scope.productList.splice(Number($scope.row_numP1 - 1), 1);
            /////////////////////
            angular.forEach($scope.productList, function (aProduct) {
                if (aProduct.ItemId == row[2] && aProduct.Quantity == row[6] && aProduct.UnitPrice == row[7]) {
                    //if (aProduct.SalesOrderId == row[1] && aProduct.ItemId == row[2] && aProduct.Quantity == qtyTemp && aProduct.UnitPrice == unitPriceTemp) {
                    var index = $scope.productList.indexOf(aProduct);
                    $scope.productList.splice(index, 1);
                }
            });
            /////////////////
            QuantityAndAmountSum();
            rearrangeSerial();
            var integerPartQty = parseInt($scope.QtySumForItem);
            var decimalPartQty = $scope.QtySumForItem - integerPartQty;

            if (decimalPartQty == 0) {
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = $scope.QtySumForItem;
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = $scope.QtySumForItem;
            }
            else {
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
            }
            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = parseFloat($scope.AmountSumForItem).toFixed(2);
            $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = parseFloat($scope.TotalCPTCost).toFixed(2);
            $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = parseFloat($scope.totalAmountWithCPT).toFixed(2);

            $scope.row_numP1 = null;
        }
        else {
            alertify.log("Shouldn't remove Last Item!!!", "error", "5000");
            $scope.row_numP1 = null;
        }

        $("#ciTable tbody tr td").each(function () {
            $(this).css("background", "transparent");
        });

    };

    //get HSCode
    function GetHsCode() {
        $http({
            url: "/ItemHsCode/Get",
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.HsCodeList = data;
        });
    }

    //calculation part
    $scope.GetItemValueForAmountCalculation = function (itemName, row, index) {
        //$scope.AmountSumForItem = 0;
        $("#ciTable tbody tr td input").focus(function () {
            $(this).addClass('red');
        }).blur(function () {
            $(this).removeClass('red');
        });

        var itemType = typeof (itemName);
        var item;
        var isConverted = 0;
        var hasDot;
        var num = Number(itemName);
        if ((num % 1) == 0.00) {
            if (row.length - 3 == index && itemType == 'string') {
                row[index] = parseInt(itemName);
            }
            else {
                if (itemType == 'string') {
                    row[index] = parseFloat(itemName);
                }
                else {
                    row[index] = parseFloat(itemName);
                }

                if (row.length - 2 == index) {
                    row[row.length - 2] = (row[row.length - 2]).toFixed(2);
                }
                else {
                    row[row.length - 1] = (row[row.length - 1]).toFixed(2);
                    //$scope.Amount = parseFloat(row[row.length - 1]);
                    //$scope.AmountSumForItem += $scope.Amount;

                }
                if (row.length - 1 == index) {
                    $scope.Amount = parseFloat(row[row.length - 1]);
                    $scope.AmountSumForItem += $scope.Amount;
                }
            }
        } else {
            if (row.length - 1 == index) {
                $scope.Amount = parseFloat(row[row.length - 1]);
                $scope.AmountSumForItem += $scope.Amount;
            }
        }


        //if (itemType != 'number') {
        //    hasDot = itemName.indexOf(".");
        //    var itemNameForDotRemove = itemName;
        //    if (hasDot != -1) {
        //        var divArray = itemNameForDotRemove.split(".");
        //        if (divArray.length > 2) {
        //            $scope.isInvalidData = 1;
        //            $scope.ItemTableDataRow = [];
        //            $scope.DataRow = [];
        //            alertify.log('Please insert valid data after reset', 'error', '5000');
        //            return;
        //        }
        //    }
        //}

        if (hasDot != -1) {
            if (itemType != 'number') {
                //var patt = /[^(\d+)\.(\d+)]/g;
                //var itemNameFiltered = itemName.replace(patt, "");
                item = parseFloat(itemName);
            }
            else {
                item = itemName;
            }
            isConverted = 1;
        }
        if (isConverted == 0) {
            if (itemType != 'number') {
                //var itemNameFiltered = itemName.toString().replace(/\D/g, "");
                item = parseFloat(itemName);
            }
            else {
                item = itemName;
            }
        }
        if ($scope.insertItemCount == undefined) {
            if (index >= row.length - 3) {
                if ($scope.distCount == 1) {
                    $scope.Qty = item;
                    $scope.QtySumForItem += item;
                    $scope.distCount++;
                } else if ($scope.distCount == 2) {
                    $scope.UnitPrice = item;
                    $scope.UnitpriceSumForItem += item;
                    $scope.distCount++;
                } else if ($scope.distCount == 3) {

                    $scope.distCount++;
                }

            }
            if ($scope.distCount == 4) {
                var integerPartQty = parseInt($scope.QtySumForItem);
                var decimalPartQty = $scope.QtySumForItem - integerPartQty;

                if (decimalPartQty == 0) {
                    $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = $scope.QtySumForItem;
                    $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = $scope.QtySumForItem;
                }
                else {
                    $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
                    $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
                }
                $scope.AmountSumForItem = parseFloat($scope.totalAmountWithCPT) - parseFloat($scope.TotalCPTCost);

                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = parseFloat($scope.AmountSumForItem).toFixed(2);
                $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = parseFloat($scope.TotalCPTCost).toFixed(2);
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = parseFloat($scope.totalAmountWithCPT).toFixed(2);
                $scope.distCount = 1;
            }
        }
    };
    $scope.GetChengedFieldValue = function (itemName, row, index) {
        if (itemName == '') {
            alertify.log("Please enter valid Number!!!", "error", "5000");
            return;
        }
        if (itemName == '.') {
            alertify.log("Can't input just dot !!!", "error", "5000");
            return;
        }
        var qtyTemp = row[row.length - 3];
        var unitPriceTemp = row[row.length - 2];

        var item;
        item = parseFloat(itemName);

        if (isNaN(item)) {

            alertify.log("Can't Enter Any Alphabet and Special Character Before Number !!!", "error", "5000");
            return;
        }
        else {
            if (row.length - 1 != index) {
                $scope.QtySumForItem -= parseFloat(row[row.length - 3]);
                $scope.AmountSumForItem -= parseFloat(row[row.length - 1]);
                $scope.totalAmountWithCPT = $scope.AmountSumForItem + parseFloat($scope.TotalCPTCost);
                if (index >= (row.length - 3)) {
                    row[index] = item;
                }
                else {
                    row[index] = item;
                }
                var qtyConvert = parseFloat(row[row.length - 3]);
                var amountConvert = parseFloat(row[row.length - 2]);
                row[row.length - 1] = (qtyConvert * amountConvert).toFixed(2);
                $scope.AmountSumForItem += parseFloat(row[row.length - 1]);
                $scope.totalAmountWithCPT = $scope.AmountSumForItem + parseFloat($scope.TotalCPTCost);
                $scope.QtySumForItem += parseFloat(row[row.length - 3]);
            }
            else {
                $scope.AmountSumForItem -= row[row.length - 1];
                $scope.totalAmountWithCPT = $scope.AmountSumForItem + parseFloat($scope.TotalCPTCost);
                row[index] = item;
                $scope.AmountSumForItem += item;
            }

            var integerPartQty = parseInt($scope.QtySumForItem);
            var decimalPartQty = $scope.QtySumForItem - integerPartQty;

            if (decimalPartQty == 0) {
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = $scope.QtySumForItem;
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = $scope.QtySumForItem;
            }
            else {
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = parseFloat($scope.QtySumForItem).toFixed(2);
            }
            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = parseFloat($scope.AmountSumForItem).toFixed(2);
            $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = parseFloat($scope.totalAmountWithCPT).toFixed(2);

            angular.forEach($scope.invoiceDetailList, function (invoiceDetail) {
                if (invoiceDetail.SalesOrderId == row[0] && invoiceDetail.ItemId == row[1]) {
                    var objectIndex = $scope.invoiceDetailList.indexOf(invoiceDetail);
                    if (objectIndex != -1 && objectIndex + 1 == row[2]) {
                        invoiceDetail.ItemName = row[3];
                        invoiceDetail.DescriptionOne = row[4];
                        invoiceDetail.Quantity = row[row.length - 3];
                        invoiceDetail.UnitPrice = row[row.length - 2];
                        invoiceDetail.Amount = row[row.length - 1];
                    }

                }
            });
            if ($scope.duplicateProduct != undefined) {
                $scope.productList = $scope.duplicateProduct;
            }

            angular.forEach($scope.productList, function (aProduct) {
                //if (aProduct.SalesOrderId == row[1] && aProduct.ItemId == row[2] && aProduct.Quantity == row[7] && aProduct.UnitPrice == row[8]) {
                if (aProduct.ItemId == row[2] && aProduct.Quantity == qtyTemp && aProduct.UnitPrice == unitPriceTemp) {
                    aProduct.Quantity = row[row.length - 3];
                    aProduct.UnitPrice = row[row.length - 2];
                    aProduct.Amount = row[row.length - 1];
                }
            });
            $scope.duplicateProduct = angular.copy($scope.productList);
            row[index] = item;
        }
    }
    //end
    

    function GetAllBankAccount() {

        $http({
            url: '/BankAccount/GetAllBankAccount',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.BankAccountList = data;
        });
    }
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
    function GetInvoiceList() {
        $http({
            url: '/ExpInvoice/GetAllInvoice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.InvoiceDropdownList = data;
            
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

    function GetExporterBankAccount() {
        var searchCriteria = "";
        searchCriteria = "AccountFor = 'Exporter'";
        $http({
            url: "/BankAccount/GetBankAccountByTypeAndRefId?searchCriteria=" + searchCriteria,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.ExporterBankList = data;
        });
    };

    $scope.GetExpoterInfo = function (ExporterId) {

        GetExpoterInfo(ExporterId);
    }
    function GetExpoterInfo(ExporterId) {
        if (ExporterId != undefined) {
            $scope.ExporterId = ExporterId;
        }
        if ($scope.ExporterList.length != 0) {
            var index = $scope.ExporterList.findIndex(x => x.ExporterId === $scope.ExporterId); //Use Next Time
            $scope.ddlExporter = { ExporterId: $scope.ExporterList[index].ExporterId };
            $scope.ExporterInfo = "<b>" + $scope.ExporterList[index].ExporterName + "</b><br>" +
                "<b>Factory Address: </b>" + $scope.ExporterList[index].ExporterAddress + "<br>" +
                "<b>TIN: </b>" + $scope.ExporterList[index].TIN + "<b> BIN: </b>" + $scope.ExporterList[index].BIN + "<br>" +
                "<b>E-Mail- </b>" + $scope.ExporterList[index].Email + (($scope.ddlImporter.RefEmail == "") ? "" : " & " + $scope.ddlImporter.RefEmail) + "<br>" +
                "<b>Web- </b>" + $scope.ExporterList[index].Website + "<b> Cell: </b>" + $scope.ddlImporter.RefContactNo + "<br>" +
                //"<b>Cell: </b>" + $scope.ExporterList[index].MobileNo + (($scope.ddlImporter.RefContactNo == "") ? "" : " & " + $scope.ddlImporter.RefContactNo) + "<br>"
                "<b>Tel: </b>" + $scope.ExporterList[index].TelephoneNo + "<br>"
            $(".summernoteExporterInfoRevise").summernote("code", $scope.ExporterInfo);
            $scope.exp_CommercialInvoice.ExporterId = $scope.ddlExporter.ExporterId;

        }


    }
    //$scope.GetExpoterInfo = function (GetExpoterId) {
    //    GetExpoterInfo(GetExpoterId);
    //}
    //function GetExpoterInfo(GetExpoterId) {
    //    //var index = $scope.ExporterList.findIndex(x => x.ExporterId === GetExpoterId); //Use Next Time
    //    if (GetExpoterId == 1) {
    //        GetbranchId(2);
    //        $scope.ddlExporter = { ExporterId: $scope.ExporterList[0].ExporterId };
    //        $scope.ExporterInfo = "<b>" + $scope.ExporterList[0].ExporterName + "</b><br>" +
    //            "<b>Factory Address: </b>" + $scope.ExporterList[0].ExporterAddress + "<br>" +
    //            "<b>TIN: </b>" + $scope.ExporterList[0].TIN + "<b> BIN: </b>" + $scope.ExporterList[0].BIN + "<br>" +
    //            "<b>E-Mail- </b>" + $scope.ExporterList[0].Email + (($scope.ddlImporter.RefEmail == "") ? "" : " & " + $scope.ddlImporter.RefEmail) + "<br>" +
    //            "<b>Web- </b>" + $scope.ExporterList[0].Website + "<b> Tel: </b>" + $scope.ExporterList[0].TelephoneNo + "<br>" +
    //            "<b>Cell: </b>" + $scope.ExporterList[0].MobileNo + (($scope.ddlImporter.RefContactNo == "") ? "" : " & " + $scope.ddlImporter.RefContactNo) + "<br>"
    //        $(".summernoteExporterInfoRevise").summernote("code", $scope.ExporterInfo);
    //        /*console.log($scope.ddlExporter);*/
    //        $scope.exp_CommercialInvoice.ExporterId = $scope.ddlExporter.ExporterId;
    //    } else if (GetExpoterId == 2) {
    //        GetbranchId(1);
    //        $scope.ddlExporter = { ExporterId: $scope.ExporterList[1].ExporterId };
    //        $scope.ExporterInfo = "<b>" + $scope.ExporterList[1].ExporterName + "</b><br>" +
    //            "<b>Factory Address: </b>" + $scope.ExporterList[1].ExporterAddress + "<br>" +
    //            "<b>TIN: </b>" + $scope.ExporterList[1].TIN + "<b> BIN: </b>" + $scope.ExporterList[1].BIN + "<br>" +
    //            "<b>E-Mail- </b>" + $scope.ExporterList[1].Email + (($scope.ddlImporter.RefEmail == "") ? "" : " & " + $scope.ddlImporter.RefEmail) + "<br>" +
    //            "<b>Web- </b>" + $scope.ExporterList[1].Website + "<b> Tel: </b>" + $scope.ExporterList[1].TelephoneNo + "<br>" +
    //            "<b>Cell: </b>" + $scope.ExporterList[1].MobileNo + (($scope.ddlImporter.RefContactNo == "") ? "" : " & " + $scope.ddlImporter.RefContactNo) + "<br>"
    //        $(".summernoteExporterInfoRevise").summernote("code", $scope.ExporterInfo);
    //        /*console.log($scope.ddlExporter);*/
    //        $scope.exp_CommercialInvoice.ExporterId = $scope.ddlExporter.ExporterId;
    //    }

    //}
    function GetbranchId(branchId) {
        if ($scope.ExporterBankList.length != 0) {
            var index = $scope.ExporterBankList.findIndex(x => x.BankAccountId === branchId);
            console.log(index);
            $scope.ddlExporterBank = { BankAccountId: $scope.ExporterBankList[index].BankAccountId }
            $scope.exp_CommercialInvoice.ExporterBankAccountId = $scope.ExporterBankList[index].BankAccountId;
            $scope.ExporterBankInfo = "<b>Bank Name: </b>" + $scope.ExporterBankList[index].BankName + "<br>" +
                "<b>Account Name: </b>" + $scope.ExporterBankList[index].AccountName + "<br>" +
                "<b>Account No: </b>" + $scope.ExporterBankList[index].AccountNo + "<br>" +
                "<b>Swift Code: </b>" + $scope.ExporterBankList[index].SwiftCode + "<br>" +
                "<b>Routing No: </b>" + $scope.ExporterBankList[index].BranchRouteNo + "<br>" +
                "<b>Branch Address: </b>" + $scope.ExporterBankList[index].BranchAddress

            $(".summernoteExporterBankInfoRevise").summernote("code", $scope.ExporterBankInfo);
        }


    }

    $scope.GetbranchId = function (branchId) {

        GetbranchId(branchId);
    }

    
    //$scope.GetbranchId = function (branchId) {

    //    GetbranchId(branchId);
    //}

    //function GetbranchId(branchId) {
    //    var index = $scope.ExporterBankList.findIndex(x => x.BankAccountId === branchId);
    //    console.log(index);
    //    $scope.ddlExporterBank = { BankAccountId: $scope.ExporterBankList[index].BankAccountId }
    //    $scope.exp_CommercialInvoice.ExporterBankAccountId = $scope.ExporterBankList[index].BankAccountId;
    //    $scope.ExporterBankInfo = "<b>Bank Name: </b>" + $scope.ExporterBankList[index].BankName + "<br>" +
    //        "<b>Account Name: </b>" + $scope.ExporterBankList[index].AccountName + "<br>" +
    //        "<b>Account No: </b>" + $scope.ExporterBankList[index].AccountNo + "<br>" +
    //        "<b>Swift Code: </b>" + $scope.ExporterBankList[index].SwiftCode + "<br>" +
    //        "<b>Branch Address: </b>" + $scope.ExporterBankList[index].BranchAddress
        
    //    $(".summernoteExporterBankInfoRevise").summernote("code", $scope.ExporterBankInfo);

    //}


    $scope.GetImporterBankByRefId = function (id, type) {
        GetImporterBankByRefId(id, type);
    }
    function GetImporterBankByRefId(id, type) {
        var searchCriteria = "";
        //searchCriteria = "AccountFor = 'Exporter'";
        searchCriteria = "AccountFor = '" + type + "' AND AccountRefId = " + id;

        $http({
            url: '/BankAccount/GetBankAccountByTypeAndRefId?searchCriteria=' + searchCriteria,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (type == "Customer") {
                $scope.ImporterBankList = data;
            }
            else {
                alertify.log('No Importer Found', 'error', '5000');
            }
        });
    }

    $scope.AddEmpoterBank = function () {
        $('#importerBankModal').modal('show');
    }

    $scope.GetAddressAndNameByCompany = function () {
        $scope.AmountSumForItem = 0;
        $scope.UnitpriceSumForItem = 0;
        $scope.QtySumForItem = 0;
        $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = 0;
        $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = 0;

        $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 3] = 0;
        $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = 0;

        $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = 0;
        $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = 0;

        //var company = Enumerable.From($scope.companyList).Where("$.CompanyId === " + $scope.ddlImporter.CompanyId).FirstOrDefault();

        //if (!angular.isUndefined(company) && company !== null) {
        //    $scope.exp_CommercialInvoice.CompanyId = company.CompanyId;
        //    $scope.exp_CommercialInvoice.CompanyName = company.CompanyName;
        //    $scope.exp_CommercialInvoice.CompanyNameBilling = company.CompanyNameBilling;
        //    $scope.exp_CommercialInvoice.AddressBilling = company.AddressBilling;
        //    $scope.exp_CommercialInvoice.CompanyNameDelivery = company.CompanyNameDelivery;
        //    $scope.exp_CommercialInvoice.AddressDelivery = company.AddressDelivery;
        //    $scope.exp_CommercialInvoice.RefEmployeeId = company.RefEmployeeId;
        //}
    }

    $scope.GetProformaInvoiceByCompany = function () {
        $scope.InvoiceWiseItemList = [];
        $scope.ItemTableDataRow = [];
        $scope.DataRow = [];
        $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = 0;
        $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = 0;
        $scope.QtySumForItem = 0;
        $scope.AmountSumForItem = 0;
        $scope.ItemCategory = [];
        
        var where = "CompanyId= " + $scope.ddlImporter.CompanyId + " AND InvoiceId IN (SELECT DocumentId FROM exp_Approval WHERE [ApprovalType]='PiNew' AND IsApproved=1) AND InvoiceId NOT IN (SELECT ISNULL(RTRIM(LTRIM(Name)),0) FROM dbo.SplitString((SELECT STUFF((SELECT ', ' " + encodeURIComponent('+') + "+ InvoiceIds FROM dbo.exp_CommercialInvoice WITH(NOLOCK) FOR XML PATH('')), 1, 2, ''))))";
        $http({
            url: "/ExpInvoice/GetExpInvoiceDynamic?searchCriteria=" + where + "&orderBy=InvoiceId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data,
                    function (e) {
                        e.IsCheck = false;
                        var res1 = e.InvoiceDate.substring(0, 5);
                        if (res1 == "/Date") {
                            var parsedDate1 = new Date(parseInt(e.InvoiceDate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
                            e.InvoiceDate = date1;
                        }
                    });
            }
            $scope.InvoiceSearchList = data;
            if ($scope.InvoiceSearchList.length != 0) {
                $scope.ExporterId = $scope.InvoiceSearchList[0].ExporterId;
                $scope.ExporterBankId = $scope.InvoiceSearchList[0].ExporterBankId;
                GetExpoterInfo($scope.ExporterId);
                //GetbranchId();
            }
        });
    }

    

    //modal bank
    $scope.GetAccountFor = function (AccountFor) {
        if (!angular.isUndefined($scope.ddlAccountFor) && $scope.ddlAccountFor != null) {
            var criteria = "C.IsActive=1";

            if (AccountFor == 'Customer') {

                $http({
                    url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyName",
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {

                    angular.forEach(data, function (aData) {
                        $scope.CompanyDropdownList.push(aData);

                    });
                })
            }
            else if (AccountFor == 'Exporter') {

                $scope.CompanyDropdownList = [];

            }


        }
    }

    $scope.CompanyChange = function () {

        var where = "CompanyId= " + $scope.ddlImporter.CompanyId + " AND InvoiceId IN (SELECT DocumentId FROM exp_Approval WHERE [ApprovalType]='PiNew' AND IsApproved=1) AND InvoiceId NOT IN (SELECT ISNULL(RTRIM(LTRIM(Name)),0) FROM dbo.SplitString((SELECT STUFF((SELECT ', ' " + encodeURIComponent('+') + "+ InvoiceIds FROM dbo.exp_CommercialInvoice WITH(NOLOCK) FOR XML PATH('')), 1, 2, ''))))";
        $http({
            url: "/ExpInvoice/GetExpInvoiceDynamic?searchCriteria=" + where + "&orderBy=InvoiceId",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (e) {
                    e.IsCheck = false;
                    var res1 = e.InvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(e.InvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
                        e.InvoiceDate = date1;
                    }
                })
            }
            // $scope.InvoiceSearchList = data;
        })
    }
    function GetItemByCI(CiId) {
        $http({
            url: '/ExpCommercialInvoice/GetItemByCI?CiId=' + CiId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.InvoiceWiseItemList = data;
        });
    }
    function SaveBankAccount(Status) {

        var parms = JSON.stringify({ ad_BankAccount: $scope.ad_BankAccount });
        $http.post('/BankAccount/Save', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Bank ' + Status + ' Successfully!', 'success', '5000');
                ClearBankField();
                $scope.importerBankEntryNewForm.$setPristine();
                $scope.importerBankEntryNewForm.$setUntouched();
                $http({
                    url: '/BankAccount/GetAllBankAccount',
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (bank) {
                    $scope.BankAccountList = bank;
                    var bankAccount = _.last($scope.BankAccountList);
                    GetImporterBankByRefId(bankAccount.AccountRefId, bankAccount.AccountFor);
                    $scope.ddlImporterBank = { BankAccountId: bankAccount.BankAccountId };
                    $scope.exp_CommercialInvoice.ImporterBankId = bankAccount.BankAccountId;
                })
            } else {
                alertify.log('Server Errors!', 'error', '5000');
            }
        }).error(function (data) {
            alertify.log('Server Errors!', 'error', '5000');
        });
    }
    $scope.SaveBankAccount = function () {
        $scope.ad_BankAccount.UpdatorId = $scope.UserId;

        if ($scope.found) {
            $('#txtBankAccountName').focus();
        }
        else {
            if ($scope.ad_BankAccount.BankAccountId == 0) {

                SaveBankAccount('Saved');

            }
        }
    };
    $scope.LoadCommercialInvoice = function (password) {
        $window.scrollTo(0, 0);
        document.getElementById("btnLoadCI").disabled = true;

        $http({
            url: '/ExpApproval/exp_CiAmendment_GetForEdit?approvalType=CIAmendment&approvalPassword=' + password,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (aCommercialInvoice) {
            if (aCommercialInvoice.length > 0) {
                $scope.DisddlImpoter = true;
                window.scrollTo(0, 0);
                $scope.QtySumForItem = 0;
                $scope.UnitpriceSumForItem = 0;
                $scope.AmountSumForItem = 0;
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = 0;
                $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = 0;

                $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 3] = 0;
                $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = 0;

                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = 0;
                $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = 0;

                dynamictable();
                GetExporterBankAccount();
                GetAllActiveCompany();
                $scope.exp_CommercialInvoice = aCommercialInvoice[0];
                GetCommercialInvoiceInfoByCiId($scope.exp_CommercialInvoice.CommercialInvoiceId);
                var Importer = $scope.companyList.find(x => x.CompanyId == $scope.exp_CommercialInvoice.CompanyId);
                $scope.ddlImporter = Importer;
                //$scope.ddlImporter = { "CompanyId": $scope.exp_CommercialInvoice.CompanyId, "CompanyName": Importer.CompanyName };
                
                $('#ddlImporterRevise').select2('destroy');
                $('#ddlImporterRevise').val($scope.exp_CommercialInvoice.CompanyId).select2();
                $scope.ddlExporter = { "ExporterId": $scope.exp_CommercialInvoice.ExporterId };
                
                $scope.ExporterId = $scope.exp_CommercialInvoice.ExporterId;
                $scope.ddlExporterBank = { "BankAccountId": $scope.exp_CommercialInvoice.ExporterBankAccountId };
                $scope.ExporterBankId = $scope.exp_CommercialInvoice.ExporterBankAccountId;
                $scope.ItemTableDataRow = [];
                LoadInvoice($scope.ddlImporter, aCommercialInvoice[0].CommercialInvoiceId);
                /*GetCommercialInvoiceDetailByCommercialInvoiceId(aCommercialInvoice.CommercialInvoiceId);*/

                $http({
                    url: '/ExpCommercialInvoice/GetPOReference?DocType=CI' + "&DocumentId=" + $scope.exp_CommercialInvoice.CommercialInvoiceId,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length) {


                        $scope.POReferencelist = [];
                        angular.forEach(data, function (aPODetail) {
                            var res2 = aPODetail.PODate.substring(0, 5);
                            if (res2 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aPODetail.PODate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aPODetail.PODate = date1;
                            }

                            $scope.POReferencelist.push(aPODetail);
                        })
                        if ($scope.POReferencelist.length) {
                            $scope.exp_CommercialInvoice.isPO = true;
                        }
                    }

                });
                
                $http({
                    url: "/ExpCommercialInvoice/GetCommercialInvoiceDetailByCommercialInvoiceId?CiId=" + $scope.exp_CommercialInvoice.CommercialInvoiceId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (Productdata) {
                    $scope.productList = Productdata;
                });

                //////////////////////////////////

                $http({
                    url: "/ExpCommercialInvoice/GetPackingInfo?commercialInvoiceId=" + aCommercialInvoice[0].CommercialInvoiceId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (packInfo) {
                    if (packInfo.length) {
                        $scope.packingInfo = packInfo[0];
                    }
                });

                var isLcScDate = isNaN($scope.exp_CommercialInvoice.LcScDate);
                var isMasterDate = isNaN($scope.exp_CommercialInvoice.MasterContactDate);
                var isCiDate = isNaN($scope.exp_CommercialInvoice.CommercialInvoiceDate);
                var isExpDate = isNaN($scope.exp_CommercialInvoice.ExpDate);

                if (isLcScDate == true) {
                    var res1 = $scope.exp_CommercialInvoice.LcScDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt($scope.exp_CommercialInvoice.LcScDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        $scope.exp_CommercialInvoice.LcScDate = date1;
                    }
                }
                if (isMasterDate == true) {
                    var res2 = $scope.exp_CommercialInvoice.MasterContactDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt($scope.exp_CommercialInvoice.MasterContactDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        $scope.exp_CommercialInvoice.MasterContactDate = date2;
                    }
                }
                if (isCiDate == true) {
                    var res3 = $scope.exp_CommercialInvoice.CommercialInvoiceDate.substring(0, 5);
                    if (res3 == "/Date") {
                        var parsedDate3 = new Date(parseInt($scope.exp_CommercialInvoice.CommercialInvoiceDate.substr(6)));
                        var date3 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
                        $scope.exp_CommercialInvoice.CommercialInvoiceDate = date3;
                    }
                }
                if (isExpDate == true) {
                    var res4 = $scope.exp_CommercialInvoice.ExpDate.substring(0, 5);
                    if (res4 == "/Date") {
                        var parsedDate4 = new Date(parseInt($scope.exp_CommercialInvoice.ExpDate.substr(6)));
                        var date4 = ($filter('date')(parsedDate4, 'MMM dd, yyyy')).toString();
                        $scope.exp_CommercialInvoice.ExpDate = date4;
                    }
                }
                $scope.ddlPaymentProcessType = { PaymentProcessTypeId: $scope.exp_CommercialInvoice.PaymentProcessTypeId };
                var id = aCommercialInvoice[0].CompanyId;
                var type = 'Customer';
                GetImporterBankByRefId(id, 'Customer');
                
                $scope.ddlImporterBank = { BankAccountId: $scope.exp_CommercialInvoice.ImporterBankId };
                $(".summernoteExporterBankInfoRevise").summernote("code", $scope.exp_CommercialInvoice.ExporterBankInfo);
                $(".summernoteExporterInfoRevise").summernote("code", $scope.exp_CommercialInvoice.ExporterInfo);
                $scope.chkDisable = true;
                $scope.btnSwapDisable = true;
                $scope.btnRemoveEditDisable = false;
                $scope.btnRemoveHide = false;

                $scope.commercialInvoice.Password = '';
                $scope.commercialInvoiceReviseEntryForm.$setUntouched();

            }
            else {
                alertify.log(' Password is not matched!', 'already', '5000');
                $('#txtOtP').val('');
                $scope.commercialInvoiceReviseEntryForm.$setUntouched();

            }
        });
    }


    function GetAllActiveCompany() {
        var criteria = "C.IsActive=1";
        $http({
            url: '/Company/GetCompanyDynamic?searchCriteria=' + criteria + "&orderBy=CompanyName",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.companyList = data;

        })
    }

    function GetAllCommercialInvoice() {
        $http({
            url: '/ExpCommercialInvoice/GetAllCommercialInvoice',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            angular.forEach(data, function (e) {
                if (e.CommercialInvoiceDate != null) {
                    var res1 = e.CommercialInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(e.CommercialInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        e.CommercialInvoiceDate = date1;
                    }
                }

                if (e.ExpDate != null) {
                    var res2 = e.ExpDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(e.ExpDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        e.ExpDate = date2;
                    }

                }

            })
            $scope.CommercialInvoiceList = data;
            
        });

    }


    function GetCommercialInvoiceDetailByCommercialInvoiceId(CiId) {
        $scope.ItemTableDataRow = [];
        $scope.ItemRow = [];
        $scope.InvoiceWiseItemList = [];
        $http({
            url: '/ExpCommercialInvoice/GetCommercialInvoiceDetailModifiedDataForCiUpdate?commercialInvoiceId=' + CiId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {

            $scope.InvoiceWiseItemList = data;

            angular.forEach($scope.InvoiceWiseItemList,
                function (item, idx) {
                    //delete item.CommercialInvoiceId;
                    //delete item.RowNo;
                    $scope.ItemRow = Object.keys(item).map(e => item[e]);
                    $scope.ItemRow.splice(1, 2);
                    $scope.ItemTableDataRow.push($scope.ItemRow);
                    $scope.ItemTableHeadersN[0] = Object.getOwnPropertyNames(item);
                    $scope.ItemTableHeadersN[0].splice(1, 2);

                });
            $scope.ItemTableFooter = [];
            $scope.ItemTableFooterForCPT = [];
            $scope.ItemTableFooterForCPTTotal = [];

            for (var i = 0; i < $scope.ItemTableHeadersN[0].length; i++) {
                if (i == $scope.ItemTableHeadersN[0].length - 3) {
                    $scope.ItemTableFooter.push($scope.QtySumForItem);
                    $scope.ItemTableFooterForCPT.push("");
                    $scope.ItemTableFooterForCPTTotal.push($scope.QtySumForItem);
                } else if (i == $scope.ItemTableHeadersN[0].length - 1) {
                    $scope.ItemTableFooter.push($scope.AmountSumForItem);
                    $scope.ItemTableFooterForCPT.push($scope.TotalCPTCost.toFixed(2));
                    $scope.ItemTableFooterForCPTTotal.push($scope.totalAmountWithCPT.toFixed(2));
                }
                else if (i == $scope.ItemTableHeadersN[0].length - 4) {
                    $scope.ItemTableFooter.push("");
                    $scope.ItemTableFooterForCPT.push("Freight Charge");
                    $scope.ItemTableFooterForCPTTotal.push("");
                }
                else {
                    $scope.ItemTableFooter.push("");
                    $scope.ItemTableFooterForCPT.push("");
                    $scope.ItemTableFooterForCPTTotal.push("");
                }
            }

        })
    }

    function GetCommercialInvoiceInfoByCiId(CiId) {
        $http({
            url: '/ExpCommercialInvoice/GetAllCommercialInvoiceInfo?CiId=' + CiId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceInfoList = data;
            angular.forEach($scope.CommercialInvoiceInfoList, function (data) {

                if (data.InfoType == 'Applicants') {
                    if (data.InfoSubType == 'IRC') {
                        $scope.exp_CommercialInvoice.AppLabel1 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue1 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'LCA') {
                        $scope.exp_CommercialInvoice.AppLabel2 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue2 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'VATReg') {
                        $scope.exp_CommercialInvoice.AppLabel3 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue3 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'BIN') {
                        $scope.exp_CommercialInvoice.AppLabel4 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue4 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'TIN') {
                        $scope.exp_CommercialInvoice.AppLabel5 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue5 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'AppExtxa1') {
                        $scope.exp_CommercialInvoice.AppLabel6 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue6 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'AppExtxa2') {
                        $scope.exp_CommercialInvoice.AppLabel7 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue7 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'AppExtxa3') {
                        $scope.exp_CommercialInvoice.AppLabel8 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue8 = data.InfoValue;
                    }
                    //Extra For Bill Of Exchange
                    if (data.InfoSubType == 'AppExtxa4') {
                        $scope.exp_CommercialInvoice.AppLabel9 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue9 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'AppExtxa5') {
                        $scope.exp_CommercialInvoice.AppLabel10 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.AppValue10 = data.InfoValue;
                    }
                }
                if (data.InfoType == 'LcInfo') {
                    if (data.InfoSubType == 'BDBankDc') {
                        $scope.exp_CommercialInvoice.LcInfoLabel1 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.LcInfoValue1 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'ExpContact') {
                        $scope.exp_CommercialInvoice.LcInfoLabel2 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.LcInfoValue2 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'LcInfoEx1') {
                        $scope.exp_CommercialInvoice.LcInfoLabel3 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.LcInfoValue3 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'LcInfoEx2') {
                        $scope.exp_CommercialInvoice.LcInfoLabel4 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.LcInfoValue4 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'LcInfoEx3') {
                        $scope.exp_CommercialInvoice.LcInfoLabel5 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.LcInfoValue5 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'LcInfoEx4') {
                        $scope.exp_CommercialInvoice.LcInfoLabel6 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.LcInfoValue6 = data.InfoValue;
                    }
                }
                if (data.InfoType == 'CiFooter') {
                    if (data.InfoSubType == 'CiFooter1') {
                        $scope.exp_CommercialInvoice.CiFooterValue1 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'CiFooter2') {
                        $scope.exp_CommercialInvoice.CiFooterValue2 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'CiFooter3') {
                        $scope.exp_CommercialInvoice.CiFooterValue3 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'CiFooter4') {
                        $scope.exp_CommercialInvoice.CiFooterValue4 = data.InfoValue;
                    }

                }
                if (data.InfoType == 'DcFooter') {
                    if (data.InfoSubType == 'DcFooter1') {
                        $scope.exp_CommercialInvoice.DcFooter1 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'DcFooter2') {
                        $scope.exp_CommercialInvoice.DcFooter2 = data.InfoValue;
                    }
                    if (data.InfoSubType == 'DcFooter3') {
                        $scope.exp_CommercialInvoice.DcFooter3 = data.InfoValue;

                    }
                    if (data.InfoSubType == 'DcFooter4') {
                        $scope.exp_CommercialInvoice.DcFooter4 = data.InfoValue;
                    }

                }
                //ImpoterBankBIN
                if (data.InfoType == 'ImpoterBankBINVAT') {
                    if (data.InfoSubType == 'ImpoterBankBINVAT') {
                        $scope.exp_CommercialInvoice.BankInfoLabel1 = data.InfoLabel;
                        $scope.exp_CommercialInvoice.BankInfoValue1 = data.InfoValue;

                    }

                }
            });

        });

    }

    $scope.stopPropagation = function () {
        $("#AmendmentModal").modal('show');
        event.stopPropagation();

    }

    $scope.OpenPopupWindow = function (ciId) {
        $window.open("#/CommercialInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("CommercialInvoiceId", JSON.stringify(ciId));
        $cookieStore.put("CommercialInvoiceId", ciId);
        event.stopPropagation();
    };




    function GetAllPaymentProcess() {
        $http({
            url: '/ExpPaymentProcess/GetAllPaymentProcess',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PaymentProcessList = data;

        });
    }

    function EmailSend(ciNo) {
        $scope.EmailSendNotification.EmailSubject = "Updated Commercial Invoice No: " + ciNo;
        $scope.ToEmailList = [];
        angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {

            var emailName = {};
            emailName = aEmail.EmailId;
            $scope.ToEmailList.push(emailName);

        })

        $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
        var d = Date(Date.now());
        var a = d.toString();
        $scope.CreatedDate = a.split('GMT');

        var form = $scope.commercialInvoiceReviseEntryForm;
        $scope.ChangedcommercialInvoice = "";
        angular.forEach(form, function (value, key) {
            if (typeof value === 'object' && value.hasOwnProperty('$modelValue') && value.$dirty) {
                if (typeof value.$modelValue === 'object') {
                    value.$modelValue = "Changed " + value.$name + " Value.";
                }
                $scope.ChangedcommercialInvoice += value.$name + ": <strong style='color: red'>" + value.$modelValue + "</strong><br/>";
            }

        });

        $scope.EmailSendNotification.EmailBody =
            '<p> Dear User,<br/> <strong>A new Commercial Invoice has been Updated.</strong> <br/><br/> ' +
            'Commercial Invoice No: <strong > ' + ciNo + '</strong><br/>' +
            'Commercial Invoice Date: <strong>' + $scope.exp_CommercialInvoice.CommercialInvoiceDate + '</strong><br/>' +
            'Company Name: <strong>' + $scope.ddlImporter.CompanyName + '</strong><br/>' +
            'Referece Proforma Invoice: <strong>' + $scope.exp_CommercialInvoice.PiRefNo + '</strong>' + '<br/>' +
            '</strong><u>Commercial Invoice Info: </u></strong><br/>' + $scope.ChangedcommercialInvoice + '<br/>' +
            'Creator Name: <strong>' + $scope.FullName + '</strong>' + '<br/>' +
            'Created Date: <strong>' + $scope.CreatedDate[0] + '</strong>' + '<br/><br />' +

            'Regards,<br/>' +
            'Software Team <br/>' +
            'Retail Technologies Ltd.</p>'

        var params = JSON.stringify({ emailSend: $scope.EmailSendNotification });

        $http({
            url: "/EmailSender/EmailSend",
            method: "POST",
            data: params,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {

            // console.log(response.data);
        });
    }
    function SaveCommercialInvoice(status) {
        $window.scrollTo(0, 0);
        $scope.CiiInfo = [];
        // Applicants 
        if ($scope.exp_CommercialInvoice.AppLabel1) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel1;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue1;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "IRC";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }

        if ($scope.exp_CommercialInvoice.AppLabel2) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel2;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue2;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "LCA";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }

        if ($scope.exp_CommercialInvoice.AppLabel3) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel3;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue3;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "VATReg";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }

        if ($scope.exp_CommercialInvoice.AppLabel4) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel4;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue4;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "BIN";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }
        if ($scope.exp_CommercialInvoice.AppLabel5) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel5;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue5;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "TIN";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }
        if ($scope.exp_CommercialInvoice.AppLabel6) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel6;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue6;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "AppExtxa1";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }
        if ($scope.exp_CommercialInvoice.AppLabel7) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel7;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue7;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "AppExtxa2";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }
        if ($scope.exp_CommercialInvoice.AppLabel8) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel8;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue8;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "AppExtxa3";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }

        //Extra for bill of exchane
        if ($scope.exp_CommercialInvoice.AppLabel9) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel9;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue9;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "AppExtxa4";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }
        if ($scope.exp_CommercialInvoice.AppLabel10) {
            $scope.AppInfo.InfoLabel = $scope.exp_CommercialInvoice.AppLabel10;
            $scope.AppInfo.InfoValue = $scope.exp_CommercialInvoice.AppValue10;
            $scope.AppInfo.InfoType = "Applicants";
            $scope.AppInfo.InfoSubType = "AppExtxa5";
            $scope.AppInfo.Sorting = ++$scope.AppSorting;
            $scope.CiiInfo.push($scope.AppInfo);
            $scope.AppInfo = {};
        }
        //LC info
        if ($scope.exp_CommercialInvoice.LcInfoLabel1) {
            $scope.LcInfo.InfoLabel = $scope.exp_CommercialInvoice.LcInfoLabel1;
            $scope.LcInfo.InfoValue = $scope.exp_CommercialInvoice.LcInfoValue1;
            $scope.LcInfo.InfoType = "LcInfo";
            $scope.LcInfo.InfoSubType = "BDBankDc";
            $scope.LcInfo.Sorting = ++$scope.LcInfoSorting;
            $scope.CiiInfo.push($scope.LcInfo);
            $scope.LcInfo = {};
        }
        if ($scope.exp_CommercialInvoice.LcInfoLabel2) {
            $scope.LcInfo.InfoLabel = $scope.exp_CommercialInvoice.LcInfoLabel2;
            $scope.LcInfo.InfoValue = $scope.exp_CommercialInvoice.LcInfoValue2;
            $scope.LcInfo.InfoType = "LcInfo";
            $scope.LcInfo.InfoSubType = "ExpContact";
            $scope.LcInfo.Sorting = ++$scope.LcInfoSorting;
            $scope.CiiInfo.push($scope.LcInfo);
            $scope.LcInfo = {};
        }
        if ($scope.exp_CommercialInvoice.LcInfoLabel3) {
            $scope.LcInfo.InfoLabel = $scope.exp_CommercialInvoice.LcInfoLabel3;
            $scope.LcInfo.InfoValue = $scope.exp_CommercialInvoice.LcInfoValue3;
            $scope.LcInfo.InfoType = "LcInfo";
            $scope.LcInfo.InfoSubType = "LcInfoEx1";
            $scope.LcInfo.Sorting = ++$scope.LcInfoSorting;
            $scope.CiiInfo.push($scope.LcInfo);
            $scope.LcInfo = {};

        }
        if ($scope.exp_CommercialInvoice.LcInfoLabel4) {
            $scope.LcInfo.InfoLabel = $scope.exp_CommercialInvoice.LcInfoLabel4;
            $scope.LcInfo.InfoValue = $scope.exp_CommercialInvoice.LcInfoValue4;
            $scope.LcInfo.InfoType = "LcInfo";
            $scope.LcInfo.InfoSubType = "LcInfoEx2";
            $scope.LcInfo.Sorting = ++$scope.LcInfoSorting;
            $scope.CiiInfo.push($scope.LcInfo);
            $scope.LcInfo = {};
        }
        if ($scope.exp_CommercialInvoice.LcInfoLabel5) {
            $scope.LcInfo.InfoLabel = $scope.exp_CommercialInvoice.LcInfoLabel5;
            $scope.LcInfo.InfoValue = $scope.exp_CommercialInvoice.LcInfoValue5;
            $scope.LcInfo.InfoType = "LcInfo";
            $scope.LcInfo.InfoSubType = "LcInfoEx3";
            $scope.LcInfo.Sorting = ++$scope.LcInfoSorting;
            $scope.CiiInfo.push($scope.LcInfo);
            $scope.LcInfo = {};
            $scope.Sorting++;
        }
        if ($scope.exp_CommercialInvoice.LcInfoLabel6) {
            $scope.LcInfo.InfoLabel = $scope.exp_CommercialInvoice.LcInfoLabel6;
            $scope.LcInfo.InfoValue = $scope.exp_CommercialInvoice.LcInfoValue6;
            $scope.LcInfo.InfoType = "LcInfo";
            $scope.LcInfo.InfoSubType = "LcInfoEx4";
            $scope.LcInfo.Sorting = ++$scope.LcInfoSorting;
            $scope.CiiInfo.push($scope.LcInfo);
            $scope.LcInfo = {};
            $scope.Sorting++;
        }
        //CI
        if ($scope.exp_CommercialInvoice.CiFooterValue1) {
            $scope.CiFooter.InfoLabel = "";
            $scope.CiFooter.InfoValue = $scope.exp_CommercialInvoice.CiFooterValue1;
            $scope.CiFooter.InfoType = "CiFooter";
            $scope.CiFooter.InfoSubType = "CiFooter1";
            $scope.CiFooter.Sorting = ++$scope.CiFooterSorting;
            $scope.CiiInfo.push($scope.CiFooter);
            $scope.CiFooter = {};
        }
        if ($scope.exp_CommercialInvoice.CiFooterValue2) {
            $scope.CiFooter.InfoLabel = "";
            $scope.CiFooter.InfoValue = $scope.exp_CommercialInvoice.CiFooterValue2;
            $scope.CiFooter.InfoType = "CiFooter";
            $scope.CiFooter.InfoSubType = "CiFooter2";
            $scope.CiFooter.Sorting = ++$scope.CiFooterSorting;
            $scope.CiiInfo.push($scope.CiFooter);
            $scope.CiFooter = {};
        }
        if ($scope.exp_CommercialInvoice.CiFooterValue3) {
            $scope.CiFooter.InfoLabel = "";
            $scope.CiFooter.InfoValue = $scope.exp_CommercialInvoice.CiFooterValue3;
            $scope.CiFooter.InfoType = "CiFooter";
            $scope.CiFooter.InfoSubType = "CiFooter3";
            $scope.CiFooter.Sorting = ++$scope.CiFooterSorting;
            $scope.CiiInfo.push($scope.CiFooter);
            $scope.CiFooter = {};

        }
        if ($scope.exp_CommercialInvoice.CiFooterValue4) {
            $scope.CiFooter.InfoLabel = "";
            $scope.CiFooter.InfoValue = $scope.exp_CommercialInvoice.CiFooterValue4;
            $scope.CiFooter.InfoType = "CiFooter";
            $scope.CiFooter.InfoSubType = "CiFooter4";
            $scope.CiFooter.Sorting = ++$scope.CiFooterSorting;
            $scope.CiiInfo.push($scope.CiFooter);
            $scope.CiFooter = {};
        }
        //DC footer
        if ($scope.exp_CommercialInvoice.DcFooter1) {
            $scope.DcFooter.InfoLabel = "",
                $scope.DcFooter.InfoValue = $scope.exp_CommercialInvoice.DcFooter1,
                $scope.DcFooter.InfoType = "DcFooter",
                $scope.DcFooter.InfoSubType = "DcFooter1";
            $scope.DcFooter.Sorting = ++$scope.DcFooterSorting;
            $scope.CiiInfo.push($scope.DcFooter),
                $scope.DcFooter = {};
        }
        if ($scope.exp_CommercialInvoice.DcFooter2) {
            $scope.DcFooter.InfoLabel = "",
                $scope.DcFooter.InfoValue = $scope.exp_CommercialInvoice.DcFooter2,
                $scope.DcFooter.InfoType = "DcFooter",
                $scope.DcFooter.InfoSubType = "DcFooter2";
            $scope.DcFooter.Sorting = ++$scope.DcFooterSorting;
            $scope.CiiInfo.push($scope.DcFooter),
                $scope.DcFooter = {};
        }
        if ($scope.exp_CommercialInvoice.DcFooter3) {
            $scope.DcFooter.InfoLabel = "",
                $scope.DcFooter.InfoValue = $scope.exp_CommercialInvoice.DcFooter3,
                $scope.DcFooter.InfoType = "DcFooter",
                $scope.DcFooter.InfoSubType = "DcFooter3";
            $scope.DcFooter.Sorting = ++$scope.DcFooterSorting;
            $scope.CiiInfo.push($scope.DcFooter),
                $scope.DcFooter = {};
        }
        if ($scope.exp_CommercialInvoice.DcFooter4) {
            $scope.DcFooter.InfoLabel = "",
                $scope.DcFooter.InfoValue = $scope.exp_CommercialInvoice.DcFooter4,
                $scope.DcFooter.InfoType = "DcFooter",
                $scope.DcFooter.InfoSubType = "DcFooter4";
            $scope.DcFooter.Sorting = ++$scope.DcFooterSorting;
            $scope.CiiInfo.push($scope.DcFooter),
                $scope.DcFooter = {};
        }
        if ($scope.exp_CommercialInvoice.BankInfoLabel1) {
            $scope.ImpoterBankInfo.InfoLabel = $scope.exp_CommercialInvoice.BankInfoLabel1;
            $scope.ImpoterBankInfo.InfoValue = $scope.exp_CommercialInvoice.BankInfoValue1;
            $scope.ImpoterBankInfo.InfoType = "ImpoterBankBINVAT";
            $scope.ImpoterBankInfo.InfoSubType = "ImpoterBankBINVAT";
            $scope.ImpoterBankInfo.Sorting = ++$scope.ImpoterBankInfoSorting;
            $scope.CiiInfo.push($scope.ImpoterBankInfo);
            $scope.ImpoterBankInfo = {};
            $scope.Sorting++;
        }
        $scope.exp_CommercialInvoice.InvoiceIdsArray = [];
        var InvIds = '';
        angular.forEach($scope.InvoiceSearchList, function (e) {
            if (e.IsChecked) {
                InvIds += InvIds === '' ? ('' + e.InvoiceId) : (',' + e.InvoiceId);
                $scope.InvCount++;
            }

            $scope.exp_CommercialInvoice.InvoiceIds = InvIds;
        });
        if ($scope.InvCount == 0) {
            alertify.log('Please select at least one invoice');
            return;
        }

        //input replace
        $("#ciTable tbody td").find(":input").each(function () {
            $(this).replaceWith(this.value);
        });
        $("#ciTable tfoot tr:nth-last-child(1) th:nth-last-child(1)").each(function () {
            $scope.exp_CommercialInvoice.TotalAmount = parseFloat($(this).html());
        });
        if ($scope.TotalCPTCost > 0) {
            $scope.exp_CommercialInvoice.CPTCost = $scope.TotalCPTCost;
            $scope.exp_CommercialInvoice.IsCPT = true;
        } else {
            $scope.exp_CommercialInvoice.CPTCost = 0;
            $scope.exp_CommercialInvoice.IsCPT = false;
            //var len = $('#ciTable tfoot tr').length;
            //$('#ciTable tfoot tr').eq(len - 1).remove();
            //$('#ciTable tfoot tr').eq(len - 2).remove();
        }

        newFun();
        $('#ciTable td:nth-child(1)').remove();
        $('#ciTable th:nth-child(1)').remove();
        $scope.TableHtmlData.HtmlData = String($("#ciTable")[0].outerHTML);

        //angular.forEach($scope.ItemTableDataRow, function (anItem) {
        //    $scope.exp_CommercialInvoiceDetail.DescriptionOne = anItem[5];
        //    //$scope.exp_CommercialInvoiceDetail.CommercialInvoiceId = $scope.exp_CommercialInvoice.CommercialInvoiceId;
        //    //$scope.exp_CommercialInvoiceDetail.CommercialInvoiceDetailId = $scope.exp_CommercialInvoiceDetail.CommercialInvoiceDetailId;
        //    $scope.exp_CommercialInvoiceDetail.ItemId = anItem[2];
        //    $scope.exp_CommercialInvoiceDetail.InvoiceId = anItem[0];
        //    $scope.exp_CommercialInvoiceDetail.Quantity = parseFloat(anItem[anItem.length - 3]);
        //    $scope.exp_CommercialInvoiceDetail.UnitPrice = parseFloat(anItem[anItem.length - 2]);
        //    $scope.exp_CommercialInvoiceDetail.Amount = parseFloat(anItem[anItem.length - 1]);

        //    CIDetailObj = angular.copy($scope.exp_CommercialInvoiceDetail);
        //    $scope.CommercialInvoiceDetailList.push(CIDetailObj);
        //});

        //$scope.InvoiceDetailIdList = [];
        //angular.forEach($scope.CommercialInvoiceDetailList, function (anItem) {
        //    angular.forEach($scope.productList, function (aProduct) {
        //        $scope.InvoiceDetailIdList.push(aProduct.InvoiceDetailId);
        //        if (anItem.ItemId == aProduct.ItemId) {
        //            anItem.OrderUnitId = aProduct.OrderUnitId;
        //            //anItem.InvoiceDetailId = aProduct.InvoiceDetailId;
        //        }
        //    })
        //})

        //angular.forEach($scope.productList, function (aProduct, key, obj) {
        //    $scope.CommercialInvoiceDetailList[key].InvoiceDetailId = aProduct.InvoiceDetailId;
        //    $scope.CommercialInvoiceDetailList[key].OrderUnitId = aProduct.OrderUnitId;
        //})

        var isAmendment = true;
        $scope.exp_CommercialInvoice.IsAmendment = isAmendment;
        $scope.exp_CommercialInvoice.UpdatedBy = $scope.LoginUser.UserId;
        $scope.packingInfo.UpdatedBy = $scope.LoginUser.UserId;
        var exporterInfo = $(".summernoteExporterInfoRevise").summernote("code");
        $scope.exp_CommercialInvoice.ExporterInfo = exporterInfo;
        var exporterBankInfo = $(".summernoteExporterBankInfoRevise").summernote("code");
        $scope.exp_CommercialInvoice.ExporterBankInfo = exporterBankInfo;

        var parms = JSON.stringify({ exp_CommercialInvoice: $scope.exp_CommercialInvoice, exp_CommercialInvoiceInfo: $scope.CiiInfo, exp_CommercialInvoiceDetail: $scope.productList, modifiedDataList: $scope.CustomiseTableDataList, tableHtmlData: $scope.TableHtmlData, POReferencelist: $scope.POReferencelist, exp_CommercialInvoice_PackingInfo: $scope.packingInfo });
        $http.post('/ExpCommercialInvoice/Post', parms).success(function (data) {
            if (data > 0) {
                AppNotificationLogPost($scope.exp_CommercialInvoice, 'Commercial Invoice Revised!');
                EmailSend($scope.exp_CommercialInvoice.CommercialInvoiceNo);
                $scope.IsEdit = false;
                alertify.log('Commercial Invoice ' + status + ' Successfully!', 'success', '5000');
                Clear();
                $scope.ddlImporter = null;
                $scope.ddlImporterBank = '';
                $scope.ddlPaymentProcessType = '';
                $scope.QuantitySum = 0;
                $scope.AmountSum = 0;
                $('#ddlImporterRevise').select2('destroy');
                $('#ddlImporterRevise').val('').select2({
                    placeholder: "Search for: Company Name",
                    theme: "classic",
                    dropdownAutoWidth: false
                });
                $scope.commercialInvoiceReviseEntryForm.$setPristine();
                $scope.commercialInvoiceReviseEntryForm.$setUntouched();

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

    $scope.lockAndSubmit = function () {
        $scope.exp_CommercialInvoice.IsSubmitted = true;
        SaveCommercialInvoice();
    }
    function LoadInvoice(companyObj, commercialInvoiceId) {
        var companyId = companyObj.CompanyId;
        $scope.btnCI = "Update";
        
        $http({
            url: '/ExpInvoice/GetExpInvoiceForCiUpdate?CompanyId=' + companyId + '&CommercialInvoiceId=' + commercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.InvoiceSearchList = [];
            angular.forEach(data, function (obj) {
                var res1 = obj.InvoiceDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(obj.InvoiceDate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
                    obj.InvoiceDate = date1;
                }


                if (obj.IsChecked == 1) {
                    obj.IsChecked = true;
                    $scope.TotalCPTCost += parseFloat(obj.CPTCost);
                    $scope.totalAmountWithCPT += parseFloat(obj.AmountWithCPT);
                }
                else {
                    obj.IsChecked = false;
                }
                $scope.InvoiceSearchList.push(obj);
            });
            GetCommercialInvoiceDetailByCommercialInvoiceId(commercialInvoiceId);
            GetExpoterInfo();
            $(".summernoteExporterInfoRevise").summernote("code", $scope.exp_CommercialInvoice.ExporterInfo);
            $(".summernoteExporterBankInfoRevise").summernote("code", $scope.exp_CommercialInvoice.ExporterBankInfo);

        });
    }

    function GetSubCategoryByItemIds() {
        var idsConcat = "";
        angular.forEach($scope.InvoiceWiseItemList, function (aitem) {
            idsConcat += idsConcat === '' ? ('' + aitem.ItemId) : (',' + aitem.ItemId);
        });

        $scope.ItemCategory = [];
        $http({
            url: '/Item/GetSubCategoryByItemIds?itemIds=' + idsConcat,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (subItem) {
            $scope.ItemCategory = subItem;
        });
    }

    function QuantityAndAmountSum() {
        $scope.QtySumForItem = 0;
        $scope.AmountSumForItem = 0;
        $scope.totalAmountWithCPT = 0;
        angular.forEach($scope.ItemTableDataRow, function (aItem) {
            $scope.QtySumForItem += parseFloat(aItem[aItem.length - 3]);
            $scope.AmountSumForItem += parseFloat(aItem[aItem.length - 1]);
            $scope.totalAmountWithCPT += parseFloat(aItem[aItem.length - 1]);
        });
        $scope.totalAmountWithCPT += parseFloat($scope.TotalCPTCost);
    }


    function restMergeInvoiceDetails() {
        $scope.ItemCategory = [];

        $('.btnReport').attr('disabled', false);
        $("#ciTable  tr th:nth-child(n)").each(function () {
            $(this).attr("contenteditable", "false");
        });
        $scope.exp_CommercialInvoice.CommercialInvoiceNo = '';
        //$scope.exp_CommercialInvoice.CiFooterValue1 = "We here by certify that the information on this Invoice is true and correct and that the contents of this shipment are as per Proforma Invoice.";
        //$scope.exp_CommercialInvoice.DcFooter1 = "Delivery Challan should be treated as transport Document/Truck Receipt. The goods have been received by the applicants in good condition."
        //$scope.exp_CommercialInvoice.ShipmentMode = "By Road, Dhaka, Bangladesh. Inco terms 2020";
        //$scope.exp_CommercialInvoice.Covering = "Accessories For 100% Export Oriented Garments Industries are made in Bangladesh.";
        //$scope.exp_CommercialInvoice.CountryOfOrigin = "Bangladesh";
        $scope.exp_CommercialInvoice.HsCode = "HS Code";
        $scope.exp_CommercialInvoice.MasterContactNo = "Master Contact No";
        $scope.index = 0;
        $scope.baseHeaderCount = 0;
        $scope.baseRowCount = 0;
        $scope.Count = 0;
        $scope.column_num = 0;
        $scope.row_num = 0;
        $scope.CountAmount = 0;

        $scope.QtySumForItem = 0;
        $scope.ItemRow = [];
        $scope.PIH = 0;
        $scope.PIR = 0;
        $scope.colNo = 0;
        $scope.ItemTableHeaders = [];
        $scope.ItemTableFooter = [];
        $scope.ItemTableFooterForCPT = [];
        $scope.ItemTableFooterForCPTTotal = [];
        $scope.ItemTableDataRow = [];
        $scope.DataRow = [];
        $scope.ItemTableHeadersN = [];
        $scope.ItemTableHeaders1 = [];
        $scope.InvoiceWiseItemList = [];
        $scope.invoiceDetailList = [];
        $scope.CustomiseTableDataList = [];
        $scope.productList = [];
        $scope.productListTemp = [];
        $scope.duplicateProduct = [];
        $scope.margeProduct = [];
        $scope.exp_CommercialInvoice.PiRefNo = '';
        $scope.exp_CommercialInvoice.PiRefDate = '';
        $scope.PiRefNo = [];
        $scope.PiRefDate = [];
        $scope.POReferencelist = [];
        $scope.CustomiseTableData = {};
        $scope.TableHtmlData = {};
        $scope.AmountSumForItem = 0;
        $scope.QtySumForItem = 0;
        $scope.QuantitySum = 0;
        $scope.AmountSum = 0;
        $scope.TotalCPTCost = 0;
        $scope.AmountWithCPT = 0;
        $scope.totalAmountWithCPT = 0;
        $scope.CountAmount = 0;
        $scope.chkDisable = false;
        $scope.btnRemoveEditDisable = true;
        $scope.btnSwapDisable = true;
        $scope.btnRemoveHide = false;
        $scope.itemFlag = false;
        for (var i = 0; i < $scope.InvoiceSearchList.length; i++) {
            $scope.InvoiceSearchList[i].IsChecked = false;
            $scope.InvoiceSearchList[i].disabled = false;
        }
    //});
    }
    $scope.restMergeInvoiceDetailsForDDL = function () {

        restMergeInvoiceDetails();
    }

    $scope.restMergeInvoiceDetails = function () {
        var result = confirm("Are you sure to reset all data?");
        if (result) {
            restMergeInvoiceDetails();
        }
    }
    $scope.mergeInvoiceDetailsByItemname = function (subcategoryRow) {
        if (subcategoryRow.IsChecked) {
            if ($scope.InvoiceWiseItemList.length) {

                var SubItemWiseItemList = angular.copy($scope.InvoiceWiseItemList);
                $scope.TempArray = [];
                $scope.InvoiceWiseItemList = [];

                for (var i = 0; i < $scope.InvoiceSearchList.length; i++) {
                    $scope.InvoiceSearchList[i].disabled = true;
                };
                angular.forEach(SubItemWiseItemList, function (aItem) {
                    if (!aItem.IsMerge) {
                        aItem.IsMerge = false;
                    }
                    if (subcategoryRow.SubCategoryId === aItem.SubCategoryId && SubItemWiseItemList.filter(e => e.ItemId === aItem.ItemId).length > 1) {
                        aItem.IsMerge = true;
                        var isExist = Enumerable.From($scope.TempArray).Where('$.ItemId==' + aItem.ItemId).FirstOrDefault();
                        if (isExist) {
                            aItem.OrderQty += isExist.OrderQty;
                            aItem.Amount += isExist.Amount;
                            var indexDelete = $scope.TempArray.indexOf(isExist);
                            $scope.TempArray.splice(indexDelete, 1);
                        }
                        $scope.TempArray.push(aItem);
                    }
                    else {

                        $scope.InvoiceWiseItemList.push(aItem);

                    }
                });
                angular.forEach($scope.TempArray,
                    function (dataObj) {
                        $scope.InvoiceWiseItemList.push(dataObj);
                    });
            }

        }
        else {
            if ($scope.InvoiceWiseItemList.length) {
                $scope.InvoiceWiseItemList = angular.copy($scope.AfterUnmerge);
                var SubItemWiseItemList = angular.copy($scope.InvoiceWiseItemList);
                $scope.decreaseIndex = 0;
                angular.forEach(SubItemWiseItemList, function (aItem) {

                    if (aItem.SubCategoryId == subcategoryRow.SubCategoryId && aItem.IsMerge == true) {
                        var indexDelete = SubItemWiseItemList.indexOf(aItem);

                        $scope.decreaseIndex == 0 ? $scope.InvoiceWiseItemList.splice(indexDelete, 1) : $scope.InvoiceWiseItemList.splice((indexDelete - $scope.decreaseIndex), 1);
                        $scope.decreaseIndex++;

                    }
                });

                var SubItemWiseItemList = angular.copy($scope.invoiceDetailSplittedList);
                angular.forEach($scope.invoiceDetailSplittedList, function (aItem) {
                    if (aItem.SubCategoryId === subcategoryRow.SubCategoryId && SubItemWiseItemList.filter(e => e.ItemId === aItem.ItemId).length > 1) {
                        $scope.InvoiceWiseItemList.push(aItem);
                    }
                });
                var isExist = Enumerable.From($scope.ItemCategory).Where('$.IsChecked==true').FirstOrDefault();
                if (!isExist) {
                    for (var i = 0; i < $scope.InvoiceSearchList.length; i++) {
                        $scope.InvoiceSearchList[i].disabled = false;
                    };
                }

            }
        }
    }

    function rearrangeSerial() {
        var serial = 1;
        angular.forEach($scope.ItemTableDataRow,
            function (aRow) {
                for (var i = 0; i < aRow.length; i++) {
                    if (i === 3) {
                        aRow[3] = serial++;
                    }
                }
            });
    }
    function GetAllItem() {
        $scope.ItemSearchList = [];
        $http({
            url: "/Item/GetAllItem",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.ItemSearchList = data;
            angular.forEach($scope.ItemSearchList,
                function (aData) {
                    aData.TempItemName = aData.ItemName
                        +
                        " ~ " +
                        aData.ItemDescription +
                        " ~ " +
                        aData.ItemDescriptionTwo +
                        " ~ " + "Unit Per Package:" +
                        aData.UnitPerPackage +
                        " ~ " + aData.HsCode +
                        " ~ " + "Item Code:" +
                        aData.ItemCode +
                        " ~ " + "Package Per Container:" +
                        aData.PackagePerContainer +
                        " ~ " + "Package Weight:" +
                        aData.PackageWeight +
                        " ~ " + "Container Weight:" +
                        aData.ContainerWeight +
                        " ~ " + "Item Id:" +
                        aData.ItemId;


                });
            

        });
    };
    function dynamictable() {
        $("#ciTable").on("click",
            function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(e.target).is("#ciTable tbody tr td")) {
                    $("#ciTable tbody tr td").each(function () {
                        $(this).css("background", "#F5F5F5");
                    });
                    $(e.target).css("background", "yellow");
                    $("#ciTable tbody tr td:nth-last-child(-n+3)").each(function () {
                        $(this).css("background", "transparent");
                    });
                    $scope.column_numP1 = parseInt($(e.target).index()) + 1; //need this one
                    $scope.row_numP1 = parseInt($(e.target).parent().index()) + 1;
                    $("#ciTable tbody tr").each(function (index) {
                        $(this).hover(function () {
                            $scope.SelectItemId = $(this).children('td')[0].childNodes[5].outerText.replace(/\D/g, '');
                            //console.log($scope.SelectItemId);
                            $scope.SelectedItem = $rootScope.ItemSearchList.find(x => x.ItemId == $scope.SelectItemId);
                            //console.log($scope.SelectedItem);
                            $(this).css('cursor', 'pointer').attr('title', $scope.SelectedItem.TempItemName);
                        }, function () {
                            $(this).css('cursor', 'auto');
                        });
                    });
                    $("#result").html("<h3>Row Number: " + $scope.row_numP1 + "  ,  Column Number: " + $scope.column_numP1 + "</h3>");
                }

            });


        $("#PIHeader1").on("click",
            function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(e.target).is("#PIHeader1 tbody tr td")) {
                    $("#PIHeader1 tbody tr td").each(function () {
                        $(this).css("background", "#F5F5F5");
                    });
                    $(e.target).css("background", "yellow");
                    $scope.column_num = parseInt($(e.target).index()); //need this one
                    $scope.row_num = parseInt($(e.target).parent().index());
                    $("#resultH1").html("<h3>Row Number: " + $scope.row_num + "  ,  Column Number: " + $scope.column_num + "</h3>");

                }

            });

    }
    Array.prototype.swap = function (index_A, index_B) {
        var input = this;

        var temp = input[index_A];
        input[index_A] = input[index_B];
        input[index_B] = temp;
    }
    function checkMovealbeColumn(col) {
        var isOk = true;
        var len = $scope.ItemTableHeadersN[$scope.row_num].length - 3;
        if (col < len && col > 5) {
            $scope.isCheck = true;
        }
        else {
            isOk = false;
        }
        return isOk;
    }
    hotkeys.add({
        combo: 'ctrl+left',
        description: 'This one goes to 11',
        callback: function () {
            if ($scope.btnSwapDisable == true) {
                return;
            }
            leftSwap();
        }
    });

    hotkeys.add({
        combo: 'ctrl+right',
        description: 'This one goes to 11',
        callback: function () {
            if ($scope.btnSwapDisable == true) {
                return;
            }
            rightSwap();
        }
    });

    $scope.leftSwap = function () {
        leftSwap();
    }


    function leftSwap() {
        $scope.colNo = 0;
        $scope.colNo = $scope.column_num + 2;
        if ($scope.colNo != 2) {
            if (checkMovealbeColumn($scope.colNo) && ($scope.colNo - 1) > 5) {
                $scope.ItemTableHeadersN[$scope.row_num].swap($scope.colNo - 1, $scope.colNo);
                $scope.PIH = $scope.ItemTableHeadersN[$scope.row_num][0];
                for (var i = 0; i < $scope.ItemTableDataRow.length; i++) {

                    $scope.PIR = $scope.ItemTableDataRow[i][0];

                    if ($scope.PIH == $scope.PIR) {
                        $scope.ItemTableDataRow[i].swap($scope.colNo - 1, $scope.colNo);

                    }
                }
            }
            else {
                //alert("Can't move this Column");
                alertify.log("Can't move this Column!!!", "error", "5000");
            }
            $scope.column_num = 0;
            $scope.row_num = 0;
            $scope.PIH = 0;
            $scope.PIR = 0;
            $scope.colNo = 0;


            $("#PIHeader1 tbody tr td").each(function () {
                $(this).css("background", "transparent");
            });
        }
        else {
            alertify.log("Please Select Header !!!", "error", "5000");
        }


    }
    $scope.rightSwap = function () {
        rightSwap();
    }

    function rightSwap() {
        $scope.colNo = 0;
        $scope.colNo = $scope.column_num + 2;
        var len = $scope.ItemTableHeadersN[$scope.row_num].length - 3;
        if ($scope.colNo != 2) {
            if (checkMovealbeColumn($scope.colNo) && ($scope.colNo + 1) < len) {
                $scope.ItemTableHeadersN[$scope.row_num].swap($scope.colNo + 1, $scope.colNo);
                $scope.PIH = $scope.ItemTableHeadersN[$scope.row_num][0];
                for (var i = 0; i < $scope.ItemTableDataRow.length; i++) {

                    $scope.PIR = $scope.ItemTableDataRow[i][0];

                    if ($scope.PIH == $scope.PIR) {
                        $scope.ItemTableDataRow[i].swap($scope.colNo + 1, $scope.colNo);

                    }
                }
            }
            else {
                //alert("Can't move this Column");
                alertify.log("Can't move this Column !!!", "error", "5000");
            }
            $scope.column_num = 0;
            $scope.row_num = 0;
            $scope.PIH = 0;
            $scope.PIR = 0;
            $scope.colNo = 0;

            $("#PIHeader1 tbody tr td").each(function () {
                $(this).css("background", "transparent");
            });
        }
        else {
            alertify.log("Please Select Header !!!", "error", "5000");
        }

    }

    function PIheaderCountCheck(baseHeaderCount, newHeaderCount) {

        var isOk = true;
        if (baseHeaderCount == 0) {
            isOk = true;
        }
        else {
            if (baseHeaderCount != newHeaderCount) {
                isOk = false;
            }
        }
        return isOk;
    }

    function PIRowCountCheck(baseRowCount, newRowCount) {

        var isOkRow = true;
        if (baseRowCount == 0) {
            isOkRow = true;
        }
        else {
            if (baseRowCount != newRowCount) {
                isOkRow = false;
            }
        }
        return isOkRow;
    }



    $scope.SelectCheck = function (row, value) {

        $scope.piId = 0;
        var invoiceId = row.InvoiceId;
        $scope.piId = invoiceId;
        var salesOrderId = row.SalesOrderIds;
        $scope.insertItemCount = undefined;
        if (value == true) {
            if (row.PINoPostfix != null) {
                var InvoiceNoPostfix = row.InvoiceNo + row.PINoPostfix;
            } else {
                var InvoiceNoPostfix = row.InvoiceNo;
            }

            $scope.exp_CommercialInvoice.CompanyId = row.CompanyId;
            $scope.exp_CommercialInvoice.CompanyName = row.CompanyName;
            $scope.exp_CommercialInvoice.CompanyNameBilling = row.CompanyNameBilling;
            $scope.exp_CommercialInvoice.AddressBilling = row.AddressBilling;
            $scope.exp_CommercialInvoice.CompanyNameDelivery = row.CompanyNameDelivery;
            $scope.exp_CommercialInvoice.AddressDelivery = row.AddressDelivery;
            $scope.exp_CommercialInvoice.RefEmployeeId = row.RefEmployeeId;
            alertify.log("Company Address Loaded !!!", "success", "5000");

            $scope.PiRefNo.push(InvoiceNoPostfix);
            $scope.PiRefDate.push(row.InvoiceDate);
            $scope.exp_CommercialInvoice.PiRefNo = '';
            $scope.exp_CommercialInvoice.PiRefDate = '';
            $scope.exp_CommercialInvoice.PiRefNo = $scope.PiRefNo;
            $scope.exp_CommercialInvoice.PiRefDate = $scope.PiRefDate;
            $scope.exp_CommercialInvoice.PiRefNo = $scope.exp_CommercialInvoice.PiRefNo.toString();
            $scope.exp_CommercialInvoice.PiRefDate = $scope.exp_CommercialInvoice.PiRefDate.toString();
            ////////////////////////////////////////
            $http({
                url: '/ExpInvoice/GetPOReference?DocType=PI' + "&DocumentId=" + row.InvoiceId,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data.length) {
                    //$scope.POReferencelist = [];
                    angular.forEach(data, function (aPODetail) {
                        aPODetail.DocType = 'CI';

                        var res2 = aPODetail.PODate.substring(0, 5);
                        if (res2 == "/Date") {
                            var parsedDate1 = new Date(parseInt(aPODetail.PODate.substr(6)));
                            var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                            aPODetail.PODate = date1;
                        }

                        var POCheckList = $scope.POReferencelist.filter(aPO => aPO.POReferenceId === aPODetail.POReferenceId);
                        if (POCheckList.length > 0) {

                        } else {
                            $scope.POReferencelist.push(aPODetail);

                        }

                    })
                    

                }

            });
            if (row.CPTCost == null) {
                row.CPTCost = 0;
            }
            if (row.AmountWithCPT == null) {
                row.AmountWithCPT = 0;
            }
            /*if (row.IsCPT) {*/
            $scope.TotalCPTCost += parseFloat(row.CPTCost);
            $scope.totalAmountWithCPT += parseFloat(row.AmountWithCPT);
           /* }*/
            /////////////////////////////////////////////
            ////////////////////////////
            $http({
                url: "/ExpInvoice/InvoiceDetailGetByInvoiceId?invoiceId=" + invoiceId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (Productdata) {

                //$scope.productListTemp = [];
                $scope.productListTemp = Productdata;

                angular.forEach($scope.productListTemp, function (aProduct) {
                    /*aProduct.HSCode = aProduct.HsCode;*/
                    $scope.productList.push(aProduct);
                    $scope.lenProductPush = $scope.productList.length;
                });

            });
            if ($scope.duplicateProduct != undefined) {
                $scope.duplicateProduct = $scope.productList;
            }
            //////////////////////////////////

            $scope.btnSwapDisable = false;
            $scope.btnRemoveEditDisable = false;
            ++$scope.Count;
            var invoiceNo = row.InvoiceNo;
            var rtlArr = invoiceNo.split('/');
            var rtl = rtlArr[0];
            var year = rtlArr[1];
            var piArr = rtlArr[2].split('-');
            var pi = piArr[0];
            var num = piArr[1];

            var commercialInvoiceNo = '';
            var ciPrefix = '';
            if ($scope.Count == 1) {
                commercialInvoiceNo = '';
                ciPrefix = rtl + '/' + year + '/CI-';
            }

            commercialInvoiceNo = commercialInvoiceNo + num;
            if ($scope.exp_CommercialInvoice.CommercialInvoiceNo == undefined ||
                $scope.exp_CommercialInvoice.CommercialInvoiceNo == null ||
                $scope.exp_CommercialInvoice.CommercialInvoiceNo == '') {

                $scope.exp_CommercialInvoice.CommercialInvoiceNo = ciPrefix + commercialInvoiceNo;
                $scope.IsCiNoExist = commercialInvoiceNo;
                commercialInvoiceNo = '';

            } else if ($scope.IsCiNoExist != '') {
                var str = $scope.exp_CommercialInvoice.CommercialInvoiceNo;
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = str.replace(/\s/g, '');
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = $scope.exp_CommercialInvoice.CommercialInvoiceNo.replace("&", ",");

                $scope.exp_CommercialInvoice.CommercialInvoiceNo = ciPrefix +
                    $scope.exp_CommercialInvoice.CommercialInvoiceNo + " " +
                    '&' + " " +
                    commercialInvoiceNo;

                commercialInvoiceNo = '';

            }

            dynamictable();

            $http({
                url: "/ExpCommercialInvoice/GetCommercialInvoiceDetailModifiedDataGetByInvoiceId?invoiceId=" + invoiceId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {

                $scope.ItemLists = data;
                var InvoiceWiseItemSubListAdd = $scope.ItemLists;
                $scope.ItemTableFooter = [];
                $scope.ItemTableFooterForCPT = [];
                $scope.ItemTableFooterForCPTTotal = [];
                angular.forEach(InvoiceWiseItemSubListAdd, function (aItem) {
                    $scope.ItemRow = Object.keys(aItem).map(e => aItem[e]);
                    $scope.ItemRow.unshift(invoiceId);

                    $scope.ItemTableHeaders = Object.getOwnPropertyNames(aItem);
                    $scope.ItemTableHeaders.unshift(invoiceId);
                    $scope.ItemTableHeaders1 = $scope.ItemTableHeaders;

                    if (PIRowCountCheck($scope.baseRowCount, $scope.ItemRow.length)) {


                        var n = $scope.ItemRow[4].indexOf("HS");
                        $scope.ItemRow[4] = $scope.ItemRow[4].slice(0, n);
                        $scope.ItemTableDataRow.push($scope.ItemRow);
                        $scope.baseRowCount = $scope.ItemRow.length;
                    }

                    rearrangeSerial();

                });


                if (PIheaderCountCheck($scope.baseHeaderCount, $scope.ItemTableHeaders1.length)) {

                    $scope.ItemTableHeadersN.push($scope.ItemTableHeaders);
                    $scope.baseHeaderCount = $scope.ItemTableHeaders.length;
                    for (var i = 0; i < $scope.ItemTableHeadersN[0].length; i++) {
                        if (i == $scope.ItemTableHeadersN[0].length - 3) {
                            $scope.ItemTableFooter.push($scope.QtySumForItem);
                            $scope.ItemTableFooterForCPT.push("");
                            $scope.ItemTableFooterForCPTTotal.push($scope.QtySumForItem);
                        } else if (i == $scope.ItemTableHeadersN[0].length - 1) {
                            $scope.ItemTableFooter.push($scope.AmountSumForItem);
                            $scope.ItemTableFooterForCPT.push($scope.TotalCPTCost);
                            $scope.ItemTableFooterForCPTTotal.push($scope.totalAmountWithCPT);
                        } else if (i == $scope.ItemTableHeadersN[0].length - 4) {
                            $scope.ItemTableFooter.push("");
                            $scope.ItemTableFooterForCPT.push("Freight Charge");
                            $scope.ItemTableFooterForCPTTotal.push("");
                        }
                        else {
                            $scope.ItemTableFooter.push("");
                            $scope.ItemTableFooterForCPT.push("");
                            $scope.ItemTableFooterForCPTTotal.push("");
                        }

                    }
                }
                else {
                    for (var i = 0; i < $scope.ItemTableHeadersN[0].length; i++) {
                        if (i == $scope.ItemTableHeadersN[0].length - 3) {
                            $scope.ItemTableFooter.push($scope.QtySumForItem);
                            $scope.ItemTableFooterForCPT.push("");
                            $scope.ItemTableFooterForCPTTotal.push($scope.QtySumForItem);
                        } else if (i == $scope.ItemTableHeadersN[0].length - 1) {
                            $scope.ItemTableFooter.push($scope.AmountSumForItem);
                            $scope.ItemTableFooterForCPT.push($scope.TotalCPTCost);
                            $scope.ItemTableFooterForCPTTotal.push($scope.totalAmountWithCPT);
                        } else if (i == $scope.ItemTableHeadersN[0].length - 4) {
                            $scope.ItemTableFooter.push("");
                            $scope.ItemTableFooterForCPT.push("Freight Charge");
                            $scope.ItemTableFooterForCPTTotal.push("");
                        }
                        else {
                            $scope.ItemTableFooter.push("");
                            $scope.ItemTableFooterForCPT.push("");
                            $scope.ItemTableFooterForCPTTotal.push("");
                        }

                    }
                    //alert("Column count for the selected PI is not matched !!!"); 
                    alertify.log("Column count for the selected PI is not matched !!!", "error", "5000");
                    //For pop Date & No
                    $scope.exp_CommercialInvoice.PiRefNo = '';
                    $scope.exp_CommercialInvoice.PiRefDate = '';
                    $scope.PiRefNo.pop();
                    $scope.PiRefDate.pop();
                    $scope.exp_CommercialInvoice.PiRefNo = $scope.PiRefNo;
                    $scope.exp_CommercialInvoice.PiRefDate = $scope.PiRefDate;
                    $scope.exp_CommercialInvoice.PiRefNo = $scope.exp_CommercialInvoice.PiRefNo.toString();
                    $scope.exp_CommercialInvoice.PiRefDate = $scope.exp_CommercialInvoice.PiRefDate.toString();


                    --$scope.Count;
                    var invoiceNo = row.InvoiceNo;
                    var rtlArr = invoiceNo.split('/');
                    var rtl = rtlArr[0];
                    var year = rtlArr[1];
                    var piArr = rtlArr[2].split('-');
                    var pi = piArr[0];
                    var num1 = piArr[1];

                    var CiApart = $scope.exp_CommercialInvoice.CommercialInvoiceNo.split('CI-');

                    var invoiceApart = CiApart[1].split('&');

                    if (invoiceApart[0].replace(/\s/g, '') == num1.toString()) {
                        var ampercentNum1 = num1 + '&';
                        $scope.exp_CommercialInvoice.CommercialInvoiceNo =
                            $scope.exp_CommercialInvoice.CommercialInvoiceNo.toString().replace(ampercentNum1, '');

                    }
                    else {
                        var ampercentNum2 = '&' + num1;
                        $scope.exp_CommercialInvoice.CommercialInvoiceNo = $scope.exp_CommercialInvoice.CommercialInvoiceNo.replace(/\s/g, '');
                        $scope.exp_CommercialInvoice.CommercialInvoiceNo =
                            $scope.exp_CommercialInvoice.CommercialInvoiceNo.toString().replace(ampercentNum2, '');
                        $scope.exp_CommercialInvoice.CommercialInvoiceNo = $scope.exp_CommercialInvoice.CommercialInvoiceNo.replace(",", " & ");
                    }
                    var dtlListForCheck = Enumerable.From($scope.InvoiceSearchList).Where("$.InvoiceId == " + invoiceId)
                        .FirstOrDefault();
                    $scope.indexForCheck = $scope.InvoiceSearchList.indexOf(dtlListForCheck);
                    $scope.InvoiceSearchList[$scope.indexForCheck].IsChecked = false;

                    $scope.TempQty = 0;
                    $scope.TempAmount = 0.00;
                    $scope.DataRow = [];
                    angular.forEach($scope.ItemTableDataRow,
                        function (aDetailForCalculation) {

                            if (aDetailForCalculation[0] == $scope.piId) {

                                $scope.DataRow.push(aDetailForCalculation);

                            }
                        });


                    for (var i = 0; i < $scope.DataRow.length; i++) {
                        $scope.TempQty += Number($scope.DataRow[i][$scope.DataRow[i].length - 3]);
                        $scope.TempAmount += Number($scope.DataRow[i][$scope.DataRow[i].length - 1]);
                    }
                    $scope.AmountSumForItem -= $scope.TempAmount;
                    $scope.QtySumForItem -= $scope.TempQty;
                    if (row.CPTCost == null) {
                        row.CPTCost = 0;
                    }
                    if (row.AmountWithCPT == null) {
                        row.AmountWithCPT = 0;
                    }
                    /*if (row.IsCPT) {*/
                    $scope.TotalCPTCost -= parseFloat(row.CPTCost);
                    $scope.totalAmountWithCPT -= parseFloat(row.AmountWithCPT);
                    /*}*/
                    $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = Number($scope.AmountSumForItem).toFixed(2);
                    $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = Number($scope.QtySumForItem).toFixed(2);

                    $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = Number($scope.TotalCPTCost).toFixed(2);
                    $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 4] = "Freight Charge";

                    $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = Number($scope.totalAmountWithCPT).toFixed(2);
                    $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = Number($scope.QtySumForItem).toFixed(2);

                    /////////////////////////////////////////////////


                    var dtlList = Enumerable.From($scope.POReferencelist).Where("$.DocumentId === " + row.InvoiceId)
                        .ToArray();

                    angular.forEach(dtlList,
                        function (aDetail) {
                            var detail = Enumerable.From($scope.POReferencelist)
                                .Where("$.DocumentId === " + aDetail.DocumentId).FirstOrDefault();
                            var index = $scope.POReferencelist.indexOf(detail);
                            $scope.POReferencelist.splice(index, 1);
                        });
                    ////////////////////////////////////
                    //ForProductUncheck
                    ////////////////////////////////////
                    var dtlProductList = Enumerable.From($scope.productList).Where("$.InvoiceId === " + row.InvoiceId)
                        .ToArray();

                    angular.forEach(dtlProductList,
                        function (aProductDetail) {
                            var productDetail = Enumerable.From($scope.productList)
                                .Where("$.InvoiceId === " + aProductDetail.InvoiceId).FirstOrDefault();
                            var index = $scope.productList.indexOf(productDetail);
                            $scope.productList.splice(index, 1);
                            $scope.productListTemp = angular.copy($scope.productList);
                            $scope.lenProductsplice = $scope.productList.length;
                        });
                    if ($scope.duplicateProduct != undefined) {
                        $scope.duplicateProduct = $scope.productList;
                    }
                    ///////////////////////////////
                    return;
                }

            });


        } else {

            --$scope.Count;
            var invoiceNo = row.InvoiceNo;
            var rtlArr = invoiceNo.split('/');
            var rtl = rtlArr[0];
            var year = rtlArr[1];
            var piArr = rtlArr[2].split('-');
            var pi = piArr[0];
            var num1 = piArr[1];

            var CiApart = $scope.exp_CommercialInvoice.CommercialInvoiceNo.split('CI-');

            var invoiceApart = CiApart[1].split(/\,|\&/g);

            if (invoiceApart[0].replace(/\s/g, '') == num1.toString()) {
                var ampercentNum1 = num1 + ',';
                var ampercentNum2 = num1 + '&';
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = $scope.exp_CommercialInvoice.CommercialInvoiceNo.replace(/\s/g, '');
                $scope.exp_CommercialInvoice.CommercialInvoiceNo =
                    $scope.exp_CommercialInvoice.CommercialInvoiceNo.toString().replace(ampercentNum1, '');
                $scope.exp_CommercialInvoice.CommercialInvoiceNo =
                    $scope.exp_CommercialInvoice.CommercialInvoiceNo.toString().replace(ampercentNum2, '');

            } else {

                var ampercentNum3 = '&' + num1;
                var ampercentNum4 = ',' + num1;
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = $scope.exp_CommercialInvoice.CommercialInvoiceNo.replace(/\s/g, '');
                $scope.exp_CommercialInvoice.CommercialInvoiceNo =
                    $scope.exp_CommercialInvoice.CommercialInvoiceNo.toString().replace(ampercentNum4, '');
                $scope.exp_CommercialInvoice.CommercialInvoiceNo =
                    $scope.exp_CommercialInvoice.CommercialInvoiceNo.toString().replace(ampercentNum3, '');
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = $scope.exp_CommercialInvoice.CommercialInvoiceNo.replace(",", " & ");

            }
            if ($scope.Count == 0) {
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = '';
            }

            $scope.TempQty = 0;
            $scope.TempAmount = 0.00;
            $scope.index = 0;
            angular.forEach($scope.ItemTableHeadersN, function (aHeader) {

                if (aHeader[0] == invoiceId) {
                    $scope.index1 = $scope.ItemTableHeadersN.indexOf(aHeader);
                    $scope.ItemTableHeadersN.splice($scope.index1, 1);

                    $scope.exp_CommercialInvoice.PiRefNo = '';
                    $scope.exp_CommercialInvoice.PiRefDate = '';
                    $scope.PiRefNo.splice($scope.index1, 1);
                    $scope.PiRefDate.splice($scope.index1, 1);
                    $scope.exp_CommercialInvoice.PiRefNo = $scope.PiRefNo;
                    $scope.exp_CommercialInvoice.PiRefDate = $scope.PiRefDate;
                    $scope.exp_CommercialInvoice.PiRefNo = $scope.exp_CommercialInvoice.PiRefNo.toString();
                    $scope.exp_CommercialInvoice.PiRefDate = $scope.exp_CommercialInvoice.PiRefDate.toString();

                    /////////////////////////////////////////////////
                    
                    var dtlList = Enumerable.From($scope.POReferencelist).Where("$.DocumentId === " + row.InvoiceId)
                        .ToArray();

                    angular.forEach(dtlList,
                        function (aDetail) {
                            var detail = Enumerable.From($scope.POReferencelist)
                                .Where("$.DocumentId === " + aDetail.DocumentId).FirstOrDefault();
                            var index = $scope.POReferencelist.indexOf(detail);
                            $scope.POReferencelist.splice(index, 1);
                            //$scope.POReferencelistTemp = angular.copy($scope.POReferencelist);
                        });

                    ////////////////////////////////////
                    //ForProductUncheck
                    ////////////////////////////////////
                    var dtlProductList = Enumerable.From($scope.productList).Where("$.InvoiceId === " + row.InvoiceId)
                        .ToArray();

                    angular.forEach(dtlProductList,
                        function (aProductDetail) {
                            var productDetail = Enumerable.From($scope.productList)
                                .Where("$.InvoiceId === " + aProductDetail.InvoiceId).FirstOrDefault();
                            var index = $scope.productList.indexOf(productDetail);
                            $scope.productList.splice(index, 1);
                            $scope.productListTemp = angular.copy($scope.productList);
                        });
                    if ($scope.duplicateProduct != undefined) {
                        $scope.duplicateProduct = $scope.productList;
                    }
                    ///////////////////////////////


                }
            });

            $scope.DataRow = [];
            angular.forEach($scope.ItemTableDataRow,
                function (aDetail) {

                    if (aDetail[0] == $scope.piId) {

                        $scope.DataRow.push(aDetail);


                    }
                });

            var indexB = rowSplice($scope.DataRow);
            $scope.ItemTableDataRow = $scope.ItemTableDataRow.filter(function (el) {

                return !(JSON.stringify(el) in indexB);
            });


            $scope.InvoiceWiseItemList = [];
            for (var i = 0; i < $scope.ItemTableDataRow.length; i++) {
                var result = {};
                $scope.ItemTableHeadersN[0].forEach((key, j) => result[key] = $scope.ItemTableDataRow[i][j]);
                $scope.InvoiceWiseItemList.push(result)
            }

            for (var i = 0; i < $scope.DataRow.length; i++) {
                $scope.TempQty += Number($scope.DataRow[i][$scope.DataRow[i].length - 3]);
                $scope.TempAmount += Number($scope.DataRow[i][$scope.DataRow[i].length - 1]);
            }
            $scope.AmountSumForItem -= $scope.TempAmount;
            $scope.QtySumForItem -= $scope.TempQty;
            if (row.CPTCost == null) {
                row.CPTCost = 0;
            }
            if (row.AmountWithCPT == null) {
                row.AmountWithCPT = 0;
            }
            /*if (row.IsCPT) {*/
                $scope.TotalCPTCost -= parseFloat(row.CPTCost);
            /*}*/

            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = Number($scope.AmountSumForItem).toFixed(2);
            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = Number($scope.QtySumForItem).toFixed(2);

            $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = Number($scope.TotalCPTCost).toFixed(2);
            $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 4] = "Freight Charge";

            if ($scope.ItemTableDataRow.length == 0) {
                $scope.exp_CommercialInvoice.CommercialInvoiceNo = '';
                $scope.InvoiceWiseItemList = [];
                $scope.ItemTableHeadersN = [];
                $scope.ItemTableDataRow = [];
                $scope.DataRow = [];
                $scope.ItemTableFooter = [];
                $scope.ItemTableFooterForCPT = [];
                $scope.ItemTableFooterForCPTTotal = [];
                $scope.exp_CommercialInvoice.PiRefNo = '';
                $scope.exp_CommercialInvoice.PiRefDate = '';
                $scope.PiRefNo = [];
                $scope.PiRefDate = [];
                //$scope.POReferencelist = [];
                //$scope.POReferencelistTemp = [];
                $scope.productListTemp = [];
                $scope.productList = [];
                $scope.duplicateProduct = [];
                $scope.margeProduct = [];
                $scope.AmountSumForItem = 0;
                $scope.UnitpriceSumForItem = 0;
                $scope.QtySumForItem = 0;
                $scope.baseHeaderCount = 0;
                $scope.baseRowCount = 0;
                $scope.btnSwapDisable = true;
                $scope.btnRemoveEditDisable = true;
            }
            rearrangeSerial();
            GetSubCategoryByItemIds();
        }


        //RTLE/20-21/CI-1 & 2
        row.IsChecked = value;
        if (row.IsChecked) {
            $scope.CountAmount += row.Amount;
            // ++$scope.Count;

        }
        else {
            $scope.CountAmount -= row.Amount;

        }
        $scope.exp_CommercialInvoice.Amount = $scope.CountAmount;
    }

    function rowSplice(arr) {
        return arr.reduce(function (acc, item) {
            return acc[JSON.stringify(item)] = item, acc
        }, {});
    }


    $scope.GetCompanyByPaymentProcessType = function () {
        GetAllActiveCompany();
    }



    $scope.CommercialInvoiceSearch = function () {
        var fromDate = $("#txtFromCiDate").val();
        var toDate = $("#txtToCiDate").val();
        $scope.FromDate = fromDate;
        $scope.ToDate = toDate;

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
        if ($scope.CommercialInvoiceDate == "" || $scope.CommercialInvoiceDate == null) {
            var criteria = "CAST(CommercialInvoiceDate AS date) BETWEEN '" + fromDate + "' AND '" + toDate + "'";
        }
        else {
            //alert($scope.CommercialInvoiceDate);
            var criteria = exp_CommercialInvoice_GetDynamic
        }

        $http({
            url: '/ExpCommercialInvoice/GetExpCommercialInvoiceDynamic?searchCriteria=' + criteria + "&orderBy='CommercialInvoiceDate'",
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length > 0) {
                angular.forEach(data, function (aSd) {
                    var res1 = aSd.CommercialInvoiceDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.CommercialInvoiceDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.CommercialInvoiceDate = date1;
                    }
                })
            }
            else
                alertify.log('No Commercial Invoice Found', 'error', '5000');

            $scope.CommercialInvoiceList = data;
        });
    }




    function ckeckValidData() {
        $("#ciTable tbody td").find(":input").each(function () {
            var IsNaN = parseFloat($(this).val());

            if (isNaN(IsNaN)) {
                alert("Invalid Qty & Unit Price !!!");
                alertify.confirm().destroy();
                return;
            }
        });
    }
    $scope.SaveCommercialInvoice = function () {
        if ($scope.exp_CommercialInvoice.LcScNo == undefined) { $scope.exp_CommercialInvoice.LcScNo = "" }
        if ($scope.exp_CommercialInvoice.LcScDate == null) { $scope.exp_CommercialInvoice.LcScDate = "" }
        if ($scope.exp_CommercialInvoice.ExpNo == undefined) { $scope.exp_CommercialInvoice.ExpNo = "" }
        if ($scope.exp_CommercialInvoice.ExpDate == null) { $scope.exp_CommercialInvoice.ExpDate = "" }
        if ($scope.exp_CommercialInvoice.PaymentProcessTypeId == 4) {
            if ($scope.exp_CommercialInvoice.LcScNo == "" || $scope.exp_CommercialInvoice.LcScDate == "") {
                alertify.log('Please enter Lc Sc No or Lc Sc date!', 'error', '5000');
                return;
            }
        }
        if ($scope.exp_CommercialInvoice.ExporterId == 1) {
            if ($scope.exp_CommercialInvoice.ExpNo == "" || $scope.exp_CommercialInvoice.ExpDate == "") {
                alertify.log('Please enter exp no or exp date!', 'error', '5000');
                return;
            }
        }
        if ($scope.ConfirmationMessageForAdmin) {
            if ($scope.exp_CommercialInvoice.CommercialInvoiceId == 0) {
                ckeckValidData();
                alertify.confirm("Are you sure to save?", function (e) {
                    if (e) {
                        SaveCommercialInvoice('Saved');
                    }
                })
            }

            else if ($scope.exp_CommercialInvoice.CommercialInvoiceId > 0) {
                ckeckValidData();
                alertify.confirm("Are you sure to update?", function (e) {
                    if (e) {
                        SaveCommercialInvoice('Updated');
                    }
                })
            }

        }
        else {
            if ($scope.exp_CommercialInvoice.CommercialInvoiceId == 0) {
                ckeckValidData();
                SaveCommercialInvoice('Saved');
            }

        }
    };



    $scope.resetForm1 = function () {

        Clear();
        ClearBankField();
        $('#ddlImporterRevise').select2('destroy');
        $('#ddlImporterRevise').val('').select2({
            placeholder: "Search for: Company Name",
            theme: "classic",
            dropdownAutoWidth: false
        });
        $scope.commercialInvoiceReviseEntryForm.$setPristine();
        $scope.commercialInvoiceReviseEntryForm.$setUntouched();
    };

    $scope.Delete = function () {
        alertify.confirm("Are you sure to delete?", function (e) {
            if (e) {
                var parms = JSON.stringify({ commercialInvoiceId: $scope.exp_CommercialInvoice.CommercialInvoiceId });
                $http.post('/ExpCommercialInvoice/Delete', parms).success(function (data) {
                    if (data > 0) {
                        alertify.log('Payment Process Deleted Successfully!', 'success', '5000');
                        Clear();
                    } else {
                        alertify.log('Delete Failed!', 'error', '5000');
                    }
                }).error(function (data) {
                    alertify.log('Server Errors!', 'error', '5000');
                });
            }
        })
    };



    function SavePackingInfo(status) {

        var parms = JSON.stringify({ exp_PackingInfo: $scope.exp_PackingInfo });
        $http.post('/ExpPackingInfo/Save', parms).success(function (data) {
            if (data > 0) {
                alertify.log('Packing Info' + status + ' Successfully!', 'success', '5000');
                Clear();
                $scope.PackingListEntryForm.$setPristine();
                $scope.PackingListEntryForm.$setUntouched();
                $("#txtTotalCarton").focus();
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

    $scope.hideButton = function () {
        if ($scope.isInvoiceNo == true) {
            $scope.isInvoiceNo = false;
        }
        else {
            $scope.isInvoiceNo = true;
        }

    }
    $scope.overRide = function (anItem, isOverride) {
        anItem.IsOverride = isOverride;

    }

    $scope.Selpackinginfo = function (aPackingInfo) {
        $scope.exp_PackingInfo = aPackingInfo;
        $scope.btnPL = "Update";
        $scope.btnDeleleShow = false;
    };

    $scope.SavePackingInfo = function () {
        if ($scope.found) {
            $('#txtTotalCarton').focus();
        }
        else {
            if ($scope.ConfirmationMessageForAdmin) {
                if ($scope.exp_PackingInfo.PackingInfoId == 0) {
                    alertify.confirm("Are you sure to save?", function (e) {
                        if (e) {
                            SavePackingInfo('Saved');
                        }
                    })
                }

                else if ($scope.exp_PackingInfo.PackingInfoId > 0) {
                    alertify.confirm("Are you sure to update?", function (e) {
                        if (e) {
                            SavePackingInfo('Updated');
                        }
                    })
                }

            }
            else {
                if ($scope.exp_PackingInfo.PackingInfoId == 0) {
                    SavePackingInfo('Saved');
                }

            }
        }
    };

    $scope.OpenPopupWindowForPI = function (invoiceId) {
        $window.open("#/ProformaInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
        //sessionStorage.setItem("InvoiceId", JSON.stringify(invoiceId));
        $cookieStore.put("InvoiceId", invoiceId);
        event.stopPropagation();
    };
    $scope.resetForm2 = function () {
        Clear();
        $scope.PackingListEntryForm.$setPristine();
        $scope.PackingListEntryForm.$setUntouched();
    };

    $scope.AddPOReference = function () {
        $scope.POReference.DocType = "CI";
        $scope.POReference.DocumentId = 0;
        $scope.POReferencelist.push($scope.POReference);
        $scope.POReference = {};
    }
    $scope.removePOReference = function (aPOReference) {
        var ind = $scope.POReferencelist.indexOf(aPOReference);
        $scope.POReferencelist.splice(ind, 1);
        $scope.POReference = {};
    }
    function GetAllSPCase() {

        $http({
            url: "/Item/GetAllSPCase",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.SPItemList = data;
        });
    }
    Array.prototype.unique = function () {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };


    $scope.getPackingInfo = function () {
        getPackingInfo();
    };
    function getPackingInfo() {
        $scope.packingInfoCombind.TotalCarton = 0;
        $scope.packingInfoCombind.LabelNetWeight = 0;
        $scope.packingInfoCombind.LabelGrossWeight = 0;
        $scope.packingInfoCombind.RibonNetWeight = 0;
        $scope.packingInfoCombind.RibonGrossWeight = 0;
        $scope.packingInfoCombind.CartonMeasurement = "";
        $scope.packingInfoCombind.RibonNetWeight = 0;

        $scope.productListForRibbon = [];
        $scope.productListForLabel = [];
        $scope.packingInfo.TotalCarton = 0;
        $scope.packingInfo.LabelNetWeight = 0;
        $scope.packingInfo.LabelGrossWeight = 0;
        $scope.packingInfo.RibonNetWeight = 0;
        $scope.packingInfo.RibonGrossWeight = 0;
        $scope.packingInfo.CartonMeasurement = "";
        $scope.packingInfo.RibonNetWeight = 0;
        if (!$scope.productList.length) {
            alertify.log("No item in item list", "error", "5000");
            return;
        }

        $scope.example = angular.copy($scope.productList);
        ///Convart Pcs To Roll
        angular.forEach($scope.productList,
            function (adata) {
                if (adata.OrderUnitId == 1) {

                    adata.Quantity = adata.Quantity / adata.PcPerRoll;
                }
            })

        $scope.productListWithFlag = [];
        angular.forEach($scope.productList,
            function (adata) {
                if (adata.IdenticalFlag != 0) {
                    $scope.itemFlag = true;
                    $scope.productListWithFlag.push(adata);
                }
            });

        ///////////////////////////////
        var listToDelete = [];
        for (var i = 0; i < $scope.productListWithFlag.length; i++) {
            listToDelete.push($scope.productListWithFlag[i].ItemId);
        }
        $scope.productListWithoutFlag = $scope.productList.filter(el => (listToDelete.indexOf(el.ItemId) == -1));
        /////////////////////////////


        $scope.duplicateProduct = angular.copy($scope.productList);
        $scope.margeProduct = [];
        $scope.margeProductWithFlag = [];
        $scope.margeProductWithoutFlag = [];
        /////////////////////////////////////
        if ($scope.itemFlag == true) {
            $scope.margeProductWithFlag = $scope.productListWithFlag.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                var temp = r.find(o => o.IdenticalFlag === IdenticalFlag);
                if (!temp) {
                    r.push({ Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                } else {
                    temp.Quantity += Quantity;
                }
                return r;
            }, []);

            $scope.margeProductWithoutFlag = $scope.productListWithoutFlag.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                var temp = r.find(o => o.ItemId === ItemId && o.MaterialTypeId === MaterialTypeId);
                if (!temp) {
                    r.push({ Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                } else {
                    temp.Quantity += Quantity;
                }
                return r;
            }, []);
            $scope.margeProduct = $scope.margeProductWithFlag;
            for (var i = 0; i < $scope.margeProductWithoutFlag.length; i++) {
                $scope.margeProduct.push($scope.margeProductWithoutFlag[i]);
            }


        } else {
            $scope.margeProduct = $scope.productList.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                var temp = r.find(o => o.ItemId === ItemId && o.MaterialTypeId === MaterialTypeId);
                if (!temp) {
                    r.push({ Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                } else {
                    temp.Quantity += Quantity;
                }
                return r;
            }, []);
        }

        ////////////////////////////////

        ///////////////////// separated Combind Item
        angular.forEach($scope.SPItemList,
            function (adata) {
                var tempSPRibbon = $scope.margeProduct.filter(product => product.ItemId === adata.RibbonId);
                $scope.productListForRibbon = $scope.productListForRibbon.concat(tempSPRibbon).unique();
                var tempSPLabel = $scope.margeProduct.filter(product => product.ItemId === adata.LabelId);
                $scope.productListForLabel = $scope.productListForLabel.concat(tempSPLabel).unique();

                tempSPRibbon = [];
                tempSPLabel = [];
            })

        //////////////// Label + Ribbon = OneList
        $scope.CombindItem = $scope.productListForLabel;

        for (var i = 0; i < $scope.productListForRibbon.length; i++) {
            $scope.CombindItem.push($scope.productListForRibbon[i]);
        }
        /////////////////////////////////////// Calculetion Combind
        angular.forEach($scope.CombindItem,
            function (adata) {
                var objCombind = {};
                objCombind.itemW8 = 0;
                objCombind.noOfCrtn = 0;
                objCombind.crtnW8 = 0;
                var noOfCrtn1 = 0;
                $scope.ExtraQtyForRibbon = 0;
                //////////////////////////// Calculetion Combind Ribbon New way
                if (adata.SubCategoryName == 'Barcode Ribbon' || adata.SubCategoryName == 'Barcode Ribbon (R)') {
                    if (adata.Quantity > $scope.packingInfoCombind.TotalCarton) {
                        $scope.ExtraQtyForRibbon = Number(adata.Quantity) - Number($scope.packingInfoCombind.TotalCarton);
                    }

                    //if (adata.RollPerCarton != 0) {
                    //    noOfCrtn1 = $scope.ExtraQtyForRibbon / adata.RollPerCarton;
                    //    objCombind.noOfCrtn = Math.ceil(noOfCrtn1);
                    //} else {
                    //    if (adata.PcPerRoll != 0) {
                    //        noOfCrtn1 = $scope.ExtraQtyForRibbon / adata.PcPerRoll;
                    //        objCombind.noOfCrtn = Math.ceil(noOfCrtn1);
                    //    } else {
                    //        objCombind.noOfCrtn = 0;
                    //    }
                    //}
                    noOfCrtn1 = $scope.ExtraQtyForRibbon / adata.RollPerCarton;
                    objCombind.noOfCrtn = Math.ceil(noOfCrtn1);
                    $scope.packingInfoCombind.TotalCarton = Number($scope.packingInfoCombind.TotalCarton) + Number(objCombind.noOfCrtn);

                    objCombind.SalesOrderId = adata.SalesOrderId;
                    objCombind.Qty = adata.Quantity;
                    objCombind.SubCategoryName = adata.SubCategoryName;
                    objCombind.itemW8 = adata.Quantity * adata.RollWeight;
                    objCombind.crtnW8 = objCombind.noOfCrtn * adata.CartonWeight;
                    objCombind.Measurement = adata.CartonSize;

                    var itmW8 = objCombind.itemW8;
                    $scope.packingInfoCombind.RibonNetWeight =
                        (Number($scope.packingInfoCombind.RibonNetWeight) + Number(itmW8)).toFixed(2);
                    var RibbonGrsWeight = objCombind.itemW8 + objCombind.crtnW8;
                    $scope.packingInfoCombind.RibonGrossWeight =
                        (Number($scope.packingInfoCombind.RibonGrossWeight) + Number(RibbonGrsWeight)).toFixed(2);

                    $scope.packingInfoCombind.CartonMeasurement += $scope.packingInfoCombind.CartonMeasurement === ""
                        ? objCombind.Measurement
                        : ("," + objCombind.Measurement);

                }
                else {
                    /////////////////////////// Calculetion Combind Label previous way
                    //if (adata.RollPerCarton != 0) {
                    //    noOfCrtn1 = adata.Quantity / adata.RollPerCarton;
                    //    objCombind.noOfCrtn = Math.ceil(noOfCrtn1);
                    //} else {
                    //    if (adata.PcPerRoll != 0) {
                    //        noOfCrtn1 = adata.Quantity / adata.PcPerRoll;
                    //        objCombind.noOfCrtn = Math.ceil(noOfCrtn1);
                    //    } else {
                    //        objCombind.noOfCrtn = 0;
                    //    }
                    //}
                    noOfCrtn1 = adata.Quantity / adata.RollPerCarton;
                    objCombind.noOfCrtn = Math.ceil(noOfCrtn1);

                    objCombind.SalesOrderId = adata.SalesOrderId;
                    objCombind.Qty = adata.Quantity;
                    objCombind.SubCategoryName = adata.SubCategoryName;
                    objCombind.itemW8 = adata.Quantity * adata.RollWeight;
                    objCombind.crtnW8 = objCombind.noOfCrtn * adata.CartonWeight;
                    objCombind.Measurement = adata.CartonSize;

                    $scope.packingInfoCombind.TotalCarton = Number($scope.packingInfoCombind.TotalCarton) + Number(objCombind.noOfCrtn);

                    var lblitmW8 = objCombind.itemW8;
                    $scope.packingInfoCombind.LabelNetWeight =
                        (Number($scope.packingInfoCombind.LabelNetWeight) + Number(lblitmW8)).toFixed(2);
                    var LabelGrsWeight = objCombind.itemW8 + objCombind.crtnW8;
                    $scope.packingInfoCombind.LabelGrossWeight =
                        (Number($scope.packingInfoCombind.LabelGrossWeight) + Number(LabelGrsWeight)).toFixed(2);

                    $scope.packingInfoCombind.CartonMeasurement += $scope.packingInfoCombind.CartonMeasurement === ""
                        ? objCombind.Measurement
                        : ("," + objCombind.Measurement);
                }
            });
        ////////////////////////////////////// Remove Combind Item
        var listToDelete = [];
        for (var i = 0; i < $scope.CombindItem.length; i++) {
            listToDelete.push($scope.CombindItem[i].ItemId);
        }
        $scope.ExtraItem = $scope.margeProduct.filter(el => (listToDelete.indexOf(el.ItemId) == -1));

        //////////////////////////////////////Calculetion Extra previous way
        angular.forEach($scope.ExtraItem,
            function (adata) {
                var objExtra = {};
                objExtra.itemW8 = 0;
                objExtra.noOfCrtn = 0;
                objExtra.crtnW8 = 0;
                var noOfCrtn1 = 0;

                //if (adata.RollPerCarton != 0) {
                //    noOfCrtn1 = adata.Quantity / adata.RollPerCarton;
                //    objExtra.noOfCrtn = Math.ceil(noOfCrtn1);
                //} else {
                //    if (adata.PcPerRoll != 0) {
                //        noOfCrtn1 = adata.Quantity / adata.PcPerRoll;
                //        objExtra.noOfCrtn = Math.ceil(noOfCrtn1);
                //    } else {
                //        objExtra.noOfCrtn = 0;
                //    }
                //}
                noOfCrtn1 = adata.Quantity / adata.RollPerCarton;
                objExtra.noOfCrtn = Math.ceil(noOfCrtn1);

                objExtra.SalesOrderId = adata.SalesOrderId;
                objExtra.Qty = adata.Quantity;
                objExtra.SubCategoryName = adata.SubCategoryName;
                objExtra.itemW8 = adata.Quantity * adata.RollWeight;
                objExtra.crtnW8 = objExtra.noOfCrtn * adata.CartonWeight;
                objExtra.Measurement = adata.CartonSize;

                $scope.packingInfo.TotalCarton = Number($scope.packingInfo.TotalCarton) + Number(objExtra.noOfCrtn);

                var res = (objExtra.SubCategoryName).match(/Barcode Ribbon/);
                if (res) {
                    var itmW8 = objExtra.itemW8;
                    $scope.packingInfo.RibonNetWeight =
                        (Number($scope.packingInfo.RibonNetWeight) + Number(itmW8)).toFixed(2);
                    var RibbonGrsWeight = objExtra.itemW8 + objExtra.crtnW8;
                    $scope.packingInfo.RibonGrossWeight =
                        (Number($scope.packingInfo.RibonGrossWeight) + Number(RibbonGrsWeight)).toFixed(2);
                } else {
                    var lblitmW8 = objExtra.itemW8;
                    $scope.packingInfo.LabelNetWeight =
                        (Number($scope.packingInfo.LabelNetWeight) + Number(lblitmW8)).toFixed(2);
                    var LabelGrsWeight = objExtra.itemW8 + objExtra.crtnW8;
                    $scope.packingInfo.LabelGrossWeight =
                        (Number($scope.packingInfo.LabelGrossWeight) + Number(LabelGrsWeight)).toFixed(2);
                }
                $scope.packingInfo.CartonMeasurement += $scope.packingInfo.CartonMeasurement === ""
                    ? objExtra.Measurement
                    : ("," + objExtra.Measurement);
            });
        //////////////////////////////////////Combind + Extra Item
        $scope.packingInfo.TotalCarton = Number($scope.packingInfo.TotalCarton) + Number($scope.packingInfoCombind.TotalCarton);
        $scope.packingInfo.RibonNetWeight = Number($scope.packingInfo.RibonNetWeight) + Number($scope.packingInfoCombind.RibonNetWeight);
        $scope.packingInfo.RibonNetWeight = Number($scope.packingInfo.RibonNetWeight.toFixed(2));
        $scope.packingInfo.RibonGrossWeight = (Number($scope.packingInfo.RibonGrossWeight) + Number($scope.packingInfoCombind.RibonGrossWeight)).toFixed(2);
        $scope.packingInfo.LabelNetWeight = Number($scope.packingInfo.LabelNetWeight) + Number($scope.packingInfoCombind.LabelNetWeight);
        $scope.packingInfo.LabelNetWeight = Number($scope.packingInfo.LabelNetWeight.toFixed(2));
        $scope.packingInfo.LabelGrossWeight = (Number($scope.packingInfo.LabelGrossWeight) + Number($scope.packingInfoCombind.LabelGrossWeight)).toFixed(2);
        $scope.packingInfo.CartonMeasurement += $scope.packingInfoCombind.CartonMeasurement === ""
            ? $scope.packingInfoCombind.CartonMeasurement
            : ("," + $scope.packingInfoCombind.CartonMeasurement);

        var MeasurementArray = [];
        MeasurementArray = $scope.packingInfo.CartonMeasurement.split(',');
        MeasurementArray = Array.from(new Set(MeasurementArray));
        $scope.packingInfo.CartonMeasurement = MeasurementArray.join(',');
        $scope.packingInfo.CartonMeasurement = $scope.packingInfo.CartonMeasurement + " cm";

        $scope.productList = $scope.example;
    }
    
    //#region
    //LC/SC date
    $("#txtLcScDateRevise").datepicker({
        //format: 'YYYY-MM-DD'
        dateFormat: "M d, yy"
    });

    $scope.CalendarLCSCRevise = function () {
        $("#txtLcScDateRevise").focus();
        $("#txtLcScDateRevise").trigger("click");
    }
    //EXp data

    $("#txtExpDateRevise").datepicker({
        dateFormat: "M d, yy"
    });

    //$("#txtPIRefDateRevise").datepicker({
    //    dateFormat: "M d, yy"
    //});

    $scope.CalendarExp = function () {
        $("#txtExpDateRevise").focus();
        $("#txtExpDateRevise").trigger("click");
    }
    //$scope.CalendarPIRef = function () {
    //    $("#txtPIRefDateRevise").focus();
    //    $("#txtPIRefDateRevise").trigger("click");
    //}
    //CI

    $("#txtCIDateRevise").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendarCI = function () {
        $("#txtCIDateRevise").focus();
        $("#txtCIDateRevise").trigger("click");
    }

    $("#txtPO_Date").datepicker({
        dateFormat: "M d, yy"
    });

    $scope.CalendartxtPO_Date = function () {
        $("#txtPO_Date").focus();
        $("#txtPO_Date").trigger("click");
    }

    //#endregion


}); 