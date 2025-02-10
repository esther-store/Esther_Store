import { Dropdown } from "primereact/dropdown";
import { MenuIcon } from "@/icons/MenuIcon";
import "./index.css";
import React, { useContext, Suspense, useMemo } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import { Skeleton } from "primereact/skeleton";
const ChangePassword = React.lazy(() =>
  import("./optionsComponents/ChangePassword")
);
const CloseSession = React.lazy(() =>
  import("./optionsComponents/CloseSession")
);
const NavigateToContact = React.lazy(() =>
  import("./optionsComponents/NavigateToContact")
);
const ManageCategories = React.lazy(() =>
  import("./optionsComponents/ManageCategories")
);
const ManageContactInfo = React.lazy(() =>
  import("./optionsComponents/ManageContactInfo")
);
const ManagePromotions = React.lazy(() =>
  import("./optionsComponents/ManagePromotions")
);
const ManageProducts = React.lazy(() =>
  import("./optionsComponents/ManageProducts")
);
const ManageUsers = React.lazy(() => import("./optionsComponents/ManageUsers"));

function NavbarDropdown() {
  const { auth } = useContext(AuthenticationContext);

  const options = useMemo(() => {
    if (auth?.token && auth?.infoUser?.is_staff == true) {
      return basicOptions
        .concat(onlyAdminUsersOptions)
        .concat(onlyAuthenticatedUsersOptions);
    }
    if (auth?.token) return basicOptions.concat(onlyAuthenticatedUsersOptions);
    return basicOptions;
  });

  const itemTemplate = (option) => {
    return option.component;
  };

  return (
    <Dropdown
      options={options}
      highlightOnSelect={false}
      onChange={(e) => e.current.preventDefault()}
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

const skeletonsWidth = 260

const basicOptions = [
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <NavigateToContact />
      </Suspense>
    ),
  },
];

const onlyAuthenticatedUsersOptions = [
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <ChangePassword />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <CloseSession />
      </Suspense>
    ),
  },
];

const onlyAdminUsersOptions = [
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <ManageCategories />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <ManagePromotions />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <ManageContactInfo />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <ManageUsers />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} />}>
        <ManageProducts />
      </Suspense>
    ),
  },
];
