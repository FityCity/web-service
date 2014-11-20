app.controller('MailCtrl',  function($scope,VendorService) {
    $scope.vendors=VendorService.all();

  $scope.labels = [
    {name: 'Banned', filter:'client', color:'#f05050'},
    {name: 'Good', filter:'work', color:'#27c24c'}
  ];


  $scope.labelClass = function(label) {
    return {
      'b-l-danger': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'      
    };
  };

});

app.controller('MailListCtrl', ['$scope', '$stateParams','VideoService', function($scope, $stateParams,VideoService) {
  $scope.category = $stateParams.filter;
  $scope.videos = VideoService.all();
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function(mail){
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    {name: 'James', email:'james@gmail.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
  ];
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});