import sqlite3


conn = sqlite3.connect("dbs/bank.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_number TEXT UNIQUE,
    first_name TEXT,
    last_name TEXT,
    balance REAL,
    balance_status TEXT
)
""")

cursor.execute("INSERT INTO users (account_number, first_name, last_name, balance, balance_status) VALUES (?, ?, ?, ?, ?)",
               ('ACC123', 'David', 'Dragon',  1000.50, 'Positive'))

cursor.execute("INSERT INTO users (account_number, first_name, last_name, balance, balance_status) VALUES (?, ?, ?, ?, ?)",
               ('ACC456', 'Alice', 'Prout',  500.75, 'Positive'))


# Création de la table Transactions
cursor.execute("""
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_id TEXT,
    to_id TEXT,
    from_account TEXT,
    to_account TEXT,
    amount REAL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()
conn.close()
