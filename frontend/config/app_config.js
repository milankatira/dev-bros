const masterConfig = {
  local: {
    server_url: "http://localhost:3000",
  },
  staging: {
    server_url: "",
  },
  prod: {
    server_url: "",
  },
};

export const { server_url } = masterConfig[process.env.ENV];
