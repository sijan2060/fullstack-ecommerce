import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import { IoSearchSharp, IoClose } from "react-icons/io5";
import Slide from '@mui/material/Slide'; 
import { MyContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModel, setisOpenModel] = useState(false);
  const [selectedTab, setselectedTab] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const context = useContext(MyContext);

  const selectCountry = (index, country) => {
    setselectedTab(index);
    setisOpenModel(false);
    context.setselectedCountry(country);
  };

  const filterList = () => {
    const keyword = searchTerm.toLowerCase();
    return context.countryList.filter(item =>
      item.country.toLowerCase().includes(keyword)
    );
  };

  return (
    <>
      <Button className='countryDrop' onClick={() => setisOpenModel(true)}>
        <div className='info d-flex flex-column'>    
          <span className='label'>Your Location</span>
          <span className='name'>{context.selectedCountry !== "" ? context.selectedCountry.length>10 ? 
          context.selectedCountry?.substr(0,10)+'...': context.selectedCountry: 'Select Location'}</span> 
        </div>
        <span className='ml-auto'><FaAngleDown/></span>
      </Button>

      <Dialog open={isOpenModel} onClose={() => setisOpenModel(false)} className='locationModel' TransitionComponent={Transition}>
        <h4 className='mb-0'>Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area</p>
        <Button className='close_' onClick={() => setisOpenModel(false)}><IoClose/></Button>

        <div className='headerSearch w-100'>
          <input
            type='text'
            placeholder='Search your area...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button><IoSearchSharp/></Button>
        </div>

        <ul className='countryList'>
          {
            filterList().map((item, index) => (
              <li key={index}>
                <Button
                  onClick={() => selectCountry(index, item.country)}
                  className={`${context.selectedCountry === item.country ? 'active' : ''}`}
                >
                  {item.country}
                </Button>
              </li>
            ))
          }
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
