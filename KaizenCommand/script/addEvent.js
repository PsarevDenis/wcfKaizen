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

    if (eventId !== null) {
        $.getJSON("http://localhost:64378/Service1.svc/GetEvent?eventId=" + eventId, function (data) {
            $.each(data['GetEventResult'], function (key, val) {
                switch (key) {
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

    $.getJSON("http://localhost:64378/Service1.svc/GetListRootCause?commandId=" + commandId, function (data) {
        $.each(data['GetListRootCauseResult'], function (key, val) {
            var causeId = val['CauseId'];
            var cause = val['Cause'];

            $('#rootCauseId')
                .append($("<option></option>")
                    .val(causeId)
                    .text(cause));
        });

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

            dataToBeSent.push({ name: 'implemantation', value: implemantation });
            dataToBeSent.push({ name: 'eventId', value: eventId });
            
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