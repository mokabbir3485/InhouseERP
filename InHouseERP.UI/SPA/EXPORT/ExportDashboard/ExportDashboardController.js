app.controller("ExportDashboardController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
    var UserData = sessionStorage.getItem("UserDataSession");
    if (UserData != null) {
        $scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
    }
    load();

    //Functions
    function load() {
        $scope.DashboardGraphForPiCiMonthwiseCountList = [];
        $scope.DashboardCompanyWiseTotalCiList = [];
        $scope.DashboardTotalPiCiCountList = [];
        $scope.DashboardGraphCiAmountMonthwiseList = [];
        $scope.DashboardTotalSoIwoSiCountList = [];

        LoadDateSystem('LoadDateCountLineSystem');
        LoadDateSystem('LoadDateAmountLineSystem');
        LoadDateSystem('LoadDateCountBarSystem');
        LoadDateSystem('LoadDateCountPieSystem');

        var FromDateArr = [];
        FromDateArr = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy').split(' ');
        var FromDate = FromDateArr[0] + ' ' + FromDateArr[1] + ' ' + (parseInt(FromDateArr[2]) - 1).toString();
        var ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

        GetAllDashboardGraphCiAmountMonthwise(FromDate, ToDate);
        GetAllDashboardCompanyWiseTotalCi(FromDate, ToDate);
        GetAllDashboardTotalPiCiCount(FromDate, ToDate);
        GetAllDashboardPaymentProcessWiseTotalCi(FromDate, ToDate);
        GetAllDashboardGraphForPiCiMonthwiseCount(FromDate, ToDate);


        

    }



    function GetAllDashboardTotalPiCiCount(FromDate, ToDate) {

        $http({
            url: "/ExportDashboard/GetAllDashboardTotalPiCiCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.DashboardTotalPiCiCountList = data;
            if ($scope.DashboardTotalPiCiCountList.length > 0) {
                $scope.PiApprovePending = $scope.DashboardTotalPiCiCountList[0].PiApprovePending;
                $scope.PiAmendmentReqPending = $scope.DashboardTotalPiCiCountList[0].PiAmendmentReqPending;
                $scope.TotalPiForCard = $scope.DashboardTotalPiCiCountList[0].TotalPi;

                $scope.CiApprovePending = $scope.DashboardTotalPiCiCountList[0].CiApprovePending;
                $scope.CiAmendmentReqPending = $scope.DashboardTotalPiCiCountList[0].CiAmendmentReqPending;
                $scope.TotalCiForCard = $scope.DashboardTotalPiCiCountList[0].TotalCi;
            } else {
                $scope.PiApprovePending = 0;
                $scope.PiAmendmentReqPending = 0;
                $scope.TotalPiForCard = 0;
                $scope.CiApprovePending = 0;
                $scope.CiAmendmentReqPending = 0;
                $scope.TotalCiForCard = 0;

            }


        })
    }
    function GetAllDashboardCompanyWiseTotalCi(FromDate, ToDate) {

        $http({
            url: "/ExportDashboard/GetAllDashboardCompanyWiseTotalCi?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.DashboardCompanyWiseTotalCiList = data;
            if ($scope.DashboardCompanyWiseTotalCiList.length > 0) {
                $scope.CompanyNameBillingArray = $scope.DashboardCompanyWiseTotalCiList.map(function (obj) {
                    return obj.CompanyNameBilling;
                });

                $scope.CIcountArrayCompanyWise = $scope.DashboardCompanyWiseTotalCiList.map(function (obj) {
                    return obj.TotalCi;
                });

                BarGraphCompanyWiseTotalCi();
            } else {
                $scope.CompanyNameBillingArray = [];
                $scope.CIcountArrayCompanyWise = [];
                BarGraphCompanyWiseTotalCi();
            }


        })
    }
    function GetAllDashboardGraphCiAmountMonthwise(FromDate, ToDate) {

        $http({
            url: "/ExportDashboard/GetAllDashboardGraphCiAmountMonthwise?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.DashboardGraphCiAmountMonthwiseList = data;
            if ($scope.DashboardGraphCiAmountMonthwiseList.length > 0) {
                $scope.monthsArrayCiAmount = $scope.DashboardGraphCiAmountMonthwiseList.map(function (obj) {
                    return obj.Months;
                });
                $scope.YearsArrayCiAmount = $scope.DashboardGraphCiAmountMonthwiseList.map(function (obj) {
                    return obj.Years;
                }).map(String);
                $scope.CiAmountArray = $scope.DashboardGraphCiAmountMonthwiseList.map(function (obj) {
                    return obj.TotalCiAmount;
                });

                $scope.monthsYearsCiAmount = $scope.monthsArrayCiAmount.map((d, i) => `${d}-${$scope.YearsArrayCiAmount[i]}`);

                LineGraphCIAmountMonthwise();
            } else {
                $scope.monthsArrayCiAmount = [];
                $scope.YearsArrayCiAmount = [];
                $scope.CiAmountArray = [];
                $scope.monthsYearsCiAmount = [];
                LineGraphCIAmountMonthwise();
            }




        })
    }
    function GetAllDashboardPaymentProcessWiseTotalCi(FromDate, ToDate) {

        $http({
            url: "/ExportDashboard/GetAllDashboardPaymentProcessWiseTotalCi?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.DashboardPaymentProcessWiseTotalCiList = data;
            if ($scope.DashboardPaymentProcessWiseTotalCiList.length > 0) {

                $scope.PaymentProcessWiseTotalCiArray = $scope.DashboardPaymentProcessWiseTotalCiList.map(function (obj) {
                    return obj.TotalCi;
                });
                $scope.PaymentProcessArray = $scope.DashboardPaymentProcessWiseTotalCiList.map(function (obj) {
                    return obj.PaymentProcessType;
                });

                PieGraphDashboardPaymentProcessWiseTotalCi();
            } else {
                $scope.PaymentProcessWiseTotalCiArray = [];
                $scope.PaymentProcessArray = [];
                PieGraphDashboardPaymentProcessWiseTotalCi();
            }


        })
    }
    function GetAllDashboardGraphForPiCiMonthwiseCount(FromDate, ToDate) {

        $http({
            url: "/ExportDashboard/GetAllDashboardGraphForPiCiMonthwiseCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.DashboardGraphForPiCiMonthwiseCountList = data;
            if ($scope.DashboardGraphForPiCiMonthwiseCountList.length > 0) {
                $scope.monthsArrayForPiCi = $scope.DashboardGraphForPiCiMonthwiseCountList.map(function (obj) {
                    return obj.Months;
                });
                $scope.YearsArrayForPiCi = $scope.DashboardGraphForPiCiMonthwiseCountList.map(function (obj) {
                    return obj.Years;
                }).map(String);
                $scope.PIcountArray = $scope.DashboardGraphForPiCiMonthwiseCountList.map(function (obj) {
                    return obj.TotalPi;
                });
                $scope.CIcountArray = $scope.DashboardGraphForPiCiMonthwiseCountList.map(function (obj) {
                    return obj.TotalCi;
                });

                $scope.monthsYears = $scope.monthsArrayForPiCi.map((d, i) => `${d}-${$scope.YearsArrayForPiCi[i]}`)

                LineGraphForPICICount();
            } else {
                $scope.monthsArrayForPiCi = [];
                $scope.YearsArrayForPiCi = [];
                $scope.PIcountArray = [];
                $scope.CIcountArray = [];
                $scope.monthsYears = [];
                LineGraphForPICICount();
            }


        })
    }
    function LineGraphForPICICount() {
        var CountCanvas = document.getElementById("CountLineChartForPiCi");

        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 18;

        var dataPI = {
            label: "Proforma Invoice",
            data: $scope.PIcountArray,
            lineTension: 0.3,
            fill: true,
            borderColor: '#00a65a'

        };


        var dataCI = {
            label: "Commercial Invoice",
            data: $scope.CIcountArray,
            lineTension: 0.3,
            fill: true,
            borderColor: '#d9534f'
        };

        var CountData = {

            labels: $scope.monthsYears,
            datasets: [dataPI, dataCI]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    //boxWidth: 80,
                    fontColor: 'black'
                }
            },
            title: {
                display: true,
                text: 'Month Wise Proforma Invoice, Commercial Invoice',
                position: 'left'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        if (window.MyChartLineCount != undefined) {
            window.MyChartLineCount.destroy();
        }
        window.MyChartLineCount = new Chart(CountCanvas, {
            type: 'line',
            data: CountData,
            options: chartOptions
        });
    }

    function LineGraphCIAmountMonthwise() {
        var ctx = document.getElementById("AmountLineChart").getContext('2d');
        if (window.MyChartLineAmount != undefined) {
            window.MyChartLineAmount.destroy();
        }
        window.MyChartLineAmount = new Chart(ctx, {
            type: 'line',
            data: {
                labels: $scope.monthsYearsCiAmount,
                datasets: [{
                    label: 'Month VS Commercial Invoice Amount',
                    data: $scope.CiAmountArray,
                    backgroundColor: '#d9534f',
                    //backgroundColor: [
                    //	'rgba(255, 99, 132, 0.2)',
                    //	'rgba(54, 162, 235, 0.2)',
                    //	'rgba(255, 206, 86, 0.2)',
                    //	'rgba(75, 192, 192, 0.2)',
                    //	'rgba(153, 102, 255, 0.2)',
                    //	'rgba(255, 159, 64, 0.2)'
                    //],
                    borderColor: '#00a65a',
                    //borderColor: [
                    //	'rgba(255,99,132,1)',
                    //	'rgba(54, 162, 235, 1)',
                    //	'rgba(255, 206, 86, 1)',
                    //	'rgba(75, 192, 192, 1)',
                    //	'rgba(153, 102, 255, 1)',
                    //	'rgba(255, 159, 64, 1)'
                    //],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            //stepSize: 500000,
                            callback: function (value) {
                                var ranges = [
                                    { divider: 1e6, suffix: 'M' },
                                    { divider: 1e3, suffix: 'k' }
                                ];
                                function formatNumber(n) {
                                    for (var i = 0; i < ranges.length; i++) {
                                        if (n >= ranges[i].divider) {
                                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                        }
                                    }
                                    return n;
                                }
                                return '' + formatNumber(value);
                            }
                        }
                    }]
                },
                title: {
                    display: true,
                    text: 'Month Wise Commercial Invoice Amount',
                    position: 'left'
                }

            }
        });
    }
    function BarGraphCompanyWiseTotalCi() {
        var ctx = document.getElementById("CountBarCompanyWiseCIChart").getContext('2d');
        if (window.MyChartBarCount != undefined) {
            window.MyChartBarCount.destroy();
        }
        window.MyChartBarCount = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: $scope.CompanyNameBillingArray,
                datasets: [{
                    label: 'Company VS Commercial Invoice',
                    data: $scope.CIcountArrayCompanyWise,
                    backgroundColor: '#00a65a',
                    borderColor: '#d9534f',
                    borderWidth: 2
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Company Wise Total Commercial Invoice',
                    position: 'left'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            fontColor: 'black',
                            fontSize: 8,
                            padding: 0,
                            beginAtZero: true
                        },
                        barThickness: 30,
                        gridLines: {
                            display: false,
                            tickMarkLength: 10
                        },
                    }]
                },

            }
        });
    }

    function PieGraphDashboardPaymentProcessWiseTotalCi() {
        var ctx = document.getElementById("CountPieChartPaymentProcessWiseTotalCi").getContext('2d');
        if (window.MyChartPieCount != undefined) {
            window.MyChartPieCount.destroy();
        }
        window.MyChartPieCount = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: $scope.PaymentProcessWiseTotalCiArray,
                    backgroundColor: [
                        '#00c0ef',
                        '#00a65a',
                        '#f39c12',
                        '#d9534f',
                        '#d966ff',
                    ],
                }],
                labels: $scope.PaymentProcessArray

            },
            options: {
                title: {
                    display: true,
                    text: 'Payment Process Wise Total Commercial Invoice Ratio',
                    position: 'left'
                }

            }

        });
    }
    $scope.LoadDate = function (id) {
        LoadDate(id);
    }
    function LoadDate(id) {
        var RangeDate = $('#' + id).text();
        var DateArr = [];
        DateArr = RangeDate.split(' - ');
        var FromDate = DateArr[0];
        var ToDate = DateArr[1];
        if (id == 'LoadDateCountLine') {
            GetAllDashboardGraphForPiCiMonthwiseCount(FromDate, ToDate);
        } else if (id == 'LoadDateAmountLine') {
            GetAllDashboardGraphCiAmountMonthwise(FromDate, ToDate);
        } else if (id == 'LoadDateCountBar') {
            GetAllDashboardCompanyWiseTotalCi(FromDate, ToDate);
        } else if (id == 'LoadDateCountPie') {
            GetAllDashboardPaymentProcessWiseTotalCi(FromDate, ToDate);
        }
        

    }


    function LoadDateSystem(id) {
        //var start = moment().subtract(29, 'days');
        var start = moment().subtract(1, 'year');
        var end = moment();

        function cb(start, end) {
            $('#' + id + ' span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }

        $('#' + id).daterangepicker({
            "showDropdowns": true,
            /*"autoApply": true,*/
            startDate: start,
            endDate: end,
            ranges: {
                'Current': [moment().subtract(1, 'year'), moment()],
                'Last 6 Months': [moment().subtract(6, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                'This Year': [moment().startOf('year'), moment().endOf('year')],
                'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                'Last 2 Years': [moment().subtract(2, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                'Last 5 Years': [moment().subtract(5, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            }
        }, cb);

        cb(start, end);
        console.log("A new date selection was made: " + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }


});
