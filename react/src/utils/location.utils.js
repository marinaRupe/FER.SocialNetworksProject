
// eslint-disable-next-line valid-jsdoc
/** @type function(): Promise<Coordinates> */
export const getBrowserLocation = () => new Promise((resolve, reject) => {
  if (!window.navigator.geolocation) {
    reject('Browser does not support Geolocation API!');
    return;
  }
  window.navigator.geolocation.getCurrentPosition(
    position => resolve(position.coords),
    err => reject(err)
  );
});
