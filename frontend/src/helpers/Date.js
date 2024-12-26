export const formatTanggal = (tanggal) => {
  const tanggalFormat = new Date(tanggal);
  return tanggalFormat.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
