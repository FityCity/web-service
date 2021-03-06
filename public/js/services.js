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
            });
        })

        return {
            all:function(){
                return activities;
            },
            get:function(id){
                for(var i=0;i<activities.length;i++){
                    if(activities[i]._id==id){
                        return activities[i]
                    }
                }
                return null;
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
            put:function(data){
                var putActivity = $http.put('/activities/'+data._id, data);
                putActivity.then(function(success){
                }).catch(function(error){
                    console.log("Failed to save activity: ", error);
                });
            },
            delete:function(activity){
                var deleteActivity = $http.delete('/activities/'+activity._id, {params:{activity_id:activity._id}});
                deleteActivity.then(function(resp){
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

        var vendors = []
        var getVendors = $http.get('/vendors');
        getVendors.then(function(obj){
            angular.forEach(obj.data, function(vendor, $index){
                vendors.push(vendor)
            });
        }).catch(function(err){
            console.log("Failed to load vendors:", err);
        })

        return {
            all:function(){
                return vendors;
            },
            get:function(id){
                for(var i=0;i<vendors.length;i++){
                    if(vendors[i]._id==id){
                        return vendors[i]
                    }
                }
                return null;
            },
            put:function(data){
                var putVendor = $http.put('/vendors/'+data._id, data);
                putVendor.then(function(success){
                }).catch(function(error){
                    console.log("Failed to save activity: ", error);
                });
            },
            post:function(data){
                var postVendor = $http.post('/vendors', data);
                postVendor.then(function(success){
                    vendors.push(data)
                }).catch(function(error){
                    console.log("Failed to save vendor: ", error);
                });
            },
            delete:function(vendor){
                var deleteVendor = $http.delete('/vendors/' + vendor._id);
                deleteVendor.then(function(resp){
                    var index = vendors.indexOf(vendor);
                    if (index != -1) {
                        vendors.splice(index, 1);
                    }
                }).catch(function(error){
                    console.log("Failed to delete vendor: ", error);
                })
            }
        }
    })
    .factory('AppUserService',function($http){

        var appUsers = []
        var getUsers = $http.get('/appUsers');
        getUsers.then(function(obj){
            angular.forEach(obj.data, function(user, $index){
                appUsers.push(user)
            });
            console.log(appUsers)
        }).catch(function(err){
            console.log("Failed to load vendors:", err);
        })

        return {
            all:function(){
                return appUsers;
            },
            get:function(id){
                for(var i=0;i<appUsers.length;i++){
                    if(appUsers[i]._id==id){
                        return appUsers[i]
                    }
                }
                return null;
            }
        }
    })
    .factory('VideoService',function($http,AppUserService,ActivityService,VendorService){

        var videos = []
        var getVideos = $http.get('/videos/all');
        getVideos.then(function(obj){
            angular.forEach(obj.data, function(video, $index){
                video.appUser=AppUserService.get(video.user_id)
                video.activity=ActivityService.get(video.activity_id)
                video.vendor=VendorService.get(video.vendor_id)
                videos.push(video)
            });
            console.log("Video are now: ", videos);
        }).catch(function(err){
            console.log("Failed to load videos:", err);
        })

        return {
            all:function(){
                return videos;
            },
            get:function(id){
                for(var i=0;i<videos.length;i++){
                    if(videos[i]._id==id){
                        return videos[i]
                    }
                }
                return null;
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

            if (user != "" && user!=null && user!=undefined) {
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
    .factory('LoginService',function(){
        function getCookie(cname) {
            var cookie= $.cookie(cname);
            var result;
            if(cookie!=""&& cookie!=null){
                result=JSON.parse($.cookie(cname));
            }
            return result;
        }
        return {
            getUser:function(){
                return getCookie("user");
            }
        }
    })
;