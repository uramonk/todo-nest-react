CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS item (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  body VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
  user (username, password, created_at, updated_at)
VALUES
  (
    'john',
    '$2b$10$YhZIRU/bL6gKQctiariPF.8fXcnAljg0uD2uXgrRg3Ob8gvG.sVES',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );

INSERT INTO
  user (username, password, created_at, updated_at)
VALUES
  (
    'maria',
    '$2b$10$HT8CQJRiX3gPABW0Zdx2z.cUqIXwpdP97BRXFblbcvmQ4ASVX0nfy',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  );