app.controller("ProformaInvoiceController",
    function ($scope, $rootScope, hotkeys, $cookieStore, $http, $filter, $window, $route) {
        
        //$route.reload();
        $scope.AccountForList = [{ AccountFor: "Exporter" }, { AccountFor: "Customer" }, { AccountFor: "Salary" }];
        getAllActiveImporter();
        GetAllAmendmentReason();
        dateTimePicker();
        clear();

        function dateTimePicker() {
            //$("#txtInvoiceDate").datetimepicker({
            //    format: "MMM DD, YYYY",
            //    timepicker: false,
            //});

            //$scope.CalendarOpenInvoiceDate = function () {
            //    $("#txtInvoiceDate").focus();
            //    $("#txtInvoiceDate").trigger("click");
            //};

            $("#txtInvoiceDate").datepicker({
                dateFormat: "M d, yy",
                changeMonth: true,
                changeYear: true
            });

            $scope.CalendartxtPO_Date = function () {
                $("#txtInvoiceDate").focus();
                $("#txtInvoiceDate").trigger("click");
            }

            $("#txtSalesFromDate").datetimepicker({
                format: "MMM DD, YYYY",
                timepicker: false,
            });

            $scope.CalendarOpenSalesFromDate = function () {
                $("#txtSalesFromDate").focus();
                $("#txtSalesFromDate").trigger("click");
            };

            $("#txtSalesToDate").datetimepicker({
                format: "MMM DD, YYYY",
                timepicker: false,
            });

            $scope.CalendarOpenSalesToDate = function () {
                $("#txtSalesToDate").focus();
                $("#txtSalesToDate").trigger("click");
            };

            $("#txtInvoiceFromDate").datetimepicker({
                format: "MMM DD, YYYY",
                timepicker: false,
            });

            $scope.CalendarOpenInvoiceFromDate = function () {
                $("#txtInvoiceFromDate").focus();
                $("#txtInvoiceFromDate").trigger("click");
            };

            $("#txtInvoiceToDate").datetimepicker({
                format: "MMM DD, YYYY",
                timepicker: false,
            });

            $scope.CalendarOpenInvoiceToDate = function () {
                $("#txtInvoiceToDate").focus();
                $("#txtInvoiceToDate").trigger("click");
            };
            ///////////////////////////////
            $("#txtFromDateForPI").datepicker({
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true
            }); 

            $scope.FormDateChangeForPI = function () {
                $("#txtFromDateForPI").focus();
                $("#txtFromDateForPI").trigger("click");
            }
            $("#txtToDateForPI").datepicker({
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true
            });

            $scope.ToDateChangeForPI = function () {
                $("#txtToDateForPI").focus();
                $("#txtToDateForPI").trigger("click");
            }

            $("#txtPO_Date").datepicker({
                dateFormat: "M d, yy",
                changeMonth: true,
                changeYear: true
            });

            $scope.CalendartxtPO_Date = function () {
                $("#txtPO_Date").focus();
                $("#txtPO_Date").trigger("click");
            }

        }

        $scope.Date = function () { return new Date(); };

        function clear() {
            var UserData = sessionStorage.getItem("UserDataSession");
            if (UserData != null) {
                $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
            }
            $scope.FullName = $scope.LoginUser.FullName;
            $scope.UserId = $scope.LoginUser.UserId;

            var PermissionData = sessionStorage.getItem("PermissionDataSession");
            if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
            $scope.ScreenId = Permission.find(v => v.ScreenName == 'Proforma Invoice').ScreenId;
            GetUsersPermissionDetails();


            $scope.ProductBtn = 'Add Product';
            $scope.CompanyBtn = 'Add';
            $scope.isUpdate = 'save';
            $scope.currentPage = 1;
            $scope.PerPage = 10;
            $scope.total_count = 0;
            GetInvoicePaged($scope.currentPage);

            $scope.POReference = {};
            $scope.POReferencelist = [];
            $scope.POReferencelistTemp = [];
            $rootScope.companyList = [];
            $scope.datarow = [];
            $scope.ItemTableDataRow1 = [];
            $scope.ItemRow = [];
            $scope.exportInvoice = { InvoiceId: 0, InvoiceDate: new Date() };
            $scope.ddlExporter = null;
            $scope.ddlImporter = null;
            $scope.ddlExporterBank = null;
            $scope.ddlImporterBank = null;
            $scope.row_numP1 = null;
            $scope.SalesOrderList = [];
            $scope.invoiceDetailList = [];
            $scope.margeProduct = [];
            $scope.thArray = [];
            $scope.ItemTableHeaders =
            [
                "SalesOrderId", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
            ]; //used for dynamic table headers
            $scope.ItemTableFooter = ["", "", "", "", "", "0", "", "0"];
            $scope.ItemTableFooterForCPT = ["", "", "", "", "Freight Charge", "", "", "0"];
            $scope.ItemTableFooterForCPTTotal = ["", "", "", "", "", "0", "", "0"];
            $scope.ItemTableDataRow = [];
            $scope.ItemTableData = [];
            $scope.ItemCategory = [];
            $scope.ad_Item = {};
            $scope.btnImport = 'Import';
            $scope.amendment = {};
            $scope.PerPage = 10;
            $scope.total_count = 0;
            $scope.distCount = 1;
            $scope.QtySumForItem = 0;
            $scope.UnitpriceSumForItem = 0;
            $scope.AmountSumForItem = 0;
            $scope.totalAmountWithCPT = 0;
            $scope.TableHtmlData = {};
            $scope.index = {};
            $scope.salesOrderId = {};
            $scope.EmailList = [];
            $scope.ItemSearchResultList = [];
            $scope.tdData = [];
            $scope.CustomiseTableData = {};
            $scope.previousDataList = [];
            $scope.isFinalized = false;
            $scope.IsPreviousData = false;
            $scope.IsTableShow = false;
            $scope.isInfoShow = false;
            $scope.isEnableIput = false;
            $scope.disBank = true;
            $scope.itemFlag = false;

            $("#itemNameDisable").attr("disabled", true);
            $scope.itemNameDisable = true;
            $scope.ddlFactory = "";
            $scope.ddlInvoiceType = "";
            $scope.ddlEmail = "";
            $scope.InvoiceNoTemp = "";
            $scope.InvoiceNo1 = "";
            $scope.InvoiceNo2 = null;
            $scope.exportInvoice.PINoPostfix = "";
            $scope.saveButtonLabel = "Save";
            $scope.termsandConbtn = "Add";
            $scope.isRemoved = false;
            $scope.totalAmount = 0;
            $scope.TotalCPTCost = 0;
            $scope.exportInvoice.InvoiceDate = $filter("date")(new Date().toJSON().slice(0, 10), "MMM dd, yyyy");
            $("#txtInvoiceDate").val($scope.exportInvoice.InvoiceDate);
            //$scope.InvoiceTypeList = [{ InvoiceTypeId: 1, InvoiceType: "PI" }, { InvoiceTypeId: 2, InvoiceType: "SC/TT" }, { InvoiceTypeId: 3, InvoiceType: "SC/FDD" }];
            $scope.InvoiceTypeList = [];
            GetAllInvoiceType();
            $scope.packingInfo = {
                TotalCarton: 0,
                LabelNetWeight: 0,
                LabelGrossWeight: 0,
                RibonNetWeight: 0,
                RibonGrossWeight: 0,
                CartonMeasurement: ""
            };
            $scope.TermsAndConditionList =
                "<ol><li>Payment: Letter of Credit&nbsp;<b> 90 days&nbsp;</b>From the date of Delivery Challan to be opened in favor of Retail Technologies Ltd.</li><li>Payment Should be made in U.S Dollar through LC.</li><li>Delivery Terms/Inco Terms: <b>EXW</b></li><li>Partial Shipment Allowed.</li><li>&nbsp;Quantity &amp; Value may vary +/- 10% of total Quantity &amp; Value of the Proforma Invoice.</li><li>Delivery Challan Should be treated as transport/Truck Challan.</li><li>Maturity date should be calculated from the date of goods delivery Challan.</li><li>All Banking Charges inside openers Bank counter on account of opener and outside openers bank counter on account of beneficiary.</li><li>Payment after Export Realization clause not allowed in the LC.</li><li>LC must incorporate delivery validity 30 days from the date of LC.</li><li>Presentation period: 15 days from the date of delivery.</li><li>L/C should be freely negotiable.</li><li>PI Validity 65 days from the date of issue.</li><li>Discrepancy charge should be mentioned between 25-30 Dollars.<br></li></ol>";
            $scope.TermsAndConditionListForTT =
                "<ol><li>This Sales Contract has been issued in relation to the Purchase Order Presented by the buyer/customer.</li><li>Payment Should Be Made in U.S Dollar Through TT.</li><li>Payment should be made <b>At Sight&nbsp;</b> after the date of delivery.</li><li>Delivery Terms/Inco Terms: <b>EXW</b></li><li>Partial Shipment: Allowed.</li><li>All Banks Charges (Local &amp; overseas) and from customer’s account.</li><li>Delivery Challan should be treated as transport/Truck Challan.</li><li>Quantity &amp; value may vary +/- 10 % of total value & quantity of sales contract.</li><li>Utilization Declaration (UD) has to be in place within 3 working days.</li><li>Sales Contract Validity 30 days from issuing date.</li></ol>";
            $scope.TermsAndConditionListForFDD =
                "<ol><li>This sales contract has been issued in relation to the purchase presented by the buyer/customer.</li><li>Payment Mode: FDD in favor of Retail Technologies Ltd.</li><li>Payment should be made <b>At Sight&nbsp;</b> after the date of delivery.</li><li>Delivery Terms/Inco Terms: <b>EXW</b></li><li>Payment should be made in U.S Dollar.</li><li>Partial Shipment: Allowed.</li><li>Delivery Challan should be treated as transport/truck challan.</li><li>Quantity &amp; value may vary +/- 10 % of total value & quantity of sales contract.</li><li>Sales Contract validity 30 days from issuing date.</li></ol>";

            $(".summernote").summernote("code", $scope.TermsAndConditionList);
            GetHsCode();
            getAllExporter();
            GetAllSPCase();
            ReportNotificationDetail_Get();
            $scope.ReportNotificationDetailList = [];

            $scope.EmailSendNotification = {};
            $scope.ConfirmationMessageForAdmin = false;
            GetConfirmationMessageForAdmin();
            //GetUsersPermissionDetails();

            $scope.AppNotificationSetupList = [];
            GetAppNotificationSetupByReportCode();
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

        $scope.countRow = 0;

        $scope.test = function () {
            ++$scope.countRow;
            if ($scope.countRow <= 1) {
                for (var i = 0; i <= 1; i++) {
                    var $tableBody = $('#mofiz').find("tfoot"),
                        $trLast = $tableBody.find("tr:last"),
                        $trNew = $trLast.clone();

                    $trLast.after($trNew);
                }
                
            }
            
        }
        $scope.CalnewTable = function () {
            //$("#mofiz tfoot tr td:eq(6)").each(function () {
            //    $scope.ChargeAmount = parseFloat($(this).text());
            //    console.log($scope.ChargeAmount);
            //})
            //$scope.TotalWithCharge = $scope.AmountSumForItem + $scope.ChargeAmount;
            //$('#newTable td:last-child').val($scope.TotalWithCharge);
            //$('#newTable tbody tr:last-child td:last-child').css('background-color', 'red');
            //$('#newTable tbody tr:last-child td:last-child').html("<b>" + $scope.TotalWithCharge.toFixed(2) + "</b>");
            //$('#newTable tbody tr:last-child td:eq(4)').html("<b>" + $scope.QtySumForItem + "</b>");

            //var len = $('#mofiz tfoot tr').length;
            //$('#mofiz tfoot tr').eq(len - 2).find('th:nth-last-child(1)').css('background-color', 'red');
            //$('#mofiz tfoot tr').eq(len - 2).find('th:nth-last-child(1)').css('background-color', 'red');


            
            //$('#mofiz tfoot tr').eq(len - 2).remove();
            
        }

        function GetAppNotificationSetupByReportCode() {
            $http({
                url: '/EmailNotificationSetup/GetAppNotificationSetupByReportCode?ReportCode=' + 'PI',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (notification) {
                $scope.AppNotificationSetupList = notification;
            });

        }
        function AppNotificationLogPost(exportInvoice, NotificaitonTitle) {
            $scope.AppNotificationLogList = [];
            if ($scope.ddlImporter != null) {
                exportInvoice.CompanyName = $scope.ddlImporter.CompanyName;
            }
            
            angular.forEach($scope.AppNotificationSetupList, function (aNotify) {
                var obj = {}
                obj = aNotify
                obj.NotificaitonTitle = NotificaitonTitle
                obj.NotificationDetail = 'Proforma Invoice No: ' + exportInvoice.InvoiceNo + ' Company Name: ' + exportInvoice.CompanyName + ' Prepared By: ' + $scope.FullName;
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


        $scope.ListClear = function () {
            $scope.ProductBtn = 'Add Product';
            $scope.ad_Item.TempItemName = null;
            //$('#itemNameDisable').select2('destroy');
            
            setTimeout(function () {

               $('#itemNameDisable').val('').select2({
                    placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                    theme: "classic",
                    dropdownAutoWidth: false
                });

            }, 0);
            
        }
        function ReportNotificationDetail_Get() {


            $http({
                url: '/EmailSender/ReportNotificationGetByReportCode?ReportCode=' + 'PI',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (notification) {
                $scope.ReportNotificationDetailList = notification;


                // console.log('$scope.ReportNotificationDetailList',$scope.ReportNotificationDetailList);
            });

        }
        function GetAllInvoiceType() {
            $http({
                url: "/ExpInvoice/GetAllInvoiceType",
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.InvoiceTypeList = data;
                $scope.InvoiceTypeList.pop();
            })
        }
        $scope.invoiceTypeChange = function () {
            invoiceTypeChange();
        }

        function invoiceTypeChange() {
            if ($scope.exportInvoice.PaymentProcessTypeId == 1) {
                $scope.TermsAndConditionList =
                    "<ol><li>Payment: Letter of Credit&nbsp;<b> 90 days&nbsp;</b>From the date of Delivery Challan to be opened in favor of Retail Technologies Ltd.</li><li>Payment Should be made in U.S Dollar through LC.</li><li>Delivery Terms/Inco Terms: <b>EXW</b></li><li>Partial Shipment Allowed.</li><li>&nbsp;Quantity &amp; Value may vary +/- 10% of total Quantity &amp; Value of the Proforma Invoice.</li><li>Delivery Challan Should be treated as transport/Truck Challan.</li><li>Maturity date should be calculated from the date of goods delivery Challan.</li><li>All Banking Charges inside openers Bank counter on account of opener and outside openers bank counter on account of beneficiary.</li><li>Payment after Export Realization clause not allowed in the LC.</li><li>LC must incorporate delivery validity 30 days from the date of LC.</li><li>Presentation period: 15 days from the date of delivery.</li><li>L/C should be freely negotiable.</li><li>PI Validity 65 days from the date of issue.</li><li>Discrepancy charge should be mentioned between 25-30 Dollars.<br></li></ol>";
                $(".summernote").summernote("code", $scope.TermsAndConditionList);
            } else if ($scope.exportInvoice.PaymentProcessTypeId == 2) {
                $scope.TermsAndConditionList = $scope.TermsAndConditionListForTT;
                $(".summernote").summernote("code", $scope.TermsAndConditionList);
            } else if ($scope.exportInvoice.PaymentProcessTypeId == 3) {
                $scope.TermsAndConditionList = $scope.TermsAndConditionListForFDD;
                $(".summernote").summernote("code", $scope.TermsAndConditionList);
            }
            $scope.ddlFactory = {};
        }


        function dynamictable() {
            $("#mofiz").on("click",
                function (e) {

                    e.preventDefault();
                    e.stopPropagation();
                    //$(e).toggleClass("red-cell");
                    if ($(e.target).is("#mofiz tbody tr td")) {
                        $("#mofiz tbody tr td").each(function () {
                            $(this).css("background", "#F5F5F5");
                        });
                        $(e.target).css("background", "yellow");
                        

                        var column_num = parseInt($(e.target).index()) + 1; //need this one
                        $scope.row_numP1 = parseInt($(e.target).parent().index()) + 1;

                        $("#mofiz tbody tr").each(function (index) {
                            $(this).hover(function () {
                                $scope.SelectItemId = $(this).children('td')[0].childNodes[6].outerText.replace(/\D/g, '');
                                console.log($scope.SelectItemId);
                               // $scope.SelectedItem = $rootScope.ItemSearchList.find(x => x.ItemId == $scope.SelectItemId);
                                console.log($scope.SelectedItem);
                                //$(this).css('cursor', 'pointer').attr('title', $scope.SelectedItem.TempItemName);
                            }, function () {
                                $(this).css('cursor', 'auto');
                            });
                        });

                        $("#result").html("<h3>Row Number: " + $scope.row_numP1 + "  ,  Column Number: " + column_num + "</h3>");
                        $("#left").unbind().click(function () {

                            var column = column_num - 1;

                            //alert(column);
                            $("#mofiz thead tr th:eq(" + column + ")").before($(
                                '<th class="t-cell-center col"  style="width:11%;" contentEditable="true">Left</th>'));

                            $("#mofiz tbody tr").each(function () {
                                $(this).children("td:eq(" + column + ")")
                                    .before($('<td   class="t-cell-center col" contentEditable="true"></td>'));
                            });
                            $("#mofiz tfoot tr td:eq(" + column + ")").before($(
                                '<td  style="text-align:right;padding-right: 4px;" class="col" contentEditable="true"></td>'));


                        });

                        $("#right").unbind().click(function () {
                            var column = column_num - 1;

                            $("#mofiz thead tr th:eq(" + column + ")").after($(
                                '<th  style="width:11%;"  class="t-cell-center col" contentEditable="true">Right</th>'));
                            $("#mofiz tbody tr").each(function () {
                                //$('td:first').after($("<td>Value</td>"));
                                $(this).children("td:eq(" + column + ")")
                                    .after($('<td    class="t-cell-center col" contentEditable="true"></td>'));
                            });
                            $("#mofiz tfoot tr td:eq(" + column + ")").after($(
                                '<td  style="text-align:right;padding-right: 4px;" class="col" contentEditable="true"></td>'));

                        });
                        $("#hide").unbind().click(function () {
                            var column = column_num;

                            $("#mofiz thead tr th:nth-child(" + column + ")").hide();
                            $("#mofiz tbody tr td:nth-child(" + column + ")").hide();
                            $("#mofiz tfoot tr td:nth-child(" + column + ")").hide();
                            $scope.isRemoved = true;
                        });
                        $("#unhide").unbind().click(function () {
                            $("#mofiz thead tr").each(function () {
                                $("th").show();
                            });

                            $("#mofiz tbody tr").each(function () {
                                $("td").show();
                            }
                            );
                            //$("#mofiz").colResizable({
                            //    liveDrag: true,
                            //    resizeMode: 'flex',
                            //});
                            $scope.isRemoved = false;
                        });


                    }
                    return false;
                });


            $("#sort").unbind().click(function () {
                var r = confirm("Please change your cloumn header before sort.Once you sort you cant change it");
                if (r == true) {
                    $("#mofiz").trigger("updateAll");
                    //$('#mofiz thead th').removeClass('sorter-false');
                    $("#mofiz").tablesorter({
                        widgets: ["resizable"],
                        widgetOptions: {
                            // storage_useSessionStorage : true, deprecated in v2.28.8
                            // use first letter (s)ession
                            resizable_addLastColumn: true

                        }
                    });
                    $scope.isRemoved = true;
                } else {
                    alertify.confirm().destroy();
                }


            });

        }


        $("#dataacess").click(function () {
            $("#hideme").hide();
            newFun();
        });
        function newFun() {
            $scope.CustomiseTableDataList = [];
            var table = document.getElementById("mofiz");

            var x = 1, m = 0, l = 0;
            for (var s = 0; s < $scope.ItemTableHeaders.length; s++) {
                for (l = 0; l < $scope.ItemTableDataRow.length; l++) {
                    for (m = 0; m < 1; m++) {
                        if (m === s) {
                            $scope.CustomiseTableData.Id = x++;
                            $scope.CustomiseTableData.ColName = $scope.ItemTableHeaders[s];
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
            if ($scope.exportInvoice.IsCPT == true) {
                tableRows.splice(-2);
            }
            
            for (var i = 0, row; row = tableRows[i]; i++) {
                pb[i] = [];
                //rows would be accessed using the "row" variable assigned in the for loop
                for (var j = 0, col; col = row.cells[j]; j++) {

                    pb[i][j] = (col.innerText);
                    if (j == 0) {
                        //col.text(i);
                        $("#mofiz tbody tr td:first").val(i);
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
                    $scope.CustomiseTableData.ColName = pb[y][z];
                    $scope.CustomiseTableData.ColValue = pb[k + 1][p];

                    $scope.CustomiseTableDataList.push($scope.CustomiseTableData);
                    $scope.CustomiseTableData = {};
                }
                z++;
            }
        }

        function getAllExporter() {
            $http({
                url: "/ExpInvoice/GetAllExporter",
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.ExporterList = data;
                $scope.ddlExporter = { ExporterId: data[0].ExporterId };
            });
        };

        function getAllActiveImporter() {
            $http({
                url: "/Company/GetCompanyDynamic?searchCriteria=C.IsActive=1&orderBy=CompanyId",
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $rootScope.companyList = data;
            });
        };



        function GetEmployeeEmailByDocumentRef() {
            $http({
                url: "/Employee/GetEmployeeEmailByDocumentRef?refEmployeeId=" +
                    $scope.exportInvoice.RefEmployeeId
                    +
                    "&PaymentProcessTypeId=" +
                    $scope.exportInvoice.PaymentProcessTypeId,
                method: "GET",
                headers: { 'Content-type': "application/json" }
            }).success(function (data) {
                if (data.length > 0) {
                    var isManagerRef = data[0].IsManagerRef;
                    angular.forEach(data,
                        function (emp) {
                            if (isManagerRef) {
                                emp.IsSelected = emp.EmployeeId === $scope.exportInvoice.RefEmployeeId ? false : true;
                            } else {
                                emp.IsSelected = emp.EmployeeId === $scope.exportInvoice.RefEmployeeId ? true : false;
                            }
                        });
                    $scope.EmailList = data;
                    $scope.refEmail = $scope.EmailList[0].Email;

                }
                if ($scope.saveButtonLabel == "Save") {
                    angular.forEach($scope.EmailList,
                        function (email) {
                            if (email.IsSelected == true) {
                                $scope.ddlEmail = { EmployeeId: email.EmployeeId };
                            }
                        });
                }

            });
        }

        $scope.GetEmail = function () {
            GetEmployeeEmailByDocumentRef();
        };

        function GetSalesOrderListByCompanyForUpdate(obj) {

            $http({
                url: "/SalesOrder/GetSalesOrderForPiUpdate?InvoiceId=" + obj.InvoiceId + "&CompanyId=" + obj.CompanyId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.SalesOrderList = [];
                if (data) {
                    var amount = 0.00;
                    angular.forEach(data,
                        function (e) {
                            //Date Format
                            var parsedDate1 = new Date(parseInt(e.SalesOrderDate.substr(6)));
                            var date1 = ($filter("date")(parsedDate1, "dd/MM/yyyy")).toString();
                            e.SalesOrderDate = date1;
                            e.disabled = true;
                            if (e.IsChecked) {
                                amount += e.AmountWithCPT;
                            }
                        });

                    $scope.SalesOrderList = data;
                    $scope.totalAmount = amount;
                    //$scope.totalAmountWithCPT = amount;
                }
            });
        }

        function GetSubCategoryByItemIds() {
            var idsConcat = "";
            angular.forEach($scope.invoiceDetailList,
                function (aitem) {
                    idsConcat += idsConcat === "" ? ("" + aitem.ItemId) : ("," + aitem.ItemId);
                });
            $scope.ItemCategory = [];
            $http({
                url: "/Item/GetSubCategoryByItemIds?itemIds=" + idsConcat,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (subItem) {
                $scope.ItemCategory = subItem;
            });
        }

        function GetAllAmendmentReason() {
            $http({
                url: "/ExpAmendmentReason/GetAllAmendmentReason",
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.AmendmentReasonList = data;
            });
        }

        $scope.getData = function (curPage) {
            if ($scope.PerPage > 100) {
                $scope.PerPage = 100;
                $scope.currentPage = curPage;
                alertify.log("Maximum record  per page is 100", "error", "5000");
            } else if ($scope.PerPage < 1) {
                $scope.PerPage = 1;
                $scope.currentPage = curPage;
                alertify.log("Minimum record  per page is 1", "error", "5000");
            } else {
                $scope.currentPage = curPage;
            }
        };
        function EmailContentForLockAndSubmite() {
            $scope.EmailSendNotification.EmailSubject = "Created Proforma Invoice No: " + $scope.PiNo;

            var d = Date(Date.now());
            var a = d.toString();
            $scope.CreatedDate = a.split('GMT');

            $scope.EmailSendNotification.EmailBody =
                '<p> Dear User,<br/><strong> A new proforma invoice has been created.</strong> <br/><br/> ' +
                'Proforma Invoice No: <strong > ' + $scope.PiNo + '</strong><br/>' +
                'Proforma Invoice Date: <strong>' + $scope.exportInvoice.InvoiceDate + '</strong><br/>' +
                'Company Name: <strong>' + $scope.ddlImporter.CompanyName + '</strong><br/>' +
                'Referece Employee: <strong>' + $scope.EmailList[0].FullName + '</strong>' + '<br/>' +
                'Creator Name: <strong>' + $scope.FullName + '</strong>' + '<br/>' +
                'Created Date: <strong>' + $scope.CreatedDate[0] + '</strong>' + '<br/><br />' +

                'Regards,<br/>' +
                'Software Team <br/>' +
                'Retail Technologies Ltd.</p>'
        }
        function EmailContentForAmendmentRequest() {
            $scope.EmailSendNotification.EmailSubject = "Amendment request for proforma invoice No: " + $scope.amendment.InvoiceNo;

            var d = Date(Date.now());
            var a = d.toString();
            $scope.CreatedDate = a.split('GMT');

            $scope.EmailSendNotification.EmailBody =
                '<p> Dear User,<br/><strong> An amendment request has been posted for proforma invoice.</strong> <br/><br/> ' +
                'Proforma Invoice No: <strong > ' + $scope.amendment.InvoiceNo + '</strong><br/>' +
                'Proforma Invoice Date: <strong>' + $scope.amendment.InvoiceDate + '</strong><br/>' +
                'Company Name: <strong>' + $scope.amendment.CompanyName + '</strong><br/>' +
                'Amendment Reason: <strong>' + $scope.ddlAmendmentReason.AmendmentReasonName + '</strong>' + '<br/>' +
                'Amendment Request Remarks: <strong>' + $scope.amendment.RequestRemarks + '</strong>' + '<br/>' +
                'Creator Name: <strong>' + $scope.FullName + '</strong>' + '<br/>' +
                'Created Date: <strong>' + $scope.CreatedDate[0] + '</strong>' + '<br/><br />' +

                'Regards,<br/>' +
                'Software Team <br/>' +
                'Retail Technologies Ltd.</p>'
        }
        function EmailSend() {
            $scope.ToEmailList = [];
            angular.forEach($scope.ReportNotificationDetailList, function (aEmail) {
                var emailName = {};
                emailName = aEmail.EmailId;
                $scope.ToEmailList.push(emailName);
            })
            $scope.EmailSendNotification.ToEmail = $scope.ToEmailList;
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

        function savePI(isSubmit, type) {
            if (!$scope.invoiceDetailList.length) {
                alertify.log("Please select atleast one SO", "error", "5000");
                return;
            }

            ckeckValidData();
            alertify.confirm("Are you sure to " + type + "?",
                function (e) {
                    if (e) {
                        $("#mofiz tbody tr td").each(function () {
                            $(this).css("background", "#F5F5F5");
                        });

                        //input replace
                        $("#mofiz tbody td").find(":input").each(function () {
                            $(this).replaceWith(this.value);
                        });
                        $("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").find(":input").each(function () {
                            $(this).replaceWith(this.value);
                            $scope.exportInvoice.TotalAmount = parseFloat(this.value);
                        });
                        //$("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").each(function () {
                        //    $scope.exportInvoice.TotalAmount = parseFloat($(this).html());
                        //});

                        if ($scope.TotalCPTCost > 0) {
                            $scope.exportInvoice.CPTCost = $scope.TotalCPTCost;
                            $scope.exportInvoice.IsCPT = true;
                        } else {
                            $scope.exportInvoice.CPTCost = 0;
                            $scope.exportInvoice.IsCPT = false;
                            var len = $('#mofiz tfoot tr').length;
                            $('#mofiz tfoot tr').eq(len - 1).remove();
                            $('#mofiz tfoot tr').eq(len - 2).remove();
                        }

                        newFun();
                        $('#mofiz td:nth-child(1)').remove();
                        $('#mofiz th:nth-child(1)').remove();
                        $scope.TableHtmlData.HtmlData = String($("#mofiz")[0].outerHTML);

                        $scope.exportInvoice.DocRefId = $scope.ddlEmail.EmployeeId;
                        
                        

                        var termsAndCondition = $(".summernote").summernote("code");
                        $scope.exportInvoice.TermsAndCondition = termsAndCondition;
                        //angular.forEach($scope.invoiceDetailList,
                        //    function (invoice) {
                        //        if (invoice.IsOverride == true) {
                        //            invoice.ItemDescriptionTwo = "override";
                        //            invoice.ItemDescription = invoice.DescriptionOverride;
                        //        } else {
                        //            invoice.ItemDescriptionTwo = "";
                        //        }
                        //    });
                        $scope.exportInvoice.IsSubmit = isSubmit;
                        $scope.exportInvoice.UpdatedBy = $scope.LoginUser.UserId;
                        if ($scope.exportInvoice.PONo == "" || $scope.exportInvoice.PONo == undefined || $scope.exportInvoice.PONo == null) {
                            $scope.exportInvoice.PONo = "";
                            $scope.exportInvoice.PODate = null;
                        }

                        if ($scope.exportInvoice.PODate == undefined || $scope.exportInvoice.PODate == "" || $scope.exportInvoice.PODate == null) {
                            $scope.exportInvoice.PODate = null;
                        }

                        var params = JSON.stringify({
                            exp_Invoice: $scope.exportInvoice,
                            invoiceDetailList: $scope.invoiceDetailList,
                            exp_PackingInfo: $scope.packingInfo,
                            modifiedDataList: $scope.CustomiseTableDataList,
                            tableHtmlData: $scope.TableHtmlData,
                            POReferencelist: $scope.POReferencelist
                        });

                        $http.post("/ExpInvoice/Post", params).success(function (data) {
                            if (data !== "") {
                                //$('#Importer').select2('destroy');
                                if ($scope.exportInvoice.IsSubmit == true) {
                                    AppNotificationLogPost($scope.exportInvoice, 'Proforma Invoice Created!');
                                    $scope.PiNo = data;
                                    EmailContentForLockAndSubmite();
                                    EmailSend();
                                }

                                setTimeout(function () {

                                    $('#Importer').val('').select2({
                                        placeholder: "Search for: Company Name",
                                        theme: "classic",
                                        dropdownAutoWidth: false
                                    }); 
                                    $('#itemNameDisable').val('').select2({
                                        placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                                        theme: "classic",
                                        dropdownAutoWidth: false
                                    });

                                }, 0);
                                alertify.log('Proforma Invoice No: ' + data + ' Save Successfully!', 'success', '5000');
                                $(".summernote").summernote("reset");
                                dateTimePicker();
                                clear();
                                
                                $scope.exportInvoiceForm.$setPristine();
                                $scope.exportInvoiceForm.$setUntouched();
                                $route.reload();

                            }
                        }).error(function (msg) {
                            alertify.log("Save failed, refresh page and try again", "error", "5000");
                        });
                        $("#itemNameDisable").attr("disabled", true);
                        $scope.itemNameDisable = true;
                        $scope.ItemTableHeaders =
                        [
                            "SalesOrderId", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
                        ]; //used for dynamic table headers
                        $scope.ItemTableFooter = ["", "", "", "", "", "0", "", "0"];
                        $scope.ItemTableFooterForCPT = ["", "", "", "", "Freight Charge", "", "", "0"];
                        $scope.ItemTableFooterForCPTTotal = ["", "", "", "", "", "0", "", "0"];
                        $scope.ItemTableDataRow = [];
                    }
                });

        }




        //Events

        $scope.GetItemValueForAmountCalculation = function (itemName, row, index) {
            //$scope.AmountSumForItem = 0;
            //$scope.QtySumForItem = 0;
            $("#mofiz tbody tr td input").focus(function () {
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
                        //$scope.Amount = $scope.Qty * $scope.UnitPrice;
                        //$scope.AmountSumForItem += $scope.Amount;
                        //if (row.length - 1 == index) {
                        //    $scope.Amount = parseFloat(row[row.length - 1]);
                        //    $scope.AmountSumForItem += $scope.Amount;
                        //}
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
                    $scope.totalAmountWithCPT = $scope.AmountSumForItem + parseFloat($scope.TotalCPTCost);
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
                    if (invoiceDetail.ItemId == row[1] && invoiceDetail.Quantity == qtyTemp && invoiceDetail.UnitPrice == unitPriceTemp) {
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
                row[index] = item;
            }
        }
        $scope.GetExporterBankAccount = function () {
            GetExporterBankAccount();
        }
        function GetExporterBankAccount(MasterContactNo) {
            var searchCriteria = "";
            searchCriteria = "AccountFor = 'Exporter'";
            if ($scope.ddlFactory.ExporterId != undefined) {
                searchCriteria = "AccountFor = 'Exporter' and AccountRefId=" + $scope.ddlFactory.ExporterId;
                //searchCriteria = "AccountFor = 'Exporter'";
            }
            if (MasterContactNo != undefined) {
                searchCriteria = "AccountFor = 'Exporter' and AccountRefId=" + parseInt(MasterContactNo);
                //searchCriteria = "AccountFor = 'Exporter'";
            }
            
            $http({
                url: "/BankAccount/GetBankAccountByTypeAndRefId?searchCriteria=" + searchCriteria,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.ExporterBankList = data;
                angular.forEach($scope.ExporterBankList, function (aData) {
                    if (aData.BranchName == '') {
                        aData.BankNameBranch = aData.BankName
                    } else {
                        aData.BankNameBranch = aData.BankName + ' ~ ' + aData.BranchName;
                    }
                    
                    
                })
            });
        };

        $scope.GetSalesOrderByCompany = function (Company) {
            if (Company != undefined) {
                $scope.ddlImporter = Company;
            }
            $scope.invoiceDetailList = [];
            $scope.ItemTableDataRow = [];
            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 1] = 0;
            $scope.ItemTableFooter[$scope.ItemTableFooter.length - 3] = 0;

            $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 3] = 0;
            $scope.ItemTableFooterForCPT[$scope.ItemTableFooterForCPT.length - 1] = 0;

            $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 3] = 0;
            $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = 0;

            $scope.QtySumForItem = 0;
            $scope.AmountSumForItem = 0;
            $scope.ItemCategory = [];
            var company = Enumerable.From($rootScope.companyList).Where("$.CompanyId === " + $scope.ddlImporter.CompanyId)
                .FirstOrDefault();

            if (!angular.isUndefined(company) && company !== null) {
                //$scope.exportInvoice.CompanyNameBilling = company.CompanyNameBilling;
                //$scope.exportInvoice.AddressBilling = company.AddressBilling;
                //$scope.exportInvoice.CompanyNameDelivery = company.CompanyNameDelivery;
                //$scope.exportInvoice.AddressDelivery = company.AddressDelivery;
                $scope.exportInvoice.RefEmployeeId = company.RefEmployeeId;
            }

            $http({
                url: "/SalesOrder/GetSalesOrderForPI?companyId=" + $scope.ddlImporter.CompanyId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                if (data) {
                    $scope.SalesOrderList = [];
                    angular.forEach(data,
                        function (e) {
                            if (e.SalesOrderType != "Local") {
                                e.IsCheck = false;
                                //Date Format
                                var parsedDate1 = new Date(parseInt(e.SalesOrderDate.substr(6)));
                                var date1 = ($filter("date")(parsedDate1, "dd/MM/yyyy")).toString();
                                e.SalesOrderDate = date1;
                                $scope.SalesOrderList.push(e);
                            }
                        });
                }
            });
            if (angular.isDefined($scope.ddlInvoiceType)) {
                delete $scope.ddlInvoiceType;
            }
            if (angular.isDefined($scope.ddlEmail)) {
                delete $scope.ddlEmail;
            }
        };


        //$scope.getItemInfo = function () {
        //    $scope.isInfoShow = !$scope.isInfoShow;
        //};
        $scope.getItemInfo = function () {
            if ($scope.isInfoShow == true) {
                $scope.isInfoShow = false;
            } else {
                $scope.isInfoShow = true;
            }
        };
        $scope.GenerateDynamic = function () {
            $scope.ItemTableData = [[]];

            for (var i = 0; i < 10; i++) {
                $scope.headers.push("Col " + (i + 1));
                var rowData = [];

                for (var j = 0; j < 10; j++) {
                    rowData.push("Row-" + (i + 1) + " - Col " + (j + 1));
                }
                data.push(rowData);
            }
        };
        $scope.GetInvoiceNo = function () {
            if ($scope.exportInvoice.InvoiceDate != "") {
                //var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                //var datePart = $scope.exportInvoice.InvoiceDate.split(",");
                //var year = datePart[1].replace(" ", "");
                //var dateAndMonth = datePart[0].split(" ");
                //var date = dateAndMonth[1];
                //var month = Number(months.indexOf(dateAndMonth[0])) + 1;

                //var yearTwoDigit = Number(year.slice(-2));
                //var finYear = month < 3
                //    ? ((yearTwoDigit - 1) + "-" + yearTwoDigit)
                //    : (yearTwoDigit + "-" + (yearTwoDigit + 1));

                //var monthString = month < 10 ? ("0" + month) : ("" + month);
                //var from = year + "-" + monthString + "-" + date;

                $http({
                    url: "/ExpInvoice/GetInvoiceNo?ExporterId=" + $scope.ddlFactory.ExporterId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    $scope.InvoiceNo2 = data;

                    var criteria = "IsActive=1";
                    $http({
                        url: '/FiscalYear/GetDynamic?searchCriteria=' + criteria + "&orderBy=FiscalYearId",
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).success(function (data) {
                        angular.forEach(data, function (aData) {
                            if (aData.BranchId == 1) {
                                $scope.finYearSreepur = aData.FiscalYearName;
                            } else if (aData.BranchId == 3) {
                                $scope.finYearEPZ = aData.FiscalYearName;
                            }
                        })

                        if ($scope.InvoiceNoTemp == "") {
                            if ($scope.exportInvoice.PaymentProcessTypeId == 2 || $scope.exportInvoice.PaymentProcessTypeId == 3) {
                                $scope.InvoiceNo1 = $scope.ddlFactory.ExporterId == 1
                                    ? ("RTLE/" + $scope.finYearEPZ + "/SC-")
                                    : ("RTL/" + $scope.finYearSreepur + "/SC-");
                            }
                            else {
                                $scope.InvoiceNo1 = $scope.ddlFactory.ExporterId == 1
                                    ? ("RTLE/" + $scope.finYearEPZ + "/PI-")
                                    : ("RTL/" + $scope.finYearSreepur + "/PI-");
                            }
                        } else {
                            var arr = [];
                            arr = $scope.InvoiceNoTemp.split('-');
                            if ($scope.exportInvoice.PaymentProcessTypeId == 2 || $scope.exportInvoice.PaymentProcessTypeId == 3) {
                                $scope.InvoiceNo1 = $scope.ddlFactory.ExporterId === 1
                                    ? ("RTLE/" + $scope.finYearEPZ + "/SC-")
                                    : ("RTL/" + $scope.finYearSreepur + "/SC-");
                            }
                            else {
                                $scope.InvoiceNo1 = $scope.ddlFactory.ExporterId === 1
                                    ? ("RTLE/" + $scope.finYearEPZ + "/PI-")
                                    : ("RTL/" + $scope.finYearSreepur + "/PI-");
                            }
                        }
                    })

                    
                });
                
                
            }
            //if ($scope.ddlFactory.ExporterId === 1) {
            //    $scope.ddlExporterBank = { BankAccountId: 2 };
            //    $scope.exportInvoice.ExporterBankId = 2;
            //}
            //else {
            //    $scope.ddlExporterBank = { BankAccountId: 1 };
            //    $scope.exportInvoice.ExporterBankId = 1;
            //}
        };
        //$scope.GetInvoiceNo = function () {
        //    if ($scope.exportInvoice.InvoiceDate != "") {
        //        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        //        var datePart = $scope.exportInvoice.InvoiceDate.split(",");
        //        var year = datePart[1].replace(" ", "");
        //        var dateAndMonth = datePart[0].split(" ");
        //        var date = dateAndMonth[1];
        //        var month = Number(months.indexOf(dateAndMonth[0])) + 1;

        //        var yearTwoDigit = Number(year.slice(-2));
        //        var finYear = month < 3
        //            ? ((yearTwoDigit - 1) + "-" + yearTwoDigit)
        //            : (yearTwoDigit + "-" + (yearTwoDigit + 1));

        //        var monthString = month < 10 ? ("0" + month) : ("" + month);
        //        var from = year + "-" + monthString + "-" + date;

        //        $http({
        //            url: "/ExpInvoice/GetInvoiceNo?InvoiceDate=" + from + "&ExporterId=" + $scope.ddlFactory.ExporterId,
        //            method: "GET",
        //            headers: { 'Content-Type': "application/json" }
        //        }).success(function (data) {
        //            $scope.Number = data;
        //            if ($scope.InvoiceNoTemp == "") {
        //                if ($scope.exportInvoice.PaymentProcessTypeId == 2 || $scope.exportInvoice.PaymentProcessTypeId == 3) {
        //                    $scope.exportInvoice.InvoiceNo = $scope.ddlFactory.ExporterId == 1
        //                        ? ("RTLE/" + finYear + "/SC-" + $scope.Number)
        //                        : ("RTL/" + finYear + "/SC-" + $scope.Number);
        //                }
        //                else {
        //                    $scope.exportInvoice.InvoiceNo = $scope.ddlFactory.ExporterId == 1
        //                        ? ("RTLE/" + finYear + "/PI-" + $scope.Number)
        //                        : ("RTL/" + finYear + "/PI-" + $scope.Number);
        //                }
        //            } else {
        //                var arr = [];
        //                arr = $scope.InvoiceNoTemp.split('-');
        //                if ($scope.exportInvoice.PaymentProcessTypeId == 2 || $scope.exportInvoice.PaymentProcessTypeId == 3) {
        //                    $scope.exportInvoice.InvoiceNo = $scope.ddlFactory.ExporterId === 1
        //                        ? ("RTLE/" + finYear + "/SC-" + arr[2])
        //                        : ("RTL/" + finYear + "/SC-" + arr[2]);
        //                }
        //                else {
        //                    $scope.exportInvoice.InvoiceNo = $scope.ddlFactory.ExporterId === 1
        //                        ? ("RTLE/" + finYear + "/PI-" + arr[2])
        //                        : ("RTL/" + finYear + "/PI-" + arr[2]);
        //                }
        //            }
        //        });


        //    }
        //    if ($scope.ddlFactory.ExporterId === 1) {
        //        $scope.ddlExporterBank = { BankAccountId: 2 };
        //        $scope.exportInvoice.ExporterBankId = 2;
        //    }
        //    else {
        //        $scope.ddlExporterBank = { BankAccountId: 1 };
        //        $scope.exportInvoice.ExporterBankId = 1;
        //    }
        //};

       
        //$scope.overRide = function (anItem, isOverride) {
        //    anItem.IsOverride = isOverride;
        //};
        $scope.ChangeHSCode = function (anItem, index) {
            //console.log('anItem', anItem);
            //console.log('invoiceDetailList', $scope.invoiceDetailList);
            //console.log('ItemTableDataRow', $scope.ItemTableDataRow);
            //console.log('Item Name', $scope.ItemTableDataRow[index][3]);
            var ItemNameArray = $scope.ItemTableDataRow[index][3].split('HS Code: ');
            $scope.ItemTableDataRow[index][3] = ItemNameArray[0] + 'HS Code: ' + anItem.HsCode;
        }
        $scope.SalesOrderCheck = function (row) {
            $(".summernote").summernote("reset");
            $(".summernote").summernote("code", $scope.TermsAndConditionList);
            $scope.insertItemCount = undefined;
            dynamictable();
            if (row.IsChecked) {
                $("#mofiz thead tr th:nth-child(-n+2)").each(function () {
                    $(this).attr("contenteditable", "false");
                });

                $scope.exportInvoice.CompanyNameBilling = row.CompanyNameBilling;
                $scope.exportInvoice.AddressBilling = row.AddressBilling;
                $scope.exportInvoice.CompanyNameDelivery = row.CompanyNameDelivery;
                $scope.exportInvoice.AddressDelivery = row.AddressDelivery;
                //$scope.exportInvoice.RefEmployeeId = row.PreparedById;
                //GetEmployeeEmailByDocumentRef();
                alertify.log("Company Address And Employee Email Loaded !!!", "success", "6000");

                if ($scope.ItemCategory.length) {
                    for (var i = 0; i < $scope.ItemCategory.length; i++) {
                        $scope.ItemCategory[i].IsChecked = false;
                    };
                    $scope.invoiceDetailList = angular.copy($scope.invoiceDetailSplittedList);
                }
                if (row.CPTCost == null) {
                    row.CPTCost = 0;
                }
                $scope.TotalCPTCost += parseFloat(row.CPTCost);
                $http({
                    url: "/ExpInvoice/InvoiceDetailGetBySalesOrderId?salesOrerId=" + row.SalesOrderId,
                    method: "GET",
                    headers: { 'Content-Type': "application/json" }
                }).success(function (data) {
                    angular.forEach(data,
                        function (adata) {
                            adata.PreAmountOfLcCoppyItem = adata.UnitPrice;
                            adata.ddlHsCode = { HsCodeId: adata.HsCodeId };
                            $scope.invoiceDetailList.push(adata);
                            QuantityAndAmountSum();
                            /*adata.IsOverride = false;*/

                            if (adata.SubCategoryId === 1 || adata.SubCategoryId === 3) {
                                //adata.ItemName = adata.ItemDescription;
                                adata.DescriptionOne = adata.ItemDescription +
                                    //"\n" +
                                    //adata.DescriptionOne +
                                    "\n" +
                                    "(" +
                                    adata.PcPerRoll +
                                    " " +
                                    "Pcs" +
                                    "/" +
                                    "Rolls" +
                                    ")";
                            } else {
                                adata.DescriptionOne = adata.ItemDescription + "\n" + adata.ItemDescriptionTwo;
                            }
                            /*adata.DescriptionTwo = "";*/
                            $scope.invoiceDetailSplittedList = angular.copy($scope.invoiceDetailList);
                        });
                    itemLoadDynamicTable($scope.invoiceDetailList);

                    GetSubCategoryByItemIds();
                });
                
                $http({
                    url: '/ExpInvoice/GetPOReference?DocType=SO' + "&DocumentId=" + row.SalesOrderId,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length) {
                        angular.forEach(data, function (aPODetail) {
                            aPODetail.DocType = 'PI';

                            var res2 = aPODetail.PODate.substring(0, 5);
                            if (res2 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aPODetail.PODate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aPODetail.PODate = date1;
                            }
                            var POCheckList = $scope.POReferencelist.filter(aPO => aPO.PONo === aPODetail.PONo);
                            if (POCheckList.length > 0) {

                            } else {
                                $scope.POReferencelist.push(aPODetail);
                            }
                                

                        })

                    }

                });
            
                

            } else {
                /////////////////////////////////////////////////
                var dtlList = Enumerable.From($scope.POReferencelist).Where("$.DocumentId === " + row.SalesOrderId)
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

                var dtlList = Enumerable.From($scope.invoiceDetailList).Where("$.SalesOrderId === " + row.SalesOrderId)
                    .ToArray();
               
                $scope.TempQty = 0;
                angular.forEach(dtlList,
                    function (aDetail) {
                        $scope.TempQty += aDetail.Quantity;
                        var detail = Enumerable.From($scope.invoiceDetailList)
                            .Where("$.SalesOrderId === " + aDetail.SalesOrderId).FirstOrDefault();
                        var index = $scope.invoiceDetailList.indexOf(detail);
                        $scope.invoiceDetailList.splice(index, 1);
                        $scope.ItemTableDataRow.splice(index, 1);
                        $scope.invoiceDetailSplittedList = angular.copy($scope.invoiceDetailList);
                    });
                $scope.AmountSumForItem -= row.Amount.toFixed(2);
                $scope.QtySumForItem -= $scope.TempQty.toFixed(2);
                if (row.CPTCost == null) {
                    row.CPTCost = 0;
                }
                $scope.TotalCPTCost -= parseFloat(row.CPTCost);
                $scope.ItemTableFooter = ["", "", "", "", "", $scope.QtySumForItem.toFixed(2), "", $scope.AmountSumForItem.toFixed(2)];

                $scope.ItemTableFooterForCPT = ["", "", "", "", "Freight Charge", "", "", $scope.TotalCPTCost.toFixed(2)];
                $scope.ItemTableFooterForCPTTotal = ["", "", "", "", "", $scope.QtySumForItem.toFixed(2), "", parseFloat($scope.totalAmountWithCPT).toFixed(2)];

                var dtlListForExtraItem = Enumerable.From($scope.invoiceDetailList).Where("$.SalesOrderId !==" + 0)
                    .ToArray();
                if (dtlListForExtraItem.length == 0) {
                    $scope.invoiceDetailList = [];
                    $scope.ItemTableDataRow = [];
                }
                rearrangeSerial();
                QuantityAndAmountSum();
                GetSubCategoryByItemIds();

                
            }

            var amount = 0.00;
            $scope.exportInvoice.SalesOrderIds = "";

            angular.forEach($scope.SalesOrderList,
                function (salesOrder) {
                    if (salesOrder.IsChecked) {
                        amount += salesOrder.AmountWithCPT;
                        $scope.exportInvoice.SalesOrderIds += $scope.exportInvoice.SalesOrderIds === ""
                            ? salesOrder.SalesOrderId
                            : ("," + salesOrder.SalesOrderId);
                    }
                });
            $scope.totalAmount = 0;
            $scope.totalAmountWithCPT = 0;
            $scope.totalAmount = amount.toFixed(2);
            $scope.totalAmountWithCPT = amount.toFixed(2);
            $scope.ItemTableFooterForCPTTotal[$scope.ItemTableFooterForCPTTotal.length - 1] = parseFloat($scope.totalAmountWithCPT).toFixed(2);
        };

        function GetHsCode() {

            $http({
                url: "/ItemHsCode/Get",
                method: "Get",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.HsCodeList = data;
            })
        }

        $scope.GetitemId = function (index, salesOrderId) {
            $scope.index = index;
            $scope.salesOrderId = salesOrderId;

        };

        $scope.changeAmountForLcCoppyItemQuantity = function (adata) {
            if (adata.Quantity != undefined && adata.UnitPrice != undefined) {
                adata.Amount = adata.Quantity * adata.UnitPrice;
                QuantityAndAmountSum();
            }
        };
        $scope.changeAmountForLcCoppyItemAmount = function (adata) {
            QuantityAndAmountSum();
        };

        function QuantityAndAmountSum() {
            $scope.QuantitySum = 0;
            $scope.AmountSum = 0;
            angular.forEach($scope.invoiceDetailList,
                function (aItem) {
                    $scope.QuantitySum += aItem.Quantity.toFixed(2);
                    $scope.AmountSum += aItem.Amount.toFixed(2);
                });
        }

        $scope.hideButton = function () {
            if ($scope.isInvoiceNo == true) {
                $scope.isInvoiceNo = false;
            } else {
                $scope.isInvoiceNo = true;
            }
        };

        function getTableHeaders() {
             $scope.thArray = [];

            $('#mofiz > thead > tr > th').each(function() {
                $scope.thArray.push($(this).text());
            });

        }
        function ckeckValidData() {
            $("#mofiz tbody td").find(":input").each(function () {
                var IsNaN = parseFloat($(this).val());

                if (isNaN(IsNaN)) {
                    alert("Invalid Qty & Unit Price !!!");
                    alertify.confirm().destroy();
                    return;
                }
            });
        }
        $scope.post = function () {
            getTableHeaders();
            var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
            if ((findDuplicates($scope.thArray)).length !== 0) {
                alert("Please change duplicate column Name");
            }
            else {
                //$scope.InvoiceNo2 = $scope.InvoiceNo2.replace(/\D/g, '');
                $scope.exportInvoice.InvoiceNo = $scope.InvoiceNo1 + $scope.InvoiceNo2;
                var criteria = "InvoiceNo='" + $scope.exportInvoice.InvoiceNo + "'";
                if ($scope.exportInvoice.InvoiceId > 0) {
                    criteria += " AND InvoiceId<>" + $scope.exportInvoice.InvoiceId;
                }

                $http({
                    url: "/ExpInvoice/GetExpInvoiceDynamic?searchCriteria=" + criteria + "&orderBy=InvoiceNo",
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length > 0) {
                        alertify.log('Proforma Invoice No: ' + $scope.exportInvoice.InvoiceNo + ' already exists!', 'already', '5000');
                        return;
                    }
                    else {
                        if ($scope.exportInvoice.InvoiceId == 0 && $scope.CreatePermission) {
                            savePI(false, $scope.saveButtonLabel);  
                        }
                        else if ($scope.exportInvoice.InvoiceId == 0 && !$scope.CreatePermission) {
                            alertify.log('You do not have permission to save!', 'error', '5000');
                        }
                        else if ($scope.exportInvoice.InvoiceId > 0 && $scope.RevisePermission) {
                            savePI(false, $scope.saveButtonLabel);
                        }
                        else if ($scope.exportInvoice.InvoiceId > 0 && !$scope.RevisePermission) {
                            alertify.log('You do not have permission to Update!', 'error', '5000');
                        }
                        //savePI(false, $scope.saveButtonLabel);
                    }
                });
                
                
            }
        };

        $scope.lockAndSubmit = function () {
            getTableHeaders();
            var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index);
            if ((findDuplicates($scope.thArray)).length !== 0) {
                alert("Please change duplicate column Name");
            }
            else {
                //$scope.InvoiceNo2 = $scope.InvoiceNo2.replace(/\D/g, '');
                $scope.exportInvoice.InvoiceNo = $scope.InvoiceNo1 + $scope.InvoiceNo2;
                var criteria = "InvoiceNo='" + $scope.exportInvoice.InvoiceNo + "'";
                if ($scope.exportInvoice.InvoiceId > 0) {
                    criteria += " AND InvoiceId<>" + $scope.exportInvoice.InvoiceId;
                }

                $http({
                    url: "/ExpInvoice/GetExpInvoiceDynamic?searchCriteria=" + criteria + "&orderBy=InvoiceNo",
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).success(function (data) {
                    if (data.length > 0) {
                        alertify.log('Proforma Invoice No: ' + $scope.exportInvoice.InvoiceNo + ' already exists!', 'already', '5000');
                        return;
                    }
                    else {
                        if ($scope.exportInvoice.InvoiceId == 0 && $scope.CreatePermission) {
                            savePI(true, "Lock & Submit");
                        }
                        else if ($scope.exportInvoice.InvoiceId == 0 && !$scope.CreatePermission) {
                            alertify.log('You do not have permission to save!', 'error', '5000');
                        }
                        else if ($scope.exportInvoice.InvoiceId > 0 && $scope.RevisePermission) {
                            savePI(true, "Lock & Submit");
                        }
                        else if ($scope.exportInvoice.InvoiceId > 0 && !$scope.RevisePermission) {
                            alertify.log('You do not have permission to Update!', 'error', '5000');
                        }
                        
                    }
                });
                
            }
        };
        $scope.resetForm = function () {
            $(".summernote").summernote("reset");
            $scope.IsEdit = false;
            setTimeout(function () {

                $('#Importer').val('').select2({
                    placeholder: "Search for: Company Name",
                    theme: "classic",
                    dropdownAutoWidth: false
                });
                $('#itemNameDisable').val('').select2({
                    placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                    theme: "classic",
                    dropdownAutoWidth: false
                });

            }, 0);
            clear();
            //$scope.exportInvoiceForm.$setPristine();
            //$scope.exportInvoiceForm.$setUntouched();
            $route.reload();


        };

        $scope.Finalized = function () {
            $scope.isFinalized = true;
            $("#itemNameDisable").attr("disabled", false);
            $scope.itemNameDisable = false;
            for (var i = 0; i < $scope.SalesOrderList.length; i++) {

                $scope.SalesOrderList[i].disabled = true;
            }

        }
        $scope.invoiceRowClick = function (data) {
            $scope.IsEdit = true;
            $window.scrollTo(0, 0);

            $scope.QtySumForItem = 0;
            $scope.UnitpriceSumForItem = 0;
            $scope.AmountSumForItem = 0;
            dynamictable();

            $scope.isRemoved = false;
            $scope.isUpdate = 'update';
            $scope.IsPreviousData = true;
            $scope.isEnableIput = false;
            $scope.isFinalized = true;
            $scope.disBank = false;
            $("#itemNameDisable").attr("disabled", false);
            $scope.itemNameDisable = false;
            $("#itemName").attr("disabled", false);
            if (data.DocStatus !== "Draft") {
                alertify.log("Cannot modify this invoice", "error", "5000");
                return;
            }
            $scope.InvoiceId = data.InvoiceId;
            var invNo = data.InvoiceNo;
            $scope.InvoiceNoTemp = data.InvoiceNo;
            var arr = [];
            if (data.ExporterId == 1) { // RTLE
                $scope.InvoiceNo1 = data.InvoiceNo.substr(0, 14);
                arr = $scope.InvoiceNoTemp.split($scope.InvoiceNo1);
                //$scope.InvoiceNo2 = parseInt(arr[1]);
                $scope.InvoiceNo2 = arr[1];
            } else { //RTL
                $scope.InvoiceNo1 = data.InvoiceNo.substr(0, 13);
                arr = $scope.InvoiceNoTemp.split($scope.InvoiceNo1);
                //$scope.InvoiceNo2 = parseInt(arr[1]);
                $scope.InvoiceNo2 = arr[1];
            }


            $scope.saveButtonLabel = "Update";
            $scope.exportInvoice = data;
            $scope.ddlExporter = { ExporterId: 1 };
            GetExporterBankAccount(data.MasterContactNo);
            getAllExporter();
            $scope.ddlExporterBank = { "BankAccountId": data.ExporterBankId };

            $('#Importer').select2('destroy');
            $('#Importer').val(data.CompanyId).select2();
            $scope.ddlImporter = Enumerable.From($rootScope.companyList).Where("$.CompanyId ==" + data.CompanyId)
                .FirstOrDefault();
            $scope.CompanyBtn = 'Edit';

            $scope.ddlInvoiceType = { "PaymentProcessTypeId": data.PaymentProcessTypeId };
            $scope.ddlFactory = { "ExporterId": data.ExporterId };
            GetEmployeeEmailByDocumentRef();
            $scope.ddlEmail = { "EmployeeId": data.DocRefId };

            $scope.exportInvoice.InvoiceNo = invNo;
            var termsAndCondition = data.TermsAndCondition;
            
            $(".summernote").summernote("code", termsAndCondition);
            if (data.InvoiceDate != undefined) {
                var res1 = data.InvoiceDate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(data.InvoiceDate.substr(6)));
                    var date1 = ($filter("date")(parsedDate1, "MMM dd, yyyy")).toString();
                    data.InvoiceDate = date1;
                }
            }

            if (data.PODate != undefined) {
                var res2 = data.PODate.substring(0, 5);
                if (res2 == "/Date") {
                    var parsedDate2 = new Date(parseInt(data.PODate.substr(6)));
                    var date2 = ($filter("date")(parsedDate2, "MMM dd, yyyy")).toString();
                    data.PODate = date2;
                }
            }
            
            
            GetSalesOrderListByCompanyForUpdate(data);
            $scope.ItemTableDataRow = [];

            getItemDetailModifiedDataForUpdate(data.InvoiceId);
            
            $http({
                url: "/ExpInvoice/InvoiceDetailGetByInvoiceId?invoiceId=" + data.InvoiceId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.invoiceDetailList = [];
                $scope.invoiceDetailSplittedList = [];
                if (data.length) {
                    angular.forEach(data,
                        function (adata) {
                            adata.PreAmountOfLcCoppyItem = adata.UnitPrice;
                            adata.ddlHsCode = { HsCodeId: adata.HsCodeId };
                            $scope.invoiceDetailList.push(adata);
                            QuantityAndAmountSum();
                            
                            $scope.invoiceDetailSplittedList = angular.copy($scope.invoiceDetailList);
                        });
                    
                } else {
                    $scope.totalAmount = 0;
                    $scope.ItemCategory = [];
                    
                }
            });
            $http({
                url: "/ExpInvoice/PackingInfoGetByInvoiceId?invoiceId=" + data.InvoiceId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (packInfo) {
                if (packInfo.length) {
                    $scope.packingInfo = packInfo[0];
                }
            });
            $("#itemNameDisable").keypress(function (event) {
                if (event.keyCode === 13) {
                    $("#importBtn").click();
                    event.preventDefault();
                    return false;
                }
            }); 
            rearrangeSerial();


            $http({
                url: '/ExpInvoice/GetPOReference?DocType=PI' + "&DocumentId=" + data.InvoiceId,
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
                        $scope.exportInvoice.isPO = true;
                    }
                }

            });
            $scope.TotalCPTCost = parseFloat(data.CPTCost).toFixed(2);
            $scope.totalAmountWithCPT = parseFloat(data.AmountWithCPT).toFixed(2);
            $window.scrollTo(0, 0);
        };



        $scope.stopPropagation = function () {
            $("#AmendmentModal").modal("show");
            event.stopPropagation();
        };

        $scope.postAmendmentRequest = function () {
            $scope.amendment.ApprovalType = "PiAmendment";

            alertify.confirm("Are you sure to Amendment Request?",
                function (e) {
                    if (e) {
                        var params = JSON.stringify({ expApproval: $scope.amendment });
                        $http.post("/ExpApproval/Save", params).success(function (data) {
                            if (data > 0) {
                                AppNotificationLogPost($scope.amendment, 'Proforma Invoice Amendment Request!');
                                EmailContentForAmendmentRequest();
                                EmailSend();
                                alertify.log("Amendment Request Saved Successfully!", "success", "5000");
                                clear();
                                $scope.exportInvoiceForm.$setPristine();
                                $scope.exportInvoiceForm.$setUntouched();
                            }
                        }).error(function (msg) {
                            alertify.log("Save failed, refresh page and try again", "error", "5000");
                        });
                    }
                });
        };

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
            $scope.packingInfoCombind = {};
            $scope.packingInfoCombind.TotalCarton = 0;
            $scope.packingInfoCombind.LabelNetWeight = 0;
            $scope.packingInfoCombind.LabelGrossWeight = 0;
            $scope.packingInfoCombind.RibonNetWeight = 0;
            $scope.packingInfoCombind.RibonGrossWeight = 0;
            $scope.packingInfoCombind.CartonMeasurement = "";
            $scope.packingInfoCombind.RibonNetWeight = 0;

            $scope.productListForRibbon = [];
            $scope.productListForLabel = [];

            $scope.packingInfo = {};
            $scope.packingInfo.TotalCarton = 0;
            $scope.packingInfo.LabelNetWeight = 0;
            $scope.packingInfo.LabelGrossWeight = 0;
            $scope.packingInfo.RibonNetWeight = 0;
            $scope.packingInfo.RibonGrossWeight = 0;
            $scope.packingInfo.CartonMeasurement = "";
            $scope.packingInfo.RibonNetWeight = 0;
            if (!$scope.invoiceDetailList.length) {
                alertify.log("No item in item list", "error", "5000");
                return;
            }
            $scope.example = angular.copy($scope.invoiceDetailList);
            ///Convart Pcs To Roll
            angular.forEach($scope.invoiceDetailList,
                function (adata) {
                    if (adata.OrderUnitId == 1) {

                        adata.Quantity = adata.Quantity / adata.PcPerRoll;
                    }
                })
            

            $scope.invoiceDetailListWithFlag = [];
            angular.forEach($scope.invoiceDetailList,
                function (adata) {
                    if (adata.IdenticalFlag != 0) {
                        $scope.itemFlag = true;
                        $scope.invoiceDetailListWithFlag.push(adata);
                    }
                });

            ///////////////////////////////
            var listToDelete = [];
            for (var i = 0; i < $scope.invoiceDetailListWithFlag.length; i++) {
                listToDelete.push($scope.invoiceDetailListWithFlag[i].ItemId);
            }
            $scope.invoiceDetailListWithoutFlag = $scope.invoiceDetailList.filter(el => (listToDelete.indexOf(el.ItemId) == -1));
            /////////////////////////////

            
            $scope.margeProduct = [];
            $scope.margeProductWithFlag = [];
            $scope.margeProductWithoutFlag = [];
            /////////////////////////////////////
            if ($scope.itemFlag == true) {
                $scope.margeProductWithFlag = $scope.invoiceDetailListWithFlag.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                    var temp = r.find(o => o.IdenticalFlag === IdenticalFlag);
                    if (!temp) {
                        r.push({ Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                    } else {
                        temp.Quantity += Quantity;
                    }
                    return r;
                }, []);

                $scope.margeProductWithoutFlag = $scope.invoiceDetailListWithoutFlag.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
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
                $scope.margeProduct = $scope.invoiceDetailList.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                    var temp = r.find(o => o.ItemId === ItemId && o.MaterialTypeId === MaterialTypeId);
                    if (!temp) {
                        r.push({ Amount, ContainerId, CartonSize, CartonWeight, ItemDescription, ItemDescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, MaterialTypeId, IdenticalFlag, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                    } else {
                        temp.Quantity += Quantity;
                    }
                    return r;
                }, []);
            }
            
            ////////////////////////////////
            /////////////////// separated Combind Item
            angular.forEach($scope.SPItemList,
                function (adata) {
                    var tempSPRibbon = $scope.margeProduct.filter(product => product.ItemId === adata.RibbonId);
                    $scope.productListForRibbon = $scope.productListForRibbon.concat(tempSPRibbon).unique();
                    var tempSPLabel = $scope.margeProduct.filter(product => product.ItemId === adata.LabelId);
                    $scope.productListForLabel = $scope.productListForLabel.concat(tempSPLabel).unique();

                    tempSPRibbon = [];
                    tempSPLabel = [];
                })


            //////////////////Label + Ribbon = OneList
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
            console.log(listToDelete);
            $scope.ExtraItem = $scope.margeProduct.filter(el => (listToDelete.indexOf(el.ItemId) == -1));
            console.log($scope.ExtraItem);

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


            $scope.invoiceDetailList = $scope.example;
        };

        $scope.OpenPopupWindow = function (invoiceId) {
            $window.open("#/ProformaInvoiceReport", "popup", "width=800,height=550,left=280,top=80");
            //sessionStorage.setItem("InvoiceId", JSON.stringify(invoiceId));
            $cookieStore.put("InvoiceId", invoiceId);
            event.stopPropagation();
        };


        $scope.resetTerms = function () {
            $(".summernote").summernote("reset");
            $(".summernote").summernote("code", $scope.TermsAndConditionList);
        };

        function LoadItem(aItem) {
            $scope.ad_Item = {};
            $scope.ddlCategory = "";
            $scope.ddlSubCategory = "";
            $scope.ddlHsCode = "";
            $scope.ddlItemPackage = "";
            $scope.ddlItemUnit = "";
            $scope.ddlItemContainer = "";
            var itemFlag = 0;
            //var splitItem = aItem.split("~");
            var itemCode = aItem.ItemCode;
            var itemId = aItem.ItemId;

            angular.forEach($rootScope.ItemSearchList,
                function (aData) {
                    if (itemId == aData.ItemId) {
                        $scope.btnSaveItem = "Update";
                        /*if (aItem == aData.TempItemName) {*/
                        $scope.ad_Item = aData;
                        $scope.ddlCategory = { "CategoryId": aData.CategoryId };
                        $scope.ddlSubCategory = { "SubCategoryId": aData.SubCategoryId };
                        $scope.ddlHsCode = { "HsCodeId": aData.HsCodeId };

                        var objUnit = Enumerable.From($scope.ItemUnitlist).Where("$.ItemUnitId ==" + aData.UnitId)
                            .FirstOrDefault();
                        $scope.ddlItemUnit = objUnit;

                        var objPackage = Enumerable.From($scope.ItemUnitlist)
                            .Where("$.ItemUnitId ==" + aData.PackageId)
                            .FirstOrDefault();
                        $scope.ddlItemPackage = objPackage;

                        var objContainer = Enumerable.From($scope.ItemUnitlist)
                            .Where("$.ItemUnitId ==" + aData.ContainerId)
                            .FirstOrDefault();
                        $scope.ddlItemContainer = objContainer;

                        itemFlag = 1;
                        //}
                    }
                });
            if (itemFlag == 0) {
                alertify.log("Please insert valid product!", "error", "5000");
            }
        }
        $scope.LoadItem = function (aItem) {
            LoadItem(aItem);
        }

        $scope.ImportItem = function (aItem) {
            //$("#ok tbody tr").find("td:eq(1),th:eq(1)").remove();
            LoadItem(aItem);
            if ($scope.ad_Item.SubCategoryId === 1 || $scope.ad_Item.SubCategoryId === 3) {
                $scope.ad_Item.ItemDescription = $scope.ad_Item.ItemDescription +
                    //"\n" +
                    //$scope.ad_Item.ItemDescriptionTwo +
                    "\n" +
                    "(" +
                    $scope.ad_Item.PcPerRoll +
                    " " +
                    "Pcs" +
                    "/" +
                    "Rolls" +
                    ")";
            } else {
                $scope.ad_Item.ItemDescription =
                    $scope.ad_Item.ItemDescription + "\n" + $scope.ad_Item.ItemDescriptionTwo + "\n";
            }

            $scope.ad_Item.ItemDescriptionTwo = "";
            if ($scope.ad_Item.Quantity == undefined || $scope.ad_Item.Quantity == "") {
                $scope.ad_Item.Quantity = 0;
            }
            if ($scope.ad_Item.UnitPrice == undefined || $scope.ad_Item.UnitPrice == "") {
                $scope.ad_Item.UnitPrice = 0;
            }
            if ($scope.ad_Item.Amount == undefined || $scope.ad_Item.Amount == "") {
                $scope.ad_Item.Amount = 0;
            }
            $scope.ad_Item.SalesOrderId = 0;
            $scope.invoiceDetailList.push($scope.ad_Item);
            tableImportItem($scope.ad_Item);
            QuantityAndAmountSum();
            //itemLoadDynamicTable($scope.invoiceDetailList);
            //$('#itemNameDisable').select2('destroy');
            setTimeout(function () {

                $('#itemNameDisable').val('').select2({
                    placeholder: "Search for: Item Name ~ Description One ~ Description Two ~ Item Code ~ Pc(s) Per Roll ~ Roll Per Carton ~ Hs Code",
                    theme: "classic",
                    dropdownAutoWidth: false
                });

            }, 0);
            
            alertify.log("Product Imported Successfully", "success", "5000");
        };



        function insertAtTable(index, insertItem) {
            $scope.insertItemCount = insertItem;
            $scope.ItemTableHeaders.splice(index, 0, insertItem);
            angular.forEach($scope.ItemTableDataRow,
                function (item, idx) {
                    item.splice(Number(index), 0, "new data");
                });
            $scope.ItemTableFooter.splice(index, 0, "");
            $scope.ItemTableFooterForCPT.splice(index, 0, "");
            $scope.ItemTableFooterForCPTTotal.splice(index, 0, "");
        }

        $scope.tableInsertCol = function () {
            var index = prompt("Please enter index No");
            var name = prompt("Enter column name here");
            if (Number(index) > ($scope.ItemTableHeaders.length - 3) ||
                Number(index) <= 4 ||
                name == null ||
                index == null || isNaN(Number(index)))
                alert("Can't insert here");
            else {
                $scope.AmountSumForItem = 0;
                //$scope.QtySumForItem = 0;
                insertAtTable(Number(index), name);
                //$scope.mergeTableData();
            }
        };
        $scope.tableInsertRow = function () {
            //  $scope.ItemTableDataRow.push([1, 'Des', 'q', 'u', 'a']);
            var myarray = [];
            angular.forEach($scope.ItemTableHeaders,
                function (item) {
                    if (item == "Description") {
                        myarray.push("Descripton");

                    } else {
                        myarray.push("R");
                    }
                    $("#mofiz td").attr("contentEditable", true);


                });
            $scope.ItemTableDataRow.push(myarray);

        };

        function tableImportItem(aItem) {
            var myarray = [];
            angular.forEach($scope.ItemTableHeaders,
                function (i, idx) {
                    if (idx == 0) {
                        myarray.push(aItem.SalesOrderId);
                    }
                    else if (idx == 1) {
                        myarray.push(aItem.ItemId);
                    }
                    else if (idx == 2) {
                        myarray.push($scope.ItemTableDataRow.length + 1);
                    } else if (idx == 3) {
                        myarray.push(aItem.ItemName + "\n HS Code: " + aItem.HsCode);
                    } else if (idx == 4) {
                        myarray.push(aItem.ItemDescription);
                    } else if (idx == $scope.ItemTableHeaders.length - 3) {
                        myarray.push(0);
                    } else if (idx == $scope.ItemTableHeaders.length - 2) {
                        myarray.push(0);
                    } else if (idx == $scope.ItemTableHeaders.length - 1) {
                        myarray.push(0);
                    } else {
                        myarray.push("New Data");
                    }
                    //$("#mofiz td").attr("contentEditable", true);


                });
            $scope.ItemTableDataRow.push(myarray);

        }
        $scope.restMergeInvoiceDetails = function () {
            var result = confirm("Are you sure to reset all data?");
            if (result) {
                //Logic to delete the item
                if ($scope.invoiceDetailList.length == 0) {
                    $scope.ItemCategory = [];
                    $scope.invoiceDetailList = [];
                    $("#mofiz  tr th:nth-child(n)").each(function () {
                        $(this).attr("contenteditable", "false");

                    });
                    //$("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").find(":input").each(function () {
                    //    $(this).attr('disabled', 'disabled');
                    //    $(this).text(0);
                    //});
                    $("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").find(":input").each(function () {
                        $(this).attr("disabled", true);
                        $(this).text(0);
                    });
                    //document.getElementById('txtTotalAmount').disabled = true;
                    $scope.ItemTableHeaders =
                        [
                            "SalesOrderId", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
                        ];
                    $scope.ItemTableFooter = ["", "", "", "", "", 0, "", 0];
                    $scope.ItemTableFooterForCPT = ["", "", "", "", "Freight Charge", "", "", 0];
                    //$scope.ItemTableFooterForCPTTotal = ["", "", "", "", "", 0, "", 0];
                    $scope.ItemTableFooterForCPTTotal = [];
                    $scope.ItemTableDataRow = [];
                    $scope.invoiceDetailList = [];
                    $scope.margeProduct = [];
                    //$scope.POReference = {};
                    //$scope.POReferencelist = [];
                    //$scope.POReferencelistTemp = [];
                    $scope.AmountSumForItem = 0;
                    $scope.QtySumForItem = 0;
                    $scope.QuantitySum = 0;
                    $scope.AmountSum = 0;
                    $scope.TotalCPTCost = 0;
                    $scope.AmountWithCPT = 0;
                    $scope.totalAmountWithCPT = 0;
                    $scope.isFinalized = false;
                    $("#itemNameDisable").attr("disabled", true);
                    $scope.itemNameDisable = true;
                    $scope.isEnableIput = false;
                    $scope.isRemoved = false;
                    $scope.isRemoved = false;
                    $scope.isFinalized = false;
                    $scope.totalAmount = 0;
                    $scope.ad_Item.TempItemName = "";

                    for (var i = 0; i < $scope.SalesOrderList.length; i++) {
                        $scope.SalesOrderList[i].IsChecked = false;
                        $scope.SalesOrderList[i].disabled = false;
                    }
                    //if ($scope.invoiceDetailList[0].InvoiceId == undefined || $scope.invoiceDetailList[0].InvoiceId == 0) {
                    $scope.ItemCategory = [];
                    $scope.invoiceDetailList = [];
                    return;
                }
                restMergeInvoiceDetails();
            }
        }


        function restMergeInvoiceDetails() {

            $scope.ItemCategory = [];
            $("#mofiz  tr th:nth-child(n)").each(function () {
                $(this).attr("contenteditable", "false");

            });
            $scope.ItemTableHeaders =
                [
                    "SalesOrderId", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
                ];
            $scope.ItemTableFooter = ["", "", "", "", "", 0, "", 0];
            $scope.ItemTableFooterForCPT = ["", "", "", "", "Freight Charge", "", "", 0];
            //$scope.ItemTableFooterForCPTTotal = ["", "", "", "", "", 0, "", 0];
            $scope.ItemTableFooterForCPTTotal = [];
            $scope.ItemTableDataRow = [];
            $scope.invoiceDetailList = [];
            $scope.AmountSumForItem = 0;
            $scope.QtySumForItem = 0;
            $scope.QuantitySum = 0;
            $scope.AmountSum = 0;
            $scope.TotalCPTCost = 0;
            $scope.AmountWithCPT = 0;
            $scope.totalAmountWithCPT = 0;
            $scope.isFinalized = false;
            $("#itemNameDisable").attr("disabled", true);
            $scope.itemNameDisable = true;
            $scope.isEnableIput = false;
            $scope.isRemoved = false;
            $scope.isRemoved = false;
            $scope.isFinalized = false;
            $scope.itemFlag = false;
            $scope.totalAmount = 0;
            $scope.ad_Item.TempItemName = "";
            $scope.InvoiceNoTemp = "";

            for (var i = 0; i < $scope.SalesOrderList.length; i++) {
                $scope.SalesOrderList[i].IsChecked = false;
                $scope.SalesOrderList[i].disabled = false;
            }
        };
        $scope.tableInputDisable = function () {
            editAble();
            //var len = $('#mofiz tfoot tr').length;
            //$('#mofiz tfoot tr').eq(len - 2).find('th:nth-last-child(1)').on('change', function () {
            //    alert("Shuvo");
            //});
            //$('#mofiz tfoot tr').eq(len - 2).find('th:nth-last-child(1)').css('background-color', 'red');
            $scope.isEnableIput = true;
            $("#itemNameDisable").attr("disabled", true);
            $scope.itemNameDisable = true;
            
        }
        $scope.tableRemoveCol = function () {
            var index = prompt("Please enter Column No");
            var col = Number(index);

            if (col <= 4)
                alert("Can't Remove this Column");
            else if ((col) >= ($scope.ItemTableHeaders.length - 3))
                alert("Can't Remove this Column");
            else {
                $scope.ItemTableHeaders.splice(col, 1);

                angular.forEach($scope.ItemTableDataRow, function (item, idx) {
                    item.splice(col, 1);
                });

                $scope.ItemTableFooter.splice(col, 1);
                $scope.ItemTableFooterForCPT.splice(col, 1);
                $scope.ItemTableFooterForCPTTotal.splice(col, 1);
            }
        };
        hotkeys.add({
            combo: 'ctrl+backspace',
            description: 'This one goes to 11',
            callback: function () {
                if (!$scope.isFinalized) {
                    alertify.log("Can't remove at this time !!!", "error", "5000");
                    return;
                } else {
                    if ($scope.row_numP1 != null) {

                        tableRemoveRow();
                    } else {
                        alertify.log("Please select a item !!!", "error", "5000");
                        $scope.row_numP1 = null;
                    }
                }


            }
        });
        $scope.tableRemoveRow = function () {
            tableRemoveRow();
        };
        function tableRemoveRow() {
            if ($scope.row_numP1 != null) {

                var r = confirm("Are you sure to remove " + $scope.row_numP1 + " SL number item ?");
                if (r == true) {
                    //var rowNo = prompt("Please enter a row number");
                    if ($scope.row_numP1 != null) {
                        var salesOrderItemList =
                            Enumerable.From($scope.invoiceDetailList).Where("$.SalesOrderId !== 0").ToArray();
                        var row = $scope.ItemTableDataRow[Number($scope.row_numP1 - 1)];

                        if (salesOrderItemList.length > 1) {
                            $scope.GetChengedFieldValue("0", row, Number(row.length - 3));
                            //remove item table data row here
                            $scope.invoiceDetailList.splice(Number($scope.row_numP1 - 1), 1);
                            $scope.ItemTableDataRow.splice(Number($scope.row_numP1 - 1), 1);

                            QuantityAndAmountSum();
                            rearrangeSerial();

                        }
                        else if (row[0] == 0) {
                            $scope.GetChengedFieldValue("0", row, Number(row.length - 3));
                            //remove item table data row here
                            $scope.ItemTableDataRow.splice(Number($scope.row_numP1 - 1), 1);
                            $scope.invoiceDetailList.splice(Number($scope.row_numP1 - 1), 1);
                            QuantityAndAmountSum();
                            rearrangeSerial();
                        }
                        else {
                            alertify.log("Shouldn't remove Last Item!!!", "error", "5000");
                        }
                    } else {
                        alertify.confirm().destroy();
                    }
                    
                }
            } else {
                alertify.log("Please select a item !!!", "error", "5000");
                $scope.row_numP1 = null;
            }
        }

        
        function editAble() {
            var rowNumber = $scope.ItemTableHeaders.length - 4;

            $("#mofiz tbody tr td:nth-child(-n+" + rowNumber + ")").each(function () {
                $(this).attr("contenteditable", "true");
            });
            $("#mofiz tfoot tr:nth-child(1) th").each(function () {
                $(this).attr("contenteditable", "true");
                //$(this).css("background-color", "red")
            });
            //$("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").each(function () {
            //    $(this).attr("contenteditable", "true");
            //    //$(this).css("background-color", "red")
            //});
            
            //$("#mofiz tbody tr td:nth-child(n + 6)").each(function () {
            //    $(this).attr("contenteditable", "false");
            //});
            $("#mofiz  tr th:nth-child(n)").each(function () {
                $(this).attr("contenteditable", "true");
            });
            //$("#mofiz tfoot tr:nth-child(2) th,#mofiz tfoot tr:nth-child(3) th").each(function () {
            $("#mofiz tfoot tr:nth-child(2) th").each(function () {
                $(this).attr("contenteditable", "false");
                //$(this).css("background-color", "red")
            });
            $("#mofiz tbody tr td:nth-child(1),#mofiz tbody tr td:nth-child(2)").each(function () {
                $(this).attr("contenteditable", "false");
            });
            $("#mofiz  tr th:nth-child(1),#mofiz tr th:nth-child(2)").each(function () {
                $(this).attr("contenteditable", "false");
            });
            $("#mofiz tbody td").find(":input").each(function () {
                $(this).attr("disabled", false);
            });
            $("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").find(":input").each(function () {
                $(this).attr("disabled", false);
            });


            
        }
        function rearrangeSerial() {
            var serial = 1;
            angular.forEach($scope.ItemTableDataRow,
                function(aRow) {
                    for (var i = 0; i < aRow.length; i++) {
                        if (i === 2) {
                            aRow[2] = serial++;
                        }
                    }
                });
        }
        function getItemDetailModifiedDataForUpdate(invoiceId) {
            $scope.ItemTableDataRow = [];
            $scope.ItemRow = [];

            $http({
                url: "/ExpInvoice/GetInvoiceDetailModifiedDataForUpdate?invoiceId=" + invoiceId,
                method: "GET",
                headers: { 'Content-Type': "application/json" }
            }).success(function (data) {
                $scope.itemDetailDataForUpdate = data;
                angular.forEach(data,
                    function (item, idx) {
                        $scope.ItemRow = Object.keys(item).map(e => item[e]);
                        $scope.ItemTableDataRow.push($scope.ItemRow);
                        $scope.ItemTableHeaders = Object.getOwnPropertyNames(item);
                    });
                $scope.ItemTableFooter = [];
                $scope.ItemTableFooterForCPT = [];
                $scope.ItemTableFooterForCPTTotal = [];
                for (var i = 0; i < $scope.ItemTableHeaders.length; i++) {
                    if (i == $scope.ItemTableHeaders.length - 3) {
                        $scope.ItemTableFooter.push(0);
                        $scope.ItemTableFooterForCPT.push("");
                        $scope.ItemTableFooterForCPTTotal.push($scope.QtySumForItem);
                    } else if (i == $scope.ItemTableHeaders.length - 1) {
                        $scope.ItemTableFooter.push(0);
                        $scope.ItemTableFooterForCPT.push(parseFloat($scope.TotalCPTCost).toFixed(2));
                        $scope.ItemTableFooterForCPTTotal.push(parseFloat($scope.totalAmountWithCPT).toFixed(2));
                    }
                    else if (i == 4) {
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

            });
        }

        function itemLoadDynamicTable(incomingData) {
            $scope.TrimmedTableData = [];
            var sl = 0;
            angular.forEach(incomingData,
                function (iData) {
                    $scope.TrimmedTableRow = {};

                    $scope.TrimmedTableRow.SalesOrderId = iData.SalesOrderId;
                    $scope.TrimmedTableRow.ItemId = iData.ItemId;

                    $scope.TrimmedTableRow.Sl = ++sl;
                    $scope.TrimmedTableRow.ItemName = iData.ItemName + '\n HS Code: ' + iData.HsCode;
                    $scope.TrimmedTableRow.Description = iData.DescriptionOne;
                    $scope.TrimmedTableRow.Qty = iData.Quantity;
                    $scope.TrimmedTableRow.UnitPrice = iData.UnitPrice;
                    $scope.TrimmedTableRow.Amount = iData.Amount;

                    $scope.TrimmedTableData.push($scope.TrimmedTableRow);
                });

            $scope.ItemTableHeaders = [];
            $scope.ItemTableDataRow = [];
            $scope.ItemTableFooter = [];
            $scope.ItemTableFooterForCPT = [];
            $scope.ItemTableFooterForCPTTotal = [];
            angular.forEach($scope.TrimmedTableData,
                function (item, idx) {
                    $scope.ItemRow = Object.keys(item).map(e => item[e]);
                    $scope.ItemTableDataRow.push($scope.ItemRow);
                    //$scope.ItemTableHeaders = Object.getOwnPropertyNames(item);
                    $scope.ItemTableHeaders =
                    [
                        "SalesOrderId", "ItemId", "SlNo", "Item Name", "Description Of Goods", "Qty/Rolls", "Unit Price", "Amount"
                    ];
                });

            for (var i = 0; i < $scope.ItemTableHeaders.length; i++) {
                if (i == $scope.ItemTableHeaders.length - 3) {
                    $scope.ItemTableFooter.push(0);
                    $scope.ItemTableFooterForCPT.push("");
                    $scope.ItemTableFooterForCPTTotal.push($scope.QtySumForItem);
                } else if (i == $scope.ItemTableHeaders.length - 1) {
                    $scope.ItemTableFooter.push(0);
                    $scope.ItemTableFooterForCPT.push(parseFloat($scope.TotalCPTCost).toFixed(2));
                    $scope.ItemTableFooterForCPTTotal.push(parseFloat($scope.totalAmountWithCPT).toFixed(2));
                }
                else if (i == $scope.ItemTableHeaders.length - 4) {
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

       

        $scope.tableSpanValueSet = function (parentIndex, index, item) {
            $scope.ItemTableDataRow[parentIndex][index] = item;
        };

        $scope.reloadBtn = function () {
            $('#txtFromDateForPI').val('');
            $('#txtToDateForPI').val('');
            $('#textInvoiceNoAndCompany').val('');
            $scope.FromDate = "";
            $scope.ToDate = "";
            $scope.SearchInvoiceAndCompanyName = null;
            GetInvoicePaged(1);
        }

        $scope.InvoiceSearch = function () {
            GetInvoicePaged(1);

        }

        function GetInvoicePaged(curPage) {

            if (curPage == null) curPage = 1;
            var startRecordNo = ($scope.PerPage * (curPage - 1)) + 1;
            var formDateChange = $("#txtFromDateForPI").val();
            if (formDateChange != undefined) {
                $scope.FromDate = formDateChange.split('/').reverse().join('-');
            }
            
            var toDateChange = $("#txtToDateForPI").val();
            if (toDateChange != undefined) {
                $scope.ToDate = toDateChange.split('/').reverse().join('-');
            }
            

            var SearchCriteria = "";

            if ($scope.SearchInvoiceAndCompanyName != undefined && $scope.SearchInvoiceAndCompanyName != "" && $scope.FromDate != "" && $scope.ToDate != "") {
                SearchCriteria = "([InvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "') and ([InvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyName + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyName + "%' OR [SalesOrderNos] LIKE '%" + $scope.SearchInvoiceAndCompanyName + "%')";
                //alert("Name, Date Success!!!!!");
            }
            else if ($scope.SearchInvoiceAndCompanyName !== undefined && $scope.SearchInvoiceAndCompanyName != null && $scope.SearchInvoiceAndCompanyName != "") {
                SearchCriteria = "[InvoiceNo] LIKE '%" + $scope.SearchInvoiceAndCompanyName + "%' OR [CompanyNameBilling] LIKE '%" + $scope.SearchInvoiceAndCompanyName + "%' OR [SalesOrderNos] LIKE '%" + $scope.SearchInvoiceAndCompanyName + "%'";
                //alert("Name Success!!!!!");
            }
            else if ($scope.FromDate != "" && $scope.ToDate != "") {
                SearchCriteria = "[InvoiceDate] between '" + $scope.FromDate + "' and '" + $scope.ToDate + "'";
                //alert("Date Success!!!!!");
            }


            //console.log(SearchCriteria);
            $http({
                url: encodeURI('/ExpInvoice/GetInvoicePaged?startRecordNo=' + startRecordNo + '&rowPerPage=' + $scope.PerPage + "&whereClause=" + SearchCriteria + '&rows=' + 0),
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                if (data != "") {
                    if (data.ListData.length > 0) {
                        angular.forEach(data.ListData, function (aSd) {
                            var res1 = aSd.InvoiceDate.substring(0, 5);
                            if (res1 == "/Date") {
                                var parsedDate1 = new Date(parseInt(aSd.InvoiceDate.substr(6)));
                                var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                                aSd.InvoiceDate = date1;
                            }
                        })

                    }
                    else {
                        alertify.log('Invoice  Not Found', 'error', '5000');
                    }
                }
                
                $scope.InvoiceListPaged = data.ListData;
                $scope.total_count = data.TotalRecord;
            });
        }

        $scope.getData = function (curPage) {

            // if ($scope.FromDate == "" || $scope.ToDate == "" ) {

            if ($scope.PerPage > 100) {
                $scope.PerPage = 100;
                $scope.currentPage = curPage;
                GetInvoicePaged($scope.currentPage);
                alertify.log('Maximum record  per page is 100', 'error', '5000');
            }
            else if ($scope.PerPage < 1) {
                $scope.PerPage = 1;
                $scope.currentPage = curPage;
                GetInvoicePaged($scope.currentPage);
                alertify.log('Minimum record  per page is 1', 'error', '5000');
            }
            else {
                $scope.currentPage = curPage;
                GetInvoicePaged($scope.currentPage);
            }
            //  }


        }

        $scope.AddPOReference = function () {
            $scope.POReference.DocType = "PI";
            $scope.POReference.DocumentId = 0;
            $scope.POReferencelist.push($scope.POReference);
            $scope.POReference = {};
        }
        $scope.removePOReference = function (aPOReference) {
            var ind = $scope.POReferencelist.indexOf(aPOReference);
            $scope.POReferencelist.splice(ind, 1);
            $scope.POReference = {};
        }


        $scope.EditItem = function () {
            if ($scope.ad_Item.TempItemName != null || $scope.ad_Item.TempItemName != undefined) {
                $scope.$broadcast('EditItem', $scope.ad_Item.TempItemName);
            } else {
                $scope.$broadcast('ResetForm');
            }

            $('#itemModal').modal('show');
        }

        $scope.EditCompany = function () {
            if ($scope.ddlImporter != null || $scope.ddlImporter != undefined) {
                $scope.ddlImporter.isUpdate = $scope.isUpdate;
                $scope.$broadcast('EditCompany', $scope.ddlImporter);
            } else {
                $scope.$broadcast('ResetForm');
            }

            $('#companyModal').modal('show');
        }

    });

app.directive('proformaInvoiceDirective', [function () {
    return {
        restrict: 'AE',
        scope: {
            //data: '='
        },
        controller: 'ProformaInvoiceController',

        link: function (scope, $scope, $rootScope, element, attrs) {
            scope.$on('updateItem', function (event, item, ItemSearchList) {
                $('#itemModal').modal('hide');
                $rootScope.ItemSearchList = ItemSearchList;
                setTimeout(function () {
                    $("#itemNameDisable").select2().val(item.ItemId).trigger("change");

                }, 0);
            });



            scope.$on('updateCompany', function (event, company, companyList) {
                $('#companyModal').modal('hide');
                $rootScope.companyList = companyList;
                if (company.isUpdate == 'update') {
                    $scope.ddlImporter = { CompanyId: company.CompanyId };
                } else {
                    setTimeout(function () {
                        $("#Importer").select2().val(company.CompanyId).trigger("change");
                        scope.GetSalesOrderByCompany(company);
                    }, 0);
                }
                
                //if (company.IsNew == true) {

                //    setTimeout(function () {
                //        $("#Importer").select2().val(company.CompanyId).trigger("change");
                //        scope.GetSalesOrderByCompany(company);
                //    }, 0);
                //} else {
                //    $scope.ddlCompany = { CompanyId: company.CompanyId };
                //    scope.GetSalesOrderByCompany(company);
                //}
                
                //scope.GetEmployeeByCompany(company);
            });

        },
    };
}]);