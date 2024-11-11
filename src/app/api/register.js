export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the Registration page")
  
    // get the values
    // that were sent across to us.
  
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const confirmEmail = searchParams.get('confirmEmail')
    const password = searchParams.get('password')
    const confirmPassword = searchParams.get('confirmPassword')
    
  
    console.log(email);
    console.log(confirmEmail);
    console.log(password);
    console.log(confirmPassword);

  
    // database call goes here
    // at the end of the process we need to send something back.
    return Response.json({ "data":"valid" })
  
  }
  
  