USE weatherapp;

DROP TABLE IF EXISTS moods;

CREATE TABLE moods(
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
date VARCHAR(50) NOT NULL,
time VARCHAR(50) NOT NULL,
mood_type VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO `moods` (`id`, `date`, `time`, `mood_type`) VALUES
(1, '2019-04-10', '23:50:40','Sad'),
(2,  '2019-04-11', '23:50:40','Happy'),
(3,  '2019-04-12', '23:50:40','Jovial'),
(4,  '2019-04-13', '23:50:40','Jumpy'),
(5,  '2019-04-14', '23:50:40','Anxious');

DROP TABLE IF EXISTS activities;

CREATE TABLE activities(
id INT UNSIGNED NOT NULL AUTO_INCREMENT,
date VARCHAR(50) NOT NULL,
time VARCHAR(50) NOT NULL,
activity_type VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO `activities` (`id`, `date`, `time`, `activity_type`) VALUES
(1, '2019-04-10', '23:50:40','Workout'),
(2,  '2019-04-11', '23:50:40','Dance'),
(3,  '2019-04-12', '23:50:40','Walk'),
(4,  '2019-04-13', '23:50:40','Sleep'),
(5,  '2019-04-14', '23:50:40','Gaming');


