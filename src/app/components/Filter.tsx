const Filter = ({ filters, setFilters }) => {
  return (
    <div className="mt-12 flex justify-between ">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="py-2 px-4 rounded-2xl text-black text-xs font-medium bg-[#EBEDED]"
        >
          <option value="">Type</option>
          <option value="Fusion">Fusion</option>
          <option value="Masters">Masters</option>
          <option value="Fury">Fury</option>
          <option value="BeyLauncher">BeyLauncher</option>
          <option value="Beystadium">Beystadium</option>
        </select>

        <input
          type="text"
          name="min"
          placeholder="min price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />

        <input
          type="text"
          name="max"
          placeholder="max price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
        />
      </div>
    </div>
  );
};

export default Filter;
