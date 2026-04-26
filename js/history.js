// ========== СКРИПТЫ ДЛЯ СТРАНИЦЫ ИСТОРИИ ==========

// Переключение вкладок
function openInfo(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Плавная прокрутка к контенту
    setTimeout(function() {
        var activeTab = document.querySelector('.tabcontent[style*="block"]');
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Инициализация модального окна
function initModal() {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    var captionText = document.getElementById("modalCaption");
    var closeBtn = document.getElementsByClassName("close")[0];

    // Добавляем обработчик для всех изображений с классом modal-img
    var modalImages = document.querySelectorAll('.modal-img');
    for (var i = 0; i < modalImages.length; i++) {
        modalImages[i].onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt || "Изображение";
            document.body.style.overflow = "hidden";
        }
    }

    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Закрытие по клику вне изображения
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
}

// Инициализация кнопки наверх
function initScrollup() {
    var scrollup = document.getElementById('scrollup');
    if (scrollup) {
        scrollup.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollup.style.display = 'flex';
            } else {
                scrollup.style.display = 'none';
            }
        });
    }
}

// Запуск инициализации после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    initModal();
    initScrollup();
});