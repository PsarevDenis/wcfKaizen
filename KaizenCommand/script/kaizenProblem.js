$(document).ready(function () {

    var commandId = $.cookie('commandId');

    $.getJSON("http://localhost:64378/Service1.svc/GetListProblem?commandId=" + commandId, function (data) {
        $.each(data['GetListProblemResult'], function (key, val) {

            var problemId = val['Id'];
            var problemText = val['ProblemText'];

            $.getJSON("http://localhost:64378/Service1.svc/GetListRootCauses?problemId=" + problemId, function (data) {
                $.each(data['GetListRootCausesResult'], function (key, val) {
                    var causeId = val['CauseId'];
                    var cause = val['Cause'];
                });
            });
        });
    });

    $('#addProblem').on('click', function () {
        location.href = 'addProblem.html';
    });


});