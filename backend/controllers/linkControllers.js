const Link = require('../models/Link');
const { randomCode } = require('../utils/generateCode');
const { URL } = require('url');
const validator = require('validator');

function isValidUrl(str) {
  // Use validator to allow http/https and other common checks
  return validator.isURL(str, { require_protocol: true, allow_underscores: true });
}

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

async function createLink(req, res) {
  try {
    const { target, code } = req.body;
    if (!target) return res.status(400).json({ error: 'target (full URL) is required' });
    if (!isValidUrl(target)) return res.status(400).json({ error: 'Invalid URL. Include protocol (http/https).' });

    let finalCode = code;
    if (finalCode) {
      if (!CODE_REGEX.test(finalCode)) {
        return res.status(400).json({ error: 'Custom code must match [A-Za-z0-9]{6,8}' });
      }
      const exists = await Link.findOne({ code: finalCode });
      if (exists) return res.status(409).json({ error: 'Code already exists' });
    } else {
      // generate unique code
      let attempts = 0;
      do {
        finalCode = randomCode(7);
        const found = await Link.findOne({ code: finalCode });
        if (!found) break;
        attempts++;
      } while (attempts < 5);
      // If collision after attempts, expand length and try again:
      if (!finalCode) finalCode = randomCode(8);
    }

    const link = new Link({ code: finalCode, target });
    await link.save();
    return res.status(201).json({ code: link.code, target: link.target, createdAt: link.createdAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function listLinks(req, res) {
  try {
    const { q, sort = 'createdAt', order = 'desc' } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { code: { $regex: q, $options: 'i' } },
        { target: { $regex: q, $options: 'i' } },
      ];
    }
    const sortOrder = order === 'asc' ? 1 : -1;
    const links = await Link.find(filter).sort({ [sort]: sortOrder }).lean();
    return res.json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function getLinkStats(req, res) {
  try {
    const code = req.params.code;
    const link = await Link.findOne({ code }).lean();
    if (!link) return res.status(404).json({ error: 'Not found' });
    return res.json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

async function deleteLink(req, res) {
  try {
    const code = req.params.code;
    const deleted = await Link.findOneAndDelete({ code });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

// Redirect handler (not part of /api)
async function redirectByCode(req, res) {
  try {
    const code = req.params.code;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).send('Not found');

    // increment clicks and lastClicked
    link.clicks += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.target);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
}

module.exports = {
  createLink,
  listLinks,
  getLinkStats,
  deleteLink,
  redirectByCode
};
