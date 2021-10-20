import axios from "axios";
import Cookies from "js-cookie";
import React, { Fragment, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  InputGroup,
  Input,
  Button,
} from "reactstrap";

const Example = () => {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [search , setSearch] = useState([])



  async function onSearch(event){
      let response = await axios.get("http://localhost:5000/user/search-profile" , {
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`
        },
        params :{
          name : event.target.value
        }
      })
      setSearch(response.data.result);
  }

  function toProfile(userID){
      window.location.href = Cookies.get("userID") ?  `http://localhost:3000/profile/${userID}` : Cookies.get("mentorID") ? `http://localhost:3000/mentor/profile/${userID}` : `http://localhost:3000/admin/profile/${userID}`
  }

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };


  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="div" onClick={toggle}>
        <InputGroup>
          <Input onKeyUp={onSearch} />
          <InputGroupAddon addonType="append">
            <Button>
              <i className="fa fa-chev" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </DropdownToggle>
      <DropdownMenu>
        {search.map((result) => (
          <Fragment>
              <DropdownItem onClick={() => toProfile(result._id)}> <img style={{width:'30px', height:'30px', borderRadius:'50%', marginRight:'15px' }} className='img_user_search' src={result.image}/>{result.fullname}</DropdownItem>
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default Example;
