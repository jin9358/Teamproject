function ProductsList({ products, addToCart }) {
  if (!products || products.length === 0) {
      return <div className="text-center p-6">상품이 없습니다.</div>
  }

  const liList = products.map(p => {
      const { pid, pname, price, img } = p;

      return (
          <li
              key={pid}
              className="w-1/6 border-2 p-2 rounded-lg shadow hover:shadow-lg transition"
              onClick={() => addToCart(p)}
          >
              <img src={img} alt={pname} className="w-full h-32 object-cover rounded" />
              <div className="mt-2 text-center font-semibold">{pname}</div>
              <div className="text-center text-sm text-gray-600">{price}원</div>
          </li>
      );
  });

  return (
      <div className="bg-pink-200 w-full h-full">
          <ul className="flex gap-4 flex-wrap p-6 justify-start">
              {liList}
          </ul>
      </div>
  );
}

export default ProductsList;