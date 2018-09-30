$(document).ready(function () {

    var count = 1;

    $.ajaxSetup({
        async: false
    });
    
    $.getJSON("http://localhost:64378/Service1.svc/GetDepartment", function (data) {
        $.each(data['GetDepartmentResult'], function (key, val) {
            $('#departmentId')
                .append($("<option></option>")
                    .val(val['Id'])
                    .text(val['Name']));
        });
    });

    $.getJSON("http://localhost:64378/Service1.svc/GetCommandType", function (data) {

        $.each(data['GetCommandTypeResult'], function (key, val) {
            $('#commandTypeId')
                .append($("<option></option>")
                    .val(val['Id'])
                    .text(val['Name']));
        });
    });

    var commandId = localStorage.getItem('commandId');
    if (commandId !== 0) {

        $.getJSON("http://localhost:64378/Service1.svc/GetKaizenCommand?commandId=" + commandId, function (data) {

            $.each(data['GetKaizenCommandResult'], function (key, val) {

                switch (key) {
                    case 'CommandName':
                        $('#commandName').val(val);
                        break;
                    case 'DepartmentId':
                        $('#departmentId').val(val);
                        break;
                    case 'Customer':
                        $('#customer').val(val);
                        break;
                    case 'Leader':
                        $('#leader').val(val);
                        break;
                    case 'CommandTypeId':
                        $('#commandTypeId').val(val);
                        break;
                    case 'Subject':
                        $('#subject').val(val);
                        break;
                    default:
                }

            });

        });

        $.getJSON("http://localhost:64378/Service1.svc/GetKaizenCommandMembers?commandId=" + commandId, function (data) {

            var de = $('.dynamic-element').first();
            var i = 0;

            $.each(data['GetKaizenCommandMembersResult'], function (key, val) {
                if (i === 0) {
                    de.val(val['Member']);
                }
                else {
                    var newDe = de.clone();
                    newDe.val(val['Member']);
                    newDe.appendTo('.dynamic-stuff').show();
                }
                i++;
            });

        });

    }
    else {
        commandId = 0;
    }

    $('.add-one').click(function () {
        var i = count++;
        var de = $('.dynamic-element').first().clone();

        if (de.attr('id') === 'member') {
            if (i >= 12) {
                alert("Максимальное число участников команды 12!");
            }
            else {

                de.val("");
                de.attr("id", de.attr('id') + "_" + i);
                de.attr("name", de.attr('name') + "_" + i);
                de.appendTo('.dynamic-stuff').show();
                attach_delete();
            }
        }
    });

    $('#next').on('click', function () {
        location.href = 'problem.html';
    });

    $('#form').validate();

    $('#formSub').on('click', function () {

        if ($("#form").valid()) {  
            var dataToBeSent = $("form").serialize();

            console.log(dataToBeSent);

            $.post("http://localhost:64378/Service1.svc/SetKaizenCommand", dataToBeSent, function (data, textStatus) {

                if (textStatus === "success") {
                    var commandId = $(data).children().html();
                    var n = dataToBeSent.indexOf("member");
                    var res = dataToBeSent.substring(n);
                    dataToBeSent = res + "&commandId=" + commandId;

                    $.post("http://localhost:64378/Service1.svc/SetCommandMembers", dataToBeSent, function (data, textStatus) {
                        if (textStatus === "success") {
                            localStorage.setItem('commandId', commandId);
                            alert("Команда создана!");
                        }
                    });
                }
            });
        }       
        
    });
});