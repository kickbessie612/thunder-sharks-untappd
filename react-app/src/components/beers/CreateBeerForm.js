import BeerForm from './BeerForm';

const CreateBeerForm = () => {
  const beer = {
    name: '',
    description: '',
    abv: '',
    style: '',
    label: ''
  };
  return <BeerForm beer={beer} />;
};

export default CreateBeerForm;
