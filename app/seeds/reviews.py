from app.models.review import db, Review, environment, SCHEMA


def seed_reviews():
    review1 = Review(
        rating=5, comment='Day after my wedding in 2018. Unreal Beer experience. Long nature walk followed by this beast. Fresh coffee, sweet maple and tons of unique barrel flavor.', user_id=2, beer_id=1)

    review2 = Review(
        rating=1, comment="I can't believe people like this?? Harsh unbalanced garbage!", user_id=3, beer_id=2)

    review3 = Review(
        rating=4, comment='So smooth. Vanilla probably has faded a bit but still present rye spice still there. Real good.', user_id=1, beer_id=3)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
