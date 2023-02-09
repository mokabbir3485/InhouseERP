app.controller("ReceivableDashboardController", function ($scope, $cookieStore, $cookies, $http, $filter, $window) {
	var UserData = sessionStorage.getItem("UserDataSession");
	if (UserData != null) {
		$scope.LoginUser = JSON.parse(sessionStorage.UserDataSession);
	}

	clear();

	function clear() {
		$scope.DashboardGraphForAdvPayRfundList = [];
		$scope.DashboardPaymentCompanyWiseTotalAmountList = [];
		$scope.DashboardGraphForPaymentMonthOrYearwiseTotalAmountList = [];
		$scope.DashboardTotalCountList = [];

		$scope.ChartTypeList = ["Month", "Year"];
		$scope.ChartType = "Month";
		$scope.TopValues = 10;
		LoadDateSystem('LoadDateAmountLineSystem');
		LoadDateSystem('LoadDateAmountBarSystem');
		LoadDateSystem('LoadDateCompanyAmountBarSystem');


		var FromDateArr = [];
		FromDateArr = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy').split(' ');
		var FromDate = FromDateArr[0] + ' ' + FromDateArr[1] + ' ' + (parseInt(FromDateArr[2]) - 1).toString();
		var ToDate = $filter('date')(new Date().toJSON().slice(0, 10), 'MMM dd, yyyy');

		GetAllDashboardGraphForAdvPayRfund(FromDate, ToDate);
		GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(FromDate, ToDate, $scope.ChartType);
		GetAllDashboardPaymentCompanyWiseTotalAmount(FromDate, ToDate, $scope.TopValues);
		GetAllDashboardTotalCount(FromDate, ToDate);

	}
	$scope.MaxTopValues = function (TopValues) {
		if (TopValues >= 20) {
			$scope.TopValues = 20;
		}
		if (TopValues == 0) {
			$scope.TopValues = 1;
		}

	}


	function GetAllDashboardGraphForAdvPayRfund(FromDate, ToDate) {

		$http({
			url: "/ReceivableDashboard/GetAllDashboardGraphForAdvPayRfund?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForAdvPayRfundList = data;
			if ($scope.DashboardGraphForAdvPayRfundList.length > 0) {
				$scope.monthsArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.Years;
				}).map(String);

				$scope.PaidAmountArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.TotalPaidAmount;
				});
				$scope.PaidVATArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.TotalPaidVAT;
				});
				$scope.PaidAITArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.TotalPaidAIT;
				});
				$scope.RefundArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.TotalRefundAmount;
				});
				$scope.AdvanceArray = $scope.DashboardGraphForAdvPayRfundList.map(function (obj) {
					return obj.TotalAdvanceAmount;
				});

				$scope.monthsYears = $scope.monthsArray.map((d, i) => `${d}-${$scope.YearsArray[i]}`);
				LineGraphForAdvPayRfund();
			} else {
				$scope.monthsArray = [];
				$scope.YearsArray = [];
				$scope.PaidAmountArray = [];
				$scope.PaidVATArray = [];
				$scope.PaidAITArray = [];
				$scope.RefundArray = [];
				$scope.AdvanceArray = [];
				$scope.monthsYears = [];
				LineGraphForAdvPayRfund();
			}


		})
	}
	function GetAllDashboardPaymentCompanyWiseTotalAmount(FromDate, ToDate, TopValues) {

		$http({
			url: "/ReceivableDashboard/GetAllDashboardPaymentCompanyWiseTotalAmount?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TopValues=" + TopValues,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardPaymentCompanyWiseTotalAmountList = data;
			if ($scope.DashboardPaymentCompanyWiseTotalAmountList.length > 0) {
				$scope.CompanyNameArray = $scope.DashboardPaymentCompanyWiseTotalAmountList.map(function (obj) {
					return obj.CompanyName;
				});

				$scope.PaidAmountArrayCompanyWise = $scope.DashboardPaymentCompanyWiseTotalAmountList.map(function (obj) {
					return obj.TotalPaidAmount;
				});
				BarGraphPaymentCompanyWiseTotalAmount();
			} else {
				$scope.CompanyNameArray = [];
				$scope.PaidAmountArrayCompanyWise = [];
				BarGraphPaymentCompanyWiseTotalAmount();
			}


		})
	}
	function GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(FromDate, ToDate, ChartType) {

		$http({
			url: "/ReceivableDashboard/GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount?FromDate=" + FromDate + "&ToDate=" + ToDate + "&ChartType=" + ChartType,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardGraphForPaymentMonthOrYearwiseTotalAmountList = data;
			if ($scope.DashboardGraphForPaymentMonthOrYearwiseTotalAmountList.length > 0) {
				$scope.monthsArrayPaidAmount = $scope.DashboardGraphForPaymentMonthOrYearwiseTotalAmountList.map(function (obj) {
					return obj.Months;
				});
				$scope.YearsArrayPaidAmount = $scope.DashboardGraphForPaymentMonthOrYearwiseTotalAmountList.map(function (obj) {
					return obj.Years;
				}).map(String);
				$scope.PaidAmountBarArray = $scope.DashboardGraphForPaymentMonthOrYearwiseTotalAmountList.map(function (obj) {
					return obj.TotalPaidAmount;
				});
				if ($scope.ChartType == 'Month') {
					$scope.monthsYearsPaidAmount = $scope.monthsArrayPaidAmount.map((d, i) => `${d}-${$scope.YearsArrayPaidAmount[i]}`);
				} else {
					$scope.monthsYearsPaidAmount = $scope.YearsArrayPaidAmount;
				}
				BarGraphPaymentMonthOrYearwiseTotalAmount();
			} else {
				$scope.monthsArrayPaidAmount = [];
				$scope.YearsArrayPaidAmount = [];
				$scope.PaidAmountBarArray = [];
				$scope.monthsYearsPaidAmount = [];
				BarGraphPaymentMonthOrYearwiseTotalAmount();
			}




		})
	}
	function GetAllDashboardTotalCount(FromDate, ToDate) {

		$http({
			url: "/ReceivableDashboard/GetAllDashboardTotalCount?FromDate=" + FromDate + "&ToDate=" + ToDate,
			method: "Get",
			headers: { 'Content-Type': "application/json" }
		}).success(function (data) {
			$scope.DashboardTotalCountList = data;
			if ($scope.DashboardTotalCountList.length > 0) {
				$scope.TotalPaidVAT = $scope.DashboardTotalCountList[0].TotalPaidVAT;
				$scope.TotalPaidAIT = $scope.DashboardTotalCountList[0].TotalPaidAIT;

				$scope.TotalPaidAmount = $scope.DashboardTotalCountList[0].TotalPaidAmount;
			} else {
				$scope.TotalPaidVat = 0;
				$scope.TotalPaidAIT = 0;
				$scope.TotalPaidAmount = 0;
			}
		})
	}

	function LineGraphForAdvPayRfund() {
		var AmountCanvas = document.getElementById("AmountLineChart");

		Chart.defaults.global.defaultFontFamily = "Lato";
		Chart.defaults.global.defaultFontSize = 18;

		var PaidAmount = {
			label: "Paid Amount",
			data: $scope.PaidAmountArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#00a65a'

		};

		var PaidVAT = {
			label: "Paid VAT",
			data: $scope.PaidVATArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#f39c12'

		};

		var PaidAIT = {
			label: "Paid AIT",
			data: $scope.PaidAITArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#d9534f'
		};
		var Refund = {
			label: "Refund",
			data: $scope.RefundArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#00c0ef'
		};
		var Advance = {
			label: "Advance",
			data: $scope.AdvanceArray,
			lineTension: 0.3,
			fill: true,
			borderColor: '#b3b3ff'
		};

		var AmountData = {

			labels: $scope.monthsYears,
			datasets: [PaidAmount, PaidVAT, PaidAIT, Advance]
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
				text: 'Month Wise Amount, VAT, AIT and Advance',
				position: 'left'
			}
		};

		if (window.MyChartLineAmount != undefined) {
			window.MyChartLineAmount.destroy();
		}
		window.MyChartLineAmount = new Chart(AmountCanvas, {
			type: 'line',
			data: AmountData,
			options: chartOptions
		});
	}

	function BarGraphPaymentMonthOrYearwiseTotalAmount() {
		var ctx = document.getElementById("AmountBarChart").getContext('2d');
		if (window.MyChartBarAmount != undefined) {
			window.MyChartBarAmount.destroy();
		}
		window.MyChartBarAmount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.monthsYearsPaidAmount,
				datasets: [{
					label: 'Month or Year VS Total Amount',
					data: $scope.PaidAmountBarArray,
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
					text: 'Month or year Wise Total Amount',
					position: 'left'
				}

			}
		});
	}
	function BarGraphPaymentCompanyWiseTotalAmount() {
		var ctx = document.getElementById("BarCompanyWisePaidAmountChart").getContext('2d');
		if (window.MyChartBarCompanyWiseAmount != undefined) {
			window.MyChartBarCompanyWiseAmount.destroy();
		}
		window.MyChartBarCompanyWiseAmount = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: $scope.CompanyNameArray,
				datasets: [{
					label: 'Company VS Paid Amount',
					data: $scope.PaidAmountArrayCompanyWise,
					backgroundColor: '#00a65a',
					borderColor: '#d9534f',
					borderWidth: 2
				}]
			},
			options: {
				title: {
					display: true,
					text: 'Company Wise Total Paid Amount',
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
		if (id == 'LoadDateAmountLine') {
			GetAllDashboardGraphForAdvPayRfund(FromDate, ToDate);
		} else if (id == 'LoadDateAmountBar') {
			GetAllDashboardGraphForPaymentMonthOrYearwiseTotalAmount(FromDate, ToDate, $scope.ChartType);
		} else if (id == 'LoadDateCompanyAmountBar') {
			GetAllDashboardPaymentCompanyWiseTotalAmount(FromDate, ToDate, $scope.TopValues);
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
