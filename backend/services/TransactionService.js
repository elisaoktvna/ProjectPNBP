import TransactionDetail from "../models/TransactionDetailModel.js";
import Transaction from "../models/TransactionModel.js";
import ProdukService from "./ProdukService.js";
import sequelize from "../config/Database.js";
import { Op, Sequelize } from "sequelize";
import Product from "../models/ProductModel.js";

class TransactionService {
  static async saveTransaction(data) {
    const t = await sequelize.transaction();
    try {
      const { products } = data;
      let totalHarga = 0;
      const receiptDetails = [];

      // Create a new transaction
      const result = await Transaction.create(
        {
          totalPrice: totalHarga,
          createdAt: new Date(),
        },
        { transaction: t }
      );

      // Process each product
      for (const product of products) {
        const { id, qty } = product;
        const res = await ProdukService.getProdukById(id);
        const price = res.price;
        const subtotal = res ? price * qty : 0;
        totalHarga += subtotal;

        // Save transaction details
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

        // Add product details to receipt
        receiptDetails.push({
          productName: res.name,
          qty,
          price,
          subtotal,
        });
      }

      // Update the total price in the transaction
      const dataUpdate = { totalPrice: totalHarga };
      await Transaction.update(dataUpdate, {
        where: {
          id: result.id,
        },
        transaction: t,
      });

      // Commit the transaction
      await t.commit();

      // Generate the receipt
      const receipt = `
        Receipt ID: ${result.id}
        Date: ${new Date().toLocaleString()}
        -------------------------
        Products:
        ${receiptDetails
          .map(
            (item) =>
              `${item.productName} (Qty: ${
                item.qty
              }) - Rp ${item.price.toLocaleString("id-ID")} x ${
                item.qty
              } = Rp ${item.subtotal.toLocaleString("id-ID")}`
          )
          .join("\n")}
        -------------------------
        Total: Rp ${totalHarga.toLocaleString("id-ID")}
      `;

      // Return success with the receipt details
      return { transactionId: result.id, receipt };
    } catch (error) {
      // Rollback the transaction in case of error
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

  static async getHistory(startDate = null, endDate) {
    // Jika startDate tidak diberikan, ambil data dari awal hingga dueDate
    if (!startDate) {
      startDate = new Date(0); // Tanggal terawal (1 Januari 1970 atau awal database)
    }

    // Pastikan dueDate diberikan, jika tidak lempar error
    if (!endDate) {
      throw new Error("Due date is required.");
    }

    // Ambil data transaksi per produk berdasarkan tanggal
    const response = await TransactionDetail.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("qty")), "totalSold"],
        [Sequelize.col("TransactionDetail.price"), "unitPrice"],
        [
          Sequelize.fn(
            "SUM",
            Sequelize.literal("qty * TransactionDetail.price")
          ),
          "totalPrice",
        ],
        [Sequelize.col("Product.name"), "productName"],
      ],
      include: [
        {
          model: Transaction,
          attributes: [],
          where: {
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          },
        },
        {
          model: Product,
          attributes: ["name"],
        },
      ],
      group: ["productId", "TransactionDetail.price", "Product.name"], // Group by productId, price, and product name
      order: [[Sequelize.literal("totalSold"), "DESC"]], // Urutkan hasil berdasarkan jumlah produk terjual (DESC)
    });
    // Format data untuk chart atau laporan
    const chartData = response.map((data) => ({
      name: data.get("productName"),
      totalSold: data.get("totalSold"),
      unitPrice: data.get("unitPrice"),
      totalPrice: data.get("totalPrice"),
    }));

    return chartData;
  }
}

export default TransactionService;
