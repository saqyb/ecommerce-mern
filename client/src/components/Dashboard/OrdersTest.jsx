import React, { useContext, useState } from "react";
import { Table, Badge } from "antd";
import { userContext } from "../../services/UserContext";
import { ProductsContext } from "../../services/ProductContext";
import { CategoriesContext } from "../../services/CategoriesContext";
import getUser from "./getUser";

const OrdersTest = () => {
  const { categories } = useContext(CategoriesContext);
  const { currentUser } = useContext(userContext);
  const { products, setProducts } = useContext(ProductsContext);
  const filteredProducts = products.filter((item) => {
    if (item.userId == currentUser.id && item.order.length > 0) return item;
  });

  const [nestedData, setNestedData] = useState({});
  const [isLoading, setIsLoading] = useState({});

  // Main Parent Table Render

  const columns = [
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Orders", dataIndex: "orders", key: "orders" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  const data = [];
  for (let i = 0; i < filteredProducts.length; i++) {
    const category = categories.find((item) => {
      return item.id == filteredProducts[i].categoryId;
    });
    data.push({
      id: filteredProducts[i].id,
      key: filteredProducts[i].id,
      name: filteredProducts[i].title,
      orders: filteredProducts[i].order.length,
      category: category.name,
      price: filteredProducts[i].price,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  // Expanded / Child / Nested Table Render

  const expandedRowRender = (record) => {
    const columns = [
      { title: "Customer Name", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Quantity", dataIndex: "quantity", key: "name" },
      { title: "Total Cost", dataIndex: "cost", key: "state" },
    ];
    const data = nestedData[record.id];

    return (
      <Table
        loading={isLoading[record.id] && !data}
        columns={columns}
        dataSource={nestedData[record.id]}
        pagination={false}
      />
    );
  };

  const handleExpand = (expanded, record) => {
    setIsLoading({
      [record.id]: true,
    });
    const product = filteredProducts.find((item) => {
      return item.id === record.id;
    });
    setTimeout(async () => {
      let productOrders = [];
      for (let i = 0; i < product.order.length; i++) {
        let user = await getUser(product.order[i].userId);

        const data = {
          quantity: product.order[i].quantity,
          cost: product.order[i].quantity * product.price,
          name: user.name,
          email: user.email,
        };
        productOrders = [...productOrders, data];
        setNestedData((state) => ({
          ...state,
          [record.key]: [...productOrders],
        }));
      }
      setIsLoading({
        [record.id]: false,
      });
    }, 1000);
  };

  return (
    <>
      <div className='w-5/6 m-auto'>
        <Table
          className='components-table-demo-nested'
          columns={columns}
          expandedRowRender={expandedRowRender}
          onExpand={handleExpand}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default OrdersTest;
