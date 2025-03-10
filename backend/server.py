import os
from typing import Optional, Dict, Any
from flask import Flask, request, jsonify
import sqlite3
import subprocess
import jwt
import hashlib
import sqlite3
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# VARIABLES #################################
SECRET_KEY  = "your_secret_key"
DBS_DIR     = "dbs"
COBOL_PROGRAMS_DIR = 'cobol_programs'


def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token(username, user_id):
    payload = {
        "username": username,
        "id": user_id, 
        # "exp": datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def fetch_data(db_path, table_name, data:Optional[Dict[str, Any]]=None):
    """Fetch content from a specific campaign database and return as a list of dictionaries."""
    try: 
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = [column[1] for column in cursor.fetchall()]  #
        if data:
            cursor.execute(f"SELECT * FROM {table_name} WHERE {data['name']} = ?", data['value'])
        else:
            cursor.execute(f"SELECT * FROM {table_name}")
        
        data_fetched = cursor.fetchall()

        conn.close()

        return [dict(zip(columns, row)) for row in data_fetched]
    
    except Exception as e:
        print(f'[fetch_data] : {e}')
        return []

###########################################
# Routes

@app.route('/login', methods=['POST'])
def login():

    data = request.json
    username = data.get("username")
    password = hash_password(data.get("password"))

    conn = sqlite3.connect(f"{DBS_DIR}/user.db")
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, username FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        user_id, username = user  
        token = generate_token(username, user_id)  
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@app.route("/transactions/<user_id>", methods=["GET"])
def get_transactions(user_id):
    db_file = os.path.join(DBS_DIR, 'bank.db')
    
    data = fetch_data(db_file, 'transactions', {"name": 'from_id', "value": user_id})

    return data, 200

@app.route("/transfer", methods=["POST"])
def transfer_money():
    data = request.json
    from_id = str(data.get("from_id"))
    to_id = str(data.get("to_id"))
    amount = float(data.get("amount"))

    db_file = os.path.join(DBS_DIR, 'bank.db')
    
    from_user_data = fetch_data(db_file, 'users', {"name": 'id', "value": from_id})
    to_user_data   = fetch_data(db_file, 'users', {"name": 'id', "value": to_id})

    if not (from_user_data and to_user_data):
        msg = 'Cannot transfer the money'
        print("[transfer_money] :", msg)
        return jsonify({'message': msg}), 400
    
    from_user = from_user_data[0]   #Fetch the first and only data in the db
    to_user   = to_user_data[0]
    from_user_balance = from_user['balance']
    to_user_balance   = to_user['balance']

    if from_user_balance < amount:
        return jsonify({"message": "Insufficient funds"}), 400


    # Call COBOL program using subprocess and pass parameters as command-line arguments
    result = subprocess.run(
        [f'{COBOL_PROGRAMS_DIR}/transfer', 'TransferMoney', 
            str(from_user_balance), 
            str(to_user_balance), 
            str(amount)],
        capture_output=True,
        text=True
    )

    # After COBOL processes the transaction, check the result and update the database
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    if "YES" in result.stdout:
        from_user_account = from_user['account_number']
        to_user_account   = to_user['account_number']
        cursor.execute("UPDATE users SET balance = balance - ? WHERE account_number = ?", (amount, from_user_account))
        cursor.execute("UPDATE users SET balance = balance + ? WHERE account_number = ?", (amount, to_user_account))

        cursor.execute("INSERT INTO transactions (from_account, to_account, amount) VALUES (?, ?, ?)", (from_user_account, to_user_account, amount))

        conn.commit()
        conn.close()

        return jsonify({"message": "Transfer successful"}), 200
    
    else:
        conn.close()
        return jsonify({"error": "Transfer failed"}), 400

@app.route("/account/<user_id>", methods=["GET"])
def get_account(user_id):
    try:
        db_file = os.path.join(DBS_DIR, 'bank.db')
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()
        
        cursor.execute("SELECT account_number, first_name, last_name, balance FROM users WHERE id=?", (user_id,))
        user = cursor.fetchone()

        user = fetch_data(db_file, 'users', {"name": 'id', "value": user_id})[0] # fetch the only user

        if not user:
            conn.close()
            return jsonify({"error": "Account not found"}), 404

        balance = user["balance"]
        if balance > 0:
            balance_status = "Positive"
        elif balance < 0:
            balance_status = "Negative"
        else:
            balance_status = "Zero"
        
        response_data = {
            "account_number": user["account_number"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "balance": balance,
            "balance_status": balance_status
        }


        conn.close()
 
        return jsonify(response_data), 200
    
    except sqlite3.Error as e:
        print(f"[get_account] : Database error: {e}")
        return jsonify({"message": f"An error occurred: {e}"}), 500
    
    except Exception as e:
        print(f"[get_account]: Database error: {e}")
        return jsonify({"message": f"An error occurred: {e}"}), 500


##############################
# Run
app.run(port=5000, debug=True)
