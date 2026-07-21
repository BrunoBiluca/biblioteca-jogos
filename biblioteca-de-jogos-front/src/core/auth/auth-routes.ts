export class AuthRoutes {
  readonly login: string;
  readonly signup: string;
  readonly confirm: string;
  readonly logout: string;
  readonly forgotPassword: string;
  readonly afterLogin: string;

  constructor(
    login: string,
    signup: string,
    confirm: string,
    logout: string,
    forgotPassword: string,
    afterLogin: string,
  ) {
    this.login = login;
    this.signup = signup;
    this.confirm = confirm;
    this.logout = logout;
    this.forgotPassword = forgotPassword;
    this.afterLogin = afterLogin;
  }
}
