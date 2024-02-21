FROM node:20-alpine3.18 as builder

WORKDIR /app

COPY . .

FROM ubuntu:20.04

WORKDIR /app

COPY --from=builder /app .

RUN apt-get update
RUN apt-get install -y curl sudo

# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh 
RUN sh get-docker.sh
RUN rm get-docker.sh 
RUN usermod -aG docker root
RUN systemctl enable docker 
RUN systemctl start docker

EXPOSE 4005

CMD ["docker", "compose" , "up"]