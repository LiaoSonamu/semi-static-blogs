<!--id: 9f7152e933d51b3857fe8200107579c2-->
<!--date: 2017-07-07 09:20-->
<!--tags: gulp,grunt,自动化-->
<!--nature: reprint-->
<!--link: http://www.infoq.com/cn/news/2016/02/gulp-grunt-npm-scripts-part3/-->
<!--keywords: npm,gulp,fis3,自动化,npm scripts-->

Cory House是“[Building Applications with React and Flux](https://www.pluralsight.com/courses/react-flux-building-applications)”与“[Clean Code: Writing Code for Humans](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiK1pXx89nJAhUujoMKHeuWAEUQFggcMAA&url=https%3A%2F%2Fwww.pluralsight.com%2Fcourses%2Fwriting-clean-code-humans&usg=AFQjCNEBfkBoN-IgCn_1jFUqWDAUIxcmAw&sig2=Ub9Wup4k4mrw_ffPgYu3tA)”的作者，同时也是Pluralsight上众多课程的讲师。他是VinSolutions的软件架构师，[在全球培训了为数众多的软件开发者](http://www.bitnative.com/training/)，主要领域是前端开发与整洁代码等软件开发实践。Cory是微软MVP、Telerik开发者专家，同时也是[outlierdeveloper.com](http://www.outlierdeveloper.com/)的创始人。目前，围绕着Gulp、Grunt及npm scripts社区展开了很多争论，讨论Gulp与Grunt在项目中是否还有继续使用的必要。有人坚持认为Gulp与Grunt等前端构建工具依然是不可或缺的，还有些人则认为Gulp与Grunt是完全没必要使用的，而且还增加了一层抽象，会导致很多问题。近日，Cory[撰文](https://medium.freecodecamp.com/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.a0ulmy8bk)谈到了他对于Gulp、Grunt与npm scripts的认识，并且认为在现在的工程中，我们完全可以抛弃Gulp与Grunt，使用npm scripts就可以满足项目之所需。

<!--more-->

在本系列的上一篇文章中，我们谈到了npm scripts的强大功能以及人们为何会忽略npm scripts。本篇文章将会介绍npm scripts中存在的一些痛点以及解决之道。

## 痛点

显然，使用npm scripts也存在着一些问题：JSON规范并不支持注释，因此无法在package.json中添加注释。不过有一些办法可以突破这个限制：

- 编写小巧、命名良好、单一目的的脚本
- 分离文档与脚本（比如说放在README.md中）
- 调用单独的.js文件

我更偏爱第一种解决方案。如果将每个脚本都进行分解，使其保持单一职责，那么注释就变得不那么重要了。脚本的名字应该能完全描述其意图，就像任何短小、命名良好的函数一样。就像我在“[Clean Code: Writing Code for Humans](https://www.pluralsight.com/courses/writing-clean-code-humans)”中所说的那样，短小、单一职责的函数几乎是不需要注释的。如果觉得有必要添加注释，那么我会使用第3种方案，即将脚本移到单独的文件中。这样就可以利用JavaScript组合的强大力量了。

Package.json也不支持变量。这看起来貌似是个大问题，但实际上并非如此，原因有二。首先，很多时候我们所需的变量都涉及到环境，这可以通过命令行进行设置。其次，如果出于其他原因而需要变量，那么你可以调用单独的.js文件。感兴趣的读者可以看看React-starter-kit，了解这种做法。

最后，还存在一种风险，那就是使用长长的、复杂的命令行参数，这些参数令人难以理解。代码审查与重构是确保npm脚本保持小巧、命名良好、单一职责，且每个人都能容易理解的好方式。如果脚本复杂到需要注释，那么你应该将单个脚本重构为多个命名良好的脚本，或是将其抽取为单独的文件。

## 我们需要证明抽象是有意义的

Gulp与Grunt是对我所使用的工具的抽象。抽象是很有用的，不过抽象是有代价的。它让我们过分依赖于插件维护者与文档，同时随着插件数量的不断攀升，他们也不断引入复杂性。我已经决定不再使用诸如Gulp与Grunt之类的任务运行器了。

实际上除了我之外，现在已经有不少开发者与我的观点不谋而合，比如说下面这些：

- [Task automation with npm run](http://substack.net/task_automation_with_npm_run)—James Holliday
- [Advanced front-end automation with npm scripts](https://www.youtube.com/watch?v=0RYETb9YVrk)—Kate Hudson
- [How to use npm as a build tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)—Kieth Cirkel
- [Introduction to npm as a Build Tool](http://app.pluralsight.com/courses/npm-build-tool-introduction)—Marcus Hammarberg
- [Gulp is awesome, but do we really need it?](http://gon.to/2015/02/26/gulp-is-awesome-but-do-we-really-need-it/)—?Gonto
- [NPM Scripts for Build Tooling](http://code.tutsplus.com/courses/npm-scripts-for-build-tooling)—Andrew Burgess

Cory的文章一经发出立刻得到了众多开发者的广泛回应，人们纷纷表达了自己的观点，这里摘录出其中一些典型观点以飨各位读者：

Jason Trill说到：

> 另一个好处就是对基于Node的项目的标准化。如果仅仅通过“npm run”即可运行任务就非常棒了，虽然这些任务只不过是Gulp/Grunt的包装器而已。

Dwayne Crooks说到：

> 太棒了。我最近一直在思考是否需要在我的工作流中使用Gulp，并且在项目中使用得越来越少。这篇文章让我相信Gulp与其他构建工具是完全没必要的，非常感谢。

Vladimir Agafonkin说到：

> 我们在Mapbox上有大量的JavaScript仓库，他们都使用了npm scripts，完全没有用上Gulp与Grunt。这么做完全没有任何问题，搭建容易，理解与管理起来也易如反掌。

Martin Olsen说到：

> 我在一年前读过了这篇文章http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/之后就开始使用npm scripts而逐渐放弃Gulp了。我喜欢npm scripts的简洁性。恕我直言，其唯一的痛点就是无法在脚本中添加注释，并且必须要对双引号进行转义。

Tim Wisniewski说到：

> 我也是这么做的，文章的观点与我不谋而合。

Akshay Bist说到：

> 不仅仅是node包，你可以运行操作系统所能执行的任何脚本。因此，还可以运行python、bash脚本等等。

Cecil McGregor说到：

> 非常感谢。虽然在工作时我不得不使用Grunt，不过在家的时候我大部分时间都在使用npm scripts。很多插件都存在一些问题，浪费了我大量的时间探究问题所在。

Jess Hines说到：

> 非常感谢。通常，我们都认为抽象会使得事情变得更加简单，不过我发现npm scripts已经足够友好了，并且非常强大。如果需要的话，我会尝试一下文中的做法，加深理解。

adam seldan说到：

> 完全同意文中的观点。我最近就一直在使用npm package.json脚本，特别是那些大量使用Node.js的项目，完全不需要复杂的转换链。如果感觉不太灵便（现在还没有出现，通常情况下，你会提前知道所工作的项目规模，以及其构建步骤），那么引入和学习Webpack是一种很好的方式，它在某种程度上要胜于Grunt与Gulp。

Dylan J Harris说到：

> 感谢。作为一名任务运行器新手，我已经遇到了文中提到的3个问题，因此非常厌恶这种抽象。我打算在接下来的项目中直接使用npm scripts，非常棒的文章。

Jason Karns说到：

> 直接使用npm scripts会让我们拥有更多的配置选项；npm会以环境变量的方式公开package.json对象，前缀是npm_package；npm拥有定义良好的配置查找方式，因此可以在不同地方定义各种选项，在必要的时候这些选项会被覆盖。

你在项目中使用过Gulp、Grunt等任务运行器么？是否直接使用过npm scripts？你认为二者之间的差别是什么？npm scripts是否能够完全取代Gulp与Grunt呢？当然，Gulp与Grunt由来已久，并且在很多大型项目中都得到了应用；不过，其对插件的依赖一直都为人所诟病，但插件本身也是其一大优势。那么如果要新开发一个项目，你会使用Gulp与Grunt等任务运行器还是会直接使用npm scripts呢？