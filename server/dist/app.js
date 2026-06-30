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
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const aboutDeveloper_routes_1 = __importDefault(require("./routes/aboutDeveloper.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const analytics_1 = require("./models/analytics");
const aboutDeveloper_1 = require("./models/aboutDeveloper");
const aboutDeveloperData_1 = require("./seed/aboutDeveloperData");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use('/api/analytics', analytics_routes_1.default);
app.use('/api/about-developer', aboutDeveloper_routes_1.default);
if (process.env.NODE_ENV === 'production') {
    const clientBuild = path_1.default.join(__dirname, '..', 'client', 'build', 'client');
    app.use(express_1.default.static(clientBuild));
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(clientBuild, 'index.html'));
    });
}
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: '*' },
});
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
const db = mongoose_1.default.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
db.once('open', async () => {
    console.log('MongoDB IO Stream connected');
    // Auto-seed developer profile if it doesn't exist
    try {
        const existing = await aboutDeveloper_1.AboutDeveloperBase.findOne({ slug: 'main' });
        if (!existing) {
            await aboutDeveloper_1.AboutDeveloperBase.create(aboutDeveloperData_1.aboutDeveloperSeedData);
            console.log('Developer profile seeded successfully');
        }
        else {
            console.log('Developer profile already exists');
        }
    }
    catch (err) {
        console.error('Error seeding developer profile:', err);
    }
    // Real-time change stream for analytics
    const changeStream = analytics_1.AnalyticsBase.watch();
    changeStream.on('change', (change) => {
        console.log('Change detected:', change);
        io.emit('mongoChange', change.fullDocument);
    });
});
exports.default = server;
