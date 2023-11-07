import fs from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(productData) {
    const products = await this.readProductsFile();

    // Asignar un ID autoincrementable
    const lastProduct = products[products.length - 1];
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    // Agregar el nuevo producto al arreglo
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);

    // Guardar el arreglo actualizado en el archivo
    await this.saveProductsFile(products);

    return newProduct;
  }

  async getProducts() {
    const products = await this.readProductsFile();
    return products;
  }

  async getProductById(productId) {
    const products = await this.readProductsFile();
    return products.find(product => product.id === productId);
  }

  async updateProduct(productId, updatedData) {
    const products = await this.readProductsFile();

    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
      // Mantener el ID original
      updatedData.id = productId;
      products[index] = updatedData;
      await this.saveProductsFile(products);
      return updatedData;
    }

    return null; // Producto no encontrado
  }

  async deleteProduct(productId) {
    const products = await this.readProductsFile();

    const index = products.findIndex(product => product.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      await this.saveProductsFile(products);
      return true; // Producto eliminado
    }

    return false; // Producto no encontrado
  }

  async readProductsFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveProductsFile(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}

export default ProductManager ;
