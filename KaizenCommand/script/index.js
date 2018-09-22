function attach_delete() {
    $('.delete').off();
    $('.delete').click(function () {
        $(this).closest('.form-group').remove();
    });
}

var testData = [
    { id: 1, name: 'Проблема', classifier: 'r', prioritizing: 'r', parent: 0 },

];
$(function () {
    org_chart = $('#orgChart').orgChart({
        data: testData,
        showControls: true,
        allowEdit: true,
        onAddNode: function (node) {
            org_chart.newNode(node.data.id);
        },
        onDeleteNode: function (node) {
            org_chart.deleteNode(node.data.id);
        }
    });
});

$(document).ready(function () {
    var count = 1;

    $('.add-one').click(function () {
        var i = count++;
        var de = $('.dynamic-element').first().clone();
        if (de.attr('id') == 'fakt') {
            if (i >= 5) {
                alert("Максимальное число фактов равно 5!");
            }
            else {


                de.attr("id", de.attr('id') + i);
                de.attr("name", de.attr('name') + i);
                de.appendTo('.dynamic-stuff').show();
                attach_delete();
            }
        }
        if (de.attr('id') == 'member') {
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

    $('#checkboxWorked').hide();

    var ckbox = $('#WasWorked');

    $('#WasWorked').on('click', function () {
        if (ckbox.is(':checked')) {
            $('#checkboxWorked').show(1000);
        } else {
            $('#checkboxWorked').hide(1000);
        }
    });

});
