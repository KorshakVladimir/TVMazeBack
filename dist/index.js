"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    debugger;
    const query = req.query.q;
    if (!query) {
        res.status(400).json({ error: 'Query parameter q is required' });
        return;
    }
    try {
        const response = yield axios_1.default.get(`http://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        const shows = response.data.map((item) => item.show);
        res.json(shows);
    }
    catch (error) {
        console.error('Error fetching data from TVMaze API:', error);
        res.status(500).json({ error: 'Failed to fetch from TVMaze API' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
