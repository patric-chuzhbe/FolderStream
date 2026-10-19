# FolderStream

`FolderStream.lib.js` is a Node.js library for **streaming file names from a directory in ascending or descending alphabetical order, filtering them with regular expressions, and processing matching names through callbacks**.

The library is designed for situations where a directory contains a large number of files and loading all file names into memory at once is undesirable.

The current implementation is Windows-specific because it invokes cmd and the built-in dir command.

## Features

- **Streaming:** processes file names line by line instead of collecting the entire directory listing into an array.
- **Filtering:** supports one regular expression or an array of regular expressions.
- **Sorting:** supports ascending and descending alphabetical order.
- **Files only:** excludes directo``ries from the listing.
- **Callbacks:** provides callbacks for matching file names, completion, and errors.

## Installation

Place `FolderStream.lib.js` and its dependencies in your project.
``
## API

### `FolderStream.doStream(params)`

Starts enumerating files in the specified directory.

```js
FolderStream.doStream({
    dirPath: './',
    order: FolderStream.ORDER_DESC,
    filter: {
        regex: /\.tsv$/
    },
    onFileName: function(fileName) {
        console.log(fileName);
    },
    onEnd: function() {
        console.log('Enumeration completed');
    },
    onError: function(err) {
        console.error(err);
    }
});
```

The function starts an asynchronous operation and returns without waiting for enumeration to finish.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `dirPath` | `string` | Path to the directory to enumerate. |
| `order` | `string` | File-name ordering: `FolderStream.ORDER_DESC` or `FolderStream.ORDER_ASC`. |
| `filter.regex` | `RegExp` or `RegExp[]` | One regular expression or an array of regular expressions used to filter file names. |
| `onFileName` | `function(fileName)` | Called for each matching file name. Receives the name returned by `dir`, not the full path. |
| `onEnd` | `function()` | Called when the `readline` interface closes. |
| `onError` | `function(err)` | Called if the child process emits an error. |

### Ordering constants

```js
FolderStream.ORDER_DESC // 'desc'
FolderStream.ORDER_ASC  // 'asc'
```

- `ORDER_DESC` — descending alphabetical order.
- `ORDER_ASC` — ascending alphabetical order.

## Filtering

### Single regular expression

To process only `.tsv` files:

```js
filter: {
    regex: /\.tsv$/
}
```

To process files whose names start with `byThe_SignalDaemon` and end with `.tsv`:

```js
filter: {
    regex: /^byThe_SignalDaemon.*\.tsv$/
}
```

### Multiple regular expressions

An array of regular expressions is supported. A file name matches if **at least one** expression matches.

```js
filter: {
    regex: [
        /\.tsv$/,
        /\.csv$/,
        /\.json$/
    ]
}
```

**Note:** Avoid the `g` and `y` flags in filtering expressions unless their `lastIndex` state is managed explicitly. These flags can make repeated calls to `RegExp.prototype.test()` produce unexpected results.

## Examples

### Example 1: List all TSV files in descending order

```js
var FolderStream = require('./FolderStream.lib.js');

FolderStream.doStream({
    dirPath: 'K:\\home\\testData',
    order: FolderStream.ORDER_DESC,
    filter: {
        regex: /\.tsv$/
    },
    onFileName: function(fileName) {
        console.log(fileName);
    },
    onEnd: function() {
        console.log('Finished');
    },
    onError: function(err) {
        console.error('Enumeration error:', err);
    }
});
```

### Example 2: Process matching files

```js
var FolderStream = require('./FolderStream.lib.js');

FolderStream.doStream({
    dirPath: 'K:\\home\\testData',
    order: FolderStream.ORDER_ASC,
    filter: {
        regex: /^byThe_SignalDaemon.*\.tsv$/
    },
    onFileName: function(fileName) {
        var fullPath = require('path').join(
            'K:\\home\\testData',
            fileName
        );

        console.log('Processing: ' + fullPath);

        // Process the file here.
    },
    onEnd: function() {
        console.log('All matching files have been enumerated.');
    },
    onError: function(err) {
        console.error(err);
    }
});
```

### Example 3: Process multiple file types

```js
FolderStream.doStream({
    dirPath: './data',
    order: FolderStream.ORDER_DESC,
    filter: {
        regex: [
            /\.tsv$/,
            /\.csv$/
        ]
    },
    onFileName: function(fileName) {
        console.log('Matched: ' + fileName);
    },
    onEnd: function() {},
    onError: function(err) {
        console.error(err);
    }
});
```

## Streaming and memory usage

The library avoids allocating memory proportional to the total number of file names in JavaScript.

## Error handling and completion

- `onFileName` is called for each matching file name.
- `onEnd` is called when there are no files left on the target folder.
- `onError` handles errors.

## Platform limitations

The current implementation is **Windows-specific** because it invokes `cmd` and the built-in `dir` command.

The directory path must be valid for Windows.

The library filters file names, not file contents, and does not recursively enumerate subdirectories.

[//]: # (qwe)
The library has been tested on Windows 10 / 11 
