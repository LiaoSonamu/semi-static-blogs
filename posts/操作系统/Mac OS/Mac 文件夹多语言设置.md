<!--id: da553dabe1be7917e033ba42ee158bc3-->
<!--date: 2017-07-06 10:19-->
<!--tags: Mac-->
<!--nature: original-->
<!--keywords: Mac,文件夹,多语言,设置,Terminal,命令,中英文-->

当我们使用Mac中文语言的时候，使用终端`Terminal`看到的文件夹列表和直接在Finder里面看到的不一样。经常我们使用一个中文的文件夹在终端cd选择的时候切换输入法会感觉比较恶心。

但是系统默认的几个文件夹 桌面，下载… 在终端看到的会是英文的 Desktop, Dowload…等，这里就来说明怎么实现这种多语言的文件夹命名。

```bash
$ cd /System/Library/CoreServices/SystemFolderLocalizations/zh_CN.lproj 
$ sudo chmod -R 777 *
$ open . # 在文件夹中打开，以便之后操作
```

<!--more-->

**【注】**：如果加了sudo命令还是无法给权限请开启`Rootless`功能，开启方法：

1. 重启电脑并按住 cmd + R 键。进入恢复模式。
2. 顶部的菜单 栏Utilities > Terminal 打开终端。
3. 键入命令 csrutil disable 重启即可。

**开启之后再做之前操作**。*（如果能成功设置权限，跳过该步骤）*

打开`SystemFolderLocalizations.strings`文件。看内容是否乱码，如果是乱码则为二进制文件，需要下面2步转换，如果不是乱码可以跳过下面两步。

转化二进制文件为JSON或者XML文件(二选一)：

```bash
$ plutil -convert json SystemFolderLocalizations.strings # 转化为JSON文件
$ plutil -convert xml1 SystemFolderLocalizations.strings # 转化为XML文件
```

然后修改添加自己的英/中文(key-value键值对)。例如我们新建一个`Projects`但是要显示中文的“项目”文件夹。

JSON

```json
{
  "Desktop": "桌面", 
  ..., 
  // 添加如下键值对
  "Projects": "项目"
}
```

XML

```xml
...
<key>Desktop</key>
<string>桌面</string>
...
<!--添加如下键值对-->
<key>Projects</key>
<string>项目</string>
```

当然，修改完成之后如果**原文件是二进制，需要转化回去**。

```bash
$ plutil -convert binary1 SystemFolderLocalizations.strings
```

最后，去我们的文件夹下面如例子中的`Projects`新建`.localized`文件：

```bash
$ cd ......./Projects # cd 到目录Projects下
$ touch .localized # 新建一个.localized空文件 默认会隐藏
$ pkill Finder # 重启Finder 就可以看到效果了
```