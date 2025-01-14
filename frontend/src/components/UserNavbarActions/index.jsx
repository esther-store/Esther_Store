import { Dropdown } from "primereact/dropdown";
import UserIcon from "@/assets/icons/user-icon.svg";
import CloseSession from "./CloseSession";
import LockOpen from "@/assets/icons/lock-open.svg";
import "./index.css";
import {useNavigate} from 'react-router-dom'
import React, { useContext, useRef } from "react";
import AuthenticationContext from '@/context/authenticationContext'

function UserNavbarActionsDropdown() {
const navigate = useNavigate()
const dropdownRef = useRef(null)
const {auth} = useContext(AuthenticationContext)
const options = [
  {
    name: 'Change Password',
    component: (
      <button className="change-password-button" onClick={() => navigate('/change-password')}>
        <img alt="change-password" src={LockOpen.src} />
        <span>Cambiar Contraseña</span>
      </button>
    ),
    value: 'change-password',
  },
  {
    name: 'Close Session',
    component: <CloseSession />,
    value: 'close-session',
  },
];

const itemTemplate = (option) => {
  return option.component;
};

  return (
    auth.token?
    <section className = "user-navbar-actions-dropdown-container" onClick={() => dropdownRef.current.show()}>
        <img alt="user-icon" src={UserIcon.src}/>
        <Dropdown
          ref={dropdownRef}
          onChange={(e) => handleChange(e)}
          options={options}
          optionLabel="name"
          placeholder=""
          className="user-navbar-actions-dropdown"
          itemTemplate={itemTemplate}
        />
    </section>
    :null
  );
}

export default UserNavbarActionsDropdown;
