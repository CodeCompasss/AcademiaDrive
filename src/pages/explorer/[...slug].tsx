import { Folder, FileText, ChevronRight, Home } from "lucide-react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";
import styles from "./Explorer.module.css"; // Assuming you have a CSS module for styles

export const metadata: Metadata = {
  title: "AcademiaDrive Explorer",
};

type ExplorerPageProps = {
  params: {
    slug: string[];
  };
  directories: { name: string; path: string }[];
  pdfs: { name: string; path: string }[];
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
        directories = directories.concat(getDirectories(fullPath)); // Recursively add directories
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
    return { notFound: true }; // Return 404 if path doesn't exist
  }

  const directories = entries
    .filter((e) => e.isDirectory())
    .map((dir) => ({ name: dir.name, path: path.join(basePath, dir.name) }));

  const pdfs = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf"))
    .map((pdf) => ({ name: pdf.name, path: path.join(basePath, pdf.name) }));

  return {
    props: { params, directories, pdfs },
  };
}

export default function ExplorerPage({
  params,
  directories,
  pdfs,
}: ExplorerPageProps) {
  const { slug = [] } = params;

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

        {/* Folders / Directories */}
        {/* Directories */}
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
                  role="button"
                  title={dir.name}
                  className="w-58 h-20 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-center text-sm md:text-base font-medium text-gray-900 shadow-sm hover:shadow-md hover:bg-blue-600 hover:text-white transition-colors duration-200"
                >
                  <span className=" cardText ">
                    {dir.name.replace(/_/g, "_\u200B")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* PDFs */}
        {pdfs.length > 0 && (
          <>
            <h2 className="text-center text-xl font-semibold mt-4 mb-4 text-gray-800">
              PDFs Available
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {pdfs.map((pdf) => {
                const label = pdf.name.replace(/\.pdf$/i, "");
                return (
                  <a
                    key={pdf.name}
                    href={`/academiadrive/${[...slug, pdf.name].join("/")}`}
                    className="block"
                    download
                    aria-label={`Download ${label}`}
                    title={label}
                  >
                    <div className="w-48 h-20 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-center text-sm md:text-base font-medium text-gray-900 shadow-sm hover:shadow-md hover:bg-green-600 hover:text-white transition-colors duration-200">
                      <span className="break-words whitespace-normal leading-tight">
                        {label.replace(/_/g, "_\u200B")}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

          </>
        )}

         


        {/* Empty state */}
        {directories.length === 0 && pdfs.length === 0 && (
          <p className={`${styles.footer} text-center text-gray-500 mt-8`}>
            No folders or PDFs found in this section.
          </p>
        )}
      </div>
    </main>
  );
}
