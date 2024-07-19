-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 19, 2024 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `access_token` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `username`, `password`, `access_token`, `created_at`, `updated_at`) VALUES
(2, 'Admin 1', 'admin1', '$2b$10$jK9S7tUjYJf0H9dE2UaTl.DIULN279JrzFUxdBP04/2mdM87tBhf2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcyMTM5ODU3MSwiZXhwIjoxNzIxNDg0OTcxfQ.3a8IdykDHv8EMRIaYMo-DLgq6pUaQEWS58Ag6SKFQEo', '2024-07-18 20:52:25', '2024-07-19 21:16:11'),
(3, 'Admin 2', 'admin2', '$2b$10$CofyUCfDVqubGWbaSdNZwOOih2.vELpa80Wi95nDx/AQ.lm5EbeVa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlhdCI6MTcyMTM5NzA3MywiZXhwIjoxNzIxNDgzNDczfQ.hNYrPCKFYU62D22kTBe_XW1rvnC7970O1mG8D2b7bZo', '2024-07-19 20:48:36', '2024-07-19 20:51:13');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_code` varchar(25) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_code`, `title`, `author`, `stock`, `created_at`, `updated_at`) VALUES
('HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1, '2024-07-18 21:24:55', '2024-07-18 21:24:55'),
('JK-45', 'Harry Potter', 'J.K Rowling', 0, '2024-07-18 21:23:23', '2024-07-18 23:27:04'),
('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 0, '2024-07-18 21:25:21', '2024-07-19 20:09:07'),
('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 0, '2024-07-18 21:24:07', '2024-07-19 20:08:38'),
('TW-11', 'Twilight', 'Stephenie Meyer', 1, '2024-07-18 21:24:32', '2024-07-18 21:24:32');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `member_code` varchar(25) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`member_code`, `name`, `created_at`, `updated_at`) VALUES
('M001', 'Angga', '2024-07-18 21:42:43', '2024-07-18 21:42:43'),
('M002', 'Ferry', '2024-07-18 21:43:07', '2024-07-18 21:43:07'),
('M003', 'Putri', '2024-07-18 21:43:16', '2024-07-18 21:43:16');

-- --------------------------------------------------------

--
-- Table structure for table `penalty`
--

CREATE TABLE `penalty` (
  `penalty_id` int(11) NOT NULL,
  `member_code` varchar(25) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penalty`
--

INSERT INTO `penalty` (`penalty_id`, `member_code`, `created_at`, `updated_at`) VALUES
(1, 'M003', '2024-07-14 23:16:59', '2024-07-18 23:27:00');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `member_code` varchar(25) NOT NULL,
  `book_code` varchar(25) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `returned` int(11) NOT NULL DEFAULT 0,
  `return_at` datetime NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `member_code`, `book_code`, `admin_id`, `returned`, `return_at`, `created_at`, `updated_at`) VALUES
(1, 'M003', 'NRN-7', 2, 1, '2024-07-18 23:16:59', '2024-07-09 22:52:05', '2024-07-18 23:16:59'),
(3, 'M003', 'JK-45', 2, 1, '2024-07-18 23:15:14', '2024-07-18 22:55:24', '2024-07-18 23:15:14'),
(5, 'M003', 'JK-45', 2, 0, '0000-00-00 00:00:00', '2024-07-18 23:27:04', '2024-07-18 23:27:04'),
(6, 'M003', 'SHR-1', 2, 0, '0000-00-00 00:00:00', '2024-07-19 20:08:38', '2024-07-19 20:08:38'),
(7, 'M001', 'NRN-7', 2, 0, '0000-00-00 00:00:00', '2024-07-19 20:09:07', '2024-07-19 20:09:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_code`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_code`);

--
-- Indexes for table `penalty`
--
ALTER TABLE `penalty`
  ADD PRIMARY KEY (`penalty_id`),
  ADD KEY `member_code` (`member_code`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `member_code` (`member_code`),
  ADD KEY `book_code` (`book_code`),
  ADD KEY `admin_id` (`admin_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `penalty`
--
ALTER TABLE `penalty`
  MODIFY `penalty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penalty`
--
ALTER TABLE `penalty`
  ADD CONSTRAINT `penalty_ibfk_1` FOREIGN KEY (`member_code`) REFERENCES `member` (`member_code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`member_code`) REFERENCES `member` (`member_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`book_code`) REFERENCES `book` (`book_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_3` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
