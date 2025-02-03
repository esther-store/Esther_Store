import { Dropdown } from "primereact/dropdown";
import { MenuIcon } from "@/icons/MenuIcon";
import "./index.css";
import React, { useContext, useRef, Suspense } from "react";
import AuthenticationContext from "@/context/authenticationContext";
const ChangePassword = React.lazy(() => import("./ChangePassword"))
const CloseSession = React.lazy(() => import("./CloseSession"));

function NavbarDropdown() {
  const dropdownRef = useRef(null);
  const { auth } = useContext(AuthenticationContext);
  const options = [
    {
      name: "Change Password",
      component: <Suspense fallback = {<div style={{width:'160px'}}>Loading ...</div>}><ChangePassword /></Suspense>,
      value: "change-password",
    },
    {
      name: "Close Session",
      component: (
        <Suspense fallback={<div style={{width:'160px'}}>Loading ...</div>}>
          <CloseSession />
        </Suspense>
      ),
      value: "close-session",
    },
  ];

  const itemTemplate = (option) => {
    return option.component;
  };

  return (
      <Dropdown
        ref={dropdownRef}
        onChange={(e) => handleChange(e)}
        options={options}
        optionLabel="name"
        placeholder=""
        dropdownIcon = {<MenuIcon className = "dropdown-icon" width={30} height={30} color = "#D9658F"/>}
        collapseIcon = {<MenuIcon className = "dropdown-icon" width={30} height={30} color = "#D9658F"/>}
        className="user-navbar-actions-dropdown"
        itemTemplate={itemTemplate}
      />
  )
}

export default NavbarDropdown;
