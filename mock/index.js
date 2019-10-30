import Mock from 'mockjs';

Mock.setup({ timeout: 800});

// 获取用户信息
let getWechatUser = require('./getWechatUser.json');
Mock.mock(/..\/getWechatUser/, 'get', getWechatUser);

// 查询系统技能
let getSystemSkill = require('./getSystemSkill.json');
Mock.mock(/..\/getSystemSkill/, 'get', getSystemSkill);

// 查询分析报告
let getStatics = require('./getStatics.json');
Mock.mock(/..\/getStatics/, 'get', getStatics);

// 查询用户技能
let getSkills = require('./getSkills.json');
Mock.mock(/..\/getSkills/, 'get', getSkills);

// 获取词典
let getDicts = require('./getDicts.json');
Mock.mock(/..\/getDicts/, 'get', getDicts);

// 获取机器人清单
let getBizList = require('./getBizList.json');
Mock.mock(/..\/getBizList/, 'get', getBizList);

// 删除技能
let deleteSkill = require('./deleteSkill.json');
Mock.mock(/..\/deleteSkill/, 'post', deleteSkill);

// 修改技能
let updateSkill = require('./updateSkill.json');
Mock.mock(/..\/updateSkill/, 'post', updateSkill);

// 新增技能
let addSkill = require('./addSkill.json');
Mock.mock(/..\/addSkill/, 'post', addSkill);


// 新增词典
let addDict = require('./addDict.json');
Mock.mock(/..\/addDict/, 'post', addDict);

// 修改词典
let updateDict = require('./updateDict.json');
Mock.mock(/..\/updateDict/, 'post', updateDict);

// 删除词典
let deleteDict = require('./deleteDict.json');
Mock.mock(/..\/deleteDict/, 'post', deleteDict);

// 切换系统技能
let switchSystemSkill = require('./switchSystemSkill.json');
Mock.mock(/..\/switchSystemSkill/, 'post', switchSystemSkill);


// 发布
let publish = require('./publish.json');
Mock.mock(/..\/publish/, 'post', publish);


// 新建机器人
let addBiz = require('./addBiz.json');
Mock.mock(/..\/addBiz/, 'post', addBiz);

// 发消息
let getKeFuDebugResult = require('./getKeFuDebugResult.json');
Mock.mock(/..\/getKeFuDebugResult/, 'get', getKeFuDebugResult);

// 获取JSON
let getJSON = require('./getJSON.json');
Mock.mock(/..\/getJSON/, 'get', getJSON);

// 保存机器人信息
let saveBatInfo = require('./saveBatInfo.json');
Mock.mock(/..\/saveBatInfo/, 'post', saveBatInfo);


// 删除机器人信息
let deleteBat = require('./deleteBat.json');
Mock.mock(/..\/deleteBat/, 'post', deleteBat);

// 查询日志
let queryLoggerList = require('./queryLoggerList.json');
Mock.mock(/..\/queryLoggerList/, 'get', queryLoggerList);

// 查询用户LIST
let queryUserList = require('./queryUserList.json');
Mock.mock(/..\/queryUserList/, 'get', queryUserList);
