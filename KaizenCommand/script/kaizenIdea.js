$(document).ready(function () {

    var commandId = localStorage.getItem('commandId');

    $.getJSON("http://localhost:64378/Service1.svc/GetListGoals?commandId=" + commandId + "&rootCauseId=" + 0, function (data) {

        
        $.each(data['GetListGoalsResult'], function (key, val) {

            var ideaId = val['GoalId'];
            var cause = val['Cause'];
            var wharElim = val['WhatEliminate'];
            var measure = val['Measure'];
            var result = val['Result'];
            var whenGetResult = val['WhenGetResult'];
            var goalText = val['GoalText'];

            var newRow = '<tr><td> <a href="addIdea.html?goalId=' + ideaId + '" class="problem-id">' + ideaId + '</a></td><td>' + cause + '</td><td>' + goalText + '</td><td>' + measure + '</td><td>' + result + '</td><td>' + whenGetResult +'</td></tr>';

            $('#ideaTable').append(newRow);
        });
    });

    $('#addIdea').on('click', function () {
        location.href = 'addIdea.html';
    });

    $('#next').on('click', function () {
        location.href = 'workWithEvent.html';
    });


});