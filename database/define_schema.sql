USE `nbd_budget`;

DROP TABLE IF EXISTS `expense_category`;
DROP TABLE IF EXISTS `expenses`;
DROP TABLE IF EXISTS `incomes`;
DROP TABLE IF EXISTS `debts`;

CREATE TABLE `expenses` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_allowance` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `expense_category` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `expense_id` INT NOT NULL,
    `name` TEXT,
	PRIMARY KEY (`id`),
    FOREIGN KEY (`expense_id`) REFERENCES `expenses`(`id`)
);

CREATE TABLE `incomes` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `monthly_profit` FLOAT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `debts` (
	`id` INT AUTO_INCREMENT UNIQUE NOT NULL,
    `name` TEXT,
    `total` FLOAT,
	PRIMARY KEY (`id`)
);
