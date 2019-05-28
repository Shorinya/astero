-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 04 2017 г., 16:42
-- Версия сервера: 5.5.50
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Skyhunter`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Results`
--

CREATE TABLE IF NOT EXISTS `Results` (
  `Id` int(11) NOT NULL,
  `Name` varchar(30) CHARACTER SET utf8 NOT NULL,
  `Stars` int(11) NOT NULL,
  `Time` time NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=cp1251;

--
-- Дамп данных таблицы `Results`
--

INSERT INTO `Results` (`Id`, `Name`, `Stars`, `Time`) VALUES
(1, 'Петя', 10, '00:03:00'),
(2, 'Вася', 11, '00:04:00'),
(4, 'Алексий', 3, '00:00:10'),
(5, 'Славик', 6, '00:00:10'),
(6, 'Михаил', 7, '00:00:10'),
(7, 'Аноним', 0, '00:00:02');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Results`
--
ALTER TABLE `Results`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Results`
--
ALTER TABLE `Results`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
