const Banner = require("../../../../Models/Banner/Banner");

exports.getBanners = async (req, res) => {
  const { type, categoryId, seriesId } = req.body;
  try {
    const banners = await Banner.findAll({
      where: {
        InstituteId: req.institute.id,
        ...(type && { type }),
        ...(categoryId && { CategoryId: categoryId }),
        ...(seriesId && { SeriesId: seriesId }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Banners fetched successfully",
      data: banners,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
