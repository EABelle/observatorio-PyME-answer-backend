#! /bin/bash

mongoimport --host mongo --db observatorio-pyme --collection roles --type json --file /mongo-seed/observatorio_pyme_roles.json --jsonArray
mongoimport --host mongo --db observatorio-pyme --collection users --type json --file /mongo-seed/observatorio_pyme_users.json --jsonArray
mongoimport --host mongo --db observatorio-pyme --collection templates --type json --file /mongo-seed/observatorio_pyme_templates.json --jsonArray