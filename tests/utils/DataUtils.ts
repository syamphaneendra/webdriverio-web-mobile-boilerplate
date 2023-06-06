class DataUtils {
  getRandomMobileNumber = async (startdigit: string) => {
    let randomMobile = '0' + startdigit + Math.random().toString().slice(2, 11);
    return randomMobile;
  };
}
export default new DataUtils();
