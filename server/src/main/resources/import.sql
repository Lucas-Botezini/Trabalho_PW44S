--import.sql
insert into tb_genre (name) values ('Action');
insert into tb_genre (name) values ('Fantasy');
insert into tb_genre (name) values ('Adventure');
insert into tb_genre (name) values ('Sandbox');
insert into tb_genre (name) values ('Survival');
insert into tb_genre (name) values ('RPG');
insert into tb_genre (name) values ('Sci-Fi');
insert into tb_genre (name) values ('Strategy');
insert into tb_genre (name) values ('Indie');
insert into tb_genre (name) values ('Simulation');
insert into tb_genre (name) values ('Horror');
insert into tb_genre (name) values ('Stealth');
insert into tb_genre (name) values ('Puzzle');
insert into tb_genre (name) values ('Platformer');


insert into tb_game (name, description, price, image) values ('Elden Ring', 'A vast fantasy world full of danger and mystery.', 299.90, 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1748630546');
insert into tb_game (name, description, price, image) values ('Minecraft', 'A sandbox game about placing blocks and going on adventures.', 89.99, 'https://xboxwire.thesourcemediaassets.com/sites/8/2024/05/Hero-bdef2532984d6fcafc40.jpg');
insert into tb_game (name, description, price, image) values ('Dont Starve', 'A wilderness survival game full of science and magic.', 49.90, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/219740/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Stardew Valley', 'You''ve inherited your grandfather''s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life.', 47.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Hades', 'Defy the god of the dead as you hack and slash your way out of the Underworld in this rogue-like dungeon crawler.', 83.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Civilization VI', 'A turn-based strategy game in which you attempt to build an empire to stand the test of time.', 189.00, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Baldur''s Gate 3', 'An expansive RPG from the world of Dungeons & Dragons, offering a rich narrative with unparalleled player freedom.', 299.00, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Portal 2', 'A mind-bending puzzle-platformer where you use a portal gun to solve physics-based challenges.', 39.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Metal Gear Solid V: The Phantom Pain', 'An open-world stealth-action game where you lead a mercenary group in Afghanistan and Africa during the Cold War.', 99.90, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/287700/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Hollow Knight', 'Explore a vast interconnected world in this 2D action-adventure. Forge your own path and battle tainted creatures.', 59.90, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Celeste', 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this super-tight, hand-crafted platformer.', 49.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/504230/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('BioShock', 'A shooter unlike any you''ve ever played, loaded with weapons and tactics never seen. You''ll have a complete arsenal at your disposal from simple revolvers to grenade launchers and chemical throwers.', 79.90, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/7670/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('The Elder Scrolls V: Skyrim', 'An epic fantasy open-world RPG where you can be anyone and do anything; the choices are all yours.', 149.00, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Subnautica', 'Descend into the depths of an alien underwater world filled with wonder and peril. Craft equipment, pilot submarines and out-smart wildlife to survive.', 89.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Terraria', 'Dig, fight, explore, build! Nothing is impossible in this action-packed adventure game.', 39.99, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Sekiro: Shadows Die Twice', 'Carve your own clever path to vengeance in an all-new adventure from developer FromSoftware, creators of Bloodborne and the Dark Souls series.', 249.90, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Fallout: New Vegas', 'Welcome to Vegas. New Vegas. It’s the kind of town where you dig your own grave prior to being shot in the head and left for dead.', 49.90, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/22380/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Control', 'A supernatural 3rd person action-adventure will challenge you to master a combination of supernatural abilities, modifiable loadouts and reactive environments.', 129.00, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/capsule_616x353.jpg');
insert into tb_game (name, description, price, image) values ('Persona 5 Royal', 'Don the mask of the Phantom Thieves of Hearts and stage grand heists, infiltrate the minds of the corrupt, and make them change their ways!', 299.00, 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1687950/capsule_616x353.jpg');

insert into tb_game_genre (game_id, genre_id) values (1, 1);
insert into tb_game_genre (game_id, genre_id) values (1, 2);
insert into tb_game_genre (game_id, genre_id) values (1, 3);
insert into tb_game_genre (game_id, genre_id) values (1, 6);
insert into tb_game_genre (game_id, genre_id) values (2, 4), (2, 5), (2, 3);
insert into tb_game_genre (game_id, genre_id) values (3, 1), (3, 2), (3, 3), (3, 6);
insert into tb_game_genre (game_id, genre_id) values (4, 5), (4, 4), (4, 3);
insert into tb_game_genre (game_id, genre_id) values (5, 1), (5, 6), (5, 7);
insert into tb_game_genre (game_id, genre_id) values (6, 9), (6, 6), (6, 10);
insert into tb_game_genre (game_id, genre_id) values (7, 1), (7, 9), (7, 6);
insert into tb_game_genre (game_id, genre_id) values (8, 1), (8, 3);
insert into tb_game_genre (game_id, genre_id) values (9, 8), (9, 10);
insert into tb_game_genre (game_id, genre_id) values (10, 1), (10, 11), (10, 5);
insert into tb_game_genre (game_id, genre_id) values (11, 1), (11, 8);

-- The Last of Us Part I (ID 12)
insert into tb_game_genre (game_id, genre_id) values (12, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (12, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (12, 5);  -- Survival

-- God of War Ragnarök (ID 13)
insert into tb_game_genre (game_id, genre_id) values (13, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (13, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (13, 6);  -- RPG

-- Baldur's Gate 3 (ID 14)
insert into tb_game_genre (game_id, genre_id) values (14, 6);  -- RPG
insert into tb_game_genre (game_id, genre_id) values (14, 2);  -- Fantasy
insert into tb_game_genre (game_id, genre_id) values (14, 8);  -- Strategy
insert into tb_game_genre (game_id, genre_id) values (14, 3);  -- Adventure

-- Portal 2 (ID 15)
insert into tb_game_genre (game_id, genre_id) values (15, 13); -- Puzzle (Considerando ID 13 para Puzzle)
insert into tb_game_genre (game_id, genre_id) values (15, 7);  -- Sci-Fi

-- Metal Gear Solid V (ID 16)
insert into tb_game_genre (game_id, genre_id) values (16, 12); -- Stealth (Considerando ID 12 para Stealth)
insert into tb_game_genre (game_id, genre_id) values (16, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (16, 3);  -- Adventure

-- Hollow Knight (ID 17)
insert into tb_game_genre (game_id, genre_id) values (17, 9);  -- Indie
insert into tb_game_genre (game_id, genre_id) values (17, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (17, 1);  -- Action

-- Celeste (ID 18)
insert into tb_game_genre (game_id, genre_id) values (18, 9);  -- Indie
insert into tb_game_genre (game_id, genre_id) values (18, 3);  -- Adventure

-- BioShock (ID 19)
insert into tb_game_genre (game_id, genre_id) values (19, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (19, 7);  -- Sci-Fi
insert into tb_game_genre (game_id, genre_id) values (19, 11); -- Horror

-- The Elder Scrolls V: Skyrim (ID 20)
insert into tb_game_genre (game_id, genre_id) values (20, 6);  -- RPG
insert into tb_game_genre (game_id, genre_id) values (20, 2);  -- Fantasy
insert into tb_game_genre (game_id, genre_id) values (20, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (20, 1);  -- Action

-- Subnautica (ID 21)
insert into tb_game_genre (game_id, genre_id) values (21, 5);  -- Survival
insert into tb_game_genre (game_id, genre_id) values (21, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (21, 7);  -- Sci-Fi

-- Terraria (ID 22)
insert into tb_game_genre (game_id, genre_id) values (22, 4);  -- Sandbox
insert into tb_game_genre (game_id, genre_id) values (22, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (22, 1);  -- Action

-- Sekiro: Shadows Die Twice (ID 23)
insert into tb_game_genre (game_id, genre_id) values (23, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (23, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (23, 12); -- Stealth

-- Fallout: New Vegas (ID 24)
insert into tb_game_genre (game_id, genre_id) values (24, 6);  -- RPG
insert into tb_game_genre (game_id, genre_id) values (24, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (24, 7);  -- Sci-Fi

-- Control (ID 25)
insert into tb_game_genre (game_id, genre_id) values (25, 1);  -- Action
insert into tb_game_genre (game_id, genre_id) values (25, 3);  -- Adventure
insert into tb_game_genre (game_id, genre_id) values (25, 7);  -- Sci-Fi

-- Persona 5 Royal (ID 26)
insert into tb_game_genre (game_id, genre_id) values (26, 6);  -- RPG
insert into tb_game_genre (game_id, genre_id) values (26, 2);  -- Fantasy
insert into tb_game_genre (game_id, genre_id) values (26, 8);  -- Strategy

-- User - password: 123
INSERT INTO tb_user(nickname, username, email, password) VALUES ('Administrador', 'admin','admin@gmail.com','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(nickname, username, email, password) VALUES ('Teste Display Name', 'test','test@gmail.com','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

