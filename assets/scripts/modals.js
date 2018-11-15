var popup = (function() {
  var instance;
  // Приватные методы и свойства
  var body = $('body');
  var modal; //модальное окно
  var modalContentAria; //область окна с контентом
  var modalOverlay; //Затемнение
  var contentBody;

  function buildContentBody() {
    var contentBody = $('#vsContentBody');
    if (contentBody === undefined || contentBody.length === 0) {
      contentBody = $('<div id="vsContentBody"></div>');
      body.wrapInner(contentBody);
      contentBody = $('#vsContentBody');
    }
    return contentBody;
  }

  //Модальное окно
  function buildButton() {
    //Кнопка - "Закрыть"
    var atrButtonClose = {
      type: 'button',
      class: 'vsModalClose btn',
      title: 'Close', //!Добавить локализацию
    };
    return $('<button/>')
      .attr(atrButtonClose)
      .html('<span/>')
      .text(atrButtonClose.title) //!Добавить локализацию
      .click(function() {
        modalClose();
      });
  }

  function buildModal() {
    //Модальное окно
    var atrModalAria = {
      id: 'vsModal',
      role: 'dialog',
      'aria-labelledby': 'modal-title',
      'aria-modal': 'true',
      open: true,
    };
    return $('<dialog/>')
      .attr(atrModalAria)
      .append(buildButton())
      .append(modalContentAria)
      .hide()
      .insertAfter(contentBody);
    //.append(buildButton())
  }
  function modalClose() {
    //Закрываем окно
    modalOverlayClose();
    modal.hide();
  }

  function buildModalOverlay() {
    //Затемнение
    if (modalOverlay === undefined || modalOverlay.length === 0) {
      modalOverlay = $('<span/>')
        .attr({ id: 'modalOverlay', 'data-background-click': 'enabled' })
        .html('<span class="spinner"></span>')
        .hide()
        .appendTo(body);
      modalOverlay.click(function() {
        modalClose();
      });
    }
    return modalOverlay;
  }
  function modalOverlayClose() {
    //Закрываем затемнение
    modalOverlay.hide();
    body.removeClass('no-scroll');
    contentBody.removeAttr('aria-hidden');
  }

  function modalOverlayOpen() {
    //Открываем затемнение
    modalOverlay
      .show()
      .find('.spinner')
      .show();
    body.addClass('no-scroll');
    contentBody.attr('aria-hidden', 'true');
  }

  // Конструктор
  function Singleton() {
    if (instance) return instance;
    //можно вызывать через new (popup = new popup();) или просто popup()
    if (this && this.constructor === Singleton) {
      instance = this;
    } else {
      return new Singleton();
    }
    contentBody = buildContentBody();
    modalContentAria = $('<div id="vsModalContent"></div>');
    modal = buildModal();
    modalOverlay = buildModalOverlay();
  }

  // Публичные методы
  Singleton.prototype.close = function() {
    modalClose();
  };
  Singleton.prototype.overlayOpen = function() {
    modalOverlayOpen();
  };

  Singleton.prototype.setContent = function(html) {
    modalOverlayOpen();
    modalContentAria.html(html);
    modal.show();
    modalOverlay.find('.spinner').hide();
  };

  //
  return Singleton;
})();

export { popup };
