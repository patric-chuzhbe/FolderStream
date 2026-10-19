//ver alt0_1WAlt0test0W

const childProcess=require('child_process');

const readline=require('readline');

const array=require('./array.lib.js');
const ARR_merge=array.ARR_merge;

const myUtil=require('./myUtil.lib.js');

exports.ORDER_DESC='desc';

exports.ORDER_ASC='asc';

function isFilter(
	params/*={
		filter: {regex: getTSVFilesNamesFilterRegex()},
		line: line
	}*/
)/*ver alt0_0WAlt0test0W .*/
{
	if(myUtil.isArray(params.filter.regex))
	{
		return params.filter.regex.some((regex)=>regex.test(params.line));
	}
	return params.filter.regex.test(params.line);
}

exports.doStream=function(
	params/*={
		dirPath: './',
		order: FolderStream.ORDER_DESC,
		filter: {regex: getTSVFilesNamesFilterRegex()},
		onFileName: function _onFileName(fileName){/ * ... * /},
		onEnd: function(){/ * ... * /},
		onError: function(err){/ * ... * /}
	}*/
)/*ver alt0_1WAlt0test0W .*/
{
	// Example for Linux/Mac: ls -1r (reverse order)
	const proc = childProcess.spawn(
		'cmd', 
		[
			'/c', 
			'dir', 
			'/b', // "bare" output — file names only
			params.order == exports.ORDER_DESC ? 
				'/o-n' // order by name descending
			: // exports.ORDER_ASC
				'/on',  // order by name ascending
			'/a-d', // list files only (no directories)
			params.dirPath
		]
	);
	
	const rl = readline.createInterface({input: proc.stdout});
	
	rl.on(
		'line', 
		(line)=>{
			if(isFilter(ARR_merge(params, {line: line})))
			{
				params.onFileName(line);
			}
		}
	);
	
	rl.on('close', params.onEnd);
	
	proc.on('error', params.onError);
};



















