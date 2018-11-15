//Узнаем, есть ли вертикальная прокрутка
// Пример (если не передать параметр node — то проверит у body)
function hasVerticalScroll(node) {
  if (node == undefined) {
    if (window.innerHeight) return document.body.offsetHeight > innerHeight;
    else
      return (
        document.documentElement.scrollHeight > document.documentElement.offsetHeight ||
        document.body.scrollHeight > document.body.offsetHeight
      );
  } else {
    return node.scrollHeight > node.offsetHeight;
  }
}

//Узнаем ширину прокрутки
let getScrollbarWidth = function() {
  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  // add innerdiv
  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

export { hasVerticalScroll, getScrollbarWidth };
