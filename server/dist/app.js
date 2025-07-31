"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const analytics_1 = require("./models/analytics");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/analytics', analytics_routes_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const db = mongoose_1.default.connection;
// Socket.IO connection
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
db.once('open', () => {
    console.log('MongoDB IO Stream connected');
    // Setup change stream
    const changeStream = analytics_1.AnalyticsBase.watch();
    changeStream.on('change', (change) => {
        console.log('Change detected:', change);
        // Emit the change to all connected clients
        io.emit('mongoChange', change.fullDocument);
    });
});
exports.default = server;
