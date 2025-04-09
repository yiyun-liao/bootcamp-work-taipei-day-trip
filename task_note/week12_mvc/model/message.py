from task_note.week12_mvc.dbconf import get_db_connection

class Message:
    def get_all_message():
        db=get_db_connection()
        cursor=db.cursor(dictionary=True)
        cursor.execute(
            "SELECT message.id, member.id AS member_id, member.name, message.content "
            "FROM message INNER JOIN member ON message.member_id=member.id ORDER BY message.id DESC ;")
        messages=cursor.fetchall()
        db.commit()
        cursor.close()
        # print(messages)
        return messages
    
    def create_message(member_id: int, content: str):
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("INSERT INTO message (member_id, content) VALUES (%s, %s);", (member_id, content))
        db.commit()
        db.close()

    def delete_message(message_id: int):
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("DELETE FROM message WHERE id = %s;", (message_id,))
        db.commit()
        db.close()