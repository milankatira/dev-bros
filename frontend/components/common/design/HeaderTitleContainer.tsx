import React from "react";

interface TitleFieldProps {
  title: string;
  button?: boolean;
  children?: any;
}

const HeaderTitleContainer: React.FC<TitleFieldProps> = ({
  title,
  button,
  children,
}) => {
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
        {button ? (
          <div className="container flex flex-wrap justify-between items-center mx-auto border-4 border-emerald-900">
            <h1 className="mr-3 h-6 sm:h-9 font-bold text-3xl">{title}</h1>
            <div className="flex md:order-2">{children}</div>
          </div>
        ) : (
          <div className="container flex flex-wrap justify-between items-center mx-auto border-4 border-emerald-900">
            <h1 className="mr-3 h-6 sm:h-9 font-bold text-3xl">{title}</h1>
          </div>
        )}
        <hr className="mt-6 border-b-1 border-gray-300" />
      </nav>
    </div>
  );
};

export default HeaderTitleContainer;
