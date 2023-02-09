app.controller("PackingDocumentReportController", function ($scope, $cookieStore, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    //$scope.CommercialInvoiceId = parseInt(sessionStorage.getItem("CommercialInvoiceIdPD"));
    $scope.CommercialInvoiceId = $cookieStore.get("CommercialInvoiceId");
    Clear();

    function Clear() {
        $scope.NetWeight = '';
        $scope.GrossWeight = '';
        $scope.labelWeightList = [];
        $scope.SPItemList = [];
        $scope.productList = [];
        $scope.itemFlag = false;
        GetCIMasterByCIid();
        GetAllSPCase();
        GetCommercialInvoiceDetail();
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
    function GetCIMasterByCIid() {
        $http({
            url: '/ExpCommercialInvoice/GetCIMasterByInvoiceId?commercialInvoiceId=' + $scope.CommercialInvoiceId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.CommercialInvoiceMasterList = data;
            $scope.NetWeight = (parseFloat($scope.CommercialInvoiceMasterList[0].LabelNetWeight) + parseFloat($scope.CommercialInvoiceMasterList[0].RibonNetWeight)).toFixed(2) + ' kg';
            $scope.GrossWeight = (parseFloat($scope.CommercialInvoiceMasterList[0].LabelGrossWeight) + parseFloat($scope.CommercialInvoiceMasterList[0].RibonGrossWeight)).toFixed(2) + ' kg';

            //$scope.CommercialInvoiceMasterList[0].PiRefNo = $scope.CommercialInvoiceMasterList[0].PiRefNo.split(",");
            //$scope.CommercialInvoiceMasterList[0].PiRefDate = $scope.CommercialInvoiceMasterList[0].PiRefDate.split(",");
            //$("#exporterInfo").append($scope.CommercialInvoiceMasterList[0].ExporterInfo);
            //$("#exporterBankInfo").append($scope.CommercialInvoiceMasterList[0].ExporterBankInfo);
            //$scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo = $scope.CommercialInvoiceMasterList[0].CommercialInvoiceNo.replace("CI", "PL");
            
        });
    }
    function GetAllSPCase() {
        
        $http({
            url: "/Item/GetAllSPCase",
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.SPItemList = data;
            GetPackageCalCulation();
            
        });


    }
    function GetCommercialInvoiceDetail() {
        $http({
            url: "/ExpCommercialInvoice/GetCommercialInvoiceDetailByCommercialInvoiceId?CiId=" + $scope.CommercialInvoiceId,
            method: "GET",
            headers: { 'Content-Type': "application/json" }
        }).success(function (Productdata) {
            $scope.productList = Productdata;
            GetPackageCalCulation();
            
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
    function GetPackageCalCulation() {
        if ($scope.productList.length > 0 && $scope.SPItemList.length > 0) {
            $scope.productListForRibbon = [];
            $scope.productListForLabel = [];
            $scope.productListForExtraLabel = [];
            $scope.productListForExtraRibbon = [];
            $scope.TotalCartonForSPRibbon = 0;
            $scope.TotalCartonForSPLabel = 0;
            $scope.TotalQtySPLabel = 0;
            $scope.ExtraQtyForRibbon = 0;
            $scope.TotalQtySPRibbon = 0;

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

            //////////////////////////////Distinct
            $scope.margeProduct = [];
            $scope.margeProductWithFlag = [];
            $scope.margeProductWithoutFlag = [];

            if ($scope.itemFlag == true) {
                $scope.margeProductWithFlag = $scope.productListWithFlag.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, DescriptionOne, DescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, IdenticalFlag, ItemDescription, ItemDescriptionTwo, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                    var temp = r.find(o => o.IdenticalFlag === IdenticalFlag);
                    if (!temp) {
                        r.push({ Amount, ContainerId, CartonSize, CartonWeight, DescriptionOne, DescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, IdenticalFlag, ItemDescription, ItemDescriptionTwo, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                    } else {
                        temp.Quantity += Quantity;
                    }
                    return r;
                }, []);

                $scope.margeProductWithoutFlag = $scope.productListWithoutFlag.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, DescriptionOne, DescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, IdenticalFlag, ItemDescription, ItemDescriptionTwo, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                    var temp = r.find(o => o.ItemId === ItemId);
                    if (!temp) {
                        r.push({ Amount, ContainerId, CartonSize, CartonWeight, DescriptionOne, DescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, IdenticalFlag, ItemDescription, ItemDescriptionTwo, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
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
                $scope.margeProduct = $scope.productList.reduce((r, { Amount, ContainerId, CartonSize, CartonWeight, DescriptionOne, DescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, IdenticalFlag, ItemDescription, ItemDescriptionTwo, ItemName, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice }) => {
                    var temp = r.find(o => o.ItemId === ItemId);
                    if (!temp) {
                        r.push({ Amount, ContainerId, CartonSize, CartonWeight, DescriptionOne, DescriptionTwo, HsCode, InvoiceDetailId, InvoiceId, ItemId, IdenticalFlag, ItemName, ItemDescription, ItemDescriptionTwo, OrderUnitId, PackageId, RollPerCarton, RollWeight, Quantity, SalesOrderId, SubCategoryId, SubCategoryName, UnitId, PcPerRoll, UnitPrice });
                    } else {
                        temp.Quantity += Quantity;
                    }
                    return r;
                }, []);
            }
            //////////////// separated Combind Item
            angular.forEach($scope.SPItemList,
                function (adata) {
                    var tempSPRibbon = $scope.margeProduct.filter(product => product.ItemId === adata.RibbonId);
                    $scope.productListForRibbon = $scope.productListForRibbon.concat(tempSPRibbon).unique();
                    var tempSPLabel = $scope.margeProduct.filter(product => product.ItemId === adata.LabelId);
                    $scope.productListForLabel = $scope.productListForLabel.concat(tempSPLabel).unique();

                    tempSPRibbon = [];
                    tempSPLabel = [];
                })

            /////////////////////Label + Ribbon = OneList
            $scope.CombindItem = angular.copy($scope.productListForLabel);

            for (var i = 0; i < $scope.productListForRibbon.length; i++) {
                $scope.CombindItem.push($scope.productListForRibbon[i]);
            }

            ////////////////////////////////////// Remove Combind Item
            var listToDelete = [];
            for (var i = 0; i < $scope.CombindItem.length; i++) {
                listToDelete.push($scope.CombindItem[i].ItemId);
            }

            $scope.ExtraItem = $scope.margeProduct.filter(el => (listToDelete.indexOf(el.ItemId) == -1));
            ////////////////////////////////////////
            if ($scope.productListForRibbon.length > 0 && $scope.productListForLabel.length > 0) {
                /////////////////////////////////////// Calculetion Combind
                angular.forEach($scope.productListForLabel,
                    function (adata) {
                        adata.labelWeight = 0;
                        adata.carton = 0;
                        adata.cartonWeight = 0;
                        /////////////////////////// Calculetion Combind Label previous way
                        adata.labelWeight = adata.Quantity * adata.RollWeight;
                        adata.labelWeight = adata.labelWeight.toFixed(2);

                        //if (adata.RollPerCarton != 0) {
                        //    adata.carton = adata.Quantity / adata.RollPerCarton;
                        //    adata.carton = adata.carton.toFixed(2);
                        //    adata.carton = Number(Math.ceil(adata.carton));
                        //} else {
                        //    if (adata.PcPerRoll != 0) {
                        //        adata.carton = adata.Quantity / adata.PcPerRoll;
                        //        adata.carton = adata.carton.toFixed(2);
                        //        adata.carton = Number(Math.ceil(adata.carton));
                        //    } else {
                        //        adata.carton = 0;
                        //    }
                        //}
                        adata.carton = adata.Quantity / adata.RollPerCarton;
                        adata.carton = adata.carton.toFixed(2);
                        adata.carton = Number(Math.ceil(adata.carton));

                        adata.cartonWeight = adata.carton * adata.CartonWeight;
                        adata.cartonWeight = adata.cartonWeight.toFixed(2);
                        //$scope.TotalQtySPLabel += adata.Quantity;
                        $scope.TotalCartonForSPLabel += adata.carton;
                    });
                //////////////////////////////
                angular.forEach($scope.productListForRibbon,
                    function (adata) {
                        adata.labelWeight = 0;
                        adata.carton = 0;
                        adata.cartonWeight = 0;
                        //////////////////////////// Calculetion Combind Ribbon New way

                        $scope.TotalQtySPRibbon += adata.Quantity;
                        if ($scope.TotalQtySPRibbon >= $scope.TotalCartonForSPLabel) {
                            $scope.ExtraQtyForRibbon = Number($scope.TotalQtySPRibbon) - Number($scope.TotalCartonForSPLabel);
                        }

                        //if ($scope.ExtraQtyForRibbon == 0) {
                        //    adata.carton = $scope.ExtraQtyForRibbon / adata.RollPerCarton;
                        //} else {
                        //    adata.carton = $scope.ExtraQtyForRibbon / adata.RollPerCarton;
                        //}
                        adata.carton = $scope.ExtraQtyForRibbon / adata.RollPerCarton;

                        adata.carton = adata.carton.toFixed(2);
                        adata.carton = Number(Math.ceil(adata.carton));
                        adata.ribbonWeight = adata.Quantity * adata.RollWeight;
                        adata.ribbonWeight = adata.ribbonWeight.toFixed(2);
                        //if (adata.RollPerCarton != 0) {
                        //    adata.carton = adata.Quantity / adata.RollPerCarton;
                        //    adata.carton = adata.carton.toFixed(2);
                        //    adata.carton = Number(Math.ceil(adata.carton));
                        //} else {
                        //    if (adata.PcPerRoll != 0) {
                        //        adata.carton = adata.Quantity / adata.PcPerRoll;
                        //        adata.carton = adata.carton.toFixed(2);
                        //        adata.carton = Number(Math.ceil(adata.carton));
                        //    } else {
                        //        adata.carton = 0;
                        //    }
                        //}
                        

                        adata.cartonWeight = adata.carton * adata.CartonWeight;
                        adata.cartonWeight = adata.cartonWeight.toFixed(2);
                        $scope.TotalCartonForSPRibbon += adata.carton;

                    });
            } else {
                angular.forEach($scope.productListForLabel, function (aLabel) {
                    $scope.ExtraItem.push(aLabel);
                });

                angular.forEach($scope.productListForRibbon, function (aRibbon) {
                    $scope.ExtraItem.push(aRibbon);
                });
                $scope.productListForLabel = [];
                $scope.productListForRibbon = [];
            }

            if ($scope.ExtraItem.length > 0) {
                $scope.productListForExtraRibbon = $scope.ExtraItem.filter(product => product.SubCategoryId === 4 || product.SubCategoryId == 14);
                $scope.productListForExtraLabel = $scope.ExtraItem.filter(product => product.SubCategoryId === 1 || product.SubCategoryId === 3);

                angular.forEach($scope.productListForExtraLabel, function (aLabel) {
                    aLabel.labelWeight = 0;
                    aLabel.carton = 0;
                    aLabel.cartonWeight = 0;

                    aLabel.labelWeight = aLabel.Quantity * aLabel.RollWeight;
                    aLabel.labelWeight = Number(aLabel.labelWeight.toFixed(2));

                    //if (aLabel.RollPerCarton != 0) {
                    //    aLabel.carton = aLabel.Quantity / aLabel.RollPerCarton;
                    //    aLabel.carton = aLabel.carton.toFixed(2);
                    //    aLabel.carton = Number(Math.ceil(aLabel.carton));
                    //} else {
                    //    if (aLabel.PcPerRoll != 0) {
                    //        aLabel.carton = aLabel.Quantity / aLabel.PcPerRoll;
                    //        aLabel.carton = aLabel.carton.toFixed(2);
                    //        aLabel.carton = Number(Math.ceil(aLabel.carton));
                    //    } else {
                    //        aLabel.carton = 0;
                    //    }
                    //}
                    aLabel.carton = aLabel.Quantity / aLabel.RollPerCarton;
                    aLabel.carton = aLabel.carton.toFixed(2);
                    aLabel.carton = Number(Math.ceil(aLabel.carton));

                    aLabel.cartonWeight = aLabel.carton * aLabel.CartonWeight;
                    aLabel.cartonWeight = Number(aLabel.cartonWeight.toFixed(2));
                });

                angular.forEach($scope.productListForExtraRibbon, function (aRibbon) {
                    aRibbon.labelWeight = 0;
                    aRibbon.carton = 0;
                    aRibbon.cartonWeight = 0;
                    
                    aRibbon.ribbonWeight = aRibbon.Quantity * aRibbon.RollWeight;
                    aRibbon.ribbonWeight = Number(aRibbon.ribbonWeight.toFixed(2));

                    //if (aRibbon.RollPerCarton != 0) {
                    //    aRibbon.carton = aRibbon.Quantity / aRibbon.RollPerCarton;
                    //    aRibbon.carton = aRibbon.carton.toFixed(2);
                    //    aRibbon.carton = Number(Math.ceil(aRibbon.carton));
                    //} else {
                    //    if (aRibbon.PcPerRoll != 0) {
                    //        aRibbon.carton = aRibbon.Quantity / aRibbon.PcPerRoll;
                    //        aRibbon.carton = aRibbon.carton.toFixed(2);
                    //        aRibbon.carton = Number(Math.ceil(aRibbon.carton));
                    //    } else {
                    //        aRibbon.carton = 0;
                    //    }
                    //}

                    aRibbon.carton = aRibbon.Quantity / aRibbon.RollPerCarton;
                    aRibbon.carton = aRibbon.carton.toFixed(2);
                    aRibbon.carton = Number(Math.ceil(aRibbon.carton));

                    aRibbon.cartonWeight = aRibbon.carton * aRibbon.CartonWeight;
                    aRibbon.cartonWeight = Number(aRibbon.cartonWeight.toFixed(2));
                });
            }
            $scope.productList = $scope.example;
        }

    }

    $scope.ShowPackInfo = function (checked) {
        $scope.showPackInfo = checked;
    }

});