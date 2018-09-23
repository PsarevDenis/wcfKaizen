$(document).ready(function () {
    var count = 1;

    $('.add-one').click(function () {
        var i = count++;
        var de = $('.dynamic-element').first().clone();
        if (de.attr('id') === 'fakt') {
            if (i >= 5) {
                alert("Максимальное число фактов равно 5!");
            }
            else {

                de.val("");
                de.attr("id", de.attr('id') + i);
                de.attr("name", de.attr('name') + i);
                de.appendTo('.dynamic-stuff').show();
                attach_delete();
            }
        }
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


});
