const axios = require("axios");

const token = "39dcef05fcca131b74e0f415bc95beccbc815f8dba202db4f38fcddc6c95f656e2327da5402fcf629467ebb890dbbd619321440264f964e756bae7abfccb408b";

async function create(data) {
  try {
    const config = {
      method: 'post',
      url: 'https://hastebin.com/documents',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'  
      },
      data: JSON.stringify({ content: data })  
    };

    const response = await axios(config);
    return { id: response.data.key };  
  } catch (error) {
    throw new Error(`Error creating document: ${error.message}`);
  }
}

async function get(key) {
  try {
    const config = {
      method: 'get',
      url: `https://hastebin.com/raw/${key}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios(config);
    return response.data
  } catch (error) {
    throw new Error(`Error getting document: ${error.message}`);
  }
}

module.exports = { create, get };
