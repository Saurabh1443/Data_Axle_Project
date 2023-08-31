export const validateReceiverEmailAddress = async (targetEmail) => {
    try {
      let data = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=53d485e88c164ab1bc24a62b7960cf98&email=${targetEmail}`
      );
      let response = await data.json();
      console.log(response);
      if (response?.is_smtp_valid?.value) {
        return true;
      } else {
        return false;
      }
    } catch {}
  };

  export const sendEmailAttachement =async(receiverEmail,subject,message)=>{
    const apiUrl = `http://127.0.0.1:8000/api/persons/sendEmail`;
    return await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverEmail, subject, message }),
    });
   
  }