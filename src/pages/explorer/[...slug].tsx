import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./Explorer.module.css";

export const metadata: Metadata = {
  title: "AcademiaDrive Explorer",
};

type ExplorerPageProps = {
  params: {
    slug: string[];
  };
  directories: { name: string }[];
  files: { name: string; ext: string }[];
};

export async function getStaticPaths() {
  const basePath = path.join(process.cwd(), "public/academiadrive");

  const getDirectories = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let directories: string[] = [];

    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        directories.push(
          fullPath.replace(basePath, "").replace(/\\/g, "/").slice(1)
        );
        directories = directories.concat(getDirectories(fullPath));
      }
    });

    return directories;
  };

  const directories = getDirectories(basePath);
  const paths = directories.map((dir) => ({
    params: { slug: dir.split("/") },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const { slug = [] } = params;
  const basePath = path.join(process.cwd(), "public/academiadrive", ...slug);

  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(basePath, { withFileTypes: true });
  } catch {
    return { notFound: true };
  }

  const directories = entries
    .filter((e) => e.isDirectory())
    .map((dir) => ({ name: dir.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const files = entries
    .filter((e) => e.isFile())
    .map((file) => ({
      name: file.name,
      ext: path.extname(file.name).toLowerCase().replace(/^\./, ""),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: { params, directories, files },
  };
}

export default function ExplorerPage({
  params,
  directories,
  files,
}: ExplorerPageProps) {
  const { slug = [] } = params;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const fileUrl = (name: string) =>
    `${basePath}/academiadrive/${[...slug, name]
      .map((s) => encodeURIComponent(s))
      .join("/")}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-semibold text-gray-900 mb-1">
          Study Material
        </h1>

        <div
          className={`${styles.subheading} text-center text-sm text-gray-600 mb-8`}
        >
          {slug.length > 0 ? slug.join(" / ") : "SELECT A CATEGORY"}
        </div>

        {directories.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {directories.map((dir) => (
              <Link
                key={dir.name}
                href={`/explorer/${[...slug, dir.name].join("/")}`}
                className="block"
                aria-label={`Open ${dir.name}`}
              >
                <div
                  title={dir.name}
                  className="w-58 h-20 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-center text-sm md:text-base font-medium text-gray-900 shadow-sm hover:shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  <span className="cardText">
                    {dir.name.replace(/_/g, "_\u200B")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <>
            <h2 className="text-center text-xl font-semibold mt-4 mb-4 text-gray-800">
              Files Available
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {files.map((file) => {
                const url = fileUrl(file.name);
                return (
                  <div
                    key={file.name}
                    className="w-60 rounded-lg border border-gray-300 bg-white px-3 py-3 text-center shadow-sm"
                  >
                    <div className="text-sm md:text-base font-medium text-gray-900 break-words">
                      {file.name.replace(/_/g, "_\u200B")}
                    </div>
                    <div className="mt-2 flex justify-center gap-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        View
                      </a>
                      <a
                        href={url}
                        download
                        className="text-xs px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {directories.length === 0 && files.length === 0 && (
          <p className={`${styles.footer} text-center text-gray-500 mt-8`}>
            No folders or files found in this section.
          </p>
        )}
      </div>
    </main>
  );
}