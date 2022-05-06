# Restcountries API

This API has 5 end points where the first 3 are for authentication and the other 2 return one or all countries for a given string

- `/api/v1/auth/signup` -->  signup takes name, email and password and save them to postgrestsql on heroku.
- `/api/v1/auth/login` -->  login takes email and password and authenticate the user returning a token.
- `/api/v1/auth/logout` -->  logout destroy the user session by removing the token from the cookies.
- `/api/v1/countries/search-all`  -->  search-all return all the contries tha match a givent string.
- `/api/v1/countries/search-one`  -->  search-one return one contriy tha match a givent string.

![api](https://user-images.githubusercontent.com/67757001/165146174-f64f71ca-e6ef-4bb5-8c06-8e278e40d495.jpg)

## Built With

- Node
- Jest
- JWT
- Supertest

## Getting Started

To get a local copy up and running follow these simple example steps.

Run in your terminal `git clone git@github.com:Mhdez221993/restcountries_api.git`

## Run some test

```
npm run test
```

## Helpful links

- [Crafting authentication schemes with Prisma in Express](https://blog.logrocket.com/crafting-authentication-schemes-with-prisma-in-express/)
- [Hashing passwords in NodeJS with bcrypt](https://sebhastian.com/bcrypt-node/)
- [How to Build an Authentication API with JWT Token in Node.js](https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/)

## Authors

👤 **Moises Hernandez**

- GitHub: [@Mhdez221993](https://github.com/Mhdez221993)
- Twitter: [@MoisesH42060050](https://twitter.com/MoisesH42060050)
- LinkedIn: [Moises Hernandez Coronado](https://www.linkedin.com/in/moises-hernandez-9bbb17145/)

## Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Mhdez221993/restcountries_api/issues).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- To the [jobsqd](https://www.jobsqd.com/) for providing the test project
