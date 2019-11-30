USE `nbd_budget`;

DROP TABLE IF EXISTS `expense_transactions`;
DROP TABLE IF EXISTS `expenses`;
DROP TABLE IF EXISTS `income_transactions`;
DROP TABLE IF EXISTS `incomes`;
DROP TABLE IF EXISTS `obligation_transactions`;
DROP TABLE IF EXISTS `obligations`;
DROP TABLE IF EXISTS `debts`;

CREATE TABLE `expenses` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_allowance` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `expense_transactions` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `expense_id` INT NOT NULL,
    `name` TEXT,
    `total` FLOAT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`)
);

CREATE TABLE `incomes` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_profit` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `income_transactions` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `income_id` INT,
    `total` FLOAT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`income_id`) REFERENCES `incomes`(`id`)
);

CREATE TABLE `debts` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `total` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `obligations` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_total` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `obligation_transactions` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `obligation_id` INT,
    `total` FLOAT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`obligation_id`) REFERENCES `obligations`(`id`)
);
