DROP DATABASE IF EXISTS formdata;
CREATE DATABASE formdata;
USE formdata;

DROP TABLE IF EXISTS userdata;
CREATE TABLE userdata(
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip INTEGER,
  phone VARCHAR(255),
  creditcard INTEGER,
  expirationdate DATE,
  cvv INTEGER,
  cczip INTEGER,
  PRIMARY KEY (id)
);



