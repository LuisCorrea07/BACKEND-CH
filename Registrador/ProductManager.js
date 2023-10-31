const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
      this.nextId = this.calculateNextId();
    } catch (error) {
      this.products = [];
      this.nextId = 1;
    }
  }

  addProduct(product) {
    if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
      const newProduct = {
        id: this.nextId,
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
      };
      this.products.push(newProduct);
      this.saveProducts();
      this.nextId++;
      return newProduct;
    } else {
      console.log("Todos los campos son obligatorios");
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { id, ...updatedProduct };
      this.saveProducts();
      return this.products[index];
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log("Producto eliminado");
    } else {
      console.log("Producto no encontrado");
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf-8");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  calculateNextId() {
    if (this.products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...this.products.map((product) => product.id));
    return maxId + 1;
  }
}

const manager = new ProductManager('D:\\Luis\\Documents\\GitHub\\BACKEND_CODER\\Registrador\\productos.json');

manager.addProduct({
  title: "producto1",
  description: "Fideos semolados",
  price: 5.3,
  thumbnail: "imagen1.jpg",
  code: 569856,
  stock: 10
});

manager.addProduct({
  title: "producto2",
  description: "Arroz integral",
  price: 3.99,
  thumbnail: "imagen2.jpg",
  code: 123456,
  stock: 15
});

const productsList = manager.getProducts();
console.log(productsList);

const updatedProduct = manager.updateProduct(1, {
  title: "producto1 actualizado",
  description: "Nueva descripción",
  price: 6.0,
  thumbnail: "imagen1_actualizada.jpg",
  code: 569856,
  stock: 20
});
console.log("Producto actualizado:", updatedProduct);

manager.deleteProduct(2);
console.log("Productos después de eliminar el producto con ID 2:", manager.getProducts());