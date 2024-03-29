# temple-backend

## Installation

```bash
$ npm install
```

## Setup

- Fill out `.env.example` and rename to `.env`
- Create credentials
  - `src/creds/firebase-dev.json`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## References

- [NestJS docs](https://docs.nestjs.com/).

## Conventions

### Pagination

- Follow the response schema displayed below
- Example: [`getCollectionHistoricalStats`](src/stats/stats.service.ts) located in `stats.service.ts`

```
{
    data: <ARRAY OF ITEMS>,
    cursor: <BASE 64 ENCODED CURSOR>, // cursor should be used to get the next page (not including the previous last item)
    hasNextPage: <BOOLEAN> // indicates if there is another page to get
}
```
