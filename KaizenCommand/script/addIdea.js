$(document).ready(function () {
       
    $('#saveIdea').on('click', function () {
        var dataToBeSent = $("form").serializeArray();
        var commandId = $.cookie('commandId');
        dataToBeSent.push({ name: 'commandId', value: commandId });
        dataToBeSent.push({ name: 'goalAchieved', value: false });
        dataToBeSent.push({ name: 'comment', value: '' });
        
        $.post("http://localhost:64378/Service1.svc/SetGoals", dataToBeSent, function (data, textStatus) {

            if (textStatus === "success") {
                alert("Идея добавлена!");
            }
        });



    });




});