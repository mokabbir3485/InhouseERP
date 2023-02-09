app.controller("ProcurementDashboardController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
	var UserData = sessionStorage.getItem("UserDataSession");
	if (UserData != null) {
		$scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
	}

	clear();

	function clear() {
		$scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList = [];
		$scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList = [];
		$scope.DashboardTotalCountImpLocalList = [];
		$scope.ChartTypeList = ["Month", "Year"];
		$scope.ChartType = "Month";

		LoadDateSystem('LoadDateCountLineSystem');
		LoadDateSystem('LoadDateAmountBarSystem');


		var FromDateArr = [];
		FromDateArr = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy').split(' ');
		var FromDate = FromDateArr[0] + ' ' + FromDateArr[1] + ' ' + (parseInt(FromDateArr[2]) - 1).toString();
		var ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

		GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(FromDate, ToDate);
		GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(FromDate, ToDate, $scope.ChartType);
		GetAllDashboardTotalCountImpLocalPurchase(FromDate, ToDate);

	}



	function GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(FromDate, ToDate) {

		$http({
			url: "/ProcurementDashboard/GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList = data;
			if ($scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.length > 0) {
				$scope.monthsArray = $scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArray = $scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.RawImportCountArray = $scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.map(function (obj) {
					return obj.RawItemImportPurchase;
				});
				$scope.HardwareImportCountArray = $scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.map(function (obj) {
					return obj.HardwareItemImportPurchase;
				});
				$scope.RawLocalCountArray = $scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.map(function (obj) {
					return obj.RawItemLocalPurchase;
				});
				$scope.HardwareLocalCountArray = $scope.DashboardGraphForCategoryWiseItemPurchaseLocalAndImportList.map(function (obj) {
					return obj.HardwareItemLocalPurchase;
				});

				$scope.monthsYears = $scope.monthsArray.map((d, i) => `${d}-${$scope.YearsArray[i]}`);
				LineGraphForCategoryWiseItemPurchaseLocalAndImportCount();
			} else {
				$scope.monthsArray = [];
				$scope.YearsArray = [];
				$scope.RawImportCountArray = [];
				$scope.HardwareImportCountArray = [];
				$scope.RawLocalCountArray = [];
				$scope.HardwareLocalCountArray = [];
				$scope.monthsYears = [];
				LineGraphForCategoryWiseItemPurchaseLocalAndImportCount();
			}


		})
	}
	function GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(FromDate, ToDate, ChartType) {

		$http({
			url: "/ProcurementDashboard/GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise?FromDate=" + FromDate + "&ToDate=" + ToDate + "&ChartType=" + ChartType,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList = data;
			if ($scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList.length > 0) {
				$scope.monthsArrayPurchaseAmount = $scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArrayPurchaseAmount = $scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.AmountImportPurchaseBarArray = $scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList.map(function (obj) {
					return obj.TotalAmountImportPurchase;
				});
				$scope.AmountLocalPurchaseBarArray = $scope.DashboardGraphForImportLocalPurchaseMonthOrYearWiseList.map(function (obj) {
					return obj.TotalAmountLocalPurchase;
				});
				if ($scope.ChartType == 'Month') {
					$scope.monthsYearsPurchaseAmount = $scope.monthsArrayPurchaseAmount.map((d, i) => `${d}-${$scope.YearsArrayPurchaseAmount[i]}`);
				} else {
					$scope.monthsYearsPurchaseAmount = $scope.YearsArrayPurchaseAmount;
				}
				BarGraphPaymentMonthOrYearwiseTotalAmount();
			} else {
				$scope.monthsArrayPurchaseAmount = [];
				$scope.YearsArrayPurchaseAmount = [];
				$scope.AmountImportPurchaseBarArray = [];
				$scope.AmountLocalPurchaseBarArray = [];
				$scope.monthsYearsPurchaseAmount = [];
				BarGraphPaymentMonthOrYearwiseTotalAmount();
			}
		})
	}
	function GetAllDashboardTotalCountImpLocalPurchase(FromDate, ToDate) {

		$http({
			url: "/ProcurementDashboard/GetAllDashboardTotalCountImpLocalPurchase?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardTotalCountImpLocalList = data;
			if ($scope.DashboardTotalCountImpLocalList.length > 0) {
				$scope.TotalImportPurchase = $scope.DashboardTotalCountImpLocalList[0].TotalImportPurchase;
				$scope.TotalLocalPurchase = $scope.DashboardTotalCountImpLocalList[0].TotalLocalPurchase;
				$scope.TotalAmountImportPurchase = $scope.DashboardTotalCountImpLocalList[0].TotalAmountImportPurchase;
				$scope.TotalAmountLocalPurchase = $scope.DashboardTotalCountImpLocalList[0].TotalAmountLocalPurchase;
				

			} else {
				$scope.TotalImportPurchase = 0;
				$scope.TotalLocalPurchase = 0;
				$scope.TotalAmountImportPurchase = 0;
				$scope.TotalAmountLocalPurchase = 0;
			}


		})
	}
	function LineGraphForCategoryWiseItemPurchaseLocalAndImportCount() {
		var CountCanvas = document.getElementById("CountLineChart");

		Chart.defaults.global.defaultFontFamily = "Lato";
		Chart.defaults.global.defaultFontSize = 18;

		var dataRawImport = {
			label: "Raw Import Purchase",
			data: $scope.RawImportCountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#00a65a'

		};

		var dataHardwareImport = {
			label: "Hardware Import Purchase",
			data: $scope.HardwareImportCountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#f39c12'

		};

		var dataRawLocal = {
			label: "Raw Local Purchase",
			data: $scope.RawLocalCountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#d9534f'
		};
		var dataHardwareLocal = {
			label: "Hardware Local Purchase",
			data: $scope.HardwareLocalCountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#00c0ef'
		};

		var CountData = {

			labels: $scope.monthsYears,
			datasets: [dataRawImport, dataHardwareImport, dataRawLocal, dataHardwareLocal]
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
				text: 'Month Wise Count Local Import Item',
				position: 'left'
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
	function BarGraphPaymentMonthOrYearwiseTotalAmount() {
		var CountCanvas = document.getElementById("AmountBarChart");

		Chart.defaults.global.defaultFontFamily = "Lato";
		Chart.defaults.global.defaultFontSize = 18;

		var AmountImportPurchase = {
			label: "Total Amount Import Purchase",
			data: $scope.AmountImportPurchaseBarArray,
			backgroundColor: '#d9534f',
			borderColor: '#00a65a',
			borderWidth: 2

		};
		var AmountLocalPurchase = {
			label: "Total Amount Local Purchase",
			data: $scope.AmountLocalPurchaseBarArray,
			backgroundColor: '#00c0ef',
			borderColor: '#00a65a',
			borderWidth: 2

		};

		

		var CountData = {

			labels: $scope.monthsYearsPurchaseAmount,
			datasets: [AmountImportPurchase, AmountLocalPurchase]
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
				text: 'Month or Year Wise Purchase',
				position: 'left'
			},
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
			}

		};

		if (window.MyChartPurchaseBarAmount != undefined) {
			window.MyChartPurchaseBarAmount.destroy();
		}
		window.MyChartPurchaseBarAmount = new Chart(CountCanvas, {
			type: 'bar',
			data: CountData,
			options: chartOptions
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
			GetAllDashboardGraphForCategoryWiseItemPurchaseLocalAndImport(FromDate, ToDate);
		} else if (id == 'LoadDateAmountBar') {
			GetAllDashboardGraphForImportLocalPurchaseMonthOrYearWise(FromDate, ToDate, $scope.ChartType);
		} else if (id == 'LoadDateCountBar') {
			//GetAllDashboardCompanyWiseTotalSo(FromDate, ToDate);
		} else if (id == 'LoadDateCountPie') {
			//GetAllDashboardTotalExportImportCount(FromDate, ToDate);
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
