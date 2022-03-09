const env = process.env.RUN_ENV || 'develop';

const config = {
  local: {
    endpoint: "http://localhost:5000/v1",
  },
  develop: {
    endpoint: "https://eschool.api.e-doctor.dev/v1",
  },
  production: {
    endpoint: "https://spo2.api.edoctor.io/v1",
  },
}[env];

export {config};