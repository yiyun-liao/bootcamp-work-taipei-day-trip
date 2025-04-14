from task_note.week12_mvc.dbconf import get_db_connection

class Member:
    def find_member_by_username(username:str):
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM member WHERE username = %s;", (username,))
        user = cursor.fetchone()
        db.close()
        return user
    
    def create_member(name:str,username:str,password:str):
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("INSERT INTO member (name, username, password) VALUES (%s, %s, %s);", (name, username, password))
        db.commit()
        db.close()

    def verify_member(username:str,password:str):
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM member WHERE username=%s and password =%s;", (username, password))
        user_is_member=cursor.fetchone()
        db.close()  
        return user_is_member      
    
    def update_member_name(userId:int, new_name:str):
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("UPDATE member SET name=%s WHERE id=%s;", (new_name, userId))
        db.commit()
        success = cursor.rowcount > 0
        db.close()  
        return success   