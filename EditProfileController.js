app.controller('EditProfileController', function($scope, $sce, $http, $location, API_URL) {
    
	$http.get(API_URL + "api/backend/getMyProfile").success(function(response) {
		$scope.core = {};
		$scope.core.admin_name = response[0][0].admin_name;
		$scope.core.email = response[0][0].email;
		$scope.core.contact_no = response[0][0].contact_no;
		$scope.core.contact_email = response[0][0].contact_email;
		
		$scope.core.facebook_url = response[0][0].facebook_url;
		$scope.core.twitter_url = response[0][0].twitter_url;
		$scope.core.pinterest_url = response[0][0].pinterest_url;
		$scope.core.instagram_url = response[0][0].instagram_url;
	});
	
	// Update
	$scope.submitForm = function() {
		
		var url = API_URL + "api/backend/postMyProfile";
				
		// Posting data to controller
		$http({
            method: 'POST',
            url: url,
            data: $.param($scope.core),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
			if(response == "0"){
				$scope.className ='alert';
				$scope.lbl_success = 'Something wrong in submit !!!';
				if($scope.frmProfile.$invalid) return false;
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
		if (current_page == "editprofile") {
			return 'active';
		} else {
			return '';
		}
	}
});