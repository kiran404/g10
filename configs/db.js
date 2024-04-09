const { PrismaClient } = require("@prisma/client");

const prismaClientSingleton = () => {
  return new PrismaClient();
};

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton();
  }
  prisma = globalThis.prismaGlobal;
}

module.exports = prisma;
// const { PrismaClient } = require("@prisma/client");

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// module.exports = prisma;

// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
