class StringUtils {
  getSubStringByKey = async (mainString: string, key: string) => {
    const indexOfFirst = mainString.indexOf(key);
    return mainString.slice(0, indexOfFirst);
  };
}
export default new StringUtils();
