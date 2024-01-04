import React, { useEffect } from "react";
import axios from "axios";

const sitemapXml = (data,data2,dataDomesticFlight) => {
  let latestPost = 0;
  let projectsXML = "";
  let hotelXML = "";
  let domesticFlightXML = "";


  useEffect(()=>{

    const fetchData = async () => {
      
      try{
        const data = await axios.get("https://panel.safaraneh.com/wp-json/wp/v2/posts?per_page=100");
        debugger
        
        const dataDomesticFlight = await axios.get("https://panel.safaraneh.com/wp-json/wp/v2/flightdomestic");
        debugger;
        
        const data2 = await axios.get("http://api.safaraneh.com/v2/Page/GetPagesTemporary", {"LanguageIds": [1],"LayoutIds": [21,48]});
        debugger;

      }catch(error){
      
        debugger;
      }
    }

    fetchData();
  },[]);

  // if(data2){
  //   console.dir(data2)
  //   debugger;
  //   for(let i = 0 ; i <data2.length ; i++ ){
  //     const post = data2[i];
  //     const hotelURL = `https://www.safaraneh.com${post.Url}/`;
  //     hotelXML += `
  //       <url>
  //         <loc>${hotelURL}</loc>
  //         <lastmod>${post.LastModifyDate.substring(0, 10)}</lastmod>
  //         <changefreq>Daily</changefreq>
  //         <priority>0.9</priority>
  //       </url>`;
  //   }
  // }

  if(data){
debugger;
    for(let i = 0 ; i <data.data.length ; i++ ){
      const post = data.data[i];

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
    }



    for(let i = 0 ; i <data.dataDomesticFlight.length ; i++ ){
      const flight = data.dataDomesticFlight[i];
    
      const domesticFlightURL = `https://www.safaraneh.com/fa/flights/${flight.slug}/`;
      domesticFlightXML += `
        <url>
          <loc>${domesticFlightURL}</loc>
          <lastmod>${flight.modified.substring(0, 10)}</lastmod>
          <changefreq>Daily</changefreq>
          <priority>0.9</priority>
        </url>`;

    }
    
    
  }


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




export const getServerSideProps = async () => {

  const data = await axios.get("https://panel.safaraneh.com/wp-json/wp/v2/posts?per_page=100");
  
  //const data2 = await axios.get("http://api.safaraneh.com/v2/Page/GetPagesTemporary", {"LanguageIds": [1],"LayoutIds": [21,48]});
  
  const dataDomesticFlight = await axios.get("https://panel.safaraneh.com/wp-json/wp/v2/flightdomestic");


  return {
    props: {

//      data2: data2?.data || null,

      dataDomesticFlight: dataDomesticFlight.data ,

      data: data.data
    },
  }
}



export default sitemapXml;