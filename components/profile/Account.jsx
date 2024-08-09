import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";

const Account = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Error updating profile.");
      }
    } catch (err) {
      toast.error("Error updating profile.");
      console.log(err);
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
     enableReinitialize: true,
      initialValues: {
        fullName: user?.fullName,
        location: user?.location,
        gender: user?.gender,
        age: user?.age,
      },
      onSubmit,
      validationSchema: profileSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "location",
      type: "text",
      placeholder: "Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 3,
      name: "gender",
      type: "text",
      placeholder: "Your Gender",
      value: values.gender,
      errorMessage: errors.gender,
      touched: touched.gender,
    },
    {
      id: 4,
      name: "age",
      type: "text",
      placeholder: "Your Age",
      value: values.age,
      errorMessage: errors.age,
      touched: touched.age,
    }

  ];
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">Account Settings</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="btn-primary mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default Account;