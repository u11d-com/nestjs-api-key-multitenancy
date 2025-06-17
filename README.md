<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS API Key Multi-tenancy Demo

A production-ready implementation of multi-tenant API key authorization in NestJS. This project demonstrates how to securely generate, store, and validate API keys while ensuring tenants can only access their own resources.

## About This Project

This repository serves as a demonstration of implementing secure, multi-tenant API key authorization in NestJS applications. The implementation includes:

- Secure API key generation and storage with proper cryptographic hashing
- Efficient validation using Redis caching
- NestJS guards for enforcing tenant isolation
- Rate limiting to prevent brute force attacks
- A clean REST API structure that aligns with authorization requirements

For a detailed explanation of the implementation, check out our [blog post on multi-tenant API key authorization](https://u11d.com/blog/nestjs-multi-tenancy-api-key-authorization).

The project uses Docker Compose to run:

- NestJS application
- PostgreSQL database
- Redis cache

## Project Setup

1. Clone the repository:

```bash
$ git clone https://github.com/u11d-com/nestjs-api-key-multitenancy.git
$ cd nestjs-api-key-multitenancy
```

2. Start the services using Docker Compose:

```bash
$ docker-compose up
```

This will start the NestJS application along with PostgreSQL and Redis services.

## Security Features

- API keys are never stored in plain text, only as secure hashes
- Double hashing with salt to prevent rainbow table attacks
- Redis caching for faster API key lookups and validation
- API key expiration management
- Rate limiting to prevent brute force attacks
- Tenant isolation to prevent cross-tenant access

## Development

```bash
# install dependencies
$ yarn

# watch mode
$ yarn run start:dev
```

## License

This project is [MIT licensed](LICENSE).

## Something about us

Check [u11d.com](https://u11d.com) to meet our company and explore our range of professional services.

Don't forget to explore our [blog](https://u11d.com/blog) as well! It's a treasure trove of valuable content covering various topics such as web development, DevOps, observability, and management.
