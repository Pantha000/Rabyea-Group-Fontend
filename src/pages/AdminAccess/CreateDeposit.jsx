import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loading";
import MetaData from "../../components/MetaData";
import {
  adminDeposit,
  clearError,
  clearSuccess,
} from "../../redux/actions/adminAction";

const CreateDeposit = () => {
  const dispatch = useDispatch();
  const { success, error, payloading } = useSelector((state) => state.payment);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();

  const [errTitle, setErrTitle] = useState("");
  const [errAmount, setErrAmount] = useState(" ");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title) {
      setErrTitle("This field is required");
    } else if (!amount) {
      setErrAmount("This field is required");
    } else {
      let userData = {
        title: title,
        amount: parseInt(amount),
      };
      dispatch(adminDeposit(userData));
    }
  };
  useEffect(() => {
    if (success) {
      toast(success);
      dispatch(clearSuccess());
    }
    if (error) {
      toast(error);
      dispatch(clearError());
    }
  }, [success, error]);
  return (
    <div className="flex justify-center items-center h-screen ">
      <MetaData title={"Create Deposit"} />
      <div className=" bg-white shadow-btn rounded-xl">
        <div className=" px-5 py-4">
          <p className="mb-5 text-center font-bold text-lg">Create Deposit</p>

          <div className="my-2">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter a title"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {errTitle && (
              <p className=" text-red-900  text-xs font-bold">{errTitle}</p>
            )}
          </div>
          <div className="my-2">
            <label>Amount</label>
            <input
              type="text"
              placeholder="Enter deposit amount"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            {errAmount && (
              <p className=" text-red-900  text-xs font-bold">{errAmount}</p>
            )}
          </div>

          {/* <div className="my-2">
            <input type="checkbox" name="Choose For Manager" value="Manager" />
            <span className="ml-1">Choose For Manager</span>
          </div> */}
          <div className="flex justify-center mt-5">
            <button
              className="bg-blue1 px-3 py-2 rounded-md text-white"
              onClick={handleCreate}
            >
              {payloading ? <Loader /> : "Deposit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeposit;
