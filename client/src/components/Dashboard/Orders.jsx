// import React from "react";
// import { useContext } from "react";
// import { userContext } from "../../services/UserContext";
// import { ProductsContext } from "../../services/ProductContext";
// import OrderCol from "./OrderCol";

// const Orders = () => {
//   const { currentUser } = useContext(userContext);
//   const { products, setProducts } = useContext(ProductsContext);
//   const filteredProducts = products.filter((item) => {
//     if (item.userId == currentUser.id && item.order.length > 0) return item;
//   });

//   return (
//     <>
//       <div className='overflow-x-auto relative'>
//         <table className='w-[80%] my-0 mx-auto text-sm text-left text-gray-500 dark:text-gray-400'>
//           <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
//             <tr>
//               <th scope='col' className='py-3 px-6'>
//                 Product name
//               </th>
//               <th scope='col' className='py-3 px-6'>
//                 Orders
//               </th>
//               <th scope='col' className='py-3 px-6'>
//                 Category
//               </th>
//               <th scope='col' className='py-3 px-6'>
//                 Price
//               </th>
//               <th scope='col' className='py-3 px-6'>
//                 Details
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((order) => {
//               return (
//                 <>
//                   <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                     <th
//                       scope='row'
//                       className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
//                     >
//                       {order.title}
//                     </th>
//                     <td className='py-4 px-6'>{order.order.length}</td>
//                     <td className='py-4 px-6'>
//                       <table className='w-[80%] my-0 mx-auto text-sm text-left text-gray-500 dark:text-gray-400'>
//                         <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
//                           <tr>
//                             <th scope='col' className='py-3 px-6'>
//                               Name
//                             </th>
//                             <th scope='col' className='py-3 px-6'>
//                               Orders
//                             </th>
//                             <th scope='col' className='py-3 px-6'>
//                               Cost
//                             </th>
//                           </tr>
//                         </thead>
//                         {order.order.map((item) => {
//                           return (
//                             <>
//                               <OrderCol Order={item} Product={order}></OrderCol>
//                             </>
//                           );
//                         })}
//                       </table>
//                     </td>
//                     <td className='py-4 px-6'>${order.price}</td>
//                     <td className='py-4 px-6'>
//                       <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>
//                         Details
//                       </button>
//                     </td>
//                   </tr>
//                 </>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Orders;
