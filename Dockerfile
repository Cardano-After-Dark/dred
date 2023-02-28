FROM node:latest as foundation

#SHELL ["/bin/bash", "--login", "-c"]

ENV NODE_ENV development
ENV SHELL /bin/bash
ENV TMP_DIR /mnt/tmp
ENV WORKDIR /dred

ENV PATH "${WORKDIR}/bin:${WORKDIR}/node_modules/.bin:${PATH}" 
ENV npm_config_cache "${TMP_DIR}/npm-cache"


WORKDIR ${WORKDIR}

COPY bin/pid1 /sbin/pid1

RUN echo "Configuring permissions" \
    && chmod +x /sbin/pid1 \
    && chmod +x /usr/local/bin/docker-entrypoint.sh \
    && mkdir ${TMP_DIR} \
    && chown -R node:node ${TMP_DIR} ${WORKDIR}

RUN echo 'Installing system dependencies' \
    && apt-get update \
    && apt-get --assume-yes --no-install-recommends install \
       ca-certificates \
       curl \
       parallel 

USER root

RUN npm i -g nodemon
RUN npm i -g ts-node
RUN npm i -g pnpm

RUN echo "Customizing shell prompt" \
    && (echo 'export PS1="[server]:\u@\h:\w\\$ "' >> ~/.bashrc)

ADD ./ ./
RUN rm -rf ./node_modules

RUN pnpm install

RUN pnpm build

ENTRYPOINT [ "/sbin/pid1", "--timeout", "10", "docker-entrypoint.sh" ]
