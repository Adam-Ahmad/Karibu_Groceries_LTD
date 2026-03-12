const express = require("express");
const {
  getCashTotalsController,
  getCreditTotalsController,
  getTotalsController,
} = require("../controllers/reports");
const route = express.Router();

/**
 * @swagger
 * /totals:
 *   get:
 *     summary: Get sales totals for all branches
 *     description: Get sales totals for all branches
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: Sales totals for all branches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalesTotals'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
route.get("/getCashTotals", getCashTotalsController);
route.get("/getCreditTotals", getCreditTotalsController);
route.get("/getTotals", getTotalsController);

module.exports = { route };
