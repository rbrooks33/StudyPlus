define([], function () {
    var Me = {
        Initialize: function () {
            Apps.LoadTemplateAndStyle('Home', function () {
                Apps.UI.Home.Drop();
            });
        },
        ViewTags: function () {
            Apps.Components.Docs.Tags.Show();
        },
        GetWatchtowerDocs: function () {
            let StudyBook = {
                Docs: [],
                Tags: [
                    { TagID: 3 }
                ],
                Span: null,
                TagOperator: 1
            };

            Apps.Post2('/api/Docs/GetStudyBook', JSON.stringify(StudyBook),
                function (result) {

                    if (result.Success) {

                        let watchtowerList = '<table>';
                        $.each(result.Data.Docs, function (index, doc) {
                            watchtowerList += '<tr>';
                            watchtowerList += '  <td>' + doc.DocTitle + '</td>';
                            watchtowerList += '</tr>';
                        });

                        watchtowerList += '</table>';

                        let bookHtml = Apps.Util.GetHTML('templateStudyBook',
                            [
                                'Study Watchtowers',
                                'A personal collection of all my Watchtowers.',
                                watchtowerList
                            ]);

                        $(document.body).append(bookHtml);


                    }
                    else
                        Apps.Notify('warning', 'A problem occurred on the server. Please check out the logs to see what happened.');
                });

        }
    };
    return Me;
});