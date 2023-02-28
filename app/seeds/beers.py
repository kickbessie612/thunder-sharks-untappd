from app.models.beer import db, Beer, environment, SCHEMA


def seed_beers():
    beer1 = Beer(
        name="Keelin' It Exploration IPA", description='Citrus and stone fruit notes. Mildly hoppy. Lightly floral.',
        abv=6, style='IPA - American', label='https://assets.untappd.com/site/beer_logos/beer-3362046_f0bd5_sm.jpeg')

    beer2 = Beer(
        name="Kentucky Brunch Brand Stout", description='This beer is the real McCoy. Barrel aged and crammed with coffee, none other will stand in it’s way. Sought out for being delicious, it is notoriously difficult to track down. If you can find one, shoot to kill, because it is definitely wanted... dead or alive.',
        abv=13, style='Stout - Imperial / Double', year=2016, label='https://assets.untappd.com/site/beer_logos/beer-131332_2a8ab_sm.jpeg')

    beer3 = Beer(
        name="Good Morning", description="Brewed with Monson's own Maxwell Road Maple Grade A Dark Amber Maple syrup, Good Morning pours pitch black in the glass with a creamy mousse-like head. The bubbles give way to aromas of rich milk chocolate, cocoa powder, and dark amber maple syrup. The flavor starts as a blast of milk chocolate, sweet maple syrup, and rich fresh coffee as deeper complexities are uncovered as it warms. ",
        abv=8.4, ibu=65, style='Stout - Imperial / Double', label='https://assets.untappd.com/site/beer_logos/beer-808915_7e795_sm.jpeg')

    db.session.add(beer1)
    db.session.add(beer2)
    db.session.add(beer3)
    db.session.commit()


def undo_beers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM beers")

    db.session.commit()
