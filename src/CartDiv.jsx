function CartDiv({ cartItems, changeCartItem }) {
  const cartItemTag = cartItems.map((item) => {
      const product = item.product;
      const qty = item.qty;

      return (
          <li key={product.pid} className="m-2 p-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                  <div className="font-semibold">{product.pname}</div>
                  <div className="text-sm text-gray-600">수량: {qty}</div>
                  <div className="text-sm text-gray-600">총 가격: {product.price * qty}원</div>
              </div>

              {/* 수량 조절 버튼 */}
              <div className="flex gap-2">
                  <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => changeCartItem(product.pid, 1)}
                  >
                      +
                  </button>
                  <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => changeCartItem(product.pid, -1)}
                  >
                      -
                  </button>
              </div>
          </li>
      );
  });

  return (
      <div className="bg-violet-200 w-full h-full p-4">
          <ul>{cartItemTag}</ul>
      </div>
  );
}

export default CartDiv;