USE `nbd_budget`;

DROP TABLE IF EXISTS `expense_transactions`;
DROP TABLE IF EXISTS `expense_categories`;
DROP TABLE IF EXISTS `expenses`;
DROP TABLE IF EXISTS `incomes`;
DROP TABLE IF EXISTS `debt_obligations`;
DROP TABLE IF EXISTS `debts`;

CREATE TABLE `expenses` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_allowance` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `expense_categories` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `expense_id` INT NOT NULL,
    `name` TEXT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`)
);

CREATE TABLE `expense_transactions` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `expense_category_id` INT NOT NULL,
    `name` TEXT,
    `total` FLOAT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`expense_category_id`) REFERENCES `expense_categories`(`id`)
);

CREATE TABLE `incomes` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_profit` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `debt_obligations` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_total` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `debts` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `total` FLOAT,
	PRIMARY KEY (`id`)
);
