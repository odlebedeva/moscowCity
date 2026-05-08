// js/main.js - исправленная версия

$(document).ready(function() {
    console.log('main.js загружен');

    // Функция для определения пути к компонентам (header, footer)
    function getComponentsPath() {
        var path = window.location.pathname;

        if (path.includes('/tower/ru/')) {
            return '../../';
        }
        else if (path.includes('/tower/')) {
            return '../';
        }
        return '';
    }

    // Функция для определения пути к странице истории (относительно текущей страницы)
    function getHistoryPagePath() {
        var path = window.location.pathname;

        console.log('Текущий путь:', path);

        // Если мы уже на странице истории - ссылка на саму себя
        if (path.includes('m_city_history.html')) {
            return '#';
        }
        // Если мы в папке tower/ru/
        else if (path.includes('/tower/ru/')) {
            return 'm_city_history.html';  // тот же каталог
        }
        // Если мы в папке tower/
        else if (path.includes('/tower/')) {
            return 'ru/m_city_history.html';
        }
        // Если мы в корне
        else {
            return 'tower/ru/m_city_history.html';
        }
    }

    // Функция для определения правильного пути к башням
        function getTowerPath(towerFile) {
            var path = window.location.pathname;

            console.log('Определение пути для:', towerFile, 'на странице:', path);

            // Если мы в папке tower/ru/
            if (path.includes('/tower/ru/')) {
                return towerFile;  // тот же каталог
            }
            // Если мы в папке tower/
            else if (path.includes('/tower/')) {
                return 'ru/' + towerFile;
            }
            // Если мы в корне
            else {
                return 'tower/ru/' + towerFile;
            }
        }

    var componentsPath = getComponentsPath();
    console.log('Путь к компонентам:', componentsPath);

    // Загружаем header
    $('#header-placeholder').load(componentsPath + 'components/header.html', function(response, status) {
        console.log('Header загрузка:', status);
        if (status === 'error') {
            $('#header-placeholder').html('<header class="main-header" style="background:#000; padding:1rem;"><p style="color:white;">Header временно недоступен</p></header>');
        } else {
            // После загрузки header - исправляем ссылку на историю
            var historyLinkPath = getHistoryPagePath();
            console.log('Ссылка на историю:', historyLinkPath);

            // Устанавливаем правильную ссылку
            $('.dropdown-menu a:first-child, .dropdown-menu a[href*="history"]').attr('href', historyLinkPath);
        }
    });

    // Загружаем footer
    $('#footer-placeholder').load(componentsPath + 'components/footer.html', function(response, status) {
        console.log('Footer загрузка:', status);
        if (status === 'error') {
            $('#footer-placeholder').html('<footer class="main-footer" style="background:#1a1a2e; padding:2rem;"><p>Москва-Сити</p></footer>');
        }
    });

    // Загружаем other_towers
    $('#other-towers').load(componentsPath + 'components/other_towers.html', function(response, status) {
        console.log('Other-towers загрузка:', status);
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