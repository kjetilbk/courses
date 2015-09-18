angular.module("CourseRank", [])
    .factory('Data', function ($http) {
        return {
            courses : function() {
 	           return $http.get("./courses/Data/FUI.json");
            }
        }
    })
    .controller('CourseController', function(Data) {
        var reference = this;
        var Sorts = {
            COURSE : 0,
            SCORE : 1
        };
        this.courses = [];
        this.bachelor = true;
        this.master = true;

        this.resort = function(clicked){
            if(clicked == Sorts.COURSE){
                reference.sortBy = "course";
                reference.direction = false;
            }
            else{
                reference.sortBy = "score";
                reference.direction = true;
            }
        }

        Data.courses().success(function(data) {
            for(var i = 0; i < data.length; i++){
                var course = data[i];
                course.score = ((152-course.score)/152)*100;
            }
            console.log(data);
            reference.courses = data;
        });
    })
    .filter("isBachelorOrMaster", function() {
        return function(items, bach, master) {
            returnThis = [];
            for(var i = 0; i < items.length; i++){
                var name = items[i].course;
                var isBachelorCourse = name.charAt(3) == '1' || name.charAt(3) == '2' || name.charAt(3) == '3';
                if(isBachelorCourse){
                    console.log(items[i]);
                    if(bach)
                        returnThis.push(items[i]);
                }
                else{
                    if(master)
                        returnThis.push(items[i]);
                }
            }
            return returnThis;
        }
    });