const withCSS = require("@zeit/next-css");
module.exports = withCSS({
    distDir: "../../dist/client",
    env: {
        BASE_URL: "https://therhymingreasons.com",
        API_BASE_URL: "https://therhymingreasons.herokuapp.com/api/v1"
    }
});
