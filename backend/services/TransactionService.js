import TransactionDetail from "../models/TransactionDetailModel.js";
import Transaction from "../models/TransactionModel.js";
import ProdukService from "./ProdukService.js";
import sequelize from "../config/Database.js";
import { Op, Sequelize } from "sequelize";

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

  static async getTotalKeuntungan() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Mengambil keuntungan bulan ini
    const thisMonthProfit =
      (await Transaction.sum("totalPrice", {
        where: {
          createdAt: {
            [Op.gte]: new Date(currentYear, currentMonth - 1, 1),
            [Op.lt]: new Date(currentYear, currentMonth, 1),
          },
        },
      })) || 0;

    // Mengambil keuntungan bulan lalu
    const lastMonthProfit =
      (await Transaction.sum("totalPrice", {
        where: {
          createdAt: {
            [Op.gte]: new Date(currentYear, currentMonth - 2, 1),
            [Op.lt]: new Date(currentYear, currentMonth - 1, 1),
          },
        },
      })) || 0;

    // Menghitung persentase perbandingan
    const profitDifference = thisMonthProfit - lastMonthProfit;
    const profitPercentage = lastMonthProfit
      ? (profitDifference / lastMonthProfit) * 100
      : thisMonthProfit > 0
      ? 100
      : 0;

    const formattedPercentage = `${
      profitPercentage > 0 ? "+" : ""
    }${profitPercentage.toFixed(2)}%`;
    const formattedTotal = `Rp ${thisMonthProfit.toLocaleString("id-ID")}`; // Format dengan simbol Rp

    return {
      total: formattedTotal,
      comparisonPercentage: formattedPercentage,
      isProfit: profitPercentage > 0,
    };
  }

  // Mengambil total jumlah transaksi bulan ini dan membandingkannya dengan bulan lalu
  static async getTotalPenjualan() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Mengambil total penjualan bulan ini
    const thisMonthSales = await Transaction.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(currentYear, currentMonth - 1, 1),
          [Op.lt]: new Date(currentYear, currentMonth, 1),
        },
      },
    });

    // Mengambil total penjualan bulan lalu
    const lastMonthSales = await Transaction.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(currentYear, currentMonth - 2, 1),
          [Op.lt]: new Date(currentYear, currentMonth - 1, 1),
        },
      },
    });

    // Menghitung persentase perbandingan
    const salesDifference = thisMonthSales - lastMonthSales;
    const salesPercentage = lastMonthSales
      ? (salesDifference / lastMonthSales) * 100
      : thisMonthSales > 0
      ? 100
      : 0;

    const formattedPercentage = `${
      salesPercentage > 0 ? "+" : ""
    }${salesPercentage.toFixed(2)}%`;

    return {
      total: thisMonthSales,
      comparisonPercentage: formattedPercentage,
      isProfit: salesPercentage > 0,
    };
  }

  static async getChartData() {
    const currentYear = new Date().getFullYear();

    // Ambil data transaksi berdasarkan bulan
    const response = await Transaction.findAll({
      attributes: [
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"], // Mendapatkan bulan transaksi
        [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "totalPerMonth"], // Total harga per bulan
      ],
      where: {
        createdAt: {
          [Op.gte]: new Date(currentYear, 0, 1), // Dari 1 Januari tahun ini
          [Op.lt]: new Date(currentYear + 1, 0, 1), // Hingga 1 Januari tahun depan
        },
      },
      group: ["month"], // Kelompokkan hasil berdasarkan bulan
      order: [[Sequelize.literal("month"), "ASC"]], // Urutkan hasil berdasarkan bulan (ASC)
    });

    // Format data untuk chart (misalnya untuk grafik garis atau batang)
    const chartData = Array(12).fill(0); // Inisialisasi array untuk 12 bulan
    response.forEach((data) => {
      chartData[data.get("month") - 1] = data.get("totalPerMonth");
    });

    return chartData;
  }
}

export default TransactionService;
