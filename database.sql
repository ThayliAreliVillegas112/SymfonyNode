CREATE DATABASE company2;
use company2;
CREATE TABLE `office` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `office_code` varchar(6) NOT NULL,
  `adress` varchar(100) NOT NULL
  CONSTRAINT fk_employeeOffice FOREIGN KEY (id_office) REFERENCES employee(id_office)
);
CREATE TABLE `employees` (
  `id` int(11)PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `adress` varchar(100) NOT NULL,
  `salary` double NOT NULL,
  `registered` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `status` tinyint(4) NOT NULL,
  `id_office` int(6) NOT NULL
  
);
