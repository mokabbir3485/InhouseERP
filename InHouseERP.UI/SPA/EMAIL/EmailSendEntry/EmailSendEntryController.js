app.controller("EmailSendEntryController", function ($scope, $http) {
   
    Clear();
    function Clear() {

        $scope.EmailCcHideAndShow = false;
        $scope.EmailBccHideAndShow = false;
        $scope.EmailSendNotification = {};
        $scope.ToEmailList = [];
    }

    $scope.hideCcBtnColapse = function () {
        $scope.EmailCcHideAndShow = $scope.EmailCcHideAndShow == false ? true : false;

    }
    $scope.hideBccBtnColapse = function () {
        $scope.EmailBccHideAndShow = $scope.EmailBccHideAndShow == false ? true : false;

    }
    $scope.SendBtn = function () {
        if ($scope.EmailSendNotification.ToEmail != undefined) {
            $scope.ToEmailstr = $scope.EmailSendNotification.ToEmail.replaceAll(/\s/g, '');
            $scope.EmailSendNotification.ToEmail = $scope.ToEmailstr.split(',');
        }
        if ($scope.EmailSendNotification.CcEmail != undefined) {
            $scope.CcEmailstr = $scope.EmailSendNotification.CcEmail.replaceAll(/\s/g, '');
            $scope.EmailSendNotification.CcEmail = $scope.CcEmailstr.split(',');
        }
        if ($scope.EmailSendNotification.BccEmail != undefined) {
            $scope.BccEmailstr = $scope.EmailSendNotification.BccEmail.replaceAll(/\s/g, '');
            $scope.EmailSendNotification.BccEmail = $scope.BccEmailstr.split(',');
        }
        $scope.EmailSendNotification.EmailBody = $(".summernote").summernote("code");
        EmailSend();
    }
    function EmailSend() {
        var params = JSON.stringify({ emailSend: $scope.EmailSendNotification });
        $scope.EmailSendNotification = {};
        $http({
            url: "/EmailSender/EmailSend",
            method: "POST",
            data: params,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            Clear();
            //console.log(response.data);
            if (response.data == '1') {
                $(".summernote").summernote("reset");
                alertify.log('The mail has been Sent...', 'success', '5000');
            } else {
                alertify.log('Something Went Wrong, Please try again!!!', 'error', '5000');
            }
        });
    }

});