import crypto from "crypto";

export const generateUsername = () => {
   const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
   let username = "";

   for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * lowercaseLetters.length);
      username += lowercaseLetters[randomIndex];
   }

   return username;
};

export const generatePassword = () => {
   const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
   const password = randomNumber.toString();
   return password.toString();
};

export const sha256 = async (password) => {
   const hash = await crypto.createHash("sha256");
   hash.update(password);
   return hash.digest("hex");
};

export const checkPassword = async (candidatePassword, storedHash) => {
   const candidateHash = await sha256(candidatePassword);

   if (candidateHash === storedHash) {
      return true; 
   } else {
      return false;
   }
};

export const generateRandomUser = async () => {
   let hashedPassword = await sha256(generatePassword());
   return {
      username: generateUsername(),
      password: hashedPassword,
   };
};
