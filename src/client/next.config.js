const withCSS = require("@zeit/next-css");
module.exports = withCSS({
    distDir: "../../dist/client",
    env: {
        BASE_URL: "https://therhymingreasons.com"
    }
});
