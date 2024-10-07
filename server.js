var liveServer = require("live-server");
     
var params = {
    port: 8000, // Set the server port. Defaults to 8080. 
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP. 
    root: "./app", // Set root directory that's being served. Defaults to cwd. 
    open: false, // When false, it won't load your browser by default. 
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec. 
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots 
    // base: "/flow", // Prefix for the URLs. Defaults to /.
    middleware: [function(req, res, next) {
        if (req.url.startsWith('/flow')) {
            // 修改 URL，以匹配前端应用的 publicPath 或 base
            req.url = '/' + req.url.slice(5);
        }
        next();
    }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack 
};
liveServer.start(params);

// 前端的基础路由是/flow, 引入资源的路径也是/flow开头, 如何配置liveServer
// 1. 配置liveServer的middleware, 把/flow替换成空字符串
