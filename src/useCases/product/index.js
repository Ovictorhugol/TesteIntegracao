const express = require('express');
const Product = require('./product.schema');

const router = express.Router();

router.get('/', async (req, res) => {
    
    const { id } = req.body
    try {
        if(id!=null) {
            console.log("k")
        const product = await Product.findOne({where: {_id: req.params.id}})}
        return res.status(200).send({ data: 'Hello World!' })
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha no cadastro: ${error.message}` } })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, cod, amount, price } = req.body;

        let product = await Product.create(req.body);
        return res.status(200).send({ product })
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha ao criar produto: ${error.message}` } })
    }
})

router.delete('/', async (req, res) => {
    
    const { id } = req.body
    try {
        console.log("teste")
        if(await Product.findOne({id})){
            const product = await Product.findOne({id: req.params.id});
            await Product.destroy({where: {_id: product}});
            return res.json(product);
        }

    } catch (error) {
        return res.status(400).send({ error: { message: `Falha no cadastro: ${error.message}` } })
    }

})

router.find('/', async (req, res) => {

    const product = await Product.findOne({where: {_id: req.id}})
});
module.exports = app => app.use('/product', router);