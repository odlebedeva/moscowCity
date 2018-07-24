/*----------------------------------начало кнопки "наверх страницы"----------------------------------*/
$(document).ready(function(){ //читаем документ
 $(window).scroll(function(){  //считываем данные скролла в окне
  if($(this).scrollTop() > 120) {  //если скролл больше 120, то отображаем кнопку "наверх"
   $('.scrollup').fadeIn();
  } else {
   $('.scrollup').fadeOut(); //иначе скрываем ее
  }
 });
 $('.scrollup').click(function(){ //по нажатию на кнопку "наверх"
  $("html, body").animate({ scrollTop: 0 }, 600); //плавно переходим вверх страницы
  return false;
 });
});
/*----------------------------------конец кнопки "наверх страницы"----------------------------------*/

/*----------------------------------начало tabs (вкладки истории)----------------------------------*/
function openInfo(evt, infoName) {
 var i, tabcontent, tablinks;
 tabcontent = document.getElementsByClassName("tabcontent"); //скрытие текста каждого блока div
 for (i = 0; i < tabcontent.length; i++) {
  tabcontent[i].style.display = "none";
 }
 tablinks = document.getElementsByClassName("tablinks");
 for (i = 0; i < tablinks.length; i++) {
  tablinks[i].className = tablinks[i].className.replace(" active", "");
 }
 document.getElementById(infoName).style.display = "block";
 evt.currentTarget.className += " active";
}
/*----------------------------------конец tabs (вкладки истории)----------------------------------*/

