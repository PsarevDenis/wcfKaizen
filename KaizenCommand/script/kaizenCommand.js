$(document).ready(function () {

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

    $('#formSub').on('click', function () {
        var dataToBeSent = $("form").serialize();

        $.post("http://localhost:64378/Service1.svc/SetKaizenCommand", dataToBeSent, function (data, textStatus) {
            
            if (textStatus === "success") {
                var commandId = $(data).children().html();
                var n = dataToBeSent.indexOf("member");
                var res = dataToBeSent.substring(n);
                dataToBeSent = res + "&commandId=" + commandId;
                                
                $.post("http://localhost:64378/Service1.svc/SetCommandMembers", dataToBeSent, function (data, textStatus) {
                    if (textStatus === "success") {
                        $.cookie('commandId', commandId, {
                            expires: 5
                        });
                        alert("Команда создана!");
                    }
                });
            }
        });
        
    });
});