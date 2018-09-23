$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
};



function attach_delete() {
    $('.delete').off();
    $('.delete').click(function () {
        $(this).closest('.form-group').remove();
    });
}

$(document).ready(function () {

    var problemId = $.urlParam('problemId');

    var testData = [
        { id: 1, name: 'Проблема', classifier: '1', prioritizing: '10', parent: 0 }

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

    $('#saveRootCause').on('click', function () {

        var data = org_chart.getData();

        jQuery.each(data, function (index, value) {
            var dataToBeSent = $('#rootCauses').serializeArray();
            dataToBeSent.push({ name: 'cause', value: value.name });
            dataToBeSent.push({ name: 'classifier', value: value.classifier });
            dataToBeSent.push({ name: 'prioriti', value: value.prioritizing });
            dataToBeSent.push({ name: 'problemId', value: problemId });
            
            $.post("http://localhost:64378/Service1.svc/SetRootCauses", dataToBeSent, function (data, textStatus) {
                if (textStatus === "success") {
                    alert("Причина добавлена!");
                }
            });
        });
    });


});