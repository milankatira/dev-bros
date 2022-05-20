import React from "react";

const index = () => {
  return (
    <div class="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div class="w-full p-6 m-auto bg-white border-t-2 border-blue-600 rounded shadow-lg  hover:shadow-blue-800/50 lg:max-w-md transition-shadow duration-500">
        <h1 class="text-3xl font-semibold text-center text-blue-700">LOGO</h1>

        <form class="mt-6">
          <div>
            <label for="email" class="block text-sm text-gray-800">
              Email
            </label>
            <input
              type="email"
              class="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div class="mt-4">
            <div>
              <label for="password" class="block text-sm text-gray-800">
                Password
              </label>
              <input
                type="password"
                class="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div class="mt-6">
              <button class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default index;
