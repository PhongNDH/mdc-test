import database from "../utils/database.js";
import { checkPassword, generateRandomUser, sha256 } from "../utils/util.js";

export const Signin = async (req, res) => {
   const { username, password } = req.body;
   try {
      const data = await database
         .select("*")
         .from("users")
         .where("username", "=", username);
      if (data.length > 0) {
         const isValid = await checkPassword(password, data[0].password);
         if (isValid) {
            await database("users").where({ userid: data[0].userid }).update({
               loggedin: 1,
               loggedat: new Date(),
            });
            return res.json({
               result: "success",
               user: data[0],
            });
         } else {
            res.status(400).json({
               result: "fail",
               userId: null,
            });
         }
      } else {
         res.status(400).json({
            result: "fail",
            user: null,
         });
      }
   } catch (err) {
      console.error(err);
      res.status(400).json({
         result: "fail",
         user: null,
      });
   }
};

export const Signup = async (req, res) => {
   const { username, password } = req.body;
   let hashedPassword = await sha256(password);
   database("users")
      .insert({ username: username, password: hashedPassword })
      .then(() => {
         res.json({
            result: "success",
         });
      })
      .catch((err) => {
         console.error(err);
         res.status(400).json({
            result: "fail",
            userId: null,
         });
      });
};

export const createUserRandomly = async (req, res) => {
   console.log("Running ...");
   try {
      for (let i = 0; i < 50; i++) {
         for (let j = 0; j < 20000; j++) {
            let user = await generateRandomUser();
            try {
               await database("users").insert(user);
            } catch (error) {
               continue;
            }
         }
      }

      console.log("Finish");
      res.json({
         message: "success",
      });
   } catch (error) {
      console.log(error);
      res.json({
         message: "fail",
      });
   }
};

export const getUsername = async (req, res) => {
   const { username } = req.body;
   console.log(username);
   const data = await database
      .select("*")
      .from("users")
      .where("username", "=", username);
   if (data.length > 0) {
      res.json({
         result: "success",
         userId: null,
      });
   } else {
      res.status(400).json({
         result: "fail",
         userId: null,
      });
   }
};

export const detectPassword = async (req, res) => {
   const { username } = req.body;
   var isFound = false;
   let foundPassword;
   let data;

   try {
      data = await database
         .select("*")
         .from("users")
         .where("username", "=", username);
   } catch (err) {
      console.error(err);
      res.status(400).json({
         result: "fail",
         userId: null,
      });
   }

   for (var i = 0; i < 999999; i++) {
      let password = i.toString().padStart(6, "0");
      const isValid = await checkPassword(password, data[0].password);
      if (isValid) {
         isFound = true;
         foundPassword = password;
         break;
      }
   }

   if (isFound) {
      console.log(foundPassword);
      res.json({
         result: foundPassword,
      });
   } else {
      res.status(400).json({
         result: "fail",
      });
   }
};
