from random import randint, choice as rc

from faker import Faker

from app import app

from models import db, User, Task, UserTask, Board

if __name__ == "__main__":

    with app.app_context():
        db.session.query(User).delete()
        db.session.query(Task).delete()
        db.session.query(Board).delete()
        db.session.query(UserTask).delete()
        db.session.commit()

        user_1 = User(name="Bob")
        user_2 = User(name="Anna")
        user_3 = User(name="Kevin")
        db.session.add_all([user_1, user_2, user_3])
        db.session.commit()

        task_1 = Task(name="Task 1", status="To Do")
        task_2 = Task(name="Task 2", status="Done")
        task_3 = Task(name="Task 3", status="In progress")
        db.session.add_all([task_1, task_2, task_3])
        db.session.commit()

        board_1 = Board(name="board 1")
        board_2 = Board(name="board 2")
        board_3 = Board(name="board 3")
        db.session.add_all([board_1, board_2, board_3])
        db.session.commit()

        user_task_1 = UserTask(end_date="2024/02/14", user_id=1, task_id=2, board_id=1)
        user_task_2 = UserTask(end_date="2024/02/11", user_id=2, task_id=1, board_id=1)
        user_task_3 = UserTask(end_date="2024/02/12", user_id=1, task_id=3, board_id=2)
        user_task_4 = UserTask(end_date="2024/02/09", user_id=3, task_id=1, board_id=2)
        user_task_5 = UserTask(end_date="2024/02/10", user_id=3, task_id=2, board_id=3)
        user_task_6 = UserTask(end_date="2024/02/15", user_id=1, task_id=3, board_id=2)
        db.session.add_all(
            [
                user_task_1,
                user_task_2,
                user_task_3,
                user_task_4,
                user_task_5,
                user_task_6,
            ]
        )
        db.session.commit()
