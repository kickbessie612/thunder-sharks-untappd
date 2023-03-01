
from app.models import db, Brewery, environment, SCHEMA


def seed_breweries():
    brewery1 = Brewery(
        name="Stone", address='1999 Citracado Parkwy', city='San Diego', state='CA', country='USA', type='Micro', description='Epic Beer', picture='https://www.stonebrewing.com//sites/default/files/defaults/stone-social-brandmark.jpg')
    brewery2 = Brewery(
        name="Modern Times", address='3725 Greenwood St', city='San Diego', state='CA', country='USA', type='Micro', description='SUper Fun Brewery', picture='https://images.squarespace-cdn.com/content/v1/5f5a624a96e5374cbcece43b/4164aa95-9692-4c4c-8234-2ecc5daa2eef/image-asset+%282%29.jpeg')
    brewery3 = Brewery(
        name="Thorn", address='3176 Thorn St', city='San Diego', state='CA', country='USA', type='Micro', description='Quality Brewery', picture='https://pbs.twimg.com/profile_images/874336241512095744/PR_rCgkU_400x400.jpg')
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
