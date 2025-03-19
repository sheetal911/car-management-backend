const express = require('express');
const router = express.Router();

// Sample data (replace this with database logic later)
const products = [
  { id: 1, title: 'Car 1', description: 'Car Description', tags: ['sedan', 'toyota'] },
  { id: 2, title: 'Car 2', description: 'Another car description', tags: ['SUV', 'ford'] },
];

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all products (cars)
 *     responses:
 *       200:
 *         description: A list of products (cars)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', (req, res) => {
  res.json(products); // Send the products as JSON (you can replace this with DB logic)
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     description: Get a specific product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The product with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Product not found
 */
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
