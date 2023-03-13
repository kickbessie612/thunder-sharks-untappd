
from app.models import db, Brewery, environment, SCHEMA


def seed_breweries():
    brewery1 = Brewery(user_id=1,
                       name="Jackson Street Brewing", address='607 5th St', city='Sioux City', state='IA', country='USA', type='Nano Brewery',
                       description="Starting out as a labor of love in our kitchen, Jackson Street Brewing is our dream come true. We love beers and living off of the land and if you do, too, you've come to the right place! ", picture='https://www.stonebrewing.com//sites/default/files/defaults/stone-social-brandmark.jpg')
    brewery2 = Brewery(user_id=2,
                       name="Anchorage Brewing Company", address='148 W 91st Ave', city='Anchorage', state='AK', country='USA', type='Micro Brewery',
                       description='Anchorage Brewing Company is founded by Gabe Fletcher. Known for its specialized skill, Anchorage Brewery became one of the newest breweries in Alaska. ', picture='https://images.squarespace-cdn.com/content/v1/5f5a624a96e5374cbcece43b/4164aa95-9692-4c4c-8234-2ecc5daa2eef/image-asset+%282%29.jpeg')
    brewery3 = Brewery(user_id=3,
                       name="Tree House Brewing Company", address='129 Sturbridge Rd', city='Charlton', state='MA', country='USA', type='Regional Brewery',
                       description='Tree House Brewing Company brews a vast array of ales. The offerings vary based on the season, our moods, and innovations discovered in the midst of day in and day out brewing.', picture='https://pbs.twimg.com/profile_images/874336241512095744/PR_rCgkU_400x400.jpg')
    brewery4 = Brewery(user_id=1,
                       name="Toppling Goliath Brewing Co.", address='1600 Prosperity Rd', city='Decorah', state='IA', country='USA', type='Regional Brewery',
                       description='Named 2021 US Beer Open Grand National Champions. Founded in 2009 in beautiful Decorah, Iowa. World-renown for IPAs and barrel-aged stouts, distributing to over 30 states and brewing more than 35 beers. ', picture='https://assets.untappd.com/site/brewery_logos/brewery-7532_6617a.jpeg')
    brewery5 = Brewery(user_id=2,
                       name="Goose Island Beer Co.", address='1800 N Clybourn Ave', city='Chicago', state='IL', country='USA', type='Macro Brewery',
                       description='Our famous beer began with a trip across Europe, when Goose Island founder (and unabashed beer lover) John Hall took a tour across the continent. ', picture='https://assets.untappd.com/site/brewery_logos/brewery-2898_7588b.jpeg')
    brewery6 = Brewery(user_id=3,
                       name="3 Floyds Brewing", address='9750 Indiana Pkwy', city='Munster', state='IN', country='USA', type='Micro',
                       description="Nick Floyd founded 3 Floyds in a Hammond, Indiana, garage in 1996. The then-small brewery with the \"It's Not Normal\" motto set out to stand out with bold, aggressive, highly hopped beers. ", picture='https://assets.untappd.com/site/brewery_logos/brewery-2470_fbcd9.jpeg')

    db.session.add(brewery1)
    db.session.add(brewery2)
    db.session.add(brewery3)
    db.session.add(brewery4)
    db.session.add(brewery5)
    db.session.add(brewery6)
    db.session.commit()


def undo_breweries():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.breweries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM breweries")

    db.session.commit()
