from app.models.review import db, Review, environment, SCHEMA


def seed_reviews():
    review1 = Review(
        rating=5, body='Day after my wedding in 2018. Unreal Beer experience. Long nature walk followed by this beast. Fresh coffee, sweet maple and tons of unique barrel flavor.', user_id=2, beer_id=1)

    review2 = Review(
        rating=1, body="I can't believe people like this?? Harsh unbalanced garbage!", user_id=3, beer_id=2)

    review3 = Review(
        rating=4, body='So smooth. Vanilla probably has faded a bit but still present rye spice still there. Real good.', user_id=1, beer_id=3)

    review4 = Review(
        rating=5, body='Decent but heavier than I expected. Casual beer, citrus was not bad.', user_id=3, beer_id=1)

    review5 = Review(
        rating=4, body="Very tasty lager! Quite good. Paired well with some homemade pizza!", user_id=1, beer_id=4)

    review6 = Review(
        rating=3, body='Celebration time! Got money back on taxes for the first time in YEARS.', user_id=2, beer_id=5)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
