const express = require("express");
const {
  addProcurementController,
  getProcurementController,
} = require("../controllers/procurement");
const route = express.Router();
const { authMiddleware, isManagerMiddleware } = require("../middlewares/auth");

/**
 * @swagger
 * /addProcurement:
 *   post:
 *     summary: Add Procurement
 *     description: Add Procurement
 *     tags:
 *       - Procurement
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Procurement object
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Procurement'
 *     responses:
 *       200:
 *         description: Procurement added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Procurement'
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
route.post("/addProcurement", addProcurementController);

/**
 * @swagger
 * /getProcurement:
 *   get:
 *     summary: Get Procurement
 *     description: Get Procurement
 *     tags:
 *       - Procurement
 *     responses:
 *       200:
 *         description: Procurement retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Procurement'
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
route.get("/getProcurement", getProcurementController);

module.exports = { route };
