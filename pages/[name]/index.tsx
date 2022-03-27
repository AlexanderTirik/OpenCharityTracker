import { Button } from "@chakra-ui/react";
import Head from "next/head";

type IProps = {};

const Project = ({}: IProps) => {
  return (
    <div>
      <Head>
        <title>Sasha</title>
        <meta name="description" content="Aboba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={() => {}} />
      {name}
    </div>
  );
};

export const getStaticPaths = async () => {
  // getAllProjects() should return [{ name: 'Teronlyfans' }]
  // const paths = await getAllProjects();
  const paths = [
    { params: { name: "sasha" } },
    { params: { name: "tirik" } },
    { params: { name: "aboba" } },
  ];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { name },
}: {
  params: { name: string };
}) => {
  const projectData = await getProjectData(name);
  return {
    props: {
      projectData,
      // return info about project
    },
  };
};

export default Project;
