import { Dropdown } from "primereact/dropdown";
import { MenuIcon } from "@/icons/MenuIcon";
import "./index.css";
import React, { useContext, Suspense, useMemo } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import { Skeleton } from "primereact/skeleton";
import CloseSession from "./optionsComponents/CloseSession"

const ChangePassword = React.lazy(() =>
  import("./optionsComponents/ChangePassword")
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

function NavbarDropdown({iconColor = "#D9658F"}) {
  const { auth } = useContext(AuthenticationContext);
  const {CloseSessionButton, ShowConfirmDialog} = CloseSession()

  const onlyAuthenticatedUsersOptions = [
    {
      component: (
        <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
          <ChangePassword />
        </Suspense>
      ),
    },
    {
      component: (
        <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
          <CloseSessionButton />
        </Suspense>
      ),
    },
  ];

  const options = useMemo(() => {
    if (auth?.token && auth?.infoUser?.is_staff == true) {
      return basicOptions
        .concat(onlyAdminUsersOptions)
        .concat(onlyAuthenticatedUsersOptions);
    }
    if (auth?.token) return basicOptions.concat(onlyAuthenticatedUsersOptions);
    return basicOptions;
  }, [auth]);

  const itemTemplate = (option) => {
    return option.component;
  };

  return (
    <>
    <ShowConfirmDialog/>
    <Dropdown
      options={options}
      highlightOnSelect={false}
      onChange={(e) => null}
      dropdownIcon={
        <MenuIcon
          className="dropdown-icon"
          width={30}
          height={30}
          color={iconColor}
        />
      }
      collapseIcon={
        <MenuIcon
          className="dropdown-icon"
          width={30}
          height={30}
          color={iconColor}
        />
      }
      className="user-navbar-actions-dropdown"
      panelClassName="user-navbar-actions-dropdown-panel"
      itemTemplate={itemTemplate}
    />
    </>
  );
}

export default NavbarDropdown;

const skeletonsWidth = 260
const skeletonsHeight = 30

const basicOptions = [];

const onlyAdminUsersOptions = [
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
        <ManageProducts />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
        <ManageCategories />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
        <ManagePromotions />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
        <ManageContactInfo />
      </Suspense>
    ),
  },
  {
    component: (
      <Suspense fallback={<Skeleton width={skeletonsWidth} height={skeletonsHeight} />}>
        <ManageUsers />
      </Suspense>
    ),
  },
];
