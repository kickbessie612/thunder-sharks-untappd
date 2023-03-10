import BeerForm from './BeerForm';

const CreateBeerForm = () => {
  const beer = {
    name: '',
    description: '',
    abv: '',
    style: '',
    label: '',
    ibu: '',
    year: ''
  };
  return <BeerForm beer={beer} />;
};

export default CreateBeerForm;
