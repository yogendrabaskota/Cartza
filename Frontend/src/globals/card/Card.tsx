

const Card = () => {
  return (
    <>


  <div className="ml-5 mr-5 mb-0.5 mt-4 bg-white rounded-lg overflow-hidden shadow-lg ring-0 ring-orange-500 ring-opacity-40 max-w-sm">

   
  <div className="relative">
    <img className="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image" />

  </div>
  <div className="p-4">
    <h3 className="text-lg font-medium mb-2">Product Title</h3>
    <p className="text-gray-600 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante
      vel eros fermentum faucibus sit amet euismod lorem.</p>
    <div className="flex items-center justify-between">
      <span className="font-bold text-lg">$19.99</span>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Buy Now
      </button>
    </div>
  </div>
</div>

    </>
  )
}

export default Card