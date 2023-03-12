import { Helmet } from "react-helmet";

function ReactHelmet({ description, title, pageTitle, image }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        property="og:title"
        content={`AQUIZ - 어퀴즈, 퀴즈 메이커 |" ${pageTitle}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        property="og:site_name"
        content="AQUIZ, 어퀴즈 - 퀴즈 메이커 | 나만의 퀴즈를 만들자"
      />
      {/* 트위터 Part */}
      <meta
        name="twitter:card"
        content={`AQUIZ - ${pageTitle} #AQUIZ #나만의퀴즈만들기 #내퀴즈만들기`}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

export default ReactHelmet;
