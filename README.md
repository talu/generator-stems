# Stems - Generator
> A [Yeoman](http://yeoman.io/) generator used to bootstrap [Node.js](https://nodejs.org/en/) micro-services. 

## Install Yeoman

To install the Yeoman CLI, run:

```bash
npm install -g yo
```

## Install the generator

To install Stems from npm, run:

```bash
npm install -g generator-stems
```

## Run the generator

Finally, initiate the generator:

```bash
yo stems
```
## Generator options

Currently these are the options and their implications:

+ **Project Name**
  + Used for display purposes in logging and comments
  + Converted to kebab-case, then used as the `name` field in `package.json`
+ **Description**
  + Used as the `description` field in `package.json`
+ **Version**
  + Used as the `version` field in `package.json`
+ **Repo URL**
  + Used as the `repository.url` and `homepage` fields in `package.json`
  + Suffixed with `/issues` to form the `bugs` field in `package.json`
+ **Author**
  + Used as the `author.name` field in `package.json`
+ **Author's Email**
  + Used as the `author.email` field in `package.json`
+ **Public App?**
  + Sets up a [Mongoose](http://mongoosejs.com/docs/) and [Baucis](https://github.com/wprl/baucis) based webapp with a default public config
+ **Private App?**
  + Sets up a Mongoose and Baucis based webapp with a default private config
+ **Amazon SWF?**
  + Sets up default directories and dependencies (like [Usher](https://github.com/meltmedia/node-usher)) for [Amazon SWF](https://aws.amazon.com/swf/) workflows, activities and deciders
+ **MongoDB?**
  + Sets up [MongoDB](https://www.mongodb.org/) access through Mongoose and default configurations
  + *Already included with Public and Private apps*
  + *MongoDB is not included*
