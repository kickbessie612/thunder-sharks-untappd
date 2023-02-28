
from app.models import db, Brewery, environment, SCHEMA





def seed_breweries():
    brewery1 = Brewery(name="Stone", address='123 Lane', city='San Diego', state='CA', country='USA', type='Micro', description='Good Beer', picture='url')
    brewery2 = Brewery(name="Modern Times", address='ABC Street', city='Boston', state='MA', country='USA', type='Micro', description='Good Brewery', picture='url')
    brewery3 = Brewery(name="Thorn", address='SSSV Drive', city='New York', state='NY', country='USA', type='Micro', description='Good Brewery', picture='url')
    db.session.add(brewery1)
    db.session.add(brewery2)
    db.session.add(brewery3)
    db.session.commit()


def undo_breweries():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.breweries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM breweries")

    db.session.commit()
