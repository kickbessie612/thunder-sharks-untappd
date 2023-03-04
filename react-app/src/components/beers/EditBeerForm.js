import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BeerForm from './BeerForm';
import { fetchBeer } from '../../store/beers';

const EditBeerForm = () => {
  const { beerId } = useParams();
  const beersObj = useSelector(state => state.beers);

  const beer = beersObj[beerId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeer(beerId));
  }, [dispatch, beerId]);

  if (!beer) {
    return null;
  }

  return <BeerForm beer={beer} />;
};

export default EditBeerForm;
