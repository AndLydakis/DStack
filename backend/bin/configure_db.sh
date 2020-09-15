#!/usr/bin/env bash
echo "Configure Script Starting"
dropdb -U ds_admin dragonstackdb
echo "Dropped dragonstackdb"
createdb -U ds_admin dragonstackdb
echo "Re-Created dragonstackdb"

psql -U ds_admin dragonstackdb < ./bin/sql/generation.sql
psql -U ds_admin dragonstackdb < ./bin/sql/dragon.sql
psql -U ds_admin dragonstackdb < ./bin/sql/trait.sql
psql -U ds_admin dragonstackdb < ./bin/sql/dragonTrait.sql

node ./bin/insertTraits.js
echo "Configure Script Done"