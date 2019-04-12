import {  UserCreateInput, prisma } from "../src/model/generated/prisma-client";
const Mock = require('mockjs');

const count = parseInt(process.argv[2])

function mockUser():UserCreateInput {
  const Random = Mock.Random
  Random.extend({
    LowNumber: function(num) {
      return this.natural(num/4, num*2/3)
    },
    userId: function () {
      return `${this.natural(101360205,191360205)}`
    }
  })
  return Mock.mock({
    "userId": "@userId",
    "password|9-12": '',
    "level|0-5": 0,
    "name": "@cname",
    "email": "@email",
    "integral|0-1000": 0,
    "coin": "@LowNumber(@integral)",
    "submit|0-1000": 0,
    "solved": "@LowNumber(@submit)",
    "accepted": "@LowNumber(@solved)"
  })
}

console.log('开始生成');

async function main() {
  let pa = []
  for (let i = 0; i < count; i++) {
    pa.push(prisma.createUser(mockUser()))
  }
  let user = await Promise.all(pa)
  console.log(user.length);
}

main()
