require("dotenv").config();

export const jwtConfig = {
  secretKey: process.env.SECRET_KEY, // 원하는 시크릿 키
  options: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "7d", // 토큰 유효 기간
    // expiresIn: "10s", // 토큰 유효 기간
    issuer: "aquiz", // 발행자
  },
};
