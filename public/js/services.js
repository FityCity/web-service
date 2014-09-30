'use strict';

/* Services */


// Demonstrate how to register services
angular.module('app.services', [])
    .factory('ActivityService',function(){
        var activities=[{
            "title":"Jumping Jack",
            "url":"https://www.youtube.com/watch?v=p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"easy"
        },{
            "title":"Push Up",
            "url":"https://www.youtube.com/watch?v=naRaVsFn_g4",
            "imgSrc":"",
            "instructions":"How to do push ups?",
            "filter":"normal"
        },{
            "title":"Jumping Jack",
            "url":"https://www.youtube.com/watch?v=p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"easy"
        },{
            "title":"Jumping Jack",
            "url":"https://www.youtube.com/watch?v=p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"easy"
        },{
            "title":"Jumping Jack",
            "url":"https://www.youtube.com/watch?v=p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"easy"
        }
        ]

        return {
            all:function(){
                return activities;
            },
            get:function(id){
                return activities[id];
            }
        }
    })

;