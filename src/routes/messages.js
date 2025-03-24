
import express from 'express';
import { fetchMessages } from '../controllers/message';
const router = express.Router();

router.get('/', fetchMessages);

