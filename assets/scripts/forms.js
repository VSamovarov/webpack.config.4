$('body').on('submit', '.feedback', form_action);

function form_action(form) {
  event.preventDefault();
  var dataSet = {
    url: vsamJS.url,
    type: 'POST',
    dataType: 'json',
    thisForm: $(this),
    //data: {'action' : $(this).attr('data-action'), 'values' : $(this).serialize()},
    data: { action: 'form', values: $(this).serialize() },
    beforeSend: function() {
      $(
        '<div class="preloader"><div class="preloader-inner"><span class="spinner spinner-dark">Load...</span></div></div>'
      ).appendTo(this.thisForm.css({ position: 'relative' }));
    },
    complete: function() {
      $('.preloader').remove();
    },
    success: function(data) {
      var form = this.thisForm;
      var successText = data['success_text'];
      if (successText === false) {
        var formData = data['data'];
        for (var name in formData) {
          var element = form.find('[name="' + name + '"]');
          var elementTagName = element.prop('tagName').toLowerCase();
          var elementData = formData[name];
          var helpBlock = element.next('.help-block').addClass('error');
          var wapper = element.parent();
          if (elementTagName == 'input') {
            element.val(elementData.value);
          } else if (elementTagName == 'textarea') {
            element.text(elementData.value);
          }
          if (elementData.error !== undefined) {
            helpBlock.addClass('error').text(elementData.error);
            wapper.addClass('error');
          } else {
            helpBlock.removeClass('error').text('');
            wapper.removeClass('error');
          }
        }
      } else {
        form.replaceWith(successText);
        //Для аналитики (tagmanager)
        if (typeof dataLayer != 'undefined') {
          let eventValue = 'formsend';
          if (form[0].hasAttribute('data-action')) {
            eventValue = form[0].getAttribute('data-action');
          }
          dataLayer.push({ event: eventValue });
        }
      }
    },
  };
  $.ajax(dataSet);
}
