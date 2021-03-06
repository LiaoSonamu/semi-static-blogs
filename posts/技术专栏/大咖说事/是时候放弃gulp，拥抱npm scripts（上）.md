<!--id: f04cd9f6f861640fee2b279d42215bd9-->
<!--date: 2017-07-07 09:00-->
<!--tags: gulp,grunt,自动化-->
<!--nature: reprint-->
<!--link: http://www.infoq.com/cn/news/2016/02/gulp-grunt-npm-scripts-part1/-->
<!--keywords: npm,gulp,fis3,自动化,npm scripts-->

Cory House是“[Building Applications with React and Flux](https://www.pluralsight.com/courses/react-flux-building-applications)”与“[Clean Code: Writing Code for Humans](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiK1pXx89nJAhUujoMKHeuWAEUQFggcMAA&url=https%3A%2F%2Fwww.pluralsight.com%2Fcourses%2Fwriting-clean-code-humans&usg=AFQjCNEBfkBoN-IgCn_1jFUqWDAUIxcmAw&sig2=Ub9Wup4k4mrw_ffPgYu3tA)”的作者，同时也是Pluralsight上众多课程的讲师。他是VinSolutions的软件架构师，[在全球培训了为数众多的软件开发者](http://www.bitnative.com/training/)，主要领域是前端开发与整洁代码等软件开发实践。Cory是微软MVP、Telerik开发者专家，同时也是[outlierdeveloper.com](http://www.outlierdeveloper.com/)的创始人。目前，围绕着Gulp、Grunt及npm scripts社区展开了很多争论，讨论Gulp与Grunt在项目中是否还有继续使用的必要。有人坚持认为Gulp与Grunt等前端构建工具依然是不可或缺的，还有些人则认为Gulp与Grunt是完全没必要使用的，而且还增加了一层抽象，会导致很多问题。近日，Cory[撰文](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.a0ulmy8bk)谈到了他对于Gulp、Grunt与npm scripts的认识，并且认为在现在的工程中，我们完全可以抛弃Gulp与Grunt，使用npm scripts就可以满足项目之所需。

<!--more-->


众所周知，Gulp与Grunt是很多项目所使用的构建工具，他们也拥有非常丰富的插件。不过，我却认为Gulp与Grunt是完全不必要的抽象，npm scripts更加强大，并且更易于使用。

我本人是Gulp的粉丝。不过在上一个项目中，gulpfile竟然有100多行，而且还使用了不少Gulp插件。我尝试通过Gulp集成Webpack、Browsersync、热加载、Mocha等工具，为什么要这么做呢？这是因为有些插件的文档实在是太不充分了；还有些插件只公开了我所需的部分API。其中有个插件存在一个奇怪的Bug，它只能看到文件的部分内容。另一个插件则在输出到命令行时丢失了颜色。

当然了，这些问题都是可以解决的；不过，当我直接使用这些工具时，所有问题都不复存在了。最近，我注意到有很多开源项目只是使用了npm scripts。因此，我决定重新审视一下自己的做法。我真的需要Gulp么？答案就是：完全不需要。我决定在我新的开源项目中只使用npm scripts。我只使用npm scripts为一个React应用搭建了开发环境与构建流程。想知道这个项目是什么样子的么？看一下[React Slingshot](https://github.com/coryhouse/react-slingshot)吧。现在，相对于Gulp来说，我更倾向于使用npm scripts，下面就来谈谈原因。

## Gulp与Grunt怎么了？

随着时间的流逝，我发现诸如Gulp与Grunt等任务运行器都存在以下3个核心问题：

- 对插件作者的依赖
- 令人沮丧的调试
- 脱节的文档

下面就来详细分析上述3个问题。

## 问题1：对插件作者的依赖

在使用比较新或是不那么流行的技术时，可能根本就没有插件。当有插件可用时，插件可能已经过时了。比如说，Babel 6前一阵发布了。其API变化非常大，这样很多Gulp插件都无法兼容于最新的版本。在使用Gulp时，我就感到深深的受伤，因为我所需要的Gulp插件还没有更新。在使用Gulp或是Grunt时，你不得不等待插件维护者提供更新，或是自己修复。这会阻碍你使用最新版现代化工具的机会。与之相反，在使用npm scripts时，我会直接使用工具，不必再添加一个额外的抽象层。这意味着当新版本的Mocha、Istanbul、Babel、Webpack、Browserify等发布时，我可以立刻就使用上新的版本。对于选择来说，没有什么能够打败npm：

![](/images/npm-gulp-grunt.png)

从上图可以看到，Gulp有将近2,100个插件；Grunt有将近5,400个；而npm则提供了227,000多个包，同时还以每天400多个的速度在持续增加。

在使用npm scripts时，你无需再搜索Grunt或是Gulp插件；只需从227,000多个npm包中选择就行了。公平地说，如果所需要的Grunt或是Gulp插件不存在，你当然可以直接使用npm packages。不过，这样就无法再针对这个特定的任务使用Gulp或是Grunt了。

## 问题2：令人沮丧的调试

如果集成失败了，那么在Grunt和Gulp中调试是一件令人沮丧的事情。因为你面对的是一个额外的抽象层，对于任何Bug来说都有可能存在更多潜在的原因：

- 基础工具出问题了么？
- Grunt/Gulp插件出问题了么？
- 配置出问题了么？
- 使用的版本是不是不兼容？

使用npm scripts可以消除上面的第2点，我发现第3点也很少会出现，因为我通常都是直接调用工具的命令行接口。最后，第4点也很少出现，因为我通过直接使用npm而不是任务运行器的抽象减少了项目中包的数量。

## 问题3：脱节的文档

一般来说，我所需要的核心工具的文档质量总是要比与之相关的Grunt和Gulp插件的好。比如说，如果使用了[gulp-eslint](https://github.com/adametry/gulp-eslint)，那么我就要在gulp-eslint文档与ESLint网站之间来回切换；不得不在插件与插件所抽象的工具之间来回切换上下文。Gulp与Grunt的问题在于：光理解所用的工具是远远不够的。Gulp与Grunt要求你还得理解插件的抽象。

大多数构建相关的工具都提供了清晰、强大，且具有高质量文档的命令行接口。[ESLint的CLI文档](http://eslint.org/docs/user-guide/command-line-interface)就是个很好的例子。我发现在npm scripts中阅读并实现一个简短的命令行调用会更加轻松，阻碍更少，也更易于调试（因为并没有抽象层存在）。既然已经知道了痛点，接下来的问题就在于，为何我们觉得自己还需要诸如Gulp与Grunt之类的任务运行器呢？

我相信个中原因应该是因人而异的。毫无疑问，Gulp与Grunt等任务运行器已经出现很长一段时间了，而且围绕着这些任务运行器的插件生态圈也呈现出欣欣向荣的繁荣景象。依赖于这些插件，很多日常工作都可以实现自动化，并且运行良好。这样，人们就会认为只有通过这些任务运行器才能实现任务的构建、文件的打包、工作流的良好运行等等。另外一个原因就是人们对于npm scripts的认识还远远不够；对于npm scripts所能完成的事情与任务也流于表面。这也进一步造成了很多人并没有发现npm scripts可以实现很多日常开发时的构建任务的结果。我相信随着开发者对于npm scripts认识的进一步深入，大家会逐步发现原来使用npm scripts也可以完成Gulp与Grunt等任务运行器所能完成的任务，而且配置更加简单，也更加直接，因为它会直接使用目标工具而不必再使用对目标工具的包装器了。

在本系列的下一篇文章中，我们就来看看npm scripts为人所忽视的原因，以及使用npm scripts能够完成哪些事情。