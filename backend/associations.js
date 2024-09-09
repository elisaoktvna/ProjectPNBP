import Kategori from './models/KategoriModel.js';
import Product from './models/ProductModel.js';


Kategori.hasMany(Product, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
});

Product.belongsTo(Kategori, {
    foreignKey: 'categoryId',
    targetKey: 'id'
});
