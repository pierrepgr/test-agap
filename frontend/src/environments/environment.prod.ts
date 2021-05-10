export const environment = {
    production: true,
    baseURL: 'http://localhost:8080',
  
    tokenWhitelistedDomains: [/localhost:8080/],
    tokenBlacklistedRoutes: [ /localhost:8080\/oauth\/token/ ] 
};
