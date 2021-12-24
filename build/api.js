const nextDefaultApiPath = "pages/api/";
require("fs").readdir(nextDefaultApiPath, (err, files) => {
  files.forEach((file) => {
    require("esbuild").buildSync({
      entryPoints: [`${nextDefaultApiPath}${file}`],
      entryNames: "[dir]/[name]/index",
      outbase: "pages",
      // Why we bundle?
      // - We might want to import external modules outside `api` dir, bundle it is necessary
      // - Bundle dependencies so we don't have to add `package.json` file
      bundle: true,
      platform: "node",
      target: ["node10.15"],
      outdir: "out",
    });
  });
});
