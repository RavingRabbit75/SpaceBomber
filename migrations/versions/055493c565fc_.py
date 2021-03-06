"""empty message

Revision ID: 055493c565fc
Revises: 21e8b3ccae65
Create Date: 2016-12-17 15:03:49.620265

"""

# revision identifiers, used by Alembic.
revision = '055493c565fc'
down_revision = '21e8b3ccae65'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('games', sa.Column('game_id', sa.Text(), nullable=True))
    op.create_unique_constraint(None, 'games', ['game_id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'games', type_='unique')
    op.drop_column('games', 'game_id')
    ### end Alembic commands ###
