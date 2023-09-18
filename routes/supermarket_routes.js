/**
 * @swagger
 * components:
 *   schemas:
 *     Supermarket:
 *       type: object
 *       required:
 *         - image
 *         - brand
 *         - location
 *         - opening_hours
 *         - description
 *         - phone
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the supermarket
 *         brand:
 *           type: string
 *           description: The brand of the Dutch supermarket
 *         location:
 *           type: string
 *           description: Location of the supermarket
 *         opening_hours:
 *           type: string
 *           description: Opening and closing hours
 *         description:
 *           type: string
 *           description: A short description of the supermarket
 *         phone:
 *           type: string
 *           description: Primary number of the supermarket
 *         email:
 *           type: string
 *           description: Primary email address of the supermarket
 */
/**
 * @swagger
 * tags:
 *   name: Supermarket
 *   description: The Supermarket managing API
 * /supermarket:
 *   get:
 *     summary: Lists all the supermarkets
 *     tags: [Supermarket]
 *     responses:
 *       200:
 *         description: The list of the supermarkets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supermarket'
 *   post:
 *     summary: Create a new supermarket
 *     tags: [Supermarket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     responses:
 *       200:
 *         description: The created supermarket.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supermarket'
 *       500:
 *         description: Some server error
 * /supermarket/{id}:
 *   get:
 *     summary: Get the supermarket by id
 *     tags: [Supermarket]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The supermarket id
 *     responses:
 *       200:
 *         description: The supermarket response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supermarket'
 *       404:
 *         description: The supermarket was not found
 */

const db = require('../db/schemas/index')
const router = require('express').Router();

const Supermarket = db.superMarket

// make a request to create a new supermarket
router.post('/supermarket', (req, res) => {
    const { brand, location, image, opening_hours, description, phone, email } = req.body;
    const new_supermarket = {
        image, 
        brand,
        location,
        opening_hours,
        description,
        phone,
        email
    }
    Supermarket.create(new_supermarket).then((supermarket) => {
        res.send(supermarket)
    }).catch((err) => {
        res.send(err);
    });
});

// get all supermarkets in the area (define area later)
router.get('/supermarket', (req, res) => {
    Supermarket.findAll()
    .then((supermarkets) => {
        res.json(supermarkets)
    })
    .catch((err) => {
        console.log(err);
    });
});


// get a specific supermarket by id
router.get('/supermarket/:id', (req, res) => {
    const { id } = req.params;
    Supermarket.findByPk(id)
    .then((supermarket) => {
        res.json(supermarket);
    })
    .catch((err) => {
        console.log(err);
    });
});


module.exports = router;