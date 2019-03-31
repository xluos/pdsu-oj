import { prisma } from './generated/prisma-client';

prisma.user({userId: '151360205'}).$fragment(`
  {userId,name,password}
`).then(data => {
  console.log(data)
})
