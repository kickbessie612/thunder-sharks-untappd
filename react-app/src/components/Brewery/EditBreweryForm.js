import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BreweryForm from './BreweryForm';
import { getBreweries } from '../../store/brewery';

const EditBreweryForm = () => {
  const { breweryId } = useParams();
  const breweriesObj = useSelector(state => state.breweries);

  const brewery = breweriesObj[breweryId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreweries(breweryId));
  }, [dispatch, breweryId]);

  if (!brewery) {
    return null;
  }

  return <BreweryForm brewery={brewery} />;
};

export default EditBreweryForm;
