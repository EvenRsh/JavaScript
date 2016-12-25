var fs = require('fs');
var util = require('util');
var path = require('path');
var realpath = './media';
var fileList = [];

function explorer(realpath, folder) {
    var args = arguments;
    fs.readdir(realpath, function(error, files) {
        if (error) {
            console.log('error:\n' + error);
            return;
        }
        files.forEach(function(file,idx) {
            fs.stat(realpath + '/' + file, function(err, stat) {
                if (stat.isDirectory()) {
                    args.callee(realpath + '/' + file, file);
                } else {
                    var extname = path.extname(file).toLowerCase();
                    var audiofiles = '.mp3,.wav,.ogg';
                    if(audiofiles.indexOf(extname) == -1){
                        return;
                    }
                    var fileObj = {}
                    var fileName = file.replace(/\.\w+$/, '');
                    var arr = fileName.split('-');
                    // fileObj.src = folder ? folder + '/' + file : file;
                    fileObj.src = 'media/' + file;
                    
                    if(arr[1]){
                        fileObj.singer = arr[0].replace(/^\s*|\s*$/,'');
                        fileObj.name = arr[1].replace(/^\s*|\s*$/,'');
                    }else{
                        fileObj.singer = '';
                        fileObj.name = arr[0].replace(/^\s*|\s*$/,'');
                    }
                    fileObj.album = 'media/' + fileName + '.jpg';
                    fileList.push(fileObj);

                    // 生成列表成功后写入文件
                    if(idx == files.length-1){
                        fs.writeFile('./playlist.json', JSON.stringify(fileList,null,4),function(){
                            console.log('======播放列表文件playlist.json创建成功');
                            console.log(fileList);
                        });
                    }
                }
            });
        });


    });
}
explorer(realpath);
