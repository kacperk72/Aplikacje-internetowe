-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 16 Maj 2023, 17:57
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `przetargi`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tenders`
--

CREATE TABLE `tenders` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime NOT NULL,
  `max_budget` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `tenders`
--

INSERT INTO `tenders` (`id`, `title`, `institution`, `description`, `start_datetime`, `end_datetime`, `max_budget`) VALUES
(1, 'Przetarg na dostawę sprzętu komputerowego', 'Urząd Miasta', 'Dostawa 50 komputerów z monitorem', '2023-05-09 09:00:00', '2023-05-23 17:00:00', '50000.00'),
(2, 'Usługi sprzątania biura', 'Spółka XYZ', 'Sprzątanie biura 3 razy w tygodniu przez 12 miesięcy', '2023-05-12 14:00:00', '2023-05-15 16:00:00', '12000.00'),
(3, 'Renowacja parku miejskiego', 'Urząd Miasta', 'Renowacja alejek, ławek i oświetlenia w parku', '2023-05-19 10:00:00', '2023-05-31 18:00:00', '35000.00'),
(6, 'Dostawa komputerów', 'Uniwersytet Gdański', 'Dostawa 100 komputerów do laboratorium informatycznego.', '2023-05-10 08:00:00', '2023-05-15 20:00:00', '50000.00'),
(7, 'Serwis sprzątający', 'Urząd Miasta Gdańsk', 'Codzienna obsługa sprzątająca biur w urzędzie.', '2023-05-12 09:00:00', '2023-07-18 20:00:00', '20000.00'),
(8, 'Remont ulicy', 'Zarząd Dróg Miejskich', 'Remont odcinka ulicy Długiej.', '2023-05-01 10:00:00', '2023-05-08 20:00:00', '300000.00'),
(9, 'Dostawa mebli', 'Szkoła Podstawowa nr 44', 'Dostawa ławek i krzeseł do sal lekcyjnych.', '2023-05-15 11:00:00', '2023-07-22 20:00:00', '25000.00'),
(10, 'Przetarg na oprogramowanie', 'Urząd Statystyczny', 'Dostawa i instalacja oprogramowania statystycznego.', '2023-05-16 12:00:00', '2023-07-23 20:00:00', '35000.00'),
(11, 'Zakup samochodów służbowych', 'Policja', 'Zakup 10 samochodów patrolowych.', '2023-05-01 13:00:00', '2023-05-08 20:00:00', '500000.00'),
(12, 'Usługi cateringowe', 'Uniwersytet Gdański', 'Dostawa codziennego cateringu dla pracowników.', '2023-05-17 14:00:00', '2023-08-24 20:00:00', '15000.00'),
(13, 'Renowacja parku', 'Zarząd Zieleni Miejskiej', 'Renowacja parku miejskiego.', '2023-05-18 15:00:00', '2023-09-25 20:00:00', '120000.00'),
(14, 'Dostawa sprzętu sportowego', 'Szkoła Podstawowa nr 44', 'Dostawa sprzętu do sali gimnastycznej.', '2023-06-01 10:00:00', '2023-07-08 20:00:00', '20000.00'),
(15, 'Budowa biblioteki', 'Miasto Gdańsk', 'Budowa nowoczesnej biblioteki miejskiej.', '2023-06-02 11:00:00', '2023-08-09 20:00:00', '5000000.00');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `tenders`
--
ALTER TABLE `tenders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `tenders`
--
ALTER TABLE `tenders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
