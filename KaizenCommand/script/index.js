$(document).ready(function () {

    localStorage.setItem("commandId", 0);

    $('#beginWork').on('click', function () {
        location.href = 'kaizenCommand.html';
    });
    $('#continueWork').on('click', function () {
        localStorage.setItem("workFlag", "continueWork");
        location.href = 'SelectKaizenCommand.html';
    });
    $('#seeProblem').on('click', function () {
        localStorage.setItem("workFlag", "seeProblem");
        location.href = 'SelectKaizenCommand.html';
    });
    $('#workWithEvent').on('click', function () {
        localStorage.setItem("workFlag", "workWithEvent");
        location.href = 'SelectKaizenCommand.html';
    });
    $('#seeEndCommand').on('click', function () {
        localStorage.setItem("workFlag", "seeEndCommand");
        location.href = 'SelectKaizenCommand.html';
    });
});
