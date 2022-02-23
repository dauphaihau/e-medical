const env = process.env.RUN_ENV || 'develop';
const config = {
  local: {
    endpoint: "http://localhost:3333",
  },
  develop: {
    endpoint: "https://aspo2.e-doctor.dev",
  },
  production: {
    endpoint: "https://spo2.api.edoctor.io",
  },
}[env];

export {config};