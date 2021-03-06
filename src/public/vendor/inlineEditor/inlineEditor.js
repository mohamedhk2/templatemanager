/**
 * inlineEditor
 *
 * A jQuery plugin that creates an inline editor. Styling with Bootstrap 3
 *
 * @link        http://github.com/nghuuphuoc/inlineEditor
 * @author      http://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 Nguyen Huu Phuoc
 * @license     MIT
 */

(function($) {
    var InlineEditor = function(element, options) {
        this.$element = $(element);
        this.options  = $.extend({}, InlineEditor.DEFAULT_OPTIONS, options);;

        this._init();
    };

    InlineEditor.DEFAULT_OPTIONS = {
        prefixClass: 'inline-editor-',
        method: 'GET',
        field: 'inlineEditor',
        data: {}
    };

    InlineEditor.prototype = {
        constructor: InlineEditor,

        _init: function() {
            var prefixClass      = this.options.prefixClass,
                $editorWrapper   = this.$element.addClass(prefixClass + 'editable').css('cursor', 'pointer').wrap($('<div/>').addClass(prefixClass + 'wrapper')).parent(),
                $editorContainer = $('<div/>').addClass(prefixClass + 'container form-inline').appendTo($editorWrapper),
                $input           = $('<input/>').addClass(prefixClass + 'input form-control').appendTo($editorContainer),
                $saveButton      = $('<button/>').attr('type', 'button').addClass(prefixClass + 'save btn btn-link').attr('type', 'button').html('<i class="fa fa-check"></i>').appendTo($editorContainer),
                $cancelButton    = $('<button/>').attr('type', 'button').addClass(prefixClass + 'cancel btn btn-link').attr('type', 'button').html('<i class="fa fa-times"></i>').appendTo($editorContainer);

            var inputWidth = $editorWrapper.width() - $saveButton.outerWidth(true) - $cancelButton.outerWidth(true) - 10;
            $editorContainer.hide();
            $input.addClass('form-control').css('width', inputWidth + 'px');

            var that = this;
            // Save handler
            $saveButton.click(function() {
                $saveButton.attr('disabled', 'disabled').find('i').removeClass('fa-check').addClass('fa-spin fa-refresh');
                var data = that.options.data, newValue = $input.val();
                data[that.options.field] = newValue;
                $.ajax({
                    url: that.options.url,
                    method: that.options.method,
                    data: data
                }).success(function(response) {
                        if ('true' == response.success || true == response.success) {
                            that.$element.html(newValue);
                        }
                        $saveButton.removeAttr('disabled').find('i').removeClass('fa-spin fa-refresh').addClass('fa-check');
                        $cancelButton.click();
                    });
            });

            // Cancel handler
            $cancelButton.click(function() {
                that.$element.show();
                $editorContainer.hide();
            });

            this.$element.click(function() {
                that.$element.hide();
                $editorContainer.show();
                $input.val(that.$element.html());
            });
        }
    };

    // Plugin definition
    $.fn.inlineEditor = function(options) {
        return this.each(function() {
            var $this = $(this), data = $this.data('inlineEditor');
            if (!data) {
                $this.data('inlineEditor', (data = new InlineEditor(this, options)));
            }
        });
    };
    $.fn.inlineEditor.Constructor = InlineEditor;
}(window.jQuery));