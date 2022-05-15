import React from "react";
import { ModalFieldProps } from "component";
const ModalField: React.FC<ModalFieldProps> = ({
  title,
  open,
  setopen,
  children,
  handleSubmit,
}) => {
  return (
    <div>
      <div
        id="modal"
        className={`fixed ${
          !open ? "hidden" : "null"
        } z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}
      >
        <div className="relative top-40 mx-auto shadow-lg rounded-xl bg-white max-w-md">
          <div className="flex justify-between items-center bg-blue-500 text-white text-xl rounded-t-md px-4 py-2">
            <h3>{title}</h3>
            <button onClick={() => setopen(false)}>x</button>
          </div>

          <div>{children}</div>

          <div className="px-4 py-2 border-t border-t-gray-500 flex justify-end items-center space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalField;
