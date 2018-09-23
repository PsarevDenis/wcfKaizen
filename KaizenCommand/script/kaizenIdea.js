$(document).ready(function () {

    var commandId = $.cookie('commandId');

    $.getJSON("http://localhost:64378/Service1.svc/GetListGoals?commandId=" + commandId, function (data) {

        console.log(data);
        $.each(data['GetListGoalsResult'], function (key, val) {

            var ideaId = val['GoalId'];
            var wharElim = val['WhatEliminate'];
            var measure = val['Measure'];
            var result = val['Result'];
            var whenGetResult = val['WhenGetResult'];
            var goalText = val['GoalText'];

            var newRow = '<tr><td> <a href="addIdea.html?commandId=' + ideaId + '" class="problem-id">' + ideaId + '</a></td><td>' + goalText + '</td><td>' + measure + '</td><td>' + result + '</td><td>' + whenGetResult +'</td></tr>';

            $('#ideaTable').append(newRow);
        });
    });

    $('#addProblem').on('click', function () {
        location.href = 'addProblem.html';
    });


});