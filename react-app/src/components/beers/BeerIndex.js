import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBeers } from '../../store/beers';
import { NavLink } from 'react-router-dom';
import BeerIndexItem from './BeerIndexItem';
import './BeerIndex.css';

const BeerIndex = () => {
  const dispatch = useDispatch();
  const beers = useSelector(state => Object.values(state.beers)).sort(
    (a, b) => {
      if (a.id < b.id) {
        return 1;
      } else if (b.id < a.id) {
        return -1;
      }
      return 0;
    }
  );

  const carouselRef = useRef(null);

  useEffect(() => {
    dispatch(fetchBeers());
  }, [dispatch]);

  const slideLeft = () => {
    carouselRef.current.style.transform = 'translateX(-100%)';
  };

  const slideRight = () => {
    carouselRef.current.style.transform = 'translateX(0)';
  };

  if (beers.length === 0) {
    return null;
  }

  return (
    <>
      <div className='beer-list'>
        <div className='beer-color-block'></div>
        <div className='beer-color-circle'></div>
        <div className='beer-list-text'>
          <h1 className='introduction'>Popular Beers</h1>
          <div className='subtitle-container'>
            <div>"A drunk tongue is an honest one in my opinion."</div>
            <div className='people-name'>----Adele</div>
            <NavLink to='/beers/new'>
              <button className='add-beer-button'>Add Beer</button>
            </NavLink>
          </div>
        </div>
        <div className='beer-index' ref={carouselRef}>
          {beers.map(beer => (
            <BeerIndexItem beer={beer} key={beer.id} />
          ))}
        </div>
        <div className='carousel-controls'>
          <button className='prev-button' onClick={slideRight}>
            Prev
          </button>
          <button className='next-button' onClick={slideLeft}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BeerIndex;
