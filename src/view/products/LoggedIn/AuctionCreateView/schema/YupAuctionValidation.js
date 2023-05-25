import * as Yup from "yup"

export const YupAuctionValidation = Yup.object().shape({
  category: Yup.string().max(255).required(),
  make: Yup.string().max(255).required(),
  model: Yup.string().max(255).required(),
  type: Yup.string().max(255).required(),
  overview: Yup.string().max(5000).required(),
  duration: Yup.string().max(5000).required(),
  year: Yup.string().max(5000).required(),
  start_time: Yup.date()
  .min(new Date(), "Start time must be in the future")
  .required("Start time is required"),
  name: Yup.string()
    .max(255)
    .required(),
  starting_price: Yup.number().min(0),
  reserveprice: Yup.number().min(0),
  car_specification:  Yup.array().min(1, 'Please select at least one feature'),
  uploaded_images: Yup.array()
  .min(1, "Minimum 1 files are required")
  .required("Files are required")
})
