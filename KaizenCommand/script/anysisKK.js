$(document).ready(function () {

    var commandId = localStorage.getItem('commandId');

    $('#report').on('click', function () {
        location.href = 'ReportKK.html';
    });

    $('#endKk').on('click', function () {
        localStorage.setItem('commandId', 0);
        location.href = 'index.html';
    });
});