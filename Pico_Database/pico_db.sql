-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: pico
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dieuhoa`
--

DROP TABLE IF EXISTS `dieuhoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dieuhoa` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) DEFAULT NULL,
  `ProductBrand` varchar(255) DEFAULT NULL,
  `ProductPrice` int DEFAULT NULL,
  `ProductSize` int DEFAULT NULL,
  `ProductOrigin` int DEFAULT NULL,
  `ProductMaterial` varchar(255) DEFAULT NULL,
  `ProductYear` varchar(4) DEFAULT NULL,
  `ProductWeight` decimal(10,2) DEFAULT NULL,
  `ProductQuantity` int DEFAULT NULL,
  `ProductImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dieuhoa`
--

LOCK TABLES `dieuhoa` WRITE;
/*!40000 ALTER TABLE `dieuhoa` DISABLE KEYS */;
INSERT INTO `dieuhoa` VALUES (1,'Air Conditioner','LG',450,1,1,'Plastic','2023',30.50,20,'lg_air_conditioner.jpg'),(2,'Dehumidifier','Philips',300,2,2,'Metal','2022',25.00,15,'philips_dehumidifier.jpg'),(3,'Air Purifier','Dyson',350,3,3,'Glass','2021',18.50,25,'dyson_air_purifier.jpg'),(4,'Fan','Panasonic',120,4,4,'Plastic','2023',5.00,30,'panasonic_fan.jpg'),(5,'Heater','Xiaomi',200,5,5,'Metal','2022',12.00,10,'xiaomi_heater.jpg'),(6,'Cooler','Sharp',400,1,1,'Plastic','2023',28.00,18,'sharp_cooler.jpg'),(7,'Portable AC','Samsung',500,2,2,'Metal','2021',32.00,12,'samsung_portable_ac.jpg');
/*!40000 ALTER TABLE `dieuhoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupconfig`
--

DROP TABLE IF EXISTS `groupconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupconfig` (
  `GroupFieldConfigID` int NOT NULL AUTO_INCREMENT,
  `Label` varchar(255) DEFAULT NULL,
  `FieldName` varchar(255) DEFAULT NULL,
  `FieldType` int DEFAULT NULL,
  `IsRequired` tinyint(1) DEFAULT NULL,
  `Placeholder` varchar(255) DEFAULT NULL,
  `ColumnIndex` int DEFAULT NULL,
  `ErrorText` varchar(255) DEFAULT NULL,
  `DrodownListID` int DEFAULT NULL,
  `GroupConfigID` int DEFAULT NULL,
  `GroupName` varchar(255) DEFAULT NULL,
  `GroupType` int DEFAULT NULL,
  `DropdownList` text,
  PRIMARY KEY (`GroupFieldConfigID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupconfig`
--

LOCK TABLES `groupconfig` WRITE;
/*!40000 ALTER TABLE `groupconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `television`
--

DROP TABLE IF EXISTS `television`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `television` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `ProductBrand` int DEFAULT NULL,
  `ProductPrice` int DEFAULT NULL,
  `ProductSize` int DEFAULT NULL,
  `ProductOrigin` int DEFAULT NULL,
  `ProductMaterial` varchar(255) DEFAULT NULL,
  `ProductYear` varchar(4) DEFAULT NULL,
  `ProductWeight` decimal(10,2) DEFAULT NULL,
  `ProductQuantity` int DEFAULT NULL,
  `ProductImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `television`
--

LOCK TABLES `television` WRITE;
/*!40000 ALTER TABLE `television` DISABLE KEYS */;
INSERT INTO `television` VALUES (23,'Sony Bravia X90J',1,1200,55,1,'Plastic','2023',20.50,10,'sony_bravia_x90j.jpg'),(24,'Samsung QLED Q80T',2,1500,65,2,'Metal','2022',25.00,8,'samsung_qled_q80t.jpg'),(25,'LG OLED CX',3,1800,55,3,'Glass','2021',22.00,12,'lg_oled_cx.jpg'),(26,'Panasonic TX-55HX800',4,1000,55,4,'Plastic','2023',19.00,15,'panasonic_tx_55hx800.jpg'),(27,'Philips Ambilight 4K',5,1300,50,5,'Metal','2022',21.00,11,'philips_ambilight_4k.jpg'),(28,'Sony A8H OLED',6,2000,65,1,'Glass','2023',24.00,9,'sony_a8h_oled.jpg'),(29,'Samsung Frame TV',7,1600,55,2,'Plastic','2022',23.00,10,'samsung_frame_tv.jpg'),(30,'LG NanoCell 90',8,1400,65,3,'Metal','2021',26.00,7,'lg_nanocell_90.jpg'),(31,'TCL 6-Series',9,1100,55,4,'Plastic','2022',18.00,14,'tcl_6_series.jpg'),(32,'Vizio P-Series Quantum',10,1200,65,5,'Glass','2023',20.00,13,'vizio_p_series_quantum.jpg');
/*!40000 ALTER TABLE `television` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-10 15:29:40
