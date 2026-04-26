// Загрузка общих компонентов
$(document).ready(function() {
    console.log('main.js загружен');

    // Функция для определения правильного пути
    function getBasePath() {
        var path = window.location.pathname;
        var depth = (path.match(/\//g) || []).length;

        if (path.includes('/tower/ru/')) {
            return '../../';
        }
        else if (path.includes('/tower/')) {
            return '../';
        }
        // Для страниц в корне
        return '';
    }

    var basePath = getBasePath();
    console.log('Base path:', basePath);

    // Загружаем header
    $('#header-placeholder').load(basePath + 'components/header.html', function(response, status) {
        console.log('Header загрузка:', status);
        if (status === 'error') {
            $('#header-placeholder').html('<header class="main-header" style="background:#000; padding:1rem;"><p style="color:white;">Header временно недоступен</p></header>');
        }
    });

    // Загружаем footer
    $('#footer-placeholder').load(basePath + 'components/footer.html', function(response, status) {
        console.log('Footer загрузка:', status);
        if (status === 'error') {
            $('#footer-placeholder').html('<footer class="main-footer" style="background:#1a1a2e; padding:2rem;"><p>Москва-Сити</p></footer>');
        }
    });

    // Загружаем other_towers
        $('#other-towers').load(basePath + 'components/other_towers.html', function(response, status) {
            console.log('Other-towers загрузка:', status);
            if (status === 'error') {
                $('#other-towers').html('<div class="other-towers"><p style="color:white;">Другие башни временно недоступны</p></div>');
            }
        });

    // Кнопка "Наверх"
    $('#scrollup').click(function() {
        $('html, body').animate({scrollTop: 0}, 500);
        return false;
    });

    $(window).scroll(function() {
        $('#scrollup').fadeTo('slow', $(this).scrollTop() > 200 ? 1 : 0);
    });
});
