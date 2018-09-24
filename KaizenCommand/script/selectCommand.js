$(document).ready(function () {

    $.getJSON("http://localhost:64378/Service1.svc/GetListKaizenCommand", function (data) {
        $.each(data['GetListKaizenCommandResult'], function (key, val) {

            $('#kaizenCommand')
                .append($("<option></option>")
                    .val(val['Id'])
                    .text(val['CommandName']));
        });
    });

    $('#selectCommand').on('click', function () {
        localStorage.setItem("commandId", $('#kaizenCommand').val());

        switch (localStorage.getItem("workFlag")) {
            case "continueWork":
                location.href = 'kaizenCommand.html';
                break;
            case "seeProblem":
                location.href = 'problem.html';
                break;
            case "workWithEvent":
                location.href = 'workWithEvent.html';
                break;
            case "seeEndCommand":
                location.href = 'anysisKk.html';
                break;
            default:
        }

        
    });


});