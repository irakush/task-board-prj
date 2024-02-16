from models import db, User, Task, UserTask, Board
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)
CORS(app)


@app.route("/")
def home():
    return "flask server"


#############################################################
######################### api = Api(app) ####################
#############################################################

#############################################################
######################### @app.route ########################
#############################################################


#############################################################
######################### USER ##############################
#############################################################
@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        users = User.query.all()
        # add rules = ("-singups", )
        response = make_response([user.to_dict() for user in users], 200)
    elif request.method == "POST":
        try:
            form_data = request.get_json()

            new_user = User(name=form_data["name"])

            db.session.add(new_user)
            db.session.commit()

            response = make_response(new_user.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

    return response


@app.route("/users/<int:id>", methods=["GET", "PATCH", "DELETE"])
def users_by_id(id):
    user = User.query.filter(User.id == id).first()
    if user:
        if request.method == "GET":
            response = make_response(user.to_dict(), 200)
        elif request.method == "PATCH":
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(user, attr, form_data[attr])

                db.session.commit()

                response = make_response(user.to_dict(), 202)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        elif request.method == "DELETE":
            assoc_tasks = UserTask.query.filter(UserTask.user_id == id).all()
            for assoc_task in assoc_tasks:
                db.session.delete(assoc_task)

            db.session.delete(user)
            db.session.commit()

            response = make_response({}, 204)
    else:
        response = make_response({"error": "User not found"}, 404)

    return response


#############################################################
######################### TASK ##############################
#############################################################
@app.route("/tasks", methods=["GET", "POST"])
def tasks():
    if request.method == "GET":
        tasks = Task.query.all()
        # add rules = ("-singups", )
        response = make_response([task.to_dict() for task in tasks], 200)
    elif request.method == "POST":
        try:
            form_data = request.get_json()

            new_task = Task(name=form_data["name"], status=form_data["status"])

            db.session.add(new_task)
            db.session.commit()

            response = make_response(new_task.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

    return response


@app.route("/tasks/<int:id>", methods=["GET", "PATCH", "DELETE"])
def tasks_by_id(id):
    task = Task.query.filter(Task.id == id).first()
    if task:
        if request.method == "GET":
            response = make_response(task.to_dict(), 200)
        elif request.method == "PATCH":
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(task, attr, form_data[attr])

                db.session.commit()

                response = make_response(task.to_dict(), 202)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        elif request.method == "DELETE":
            assoc_tasks = UserTask.query.filter(UserTask.task_id == id).all()
            for assoc_task in assoc_tasks:
                db.session.delete(assoc_task)

            db.session.delete(task)
            db.session.commit()

            response = make_response({}, 204)
    else:
        response = make_response({"error": "task not found"}, 404)

    return response


#############################################################
######################### Board #############################
#############################################################
@app.route("/boards", methods=["GET", "POST"])
def boards():
    if request.method == "GET":
        boards = Board.query.all()
        # add rules = ("-singups", )
        response = make_response([board.to_dict() for board in boards], 200)
    elif request.method == "POST":
        try:
            form_data = request.get_json()

            new_board = Board(name=form_data["name"])

            db.session.add(new_board)
            db.session.commit()

            response = make_response(new_board.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

    return response


@app.route("/boards/<int:id>", methods=["GET", "PATCH", "DELETE"])
def boards_by_id(id):
    board = Board.query.filter(Board.id == id).first()
    if board:
        if request.method == "GET":
            response = make_response(board.to_dict(), 200)
        elif request.method == "PATCH":
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(board, attr, form_data[attr])

                db.session.commit()

                response = make_response(board.to_dict(), 202)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        elif request.method == "DELETE":
            assoc_boards = UserTask.query.filter(UserTask.board_id == id).all()
            for assoc_board in assoc_boards:
                db.session.delete(assoc_board)

            db.session.delete(board)
            db.session.commit()

            response = make_response({}, 204)
    else:
        response = make_response({"error": "board not found"}, 404)

    return response


#############################################################
######################### UserTask ##########################
#############################################################
@app.route("/user_tasks", methods=["GET", "POST"])
def user_tasks():
    if request.method == "GET":
        user_tasks = UserTask.query.all()
        # add rules = ("-singups", )
        response = make_response([user_task.to_dict() for user_task in user_tasks], 200)
    elif request.method == "POST":
        try:
            form_data = request.get_json()

            new_user_task = UserTask(
                user_id=form_data["user_id"],
                task_id=form_data["task_id"],
                board_id=form_data["board_id"],
                end_date=form_data["end_date"],
            )

            db.session.add(new_user_task)
            db.session.commit()

            response = make_response(new_user_task.to_dict(), 201)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

    return response


@app.route("/user_tasks/<int:id>", methods=["GET", "PATCH", "DELETE"])
def user_tasks_by_id(id):
    user_task = UserTask.query.filter(UserTask.id == id).first()
    if user_task:
        if request.method == "GET":
            response = make_response(user_task.to_dict(), 200)
        elif request.method == "PATCH":
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(user_task, attr, form_data[attr])

                db.session.commit()

                response = make_response(user_task.to_dict(), 202)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        elif request.method == "DELETE":
            db.session.delete(user_task)
            db.session.commit()

            response = make_response({}, 204)
    else:
        response = make_response({"error": "UserTask not found"}, 404)

    return response


if __name__ == "__main__":
    app.run(port=5555, debug=True)
