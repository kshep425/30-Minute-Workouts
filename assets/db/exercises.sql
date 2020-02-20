CREATE TABLE `exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ex_name` varchar(120) NOT NULL,
  `description` varchar(480) DEFAULT NULL,
  `url` varchar(240) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `level` varchar(30) DEFAULT "Easy",
  `sets` int(11) DEFAULT '3',
  `reps` int(11) DEFAULT '10',
  `easy_interval_time` int(11) DEFAULT '5',
  `medium_interval_time` int(11) DEFAULT '10',
  `hard_interval_time` int(11) DEFAULT '15',
  `rest` int(11) DEFAULT '30',
  `switch` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
)
