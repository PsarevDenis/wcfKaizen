$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
};

$(document).ready(function () {

    var goalId = $.urlParam('goalId');

    if (goalId !== null) {
        $.getJSON("http://localhost:64378/Service1.svc/GetGoals?goalId=" + goalId, function (data) {
            $.each(data['GetGoalsResult'], function (key, val) {
                switch (key) {
                    case 'WhatEliminate':
                        $('#whatEliminate').val(val);
                        break;
                    case 'Measure':
                        $('#measure').val(val);
                        break;
                    case 'Result':
                        $('#result').val(val);
                        break;
                    case 'WhenGetResult':
                        $('#whenGetResult').val(val);
                        break;
                    case 'GoalText':
                        $('#goalText').val(val);
                        break;
                    
                    default:
                }
            });

        });
    }

    $('#saveIdea').on('click', function () {
        var dataToBeSent = $("form").serializeArray();
        var commandId = localStorage.getItem('commandId');
        dataToBeSent.push({ name: 'commandId', value: commandId });
        dataToBeSent.push({ name: 'goalAchieved', value: false });
        dataToBeSent.push({ name: 'comment', value: '' });
        
        $.post("http://localhost:64378/Service1.svc/SetGoals", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Идея добавлена!");
            }
        });



    });




});