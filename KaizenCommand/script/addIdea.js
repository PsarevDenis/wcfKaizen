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
    var commandId = localStorage.getItem('commandId');

    $.ajaxSetup({
        async: false
    });

    $.getJSON("http://localhost:64378/Service1.svc/GetListProblem?commandId=" + commandId, function (data) {
        var i = 0;
        $.each(data['GetListProblemResult'], function (key, val) {
            var problemId = val['Id'];
            var problemText = val['ProblemText'].substring(0, 100) + ' ...';

            $('#problemId')
                .append($("<option></option>")
                    .val(problemId)
                    .text(problemText));

            if (i === 0) {

                $.getJSON("http://localhost:64378/Service1.svc/GetListRootCauses?problemId=" + problemId, function (data) {

                    $.each(data['GetListRootCausesResult'], function (key, val) {

                        var causeId = val['CauseId'];
                        var cause = val['Cause'];

                        $('#rootCauseId')
                            .append($("<option></option>")
                                .val(causeId)
                                .text(cause));


                    });

                });
            }
            else {
                return false;
            }

            i++;
           
        });

    });

    $('#problemId').on('change', function () {

        $('#rootCauseId').find('option').remove();

        $.getJSON("http://localhost:64378/Service1.svc/GetListRootCauses?problemId=" + this.value, function (data) {
            $.each(data['GetListRootCausesResult'], function (key, val) {
                var causeId = val['CauseId'];
                var cause = val['Cause'];

                $('#rootCauseId')
                    .append($("<option></option>")
                        .val(causeId)
                        .text(cause));
            });

        });
    });

    if (goalId !== null) {
        $.getJSON("http://localhost:64378/Service1.svc/GetGoals?goalId=" + goalId, function (data) {
            $.each(data['GetGoalsResult'], function (key, val) {
                switch (key) {
                    case 'ProblemId':
                        $('#problemId').val(val);
                        break;
                    case 'RootCause':
                        $('#rootCauseId').val(val);
                        break;
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
    else {
        goalId = 0;
    }

    


    


    $('#form').validate();

    $('#saveIdea').on('click', function () {
        if ($("#form").valid()) {
            var dataToBeSent = $("form").serializeArray();

            dataToBeSent = $.grep(dataToBeSent, function (e) {
                return e.name !== 'problemId';
            });
            
            dataToBeSent.push({ name: 'commandId', value: commandId });
            dataToBeSent.push({ name: 'goalAchieved', value: false });
            dataToBeSent.push({ name: 'comment', value: '' });
            dataToBeSent.push({ name: 'goalId', value: goalId });

            $.post("http://localhost:64378/Service1.svc/SetGoals", dataToBeSent, function (data, textStatus) {

                if (textStatus === "success") {
                    alert("Идея добавлена!");
                }
            });
        }
    });

    $('#back').on('click', function () {
        location.href = 'kaizenIdea.html';
    });

});