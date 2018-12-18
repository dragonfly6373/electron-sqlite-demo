
const {app, protocol, shell, BrowserWindow} = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const sqlite3 = require("sqlite3").verbose();
const less = require("less");
