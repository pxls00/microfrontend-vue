interface ICopyFolder {
  from: string,
  to: string
}

export interface BuildPaths {
  entry: string,
  output: string,
  favicon: string,
  html: string,
  src: string,
  copyFolders: ICopyFolder[],
}

export type BuildMode = "production" | "development"

export interface BuildOptions {
  port: number,
  paths: BuildPaths,
  mode: BuildMode
}