export default class HelperUtils {
    static isMobile = (userAgent) => {
        let agent = userAgent;
        if (!userAgent) {
            agent = navigator.userAgent;
        }
        return agent.match(/Android/i) || agent.match(/iPhone/i) || agent.match(/iPad/i);
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

    static getMetaDescription = string => `${string.replace(/\n/g, '').substring(0, 160)}...`;

    static setViewableContentSizeCssProperty() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}
