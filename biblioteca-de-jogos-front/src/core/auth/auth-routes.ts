export class AuthRoutes {
  readonly login: string;
  readonly signup: string;
  readonly confirm: string;
  readonly logout: string;

  constructor(login: string, signup: string, confirm: string, logout: string) {
    this.login = login;
    this.signup = signup;
    this.confirm = confirm;
    this.logout = logout;
  }
}
