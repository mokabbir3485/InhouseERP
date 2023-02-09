
app.controller("InternalWorkOrderReportController", function ($rootScope,$scope, $cookieStore, $http, $filter) {
    //var UserData = sessionStorage.getItem("UserDataSession");
    //if (UserData != null) {
    //    $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    //}
    //$scope.IwoReport = parseInt(sessionStorage.getItem("IWOID"));
    $scope.IwoReport = $cookieStore.get('IWOID');

    Clear();

    function Clear() {
        $scope.url = "Art_769_b1.jpg"
        //Loading Js
    
        //End=======>>>

        $scope.InternalWorkOrderList = [];
        $scope.InternalWorkOrderReportList = [];
        GetByInternalWorkOrderId();
        $scope.isUrlNofound = true;
        $scope.IshardWareFlag = false;
        $scope.isHardwareFinishedCode = false;
        $scope.ArtWorkImageList = [];

    }

   

    function GetByInternalWorkOrderId() {

       

        $http({
            url: '/ExportReport/GetByInternalWorkOrderId?internalWorkOrderId=' + $scope.IwoReport,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.isUrlNofound = false;
            $scope.InternalWorkOrderList = data;
          

            PoNumberLoad($scope.InternalWorkOrderList[0].SalesOrderId);

            angular.forEach($scope.InternalWorkOrderList, function (aData) {
                $scope.ArtWorkImageList = [];
               
                //var imgObj = {};
                //imgObj.ImageName = concat;
                //$scope.ArtWorkImageList.push(imgObj);
             

                if (aData.IsHardware == 'true') {
                    $scope.IshardWareFlag = true;
                    $scope.isHardwareFinishedCode = true;
                    $scope.InternalWorkOrderReportList.push(aData);
                } else {
                    var artWork = aData.ArtWork;
                    var concat = '';
                    if (aData.ArtWork == undefined || aData.ArtWork == null) {
                        concat = '';
                    }
                    else {
                        var concat = artWork.split(',');
                    }
                    
                    aData.Image = concat;
                    $scope.IshardWareFlag = false;
                    $scope.isHardwareFinishedCode = false;
                    $scope.InternalWorkOrderReportList.push(aData);
                }

            })



            angular.forEach($scope.InternalWorkOrderList, function (aData) {
                if (aData.ArtWork == undefined) {
                    aData.ShowImg = true;
                } else {
                    aData.ShowImg = false
                }

                if ($scope.isUrlNofound == false) {
                    if (aData.ArtWork == null || aData.ArtWork == '') {
                        $scope.isUrlNofound = false;
                    } else {
                        $scope.isUrlNofound = true;
                    }
                }




            })


            if ($scope.InternalWorkOrderList.length > 0) {
                angular.forEach($scope.InternalWorkOrderList, function (aSd) {
                    var res1 = aSd.DeliveryDate.substring(0, 5);
                    if (res1 == "/Date") {
                        var parsedDate1 = new Date(parseInt(aSd.DeliveryDate.substr(6)));
                        var date1 = ($filter('date')(parsedDate1, 'MMM dd, yyyy')).toString();
                        aSd.DeliveryDate = date1;
                    }

                    

                    var res2 = aSd.InternalWorkOrderDate.substring(0, 5);
                    if (res2 == "/Date") {
                        var parsedDate2 = new Date(parseInt(aSd.InternalWorkOrderDate.substr(6)));
                        var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
                        aSd.InternalWorkOrderDate = date2;
                    }

                   

                    if (aSd.PODate != undefined || aSd.PODate != null) {
                        var res4 = aSd.PODate.substring(0, 5);
                        if (res4 == "/Date") {
                            var parsedDate4 = new Date(parseInt(aSd.PODate.substr(6)));
                            var date4 = ($filter('date')(parsedDate4, 'MMM dd, yyyy')).toString();
                            aSd.PODate = date4;
                        }


                    }
                    if (aSd.ApprovedDate != undefined || aSd.ApprovedDate != null) {
                    var res3 = aSd.ApprovedDate.substring(0, 5);
                    if (res3 == "/Date") {
                        var parsedDate3 = new Date(parseInt(aSd.ApprovedDate.substr(6)));
                        var date3 = ($filter('date')(parsedDate3, 'MMM dd, yyyy')).toString();
                        aSd.ApprovedDate = date3;
                    }
                    }
                })

            }
            //if ($scope.InternalWorkOrderList.length > 0) {
            //    angular.forEach($scope.InternalWorkOrderList, function (aSd) {
            //        var res2 = aSd.InternalWorkOrderDate.substring(0, 5);
            //        if (res2 == "/Date") {
            //            var parsedDate2 = new Date(parseInt(aSd.InternalWorkOrderDate.substr(6)));
            //            var date2 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
            //            aSd.InternalWorkOrderDate = date2;
            //        }
            //    })

            //}

            //if ($scope.InternalWorkOrderList.length > 0) {
            //    angular.forEach($scope.InternalWorkOrderList, function (aSd) {
            //        if (aSd.PODate != undefined || aSd.PODate != null) {
            //            var res3 = aSd.PODate.substring(0, 5);
            //            if (res3 == "/Date") {
            //                var parsedDate2 = new Date(parseInt(aSd.PODate.substr(6)));
            //                var date3 = ($filter('date')(parsedDate2, 'MMM dd, yyyy')).toString();
            //                aSd.PODate = date3;
            //            }
            //        }



            //    })

            //}
            
         

        });
    }


    function PoNumberLoad(SalesOrderId) {
        $http({
            //url: '/ExpInvoice/GetPOReference?DocType=' + iwo.SalesOrderId,
            url: '/ExpInvoice/GetPOReference?DocType=SO' + "&DocumentId=" + SalesOrderId,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            $scope.PurchaseOrderlist = data;

             $scope.POAttachmentList =[];
            angular.forEach($scope.PurchaseOrderlist, function (po) {

                var res1 = po.PODate.substring(0, 5);
                if (res1 == "/Date") {
                    var parsedDate1 = new Date(parseInt(po.PODate.substr(6)));
                    var date1 = ($filter('date')(parsedDate1, 'dd/MM/yyyy')).toString();
                    po.PODate = date1;
                }

                if (po.AttachmentName != "" || po.AttachmentName != undefined) {
                  //  $scope.POAttachmentList.push(po.AttachmentName);
                    po.POArrayList = po.AttachmentName.split(',');
                }

            })

           






        });
    }

});