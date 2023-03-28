import URL from "../src/assets/url";

export function getQuiz(page, LIMIT, order, thema, rating, search) {
  const themaQuery = thema?.join("&thema=");
  if (search) {
    // const response = await fetch(
    //   `${URL}?page=${page}&LIMIT=${LIMIT}&order=${order}${themaQuery}&rating=${rating}&keyword=${search}`,
    //   {
    //     method: "GET",
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("퀴즈를 받아오는데 실패 했습니다. 새로고침을 해주세요.");
    // }
    // const quiz = await response.json();
    // return quiz;
    return fetch(
      `${URL}?page=${page}&LIMIT=${LIMIT}&order=${order}${themaQuery}&rating=${rating}&keyword=${search}`
    ).then((response) => {
      return response.json();
    });
  } else {
    // const response = await fetch(
    //   `${URL}?page=${page}&LIMIT=${LIMIT}&order=${order}${themaQuery}&rating=${rating}`,
    //   {
    //     method: "GET",
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("퀴즈를 받아오는데 실패 했습니다. 새로고침을 해주세요.");
    // }
    // const quiz = await response.json();
    // return quiz;
    return fetch(
      `${URL}?page=${page}&LIMIT=${LIMIT}&order=${order}${themaQuery}&rating=${rating}`
    ).then((response) => response.json());
  }
}
