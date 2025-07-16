module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
<<<<<<< HEAD
  eleventyConfig.addPassthroughCopy("admin"); // <-- PASTIKAN BARIS INI ADA



=======
  eleventyConfig.addPassthroughCopy("admin");
  
>>>>>>> 1223facfc41ea1b243d6e776d17b3cfe26a16d43
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "docs"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
