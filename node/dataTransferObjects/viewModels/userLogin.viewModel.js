class UserLoginViewModel {
  constructor(user) {
    this.email = user.email;
    this.token = user.token;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}

module.exports = UserLoginViewModel;