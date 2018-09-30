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

    if (problemId !== null) {

        $.getJSON("http://localhost:64378/Service1.svc/GetProblem?problemId=" + problemId, function (data) {
            $.each(data['GetProblemResult'], function (key, val) {
                switch (key) {
                    case 'ProblemText':
                        $('#problemText').val(val);
                        break;
                    case 'WhatHappen':
                        $('#whatHappen').val(val);
                        break;
                    case 'WhereHappen':
                        $('#whereHappen').val(val);
                        break;
                    case 'WhenHappen':
                        $('#whenHappen').val(val);
                        break;
                    case 'HowOften':
                        $('#howOften').val(val);
                        break;
                    case 'HowDoYouKnow':
                        $('#howDoYouKnow').val(val);
                        break;
                    case 'WhyImportant':
                        $('#whyImportant').val(val);
                        break;
                    case 'WasWorked':
                        var ckbox = $('#wasWarked');
                        if (val === true) {
                            ckbox.attr('checked', val);
                            $('#checkboxWorked').show(1000);
                        }
                        else {
                            ckbox.attr('checked', val);
                            $('#checkboxWorked').hide(1000);
                        }
                        break;
                    case 'Effect':
                        $('#effect').val(val);
                        break;
                    case 'Fakt1':
                        $('#fakt').val(val);
                        break;
                    case 'Fakt2':
                        $('#fakt1').val(val);
                        break;
                    case 'Fakt3':
                        $('#fakt2').val(val);
                        break;
                    case 'Fakt4':
                        $('#fakt3').val(val);
                        break;
                    case 'Fakt5':
                        $('#fakt4').val(val);
                        break;
                    case 'HowSolvelem':
                        $('#howSolveProblem').val(val);
                        break;
                    case 'WhatIdeasIdWorked':
                        $('#whatIdeasIdWorked').val(val);
                        break;
                    case 'WhyIdeasNotImplemanted':
                        $('#whyIdeasNotImplemanted').val(val);
                        break;
                    default:
                }
            });
        });
    }
    else {

        problemId = 0;
    }

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

    $('#back').on('click', function () {
        location.href = 'problem.html';
    });

    $('#form').validate();

    $('#saveProblem').on('click', function () {
        if ($("#form").valid()) {
            var dataToBeSent = $("form").serializeArray();
            var commandId = localStorage.getItem('commandId');
            dataToBeSent.push({ name: 'commandId', value: commandId });
            dataToBeSent = $.grep(dataToBeSent, function (e) {
                return e.name !== 'wasWarked';
            });

            dataToBeSent.push({ name: 'wasWarked', value: wasWark });
            dataToBeSent.push({ name: 'problemId', value: problemId });


            $.post("http://localhost:64378/Service1.svc/SetProblems", dataToBeSent, function (data, textStatus) {

                if (textStatus === "success") {
                    alert("Проблема добавлена!");
                }
            });

        }

    });


    

});