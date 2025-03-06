const {
  storageUseType,
  S3_FILE_PATH,
  sequelize,
} = require("../../../../importantInfo");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { saveFile } = require("../../../../Utils/fileHandler");
const Banner = require("../../../../Models/Banner/Banner");
const Category = require("../../../../Models/TestSeries/Category");
const Series = require("../../../../Models/TestSeries/Series");
const { deleteFile } = require("../../../../Utils/subaseS3");
const { createUserActivity } = require("../../../../Utils/activityUtils");

// Helper function to delete image if exists
async function deleteEntityImage(entity) {
  if (entity.imageUrl) {
    await deleteFile(entity.imageUrl);
  }
}

exports.createBanner = async (req, res) => {
  const { title, description, type, categoryId, seriesId } = req.body;
  let transaction;
  try {
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const bannerData = {
      title,
      description,
      type,
      InstituteId: req.institute.id,
    };

    switch (type) {
      case "institute":
        break;

      case "category":
        if (!categoryId) {
          return res.status(400).json({
            success: false,
            message: "Category ID is required",
          });
        }
        const category = await Category.findOne({
          where: {
            id: categoryId,
            InstituteId: req.institute.id,
          },
        });
        if (!category) {
          return res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }
        bannerData.CategoryId = categoryId;

        break;

      case "series":
        if (!seriesId) {
          return res.status(400).json({
            success: false,
            message: "Series ID is required",
          });
        }
        const series = await Series.findOne({
          where: {
            id: seriesId,
            InstituteId: req.institute.id,
          },
        });
        if (!series) {
          return res.status(404).json({
            success: false,
            message: "Series not found",
          });
        }
        bannerData.SeriesId = seriesId;

        break;

      default:
        break;
    }

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Banners"),
        uuidv4()
      );
    }

    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }
    bannerData.imageUrl = imageUrl;

    transaction = await sequelize.transaction();

    const banner = await Banner.create(bannerData, { transaction });

    await createUserActivity(
      req,
      "create",
      "Banner created successfully Id: ${banner.id}",
      transaction
    );

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

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

exports.updateBanner = async (req, res) => {
  let transaction;
  try {
    const { id } = req.body;
    const { isActive } = req.body;

    const banner = await Banner.findOne({
      where: {
        id,
        InstituteId: req.institute.id,
      },
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    transaction = await sequelize.transaction();

    await banner.update({ isActive }, { transaction });

    await createUserActivity(
      req,
      "update",
      "Banner updated successfully Id: ${banner.id}",
      transaction
    );

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteBanner = async (req, res) => {
  let transaction;
  try {
    const { id } = req.body;

    const banner = await Banner.findOne({
      where: {
        id,
        InstituteId: req.institute.id,
      },
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    transaction = await sequelize.transaction();

    await deleteEntityImage(banner);

    await banner.destroy({ transaction });

    await createUserActivity(
      req,
      "delete",
      "Banner deleted successfully Id: ${banner.id}",
      transaction
    );

    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
