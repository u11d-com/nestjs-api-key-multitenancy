SELECT 'CREATE DATABASE api_key_multitenancy_demo' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'api_key_multitenancy_demo')\gexec
