$(document).ready(function () {

    var commandId = localStorage.getItem('commandId');

    $.ajaxSetup({
        async: false
    });

    $.getJSON("http://localhost:64378/Service1.svc/GetListProblem?commandId=" + commandId, function (data) {
        $.each(data['GetListProblemResult'], function (key, val) {

            var problemId = val['Id'];
            var problemText = val['ProblemText'];

            var newRow = '<tr><td> <a href="addProblem.html?problemId=' + problemId + '" class="problem-id">' + problemId + '</a></td><td>' + problemText + '</td><td><div style="margin: 15px;"><ol class="rounded">';

            $.getJSON("http://localhost:64378/Service1.svc/GetListRootCauses?problemId=" + problemId, function (data) {
                $.each(data['GetListRootCausesResult'], function (key, val) {
                    var causeId = val['CauseId'];
                    var cause = val['Cause'];
                    
                    newRow += '<li><a href="rootCauses.html?causeId=' + causeId + '&problemId=' + problemId + '">' + cause + '</a></li>';
                        
                });

                newRow += '<li><a href="rootCauses.html?problemId=' + problemId + '">Добавить корневую причину</a></li>';
                
            });

            newRow += '</ol></div></td></tr>';

            $('#problemTable').append(newRow);
        });
    });

    $('#addProblem').on('click', function () {
        location.href = 'addProblem.html';
    });


});