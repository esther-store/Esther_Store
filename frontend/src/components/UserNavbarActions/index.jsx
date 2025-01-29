import { Dropdown } from "primereact/dropdown";
import UserIcon from "@/assets/icons/user-icon.svg";
import "./index.css";
import React, { useContext, useRef, Suspense } from "react";
import AuthenticationContext from "@/context/authenticationContext";
const ChangePassword = React.lazy(() => import("./ChangePassword"))
const CloseSession = React.lazy(() => import("./CloseSession"));

function UserNavbarActionsDropdown() {
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

  return auth.token ? (
    <section
      className="user-navbar-actions-dropdown-container"
      onClick={() => dropdownRef.current.show()}
    >
      <img alt="user-icon" src={UserIcon.src} />
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
  ) : null;
}

export default UserNavbarActionsDropdown;
