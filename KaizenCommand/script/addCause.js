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

    var problemId = $.urlParam('problemId');
    var causeId = $.urlParam('causeId');

    if (causeId !== null) {
        $.getJSON("http://localhost:64378/Service1.svc/GetRootCauses?idCause=" + causeId, function (data) {
            $.each(data['GetRootCausesResult'], function (key, val) {
                switch (key) {
                    case 'Cause':
                        $('#cause').val(val);
                        break;
                    case 'Classifier':
                        $('#classifier').val(val);
                        break;
                    case 'Prioritizing':
                        $('#prioriti').val(val);
                        break;
                    default:
                }
            });
        });
    }
    else {
        causeId = 0;
    }

    $.getJSON("http://localhost:64378/Service1.svc/GetClassifier", function (data) {
        $.each(data['GetClassifierResult'], function (key, val) {
            $('#classifier')
                .append($("<option></option>")
                    .val(val['Id'])
                    .text(val['Name']));
        });
    });
    
    $('#saveRootCause').on('click', function () {
        var dataToBeSent = $("form").serialize();
        dataToBeSent = dataToBeSent + '&problemId=' + problemId + '&causeId=' + causeId;

        $.post("http://localhost:64378/Service1.svc/SetRootCauses", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Причина добавлена!");
            }
        });

    });

    $('#findRootCause').on('click', function () {
        location.href = 'causesConstructor.html';

    });

    $('#back').on('click', function () {
        location.href = 'problem.html';

    });
});