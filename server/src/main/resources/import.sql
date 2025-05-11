--import.sql
insert into tb_genre (name) values ('Action')
insert into tb_genre (name) values ('Fantasy')
insert into tb_genre (name) values ('Adventure')
insert into tb_genre (name) values ('Sandbox')
insert into tb_genre (name) values ('Survival')

insert into tb_game (name, description, price, image) values ('Elden Ring', 'A vast fantasy world full of danger and mystery.', 299.90, 'url')
insert into tb_game (name, description, price, image) values ('Minecraft', 'A sandbox game about placing blocks and going on adventures.', 89.99, 'url')
insert into tb_game (name, description, price, image) values ('The Witcher 3', 'A story-driven RPG set in a fantasy world.', 199.90, 'url')
insert into tb_game (name, description, price, image) values ('Dont Starve', 'A wilderness survival game full of science and magic.', 49.90, 'url')

insert into tb_game_genre (game_id, genre_id) values (1, 1)
insert into tb_game_genre (game_id, genre_id) values (1, 2)
insert into tb_game_genre (game_id, genre_id) values (1, 3)
insert into tb_game_genre (game_id, genre_id) values (2, 4), (2, 5)
insert into tb_game_genre (game_id, genre_id) values (3, 1), (3, 2), (3, 3)
insert into tb_game_genre (game_id, genre_id) values (4, 5), (4, 4)

-- User - password: 123
INSERT INTO tb_user(nickname, username, email, password) VALUES ('Administrador', 'admin','admin@gmail.com','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(nickname, username, email, password) VALUES ('Teste', 'test','test@gmail.com','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

