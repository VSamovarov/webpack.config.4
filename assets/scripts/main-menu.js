const body = $('body');
//const subMenuItemsOpenClass = 'current-menu-item';
const subMenuItemsOpenClass = 'currentMenuItem';
const openMenuClass = 'openMenu'; //Вешаем на body
const openSubMenuClass = 'openSubMenu'; //Вешаем на body
const buttonMenuClass = 'header__button-menu';

const header = $('#header');
const buttonMenu = header.find('.header__button-menu');
const mainMenu = header.find('.header__main-menu');
let subMenuItems = mainMenu.find('.menu-item-has-children');

//import { hasVerticalScroll, getScrollbarWidth } from './utilits.js';

buttonMenu.click(function(event) {
  event.preventDefault();
  body.toggleClass(openMenuClass);
});

function closeSubMenuItems() {
  mainMenu.find('.' + subMenuItemsOpenClass).removeClass(subMenuItemsOpenClass);
  if (body.hasClass(openSubMenuClass)) {
    body.removeClass(openSubMenuClass);
  }
}

function closeMenu() {
  closeSubMenuItems();
  body.removeClass(openMenuClass);
}

subMenuItems.children('a').click(function(event) {
  event.preventDefault();
  let item = $(this).parent();

  if (item.hasClass(subMenuItemsOpenClass) === false) {
    closeSubMenuItems();
    item.addClass(subMenuItemsOpenClass);
    body.addClass(openSubMenuClass);
  } else {
    item.removeClass(subMenuItemsOpenClass);
    body.removeClass(openSubMenuClass);
  }
});

$(document).mouseup(function(e) {
  //Закрываем главное меню, если клик вне меню открытого
  if (body.hasClass(openMenuClass)) {
    //console.log(e.target);
    if (!mainMenu.is(e.target) && mainMenu.has(e.target).length === 0) {
      if (!buttonMenu.is(e.target) && buttonMenu.has(e.target).length === 0) {
        body.removeClass(openMenuClass);
        closeSubMenuItems();
      }
    }
  }
  //Закрываем главное меню, если клик вне меню открытого
  if (body.hasClass(openSubMenuClass)) {
    let subMenuItemsOpen = header.find('.' + subMenuItemsOpenClass);
    if (!subMenuItemsOpen.is(e.target) && subMenuItemsOpen.has(e.target).length === 0) {
      closeSubMenuItems();
      //console.log(e.target);
    }
  }
});

//Размер окна изменился, закрываем меню
window.onresize = function() {
  closeMenu();
};
