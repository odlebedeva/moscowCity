/*----------------------------------������ ������ "������ ��������"----------------------------------*/
$(document).ready(function(){ //������ ��������
 $(window).scroll(function(){  //��������� ������ ������� � ����
  if($(this).scrollTop() > 120) {  //���� ������ ������ 120, �� ���������� ������ "������"
   $('.scrollup').fadeIn();
  } else {
   $('.scrollup').fadeOut(); //����� �������� ��
  }
 });
 $('.scrollup').click(function(){ //�� ������� �� ������ "������"
  $("html, body").animate({ scrollTop: 0 }, 600); //������ ��������� ����� ��������
  return false;
 });
});
/*----------------------------------����� ������ "������ ��������"----------------------------------*/

/*----------------------------------������ tabs (������� �������)----------------------------------*/
function openInfo(evt, infoName) {
 var i, tabcontent, tablinks;
 tabcontent = document.getElementsByClassName("tabcontent"); //������� ������ ������� ����� div
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
/*----------------------------------����� tabs (������� �������)----------------------------------*/

