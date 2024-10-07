export const URL = process.env.REACT_APP_BASE_URL;

let apiServices = {
    comments: `${URL}/comments`,
    posts: `${URL}/posts`
};

export default apiServices;
