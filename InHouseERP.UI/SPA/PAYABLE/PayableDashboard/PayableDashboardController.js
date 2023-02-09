app.controller("PayableDashboardController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
	var UserData = sessionStorage.getItem("UserDataSession");
	if (UserData != null) {
		$scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
	}

	clear();

	function clear() {
		$scope.DashboardGraphMonthOrYearwisePaidAmountList = [];
		$scope.DashboardTotalPaidVATAITAndAmountList = [];

		$scope.ChartTypeList = ["Month", "Year"];
		$scope.ChartType = "Month";
		$scope.TopValues = 10;

		LoadDateSystem('LoadDateAmountBarSystem');
		LoadDateSystem('LoadDateSupplierAmountBarSystem');
		LoadDateSystem('LoadDateAmountPieSystem');

		var FromDateArr = [];
		FromDateArr = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy').split(' ');
		var FromDate = FromDateArr[0] + ' ' + FromDateArr[1] + ' ' + (parseInt(FromDateArr[2]) - 1).toString();
		var ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

		GetAllDashboardGraph_MonthOrYearwisePaidAmount(FromDate, ToDate, $scope.ChartType);
		GetAllDashboardGraphSupplierWiseTotalPaidAmount(FromDate, ToDate, $scope.TopValues);
		GetAllDashboardTotalPaidVATAITAndAmount(FromDate, ToDate);
		GetAllDashboardGraphForLocalAndOverseasePaidAmount(FromDate, ToDate);


	}



	function GetAllDashboardGraphSupplierWiseTotalPaidAmount(FromDate, ToDate, TopValues) {

		$http({
			url: "/PayableDashboard/GetAllDashboardGraphSupplierWiseTotalPaidAmount?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TopValues=" + TopValues,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphSupplierWiseTotalPaidAmountList = data;
			if ($scope.DashboardGraphSupplierWiseTotalPaidAmountList.length > 0) {
				$scope.SupplierNameArray = $scope.DashboardGraphSupplierWiseTotalPaidAmountList.map(function (obj) {
					return obj.SupplierName;
				});

				$scope.AmountArraySupplierWise = $scope.DashboardGraphSupplierWiseTotalPaidAmountList.map(function (obj) {
					return obj.TotalPaidAmount;
				});
				BarGraphSupplierWiseTotalPaidAmount();
			} else {
				$scope.SupplierNameArray = [];
				$scope.AmountArraySupplierWise = [];
				BarGraphSupplierWiseTotalPaidAmount();
			}


		})
	}
	$scope.MaxTopValues = function (TopValues) {
		if (TopValues >= 20) {
			$scope.TopValues = 20;
		}
		if (TopValues == 0) {
			$scope.TopValues = 1;
        }
		
    }
	function GetAllDashboardGraph_MonthOrYearwisePaidAmount(FromDate, ToDate, ChartType) {

		$http({
			url: "/PayableDashboard/GetAllDashboardGraph_MonthOrYearwisePaidAmount?FromDate=" + FromDate + "&ToDate=" + ToDate + "&ChartType=" + ChartType,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphMonthOrYearwisePaidAmountList = data;
			if ($scope.DashboardGraphMonthOrYearwisePaidAmountList.length > 0) {
				$scope.monthsArrayPaidAmount = $scope.DashboardGraphMonthOrYearwisePaidAmountList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArrayPaidAmount = $scope.DashboardGraphMonthOrYearwisePaidAmountList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.PaidAmountArray = $scope.DashboardGraphMonthOrYearwisePaidAmountList.map(function (obj) {
					return obj.TotalPaidAmount;
				});

				if ($scope.ChartType == 'Month') {
					$scope.monthsYearsPaidAmount = $scope.monthsArrayPaidAmount.map((d, i) => `${d}-${$scope.YearsArrayPaidAmount[i]}`);
				} else {
					$scope.monthsYearsPaidAmount = $scope.YearsArrayPaidAmount;
                }
				BarGraphPaidAmountMonthwise();
			} else {
				$scope.monthsArrayPaidAmount = [];
				$scope.YearsArrayPaidAmount = [];
				$scope.PaidAmountArray = [];
				$scope.monthsYearsPaidAmount = [];
				BarGraphPaidAmountMonthwise();
			}




		})
	}
	function GetAllDashboardTotalPaidVATAITAndAmount(FromDate, ToDate) {

		$http({
			url: "/PayableDashboard/GetAllDashboardTotalPaidVATAITAndAmount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardTotalPaidVATAITAndAmountList = data;
			if ($scope.DashboardTotalPaidVATAITAndAmountList.length > 0) {
				$scope.TotalPaidVAT = $scope.DashboardTotalPaidVATAITAndAmountList[0].TotalPaidVAT;
				$scope.TotalPaidAIT = $scope.DashboardTotalPaidVATAITAndAmountList[0].TotalPaidAIT;

				$scope.TotalPaidAmount = $scope.DashboardTotalPaidVATAITAndAmountList[0].TotalPaidAmount;


			} else {
				$scope.TotalPaidVAT = 0;
				$scope.TotalPaidAIT = 0;
				$scope.TotalPaidAmount = 0;
				
			}


		})
	}
	function GetAllDashboardGraphForLocalAndOverseasePaidAmount(FromDate, ToDate) {

		$http({
			url: "/PayableDashboard/GetAllDashboardGraphForLocalAndOverseasePaidAmount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForLocalAndOverseasePaidAmountList = data;
			if ($scope.DashboardGraphForLocalAndOverseasePaidAmountList.length > 0) {

				$scope.LocalAndOverseasePaidAmountArray = [];
				$scope.TotalLocalPaidAmount = $scope.DashboardGraphForLocalAndOverseasePaidAmountList[0].TotalLocalPaidAmount;
				$scope.LocalAndOverseasePaidAmountArray.push($scope.TotalLocalPaidAmount);
				$scope.TotalOverseasePaidAmount = $scope.DashboardGraphForLocalAndOverseasePaidAmountList[0].TotalOverseasePaidAmount;
				$scope.LocalAndOverseasePaidAmountArray.push($scope.TotalOverseasePaidAmount);
				PieGraphLocalAndOverseasePaidAmount();
			} else {
				$scope.TotalLocalPaidAmount = 0;
				$scope.TotalOverseasePaidAmount = 0;
				$scope.LocalAndOverseasePaidAmountArray = [];
				PieGraphLocalAndOverseasePaidAmount();
			}


		})
	}

	function BarGraphPaidAmountMonthwise() {
		var ctx = document.getElementById("AmountBarChart").getContext('2d');
		if (window.MyChartBarAmount != undefined) {
			window.MyChartBarAmount.destroy();
		}
		window.MyChartBarAmount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.monthsYearsPaidAmount,
				datasets: [{
					label: 'Month or Year VS Paid Amount',
					data: $scope.PaidAmountArray,
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
					text: 'Month or Year Wise Paid Amount',
					position: 'left'
				}

			}
		});
	}
	function BarGraphSupplierWiseTotalPaidAmount() {
		var ctx = document.getElementById("BarSupplierWisePaidAmountChart").getContext('2d');
		if (window.MyChartBarCount != undefined) {
			window.MyChartBarCount.destroy();
		}
		window.MyChartBarCount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.SupplierNameArray,
				datasets: [{
					label: 'Supplier VS Paid Amount',
					data: $scope.AmountArraySupplierWise,
					backgroundColor: '#00a65a',
					borderColor: '#d9534f',
					borderWidth: 2
				}]
			},
			options: {
				title: {
					display: true,
					text: 'Supplier VS Paid Amount',
					position: 'left'
				},
				scales: {

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
					}],
					yAxes: [{
						ticks: {
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

			}
		});
	}

	function PieGraphLocalAndOverseasePaidAmount() {
		var ctx = document.getElementById("AmountPieChart").getContext('2d');
		if (window.MyChartPieAmount != undefined) {
			window.MyChartPieAmount.destroy();
		}
		window.MyChartPieAmount = new Chart(ctx, {
			type: 'pie',
			data: {
				datasets: [{
					data: $scope.LocalAndOverseasePaidAmountArray,
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
					'Total Local Paid Amount',
					'Total Overseas Paid Amount'
				]

			},
			options: {
				title: {
					display: true,
					text: 'Local And Overseas Paid Amount Ratio',
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
		if (id == 'LoadDateAmountBar') {
			GetAllDashboardGraph_MonthOrYearwisePaidAmount(FromDate, ToDate, $scope.ChartType);
		} else if (id == 'LoadDateSupplierAmountBar') {
			GetAllDashboardGraphSupplierWiseTotalPaidAmount(FromDate, ToDate, $scope.TopValues);
		} else if (id == 'LoadDateAmountPie') {
			GetAllDashboardGraphForLocalAndOverseasePaidAmount(FromDate, ToDate);
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
