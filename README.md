# se_school

Software Engineering School 4.0 // Case

## How to run the app

### Prerequisites:

1. create `.env.development` for dev mode and `.end.production` for production mode. The respective fields you can find in `.env.example`
2. `npm run i` to install packages

### Dev mode:

1. `npm run env:dev` to start postgres container
2. (a) `npm run dev` to start the application in watch mode
3. (b) `npm run start` to start the application

The second point will automatically run migrations.

### Prod mode:

1. `npm run env:prod` to run docker compose yaml that consists of application docker image and postgres. It will automatically pull the required packages and install node_modules.

## What could be better:

1. More basic things like base classes for controllers, services, entities, validators and so on.
2. Better segregation of duties. Currently there is no separate service for a specific logic as the task is quite easy/fuzzy. Due to the lack of details/domain knowledge it is hard to highlight specific modules.
3. Naming for sure (scripts, functions)
4. The task with cron jobs should be solved not by Node.js, but with queues like bull queue (based on Redis). But it would complicate the solution having simple API requirements.
5. Emails sending logic could be implemented with queue as well. Currently, we would stuck at some point of 1000x emails at the moment. The mechanism like semaphore is viable here, but passing the responsibility of handling it to the queue is superior.
6. Having tests :/

In a nutshell, it is not expedient to build a spaceship having 4 days deadline to handle 2 endpoints. But the improvement path is quite clear.
