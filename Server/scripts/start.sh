if [ "${SERVICE_DEPLOY}" == "true" ]; then      
  cd src/model
  prisma deploy
fi

cd /app

npm run start
