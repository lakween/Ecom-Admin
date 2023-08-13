import React from "react";
import CustomInput from "../Components/CustomInput";

const Addblogcat = () => {
  return (
    <div>
      <h3 className="mb-4  title">
         Add Blog Category
      </h3>
      <div>
        <form action="">
          <CustomInput
            type="text"
            name="title"
            label="Enter Blog Category"
            id="blogcat"
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit">Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
