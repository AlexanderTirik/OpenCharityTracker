import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

type IProps = {};

const Statistics = ({}: IProps) => {
  return (
    <div>
      <Head>
        <title>Sasha</title>
        <meta name="description" content="Aboba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={() => {}} />
      Hello {name}
    </div>
  );
};

export const getStaticPaths = async () => {
  // getAllProjects() should return [{ params: { name: 'Teronlyfans' }}]
  // const paths = await getAllProjects();
  const paths = [
    { params: { name: "test1" } },
    { params: { name: "test2" } },
    { params: { name: "test3" } },
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

export default Statistics;
