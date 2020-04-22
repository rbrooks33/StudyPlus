define([], function () {
    var Me = {
        Initialize: function () {
            Apps.LoadTemplateAndStyle('Home', function () {
                Apps.UI.Home.Drop();
            });
        },
        ViewTags: function () {
            Apps.Components.Docs.Tags.Show();
        }
    };
    return Me;
});