export default class HelperUtils {
    static isDesktop = () => {
        if (navigator.userAgent.match(/Android/i)) {
            return false;
        } else return !((navigator.userAgent.match(/iPhone/i)) || navigator.userAgent.match(/iPad/i));
    };

    static viewCount = (value, decimals) => {
        let exp;
        const suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];

        value = parseInt(value, 10);

        if (isNaN(value)) {
            return null;
        }

        if (value < 1000) {
            return value;
        }

        exp = Math.floor(Math.log(value) / Math.log(1000));

        return (value / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
}
