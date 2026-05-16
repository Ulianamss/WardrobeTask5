https://wardrobe-task5.vercel.app/


It was supposed to be an app where i can store my clothes and store wishlist items, but i misswatched the part "Все запросы выполняются к DummyJSON API."
it used to be just mocked data. now its an app for products i own (from dummyJSON) and combination of them for a special occasions and a wishlist



RUN:

npm i --force
npm start



---------------------------------------------------------
TASK 5
📖 Описание

В этой задаче стажер знакомится с современными инструментами фронтенд-разработки и учится собирать полноценное многостраничное приложение (SPA). Основная цель — закрепить знания React, роутинга, управления состоянием и работы с API и сборщиком Webpack.



🛠️ Практическая часть

Данное SPA-приложение должно включать в себя:

- React-компоненты с разделением логики и представления.

- Маршрутизацию с помощью React Router (несколько страниц/вью).

- Управление состоянием через Redux Toolkit.

- Получение и кэширование данных через RTK Query (на базе DummyJSON API).

- Сборку проекта через Webpack (с настройкой основных конфигураций).



📌 Требования

- Приложение должно содержать минимум 3 страницы (пример: логин, список, детальная страница).

- Состояние и данные обрабатываются через Redux Toolkit / RTK Query.

- Все запросы выполняются к DummyJSON API.

- Проект собран с помощью Webpack (без create-react-app).

- Код оформлен по best practices React (hooks, чистая архитектура).

- Структура проекта модульная и читаемая.

- Для реализации таблиц, графиков и карт можно использовать сторонние библиотеки.

- Некоторые данные, полученные из DummyJSON API, могут не совпадать с макетами в Figma. Поэтому при выполнении этого задания обсуди с ментором, что можно заменить.



📤 Формат сдачи задачи

GitHub-репозиторий, содержащий:

Исходный код.

README.md с описанием проекта:

краткая функциональность,

список зависимостей,

инструкция по запуску.

Структурированные коммиты.

Деплой проекта:

Netlify / Vercel / GitHub Pages (на выбор).

Ссылка на деплой добавлена в README.

Отчет по инструментам качества (по желанию, но будет плюсом):

Lighthouse ≥ 90 по всем категориям.

Отсутствие ошибок валидации HTML/CSS.

Extra: Устный опрос ментора (по желанию ментора).

Дедлайн - 2 недели.



✅ Критерии оценки

Приложение запускается и работает без ошибок.

Настроена маршрутизация (React Router).

Состояние корректно обрабатывается через Redux Toolkit.

Данные загружаются и кэшируются через RTK Query.

Интерфейс построен с использования нативного CSS (без использования UI библиотек).

Адаптивная вёрстка (корректное отображение на мобильных и desktop).

Код структурирован, использует осмысленные имена, форматирование единообразное.

Репозиторий оформлен (README, инструкция по запуску).

Extra: Более 80% положительных ответов на вопросы ментора.

🔗 Ресурсы

https://www.figma.com/design/FXH4IrR8Vho44BpcloBNfc/DEMO-for-Dima-Bukovsky?node-id=0-1&p=f

https://react.dev/ 

https://reactrouter.com/ 

https://redux-toolkit.js.org/ 

https://redux-toolkit.js.org/rtk-query/overview 

https://dummyjson.com/ 

https://webpack.js.org/

---------------------------------------------------------







## Dependencies

### Core Dependencies
- `react@^18.2.0` - React library
- `react-dom@^18.2.0` - React DOM rendering
- `react-router-dom@^6.28.0` - Client-side routing
- `@reduxjs/toolkit@^1.9.7` - Redux state management
- `react-redux@^8.1.3` - React bindings for Redux

### Dev Dependencies
- `webpack@^5.89.0` - Module bundler
- `webpack-cli@^5.1.4` - Webpack CLI
- `webpack-dev-server@^4.15.1` - Development server
- `@babel/core@^7.23.6` - JavaScript transpiler
- `babel-loader@^9.1.3` - Babel loader for Webpack
- `html-webpack-plugin@^5.6.0` - HTML template plugin
- `mini-css-extract-plugin@^2.7.6` - CSS extraction
- `css-loader@^6.8.1` - CSS module loader
- `style-loader@^3.3.3` - Style injection loader


## Features

- **Profile Page**: Manage your profile with avatar, bio, and statistics
- **Wardrobe Page**: Browse products from DummyJSON API with search and pagination
- **Product Details**: View detailed information about each product
- **Looks Page**: Create and manage outfit combinations from your wishlist
- **Wishlist Page**: Track items you want to purchase with total price calculation
- **Favorite System**: Mark favorite items for quick access
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **State Management**: Redux Toolkit for global state, RTK Query for API caching
- **Persistent Data**: All local data saved to Redux store
