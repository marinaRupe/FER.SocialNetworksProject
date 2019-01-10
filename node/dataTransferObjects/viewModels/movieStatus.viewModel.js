class MovieStatusViewModel {
  constructor(movieStatus) {
    this.isWatched = movieStatus.isWatched;
    this.isSaved = movieStatus.isSaved;
    this.isRated = movieStatus.isRated;
    this.rating = movieStatus.rating;
  }
}

module.exports = MovieStatusViewModel;
