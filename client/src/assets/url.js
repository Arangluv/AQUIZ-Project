const URL =
  process.env.NODE_ENV === "production"
    ? "https://api.aquiz.co.kr/"
    : "http://localhost:4001/";

// : "http://192.168.219.130:4001/"; // 로컬 아이피 통신 시
// : "http://localhost:4001/";
// http://192.168.219.130:3000
export default URL;
