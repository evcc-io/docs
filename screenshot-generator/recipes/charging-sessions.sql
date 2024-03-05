DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` integer,
  `created` datetime,
  `finished` datetime,
  `loadpoint` text,
  `identifier` text,
  `vehicle` text,
  `meter_start_kwh` real,
  `meter_end_kwh` real,
  `charged_kwh` real,
  `odometer` real,
  `solar_percentage` real,
  `price` real, 
  `price_per_kwh` real,
  `co2_per_kwh` real,
  `charge_duration` integer,
  PRIMARY KEY (`id`)
);

INSERT INTO `sessions` VALUES (1,'2024-03-01 08:00:00.0+02:00','2024-03-02 12:00:00.0+02:00','Carport',NULL,'red Fiat 500e',NULL,NULL,10,NULL,100,2,0.2,0,3600000000000);
INSERT INTO `sessions` VALUES (2,'2024-03-02 08:00:00.0+02:00','2024-03-02 12:00:00.0+02:00','Garage',NULL,'white Model 3',NULL,NULL,10,NULL,100,2,0.2,0,1800000000000);
INSERT INTO `sessions` VALUES (3,'2024-03-02 08:00:00.0+02:00','2024-03-02 12:00:00.0+02:00','Carport',NULL,'red Fiat 500e',NULL,NULL,2.5,NULL,88.21,0.75,0.3,82,NULL);
INSERT INTO `sessions` VALUES (4,'2024-03-03 16:00:00.0+02:00','2024-03-03 20:00:00.0+02:00','Garage',NULL,'white Model 3',NULL,NULL,2.5,NULL,50,0.25,0.1,110,NULL);
INSERT INTO `sessions` VALUES (5,'2024-03-04 22:00:00.0+02:00','2024-03-05 06:00:00.0+02:00','Carport',NULL,'red Fiat 500e',NULL,NULL,5,NULL,0,2.5,0.5,134,3600000000000);
INSERT INTO `sessions` VALUES (6,'2024-03-05 16:00:00.0+02:00','2024-03-05 18:00:00.0+02:00','Carport',NULL,NULL,NULL,NULL,10,NULL,100,2,0.2,0,1800000000000);
