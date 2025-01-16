import Loader from "../../../Loader";
import "./index.css";
import OfertCard from "../OfertCard";

export default function OfertsGrid({
  searchChecked,
  selectedOferts,
  handleOnClickInfoButton,
  handleOnChangeChecked,
  setRowData,
  handleOnClickEditButton,
  deleteConfirm,
  oferts,
}) {


  return (
    <>
      {oferts === null ? (
        <section className="oferts-loader-container">
          <div>
            <Loader />
          </div>
        </section>
      ) : (
        <section className="oferts-grid-and-paginator-container">
          <div className="oferts-grid">
            {oferts !== null && oferts !== undefined ? (
              <>
                {oferts.length > 0 ? (
                  oferts.map((ofert) => (
                    <OfertCard
                      key={ofert.id}
                      data={ofert}
                      deleteConfirm={deleteConfirm}
                      handleOnChangeChecked={handleOnChangeChecked}
                      handleOnClickEditButton={handleOnClickEditButton}
                      handleOnClickInfoButton={handleOnClickInfoButton}
                      searchChecked={searchChecked}
                      setRowData={setRowData}
                      selectedOferts={selectedOferts}
                    />
                  ))
                ) : (
                  <div className="not-found-message">
                    <strong>No hay ofertas</strong>
                  </div>
                )}
              </>
            ) : (
              <div className="not-found-message">
                <strong>No hay ofertas</strong>
              </div>
            )}
          </div>
        </section>
      )}

    </>
  );
}
