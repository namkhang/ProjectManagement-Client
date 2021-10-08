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
            <DropdownItem header key={group.value}>
              {group.label}
            </DropdownItem>
            {group.options.map((option) => (
              <DropdownItem key={option.value}>{option.label}</DropdownItem>
            ))}
          </Fragment>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default Example;
