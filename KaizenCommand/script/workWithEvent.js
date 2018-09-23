$(document).ready(function () {

    var commandId = $.cookie('commandId');

    $.getJSON("http://localhost:64378/Service1.svc/GetListEvents?commandId=" + commandId, function (data) {

        console.log(data);
        $.each(data['GetListEventsResult'], function (key, val) {

            var id = val['Id'];
            var KaIzenEvent = val['KaIzenEvent'];
            var Cause = val['Cause'];
            var Implementation = val['Implementation'] === true? 'Да': 'Нет';
            var Responsible = val['Responsible'];
            var PlanDate = val['PlanDate'].replace(/:/g, '').replace('00000', '');
            var FaktDate = val['FaktDate'].replace(/:/g, '').replace('00000', '');
            var Resource = val['Resource'];

            var newRow = '<tr><td> <a href="addEvent.html?commandId=' + id + '" class="problem-id">' + id + '</a></td><td>' + KaIzenEvent + '</td><td>' + Cause + '</td><td>' + Implementation + '</td><td>' + Responsible + '</td><td>' + PlanDate + '</td><td>' + FaktDate + '</td><td>' + Resource +'</td></tr>';

            $('#eventTable').append(newRow);
        });
    });

    $('#addEvent').on('click', function () {
        location.href = 'addEvent.html';
    });


});