from app.models.beer import db, Beer, environment, SCHEMA


def seed_beers():
    beer1 = Beer(
        name="Keelin' It Exploration IPA", description='Citrus and stone fruit notes. Mildly hoppy. Lightly floral.',
        abv=6, ibu=0, style='IPA - American', year=0, label='https://assets.untappd.com/site/beer_logos_hd/beer-3362046_f0bd5_hd.jpeg', user_id=1, brewery_id=1)

    beer2 = Beer(
        name="Kentucky Brunch Brand Stout", description='This beer is the real McCoy. Barrel aged and crammed with coffee, none other will stand in it’s way. Sought out for being delicious, it is notoriously difficult to track down. If you can find one, shoot to kill, because it is definitely wanted... dead or alive.',
        abv=13, ibu=0, style='Stout - Imperial / Double', year=2016, label='https://assets.untappd.com/site/beer_logos_hd/beer-131332_040df_hd.jpeg', user_id=2, brewery_id=2)

    beer3 = Beer(
        name="Good Morning", description="Brewed with Monson's own Maxwell Road Maple Grade A Dark Amber Maple syrup, Good Morning pours pitch black in the glass with a creamy mousse-like head. The bubbles give way to aromas of rich milk chocolate, cocoa powder, and dark amber maple syrup. The flavor starts as a blast of milk chocolate, sweet maple syrup, and rich fresh coffee as deeper complexities are uncovered as it warms. ",
        abv=8.4, ibu=65, style='Stout - Imperial / Double', year=0, label='https://assets.untappd.com/site/beer_logos_hd/beer-808915_50cbe_hd.jpeg', user_id=3, brewery_id=3)

    beer4 = Beer(
        name="Assassin", description="After endless hours of scorching in heat, brewing in turmoil, fermenting in angst, the Assassin's journey has just begun. Aged in 20 year Pappy Van Winkle barrels.",
        abv=12.8, ibu=0, style='Stout - Imperial / Double', year=2014, label='https://assets.untappd.com/site/beer_logos_hd/beer-763835_fa3da_hd.jpeg', user_id=1, brewery_id=4)

    beer5 = Beer(
        name="King Henry", description="Aged in Pappy Van Winkle 23 bourbon barrels, previously used to age Rare Bourbon County Brand Stout. King Henry is a burgundy hued English-style barleywine with aromas of vanilla, oak, and dark fruit. Caramel and toffee flavors blend together with bold notes of bourbon delivered in a smooth body followed by a malty finish. ",
        abv=13.4, ibu=60, style='Barleywine - English', year=0, label='https://assets.untappd.com/site/beer_logos_hd/beer-43152_81531_hd.jpeg', user_id=2, brewery_id=5)

    beer6 = Beer(
        name="Dark Lord - Marshmallow Handjee", description="Dark Lord aged in bourbon barrels with vanilla beans bottled with a space-themed label.",
        abv=15, ibu=0, style='Stout - Russian Imperial', year=2016, label='https://assets.untappd.com/site/beer_logos_hd/beer-1529002_75107_hd.jpeg', user_id=3, brewery_id=6)

    db.session.add(beer1)
    db.session.add(beer2)
    db.session.add(beer3)
    db.session.add(beer4)
    db.session.add(beer5)
    db.session.add(beer6)
    db.session.commit()


def undo_beers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.beers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM beers")

    db.session.commit()
