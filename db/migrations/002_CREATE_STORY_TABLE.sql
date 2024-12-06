CREATE TABLE Stories (
    Id UUID PRIMARY KEY,              -- Уникальный идентификатор истории
    Title VARCHAR(255) NOT NULL,      -- Заголовок истории
    Initial_Text TEXT NOT NULL,        -- Начальный текст истории
    Author_Id UUID NOT NULL,           -- ID автора истории (внешний ключ)
    CONSTRAINT FK_Stories_Authors FOREIGN KEY (Author_Id) REFERENCES Users (Id) ON DELETE CASCADE
);


CREATE INDEX idx_stories_authorid ON Stories (Author_Id); -- Ускоряет поиск по автору
CREATE INDEX idx_stories_title ON Stories (Title);       -- Ускоряет поиск по заголовкам