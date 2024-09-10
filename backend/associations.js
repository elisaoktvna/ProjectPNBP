import Kategori from "./models/KategoriModel.js";
import Product from "./models/ProductModel.js";
import Transaction from "./models/TransactionModel.js";
import TransactionDetail from "./models/TransactionDetailModel.js";

// Define the relationship between Kategori and Product
Kategori.hasMany(Product, {
  foreignKey: "categoryId",
  sourceKey: "id",
});

Product.belongsTo(Kategori, {
  foreignKey: "categoryId",
  targetKey: "id",
});

// Define the relationship between Transaction and TransactionDetail
Transaction.hasMany(TransactionDetail, {
  foreignKey: "transactionId",
  sourceKey: "id",
});

TransactionDetail.belongsTo(Transaction, {
  foreignKey: "transactionId",
  targetKey: "id",
});

// Define the relationship between Product and TransactionDetail
Product.hasMany(TransactionDetail, {
  foreignKey: "productId",
  sourceKey: "id",
});

TransactionDetail.belongsTo(Product, {
  foreignKey: "productId",
  targetKey: "id",
});
