'use strict';

/* Services */


// Demonstrate how to register services
angular.module('app.services', [])
    .factory('ActivityService',function($http){

        var addThumbnail = function(activity){
            activity.imgSrc = $.jYoutube("//www.youtube.com/watch?v="+activity.youtube_id,"full")
        };

        var activities = [];
        var getActivities = $http.get('/activities');
        getActivities.then(function(callback){
            angular.forEach(callback.data, function(activity, $index){
                addThumbnail(activity);
                activities.push(activity);
                console.log(activity);
            });
        })

        return {
            all:function(){
                return activities;
            },
            get:function(id){
                return activities[id];
            },
            post:function(data){
                var postActivity = $http.post('/activities', data);
                postActivity.then(function(success){
                    addThumbnail(data);
                    activities.push(data);
                }).catch(function(error){
                    console.log("Failed to save activity: ", error);
                });
            },
            delete:function(activity){
                var deleteActivity = $http.delete('/activities', {params:{activity_id:activity._id}});
                deleteActivity.then(function(resp){
                    console.log("Deleted activity: ", resp);
                    var index = activities.indexOf(activity);
                    if (index != -1) {
                        activities.splice(index, 1);
                    }
                }).catch(function(error){
                    console.log("Failed to delete activity: ", error);
                })
            }
        }
    })

    .factory('VendorService',function($http){


        var vendors = {};
        var getVendors = $http.get('/vendors');
        getVendors.then(function(obj){
            angular.forEach(obj.data, function(vendor, $index){
                vendors[vendor._id] = vendor;
            });
            console.log("Vendors exist now: ", vendors);
        }).catch(function(err){
            console.log("Failed to load vendors:", err);
        })

        return {
            all:function(){
                return vendors;
            },
            get:function(id){
                return vendor[id];
            },
            post:function(data){
                var postVendor = $http.post('/vendors', data);
                postVendor.then(function(success){
                    vendors[success.data._id] = data;
                }).catch(function(error){
                    console.log("Failed to save vendor: ", error);
                });
            },
            delete:function(vendor){
                var deleteVendor = $http.delete('/vendors/' + vendor._id);
                deleteVendor.then(function(resp){
                    delete vendors[vendor._id];
                }).catch(function(error){
                    console.log("Failed to delete vendor: ", error);
                })
            }
        }
    })
    .factory('UserService',function(){
        function getCookie(cname) {
            var cookie= $.cookie(cname);
            var result;
            if(cookie!=""&& cookie!=null){
                result=JSON.parse($.cookie(cname));
            }
            return result;
        }
        function checkCookie() {
            var user = getCookie("user");

            if (user != "" && user!=null) {
                console.log("Welcome again " + user.username);
                return true;
            } else {
                console.log("no cookie of user")
                return false;
            }
        }

        return{
            isLogin:function(){
                return checkCookie();
            }
        }

    })
;