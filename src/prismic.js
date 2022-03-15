import * as prismic from "@prismicio/client";

// Fill in your repository name
export const repositoryName = "you-repo-name";

export const client = prismic.createClient(repositoryName, {
  // If your repo is private, add an access token.
  accessToken: "",

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  routes: [
    {
      type: "post",
      path: "/blog/:uid",
    },
    {
      type: "blog_home",
      path: "/",
    },
  ],
});
