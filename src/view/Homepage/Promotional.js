export default function Promotional({
  title,
  full_description,
  pageHeaderBgImg,
  pageHeaderMinVh,
  pageHeaderRadius,
}) {
  const styles = {
    pageHeader: {
      backgroundImage: `url(${pageHeaderBgImg})`,
      minHeight: pageHeaderMinVh,
      borderRadius: pageHeaderRadius,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  };

  return (
    <>
      <section>
        <div className="page-header py-5 py-md-0" style={styles.pageHeader}>
          <span className="mask bg-gradient-dark opacity-7"></span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-sm-9 text-center mx-auto">
                <h1 className="text-white mb-4">{title}</h1>
                <p className="lead text-white mb-sm-6 mb-4">{full_description}</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="carType" className="text-white">Type:</label>
                      <select id="carType" className="form-control">
                        <option value="">Any</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="carYear" className="text-white">Year:</label>
                      <select id="carYear" className="form-control">
                        <option value="">Any</option>
                        {/* Generate options for years from 2000 to 2023 */}
                        {Array.from({ length: 2024 - 2000 }, (_, index) => (
                          <option key={index} value={2000 + index}>{2000 + index}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="carMake" className="text-white">Make:</label>
                          <input type="text" id="carMake" className="form-control" />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="carModel" className="text-white">Model:</label>
                          <input type="text" id="carModel" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-white btn-lg">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
