import BeerForm from './BeerForm';

const CreateBeerForm = () => {
  const beer = {
    name: '',
    description: '',
    abv: '',
    ibu: '',
    style: '',
    label: '',
    year: ''
  };
  return <BeerForm beer={beer} />;
};

export default CreateBeerForm;
