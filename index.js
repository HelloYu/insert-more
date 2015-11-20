	var fs = require('fs');
// var Console = require('console').Console;
	var opt = opt || {};
	opt.tag = '<!--more-->';
	opt.index = 300;
	//have problem here, do not have good way to solve this, right now.
	opt.point = '\\r\\n';
	

	var insert = function(fd,opt){

		if (!fd) {
		  throw new PluginError('insert-more-tag', 'Missing file option for insert-more-tag');
		}
		checkFiles(fd,insertTag);
	}
	var remove = function(fd,opt){
	  if (!fd) {
	    throw new PluginError('insert-more-tag', 'Missing file option for insert-more-tag');
	  }
	  checkFiles(fd,removeTag);
	}
	function removeTag(file){
		fs.readFile(file, function (err, data) {
		  if (err) throw err;
		  data = data.toString();
		  if( data.indexOf(opt.tag) == -1) return;
			data = data.Delete(opt.tag);
			saveFile(file,data);
		});	
	}
	function insertTag(file){
		console.info(file);
		fs.readFile(file, function (err, data) {
		  if (err) throw err;
		  data = data.toString();

		  if( data.length < opt.index || data.indexOf(opt.tag) != -1) return;
		  var index = data.indexOf(opt.point,opt.index) ;
		  //not a good idea
		  index = index != -1 ? index : opt.index ;
			data = data.Insert(index,opt.tag);
			saveFile(file,data);
		});	
	}
	function saveFile(file,data){
		fs.writeFile(file, data, function (err) {
  		if (err) throw err;
  		console.log('It\'s saved!');
		});
	}
	function checkFiles(fd,fun){
		
		fs.stat(fd,function(err,state) {
			if (err) throw err;
			if (state.isFile()) {
				fun(fd);
			}
			if (state.isDirectory()) {
				fs.readdir(fd,function(err,files){
					for( var i = 0 , file ; file = files[i] ; i++ ) {
						fun(fd+'/'+file);
					}
				});	 
			}
		});
	}
	String.prototype.Insert=function(index,str){
		return this.substring(0,index)+str+this.substr(index);
	}
	String.prototype.Delete=function(str){
		return this.replace(str,'');
	}
	module.exports = {insert:insert,remove:remove};