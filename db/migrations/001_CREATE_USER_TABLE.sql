CREATE TABLE Users (
    Id UUID PRIMARY KEY,          -- Идентификатор пользователя
    Login VARCHAR(100) NOT NULL,  -- Логин пользователя
    Hash_Password VARCHAR(255) NOT NULL, -- Хэш пароля
    Email VARCHAR(255) NOT NULL   -- Email пользователя
);

CREATE UNIQUE INDEX uq_users_email ON Users (Email);
CREATE UNIQUE INDEX uq_users_login ON Users (Login);

insert into migrations (title,description) values ('001_CREATE_USER_TABLE','Создание таблицы пользователей, добавлены UNIQUE индексы для полей login и email');
