class UserLoginViewModel {
  constructor(user) {
    this.userID = user.userID;
    this.email = user.email;
    this.token = user.token;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.name = user.name;
    this.picture = user.picture;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.ageRange = user.ageRange;
  }
}

module.exports = UserLoginViewModel;