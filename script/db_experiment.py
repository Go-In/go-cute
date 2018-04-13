import pymysql

db = pymysql.connect("db", "root", "testing", "testing")

cursor = db.cursor()

cursor.execute("SELECT VERSION()")

data = cursor.fetchone()

print("database version: %s", data)

db.close()
