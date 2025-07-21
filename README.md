# Console Art Cybernetic
![Computer Engineering](https://img.shields.io/badge/computer%20engineering-FCFCFC?style=for-the-badge)
![Organization](https://img.shields.io/badge/organization-033546.svg?style=for-the-badge)
![Console Art](https://img.shields.io/badge/console%20art-262626?style=for-the-badge)
![Company](https://img.shields.io/badge/company-B2D7E3?style=for-the-badge)

Console Art Cybernetic is an organization founded in 2022 to help any
potential client, enterprise, or startup in the world to reach theirs
goals on technology plan like Web Development, Desktop Development,
Mobile Development, AI Development and Game Development.

## Table of contents
1. [Access link](#link)
2. [Final result](#result)
3. [Project installation](#install)
    1. [Nodejs installation](#node-install)
    2. [Yarn installation](#yarn-install)
    3. [Sources code cloning](#cloning)
    4. [Dependencies installation](#dev-install)
4. [Project execution](#running)

## Access link <a id = "link"></a>
The project is already hosted on web and can be accessible through
the link below :
- https://cacybernetic.github.io

## Final result <a id = "result"></a>
This is the final result of the project :<br/><br/>
![First render](./public/assets/render/render_1.png)
![Second render](./public/assets/render/render_2.png)
![Third render](./public/assets/render/render_3.png)
![Fourth render](./public/assets/render/render_4.png)

## Project installation <a id = "install"></a>
This project uses <i><a href = "https://vitejs.dev/guide">Vite</a></i>
bundle as javascript server + <i><a href = "https://react.dev">React</a>
</i> with <a href = "https://www.typescriptlang.org">TypeScript</a> and
<a href = "https://v2.chakra-ui.com">Chakra UI</a>. Before run the project,
you must install some dependencies before.

### Nodejs installation <a id = "node-install"></a>
⚠️ <i><b>The command line below will only work on Linux :</b></i>
```sh
sudo apt install curl;\
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash;\
source ~/.bashrc;\
nvm --version;\
nvm install --lts;\
node --version
```
To install <a href = "https://nodejs.org/en">NodeJs</a> on Windows, you
can follow the video below :

[![NodeJs tutorial video](https://img.youtube.com/vi/4FAtFwKVhn0/maxresdefault.jpg)](https://youtu.be/4FAtFwKVhn0)

To install <a href = "https://nodejs.org/en">NodeJs</a> on MacOS, you
can follow the video below :

[![NodeJs tutorial video](https://img.youtube.com/vi/l53HbzbSwxQ/maxresdefault.jpg)](https://youtu.be/l53HbzbSwxQ)

### Yarn installation <a id = "yarn-install"></a>
Make sure to install the lastest stable version of
<a href = "https://yarnpkg.com">yarn</a>.

To install <a href = "https://yarnpkg.com">yarn</a> on linux, just
open your terminal (`CTRL + ALT + T`) and run the following command
line below :
```sh
npm install yarn --global
```
To install <a href = "https://yarnpkg.com">yarn</a> on Windows you can
follow the video below :

[![Yarn tutorial video](https://img.youtube.com/vi/APyA8rax2Wk/maxresdefault.jpg)](https://youtu.be/APyA8rax2Wk)

To install <a href = "https://yarnpkg.com">yarn</a> on MacOS you can
follow the video below :

[![Yarn tutorial video](https://img.youtube.com/vi/-4iEQKabTO4/maxresdefault.jpg)](https://youtu.be/-4iEQKabTO4)

You can install the latest stable version of <a href = "https://yarnpkg.com">
yarn</a> <b><i>only</i></b> at the project root folder by running the command
line below :
```sh
yarn set version stable
```
<b><i>It's recommended to use 4.5.1 <a href = "https://yarnpkg.com">
yarn</a> version to avoid any troubleshooting while installing project
dependencies.</i></b>

<b><ins>NB</ins> : </b>It's possible to install project dependencies using
<i>npm</i> or <i>pnpm</i> command. In this case, you must remove `yarn.lock`,
`.yarnrc.yml`, `.yarn` and clear your favorite package manager caches
before perform any dependencies installation.

### Sources code cloning <a id = "cloning"></a>
```sh
git clone git@github.com:cacybernetic/cacybernetic.github.io.git ca_cybernetic/
```

### Dependencies installation <a id = "dev-install"></a>
Before start project dependencies installation, you must remove `yarn.lock`
file from the project root and clear <a href = "https://yarnpkg.com">
yarn</a> caches with `yarn cache clean` command. <br/>Go to the root
folder of the project sources and run :
```sh
yarn install
```

📔<ins>Note</ins> : <i><a href = "https://vitejs.dev/guide">Vite</a></i>
and <i><a href = "https://react.dev">React</a></i> will be installed
automatically after running the command line above.

## Project execution <a id = "running"></a>
Go to the root folder of the project and run :
```sh
yarn run dev
```
Then, open your favorite browser and tap on the search bar, the following
link below :
```sh
http://localhost:5200
```

Enjoy :)
