rm ./src/common/infrastructure/database/orm/prisma/schema.prisma
cat ./src/common/infrastructure/database/orm/prisma/index.prisma \
    ./src/modules/user/infrastructure/database/schemas/*.prisma \
    > ./src/common/infrastructure/database/orm/prisma/schema.prisma