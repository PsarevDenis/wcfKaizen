﻿$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
};

$(document).ready(function () {

    var commandId = $.cookie('commandId');

    var ckbox = $('#implemantation');
    var implemantation = false;

    $('#implemantation').on('click', function () {
        if (ckbox.is(':checked')) {
            implemantation = true;
        } else {
            implemantation = false;
        }
    });

    console.log(commandId);

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
    
    $('#saveEvent').on('click', function () {
        var dataToBeSent = $("form").serializeArray();
        var commandId = $.cookie('commandId');
        dataToBeSent.push({ name: 'commandId', value: commandId });
        dataToBeSent = $.grep(dataToBeSent, function (e) {
            return e.name !== 'implemantation';
        });

        dataToBeSent.push({ name: 'implemantation', value: implemantation });

        console.log(dataToBeSent);

        $.post("http://localhost:64378/Service1.svc/SetEvent", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Мероприятие добавлена!");
            }
        });

    });
});