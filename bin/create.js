#!/usr/bin/env node
const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称'
    },
    {
        type: 'input',
        name: 'author',
        message: '请输入作者'
    }
]).then((answers) => {
    // console.log(answers.name)
    // console.log(answers.author)
    program.version('1.0.0', '-v, --version')
        .action(() => {
            const spinner = ora('正在下载模板...')
            let date = new Date()
            let default_file = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
            spinner.start()
            download('direct:https://github.com/HUGY1/vmei-act-template.git', answers.name ? answers.name : default_file, { clone: true }, (err) => {
                if (err) {
                    spinner.fail()
                    console.log(symbols.error, chalk.red('下载模板失败'))
                } else {
                    spinner.succeed()
                    console.log(symbols.success, chalk.green('项目初始化成功'))
                }
            })
        })
    program.parse(process.argv)
})



