CREATE TABLE migrations (
    id SERIAL PRIMARY KEY,          -- Уникальный идентификатор записи
	title TEXT NOT NULL,			-- Название миграции
    description TEXT NOT NULL,      -- Краткое описание миграции
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Время выполнения
);

CREATE UNIQUE INDEX idx_migrations_title ON migrations (title); -- Создание уникального индекса для чтобы убедиться что миграция записывается только один раз

insert into migrations (title,description) values ('000_INITIAL_DATABASE','Инициализация базы данных');