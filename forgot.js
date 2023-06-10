const Sib = require("sib-api-v3-sdk");
require('dotenv').config();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.Mail_api;

const tranEmailApi = new Sib.TransactionalEmailsApi();

exports.forgotPassword = async (req, res, next) => {
  try {
    const sender = {
      email: 'faizzzuddi@gmail.com',
      name: 'Your Name'
    };

    const receiver = [{
      email: 'mdfaizsalahuddin@gmail.com'
    }];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receiver,
      subject: 'Reset your password',
      textContent: 'Click on the link to set a new password'
    });

    console.log(response.text); // Log the response body as text
    console.log(response.body); // Log the response body as JSON object
  } catch (err) {
    console.log(err.response.body); // Log the error response body
    console.log(err.message); // Log the error message
  }
};
