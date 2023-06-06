class JsonUtils {
  objectToJSONArrayWithoutKey = async (userdata: Object) => {
    let jsonArray = JSON.parse(JSON.stringify(userdata)).default;
    return jsonArray;
  };

  objectToJSONArrayWithKeys = async (userdata: Object) => {
    const jsonArray = await Object.keys(userdata).map((key) => userdata[key]);
    return jsonArray;
  };
}
export default new JsonUtils();
