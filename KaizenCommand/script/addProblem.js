$(document).ready(function () {

    $('#saveProblem').on('click', function () {
        var dataToBeSent = $("form").serialize();
        var commandId = $.cookie('commandId');
        dataToBeSent = dataToBeSent + '&commandId=' + commandId;

        $.post("http://localhost:64378/Service1.svc/SetProblems", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Проблема добавлена!");
            }
        });

    });

});