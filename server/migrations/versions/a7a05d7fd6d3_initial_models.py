"""Initial models

Revision ID: a7a05d7fd6d3
Revises: 
Create Date: 2024-02-12 19:44:00.155060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a7a05d7fd6d3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_boards'))
    )
    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('status', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_tasks'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users'))
    )
    op.create_table('user_tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('end_date', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('board_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['board_id'], ['boards.id'], name=op.f('fk_user_tasks_board_id_boards')),
    sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], name=op.f('fk_user_tasks_task_id_tasks')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_tasks_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_user_tasks'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_tasks')
    op.drop_table('users')
    op.drop_table('tasks')
    op.drop_table('boards')
    # ### end Alembic commands ###