FROM node as builder
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . .

RUN cd client && npm install && npm run build
RUN cd server && npm install && npm run build

FROM node as runner
RUN mkdir -p /home/node/app

#for server
COPY --from=builder /home/node/app/server/dist ./dist
COPY --from=builder /home/node/app/server/package*.json .
RUN npm install

# for client
COPY --from=builder /home/node/app/server/static ./static

# for environment
COPY --from=builder /home/node/app/server/.env .

EXPOSE 3000
RUN npm install -g cross-env
ENTRYPOINT ["cross-env", "MODE=production", "node", "./dist/main.js"]
