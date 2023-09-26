const showWelcome = (req, res) => {
    res.send("Hello Node Dev")
  };

  const showRegister = (req, res) => {
    console.log(req.body);
  };

  const signin = (req, res) => {
    console.log(req.body);
  };
  module.exports = {showWelcome, showRegister, signin}