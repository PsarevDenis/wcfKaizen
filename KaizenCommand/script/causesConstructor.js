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

    $.getJSON("http://localhost:64378/Service1.svc/GetClassifier", function (data) {
        $.each(data['GetClassifierResult'], function (key, val) {
            $('#classifier')
                .append($("<option></option>")
                    .val(val['Id'])
                    .text(val['Name']));
        });
    });

    $('#saveRootCaus').on('click', function () {
        var dataToBeSent = $("form").serialize();
        dataToBeSent = dataToBeSent + '&problemId=' + problemId;

        $.post("http://localhost:64378/Service1.svc/SetRootCauses", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Причина добавлена!");
            }
        });

    });


});