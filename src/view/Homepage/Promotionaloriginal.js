import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery, Grid } from '@mui/material';
import {ThreeDots} from "react-loader-spinner";


export default function Promotional({
  props,
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

  const [formData, setFormData] = useState({
    make: "Any",
    model: "Any",
    min_reserveprice : "0+",
    max_reserveprice : "0+",
    keywords: "",
    type: "Any",
});
  const isMobile = useMediaQuery('(max-width:600px)');


const {
    make,
    model,
    min_reserveprice,
    max_reserveprice,
    keywords,
    type
} = formData;
//const open_house = "true";

  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    setLoading(true);
    axios
        .post(
            `${process.env.REACT_APP_API_URL}/api/listings/search`,
            {
                make,
                model,
                min_reserveprice,
                max_reserveprice,
                keywords,
            },
            config
        )
        .then((res) => {
            setLoading(false);
            props.setListings(res.data);
            window.scrollTo(0, 0);
        })
        .catch((err) => {
            setLoading(false);
            window.scrollTo(0, 0);
        });
  };

  useEffect(() => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios
        .post(
            `${process.env.REACT_APP_API_URL}/api/listings/search`,
            {
                make,
                model,
                min_reserveprice,
                max_reserveprice,
                keywords,
            },
            config
        )
        .then((res) => {
            setLoading(false);
            props.setListings(res.data);
        })
        .catch((err) => {
            setLoading(false);
        });
}, []);

  return (
    <>
      <section>
        <div className="page-header py-5 py-md-0" style={styles.pageHeader}>
          
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-sm-9 text-center mx-auto">
                <h1 className="text-white mb-4">{title}</h1>
                <p className="lead text-white mb-sm-6 mb-4">{full_description}</p>
                <div className="container">
        <form className="px-1" onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6}>
              <div className="listingform__section">
                <label htmlFor="make" className="text-blue">Make:</label>
                <select
                  className="form-control"
                  name="make"
                  onChange={(e) => onChange(e)}
                  value={make}
                >
                  <option>Any</option>
                  <option>Toyota</option>
                  <option>Mercedez</option>
                </select>
              </div>
            </Grid>
            <Grid item xs={6} sm={6}>
              <label htmlFor="model" className="text-blue">Model:</label>
              <select
                className="form-control"
                name="model"
                onChange={(e) => onChange(e)}
                value={model}
              >
                <option>Fielder</option>
                <option>Probox</option>
                <option>c200</option>
                <option>Any</option>
              </select>
            </Grid>
            <Grid item xs={6} sm={6}>
              <label htmlFor="min_reserveprice" className="text-blue">Min Reserve Price:</label>
              <select
                className="form-control"
                name="min_reserveprice"
                onChange={(e) => onChange(e)}
                value={min_reserveprice}
              >
                <option>0+</option>
                <option>200,000+</option>
                <option>400,000+</option>
                <option>600,000+</option>
                <option>800,000+</option>
                <option>1,000,000+</option>
                <option>1,200,000+</option>
                <option>1,500,000+</option>
                <option>Any</option>
              </select>
            </Grid>

            <Grid item xs={6} sm={6}>
              <label htmlFor="max_reserveprice" className="text-blue">Max Reserve Price:</label>
              <select
                className="form-control"
                name="max_reserveprice"
                onChange={(e) => onChange(e)}
                value={max_reserveprice}
              >
                <option>0+</option>
                <option>200,000+</option>
                <option>400,000+</option>
                <option>600,000+</option>
                <option>800,000+</option>
                <option>1,000,000+</option>
                <option>1,200,000+</option>
                <option>1,500,000+</option>
                <option>Any</option>
              </select>
            </Grid>
            <Grid item xs={12}>
            <label htmlFor="keywords" className="text-blue">Keywords:</label>
              <input
                className="form-control"
                name="keywords"
                type="text"
                onChange={(e) => onChange(e)}
                value={keywords}
              />
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <div className="form-group d-flex justify-content-center px-4 mt-4">
                  <ThreeDots
                    type="Oval"
                    color="#424242"
                    height={48}
                    width={48}
                  />
                </div>
              ) : (
                <div className="form-group d-flex justify-content-center">
                  <button className="btn btn-primary btn-lg">Search</button>
                </div>
              )}
            </Grid>
          </Grid>
        </form>
       
      </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
