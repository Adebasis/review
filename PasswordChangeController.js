app.controller('PasswordChangeController', function($scope, $sce, $http, $location, API_URL) {
    
	// Update
	$scope.submitForm = function() {
		
		var url = API_URL + "api/backend/postPasswordChange";
		
		// Posting data to controller
		$http({
            method: 'POST',
            url: url,
            data: $.param($scope.password),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
			
			$scope.lbl_success = null;
			if(response == "blank"){
				$scope.className ='alert';
				$scope.lbl_success = 'Password fields should not be blank !!!';
				if($scope.frmPassword.$invalid) return false;
			}else if(response == "conf_not_match"){
				$scope.className ='alert';
				$scope.lbl_success = 'Confirm Password does not match !!!';
				if($scope.frmPassword.$invalid) return false;
			}else if(response == "not_match"){
				$scope.className ='alert';
				$scope.lbl_success = 'Sorry Invalid old password !!!.';
				if($scope.frmPassword.$invalid) return false;
			}else{
				$scope.className ='alert alert-success';
				$scope.lbl_success = 'Record has been save successfully.';
			}
        }).error(function(response) {
			$scope.className ='alert';
            $scope.lbl_success = 'Something wrong in submit';
        });
	};
	// Set Active Class
	$scope.getActiveClassAccounts = function () {
		var fullurl = $location.absUrl();		
		var last = fullurl.split("/");
		console.log(last);
		var current_page = last[5];
		if (current_page == "changepassword") {
			return 'active';
		} else {
			return '';
		}
	}
});