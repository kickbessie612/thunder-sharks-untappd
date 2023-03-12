import './Home.css';

const Home = () => {
  return (
    <div className='full-screen home'>
      <div className='home-bg'></div>
      <div className='container'>
        <div className='color-block'></div>
        <div className='home-text'>
          <h2 className='home-welcome'>Welcome to the </h2>
          <h1 className='home-title'>RETAPPD</h1>
          <div className='home-description'>
            a new way to socially share the brew you're currently enjoying, as
            well as where you're enjoying it, with your friends!{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
