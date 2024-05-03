export const AuthFormClasses = {
  box: "min-h-screen flex items-center justify-center flex-col gap-5 w-full dark:bg-gray-950",

  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",

  input:
    "shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",

  checkbox:
    "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none",

  p: "text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center mt-5",

  button:
    "w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-full shadow-sm font-medium text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-secondary disabled:cursor-not-allowed",

  span: "text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-semibold",
};

export const PostsClasses = {
  button:
    "flex items-center space-x-1 hover:bg-background px-4 lg:px-6 py-3 rounded-md text-sm font-[500]",
  postBox:
    "bg-white rounded-lg shadow-sm max-w-xl mx-auto my-4 border border-gray-200",
};

export const StartNewPostClasses = {
  icons:
    "flex items-center gap-2 py-3 px-2 w-fit rounded cursor-pointer transition-all duration-300 hover:bg-background",
};

export const HeaderClasses = {
  nav: "flex flex-col justify-center items-center text-secondary ss:min-w-[80px] min-w-[48px] min-h-[52px] border-b-2 border-transparent hover:text-linkedBlack transition-all duration-300 pb-1",
};
