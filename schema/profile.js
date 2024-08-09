import * as Yup from "yup";

export const profileSchema = Yup.object({
  fullName: Yup.string('profile'),
  location: Yup.string('location'),
  gender: Yup.string('gender'),
  age: Yup.string('age'),
});
