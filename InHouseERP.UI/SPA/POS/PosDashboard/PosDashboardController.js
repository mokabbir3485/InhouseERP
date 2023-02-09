app.controller("PosDashboardController", function ($rootScope,$scope, $cookieStore, $cookies, $http, $filter, $window) {
    //$scope.LoginUser = $cookieStore.get('UserData');
	var login = sessionStorage.getItem("UserDataSession");
	if (login != null) {
		$scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
	}
	clear();

	function clear() {

		var UserData = sessionStorage.getItem("UserDataSession");
		if (UserData != null) {
			$scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
		}
		var PermissionData = sessionStorage.getItem("PermissionDataSession");
		if (PermissionData != null) { var Permission = JSON.parse(sessionStorage.PermissionDataSession); }
		$scope.ScreenId = Permission.find(v => v.ScreenName == 'Pos Dashboard').ScreenId;
		

		$scope.DashboardGraphForSoIwoSiList = [];
		$scope.DashboardCompanyWiseTotalSoList = [];
		$scope.DashboardGraphSiAmountMonthwiseList = [];
		$scope.DashboardTotalSoIwoSiCountList = [];
		$scope.DashboardTotalExportImportCountList = [];

		LoadDateSystem('LoadDateCountLineSystem');
		LoadDateSystem('LoadDateAmountBarSystem');
		LoadDateSystem('LoadDateCountBarSystem');
		LoadDateSystem('LoadDateCountPieSystem');

		var FromDateArr = [];
		FromDateArr = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy').split(' ');
		var FromDate = FromDateArr[0] + ' ' + FromDateArr[1] + ' ' + (parseInt(FromDateArr[2]) - 1).toString();
		var ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

		GetAllDashboardGraphForSoIwoSi(FromDate, ToDate);
		GetAllDashboardGraphSiAmountMonthwise(FromDate, ToDate);
		GetAllDashboardCompanyWiseTotalSo(FromDate, ToDate);
		GetAllDashboardTotalSoIwoSiCount(FromDate, ToDate);
		GetAllDashboardTotalExportImportCount(FromDate, ToDate);
		

    }



	function GetAllDashboardGraphForSoIwoSi(FromDate, ToDate) {

        $http({
			url: "/PosDashboard/GetAllDashboardGraphForSoIwoSi?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
            $scope.DashboardGraphForSoIwoSiList = data;
			if ($scope.DashboardGraphForSoIwoSiList.length > 0) {
				$scope.monthsArray = $scope.DashboardGraphForSoIwoSiList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArray = $scope.DashboardGraphForSoIwoSiList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.SOcountArray = $scope.DashboardGraphForSoIwoSiList.map(function (obj) {
					return obj.TotalSO;
				});
				$scope.IWOcountArray = $scope.DashboardGraphForSoIwoSiList.map(function (obj) {
					return obj.TotalIWO;
				});
				$scope.SIcountArray = $scope.DashboardGraphForSoIwoSiList.map(function (obj) {
					return obj.TotalSi;
				});

				$scope.monthsYears = $scope.monthsArray.map((d, i) => `${d}-${$scope.YearsArray[i]}`);
				LineGraphForSoIwoSiCount();
			} else {
				$scope.monthsArray = [];
				$scope.YearsArray = [];
				$scope.SOcountArray = [];
				$scope.IWOcountArray = [];
				$scope.SIcountArray = [];
				$scope.monthsYears = [];
				LineGraphForSoIwoSiCount();
            }

			
        })
	}
	function GetAllDashboardCompanyWiseTotalSo(FromDate, ToDate) {

        $http({
			url: "/PosDashboard/GetAllDashboardCompanyWiseTotalSo?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
        }).success(function (data) {
			$scope.DashboardCompanyWiseTotalSoList = data;
			$("#CountBarCompanyWiseSOChart canvas").remove();
			if ($scope.DashboardCompanyWiseTotalSoList.length > 0) {
				$scope.CompanyNameArray = $scope.DashboardCompanyWiseTotalSoList.map(function (obj) {
					return obj.CompanyName;
				});

				$scope.SOcountArrayCompanyWise = $scope.DashboardCompanyWiseTotalSoList.map(function (obj) {
					return obj.TotalSO;
				});
				BarGraphCompanyWiseTotalSo();
			} else {
				$scope.CompanyNameArray = [];
				$scope.SOcountArrayCompanyWise = [];
				BarGraphCompanyWiseTotalSo();
            }

			
        })
	}
	function GetAllDashboardGraphSiAmountMonthwise(FromDate, ToDate) {

        $http({
			url: "/PosDashboard/GetAllDashboardGraphSiAmountMonthwise?FromDate=" + FromDate + "&ToDate=" + ToDate,
            method: "Get",
            headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphSiAmountMonthwiseList = data;
			if ($scope.DashboardGraphSiAmountMonthwiseList.length > 0) {
				$scope.monthsArraySiAmount = $scope.DashboardGraphSiAmountMonthwiseList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArraySiAmount = $scope.DashboardGraphSiAmountMonthwiseList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.SiAmountArray = $scope.DashboardGraphSiAmountMonthwiseList.map(function (obj) {
					return obj.TotalSiAmount;
				});

				$scope.monthsYearsSiAmount = $scope.monthsArraySiAmount.map((d, i) => `${d}-${$scope.YearsArraySiAmount[i]}`);
				BarGraphSiAmountMonthwise();
			} else {
				$scope.monthsArraySiAmount = [];
				$scope.YearsArraySiAmount = [];
				$scope.SiAmountArray = [];
				$scope.monthsYearsSiAmount = [];
				BarGraphSiAmountMonthwise();
            }
			


			
        })
	}
	function GetAllDashboardTotalSoIwoSiCount(FromDate, ToDate) {

		$http({
			url: "/PosDashboard/GetAllDashboardTotalSoIwoSiCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardTotalSoIwoSiCountList = data;
			if ($scope.DashboardTotalSoIwoSiCountList.length > 0) {
				$scope.SoApprovePending = $scope.DashboardTotalSoIwoSiCountList[0].SoApprovePending;
				$scope.SoAmendmentReqPending = $scope.DashboardTotalSoIwoSiCountList[0].SoAmendmentReqPending;

				$scope.TotalSo = $scope.DashboardTotalSoIwoSiCountList[0].TotalSo;

				$scope.IwoApprovePending = $scope.DashboardTotalSoIwoSiCountList[0].IwoApprovePending;
				$scope.IwoAmendmentReqPending = $scope.DashboardTotalSoIwoSiCountList[0].IwoAmendmentReqPending;
				$scope.TotalIWO = $scope.DashboardTotalSoIwoSiCountList[0].TotalIWO;

				$scope.TotalSalesInvoice = $scope.DashboardTotalSoIwoSiCountList[0].TotalSalesInvoice;
				$scope.TotalCancelledSO = $scope.DashboardTotalSoIwoSiCountList[0].TotalCancelledSO;

			} else {
				$scope.SoApprovePending = 0;
				$scope.SoAmendmentReqPending = 0;
				$scope.TotalSo = 0;
				$scope.IwoApprovePending = 0;
				$scope.IwoAmendmentReqPending = 0;
				$scope.TotalIWO = 0;
            }


		})
	}
	function GetAllDashboardTotalExportImportCount(FromDate, ToDate) {

		$http({
			url: "/PosDashboard/GetAllDashboardTotalExportImportCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardTotalExportImportCountList = data;
			if ($scope.DashboardTotalExportImportCountList.length > 0) {

				$scope.TotalExportLocalSoArray = [];
				$scope.TotalLocalSo = $scope.DashboardTotalExportImportCountList[0].TotalLocalSo;
				$scope.TotalExportLocalSoArray.push($scope.TotalLocalSo);
				$scope.TotalExportSo = $scope.DashboardTotalExportImportCountList[0].TotalExportSo;
				$scope.TotalExportLocalSoArray.push($scope.TotalExportSo);
				PieGraphTotalExportImportCount();
			} else {
				$scope.TotalLocalSo = 0;
				$scope.TotalExportSo = 0;
				$scope.TotalExportLocalSoArray = [];
				PieGraphTotalExportImportCount();
            }


		})
	}
	function LineGraphForSoIwoSiCount() {
		var CountCanvas = document.getElementById("CountLineChart");

		Chart.defaults.global.defaultFontFamily = "Lato";
		Chart.defaults.global.defaultFontSize = 18;

		var dataSO = {
			label: "Sales Order",
			data: $scope.SOcountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#00a65a'

		};

		var dataIWO = {
			label: "Internal Work Order",
			data: $scope.IWOcountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#f39c12'

		};

		var dataSI = {
			label: "Sales Invoice",
			data: $scope.SIcountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#00c0ef'
		};

		var CountData = {

			labels: $scope.monthsYears,
			datasets: [dataSO, dataIWO, dataSI]
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
				text: 'Month Wise Sales Order, IWO, Sales Invoice',
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

	function BarGraphSiAmountMonthwise() {
		var ctx = document.getElementById("CountBarChart").getContext('2d');
		if (window.MyChartBarAmount != undefined) {
			window.MyChartBarAmount.destroy();
		}
		window.MyChartBarAmount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.monthsYearsSiAmount,
				datasets: [{
					label: 'Month VS Sales Invoice Amount',
					data: $scope.SiAmountArray,
					backgroundColor: '#00c0ef',
					//backgroundColor: [
					//	'rgba(255, 99, 132, 0.2)',
					//	'rgba(54, 162, 235, 0.2)',
					//	'rgba(255, 206, 86, 0.2)',
					//	'rgba(75, 192, 192, 0.2)',
					//	'rgba(153, 102, 255, 0.2)',
					//	'rgba(255, 159, 64, 0.2)'
					//],
					borderColor: '#d9534f',
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
							//stepSize: 500000,
							beginAtZero: true,
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
					text: 'Month Wise Invoice Amount',
					position: 'left'
				}
				
			}
		});
	}
	function BarGraphCompanyWiseTotalSo() {
		var ctx = document.getElementById("CountBarCompanyWiseSOChart").getContext('2d');
		if (window.MyChartBarCount != undefined) {
			window.MyChartBarCount.destroy();
		}
		window.MyChartBarCount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.CompanyNameArray,
				datasets: [{
					label: 'Company VS Sales Order',
					data: $scope.SOcountArrayCompanyWise,
					backgroundColor: '#00a65a',
					borderColor: '#d9534f',
					borderWidth: 2
				}]
			},
			options: {
				title: {
					display: true,
					text: 'Company Wise Total Sales Order',
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
						//gridLines: {
						//	display: false,
						//	tickMarkLength: 10
						//},
					}]
				},
				
			}
		});
	}
	
	function PieGraphTotalExportImportCount() {
		var ctx = document.getElementById("CountPieChart").getContext('2d');
		if (window.MyChartPieCount != undefined) {
			window.MyChartPieCount.destroy();
		}
		window.MyChartPieCount = new Chart(ctx, {
			type: 'pie',
			data: {
				datasets: [{
					data: $scope.TotalExportLocalSoArray,
					backgroundColor: [
						'#00c0ef',
						//'rgba(255, 206, 86, 0.2)',
						'#f39c12',
						
						//'rgba(75, 192, 192, 0.2)',
						//'rgba(153, 102, 255, 0.2)',
						//'rgba(255, 159, 64, 0.2)'
					],
				}],

				// These labels appear in the legend and in the tooltips when hovering different arcs
				labels: [
					'Local Sales Order',
					'Export Sales Order'
				]
	
			},
			options: {
				title: {
					display: true,
					text: 'Local Export Order Ratio',
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
			GetAllDashboardGraphForSoIwoSi(FromDate, ToDate);
		} else if (id == 'LoadDateAmountBar') {
			GetAllDashboardGraphSiAmountMonthwise(FromDate, ToDate);
		} else if (id == 'LoadDateCountBar') {
			GetAllDashboardCompanyWiseTotalSo(FromDate, ToDate);
		} else if (id == 'LoadDateCountPie') {
			GetAllDashboardTotalExportImportCount(FromDate, ToDate);
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
