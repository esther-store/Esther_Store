import Loader from "../../Loader";
import React, { useState, useContext } from "react";
import "./index.css";
import UserCard from "../UserCard";

export default function UsersGrid({
  searchChecked,
  selectedUsers,
  handleOnClickInfoButton,
  handleOnChangeChecked,
  setRowData,
  handleOnClickEditButton,
  deleteConfirm,
  users,
}) {


  return (
    <>
      {users === null ? (
        <section className="users-loader-container">
          <div>
            <Loader />
          </div>
        </section>
      ) : (
        <section className="users-grid-and-paginator-container">
          <div className="users-grid">
            {users !== null && users !== undefined ? (
              <>
                {users.length > 0 ? (
                  users.map((users) => (
                    <UserCard
                      key={users.id}
                      data={users}
                      deleteConfirm={deleteConfirm}
                      handleOnChangeChecked={handleOnChangeChecked}
                      handleOnClickEditButton={handleOnClickEditButton}
                      handleOnClickInfoButton={handleOnClickInfoButton}
                      searchChecked={searchChecked}
                      setRowData={setRowData}
                      selectedUsers={selectedUsers}
                    />
                  ))
                ) : (
                  <div className="not-found-message">
                    <strong>No hay Usuarios</strong>
                  </div>
                )}
              </>
            ) : (
              <div className="not-found-message">
                <strong>No hay Usuarios</strong>
              </div>
            )}
          </div>
        </section>
      )}

    </>
  );
}
