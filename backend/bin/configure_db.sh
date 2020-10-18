#!/usr/bin/env bash

echo "Removing Old Database"
dropdb -U node_user dragonstackdb
echo "Re-Creating Database"
createdb -U node_user dragonstackdb

echo "Connecting to db"
psql -U node_user dragonstackdb < ./bin/sql/account.sql
psql -U node_user dragonstackdb < ./bin/sql/generation.sql
psql -U node_user dragonstackdb < ./bin/sql/dragon.sql
psql -U node_user dragonstackdb < ./bin/sql/trait.sql
psql -U node_user dragonstackdb < ./bin/sql/dragontrait.sql

node ./bin/insertTraits.js

echo "Database Configured"