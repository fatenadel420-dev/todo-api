CREATE TABLE `todos` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `title` text NOT NULL,
    `body` text,
    `created_at` text DEFAULT CURRENT_TIMESTAMP,
    `done` integer DEFAULT 0 NOT NULL
);
