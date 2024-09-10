import TransactionDetail from "../models/TransactionDetailModel.js";
import Transaction from "../models/TransactionModel.js";
import ProdukService from "./ProdukService.js";
import sequelize from "../config/Database.js";

class TransactionService {
  static async saveTransaction(data) {
    const t = await sequelize.transaction();
    try {
      const { products } = data;
      let totalHarga = 0;

      const result = await Transaction.create(
        {
          totalPrice: totalHarga,
          createdAt: new Date(),
        },
        { transaction: t }
      );

      for (const product of products) {
        const { id, qty } = product;
        const res = await ProdukService.getProdukById(id);
        const price = res.price;
        const subtotal = res ? price * qty : 0;
        totalHarga += subtotal;

        await TransactionDetail.create(
          {
            transactionId: result.id,
            productId: id,
            qty,
            price,
            subtotal,
          },
          { transaction: t }
        );
      }

      const dataUpdate = { totalPrice: totalHarga };
      await Transaction.update(dataUpdate, {
        where: {
          id: result.id,
        },
        transaction: t,
      });

      await t.commit();
      return { status: "success", transactionId: result.id };
    } catch (error) {
      await t.rollback();
      return { status: "error", message: error.message };
    }
  }
}

export default TransactionService;
