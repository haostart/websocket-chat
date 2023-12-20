-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `GMESSAGE`
--

DROP TABLE IF EXISTS `GMESSAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GMESSAGE` (
  `mid` int unsigned NOT NULL AUTO_INCREMENT,
  `gid` int NOT NULL,
  `uid` int NOT NULL,
  `gname` varchar(255) NOT NULL,
  `text` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GMESSAGE`
--

LOCK TABLES `GMESSAGE` WRITE;
/*!40000 ALTER TABLE `GMESSAGE` DISABLE KEYS */;
INSERT INTO `GMESSAGE` VALUES (2,1,23,'haoA','1','2023-12-18 11:11:40'),(3,1,23,'haoA','2','2023-12-18 11:14:20'),(4,1,23,'haoA','3','2023-12-18 11:17:55'),(5,1,23,'haoA','4','2023-12-18 11:19:00'),(6,1,23,'haoA','5','2023-12-18 11:20:42'),(7,1,23,'haoA','6','2023-12-18 11:21:06'),(8,1,24,'haoA','7','2023-12-18 11:22:02'),(9,1,23,'haoA','8','2023-12-18 11:30:30'),(10,1,23,'haoA','9','2023-12-18 11:33:37'),(11,1,23,'haoA','11','2023-12-18 11:40:00'),(12,1,23,'haoA','112','2023-12-18 11:40:11'),(13,1,23,'haoA','11212','2023-12-18 11:40:16'),(14,1,23,'haoA','11212','2023-12-18 11:41:05'),(15,1,23,'haoA','212','2023-12-18 11:41:35'),(16,1,23,'haoA','12','2023-12-18 12:25:44'),(17,1,23,'haoA','234234','2023-12-18 12:26:39'),(18,1,23,'haoA','2342343','2023-12-18 12:26:47'),(19,1,23,'haoA','123','2023-12-18 12:27:14'),(20,1,23,'haoA','1233','2023-12-18 12:27:22'),(21,1,23,'haoA','1','2023-12-18 12:40:09'),(22,1,23,'haoA','1','2023-12-18 12:43:20'),(23,1,23,'haoA','345','2023-12-18 12:46:09'),(24,1,23,'haoA','345sdfsd','2023-12-18 12:46:24'),(25,1,23,'haoA','5','2023-12-18 23:00:58'),(26,1,24,'haoA','适当放松的','2023-12-20 10:45:07'),(27,1,23,'haoA','1','2023-12-20 10:45:52'),(28,1,23,'haoA','1','2023-12-20 10:48:19'),(29,1,23,'haoA','1sdfsafdf','2023-12-20 10:48:37'),(30,1,23,'haoA','sdfsa a as安抚','2023-12-20 11:06:23'),(31,1,23,'haoA','56543','2023-12-20 11:09:14'),(32,1,23,'haoA','sdfsdfasdfsdf','2023-12-20 11:13:43');
/*!40000 ALTER TABLE `GMESSAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GROUPS`
--

DROP TABLE IF EXISTS `GROUPS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GROUPS` (
  `gid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GROUPS`
--

LOCK TABLES `GROUPS` WRITE;
/*!40000 ALTER TABLE `GROUPS` DISABLE KEYS */;
INSERT INTO `GROUPS` VALUES (1,'haoA'),(2,'BUDUI');
/*!40000 ALTER TABLE `GROUPS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GROUP_USER`
--

DROP TABLE IF EXISTS `GROUP_USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GROUP_USER` (
  `uid` int unsigned NOT NULL,
  `gid` int unsigned NOT NULL,
  PRIMARY KEY (`uid`,`gid`),
  KEY `gid` (`gid`),
  CONSTRAINT `gid` FOREIGN KEY (`gid`) REFERENCES `GROUPS` (`gid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `USER` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GROUP_USER`
--

LOCK TABLES `GROUP_USER` WRITE;
/*!40000 ALTER TABLE `GROUP_USER` DISABLE KEYS */;
INSERT INTO `GROUP_USER` VALUES (1,1),(2,1),(3,1),(4,1),(23,1),(24,1);
/*!40000 ALTER TABLE `GROUP_USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MESSAGE`
--

DROP TABLE IF EXISTS `MESSAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MESSAGE` (
  `mid` int unsigned NOT NULL AUTO_INCREMENT,
  `s_uid` int NOT NULL,
  `r_uid` int NOT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MESSAGE`
--

LOCK TABLES `MESSAGE` WRITE;
/*!40000 ALTER TABLE `MESSAGE` DISABLE KEYS */;
/*!40000 ALTER TABLE `MESSAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UMESSAGE`
--

DROP TABLE IF EXISTS `UMESSAGE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UMESSAGE` (
  `mid` int unsigned NOT NULL AUTO_INCREMENT,
  `s_uid` int NOT NULL,
  `r_uid` int NOT NULL,
  `text` varchar(500) DEFAULT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UMESSAGE`
--

LOCK TABLES `UMESSAGE` WRITE;
/*!40000 ALTER TABLE `UMESSAGE` DISABLE KEYS */;
INSERT INTO `UMESSAGE` VALUES (2,23,24,'5','2023-12-18 22:46:09'),(3,23,24,'1','2023-12-18 22:51:44'),(4,23,24,'1','2023-12-18 22:56:06'),(5,23,24,'1','2023-12-18 23:03:54'),(6,24,23,'456456','2023-12-18 23:05:51'),(7,23,24,'66','2023-12-18 23:07:01'),(8,23,24,'sdfsdfasdf','2023-12-20 11:12:57'),(9,24,23,'适当放松地方','2023-12-20 11:13:08'),(10,24,23,'适当放松地方适当放松地方','2023-12-20 11:13:12');
/*!40000 ALTER TABLE `UMESSAGE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `uid` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'admin','admin'),(2,'user1','user1'),(3,'user2','user2'),(4,'123','123'),(23,'555','555'),(24,'888','888');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 11:33:03
