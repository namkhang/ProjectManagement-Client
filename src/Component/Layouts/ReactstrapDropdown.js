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

  const toggle = () => {
    setdropdownOpen(!dropdownOpen);
  };

  const options = [
    {
      label: "Section One",
      value: "one",
      options: [
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
      ],
    },
    {
      label: "Section Two",
      value: "two",
      options: [
        { value: "three", label: "Three" },
        { value: "four", label: "Four" },
      ],
    }
  ];

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle tag="div" onClick={toggle}>
        <InputGroup>
          <Input />
          <InputGroupAddon addonType="append">
            <Button>
              <i className="fa fa-chev" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </DropdownToggle>
      <DropdownMenu>
        {options.map((group) => (
          <Fragment>

            {group.options.map((option) => (
              <DropdownItem key={option.value}> <img style={{width:'30px', height:'30px', borderRadius:'50%', marginRight:'15px' }} className='img_user_search' src='https://scontent.fdad3-1.fna.fbcdn.net/v/t1.6435-9/105037693_296643991531524_854097983083770554_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=DWRQUtDSmQwAX8_SjP3&_nc_ht=scontent.fdad3-1.fna&oh=9dbfea372624d99f86d2669e24d33174&oe=61940636'/>{option.label}</DropdownItem>
            ))}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default Example;
