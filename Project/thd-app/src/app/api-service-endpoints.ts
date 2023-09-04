export const API_BASE_URL = "http://localhost:3000/";

export enum ENDPOINTS {
    // Login
    login = 'users/login',
    // Register as Admin
    registerAsAdmin = 'users/admin/sign-up',
    // Register as User
    registerAsUser = 'users/sign-up',
    // Articles
    getNews = 'news',
    createArticle = 'news',
    editArticle = 'news/',
    removeArticle = 'news/delete/',
    // Labs
    getLabs = 'labs',
    createLab = 'labs',
    reserveLab = 'labs/reserve/',
    removeLab = 'labs/delete/',
    // Users
    getUsers = 'users',
    removeUser = 'users/delete/'
}