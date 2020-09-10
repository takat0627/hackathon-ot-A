#!/bin/sh

# chatapp内で実行することを想定しています．

# DB削除
if [ -e $PWD/db/development.sqlite3 ]; then
    echo "=========================================================================="
    echo "Removed : $PWD/db/development.sqlite3"
    echo "=========================================================================="
    rm $PWD/db/development.sqlite3
fi

# migrate
$PWD/node_modules/.bin/sequelize db:migrate
# seed
$PWD/node_modules/.bin/sequelize db:seed:all