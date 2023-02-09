app.controller("ProformaInvoiceReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.InvoiceId = parseInt(sessionStorage.getItem("InvoiceId"));
    $scope.InvoiceId = $cookieStore.get("InvoiceId");
    Clear();
    $scope.TableHtmlDataList = [];
    //GetHTMLTableForReport();
    function Clear() {
        //$scope.ReportName = 'Proforma Invoice';
        $scope.NetWeight = 0;
        $scope.GrossWeight = 0;
        $scope.InvoiceMasterList = [];
        $scope.TableHtmlData = {};
        GetInvoiceMasterByInvoiceId();
        $scope.PONoList = [];
        $scope.PODateList = [];
        //$scope.ddlDot = {};
        //$scope.ddlDot.Dot = 2;
        //$scope.DotList = [{ Dot: 0 }, { Dot: 1 }, { Dot: 2 }, { Dot: 3 }, { Dot: 4 }, { Dot: 5 }];
        GetPOReference();
        GetDateTimeFormat();
    }
    function GetDateTimeFormat() {
        function formatDate(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
        }
        var currentDatetime = new Date();
        $scope.currentDatetimeFormated = formatDate(currentDatetime);
    }
    $scope.GetHTMLTableForReport = function () {
        GetHTMLTableForReport();
    }
    function GetHTMLTableForReport() {
        $http({
            url: '/ExpCommercialInvoice/GetHTMLTableForReport?DocumentId=' + $scope.InvoiceId + '&DocType=PI',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.TableHtmlDataList = data;
            if ($scope.TableHtmlDataList.length > 0) {
                $("#HtmlData").html($scope.TableHtmlDataList[0].HtmlData);
                $scope.isAllToolBtn = true;
                $('.alertify-logs').show();
                alertify.log('Loading Saved Report!!!', 'success', '5000');
            } else {
                $scope.NewReportLoad();
            }
            
        });
    }
    $scope.NewReportLoad = function () {
        //$route.reload();
        //Clear();
        GetTableHtmlForPi();
        $scope.isAllToolBtn = false;
        $scope.qtyAmountChecked = false;
        $scope.dollarChecked = false;
    }
    $scope.saveHtml = function () {
        $('.hideButton').hide();
        $('#result').hide();
        if ($scope.TableHtmlDataList.length > 0) {
            $scope.TableHtmlData.Id = $scope.TableHtmlDataList[0].Id;
        } else {
            $scope.TableHtmlData.Id = 0;
        }

        $scope.TableHtmlData.DocumentId = $scope.InvoiceId
        $scope.TableHtmlData.HtmlData = String($("#mofiz")[0].outerHTML);
        console.log('Full Report: ', $scope.TableHtmlData.HtmlData);
        $scope.TableHtmlData.DocType = 'PI';
        var parms = JSON.stringify({ tableHtmlData: $scope.TableHtmlData });
        $http.post('/ExpCommercialInvoice/PostHTMLTableForReport', parms).success(function (data) {
            if (data > 0) {
                $('.alertify-logs').show();
                alertify.log('Proforma Invoice Report Save Successfully!', 'success', '5000');
                $scope.TableHtmlData = {};
            } else {
                $('.alertify-logs').show();
                alertify.log('Server Errors!', 'error', '5000');
            }
            $('.hideButton').show();
            $('#result').show();
        }).error(function (data) {
            $('.alertify-logs').show();
            alertify.log('Server Errors!', 'error', '5000');
            $('.hideButton').hide();
            $('#result').show();
        });
    }
    function GetPOReference() {
        $http({
            url: '/ExpCommercialInvoice/GetPOReference?DocType=PI' + "&DocumentId=" + $scope.InvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            if (data.length) {


                $scope.POReferencelist = [];
                angular.forEach(data, function (aPODetail) {
                    var res2 = aPODetail.PODate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aPODetail.PODate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'dd.MM.yyyy')).toString();
                        aPODetail.PODate = date1;
                    }
                    $scope.PONoList.push(aPODetail.PONo);
                    $scope.PODateList.push(aPODetail.PODate);
                    $scope.POReferencelist.push(aPODetail);
                })

            }
            
        });
    }
    $scope.GetTableHtmlForPi = function () {
        GetTableHtmlForPi();
    }

    function GetTableHtmlForPi() {
        $("#mofiz").remove();
        $("ol").remove();

        var SubTable = $scope.InvoiceMasterList[0].HtmlTable.split('<thead>');
        var margeSubTable = '<table id="mofiz" border="1" class="JCLRFlex" style="width: 100% !important; font-size: .9em; font-family: Times New Roman, Times, serif; color:#000000; text-align:center; margin:0; padding:0;"> <thead>' + SubTable[1];

        var removeTfoot1 = margeSubTable.split('<tfoot>');
        var removeTfoot2 = removeTfoot1[1].split('</tfoot>');
        var tfootPart = removeTfoot2[0];
        var splitWithTbody = margeSubTable.split('</tbody>');
        //var tfootIntoTbody = splitWithTbody[0] + tfootPart + '</tbody>' + removeTfoot2[1];
        if ($scope.InvoiceMasterList[0].IsCPT) {
            var tfootIntoTbody = splitWithTbody[0] + '</tbody>' + '<tfoot class="tablesorter-no-sort">' + tfootPart + '</tfoot>' + removeTfoot2[1];
        } else {
            var tfootIntoTbody = splitWithTbody[0] + tfootPart + '</tbody>' + removeTfoot2[1];
        }
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function replaceAll(str, term, replacement) {
            return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
        }

        $("#HtmlData").html(tfootIntoTbody);
        console.log(tfootIntoTbody)
        $('#mofiz thead tr th:eq(0)').html("Sl No");
        $("#htmlTermsAndCondition").html($scope.InvoiceMasterList[0].TermsAndCondition);
        $('#mofiz tbody tr td').each(function () {
            var preStyle = $(this).attr("style");
            if (preStyle != undefined) {
                var pos = preStyle.indexOf("display: none;");
                var finalStyle;
                if (pos == -1) {
                    $(this).attr("contenteditable", false);
                    finalStyle = 'text-align: center; padding: 0 !important; margin: 0 !important;';
                }
                else {
                    $(this).remove();
                }

            }
            $(this).css("cssText", finalStyle);
        });

        $('#mofiz tbody tr').each((indextr, tr) => {
            $(tr).children('td').each((indextd, td) => {
                if (indextd > $('#mofiz thead tr th').length - 3) {
                    var tdvalue = parseFloat(td.innerText);
                    td.innerText = (tdvalue).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    //td.innerText = (tdvalue);
                }
            });
        });

        $('#mofiz tbody tr').each((indextr, tr) => {
            $(tr).children('td').each((indextd, td) => {
                if (indextd > $('#mofiz thead tr th').length - 4 && indextd <= $('#mofiz thead tr th').length - 3) {
                    var tdvalue = parseFloat(td.innerText);
                    td.innerText = (tdvalue).toLocaleString('en');
                    //td.innerText = (tdvalue);
                }
            });
        });

        $('#mofiz tbody tr').each((indextr, tr) => {
            $(tr).children('td').each((indextd, td) => {
                if (indextd < $('#mofiz thead tr th').length) {
                    $(td).find('br').remove();
                }
            });
        });

        var descriptionIndex;
        $('#mofiz thead tr').each((tndextr, tr) => {
            $(tr).children('th').each((indexth, th) => {
                if (th.innerHTML == 'Description Of Goods') {
                    descriptionIndex = indexth;
                }
            });
        });
        $('#mofiz tbody tr').each((indextr, tr) => {
            $(tr).children('td').each((indextd, td) => {
                if (indextd == descriptionIndex) {
                    var preStyles = $(td).attr("style");
                    var pos = preStyles.indexOf("text-align: center;");
                    var finalStyles
                    if (pos != -1) {
                        preStyles = replaceAll(preStyles, 'text-align: center;', 'text-align: left !important;');
                        preStyles = replaceAll(preStyles, 'padding: 0px !important;', 'padding-top: 0px !important; padding-bottom: 0px !important; padding-right: 0px !important; padding-left: 5px !important;');
                        finalStyles = preStyles;

                    }
                    else {
                        preStyles = replaceAll(preStyles, 'padding: 0px !important;', 'padding-top: 0px !important; padding-bottom: 0px !important; padding-right: 0px !important; padding-left: 5px !important;');
                        finalStyles = preStyles + ' text-align: left !important;';
                    }


                    $(td).css("cssText", finalStyles);
                }
            });
        });
        //if ($scope.InvoiceMasterList[0].IsCPT) {
        //    for (var i = 1; i <= 3; i++) {
        //        if (i == 1 || i == 3) {
        //            var remainderQty = 0;
        //            var jqueryFun = $('#mofiz tfoot tr').eq($('#mofiz tfoot tr').length - i).find('td').eq($('#mofiz thead tr th').length - 3);
        //            var itemQuantity = jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tfoot tr').length - i].children[$('#mofiz thead tr th').length - 3].innerHTML;
        //            var parseItemQuantity = parseInt(itemQuantity);
        //            itemQuantity = Number(itemQuantity);
        //            remainderQty = itemQuantity - parseItemQuantity;

        //            if (remainderQty > 0) {
        //                jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tfoot tr').length - i].children[$('#mofiz thead tr th').length - 3].innerHTML = parseFloat(itemQuantity).toLocaleString('en');
        //            }
        //            else {
        //                jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tfoot tr').length - i].children[$('#mofiz thead tr th').length - 3].innerHTML = parseFloat(parseItemQuantity).toLocaleString('en');
        //            }
        //        }
        //        var unitPrice = jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tfoot tr').length - i].children[$('#mofiz thead tr th').length - 1].innerHTML;
        //        var parseInitPrice = parseInt(unitPrice);
        //        remainderUnitPrice = unitPrice - parseInitPrice;
        //        jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tfoot tr').length - i].children[$('#mofiz thead tr th').length - 1].innerHTML = parseFloat(unitPrice).toLocaleString('en', { minimumFractionDigits: $scope.ddlDot.Dot });


        //    }
        //} else {
        //    var remainderQty = 0;
        //    var jqueryFun = $('#mofiz tbody tr').eq($('#mofiz tbody tr').length - 1).find('td').eq($('#mofiz thead tr th').length - 3);
        //    var itemQuantity = jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tbody tr').length - 1].children[$('#mofiz thead tr th').length - 3].innerHTML;
        //    var parseItemQuantity = parseInt(itemQuantity);
        //    itemQuantity = Number(itemQuantity);
        //    remainderQty = itemQuantity - parseItemQuantity;

        //    if (remainderQty > 0) {
        //        jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tbody tr').length - 1].children[$('#mofiz thead tr th').length - 3].innerHTML = parseFloat(itemQuantity).toLocaleString('en');
        //    }
        //    else {
        //        jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tbody tr').length - 1].children[$('#mofiz thead tr th').length - 3].innerHTML = parseFloat(parseItemQuantity).toLocaleString('en');
        //    }


        //    var unitPrice = jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tbody tr').length - 1].children[$('#mofiz thead tr th').length - 1].innerHTML;
        //    var parseInitPrice = parseInt(unitPrice);
        //    remainderUnitPrice = unitPrice - parseInitPrice;

        //    jqueryFun.prevObject.prevObject.prevObject[$('#mofiz tbody tr').length - 1].children[$('#mofiz thead tr th').length - 1].innerHTML = parseFloat(unitPrice).toLocaleString('en', { minimumFractionDigits: $scope.ddlDot.Dot });
        //}
        
        
        $('#mofiz tbody').find("span").each(function () {
            $(this).css("white-space", "pre-line");
        });

        $("#mofiz tbody tr").each(function () {
            var firstChild = $(this).children(':first');
            firstChild.text('');
        });

        $('#mofiz thead tr th').each(function () {
            $(this).attr("contenteditable", false);
        });

        
    }

    function GetInvoiceMasterByInvoiceId() {
        //$("#mofiz").remove();
        //$("ol").remove();
        $http({
            url: '/ExpInvoice/GetInvoiceMasterByInvoiceId?invoiceId=' + $scope.InvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.InvoiceMasterList = data;
            $("#htmlTermsAndCondition").html($scope.InvoiceMasterList[0].TermsAndCondition);
            GetHTMLTableForReport();
            if ($scope.InvoiceMasterList[0].PaymentProcessTypeId == 1) {
                document.title = 'Proforma Invoice Of ' + $scope.InvoiceMasterList[0].CompanyNameBilling + ' - ' + $scope.InvoiceMasterList[0].InvoiceNo.replaceAll("/", "-");
            } else {
                document.title = 'Sales Contract Of ' + $scope.InvoiceMasterList[0].CompanyNameBilling + ' - ' + $scope.InvoiceMasterList[0].InvoiceNo.replaceAll("/", "-");
            }
            

            $scope.NetWeight = (parseFloat($scope.InvoiceMasterList[0].LabelNetWeight) + parseFloat($scope.InvoiceMasterList[0].RibonNetWeight)).toFixed(2) + ' kg';
            $scope.GrossWeight = (parseFloat($scope.InvoiceMasterList[0].LabelGrossWeight) + parseFloat($scope.InvoiceMasterList[0].RibonGrossWeight)).toFixed(2) + ' kg';

            GetTableHtmlForPi();
            
        });
    }

    //Display Row Number
    $("#htmlTable").on("click",
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
                var row_num = parseInt($(e.target).parent().index()) + 1;

                $("#result").html("<h3>Row Number: " + row_num + "  ,  Column Number: " + column_num + "</h3>");
            }
            
        });

    $scope.ShowDollar = function (checked) {
        if (checked) {
            if ($scope.InvoiceMasterList[0].IsCPT) {
                $("#mofiz tfoot tr:nth-child(n) th:nth-last-child(1)").each(function () {
                    $(this).text(parseFloat($(this)[0].outerText).toLocaleString('en', { minimumFractionDigits: 2 }));
                });

                $("#mofiz tfoot tr:nth-child(n) th:nth-last-child(3)").each(function () {
                    if ($(this)[0].outerText != '') {
                        $(this).text(parseFloat($(this)[0].outerText).toLocaleString('en'));
                    }
                });
            } else {
                $("#mofiz tbody tr:last-child th:nth-last-child(1)").each(function () {
                    $(this).text(parseFloat($(this)[0].outerText).toLocaleString('en', { minimumFractionDigits: 2 }));
                });
                $("#mofiz tbody tr:nth-child(n) th:nth-last-child(3)").each(function () {
                    if ($(this)[0].outerText != '') {
                        $(this).text(parseFloat($(this)[0].outerText).toLocaleString('en'));
                    }
                });
            }
            var tElement = 'tbody';
            for (var i = 0; i < 2; i++) {
                $('#mofiz ' + tElement + ' tr th:nth-last-child(1)').each(function () {
                    $(this).removeClass("t-cell-center");
                    $(this).css("padding-right", "10px");
                    $(this).css('text-align', 'right');
                    $(this).append("<span style = 'float: left; text-indent :1em;'>$</span>");
                })
                $('#mofiz ' + tElement + ' tr td:nth-last-child(-n+2)').each(function () {
                    $(this).removeClass("t-cell-center");
                    $(this).css("padding-right", "10px");
                    $(this).css('text-align', 'right');
                    $(this).append("<span style = 'float: left; text-indent :1em;'>$</span>");
                })
                tElement = 'tfoot';
            }
        }
        else {
            
            $('#mofiz tbody tr th:nth-last-child(1)').each(function () {
                $("#mofiz tbody tr th:nth-last-child(1)").find("span").remove();
            })

            $('#mofiz tbody tr td:nth-last-child(-n+2)').each(function () {
                $("#mofiz tbody tr td:nth-last-child(-n+2)").find("span").remove();
            })

            $('#mofiz tfoot tr th:nth-last-child(1)').each(function () {
                $("#mofiz tfoot tr th:nth-last-child(1)").find("span").remove();
            })

            $('#mofiz tfoot tr td:nth-last-child(-n+2)').each(function () {
                $("#mofiz tfoot tr td:nth-last-child(-n+2)").find("span").remove();
            })

            if ($scope.InvoiceMasterList[0].IsCPT) {
                $("#mofiz tfoot tr:nth-child(n) th:nth-last-child(1)").each(function () {
                    $(this).text($(this)[0].outerText.replace(/,/g, ''));
                });
                $("#mofiz tfoot tr:nth-child(n) th:nth-last-child(3)").each(function () {
                    if ($(this)[0].outerText != '') {
                        $(this).text($(this)[0].outerText.replace(/,/g, ''));
                    }
                });
            } else {
                $("#mofiz tbody tr:last-child th:nth-last-child(1)").each(function () {
                    $(this).text($(this)[0].outerText.replace(/,/g, ''));
                });
                $("#mofiz tbody tr:nth-child(n) th:nth-last-child(3)").each(function () {
                    if ($(this)[0].outerText != '') {
                        $(this).text($(this)[0].outerText.replace(/,/g, ''));
                    }
                });
            }

        }
    }

    $scope.ShowTotalQuantityAndAmount = function (checked) {
        if (checked) {
            if ($scope.InvoiceMasterList[0].IsCPT) {
                //$("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").each(function () {
                //    $scope.AmountInWordsFont = convert($(this).html());
                //    $scope.IsCorrectAmountInWord = checked;
                //    $(this).attr("contenteditable", false);
                //});
                $('#mofiz tfoot tr:last-child').each(function (tdIndex, tr) {
                    tr.children[tr.children.length - 5].innerHTML = 'Total Quantity & Amount: ';
                })
                if ($scope.InvoiceMasterList[0].IsCPT) {
                    $('#mofiz tfoot tr:nth-last-child(-3n+3)').each(function (tdIndex, tr) {
                        tr.children[tr.children.length - 5].innerHTML = 'Sub Total: ';
                    })
                    $('#mofiz tfoot tr:nth-last-child(-2n+2)').each(function (tdIndex, tr) {
                        tr.children[2].innerHTML = '';
                    })
                    $('#mofiz tfoot tr:nth-last-child(-2n+2)').each(function (tdIndex, tr) {
                        tr.children[tr.children.length - 5].innerHTML = 'Freight Charge: ';
                    })
                    
                }


                $('#mofiz tfoot tr th:nth-last-child(5)').each(function () {
                    $(this).removeClass("t-cell-center");
                    $(this).css('text-align', 'right');
                    $(this).css("padding-right", "5px");
                    $(this).attr('colspan', 2);
                })
                $('#mofiz tfoot tr th:nth-last-child(4)').each(function () {
                    $(this).closest("th").remove();
                })
                $('#mofiz').dragtable('destroy');
            } else {
                //$("#mofiz tbody tr:last-child th:nth-last-child(1)").each(function () {
                //    $scope.AmountInWordsFont = convert($(this).html());
                //    $scope.IsCorrectAmountInWord = checked;
                //    $(this).attr("contenteditable", false);
                //});

                $('#mofiz tbody tr:last-child').each(function (tdIndex, tr) {
                    tr.children[tr.children.length - 5].innerHTML = 'Total Quantity & Amount: ';
                    //tr.children[tr.children.length - 4].attr('colspan', 3);


                })
                if ($scope.InvoiceMasterList[0].IsCPT) {
                    $('#mofiz tbody tr:nth-last-child(-3n+3)').each(function (tdIndex, tr) {
                        tr.children[tr.children.length - 5].innerHTML = 'Sub Total: ';
                    })
                    $('#mofiz tbody tr:nth-last-child(-2n+2)').each(function (tdIndex, tr) {
                        tr.children[tr.children.length - 5].innerHTML = 'Freight Charge: ';
                    })
                }


                $('#mofiz tbody tr th:nth-last-child(5)').each(function () {
                    //$(this).css('background', 'red');
                    $(this).removeClass("t-cell-center");
                    $(this).css('text-align', 'right');
                    $(this).css("padding-right", "5px");
                    //$(this).closest("th").remove();
                    $(this).attr('colspan', 2);
                })
                $('#mofiz tbody tr th:nth-last-child(4)').each(function () {
                    $(this).css('background', 'red');
                    $(this).closest("th").remove();
                    //$(this).attr('colspan', 2);
                })
                $('#mofiz').dragtable('destroy');
            }
            
        }
        else {
            
            if ($scope.InvoiceMasterList[0].IsCPT) {
                //$("#mofiz tfoot tr:nth-last-child(1) th:nth-last-child(1)").each(function () {
                //    $scope.IsCorrectAmountInWord = checked;
                //    $(this).attr("contenteditable", true);
                //});
                $('#mofiz tfoot tr:last-child').each(function (tdIndex, tr) {
                    tr.children[tr.children.length - 4].innerHTML = '';
                })

                $('#mofiz tfoot tr th:nth-last-child(4)').each(function () {
                    $(this).removeClass("t-cell-center");
                    $(this).css('text-align', 'right');
                    $(this).css("padding-right", "5px");
                    $(this).removeAttr("colspan");
                })
                $('#mofiz tfoot tr th:nth-last-child(4)').each(function () {
                    $(this).after('<th></th>');
                })
            } else {
                //$("#mofiz tbody tr:last-child th:nth-last-child(1)").each(function () {
                //    $scope.IsCorrectAmountInWord = checked;
                //    $(this).attr("contenteditable", true);
                //});
                $('#mofiz tbody tr:last-child').each(function (tdIndex, tr) {
                    tr.children[tr.children.length - 4].innerHTML = '';
                })

                $('#mofiz tbody tr th:nth-last-child(4)').each(function () {
                    $(this).removeClass("t-cell-center");
                    $(this).css('text-align', 'right');
                    $(this).css("padding-right", "5px");
                    $(this).removeAttr("colspan");
                })
                $('#mofiz tbody tr th:nth-last-child(4)').each(function () {
                    $(this).after('<th></th>');
                })
            }
            
        }
    }

    $scope.tableSortResize = function () {
        unMerged();
        $('#mofiz thead th').removeClass('sorter-false');
        $("#mofiz").trigger("update");
        $("#mofiz th:nth-child(n)").each(function () {
            $(this).removeAttr('id');
        });
        $("#mofiz th:nth-last-of-type(-n+3)").each(function () {
            $(this).attr("id", "disSort");
        });
        $("#mofiz th:nth-child(1)").each(function () {
            $(this).attr("id", "disSort");
        });
        $("#mofiz").tablesorter({
            widgets: ["resizable"],
            cssInfoBlock: "tablesorter-no-sort",
            widgetOptions: {
                // storage_useSessionStorage : true, deprecated in v2.28.8
                // use first letter (s)ession
                resizable_addLastColumn: true

            },
            headers: {
                '#disSort': {
                    sorter: false
                },
            }
        })
        //    .on("sortEnd", function () {
        //    $(this).find('tbody td:first-child').text(function (i) {
        //        return i + 1;
        //    });
        //});
        //$scope.isRemoved = true;

    }

    $scope.tableResize = function () {

        $("#mofiz th:nth-child(n)").each(function () {
            $(this).attr("id", "disSort");
        });
        $("#mofiz").tablesorter({
            widgets: ["resizable"],
            widgetOptions: {
                // storage_useSessionStorage : true, deprecated in v2.28.8
                // use first letter (s)ession
                resizable_addLastColumn: true

            },
            headers: {
                '#disSort': {
                    sorter: false
                },
            }
        })

    }


    $scope.ShowPackInfo = function (checked) {
        $scope.showPackInfo = checked;
        if (checked) {
            $('showPackInfo').show();
            
        } else {
            $('showPackInfo').hide();
        }
    }
    //new table data insert code



    $scope.mergeTableData = function () {
        $('#mofiz thead th').addClass('sorter-false');


        var dimension_col = null;

        dimension_col = 1;

        // first_instance holds the first instance of identical td
        var first_instance = null;
        var rowspan = 1;
        var columnCount = $("#mofiz tr:first th").length;

        //	for (dimension_col = 1; dimension_col <= columnCount; dimension_col++) {
        var i;
        var currnt_image_list = prompt("Please enter your Cloumn Number", ""); //'2,4,5';
        var substr = currnt_image_list.split(","); // array here
        for (i = 0; i < substr.length; ++i) {
            //alert(Number(substr[i]));

            dimension_col = Number(substr[i]);


            var first_instance = null;
            var rowspan = 1;
            $("#mofiz").find("tr:visible").each(function () {
                var dimension_td = $(this).find("td:nth-child(" + dimension_col + "):visible");
                if (first_instance == null) {
                    // must be the first row
                    first_instance = dimension_td;
                } else if (dimension_td.text().replace(/\s/g, '') == first_instance.text().replace(/\s/g, '') &&
                    dimension_td.text().replace(/\s/g, '') != "") {
                    // the current td is identical to the previous
                    // remove the current td
                    //var myBg = dimension_td.css('background-color');
                    dimension_td.hide();
                    ++rowspan;
                    // increment the rowspan attribute of the first instance
                    first_instance.attr("rowspan", rowspan);
                    first_instance.css("vertical-align", "middle");
                    first_instance.css("background-color", "#FFFFFF");
                } else {
                    // this cell is different from the last
                    first_instance = dimension_td;
                    rowspan = 1;
                }
            });

        }


    };


    $scope.enableDrag = function () {
        $("#mofiz th:not(:nth-last-of-type(-n+3))").each(function () {
            $(this).attr("id", "shuvo");
        });
        $("#mofiz th:nth-child(1)").each(function () {
            $(this).attr("id", "");
        });
        $('#mofiz tbody').sortable();
        var r = confirm("Please Sort Before Enable Drag-Drop");
        if (r == true) {
            $('#mofiz').dragtable({ dragaccept: '#shuvo' });
        }
        else {
            alertify.confirm().destroy();
        }
        //$('#mofiz').dragtable();
    }

    $scope.alignLeft = function () {
        $('#mofiz tbody tr td:nth-child(2)').each(function () {
            //$(this).css('background', 'red');
            $(this).removeClass("t-cell-center");
            $(this).css("padding-left", "5px");
            $(this).css("text-align", "left");
            $(this).attr("contenteditable", true);
        })
        $('#mofiz tbody tr td:nth-child(3)').each(function () {
            //$(this).css('background', 'red');
            $(this).removeClass("t-cell-center");
            $(this).css("padding-left", "5px");
            $(this).attr("contenteditable", true);
        })
        $("#mofiz tbody tr:nth-last-child(1) th").each(function () {
            $(this).attr("contenteditable", "true");
            //$(this).css("background-color", "red")
        });
        $("#mofiz tfoot tr:nth-last-child(1) th").each(function () {
            $(this).attr("contenteditable", "true");
            //$(this).css("background-color", "red")
        });
        //$('#mofiz tbody tr td:nth-last-child(4)').each(function () {
        //    $(this).css('background', 'red');
        //    $(this).attr("contenteditable", true);
        //})
        //$("#mofiz tbody tr td:nth-last-child(4)").keydown(function (e) {
        //    if (e.keyCode !== 13 && e.keyCode !== 17 && e.keyCode !== 90) {
        //        e.preventDefault();
        //    }
        //});
        //$("#mofiz tbody tr td:nth-child(2), td:nth-child(3)").keydown(function (e) {
        //    if (e.keyCode !== 13 && e.keyCode !== 17 && e.keyCode !== 90) {
        //        e.preventDefault();
        //    }
        //});
        $("#mofiz tbody tr td:nth-child(n)").keydown(function (e) {
            if (e.keyCode !== 13 && e.keyCode !== 17 && e.keyCode !== 90) {
                e.preventDefault();
            }
        });

        //$("#mofiz tbody tr td:nth-child(3)").keydown(function (e) {
        //    if (e.keyCode !== 13 && e.keyCode !== 17 && e.keyCode !== 90) {
        //        e.preventDefault();
        //    }
        //});

        $('#Signature').each(function () {
            $(this).attr("contenteditable", true);
        })

        $("#Signature").keydown(function (e) {
            if (e.keyCode !== 13 && e.keyCode !== 17 && e.keyCode !== 90 && e.keyCode !== 8) {
                e.preventDefault();
            }
        });

        //////New
        $("#mofiz tr th:nth-child(n)").each(function () {
            $(this).attr("contenteditable", "true");

        });

        $("#mofiz tbody tr td:nth-child(n)").each(function () {
            $(this).attr("contenteditable", "true");
        });

        $("#mofiz tbody tr td:nth-last-child(1), td:nth-last-child(2), td:nth-last-child(3), td:nth-child(1)").each(function () {
            $(this).attr("contenteditable", "false");
            //$(this).css("background-color", "red")
        });
    }

    //UNMERGE
    function unMerged() {

        $temp = $("#mofiz td[rowspan]");

        $temp.each(function () {
            $(this).removeAttr("rowspan");
        });

        $("#mofiz td:hidden").show();

        $("#mofiz td").css("background-color", "");
        $("#mofiz tr:not(:has(th))").css("background-color", "#FFFFFF");
        $("#mofiz tr:not(:has(th)):odd").css("background-color", "#FFFFFF");
        $("#mofiz thead tr").each(function () {
            $("th").show();
        });

        $("#mofiz tbody tr").each(function () {
            $("td").show();
        }
        );
        $scope.isRemoved = false;

    }

    $scope.unmergeTableData = function () {

        //$scope.isFinalized = false;
        unMerged();
    };

});