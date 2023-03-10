import BeerForm from './BeerForm';

const CreateBeerForm = () => {
  const beer = {
    name: '',
    description: '',
    abv: '',
    style: '',
    label: '',
    ibu: -1,
    year: 0
  };
  return <BeerForm beer={beer} />;
};

export default CreateBeerForm;
