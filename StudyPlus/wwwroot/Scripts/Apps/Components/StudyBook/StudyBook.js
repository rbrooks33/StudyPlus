define([], function () {
    var Me = {
        SelectedBook: null,
        Initialize: function (callback) {
            //Apps.LoadTemplate('StudyBook')
            //Apps.LoadTemplateAndStyle('StudyBook', function () {

            //    Apps.UI.StudyBook.Drop();
            //    Apps.UI.StudyBook.Show();

            //});

            Me.UI.Templates.templateBook.Show();
                if (callback)
                    callback();
        },
        New: function () {
            Apps.Get2('api/StudyBook/New', function (result) {
                if (result.Success) {
                    Apps.Notify('success', 'New StudyBook created!');
                }
                else
                    Apps.Notify('warn', 'Problem!');
            });
        },
        List: function () {
            Apps.Get2('api/StudyBook/List', function (result) {
                if (result.Success) {

                    $('.Index_StudyBookList').empty();

                    let books = result.Data;
                    $.each(books, function (index, book) {

                        let bookTitle = 'No Title Yet';

                        if (book.Title)
                            bookTitle = book.Title;

                        let bookButton = '<div onclick="Apps.Components.StudyBook.Open(' + book.ID + ');" id="book_' + book.ID + '" class="btn btn-primary">' + bookTitle + '</div>';

                        $('.Index_StudyBookList').append(bookButton);

                        if (book.Pinned)
                            Me.Open(book.ID);
                    });
                }
                else
                    Apps.Notify('warn', 'List problem!');
            });
        },
        Open: function (bookId, callback) {

            //Create dialog
            Apps.AppDialogs.Register(Me, 'EditBookDialog_' + bookId, {
                title: 'Edit',
                size: 'default',
                templateid: 'templateMyDialog1',
                buttons: [
                    {
                        id: 'EditBookDialogSave_' + bookId,
                        text: 'Save',
                        action: 'Apps.Components.StudyBook.EditSave(' + bookId + ');'
                    },
                    {
                        id: 'EditBookDialogCancel_' + bookId,
                        text: 'Cancel',
                        action: 'Apps.Components.Dialogs.Close(\'EditBookDialog_' + bookId + '\');'
                    }
                ]
            });

            Apps.Get2('api/StudyBook/Book?bookId=' + bookId, function (result) {

                if (result.Success) {

                    if (result.Data.length === 1) //Should be an array of one book
                    {
                        let book = result.Data[0];

                        $('#BookViewer_' + book.ID).detach();

                        let bookHtml = Me.UI.Templates.templateBook.HTML([book.ID, book.Title, book.SubTitle]);

                        $(document.body).append(bookHtml);

                        $('#BookViewer_BookString_' + book.ID).text(escape(JSON.stringify(book)));

                        //Position header
                        let viewerDiv = $('#BookViewer_' + bookId);

                        viewerDiv.css('top', book.Y + 'px');
                        viewerDiv.css('left', book.X + 'px');
                        viewerDiv.css('width', book.Width + 'px');
                        viewerDiv.css('height', book.Height + 'px');

                        let headerDiv = $('#BookViewer_Header_' + bookId);
                        let thumbTack = $('#BookViewer_Thumbtack_' + bookId);

                        headerDiv
                            .css('background-color', 'rgb(52, 152, 219)')
                            .css('display', 'none')
                            .css('position', 'absolute')
                            .css('left', '0px')
                            .css('top', '0px')
                            .css('width', '100%')
                            .css('height', '15px');

                        
                        viewerDiv.off('mouseover mouseout').on('mouseover mouseout', function (event) {

                            if (event.type === 'mouseover') {
                                headerDiv.show();
                            }
                            else if (event.type === 'mouseout') {
                                headerDiv.hide();
                            }


                        });

                        thumbTack.css('opacity', book.Pinned ? 1 : .4);

                        if (callback)
                            callback();
                    }
                    else
                        Apps.Notify('warning', 'Result was not a single book.');
                }
                else
                    Apps.Notify('warning', 'Book not found.');
            });

        },
        Edit: function (bookId, fieldName) {

            let bookString = $('#BookViewer_BookString_' + bookId).text();
            let book = JSON.parse(unescape(bookString));

            let editHtml = Apps.Util.GetHTML('templateEditHtml', [bookId, book[fieldName]]);
            Apps.Components.Dialogs.Content('EditBookDialog_' + bookId, editHtml);
            Apps.Components.Dialogs.Open('EditBookDialog_' + bookId);

            //Append field name
            $('#BookViewer_' + bookId).append('<div id="BookViewer_FieldName_' + bookId + '" style="display:none;">' + fieldName + '</div>');
        },
        EditCancel: function () {
            Apps.Components.Dialogs.Close('EditTextDialog');
        },
        EditSave: function (bookId) {

            let fieldName = $('#BookViewer_FieldName_' + bookId).text();
            let bookString = $('#BookViewer_BookString_' + bookId).text();
            let bookText = $('#BookViewer_EditTextArea_' + bookId).val();
            let book = JSON.parse(unescape(bookString));

            book[fieldName] = bookText;

            Apps.Post2('api/StudyBook/SaveBook', JSON.stringify(book),  function (result) {

                if (result.Success) {
                    Apps.Notify('success', 'Book saved!');
                    Apps.Components.Dialogs.Close('EditBookDialog_' + bookId);

                    Me.Open(bookId, function () {
                        Me.List();
                    });
                }
                else
                    Apps.Notify('warning', 'For some reason book save failed.');
            });
        },
        EditBook: function (bookId, fieldName) {
            $('#BookViewer_' + bookId).append('<div id="BookViewer_FieldName_' + bookId + '" style="display:none;">' + fieldName + '</div>');
        },
        SaveBookField: function (bookId, fieldName, fieldValue) {
            
            let bookString = $('#BookViewer_BookString_' + bookId).text();
            let book = JSON.parse(unescape(bookString));

            book[fieldName] = fieldValue;

            Apps.Post2('api/StudyBook/SaveBook', JSON.stringify(book), function (result) {

                if (result.Success) {
                    //Apps.Notify('success', 'Book saved!');
                    //Save new values to object
                    let savedBook = result.Data;
                    $('#BookViewer_BookString_' + book.ID).text(escape(JSON.stringify(savedBook)));
                }
                else
                    Apps.Notify('warning', 'For some reason book save failed.');
            });
        },
        SaveBook: function (book) {

            Apps.Post2('api/StudyBook/SaveBook', JSON.stringify(book), function (result) {

                if (result.Success) {
                    //Apps.Notify('success', 'Book saved!');
                    //Save new values to object
                    let savedBook = result.Data;
                    $('#BookViewer_BookString_' + book.ID).text(escape(JSON.stringify(savedBook)));
                }
                else
                    Apps.Notify('warning', 'For some reason book save failed.');
            });
        },
        Pin: function (bookId) {

            let thumbTack = $('#BookViewer_Thumbtack_' + bookId);

            if (thumbTack.css('opacity') === '0.4') {
                thumbTack.css('opacity', 1);
                Me.SaveBookField(bookId, 'Pinned', true);
            }
            else {
                thumbTack.css('opacity', .4);
                Me.SaveBookField(bookId, 'Pinned', false);
            }
        },
        SavePosition: function (bookId) {

            Me.SaveBook(Me.SelectedBook);
            $('#BookViewer_MoveArrows_' + bookId).hide();
        },
        Select: function (bookId) {

            let bookString = $('#BookViewer_BookString_' + bookId).text();
            Me.SelectedBook = JSON.parse(unescape(bookString));

            //MOVE
            $(document).on('keyup', function (event) {

                if (Me.SelectedBook) {

                    $('#BookViewer_MoveArrows_' + bookId).show(); //Save position

                    var bookDiv = $('#BookViewer_' + Me.SelectedBook.ID);

                    let left = bookDiv.position().left;
                    let top = bookDiv.position().top;
                    let width = parseFloat(bookDiv.css('width').replace('px',''));
                    let height = parseFloat(bookDiv.css('height').replace('px',''));

                    //right: 39, left: 37, top: 38, bottom: 40
                    //Apps.Notify('info', 'which: ' + event.which + '. code: ' + event.keyCode);

                    if (event.altKey) {
                        //Size
                        switch (event.which) {

                            case 37: //width

                                width = width - 5;
                                break;

                            case 38: //height

                                height = height - 5;
                                break;

                            case 39: //width

                                width = width + 5;
                                break;

                            case 40: //height

                                height = height + 5;
                                break;
                        }
                        bookDiv.css('width', width + 'px');
                        bookDiv.css('height', height + 'px');
                        Me.SelectedBook.Width = width;
                        Me.SelectedBook.Height = height;
                    }
                    else {
                        //Position
                        switch (event.which) {

                            case 37: //left

                                left = left - 5;
                                break;

                            case 38: //top

                                top = top - 5;
                                break;

                            case 39: //right

                                left = left + 5;
                                break;

                            case 40: //bottom

                                top = top + 5;
                                break;
                        }
                        bookDiv.css('left', left + 'px');
                        bookDiv.css('top', top + 'px');
                        Me.SelectedBook.X = left;
                        Me.SelectedBook.Y = top;
                    }
                }
            });

        },
        Event: function (sender, args) {
            switch (sender) {
                case 'edit':

                    switch (args) {
                        case 'title':

                            let editTextHtml = Apps.Util.GetHTML('templateBookEditText');


                            break;
                    }

                    break;
            }
        }
    };
    return Me;
});