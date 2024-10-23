-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema softiidatabase
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema softiidatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `softiidatabase` DEFAULT CHARACTER SET utf8 ;
USE `softiidatabase` ;

-- -----------------------------------------------------
-- Table `softiidatabase`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softiidatabase`.`Employee` (
  `idEmployee` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idEmployee`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softiidatabase`.`PaymentMethod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softiidatabase`.`PaymentMethod` (
  `idPaymentMethod` INT NOT NULL AUTO_INCREMENT,
  `methodName` VARCHAR(90) NOT NULL,
  PRIMARY KEY (`idPaymentMethod`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softiidatabase`.`Shift`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softiidatabase`.`Shift` (
  `idShift` INT NOT NULL AUTO_INCREMENT,
  `dateShift` DATE NOT NULL,
  `totalTips` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idShift`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softiidatabase`.`Tip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softiidatabase`.`Tip` (
  `idTip` INT NOT NULL AUTO_INCREMENT,
  `amount` VARCHAR(45) NULL,
  `PaymentMethod_idPaymentMethod` INT NOT NULL,
  `Shift_idShift` INT NOT NULL,
  PRIMARY KEY (`idTip`),
  INDEX `fk_Tip_PaymentMethod_idx` (`PaymentMethod_idPaymentMethod` ASC) ,
  INDEX `fk_Tip_Shift1_idx` (`Shift_idShift` ASC) ,
  CONSTRAINT `fk_Tip_PaymentMethod`
    FOREIGN KEY (`PaymentMethod_idPaymentMethod`)
    REFERENCES `softiidatabase`.`PaymentMethod` (`idPaymentMethod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tip_Shift1`
    FOREIGN KEY (`Shift_idShift`)
    REFERENCES `softiidatabase`.`Shift` (`idShift`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softiidatabase`.`TipDistribution`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softiidatabase`.`TipDistribution` (
  `idTipDistribution` INT NOT NULL AUTO_INCREMENT,
  `amount` VARCHAR(45) NOT NULL,
  `Employee_idEmployee` INT NOT NULL,
  `Tip_idTip` INT NOT NULL,
  PRIMARY KEY (`idTipDistribution`),
  INDEX `fk_TipDistribution_Employee1_idx` (`Employee_idEmployee` ASC) ,
  INDEX `fk_TipDistribution_Tip1_idx` (`Tip_idTip` ASC) ,
  CONSTRAINT `fk_TipDistribution_Employee1`
    FOREIGN KEY (`Employee_idEmployee`)
    REFERENCES `softiidatabase`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TipDistribution_Tip1`
    FOREIGN KEY (`Tip_idTip`)
    REFERENCES `softiidatabase`.`Tip` (`idTip`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
