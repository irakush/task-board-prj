from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Add relationship
    user_tasks = db.relationship("UserTask", back_populates="user")
    # Add serialization rules
    serialize_rules = ("-user_tasks.user",)

    # Add validation
    @validates("name")
    def time_validates(self, key, value):
        if not value:
            raise ValueError(f"Failed {key} validation")

        return value

    def __repr__(self):
        return f"<User {self.id}: {self.name}>"


class Task(db.Model, SerializerMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    status = db.Column(db.String)
    # board_id = db.Column(db.Integer, db.ForeignKey("boards.id"))

    # Add relationship
    user_tasks = db.relationship("UserTask", back_populates="task")
    # Add serialization rules
    serialize_rules = ("-user_tasks.task",)

    def __repr__(self):
        return f"<Task {self.id}: {self.name}>"


class Board(db.Model, SerializerMixin):
    __tablename__ = "boards"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Add relationship
    user_tasks = db.relationship("UserTask", back_populates="board")
    # Add serialization rules
    serialize_rules = ("-user_tasks.board",)

    def __repr__(self):
        return f"<Board {self.id}: {self.name}>"


class UserTask(db.Model, SerializerMixin):
    __tablename__ = "user_tasks"

    id = db.Column(db.Integer, primary_key=True)
    end_date = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))
    board_id = db.Column(db.Integer, db.ForeignKey("boards.id"))

    # Add relationship
    user = db.relationship("User", back_populates="user_tasks")
    task = db.relationship("Task", back_populates="user_tasks")
    board = db.relationship("Board", back_populates="user_tasks")
    # Add serialization rules
    serialize_rules = ("-user.user_tasks", "-task.user_tasks", "-board.user_tasks")

    def __repr__(self):
        return f"<UserTask {self.id}: {self.end_date}>"
