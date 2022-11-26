import { AppConfig } from '../utils/AppConfig';

const Index = () => {
  return (
    <>
      <h1>Bikkelhart Boilerplate NextJS</h1>
    </>
  );
};

export const getStaticProps = async ({ preview = false }) => {
  const pageData = AppConfig ?? [];

  return {
    props: {
      ...pageData,
      preview
    }
  };
};

export default Index;
