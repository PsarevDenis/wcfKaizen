$(document).ready(function () {

    $('#checkboxWorked').hide();

    var ckbox = $('#wasWarked');
    var wasWark = false;

    $('#wasWarked').on('click', function () {
        if (ckbox.is(':checked')) {
            wasWark = true;
            $('#checkboxWorked').show(1000);
        } else {
            wasWark = false;
            $('#checkboxWorked').hide(1000);
        }
    });

    $('#saveProblem').on('click', function () {
        var dataToBeSent = $("form").serializeArray();
        var commandId = $.cookie('commandId');
        dataToBeSent.push({ name: 'commandId', value: commandId });
        dataToBeSent = $.grep(dataToBeSent, function (e) {
            return e.name !== 'wasWarked';
        });

        dataToBeSent.push({ name: 'wasWarked', value: wasWark });

        $.post("http://localhost:64378/Service1.svc/SetProblems", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Проблема добавлена!");
            }
        });



    });


    

});