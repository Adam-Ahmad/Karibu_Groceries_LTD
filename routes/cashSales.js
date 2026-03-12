const express = require("express");
const {
  addCashSalesController,
  getCashSalesController,
} = require("../controllers/cashSales");
const route = express.Router();
const {
  authMiddleware,
  isSalesAgentMiddleware,
  isManagerMiddleware,
} = require("../middlewares/auth");

/**
 * @swagger
 * /addCashSales:
 *   post:
 *     summary: Add Cash Sales
 *     description: Add Cash Sales
 *     tags:
 *       - Cash Sales
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Cash Sales object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/CashSales'
 *     responses:
 *       200:
 *         description: Cash Sales added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashSales'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

route.post("/addCashSales", addCashSalesController);

/**
 * @swagger
 * /getCashSales:
 *   get:
 *     summary: Get Cash Sales
 *     description: Get Cash Sales
 *     tags:
 *       - Cash Sales
 *     responses:
 *       200:
 *         description: Cash Sales retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CashSales'
 */
route.get("/getCashSales", getCashSalesController);

module.exports = { route };
