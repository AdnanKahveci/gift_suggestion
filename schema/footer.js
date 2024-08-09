import * as Yup from "yup";

export const footerSchema = Yup.object({
  location: Yup.string().required("Location is required."),
  size: Yup.string().required("Size is required."),
  category: Yup.string().required("Category is required."),
  color: Yup.string().required("Color is required."),
  gender: Yup.string().required("Gender is required."),
  season: Yup.string().required("Season is required."),
  reviewRating: Yup.number().required("Review Rating is required."),
  
});