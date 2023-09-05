import axios from "axios";

export const GetBlogPosts = async () => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?per_page=100`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetFourBlogPosts = async () => {
  try {
    const res = await axios.get(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?per_page=4`,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};

export const GetCities = async () => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/cities/`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetBestCategoryLarge = async () => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/best_category?categories=2`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetBestCategorySmall = async () => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/best_category?categories=3`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/categories`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetBlogPostDetails = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts/?slug=${slug}`,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};

export const GetBlogPostCategory = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?categories=${id}&per_page=100`,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};

export const GetBlogLastPostCategory = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?categories=${id}&per_page=3`,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};

export const GetCommentsByPostId = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/comments?post=${id}&per_page=100`,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};

export const PostComment = async (param) => {
  try {
    const res = await axios.post(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/comments`,
      param,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};

export const GetTags = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?tags=${id}`
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetTagName = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/tags/${id}`
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetLatestBlogPosts = async () => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?per_page=10`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Abp.TenantId": process.env.ABP_TENANT_ID,
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetSearchBlogPosts = async (value) => {
    try {
      const res = await axios.get(
        `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/posts?search=${value}`,
        {
          headers: {
            // "Content-Type": "application/json",
            // accept: "text/plain",
            // "Accept-Language": "fa-IR",
          },
        }
      );
      return res;
    } catch (error) {
      console.log("error", error);
      return error.response
    }
};

export const GetFlightDomesticDetails = async (slug) => {
  try {
    const res = await axios.get(
      `${process.env.BLOG_URL_PANEL}/wp-json/wp/v2/flightdomestic/?slug=${slug}`,
      {
        headers: {
          // "Content-Type": "application/json",
          // accept: "text/plain",
          // "Abp.TenantId": process.env.ABP_TENANT_ID,
          // "Accept-Language": "fa-IR",
        },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response
  }
};