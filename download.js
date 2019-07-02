

const download = require('download-git-repo')
const shell = require('shelljs');
const fs = require('fs-extra');

module.exports = function(target) {

    return new Promise((resolve, reject) => {
        download('direct:https://github.com/wwELi/template.git#master', target, { clone: true }, function(err) {
            if (err) {
                throw new Error(err);
            }
            err ? reject() : resolve();
        })
    })
}