CREATE TABLE IF NOT EXISTS Banks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  anual_interest_rate FLOAT NOT NULL,
  max_installments INT NOT NULL
);

INSERT INTO Banks (name, anual_interest_rate, max_installments) VALUES
('Banco do Brasil', 6, 36),
('Caixa Econômica Federal', 12, 60),
('Bradesco', 15, 48),
('Itaú', 18, 24),
('Santander', 20, 48),
('Sicoob', 10, 72),
('Inter', 9, 60),
('Original', 16, 36),
('Nubank', 19, 24),
('Picpay', 24, 12);