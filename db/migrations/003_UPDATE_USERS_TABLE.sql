ALTER TABLE users ADD created_at BIGINT DEFAULT EXTRACT(EPOCH FROM now());
ALTER TABLE users ADD updated_at BIGINT ;

ALTER TABLE users RENAME COLUMN hash_password TO password_hash;

insert into migrations (title,description) values ('003_UPDATE_USERS_TABLE','Добавлены поля created_at и updated_at, изменено hash_password на password_hash');