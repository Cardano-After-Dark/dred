---
title: Installation
description: Install prerequisites, clone the code, run the server and demo application, access the documentation.
---

This section is about installing the prerequisites, clone the code and run the application
- *prerequisites*: Docker, node, npm, pnpm
- *code*: https://github.com/Cardano-After-Dark/dred
- *run*: pnpm install, pnpm dev
- *run* [demo application](http://localhost:3031/) and *access* [documentation](http://localhost:3031/)

---



## Install docker

If you haven’t already, install Docker for [windows](https://docs.docker.com/desktop/install/windows-install/), [macos](https://docs.docker.com/desktop/install/mac-install/) or [linux](https://docs.docker.com/desktop/install/linux-install/).**

## Install nvm & pnpm

See if nvm is installed with `nvm -v`

If not already configured, install nvm, and then run `nvm install --lts` to install both **node** and **npm**. Then, If not already configured, install **pnpm** with the following command `npm install -g pnpm` .

## Clone the  [project](https://github.com/Cardano-After-Dark/dred)

We assume SSH cloning, so you need a KeyPair. In case you need to set it up, check this [page about creating an SSH keypair](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) , specifically this [section about adding your Public key to github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

Once authentication is done pull the main branch with the below command.

``` bash
git clone git@github.com:Cardano-After-Dark/dred.git
```


## Build and Run

In order to build and run the project change to the project directory and run the below commands: 

``` bash
pnpm install  
pnpm dev
```

pnpm dev is a shortcut that does the following
* run *redis* in a *docker* container
* un **dred server** listening on *localhost* and communicating to *redis*
* run a [**dred client app**](http://localhost:3030/) that communicates with the *dred server*.
* run a [**dred documentation site**](http://localhost:3031/) 

## Testing
You can always build and run the application with the command `pnpm install` followed by `pnpm dev`.

When done, you should be able to access the client application at [localhost:3030/](http://localhost:3030/), and you will see the server diagnostics on the command line

### Dred Demo Application

The DRED Demo Application is a simple client application which uses the DRED client library to communicate with the DRED Server. In the development environment the DRED Server runs within Docker, but in the real world it typically runs on some server accessible on internet.

![DRED demo application ](/attachments/dred-demo-application-screenshot-20230419.png)

### DRED Documentation
Once started the dev environment with `pnpm dev`, the documentation is accessible at [localhost:3031/](http://localhost:3031/) . 

