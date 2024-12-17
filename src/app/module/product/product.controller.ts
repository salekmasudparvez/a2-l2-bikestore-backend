import { Request, Response } from 'express';
import { productService } from './product.service';

const createPruduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await productService.createProductFunc(payload);
    if (!result) {
      return res.status(400).json({
        message: 'Failed to create product',
        success: false,
      });
    }
    res.status(201).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create product',
      success: false,
      error:  error, 
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const getQuery = req.query.searchTerm as string | undefined;
    let filter = {};
    if (getQuery) {
      filter = {
        $or: [
          { category: { $regex: getQuery, $options: 'i' } },
          { name: { $regex: getQuery, $options: 'i' } },
          { brand: { $regex: getQuery, $options: 'i' } },
        ],
      };
    }
    const result = await productService.getProductsFunc(filter);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve products',
      success: false,
      error: error,
    });
  }
};

const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productService.getSpecificProductFunc(id);
    if (!result) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bike retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve product',
      success: false,
      error:  error,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.productId;
    const result = await productService.updateProductFunc(id, data);
    if (!result) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update product',
      success: false,
      error:  error,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productService.deleteSingleProductFunc(id);
    if (!result) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete product',
      success: false,
      error:  error,
    });
  }
};

export const productControl = {
  createPruduct,
  getProduct,
  getSpecificProduct,
  updateProduct,
  deleteSingleProduct,
};
