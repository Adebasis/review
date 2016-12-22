app.controller('LoginController', function($scope, $sce, $http, $window, API_URL) {
    
	$scope.submitForm = function() {
		
		var url = API_URL + "api/backend/postLogin";
		
		// Posting data to controller
		$http({
            method: 'POST',
            url: url,
            data: $.param($scope.login),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
			console.log(response);
			if(response == "0"){
				$scope.lbl_error = 'Wrong email or password you have entered !!!';
				if($scope.frmLogin.$invalid) return false;
			}else{
				$window.location.href = API_URL + 'backend/dashboard';
			}
        }).error(function(response) {
            $scope.lbl_error = 'Something wrong in submit';
        });
	};
});
