require("dotenv").config();

const needPassword = (req, res, next) => {
  const authHeader= req.header("Authorization");  
  const token = jwt.sign(
      {
      id: user.id,
      },
      process.env.JWT_SECRET);
      {
      expiresIn: 24*60*60,
      }
      res.json({token});
}


};

module.exports = needToken;
