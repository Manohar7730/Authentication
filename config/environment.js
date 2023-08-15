const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "something",
  db: "Authentication_Project",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "123alonemanu@gmail.com",
      pass: "xojasnomvvwqmrnn",
    },
  },
  google_client_id:
    "123452815857-sisr34tumg72gic97p6fpm11djub7kjb.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "authentication",
};

const production = {
  name: "production",
};

module.exports = development;
