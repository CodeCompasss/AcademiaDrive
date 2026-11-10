import fs from "fs";
import path from "path";
import ExplorerPage from "./explorer/[...slug]";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const basePath = path.join(process.cwd(), "public/academiadrive");

  const directories = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((dir) => ({ name: dir.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      params: { slug: [] },
      directories,
      files: [],
    },
  };
};

export default function HomePage({
  directories,
  files,
}: {
  directories: { name: string }[];
  files: { name: string; ext: string }[];
}) {
  return (
    <div>
      <ExplorerPage params={{ slug: [] }} directories={directories} files={files} />
    </div>
  );
}