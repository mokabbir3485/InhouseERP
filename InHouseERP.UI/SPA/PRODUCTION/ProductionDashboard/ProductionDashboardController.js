app.controller("ProductionDashboardController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
	//$scope.LoginUser = $cookieStore.get('UserData');

	var UserData = sessionStorage.getItem("UserDataSession");
	if (UserData != null) {
		$scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
	}
	clear();

	function clear() {
		$scope.DashboardGraphForUsedMatProdMonthwiseCountList = [];
		$scope.DashboardGraphForProductionMonthwiseCountList = [];
		$scope.DashboardTotalProductionCountList = [];

		LoadDateSystem('LoadDateCountBarSystem');
		LoadDateSystem('LoadDateUsedMatCountBarSystem');

		var FromDateArr = [];
		FromDateArr = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy').split(' ');
		var FromDate = FromDateArr[0] + ' ' + FromDateArr[1] + ' ' + (parseInt(FromDateArr[2]) - 1).toString();
		var ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

		GetAllDashboardGraphForProductionMonthwiseCount(FromDate, ToDate);
		GetAllDashboardGraphForUsedMatProdMonthwiseCount(FromDate, ToDate);
		GetAllDashboardTotalProductionCount(FromDate, ToDate);


	}

	function GetAllDashboardGraphForProductionMonthwiseCount(FromDate, ToDate) {

		$http({
			url: "/ProductionDashboard/GetAllDashboardGraphForProductionMonthwiseCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForProductionMonthwiseCountList = data;
			if ($scope.DashboardGraphForProductionMonthwiseCountList.length > 0) {
				$scope.monthsArrayProductionCount = $scope.DashboardGraphForProductionMonthwiseCountList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArrayProductionCount = $scope.DashboardGraphForProductionMonthwiseCountList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.TotalProductionArray = $scope.DashboardGraphForProductionMonthwiseCountList.map(function (obj) {
					return obj.TotalProduction;
				});

				$scope.monthsYearsProductionCount = $scope.monthsArrayProductionCount.map((d, i) => `${d}-${$scope.YearsArrayProductionCount[i]}`);
				BarGraphProductionCountMonthwise();
			} else {
				$scope.monthsArrayProductionCount = [];
				$scope.YearsArrayProductionCount = [];
				$scope.TotalProductionArray = [];
				$scope.monthsYearsProductionCount = [];
				BarGraphProductionCountMonthwise();
			}




		})
	}
	function GetAllDashboardGraphForUsedMatProdMonthwiseCount(FromDate, ToDate) {

		$http({
			url: "/ProductionDashboard/GetAllDashboardGraphForUsedMatProdMonthwiseCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForUsedMatProdMonthwiseCountList = data;
			if ($scope.DashboardGraphForUsedMatProdMonthwiseCountList.length > 0) {
				$scope.monthsArrayUsedMatCount = $scope.DashboardGraphForUsedMatProdMonthwiseCountList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArrayUsedMatCount = $scope.DashboardGraphForUsedMatProdMonthwiseCountList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.TotalUsedMatAreaInSqmArray = $scope.DashboardGraphForUsedMatProdMonthwiseCountList.map(function (obj) {
					return obj.TotalUsedMatAreaInSqm;
				});
				$scope.TotalUsedMatWeigntInKgArray = $scope.DashboardGraphForUsedMatProdMonthwiseCountList.map(function (obj) {
					return obj.TotalUsedMatWeigntInKg;
				});

				$scope.monthsYearsUsedMatCount = $scope.monthsArrayUsedMatCount.map((d, i) => `${d}-${$scope.YearsArrayUsedMatCount[i]}`);
				BarGraphUsedCountMonthwise();
			} else {
				$scope.monthsArrayUsedMatCount = [];
				$scope.YearsArrayUsedMatCount = [];
				$scope.TotalUsedMatAreaInSqmArray = [];
				$scope.TotalUsedMatWeigntInKgArray = [];
				$scope.monthsYearsUsedMatCount = [];
				BarGraphUsedCountMonthwise();
			}




		})
	}
	function GetAllDashboardTotalProductionCount(FromDate, ToDate) {

		$http({
			url: "/ProductionDashboard/GetAllDashboardTotalProductionCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardTotalProductionCountList = data;
			if ($scope.DashboardTotalProductionCountList.length > 0) {
				$scope.PendingIwoForProduction = $scope.DashboardTotalProductionCountList[0].PendingIwoForProduction;
				$scope.TotalProduction = $scope.DashboardTotalProductionCountList[0].TotalProduction;

				$scope.TotalStoreProductionStock = $scope.DashboardTotalProductionCountList[0].TotalStoreProductionStock;

				$scope.TotalWastageQty = $scope.DashboardTotalProductionCountList[0].TotalWastageQty;
				$scope.TotalUsedMatLengthinMeter = $scope.DashboardTotalProductionCountList[0].TotalUsedMatLengthinMeter;
				$scope.TotalUsedMatAreaInSqm = $scope.DashboardTotalProductionCountList[0].TotalUsedMatAreaInSqm;

			} else {
				$scope.PendingIwoForProduction = 0;
				$scope.TotalProduction = 0;
				$scope.TotalStoreProductionStock = 0;
				$scope.TotalWastageQty = 0;
				$scope.TotalUsedMatLengthinMeter = 0;
				$scope.TotalUsedMatAreaInSqm = 0;
			}


		})
	}

	function BarGraphProductionCountMonthwise() {
		var ctx = document.getElementById("CountBarChart").getContext('2d');
		if (window.MyChartBarCount != undefined) {
			window.MyChartBarCount.destroy();
		}
		window.MyChartBarCount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.monthsYearsProductionCount,
				datasets: [{
					label: 'Month VS Total Production',
					data: $scope.TotalProductionArray,
					backgroundColor: '#d9534f',
					borderColor: '#00a65a',
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
					text: 'Month Wise Total Production',
					position: 'left'
				}

			}
		});
	}
	function BarGraphUsedCountMonthwise() {
		var CountCanvas = document.getElementById("UsedMatCountBarChart");

		Chart.defaults.global.defaultFontFamily = "Lato";
		Chart.defaults.global.defaultFontSize = 18;

		var TotalUsedMatAreaInSqm = {
			label: "Area In Sqm",
			data: $scope.TotalUsedMatAreaInSqmArray,
			backgroundColor: '#d9534f',
			borderColor: '#00a65a',
			borderWidth: 2

		};

		var TotalUsedMatWeigntInKg = {
			label: "Weignt In Kg",
			data: $scope.TotalUsedMatWeigntInKgArray,
			backgroundColor: '#00c0ef',
			borderColor: '#00a65a',
			borderWidth: 2,
			
		};

		var CountData = {

			labels: $scope.monthsYearsUsedMatCount,
			datasets: [TotalUsedMatAreaInSqm, TotalUsedMatWeigntInKg]
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
				text: 'Month Wise Used Materials',
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

		if (window.MyChartUsedMatBarCount != undefined) {
			window.MyChartUsedMatBarCount.destroy();
		}
		window.MyChartUsedMatBarCount = new Chart(CountCanvas, {
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
		if (id == 'LoadDateCountBar') {
			GetAllDashboardGraphForProductionMonthwiseCount(FromDate, ToDate);
		} else if (id == 'LoadDateUsedMatCountBar') {
			GetAllDashboardGraphForUsedMatProdMonthwiseCount(FromDate, ToDate);
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
