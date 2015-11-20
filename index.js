var fs = require('fs');
// var Console = require('console').Console;

module.exports = function(fd,opt){
	opt = opt || {};
	opt.tag = '<!--more-->';
	opt.index = 80;
	if (!fd) {
    throw new PluginError('insert-more-tag', 'Missing file option for insert-more-tag');
  }
  fs.stat(fd,function(err,state) {
  	if (err) throw err;
  	if (state.isFile()) {
  		insertTag(fd);
  	}
  	if (state.isDirectory()) {
  		fs.readdir(fd,function(err,files){
  			for( var i = 0 , file ; file = files[i] ; i++ ) {
  				insertTag(fd+'/'+file);
  			}
  		});	 
  	}
  });
  
	function insertTag(file){
		fs.readFile(file, function (err, data) {
		  if (err) throw err;
		  data = data.toString();
		  if( data.indexOf(opt.tag) != -1) return;
			data = data.Insert(opt.index,opt.tag);
			saveFile(file,data);
		});	
	}
	function saveFile(file,data){
		fs.writeFile(file, data, function (err) {
  		if (err) throw err;
  		console.log('It\'s saved!');
		});
	}
	String.prototype.Insert=function(index,str){
		return this.substring(0,index)+str+this.substr(index);
	}
}
