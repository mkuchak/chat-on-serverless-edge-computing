# Live Chat Application on Serverless Edge Computing

This is a final paper (<a href="Final_Paper_Live_Chat_Application_on_Serverless_Edge_Computing.pdf">PDF article</a>) presented as one of the mandatory requirements for approval of B.Sc. Computer Science at the Regional University of the Northwest of the State of Rio Grande do Sul.

<br />

<div align="center">

<img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" />
<img src="https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" />

<img src="https://img.shields.io/badge/TypeScript-3178c6.svg?logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudflare-F6821F?logo=cloudflare&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white" />

</div>

<br />

This project (<a href="https://chat.kuch.dev">try demo</a>) focused on exploring technologies involving edge and serverless computing. For this, a complete application was built to run a chat with public chat rooms. The infrastructure provider chosen was Cloudflare due to its excellent ecosystem created, providing several tools for the solution to remain completely at the edge, thus achieving exceptional performance.

<br />

<div align="center">

<img src="https://user-images.githubusercontent.com/3791148/187328001-0b8ee430-8594-4fbf-9be2-9d928a49fc11.gif" />

</div>

## Abstract
The work deals with the implementation of a real-time chat system based on Serverless Edge Computing technology. This system, unlike others of its kind, does not use traditional cloud computing infrastructure, which brings numerous advantages to the final product, such as the ability to manage large volumes of traffic, provide low latency and persist the generated data close to the user. To this end, related works were reviewed to identify the main existing solutions for the problem to be addressed, as well as their main limitations. From there, the solution proposal is presented, detailing all the system components and their respective roles. Then, the implementation of the system is carried out and, finally, the results achieved are presented, which proved to be successful. We could see a system capable of handling large volumes of data at low latency. In addition, the system can be easily scaled to meet ever-increasing demands, without the need for major infrastructure investments. As a result, the work demonstrated the feasibility of using Serverless Edge Computing technology to build a real-time chat system, offering a scalable, low-latency and low-cost solution.

**Keywords**: Fog Computing. Edge Computing. Real Time Application. Chat. Serverless.

## How to deploy

Sign in with your <a href="https://dash.cloudflare.com/login">Cloudflare dashboard</a> account and the Workers tab. Look for the Account ID, and put it in the `./workers/wrangler.toml` file. After that, you need to purchase a **paid plan on Workers** to try out the Durable Objects service. Once acquired, to perform the deployment just type the following commands in the terminal:

### Back-end

```bash
# go to the workers folder
$ cd workers

# install Wrangler CLI to deploy
$ npm install -g wrangler

# login to Cloudflare
$ wrangler login

# finally, deploy the workers
$ wrangler publish
```

### Front-end

```bash
# back to the main folder
$ cd ..

# copy .env and change the variable according to your endpoint
$ cp .env.example .env

# install dependencies
$ npm install

# build the application
$ npm run build

# start local server
$ npm run start

# you can also easily deploy it on Vercel
# https://vercel.com/
```