define([], function () {
    var Me = {
        Initialize: function (callback) {

                //Me.UI.Drop();

                Me.Resize();
                $(window).resize(function () {
                    Me.Resize();
                });

                if (callback)
                    callback();
        },
        Show: function () {

            Me.Initialize(function () {

                $('.LoginContentStyle').animate({ opacity: 1 }, 1000, 'swing', function () {

                    $('#Login_WelcomeTo').animate({ opacity: 1 }, 400, 'swing', function () {

                        $('#Login_KeepOnWorking').animate({ opacity: 1 }, 2000, 'swing', function () {

                            Me.ShowElement('Login_DelegationMadeEasy', 1500, function () {

                                Me.HideElement('Login_DelegationMadeEasy', 1500, function () {

                                    $('#Login_WelcomeTo').animate({ opacity: 0, left: '-150px', top: '-100px' }, 400, 'swing', function () {
                                        $('#Login_WelcomeTo').css('display', 'none');
                                    });

                                    $('#Login_KeepOnWorking')
                                        .css('position', 'absolute')
                                        .animate({ left: '-=100px', top: '-=250px' }, 400, 'swing', function () {
                                            Me.Resize();
                                            //Me.ShowDocs();
                                        });
                                });
                            });
                        });
                    });
                });
            });
        },
        ShowElement: function (elementId, speed, callback) {

            $('#' + elementId).animate({ opacity: 1 }, speed, 'swing', function () {
                if (callback)
                    callback();
            });
        },
        HideElement: function (elementId, speed, callback) {

            $('#' + elementId).animate({ opacity: 0 }, speed, 'swing', function () {
                if (callback)
                    callback();
            });
        },
        Hide: function () {
            Apps.UI.Login.Hide();
        },
        Reload: function () {
            location.reload();
        },
        Resize: function () {
            //$('#Login_WelcomeTo').css('left', '20px').css('top', '20px');
        },
        ShowDocs: function () {
            $('.StudyWatchtowers').show(400);
        },
        Event: function (sender, args, callback) {

        }
    };
    return Me;
});