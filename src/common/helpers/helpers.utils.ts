export const HelperService = {
  isDev(): boolean {
    return process.env.NODE_ENV.startsWith('dev');
  },

  /* The `isProd()` function is checking if the value of the `NODE_ENV` environment variable starts with
    the string "prod". It returns `true` if the environment is set to production, and `false` otherwise.
    This function is used to determine if the application is running in a production environment. */
  isProd(): boolean {
    return process.env.NODE_ENV.startsWith('prod');
  },
};
