export const translations = {
    en: {
        // --- FIX: Menu Object Added ---
        menu: {
            dashboard: 'Dashboard',
            tracker: 'Tracker',
            api: 'API Explorer',
        },
        // -----------------------------
        footer: '© 2026 QA Task Manager',

        // Dashboard
        dash_title: '📊 Dashboard Live',
        total_bugs: 'Total Bugs',
        active_tasks: 'Active tasks in system',
        fixed: 'Fixed',
        status_done: "Status 'Done'",
        critical: 'Critical',
        attention: 'Requires attention!',
        recent_activity: 'Recent Activity',

        // Metrics
        project_health: 'Quality Metrics',
        success_rate: 'Defect Resolution Rate',
        critical_density: 'Critical Bug Ratio',
        risk_high: '⚠️ Stability: Low (High Risk)',
        risk_ok: '✅ Stability: High (Release Ready)',

        // Charts
        chart_priority: 'Priority Breakdown',
        chart_status: 'Project Status',

        // Tracker
        tracker_title: '🐞 Bug Tracker',
        search_placeholder: '🔍 Search bug...',
        placeholder_title: 'Bug title...',
        placeholder_steps: 'E.g. 1. Open the page, 2. Click on the button, 3. Observe the error...',
        btn_add: '+ Create Bug',
        err_title: '⚠️ Bug title is required!',
        err_steps: '⚠️ Steps are required!',

        // Empty State
        empty_tracker: 'No bugs found...',
        btn_create_first: 'Create your first bug',

        // Modal
        modal_title: 'New Bug Report',
        label_priority: 'Priority',
        label_severity: 'Severity',
        label_assignee: 'Assignee',
        label_steps: 'Steps to Reproduce',
        btn_cancel: 'Cancel',
        placeholder_desc: 'E.g. Login button not working...',

        priority: {
            Highest: 'Highest',
            High: 'High',
            Medium: 'Medium',
            Low: 'Low',
            Lowest: 'Lowest',
        },
        severity: { Critical: 'Critical', Major: 'Major', Moderate: 'Moderate', Low: 'Low' },
        status_opt: { Open: 'Open', InProgress: 'In Progress', Done: 'Done' },

        api_title: '🌐 API Explorer',
        search_api: '🔍 Search in',
        loading: 'Loading data...',
        method: 'METHOD',
        status: 'STATUS',
        time: 'TIME',
    },
    pl: {
        // --- FIX: Menu Object Added ---
        menu: {
            dashboard: 'Panel',
            tracker: 'Śledzenie',
            api: 'Eksplorator API',
        },
        // -----------------------------
        footer: '© 2026 QA Task Manager',

        dash_title: '📊 Panel Główny',
        total_bugs: 'Wszystkie Błędy',
        active_tasks: 'Aktywne zadania w systemie',
        fixed: 'Naprawione',
        status_done: "Status 'Gotowe'",
        critical: 'Krytyczne',
        attention: 'Wymaga uwagi!',
        recent_activity: 'Ostatnia Aktywność',

        project_health: 'Metryki Jakości',
        success_rate: 'Wskaźnik Rozwiązania Defektów',
        critical_density: 'Odsetek Błędów Krytycznych',
        risk_high: '⚠️ Stabilność: Niska (Wysokie Ryzyko)',
        risk_ok: '✅ Stabilność: Wysoka (Gotowe do wydania)',

        chart_priority: 'Rozkład Priorytetów',
        chart_status: 'Status Projektu',

        tracker_title: '🐞 Śledzenie Błędów',
        search_placeholder: '🔍 Szukaj błędu...',
        placeholder_title: 'Tytuł błędu...',
        placeholder_steps: 'Np. 1. Otwórz stronę, 2. Kliknij przycisk, 3. Zobacz błąd...',
        btn_add: '+ Dodaj Błąd',
        err_title: '⚠️ Tytuł jest wymagany!',
        err_steps: '⚠️ Kroki są wymagane!',

        empty_tracker: 'Nie znaleziono błędów...',
        btn_create_first: 'Utwórz swój pierwszy błąd',

        modal_title: 'Nowy błęd',
        label_priority: 'Priorytet',
        label_severity: 'Ważność',
        label_assignee: 'Osoba odpowiedzialna',
        label_steps: 'Kroki do odtworzenia',
        btn_cancel: 'Anuluj',
        placeholder_desc: 'Np. przycisk logowania nie działa...',

        priority: {
            Highest: 'Najwyższy',
            High: 'Wysoki',
            Medium: 'Średni',
            Low: 'Niski',
            Lowest: 'Najniższy',
        },
        severity: {
            Critical: 'Krytyczny',
            Major: 'Poważny',
            Moderate: 'Umiarkowany',
            Low: 'Niski',
        },
        status_opt: { Open: 'Otwarty', InProgress: 'W Trakcie', Done: 'Zrobione' },

        api_title: '🌐 Eksplorator API',
        search_api: '🔍 Szukaj w',
        loading: 'Ładowanie danych...',
        method: 'METODA',
        status: 'STATUS',
        time: 'CZAS',
    },
    ua: {
        // --- FIX: Menu Object Added ---
        menu: {
            dashboard: 'Дашборд',
            tracker: 'Трекер',
            api: 'API Провідник',
        },
        // -----------------------------
        footer: '© 2026 QA Task Manager',

        dash_title: '📊 Дашборд Live',
        total_bugs: 'Всього багів',
        active_tasks: 'Активні завдання',
        fixed: 'Виправлено',
        status_done: "Статус 'Готово'",
        critical: 'Критичні',
        attention: 'Потребує уваги!',
        recent_activity: 'Остання Активність',

        project_health: 'Метрики Якості',
        success_rate: 'Рівень Виправлення Дефектів',
        critical_density: 'Частка Критичних Багів',
        risk_high: '⚠️ Стабільність: Низька (Високий Ризик)',
        risk_ok: '✅ Стабільність: Висока (Готово до релізу)',

        chart_priority: 'Розподіл за Пріоритетом',
        chart_status: 'Статус Проекту',

        tracker_title: '🐞 Баг Трекер',
        search_placeholder: '🔍 Знайти баг...',
        placeholder_title: 'Назва багу...',
        placeholder_steps:
            'Наприклад: 1. Відкрити сторінку, 2. Натиснути кнопку, 3. Побачити помилку...',
        btn_add: '+ Створити Баг',
        err_title: "⚠️ Назва обов'язкова!",
        err_steps: "⚠️ Кроки обов'язкові!",

        empty_tracker: 'Багів не знайдено...',
        btn_create_first: 'Створити свій перший баг',

        modal_title: 'Новий баг',
        label_priority: 'Пріоритет',
        label_severity: 'Серйозність',
        label_assignee: 'Особа відповідальна',
        label_steps: 'Кроки для відтворення',
        btn_cancel: 'Скасувати',
        placeholder_desc: 'Наприклад, кнопка входу не працює...',

        priority: {
            Highest: 'Найвищий',
            High: 'Високий',
            Medium: 'Середній',
            Low: 'Низький',
            Lowest: 'Найнижчий',
        },
        severity: { Critical: 'Критичний', Major: 'Значний', Moderate: 'Помірний', Low: 'Низький' },
        status_opt: { Open: 'Відкрито', InProgress: 'В роботі', Done: 'Готово' },

        api_title: '🌐 API Провідник',
        search_api: '🔍 Пошук у',
        loading: 'Завантаження...',
        method: 'МЕТОД',
        status: 'СТАТУС',
        time: 'ЧАС',
    },
    ru: {
        // --- FIX: Menu Object Added ---
        menu: {
            dashboard: 'Дашборд',
            tracker: 'Трекер',
            api: 'API Эксплорер',
        },
        // -----------------------------
        footer: '© 2026 QA Task Manager',

        dash_title: '📊 Дашборд Live',
        total_bugs: 'Всего багов',
        active_tasks: 'Активные задачи',
        fixed: 'Исправлено',
        status_done: "Статус 'Готово'",
        critical: 'Критические',
        attention: 'Требует внимания!',
        recent_activity: 'Последняя Активность',

        project_health: 'Метрики Качества',
        success_rate: 'Коэффициент Исправления',
        critical_density: 'Доля Критических Ошибок',
        risk_high: '⚠️ Стабильность: Низкая (Высокий Риск)',
        risk_ok: '✅ Стабильность: Высокая (Готово к релизу)',

        chart_priority: 'Распределение Приоритетов',
        chart_status: 'Статус Проекта',

        tracker_title: '🐞 Баг Трекер',
        search_placeholder: '🔍 Найти баг...',
        placeholder_title: 'Название бага...',
        placeholder_steps: 'Например: 1. Открыть страницу, 2. Нажать кнопку, 3. Увидеть ошибку...',
        btn_add: '+ Создать Баг',
        err_title: '⚠️ Название обязательно!',
        err_steps: '⚠️ Шаги обязательны!',

        empty_tracker: 'Багов не найдено...',
        btn_create_first: 'Создать свой первый баг',

        modal_title: 'Новая ошибка',
        label_priority: 'Приоритет',
        label_severity: 'Серьезность',
        label_assignee: 'Исполнитель',
        label_steps: 'Шаги для воспроизведения',
        btn_cancel: 'Отмена',
        placeholder_desc: 'Например, не работает кнопка входа в систему...',

        priority: {
            Highest: 'Наивысший',
            High: 'Высокий',
            Medium: 'Средний',
            Low: 'Низкий',
            Lowest: 'Самый низкий',
        },
        severity: {
            Critical: 'Критический',
            Major: 'Значительный',
            Moderate: 'Умеренный',
            Low: 'Низкий',
        },
        status_opt: { Open: 'Открыто', InProgress: 'В работе', Done: 'Готово' },

        api_title: '🌐 API Эксплорер',
        search_api: '🔍 Поиск в',
        loading: 'Загрузка...',
        method: 'МЕТОД',
        status: 'СТАТУС',
        time: 'ВРЕМЯ',
    },
};
