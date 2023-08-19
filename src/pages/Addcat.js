import React, {useState} from "react";
import CustomInput from "../Components/CustomInput";

const Addcat = () => {
    const [form, setForm] = useState({})

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }


    return (
        <div>
            <h3 className="mb-4  title">
                Add Category
            </h3>
            <div>
                    <CustomInput
                        onChng={valueChangeHandler}
                        type="text"
                        name="name"
                        label="Enter Category"
                        id="blogcat"
                    />
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit">Add Category
                    </button>
            </div>
        </div>
    );
};

export default Addcat;
