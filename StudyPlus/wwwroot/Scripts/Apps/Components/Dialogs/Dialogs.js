define([], function () {
    var Me = {
        Dialogs: [],
        OpenCallback: null,
        CloseCallback: null,
        SaveCallback: function (obj, id) {
            if (obj)
                obj(id);
        },
        CancelCallback: function (obj, id) {
            if (obj)
                obj(id);
        },
        MouseOverCallback: null,
        MouseOutCallback: null,
        ClickCallback: null,
        Initialize: function (callback) {
            Apps.LoadTemplate('Dialogs', '/Scripts/Apps/Components/Dialogs/Dialogs.html', function () {
                Apps.LoadStyle('/Scripts/Apps/Components/Dialogs/Dialogs.css');
                Apps.UI.Dialogs.Drop();
                if (callback)
                    callback();
            });

            //Dialog Setup



            //Dialog show and hide



            // Dynamic Title - Change Title on the fly



            // Dialog width and height calculation



            //Dialog type selector



            // Dialog Notifications Setup
            // Dialog Notifications Behavior Handling

        },
        Register: function (id, settings) {
            var exists = Me.Exists(id);
            if (!exists.Success) {

                var height = "100%"; //Left blank grows with content
                var width = 400;
                var titlecolor = "blue";
                var titletext = "My Dialog Box";
                var saveclick = function (id) { };
                var cancelclick = function (id) { };
                var customcontent = "my content";
                var style = "";
                var buttonHtml = '';

                if (settings) {
                    if (settings.height)
                        height = settings.height + "px";
                    width = settings.width;
                    titlecolor = settings.title.color;
                    titletext = settings.title.text;

                    if (settings.saveclick)
                        saveclick = settings.saveclick;

                    if (settings.cancelclick)
                        cancelclick = settings.cancelclick;

                    if (settings.style)
                        style = settings.style;

                    if (settings.buttons) {
                        $.each(settings.buttons, function (index, button) {
                            if (button) {
                                buttonHtml += '<div class="btn btn-success" onclick="' + button.action + '">' + button.text + '</div>';
                            }
                        });
                    }
                    customcontent = settings.content;
                }

                var newDialog = new Me.DialogModel(id, settings.templateid,settings.title,settings.size,settings.cancelclick, settings.saveclick, buttonHtml);
                //Me.Opened = false;

                var attributes = " id='" + id + "'";
                attributes += " style='display:none;" + style + "'";

                if (settings.container)
                    settings.container.append("<div" + attributes + "></div>");
                else
                    $(document.body).append("<div" + attributes + "></div>");

                newDialog.Selector = $("#" + id);

                Me.Dialogs.push(newDialog);


                var content = Apps.Util.GetHTML(settings.templateid);
                //content += '<div id="div_' + id + '_Dialog" draggable="true" ondragstart = "Apps.Dialogs.DragStart(\'' + id + '\', event);" style="overflow:auto;position:relative;z-index:999999;background:white;border:1px solid black; height: ' + height + '; width: ' + width + 'px;">';
                //content += '';
                //content += '<div id="' + id + '_Title"';
                //content += 'style="font-size: larger;display: inline-block; height: 45px; width: ' + (width - 2) + 'px; background-color: ' + titlecolor + '; color: white; padding: 11px;">' + titletext + '</div>';
                //content += '';
                //content += '<div style="display: inline; position: relative; top: -38px; left: -6px; float: right; z-index: 200;">';
                //content += '<input type="button" class="btn btn-default btn-sm" value="X" onclick="Apps.Dialogs.CancelCallback(' + cancelclick.toString() + ',\'' + id + '\');" />';
                //content += '</div>';
                //content += '<div id="' + id + '_Content" style="padding:21px;">';
                //content += '';
                //content += customcontent;
                //content += '';
                //content += '</div>';
                //content += '<div style="display: inline; position: relative; top: -8px; left: 21px; z-index: 200;">';
                //content += '<input type="button" id="' + id + '_DialogsButton" value="OK" class="btn btn-default btn-sm" onclick="Apps.Dialogs.SaveCallback(' + saveclick.toString() + ',\'' + id + '\');" />';
                //content += '</div>';
                //content += '';
                //content += '</div>';

                newDialog.Selector.html(content);
            }

        },
        Exists: function (elementId) {

            var result = new Me.Result();

            if ($("#" + elementId) !== null) {
                var existsInCollection = Me.ExistsInCollection(elementId);
                if (existsInCollection.Success)
                    result.Success = true;
                else
                    result.Message = existsInCollection.Message;
            }

            return result;
        },
        ExistsInCollection: function (elementId) {

            var result = new Me.Result();

            var existingDialog = Enumerable.From(Me.Dialogs).Where(function (d) { return d.ElementID === elementId; }).ToArray();
            if (existingDialog.length === 1) {
                result.Success = true;
            }
            else if (existingDialog.length === 0)
                result.Message = 'Element "' + elementId + '" is not in Dialogs collection.';
            else if (existingDialog.length > 1)
                result.Message = 'Element "' + elementId + '" has more than one entry (' + existingDialog.length + ') in Dialogs collection.';

            return result;
        },
        Result: function () {
            return {
                Success: false,
                Message: '',
                Dialog: null
            };
        },
        DialogModel: function (newid, templateid, title, size, cancelclick, saveclick, buttonHtml) {

            var result = {
                TemplateID: templateid,
                ElementID: newid,
                Selector: null,
                Width: '400px',
                Height: '200px',
                Title: title,
                Size: size,
                CancelClick: cancelclick,
                SaveClick: saveclick,
                ButtonHTML: buttonHtml,
                X: null,
                Y: null,
                Opened: false
            };
            return result;
        },
        Content: function (id, content) {
            var dialogs = Enumerable.From(Me.Dialogs)
                .Where(function (d) { return d.ElementID === id; }).ToArray();

            if (dialogs.length === 1) {

                var dialog = dialogs[0];

                let html = Apps.Util.GetHTML(dialog.TemplateID, [content, dialog.Title, dialog.ElementID, dialog.Size, dialog.CancelClick, dialog.SaveClick, dialog.ButtonHTML]);

                dialog.Selector.html(html);
            }
            //Apps.$("#" + id).find("#" + id + "_Content").html(content);
        },
        Open: function (elementId, x, y) {

            var dialogs = Enumerable.From(Me.Dialogs)
                .Where(function (d) { return d.ElementID === elementId; }).ToArray();

            if (dialogs.length === 1) {

                var dialog = dialogs[0];
                dialog.X = x;
                dialog.Y = y; //set for later refrence/use

                if (dialog.Opened) {

                    if (Me.CloseCallback)
                        Me.CloseCallback(elementId);

                    $("#" + elementId).fadeOut("slow");
                    dialog.Opened = false;
                }
                else {

                    if (Me.OpenCallback)
                        Me.OpenCallback(elementId);

                    $("#" + elementId).fadeIn("slow"); //.animate({ width: '70%', marginLeft: "0.6in" }, 1500); //("slow").css({ top: y + "px", left: x + "px" });

                    dialog.Opened = true;
                }

                //if (x == null || y == null)
                //    Me.Refresh(dialog);
            }

        },
        Close: function (elementId) {
            $("#" + elementId).fadeOut("slow");
            Me.Opened = false;
            if (Me.CloseCallback)
                Me.CloseCallback();
        }

    };
    return Me;
});