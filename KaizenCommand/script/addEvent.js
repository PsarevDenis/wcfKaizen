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

    var commandId = localStorage.getItem('commandId');
    var eventId = $.urlParam('eventId');

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
        $('#goalId').find('option').remove();

        $.getJSON("http://localhost:64378/Service1.svc/GetListRootCauses?problemId=" + this.value, function (data) {
            $.each(data['GetListRootCausesResult'], function (key, val) {
                var causeId = val['CauseId'];
                var cause = val['Cause'];

                $('#rootCauseId')
                    .append($("<option></option>")
                        .val(causeId)
                        .text(cause));

                $.getJSON("http://localhost:64378/Service1.svc/GetListGoals?commandId=" + commandId + "&rootCauseId=" + causeId, function (data) {
                    $.each(data['GetListGoalsResult'], function (key, val) {

                        console.log(val);
                        var goalId = val['GoalId'];
                        var goalText = val['GoalText'];

                        $('#goalId')
                            .append($("<option></option>")
                                .val(goalId)
                                .text(goalText));
                    });

                });
            });

        });
    });

    $('#rootCauseId').on('change', function () {


        $('#goalId').find('option').remove();

        var rootCauseId = this.value;
        $.getJSON("http://localhost:64378/Service1.svc/GetListGoals?commandId=" + commandId + "&rootCauseId=" + rootCauseId, function (data) {
            $.each(data['GetListGoalsResult'], function (key, val) {

                console.log(val);
                var goalId = val['GoalId'];
                var goalText = val['GoalText'];

                $('#goalId')
                    .append($("<option></option>")
                        .val(goalId)
                        .text(goalText));
            });

        });
    });

    if (eventId !== null) {
        $.getJSON("http://localhost:64378/Service1.svc/GetEvent?eventId=" + eventId, function (data) {
            $.each(data['GetEventResult'], function (key, val) {
                switch (key) {
                    case 'ProblemId':
                        $('#problemId').val(val);
                        break;
                    case 'CauseId':
                        $('#rootCauseId').val(val);

                        $('#goalId').find('option').remove();

                        
                        $.getJSON("http://localhost:64378/Service1.svc/GetListGoals?commandId=" + commandId + "&rootCauseId=" + val, function (data) {
                            $.each(data['GetListGoalsResult'], function (key, val) {

                                console.log(val);
                                var goalId = val['GoalId'];
                                var goalText = val['GoalText'];

                                $('#goalId')
                                    .append($("<option></option>")
                                        .val(goalId)
                                        .text(goalText));
                            });

                        });
                        break;
                    case 'KaizenGoal':
                        $('#goalId').val(val);
                        break;
                    case 'KaIzenEvent':
                        $('#kaizenEvent').val(val);
                        break;
                    case 'Cause':
                        $('#rootCauseId').val(val);
                        break;
                    case 'Implementation':
                        var ckbox = $('#implemantation');
                        ckbox.attr('checked', val);
                        break;
                    case 'Responsible':
                        $('#responsible').val(val);
                        break;
                    case 'PlanDate':
                        $('#planDate').val(val.replace(/:/g, '').replace('00000', ''));
                        break;
                    case 'FaktDate':
                        $('#faktDate').val(val.replace(/:/g, '').replace('00000', ''));
                        break;
                    case 'Resource':
                        $('#resource').val(val);
                        break;
                    default:
                }
            });

        });
    }
    else {
        eventId = 0;
    }

    var ckbox = $('#implemantation');
    var implemantation = false;

    $('#implemantation').on('click', function () {
        if (ckbox.is(':checked')) {
            implemantation = true;
        } else {
            implemantation = false;
        }
    });


    $.datepicker.setDefaults($.datepicker.regional["ru"]);

    $('#planDate').datepicker({
        dateFormat: 'dd-mm-yy',
        altFormat: 'yy-mm-dd'
    });

    $('#faktDate').datepicker({
        dateFormat: 'dd-mm-yy',
        altFormat: 'yy-mm-dd'
    });
    
    $('#form').validate();
    
    $('#saveEvent').on('click', function () {
        if ($("#form").valid()) {

            var dataToBeSent = $("form").serializeArray();
            dataToBeSent.push({ name: 'commandId', value: commandId });
            dataToBeSent = $.grep(dataToBeSent, function (e) {
                return e.name !== 'implemantation';
            });

            dataToBeSent = $.grep(dataToBeSent, function (e) {
                return e.name !== 'problemId';
            });

            dataToBeSent.push({ name: 'implemantation', value: implemantation });
            dataToBeSent.push({ name: 'eventId', value: eventId });

            console.log(dataToBeSent);
            
            $.post("http://localhost:64378/Service1.svc/SetEvent", dataToBeSent, function (data, textStatus) {

                if (textStatus === "success") {
                    alert("Мероприятие добавлена!");
                }
            });

        }
        

    });

    $('#back').on('click', function () {
        location.href = 'workWithEvent.html';

    });
});