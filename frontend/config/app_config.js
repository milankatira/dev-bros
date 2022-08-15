const masterConfig = {
  local: {
    server_url: "http://localhost:4000",
  },
  staging: {
    server_url: "",
  },
  prod: {
    server_url: "",
  },
};

export const { server_url } = masterConfig[process.env.ENV];

export const language = [
  {
    language: "python",
    value: "python3",
  },
  {
    language: "java",
    value: "java",
  },
  {
    language: "cpp",
    value: "c++",
  },
  {
    language: "c",
    value: "c",
  },
  {
    language: "php",
    value: "php",
  },
  {
    language: "nodeJs",
    value: "nodejs",
  },
];
