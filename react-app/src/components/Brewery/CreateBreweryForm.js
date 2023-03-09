import BreweryForm from "./BreweryForm";

const CreateBreweryForm = () => {
  const brewery = {
    name: '',
    description: '',
    abv: '',
    style: '',
    label: ''
  };
  return <BreweryForm brewery={brewery} />;
};

export default CreateBreweryForm;
