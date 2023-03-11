"""empty message

Revision ID: 7e9e6a511477
Revises:
Create Date: 2023-03-11 11:16:57.429538

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '7e9e6a511477'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('breweries',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=40), nullable=False),
                    sa.Column('address', sa.String(
                        length=255), nullable=False),
                    sa.Column('city', sa.String(length=255), nullable=False),
                    sa.Column('state', sa.String(length=255), nullable=False),
                    sa.Column('country', sa.String(
                        length=255), nullable=False),
                    sa.Column('type', sa.String(length=255), nullable=False),
                    sa.Column('description', sa.String(
                        length=255), nullable=False),
                    sa.Column('picture', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.Column('first_name', sa.String(
                        length=255), nullable=False),
                    sa.Column('last_name', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('beers',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('description', sa.String(), nullable=False),
                    sa.Column('abv', sa.Float(), nullable=False),
                    sa.Column('ibu', sa.Float(), nullable=True),
                    sa.Column('style', sa.String(), nullable=False),
                    sa.Column('label', sa.String(), nullable=True),
                    sa.Column('year', sa.Integer(), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('brewery_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['brewery_id'], ['breweries.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('description'),
                    sa.UniqueConstraint('name')
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('rating', sa.Float(), nullable=False),
                    sa.Column('body', sa.String(length=1000), nullable=False),
                    sa.Column('image', sa.String(length=500), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('beer_id', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['beer_id'], ['beers.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE <table_name> SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('beers')
    op.drop_table('users')
    op.drop_table('breweries')
    # ### end Alembic commands ###
