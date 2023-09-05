import React from "react";
import axios from "axios";

const sitemapXml = (data,data2,dataDomesticFlight) => {
  let latestPost = 0;
  let projectsXML = "";
  let hotelXML = "";
  let domesticFlightXML = "";

  data2.map(post => {
    const hotelURL = `https://www.safaraneh.com${post.Url}/`;
    hotelXML += `
      <url>
        <loc>${hotelURL}</loc>
        <lastmod>${post.LastModifyDate.substring(0, 10)}</lastmod>
        <changefreq>Daily</changefreq>
        <priority>0.9</priority>
      </url>`;
  });
  
  data.map(post => {
    const postDate = Date.parse(post.modified);
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }

    const projectURL = `https://www.safaraneh.com/fa/blog/${post.slug}/`;
    projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${post.modified.substring(0, 10)}</lastmod>
        <changefreq>Daily</changefreq>
        <priority>0.7</priority>
      </url>`;
  });
  
  dataDomesticFlight.map(flight => {
    const domesticFlightURL = `https://www.safaraneh.com/fa/flights/${flight.slug}/`;
    domesticFlightXML += `
      <url>
        <loc>${domesticFlightURL}</loc>
        <lastmod>${flight.modified.substring(0, 10)}</lastmod>
        <changefreq>Daily</changefreq>
        <priority>0.9</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.safaraneh.com/fa/</loc>
        <lastmod>2021-02-03</lastmod>
        <priority>1.0</priority>
      </url>
      ${projectsXML}
      ${hotelXML}
      ${domesticFlightXML}
    </urlset>`;
};

class Sitemap extends React.Component {

  static async getInitialProps({ res }) {
    const data = await axios
      .get("https://panel.safaraneh.com/wp-json/wp/v2/posts?per_page=100")
      .then(response => response.data);
    
    const data2 = await axios
      .post("http://api.safaraneh.com/v2/Page/GetPagesTemporary", {"LanguageIds": [1],"LayoutIds": [21,48]})
      .then(response => response.data);
    
    const dataDomesticFlight = await axios
      .get("https://panel.safaraneh.com/wp-json/wp/v2/flightdomestic")
      .then(response => response.data);
    
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(data, data2, dataDomesticFlight));
    res.end();
  }
}

export default Sitemap;