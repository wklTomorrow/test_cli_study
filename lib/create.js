const path = require('path')
const fsextra = require('fs-extra')
const fs = require('fs')
const Inquirer = require('inquirer')
async function create (projectName, options) {
  console.log(projectName, options)
  const cwd = process.cwd(); // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, projectName); // 目标目录
  console.log(targetDir)
  if (fsextra.existsSync(targetDir)) {
    if (options.force) {// 如果强制创建 ，删除已有的
      await fsextra.remove(targetDir);
      console.log('删除成功')
      createDir(projectName)
    } else {
      let { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {name:'Overwrite',value:'overwrite'},
            {name:'Cancel',value:false}
          ]
        }
      ])
      if (!action) {
        console.log('取消操作')
        return
      } else if (action === 'overwrite') {
        console.log(`\r\nRemoving....`);
        await fsextra.remove(targetDir)
        console.log('删除成功')
        createDir(projectName)
      }
    }
  } else {
    createDir(projectName)
  }
}
function createDir (projectName) {
  fs.mkdir(`./${projectName}`, function (err) {
    if (err) {
      console.log('创建失败')
    } else {
      console.log('创建成功')
    }
  })
}

module.exports = (...args) => {
  return create(...args)
}
// const path = require('path')
// // const fs = require('fs-extra')
// async function create (projectName, options) {
//   console.log(projectName, options)
//   const cwd = process.cwd(); // 获取当前命令执行时的工作目录
//   const targetDir = path.join(cwd,projectName); // 目标目录
//   console.log(targetDir)
// }

// module.exports = (...args) => {
//   return create(...args)
// }