'use strict';

module.exports = {

  types: [
    {value: 'feat',     name: 'feat:    新功能'},
    {value: 'fix',      name: 'fix:     bug 修复'},
    {value: 'docs',     name: 'docs:    仅修改文档'},
    {value: 'style',    name: 'style:   修改格式（空格，格式化，省略分号等），对代码运行没有影响'},
    {value: 'refactor', name: 'refactor:重构（既不是修 bug ，也不是加功能）'},
    {value: 'build',    name: 'build:   构建流程、外部依赖变更，比如升级 npm 包、修改 webpack 配置等'},
    {value: 'perf',     name: 'perf:    性能优化'},
    {value: 'test',     name: 'test:    测试相关'},
    {value: 'chore',    name: 'chore:   对构建过程或辅助工具和库（如文档生成）的更改'},
    {value: 'ci',       name: 'ci:      ci 相关的更改'}
  ],

  scopes: [
    {name: 'accounts'},
    {name: 'admin'},
    {name: 'exampleScope'},
    {name: 'changeMe'}
  ],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  */
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    customScope: 'Denote the SCOPE of this change:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],

  subjectLimit: 100

};
