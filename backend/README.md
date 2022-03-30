## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# running in docker instructions(make sure to install modules)
$ docker build -t open-charity-backend
$ docker run -p 3000:3000 --name open-charity-backend-image open-charity-backend

# stopping docker image
docker stop open-charity-backend-image
```

## License

Nest is [MIT licensed](LICENSE).
