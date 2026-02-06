export const translations = {
    en: {
        dashboard: "Dashboard",
        tracker: "Tracker",
        api: "API Explorer",
        footer: "© 2026 QA Task Manager", // (Задача 2) Убрали "Student Project"

        // Dashboard
        dash_title: "📊 Dashboard Live",
        total_bugs: "Total Bugs",
        active_tasks: "Active tasks in system",
        fixed: "Fixed",
        status_done: "Status 'Done'",
        critical: "Critical",
        attention: "Requires attention!",
        recent_activity: "Recent Activity",

        // Metrics
        project_health: "Project Health",
        success_rate: "Success Rate (Fixed)",
        critical_density: "Critical Density",
        risk_high: "⚠️ High risk level!",       // (Задача 4) Новые ключи
        risk_ok: "✅ Risk level acceptable",

        // Tracker & API ... (остальное без изменений, но для краткости я свернул. 
        // Вставь сюда старые ключи Tracker и API, если копируешь, 
        // но лучше просто точечно добавь risk_high и поправь footer)
        tracker_title: "🐞 Bug Tracker",
        search_placeholder: "🔍 Search bug...",
        placeholder_title: "Bug title...",
        placeholder_steps: "Steps to reproduce...",
        btn_add: "+ Create Bug",
        err_title: "⚠️ Bug title is required!",
        err_steps: "⚠️ Steps are required!",
        api_title: "🌐 API Explorer",
        search_api: "🔍 Search in",
        loading: "Loading data...",
        method: "METHOD",
        status: "STATUS",
        time: "TIME",
        priority: { Critical: "🔥 Critical", High: "🔴 High", Medium: "🟡 Medium", Low: "🟢 Low" },
        status_opt: { Open: "📂 Open", InProgress: "⚙️ In Progress", Done: "✅ Done" }
    },
    pl: {
        // ... (копируем структуру)
        footer: "© 2026 QA Task Manager",
        risk_high: "⚠️ Wysokie ryzyko!",
        risk_ok: "✅ Poziom ryzyka akceptowalny",
        // ... остальные поля оставь как были, просто добавь эти и поправь футер
        dashboard: "Panel", tracker: "Śledzenie", api: "Eksplorator API", dash_title: "📊 Panel Główny", total_bugs: "Wszystkie Błędy", active_tasks: "Aktywne zadania w systemie", fixed: "Naprawione", status_done: "Status 'Gotowe'", critical: "Krytyczne", attention: "Wymaga uwagi!", recent_activity: "Ostatnia Aktywność", project_health: "Zdrowie Projektu", success_rate: "Wskaźnik Sukcesu (Naprawione)", critical_density: "Zagęszczenie Krytycznych", tracker_title: "🐞 Śledzenie Błędów", search_placeholder: "🔍 Szukaj błędu...", placeholder_title: "Tytuł błędu...", placeholder_steps: "Kroki do reprodukcji...", btn_add: "+ Dodaj Błąd", err_title: "⚠️ Tytuł jest wymagany!", err_steps: "⚠️ Kroki są wymagane!", api_title: "🌐 Eksplorator API", search_api: "🔍 Szukaj w", loading: "Ładowanie danych...", method: "METODA", status: "STATUS", time: "CZAS", priority: { Critical: "🔥 Krytyczny", High: "🔴 Wysoki", Medium: "🟡 Średni", Low: "🟢 Niski" }, status_opt: { Open: "📂 Otwarty", InProgress: "⚙️ W toku", Done: "✅ Gotowy" }
    },
    ua: {
        footer: "© 2026 QA Task Manager",
        risk_high: "⚠️ Високий рівень ризику!",
        risk_ok: "✅ Рівень ризику прийнятний",
        // ...
        dashboard: "Дашборд", tracker: "Трекер", api: "API Провідник", dash_title: "📊 Дашборд Live", total_bugs: "Всього багів", active_tasks: "Активні завдання", fixed: "Виправлено", status_done: "Статус 'Готово'", critical: "Критичні", attention: "Потребує уваги!", recent_activity: "Остання Активність", project_health: "Здоров'я Проекту", success_rate: "Успішність (Виправлено)", critical_density: "Щільність Критичних", tracker_title: "🐞 Баг Трекер", search_placeholder: "🔍 Знайти баг...", placeholder_title: "Назва багу...", placeholder_steps: "Кроки відтворення...", btn_add: "+ Створити Баг", err_title: "⚠️ Назва обов'язкова!", err_steps: "⚠️ Кроки обов'язкові!", api_title: "🌐 API Провідник", search_api: "🔍 Пошук у", loading: "Завантаження...", method: "МЕТОД", status: "СТАТУС", time: "ЧАС", priority: { Critical: "🔥 Критичний", High: "🔴 Високий", Medium: "🟡 Середній", Low: "🟢 Низький" }, status_opt: { Open: "📂 Відкрито", InProgress: "⚙️ В роботі", Done: "✅ Готово" }
    },
    ru: {
        footer: "© 2026 QA Task Manager",
        risk_high: "⚠️ Высокий уровень риска!",
        risk_ok: "✅ Уровень риска приемлемый",
        // ...
        dashboard: "Дашборд", tracker: "Трекер", api: "API Эксплорер", dash_title: "📊 Дашборд Live", total_bugs: "Всего багов", active_tasks: "Активные задачи", fixed: "Исправлено", status_done: "Статус 'Готово'", critical: "Критические", attention: "Требует внимания!", recent_activity: "Последняя Активность", project_health: "Здоровье Проекта", success_rate: "Успешность (Исправлено)", critical_density: "Плотность Критических", tracker_title: "🐞 Баг Трекер", search_placeholder: "🔍 Найти баг...", placeholder_title: "Название бага...", placeholder_steps: "Шаги воспроизведения...", btn_add: "+ Создать Баг", err_title: "⚠️ Название обязательно!", err_steps: "⚠️ Шаги обязательны!", api_title: "🌐 API Эксплорер", search_api: "🔍 Поиск в", loading: "Загрузка...", method: "МЕТОД", status: "СТАТУС", time: "ВРЕМЯ", priority: { Critical: "🔥 Критический", High: "🔴 Высокий", Medium: "🟡 Средний", Low: "🟢 Низкий" }, status_opt: { Open: "📂 Открыто", InProgress: "⚙️ В работе", Done: "✅ Готово" }
    }
};