'use strict';

/* Services */


// Demonstrate how to register services
angular.module('app.services', [])
    .factory('ActivityService',function(){
        var activities=[{
            "title":"Jumping Jack",
            "uri":"p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"easy"
        },{
            "title":"Push Up",
            "uri":"naRaVsFn_g4",
            "imgSrc":"",
            "instructions":"How to do push ups?",
            "filter":"normal"
        },{
            "title":"Jumping Jack",
            "uri":"p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"normal"
        },{
            "title":"Push Up",
            "uri":"naRaVsFn_g4",
            "imgSrc":"",
            "instructions":"How to do push ups?",
            "filter":"normal"
        },{
            "title":"Jumping Jack",
            "uri":"p64YlMRIDVM",
            "imgSrc":"",
            "instructions":"How to do jumping jack?",
            "filter":"normal"
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