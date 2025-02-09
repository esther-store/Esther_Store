import { Dropdown } from "primereact/dropdown";
import { MenuIcon } from "@/icons/MenuIcon";
import "./index.css";
import React, { useContext, Suspense, useMemo } from "react";
import AuthenticationContext from "@/context/authenticationContext";
const ChangePassword = React.lazy(() =>
  import("./optionsComponents/ChangePassword")
);
const CloseSession = React.lazy(() =>
  import("./optionsComponents/CloseSession")
);
import { Skeleton } from "primereact/skeleton";
const NavigateToContact = React.lazy(() =>
  import("./optionsComponents/NavigateToContact")
);

function NavbarDropdown() {
  const { auth } = useContext(AuthenticationContext);

  const options = useMemo(() => {
    return auth?.token
      ? basicOptions.concat(onlyAuthenticatedUsersOptions)
      : basicOptions;
  });

  const itemTemplate = (option) => {
    return option.component;
  };

  return (
    <Dropdown
      onChange={(e) => {
        e;
      }}
      options={options}
      highlightOnSelect={false}
      dropdownIcon={
        <MenuIcon
          className="dropdown-icon"
          width={30}
          height={30}
          color="#D9658F"
        />
      }
      collapseIcon={
        <MenuIcon
          className="dropdown-icon"
          width={30}
          height={30}
          color="#D9658F"
        />
      }
      className="user-navbar-actions-dropdown"
      panelClassName="user-navbar-actions-dropdown-panel"
      itemTemplate={itemTemplate}
    />
  );
}

export default NavbarDropdown;

const basicOptions = [
  {
    component: (
      <Suspense fallback={<Skeleton width="200px" />}>
        <NavigateToContact />
      </Suspense>
    ),
  },
];

const onlyAuthenticatedUsersOptions = [
  {
    component: (
      <Suspense fallback={<Skeleton width="200px" />}>
        <ChangePassword />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width="200px" />}>
        <CloseSession />
      </Suspense>
    ),
  },
];
