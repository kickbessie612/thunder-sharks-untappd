import BreweryForm from './BreweryForm';

const CreateBreweryForm = () => {
  const brewery = {
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    type: '',
    picture: ''
  };
  return <BreweryForm brewery={brewery} />;
};

export default CreateBreweryForm;
