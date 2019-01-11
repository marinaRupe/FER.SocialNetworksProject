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
    this.ageRange = user.ageRange;
    this.location = user.location;
    this.likedPages = user.likedPages;
  }
}

module.exports = UserLoginViewModel;
