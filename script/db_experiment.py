import pymysql

db = pymysql.connect("db", "root", "experiment_pwd", "experiment_db")

cursor = db.cursor()

cursor.execute("SELECT VERSION()")

data = cursor.fetchone()

print("database version: %s", data)

db.close()
