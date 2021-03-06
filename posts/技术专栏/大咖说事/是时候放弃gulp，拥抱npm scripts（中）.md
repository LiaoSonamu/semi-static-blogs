<!--id: a7a34d8f214f17d53c1dd2b03d886d32-->
<!--date: 2017-07-07 09:10-->
<!--tags: gulp,grunt,自动化-->
<!--nature: reprint-->
<!--link: http://www.infoq.com/cn/news/2016/02/gulp-grunt-npm-scripts-part2/-->
<!--keywords: npm,gulp,fis3,自动化,npm scripts-->

Cory House是“[Building Applications with React and Flux](https://www.pluralsight.com/courses/react-flux-building-applications)”与“[Clean Code: Writing Code for Humans](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiK1pXx89nJAhUujoMKHeuWAEUQFggcMAA&url=https%3A%2F%2Fwww.pluralsight.com%2Fcourses%2Fwriting-clean-code-humans&usg=AFQjCNEBfkBoN-IgCn_1jFUqWDAUIxcmAw&sig2=Ub9Wup4k4mrw_ffPgYu3tA)”的作者，同时也是Pluralsight上众多课程的讲师。他是VinSolutions的软件架构师，[在全球培训了为数众多的软件开发者](http://www.bitnative.com/training/)，主要领域是前端开发与整洁代码等软件开发实践。Cory是微软MVP、Telerik开发者专家，同时也是[outlierdeveloper.com](http://www.outlierdeveloper.com/)的创始人。目前，围绕着Gulp、Grunt及npm scripts社区展开了很多争论，讨论Gulp与Grunt在项目中是否还有继续使用的必要。有人坚持认为Gulp与Grunt等前端构建工具依然是不可或缺的，还有些人则认为Gulp与Grunt是完全没必要使用的，而且还增加了一层抽象，会导致很多问题。近日，Cory[撰文](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.a0ulmy8bk)谈到了他对于Gulp、Grunt与npm scripts的认识，并且认为在现在的工程中，我们完全可以抛弃Gulp与Grunt，使用npm scripts就可以满足项目之所需。

<!--more-->

在本系列的上一篇文章中，我们谈到了诸如Gulp与Grunt等任务运行器所存在的问题，接下来就来谈谈npm scripts的强大功能以及人们为何会忽略npm scripts。

## 在构建时我们为何会忽略掉npm？

我认为有如下4点原因造成Gulp与Grunt等任务运行器变得如此流行：

- 人们认为npm scripts需要强大的命令行技巧
- 人们认为npm scripts不够强大
- 人们认为Gulp的流对于快速构建来说是不可或缺的
- 人们认为npm scripts无法实现跨平台运行

下面我就来按照顺序解释一下这些误解。

## 误解1：使用npm scripts需要强大的命令行技巧

体验npm scripts的强大功能其实并不需要对操作系统的命令行了解太多。当然了，[grep、sed、awk与管道](http://www.tutorialspoint.com/unix/unix-useful-commands.htm)等是值得你去学习的，令你众生受用的技能；不过，为了使用npm scripts，你不必非得成为Unix或是Windows命令行专家才行。你可以通过npm中1000多个拥有良好文档的脚本来完成工作。

比如说，你可能不知道在Unix中，命令rm -rf会强制删除一个目录，这没问题。你可以使用[rimraf](https://www.npmjs.com/package/rimraf)完成同样的事情（它也是跨平台的）。大多数npm包都提供了一些接口，这些接口假设你对所用操作系统的命令行了解不多。只需在npm中搜索想要使用的包即可，边做边学就行了。过去，我常常会搜索Gulp插件，不过现在则是搜索npm包了。[libraries.io](https://libraries.io/)是个非常棒的资源。

## 误解2：npm scripts不够强大

npm scripts本身其实是非常强大的。它提供了基于约定的[pre与post钩子](https://docs.npmjs.com/misc/scripts#description)：

```json
{
  "name": "npm-scripts-example",
  "version": "1.0.0",
  "description": "npm scripts example",
  "scripts": {
    "prebuild": "echo I run before the build script",
    "build": "cross-env NODE_ENV=production webpack",
    "postbuild": "echo I run after the build script"
  }
}
```

在上述示例中，prebuild任务调用了clean任务。这样就可以将脚本分解为更小、命名良好、单职责，单行的脚本。

可以通过&&在一行连续调用多个脚本。上述示例中，clean步骤中的脚本会一个接着一个运行。如果你需要在Gulp中按照顺序一个接着一个地运行任务列表中的任务，那么这种简洁性肯定会吸引到你。

如果一个命令很复杂，那还可以调用一个单独的文件：

```json
{
  "name": "npm-scripts-example",
  "version": "1.0.0",
  "description": "npm scripts example",
  "scripts": {
    "build": "node build.js"
  }
}
```

我在上述的build任务中调用了一个单独的脚本。该脚本会被Node所运行，这样就可以使用我所需的任何npm包了，同时还可以利用上JavaScript的能力。我还能列出很多，不过感兴趣的读者可以参考[这份核心特性文档](https://docs.npmjs.com/misc/scripts)。此外，Pluralsight上也有一门关于如何将npm作为构建工具的[课程](https://www.pluralsight.com/courses/npm-build-tool-introduction)。还可以看看[React Slingshot](https://github.com/coryhouse/react-slingshot)以直观了解其使用方式。

## 误解3：Gulp的流对于快速构建来说是不可或缺的

Gulp出来后，人们之所以很快就被它吸引过去并放弃Grunt的原因在于Gulp的内存流要比Grunt基于文件的方式快很多。不过，要想享受到流的强大功能，实际上并不需要Gulp。事实上，流早就已经被内建到Unix与Windows命令行中了。管道（|）运算符会将一个命令的输出以流的方式作为另一个命令的输入。重定向（>）运算符则会将输出重定向到文件。比如说在Unix中，我可以“grep”一个文件的内容，并将输出重定向到一个新的文件：

```bash
$ grep "Cory House" bigFile.txt > linesThatHaveMyName.txt
```

上述过程是流式的，并不会被写入到中间文件中（想知道如何以跨平台的方式实现上面的命令么？请继续往下读）。

在Unix中，还可以通过“&”运算符同时运行两个命令：

```bash
$ npm run script1.js & npm run script2.js
```

上述两个脚本会同时运行。要想以跨平台的方式同时运行脚本，请使用[npm-run-all](https://www.npmjs.com/package/npm-run-all)。这就造成了下面这个误解。

## 误解4：npm scripts无法实现跨平台运行

很多项目都会绑定到特定的操作系统上，因此跨平台是一件并不那么重要的事情。不过，如果需要以跨平台的方式运行，那么npm scripts依然可以工作得很好。无数的开源项目就是佐证。下面来介绍一下实现方式。

操作系统的命令行会运行你的npm scripts。因此，在Linux与OS X上，npm scripts会在Unix命令行中运行。在Windows上，npm scripts则运行在Windows命令行中。这样，如果希望构建脚本能够运行在所有平台上，你需要适配Unix与Windows。下面介绍3种实现方式：

## 方式1：使用跨平台的命令

有很多跨平台的命令可供我们使用。下面列举一些：

- && 链式任务（一个任务接着一个任务运行）
- < 将文件内容输入到一个命令
- >  将命令输出重定向到文件
- | 将一个命令的输出重定向到另一个命令

## 方式2：使用node包

可以使用node包来代替shell命令。比如说，使用rimraf来代替“rm -rf`”。使用cross-env以跨平台的方式设置环境变量。搜索Google、npm或是libraries.io，寻找你所需要的，几乎都会有相应的node包以跨平台的方式实现你的目标。如果命令行调用过长，你可以在单独的脚本中调用Node包，就像下面这样：

```bash
$ node scriptName.js
```

上述脚本就是普通的JavaScript，由Node运行。既然是在命令行调用了脚本，那么你就不会受限于.js文件。你可以运行操作系统所能执行的任何脚本，比如说Bash、Python、Ruby或是Powershell等等。

## 方式3：使用[ShellJS](https://www.npmjs.com/package/shelljs)

ShellJS是个通过Node来运行Unix命令的npm包。这样就可以通过它在所有平台上运行Unix命令了，也包括Windows。

我在[React Slingshot](https://github.com/coryhouse/react-slingshot)上同时使用了方式1与2。

本文主要介绍了人们对于npm scripts存在的误解，以及npm scripts自身所提供的强大功能。借助于操作系统提供的各种基础设施、npm scripts以及各种命令，我们完全可以通过npm scripts以更加轻量级的方式实现Gulp与Grunt等任务运行器所提供的功能。

本系列的下一篇文章将会介绍npm scripts中存在的一些痛点以及应对之道。