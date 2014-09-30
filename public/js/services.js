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

;