const axios = require("axios");

const GRAPH_URL = "https://graph.facebook.com/v19.0";

// EXCHANGE oAUTH CODE => SHORT-LIVED TOKEN

exports.exchangeCodeForToken = async ({ code, redirectUri }) => {
  const response = await axios.post(`${GRAPH_URL}/oauth/access_token`, {}, {
    params: {
      client_id: process.env.META_API_ID,
      client_secret: process.env.META_API_SECRET,
      redirect_uri: redirectUri,
      code: code,
    },
  });

  return {
    accessToken : response.data.access_token,
    expiresIn : response.data.expires_in,
  }
};


// covert short-lived token to long-lived token
exports.getLongLivedToken =  async (shortLivedToken) =>{
    const response = await axios.post(`${GRAPH_URL}/oauth/access_token`, {}, {
        params : {
            grant_type : "fb_exchange_token",
            client_id : process.env.META_API_ID,
            client_secret : process.env.META_API_SECRET,
            fb_exchange_token : shortLivedToken,
        }
    })

    return {
        accessToken : response.data.access_token,
        expiresIn : response.data.expires_in,
    }
}

//Fetch user page
exports.fetchUserPages = async (accessToken) =>{
    const response = await axios.get(`${GRAPH_URL}/me/accounts`,{
        params :{
            access_token : accessToken,
        }
    })

    return response.data.data
}

//publish post to page
exports.publishPostToPage = async ({pageId, message, pageAccessToken}) =>{
    const response = await axios.post(`${GRAPH_URL}/${pageId}/feed`,{message},{
        params : {
            access_token : pageAccessToken,
        }
    })

    return response.data
}