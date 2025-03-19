
import express from 'express';
import { fetchMessages } from '../controllers/messages';
const router = express.Router();

router.get('/', fetchMessages);

