const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");

exports.login = async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({
      where: {
        Email_Id: emailId,
      },
    });
    const payloads = {
      id: user.UserId,
      roleId: user.UserType,
      role: await helper.getRoleforLogin(user.UserType),
    };
    // expiry time=60second
    const token = jwt.sign(payloads, process.env.JWT_Secret_Key, {
      expiresIn: 60 * 60,
    });
    await User.update(
      {
        accessToken: token,
      },
      {
        where: {
          UserId: user?.UserId,
        },
      }
    );
    const data = {
      id: user.UserId,
      userName: user.User_Name,
      roleId: user.UserType,
      role: await helper.getRole(user.UserType),
      accessToken: token,
    };
    return res
      .status(200)
      .send({ status: true, message: "Login successfully", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const newToken = null;
    const tokenData = jwt.decode(token);
    console.log(tokenData.id, "tokenData.id");
    const user = await User.findOne({
      where: {
        UserId: tokenData.id,
      },
    });
    if (!user) {
      return res.status(401).send({ status: false, message: "Unauthorized" });
    }
    await User.update(
      {
        accessToken: newToken,
      },
      {
        where: {
          UserId: user.UserId,
        },
      }
    );

    return res
      .status(200)
      .send({ status: true, message: "Logout successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { emailId } = req.body;
//     const user = await User.findOne({
//       where: {
//         Email_Id: emailId,
//       },
//     });
//     if (!user) {
//       return res.status(404).send({
//         status: false,
//         message: "User not exist",
//       });
//     }
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     const otpExpier = new Date();
//     otpExpier.setMinutes(otpExpier.getMinutes() + 1);


//   } catch (error) {

//     return res.status(500).send({status:false, message:error})
//   }
// };
