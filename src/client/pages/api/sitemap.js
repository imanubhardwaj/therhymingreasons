import builder from 'xmlbuilder';
import ApiService from "../../services/api";

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export default async (req, res) => {
    const poems = await ApiService.getPosts();

    const doc = builder.create('urlset')
        .att('xmlns:xsi', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        .att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/TR/xhtml11/xhtml11_schema.html http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd')
        .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
        .att('xmlns:xhtml', 'http://www.w3.org/TR/xhtml11/xhtml11_schema.html');

    poems.forEach(poem => {
        doc.ele('url')
            .ele('loc').txt("https://blog.manubhardwaj.in/posts/" + poem.slug).up()
            .ele('priority').txt('0.7').up()
            .ele('lastmod').txt(formatDate(new Date(poem.createdAt))).up()
            .ele('changefreq').txt('Weekly').up();
    });

    res.statusCode = 200;
    res.set('Content-Type', 'text/xml');
    res.end(doc.toString({pretty: true}));
}
