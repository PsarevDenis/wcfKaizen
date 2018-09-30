$(document).ready(function () {

    var commandId = localStorage.getItem('commandId');

    $.getJSON("http://localhost:64378/Service1.svc/GetKaizenCommand?commandId=" + commandId, function (data) {

        $.each(data['GetKaizenCommandResult'], function (key, val) {

            switch (key) {
                case 'Subject':
                    $('#kaizenCommandName').text(function (index, text) {

                        text = text + val;

                        return text;

                    });
                    break;
                case 'Leader':
                    $('#leader').text(function (index, text) {

                        text = text + val;

                        return text;

                    });
                    break;

                case 'Customer':
                    $('#customer').text(function (index, text) {

                        text = text + val;

                        return text;

                    });
                    break;

                default:
            }

        });

    });

    $.getJSON("http://localhost:64378/Service1.svc/GetKaizenCommandMembers?commandId=" + commandId, function (data) {

        $.each(data['GetKaizenCommandMembersResult'], function (key, val) {
            $('#kaizenCommand').text(function (index, text) {

                text = text + val['Member'] + '; ';

                return text;

            });
        });

    });

    $.getJSON("http://localhost:64378/Service1.svc/GetListProblem?commandId=" + commandId, function (data) {
        var i = 1;
        $.each(data['GetListProblemResult'], function (key, val) {

            
            var problemText = val['ProblemText'];
            

            $('#kaizenCommandProblem').html(function (index, text) {

                text = text + '</br>' + i + ') ' + problemText + '; ' ;

                return text;

            });

            i++;

            $.getJSON("http://localhost:64378/Service1.svc/GetProblem?problemId=" + val['Id'], function (data) {
                var j = 0;

                $.each(data['GetProblemResult'], function (key, val) {
                    switch (key) {
                        
                        case 'Fakt1':
                            if (val !== '') {
                                $('#fakts').html(function (index, text) {

                                    text = text + '</br>' + j + ') ' + val + '; ';

                                    return text;

                                });
                            }
                            
                            break;
                        case 'Fakt2':
                            if (val !== '') {
                                $('#fakts').html(function (index, text) {

                                    text = text + '</br>' + j + ') ' + val + '; ';

                                    return text;

                                });
                            }
                            break;
                        case 'Fakt3':
                            if (val !== '') {
                                $('#fakts').html(function (index, text) {

                                    text = text + '</br>' + j + ') ' + val + '; ';

                                    return text;

                                });
                            }
                            break;
                        case 'Fakt4':
                            if (val !== '') {
                                $('#fakts').html(function (index, text) {

                                    text = text + '</br>' + j + ') ' + val + '; ';

                                    return text;

                                });
                            }
                            break;
                        case 'Fakt5':
                            if (val !== '') {
                                $('#fakts').html(function (index, text) {

                                    text = text + '</br>' + j + ') ' + val + '; ';

                                    return text;

                                });
                            }
                            break;
                        
                        default:
                    }

                    j++;
                });
            });
        });
    });


    $.getJSON("http://localhost:64378/Service1.svc/GetListGoals?commandId=" + commandId + "&rootCauseId=" + 0, function (data) {
        var i = 1;

        $.each(data['GetListGoalsResult'], function (key, val) {

            var goalText = val['GoalText'];
            

            $('#kaizenCommandGoal').html(function (index, text) {

                text = text + '</br>' + i + ') ' + goalText + '; ';

                return text;

            });

            i++;
        });
    });

    $.getJSON("http://localhost:64378/Service1.svc/GetListRootCause?commandId=" + commandId + "&rootCauseId=" + 0, function (data) {
        var i = 1;

        $.each(data['GetListRootCauseResult'], function (key, val) {

            var cause = val['Cause'].trim();
            

            $('#rootCauses').html(function (index, text) {

                text = text + '</br>' + i + ') '+ cause + '; ';

                return text;

            });

            i++;
        });
    });

    $.getJSON("http://localhost:64378/Service1.svc/GetListEvents?commandId=" + commandId, function (data) {

        $.each(data['GetListEventsResult'], function (key, val) {

            var KaIzenEvent = val['KaIzenEvent'];
            var Responsible = val['Responsible'];
            var PlanDate = val['PlanDate'].replace(/:/g, '').replace('00000', '');

            var newRow = '<tr><td>' + KaIzenEvent + '</td><td>' + Responsible + '</td><td>' + PlanDate + '</td></tr>';

            $('#eventTable').append(newRow);
        });
    });
});