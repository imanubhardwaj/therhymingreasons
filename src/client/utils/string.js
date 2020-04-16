export default class StringUtils {
    static getPosition = (string, subString, index) => {
        return string.split(subString, index).join(subString).length;
    }
}
