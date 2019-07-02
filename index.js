#!/usr/bin/env node

const co = require('co');
const prompt = require('co-prompt');
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const program = require('commander');

const download = require('./download');

const frames = ['react'];
co(function *() {

    const projectName = yield prompt(chalk.green('please input project name：'));
    const frame = yield prompt(chalk.green('please input frame name：'));

    shell.mkdir(projectName);
    shell.cd(projectName);
    init(frame).then(() => {
        console.log(chalk.green('create project success !!!'));
        process.exit(1);
    })
});

async function init(frame) {
    const tmp = 'tmp';
    await downlaodTemplate(tmp)
    shell.exec(`cp -a ${tmp}/${frames.includes(frame) ? frame : frames[0]}/ ./`);
}

async function captured(promise) {

	try {
		const result = await promise;
		return [result, null];
	} catch (e) {
		return [null, e];
	}
}

async function downlaodTemplate(tmp) {
    const sppiner = ora(`${chalk.green('download tempalte ...')}`)
    sppiner.start();

    const [, err] = await captured(download(tmp));

    if (err) {
        sppiner.fail();
        process.exit(1);
    }
    sppiner.succeed();
}
