define([], function () {
    var Me = {
        Initialize: function (callback) {
            Apps.LoadTemplateAndStyle('StudyBook', function () {
                if (callback)
                    callback();
            });
        },
        New: function () {
            Apps.Get2('api/StudyBook/New', function (result) {
                if (result.Success) {
                    Apps.Notify('success', 'New StudyBook created!');
                }
            });
        }
    };
    return Me;
});